const SANDBOX_BASE_URL = "https://sandbox.melhorenvio.com.br";
const PRODUCTION_BASE_URL = "https://melhorenvio.com.br";
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function response(data: unknown, status = 200, origin = "*") {
  return new Response(status === 204 ? null : JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": origin,
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST, OPTIONS"
    }
  });
}

function postalCode(value: unknown) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 8 ? digits : "";
}

function number(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeProduct(item: unknown, index: number) {
  const source = item && typeof item === "object" ? item as Record<string, unknown> : {};
  return {
    id: String(source.id || `produto-${index + 1}`).slice(0, 120),
    width: number(source.width),
    height: number(source.height),
    length: number(source.length),
    weight: number(source.weight),
    insurance_value: Number(number(source.insurance_value).toFixed(2)),
    quantity: Math.max(1, Math.round(number(source.quantity)))
  };
}

function isUuid(value: unknown) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

async function hydrateProductsFromCatalog(items: ReturnType<typeof normalizeProduct>[], organizationId: string) {
  const supabaseUrl = String(Deno.env.get("SUPABASE_URL") || "").replace(/\/$/, "");
  const serviceRoleKey = String(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "").trim();
  if (!supabaseUrl || !serviceRoleKey || !isUuid(organizationId)) return { error: "A fonte oficial do catálogo ainda não foi configurada no servidor.", code: "CATALOG_SOURCE_NOT_CONFIGURED" };
  const skus = [...new Set(items.map((item) => item.id).filter(Boolean))];
  const query = new URL(`${supabaseUrl}/rest/v1/products`);
  query.searchParams.set("organization_id", `eq.${organizationId}`);
  query.searchParams.set("sku", `in.(${skus.map((sku) => `\"${String(sku).replace(/\"/g, "\"\"")}\"`).join(",")})`);
  query.searchParams.set("select", "sku,name,shipping,product_prices(amount,tier,is_active)");
  let response: Response;
  try {
    response = await fetch(query, { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, Accept: "application/json" } });
  } catch {
    return { error: "Não foi possível consultar os dados oficiais dos produtos.", code: "CATALOG_SOURCE_UNAVAILABLE" };
  }
  if (!response.ok) return { error: "Não foi possível consultar os dados oficiais dos produtos.", code: "CATALOG_SOURCE_UNAVAILABLE" };
  const rows = await response.json() as Array<Record<string, unknown>>;
  const bySku = new Map(rows.map((row) => [String(row.sku || ""), row]));
  const products = items.map((item) => {
    const row = bySku.get(item.id);
    const shipping = row?.shipping && typeof row.shipping === "object" ? row.shipping as Record<string, unknown> : {};
    const prices = Array.isArray(row?.product_prices) ? row?.product_prices as Array<Record<string, unknown>> : [];
    const retail = prices.find((price) => price.tier === "retail" && price.is_active !== false);
    return { ...item, id: item.id, width: number(shipping.packagedWidth), height: number(shipping.packagedHeight), length: number(shipping.packagedLength), weight: number(shipping.packagedWeight), insurance_value: Number(number(retail?.amount).toFixed(2)), catalogName: String(row?.name || item.id) };
  });
  return { products };
}

function validatePayload(payload: Record<string, unknown>) {
  const from = postalCode(payload.originZip);
  const to = postalCode(payload.destinationZip);
  const products = Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : [];
  if (!from) return { error: "O CEP de origem da loja está ausente ou inválido.", code: "INVALID_ORIGIN_ZIP" };
  if (!to) return { error: "Digite um CEP de destino válido com 8 números.", code: "INVALID_DESTINATION_ZIP" };
  if (!products.length) return { error: "Adicione pelo menos um produto para calcular o frete.", code: "EMPTY_PRODUCTS" };
  if (products.length > 100) return { error: "A cotação excede o limite de itens permitido.", code: "TOO_MANY_PRODUCTS" };
  const incomplete = products.find((item) => item.width <= 0 || item.height <= 0 || item.length <= 0 || item.weight <= 0 || item.insurance_value < 0 || item.quantity <= 0);
  if (incomplete) return { error: "Há produto sem peso, medidas ou valor válido para o cálculo do frete.", code: "INCOMPLETE_PRODUCT_SHIPPING", productId: incomplete.id };
  return { from, to, products };
}

