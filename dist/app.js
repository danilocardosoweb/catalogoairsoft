const seedProducts = [
  {
    id: "neptune-10",
    brand: "ROSSI",
    name: "NEPTUNE 10\"",
    type: "AEG · ASSAULT RIFLE",
    meta: "380 FPS · V2",
    price: 1899,
    stock: "Em estoque",
    category: "Rifles",
    system: "AEG",
    image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg",
    specs: { FPS: "380", Gearbox: "V2", Peso: "2.8 KG", Sistema: "AEG", "Hop-Up": "Adjustable", Material: "Metal / Nylon" },
    description: "Uma plataforma equilibrada para quem quer consistência em campo e espaço para evoluir o próprio setup.",
    tag: "Destaque"
  },
  {
    id: "cm16-raider",
    brand: "G&G",
    name: "CM16 RAIDER",
    type: "AEG · CARBINE",
    meta: "350 FPS · V2",
    price: 1749,
    stock: "Em estoque",
    category: "Rifles",
    system: "AEG",
    image: "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82",
    specs: { FPS: "350", Gearbox: "V2", Peso: "2.4 KG", Sistema: "AEG", "Hop-Up": "Adjustable", Material: "Polymer / Metal" },
    description: "Carbine compacta com ergonomia pronta para partidas dinâmicas e upgrades de precisão.",
    tag: "Novo"
  },
  {
    id: "hi-capa-5-1",
    brand: "KJW",
    name: "HI-CAPA 5.1",
    type: "GBB · PISTOL",
    meta: "310 FPS · GAS",
    price: 999,
    stock: "Poucas unidades",
    category: "Pistolas",
    system: "GBB",
    image: "https://cdn.airsoftbazaar.com/uploads/listings/listing-mcuiii_2_Vm3Qfjev.jpg",
    specs: { FPS: "310", Gearbox: "—", Peso: "1.1 KG", Sistema: "GBB", "Hop-Up": "Adjustable", Material: "Metal" },
    description: "Sidearm responsiva com blowback realista, ideal para backup e jogos de curta distância.",
    tag: "Popular"
  },
  {
    id: "red-dot-rd1",
    brand: "VECTOR",
    name: "RD-1 RED DOT",
    type: "OPTIC · 1X",
    meta: "20 MM · RAIL",
    price: 429,
    stock: "Em estoque",
    category: "Ópticas",
    system: "Óptica",
    image: "https://images.unsplash.com/photo-1687726258745-8546ad8030d6?auto=format&fit=crop&w=1200&q=82",
    specs: { FPS: "—", Gearbox: "—", Peso: "0.2 KG", Sistema: "Óptica", "Hop-Up": "—", Material: "Alumínio" },
    description: "Aquisição rápida de alvo para complementar rifles compactos e plataformas de assalto.",
    tag: "Field ready"
  },
  {
    id: "plate-carrier-mk2",
    brand: "8FIELDS",
    name: "PLATE CARRIER MK2",
    type: "GEAR · CARRIER",
    meta: "MOLLE · ONE SIZE",
    price: 689,
    stock: "Em estoque",
    category: "Gear",
    system: "Equipamento",
    image: "https://images.unsplash.com/photo-1752559342576-dcbbfda3dbb7?auto=format&fit=crop&w=1200&q=82",
    specs: { FPS: "—", Gearbox: "—", Peso: "1.2 KG", Sistema: "Gear", "Hop-Up": "—", Material: "Cordura" },
    description: "Base modular para transportar o essencial sem comprometer mobilidade e conforto.",
    tag: "Gear"
  },
  {
    id: "bb-bio-025",
    brand: "BLS",
    name: "BIO BB 0.25G",
    type: "AMMO · 1 KG",
    meta: "BIODEGRADÁVEL",
    price: 119,
    stock: "Em estoque",
    category: "Munição",
    system: "Consumível",
    image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg",
    specs: { FPS: "—", Gearbox: "—", Peso: "1 KG", Sistema: "Munição", "Hop-Up": "—", Material: "PLA Bio" },
    description: "BBs biodegradáveis com acabamento consistente para treinos e operações em campo aberto.",
    tag: "Essencial"
  }
];

const products = JSON.parse(localStorage.getItem("fieldops-products") || "null") || seedProducts;
products.forEach((product, index) => {
  if (typeof product.stockCount !== "number") product.stockCount = product.id === "hi-capa-5-1" ? 12 : product.id === "bb-bio-025" ? 8 : 38 - index * 3;
  if (typeof product.active !== "boolean") product.active = true;
});

const categories = [
  { name: "Rifles", count: "124 itens", image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg" },
  { name: "Pistolas", count: "58 itens", image: "https://cdn.airsoftbazaar.com/uploads/listings/listing-mcuiii_2_Vm3Qfjev.jpg" },
  { name: "Ópticas", count: "36 itens", image: "https://images.unsplash.com/photo-1687726258745-8546ad8030d6?auto=format&fit=crop&w=900&q=82" },
  { name: "Gear", count: "89 itens", image: "https://images.unsplash.com/photo-1752559342576-dcbbfda3dbb7?auto=format&fit=crop&w=900&q=82" },
  { name: "Munição", count: "42 itens", image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg" },
  { name: "Proteção", count: "27 itens", image: "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=900&q=82" }
];

const defaultSettings = { whatsapp: "5511999999999", storeName: "Field Ops", city: "São Paulo", lowStock: 10 };
const storedSettings = JSON.parse(localStorage.getItem("fieldops-settings") || "null");

const state = {
  route: "home",
  selectedProduct: null,
  selectedQuoteId: null,
  search: "",
  category: "",
  sort: "relevance",
  filters: { systems: [], availability: "all", maxPrice: 5000 },
  cart: JSON.parse(localStorage.getItem("fieldops-cart") || "[]"),
  favorites: JSON.parse(localStorage.getItem("fieldops-favorites") || "[]"),
  compare: JSON.parse(localStorage.getItem("fieldops-compare") || "[]"),
  quotes: JSON.parse(localStorage.getItem("fieldops-quotes") || "[]"),
  orders: JSON.parse(localStorage.getItem("fieldops-orders") || "[]"),
  loadout: JSON.parse(localStorage.getItem("fieldops-loadout") || "null") || { Rifle: "neptune-10" },
  importData: null,
  adminProductSearch: "",
  account: JSON.parse(localStorage.getItem("fieldops-account") || "null"),
  profile: JSON.parse(localStorage.getItem("fieldops-profile") || "null"),
  recentSearches: JSON.parse(localStorage.getItem("fieldops-recent-searches") || "[]"),
  recentProducts: JSON.parse(localStorage.getItem("fieldops-recent-products") || "[]"),
  settings: { ...defaultSettings, ...(storedSettings || {}) },
  theme: localStorage.getItem("fieldops-theme") === "light" ? "light" : "dark",
  quoteSearch: "",
  quoteStatusFilter: "all",
  orderSearch: "",
  orderStatusFilter: "all",
  quantity: 1
};

const quoteStatuses = ["Novo", "Em análise", "Proposta enviada", "Aguardando cliente", "Aprovado", "Rejeitado", "Expirado", "Convertido em pedido", "Cancelado"];
const orderStatuses = ["Novo pedido", "Pagamento pendente", "Pagamento confirmado", "Preparando pedido", "Separação", "Pronto para envio", "Enviado", "Entregue", "Cancelado"];

function ensureQuoteShape(quote) {
  const subtotal = Number(quote.subtotal ?? quote.total ?? 0);
  const discount = Number(quote.discount || 0);
  const freight = Number(quote.freight || 0);
  const migratedStatus = quote.status === "Respondido" ? "Proposta enviada" : quote.status;
  const history = Array.isArray(quote.history) && quote.history.length ? quote.history : [{ at: quote.createdAt || new Date().toISOString(), actor: "Sistema", from: null, to: migratedStatus || "Novo", note: "Orçamento criado" }];
  return { ...quote, subtotal, discount, freight, total: Math.max(0, subtotal - discount + freight), status: quoteStatuses.includes(migratedStatus) ? migratedStatus : "Novo", shipping: { carrier: "", method: "", deadline: "", volumes: 1, weight: "", ...quote.shipping }, seller: quote.seller || "Operação local", origin: quote.origin || "Catálogo", validUntil: quote.validUntil || new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), internalNote: quote.internalNote || "", history };
}

function ensureOrderShape(order) {
  return { ...order, status: orderStatuses.includes(order.status) ? order.status : "Novo pedido", history: Array.isArray(order.history) && order.history.length ? order.history : [{ at: order.createdAt || new Date().toISOString(), actor: "Sistema", from: null, to: order.status || "Novo pedido", note: "Pedido criado" }], shipping: { carrier: "", method: "", deadline: "", volumes: 1, tracking: "", ...order.shipping } };
}

state.quotes = state.quotes.map(ensureQuoteShape);
state.orders = state.orders.map(ensureOrderShape);

const app = document.querySelector("#app");
const drawer = document.querySelector(".cart-drawer");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const modalLayer = document.querySelector("[data-modal-layer]");
const modalContent = document.querySelector("[data-modal-content]");
let heroInteractionCleanup = null;

const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const findProduct = (id) => products.find((product) => product.id === id);
const stockLabel = (product) => product.stockCount <= 0 ? "Indisponível" : product.stockCount <= state.settings.lowStock ? "Poucas unidades" : "Em estoque";
const catalogPriceMax = () => Math.max(2500, Math.ceil(Math.max(...activeProducts().map((product) => product.price), 2500) / 500) * 500);
const productFps = (product) => Number(String(product.specs?.FPS || "").match(/\d+(?:[.,]\d+)?/)?.[0]?.replace(",", ".") || 0);
const activeProducts = () => products.filter((product) => product.active !== false);
state.cart = state.cart.filter((item) => findProduct(item.id));
state.favorites = state.favorites.filter((id) => findProduct(id));
state.compare = state.compare.filter((id) => findProduct(id));

function updateThemeControls() {
  const isLight = state.theme === "light";
  document.querySelectorAll("[data-action=toggle-theme]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", isLight ? "Ativar modo noturno" : "Ativar modo claro");
    button.setAttribute("title", isLight ? "Ativar visão noturna" : "Ativar visão diurna");
    const label = button.querySelector("[data-theme-label]");
    if (label) label.textContent = isLight ? "DAY OPS / LIGHT" : "NVG / NIGHT";
  });
}

function applyTheme(theme, animate = false, origin = null) {
  const nextTheme = theme === "light" ? "light" : "dark";
  state.theme = nextTheme;
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("fieldops-theme", nextTheme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#f5f7f2" : "#0b0e0c");
  if (animate) {
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${origin?.clientX ?? window.innerWidth - 54}px`);
    root.style.setProperty("--theme-y", `${origin?.clientY ?? 38}px`);
    root.classList.remove("theme-switching");
    void root.offsetWidth;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 720);
  }
  updateThemeControls();
}

function toggleTheme(event) {
  const nextTheme = state.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme, true, event);
  showToast(nextTheme === "light" ? "Visão diurna ativada." : "Visão noturna ativada.");
}

function persist() {
  localStorage.setItem("fieldops-cart", JSON.stringify(state.cart));
  localStorage.setItem("fieldops-favorites", JSON.stringify(state.favorites));
  localStorage.setItem("fieldops-products", JSON.stringify(products));
  localStorage.setItem("fieldops-compare", JSON.stringify(state.compare));
  localStorage.setItem("fieldops-quotes", JSON.stringify(state.quotes));
  localStorage.setItem("fieldops-orders", JSON.stringify(state.orders));
  localStorage.setItem("fieldops-loadout", JSON.stringify(state.loadout));
  localStorage.setItem("fieldops-profile", JSON.stringify(state.profile));
  localStorage.setItem("fieldops-recent-searches", JSON.stringify(state.recentSearches));
  localStorage.setItem("fieldops-recent-products", JSON.stringify(state.recentProducts));
  localStorage.setItem("fieldops-settings", JSON.stringify(state.settings));
  localStorage.setItem("fieldops-theme", state.theme);
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  let result = activeProducts().filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.system}`.toLowerCase();
    const matchesSystem = !state.filters.systems.length || state.filters.systems.some((system) => product.system.toUpperCase().includes(system));
    const matchesAvailability = state.filters.availability === "all" || (state.filters.availability === "available" && product.stockCount > state.settings.lowStock) || (state.filters.availability === "low" && product.stockCount > 0 && product.stockCount <= state.settings.lowStock) || (state.filters.availability === "out" && product.stockCount <= 0);
    const matchesPrice = product.price <= Number(state.filters.maxPrice || catalogPriceMax());
    return (!query || haystack.includes(query)) && (!state.category || product.category === state.category) && matchesSystem && matchesAvailability && matchesPrice;
  });
  if (state.sort === "price-low") result = result.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") result = result.sort((a, b) => b.price - a.price);
  if (state.sort === "new") result = result.sort((a, b) => (a.tag === "Novo" ? -1 : 1) - (b.tag === "Novo" ? -1 : 1));
  return result;
}

function productCard(product) {
  const favorite = state.favorites.includes(product.id);
  return `<article class="product-card">
    <div class="product-image-wrap" data-product="${product.id}">
      ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      <div class="product-actions">
        <button type="button" data-favorite="${product.id}" class="${favorite ? "is-active" : ""}" aria-label="${favorite ? "Remover dos favoritos" : "Favoritar"}"><span class="icon icon-heart"></span></button>
        <button type="button" data-compare="${product.id}" aria-label="Comparar produto"><span class="icon icon-target"></span></button>
      </div>
      <img class="product-image" src="${product.image}" alt="${product.brand} ${product.name}" loading="lazy" />
      <div class="product-hover-specs">
        <div><span>Power</span><b>${product.specs.FPS}</b></div>
        <div><span>System</span><b>${product.specs.Sistema}</b></div>
        <div><span>Weight</span><b>${product.specs.Peso}</b></div>
        <div><span>Gear</span><b>${product.specs.Gearbox}</b></div>
      </div>
    </div>
    <div class="product-body">
      <span class="product-brand">${product.brand}</span>
      <strong class="product-name" data-product="${product.id}">${product.name}</strong>
      <span class="product-meta">${product.type} · ${product.meta}</span>
      <div class="product-foot"><div><strong class="price">${money(product.price)}</strong><span class="stock ${product.stockCount <= 0 ? "stock-out" : ""}">${stockLabel(product)}</span></div><button class="product-add" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name}" ${product.stockCount <= 0 ? "disabled" : ""}>+</button></div>
    </div>
  </article>`;
}

function searchBar() {
  return `<div class="search-zone container"><div class="search-bar"><span class="icon icon-search"></span><input id="global-search" value="${state.search}" placeholder="Buscar equipamento, marca ou categoria" autocomplete="off" /><button class="search-key" data-action="open-search" aria-label="Abrir busca avançada">⌘ K</button></div><div class="search-results" data-search-results></div></div>`;
}

function recommendedProducts() {
  const profile = state.profile || {};
  const style = profile.style || "assalto";
  const budget = Number(profile.budget || 5000);
  const weights = {
    assalto: { Rifles: 4, AEG: 3, Gear: 1 },
    precisao: { Rifles: 3, Ópticas: 3, AEG: 2 },
    proximidade: { Pistolas: 4, GBB: 3, Gear: 2 }
  }[style] || {};
  return activeProducts().map((product) => ({ product, score: (weights[product.category] || 0) + (weights[product.system] || 0) + (product.price <= budget ? 2 : -2) + (product.stockCount > 0 ? 1 : -2) })).sort((a, b) => b.score - a.score || a.product.price - b.product.price).map(({ product }) => product);
}

function profileLabel() {
  return { assalto: "Assalto", precisao: "Precisão", proximidade: "Proximidade" }[state.profile?.style] || "seu estilo";
}

function missionDeck() {
  const profile = state.profile;
  const recommendations = recommendedProducts().slice(0, 2);
  return `<section class="mission-deck"><div class="mission-intro"><div><span class="eyebrow">FIELD BRIEFING / ${profile ? "PERSONALIZADO" : "PRIMEIRO ACESSO"}</span><h2>${profile ? `Setup para ${profileLabel()}.` : "Qual é a sua missão?"}</h2><p>${profile ? "Seu catálogo foi ajustado ao seu estilo de jogo e faixa de investimento." : "Defina duas preferências e receba um ponto de partida feito para o seu próximo jogo."}</p></div><button class="mission-edit" data-action="profile-setup">${profile ? "Editar briefing" : "Começar briefing"} <span>↗</span></button></div><div class="mission-grid"><div class="mission-recommendation"><span class="mission-card-label">RECOMENDAÇÃO AGORA</span><div class="mission-product-list">${recommendations.map((product) => `<button class="mission-product" data-product="${product.id}"><img src="${product.image}" alt="" /><span><strong>${product.name}</strong><small>${product.brand} · ${money(product.price)}</small></span><b>↗</b></button>`).join("")}</div></div><div class="mission-actions"><button data-route="loadout"><span>01</span><strong>Montar loadout</strong><small>Escolha por etapa.</small></button><button data-action="open-search"><span>02</span><strong>Busca rápida</strong><small>Encontre por marca.</small></button></div></div></section>`;
}

