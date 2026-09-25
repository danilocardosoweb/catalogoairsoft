const products = [
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
  cart: JSON.parse(localStorage.getItem("fieldops-cart") || "[]"),
  favorites: JSON.parse(localStorage.getItem("fieldops-favorites") || "[]"),
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

function persist() {
  localStorage.setItem("fieldops-cart", JSON.stringify(state.cart));
  localStorage.setItem("fieldops-favorites", JSON.stringify(state.favorites));
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  let result = products.filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.system}`.toLowerCase();
    return (!query || haystack.includes(query)) && (!state.category || product.category === state.category);
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
      <div class="product-foot"><div><strong class="price">${money(product.price)}</strong><span class="stock">${product.stock}</span></div><button class="product-add" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name}">+</button></div>
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
  return `<aside class="filter-panel"><div class="filter-header"><strong>Filter //</strong><small>LOADOUT</small></div><div class="filter-group"><h3>Categoria</h3>${catOptions.map((cat) => `<label class="filter-option"><input type="radio" name="category" value="${cat}" ${state.category === cat ? "checked" : ""}> ${cat}</label>`).join("")}<label class="filter-option"><input type="radio" name="category" value="" ${!state.category ? "checked" : ""}> Todas</label></div><div class="filter-group"><h3>Sistema</h3><label class="filter-option"><input type="checkbox" checked> AEG</label><label class="filter-option"><input type="checkbox"> GBB</label><label class="filter-option"><input type="checkbox"> HPA</label></div><div class="filter-group"><h3>Disponibilidade</h3><label class="filter-option"><input type="checkbox" checked> Em estoque</label><label class="filter-option"><input type="checkbox"> Poucas unidades</label></div></aside>`;
}

function catalogPage() {
  const list = filteredProducts();
  return `<section class="page catalog-page"><div class="container"><div class="page-heading"><div><span class="eyebrow">ARSENAL / CATALOG</span><h1>${state.category || "Equipamentos"}</h1></div><p>Itens selecionados para performance real em campo.</p></div><div class="catalog-layout">${filterPanel()}<div><div class="catalog-toolbar"><div class="result-count"><strong>${list.length} equipamentos</strong> encontrados</div><div style="display:flex;gap:8px;align-items:center"><button class="mobile-filter-button" data-action="filters"><span class="icon icon-filter"></span> Filtros</button><select class="sort-select" id="sort-products" aria-label="Ordenar produtos"><option value="relevance" ${state.sort === "relevance" ? "selected" : ""}>Relevância</option><option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Menor preço</option><option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Maior preço</option><option value="new" ${state.sort === "new" ? "selected" : ""}>Novidades</option></select></div></div>${state.category ? `<div class="active-filters"><button class="active-filter" data-clear-category>${state.category}</button></div>` : ""}<div class="catalog-grid">${list.length ? list.map(productCard).join("") : `<div class="empty-state" style="grid-column:1/-1"><div><div class="empty-mark">⌖</div><h2>Nenhum equipamento encontrado.</h2><p>Tente remover os filtros ou buscar outra marca.</p><button class="outline-cta" data-clear-search>Limpar busca</button></div></div>`}</div></div></div></div></section>`;
}

