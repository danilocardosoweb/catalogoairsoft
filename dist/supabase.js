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

  function queueSave(snapshot) {
    pendingSnapshot = snapshot;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const next = pendingSnapshot;
      pendingSnapshot = null;
      if (!next || !session?.user?.id) return;
      try {
        await saveUserState(next);
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
    loadUserState,
    loadPublicCatalog,
    queueSave,
    clearState,
    signOut,
    emitStatus
  };
  emitStatus(configured() ? "ready" : "offline");
})(window);