function resumeStrip() {
  const items = state.recentProducts.map(findProduct).filter(Boolean);
  if (!items.length) return "";
  return `<section class="resume-strip"><div><span class="eyebrow">CONTINUE SUA OPERAÇÃO</span><strong>Você viu estes itens recentemente.</strong><button class="resume-clear" data-action="clear-recent">Limpar histórico</button></div><div class="resume-items">${items.map((product) => `<button class="resume-item" data-product="${product.id}"><img src="${product.image}" alt="" /><span><strong>${product.name}</strong><small>${money(product.price)}</small></span></button>`).join("")}</div></section>`;
}

function homePage() {
  const feature = recommendedProducts().slice(0, 4);
  return `<section class="page home-page">
    <section class="home-hero" data-hero-interactive aria-label="Banner interativo Field Ops">
      <video class="hero-video" data-hero-video src="videos/operator-airsoft.mp4" muted playsinline preload="auto" tabindex="-1" aria-hidden="true"></video>
      <div class="hero-video-shade" aria-hidden="true"></div>
      <div class="hero-content"><span class="hero-kicker">AIRSOFT EQUIPMENT / 01</span><h1 class="hero-title">DOMINE<br><em>O JOGO</em></h1><p class="hero-subtitle">Equipamentos, precisão e adrenalina para quem vive Airsoft.</p><button class="hero-cta" data-route="catalog">Explorar catálogo</button></div>
      <div class="hero-coordinates"><span>System // Online</span><span>Stock // Updated</span><span>Field // Ready</span></div><div class="hero-index"><strong>01</strong> / 04</div>
    </section>
    ${searchBar()}
    <div class="container">
      ${missionDeck()}
      ${resumeStrip()}
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">01 / ARSENAL</span><h2>Escolha sua<br>plataforma.</h2></div><p>O essencial para entrar em campo com o setup certo, do primeiro jogo ao próximo upgrade.</p></div><div class="category-grid">${categories.map((category) => `<button class="category-card" type="button" data-category="${category.name}" style="--category-image: url('${category.image}')"><span class="category-card-content"><strong>${category.name}</strong><small>${activeProducts().filter((product) => product.category === category.name).length} itens ↗</small></span></button>`).join("")}</div></section>
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">02 / CURATED GEAR</span><h2>Escolhas<br>de campo.</h2></div><a class="text-link" href="#catalog" data-route="catalog">Ver catálogo</a></div><div class="product-grid">${feature.map(productCard).join("")}</div></section>
      <section class="home-section"><div class="loadout-banner"><div class="loadout-copy"><span class="eyebrow">03 / BUILD YOUR LOADOUT</span><h2>Monte uma<br>vantagem.</h2><p>Combine arma, óptica, magazine e proteção em uma configuração que faz sentido para o seu próximo jogo.</p><button class="outline-cta" data-route="loadout">Montar loadout</button></div></div></section>
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">04 / BRANDS</span><h2>Marcas<br>em campo.</h2></div><a class="text-link" href="#brands" data-route="brands">Ver todas</a></div><div class="brand-strip">${["ROSSI", "G&G", "KJW", "BLS", "8FIELDS", "VECTOR"].map((brand) => `<button class="brand-pill" data-search-brand="${brand}">${brand}</button>`).join("")}</div></section>
    </div>
  </section>`;
}

function filterPanel() {
  const catOptions = ["Rifles", "Pistolas", "Ópticas", "Gear", "Munição"];
  const priceMax = catalogPriceMax();
  const selectedPrice = Math.min(Number(state.filters.maxPrice || priceMax), priceMax);
  return `<aside class="filter-panel"><div class="filter-header"><strong>Filter //</strong><small>LOADOUT</small></div><div class="filter-group"><h3>Categoria</h3>${catOptions.map((cat) => `<label class="filter-option"><input type="radio" data-filter-category name="catalog-category" value="${cat}" ${state.category === cat ? "checked" : ""}> ${cat}</label>`).join("")}<label class="filter-option"><input type="radio" data-filter-category name="catalog-category" value="" ${!state.category ? "checked" : ""}> Todas</label></div><div class="filter-group"><h3>Sistema</h3>${["AEG", "GBB", "HPA"].map((system) => `<label class="filter-option"><input type="checkbox" data-filter-system value="${system}" ${state.filters.systems.includes(system) ? "checked" : ""}> ${system}</label>`).join("")}</div><div class="filter-group"><h3>Disponibilidade</h3>${[["all", "Todos"], ["available", "Em estoque"], ["low", "Poucas unidades"], ["out", "Indisponível"]].map(([value, label]) => `<label class="filter-option"><input type="radio" data-filter-availability name="availability" value="${value}" ${state.filters.availability === value ? "checked" : ""}> ${label}</label>`).join("")}</div><div class="filter-group price-filter-group"><div class="filter-group-title"><h3>Preço máximo</h3><output data-price-output>${money(selectedPrice)}</output></div><input class="price-range" type="range" data-filter-price min="0" max="${priceMax}" step="50" value="${selectedPrice}" aria-label="Preço máximo" /></div></aside>`;
}

function filterSummary() {
  const chips = [];
  if (state.category) chips.push(`<button class="active-filter" data-clear-category>${state.category}</button>`);
  state.filters.systems.forEach((system) => chips.push(`<button class="active-filter" data-clear-system="${system}">${system}</button>`));
  if (state.filters.availability !== "all") chips.push(`<button class="active-filter" data-clear-availability>${{ available: "Em estoque", low: "Poucas unidades", out: "Indisponível" }[state.filters.availability]}</button>`);
  if (Number(state.filters.maxPrice) < catalogPriceMax()) chips.push(`<button class="active-filter" data-clear-price>Até ${money(state.filters.maxPrice)}</button>`);
  return chips.length ? `<div class="active-filters">${chips.join("")}<button class="active-filter active-filter-clear" data-clear-filters>Limpar tudo</button></div>` : "";
}

function catalogPage() {
  const list = filteredProducts();
  return `<section class="page catalog-page"><div class="container"><div class="page-heading"><div><span class="eyebrow">ARSENAL / CATALOG</span><h1>${state.category || "Equipamentos"}</h1></div><p>Itens selecionados para performance real em campo.</p></div><div class="catalog-layout">${filterPanel()}<div><div class="catalog-toolbar"><div class="result-count"><strong>${list.length} equipamentos</strong> encontrados</div><div style="display:flex;gap:8px;align-items:center"><button class="mobile-filter-button" data-action="filters"><span class="icon icon-filter"></span> Filtros</button><select class="sort-select" id="sort-products" aria-label="Ordenar produtos"><option value="relevance" ${state.sort === "relevance" ? "selected" : ""}>Relevância</option><option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Menor preço</option><option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Maior preço</option><option value="new" ${state.sort === "new" ? "selected" : ""}>Novidades</option></select></div></div>${filterSummary()}<div class="catalog-grid">${list.length ? list.map(productCard).join("") : `<div class="empty-state" style="grid-column:1/-1"><div><div class="empty-mark">⌖</div><h2>Nenhum equipamento encontrado.</h2><p>Tente remover os filtros ou buscar outra marca.</p><button class="outline-cta" data-clear-filters>Limpar filtros</button></div></div>`}</div></div></div></div></section>`;
}

function productPage(product) {
  return `<section class="page detail-page"><div class="container"><div class="breadcrumb"><a href="#catalog" data-route="catalog">Catálogo</a><span>/</span><a href="#catalog" data-route="catalog">${product.category}</a><span>/</span><b>${product.name}</b></div><div class="detail-grid"><div><div class="detail-gallery-main"><img src="${product.image}" alt="${product.brand} ${product.name}" /><span class="gallery-index">PRODUCT // ${String(products.indexOf(product) + 231).padStart(5, "0")}</span></div><div class="specs-panel"><div class="specs-title"><h2>Tech specs</h2><small>SYSTEM // ${product.system}</small></div><div class="specs-grid">${Object.entries(product.specs).map(([label, value]) => `<div class="spec-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div><div class="accordion"><details open><summary>Descrição</summary><p>${product.description}</p></details><details><summary>Conteúdo da embalagem</summary><p>Produto principal, magazine compatível e manual de operação.</p></details><details><summary>Compatibilidade</summary><p>Consulte o time Field Ops para validar acessórios e peças para o seu loadout.</p></details></div></div></div><div class="detail-info"><span class="detail-brand">${product.brand}</span><h1>${product.name}</h1><span class="detail-type">${product.type} / ${product.meta}</span><div class="detail-price">${money(product.price)}</div><div class="detail-stock"><span class="stock ${product.stockCount <= 0 ? "stock-out" : ""}">${stockLabel(product)}</span></div><div class="quantity-row"><div class="quantity-control"><button data-quantity="-" aria-label="Diminuir quantidade">−</button><span data-quantity-value>1</span><button data-quantity="+" aria-label="Aumentar quantidade">+</button></div><button class="primary-wide" data-add-detail="${product.id}" ${product.stockCount <= 0 ? "disabled" : ""}>${product.stockCount <= 0 ? "Indisponível" : "Adicionar ao carrinho"}</button></div><div class="detail-note">Você pode solicitar orçamento pelo WhatsApp no próximo passo.</div></div></div><section class="related-section"><div class="section-label"><div><span class="eyebrow">COMPLETE SEU LOADOUT</span><h2>A próxima<br>peça.</h2></div><a class="text-link" href="#loadout" data-route="loadout">Montar loadout</a></div><div class="product-grid">${activeProducts().filter((item) => item.id !== product.id).slice(0, 4).map(productCard).join("")}</div></section></div></section>`;
}

function loadoutPage() {
  const slotConfig = [["01", "Rifle", "Rifles"], ["02", "Óptica", "Ópticas"], ["03", "Magazine", "Acessórios"], ["04", "Munição", "Munição"], ["05", "Proteção", "Proteção"]];
  const selected = Object.values(state.loadout).map(findProduct).filter(Boolean);
  const main = selected[0] || products[0];
  const total = selected.reduce((sum, product) => sum + product.price, 0);
  return `<section class="page loadout-page"><div class="container"><div class="loadout-intro"><div><span class="eyebrow">LOADOUT BUILDER / 01</span><h1>Monte seu<br>loadout.</h1></div><p>Comece por uma plataforma. A gente organiza o restante para você entrar em campo preparado.</p></div><div class="loadout-builder"><div class="loadout-visual"><div class="loadout-selected"><div><span class="eyebrow">PRIMARY WEAPON</span><h2>${main.name}</h2></div><div class="loadout-price"><span>Loadout value</span><strong>${money(total)}</strong></div></div></div><div class="loadout-form"><div class="loadout-form-header"><div><span class="eyebrow">CONFIGURATION</span><h2>Build your kit.</h2></div><span class="step-count">${String(selected.length).padStart(2, "0")}/05</span></div>${slotConfig.map(([num, label, category]) => { const product = findProduct(state.loadout[label]); return `<div class="loadout-slot"><span class="slot-number">${num}</span><div class="slot-copy"><span>${label}</span><strong>${product ? product.name : `Escolha ${label.toLowerCase()}`}</strong></div><button class="slot-action" data-slot="${label}">${product ? "Editar" : "Escolher"}</button></div>`; }).join("")}<div class="loadout-form-footer"><small>Você pode alterar os itens a qualquer momento.</small><button class="primary-wide" data-action="add-loadout">Adicionar loadout</button></div></div></div></div></section>`;
}

function favoritesPage() {
  const list = activeProducts().filter((product) => state.favorites.includes(product.id));
  return `<section class="page catalog-page"><div class="container"><div class="page-heading"><div><span class="eyebrow">SAVED / FAVORITES</span><h1>Favoritos</h1></div><p>Seu equipamento salvo para revisar depois.</p></div>${list.length ? `<div class="catalog-grid">${list.map(productCard).join("")}</div>` : `<div class="empty-state"><div><div class="empty-mark">♡</div><h2>Seu arsenal está vazio.</h2><p>Salve produtos para comparar opções e voltar quando estiver pronto.</p><button class="outline-cta" data-route="catalog">Explorar catálogo</button></div></div>`}</div></section>`;
}

function brandsPage() {
  const brands = [...new Set(activeProducts().map((product) => product.brand))];
  return `<section class="page catalog-page"><div class="container"><div class="page-heading"><div><span class="eyebrow">ARSENAL / BRANDS</span><h1>Marcas.</h1></div><p>Fabricantes selecionados para diferentes estilos de jogo.</p></div><div class="brand-directory">${brands.map((brand, index) => `<button class="brand-directory-card" data-search-brand="${brand}"><span>0${index + 1}</span><strong>${brand}</strong><small>${activeProducts().filter((product) => product.brand === brand).length} produtos ↗</small></button>`).join("")}</div><div class="section-label brand-results-label"><div><span class="eyebrow">CURATED BRANDS</span><h2>Gear<br>em campo.</h2></div></div><div class="product-grid">${activeProducts().slice(0, 4).map(productCard).join("")}</div></div></section>`;
}

function compareBar() {
  if (!state.compare.length) return "";
  const compareProducts = state.compare.map(findProduct).filter(Boolean);
  return `<div class="compare-bar"><div><span class="eyebrow">COMPARE // ${compareProducts.length}/3</span><strong>${compareProducts.map((product) => product.name).join(" · ")}</strong></div><div class="compare-bar-actions"><button class="outline-cta" data-action="compare-clear">Limpar</button><button class="hero-cta" data-action="compare-open">Comparar agora</button></div></div>`;
}

function adminNav(active) {
  const items = [["admin", "Dashboard"], ["admin-products", "Produtos"], ["admin-stock", "Estoque"], ["admin-quotes", "Orçamentos"], ["admin-import", "Importações"]];
  return `<aside class="admin-sidebar"><div class="admin-side-brand"><span class="eyebrow">FIELD OPS / OPS</span><strong>Command<br>center.</strong></div><nav class="admin-menu">${items.map(([route, label]) => `<a href="#${route}" data-route="${route}" class="${active === route ? "active" : ""}"><span class="admin-menu-index">${String(items.indexOf(items.find((item) => item[0] === route)) + 1).padStart(2, "0")}</span>${label}</a>`).join("")}</nav><div class="admin-side-foot"><span class="status-dot"></span><span>OPERATIONAL MODE</span><small>v0.1 / PREVIEW</small></div></aside>`;
}

function downloadLocalFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function csvDocument(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers, ...rows.map((row) => headers.map((header) => row[header]))].map((row) => row.map(csvCell).join(";")).join("\r\n");
}

function exportDataModal() {
  openModal(`<span class="eyebrow">DATA / EXPORT</span><h2>Leve sua<br>operação.</h2><p>Exporte os dados salvos neste dispositivo para backup, análise ou migração.</p><div class="form-grid"><button class="modal-submit" data-action="export-backup">Backup completo · JSON</button><button class="outline-cta" data-action="export-products">Produtos e estoque · CSV</button><button class="outline-cta" data-action="export-quotes">Orçamentos e clientes · CSV</button></div>`);
}