function productPage(product) {
  return `<section class="page detail-page"><div class="container"><div class="breadcrumb"><a href="#catalog" data-route="catalog">Catálogo</a><span>/</span><a href="#catalog" data-route="catalog">${product.category}</a><span>/</span><b>${product.name}</b></div><div class="detail-grid"><div><div class="detail-gallery-main"><img src="${product.image}" alt="${product.brand} ${product.name}" /><span class="gallery-index">PRODUCT // ${String(products.indexOf(product) + 231).padStart(5, "0")}</span></div><div class="specs-panel"><div class="specs-title"><h2>Tech specs</h2><small>SYSTEM // ${product.system}</small></div><div class="specs-grid">${Object.entries(product.specs).map(([label, value]) => `<div class="spec-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div><div class="accordion"><details open><summary>Descrição</summary><p>${product.description}</p></details><details><summary>Conteúdo da embalagem</summary><p>Produto principal, magazine compatível e manual de operação.</p></details><details><summary>Compatibilidade</summary><p>Consulte o time Field Ops para validar acessórios e peças para o seu loadout.</p></details></div></div></div><div class="detail-info"><span class="detail-brand">${product.brand}</span><h1>${product.name}</h1><span class="detail-type">${product.type} / ${product.meta}</span><div class="detail-price">${money(product.price)}</div><div class="detail-stock"><span class="stock">${product.stock}</span></div><div class="quantity-row"><div class="quantity-control"><button data-quantity="-" aria-label="Diminuir quantidade">−</button><span data-quantity-value>1</span><button data-quantity="+" aria-label="Aumentar quantidade">+</button></div><button class="primary-wide" data-add-detail="${product.id}">Adicionar ao carrinho</button></div><div class="detail-note">Você pode solicitar orçamento pelo WhatsApp no próximo passo.</div></div></div><section class="related-section"><div class="section-label"><div><span class="eyebrow">COMPLETE SEU LOADOUT</span><h2>A próxima<br>peça.</h2></div><a class="text-link" href="#loadout" data-route="loadout">Montar loadout</a></div><div class="product-grid">${products.filter((item) => item.id !== product.id).slice(0, 4).map(productCard).join("")}</div></section></div></section>`;
}

function loadoutPage() {
  const main = products[0];
  const slots = [["01", "Rifle", main.name], ["02", "Óptica", "Escolha uma óptica"], ["03", "Magazine", "Escolha um magazine"], ["04", "Munição", "Escolha uma munição"], ["05", "Proteção", "Escolha sua proteção"]];
  return `<section class="page loadout-page"><div class="container"><div class="loadout-intro"><div><span class="eyebrow">LOADOUT BUILDER / 01</span><h1>Monte seu<br>loadout.</h1></div><p>Comece por uma plataforma. A gente organiza o restante para você entrar em campo preparado.</p></div><div class="loadout-builder"><div class="loadout-visual"><div class="loadout-selected"><div><span class="eyebrow">PRIMARY WEAPON</span><h2>${main.name}</h2></div><div class="loadout-price"><span>Loadout value</span><strong>${money(main.price)}</strong></div></div></div><div class="loadout-form"><div class="loadout-form-header"><div><span class="eyebrow">CONFIGURATION</span><h2>Build your kit.</h2></div><span class="step-count">01/05</span></div>${slots.map(([num, label, value]) => `<div class="loadout-slot"><span class="slot-number">${num}</span><div class="slot-copy"><span>${label}</span><strong>${value}</strong></div><button class="slot-action" data-slot="${label}">${value.startsWith("Escolha") ? "Escolher" : "Editar"}</button></div>`).join("")}<div class="loadout-form-footer"><small>Você pode alterar os itens a qualquer momento.</small><button class="primary-wide" data-action="add-loadout">Adicionar loadout</button></div></div></div></div></section>`;
}

