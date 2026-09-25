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

const state = {
  route: "home",
  selectedProduct: null,
  search: "",
  category: "",
  sort: "relevance",
  filters: { systems: [], availability: "all", maxPrice: 5000 },
  cart: JSON.parse(localStorage.getItem("fieldops-cart") || "[]"),
  favorites: JSON.parse(localStorage.getItem("fieldops-favorites") || "[]"),
  compare: JSON.parse(localStorage.getItem("fieldops-compare") || "[]"),
  quotes: JSON.parse(localStorage.getItem("fieldops-quotes") || "[]"),
  loadout: JSON.parse(localStorage.getItem("fieldops-loadout") || "null") || { Rifle: "neptune-10" },
  importData: null,
  adminProductSearch: "",
  account: JSON.parse(localStorage.getItem("fieldops-account") || "null"),
  quantity: 1
};

const app = document.querySelector("#app");
const drawer = document.querySelector(".cart-drawer");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const modalLayer = document.querySelector("[data-modal-layer]");
const modalContent = document.querySelector("[data-modal-content]");

const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const findProduct = (id) => products.find((product) => product.id === id);
const stockLabel = (product) => product.stockCount <= 0 ? "Indisponível" : product.stockCount <= 10 ? "Poucas unidades" : "Em estoque";
const catalogPriceMax = () => Math.max(2500, Math.ceil(Math.max(...activeProducts().map((product) => product.price), 2500) / 500) * 500);
const productFps = (product) => Number(String(product.specs?.FPS || "").match(/\d+(?:[.,]\d+)?/)?.[0]?.replace(",", ".") || 0);
const activeProducts = () => products.filter((product) => product.active !== false);
state.cart = state.cart.filter((item) => findProduct(item.id));
state.favorites = state.favorites.filter((id) => findProduct(id));
state.compare = state.compare.filter((id) => findProduct(id));

function persist() {
  localStorage.setItem("fieldops-cart", JSON.stringify(state.cart));
  localStorage.setItem("fieldops-favorites", JSON.stringify(state.favorites));
  localStorage.setItem("fieldops-products", JSON.stringify(products));
  localStorage.setItem("fieldops-compare", JSON.stringify(state.compare));
  localStorage.setItem("fieldops-quotes", JSON.stringify(state.quotes));
  localStorage.setItem("fieldops-loadout", JSON.stringify(state.loadout));
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  let result = activeProducts().filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.system}`.toLowerCase();
    const matchesSystem = !state.filters.systems.length || state.filters.systems.some((system) => product.system.toUpperCase().includes(system));
    const matchesAvailability = state.filters.availability === "all" || (state.filters.availability === "available" && product.stockCount > 10) || (state.filters.availability === "low" && product.stockCount > 0 && product.stockCount <= 10) || (state.filters.availability === "out" && product.stockCount <= 0);
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
  return `<div class="search-zone container"><div class="search-bar"><span class="icon icon-search"></span><input id="global-search" value="${state.search}" placeholder="Buscar equipamento, marca ou categoria" autocomplete="off" /><span class="search-key">⌘ K</span></div><div class="search-results" data-search-results></div></div>`;
}

function homePage() {
  return `<section class="page home-page">
    <section class="home-hero">
      <div class="hero-content"><span class="hero-kicker">AIRSOFT EQUIPMENT / 01</span><h1 class="hero-title">EQUIP<br><em>YOUR</em><br>GAME.</h1><p class="hero-subtitle">Performance, precisão e estratégia para quem leva cada operação a sério.</p><button class="hero-cta" data-route="catalog">Explorar catálogo</button></div>
      <div class="hero-coordinates"><span>System // Online</span><span>Stock // Updated</span><span>Field // Ready</span></div><div class="hero-index"><strong>01</strong> / 04</div>
    </section>
    ${searchBar()}
    <div class="container">
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">01 / ARSENAL</span><h2>Escolha sua<br>plataforma.</h2></div><p>O essencial para entrar em campo com o setup certo, do primeiro jogo ao próximo upgrade.</p></div><div class="category-grid">${categories.map((category) => `<button class="category-card" type="button" data-category="${category.name}" style="--category-image: url('${category.image}')"><span class="category-card-content"><strong>${category.name}</strong><small>${category.count} ↗</small></span></button>`).join("")}</div></section>
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">02 / CURATED GEAR</span><h2>Featured<br>loadout.</h2></div><a class="text-link" href="#catalog" data-route="catalog">Ver catálogo</a></div><div class="product-grid">${products.slice(0, 4).map(productCard).join("")}</div></section>
      <section class="home-section"><div class="loadout-banner"><div class="loadout-copy"><span class="eyebrow">03 / BUILD YOUR LOADOUT</span><h2>Monte uma<br>vantagem.</h2><p>Combine arma, óptica, magazine e proteção em uma configuração que faz sentido para o seu próximo jogo.</p><button class="outline-cta" data-route="loadout">Montar loadout</button></div></div></section>
      <section class="home-section"><div class="section-label"><div><span class="eyebrow">04 / BRANDS</span><h2>Marcas<br>em campo.</h2></div><a class="text-link" href="#catalog" data-route="catalog">Ver todas</a></div><div class="brand-strip">${["ROSSI", "G&G", "KJW", "BLS", "8FIELDS", "VECTOR"].map((brand) => `<button class="brand-pill" data-search-brand="${brand}">${brand}</button>`).join("")}</div></section>
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

