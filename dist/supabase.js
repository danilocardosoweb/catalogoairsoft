(function initFieldOpsSupabase(window) {
  const config = window.FIELD_OPS_SUPABASE_CONFIG || {};
  const url = String(config.url || "").replace(/\/$/, "");
  const anonKey = String(config.anonKey || "");
  const organizationSlug = String(config.organizationSlug || "suprimentos-oliveira");
  let session = null;
  let organizationId = null;
  let saveTimer = null;
  let pendingSnapshot = null;
  let lastStatus = "offline";

  function emitStatus(status, detail = "") {
    lastStatus = status;
    window.dispatchEvent(new CustomEvent("fieldops:cloud-status", { detail: { status, detail } }));
  }

  function configured() {
    return Boolean(url && anonKey);
  }

  async function request(base, path, options = {}) {
    if (!configured()) throw new Error("Supabase não configurado.");
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

  async function signIn(email, password) {
    const next = await authRequest("/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
    session = next;
    emitStatus("connected");
    return next;
  }

  async function signUp({ email, password, fullName, phone, role }) {
    const next = await authRequest("/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, data: { full_name: fullName, phone, preferred_role: role } })
    });
    session = next?.access_token ? next : null;
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
    const categoryRows = (snapshot.categories || []).map((category, index) => ({
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
    const brands = [...new Map((snapshot.products || []).map((product) => [String(product.brand || "FIELD OPS").trim().toUpperCase(), String(product.brand || "FIELD OPS").trim().toUpperCase()])).values()];
    const brandRows = brands.map((name) => ({ organization_id: organizationId, name, slug: slugify(name), is_active: true }));
    const savedBrands = await upsertRows("/brands", brandRows, "organization_id,slug");
    const brandIds = new Map((savedBrands || []).map((row) => [row.slug, row.id]));
    const sourceProducts = (snapshot.products || []).filter((product) => product.name);
    const productRows = sourceProducts.map((product, index) => {
      const sku = String(product.sku || `FO-${String(index + 1).padStart(5, "0")}`).trim().toUpperCase();
      const categorySlug = slugify(product.category || "Gear");
      const brandSlug = slugify(product.brand || "FIELD OPS");
      return {
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
        specs: product.specs || {},
        shipping: product.shipping || {},
        is_active: product.active !== false
      };
    });
    const savedProducts = await upsertRows("/products", productRows, "organization_id,sku");
    const productIds = new Map((savedProducts || []).map((row) => [row.sku, row.id]));
    const prices = productRows.map((row, index) => ({ product_id: productIds.get(row.sku), tier: "retail", amount: Math.max(0, Number(sourceProducts[index]?.price || 0)), currency: "BRL", is_active: true })).filter((row) => row.product_id);
    const inventory = productRows.map((row, index) => ({ product_id: productIds.get(row.sku), available_quantity: Math.max(0, Math.round(Number(sourceProducts[index]?.stockCount || 0))), reserved_quantity: 0, low_stock_threshold: 3 })).filter((row) => row.product_id);
    await Promise.all([
      upsertRows("/product_prices", prices, "product_id,tier"),
      upsertRows("/inventory", inventory, "product_id")
    ]);
  }

  function queueSave(snapshot) {
    pendingSnapshot = snapshot;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const next = pendingSnapshot;
      pendingSnapshot = null;
      if (!next || !session?.user?.id) return;
      try {
        await Promise.all([saveUserState(next), syncRelationalCatalog(next)]);
        emitStatus("connected");
      } catch (error) {
        emitStatus("error", error.message);
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
    const [categoryRows, productRows, bannerRows, radarRows, airdropRows] = await Promise.all([
      dataRequest(`/categories?organization_id=eq.${org.id}&is_active=eq.true&select=id,name,description,image_url,is_active,sort_order&order=sort_order.asc`),
      dataRequest(`/products?organization_id=eq.${org.id}&is_active=eq.true&select=id,sku,name,description,system,product_type,specs,shipping,is_active,brands(name),categories(name),product_prices(amount,tier,is_active),product_media(url,alt_text,is_primary,sort_order),inventory(available_quantity)`),
      dataRequest(`/banners?organization_id=eq.${org.id}&is_active=eq.true&select=id,name,media_type,media_url,eyebrow,title,title_accent,subtitle,cta_label,cta_target,is_active,sort_order&order=sort_order.asc`),
      dataRequest(`/radar_content?organization_id=eq.${org.id}&status=eq.published&select=*`),
      dataRequest(`/airdrops?organization_id=eq.${org.id}&is_active=eq.true&select=*`)
    ]);
    const products = (productRows || []).map((row) => {
      const price = (row.product_prices || []).find((item) => item.tier === "retail" && item.is_active !== false);
      const media = [...(row.product_media || [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || Number(a.sort_order) - Number(b.sort_order))[0];
      const inventory = row.inventory?.[0] || {};
      const brand = Array.isArray(row.brands) ? row.brands[0] : row.brands;
      const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
      return {
        id: row.sku || row.id,
        dbId: row.id,
        sku: row.sku,
        brand: brand?.name || "FIELD OPS",
        name: row.name,
        type: `${row.system || row.product_type || "FIELD GEAR"} · FIELD READY`,
        meta: row.product_type || "FIELD READY",
        price: Number(price?.amount || 0),
        stockCount: Number(inventory.available_quantity || 0),
        stock: Number(inventory.available_quantity || 0) > 0 ? "Em estoque" : "Fora de estoque",
        category: category?.name || "Gear",
        system: row.system || row.product_type || "FIELD GEAR",
        image: media?.url || "",
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
      banners: bannerRows || [],
      radarContents: radarRows || [],
      airdrops: airdropRows || []
    };
  }

  async function clearState() {
    if (!session?.user?.id) return;
    await dataRequest(`/user_app_state?user_id=eq.${encodeURIComponent(session.user.id)}`, { method: "DELETE" });
  }

  async function signOut() {
    try { if (session?.access_token) await authRequest("/logout", { method: "POST" }); } catch (error) { console.warn("Field Ops: logout não concluído.", error); }
    session = null;
    organizationId = null;
    emitStatus("offline");
  }

  window.FieldOpsSupabase = {
    configured,
    get session() { return session; },
    get organizationId() { return organizationId; },
    get status() { return lastStatus; },
    signInOrSignUp,
    bootstrapAccount,
    listAccessGrants,
    createAccessGrant,
    updateAccessGrant,
    loadUserState,
    loadPublicCatalog,
    queueSave,
    clearState,
    signOut,
    emitStatus
  };
  emitStatus(configured() ? "ready" : "offline");
})(window);