function favoritesPage() {
  const list = products.filter((product) => state.favorites.includes(product.id));
  return `<section class="page catalog-page"><div class="container"><div class="page-heading"><div><span class="eyebrow">SAVED / FAVORITES</span><h1>Favoritos</h1></div><p>Seu equipamento salvo para revisar depois.</p></div>${list.length ? `<div class="catalog-grid">${list.map(productCard).join("")}</div>` : `<div class="empty-state"><div><div class="empty-mark">♡</div><h2>Seu arsenal está vazio.</h2><p>Salve produtos para comparar opções e voltar quando estiver pronto.</p><button class="outline-cta" data-route="catalog">Explorar catálogo</button></div></div>`}</div></section>`;
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

function accountModal() {
  if (state.account) {
    openModal(`<span class="eyebrow">IDENTITY / PROFILE</span><h2>Olá,<br>${state.account.name.split(" ")[0]}.</h2><p>Seu perfil está salvo neste dispositivo. Favoritos, carrinho e loadouts ficam prontos para continuar quando você voltar.</p><div class="account-summary"><div><span>Favoritos</span><strong>${state.favorites.length}</strong></div><div><span>No carrinho</span><strong>${state.cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><div><span>Perfil</span><strong>${state.account.segment || "Cliente"}</strong></div></div><div class="form-grid"><button class="modal-submit" data-action="admin-preview">Abrir painel operacional</button><button class="outline-cta" data-action="account-logout">Trocar perfil</button></div>`);
    return;
  }
  openModal(`<span class="eyebrow">IDENTITY / ACCOUNT</span><h2>Seu perfil<br>de campo.</h2><p>Salve um nome e um WhatsApp para acelerar seus próximos orçamentos. Você continua navegando como visitante.</p><form class="form-grid" id="account-form"><label class="form-label">Nome<input name="name" required placeholder="Como podemos chamar você?" /></label><div class="form-row"><label class="form-label">WhatsApp<input name="phone" placeholder="(11) 99999-9999" /></label><label class="form-label">Perfil<select name="segment"><option>Consumidor</option><option>Lojista</option><option>Distribuidor</option></select></label></div><button class="modal-submit" type="submit">Salvar perfil</button></form><button class="outline-cta account-admin-link" data-action="admin-preview">Abrir painel operacional</button>`);
  document.querySelector("#account-form").addEventListener("submit", (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.account = { name: form.get("name"), phone: form.get("phone"), segment: form.get("segment") }; localStorage.setItem("fieldops-account", JSON.stringify(state.account)); closeModal(); showToast("Perfil salvo neste dispositivo."); });
}

function render() {
  let view = homePage();
  if (state.route === "catalog") view = catalogPage();
  if (state.route === "product" && state.selectedProduct) view = productPage(state.selectedProduct);
  if (state.route === "loadout") view = loadoutPage();
  if (state.route === "favorites") view = favoritesPage();
  if (state.route === "admin") view = adminDashboardPage();
  if (state.route === "admin-products") view = adminProductsPage();
  if (state.route === "admin-stock") view = adminStockPage();
  if (state.route === "admin-quotes") view = adminQuotesPage();
  if (state.route === "admin-import") view = adminImportPage();
  app.innerHTML = view;
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
  if (route !== "catalog") state.category = route === "home" ? "" : state.category;
  history.replaceState({}, "", route === "home" ? "#home" : `#${route}`);
  render();
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  persist();
  render();
  showToast(state.favorites.includes(id) ? "Item favoritado." : "Item removido dos favoritos.");
}

function addToCart(id, quantity = 1) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) existing.quantity += quantity;
  else state.cart.push({ id, quantity });
  persist();
  updateNav();
  renderDrawer();
  openDrawer();
  showToast("Item adicionado ao carrinho.");
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
  itemsEl.innerHTML = state.cart.map((item) => { const product = findProduct(item.id); return `<div class="cart-item"><img src="${product.image}" alt="${product.name}" /><div><strong>${product.name}</strong><small>${item.quantity} × ${money(product.price)}</small><button class="cart-item-remove" data-remove-cart="${item.id}">Remover</button></div><div class="cart-item-price">${money(product.price * item.quantity)}</div></div>`; }).join("");
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
    const lines = state.cart.map((item) => { const product = findProduct(item.id); return `${item.quantity}x ${product.brand} ${product.name}`; }).join("%0A");
    const message = `Olá, gostaria de solicitar orçamento.%0A%0AItens:%0A${lines}%0A%0ANome: ${form.get("name")}%0AWhatsApp: ${form.get("phone")}%0ACEP: ${form.get("zip") || "Não informado"}%0ACidade: ${form.get("city") || "Não informado"}%0AObservação: ${form.get("note") || "—"}`;
    const link = `https://wa.me/5511999999999?text=${message}`;
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