function adminShell(active, kicker, title, body) {
  return `<section class="page admin-page"><div class="admin-layout">${adminNav(active)}<div class="admin-main"><div class="admin-topbar"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1></div><div class="admin-top-actions"><button class="outline-cta" data-route="catalog">Ver catálogo</button><button class="icon-button" data-action="account" aria-label="Abrir conta"><span class="icon icon-user"></span></button></div></div>${body}</div></div></section>`;
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
  const items = [["admin", "Dashboard"], ["admin-products", "Produtos"], ["admin-stock", "Estoque"], ["admin-prices", "Preços"], ["admin-quotes", "Orçamentos"], ["admin-customers", "Clientes"], ["admin-import", "Importações"]];
  return `<aside class="admin-sidebar"><div class="admin-side-brand"><span class="eyebrow">FIELD OPS / OPS</span><strong>Command<br>center.</strong></div><nav class="admin-menu">${items.map(([route, label], index) => `<a href="#${route}" data-route="${route}" class="${active === route ? "active" : ""}"><span class="admin-menu-index">${String(index + 1).padStart(2, "0")}</span>${label}</a>`).join("")}</nav><div class="admin-side-foot"><span class="status-dot"></span><span>OPERATIONAL MODE</span><small>v0.1 / LOCAL-FIRST</small></div></aside>`;
}