function mapService(item: Record<string, unknown>) {
  const company = item.company && typeof item.company === "object" ? item.company as Record<string, unknown> : {};
  const rawPrice = item.custom_price ?? item.price;
  const price = Number(rawPrice);
  if (!Number.isFinite(price) || price < 0) return null;
  const deliveryTime = item.custom_delivery_time ?? item.delivery_time ?? null;
  const carrier = String(company.name || company.company_name || company.name_alias || "Transportadora disponível");
  const service = String(item.name || item.service || item.service_name || "Modalidade disponível");
  return {
    id: String(item.id || `${carrier}-${service}`).replace(/\s+/g, "-").toLowerCase(),
    providerId: item.id ?? null,
    carrier,
    service,
    price: Number(price.toFixed(2)),
    days: deliveryTime === null || deliveryTime === "" ? "Prazo informado pela transportadora" : `${deliveryTime} dia(s) úteis`,
    deliveryTime,
    currency: "BRL",
    source: "melhor-envio"
  };
}

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get("origin") || "";
  const allowedOrigins = String(Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const origin = requestOrigin && allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0] || "*";
  if (request.method === "OPTIONS") return response({}, 204, origin);
  if (request.method !== "POST") return response({ error: "Método não permitido." }, 405, origin);

  const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const bucket = rateBuckets.get(clientKey);
  if (!bucket || bucket.resetAt <= now) rateBuckets.set(clientKey, { count: 1, resetAt: now + RATE_WINDOW_MS });
  else {
    bucket.count += 1;
    if (bucket.count > RATE_LIMIT) return response({ error: "Muitas cotações em sequência. Aguarde um minuto e tente novamente.", code: "RATE_LIMITED" }, 429, origin);
  }

  const token = String(Deno.env.get("MELHOR_ENVIO_TOKEN") || "").trim();
  if (!token) return response({ error: "A integração com o Melhor Envio ainda não foi configurada no servidor.", code: "MELHOR_ENVIO_NOT_CONFIGURED" }, 503, origin);

  let payload: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 100_000) return response({ error: "A cotação excede o limite permitido.", code: "PAYLOAD_TOO_LARGE" }, 413, origin);
    payload = JSON.parse(rawBody);
  } catch { return response({ error: "Não foi possível ler os dados da cotação.", code: "INVALID_JSON" }, 400, origin); }
  const configuredOriginZip = postalCode(Deno.env.get("MELHOR_ENVIO_ORIGIN_ZIP"));
  if (!configuredOriginZip) return response({ error: "O CEP de origem da loja ainda não foi configurado no servidor.", code: "ORIGIN_ZIP_NOT_CONFIGURED" }, 503, origin);
  if (configuredOriginZip !== postalCode(payload.originZip)) return response({ error: "O CEP de origem informado não corresponde ao CEP configurado pela loja.", code: "ORIGIN_ZIP_MISMATCH" }, 422, origin);
  const rawProducts = Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : [];
  const organizationId = String(Deno.env.get("MELHOR_ENVIO_ORGANIZATION_ID") || "");
  const catalog = await hydrateProductsFromCatalog(rawProducts, organizationId);
  if ("error" in catalog) return response(catalog, 503, origin);
  const validated = validatePayload({ ...payload, originZip: configuredOriginZip, products: catalog.products });
  if ("error" in validated) return response(validated, 422, origin);

  const environment = String(Deno.env.get("MELHOR_ENVIO_ENV") || "sandbox").toLowerCase() === "production" ? "production" : "sandbox";
  const baseUrl = environment === "production" ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const apiResponse = await fetch(`${baseUrl}/api/v2/me/shipment/calculate`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": Deno.env.get("MELHOR_ENVIO_USER_AGENT") || "Suprimentos Oliveira (danilo.cardosoweb@gmail.com)"
      },
      body: JSON.stringify({
        from: { postal_code: validated.from },
        to: { postal_code: validated.to },
        products: validated.products,
        options: { receipt: false, own_hand: false }
      })
    });
    const raw = await apiResponse.text();
    let result: unknown = null;
    try { result = raw ? JSON.parse(raw) : null; } catch { result = null; }
    if (!apiResponse.ok) {
      const data = result && typeof result === "object" ? result as Record<string, unknown> : {};
      return response({ error: String(data.message || data.error || "O Melhor Envio recusou a cotação."), code: "MELHOR_ENVIO_API_ERROR", status: apiResponse.status }, apiResponse.status === 422 ? 422 : 502, origin);
    }
    const rows = Array.isArray(result) ? result : result && typeof result === "object" && Array.isArray((result as Record<string, unknown>).data) ? (result as Record<string, unknown>).data as unknown[] : [];
    const options = rows
      .filter((item) => item && typeof item === "object" && !(item as Record<string, unknown>).error)
      .map((item) => mapService(item as Record<string, unknown>))
      .filter((item): item is NonNullable<ReturnType<typeof mapService>> => Boolean(item));
    if (!options.length) return response({ error: "Nenhuma modalidade foi encontrada para este CEP e estes produtos.", code: "NO_SHIPPING_OPTIONS" }, 422, origin);
    return response({
      providerMode: `melhor-envio-${environment}`,
      zip: `${validated.to.slice(0, 5)}-${validated.to.slice(5)}`,
      originZip: `${validated.from.slice(0, 5)}-${validated.from.slice(5)}`,
      options,
      source: "melhor-envio",
      quotedAt: new Date().toISOString(),
      rawOptions: rows
    }, 200, origin);
  } catch (error) {
    const message = error?.name === "AbortError" ? "A consulta ao Melhor Envio demorou demais. Tente novamente." : "Não foi possível consultar o Melhor Envio agora.";
    return response({ error: message, code: "MELHOR_ENVIO_UNAVAILABLE" }, 502, origin);
  } finally {
    clearTimeout(timeout);
  }
});