function exportBackup() {
  closeModal();
  const payload = { exportedAt: new Date().toISOString(), source: "FIELD OPS", products, quotes: state.quotes, orders: state.orders, favorites: state.favorites, loadout: state.loadout, settings: state.settings, profile: state.profile };
  downloadLocalFile(`field-ops-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  showToast("Backup completo exportado.");
}

function exportProducts() {
  closeModal();
  const rows = activeProducts().map((product) => ({ sku: `FO-${String(products.indexOf(product) + 231).padStart(5, "0")}`, marca: product.brand, nome: product.name, categoria: product.category, sistema: product.system, preco: product.price, estoque: product.stockCount, status: stockLabel(product) }));
  downloadLocalFile(`field-ops-produtos-${new Date().toISOString().slice(0, 10)}.csv`, csvDocument(rows), "text/csv;charset=utf-8");
  showToast("Produtos e estoque exportados.");
}

function exportQuotes() {
  closeModal();
  const rows = state.quotes.map((quote) => ({ orcamento: quote.id, cliente: quote.customer, whatsapp: quote.phone || "", cidade: quote.city || "", status: quote.status, itens: (quote.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0), total: quote.total, criado_em: quote.createdAt }));
  downloadLocalFile(`field-ops-orcamentos-${new Date().toISOString().slice(0, 10)}.csv`, csvDocument(rows), "text/csv;charset=utf-8");
  showToast("Orçamentos e clientes exportados.");
}

function adminShell(active, kicker, title, body) {
  return `<section class="page admin-page"><div class="admin-layout">${adminNav(active)}<div class="admin-main"><div class="admin-topbar"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1></div><div class="admin-top-actions"><button class="outline-cta" data-action="export-data">Exportar dados</button><button class="outline-cta" data-route="catalog">Ver catálogo</button><button class="icon-button" data-action="account" aria-label="Abrir conta"><span class="icon icon-user"></span></button></div></div>${body}</div></div></section>`;
}

function adminDashboardPage() {
  return adminShell("admin", "01 / OVERVIEW", "Operational overview.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Produtos ativos</span><strong>428</strong><small class="trend-up">+12 este mês</small></div><div class="admin-kpi"><span>Orçamentos novos</span><strong>18</strong><small class="trend-up">+4 hoje</small></div><div class="admin-kpi"><span>Estoque baixo</span><strong>07</strong><small class="trend-warn">Revisar agora</small></div><div class="admin-kpi"><span>Sem estoque</span><strong>03</strong><small>Última atualização 11:42</small></div></div><div class="admin-content-grid"><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE INBOX</span><h2>Orçamentos recentes</h2></div><a href="#admin-quotes" data-route="admin-quotes" class="text-link">Ver todos</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Itens</th><th>Status</th></tr></thead><tbody><tr><td><strong>#ORC-000128</strong><small>Hoje, 11:42</small></td><td>Lucas Mendes</td><td>3 itens</td><td><span class="admin-status status-new">Novo</span></td></tr><tr><td><strong>#ORC-000127</strong><small>Hoje, 10:18</small></td><td>Bruno Azevedo</td><td>1 item</td><td><span class="admin-status status-progress">Em análise</span></td></tr><tr><td><strong>#ORC-000126</strong><small>Ontem, 18:07</small></td><td>Marina Costa</td><td>5 itens</td><td><span class="admin-status status-done">Respondido</span></td></tr></tbody></table></div></section><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">STOCK WATCH</span><h2>Atenção no estoque</h2></div><a href="#admin-stock" data-route="admin-stock" class="text-link">Abrir estoque</a></div><div class="stock-watch"><div><span class="stock-watch-bar" style="--bar:22%"></span><strong>BB BIO 0.25G</strong><small>8 unidades disponíveis</small><b>Baixo</b></div><div><span class="stock-watch-bar" style="--bar:38%"></span><strong>HI-CAPA 5.1</strong><small>12 unidades disponíveis</small><b>Baixo</b></div><div><span class="stock-watch-bar good" style="--bar:74%"></span><strong>CM16 RAIDER</strong><small>38 unidades disponíveis</small><b>Estável</b></div></div></section></div><section class="admin-panel quick-actions"><div class="admin-panel-head"><div><span class="eyebrow">FAST ACTIONS</span><h2>Próximo movimento</h2></div></div><div class="quick-action-grid"><button data-route="admin-products"><span>01</span><strong>Revisar produtos</strong><small>Editar dados, preço e status.</small></button><button data-route="admin-import"><span>02</span><strong>Importar planilha</strong><small>Mapear e validar novos itens.</small></button><button data-route="admin-stock"><span>03</span><strong>Corrigir estoque</strong><small>Ver itens abaixo do mínimo.</small></button></div></section>`);
}

