(function initFieldOpsSupabase(window) {
  const config = window.FIELD_OPS_SUPABASE_CONFIG || {};
  const url = String(config.url || "").replace(/\/$/, "");
  const anonKey = String(config.anonKey || "");
  const organizationSlug = String(config.organizationSlug || "suprimentos-oliveira");
  const sessionStorageKey = "fieldops-auth-session";
  let session = null;
  let organizationId = null;
  let saveTimer = null;
  let pendingSnapshot = null;
  let pendingCatalogSync = false;
  let refreshTimer = 0;
  let lastStatus = "offline";

  function readStoredSession() {
    try {
      const raw = window.sessionStorage.getItem(sessionStorageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setSession(next) {
    session = next?.access_token ? next : null;
    window.clearTimeout(refreshTimer);
    if (!session) {
      try { window.sessionStorage.removeItem(sessionStorageKey); } catch {}
      return;
    }
    try { window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(session)); } catch {}
    const expiresAt = Number(session.expires_at || 0) * 1000;
    const delay = expiresAt > Date.now() ? Math.max(30000, expiresAt - Date.now() - 60000) : 0;
    if (delay) refreshTimer = window.setTimeout(() => refreshSession().catch(() => signOut()), delay);
  }

  async function refreshSession() {
    if (!session?.refresh_token) return null;
    const next = await authRequest("/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: session.refresh_token }) });
    setSession(next);
    emitStatus("connected");
    return next;
  }

  async function ensureValidSession() {
    const expiresAt = Number(session?.expires_at || 0) * 1000;
    if (session?.refresh_token && expiresAt && expiresAt <= Date.now() + 30000) await refreshSession();
  }

  function emitStatus(status, detail = "") {
    lastStatus = status;
    window.dispatchEvent(new CustomEvent("fieldops:cloud-status", { detail: { status, detail } }));
  }

  function configured() {
    return Boolean(url && anonKey);
  }

  async function request(base, path, options = {}) {
    if (!configured()) throw new Error("Supabase não configurado.");
    if (!path.startsWith("/token") && !path.startsWith("/logout")) await ensureValidSession();
    const headers = {
      apikey: anonKey,
      Authorization: `Bearer ${session?.access_token || anonKey}`,
      Accept: "application/json",
      ...options.headers
    };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch(`${base}${path}`, { ...options, headers });
    const raw = await response.text();
    let payload = null;
    try { payload = raw ? JSON.parse(raw) : null; } catch { payload = raw; }
    if (!response.ok) {
      const message = payload?.msg || payload?.message || payload?.error_description || payload?.error || `HTTP ${response.status}`;
      throw new Error(String(message));
    }
    return payload;
  }

  function authRequest(path, options = {}) {
    return request(`${url}/auth/v1`, path, options);
  }

  function dataRequest(path, options = {}) {
    return request(`${url}/rest/v1`, path, options);
  }

  function publicStorageUrl(bucket, objectPath) {
    const encodedPath = String(objectPath || "").split("/").map((part) => encodeURIComponent(part)).join("/");
    return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodedPath}`;
  }

  async function uploadProductImages(files, productKey = "produto") {
    await ensureValidSession();
    if (!session?.access_token || !organizationId) throw new Error("Entre na conta da loja antes de subir imagens.");
    const selected = Array.from(files || []).filter((file) => file && file.type?.startsWith("image/") && file.size <= 5 * 1024 * 1024).slice(0, 8);
    if (!selected.length) return [];
    const folder = slugify(productKey) || "produto";
    const uploaded = [];
    for (const file of selected) {
      const extension = String(file.name || "jpg").split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const randomPart = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).slice(2);
      const objectPath = `${organizationId}/${folder}/${Date.now()}-${randomPart}.${extension}`;
      const response = await fetch(`${url}/storage/v1/object/product-media/${objectPath}`, {
        method: "POST",
        headers: { apikey: anonKey, Authorization: `Bearer ${session.access_token}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" },
        body: file
      });
      const raw = await response.text();
      let payload = null;
      try { payload = raw ? JSON.parse(raw) : null; } catch {}
      if (!response.ok) throw new Error(String(payload?.message || payload?.error || payload?.msg || "O armazenamento de imagens ainda não está disponível."));
      uploaded.push(publicStorageUrl("product-media", objectPath));
    }
    return uploaded;
  }

  async function signIn(email, password) {
    const next = await authRequest("/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
    setSession(next);
    emitStatus("connected");
    return next;
  }

  async function signUp(details) {
    return signUpWithDetails(details);
  }

  async function signUpWithDetails({ email, password, fullName, phone, role }) {
    const next = await authRequest("/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, data: { full_name: fullName, phone, preferred_role: role } })
    });
    setSession(next);
    if (session) emitStatus("connected");
    return next;
  }

  async function signInOrSignUp(details) {
    try {
      return { mode: "signin", session: await signIn(details.email, details.password) };
    } catch (signInError) {
      const created = await signUp(details);
      if (!created?.access_token) return { mode: "confirmation", session: null, error: "Confirme seu e-mail para concluir o acesso." };
      return { mode: "signup", session: created };
    }
  }

  async function resetPassword(email, redirectTo = window.location.origin) {
    const value = String(email || "").trim().toLowerCase();
    if (!value) throw new Error("Informe seu e-mail para receber o link de recuperação.");
    return authRequest("/recover", { method: "POST", body: JSON.stringify({ email: value, options: { redirectTo } }) });
  }

  async function updatePassword(password) {
    if (!session?.access_token) throw new Error("A sessão de recuperação expirou. Solicite um novo link.");
    if (String(password || "").length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
    return authRequest("/user", { method: "PUT", body: JSON.stringify({ password }) });
  }

  async function bootstrapAccount(details) {
    if (!session?.access_token) throw new Error("Faça login antes de configurar o perfil.");
    const result = await dataRequest("/rpc/ensure_account", { method: "POST", body: JSON.stringify({ p_full_name: details.fullName, p_phone: details.phone || null, p_role: details.role }) });
    const value = Array.isArray(result) ? result[0] : result;
    organizationId = value?.organization_id || organizationId;
    return value || {};
  }

  async function listAccessGrants() {
    if (!session?.access_token) throw new Error("Faça login como administrador para gerenciar acessos.");
    return dataRequest("/access_grants?select=id,email,full_name,phone,role,permissions,status,user_id,last_seen_at,created_at,organization_id&order=created_at.desc");
  }

  async function createAccessGrant(details) {
    if (!session?.access_token || !organizationId) throw new Error("A organização administrativa ainda não foi carregada.");
    const rows = await dataRequest("/access_grants", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        email: String(details.email || "").trim().toLowerCase(),
        full_name: String(details.fullName || "").trim() || null,
        phone: String(details.phone || "").trim() || null,
        organization_id: organizationId,
        role: details.role || "retailer",
        permissions: Array.isArray(details.permissions) ? details.permissions : [],
        status: "invited",
        invited_by: session.user?.id || null
      })
    });
    return rows?.[0] || null;
  }

  async function updateAccessGrant(id, changes) {
    if (!session?.access_token) throw new Error("Faça login como administrador para gerenciar acessos.");
    const rows = await dataRequest(`/access_grants?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(changes)
    });
    return rows?.[0] || null;
  }

  async function loadUserState() {
    if (!session?.user?.id) return null;
    const rows = await dataRequest(`/user_app_state?user_id=eq.${encodeURIComponent(session.user.id)}&select=state&limit=1`);
    return rows?.[0]?.state || null;
  }

  async function saveUserState(snapshot) {
    if (!session?.user?.id) return { skipped: true };
    return dataRequest("/user_app_state?on_conflict=user_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ user_id: session.user.id, state: snapshot })
    });
  }

  function slugify(value) {
    return String(value || "item").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
  }

  async function upsertRows(path, rows, conflict) {
    if (!rows.length) return [];
    return dataRequest(`${path}?on_conflict=${encodeURIComponent(conflict)}`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(rows)
    });
  }

  async function syncRelationalCatalog(snapshot) {
    const role = snapshot?.account?.role;
    if (!organizationId || !["retailer", "operator", "admin"].includes(role)) return;
    const catalog = snapshot?.catalog || snapshot || {};
    const categoryRows = (catalog.categories || []).map((category, index) => ({
      organization_id: organizationId,
      name: String(category.name || "Categoria").trim(),
      slug: slugify(category.name),
      description: category.description || null,
      image_url: category.image || null,
      is_active: category.active !== false,
      sort_order: Number(category.order || index + 1)
    }));
    const savedCategories = await upsertRows("/categories", categoryRows, "organization_id,slug");
    const categoryIds = new Map((savedCategories || []).map((row) => [row.slug, row.id]));
    const brands = [...new Map((catalog.products || []).map((product) => [String(product.brand || "FIELD OPS").trim().toUpperCase(), String(product.brand || "FIELD OPS").trim().toUpperCase()])).values()];
    const brandRows = brands.map((name) => ({ organization_id: organizationId, name, slug: slugify(name), is_active: true }));
    const savedBrands = await upsertRows("/brands", brandRows, "organization_id,slug");
    const brandIds = new Map((savedBrands || []).map((row) => [row.slug, row.id]));
    const supplierRows = [...new Map((catalog.suppliers || []).filter((supplier) => supplier?.name).map((supplier) => [slugify(supplier.name), supplier])).values()].map((supplier) => ({
      organization_id: organizationId,
      name: String(supplier.name).trim(),
      slug: slugify(supplier.name),
      contact_name: supplier.contactName || null,
      phone: supplier.phone || null,
      whatsapp: supplier.whatsapp || null,
      email: supplier.email || null,
      website: supplier.website || null,
      notes: supplier.notes || null,
      is_active: supplier.active !== false
    }));
    // The supplier table is introduced by the management migration. Keep the
    // catalog sync compatible while that migration is still being published.
    let savedSuppliers = [];
    try { savedSuppliers = await upsertRows("/suppliers", supplierRows, "organization_id,slug"); }
    catch (error) { console.warn("Field Ops: fornecedores ainda não foram publicados no Supabase.", error); }
    const supplierIds = new Map((savedSuppliers || []).map((row) => [row.slug, row.id]));
    const sourceProducts = (catalog.products || []).filter((product) => product.name);
    const productRows = sourceProducts.map((product, index) => {
      const sku = String(product.sku || `FO-${String(index + 1).padStart(5, "0")}`).trim().toUpperCase();
      const categorySlug = slugify(product.category || "Gear");
      const brandSlug = slugify(product.brand || "FIELD OPS");
      const supplierName = product.supplier || product.specs?.fornecedor || "";
      const candidateSupplierId = supplierIds.get(slugify(supplierName)) || product.supplierId || null;
      const supplierId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(candidateSupplierId)) ? candidateSupplierId : null;
      const row = {
        organization_id: organizationId,
        brand_id: brandIds.get(brandSlug) || null,
        category_id: categoryIds.get(categorySlug) || null,
        sku,
        barcode: product.barcode || null,
        name: String(product.name).trim(),
        slug: `${slugify(product.name)}-${slugify(sku)}`,
        description: product.description || null,
        system: product.system || null,
        product_type: product.type || null,
        specs: { ...(product.specs || {}), fornecedor: supplierName },
        shipping: product.shipping || {},
        is_active: product.active !== false
      };
      // Older remote schemas do not know this column yet. Omitting it keeps
      // the catalog sync compatible until the management migration is applied.
      if (supplierId) row.supplier_id = supplierId;
      return row;
    });
    const savedProducts = await upsertRows("/products", productRows, "organization_id,sku");
    const productIds = new Map((savedProducts || []).map((row) => [row.sku, row.id]));
    const prices = productRows.map((row, index) => ({ product_id: productIds.get(row.sku), tier: "retail", amount: Math.max(0, Number(sourceProducts[index]?.price || 0)), currency: "BRL", is_active: true })).filter((row) => row.product_id);
    const productIdList = [...productIds.values()].filter(Boolean);
    const existingInventory = productIdList.length ? await dataRequest(`/inventory?product_id=in.(${productIdList.join(",")})&select=product_id,reserved_quantity,low_stock_threshold`) : [];
    const inventoryMap = new Map((existingInventory || []).map((row) => [row.product_id, row]));
    const inventory = productRows.map((row, index) => {
      const productId = productIds.get(row.sku);
      const previous = inventoryMap.get(productId);
      return { product_id: productId, available_quantity: Math.max(0, Math.round(Number(sourceProducts[index]?.stockCount || 0))), reserved_quantity: Number(previous?.reserved_quantity || 0), low_stock_threshold: Number(previous?.low_stock_threshold ?? 3) };
    }).filter((row) => row.product_id);
    const existingMedia = productIdList.length ? await dataRequest(`/product_media?product_id=in.(${productIdList.join(",")})&select=id,product_id,url,alt_text,is_primary,sort_order`) : [];
    const mediaByProduct = new Map();
    (existingMedia || []).forEach((row) => {
      if (!mediaByProduct.has(row.product_id)) mediaByProduct.set(row.product_id, []);
      mediaByProduct.get(row.product_id).push(row);
    });
    const mediaTasks = productRows.map(async (row, index) => {
      const productId = productIds.get(row.sku);
      if (!productId) return;
      const source = sourceProducts[index] || {};
      const images = [...(Array.isArray(source.images) ? source.images : []), source.image].map((value) => String(value || "").trim()).filter((value, imageIndex, list) => value && value !== "/assets/product-image-pending.svg" && list.indexOf(value) === imageIndex).slice(0, 12);
      const current = mediaByProduct.get(productId) || [];
      const kept = new Set();
      for (let sortOrder = 0; sortOrder < images.length; sortOrder += 1) {
        const image = images[sortOrder];
        const existing = current.find((item) => item.url === image) || current[sortOrder];
        const body = { product_id: productId, url: image, alt_text: source.name || row.name, is_primary: sortOrder === 0, sort_order: sortOrder };
        if (existing?.id) {
          kept.add(existing.id);
          await dataRequest(`/product_media?id=eq.${encodeURIComponent(existing.id)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(body) });
        } else {
          await dataRequest("/product_media", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(body) });
        }
      }
      await Promise.all(current.filter((item) => item.id && !kept.has(item.id)).map((item) => dataRequest(`/product_media?id=eq.${encodeURIComponent(item.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } })));
    });
    await Promise.all([
      upsertRows("/product_prices", prices, "product_id,tier"),
      upsertRows("/inventory", inventory, "product_id"),
      upsertRows("/banners", (catalog.banners || []).map((banner) => ({ organization_id: organizationId, name: String(banner.name || "Campanha").trim(), media_type: banner.type === "video" ? "video" : "image", media_url: banner.media || "", eyebrow: banner.eyebrow || null, title: banner.title || "Nova campanha", title_accent: banner.titleAccent || null, subtitle: banner.subtitle || null, cta_label: banner.ctaLabel || null, cta_target: banner.ctaTarget || "catalog", is_active: banner.active !== false, sort_order: Number(banner.order || 0) })), "organization_id,name"),
      ...mediaTasks
    ]);
  }

  async function syncCatalog(snapshot) {
    if (!session?.user?.id || !organizationId) throw new Error("A sessão da loja ainda não está pronta para migrar o catálogo.");
    await syncRelationalCatalog(snapshot);
    return { synced: true };
  }

  function queueSave(snapshot, options = {}) {
    pendingSnapshot = snapshot;
    pendingCatalogSync = pendingCatalogSync || options.syncCatalog === true;
    window.dispatchEvent(new CustomEvent("fieldops:save-state", { detail: { status: "saving" } }));
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const next = pendingSnapshot;
      pendingSnapshot = null;
      if (!next || !session?.user?.id) {
        pendingCatalogSync = false;
        window.dispatchEvent(new CustomEvent("fieldops:save-state", { detail: { status: "local" } }));
        return;
      }
      try {
        const personal = { ...next };
        delete personal.catalog;
        const tasks = [saveUserState(personal)];
        if (pendingCatalogSync) tasks.push(syncRelationalCatalog(next));
        pendingCatalogSync = false;
        await Promise.all(tasks);
        emitStatus("connected");
        window.dispatchEvent(new CustomEvent("fieldops:save-state", { detail: { status: "saved" } }));
        window.dispatchEvent(new CustomEvent("fieldops:save-result", { detail: { status: "success" } }));
      } catch (error) {
        emitStatus("error", error.message);
        window.dispatchEvent(new CustomEvent("fieldops:save-state", { detail: { status: "failed", message: error.message } }));
        window.dispatchEvent(new CustomEvent("fieldops:save-result", { detail: { status: "error", message: error.message } }));
        console.warn("Field Ops: não foi possível salvar no Supabase.", error);
      }
    }, 700);
  }

  async function loadPublicCatalog() {
    if (!configured()) return null;
    const orgs = await dataRequest(`/organizations?slug=eq.${encodeURIComponent(organizationSlug)}&is_active=eq.true&select=id,name,slug&limit=1`);
    const org = orgs?.[0];
    if (!org) return null;
    organizationId = org.id;
    const productSelect = "id,sku,barcode,name,description,system,product_type,supplier_id,specs,shipping,is_active,brands(name),categories(name),product_prices(amount,tier,is_active),product_media(url,alt_text,is_primary,sort_order),inventory(available_quantity)";
    const productSelectBeforeSuppliersMigration = "id,sku,barcode,name,description,system,product_type,specs,shipping,is_active,brands(name),categories(name),product_prices(amount,tier,is_active),product_media(url,alt_text,is_primary,sort_order),inventory(available_quantity)";
    const loadProducts = async () => {
      try {
        return await dataRequest(`/products?organization_id=eq.${org.id}&is_active=eq.true&select=${productSelect}&limit=1000`);
      } catch (error) {
        if (!/supplier_id|column .* does not exist/i.test(String(error?.message || ""))) throw error;
        console.warn("Field Ops: usando o formato de catálogo anterior até a migração de fornecedores ser aplicada.");
        return dataRequest(`/products?organization_id=eq.${org.id}&is_active=eq.true&select=${productSelectBeforeSuppliersMigration}&limit=1000`);
      }
    };
    const [categoryRows, productRows, bannerRows, radarRows, airdropRows] = await Promise.all([
      dataRequest(`/categories?organization_id=eq.${org.id}&is_active=eq.true&select=id,name,description,image_url,is_active,sort_order&order=sort_order.asc`),
      loadProducts(),
      dataRequest(`/banners?organization_id=eq.${org.id}&is_active=eq.true&select=id,name,media_type,media_url,eyebrow,title,title_accent,subtitle,cta_label,cta_target,is_active,sort_order&order=sort_order.asc`),
      dataRequest(`/radar_content?organization_id=eq.${org.id}&status=eq.published&select=*`),
      dataRequest(`/airdrops?organization_id=eq.${org.id}&is_active=eq.true&select=*`)
    ]);
    let supplierRows = [];
    try { supplierRows = await dataRequest(`/suppliers?organization_id=eq.${org.id}&is_active=eq.true&select=id,name,slug,contact_name,phone,whatsapp,email,website,notes,is_active&order=name.asc`); } catch {}
    const products = (productRows || []).map((row) => {
      const price = (row.product_prices || []).find((item) => item.tier === "retail" && item.is_active !== false);
      const media = [...(row.product_media || [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || Number(a.sort_order) - Number(b.sort_order));
      const images = media.map((item) => item.url).filter(Boolean);
      const inventory = row.inventory?.[0] || {};
      const brand = Array.isArray(row.brands) ? row.brands[0] : row.brands;
      const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
      return {
        id: row.sku || row.id,
        dbId: row.id,
        sku: row.sku,
        brand: brand?.name || "FIELD OPS",
        supplierId: row.supplier_id || "",
        supplier: supplierRows.find((item) => item.id === row.supplier_id)?.name || row.specs?.fornecedor || row.specs?.supplier || "",
        name: row.name,
        type: `${row.system || row.product_type || "FIELD GEAR"} · FIELD READY`,
        meta: row.product_type || "FIELD READY",
        price: Number(price?.amount || 0),
        stockCount: Number(inventory.available_quantity || 0),
        stock: Number(inventory.available_quantity || 0) > 0 ? "Em estoque" : "Fora de estoque",
        category: category?.name || "Gear",
        system: row.system || row.product_type || "FIELD GEAR",
        image: images[0] || "",
        images,
        specs: row.specs || {},
        shipping: row.shipping || {},
        description: row.description || "Produto pronto para o campo.",
        tag: "Supabase",
        active: row.is_active !== false
      };
    });
    return {
      organization: org,
      categories: categoryRows || [],
      products,
      suppliers: supplierRows || [],
      banners: bannerRows || [],
      radarContents: radarRows || [],
      airdrops: airdropRows || []
    };
  }

  async function loadOrganizationSettings() {
    if (!organizationId || !session?.access_token) return null;
    const rows = await dataRequest(`/organization_settings?organization_id=eq.${encodeURIComponent(organizationId)}&select=settings&limit=1`);
    return rows?.[0]?.settings || null;
  }

  async function loadAuditEvents() {
    if (!organizationId || !session?.access_token) return [];
    return dataRequest(`/audit_events?organization_id=eq.${encodeURIComponent(organizationId)}&select=id,actor_id,entity_type,entity_id,action,before_data,after_data,created_at&order=created_at.desc&limit=250`);
  }

  async function saveOrganizationSettings(settings) {
    if (!organizationId || !session?.access_token) return { skipped: true };
    const rows = await dataRequest("/organization_settings?on_conflict=organization_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ organization_id: organizationId, settings, updated_by: session.user?.id || null }) });
    return rows?.[0] || { skipped: false };
  }

  async function loadOperationalData() {
    if (!organizationId || !session?.access_token) return null;
    const [quoteRows, orderRows] = await Promise.all([
      dataRequest(`/quotes?organization_id=eq.${organizationId}&select=*,quote_items(*)&order=created_at.desc&limit=1000`),
      dataRequest(`/orders?organization_id=eq.${organizationId}&select=*,order_items(*),shipments(*)&order=created_at.desc&limit=1000`)
    ]);
    const quoteStatus = { new: "Novo", in_review: "Em análise", sent: "Proposta enviada", awaiting_customer: "Aguardando cliente", approved: "Aprovado", rejected: "Rejeitado", expired: "Expirado", converted: "Convertido em pedido", cancelled: "Cancelado" };
    const orderStatus = { new: "Novo pedido", payment_pending: "Pagamento pendente", payment_confirmed: "Pagamento confirmado", preparing: "Preparando pedido", picking: "Separação", ready_to_ship: "Pronto para envio", shipped: "Enviado", delivered: "Entregue", cancelled: "Cancelado" };
    return {
      quotes: (quoteRows || []).map((row) => ({ ...row, dbId: row.id, id: row.id, status: quoteStatus[row.status] || "Novo", subtotal: Number(row.subtotal || 0), discount: Number(row.discount || 0), freight: Number(row.freight || 0), total: Number(row.total || 0), createdAt: row.created_at, validUntil: row.valid_until, lossReason: row.loss_reason || "", shipping: row.shipping || {}, items: (row.quote_items || []).map((item) => ({ id: item.product_id, name: item.product_name_snapshot, sku: item.sku_snapshot, quantity: item.quantity, unitPrice: Number(item.unit_price || 0), lineTotal: Number(item.line_total || 0) })) })),
      orders: (orderRows || []).map((row) => ({ ...row, dbId: row.id, id: row.order_number || row.id, orderDbId: row.id, quoteId: row.quote_id, status: orderStatus[row.status] || "Novo pedido", subtotal: Number(row.subtotal || 0), discount: Number(row.discount || 0), freight: Number(row.freight || 0), total: Number(row.total || 0), createdAt: row.created_at, shipping: { ...(row.shipping || {}), ...(row.shipments?.[0] || {}), tracking: row.shipments?.[0]?.tracking_code || row.shipping?.tracking || "", officialTracking: row.shipments?.[0]?.is_official_tracking === true }, items: (row.order_items || []).map((item) => ({ id: item.product_id, name: item.product_name_snapshot, sku: item.sku_snapshot, quantity: item.quantity, unitPrice: Number(item.unit_price || 0), lineTotal: Number(item.line_total || 0), picked: Number(item.picked_quantity || 0) >= Number(item.quantity || 0) })) }))
    };
  }

  async function createQuoteRecord(record) {
    if (!session?.access_token || !organizationId) return { skipped: true, reason: "authentication_required" };
    const payload = {
      organization_id: organizationId,
      customer_user_id: session.user?.id || null,
      origin: record.origin || "catalog",
      subtotal: record.subtotal,
      discount: record.discount,
      freight: record.freight,
      total: record.total,
      valid_until: record.validUntil,
      shipping: record.shipping || {},
      customer_note: record.note || "",
      customer: { name: record.customer, phone: record.phone, address: { zip: record.zip, city: record.city, address: record.address } },
      items: (record.items || []).map((item) => ({ product_id: findProductDbId(item.dbId || item.productDbId || item.id), product_name_snapshot: item.name, sku_snapshot: item.sku, quantity: item.quantity, unit_price: item.unitPrice, line_total: item.lineTotal }))
    };
    const result = await dataRequest("/rpc/create_quote_with_items", { method: "POST", body: JSON.stringify({ p_payload: payload }) });
    const value = Array.isArray(result) ? result[0] : result;
    return { ...value, skipped: false };
  }

  async function convertQuoteToOrderRemote(quoteDbId) {
    const result = await dataRequest("/rpc/convert_quote_to_order", { method: "POST", body: JSON.stringify({ p_quote_id: quoteDbId }) });
    return Array.isArray(result) ? result[0] : result;
  }

  async function updateQuoteStatus(quoteDbId, status, validUntil = null) {
    if (!quoteDbId) return null;
    const statusMap = { "Novo": "new", "Em análise": "in_review", "Proposta enviada": "sent", "Aguardando cliente": "awaiting_customer", "Aprovado": "approved", "Rejeitado": "rejected", "Expirado": "expired", "Convertido em pedido": "converted", "Cancelado": "cancelled" };
    const body = { status: statusMap[status] || "new" };
    if (validUntil) body.valid_until = validUntil;
    const rows = await dataRequest(`/quotes?id=eq.${encodeURIComponent(quoteDbId)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(body) });
    return rows?.[0] || null;
  }

  async function updateQuoteLossReason(quoteDbId, lossReason) {
    if (!quoteDbId) return null;
    const rows = await dataRequest(`/quotes?id=eq.${encodeURIComponent(quoteDbId)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ loss_reason: String(lossReason || "").trim() || null }) });
    return rows?.[0] || null;
  }

  function findProductDbId(value) {
    return value && /^[0-9a-f-]{36}$/i.test(String(value)) ? String(value) : null;
  }

  async function clearState() {
    if (!session?.user?.id) return;
    await dataRequest(`/user_app_state?user_id=eq.${encodeURIComponent(session.user.id)}`, { method: "DELETE" });
  }

  async function signOut() {
    try { if (session?.access_token) await authRequest("/logout", { method: "POST" }); } catch (error) { console.warn("Field Ops: logout não concluído.", error); }
    setSession(null);
    organizationId = null;
    emitStatus("offline");
  }

  window.FieldOpsSupabase = {
    configured,
    get session() { return session; },
    get organizationId() { return organizationId; },
    get status() { return lastStatus; },
    signInOrSignUp,
    signIn,
    signUp,
    resetPassword,
    updatePassword,
    bootstrapAccount,
    listAccessGrants,
    createAccessGrant,
    updateAccessGrant,
    loadUserState,
    loadPublicCatalog,
    uploadProductImages,
    syncCatalog,
    loadOrganizationSettings,
    saveOrganizationSettings,
    loadOperationalData,
    loadAuditEvents,
    createQuoteRecord,
    convertQuoteToOrderRemote,
    updateQuoteStatus,
    updateQuoteLossReason,
    queueSave,
    clearState,
    signOut,
    emitStatus
  };
  setSession(readStoredSession());
  const ready = setSession ? (session ? ensureValidSession().catch(() => setSession(null)) : Promise.resolve()) : Promise.resolve();
  window.FieldOpsSupabase.ready = ready;
  emitStatus(configured() ? (session ? "connected" : "ready") : "offline");
})(window);