function adminDashboardPage() {
  const lowStock = activeProducts().filter((product) => product.stockCount <= 10).length;
  const quoteCount = state.quotes.length + 2;
  return adminShell("admin", "01 / OVERVIEW", "Operational overview.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Produtos ativos</span><strong>${activeProducts().length}</strong><small class="trend-up">Catálogo local</small></div><div class="admin-kpi"><span>Orçamentos novos</span><strong>${quoteCount}</strong><small class="trend-up">salvos neste dispositivo</small></div><div class="admin-kpi"><span>Estoque baixo</span><strong>${String(lowStock).padStart(2, "0")}</strong><small class="trend-warn">Revisar agora</small></div><div class="admin-kpi"><span>Sem estoque</span><strong>${activeProducts().filter((product) => product.stockCount <= 0).length}</strong><small>Disponibilidade atual</small></div></div><div class="admin-content-grid"><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE INBOX</span><h2>Orçamentos recentes</h2></div><a href="#admin-quotes" data-route="admin-quotes" class="text-link">Ver todos</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Itens</th><th>Status</th></tr></thead><tbody>${(state.quotes.length ? state.quotes : [{ id: "ORC-000128", customer: "Exemplo de cliente", items: [{ quantity: 2 }], status: "Novo", total: 2328, createdAt: new Date().toISOString() }]).slice(0, 3).map((quote) => `<tr><td><strong>#${quote.id}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td>${quote.customer}</td><td>${quote.items.reduce((sum, item) => sum + item.quantity, 0)} itens</td><td><span class="admin-status status-new">${quote.status}</span></td></tr>`).join("")}</tbody></table></div></section><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">STOCK WATCH</span><h2>Atenção no estoque</h2></div><a href="#admin-stock" data-route="admin-stock" class="text-link">Abrir estoque</a></div><div class="stock-watch">${activeProducts().filter((product) => product.stockCount <= 12).slice(0, 3).map((product) => `<div><span class="stock-watch-bar" style="--bar:${Math.max(10, Math.min(100, product.stockCount * 7))}%"></span><strong>${product.name}</strong><small>${product.stockCount} unidades disponíveis</small><b>Baixo</b></div>`).join("") || `<p class="import-help">Nenhum item em nível crítico.</p>`}</div></section></div><section class="admin-panel quick-actions"><div class="admin-panel-head"><div><span class="eyebrow">FAST ACTIONS</span><h2>Próximo movimento</h2></div></div><div class="quick-action-grid"><button data-route="admin-products"><span>01</span><strong>Revisar produtos</strong><small>Editar dados, preço e status.</small></button><button data-route="admin-import"><span>02</span><strong>Importar planilha</strong><small>Mapear e validar novos itens.</small></button><button data-route="admin-prices"><span>03</span><strong>Atualizar preços</strong><small>Revisar varejo e grupos.</small></button></div></section>`);
}

function adminStockPage() {
  const physical = activeProducts().reduce((sum, product) => sum + product.stockCount, 0);
  return adminShell("admin-stock", "03 / INVENTORY", "Estoque.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Estoque físico</span><strong>${physical}</strong><small>unidades catalogadas</small></div><div class="admin-kpi"><span>Reservado</span><strong>${state.quotes.length}</strong><small>em orçamentos ativos</small></div><div class="admin-kpi"><span>Disponível</span><strong>${Math.max(0, physical - state.quotes.length)}</strong><small class="trend-up">cálculo local</small></div></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">INVENTORY CONTROL</span><h2>Itens para revisão</h2></div><button class="outline-cta" data-route="admin-import">Atualizar por planilha</button></div><div class="inventory-list">${activeProducts().map((product, index) => `<div class="inventory-row"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · SKU FO-${String(index + 231).padStart(5, "0")}</small></div><div class="inventory-value"><strong>${product.stockCount}</strong><small>disponíveis</small></div><span class="admin-status ${product.stockCount <= 12 ? "status-low" : "status-live"}">${product.stockCount <= 12 ? "Revisar" : "Estável"}</span></div>`).join("")}</div></section>`);
}

function adminPricesPage() {
  return adminShell("admin-prices", "04 / PRICING", "Preços.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRICE TABLES</span><h2>Varejo e grupos.</h2></div><span class="admin-sync"><i class="status-dot"></i> Tabela base ativa</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Produto</th><th>Varejo</th><th>Lojista</th><th>Distribuidor</th><th>Atualizado</th></tr></thead><tbody>${activeProducts().map((product) => `<tr><td><strong>${product.name}</strong><small>${product.brand} · ${product.category}</small></td><td><strong>${money(product.price)}</strong></td><td>${money(product.price * .9)}</td><td>${money(product.price * .82)}</td><td>Agora</td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminCustomersPage() {
  const customers = state.quotes.map((quote) => ({ name: quote.customer, phone: quote.phone || "Não informado", type: "Consumidor", quotes: 1 }));
  return adminShell("admin-customers", "06 / RELATIONSHIP", "Clientes.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">CUSTOMER REGISTER</span><h2>${customers.length || 1} clientes identificados</h2></div><span class="admin-sync">Dados locais do MVP</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Cliente</th><th>WhatsApp</th><th>Tipo</th><th>Orçamentos</th></tr></thead><tbody>${customers.length ? customers.map((customer) => `<tr><td><strong>${customer.name}</strong><small>Perfil Field Ops</small></td><td>${customer.phone}</td><td>${customer.type}</td><td>${customer.quotes}</td></tr>`).join("") : `<tr><td colspan="4"><div class="admin-inline-empty">Os clientes aparecerão aqui após o primeiro orçamento.</div></td></tr>`}</tbody></table></div></section>`);
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
  const statuses = ["Novo", "Em análise", "Respondido"];
  quote.status = statuses[(statuses.indexOf(quote.status) + 1) % statuses.length];
  persist();
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
  const record = { id: `ORC-${String(129 + state.quotes.length).padStart(6, "0")}`, customer: form.get("name").toString(), phone: form.get("phone").toString(), city: form.get("city")?.toString() || "—", note: form.get("note")?.toString() || "—", total, status: "Novo", createdAt: new Date().toISOString(), items: state.cart.map((item) => ({ id: item.id, quantity: item.quantity })) };
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
  if (state.route === "admin-quotes") view = adminQuotesPage();
  if (state.route === "admin-customers") view = adminCustomersPage();
  if (state.route === "admin-import") view = adminImportPage();
  app.innerHTML = view + compareBar();
  updateNav();
  bindViewEvents();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateNav() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0); });
  document.querySelectorAll("[data-favorite-count]").forEach((el) => { el.textContent = state.favorites.length; });
  document.querySelectorAll("[data-route]").forEach((el) => el.classList.toggle("active", el.dataset.route === state.route || (state.route === "product" && el.dataset.route === "catalog")));
}

function go(route, product = null) {
  state.route = route;
  state.selectedProduct = product;
  if (route === "product" && product) sessionStorage.setItem("fieldops-product", product.id);
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
function openModal(content) { modalContent.innerHTML = content; modalLayer.classList.add("is-open"); modalLayer.setAttribute("aria-hidden", "false"); }
function closeModal() { modalLayer.classList.remove("is-open"); modalLayer.setAttribute("aria-hidden", "true"); }

function quoteModal() {
  const total = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
  openModal(`<span class="eyebrow">QUOTE / REQUEST</span><h2>Solicite seu<br>orçamento.</h2><p>Deixe seus dados e a equipe Field Ops continua a conversa pelo WhatsApp.</p><form class="form-grid" id="quote-form"><div class="form-row"><label class="form-label">Nome<input name="name" required placeholder="Seu nome" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CEP<input name="zip" placeholder="00000-000" /></label><label class="form-label">Cidade<input name="city" placeholder="São Paulo" /></label></div><label class="form-label">Observação<textarea name="note" placeholder="Algum detalhe sobre seu loadout?"></textarea></label><div class="summary-row total"><span>Total estimado</span><strong>${money(total)}</strong></div><button class="modal-submit" type="submit">Criar orçamento e abrir WhatsApp</button></form>`);
  document.querySelector("#quote-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const quote = quoteRecord(form);
    const lines = state.cart.map((item) => { const product = findProduct(item.id); return `${item.quantity}x ${product.brand} ${product.name}`; }).join("\n");
    const message = `Olá, gostaria de solicitar orçamento.\n\nOrçamento ${quote.id}\n\nItens:\n${lines}\n\nNome: ${form.get("name")}\nWhatsApp: ${form.get("phone")}\nCEP: ${form.get("zip") || "Não informado"}\nCidade: ${form.get("city") || "Não informado"}\nObservação: ${form.get("note") || "—"}`;
    const link = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
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

function bindSearch() {
  const input = document.querySelector("#global-search");
  const results = document.querySelector("[data-search-results]");
  if (!input || !results) return;
  const update = () => {
    state.search = input.value;
    const query = input.value.trim().toLowerCase();
    if (!query) { results.classList.remove("open"); results.innerHTML = ""; return; }
    const matches = activeProducts().filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query)).slice(0, 5);
    results.innerHTML = matches.length ? `<div class="search-result-group">Produtos</div>${matches.map((product) => `<div class="search-result" data-product="${product.id}"><img src="${product.image}" alt="" /><div><strong>${product.brand} ${product.name}</strong><small>${product.category} · ${money(product.price)}</small></div></div>`).join("")}<div class="search-result-group">Categorias</div><div class="search-result" data-category="${query}"><div><strong>Ver resultados para “${query}”</strong><small>Buscar no catálogo</small></div></div>` : `<div class="search-result-group">Sem correspondência</div><div class="search-result" data-route="catalog"><div><strong>Nenhum equipamento encontrado.</strong><small>Ver catálogo completo</small></div></div>`;
    results.classList.add("open");
  };
  input.addEventListener("input", update);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") { state.search = input.value; go("catalog"); } });
  input.addEventListener("focus", () => { if (input.value) update(); });
}

function bindViewEvents() {
  bindSearch();
  document.querySelectorAll("[data-product]").forEach((el) => el.addEventListener("click", (event) => { if (event.target.closest("button")) return; const product = findProduct(el.dataset.product); if (product) go("product", product); }));
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
  const importFile = document.querySelector("#import-file");
  if (importFile) importFile.addEventListener("change", () => analyzeImportFile(importFile.files[0]));
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
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
});

document.addEventListener("click", (event) => {
  const routeEl = event.target.closest(".modal-panel [data-route]");
  if (routeEl) { event.preventDefault(); closeModal(); go(routeEl.dataset.route); }
});

modalLayer.addEventListener("click", (event) => { if (event.target === modalLayer) closeModal(); });
drawerBackdrop.addEventListener("click", closeDrawer);
window.addEventListener("hashchange", () => { const route = location.hash.replace("#", "") || "home"; const productMatch = route.match(/^product\/(.+)$/); state.route = productMatch ? "product" : ["home", "catalog", "brands", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-customers", "admin-import"].includes(route) ? route : "home"; state.selectedProduct = productMatch ? findProduct(productMatch[1]) : null; render(); });

const initialRoute = location.hash.replace("#", "") || "home";
const initialProductMatch = initialRoute.match(/^product\/(.+)$/);
state.route = initialProductMatch ? "product" : ["home", "catalog", "brands", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-customers", "admin-import"].includes(initialRoute) ? initialRoute : "home";
state.selectedProduct = initialProductMatch ? findProduct(initialProductMatch[1]) : null;
render();
renderDrawer();