function adminProductsPage() {
  return adminShell("admin-products", "02 / CATALOG", "Produtos.", `<div class="admin-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input placeholder="Buscar por produto, SKU ou marca" /></div><button class="hero-cta" data-route="admin-import">Importar planilha</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRODUCT REGISTER</span><h2>428 produtos ativos</h2></div><span class="admin-sync"><i class="status-dot"></i> Sincronizado agora</span></div><div class="admin-table-wrap"><table class="admin-table products-table"><thead><tr><th>Produto</th><th>SKU</th><th>Categoria</th><th>Estoque</th><th>Preço</th><th>Status</th></tr></thead><tbody>${products.slice(0, 5).map((product) => `<tr><td><div class="admin-product-cell"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · ${product.type}</small></div></div></td><td>FO-${String(products.indexOf(product) + 231).padStart(5, "0")}</td><td>${product.category}</td><td><strong>${product.id === "hi-capa-5-1" ? 12 : product.id === "bb-bio-025" ? 8 : 38}</strong><small>unidades</small></td><td><strong>${money(product.price)}</strong></td><td><span class="admin-status status-live">Publicado</span></td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminStockPage() {
  return adminShell("admin-stock", "03 / INVENTORY", "Estoque.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Estoque físico</span><strong>1.248</strong><small>unidades catalogadas</small></div><div class="admin-kpi"><span>Reservado</span><strong>84</strong><small>em orçamentos ativos</small></div><div class="admin-kpi"><span>Disponível</span><strong>1.164</strong><small class="trend-up">93% operacional</small></div></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">INVENTORY CONTROL</span><h2>Itens para revisão</h2></div><button class="outline-cta" data-route="admin-import">Atualizar por planilha</button></div><div class="inventory-list">${products.slice(0, 5).map((product, index) => `<div class="inventory-row"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · SKU FO-${String(index + 231).padStart(5, "0")}</small></div><div class="inventory-value"><strong>${index === 2 ? 12 : index === 4 ? 8 : 38}</strong><small>disponíveis</small></div><span class="admin-status ${index > 1 ? "status-low" : "status-live"}">${index > 1 ? "Revisar" : "Estável"}</span></div>`).join("")}</div></section>`);
}

function adminQuotesPage() {
  return adminShell("admin-quotes", "04 / COMMERCIAL", "Orçamentos.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE PIPELINE</span><h2>18 conversas abertas</h2></div><span class="admin-sync"><i class="status-dot"></i> WhatsApp preparado</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>06</strong><small>aguardando primeiro contato</small></div><div><span>EM ANÁLISE</span><strong>08</strong><small>time comercial em atendimento</small></div><div><span>RESPONDIDOS</span><strong>04</strong><small>últimas 24 horas</small></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Total estimado</th><th>Último contato</th><th>Status</th></tr></thead><tbody><tr><td><strong>#ORC-000128</strong></td><td>Lucas Mendes</td><td>R$ 2.328</td><td>Hoje, 11:42</td><td><span class="admin-status status-new">Novo</span></td></tr><tr><td><strong>#ORC-000127</strong></td><td>Bruno Azevedo</td><td>R$ 999</td><td>Hoje, 10:18</td><td><span class="admin-status status-progress">Em análise</span></td></tr></tbody></table></div></section>`);
}

function adminImportPage() {
  return adminShell("admin-import", "05 / DATA INTAKE", "Importar.", `<div class="import-steps"><div class="import-step active"><span>01</span><strong>Upload</strong><small>Enviar arquivo</small></div><div class="import-step"><span>02</span><strong>Analisar</strong><small>Detectar colunas</small></div><div class="import-step"><span>03</span><strong>Validar</strong><small>Revisar erros</small></div><div class="import-step"><span>04</span><strong>Importar</strong><small>Publicar registros</small></div></div><section class="admin-panel import-panel"><div class="admin-panel-head"><div><span class="eyebrow">EXCEL / CSV</span><h2>Traga seu inventário.</h2></div><span class="admin-sync">Mapeamento salvo: Produtos Field Ops</span></div><label class="dropzone"><input type="file" accept=".csv,.xlsx,.xls" /><span class="dropzone-mark">↑</span><strong>Solte sua planilha aqui</strong><small>CSV ou Excel até 10 MB</small><span class="outline-cta">Escolher arquivo</span></label><div class="import-preview"><div><span>Última análise</span><strong>1.248 encontrados</strong></div><div><span>Novos</span><strong>1.190</strong></div><div><span>Atualizações</span><strong>43</strong></div><div><span>Erros</span><strong class="import-error-count">15</strong></div></div><button class="hero-cta import-submit" data-action="simulate-import">Analisar arquivo</button></section>`);
}

function adminNav(active) {
  const items = [["admin", "Dashboard"], ["admin-products", "Produtos"], ["admin-stock", "Estoque"], ["admin-prices", "Preços"], ["admin-quotes", "Orçamentos"], ["admin-orders", "Pedidos"], ["admin-customers", "Clientes"], ["admin-import", "Importações"], ["admin-settings", "Configurações"]];
  return `<aside class="admin-sidebar"><div class="admin-side-brand"><span class="eyebrow">FIELD OPS / OPS</span><strong>Command<br>center.</strong></div><nav class="admin-menu">${items.map(([route, label], index) => `<a href="#${route}" data-route="${route}" class="${active === route ? "active" : ""}"><span class="admin-menu-index">${String(index + 1).padStart(2, "0")}</span>${label}</a>`).join("")}</nav><div class="admin-side-foot"><span class="status-dot"></span><span>OPERATIONAL MODE</span><small>v0.1 / LOCAL-FIRST</small></div></aside>`;
}

function adminDashboardPage() {
  const lowStock = activeProducts().filter((product) => product.stockCount <= state.settings.lowStock).length;
  const quoteCount = state.quotes.length + 2;
  return adminShell("admin", "01 / OVERVIEW", "Operational overview.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Produtos ativos</span><strong>${activeProducts().length}</strong><small class="trend-up">Catálogo local</small></div><div class="admin-kpi"><span>Orçamentos novos</span><strong>${quoteCount}</strong><small class="trend-up">salvos neste dispositivo</small></div><div class="admin-kpi"><span>Estoque baixo</span><strong>${String(lowStock).padStart(2, "0")}</strong><small class="trend-warn">Revisar agora</small></div><div class="admin-kpi"><span>Sem estoque</span><strong>${activeProducts().filter((product) => product.stockCount <= 0).length}</strong><small>Disponibilidade atual</small></div></div><div class="admin-content-grid"><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE INBOX</span><h2>Orçamentos recentes</h2></div><a href="#admin-quotes" data-route="admin-quotes" class="text-link">Ver todos</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Itens</th><th>Status</th></tr></thead><tbody>${(state.quotes.length ? state.quotes : [{ id: "ORC-000128", customer: "Exemplo de cliente", items: [{ quantity: 2 }], status: "Novo", total: 2328, createdAt: new Date().toISOString() }]).slice(0, 3).map((quote) => `<tr><td><strong>#${quote.id}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td>${quote.customer}</td><td>${quote.items.reduce((sum, item) => sum + item.quantity, 0)} itens</td><td><span class="admin-status ${quote.status === "Novo" ? "status-new" : quote.status === "Respondido" ? "status-done" : "status-progress"}">${quote.status}</span></td></tr>`).join("")}</tbody></table></div></section><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">STOCK WATCH</span><h2>Atenção no estoque</h2></div><a href="#admin-stock" data-route="admin-stock" class="text-link">Abrir estoque</a></div><div class="stock-watch">${activeProducts().filter((product) => product.stockCount <= state.settings.lowStock).slice(0, 3).map((product) => `<div><span class="stock-watch-bar" style="--bar:${Math.max(10, Math.min(100, product.stockCount * 7))}%"></span><strong>${product.name}</strong><small>${product.stockCount} unidades disponíveis</small><b>Baixo</b></div>`).join("") || `<p class="import-help">Nenhum item em nível crítico.</p>`}</div></section></div><section class="admin-panel quick-actions"><div class="admin-panel-head"><div><span class="eyebrow">FAST ACTIONS</span><h2>Próximo movimento</h2></div></div><div class="quick-action-grid"><button data-route="admin-products"><span>01</span><strong>Revisar produtos</strong><small>Editar dados, preço e status.</small></button><button data-route="admin-import"><span>02</span><strong>Importar planilha</strong><small>Mapear e validar novos itens.</small></button><button data-route="admin-prices"><span>03</span><strong>Atualizar preços</strong><small>Revisar varejo e grupos.</small></button></div></section>`);
}

function adminStockPage() {
  const physical = activeProducts().reduce((sum, product) => sum + product.stockCount, 0);
  return adminShell("admin-stock", "03 / INVENTORY", "Estoque.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Estoque físico</span><strong>${physical}</strong><small>unidades catalogadas</small></div><div class="admin-kpi"><span>Reservado</span><strong>${state.quotes.length}</strong><small>em orçamentos ativos</small></div><div class="admin-kpi"><span>Disponível</span><strong>${Math.max(0, physical - state.quotes.length)}</strong><small class="trend-up">cálculo local</small></div></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">INVENTORY CONTROL</span><h2>Itens para revisão</h2></div><button class="outline-cta" data-route="admin-import">Atualizar por planilha</button></div><div class="inventory-list">${activeProducts().map((product, index) => `<div class="inventory-row"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · SKU FO-${String(index + 231).padStart(5, "0")}</small></div><div class="inventory-value"><strong>${product.stockCount}</strong><small>disponíveis</small></div><span class="admin-status ${product.stockCount <= state.settings.lowStock ? "status-low" : "status-live"}">${product.stockCount <= state.settings.lowStock ? "Revisar" : "Estável"}</span><button class="status-action" data-stock-edit="${product.id}">Ajustar</button></div>`).join("")}</div></section>`);
}

function adminPricesPage() {
  return adminShell("admin-prices", "04 / PRICING", "Preços.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRICE TABLES</span><h2>Varejo e grupos.</h2></div><span class="admin-sync"><i class="status-dot"></i> Tabela base ativa</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Produto</th><th>Varejo</th><th>Lojista</th><th>Distribuidor</th><th>Atualizado</th><th>Ação</th></tr></thead><tbody>${activeProducts().map((product) => `<tr><td><strong>${product.name}</strong><small>${product.brand} · ${product.category}</small></td><td><strong>${money(product.price)}</strong></td><td>${money(product.price * .9)}</td><td>${money(product.price * .82)}</td><td>Agora</td><td><button class="status-action" data-edit-price="${product.id}">Editar</button></td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminCustomersPage() {
  const customers = state.quotes.map((quote) => ({ name: quote.customer, phone: quote.phone || "Não informado", type: "Consumidor", quotes: 1 }));
  return adminShell("admin-customers", "06 / RELATIONSHIP", "Clientes.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">CUSTOMER REGISTER</span><h2>${customers.length || 1} clientes identificados</h2></div><span class="admin-sync">Dados locais do MVP</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Cliente</th><th>WhatsApp</th><th>Tipo</th><th>Orçamentos</th></tr></thead><tbody>${customers.length ? customers.map((customer) => `<tr><td><strong>${customer.name}</strong><small>Perfil Field Ops</small></td><td>${customer.phone}</td><td>${customer.type}</td><td>${customer.quotes}</td></tr>`).join("") : `<tr><td colspan="4"><div class="admin-inline-empty">Os clientes aparecerão aqui após o primeiro orçamento.</div></td></tr>`}</tbody></table></div></section>`);
}

function adminSettingsPage() {
  return adminShell("admin-settings", "07 / SYSTEM", "Configurações.", `<section class="admin-panel settings-panel"><div class="admin-panel-head"><div><span class="eyebrow">STORE CONTROL</span><h2>Dados da operação.</h2></div><span class="admin-sync"><i class="status-dot"></i> Salvo neste dispositivo</span></div><p class="settings-intro">Ajuste os dados que aparecem no atendimento e defina quando o estoque deve pedir revisão.</p><form class="settings-form" id="settings-form"><div class="form-row"><label class="form-label">Nome da operação<input name="storeName" required value="${state.settings.storeName}" /></label><label class="form-label">Cidade<input name="city" required value="${state.settings.city}" /></label></div><div class="form-row"><label class="form-label">WhatsApp do atendimento<input name="whatsapp" required inputmode="tel" value="${state.settings.whatsapp}" placeholder="5511999999999" /></label><label class="form-label">Alerta de estoque baixo<input name="lowStock" required type="number" min="0" step="1" value="${state.settings.lowStock}" /></label></div><div class="settings-preview"><span class="eyebrow">ATENDIMENTO</span><strong>${state.settings.storeName} · ${state.settings.city}</strong><small>Orçamentos serão direcionados para ${state.settings.whatsapp}.</small></div><div class="settings-actions"><button class="hero-cta" type="submit">Salvar configurações</button><button class="outline-cta" type="button" data-action="reset-local-data">Restaurar dados demo</button></div></form></section>`);
}

function adminProductsPage() {
  const query = state.adminProductSearch.trim().toLowerCase();
  const list = activeProducts().filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query));
  return adminShell("admin-products", "02 / CATALOG", "Produtos.", `<div class="admin-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input id="admin-product-search" value="${state.adminProductSearch}" placeholder="Buscar por produto, marca ou categoria" /></div><button class="hero-cta" data-action="product-new">Novo produto</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRODUCT REGISTER</span><h2>${list.length} produtos ativos</h2></div><span class="admin-sync"><i class="status-dot"></i> Salvo neste dispositivo</span></div><div class="admin-table-wrap"><table class="admin-table products-table"><thead><tr><th>Produto</th><th>SKU</th><th>Categoria</th><th>Estoque</th><th>Preço</th><th>Status</th><th>Ações</th></tr></thead><tbody>${list.length ? list.map((product) => `<tr><td><div class="admin-product-cell"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · ${product.type}</small></div></div></td><td>FO-${String(products.indexOf(product) + 231).padStart(5, "0")}</td><td>${product.category}</td><td><strong>${product.stockCount}</strong><small>unidades</small></td><td><strong>${money(product.price)}</strong></td><td><span class="admin-status ${product.active === false ? "status-low" : "status-live"}">${product.active === false ? "Desativado" : "Publicado"}</span></td><td><div class="admin-row-actions"><button data-edit-product="${product.id}" aria-label="Editar ${product.name}">Editar</button><button data-duplicate-product="${product.id}" aria-label="Duplicar ${product.name}">Duplicar</button><button data-delete-product="${product.id}" aria-label="Excluir ${product.name}">Excluir</button></div></td></tr>`).join("") : `<tr><td colspan="7"><div class="admin-inline-empty">Nenhum produto corresponde à busca.</div></td></tr>`}</tbody></table></div></section>`);
}

function adminQuotesPage() {
  const demo = [{ id: "ORC-000128", customer: "Lucas Mendes", total: 2328, status: "Novo", createdAt: new Date().toISOString(), items: [{ quantity: 3 }] }, { id: "ORC-000127", customer: "Bruno Azevedo", total: 999, status: "Em análise", createdAt: new Date(Date.now() - 3600000).toISOString(), items: [{ quantity: 1 }] }];
  const quotes = [...state.quotes, ...demo];
  return adminShell("admin-quotes", "04 / COMMERCIAL", "Orçamentos.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE PIPELINE</span><h2>${quotes.length} conversas abertas</h2></div><span class="admin-sync"><i class="status-dot"></i> WhatsApp preparado</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>${quotes.filter((quote) => quote.status === "Novo").length}</strong><small>aguardando primeiro contato</small></div><div><span>EM ANÁLISE</span><strong>${quotes.filter((quote) => quote.status === "Em análise").length}</strong><small>time comercial em atendimento</small></div><div><span>RESPONDIDOS</span><strong>${quotes.filter((quote) => quote.status === "Respondido").length}</strong><small>últimas 24 horas</small></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Total estimado</th><th>Itens</th><th>Status</th><th>Ação</th></tr></thead><tbody>${quotes.map((quote) => `<tr><td><strong>#${quote.id.replace("ORC-", "ORC-")}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td>${quote.customer}</td><td>${money(quote.total)}</td><td>${quote.items.reduce((sum, item) => sum + item.quantity, 0)} itens</td><td><span class="admin-status ${quote.status === "Novo" ? "status-new" : quote.status === "Respondido" ? "status-done" : "status-progress"}">${quote.status}</span></td><td>${state.quotes.some((saved) => saved.id === quote.id) ? `<button class="status-action" data-quote-status="${quote.id}">Avançar</button>` : `<span class="admin-table-muted">Demo</span>`}</td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminImportPage() {
  const preview = state.importData;
  return adminShell("admin-import", "05 / DATA INTAKE", "Importar.", `<div class="import-steps"><div class="import-step ${preview ? "done" : "active"}"><span>01</span><strong>Upload</strong><small>Enviar arquivo</small></div><div class="import-step ${preview ? "active" : ""}"><span>02</span><strong>Analisar</strong><small>Detectar colunas</small></div><div class="import-step"><span>03</span><strong>Validar</strong><small>Revisar erros</small></div><div class="import-step"><span>04</span><strong>Importar</strong><small>Publicar registros</small></div></div><section class="admin-panel import-panel"><div class="admin-panel-head"><div><span class="eyebrow">EXCEL / CSV</span><h2>${preview ? "Revise sua carga." : "Traga seu inventário."}</h2></div><span class="admin-sync">Mapeamento salvo: Produtos Field Ops</span></div>${preview ? `<div class="import-file-banner"><span class="dropzone-mark">✓</span><div><strong>${preview.fileName}</strong><small>${preview.validCount} registros válidos · ${preview.errorCount} erros de linha</small></div><button class="outline-cta" data-action="import-reset">Escolher outro</button></div><div class="import-preview"><div><span>Encontrados</span><strong>${preview.rows.length}</strong></div><div><span>Novos</span><strong>${preview.validCount}</strong></div><div><span>Atualizações</span><strong>0</strong></div><div><span>Erros</span><strong class="import-error-count">${preview.errorCount}</strong></div></div><div class="admin-table-wrap import-table"><table class="admin-table"><thead><tr>${preview.headers.slice(0, 5).map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${preview.rows.slice(0, 5).map((row) => `<tr>${preview.headers.slice(0, 5).map((header) => `<td>${row[header.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_")] || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="import-actions"><button class="outline-cta" data-action="import-reset">Cancelar</button><button class="hero-cta" data-action="commit-import" ${preview.validCount ? "" : "disabled"}>Importar ${preview.validCount} produtos</button></div>` : `<label class="dropzone"><input id="import-file" type="file" accept=".csv,.xlsx,.xls" /><span class="dropzone-mark">↑</span><strong>Solte sua planilha aqui</strong><small>CSV ou Excel até 10 MB</small><span class="outline-cta">Escolher arquivo</span></label><div class="import-preview"><div><span>Última análise</span><strong>—</strong></div><div><span>Novos</span><strong>—</strong></div><div><span>Atualizações</span><strong>—</strong></div><div><span>Erros</span><strong>—</strong></div></div><p class="import-help">O arquivo precisa conter pelo menos uma coluna <strong>Nome Produto</strong> ou <strong>product_name</strong>. Outras colunas aceitas: marca, categoria, preço, estoque, sistema, sku, fps.</p>`}</section>`);
}

function quoteDemoData() {
  return [{ id: "ORC-000128", customer: "Lucas Mendes", phone: "", city: "São Paulo / SP", subtotal: 2328, discount: 0, freight: 0, total: 2328, status: "Novo", origin: "Catálogo", seller: "Operação demo", createdAt: new Date().toISOString(), items: [{ id: "neptune-10", quantity: 1 }, { id: "red-dot-rd1", quantity: 1 }] }, { id: "ORC-000127", customer: "Bruno Azevedo", phone: "", city: "Campinas / SP", subtotal: 999, discount: 0, freight: 0, total: 999, status: "Em análise", origin: "WhatsApp", seller: "Operação demo", createdAt: new Date(Date.now() - 3600000).toISOString(), items: [{ id: "hi-capa-5-1", quantity: 1 }] }];
}

function quoteCollection() {
  return [...state.quotes, ...quoteDemoData()];
}

function quoteStatusClass(status) {
  if (status === "Novo") return "status-new";
  if (["Aprovado", "Convertido em pedido"].includes(status)) return "status-done";
  if (["Rejeitado", "Cancelado"].includes(status)) return "status-danger";
  if (status === "Expirado") return "status-low";
  if (status === "Aguardando cliente") return "status-wait";
  return "status-progress";
}

function quoteItems(quote) {
  return (quote.items || []).map((item) => ({ ...item, product: findProduct(item.id) })).filter((item) => item.product || item.name);
}

function quoteSummary(quote) {
  const items = quoteItems(quote).map((item) => `${item.quantity}x ${item.product?.name || item.name || item.id}`).join("\n");
  return [`Orçamento ${quote.id}`, `Cliente: ${quote.customer}`, `WhatsApp: ${quote.phone || "Não informado"}`, `Cidade: ${quote.city || "Não informada"}`, `Validade: ${quote.validUntil || "Não definida"}`, "", "Itens:", items || "Nenhum item detalhado", "", `Subtotal: ${money(quote.subtotal || quote.total)}`, `Desconto: ${money(quote.discount || 0)}`, `Frete: ${money(quote.freight || 0)}`, `Total final: ${money(quote.total)}`, `Status: ${quote.status}`, quote.note && quote.note !== "—" ? `Observação: ${quote.note}` : ""].filter(Boolean).join("\n");
}

function nextQuoteId() {
  const last = state.quotes.reduce((highest, quote) => Math.max(highest, Number(String(quote.id).match(/(\d+)$/)?.[1] || 0)), 128);
  return `ORC-${String(last + 1).padStart(6, "0")}`;
}

function adminQuotesWorkspace() {
  const allQuotes = quoteCollection();
  const query = state.quoteSearch.trim().toLowerCase();
  const list = allQuotes.filter((quote) => {
    const itemSearch = quoteItems(quote).map((item) => `${item.product?.name || item.name || ""} ${item.product?.meta || ""} ${item.product?.id || item.id || ""}`).join(" ");
    const matchesQuery = !query || `${quote.id} ${quote.customer} ${quote.phone || ""} ${itemSearch}`.toLowerCase().includes(query);
    const matchesStatus = state.quoteStatusFilter === "all" || quote.status === state.quoteStatusFilter;
    return matchesQuery && matchesStatus;
  });
  return adminShell("admin-quotes", "04 / COMMERCIAL", "Orçamentos.", `<div class="admin-toolbar quote-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input id="quote-search" value="${state.quoteSearch}" placeholder="Buscar por número, cliente, produto ou SKU" /></div><select class="quote-status-filter" id="quote-status-filter" aria-label="Filtrar orçamentos por status"><option value="all" ${state.quoteStatusFilter === "all" ? "selected" : ""}>Todos os status</option>${quoteStatuses.map((status) => `<option value="${status}" ${state.quoteStatusFilter === status ? "selected" : ""}>${status}</option>`).join("")}</select><button class="hero-cta" data-action="quote-new">Novo orçamento</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE PIPELINE</span><h2>${list.length} conversas na visão atual</h2></div><span class="admin-sync"><i class="status-dot"></i> ${state.quotes.length} salvos neste dispositivo</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>${allQuotes.filter((quote) => quote.status === "Novo").length}</strong><small>aguardando primeiro contato</small></div><div><span>EM ANÁLISE</span><strong>${allQuotes.filter((quote) => ["Em análise", "Proposta enviada", "Aguardando cliente"].includes(quote.status)).length}</strong><small>propostas em atendimento</small></div><div><span>APROVADOS</span><strong>${allQuotes.filter((quote) => ["Aprovado", "Convertido em pedido"].includes(quote.status)).length}</strong><small>prontos para virar pedido</small></div></div><div class="admin-table-wrap"><table class="admin-table quotes-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Total estimado</th><th>Itens</th><th>Status</th><th>Ações</th></tr></thead><tbody>${list.length ? list.map((quote) => { const saved = state.quotes.some((item) => item.id === quote.id); return `<tr><td><strong>#${quote.id}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td><strong>${quote.customer}</strong><small>${quote.phone || "WhatsApp não informado"}</small></td><td><strong>${money(quote.total)}</strong></td><td>${(quote.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)} itens</td><td><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></td><td><div class="admin-row-actions quote-row-actions"><button data-action="quote-view" data-quote-id="${quote.id}">Ver</button>${saved ? `<button data-action="quote-advance" data-quote-id="${quote.id}">Avançar</button>` : `<span class="admin-table-muted">Demo</span>`}</div></td></tr>`; }).join("") : `<tr><td colspan="6"><div class="admin-inline-empty">Nenhum orçamento corresponde aos filtros atuais.</div></td></tr>`}</tbody></table></div></section>`);
}

function quoteDetailModal(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return;
  const saved = state.quotes.some((item) => item.id === quote.id);
  const items = quoteItems(quote);
  openModal(`<span class="eyebrow">QUOTE / ${quote.id}</span><h2>Detalhes do<br>orçamento.</h2><div class="quote-detail-head"><div><strong>${quote.customer}</strong><small>${quote.phone || "WhatsApp não informado"} · ${quote.city || "Cidade não informada"}</small></div><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></div><div class="quote-detail-items">${items.length ? items.map((item) => `<div class="quote-detail-item"><div><strong>${item.product?.name || item.name || item.id}</strong><small>${item.product?.brand || "Produto registrado"} · ${item.quantity} unidade(s)</small></div><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b></div>`).join("") : `<p class="admin-inline-empty">Este orçamento não possui itens detalhados.</p>`}</div><div class="summary-row total"><span>Total estimado</span><strong>${money(quote.total)}</strong></div>${quote.note && quote.note !== "—" ? `<div class="quote-note"><span>OBSERVAÇÃO</span><p>${quote.note}</p></div>` : ""}<div class="quote-detail-actions"><button class="hero-cta" data-action="quote-advance" data-quote-id="${quote.id}" ${saved ? "" : "disabled"}>${saved ? "Avançar status" : "Demonstração"}</button><button class="outline-cta" data-action="quote-copy" data-quote-id="${quote.id}">Copiar resumo</button>${quote.phone ? `<button class="outline-cta" data-action="quote-whatsapp" data-quote-id="${quote.id}">WhatsApp cliente ↗</button>` : ""}${saved ? `<button class="danger-cta" data-action="quote-delete" data-quote-id="${quote.id}">Excluir orçamento</button>` : ""}</div>`);
}

function quoteCreateModal() {
  openModal(`<span class="eyebrow">QUOTE / NEW REQUEST</span><h2>Novo<br>orçamento.</h2><p>Registre uma solicitação recebida por telefone, balcão ou atendimento direto.</p><form class="form-grid" id="admin-quote-form"><div class="form-row"><label class="form-label">Nome do cliente<input name="name" required placeholder="Nome completo" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">Cidade<input name="city" placeholder="São Paulo" /></label><label class="form-label">Produto principal<select name="productId" required>${activeProducts().map((product) => `<option value="${product.id}">${product.name} · ${money(product.price)}</option>`).join("")}</select></label></div><label class="form-label">Quantidade<input name="quantity" type="number" min="1" step="1" value="1" required /></label><label class="form-label">Observação<textarea name="note" placeholder="Preferências, prazo ou contexto do atendimento"></textarea></label><button class="modal-submit" type="submit">Criar orçamento</button></form>`);
  document.querySelector("#admin-quote-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const product = findProduct(form.get("productId"));
    if (!product) return;
    const quantity = Math.max(1, Number(form.get("quantity")) || 1);
    state.quotes.unshift({ id: nextQuoteId(), customer: form.get("name").toString().trim(), phone: form.get("phone").toString().trim(), city: form.get("city")?.toString().trim() || "—", note: form.get("note")?.toString().trim() || "—", total: product.price * quantity, status: "Novo", createdAt: new Date().toISOString(), items: [{ id: product.id, quantity }] });
    persist();
    closeModal();
    render();
    showToast("Orçamento criado.");
  });
}

function copyQuoteSummary(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return;
  if (!navigator.clipboard?.writeText) { showToast("Não foi possível copiar neste navegador."); return; }
  navigator.clipboard.writeText(quoteSummary(quote)).then(() => showToast("Resumo copiado."), () => showToast("Não foi possível copiar neste navegador."));
}

function openQuoteWhatsApp(id) {
  const quote = state.quotes.find((item) => item.id === id) || quoteDemoData().find((item) => item.id === id);
  const phone = String(quote?.phone || "").replace(/\D/g, "");
  if (!quote || phone.length < 10) { showToast("Este orçamento não tem um WhatsApp válido."); return; }
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`${quoteSummary(quote)}\n\nVer proposta: ${quoteShareLink(quote)}`)}`, "_blank", "noopener,noreferrer");
}

function deleteQuote(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote || !window.confirm(`Excluir o orçamento ${quote.id}?`)) return;
  state.quotes = state.quotes.filter((item) => item.id !== id);
  persist();
  closeModal();
  render();
  showToast("Orçamento excluído.");
}

function addQuoteHistory(quote, status, note, actor = "Operação local") {
  const from = quote.status;
  quote.status = status;
  quote.history = [...(quote.history || []), { at: new Date().toISOString(), actor, from, to: status, note }];
}

function quoteShareLink(quote) {
  return `${location.origin}${location.pathname}#quote/${quote.id}`;
}

function quoteDetailModalV2(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return;
  const saved = state.quotes.some((item) => item.id === quote.id);
  const items = quoteItems(quote);
  const history = [...(quote.history || [])].reverse();
  openModal(`<span class="eyebrow">QUOTE / ${quote.id}</span><h2>Central do<br>orçamento.</h2><div class="quote-detail-head"><div><strong>${quote.customer}</strong><small>${quote.phone || "WhatsApp não informado"} · ${quote.city || "Cidade não informada"}</small></div><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">CUSTOMER / CLIENTE</span><strong>Dados do atendimento</strong></div><div class="quote-info-grid"><div><span>CPF / CNPJ</span><strong>${quote.document || "Não informado"}</strong></div><div><span>CEP</span><strong>${quote.zip || "Não informado"}</strong></div><div><span>Vendedor</span><strong>${quote.seller || "Não informado"}</strong></div><div><span>Origem</span><strong>${quote.origin || "Catálogo"}</strong></div><div><span>Validade</span><strong>${quote.validUntil ? new Date(`${quote.validUntil}T12:00:00`).toLocaleDateString("pt-BR") : "Não definida"}</strong></div><div><span>Pedido relacionado</span><strong>${quote.orderId || "Ainda não convertido"}</strong></div></div></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">ITEMS / PRODUTOS</span><strong>${items.length} item(ns) no orçamento</strong></div><div class="quote-detail-items">${items.length ? items.map((item) => `<div class="quote-detail-item"><div><strong>${item.product?.name || item.name || item.id}</strong><small>${item.product?.brand || "Produto registrado"} · SKU ${item.product?.id || item.id || "—"} · ${item.quantity} unidade(s)</small></div><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b></div>`).join("") : `<p class="admin-inline-empty">Este orçamento não possui itens detalhados.</p>`}</div></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">FULFILLMENT / ENTREGA</span><strong>Frete e condições</strong></div><div class="quote-info-grid"><div><span>Transportadora</span><strong>${quote.shipping?.carrier || "A definir"}</strong></div><div><span>Modalidade</span><strong>${quote.shipping?.method || "A definir"}</strong></div><div><span>Prazo</span><strong>${quote.shipping?.deadline || "A definir"}</strong></div><div><span>Volumes</span><strong>${quote.shipping?.volumes || 1}</strong></div></div></div><div class="quote-financial"><div><span>Subtotal dos produtos</span><strong>${money(quote.subtotal)}</strong></div><div><span>Descontos</span><strong>− ${money(quote.discount)}</strong></div><div><span>Frete</span><strong>${money(quote.freight)}</strong></div><div class="quote-total"><span>Total final</span><strong>${money(quote.total)}</strong></div></div>${quote.note && quote.note !== "—" ? `<div class="quote-note"><span>OBSERVAÇÃO DO CLIENTE</span><p>${quote.note}</p></div>` : ""}${quote.internalNote ? `<div class="quote-note internal"><span>OBSERVAÇÃO INTERNA</span><p>${quote.internalNote}</p></div>` : ""}<div class="quote-history"><div class="quote-section-title"><span class="eyebrow">TRACE / HISTÓRICO</span><strong>Rastreabilidade</strong></div>${history.length ? `<div class="quote-timeline">${history.map((entry) => `<div class="quote-timeline-item"><i></i><div><strong>${entry.from ? `${entry.from} → ` : ""}${entry.to}</strong><small>${new Date(entry.at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · ${entry.actor}</small><p>${entry.note || "Atualização registrada."}</p></div></div>`).join("")}</div>` : `<p class="admin-inline-empty">Nenhum evento registrado.</p>`}</div><div class="quote-detail-actions"><button class="hero-cta" data-action="quote-edit" data-quote-id="${quote.id}" ${saved ? "" : "disabled"}>Editar condições</button><button class="outline-cta" data-action="quote-advance" data-quote-id="${quote.id}" ${saved ? "" : "disabled"}>Avançar etapa</button>${saved && quote.status === "Aprovado" ? `<button class="hero-cta" data-action="quote-convert" data-quote-id="${quote.id}">Converter em pedido</button>` : ""}<button class="outline-cta" data-action="quote-copy" data-quote-id="${quote.id}">Copiar resumo</button><button class="outline-cta" data-action="quote-share" data-quote-id="${quote.id}">Copiar link</button>${quote.phone ? `<button class="outline-cta" data-action="quote-whatsapp" data-quote-id="${quote.id}">WhatsApp cliente ↗</button>` : ""}${saved ? `<button class="danger-cta" data-action="quote-delete" data-quote-id="${quote.id}">Excluir orçamento</button>` : ""}</div>`);
}

function quoteEditModal(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote) return;
  openModal(`<span class="eyebrow">QUOTE / ${quote.id} / EDIT</span><h2>Editar<br>condições.</h2><p>Atualize a proposta sem perder o histórico de alterações.</p><form class="form-grid" id="quote-edit-form"><div class="form-row"><label class="form-label">Status<select name="status">${quoteStatuses.map((status) => `<option value="${status}" ${quote.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><label class="form-label">Vendedor<input name="seller" value="${quote.seller || ""}" placeholder="Responsável" /></label></div><div class="form-row"><label class="form-label">Desconto<input name="discount" type="number" min="0" step="1" value="${quote.discount || 0}" /></label><label class="form-label">Frete<input name="freight" type="number" min="0" step="1" value="${quote.freight || 0}" /></label></div><div class="form-row"><label class="form-label">Transportadora<input name="carrier" value="${quote.shipping?.carrier || ""}" placeholder="A definir" /></label><label class="form-label">Modalidade<input name="method" value="${quote.shipping?.method || ""}" placeholder="PAC, retirada, motoboy..." /></label></div><div class="form-row"><label class="form-label">Prazo estimado<input name="deadline" value="${quote.shipping?.deadline || ""}" placeholder="3 dias úteis" /></label><label class="form-label">Volumes<input name="volumes" type="number" min="1" step="1" value="${quote.shipping?.volumes || 1}" /></label></div><label class="form-label">Validade<input name="validUntil" type="date" value="${quote.validUntil || ""}" /></label><label class="form-label">Observação interna<textarea name="internalNote" placeholder="Informação para o time comercial">${quote.internalNote || ""}</textarea></label><button class="modal-submit" type="submit">Salvar condições</button></form>`);
  document.querySelector("#quote-edit-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const previous = `${quote.status}|${quote.discount}|${quote.freight}|${quote.shipping?.carrier}|${quote.shipping?.method}`;
    quote.discount = Math.max(0, Number(form.get("discount")) || 0);
    quote.freight = Math.max(0, Number(form.get("freight")) || 0);
    quote.total = Math.max(0, quote.subtotal - quote.discount + quote.freight);
    quote.seller = form.get("seller")?.toString().trim() || "Operação local";
    quote.validUntil = form.get("validUntil")?.toString() || quote.validUntil;
    quote.internalNote = form.get("internalNote")?.toString().trim() || "";
    quote.shipping = { ...quote.shipping, carrier: form.get("carrier")?.toString().trim() || "", method: form.get("method")?.toString().trim() || "", deadline: form.get("deadline")?.toString().trim() || "", volumes: Math.max(1, Number(form.get("volumes")) || 1) };
    if (form.get("status") !== quote.status) addQuoteHistory(quote, form.get("status"), "Status atualizado pelo painel.");
    const current = `${quote.status}|${quote.discount}|${quote.freight}|${quote.shipping.carrier}|${quote.shipping.method}`;
    if (previous !== current && !quote.history.some((entry) => entry.at === quote.updatedAt)) quote.history.push({ at: new Date().toISOString(), actor: quote.seller, from: quote.status, to: quote.status, note: "Condições comerciais atualizadas." });
    quote.updatedAt = new Date().toISOString();
    persist();
    closeModal();
    render();
    showToast("Condições do orçamento atualizadas.");
  });
}

function convertQuoteToOrder(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote || quote.status !== "Aprovado") return;
  if (quote.orderId) { showToast(`Este orçamento já virou o pedido ${quote.orderId}.`); return; }
  const order = { id: `PED-${String(154 + state.orders.length).padStart(6, "0")}`, quoteId: quote.id, customer: quote.customer, phone: quote.phone, document: quote.document || "", zip: quote.zip || "", city: quote.city || "", seller: quote.seller, items: quote.items.map((item) => ({ ...item })), subtotal: quote.subtotal, discount: quote.discount, freight: quote.freight, total: quote.total, status: "Novo pedido", createdAt: new Date().toISOString(), shipping: { ...quote.shipping }, history: [{ at: new Date().toISOString(), actor: quote.seller || "Operação local", from: null, to: "Novo pedido", note: `Convertido do orçamento ${quote.id}.` }], note: quote.note || "—" };
  state.orders.unshift(order);
  quote.orderId = order.id;
  addQuoteHistory(quote, "Convertido em pedido", `Pedido ${order.id} criado.`);
  persist();
  closeModal();
  render();
  showToast(`Pedido ${order.id} criado.`);
}

function copyQuoteLink(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote || !navigator.clipboard?.writeText) { showToast("Não foi possível copiar o link."); return; }
  navigator.clipboard.writeText(quoteShareLink(quote)).then(() => showToast("Link do orçamento copiado."), () => showToast("Não foi possível copiar o link."));
}

function quoteCreateModalV2() {
  openModal(`<span class="eyebrow">QUOTE / NEW REQUEST</span><h2>Nova central<br>de orçamento.</h2><p>Registre a solicitação e deixe a proposta pronta para análise comercial.</p><form class="form-grid" id="admin-quote-form"><div class="form-row"><label class="form-label">Nome do cliente<input name="name" required placeholder="Nome completo" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CPF / CNPJ<input name="document" placeholder="Opcional" /></label><label class="form-label">CEP<input name="zip" placeholder="00000-000" /></label></div><div class="form-row"><label class="form-label">Cidade / UF<input name="city" placeholder="São Paulo / SP" /></label><label class="form-label">Origem<select name="origin"><option>Catálogo</option><option>WhatsApp</option><option>Telefone</option><option>Balcão</option><option>Indicação</option></select></label></div><div class="form-row"><label class="form-label">Produto principal<select name="productId" required>${activeProducts().map((product) => `<option value="${product.id}">${product.name} · ${money(product.price)}</option>`).join("")}</select></label><label class="form-label">Quantidade<input name="quantity" type="number" min="1" step="1" value="1" required /></label></div><label class="form-label">Vendedor responsável<input name="seller" value="${state.account?.name || "Operação local"}" placeholder="Responsável" /></label><div class="form-row"><label class="form-label">Observação do cliente<textarea name="note" placeholder="Preferências, prazo ou contexto"></textarea></label><label class="form-label">Observação interna<textarea name="internalNote" placeholder="Uso exclusivo do time"></textarea></label></div><button class="modal-submit" type="submit">Criar orçamento</button></form>`);
  document.querySelector("#admin-quote-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const product = findProduct(form.get("productId"));
    if (!product) return;
    const quantity = Math.max(1, Number(form.get("quantity")) || 1);
    const createdAt = new Date().toISOString();
    const quote = { id: nextQuoteId(), customer: form.get("name").toString().trim(), phone: form.get("phone").toString().trim(), document: form.get("document")?.toString().trim() || "", zip: form.get("zip")?.toString().trim() || "", city: form.get("city")?.toString().trim() || "—", origin: form.get("origin")?.toString() || "Catálogo", seller: form.get("seller")?.toString().trim() || "Operação local", note: form.get("note")?.toString().trim() || "—", internalNote: form.get("internalNote")?.toString().trim() || "", subtotal: product.price * quantity, discount: 0, freight: 0, total: product.price * quantity, status: "Novo", createdAt, updatedAt: createdAt, validUntil: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), shipping: { carrier: "", method: "", deadline: "", volumes: 1, weight: "" }, items: [{ id: product.id, quantity }], history: [{ at: createdAt, actor: form.get("seller")?.toString().trim() || "Operação local", from: null, to: "Novo", note: "Orçamento criado manualmente." }] };
    state.quotes.unshift(quote);
    persist();
    closeModal();
    render();
    showToast("Orçamento criado.");
  });
}

function openSellerWhatsApp(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  const phone = String(state.settings.whatsapp || "").replace(/\D/g, "");
  if (!quote || phone.length < 10) { showToast("O WhatsApp da operação ainda não foi configurado."); return; }
  const message = `Olá, sou ${quote.customer} e quero falar sobre o orçamento ${quote.id}.\n\n${quoteShareLink(quote)}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function publicQuotePage(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return `<section class="page public-quote-page"><div class="container"><div class="empty-state"><div><div class="empty-mark">⌖</div><h2>Orçamento não encontrado.</h2><p>Confira o link recebido ou fale com o time ${state.settings.storeName}.</p><a class="hero-cta" href="#catalog" data-route="catalog">Voltar ao catálogo</a></div></div></div></section>`;
  const items = quoteItems(quote);
  return `<section class="page public-quote-page"><div class="container"><div class="public-quote-header"><div><span class="eyebrow">${state.settings.storeName.toUpperCase()} / PROPOSAL</span><h1>Orçamento<br>${quote.id}.</h1><p>Proposta preparada para ${quote.customer}.</p></div><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></div><div class="public-quote-grid"><section class="public-quote-card"><div class="quote-section-title"><span class="eyebrow">SUMMARY / RESUMO</span><strong>Seu equipamento em campo</strong></div><div class="public-quote-items">${items.map((item) => `<div class="quote-detail-item"><div><strong>${item.product?.name || item.name || item.id}</strong><small>${item.product?.brand || "Produto"} · ${item.quantity} unidade(s)</small></div><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b></div>`).join("")}</div><div class="quote-financial"><div><span>Subtotal</span><strong>${money(quote.subtotal)}</strong></div><div><span>Desconto</span><strong>− ${money(quote.discount)}</strong></div><div><span>Frete</span><strong>${money(quote.freight)}</strong></div><div class="quote-total"><span>Total final</span><strong>${money(quote.total)}</strong></div></div></section><aside class="public-quote-card public-quote-side"><span class="eyebrow">NEXT STEP / PRÓXIMO PASSO</span><h2>Pronto para<br>seguir?</h2><p>Revise a proposta e escolha como quer continuar com a equipe.</p><button class="hero-cta" data-action="quote-accept-public" data-quote-id="${quote.id}" ${state.quotes.some((item) => item.id === quote.id) && quote.status !== "Convertido em pedido" ? "" : "disabled"}>Aceitar orçamento</button><button class="outline-cta" data-action="quote-whatsapp" data-quote-id="${quote.id}">Falar com vendedor ↗</button><button class="text-link public-copy-link" data-action="quote-share" data-quote-id="${quote.id}">Copiar este link</button><small>Validade: ${quote.validUntil ? new Date(`${quote.validUntil}T12:00:00`).toLocaleDateString("pt-BR") : "A confirmar"}</small></aside></div></div></section>`;
}

function acceptPublicQuote(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote || quote.status === "Convertido em pedido") return;
  addQuoteHistory(quote, "Aprovado", "Orçamento aceito pelo cliente.", quote.customer);
  persist();
  render();
  showToast("Orçamento aprovado. O time já pode converter em pedido.");
}

function orderStatusClass(status) {
  if (status === "Novo pedido") return "status-new";
  if (["Pagamento confirmado", "Pronto para envio", "Entregue"].includes(status)) return "status-done";
  if (status === "Cancelado") return "status-danger";
  return "status-progress";
}

function adminOrdersPage() {
  const query = state.orderSearch.trim().toLowerCase();
  const list = state.orders.filter((order) => {
    const matchesQuery = !query || `${order.id} ${order.customer} ${order.phone || ""} ${order.quoteId || ""}`.toLowerCase().includes(query);
    const matchesStatus = state.orderStatusFilter === "all" || order.status === state.orderStatusFilter;
    return matchesQuery && matchesStatus;
  });
  return adminShell("admin-orders", "05 / FULFILLMENT", "Pedidos.", `<div class="admin-toolbar quote-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input id="order-search" value="${state.orderSearch}" placeholder="Buscar por pedido, cliente ou orçamento" /></div><select class="quote-status-filter" id="order-status-filter" aria-label="Filtrar pedidos por status"><option value="all" ${state.orderStatusFilter === "all" ? "selected" : ""}>Todos os status</option>${orderStatuses.map((status) => `<option value="${status}" ${state.orderStatusFilter === status ? "selected" : ""}>${status}</option>`).join("")}</select></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">ORDER PIPELINE</span><h2>${list.length} pedido(s) na visão atual</h2></div><span class="admin-sync"><i class="status-dot"></i> ${state.orders.length} salvos neste dispositivo</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>${state.orders.filter((order) => order.status === "Novo pedido").length}</strong><small>aguardando processamento</small></div><div><span>SEPARAÇÃO</span><strong>${state.orders.filter((order) => ["Preparando pedido", "Separação"].includes(order.status)).length}</strong><small>itens para o estoque</small></div><div><span>EXPEDIÇÃO</span><strong>${state.orders.filter((order) => ["Pronto para envio", "Enviado"].includes(order.status)).length}</strong><small>pedidos em trânsito</small></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Origem</th><th>Total</th><th>Status</th><th>Ações</th></tr></thead><tbody>${list.length ? list.map((order) => `<tr><td><strong>#${order.id}</strong><small>${order.quoteId || "Sem orçamento"}</small></td><td><strong>${order.customer}</strong><small>${order.phone || "WhatsApp não informado"}</small></td><td>${(order.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)} itens</td><td><strong>${money(order.total)}</strong></td><td><span class="admin-status ${orderStatusClass(order.status)}">${order.status}</span></td><td><div class="admin-row-actions quote-row-actions"><button data-action="order-view" data-order-id="${order.id}">Ver</button><button data-action="order-advance" data-order-id="${order.id}">Avançar</button></div></td></tr>`).join("") : `<tr><td colspan="6"><div class="admin-inline-empty">Nenhum pedido foi criado a partir dos orçamentos aprovados.</div></td></tr>`}</tbody></table></div></section>`);
}

function orderDetailModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const items = quoteItems(order);
  const history = [...(order.history || [])].reverse();
  openModal(`<span class="eyebrow">ORDER / ${order.id}</span><h2>Detalhes do<br>pedido.</h2><div class="quote-detail-head"><div><strong>${order.customer}</strong><small>${order.phone || "WhatsApp não informado"} · ${order.city || "Cidade não informada"}</small></div><span class="admin-status ${orderStatusClass(order.status)}">${order.status}</span></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">PRODUCTS / PRODUTOS</span><strong>${items.length} item(ns)</strong></div><div class="quote-detail-items">${items.map((item) => `<div class="quote-detail-item"><div><strong>${item.product?.name || item.name || item.id}</strong><small>SKU ${item.product?.id || item.id || "—"} · ${item.quantity} unidade(s)</small></div><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b></div>`).join("")}</div></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">SHIPMENT / EXPEDIÇÃO</span><strong>Preparação logística</strong></div><div class="quote-info-grid"><div><span>Transportadora</span><strong>${order.shipping?.carrier || "A definir"}</strong></div><div><span>Modalidade</span><strong>${order.shipping?.method || "A definir"}</strong></div><div><span>Volumes</span><strong>${order.shipping?.volumes || 1}</strong></div><div><span>Rastreamento</span><strong>${order.shipping?.tracking || "A definir"}</strong></div></div></div><div class="quote-financial"><div><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div><div><span>Desconto</span><strong>− ${money(order.discount)}</strong></div><div><span>Frete</span><strong>${money(order.freight)}</strong></div><div class="quote-total"><span>Total final</span><strong>${money(order.total)}</strong></div></div><div class="quote-history"><div class="quote-section-title"><span class="eyebrow">TRACE / HISTÓRICO</span><strong>Rastreabilidade</strong></div><div class="quote-timeline">${history.map((entry) => `<div class="quote-timeline-item"><i></i><div><strong>${entry.from ? `${entry.from} → ` : ""}${entry.to}</strong><small>${new Date(entry.at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · ${entry.actor}</small><p>${entry.note || "Atualização registrada."}</p></div></div>`).join("")}</div></div><div class="quote-detail-actions"><button class="hero-cta" data-action="order-advance" data-order-id="${order.id}">Avançar pedido</button><button class="outline-cta" data-action="order-print" data-order-id="${order.id}">Imprimir pedido</button></div>`);
}

function advanceOrderStatus(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const nextIndex = orderStatuses.indexOf(order.status) + 1;
  if (order.status === "Cancelado" || nextIndex >= orderStatuses.length - 1) { showToast("Este pedido já está na última etapa operacional."); return; }
  const next = orderStatuses[nextIndex];
  const from = order.status;
  order.status = next;
  order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Operação local", from, to: next, note: "Status avançado pelo painel." }];
  persist();
  closeModal();
  render();
  showToast(`Pedido ${order.id}: ${order.status}.`);
}

function printOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const items = quoteItems(order);
  openModal(`<div class="print-sheet"><span class="eyebrow">FIELD OPS / PICKING SLIP</span><h2>${order.id}</h2><p><strong>${order.customer}</strong><br>${order.city || "Endereço não informado"}</p><div class="print-items">${items.map((item) => `<div><strong>${item.quantity}x</strong><span>${item.product?.name || item.name || item.id}<small>SKU ${item.product?.id || item.id || "—"}</small></span></div>`).join("")}</div><p class="print-note">Observações: ${order.note || "—"}</p><button class="modal-submit" data-action="print-now">Imprimir esta folha</button></div>`);
}

function profileSetupModal() {
  const profile = state.profile || {};
  openModal(`<div class="profile-setup"><span class="eyebrow">FIELD BRIEFING / 02 MIN</span><h2>Seu jeito<br>de jogar.</h2><p>Duas escolhas. Um catálogo muito mais útil para você.</p><form class="form-grid" id="profile-form"><fieldset class="choice-fieldset"><legend>Como você joga?</legend><label class="choice-card"><input type="radio" name="style" value="assalto" ${profile.style === "assalto" || !profile.style ? "checked" : ""}><span><strong>Assalto</strong><small>Ritmo, mobilidade e versatilidade.</small></span><b>01</b></label><label class="choice-card"><input type="radio" name="style" value="precisao" ${profile.style === "precisao" ? "checked" : ""}><span><strong>Precisão</strong><small>Controle, alcance e consistência.</small></span><b>02</b></label><label class="choice-card"><input type="radio" name="style" value="proximidade" ${profile.style === "proximidade" ? "checked" : ""}><span><strong>Proximidade</strong><small>Resposta rápida para curta distância.</small></span><b>03</b></label></fieldset><label class="form-label">Faixa de investimento<select name="budget"><option value="1000" ${Number(profile.budget) === 1000 ? "selected" : ""}>Até R$ 1.000</option><option value="2000" ${Number(profile.budget) === 2000 ? "selected" : ""}>Até R$ 2.000</option><option value="5000" ${Number(profile.budget) === 5000 || !profile.budget ? "selected" : ""}>Sem limite definido</option></select></label><button class="modal-submit" type="submit">Atualizar meu briefing</button></form></div>`);
  document.querySelector("#profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.profile = { style: form.get("style"), budget: Number(form.get("budget")) };
    persist();
    closeModal();
    render();
    showToast("Briefing atualizado.");
  });
}

function rememberSearch(query) {
  const clean = query.trim();
  if (!clean) return;
  state.recentSearches = [clean, ...state.recentSearches.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
  persist();
}

function paletteResults(query = "") {
  const clean = query.trim().toLowerCase();
  const matches = activeProducts().filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(clean)).slice(0, 5);
  const quick = `<div class="palette-quick"><button data-route="catalog"><span>⌕</span> Abrir catálogo</button><button data-route="loadout"><span>＋</span> Montar loadout</button><button data-route="favorites"><span>♡</span> Ver favoritos</button></div>`;
  if (!clean) return `${quick}${state.recentSearches.length ? `<div class="palette-heading">Buscas recentes</div><div class="palette-history">${state.recentSearches.map((item) => `<button data-palette-search="${item}">${item}<span>↗</span></button>`).join("")}</div>` : `<div class="palette-empty">Digite para encontrar produtos, marcas ou categorias.</div>`}`;
  return `${matches.length ? `<div class="palette-heading">Produtos</div><div class="palette-matches">${matches.map((product) => `<button class="palette-match" data-palette-product="${product.id}"><img src="${product.image}" alt="" /><span><strong>${product.brand} ${product.name}</strong><small>${product.category} · ${money(product.price)}</small></span><b>↗</b></button>`).join("")}</div>` : `<div class="palette-empty">Nada encontrado para “${query}”.</div>`}<button class="palette-search-all" data-palette-search="${query}">Buscar “${query}” no catálogo <span>↗</span></button>`;
}

function searchPalette(initial = "") {
  openModal(`<div class="command-palette"><span class="eyebrow">COMMAND / SEARCH</span><h2>Encontre seu<br>próximo setup.</h2><div class="palette-input"><span class="icon icon-search"></span><input id="palette-search" value="${initial}" placeholder="Produto, marca ou categoria" autocomplete="off" /><kbd>ESC</kbd></div><div class="palette-results" data-palette-results>${paletteResults(initial)}</div></div>`);
  const input = document.querySelector("#palette-search");
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  input.addEventListener("input", () => { modalContent.querySelector("[data-palette-results]").innerHTML = paletteResults(input.value); });
  input.addEventListener("keydown", (event) => { if (event.key === "Enter" && input.value.trim()) { rememberSearch(input.value); closeModal(); state.search = input.value.trim(); state.category = ""; go("catalog"); } });
}

function accountModal() {
  if (state.account) {
    openModal(`<span class="eyebrow">IDENTITY / PROFILE</span><h2>Olá,<br>${state.account.name.split(" ")[0]}.</h2><p>Seu perfil está salvo neste dispositivo. Favoritos, carrinho e loadouts ficam prontos para continuar quando você voltar.</p><div class="account-summary"><div><span>Favoritos</span><strong>${state.favorites.length}</strong></div><div><span>No carrinho</span><strong>${state.cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><div><span>Perfil</span><strong>${state.account.segment || "Cliente"}</strong></div></div><div class="form-grid"><button class="modal-submit" data-action="admin-preview">Abrir painel operacional</button><button class="outline-cta" data-action="account-logout">Trocar perfil</button></div>`);
    return;
  }
  openModal(`<span class="eyebrow">IDENTITY / ACCOUNT</span><h2>Seu perfil<br>de campo.</h2><p>Salve um nome e um WhatsApp para acelerar seus próximos orçamentos. Você continua navegando como visitante.</p><form class="form-grid" id="account-form"><label class="form-label">Nome<input name="name" required placeholder="Como podemos chamar você?" /></label><div class="form-row"><label class="form-label">WhatsApp<input name="phone" placeholder="(11) 99999-9999" /></label><label class="form-label">Perfil<select name="segment"><option>Consumidor</option><option>Lojista</option><option>Distribuidor</option></select></label></div><button class="modal-submit" type="submit">Salvar perfil</button></form><button class="outline-cta account-admin-link" data-action="admin-preview">Abrir painel operacional</button>`);
  document.querySelector("#account-form").addEventListener("submit", (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.account = { name: form.get("name"), phone: form.get("phone"), segment: form.get("segment") }; localStorage.setItem("fieldops-account", JSON.stringify(state.account)); closeModal(); showToast("Perfil salvo neste dispositivo."); });
}

function compareModal() {
  const selected = state.compare.map(findProduct).filter(Boolean);
  if (selected.length < 2) { showToast("Selecione pelo menos dois produtos para comparar."); return; }
  const specKeys = ["FPS", "Gearbox", "Peso", "Sistema", "Hop-Up", "Material"];
  openModal(`<span class="eyebrow">COMPARE // LOADOUT</span><h2>Compare<br>plataformas.</h2><p>Coloque as especificações lado a lado antes de decidir.</p><div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Specs</th>${selected.map((product) => `<th><span>${product.brand}</span><strong>${product.name}</strong><small>${money(product.price)}</small></th>`).join("")}</tr></thead><tbody>${specKeys.map((key) => `<tr><td>${key}</td>${selected.map((product) => `<td>${product.specs[key] || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div><button class="modal-submit" data-action="compare-clear-close">Limpar comparação</button>`);
}

function productModal(product = null) {
  const editing = Boolean(product);
  openModal(`<span class="eyebrow">PRODUCT REGISTER / ${editing ? "EDIT" : "NEW"}</span><h2>${editing ? "Editar produto." : "Novo produto."}</h2><p>Atualize as informações essenciais para manter o catálogo pronto para o campo.</p><form class="form-grid" id="product-form"><div class="form-row"><label class="form-label">Marca<input name="brand" required value="${product?.brand || ""}" placeholder="ROSSI" /></label><label class="form-label">Nome<input name="name" required value="${product?.name || ""}" placeholder="NEPTUNE 10\"" /></label></div><div class="form-row"><label class="form-label">Categoria<select name="category"><option ${product?.category === "Rifles" ? "selected" : ""}>Rifles</option><option ${product?.category === "Pistolas" ? "selected" : ""}>Pistolas</option><option ${product?.category === "Ópticas" ? "selected" : ""}>Ópticas</option><option ${product?.category === "Gear" ? "selected" : ""}>Gear</option><option ${product?.category === "Munição" ? "selected" : ""}>Munição</option><option ${product?.category === "Proteção" ? "selected" : ""}>Proteção</option></select></label><label class="form-label">Sistema<input name="system" value="${product?.system || "AEG"}" placeholder="AEG" /></label></div><div class="form-row"><label class="form-label">Preço<input name="price" type="number" min="0" step="1" required value="${product?.price || ""}" placeholder="1899" /></label><label class="form-label">Estoque<input name="stockCount" type="number" min="0" step="1" required value="${product?.stockCount ?? 0}" placeholder="38" /></label></div><label class="form-label">Imagem<input name="image" value="${product?.image || "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82"} /></label><label class="form-label">Descrição<textarea name="description" placeholder="Resumo do produto">${product?.description || ""}</textarea></label><button class="modal-submit" type="submit">${editing ? "Salvar alterações" : "Cadastrar produto"}</button></form>`);
  document.querySelector("#product-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = { brand: form.get("brand").toString().toUpperCase(), name: form.get("name").toString().toUpperCase(), category: form.get("category"), system: form.get("system").toString().toUpperCase(), price: Number(form.get("price")), stockCount: Number(form.get("stockCount")), image: form.get("image"), description: form.get("description") || "Equipamento pronto para completar seu próximo loadout.", type: `${form.get("system")} · FIELD GEAR`, meta: "FIELD READY", stock: stockLabel({ stockCount: Number(form.get("stockCount")) }), specs: { FPS: "—", Gearbox: "—", Peso: "—", Sistema: form.get("system"), "Hop-Up": "—", Material: "—" }, tag: editing ? product.tag : "Novo", active: true };
    if (editing) Object.assign(product, data);
    else products.unshift({ id: `${data.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, ...data });
    persist(); closeModal(); render(); showToast(editing ? "Produto atualizado." : "Produto cadastrado.");
  });
}

function stockModal(product) {
  if (!product) return;
  openModal(`<span class="eyebrow">INVENTORY / ${product.brand}</span><h2>Ajustar<br>estoque.</h2><p>Atualize a quantidade disponível de ${product.name} para manter o catálogo alinhado ao campo.</p><form class="form-grid" id="stock-form"><label class="form-label">Unidades disponíveis<input name="stockCount" type="number" min="0" step="1" required value="${product.stockCount}" /></label><button class="modal-submit" type="submit">Salvar estoque</button></form>`);
  document.querySelector("#stock-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Math.max(0, Number(new FormData(event.currentTarget).get("stockCount")) || 0);
    product.stockCount = value;
    product.stock = stockLabel(product);
    persist();
    closeModal();
    render();
    showToast("Estoque atualizado.");
  });
}

function priceModal(product) {
  if (!product) return;
  openModal(`<span class="eyebrow">PRICING / ${product.brand}</span><h2>Atualizar<br>preço.</h2><p>O novo valor será usado no catálogo, no loadout e nos orçamentos futuros.</p><form class="form-grid" id="price-form"><label class="form-label">Preço de varejo<input name="price" type="number" min="0" step="1" required value="${product.price}" /></label><button class="modal-submit" type="submit">Salvar preço</button></form>`);
  document.querySelector("#price-form").addEventListener("submit", (event) => {
    event.preventDefault();
    product.price = Math.max(0, Number(new FormData(event.currentTarget).get("price")) || 0);
    persist();
    closeModal();
    render();
    showToast("Preço atualizado.");
  });
}

function duplicateProduct(id) {
  const product = findProduct(id);
  if (!product) return;
  const copy = { ...product, specs: { ...product.specs }, id: `${product.id}-copy-${Date.now()}`, name: `${product.name} COPY`, tag: "Cópia", active: true };
  products.unshift(copy);
  persist();
  render();
  showToast("Produto duplicado para edição.");
}

function advanceQuoteStatus(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote) return;
  const pipeline = ["Novo", "Em análise", "Proposta enviada", "Aguardando cliente", "Aprovado"];
  const currentIndex = pipeline.indexOf(quote.status);
  if (currentIndex < 0 || currentIndex >= pipeline.length - 1) { showToast(quote.status === "Aprovado" ? "Aprovado. Use Converter em pedido para continuar." : `O orçamento está em ${quote.status}.`); return; }
  addQuoteHistory(quote, pipeline[currentIndex + 1], "Etapa avançada pelo painel.");
  persist();
  closeModal();
  render();
  showToast(`Orçamento ${quote.id}: ${quote.status}.`);
}

function loadoutModal(label) {
  const categoryMap = { Rifle: "Rifles", Óptica: "Ópticas", Magazine: "Acessórios", Munição: "Munição", Proteção: "Proteção" };
  const candidates = activeProducts().filter((product) => product.category === categoryMap[label]);
  const fallback = candidates.length ? candidates : activeProducts().filter((product) => product.id !== state.loadout.Rifle).slice(0, 4);
  openModal(`<span class="eyebrow">LOADOUT / ${label.toUpperCase()}</span><h2>Escolha sua<br>${label.toLowerCase()}.</h2><p>Selecione uma opção para atualizar seu loadout.</p><div class="loadout-picker">${fallback.map((product) => `<button class="loadout-picker-item" data-loadout-select="${product.id}" data-loadout-slot="${label}"><img src="${product.image}" alt="" /><span><strong>${product.name}</strong><small>${product.brand} · ${money(product.price)}</small></span><b>+</b></button>`).join("")}</div>`);
}

function quoteRecord(form) {
  const total = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
  const createdAt = new Date().toISOString();
  const record = ensureQuoteShape({ id: nextQuoteId(), customer: form.get("name").toString(), phone: form.get("phone").toString(), city: form.get("city")?.toString() || "—", note: form.get("note")?.toString() || "—", subtotal: total, discount: 0, freight: 0, total, status: "Novo", createdAt, items: state.cart.map((item) => ({ id: item.id, quantity: item.quantity })), history: [{ at: createdAt, actor: "Cliente", from: null, to: "Novo", note: "Orçamento criado pelo catálogo." }] });
  state.quotes.unshift(record);
  persist();
  return record;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return { headers: [], rows: [] };
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const split = (line) => line.split(delimiter).map((value) => value.trim().replace(/^"|"$/g, ""));
  const headers = split(lines[0]);
  return { headers, rows: lines.slice(1).map(split).filter((row) => row.some(Boolean)) };
}

function analyzeImportFile(file) {
  if (!file) return;
  const reader = new FileReader();
  const isExcel = /\.xlsx?$/i.test(file.name);
  reader.onload = () => {
    let parsed;
    if (isExcel && window.XLSX) {
      const workbook = window.XLSX.read(reader.result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const matrix = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
      parsed = { headers: (matrix.shift() || []).map(String), rows: matrix };
    } else if (isExcel) {
      showToast("O leitor Excel não carregou. Use CSV ou tente novamente.");
      return;
    } else parsed = parseCsv(reader.result.toString());
    const normalized = parsed.headers.map((header) => header.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_"));
    const rows = parsed.rows.map((values) => Object.fromEntries(normalized.map((header, index) => [header, values[index] || ""])));
    const valid = rows.filter((row) => row.nome_produto || row.product_name || row.nome || row.name);
    state.importData = { fileName: file.name, headers: parsed.headers, rows, validCount: valid.length, errorCount: rows.length - valid.length, validRows: valid };
    render();
    showToast(`${valid.length} registros prontos para revisão.`);
  };
  if (isExcel) reader.readAsArrayBuffer(file);
  else reader.readAsText(file, "UTF-8");
}

function commitImport() {
  if (!state.importData?.validRows?.length) return;
  state.importData.validRows.forEach((row, index) => {
    const name = row.nome_produto || row.product_name || row.nome || row.name;
    const brand = row.marca || row.brand || "IMPORTADO";
    const category = row.categoria || row.category || "Equipamentos";
    const price = Number(String(row.preco || row.price || "0").replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
    const stockCount = Number(row.estoque || row.stock || row.quantidade || 0) || 0;
    products.unshift({ id: `import-${Date.now()}-${index}`, brand: brand.toUpperCase(), name: name.toUpperCase(), type: `${row.sistema || row.system || "FIELD GEAR"} · IMPORTED`, meta: row.sku || "IMPORTED SKU", price, stockCount, stock: stockLabel({ stockCount }), category, system: row.sistema || row.system || "—", image: "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82", specs: { FPS: row.fps || "—", Gearbox: row.gearbox || "—", Peso: row.peso || "—", Sistema: row.sistema || row.system || "—", "Hop-Up": "—", Material: row.material || "—" }, description: row.descricao || row.description || "Produto importado para revisão.", tag: "Importado", active: true });
  });
  const count = state.importData.validRows.length;
  state.importData = null;
  persist(); render(); showToast(`${count} produtos importados.`);
}

function render() {
  heroInteractionCleanup?.();
  heroInteractionCleanup = null;
  let view = homePage();
  if (state.route === "catalog") view = catalogPage();
  if (state.route === "product" && state.selectedProduct) view = productPage(state.selectedProduct);
  if (state.route === "loadout") view = loadoutPage();
  if (state.route === "favorites") view = favoritesPage();
  if (state.route === "brands") view = brandsPage();
  if (state.route === "admin") view = adminDashboardPage();
  if (state.route === "admin-products") view = adminProductsPage();
  if (state.route === "admin-stock") view = adminStockPage();
  if (state.route === "admin-prices") view = adminPricesPage();
  if (state.route === "admin-quotes") view = adminQuotesWorkspace();
  if (state.route === "admin-orders") view = adminOrdersPage();
  if (state.route === "admin-customers") view = adminCustomersPage();
  if (state.route === "quote" && state.selectedQuoteId) view = publicQuotePage(state.selectedQuoteId);
  if (state.route === "admin-import") view = adminImportPage();
  if (state.route === "admin-settings") view = adminSettingsPage();
  app.innerHTML = view + compareBar();
  updateNav();
  bindViewEvents();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateNav() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0); });
  document.querySelectorAll("[data-favorite-count]").forEach((el) => { el.textContent = state.favorites.length; });
  document.querySelectorAll("[data-catalog-count]").forEach((el) => { el.textContent = activeProducts().length; });
  document.querySelectorAll("[data-route]").forEach((el) => el.classList.toggle("active", el.dataset.route === state.route || (state.route === "product" && el.dataset.route === "catalog")));
  updateThemeControls();
}

function go(route, product = null) {
  state.route = route;
  state.selectedProduct = product;
  if (route === "product" && product) { sessionStorage.setItem("fieldops-product", product.id); state.recentProducts = [product.id, ...state.recentProducts.filter((id) => id !== product.id)].slice(0, 4); persist(); }
  if (route !== "catalog") state.category = route === "home" ? "" : state.category;
  history.replaceState({}, "", route === "home" ? "#home" : route === "product" && product ? `#product/${product.id}` : `#${route}`);
  render();
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  persist();
  render();
  showToast(state.favorites.includes(id) ? "Item favoritado." : "Item removido dos favoritos.");
}

function toggleCompare(id) {
  if (state.compare.includes(id)) state.compare = state.compare.filter((item) => item !== id);
  else if (state.compare.length >= 3) { showToast("A comparação aceita até 3 produtos."); return; }
  else state.compare.push(id);
  persist(); render(); showToast(state.compare.includes(id) ? "Produto adicionado à comparação." : "Produto removido da comparação.");
}

function addToCart(id, quantity = 1) {
  const product = findProduct(id);
  if (!product || product.stockCount <= 0) { showToast("Este item está indisponível."); return; }
  const existing = state.cart.find((item) => item.id === id);
  const nextQuantity = Math.min(product.stockCount, Math.max(1, Number(quantity) || 1) + (existing?.quantity || 0));
  if (existing) existing.quantity = nextQuantity;
  else state.cart.push({ id, quantity: nextQuantity });
  persist();
  updateNav();
  renderDrawer();
  openDrawer();
  showToast(nextQuantity === product.stockCount ? "Limite de estoque aplicado." : "Item adicionado ao carrinho.");
}

function addLoadoutToCart() {
  const selected = [...new Set(Object.values(state.loadout).filter(Boolean))];
  selected.forEach((id) => {
    const product = findProduct(id);
    if (!product || product.stockCount <= 0) return;
    const existing = state.cart.find((item) => item.id === id);
    if (existing) existing.quantity = Math.min(product.stockCount, existing.quantity + 1);
    else state.cart.push({ id, quantity: 1 });
  });
  persist();
  updateNav();
  renderDrawer();
  openDrawer();
  showToast("Loadout adicionado ao carrinho.");
}

function changeCartQuantity(id, delta) {
  const item = state.cart.find((entry) => entry.id === id);
  const product = findProduct(id);
  if (!item || !product) return;
  item.quantity = Math.min(product.stockCount, item.quantity + delta);
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  persist();
  updateNav();
  renderDrawer();
}

function renderDrawer() {
  const itemsEl = document.querySelector("[data-cart-items]");
  const footerEl = document.querySelector("[data-cart-footer]");
  if (!itemsEl || !footerEl) return;
  if (!state.cart.length) {
    itemsEl.innerHTML = `<div class="drawer-empty"><div><div class="empty-mark">+</div><p>Seu carrinho está esperando o próximo item.</p><button class="outline-cta" data-route="catalog">Explorar catálogo</button></div></div>`;
    footerEl.innerHTML = "";
    return;
  }
  itemsEl.innerHTML = state.cart.map((item) => { const product = findProduct(item.id); return `<div class="cart-item"><img src="${product.image}" alt="${product.name}" /><div><strong>${product.name}</strong><small>${money(product.price)} por unidade</small><div class="cart-item-controls"><div class="cart-qty-control"><button type="button" data-cart-dec="${item.id}" aria-label="Diminuir quantidade">−</button><b>${item.quantity}</b><button type="button" data-cart-inc="${item.id}" aria-label="Aumentar quantidade" ${item.quantity >= product.stockCount ? "disabled" : ""}>+</button></div><button class="cart-item-remove" data-remove-cart="${item.id}">Remover</button></div></div><div class="cart-item-price">${money(product.price * item.quantity)}</div></div>`; }).join("");
  const total = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
  footerEl.innerHTML = `<div class="summary-row"><span>Subtotal</span><strong>${money(total)}</strong></div><div class="summary-row"><span>Frete</span><span>A calcular</span></div><div class="summary-row total"><span>Total estimado</span><strong>${money(total)}</strong></div><button class="quote-button" data-action="quote">Solicitar orçamento</button>`;
}

function openDrawer() { drawer.classList.add("is-open"); drawerBackdrop.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); }
function closeDrawer() { drawer.classList.remove("is-open"); drawerBackdrop.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }
function openModal(content) { modalContent.innerHTML = content; modalLayer.classList.add("is-open"); modalLayer.classList.toggle("is-command", content.includes("command-palette")); modalLayer.setAttribute("aria-hidden", "false"); const title = modalContent.querySelector("h2"); if (title) title.id = "modal-title"; }
function closeModal() { modalLayer.classList.remove("is-open", "is-command"); modalLayer.setAttribute("aria-hidden", "true"); modalContent.innerHTML = ""; }

function quoteModal() {
  const total = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
  openModal(`<span class="eyebrow">QUOTE / REQUEST</span><h2>Solicite seu<br>orçamento.</h2><p>Deixe seus dados e a equipe ${state.settings.storeName} continua a conversa pelo WhatsApp.</p><form class="form-grid" id="quote-form"><div class="form-row"><label class="form-label">Nome<input name="name" required placeholder="Seu nome" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CEP<input name="zip" placeholder="00000-000" /></label><label class="form-label">Cidade<input name="city" placeholder="São Paulo" /></label></div><label class="form-label">Observação<textarea name="note" placeholder="Algum detalhe sobre seu loadout?"></textarea></label><div class="summary-row total"><span>Total estimado</span><strong>${money(total)}</strong></div><button class="modal-submit" type="submit">Criar orçamento e abrir WhatsApp</button></form>`);
  document.querySelector("#quote-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const quote = quoteRecord(form);
    const lines = state.cart.map((item) => { const product = findProduct(item.id); return `${item.quantity}x ${product.brand} ${product.name}`; }).join("\n");
    const message = `Olá, gostaria de solicitar orçamento da ${state.settings.storeName}.\n\nOrçamento ${quote.id}\n\nItens:\n${lines}\n\nNome: ${form.get("name")}\nWhatsApp: ${form.get("phone")}\nCEP: ${form.get("zip") || "Não informado"}\nCidade: ${form.get("city") || "Não informado"}\nObservação: ${form.get("note") || "—"}`;
    const link = `https://wa.me/${String(state.settings.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    state.cart = [];
    persist();
    updateNav();
    renderDrawer();
    modalContent.innerHTML = `<div class="success-box"><div class="success-mark">✓</div><span class="eyebrow">QUOTE // READY</span><h2>Orçamento criado.</h2><p>Seu resumo está pronto. Continue no WhatsApp para falar com o time Field Ops.</p><a class="modal-submit" href="${link}" target="_blank" rel="noreferrer">Abrir WhatsApp ↗</a></div>`;
    showToast("Orçamento criado.");
  });
}

function showToast(message) {
  const region = document.querySelector(".toast-region");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function bindFilterControls(root, immediateRender = true) {
  root.querySelectorAll("[data-filter-category]").forEach((input) => input.addEventListener("change", () => {
    state.category = input.value;
    if (immediateRender) render();
  }));
  root.querySelectorAll("[data-filter-system]").forEach((input) => input.addEventListener("change", () => {
    state.filters.systems = [...root.querySelectorAll("[data-filter-system]:checked")].map((item) => item.value);
    if (immediateRender) render();
  }));
  root.querySelectorAll("[data-filter-availability]").forEach((input) => input.addEventListener("change", () => {
    state.filters.availability = root.querySelector("[data-filter-availability]:checked")?.value || "all";
    if (immediateRender) render();
  }));
  root.querySelectorAll("[data-filter-price]").forEach((input) => {
    const output = input.closest(".filter-group")?.querySelector("[data-price-output]");
    const updatePrice = () => { state.filters.maxPrice = Number(input.value); if (output) output.value = money(input.value); if (output) output.textContent = money(input.value); };
    input.addEventListener("input", updatePrice);
    input.addEventListener("change", () => { updatePrice(); if (immediateRender) render(); });
  });
}

function bindHeroVideo() {
  heroInteractionCleanup?.();
  heroInteractionCleanup = null;
  const hero = document.querySelector("[data-hero-interactive]");
  const video = hero?.querySelector("[data-hero-video]");
  if (!hero || !video) return;

  const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const tabletQuery = window.matchMedia?.("(max-width: 1100px)");
  let frameId = 0;
  let metadataReady = false;
  let hasPointer = false;
  let targetProgress = 0.5;
  let currentProgress = 0.5;
  let lastFrameTime = 0;
  let lastSeekAt = 0;
  let renderedTime = 0;
  let initialFrameSyncId = 0;

  const clampProgress = (value) => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0.5));
  const reducedMotion = () => Boolean(reducedMotionQuery?.matches);
  const setCenterFrame = () => {
    if (!metadataReady || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const centerTime = Math.max(0, Math.min(video.duration - 0.001, video.duration * 0.5));
    const applyCenterFrame = () => {
      if (hasPointer || !metadataReady) return;
      video.pause();
      video.currentTime = Number.isFinite(centerTime) ? centerTime : 0;
      renderedTime = centerTime;
    };
    applyCenterFrame();
    requestAnimationFrame(applyCenterFrame);
    currentProgress = 0.5;
    targetProgress = 0.5;
  };
  const stopFrameLoop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrameTime = 0;
    lastSeekAt = 0;
  };
  const frameLoop = (timestamp) => {
    frameId = 0;
    if (!metadataReady || reducedMotion() || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const elapsed = lastFrameTime ? Math.min(64, timestamp - lastFrameTime) : 16;
    lastFrameTime = timestamp;
    const smoothing = 1 - Math.exp(-elapsed / 78);
    currentProgress += (targetProgress - currentProgress) * smoothing;
    if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
    const desiredTime = clampProgress(currentProgress) * video.duration;
    const safeTime = Math.max(0, Math.min(video.duration - 0.001, desiredTime));
    const targetTime = Math.max(0, Math.min(video.duration - 0.001, clampProgress(targetProgress) * video.duration));
    const seekInterval = 1000 / 30;
    const isSettling = Math.abs(targetProgress - currentProgress) < 0.001;
    const needsSeek = Number.isFinite(safeTime) && Math.abs(renderedTime - safeTime) > (isSettling ? 0.006 : 0.025);
    if (needsSeek && !video.seeking && timestamp - lastSeekAt >= seekInterval) {
      video.currentTime = safeTime;
      renderedTime = safeTime;
      lastSeekAt = timestamp;
    }
    if (Math.abs(targetProgress - currentProgress) > 0.001 || Math.abs(renderedTime - targetTime) > 0.006) frameId = requestAnimationFrame(frameLoop);
    else lastFrameTime = 0;
  };
  const startFrameLoop = () => {
    if (!frameId && !reducedMotion() && metadataReady) frameId = requestAnimationFrame(frameLoop);
  };
  const onPointerMove = (event) => {
    if (reducedMotion() || event.pointerType === "touch") return;
    const bounds = hero.getBoundingClientRect();
    if (!bounds.width) return;
    hasPointer = true;
    const pointerProgress = clampProgress((event.clientX - bounds.left) / bounds.width);
    const tabletScale = tabletQuery?.matches ? 0.72 : 1;
    targetProgress = clampProgress(0.5 + (pointerProgress - 0.5) * tabletScale);
    startFrameLoop();
  };
  const onPointerLeave = () => {
    hasPointer = false;
    targetProgress = 0.5;
    startFrameLoop();
  };
  const onMetadata = () => {
    metadataReady = Number.isFinite(video.duration) && video.duration > 0;
    if (!metadataReady) return;
    video.pause();
    if (reducedMotion() || !hasPointer) setCenterFrame();
    else startFrameLoop();
  };
  const onVideoError = () => {
    stopFrameLoop();
    hero.classList.add("is-video-fallback");
    video.hidden = true;
  };
  const onMotionPreferenceChange = () => {
    if (reducedMotion()) {
      stopFrameLoop();
      setCenterFrame();
    } else if (metadataReady) {
      startFrameLoop();
    }
  };

  video.pause();
  video.addEventListener("loadedmetadata", onMetadata);
  video.addEventListener("loadeddata", onMetadata);
  video.addEventListener("durationchange", onMetadata);
  video.addEventListener("error", onVideoError);
  hero.addEventListener("pointermove", onPointerMove, { passive: true });
  hero.addEventListener("pointerleave", onPointerLeave, { passive: true });
  reducedMotionQuery?.addEventListener?.("change", onMotionPreferenceChange);
  if (reducedMotionQuery && !reducedMotionQuery.addEventListener) reducedMotionQuery.addListener(onMotionPreferenceChange);
  if (video.readyState >= 1) onMetadata();
  initialFrameSyncId = window.setTimeout(onMetadata, 120);

  heroInteractionCleanup = () => {
    stopFrameLoop();
    window.clearTimeout(initialFrameSyncId);
    video.pause();
    video.removeEventListener("loadedmetadata", onMetadata);
    video.removeEventListener("loadeddata", onMetadata);
    video.removeEventListener("durationchange", onMetadata);
    video.removeEventListener("error", onVideoError);
    hero.removeEventListener("pointermove", onPointerMove);
    hero.removeEventListener("pointerleave", onPointerLeave);
    reducedMotionQuery?.removeEventListener?.("change", onMotionPreferenceChange);
    if (reducedMotionQuery && !reducedMotionQuery.removeEventListener) reducedMotionQuery.removeListener(onMotionPreferenceChange);
  };
}

function bindSearch() {
  const input = document.querySelector("#global-search");
  const results = document.querySelector("[data-search-results]");
  if (!input || !results) return;
  const update = () => {
    state.search = input.value;
    const query = input.value.trim().toLowerCase();
    if (!query) { results.classList.remove("open"); results.innerHTML = ""; return; }
    const matches = activeProducts().filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query)).slice(0, 5);
    results.innerHTML = matches.length ? `<div class="search-result-group">Produtos</div>${matches.map((product) => `<div class="search-result" data-product="${product.id}"><img src="${product.image}" alt="" /><div><strong>${product.brand} ${product.name}</strong><small>${product.category} · ${money(product.price)}</small></div></div>`).join("")}<div class="search-result-group">Catálogo</div><div class="search-result" data-search-query="${query}"><div><strong>Ver resultados para “${query}”</strong><small>Buscar no catálogo</small></div></div>` : `<div class="search-result-group">Sem correspondência</div><div class="search-result" data-route="catalog"><div><strong>Nenhum equipamento encontrado.</strong><small>Ver catálogo completo</small></div></div>`;
    results.classList.add("open");
  };
  input.addEventListener("input", update);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") { rememberSearch(input.value); state.search = input.value; go("catalog"); } });
  input.addEventListener("focus", () => { if (input.value) update(); });
  results.addEventListener("click", (event) => {
    const productEl = event.target.closest("[data-product]");
    if (productEl) {
      const product = findProduct(productEl.dataset.product);
      if (product) go("product", product);
      return;
    }
    const routeEl = event.target.closest("[data-route]");
    if (routeEl) { event.preventDefault(); go(routeEl.dataset.route); }
  });
}

function bindViewEvents() {
  bindHeroVideo();
  bindSearch();
  document.querySelectorAll("[data-product]").forEach((el) => el.addEventListener("click", (event) => { if (!el.matches("button") && event.target.closest("button")) return; const product = findProduct(el.dataset.product); if (product) go("product", product); }));
  document.querySelectorAll("[data-add]").forEach((el) => el.addEventListener("click", () => addToCart(el.dataset.add)));
  document.querySelectorAll("[data-add-detail]").forEach((el) => el.addEventListener("click", () => addToCart(el.dataset.addDetail, state.quantity)));
  document.querySelectorAll("[data-favorite]").forEach((el) => el.addEventListener("click", (event) => { event.stopPropagation(); toggleFavorite(el.dataset.favorite); }));
  document.querySelectorAll("[data-compare]").forEach((el) => el.addEventListener("click", (event) => { event.stopPropagation(); toggleCompare(el.dataset.compare); }));
  document.querySelectorAll("[data-category]").forEach((el) => el.addEventListener("click", () => { state.category = el.dataset.category === state.category ? "" : el.dataset.category; state.search = ""; go("catalog"); }));
  document.querySelectorAll("[data-search-brand]").forEach((el) => el.addEventListener("click", () => { state.search = el.dataset.searchBrand; state.category = ""; go("catalog"); }));
  document.querySelectorAll("[data-route]").forEach((el) => el.addEventListener("click", (event) => { event.preventDefault(); go(el.dataset.route); }));
  document.querySelectorAll("[data-clear-category]").forEach((el) => el.addEventListener("click", () => { state.category = ""; render(); }));
  document.querySelectorAll("[data-clear-search]").forEach((el) => el.addEventListener("click", () => { state.search = ""; state.category = ""; render(); }));
  bindFilterControls(document, true);
  const sort = document.querySelector("#sort-products");
  if (sort) sort.addEventListener("change", () => { state.sort = sort.value; render(); });
  document.querySelectorAll("[data-quantity]").forEach((el) => el.addEventListener("click", () => { state.quantity = Math.max(1, state.quantity + (el.dataset.quantity === "+" ? 1 : -1)); document.querySelector("[data-quantity-value]").textContent = state.quantity; }));
  document.querySelectorAll("[data-action=filters]").forEach((el) => el.addEventListener("click", () => {
    openModal(`<span class="eyebrow">FILTER // LOADOUT</span><h2>Filtros.</h2><p>Refine o arsenal para encontrar a configuração certa.</p>${filterPanel()}<button class="modal-submit" data-action="apply-filter-modal">Ver resultados</button>`);
    bindFilterControls(modalContent, false);
  }));
  document.querySelectorAll("[data-action=add-loadout]").forEach((el) => el.addEventListener("click", addLoadoutToCart));
  document.querySelectorAll("[data-slot]").forEach((el) => el.addEventListener("click", () => loadoutModal(el.dataset.slot)));
  document.querySelectorAll("[data-action=product-new]").forEach((el) => el.addEventListener("click", () => productModal()));
  document.querySelectorAll("[data-edit-product]").forEach((el) => el.addEventListener("click", () => productModal(findProduct(el.dataset.editProduct))));
  document.querySelectorAll("[data-duplicate-product]").forEach((el) => el.addEventListener("click", () => duplicateProduct(el.dataset.duplicateProduct)));
  document.querySelectorAll("[data-delete-product]").forEach((el) => el.addEventListener("click", () => { const product = findProduct(el.dataset.deleteProduct); if (product && window.confirm(`Excluir ${product.name}?`)) { product.active = false; persist(); render(); showToast("Produto desativado."); } }));
  const adminSearch = document.querySelector("#admin-product-search");
  if (adminSearch) adminSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { state.adminProductSearch = adminSearch.value; render(); } });
  const quoteSearch = document.querySelector("#quote-search");
  if (quoteSearch) quoteSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { state.quoteSearch = quoteSearch.value; render(); } });
  const quoteStatusFilter = document.querySelector("#quote-status-filter");
  if (quoteStatusFilter) quoteStatusFilter.addEventListener("change", () => { state.quoteStatusFilter = quoteStatusFilter.value; render(); });
  const orderSearch = document.querySelector("#order-search");
  if (orderSearch) orderSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { state.orderSearch = orderSearch.value; render(); } });
  const orderStatusFilter = document.querySelector("#order-status-filter");
  if (orderStatusFilter) orderStatusFilter.addEventListener("change", () => { state.orderStatusFilter = orderStatusFilter.value; render(); });
  const importFile = document.querySelector("#import-file");
  if (importFile) importFile.addEventListener("change", () => analyzeImportFile(importFile.files[0]));
  const settingsForm = document.querySelector("#settings-form");
  if (settingsForm) settingsForm.addEventListener("submit", (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.settings = { storeName: form.get("storeName").toString().trim(), city: form.get("city").toString().trim(), whatsapp: form.get("whatsapp").toString().replace(/\D/g, ""), lowStock: Number(form.get("lowStock")) || 0 }; persist(); render(); showToast("Configurações salvas."); });
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle-theme") toggleTheme(event);
  if (action === "open-search") searchPalette();
  if (action === "profile-setup") profileSetupModal();
  if (action === "clear-recent") { state.recentProducts = []; persist(); render(); showToast("Histórico de produtos limpo."); }
  if (action === "export-data") exportDataModal();
  if (action === "export-backup") exportBackup();
  if (action === "export-products") exportProducts();
  if (action === "export-quotes") exportQuotes();
  if (action === "cart") { renderDrawer(); openDrawer(); }
  if (action === "close-drawer") closeDrawer();
  if (action === "close-modal") closeModal();
  if (action === "quote") quoteModal();
  if (action === "compare-open") compareModal();
  if (action === "compare-clear") { state.compare = []; persist(); render(); showToast("Comparação limpa."); }
  if (action === "compare-clear-close") { state.compare = []; persist(); closeModal(); render(); showToast("Comparação limpa."); }
  if (action === "account") accountModal();
  if (action === "admin-preview") { closeModal(); go("admin"); }
  if (action === "account-logout") { state.account = null; localStorage.removeItem("fieldops-account"); accountModal(); }
  if (action === "simulate-import") { const button = event.target.closest(".import-submit"); if (button) { button.textContent = "Arquivo analisado ✓"; button.disabled = true; showToast("Análise concluída: 15 registros precisam de revisão."); } }
  if (action === "commit-import") commitImport();
  if (action === "import-reset") { state.importData = null; render(); }
  if (action === "reset-local-data" && window.confirm("Restaurar os dados demo e apagar os dados salvos neste dispositivo?")) { ["fieldops-products", "fieldops-cart", "fieldops-favorites", "fieldops-compare", "fieldops-quotes", "fieldops-orders", "fieldops-loadout", "fieldops-profile", "fieldops-recent-searches", "fieldops-recent-products", "fieldops-settings", "fieldops-account", "fieldops-theme"].forEach((key) => localStorage.removeItem(key)); location.hash = "#admin"; location.reload(); }
  if (action === "menu") openModal(`<span class="eyebrow">FIELD OPS / MENU</span><h2>Navegue<br>pelo arsenal.</h2><div class="form-grid"><button class="outline-cta" data-route="catalog">Catálogo</button><button class="outline-cta" data-route="loadout">Monte seu loadout</button><button class="outline-cta" data-route="favorites">Favoritos</button><button class="outline-cta" data-route="admin">Painel operacional</button></div>`);
  if (action === "apply-filter-modal") { closeModal(); render(); }
  const loadoutId = event.target.closest("[data-loadout-select]")?.dataset.loadoutSelect;
  const loadoutSlot = event.target.closest("[data-loadout-select]")?.dataset.loadoutSlot;
  if (loadoutId && loadoutSlot) { state.loadout[loadoutSlot] = loadoutId; persist(); closeModal(); render(); showToast(`${loadoutSlot} atualizado.`); }
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  if (removeId) { state.cart = state.cart.filter((item) => item.id !== removeId); persist(); renderDrawer(); updateNav(); showToast("Item removido do carrinho."); }
  const decreaseId = event.target.closest("[data-cart-dec]")?.dataset.cartDec;
  if (decreaseId) changeCartQuantity(decreaseId, -1);
  const increaseId = event.target.closest("[data-cart-inc]")?.dataset.cartInc;
  if (increaseId) changeCartQuantity(increaseId, 1);
  const clearSystem = event.target.closest("[data-clear-system]")?.dataset.clearSystem;
  if (clearSystem) { state.filters.systems = state.filters.systems.filter((system) => system !== clearSystem); render(); }
  if (event.target.closest("[data-clear-availability]")) { state.filters.availability = "all"; render(); }
  if (event.target.closest("[data-clear-price]")) { state.filters.maxPrice = catalogPriceMax(); render(); }
  if (event.target.closest("[data-clear-filters]")) { state.category = ""; state.search = ""; state.filters = { systems: [], availability: "all", maxPrice: catalogPriceMax() }; render(); }
  const quoteStatusId = event.target.closest("[data-quote-status]")?.dataset.quoteStatus;
  if (quoteStatusId) advanceQuoteStatus(quoteStatusId);
  if (action === "quote-new") quoteCreateModalV2();
  const quoteId = event.target.closest("[data-quote-id]")?.dataset.quoteId;
  if (action === "quote-view" && quoteId) quoteDetailModalV2(quoteId);
  if (action === "quote-advance" && quoteId) advanceQuoteStatus(quoteId);
  if (action === "quote-edit" && quoteId) quoteEditModal(quoteId);
  if (action === "quote-convert" && quoteId) convertQuoteToOrder(quoteId);
  if (action === "quote-copy" && quoteId) copyQuoteSummary(quoteId);
  if (action === "quote-share" && quoteId) copyQuoteLink(quoteId);
  if (action === "quote-whatsapp" && quoteId) { if (state.route === "quote") openSellerWhatsApp(quoteId); else openQuoteWhatsApp(quoteId); }
  if (action === "quote-delete" && quoteId) deleteQuote(quoteId);
  if (action === "quote-accept-public" && quoteId) acceptPublicQuote(quoteId);
  const orderId = event.target.closest("[data-order-id]")?.dataset.orderId;
  if (action === "order-view" && orderId) orderDetailModal(orderId);
  if (action === "order-advance" && orderId) advanceOrderStatus(orderId);
  if (action === "order-print" && orderId) printOrder(orderId);
  if (action === "print-now") window.print();
  const stockEditId = event.target.closest("[data-stock-edit]")?.dataset.stockEdit;
  if (stockEditId) stockModal(findProduct(stockEditId));
  const priceEditId = event.target.closest("[data-edit-price]")?.dataset.editPrice;
  if (priceEditId) priceModal(findProduct(priceEditId));
  const paletteProduct = event.target.closest("[data-palette-product]")?.dataset.paletteProduct;
  if (paletteProduct) { const product = findProduct(paletteProduct); if (product) { closeModal(); go("product", product); } }
  const paletteSearch = event.target.closest("[data-palette-search]")?.dataset.paletteSearch;
  if (paletteSearch) { rememberSearch(paletteSearch); closeModal(); state.search = paletteSearch; state.category = ""; go("catalog"); }
  const searchQuery = event.target.closest("[data-search-query]")?.dataset.searchQuery;
  if (searchQuery) { rememberSearch(searchQuery); state.search = searchQuery; state.category = ""; go("catalog"); }
});

document.addEventListener("click", (event) => {
  const routeEl = event.target.closest(".modal-panel [data-route]");
  if (routeEl) { event.preventDefault(); closeModal(); go(routeEl.dataset.route); }
});

modalLayer.addEventListener("click", (event) => { if (event.target === modalLayer) closeModal(); });
drawerBackdrop.addEventListener("click", closeDrawer);
window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchPalette(); }
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) { event.preventDefault(); searchPalette(); }
  if (event.key === "Escape" && modalLayer.classList.contains("is-open")) closeModal();
});
window.addEventListener("hashchange", () => { const route = location.hash.replace("#", "") || "home"; const productMatch = route.match(/^product\/(.+)$/); const quoteMatch = route.match(/^quote\/(.+)$/); closeModal(); state.route = productMatch ? "product" : quoteMatch ? "quote" : ["home", "catalog", "brands", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-orders", "admin-customers", "admin-import", "admin-settings"].includes(route) ? route : "home"; state.selectedProduct = productMatch ? findProduct(productMatch[1]) : null; state.selectedQuoteId = quoteMatch ? quoteMatch[1] : null; render(); });

const initialRoute = location.hash.replace("#", "") || "home";
const initialProductMatch = initialRoute.match(/^product\/(.+)$/);
const initialQuoteMatch = initialRoute.match(/^quote\/(.+)$/);
state.route = initialProductMatch ? "product" : initialQuoteMatch ? "quote" : ["home", "catalog", "brands", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-orders", "admin-customers", "admin-import", "admin-settings"].includes(initialRoute) ? initialRoute : "home";
state.selectedProduct = initialProductMatch ? findProduct(initialProductMatch[1]) : null;
state.selectedQuoteId = initialQuoteMatch ? initialQuoteMatch[1] : null;
applyTheme(state.theme);
render();
renderDrawer();