function bindSearch() {
  const input = document.querySelector("#global-search");
  const results = document.querySelector("[data-search-results]");
  if (!input || !results) return;
  const update = () => {
    state.search = input.value;
    const query = input.value.trim().toLowerCase();
    if (!query) { results.classList.remove("open"); results.innerHTML = ""; return; }
    const matches = products.filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query)).slice(0, 5);
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
  document.querySelectorAll("[data-category]").forEach((el) => el.addEventListener("click", () => { state.category = el.dataset.category === state.category ? "" : el.dataset.category; state.search = ""; go("catalog"); }));
  document.querySelectorAll("[data-search-brand]").forEach((el) => el.addEventListener("click", () => { state.search = el.dataset.searchBrand; state.category = ""; go("catalog"); }));
  document.querySelectorAll("[data-route]").forEach((el) => el.addEventListener("click", (event) => { event.preventDefault(); go(el.dataset.route); }));
  document.querySelectorAll("[data-clear-category]").forEach((el) => el.addEventListener("click", () => { state.category = ""; render(); }));
  document.querySelectorAll("[data-clear-search]").forEach((el) => el.addEventListener("click", () => { state.search = ""; state.category = ""; render(); }));
  document.querySelectorAll("input[name=category]").forEach((el) => el.addEventListener("change", () => { state.category = el.value; render(); }));
  const sort = document.querySelector("#sort-products");
  if (sort) sort.addEventListener("change", () => { state.sort = sort.value; render(); });
  document.querySelectorAll("[data-quantity]").forEach((el) => el.addEventListener("click", () => { state.quantity = Math.max(1, state.quantity + (el.dataset.quantity === "+" ? 1 : -1)); document.querySelector("[data-quantity-value]").textContent = state.quantity; }));
  document.querySelectorAll("[data-action=filters]").forEach((el) => el.addEventListener("click", () => {
    openModal(`<span class="eyebrow">FILTER // LOADOUT</span><h2>Filtros.</h2><p>Refine o arsenal para encontrar a configuração certa.</p>${filterPanel()}<button class="modal-submit" data-action="apply-filter-modal">Ver resultados</button>`);
    modalContent.querySelectorAll("input[name=category]").forEach((input) => input.addEventListener("change", () => { state.category = input.value; }));
  }));
  document.querySelectorAll("[data-action=add-loadout]").forEach((el) => el.addEventListener("click", () => addToCart(products[0].id)));
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "cart") { renderDrawer(); openDrawer(); }
  if (action === "close-drawer") closeDrawer();
  if (action === "close-modal") closeModal();
  if (action === "quote") quoteModal();
  if (action === "account") accountModal();
  if (action === "admin-preview") { closeModal(); go("admin"); }
  if (action === "account-logout") { state.account = null; localStorage.removeItem("fieldops-account"); accountModal(); }
  if (action === "simulate-import") { const button = event.target.closest(".import-submit"); if (button) { button.textContent = "Arquivo analisado ✓"; button.disabled = true; showToast("Análise concluída: 15 registros precisam de revisão."); } }
  if (action === "menu") openModal(`<span class="eyebrow">FIELD OPS / MENU</span><h2>Navegue<br>pelo arsenal.</h2><div class="form-grid"><button class="outline-cta" data-route="catalog">Catálogo</button><button class="outline-cta" data-route="loadout">Monte seu loadout</button><button class="outline-cta" data-route="favorites">Favoritos</button><button class="outline-cta" data-route="admin">Painel operacional</button></div>`);
  if (action === "apply-filter-modal") { closeModal(); render(); }
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  if (removeId) { state.cart = state.cart.filter((item) => item.id !== removeId); persist(); renderDrawer(); updateNav(); showToast("Item removido do carrinho."); }
});

document.addEventListener("click", (event) => {
  const routeEl = event.target.closest(".modal-panel [data-route]");
  if (routeEl) { event.preventDefault(); closeModal(); go(routeEl.dataset.route); }
});

modalLayer.addEventListener("click", (event) => { if (event.target === modalLayer) closeModal(); });
drawerBackdrop.addEventListener("click", closeDrawer);
window.addEventListener("hashchange", () => { const route = location.hash.replace("#", "") || "home"; state.route = ["home", "catalog", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-quotes", "admin-import"].includes(route) ? route : "home"; render(); });

const initialRoute = location.hash.replace("#", "") || "home";
 state.route = ["home", "catalog", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-quotes", "admin-import"].includes(initialRoute) ? initialRoute : "home";
render();
renderDrawer();
