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
const shippingStatuses = ["Aguardando separação", "Em separação", "Separado", "Aguardando embalagem", "Embalado", "Etiqueta gerada", "Aguardando postagem", "Postado", "Em transporte", "Saiu para entrega", "Entregue", "Problema na entrega"];
const shippingProviders = [
  { id: "field-economy", carrier: "Field Express", service: "Econômico", base: 16, perKg: 6.8, days: "5 a 7 dias úteis", factor: 5000 },
  { id: "field-fast", carrier: "Field Express", service: "Expresso", base: 25, perKg: 9.5, days: "2 a 3 dias úteis", factor: 5000 },
  { id: "pickup", carrier: "Field Ops", service: "Retirada no local", base: 0, perKg: 0, days: "Disponível em até 1 dia útil", factor: 5000 }
];
const defaultShippingPackages = [
  { id: "box-rifle-p", code: "RIFLE-P", name: "Caixa Rifle P", inner: { length: 105, width: 28, height: 14 }, outer: { length: 108, width: 31, height: 17 }, packagingWeight: 0.65, maxWeight: 8, type: "Caixa", cost: 8, active: true },
  { id: "box-rifle-g", code: "RIFLE-G", name: "Caixa Rifle G", inner: { length: 125, width: 35, height: 18 }, outer: { length: 128, width: 38, height: 21 }, packagingWeight: 0.9, maxWeight: 12, type: "Caixa", cost: 12, active: true },
  { id: "box-pistol", code: "PISTOLA", name: "Caixa Pistola", inner: { length: 38, width: 25, height: 13 }, outer: { length: 41, width: 28, height: 16 }, packagingWeight: 0.35, maxWeight: 4, type: "Caixa", cost: 5, active: true },
  { id: "box-accessories-p", code: "ACESS-P", name: "Caixa Acessórios P", inner: { length: 28, width: 20, height: 12 }, outer: { length: 31, width: 23, height: 15 }, packagingWeight: 0.25, maxWeight: 4, type: "Caixa", cost: 4, active: true },
  { id: "box-accessories-m", code: "ACESS-M", name: "Caixa Acessórios M", inner: { length: 45, width: 32, height: 20 }, outer: { length: 48, width: 35, height: 23 }, packagingWeight: 0.45, maxWeight: 8, type: "Caixa", cost: 7, active: true },
  { id: "box-accessories-g", code: "ACESS-G", name: "Caixa Acessórios G", inner: { length: 65, width: 45, height: 30 }, outer: { length: 68, width: 48, height: 33 }, packagingWeight: 0.7, maxWeight: 12, type: "Caixa", cost: 10, active: true }
];
const defaultShippingSettings = { originZip: "01310-100", originAddress: "Av. Paulista, 1000", originCity: "São Paulo", originState: "SP", cubingFactor: 5000, quoteValidityHours: 24, freeShippingMin: 499, flatSp: 19.9, pickupAddress: "Av. Paulista, 1000 · São Paulo / SP", pickupHours: "Seg a sex · 9h às 18h", pickupInstructions: "Apresente o número do pedido e um documento com foto." };
const storedShipping = JSON.parse(localStorage.getItem("fieldops-shipping") || "null") || {};

function productShippingDefaults(product) {
  const category = String(product.category || "").toLowerCase();
  if (category.includes("rifle")) return { weight: 2.8, length: 95, width: 25, height: 10, packagedWeight: 3.45, packagedLength: 105, packagedWidth: 28, packagedHeight: 14, fragile: false, stackable: false, canCombine: true, separate: false, originalPackaging: true, recommendedPackage: "Caixa Rifle P", logisticsNote: "Fixar a plataforma e proteger o cano." };
  if (category.includes("pistola")) return { weight: 1.1, length: 25, width: 18, height: 5, packagedWeight: 1.35, packagedLength: 32, packagedWidth: 22, packagedHeight: 10, fragile: false, stackable: false, canCombine: true, separate: false, originalPackaging: true, recommendedPackage: "Caixa Pistola", logisticsNote: "Enviar descarregada e protegida." };
  if (category.includes("óptica")) return { weight: 0.3, length: 12, width: 8, height: 6, packagedWeight: 0.45, packagedLength: 18, packagedWidth: 12, packagedHeight: 9, fragile: true, stackable: false, canCombine: true, separate: false, originalPackaging: true, recommendedPackage: "Caixa Acessórios P", logisticsNote: "Proteger lentes contra impacto." };
  if (category.includes("munição")) return { weight: 1, length: 18, width: 12, height: 8, packagedWeight: 1.15, packagedLength: 24, packagedWidth: 17, packagedHeight: 11, fragile: false, stackable: true, canCombine: true, separate: false, originalPackaging: false, recommendedPackage: "Caixa Acessórios P", logisticsNote: "Manter seco e bem lacrado." };
  return { weight: 1.2, length: 30, width: 22, height: 12, packagedWeight: 1.5, packagedLength: 38, packagedWidth: 28, packagedHeight: 17, fragile: false, stackable: true, canCombine: true, separate: false, originalPackaging: false, recommendedPackage: "Caixa Acessórios M", logisticsNote: "Preencher espaços vazios para evitar movimento." };
}

function ensureProductShipping(product) {
  const defaults = productShippingDefaults(product);
  product.shipping = { ...defaults, ...(product.shipping || {}) };
  return product;
}

products.forEach((product, index) => {
  if (typeof product.stockCount !== "number") product.stockCount = product.id === "hi-capa-5-1" ? 12 : product.id === "bb-bio-025" ? 8 : 38 - index * 3;
  if (typeof product.active !== "boolean") product.active = true;
  if (!product.sku) product.sku = `FO-${String(index + 231).padStart(5, "0")}`;
  ensureProductShipping(product);
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
const airdropStatuses = { draft: "Em preparo", scheduled: "Agendado", active: "No ar", ended: "Encerrado", archived: "Arquivado" };
const airdropSeedStart = new Date(Date.now() + 86400000);
const seedAirdrops = [{ id: "airdrop-nightfall", name: "OPERAÇÃO NIGHTFALL", code: "DROP10", discountType: "percent", discountValue: 10, minSubtotal: 450, maxUses: 80, redeemed: 0, startsAt: airdropSeedStart.toISOString(), expiresAt: new Date(airdropSeedStart.getTime() + 3 * 86400000).toISOString(), status: "scheduled", message: "Siga as redes da loja para saber quando o código entrar no ar." }];

const seedRadarContent = [
  { id: "radar-event-arena-sp", type: "event", title: "OPERAÇÃO LINHA VERDE", summary: "Partida aberta para equipes de todos os níveis, com briefing, cronograma e divisão por missões.", description: "Uma operação de sábado com missões curtas, área urbana controlada e espaço para testar seu loadout completo.", image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=82", city: "São Paulo", state: "SP", country: "Brasil", date: "2026-10-03", time: "08:00", organizer: "Arena Tático SP", field: "Arena Tático Leste", category: "Partida", tags: ["AEG", "iniciante", "CQB"], productIds: ["cm16-raider", "bb-bio-025"], status: "published", popularity: 96, distanceKm: 18, source: "Field Ops editorial" },
  { id: "radar-field-campinas", type: "field", title: "ARENA VALE OPERACIONAL", summary: "Campo com mata, estruturas de CQB e agenda de jogos aos domingos na região de Campinas.", description: "Estrutura modular para partidas de assalto e precisão, com locação de equipamentos sob consulta.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=82", city: "Campinas", state: "SP", country: "Brasil", date: "2026-10-11", time: "07:30", organizer: "Arena Vale", field: "Arena Vale Operacional", category: "Campo", tags: ["mata", "CQB", "locação"], productIds: ["plate-carrier-mk2", "red-dot-rd1"], status: "published", popularity: 82, distanceKm: 94, source: "Field Ops editorial" },
  { id: "radar-store-moema", type: "store", title: "PONTO DE APOIO / MOEMA", summary: "Loja parceira com retirada, manutenção rápida e curadoria de gear para o próximo jogo.", description: "Atendimento presencial com peças de reposição, BBs, baterias e revisão básica de plataformas.", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=82", city: "São Paulo", state: "SP", country: "Brasil", date: "2026-09-28", time: "09:00", organizer: "Field Supply", field: "Moema / São Paulo", category: "Loja", tags: ["manutenção", "retirada", "gear"], productIds: ["hi-capa-5-1", "bb-bio-025"], status: "published", popularity: 74, distanceKm: 11, source: "Field Ops editorial" },
  { id: "radar-news-hopup", type: "news", title: "GUIA DE CAMPO: 0.25G OU 0.28G?", summary: "Como escolher a gramatura da BB para equilibrar alcance, consistência e desempenho da sua plataforma.", description: "Um briefing rápido para cruzar FPS, hop-up, vento e distância antes de comprar a próxima carga.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=82", city: "São Paulo", state: "SP", country: "Brasil", date: "2026-09-26", time: "12:00", organizer: "Field Ops editorial", field: "Radar editorial", category: "Guia", tags: ["BB", "precisão", "iniciante"], productIds: ["bb-bio-025", "neptune-10"], status: "published", popularity: 88, distanceKm: 0, source: "Field Ops editorial" },
  { id: "radar-release-rd1", type: "release", title: "RD-1 / NOVO DROP EM CAMPO", summary: "A nova óptica compacta chegou ao catálogo para quem quer aquisição rápida sem pesar o loadout.", description: "Uma leitura de produto conectada ao catálogo: veja especificações, disponibilidade e monte uma configuração em torno do RD-1.", image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=82", city: "São Paulo", state: "SP", country: "Brasil", date: "2026-09-30", time: "10:00", organizer: "Field Ops", field: "Catálogo Field Ops", category: "Lançamento", tags: ["óptica", "upgrade", "vector"], productIds: ["red-dot-rd1", "neptune-10"], status: "published", popularity: 91, distanceKm: 0, source: "Field Ops editorial" },
  { id: "radar-event-lisboa", type: "event", title: "FIELD INTEL / LISBOA", summary: "Leitura internacional para acompanhar o que está acontecendo na comunidade Airsoft fora do Brasil.", description: "Conteúdo internacional demonstrativo para validar a camada global do Radar antes da integração com fontes externas.", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=82", city: "Lisboa", state: "", country: "Portugal", date: "2026-10-18", time: "09:00", organizer: "Field Ops international", field: "Lisboa", category: "Internacional", tags: ["internacional", "comunidade"], productIds: [], status: "published", popularity: 61, distanceKm: 9850, source: "Field Ops editorial" }
];

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
  importHistory: JSON.parse(localStorage.getItem("fieldops-import-history") || "[]"),
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
  shipping: { ...defaultShippingSettings, ...storedShipping, packages: Array.isArray(storedShipping.packages) && storedShipping.packages.length ? storedShipping.packages : defaultShippingPackages },
  cartShipping: JSON.parse(localStorage.getItem("fieldops-cart-shipping") || "null"),
  shippingCache: JSON.parse(localStorage.getItem("fieldops-shipping-cache") || "{}"),
  shippingSort: "price",
  quantity: 1,
  radar: JSON.parse(localStorage.getItem("fieldops-radar") || "null") || { location: { city: defaultSettings.city, state: "SP", country: "Brasil", mode: "manual" }, scope: "nearby", type: "all", radius: 100, sort: "relevance", view: "feed" },
  radarFollowing: JSON.parse(localStorage.getItem("fieldops-radar-following") || "[]"),
  radarContents: JSON.parse(localStorage.getItem("fieldops-radar-content") || "null") || seedRadarContent,
  airdrops: JSON.parse(localStorage.getItem("fieldops-airdrops") || "null") || seedAirdrops,
  appliedAirdropCode: localStorage.getItem("fieldops-airdrop-code") || ""
};

const radarTypes = { event: "Eventos", field: "Campos", store: "Lojas", news: "Notícias", release: "Lançamentos" };
const radarStatuses = { draft: "Rascunho", review: "Em revisão", published: "Publicado", archived: "Arquivado" };
const radarScopes = { nearby: "Perto de mim", state: "Minha cidade / estado", brazil: "Brasil", world: "Internacional" };

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function ensureRadarContentShape(content) {
  return { ...content, type: radarTypes[content.type] ? content.type : "news", status: radarStatuses[content.status] ? content.status : "draft", title: content.title || "Sem título", summary: content.summary || "Conteúdo Radar Airsoft.", description: content.description || content.summary || "", city: content.city || "São Paulo", state: content.state ?? (content.country === "Brasil" ? "SP" : ""), country: content.country || "Brasil", date: content.date || new Date().toISOString().slice(0, 10), time: content.time || "", tags: Array.isArray(content.tags) ? content.tags : String(content.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean), productIds: Array.isArray(content.productIds) ? content.productIds : [], popularity: Number(content.popularity || 0), distanceKm: Number(content.distanceKm || 0), image: content.image || "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=82" };
}

state.radar = { location: { city: defaultSettings.city, state: "SP", country: "Brasil", mode: "manual" }, scope: "nearby", type: "all", radius: 100, sort: "relevance", view: "feed", ...(state.radar || {}) };
state.radar.location = { city: defaultSettings.city, state: "SP", country: "Brasil", mode: "manual", ...(state.radar.location || {}) };
state.radarContents = (Array.isArray(state.radarContents) ? state.radarContents : seedRadarContent).map(ensureRadarContentShape).map((content) => content.country !== "Brasil" ? { ...content, state: "" } : content);
state.radarFollowing = Array.isArray(state.radarFollowing) ? state.radarFollowing : [];
state.airdrops = (Array.isArray(state.airdrops) ? state.airdrops : seedAirdrops).map((campaign) => ({
  id: campaign.id || `airdrop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: campaign.name || "AIRDROP FIELD OPS",
  code: String(campaign.code || "DROP").trim().toUpperCase(),
  discountType: campaign.discountType === "fixed" ? "fixed" : "percent",
  discountValue: Math.max(0, Number(campaign.discountValue) || 0),
  minSubtotal: Math.max(0, Number(campaign.minSubtotal) || 0),
  maxUses: Math.max(0, Number(campaign.maxUses) || 0),
  redeemed: Math.max(0, Number(campaign.redeemed) || 0),
  startsAt: campaign.startsAt || new Date().toISOString(),
  expiresAt: campaign.expiresAt || "",
  status: airdropStatuses[campaign.status] ? campaign.status : "draft",
  message: campaign.message || "Acompanhe as redes da loja para descobrir o próximo drop."
}));

function airdropPhase(campaign) {
  if (!campaign) return "ended";
  if (["ended", "archived"].includes(campaign.status)) return campaign.status;
  const now = Date.now();
  if (campaign.maxUses > 0 && campaign.redeemed >= campaign.maxUses) return "ended";
  if (campaign.expiresAt && new Date(campaign.expiresAt).getTime() <= now) return "ended";
  if (campaign.startsAt && new Date(campaign.startsAt).getTime() > now) return "scheduled";
  return campaign.status === "draft" ? "draft" : "active";
}

function activeAirdrop() {
  return state.airdrops.find((campaign) => airdropPhase(campaign) === "active") || null;
}

function nextAirdrop() {
  return state.airdrops.filter((campaign) => airdropPhase(campaign) === "scheduled").sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0] || null;
}

function airdropDiscount(campaign, subtotal) {
  if (!campaign || subtotal < campaign.minSubtotal) return 0;
  const raw = campaign.discountType === "fixed" ? campaign.discountValue : subtotal * (campaign.discountValue / 100);
  return Math.min(subtotal, Math.max(0, Number(raw) || 0));
}

function appliedAirdrop() {
  const code = String(state.appliedAirdropCode || "").trim().toUpperCase();
  if (!code) return null;
  const campaign = state.airdrops.find((item) => item.code === code);
  return airdropPhase(campaign) === "active" ? campaign : null;
}

function airdropDate(value, includeDate = true) {
  if (!value) return "sem horário definido";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "sem horário definido";
  return date.toLocaleString("pt-BR", includeDate ? { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" } : { hour: "2-digit", minute: "2-digit" });
}

function airdropDiscountLabel(campaign) {
  return campaign.discountType === "fixed" ? `${moneyDetailed(campaign.discountValue)} OFF` : `${campaign.discountValue}% OFF`;
}

function cartTotals() {
  const subtotal = cartSubtotal();
  const selected = selectedShippingOption();
  const freight = selected?.price || 0;
  const airdrop = appliedAirdrop();
  const discount = airdropDiscount(airdrop, subtotal);
  return { subtotal, discount, freight, total: Math.max(0, subtotal - discount + freight), selected, airdrop };
}

const quoteStatuses = ["Novo", "Em análise", "Proposta enviada", "Aguardando cliente", "Aprovado", "Rejeitado", "Expirado", "Convertido em pedido", "Cancelado"];
const orderStatuses = ["Novo pedido", "Pagamento pendente", "Pagamento confirmado", "Preparando pedido", "Separação", "Pronto para envio", "Enviado", "Entregue", "Cancelado"];

function ensureQuoteShape(quote) {
  const subtotal = Number(quote.subtotal ?? quote.total ?? 0);
  const discount = Number(quote.discount || 0);
  const freight = Number(quote.freight || 0);
  const migratedStatus = quote.status === "Respondido" ? "Proposta enviada" : quote.status;
  const history = Array.isArray(quote.history) && quote.history.length ? quote.history : [{ at: quote.createdAt || new Date().toISOString(), actor: "Sistema", from: null, to: migratedStatus || "Novo", note: "Orçamento criado" }];
  return { ...quote, subtotal, discount, freight, total: Math.max(0, subtotal - discount + freight), status: quoteStatuses.includes(migratedStatus) ? migratedStatus : "Novo", shipping: { carrier: "", service: "", method: "", deadline: "", volumes: 1, weight: "", cubedWeight: "", zip: quote.zip || "", address: "", quoteId: "", quotedAt: "", expiresAt: "", options: [], ...quote.shipping }, seller: quote.seller || "Operação local", origin: quote.origin || "Catálogo", validUntil: quote.validUntil || new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), internalNote: quote.internalNote || "", history };
}

function ensureOrderShape(order) {
  return { ...order, status: orderStatuses.includes(order.status) ? order.status : "Novo pedido", items: (order.items || []).map((item) => ({ ...item, picked: Boolean(item.picked), location: item.location || "A definir" })), history: Array.isArray(order.history) && order.history.length ? order.history : [{ at: order.createdAt || new Date().toISOString(), actor: "Sistema", from: null, to: order.status || "Novo pedido", note: "Pedido criado" }], shipping: { carrier: "", service: "", method: "", deadline: "", volumes: 1, tracking: "", zip: order.zip || "", address: "", weight: "", cubedWeight: "", status: "Aguardando separação", packages: [], ...order.shipping } };
}

state.quotes = state.quotes.map(ensureQuoteShape);
state.orders = state.orders.map(ensureOrderShape);

const app = document.querySelector("#app");
const drawer = document.querySelector(".cart-drawer");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const modalLayer = document.querySelector("[data-modal-layer]");
const modalContent = document.querySelector("[data-modal-content]");
let heroInteractionCleanup = null;
let heroRadarCleanup = null;
let heroSensorActivate = null;
let heroRadarPulse = null;
let modalPreviousFocus = null;
let pendingConfirmation = null;

const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const moneyDetailed = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0);
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
  localStorage.setItem("fieldops-import-history", JSON.stringify(state.importHistory));
  localStorage.setItem("fieldops-shipping", JSON.stringify(state.shipping));
  localStorage.setItem("fieldops-cart-shipping", JSON.stringify(state.cartShipping));
  localStorage.setItem("fieldops-shipping-cache", JSON.stringify(state.shippingCache));
  localStorage.setItem("fieldops-profile", JSON.stringify(state.profile));
  localStorage.setItem("fieldops-recent-searches", JSON.stringify(state.recentSearches));
  localStorage.setItem("fieldops-recent-products", JSON.stringify(state.recentProducts));
  localStorage.setItem("fieldops-settings", JSON.stringify(state.settings));
  localStorage.setItem("fieldops-theme", state.theme);
  localStorage.setItem("fieldops-radar", JSON.stringify(state.radar));
  localStorage.setItem("fieldops-radar-following", JSON.stringify(state.radarFollowing));
  localStorage.setItem("fieldops-radar-content", JSON.stringify(state.radarContents));
  localStorage.setItem("fieldops-airdrops", JSON.stringify(state.airdrops));
  localStorage.setItem("fieldops-airdrop-code", state.appliedAirdropCode || "");
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

function radarPlayerName() {
  const source = String(state.account?.name || state.profile?.name || "").trim();
  return (source ? source.split(/\s+/)[0] : "YOU").slice(0, 14).toUpperCase();
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

function radarLocationLabel() {
  const location = state.radar.location || {};
  if (location.mode === "geo") return "Perto de você";
  return [location.city, location.state].filter(Boolean).join(" / ") || "São Paulo / SP";
}

function radarTypeLabel(type) {
  return radarTypes[type] || "Radar";
}

function radarDateLabel(date, time = "") {
  const parsed = new Date(`${date || ""}T${time || "12:00"}:00`);
  if (Number.isNaN(parsed.getTime())) return "Data a confirmar";
  const formatted = parsed.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
  return formatted + (time ? " · " + time : "");
}

function radarDistance(content) {
  if (Number(content.distanceKm) > 0) return Number(content.distanceKm);
  const location = state.radar.location || {};
  const currentCity = String(location.mode === "geo" ? state.settings.city : location.city || "").toLowerCase();
  const currentState = String(location.state || "SP").toLowerCase();
  const city = String(content.city || "").toLowerCase();
  const contentState = String(content.state || "").toLowerCase();
  if (city && currentCity && city === currentCity) return 8;
  if (contentState && currentState && contentState === currentState) return 85;
  if (String(content.country || "Brasil").toLowerCase() === "brasil") return 520;
  return 9850;
}

function radarMatches(content) {
  if (!content || content.status !== "published") return false;
  const location = state.radar.location || {};
  const city = String(location.mode === "geo" ? state.settings.city : location.city || "").toLowerCase();
  const currentState = String(location.state || "SP").toLowerCase();
  const contentCity = String(content.city || "").toLowerCase();
  const contentState = String(content.state || "").toLowerCase();
  const contentCountry = String(content.country || "Brasil").toLowerCase();
  if (state.radar.type !== "all" && content.type !== state.radar.type) return false;
  if (state.radar.scope === "nearby") return contentState === currentState && radarDistance(content) <= Number(state.radar.radius || 100);
  if (state.radar.scope === "state") return (contentCity === city || contentState === currentState) && radarDistance(content) <= Number(state.radar.radius || 100);
  if (state.radar.scope === "brazil") return contentCountry === "brasil";
  return true;
}

function radarSortedContents() {
  const contents = state.radarContents.filter(radarMatches);
  const followed = (content) => state.radarFollowing.includes(content.id);
  const sort = state.radar.sort || "relevance";
  return contents.sort((a, b) => {
    if (sort === "distance") return radarDistance(a) - radarDistance(b) || b.popularity - a.popularity;
    if (sort === "date") return new Date(a.date || 0) - new Date(b.date || 0);
    if (sort === "category") return radarTypeLabel(a.type).localeCompare(radarTypeLabel(b.type)) || b.popularity - a.popularity;
    if (sort === "popularity") return b.popularity - a.popularity;
    return Number(followed(b)) - Number(followed(a)) || b.popularity - a.popularity || radarDistance(a) - radarDistance(b);
  });
}

function radarProductLinks(content) {
  return (content.productIds || []).map((id) => findProduct(id)).filter(Boolean).slice(0, 3).map((product) => `<button class="radar-product-chip" data-action="radar-product" data-radar-product="${product.id}"><span>${escapeHtml(product.name)}</span><small>${money(product.price)}</small></button>`).join("");
}

function radarCard(content, compact = false) {
  const followed = state.radarFollowing.includes(content.id);
  const distance = radarDistance(content);
  return `<article class="radar-card ${compact ? "radar-card-compact" : ""}">
    <button class="radar-card-media" data-action="radar-detail" data-radar-id="${escapeHtml(content.id)}" aria-label="Abrir ${escapeHtml(content.title)}"><img src="${escapeHtml(content.image)}" alt="" loading="lazy" /><span class="radar-type-chip">${escapeHtml(radarTypeLabel(content.type))}</span></button>
    <div class="radar-card-body">
      <div class="radar-card-meta"><span>${escapeHtml(radarDateLabel(content.date, content.time))}</span><button class="radar-follow ${followed ? "is-following" : ""}" data-action="radar-follow" data-radar-id="${escapeHtml(content.id)}" aria-label="${followed ? "Deixar de seguir" : "Seguir"}">${followed ? "Seguindo" : "Seguir"} ${followed ? "✓" : "+"}</button></div>
      <h3><button class="radar-card-title" data-action="radar-detail" data-radar-id="${escapeHtml(content.id)}">${escapeHtml(content.title)}</button></h3>
      <p>${escapeHtml(content.summary)}</p>
      <div class="radar-card-location"><span>⌖</span>${escapeHtml(content.city)}${content.state ? ` / ${escapeHtml(content.state)}` : ""}<small>${distance > 1000 ? "internacional" : `${Math.round(distance)} km`}</small></div>
      ${compact ? "" : `<div class="radar-product-links">${radarProductLinks(content)}</div>`}
    </div>
  </article>`;
}

function radarHomeSection() {
  const featured = state.radarContents.filter((content) => content.status === "published" && (content.city === state.radar.location.city || content.type === "event")).sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  const cards = (featured.length ? featured : state.radarContents.filter((content) => content.status === "published")).slice(0, 3);
  return `<section class="radar-home-block">
    <div class="radar-home-head"><div><span class="eyebrow">RADAR AIRSOFT / FIELD INTEL</span><h2>Radar perto<br>de você.</h2><p>Partidas, campos, lojas e novidades com curadoria para o próximo jogo.</p></div><div class="radar-home-actions"><button class="radar-location-button" data-action="radar-location">⌖ ${escapeHtml(radarLocationLabel())} <span>Alterar</span></button><button class="outline-cta" data-route="radar">Abrir Radar</button></div></div>
    <div class="radar-home-grid">${cards.map((content) => radarCard(content, true)).join("")}</div>
    <div class="radar-home-foot"><span><i class="status-dot"></i>${state.radarContents.filter((content) => content.status === "published").length} sinais publicados</span><button class="text-link" data-route="radar">Ver feed completo</button></div>
  </section>`;
}

function radarMapMarkup(contents) {
  return `<section class="radar-map-panel"><div class="radar-map-head"><div><span class="eyebrow">TACTICAL MAP / LOCAL-FIRST</span><h2>Leitura de campo.</h2></div><span class="admin-sync">Mapa preparado sem rastrear sua posição</span></div><div class="radar-map"><div class="radar-map-grid"></div><div class="radar-map-crosshair"></div><span class="radar-map-label radar-map-label-a">SP / FIELD ZONE</span><span class="radar-map-label radar-map-label-b">LIVE SIGNALS</span>${contents.map((content, index) => `<button class="radar-map-marker ${content.type}" style="--marker-x:${18 + (index * 23) % 68}%;--marker-y:${24 + (index * 17) % 52}%" data-action="radar-detail" data-radar-id="${escapeHtml(content.id)}" title="${escapeHtml(content.title)}"><span>${String(index + 1).padStart(2, "0")}</span></button>`).join("")}<div class="radar-map-center"><span class="status-dot"></span><small>${escapeHtml(radarLocationLabel())}</small></div></div><div class="radar-map-legend"><span><i class="event"></i>Evento</span><span><i class="field"></i>Campo</span><span><i class="store"></i>Apoio</span><span><i class="release"></i>Novidade</span></div></section>`;
}

function radarPage() {
  const contents = radarSortedContents();
  return `<section class="page radar-page"><div class="container">
    <div class="page-heading radar-page-heading"><div><span class="eyebrow">FIELD INTEL / RADAR AIRSOFT</span><h1>Radar<br>perto de você.</h1></div><p>Descubra o que está acontecendo no Airsoft e conecte o próximo movimento ao seu catálogo.</p></div>
    <section class="radar-console">
      <div class="radar-console-top"><div><span class="eyebrow">SINAL ATUAL</span><strong>⌖ ${escapeHtml(radarLocationLabel())}</strong><small>${state.radar.location.mode === "geo" ? "Localização aproximada, usada apenas nesta experiência." : "Cidade e estado salvos neste dispositivo."}</small></div><button class="outline-cta" data-action="radar-location">Ajustar localização</button></div>
      <div class="radar-scope-tabs" role="tablist">${Object.entries(radarScopes).map(([key, label]) => `<button class="${state.radar.scope === key ? "active" : ""}" data-radar-scope="${key}">${escapeHtml(label)}</button>`).join("")}</div>
      <div class="radar-filter-row"><label><span>Categoria</span><select data-radar-type><option value="all">Tudo no radar</option>${Object.entries(radarTypes).map(([key, label]) => `<option value="${key}" ${state.radar.type === key ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select></label><label><span>Raio</span><select data-radar-radius>${[25, 50, 100, 200].map((value) => `<option value="${value}" ${Number(state.radar.radius) === value ? "selected" : ""}>${value} km</option>`).join("")}</select></label><label><span>Ordenar por</span><select data-radar-sort><option value="relevance" ${state.radar.sort === "relevance" ? "selected" : ""}>Relevância</option><option value="distance" ${state.radar.sort === "distance" ? "selected" : ""}>Distância</option><option value="date" ${state.radar.sort === "date" ? "selected" : ""}>Data</option><option value="category" ${state.radar.sort === "category" ? "selected" : ""}>Categoria</option><option value="popularity" ${state.radar.sort === "popularity" ? "selected" : ""}>Popularidade</option></select></label><div class="radar-view-toggle"><span>Visão</span><button class="${state.radar.view === "feed" ? "active" : ""}" data-radar-view="feed">Feed</button><button class="${state.radar.view === "map" ? "active" : ""}" data-radar-view="map">Mapa</button></div></div>
    </section>
    ${state.radar.view === "map" ? radarMapMarkup(contents) : `<div class="radar-feed-head"><div><span class="eyebrow">SIGNALS / ${contents.length}</span><h2>O próximo movimento.</h2></div><small>Atualizado localmente · sem GPS automático</small></div><div class="radar-feed-grid">${contents.length ? contents.map((content) => radarCard(content)).join("") : `<div class="radar-empty"><span class="empty-mark">⌖</span><h3>Nenhum sinal neste raio.</h3><p>Amplie a área ou troque a localização para encontrar novos pontos de interesse.</p><button class="outline-cta" data-action="radar-location">Escolher outra área</button></div>`}</div>`}
  </div></section>`;
}

function radarLocationModal() {
  const location = state.radar.location || {};
  openModal(`<span class="eyebrow">RADAR / LOCATION</span><h2>Defina seu<br>ponto de partida.</h2><p>Escolha uma cidade para receber sinais relevantes. O Radar não pede sua localização automaticamente.</p><div class="radar-location-benefit"><span>01</span><div><strong>Mais contexto no feed.</strong><small>Partidas, campos e lojas mais próximos do seu próximo jogo.</small></div></div><form class="form-grid" id="radar-location-form"><div class="form-row"><label class="form-label">Cidade<input name="city" value="${escapeHtml(location.mode === "geo" ? state.settings.city : location.city || state.settings.city)}" placeholder="São Paulo" required /></label><label class="form-label">Estado<input name="state" value="${escapeHtml(location.state || "SP")}" placeholder="SP" maxlength="2" required /></label></div><button class="modal-submit" type="submit">Salvar ponto de partida</button></form><button class="radar-geo-button" data-action="radar-use-location">Usar minha localização agora ↗</button><button class="radar-skip-button" data-action="radar-skip-location">Agora não</button>`);
  const form = document.querySelector("#radar-location-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.radar.location = { city: String(data.get("city") || state.settings.city).trim(), state: String(data.get("state") || "SP").trim().toUpperCase().slice(0, 2), country: "Brasil", mode: "manual" };
    persist();
    closeModal();
    render();
    showToast("Ponto de partida do Radar salvo.");
  });
}

function requestRadarLocation() {
  if (!navigator.geolocation) { showToast("Seu navegador não oferece localização. Escolha cidade e estado."); return; }
  showToast("Solicitando sua localização aproximada…");
  navigator.geolocation.getCurrentPosition(() => {
    state.radar.location = { city: state.settings.city || "Perto de você", state: "SP", country: "Brasil", mode: "geo" };
    persist();
    closeModal();
    render();
    showToast("Radar ajustado para perto de você.");
  }, () => showToast("Localização não autorizada. Você ainda pode escolher sua cidade manualmente."), { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
}

function toggleRadarFollow(id) {
  if (!id) return;
  const modalWasOpen = modalLayer.classList.contains("is-open");
  state.radarFollowing = state.radarFollowing.includes(id) ? state.radarFollowing.filter((item) => item !== id) : [...state.radarFollowing, id];
  persist();
  if (modalWasOpen) { closeModal(); radarDetailModal(id); }
  else render();
  showToast(state.radarFollowing.includes(id) ? "Sinal seguido." : "Sinal removido dos seguidos.");
}

function copyRadarBriefing(id) {
  const content = state.radarContents.find((item) => item.id === id);
  if (!content) return;
  const briefing = `${content.title}\n${content.city}${content.state ? ` / ${content.state}` : ""}\n${radarDateLabel(content.date, content.time)}\n\n${content.summary}`;
  navigator.clipboard?.writeText(briefing).then(() => showToast("Briefing copiado."), () => showToast("Não foi possível copiar o briefing."));
}

function radarDetailModal(id) {
  const content = state.radarContents.find((item) => item.id === id);
  if (!content) return;
  const followed = state.radarFollowing.includes(content.id);
  const related = (content.productIds || []).map((productId) => findProduct(productId)).filter(Boolean);
  openModal(`<div class="radar-detail"><div class="radar-detail-image"><img src="${escapeHtml(content.image)}" alt="" /><span class="radar-type-chip">${escapeHtml(radarTypeLabel(content.type))}</span></div><div class="radar-detail-copy"><span class="eyebrow">RADAR SIGNAL / ${escapeHtml(content.category || radarTypeLabel(content.type))}</span><h2>${escapeHtml(content.title)}</h2><div class="radar-detail-meta"><span>⌖ ${escapeHtml(content.city)}${content.state ? ` / ${escapeHtml(content.state)}` : ""}</span><span>◷ ${escapeHtml(radarDateLabel(content.date, content.time))}</span></div><p>${escapeHtml(content.description || content.summary)}</p>${content.organizer ? `<div class="radar-detail-info"><span>Organização</span><strong>${escapeHtml(content.organizer)}</strong></div>` : ""}${content.field ? `<div class="radar-detail-info"><span>Local / referência</span><strong>${escapeHtml(content.field)}</strong></div>` : ""}<div class="radar-tag-list">${(content.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div><div class="radar-detail-actions"><button class="hero-cta" data-action="radar-follow" data-radar-id="${escapeHtml(content.id)}">${followed ? "Deixar de seguir" : "Seguir sinal"}</button>${content.type === "event" ? `<button class="outline-cta" data-action="radar-copy" data-radar-id="${escapeHtml(content.id)}">Copiar briefing</button>` : ""}</div></div>${related.length ? `<div class="radar-related"><div class="section-label"><div><span class="eyebrow">CONNECTED LOADOUT</span><h3>Leve este sinal<br>para o catálogo.</h3></div><button class="text-link" data-route="loadout">Montar loadout</button></div><div class="radar-related-products">${related.map((product) => `<button data-action="radar-product" data-radar-product="${product.id}"><img src="${escapeHtml(product.image)}" alt="" /><span><strong>${escapeHtml(product.name)}</strong><small>${money(product.price)}</small></span><b>↗</b></button>`).join("")}</div></div>` : ""}</div>`);
}

function heroRadarMarkup() {
  return `<button class="hero-radar" data-hero-radar data-action="hero-radar" type="button" aria-label="Ativar varredura manual do radar">
    <div class="hero-radar-heading"><span>LIVE / PLAYSPACE</span><b><i></i>TRACKING</b></div>
    <div class="hero-radar-scope" aria-hidden="true">
      <div class="hero-radar-grid"></div><div class="hero-radar-sweep"></div><div class="hero-radar-crosshair"></div>
      <span class="hero-radar-axis axis-n">N</span><span class="hero-radar-axis axis-e">E</span><span class="hero-radar-axis axis-s">S</span><span class="hero-radar-axis axis-w">W</span>
      <span class="hero-radar-enemy enemy-one" data-radar-enemy="0"><i></i></span><span class="hero-radar-enemy enemy-two" data-radar-enemy="1"><i></i></span>
      <span class="hero-radar-player" data-radar-player><i></i><b></b><strong data-radar-player-name>${escapeHtml(radarPlayerName())}</strong></span>
      <span class="hero-radar-ping" data-radar-ping></span>
    </div>
    <div class="hero-radar-readout"><span><strong data-radar-readout>02 HOSTIS</strong><small data-radar-mode>SECTOR MOVING</small></span><em data-radar-coordinates>GRID 04 / 17</em></div>
  </button>`;
}

function airdropHomeSection() {
  const current = activeAirdrop();
  const upcoming = nextAirdrop();
  const campaign = current || upcoming;
  if (!campaign) return "";
  const live = Boolean(current);
  return `<section class="airdrop-home-card ${live ? "is-live" : "is-upcoming"}"><div class="airdrop-home-signal"><span class="airdrop-signal-core">✦</span><span class="status-dot"></span><small>${live ? "AIRDROP / NO AR" : "AIRDROP / INCOMING"}</small></div><div class="airdrop-home-copy"><span class="eyebrow">SOCIAL DROP / FIELD OPS</span><h2>${live ? "Um drop caiu no mapa." : "O próximo drop está em rota."}</h2><p>${escapeHtml(campaign.message)}</p></div><div class="airdrop-home-meta"><strong>${live ? airdropDiscountLabel(campaign) : airdropDate(campaign.startsAt)}</strong><small>${live ? "Código liberado nas redes" : "Siga as redes para saber primeiro"}</small><button class="outline-cta" data-action="cart">${live ? "Resgatar no carrinho" : "Abrir central Airdrop"}</button></div></section>`;
}

function homePage() {
  const feature = recommendedProducts().slice(0, 4);
  return `<section class="page home-page">
    <section class="home-hero" data-hero-interactive aria-label="Banner interativo Field Ops">
      <video class="hero-video" data-hero-video src="videos/operator-airsoft.mp4?v=motion-smooth-21" muted playsinline preload="auto" tabindex="-1" aria-hidden="true"></video>
      <div class="hero-video-shade" aria-hidden="true"></div>
      <div class="hero-content"><span class="hero-kicker">AIRSOFT EQUIPMENT / 01</span><h1 class="hero-title">DOMINE<br><em>O JOGO</em></h1><p class="hero-subtitle">Equipamentos, precisão e adrenalina para quem vive Airsoft.</p><button class="hero-cta" data-route="catalog">Explorar catálogo</button></div>
      ${heroRadarMarkup()}<button class="hero-sensor-button" data-action="hero-sensor" type="button" aria-label="Ativar movimento por giroscópio"><span class="hero-sensor-glyph" aria-hidden="true">⌁</span><span data-sensor-label>Ativar sensor</span><small data-sensor-status>mobile aim / tap to sync</small></button>
      <div class="hero-coordinates"><span>System // Online</span><span>Stock // Updated</span><span>Field // Ready</span></div><div class="hero-index"><strong>01</strong> / 04</div>
    </section>
    ${searchBar()}
    <div class="container">
      ${radarHomeSection()}
      ${airdropHomeSection()}
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
  const payload = { exportedAt: new Date().toISOString(), source: "FIELD OPS", products, quotes: state.quotes, orders: state.orders, shipping: state.shipping, favorites: state.favorites, loadout: state.loadout, settings: state.settings, profile: state.profile, radar: state.radar, radarFollowing: state.radarFollowing, radarContents: state.radarContents, airdrops: state.airdrops };
  downloadLocalFile(`field-ops-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  showToast("Backup completo exportado.");
}

function exportProducts() {
  closeModal();
  const rows = activeProducts().map((product) => ({ sku: product.sku, marca: product.brand, nome: product.name, categoria: product.category, sistema: product.system, preco: product.price, estoque: product.stockCount, peso_kg: product.shipping?.packagedWeight || "", comprimento_cm: product.shipping?.packagedLength || "", largura_cm: product.shipping?.packagedWidth || "", altura_cm: product.shipping?.packagedHeight || "", status: stockLabel(product) }));
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

function radarContentStatusClass(status) {
  return status === "published" ? "status-live" : status === "review" ? "status-progress" : status === "archived" ? "status-low" : "status-wait";
}

async function updateRadarContentStatus(id, status) {
  const content = state.radarContents.find((item) => item.id === id);
  if (!content || !radarStatuses[status]) return;
  if (status === "published" || status === "archived") {
    const confirmed = await confirmAction({
      eyebrow: `RADAR / ${status === "published" ? "APPROVAL" : "ARCHIVE"}`,
      title: status === "published" ? "Publicar este sinal?" : "Arquivar este sinal?",
      message: status === "published" ? "O conteúdo ficará disponível para os usuários do Radar Airsoft." : "O sinal sairá da operação ativa e deixará de aparecer como conteúdo publicado.",
      detail: content.title,
      confirmLabel: status === "published" ? "Publicar sinal" : "Arquivar sinal",
      tone: status === "published" ? "accent" : "warning"
    });
    if (!confirmed) return;
  }
  content.status = status;
  persist();
  render();
  showToast(`Radar: ${radarStatuses[status].toLowerCase()}.`);
}

function adminContentPage() {
  const published = state.radarContents.filter((content) => content.status === "published").length;
  const review = state.radarContents.filter((content) => content.status === "review").length;
  return `${adminShell("admin-content", "06 / RADAR AIRSOFT", "Central de Conteúdo.", `<div class="admin-toolbar"><div><span class="admin-sync"><i class="status-dot"></i> ${published} publicados · ${review} em revisão</span></div><button class="hero-cta" data-action="radar-content-new">Novo sinal</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">RADAR CONTENT / LOCAL-FIRST</span><h2>Publicação e curadoria.</h2></div><span class="admin-sync">Nada é publicado automaticamente</span></div><p class="admin-content-note">Crie eventos, campos, lojas, notícias e lançamentos. O status <strong>Em revisão</strong> prepara a futura etapa de fontes externas e IA sem expor conteúdo antes da aprovação.</p><div class="admin-table-wrap"><table class="admin-table radar-admin-table"><thead><tr><th>Sinal</th><th>Categoria</th><th>Região</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead><tbody>${state.radarContents.map((content) => `<tr><td><div class="admin-product-cell"><img src="${escapeHtml(content.image)}" alt="" /><div><strong>${escapeHtml(content.title)}</strong><small>${escapeHtml(content.summary)}</small></div></div></td><td>${escapeHtml(radarTypeLabel(content.type))}</td><td>${escapeHtml(content.city)}${content.state ? ` / ${escapeHtml(content.state)}` : ""}</td><td>${escapeHtml(radarDateLabel(content.date, content.time))}</td><td><span class="admin-status ${radarContentStatusClass(content.status)}">${escapeHtml(radarStatuses[content.status])}</span></td><td><div class="admin-row-actions"><button data-action="radar-content-edit" data-radar-id="${escapeHtml(content.id)}">Editar</button>${content.status !== "published" ? `<button data-action="radar-content-status" data-radar-status="published" data-radar-id="${escapeHtml(content.id)}">Publicar</button>` : `<button data-action="radar-content-status" data-radar-status="archived" data-radar-id="${escapeHtml(content.id)}">Arquivar</button>`}</div></td></tr>`).join("")}</tbody></table></div></section>`) }`;
}

function radarContentModal(id = null) {
  const current = state.radarContents.find((item) => item.id === id) || ensureRadarContentShape({ type: "event", status: "draft", title: "", summary: "", description: "", city: state.settings.city, state: "SP", country: "Brasil", date: new Date().toISOString().slice(0, 10), time: "09:00", organizer: "Field Ops", field: "", category: "Partida", tags: [], productIds: [], popularity: 50, image: "" });
  const productOptions = activeProducts().map((product) => `<label class="radar-product-check"><input type="checkbox" name="productIds" value="${product.id}" ${(current.productIds || []).includes(product.id) ? "checked" : ""} /><span>${escapeHtml(product.name)}</span><small>${money(product.price)}</small></label>`).join("");
  openModal(`<span class="eyebrow">RADAR / CONTENT ${id ? "EDIT" : "NEW"}</span><h2>${id ? "Editar sinal." : "Novo sinal."}</h2><p>Cadastre uma peça de field intel e escolha quando ela pode aparecer para o público.</p><form class="form-grid radar-content-form" id="radar-content-form"><div class="form-row"><label class="form-label">Título<input name="title" value="${escapeHtml(current.title)}" required /></label><label class="form-label">Tipo<select name="type">${Object.entries(radarTypes).map(([key, label]) => `<option value="${key}" ${current.type === key ? "selected" : ""}>${label}</option>`).join("")}</select></label></div><div class="form-row"><label class="form-label">Cidade<input name="city" value="${escapeHtml(current.city)}" required /></label><label class="form-label">Estado<input name="state" value="${escapeHtml(current.state)}" maxlength="2" /></label></div><div class="form-row"><label class="form-label">Data<input name="date" type="date" value="${escapeHtml(current.date)}" required /></label><label class="form-label">Horário<input name="time" type="time" value="${escapeHtml(current.time)}" /></label></div><label class="form-label">Resumo<textarea name="summary" required>${escapeHtml(current.summary)}</textarea></label><label class="form-label">Descrição completa<textarea name="description">${escapeHtml(current.description)}</textarea></label><div class="form-row"><label class="form-label">Organização<input name="organizer" value="${escapeHtml(current.organizer)}" /></label><label class="form-label">Local / referência<input name="field" value="${escapeHtml(current.field)}" /></label></div><label class="form-label">Imagem URL<input name="image" value="${escapeHtml(current.image)}" placeholder="https://..." /></label><label class="form-label">Tags<input name="tags" value="${escapeHtml((current.tags || []).join(", "))}" placeholder="CQB, iniciante, AEG" /></label><div class="radar-product-builder"><span class="eyebrow">CONNECTED CATALOG</span><strong>Produtos relacionados</strong><div class="radar-product-checks">${productOptions}</div></div><label class="form-label">Status<select name="status">${Object.entries(radarStatuses).map(([key, label]) => `<option value="${key}" ${current.status === key ? "selected" : ""}>${label}</option>`).join("")}</select></label><button class="modal-submit" type="submit">${id ? "Salvar alterações" : "Criar sinal"}</button></form>`);
  document.querySelector("#radar-content-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const record = ensureRadarContentShape({ ...current, id: current.id || `radar-${Date.now()}`, title: String(form.get("title") || "").trim(), type: form.get("type"), city: String(form.get("city") || "").trim(), state: String(form.get("state") || "").trim().toUpperCase().slice(0, 2), country: "Brasil", date: form.get("date"), time: form.get("time"), summary: String(form.get("summary") || "").trim(), description: String(form.get("description") || "").trim(), organizer: String(form.get("organizer") || "").trim(), field: String(form.get("field") || "").trim(), image: String(form.get("image") || "").trim(), tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean), productIds: [...event.currentTarget.querySelectorAll("[name=productIds]:checked")].map((input) => input.value), status: form.get("status") });
    const index = state.radarContents.findIndex((item) => item.id === id);
    if (index >= 0) state.radarContents[index] = record;
    else state.radarContents.unshift(record);
    persist();
    closeModal();
    render();
    showToast(id ? "Sinal atualizado." : "Novo sinal criado.");
  });
}

function adminNav(active) {
  const items = [["admin", "Dashboard"], ["admin-products", "Produtos"], ["admin-stock", "Estoque"], ["admin-prices", "Preços"], ["admin-quotes", "Orçamentos"], ["admin-orders", "Pedidos"], ["admin-shipping", "Expedição"], ["admin-packages", "Embalagens"], ["admin-customers", "Clientes"], ["admin-import", "Importações"], ["admin-content", "Radar / Conteúdo"], ["admin-settings", "Configurações"]];
  return `<aside class="admin-sidebar"><div class="admin-side-brand"><span class="eyebrow">FIELD OPS / OPS</span><strong>Command<br>center.</strong></div><nav class="admin-menu">${items.map(([route, label], index) => `<a href="#${route}" data-route="${route}" class="${active === route ? "active" : ""}"><span class="admin-menu-index">${String(index + 1).padStart(2, "0")}</span>${label}</a>`).join("")}</nav><div class="admin-side-foot"><span class="status-dot"></span><span>OPERATIONAL MODE</span><small>v0.1 / LOCAL-FIRST</small></div></aside>`;
}

function adminDashboardPage() {
  const lowStock = activeProducts().filter((product) => product.stockCount <= state.settings.lowStock).length;
  const quoteCount = state.quotes.length + 2;
  return adminShell("admin", "01 / OVERVIEW", "Operational overview.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Produtos ativos</span><strong>${activeProducts().length}</strong><small class="trend-up">Catálogo local</small></div><div class="admin-kpi"><span>Orçamentos novos</span><strong>${quoteCount}</strong><small class="trend-up">salvos neste dispositivo</small></div><div class="admin-kpi"><span>Estoque baixo</span><strong>${String(lowStock).padStart(2, "0")}</strong><small class="trend-warn">Revisar agora</small></div><div class="admin-kpi"><span>Sem estoque</span><strong>${activeProducts().filter((product) => product.stockCount <= 0).length}</strong><small>Disponibilidade atual</small></div></div><div class="admin-content-grid"><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE INBOX</span><h2>Orçamentos recentes</h2></div><a href="#admin-quotes" data-route="admin-quotes" class="text-link">Ver todos</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Itens</th><th>Status</th></tr></thead><tbody>${(state.quotes.length ? state.quotes : [{ id: "ORC-000128", customer: "Exemplo de cliente", items: [{ quantity: 2 }], status: "Novo", total: 2328, createdAt: new Date().toISOString() }]).slice(0, 3).map((quote) => `<tr><td><strong>#${quote.id}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td>${quote.customer}</td><td>${quote.items.reduce((sum, item) => sum + item.quantity, 0)} itens</td><td><span class="admin-status ${quote.status === "Novo" ? "status-new" : quote.status === "Respondido" ? "status-done" : "status-progress"}">${quote.status}</span></td></tr>`).join("")}</tbody></table></div></section><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">STOCK WATCH</span><h2>Atenção no estoque</h2></div><a href="#admin-stock" data-route="admin-stock" class="text-link">Abrir estoque</a></div><div class="stock-watch">${activeProducts().filter((product) => product.stockCount <= state.settings.lowStock).slice(0, 3).map((product) => `<div><span class="stock-watch-bar" style="--bar:${Math.max(10, Math.min(100, product.stockCount * 7))}%"></span><strong>${product.name}</strong><small>${product.stockCount} unidades disponíveis</small><b>Baixo</b></div>`).join("") || `<p class="import-help">Nenhum item em nível crítico.</p>`}</div></section></div><section class="admin-panel quick-actions"><div class="admin-panel-head"><div><span class="eyebrow">FAST ACTIONS</span><h2>Próximo movimento</h2></div></div><div class="quick-action-grid"><button data-route="admin-products"><span>01</span><strong>Revisar produtos</strong><small>Editar dados, preço e status.</small></button><button data-route="admin-import"><span>02</span><strong>Importar planilha</strong><small>Mapear e validar novos itens.</small></button><button data-route="admin-prices"><span>03</span><strong>Atualizar preços</strong><small>Revisar varejo e grupos.</small></button></div></section>`);
}

function adminStockPage() {
  const physical = activeProducts().reduce((sum, product) => sum + product.stockCount, 0);
  return adminShell("admin-stock", "03 / INVENTORY", "Estoque.", `<div class="admin-kpi-grid"><div class="admin-kpi"><span>Estoque físico</span><strong>${physical}</strong><small>unidades catalogadas</small></div><div class="admin-kpi"><span>Reservado</span><strong>${state.quotes.length}</strong><small>em orçamentos ativos</small></div><div class="admin-kpi"><span>Disponível</span><strong>${Math.max(0, physical - state.quotes.length)}</strong><small class="trend-up">cálculo local</small></div></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">INVENTORY CONTROL</span><h2>Itens para revisão</h2></div><button class="outline-cta" data-route="admin-import">Atualizar por planilha</button></div><div class="inventory-list">${activeProducts().map((product) => `<div class="inventory-row"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · SKU ${product.sku}</small></div><div class="inventory-value"><strong>${product.stockCount}</strong><small>disponíveis</small></div><span class="admin-status ${product.stockCount <= state.settings.lowStock ? "status-low" : "status-live"}">${product.stockCount <= state.settings.lowStock ? "Revisar" : "Estável"}</span><button class="status-action" data-stock-edit="${product.id}">Ajustar</button></div>`).join("")}</div></section>`);
}

function adminPricesPage() {
  return adminShell("admin-prices", "04 / PRICING", "Preços.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRICE TABLES</span><h2>Varejo e grupos.</h2></div><span class="admin-sync"><i class="status-dot"></i> Tabela base ativa</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Produto</th><th>Varejo</th><th>Lojista</th><th>Distribuidor</th><th>Atualizado</th><th>Ação</th></tr></thead><tbody>${activeProducts().map((product) => `<tr><td><strong>${product.name}</strong><small>${product.brand} · ${product.category}</small></td><td><strong>${money(product.price)}</strong></td><td>${money(product.price * .9)}</td><td>${money(product.price * .82)}</td><td>Agora</td><td><button class="status-action" data-edit-price="${product.id}">Editar</button></td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminCustomersPage() {
  const customers = state.quotes.map((quote) => ({ name: quote.customer, phone: quote.phone || "Não informado", type: "Consumidor", quotes: 1 }));
  return adminShell("admin-customers", "06 / RELATIONSHIP", "Clientes.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">CUSTOMER REGISTER</span><h2>${customers.length || 1} clientes identificados</h2></div><span class="admin-sync">Dados locais do MVP</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Cliente</th><th>WhatsApp</th><th>Tipo</th><th>Orçamentos</th></tr></thead><tbody>${customers.length ? customers.map((customer) => `<tr><td><strong>${customer.name}</strong><small>Perfil Field Ops</small></td><td>${customer.phone}</td><td>${customer.type}</td><td>${customer.quotes}</td></tr>`).join("") : `<tr><td colspan="4"><div class="admin-inline-empty">Os clientes aparecerão aqui após o primeiro orçamento.</div></td></tr>`}</tbody></table></div></section>`);
}

function airdropDatetimeLocal(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function airdropControlMarkup() {
  const active = activeAirdrop();
  const upcoming = nextAirdrop();
  const campaigns = [...state.airdrops].sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt));
  return `<section class="admin-panel airdrop-admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">AIRDROP CONTROL / SOCIAL DROP</span><h2>Soltar Airdrop.</h2></div><span class="admin-sync"><i class="status-dot"></i> ${active ? "Drop ativo no ar" : upcoming ? `Próximo: ${airdropDate(upcoming.startsAt)}` : "Nenhum drop ativo"}</span></div><p class="settings-intro">Crie uma janela de desconto para anunciar nas redes. O código só funciona quando o drop está no ar, respeita o valor mínimo e para automaticamente ao atingir o limite.</p><form class="airdrop-form" id="airdrop-form"><div class="form-row"><label class="form-label">Nome da operação<input name="name" required value="OPERAÇÃO NIGHTFALL" placeholder="Ex.: OPERAÇÃO NIGHTFALL" /></label><label class="form-label">Código secreto<input name="code" required value="DROP${String(Date.now()).slice(-2)}" maxlength="24" placeholder="DROP10" /></label></div><div class="form-row"><label class="form-label">Tipo de vantagem<select name="discountType"><option value="percent">Percentual (%)</option><option value="fixed">Valor fixo (R$)</option></select></label><label class="form-label">Desconto<input name="discountValue" required type="number" min="1" step="0.01" value="10" /></label></div><div class="form-row"><label class="form-label">Mínimo do carrinho<input name="minSubtotal" type="number" min="0" step="0.01" value="450" /></label><label class="form-label">Limite de resgates<input name="maxUses" type="number" min="0" step="1" value="80" /><small class="form-help">Use 0 para ilimitado.</small></label></div><div class="form-row"><label class="form-label">Começa em<input name="startsAt" type="datetime-local" value="${airdropDatetimeLocal(upcoming?.startsAt || new Date(Date.now() + 86400000).toISOString())}" /></label><label class="form-label">Termina em<input name="expiresAt" type="datetime-local" value="${airdropDatetimeLocal(upcoming?.expiresAt || new Date(Date.now() + 4 * 86400000).toISOString())}" /></label></div><label class="form-label">Mensagem para a comunidade<textarea name="message" rows="2" placeholder="Siga as redes para saber quando o drop cair.">Siga as redes da loja para saber quando o código entrar no ar.</textarea></label><div class="airdrop-form-actions"><button class="outline-cta" type="submit" name="airdrop-action" value="schedule">Agendar Airdrop</button><button class="hero-cta" type="submit" name="airdrop-action" value="launch">Soltar Airdrop agora</button></div></form><div class="airdrop-admin-list"><div class="admin-panel-head"><div><span class="eyebrow">DROP LOG / ${campaigns.length}</span><h3>Operações cadastradas.</h3></div><small>Local-first · pronto para conectar às redes</small></div>${campaigns.length ? campaigns.map((campaign) => { const phase = airdropPhase(campaign); return `<article class="airdrop-admin-card ${phase === "active" ? "is-live" : ""}"><div class="airdrop-admin-card-main"><div class="airdrop-card-title"><span class="airdrop-signal-core">✦</span><div><strong>${escapeHtml(campaign.name)}</strong><small>${escapeHtml(campaign.code)} · ${airdropDiscountLabel(campaign)}</small></div></div><span class="admin-status ${phase === "active" ? "status-live" : phase === "scheduled" ? "status-progress" : phase === "ended" ? "status-low" : "status-wait"}">${airdropStatuses[phase]}</span></div><div class="airdrop-admin-card-meta"><span>${phase === "scheduled" ? `Entra no ar ${airdropDate(campaign.startsAt)}` : phase === "active" ? `Até ${campaign.expiresAt ? airdropDate(campaign.expiresAt) : "sem prazo"}` : `Criado para ${airdropDate(campaign.startsAt)}`}</span><span>${campaign.redeemed}/${campaign.maxUses || "∞"} resgates</span></div><div class="airdrop-admin-card-actions">${phase === "active" ? `<button class="status-action" data-action="airdrop-end" data-airdrop-id="${campaign.id}">Encerrar drop</button>` : phase === "scheduled" || phase === "draft" ? `<button class="status-action" data-action="airdrop-launch" data-airdrop-id="${campaign.id}">Soltar agora</button>` : ""}</div></article>`; }).join("") : `<div class="admin-inline-empty">Nenhum Airdrop cadastrado. Prepare o primeiro drop para a comunidade.</div>`}</div></section>`;
}

function saveAirdrop(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const action = event.submitter?.value || "schedule";
  const code = String(form.get("code") || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  if (!code) { showToast("Defina um código Airdrop."); return; }
  if (state.airdrops.some((campaign) => campaign.code === code && airdropPhase(campaign) === "active")) { showToast("Já existe um Airdrop ativo com esse código."); return; }
  const now = new Date();
  const startsAt = action === "launch" ? now.toISOString() : (form.get("startsAt") ? new Date(form.get("startsAt")).toISOString() : now.toISOString());
  const expiresAt = form.get("expiresAt") ? new Date(form.get("expiresAt")).toISOString() : new Date(now.getTime() + 72 * 3600000).toISOString();
  if (new Date(expiresAt).getTime() <= new Date(startsAt).getTime()) { showToast("O término precisa ser depois do início."); return; }
  if (action === "launch") state.airdrops.filter((campaign) => airdropPhase(campaign) === "active").forEach((campaign) => { campaign.status = "ended"; });
  state.airdrops.unshift({ id: `airdrop-${Date.now()}`, name: String(form.get("name") || "AIRDROP FIELD OPS").trim(), code, discountType: form.get("discountType") === "fixed" ? "fixed" : "percent", discountValue: Math.max(1, Number(form.get("discountValue")) || 0), minSubtotal: Math.max(0, Number(form.get("minSubtotal")) || 0), maxUses: Math.max(0, Number(form.get("maxUses")) || 0), redeemed: 0, startsAt, expiresAt, status: action === "launch" ? "active" : "scheduled", message: String(form.get("message") || "Siga as redes da loja para descobrir o próximo drop.").trim() });
  persist();
  render();
  showToast(action === "launch" ? "Airdrop solto no mapa." : "Airdrop agendado.");
}

async function launchAirdrop(id) {
  const campaign = state.airdrops.find((item) => item.id === id);
  if (!campaign) return;
  const confirmed = await confirmAction({ eyebrow: "AIRDROP / LAUNCH", title: "Soltar este Airdrop?", message: "O cupom ficará ativo no catálogo e poderá ser resgatado pelos clientes.", detail: `${campaign.name} · ${campaign.code}`, confirmLabel: "Soltar Airdrop", tone: "accent" });
  if (!confirmed) return;
  state.airdrops.filter((item) => airdropPhase(item) === "active" && item.id !== id).forEach((item) => { item.status = "ended"; });
  campaign.status = "active";
  campaign.startsAt = new Date().toISOString();
  if (campaign.expiresAt && new Date(campaign.expiresAt).getTime() <= Date.now()) campaign.expiresAt = new Date(Date.now() + 72 * 3600000).toISOString();
  persist();
  render();
  showToast("Airdrop solto no mapa.");
}

async function endAirdrop(id) {
  const campaign = state.airdrops.find((item) => item.id === id);
  if (!campaign) return;
  const confirmed = await confirmAction({ eyebrow: "AIRDROP / CONTROL", title: "Encerrar este Airdrop?", message: "O cupom deixará de ser aceito imediatamente no carrinho.", detail: `${campaign.name} · ${campaign.code}`, confirmLabel: "Encerrar Airdrop", tone: "warning" });
  if (!confirmed) return;
  campaign.status = "ended";
  persist();
  render();
  showToast("Airdrop encerrado.");
}

function adminSettingsPage() {
  return adminShell("admin-settings", "09 / SYSTEM", "Configurações.", `<section class="admin-panel settings-panel"><div class="admin-panel-head"><div><span class="eyebrow">STORE CONTROL</span><h2>Dados da operação.</h2></div><span class="admin-sync"><i class="status-dot"></i> Salvo neste dispositivo</span></div><p class="settings-intro">Ajuste atendimento, origem logística e regras simples de frete para o MVP local.</p><form class="settings-form" id="settings-form"><div class="form-row"><label class="form-label">Nome da operação<input name="storeName" required value="${state.settings.storeName}" /></label><label class="form-label">Cidade<input name="city" required value="${state.settings.city}" /></label></div><div class="form-row"><label class="form-label">WhatsApp do atendimento<input name="whatsapp" required inputmode="tel" value="${state.settings.whatsapp}" placeholder="5511999999999" /></label><label class="form-label">Alerta de estoque baixo<input name="lowStock" required type="number" min="0" step="1" value="${state.settings.lowStock}" /></label></div><fieldset class="shipping-fieldset"><legend>Logística</legend><div class="form-row"><label class="form-label">CEP de origem<input name="originZip" required value="${state.shipping.originZip}" placeholder="01310-100" /></label><label class="form-label">Endereço de origem<input name="originAddress" required value="${state.shipping.originAddress}" /></label></div><div class="form-row"><label class="form-label">Cidade de origem<input name="originCity" required value="${state.shipping.originCity}" /></label><label class="form-label">Estado<input name="originState" required maxlength="2" value="${state.shipping.originState}" /></label></div><div class="form-row"><label class="form-label">Fator de cubagem<input name="cubingFactor" type="number" min="1" step="1" value="${state.shipping.cubingFactor}" /><small class="form-help">Fórmula: C × L × A ÷ fator.</small></label><label class="form-label">Validade da cotação (horas)<input name="quoteValidityHours" type="number" min="1" step="1" value="${state.shipping.quoteValidityHours}" /></label></div><div class="form-row"><label class="form-label">Frete grátis acima de<input name="freeShippingMin" type="number" min="0" step="0.01" value="${state.shipping.freeShippingMin}" /></label><label class="form-label">Frete base SP<input name="flatSp" type="number" min="0" step="0.01" value="${state.shipping.flatSp}" /></label></div></fieldset><fieldset class="shipping-fieldset"><legend>Retirada no local</legend><label class="form-label">Endereço<input name="pickupAddress" required value="${state.shipping.pickupAddress}" /></label><div class="form-row"><label class="form-label">Horário<input name="pickupHours" required value="${state.shipping.pickupHours}" /></label><label class="form-label">Instruções<input name="pickupInstructions" required value="${state.shipping.pickupInstructions}" /></label></div></fieldset><div class="settings-preview"><span class="eyebrow">ATENDIMENTO</span><strong>${state.settings.storeName} · ${state.settings.city}</strong><small>Frete grátis a partir de ${moneyDetailed(state.shipping.freeShippingMin)} · cubagem ${state.shipping.cubingFactor}.</small></div><div class="settings-actions"><button class="hero-cta" type="submit">Salvar configurações</button><button class="outline-cta" type="button" data-action="reset-local-data">Restaurar dados demo</button></div></form></section>${airdropControlMarkup()}`);
}

function adminProductsPage() {
  const query = state.adminProductSearch.trim().toLowerCase();
  const list = activeProducts().filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query));
  return adminShell("admin-products", "02 / CATALOG", "Produtos.", `<div class="admin-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input id="admin-product-search" value="${state.adminProductSearch}" placeholder="Buscar por produto, marca ou categoria" /></div><button class="hero-cta" data-action="product-new">Novo produto</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PRODUCT REGISTER</span><h2>${list.length} produtos ativos</h2></div><span class="admin-sync"><i class="status-dot"></i> Salvo neste dispositivo</span></div><div class="admin-table-wrap"><table class="admin-table products-table"><thead><tr><th>Produto</th><th>SKU</th><th>Categoria</th><th>Estoque</th><th>Preço</th><th>Status</th><th>Ações</th></tr></thead><tbody>${list.length ? list.map((product) => `<tr><td><div class="admin-product-cell"><img src="${product.image}" alt="" /><div><strong>${product.name}</strong><small>${product.brand} · ${product.type}</small></div></div></td><td>${product.sku}</td><td>${product.category}</td><td><strong>${product.stockCount}</strong><small>unidades</small></td><td><strong>${money(product.price)}</strong></td><td><span class="admin-status ${product.active === false ? "status-low" : "status-live"}">${product.active === false ? "Desativado" : "Publicado"}</span></td><td><div class="admin-row-actions"><button data-edit-product="${product.id}" aria-label="Editar ${product.name}">Editar</button><button data-duplicate-product="${product.id}" aria-label="Duplicar ${product.name}">Duplicar</button><button data-delete-product="${product.id}" aria-label="Excluir ${product.name}">Excluir</button></div></td></tr>`).join("") : `<tr><td colspan="7"><div class="admin-inline-empty">Nenhum produto corresponde à busca.</div></td></tr>`}</tbody></table></div></section>`);
}

function adminQuotesPage() {
  const demo = [{ id: "ORC-000128", customer: "Lucas Mendes", total: 2328, status: "Novo", createdAt: new Date().toISOString(), items: [{ quantity: 3 }] }, { id: "ORC-000127", customer: "Bruno Azevedo", total: 999, status: "Em análise", createdAt: new Date(Date.now() - 3600000).toISOString(), items: [{ quantity: 1 }] }];
  const quotes = [...state.quotes, ...demo];
  return adminShell("admin-quotes", "04 / COMMERCIAL", "Orçamentos.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE PIPELINE</span><h2>${quotes.length} conversas abertas</h2></div><span class="admin-sync"><i class="status-dot"></i> WhatsApp preparado</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>${quotes.filter((quote) => quote.status === "Novo").length}</strong><small>aguardando primeiro contato</small></div><div><span>EM ANÁLISE</span><strong>${quotes.filter((quote) => quote.status === "Em análise").length}</strong><small>time comercial em atendimento</small></div><div><span>RESPONDIDOS</span><strong>${quotes.filter((quote) => quote.status === "Respondido").length}</strong><small>últimas 24 horas</small></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Total estimado</th><th>Itens</th><th>Status</th><th>Ação</th></tr></thead><tbody>${quotes.map((quote) => `<tr><td><strong>#${quote.id.replace("ORC-", "ORC-")}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td>${quote.customer}</td><td>${money(quote.total)}</td><td>${quote.items.reduce((sum, item) => sum + item.quantity, 0)} itens</td><td><span class="admin-status ${quote.status === "Novo" ? "status-new" : quote.status === "Respondido" ? "status-done" : "status-progress"}">${quote.status}</span></td><td>${state.quotes.some((saved) => saved.id === quote.id) ? `<button class="status-action" data-quote-status="${quote.id}">Avançar</button>` : `<span class="admin-table-muted">Demo</span>`}</td></tr>`).join("")}</tbody></table></div></section>`);
}

function adminImportPage() {
  const preview = state.importData;
  const summary = preview ? summarizeImportRows(preview.validRows) : null;
  const lastImport = state.importHistory[0];
  const historyBlock = !preview && lastImport ? `<div class="import-file-banner"><span class="dropzone-mark">↶</span><div><strong>Última carga: ${lastImport.fileName}</strong><small>${lastImport.added} novos · ${lastImport.updated} atualizados · ${new Date(lastImport.at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></div><button class="outline-cta" data-action="import-rollback" data-import-id="${lastImport.id}">Desfazer carga</button></div>` : "";
  const body = preview ? `<div class="import-file-banner"><span class="dropzone-mark">✓</span><div><strong>${preview.fileName}</strong><small>${preview.validCount} registros válidos · ${preview.errorCount} erros de linha</small></div><button class="outline-cta" data-action="import-reset">Escolher outro</button></div><div class="import-preview"><div><span>Encontrados</span><strong>${preview.rows.length}</strong></div><div><span>Novos</span><strong>${summary.added}</strong></div><div><span>Atualizações</span><strong>${summary.updated}</strong></div><div><span>Erros</span><strong class="import-error-count">${preview.errorCount}</strong></div></div><div class="admin-table-wrap import-table"><table class="admin-table"><thead><tr>${preview.headers.slice(0, 6).map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${preview.rows.slice(0, 6).map((row) => `<tr>${preview.headers.slice(0, 6).map((header) => `<td>${row[header.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_")] || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="import-actions"><button class="outline-cta" data-action="import-reset">Cancelar</button><button class="hero-cta" data-action="commit-import" ${preview.validCount ? "" : "disabled"}>Aplicar ${preview.validCount} registros</button></div>` : `<label class="dropzone"><input id="import-file" type="file" accept=".csv,.xlsx,.xls" /><span class="dropzone-mark">↑</span><strong>Solte sua planilha aqui</strong><small>CSV ou Excel até 10 MB</small><span class="outline-cta">Escolher arquivo</span></label><div class="import-preview"><div><span>Última análise</span><strong>—</strong></div><div><span>Novos</span><strong>—</strong></div><div><span>Atualizações</span><strong>—</strong></div><div><span>Erros</span><strong>—</strong></div></div><p class="import-help">O arquivo precisa conter pelo menos uma coluna <strong>Nome Produto</strong> ou <strong>product_name</strong>. Outras colunas aceitas: marca, categoria, preço, estoque, sistema, sku, fps.</p>${historyBlock}`;
  return adminShell("admin-import", "05 / DATA INTAKE", "Importar.", `<div class="import-steps"><div class="import-step ${preview ? "done" : "active"}"><span>01</span><strong>Upload</strong><small>Enviar arquivo</small></div><div class="import-step ${preview ? "active" : ""}"><span>02</span><strong>Analisar</strong><small>Detectar colunas</small></div><div class="import-step"><span>03</span><strong>Validar</strong><small>Revisar erros</small></div><div class="import-step"><span>04</span><strong>Importar</strong><small>Publicar registros</small></div></div><section class="admin-panel import-panel"><div class="admin-panel-head"><div><span class="eyebrow">EXCEL / CSV</span><h2>${preview ? "Revise sua carga." : "Traga seu inventário."}</h2></div><span class="admin-sync">SKU é usado para atualizar itens existentes</span></div>${body}</section>`);
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
  return adminShell("admin-quotes", "04 / COMMERCIAL", "Orçamentos.", `<div class="admin-toolbar quote-toolbar"><div class="admin-search"><span class="icon icon-search"></span><input id="quote-search" value="${state.quoteSearch}" placeholder="Buscar por número, cliente, produto ou SKU" /></div><select class="quote-status-filter" id="quote-status-filter" aria-label="Filtrar orçamentos por status"><option value="all" ${state.quoteStatusFilter === "all" ? "selected" : ""}>Todos os status</option>${quoteStatuses.map((status) => `<option value="${status}" ${state.quoteStatusFilter === status ? "selected" : ""}>${status}</option>`).join("")}</select><button class="hero-cta" data-action="quote-new">Novo orçamento</button></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">QUOTE PIPELINE</span><h2>${list.length} conversas na visão atual</h2></div><span class="admin-sync"><i class="status-dot"></i> ${state.quotes.length} salvos neste dispositivo</span></div><div class="admin-quote-cards"><div><span>NOVOS</span><strong>${allQuotes.filter((quote) => quote.status === "Novo").length}</strong><small>aguardando primeiro contato</small></div><div><span>EM ANÁLISE</span><strong>${allQuotes.filter((quote) => ["Em análise", "Proposta enviada", "Aguardando cliente"].includes(quote.status)).length}</strong><small>propostas em atendimento</small></div><div><span>APROVADOS</span><strong>${allQuotes.filter((quote) => ["Aprovado", "Convertido em pedido"].includes(quote.status)).length}</strong><small>prontos para virar pedido</small></div></div><div class="admin-table-wrap"><table class="admin-table quotes-table"><thead><tr><th>Orçamento</th><th>Cliente</th><th>Total estimado</th><th>Itens</th><th>Status</th><th>Ações</th></tr></thead><tbody>${list.length ? list.map((quote) => { const saved = state.quotes.some((item) => item.id === quote.id); return `<tr><td><strong>#${quote.id}</strong><small>${new Date(quote.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></td><td><strong>${quote.customer}</strong><small>${quote.phone || "WhatsApp não informado"}</small></td><td><strong>${money(quote.total)}</strong></td><td>${(quote.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)} itens</td><td><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></td><td><div class="admin-row-actions quote-row-actions"><button data-action="quote-view" data-quote-id="${quote.id}">Ver</button>${saved ? `<button data-action="quote-edit" data-quote-id="${quote.id}">Editar</button><button data-action="quote-advance" data-quote-id="${quote.id}">Avançar</button>` : `<span class="admin-table-muted">Demo</span>`}</div></td></tr>`; }).join("") : `<tr><td colspan="6"><div class="admin-inline-empty">Nenhum orçamento corresponde aos filtros atuais.</div></td></tr>`}</tbody></table></div></section>`);
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

function normalizeWhatsAppNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return [10, 11].includes(digits.length) ? `55${digits}` : digits;
}

function writeClipboardText(text) {
  const fallback = () => new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      if (!document.execCommand("copy")) throw new Error("copy-failed");
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      area.remove();
    }
  });
  return navigator.clipboard?.writeText ? navigator.clipboard.writeText(text).catch(fallback) : fallback();
}

function copyQuoteSummary(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return;
  writeClipboardText(quoteSummary(quote)).then(() => showToast("Resumo copiado."), () => showToast("Não foi possível copiar neste navegador."));
}

function openQuoteWhatsApp(id) {
  const quote = state.quotes.find((item) => item.id === id) || quoteDemoData().find((item) => item.id === id);
  const phone = normalizeWhatsAppNumber(quote?.phone);
  if (!quote || phone.length < 10) { showToast("Este orçamento não tem um WhatsApp válido."); return; }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(`${quoteSummary(quote)}\n\nVer proposta: ${quoteShareLink(quote)}`)}`;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) window.location.href = url;
}

async function deleteQuote(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote) return;
  const confirmed = await confirmAction({ eyebrow: "QUOTE / DELETE", title: "Excluir orçamento?", message: "Esta proposta será removida da central e não poderá ser recuperada neste dispositivo.", detail: `${quote.id} · ${quote.customer}`, confirmLabel: "Excluir orçamento", tone: "danger" });
  if (!confirmed) return;
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

function quoteEditModalComplete(id) {
  const quote = state.quotes.find((item) => item.id === id);
  const quoteProducts = activeProducts();
  if (!quote) return;
  if (!quoteProducts.length) { showToast("Cadastre pelo menos um produto antes de editar o orçamento."); return; }
  const draftItems = (quote.items?.length ? quote.items : [{ id: quoteProducts[0].id, quantity: 1 }]).map((item) => ({ productId: item.id, quantity: Math.max(1, Number(item.quantity) || 1) }));
  const productOptions = (selectedId) => quoteProducts.map((product) => `<option value="${escapeHtml(product.id)}" ${product.id === selectedId ? "selected" : ""}>${escapeHtml(product.name)} · ${money(product.price)}</option>`).join("");
  const draftSubtotal = () => draftItems.reduce((sum, item) => { const product = findProduct(item.productId); return sum + (product ? product.price * Math.max(1, Number(item.quantity) || 1) : 0); }, 0);
  const value = (field, fallback = "") => escapeHtml(quote[field] ?? fallback);
  openModal(`<span class="eyebrow">QUOTE / ${escapeHtml(quote.id)} / EDIT</span><h2>Editar<br>orçamento.</h2><p>Atualize cliente, produtos, condições e logística em um único lugar. Cada alteração fica registrada no histórico.</p><form class="form-grid" id="quote-edit-form"><div class="form-row"><label class="form-label">Nome do cliente<input name="customer" required value="${value("customer")}" placeholder="Nome completo" /></label><label class="form-label">WhatsApp<input name="phone" required value="${value("phone")}" placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CPF / CNPJ<input name="document" value="${value("document")}" placeholder="Opcional" /></label><label class="form-label">CEP<input name="zip" value="${value("zip")}" placeholder="00000-000" /></label></div><div class="form-row"><label class="form-label">Cidade / UF<input name="city" value="${value("city", "—")}" placeholder="São Paulo / SP" /></label><label class="form-label">Origem<select name="origin">${["Catálogo", "WhatsApp", "Telefone", "Balcão", "Indicação", "Site"].map((origin) => `<option ${quote.origin === origin ? "selected" : ""}>${origin}</option>`).join("")}</select></label></div><label class="form-label">Endereço<input name="address" value="${value("address")}" placeholder="Rua, número, complemento" /></label><div class="form-row"><label class="form-label">Status<select name="status">${quoteStatuses.map((status) => `<option value="${escapeHtml(status)}" ${quote.status === status ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}</select></label><label class="form-label">Validade<input name="validUntil" type="date" value="${value("validUntil")}" /></label></div><label class="form-label">Vendedor responsável<input name="seller" value="${value("seller", "Operação local")}" placeholder="Responsável" /></label><section class="quote-item-builder"><div class="quote-item-builder-head"><div><span class="eyebrow">ITEMS / PRODUTOS</span><strong data-quote-edit-items-count>${draftItems.length} produto${draftItems.length === 1 ? "" : "s"}</strong></div><button class="outline-cta" type="button" data-quote-edit-add-line>Adicionar produto +</button></div><div class="quote-item-lines" id="quote-edit-item-lines"></div><div class="summary-row quote-builder-total"><span>Subtotal dos produtos</span><strong data-quote-edit-subtotal>${money(draftSubtotal())}</strong></div></section><div class="form-row"><label class="form-label">Desconto<input name="discount" type="number" min="0" step="0.01" value="${Number(quote.discount || 0)}" /></label><label class="form-label">Frete<input name="freight" type="number" min="0" step="0.01" value="${Number(quote.freight || 0)}" /></label></div><div class="form-row"><label class="form-label">Transportadora<input name="carrier" value="${escapeHtml(quote.shipping?.carrier || "")}" placeholder="Field Express, Correios..." /></label><label class="form-label">Modalidade<input name="method" value="${escapeHtml(quote.shipping?.method || quote.shipping?.service || "")}" placeholder="Expresso, retirada..." /></label></div><div class="form-row"><label class="form-label">Prazo estimado<input name="deadline" value="${escapeHtml(quote.shipping?.deadline || "")}" placeholder="3 dias úteis" /></label><label class="form-label">Volumes<input name="volumes" type="number" min="1" step="1" value="${Math.max(1, Number(quote.shipping?.volumes) || 1)}" /></label></div><label class="form-label">Rastreamento<input name="tracking" value="${escapeHtml(quote.shipping?.tracking || "")}" placeholder="Código ou link de acompanhamento" /></label><div class="form-row"><label class="form-label">Observação do cliente<textarea name="note" placeholder="Preferências, prazo ou contexto">${value("note")}</textarea></label><label class="form-label">Observação interna<textarea name="internalNote" placeholder="Uso exclusivo do time">${value("internalNote")}</textarea></label></div><button class="modal-submit" type="submit">Salvar orçamento</button></form>`);
  const formElement = document.querySelector("#quote-edit-form");
  const syncDraftItems = () => formElement.querySelectorAll("[data-quote-edit-line]").forEach((line, index) => { draftItems[index] = { productId: line.querySelector("[data-quote-edit-product]")?.value || draftItems[index]?.productId, quantity: Math.max(1, Number(line.querySelector("[data-quote-edit-quantity]")?.value) || 1) }; });
  const renderDraftItems = () => {
    formElement.querySelector("#quote-edit-item-lines").innerHTML = draftItems.map((item, index) => { const product = findProduct(item.productId) || quoteProducts[0]; const quantity = Math.max(1, Number(item.quantity) || 1); item.productId = product.id; item.quantity = quantity; return `<div class="quote-item-line" data-quote-edit-line="${index}"><label class="form-label">Produto<select data-quote-edit-product aria-label="Produto ${index + 1}">${productOptions(product.id)}</select></label><label class="form-label quote-item-quantity">Qtd.<input data-quote-edit-quantity type="number" min="1" step="1" value="${quantity}" aria-label="Quantidade do produto ${index + 1}" /></label><strong class="quote-item-line-total">${money(product.price * quantity)}</strong><button class="quote-line-remove" type="button" data-quote-edit-remove-line="${index}" ${draftItems.length === 1 ? "disabled" : ""} aria-label="Remover produto ${index + 1}">×</button></div>`; }).join("");
    formElement.querySelector("[data-quote-edit-items-count]").textContent = `${draftItems.length} produto${draftItems.length === 1 ? "" : "s"}`;
    formElement.querySelector("[data-quote-edit-subtotal]").textContent = money(draftSubtotal());
  };
  formElement.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-quote-edit-add-line]");
    const removeButton = event.target.closest("[data-quote-edit-remove-line]");
    if (addButton) { syncDraftItems(); draftItems.push({ productId: quoteProducts[0].id, quantity: 1 }); renderDraftItems(); }
    if (removeButton && draftItems.length > 1) { syncDraftItems(); draftItems.splice(Number(removeButton.dataset.quoteEditRemoveLine), 1); renderDraftItems(); }
  });
  formElement.addEventListener("change", (event) => { if (event.target.matches("[data-quote-edit-product], [data-quote-edit-quantity]")) { syncDraftItems(); renderDraftItems(); } });
  formElement.addEventListener("input", (event) => {
    if (!event.target.matches("[data-quote-edit-quantity]")) return;
    const line = event.target.closest("[data-quote-edit-line]");
    const index = Number(line?.dataset.quoteEditLine);
    if (!Number.isInteger(index) || !draftItems[index]) return;
    draftItems[index].quantity = Math.max(1, Number(event.target.value) || 1);
    const product = findProduct(draftItems[index].productId);
    if (product) line.querySelector(".quote-item-line-total").textContent = money(product.price * draftItems[index].quantity);
    formElement.querySelector("[data-quote-edit-subtotal]").textContent = money(draftSubtotal());
  });
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    syncDraftItems();
    const form = new FormData(event.currentTarget);
    const consolidatedItems = [];
    draftItems.forEach((item) => { const product = findProduct(item.productId); if (!product) return; const current = consolidatedItems.find((line) => line.id === product.id); if (current) current.quantity += Math.max(1, Number(item.quantity) || 1); else consolidatedItems.push({ id: product.id, quantity: Math.max(1, Number(item.quantity) || 1) }); });
    if (!consolidatedItems.length) { showToast("Adicione pelo menos um produto ao orçamento."); return; }
    const previous = JSON.stringify({ customer: quote.customer, phone: quote.phone, document: quote.document, zip: quote.zip, city: quote.city, address: quote.address, origin: quote.origin, seller: quote.seller, status: quote.status, subtotal: quote.subtotal, discount: quote.discount, freight: quote.freight, validUntil: quote.validUntil, note: quote.note, internalNote: quote.internalNote, items: quote.items, shipping: quote.shipping });
    const nextStatus = form.get("status")?.toString() || quote.status;
    const seller = form.get("seller")?.toString().trim() || "Operação local";
    quote.customer = form.get("customer")?.toString().trim() || quote.customer;
    quote.phone = form.get("phone")?.toString().trim() || "";
    quote.document = form.get("document")?.toString().trim() || "";
    quote.zip = normalizeZip(form.get("zip")) || form.get("zip")?.toString().trim() || "";
    quote.city = form.get("city")?.toString().trim() || "—";
    quote.address = form.get("address")?.toString().trim() || "";
    quote.origin = form.get("origin")?.toString() || "Catálogo";
    quote.seller = seller;
    quote.validUntil = form.get("validUntil")?.toString() || quote.validUntil;
    quote.items = consolidatedItems;
    quote.subtotal = consolidatedItems.reduce((sum, item) => { const product = findProduct(item.id); return sum + (product ? product.price * item.quantity : 0); }, 0);
    quote.discount = Math.min(quote.subtotal, Math.max(0, Number(form.get("discount")) || 0));
    quote.freight = Math.max(0, Number(form.get("freight")) || 0);
    quote.total = Math.max(0, quote.subtotal - quote.discount + quote.freight);
    quote.note = form.get("note")?.toString().trim() || "—";
    quote.internalNote = form.get("internalNote")?.toString().trim() || "";
    quote.shipping = { ...quote.shipping, carrier: form.get("carrier")?.toString().trim() || "", service: form.get("method")?.toString().trim() || "", method: form.get("method")?.toString().trim() || "", deadline: form.get("deadline")?.toString().trim() || "", volumes: Math.max(1, Number(form.get("volumes")) || 1), tracking: form.get("tracking")?.toString().trim() || "", zip: quote.zip, address: quote.address };
    const statusChanged = nextStatus !== quote.status;
    if (statusChanged) addQuoteHistory(quote, nextStatus, "Etapa atualizada pela central de orçamento.", seller);
    const current = JSON.stringify({ customer: quote.customer, phone: quote.phone, document: quote.document, zip: quote.zip, city: quote.city, address: quote.address, origin: quote.origin, seller: quote.seller, status: quote.status, subtotal: quote.subtotal, discount: quote.discount, freight: quote.freight, validUntil: quote.validUntil, note: quote.note, internalNote: quote.internalNote, items: quote.items, shipping: quote.shipping });
    if (previous !== current && !statusChanged) quote.history = [...(quote.history || []), { at: new Date().toISOString(), actor: seller, from: quote.status, to: quote.status, note: "Dados, produtos ou condições comerciais atualizados." }];
    quote.updatedAt = new Date().toISOString();
    persist();
    closeModal();
    render();
    showToast(`${quote.id} atualizado com sucesso.`);
  });
  renderDraftItems();
}

async function convertQuoteToOrder(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote || quote.status !== "Aprovado") return;
  if (quote.orderId) { showToast(`Este orçamento já virou o pedido ${quote.orderId}.`); return; }
  const confirmed = await confirmAction({ eyebrow: "QUOTE / CONVERSION", title: "Converter em pedido?", message: "A aprovação será transformada em um novo pedido para separação e expedição.", detail: `${quote.id} · ${quote.customer} · ${money(quote.total)}`, confirmLabel: "Criar pedido", tone: "accent" });
  if (!confirmed) return;
  const order = { id: `PED-${String(154 + state.orders.length).padStart(6, "0")}`, quoteId: quote.id, customer: quote.customer, phone: quote.phone, document: quote.document || "", zip: quote.zip || "", address: quote.address || quote.shipping?.address || "", city: quote.city || "", seller: quote.seller, items: quote.items.map((item) => ({ ...item, picked: false, location: "A definir" })), subtotal: quote.subtotal, discount: quote.discount, freight: quote.freight, total: quote.total, status: "Novo pedido", createdAt: new Date().toISOString(), shipping: { ...quote.shipping, address: quote.address || quote.shipping?.address || "", status: "Aguardando separação", packages: quote.shipping?.packages || [] }, history: [{ at: new Date().toISOString(), actor: quote.seller || "Operação local", from: null, to: "Novo pedido", note: `Convertido do orçamento ${quote.id}.` }], note: quote.note || "—" };
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
  if (!quote) return;
  writeClipboardText(quoteShareLink(quote)).then(() => showToast("Link do orçamento copiado."), () => showToast("Não foi possível copiar o link."));
}

function quoteCreateModalV2() {
  const quoteProducts = activeProducts();
  if (!quoteProducts.length) { showToast("Cadastre pelo menos um produto antes de criar o orçamento."); return; }
  const draftItems = [{ productId: quoteProducts[0].id, quantity: 1 }];
  const productOptions = (selectedId) => quoteProducts.map((product) => `<option value="${product.id}" ${product.id === selectedId ? "selected" : ""}>${product.name} · ${money(product.price)}</option>`).join("");
  const draftSubtotal = () => draftItems.reduce((sum, item) => { const product = findProduct(item.productId); return sum + (product ? product.price * Math.max(1, Number(item.quantity) || 1) : 0); }, 0);
  openModal(`<span class="eyebrow">QUOTE / NEW REQUEST</span><h2>Nova central<br>de orçamento.</h2><p>Registre a solicitação e deixe a proposta pronta para análise comercial.</p><form class="form-grid" id="admin-quote-form"><div class="form-row"><label class="form-label">Nome do cliente<input name="name" required placeholder="Nome completo" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CPF / CNPJ<input name="document" placeholder="Opcional" /></label><label class="form-label">CEP<input name="zip" placeholder="00000-000" /></label></div><div class="form-row"><label class="form-label">Cidade / UF<input name="city" placeholder="São Paulo / SP" /></label><label class="form-label">Origem<select name="origin"><option>Catálogo</option><option>WhatsApp</option><option>Telefone</option><option>Balcão</option><option>Indicação</option></select></label></div><section class="quote-item-builder"><div class="quote-item-builder-head"><div><span class="eyebrow">ITEMS / PRODUTOS</span><strong data-quote-items-count>1 produto</strong></div><button class="outline-cta" type="button" data-quote-add-line>Adicionar produto +</button></div><div class="quote-item-lines" id="quote-item-lines"></div><div class="summary-row quote-builder-total"><span>Subtotal dos produtos</span><strong data-quote-subtotal>R$ 0,00</strong></div></section><label class="form-label">Vendedor responsável<input name="seller" value="${state.account?.name || "Operação local"}" placeholder="Responsável" /></label><div class="form-row"><label class="form-label">Observação do cliente<textarea name="note" placeholder="Preferências, prazo ou contexto"></textarea></label><label class="form-label">Observação interna<textarea name="internalNote" placeholder="Uso exclusivo do time"></textarea></label></div><button class="modal-submit" type="submit">Criar orçamento</button></form>`);
  const formElement = document.querySelector("#admin-quote-form");
  const syncDraftItems = () => formElement.querySelectorAll("[data-quote-line]").forEach((line, index) => { draftItems[index] = { productId: line.querySelector("[data-quote-product]")?.value || draftItems[index]?.productId, quantity: Math.max(1, Number(line.querySelector("[data-quote-quantity]")?.value) || 1) }; });
  const renderDraftItems = () => {
    formElement.querySelector("#quote-item-lines").innerHTML = draftItems.map((item, index) => { const product = findProduct(item.productId) || quoteProducts[0]; const quantity = Math.max(1, Number(item.quantity) || 1); item.productId = product.id; item.quantity = quantity; return `<div class="quote-item-line" data-quote-line="${index}"><label class="form-label">Produto<select data-quote-product aria-label="Produto ${index + 1}">${productOptions(product.id)}</select></label><label class="form-label quote-item-quantity">Qtd.<input data-quote-quantity type="number" min="1" step="1" value="${quantity}" aria-label="Quantidade do produto ${index + 1}" /></label><strong class="quote-item-line-total">${money(product.price * quantity)}</strong><button class="quote-line-remove" type="button" data-quote-remove-line="${index}" ${draftItems.length === 1 ? "disabled" : ""} aria-label="Remover produto ${index + 1}">×</button></div>`; }).join("");
    formElement.querySelector("[data-quote-items-count]").textContent = `${draftItems.length} produto${draftItems.length === 1 ? "" : "s"}`;
    formElement.querySelector("[data-quote-subtotal]").textContent = money(draftSubtotal());
  };
  formElement.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-quote-add-line]");
    const removeButton = event.target.closest("[data-quote-remove-line]");
    if (addButton) { syncDraftItems(); draftItems.push({ productId: quoteProducts[0].id, quantity: 1 }); renderDraftItems(); }
    if (removeButton) { syncDraftItems(); draftItems.splice(Number(removeButton.dataset.quoteRemoveLine), 1); if (!draftItems.length) draftItems.push({ productId: quoteProducts[0].id, quantity: 1 }); renderDraftItems(); }
  });
  formElement.addEventListener("change", (event) => { if (event.target.matches("[data-quote-product], [data-quote-quantity]")) { syncDraftItems(); renderDraftItems(); } });
  formElement.addEventListener("input", (event) => {
    if (!event.target.matches("[data-quote-quantity]")) return;
    const line = event.target.closest("[data-quote-line]");
    const index = Number(line?.dataset.quoteLine);
    const quantity = Math.max(1, Number(event.target.value) || 1);
    if (!Number.isInteger(index) || !draftItems[index]) return;
    draftItems[index].quantity = quantity;
    const product = findProduct(draftItems[index].productId);
    if (product) line.querySelector(".quote-item-line-total").textContent = money(product.price * quantity);
    formElement.querySelector("[data-quote-subtotal]").textContent = money(draftSubtotal());
  });
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    syncDraftItems();
    const consolidatedItems = [];
    draftItems.forEach((item) => { const product = findProduct(item.productId); if (!product) return; const current = consolidatedItems.find((line) => line.id === product.id); if (current) current.quantity += Math.max(1, Number(item.quantity) || 1); else consolidatedItems.push({ id: product.id, quantity: Math.max(1, Number(item.quantity) || 1) }); });
    if (!consolidatedItems.length) { showToast("Adicione pelo menos um produto ao orçamento."); return; }
    const form = new FormData(event.currentTarget);
    const subtotal = consolidatedItems.reduce((sum, item) => { const product = findProduct(item.id); return sum + product.price * item.quantity; }, 0);
    const createdAt = new Date().toISOString();
    const seller = form.get("seller")?.toString().trim() || "Operação local";
    const quote = ensureQuoteShape({ id: nextQuoteId(), customer: form.get("name").toString().trim(), phone: form.get("phone").toString().trim(), document: form.get("document")?.toString().trim() || "", zip: form.get("zip")?.toString().trim() || "", city: form.get("city")?.toString().trim() || "—", origin: form.get("origin")?.toString() || "Catálogo", seller, note: form.get("note")?.toString().trim() || "—", internalNote: form.get("internalNote")?.toString().trim() || "", subtotal, discount: 0, freight: 0, total: subtotal, status: "Novo", createdAt, updatedAt: createdAt, validUntil: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), shipping: { carrier: "", method: "", deadline: "", volumes: 1, weight: "" }, items: consolidatedItems, history: [{ at: createdAt, actor: seller, from: null, to: "Novo", note: `Orçamento criado manualmente com ${consolidatedItems.length} produto(s).` }] });
    state.quotes.unshift(quote);
    persist();
    closeModal();
    render();
    showToast("Orçamento criado com todos os produtos.");
  });
  renderDraftItems();
}

function openSellerWhatsApp(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  const phone = normalizeWhatsAppNumber(state.settings.whatsapp);
  if (!quote || phone.length < 10) { showToast("O WhatsApp da operação ainda não foi configurado."); return; }
  const message = `Olá, sou ${quote.customer} e quero falar sobre o orçamento ${quote.id}.\n\n${quoteShareLink(quote)}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) window.location.href = url;
}

function publicQuotePage(id) {
  const quote = quoteCollection().find((item) => item.id === id);
  if (!quote) return `<section class="page public-quote-page"><div class="container"><div class="empty-state"><div><div class="empty-mark">⌖</div><h2>Orçamento não encontrado.</h2><p>Confira o link recebido ou fale com o time ${state.settings.storeName}.</p><a class="hero-cta" href="#catalog" data-route="catalog">Voltar ao catálogo</a></div></div></div></section>`;
  const items = quoteItems(quote);
  return `<section class="page public-quote-page"><div class="container"><div class="public-quote-header"><div><span class="eyebrow">${state.settings.storeName.toUpperCase()} / PROPOSAL</span><h1>Orçamento<br>${quote.id}.</h1><p>Proposta preparada para ${quote.customer}.</p></div><span class="admin-status ${quoteStatusClass(quote.status)}">${quote.status}</span></div><div class="public-quote-grid"><section class="public-quote-card"><div class="quote-section-title"><span class="eyebrow">SUMMARY / RESUMO</span><strong>Seu equipamento em campo</strong></div><div class="public-quote-items">${items.map((item) => `<div class="quote-detail-item"><div><strong>${item.product?.name || item.name || item.id}</strong><small>${item.product?.brand || "Produto"} · ${item.quantity} unidade(s)</small></div><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b></div>`).join("")}</div><div class="quote-financial"><div><span>Subtotal</span><strong>${money(quote.subtotal)}</strong></div><div><span>Desconto</span><strong>− ${money(quote.discount)}</strong></div><div><span>Frete</span><strong>${money(quote.freight)}</strong></div><div class="quote-total"><span>Total final</span><strong>${money(quote.total)}</strong></div></div></section><aside class="public-quote-card public-quote-side"><span class="eyebrow">NEXT STEP / PRÓXIMO PASSO</span><h2>Pronto para<br>seguir?</h2><p>Revise a proposta e escolha como quer continuar com a equipe.</p><button class="hero-cta" data-action="quote-accept-public" data-quote-id="${quote.id}" ${state.quotes.some((item) => item.id === quote.id) && quote.status !== "Convertido em pedido" ? "" : "disabled"}>Aceitar orçamento</button><button class="outline-cta" data-action="quote-whatsapp" data-quote-id="${quote.id}">Falar com vendedor ↗</button><button class="text-link public-copy-link" data-action="quote-share" data-quote-id="${quote.id}">Copiar este link</button><small>Validade: ${quote.validUntil ? new Date(`${quote.validUntil}T12:00:00`).toLocaleDateString("pt-BR") : "A confirmar"}</small></aside></div></div></section>`;
}

async function acceptPublicQuote(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote || quote.status === "Convertido em pedido") return;
  const confirmed = await confirmAction({ eyebrow: "QUOTE / APPROVAL", title: "Aprovar orçamento?", message: "A proposta será marcada como aprovada e ficará pronta para conversão em pedido.", detail: `${quote.id} · ${money(quote.total)}`, confirmLabel: "Aprovar orçamento", tone: "accent" });
  if (!confirmed) return;
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

function shippingStatusClass(status) {
  if (["Entregue", "Postado", "Em transporte", "Saiu para entrega"].includes(status)) return "status-done";
  if (status === "Problema na entrega") return "status-danger";
  if (["Separado", "Embalado", "Etiqueta gerada"].includes(status)) return "status-progress";
  return "status-wait";
}

function adminShippingPage() {
  const orders = state.orders;
  const count = (status) => orders.filter((order) => (order.shipping?.status || "Aguardando separação") === status).length;
  return adminShell("admin-shipping", "06 / SHIPPING OPS", "Expedição.", `<div class="admin-kpi-grid shipping-kpis"><div class="admin-kpi"><span>Aguardando separação</span><strong>${count("Aguardando separação")}</strong><small>pedidos na fila</small></div><div class="admin-kpi"><span>Embalados</span><strong>${count("Embalado")}</strong><small>prontos para etiqueta</small></div><div class="admin-kpi"><span>Etiquetas pendentes</span><strong>${orders.filter((order) => !order.shipping?.labelGeneratedAt && !["Entregue", "Cancelado"].includes(order.status)).length}</strong><small>gerar agora</small></div><div class="admin-kpi"><span>Em transporte</span><strong>${count("Em transporte") + count("Postado")}</strong><small>acompanhamento ativo</small></div></div><section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">FULFILLMENT BOARD</span><h2>${orders.length} pedido(s) na expedição</h2></div><span class="admin-sync"><i class="status-dot"></i> Cartonização local ativa</span></div><div class="admin-table-wrap"><table class="admin-table shipping-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Transportadora</th><th>Volumes</th><th>Peso tarifável</th><th>Cidade</th><th>Status</th><th>Ações</th></tr></thead><tbody>${orders.length ? orders.map((order) => `<tr><td><strong>#${order.id}</strong><small>${order.quoteId || "Sem orçamento"}</small></td><td>${order.customer}</td><td>${order.shipping?.carrier || "A definir"}<small>${order.shipping?.service || order.shipping?.method || "Serviço pendente"}</small></td><td>${order.shipping?.volumes || order.shipping?.packages?.length || 1}</td><td>${order.shipping?.weight ? `${Number(order.shipping.weight).toFixed(2)} kg` : "—"}</td><td>${order.city || "—"}</td><td><span class="admin-status ${shippingStatusClass(order.shipping?.status)}">${order.shipping?.status || "Aguardando separação"}</span></td><td><div class="admin-row-actions shipping-row-actions"><button data-action="order-view" data-order-id="${order.id}">Abrir</button><button data-action="shipping-status" data-order-id="${order.id}">Status</button><button data-action="shipping-label" data-order-id="${order.id}">Etiqueta</button><button data-action="shipping-post" data-order-id="${order.id}">Postar</button><button data-action="shipping-track" data-order-id="${order.id}">Rastrear</button></div></td></tr>`).join("") : `<tr><td colspan="8"><div class="admin-inline-empty">Os pedidos aprovados aparecerão aqui após a conversão do orçamento.</div></td></tr>`}</tbody></table></div></section>`);
}

function adminPackagesPage() {
  return adminShell("admin-packages", "07 / PACKAGING", "Embalagens.", `<section class="admin-panel"><div class="admin-panel-head"><div><span class="eyebrow">PACKAGE REGISTER</span><h2>${state.shipping.packages.filter((pack) => pack.active !== false).length} embalagens ativas</h2></div><button class="hero-cta" data-action="package-new">Nova embalagem</button></div><div class="admin-table-wrap"><table class="admin-table packages-table"><thead><tr><th>Código</th><th>Nome</th><th>Dimensão interna</th><th>Peso máx.</th><th>Custo</th><th>Status</th><th>Ação</th></tr></thead><tbody>${state.shipping.packages.map((pack) => `<tr><td><strong>${pack.code}</strong></td><td>${pack.name}<small>${pack.type}</small></td><td>${pack.inner.length} × ${pack.inner.width} × ${pack.inner.height} cm</td><td>${pack.maxWeight} kg</td><td>${moneyDetailed(pack.cost)}</td><td><span class="admin-status ${pack.active === false ? "status-low" : "status-live"}">${pack.active === false ? "Inativa" : "Ativa"}</span></td><td><button class="status-action" data-action="package-edit" data-package-id="${pack.id}">Editar</button></td></tr>`).join("")}</tbody></table></div></section>`);
}

function packageModal(packageId = null) {
  const pack = state.shipping.packages.find((item) => item.id === packageId) || { id: `pack-${Date.now()}`, code: "", name: "", inner: { length: 0, width: 0, height: 0 }, outer: { length: 0, width: 0, height: 0 }, packagingWeight: 0, maxWeight: 0, type: "Caixa", cost: 0, active: true };
  const editing = Boolean(packageId);
  openModal(`<span class="eyebrow">PACKAGING / ${editing ? "EDIT" : "NEW"}</span><h2>${editing ? "Editar embalagem." : "Nova embalagem."}</h2><p>As dimensões internas alimentam a cartonização. Use centímetros e quilogramas.</p><form class="form-grid" id="package-form"><div class="form-row"><label class="form-label">Código<input name="code" required value="${pack.code}" placeholder="ACESS-M" /></label><label class="form-label">Nome<input name="name" required value="${pack.name}" placeholder="Caixa Acessórios M" /></label></div><div class="form-row"><label class="form-label">C × L × A internos (cm)<div class="form-row form-row-tight"><input name="innerLength" type="number" min="0.1" step="0.1" required value="${pack.inner.length}" /><input name="innerWidth" type="number" min="0.1" step="0.1" required value="${pack.inner.width}" /><input name="innerHeight" type="number" min="0.1" step="0.1" required value="${pack.inner.height}" /></div></label><label class="form-label">Peso da embalagem (kg)<input name="packagingWeight" type="number" min="0" step="0.01" required value="${pack.packagingWeight}" /></label></div><div class="form-row"><label class="form-label">C × L × A externos (cm)<div class="form-row form-row-tight"><input name="outerLength" type="number" min="0.1" step="0.1" required value="${pack.outer.length}" /><input name="outerWidth" type="number" min="0.1" step="0.1" required value="${pack.outer.width}" /><input name="outerHeight" type="number" min="0.1" step="0.1" required value="${pack.outer.height}" /></div></label><label class="form-label">Peso máximo (kg)<input name="maxWeight" type="number" min="0.1" step="0.1" required value="${pack.maxWeight}" /></label></div><div class="form-row"><label class="form-label">Tipo<select name="type"><option ${pack.type === "Caixa" ? "selected" : ""}>Caixa</option><option ${pack.type === "Envelope" ? "selected" : ""}>Envelope</option><option ${pack.type === "Tubete" ? "selected" : ""}>Tubete</option></select></label><label class="form-label">Custo<input name="cost" type="number" min="0" step="0.01" required value="${pack.cost}" /></label></div><label class="form-label">Status<select name="active"><option value="true" ${pack.active !== false ? "selected" : ""}>Ativa</option><option value="false" ${pack.active === false ? "selected" : ""}>Inativa</option></select></label><button class="modal-submit" type="submit">Salvar embalagem</button></form>`);
  document.querySelector("#package-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = ["innerLength", "innerWidth", "innerHeight", "outerLength", "outerWidth", "outerHeight", "maxWeight"].map((field) => Number(form.get(field)));
    if (values.some((value) => !Number.isFinite(value) || value <= 0)) { showToast("Preencha todas as dimensões e capacidades da embalagem."); return; }
    const data = { ...pack, code: form.get("code").toString().trim().toUpperCase(), name: form.get("name").toString().trim(), inner: { length: values[0], width: values[1], height: values[2] }, outer: { length: values[3], width: values[4], height: values[5] }, packagingWeight: Math.max(0, Number(form.get("packagingWeight")) || 0), maxWeight: values[6], type: form.get("type").toString(), cost: Math.max(0, Number(form.get("cost")) || 0), active: form.get("active") === "true" };
    const index = state.shipping.packages.findIndex((item) => item.id === pack.id);
    if (index >= 0) state.shipping.packages[index] = data;
    else state.shipping.packages.push({ ...data, id: pack.id });
    persist(); closeModal(); render(); showToast("Embalagem salva.");
  });
}

function shippingStatusModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  openModal(`<span class="eyebrow">SHIPPING / ${order.id}</span><h2>Atualizar<br>expedição.</h2><p>Registre a etapa real do pedido sem perder o histórico.</p><form class="form-grid" id="shipping-status-form"><label class="form-label">Status<select name="status">${shippingStatuses.map((status) => `<option ${status === (order.shipping?.status || shippingStatuses[0]) ? "selected" : ""}>${status}</option>`).join("")}</select></label><label class="form-label">Observação<textarea name="note" placeholder="Ex.: volume conferido e lacrado"></textarea></label><button class="modal-submit" type="submit">Salvar etapa</button></form>`);
  document.querySelector("#shipping-status-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = form.get("status").toString();
    order.shipping.status = next;
    order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Expedição local", from: order.status, to: order.status, note: `${next}: ${form.get("note")?.toString().trim() || "Etapa atualizada."}` }];
    persist(); closeModal(); render(); showToast(`Expedição ${order.id}: ${next}.`);
  });
}

function generateShippingLabel(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.shipping.labelGeneratedAt = new Date().toISOString();
  if (!order.shipping.status || order.shipping.status === "Aguardando separação") order.shipping.status = "Etiqueta gerada";
  order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Expedição local", from: order.status, to: order.status, note: "Etiqueta preparada para impressão." }];
  persist(); render(); printShippingLabel(id); showToast("Etiqueta preparada.");
}

function printShippingLabel(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const tracking = order.shipping.tracking || `FO${String(order.id).replace(/\D/g, "")}`;
  openModal(`<div class="shipping-label"><span class="eyebrow">FIELD OPS / SHIPPING LABEL</span><h2>${order.id}</h2><div class="label-code">${tracking}</div><div class="label-grid"><div><span>DESTINATÁRIO</span><strong>${order.customer}</strong><small>${order.address || order.shipping.address || "Endereço a confirmar"}</small><small>${order.zip || order.shipping.zip || "CEP a confirmar"} · ${order.city || "Cidade"}</small></div><div><span>TRANSPORTADORA</span><strong>${order.shipping.carrier || "A definir"}</strong><small>${order.shipping.service || order.shipping.method || "Serviço"}</small><small>Volume 1 de ${order.shipping.volumes || 1}</small></div></div><button class="modal-submit" data-action="print-now">Imprimir etiqueta</button></div>`);
}

function markOrderPosted(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.shipping.status = "Postado";
  order.shipping.tracking = order.shipping.tracking || `FO${String(order.id).replace(/\D/g, "")}`;
  order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Expedição local", from: order.status, to: order.status, note: `Pedido postado. Rastreamento ${order.shipping.tracking}.` }];
  persist(); render(); showToast(`Pedido ${order.id} marcado como postado.`);
}

function trackingModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const events = [...(order.history || [])].reverse();
  openModal(`<span class="eyebrow">TRACKING / ${order.id}</span><h2>Acompanhe<br>o envio.</h2><div class="tracking-code"><span>CÓDIGO</span><strong>${order.shipping.tracking || "Ainda não gerado"}</strong></div><div class="quote-timeline">${events.map((entry) => `<div class="quote-timeline-item"><i></i><div><strong>${entry.to}</strong><small>${new Date(entry.at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small><p>${entry.note || "Atualização registrada."}</p></div></div>`).join("")}</div>`);
}

function orderPackageModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  openModal(`<span class="eyebrow">ORDER / ${order.id} / PACKAGING</span><h2>Escolha a<br>embalagem.</h2><p>O sistema sugere a menor caixa compatível. O operador pode ajustar antes de embalar.</p><div class="package-choice-list">${state.shipping.packages.filter((pack) => pack.active !== false).map((pack) => `<button class="loadout-picker-item" data-action="select-order-package" data-order-id="${order.id}" data-package-id="${pack.id}"><span><strong>${pack.name}</strong><small>${pack.inner.length} × ${pack.inner.width} × ${pack.inner.height} cm · até ${pack.maxWeight} kg</small></span><b>${order.shipping?.packages?.[0]?.packageId === pack.id ? "✓" : "+"}</b></button>`).join("")}</div>`);
}

function applyOrderPackage(orderId, packageId) {
  const order = state.orders.find((item) => item.id === orderId);
  const pack = state.shipping.packages.find((item) => item.id === packageId);
  if (!order || !pack) return;
  const itemWeight = (order.items || []).reduce((sum, item) => sum + (findProduct(item.id)?.shipping?.packagedWeight || findProduct(item.id)?.shipping?.weight || 0) * Number(item.quantity || 0), 0);
  const realWeight = Number((itemWeight + Number(pack.packagingWeight || 0)).toFixed(2));
  const cubedWeight = Number(((pack.outer.length * pack.outer.width * pack.outer.height) / Number(state.shipping.cubingFactor || 5000)).toFixed(2));
  order.shipping.packages = [{ packageId: pack.id, packageName: pack.name, dimensions: { ...pack.outer }, realWeight, cubedWeight, chargeableWeight: Math.max(realWeight, cubedWeight) }];
  order.shipping.volumes = 1;
  order.shipping.weight = realWeight;
  order.shipping.cubedWeight = cubedWeight;
  const provider = shippingProviders.find((item) => item.carrier === order.shipping.carrier && item.service === (order.shipping.service || order.shipping.method)) || shippingProviders[0];
  order.freight = Number((provider.base + Math.max(provider.perKg * Math.max(realWeight, cubedWeight), Number(state.shipping.flatSp || 0))).toFixed(2));
  order.total = Math.max(0, Number(order.subtotal || 0) - Number(order.discount || 0) + order.freight);
  order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Expedição local", from: order.status, to: order.status, note: `Embalagem alterada para ${pack.name}. Frete recalculado.` }];
  persist(); closeModal(); orderDetailModal(orderId); showToast("Embalagem aplicada e frete recalculado.");
}

function orderDetailModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const items = (order.items || []).map((item, index) => ({ ...item, index, product: findProduct(item.id) }));
  const history = [...(order.history || [])].reverse();
  const picked = items.filter((item) => item.picked).length;
  openModal(`<span class="eyebrow">ORDER / ${order.id}</span><h2>Detalhes do<br>pedido.</h2><div class="quote-detail-head"><div><strong>${order.customer}</strong><small>${order.phone || "WhatsApp não informado"} · ${order.city || "Cidade não informada"}</small></div><span class="admin-status ${orderStatusClass(order.status)}">${order.status}</span></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">PICKING / SEPARAÇÃO</span><strong>${picked}/${items.length} linhas separadas</strong></div><div class="quote-detail-items">${items.map((item) => `<div class="quote-detail-item order-item-row"><div><strong>${item.product?.name || item.name || item.id}</strong><small>SKU ${item.product?.sku || item.product?.id || item.id || "—"} · ${item.quantity} unidade(s) · ${item.location || "A definir"}</small></div><div class="order-item-actions"><b>${item.product ? money(item.product.price * item.quantity) : "—"}</b><button class="status-action ${item.picked ? "is-picked" : ""}" data-action="order-toggle-item" data-order-id="${order.id}" data-item-index="${item.index}">${item.picked ? "Separado ✓" : "Separar"}</button></div></div>`).join("")}</div></div><div class="quote-detail-section"><div class="quote-section-title"><span class="eyebrow">SHIPMENT / EXPEDIÇÃO</span><strong>Preparação logística</strong></div><div class="quote-info-grid"><div><span>Transportadora</span><strong>${order.shipping?.carrier || "A definir"}</strong></div><div><span>Modalidade</span><strong>${order.shipping?.method || "A definir"}</strong></div><div><span>Volumes</span><strong>${order.shipping?.volumes || 1}</strong></div><div><span>Rastreamento</span><strong>${order.shipping?.tracking || "A definir"}</strong></div></div><button class="outline-cta order-edit-shipping" data-action="order-shipping" data-order-id="${order.id}">Editar logística</button></div><div class="quote-financial"><div><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div><div><span>Desconto</span><strong>− ${money(order.discount)}</strong></div><div><span>Frete</span><strong>${money(order.freight)}</strong></div><div class="quote-total"><span>Total final</span><strong>${money(order.total)}</strong></div></div><div class="quote-history"><div class="quote-section-title"><span class="eyebrow">TRACE / HISTÓRICO</span><strong>Rastreabilidade</strong></div><div class="quote-timeline">${history.map((entry) => `<div class="quote-timeline-item"><i></i><div><strong>${entry.from ? `${entry.from} → ` : ""}${entry.to}</strong><small>${new Date(entry.at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · ${entry.actor}</small><p>${entry.note || "Atualização registrada."}</p></div></div>`).join("")}</div></div><div class="quote-detail-actions"><button class="hero-cta" data-action="order-advance" data-order-id="${order.id}">Avançar pedido</button><button class="outline-cta" data-action="order-print" data-order-id="${order.id}">Imprimir pedido</button></div>`);
}

function toggleOrderItem(id, index) {
  const order = state.orders.find((item) => item.id === id);
  const item = order?.items?.[Number(index)];
  if (!item) return;
  item.picked = !item.picked;
  order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Operação local", from: order.status, to: order.status, note: `${item.picked ? "Item separado" : "Item devolvido à fila"}: ${findProduct(item.id)?.name || item.name || item.id}.` }];
  persist();
  orderDetailModal(id);
  showToast(item.picked ? "Item marcado como separado." : "Item voltou para a fila.");
}

function orderShippingModal(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const shipping = order.shipping || {};
  openModal(`<span class="eyebrow">ORDER / ${order.id} / LOGISTICS</span><h2>Preparar<br>expedição.</h2><p>Registre os dados usados pela equipe no despacho e no rastreio.</p><form class="form-grid" id="order-shipping-form"><div class="form-row"><label class="form-label">Transportadora<input name="carrier" value="${shipping.carrier || ""}" placeholder="Correios, Jadlog..." /></label><label class="form-label">Modalidade<input name="method" value="${shipping.method || ""}" placeholder="PAC, Sedex, retirada..." /></label></div><div class="form-row"><label class="form-label">Prazo<input name="deadline" value="${shipping.deadline || ""}" placeholder="Até 3 dias úteis" /></label><label class="form-label">Volumes<input name="volumes" type="number" min="1" step="1" value="${shipping.volumes || 1}" /></label></div><label class="form-label">Embalagem<select name="packageId"><option value="">Manter embalagem atual</option>${state.shipping.packages.filter((pack) => pack.active !== false).map((pack) => `<option value="${pack.id}" ${shipping.packages?.[0]?.packageId === pack.id ? "selected" : ""}>${pack.name} · ${pack.inner.length} × ${pack.inner.width} × ${pack.inner.height} cm</option>`).join("")}</select></label><label class="form-label">Rastreamento<input name="tracking" value="${shipping.tracking || ""}" placeholder="Código ou link de acompanhamento" /></label><button class="modal-submit" type="submit">Salvar logística</button></form>`);
  document.querySelector("#order-shipping-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    order.shipping = { ...order.shipping, carrier: form.get("carrier")?.toString().trim() || "", method: form.get("method")?.toString().trim() || "", service: form.get("method")?.toString().trim() || "", deadline: form.get("deadline")?.toString().trim() || "", volumes: Math.max(1, Number(form.get("volumes")) || 1), tracking: form.get("tracking")?.toString().trim() || "" };
    const packageId = form.get("packageId")?.toString();
    if (packageId) { applyOrderPackage(id, packageId); return; }
    order.history = [...(order.history || []), { at: new Date().toISOString(), actor: "Operação local", from: order.status, to: order.status, note: "Dados de logística atualizados." }];
    persist();
    closeModal();
    orderDetailModal(id);
    showToast("Logística do pedido atualizada.");
  });
}

async function advanceOrderStatus(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const nextIndex = orderStatuses.indexOf(order.status) + 1;
  if (order.status === "Cancelado" || nextIndex >= orderStatuses.length - 1) { showToast("Este pedido já está na última etapa operacional."); return; }
  const next = orderStatuses[nextIndex];
  const confirmed = await confirmAction({ eyebrow: "ORDER / PIPELINE", title: "Avançar este pedido?", message: `O pedido passará de ${order.status} para ${next}.`, detail: `${order.id} · ${order.customer}`, confirmLabel: `Avançar para ${next}`, tone: "accent" });
  if (!confirmed) return;
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
  document.querySelector("#account-form").addEventListener("submit", (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.account = { name: form.get("name"), phone: form.get("phone"), segment: form.get("segment") }; localStorage.setItem("fieldops-account", JSON.stringify(state.account)); closeModal(); render(); showToast("Perfil salvo neste dispositivo."); });
}

function compareModal() {
  const selected = state.compare.map(findProduct).filter(Boolean);
  if (selected.length < 2) { showToast("Selecione pelo menos dois produtos para comparar."); return; }
  const specKeys = ["FPS", "Gearbox", "Peso", "Sistema", "Hop-Up", "Material"];
  openModal(`<span class="eyebrow">COMPARE // LOADOUT</span><h2>Compare<br>plataformas.</h2><p>Coloque as especificações lado a lado antes de decidir.</p><div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Specs</th>${selected.map((product) => `<th><span>${product.brand}</span><strong>${product.name}</strong><small>${money(product.price)}</small></th>`).join("")}</tr></thead><tbody>${specKeys.map((key) => `<tr><td>${key}</td>${selected.map((product) => `<td>${product.specs[key] || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div><button class="modal-submit" data-action="compare-clear-close">Limpar comparação</button>`);
}

function productModal(product = null) {
  const editing = Boolean(product);
  const shipping = product?.shipping || productShippingDefaults(product || { category: "Gear" });
  openModal(`<span class="eyebrow">PRODUCT REGISTER / ${editing ? "EDIT" : "NEW"}</span><h2>${editing ? "Editar produto." : "Novo produto."}</h2><p>Atualize as informações essenciais para manter o catálogo pronto para o campo.</p><form class="form-grid" id="product-form"><div class="form-row"><label class="form-label">Marca<input name="brand" required value="${product?.brand || ""}" placeholder="ROSSI" /></label><label class="form-label">Nome<input name="name" required value="${product?.name || ""}" placeholder="NEPTUNE 10\"" /></label></div><div class="form-row"><label class="form-label">SKU<input name="sku" required value="${product?.sku || ""}" placeholder="FO-00231" /></label><label class="form-label">Sistema<input name="system" value="${product?.system || "AEG"}" placeholder="AEG" /></label></div><div class="form-row"><label class="form-label">Categoria<select name="category"><option ${product?.category === "Rifles" ? "selected" : ""}>Rifles</option><option ${product?.category === "Pistolas" ? "selected" : ""}>Pistolas</option><option ${product?.category === "Ópticas" ? "selected" : ""}>Ópticas</option><option ${product?.category === "Gear" ? "selected" : ""}>Gear</option><option ${product?.category === "Munição" ? "selected" : ""}>Munição</option><option ${product?.category === "Proteção" ? "selected" : ""}>Proteção</option></select></label><label class="form-label">Preço<input name="price" type="number" min="0" step="1" required value="${product?.price || ""}" placeholder="1899" /></label></div><label class="form-label">Estoque<input name="stockCount" type="number" min="0" step="1" required value="${product?.stockCount ?? 0}" placeholder="38" /></label><label class="form-label">Imagem<input name="image" value="${product?.image || "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82"} /></label><label class="form-label">Descrição<textarea name="description" placeholder="Resumo do produto">${product?.description || ""}</textarea></label><fieldset class="shipping-fieldset"><legend>Dados de envio</legend><p class="form-help">Use centímetros para dimensões e quilogramas para peso. Esses dados alimentam o cálculo de frete.</p><div class="form-row"><label class="form-label">Peso (kg)<input name="weight" type="number" min="0" step="0.01" required value="${shipping.weight}" /></label><label class="form-label">Dimensões (C × L × A cm)<div class="form-row form-row-tight"><input name="length" type="number" min="0.1" step="0.1" required value="${shipping.length}" aria-label="Comprimento sem embalagem" /><input name="width" type="number" min="0.1" step="0.1" required value="${shipping.width}" aria-label="Largura sem embalagem" /><input name="height" type="number" min="0.1" step="0.1" required value="${shipping.height}" aria-label="Altura sem embalagem" /></div></label></div><div class="form-row"><label class="form-label">Peso com embalagem (kg)<input name="packagedWeight" type="number" min="0" step="0.01" required value="${shipping.packagedWeight}" /></label><label class="form-label">Dimensões com embalagem (C × L × A cm)<div class="form-row form-row-tight"><input name="packagedLength" type="number" min="0.1" step="0.1" required value="${shipping.packagedLength}" aria-label="Comprimento com embalagem" /><input name="packagedWidth" type="number" min="0.1" step="0.1" required value="${shipping.packagedWidth}" aria-label="Largura com embalagem" /><input name="packagedHeight" type="number" min="0.1" step="0.1" required value="${shipping.packagedHeight}" aria-label="Altura com embalagem" /></div></label></div><div class="form-row"><label class="form-label">Frágil<select name="fragile"><option value="false" ${!shipping.fragile ? "selected" : ""}>Não</option><option value="true" ${shipping.fragile ? "selected" : ""}>Sim</option></select></label><label class="form-label">Pode combinar<select name="canCombine"><option value="true" ${shipping.canCombine ? "selected" : ""}>Sim</option><option value="false" ${!shipping.canCombine ? "selected" : ""}>Não</option></select></label></div><div class="form-row"><label class="form-label">Enviar separado<select name="separate"><option value="false" ${!shipping.separate ? "selected" : ""}>Não</option><option value="true" ${shipping.separate ? "selected" : ""}>Sim</option></select></label><label class="form-label">Empilhável<select name="stackable"><option value="true" ${shipping.stackable ? "selected" : ""}>Sim</option><option value="false" ${!shipping.stackable ? "selected" : ""}>Não</option></select></label></div><label class="form-label">Embalagem recomendada<input name="recommendedPackage" value="${shipping.recommendedPackage || ""}" placeholder="Caixa Acessórios M" /></label><label class="form-label">Observações logísticas<textarea name="logisticsNote" placeholder="Cuidados para separação e embalagem">${shipping.logisticsNote || ""}</textarea></label></fieldset><button class="modal-submit" type="submit">${editing ? "Salvar alterações" : "Cadastrar produto"}</button></form>`);
  document.querySelector("#product-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const shippingData = { weight: Number(form.get("weight")), length: Number(form.get("length")), width: Number(form.get("width")), height: Number(form.get("height")), packagedWeight: Number(form.get("packagedWeight")), packagedLength: Number(form.get("packagedLength")), packagedWidth: Number(form.get("packagedWidth")), packagedHeight: Number(form.get("packagedHeight")), fragile: form.get("fragile") === "true", stackable: form.get("stackable") === "true", canCombine: form.get("canCombine") === "true", separate: form.get("separate") === "true", originalPackaging: Boolean(product?.shipping?.originalPackaging), recommendedPackage: form.get("recommendedPackage")?.toString().trim() || "", logisticsNote: form.get("logisticsNote")?.toString().trim() || "" };
    if ([shippingData.weight, shippingData.length, shippingData.width, shippingData.height, shippingData.packagedWeight, shippingData.packagedLength, shippingData.packagedWidth, shippingData.packagedHeight].some((value) => !Number.isFinite(value) || value < 0) || [shippingData.length, shippingData.width, shippingData.height, shippingData.packagedLength, shippingData.packagedWidth, shippingData.packagedHeight].some((value) => value <= 0)) { showToast("Revise peso e dimensões de envio antes de salvar."); return; }
    const data = { brand: form.get("brand").toString().toUpperCase(), name: form.get("name").toString().toUpperCase(), sku: form.get("sku").toString().trim().toUpperCase(), category: form.get("category"), system: form.get("system").toString().toUpperCase(), price: Number(form.get("price")), stockCount: Number(form.get("stockCount")), image: form.get("image"), description: form.get("description") || "Equipamento pronto para completar seu próximo loadout.", type: `${form.get("system")} · FIELD GEAR`, meta: "FIELD READY", stock: stockLabel({ stockCount: Number(form.get("stockCount")) }), specs: { FPS: "—", Gearbox: "—", Peso: "—", Sistema: form.get("system"), "Hop-Up": "—", Material: "—" }, shipping: shippingData, tag: editing ? product.tag : "Novo", active: true };
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

async function deleteProduct(id) {
  const product = findProduct(id);
  if (!product) return;
  const confirmed = await confirmAction({ eyebrow: "CATALOG / DELETE", title: "Desativar produto?", message: "O item sairá do catálogo ativo, mas poderá ser reativado no cadastro local.", detail: `${product.brand} · ${product.name}`, confirmLabel: "Desativar produto", tone: "danger" });
  if (!confirmed) return;
  product.active = false;
  persist();
  render();
  showToast("Produto desativado.");
}

async function resetLocalData() {
  const confirmed = await confirmAction({ eyebrow: "SYSTEM / RESET", title: "Restaurar dados demo?", message: "Todos os dados salvos neste dispositivo serão apagados e a operação voltará ao estado demonstrativo.", detail: "Produtos, carrinho, orçamentos, pedidos, perfil e configurações", confirmLabel: "Restaurar dados", tone: "danger" });
  if (!confirmed) return;
  ["fieldops-products", "fieldops-cart", "fieldops-cart-shipping", "fieldops-shipping-cache", "fieldops-shipping", "fieldops-favorites", "fieldops-compare", "fieldops-quotes", "fieldops-orders", "fieldops-loadout", "fieldops-profile", "fieldops-recent-searches", "fieldops-recent-products", "fieldops-import-history", "fieldops-settings", "fieldops-account", "fieldops-theme", "fieldops-radar", "fieldops-radar-following", "fieldops-radar-content", "fieldops-airdrops", "fieldops-airdrop-code"].forEach((key) => localStorage.removeItem(key));
  location.hash = "#admin";
  location.reload();
}

async function advanceQuoteStatus(id) {
  const quote = state.quotes.find((item) => item.id === id);
  if (!quote) return;
  const pipeline = ["Novo", "Em análise", "Proposta enviada", "Aguardando cliente", "Aprovado"];
  const currentIndex = pipeline.indexOf(quote.status);
  if (currentIndex < 0 || currentIndex >= pipeline.length - 1) { showToast(quote.status === "Aprovado" ? "Aprovado. Use Converter em pedido para continuar." : `O orçamento está em ${quote.status}.`); return; }
  const nextStatus = pipeline[currentIndex + 1];
  const confirmed = await confirmAction({ eyebrow: "QUOTE / PIPELINE", title: "Avançar esta etapa?", message: `O orçamento passará de ${quote.status} para ${nextStatus}.`, detail: `${quote.id} · ${quote.customer}`, confirmLabel: `Avançar para ${nextStatus}`, tone: "accent" });
  if (!confirmed) return;
  addQuoteHistory(quote, nextStatus, "Etapa avançada pelo painel.");
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
  const totals = cartTotals();
  const selected = selectedShippingOption();
  const { subtotal, discount, freight, total, airdrop } = totals;
  const createdAt = new Date().toISOString();
  const record = ensureQuoteShape({ id: nextQuoteId(), customer: form.get("name").toString(), phone: form.get("phone").toString(), zip: state.cartShipping?.zip || normalizeZip(form.get("zip")), address: form.get("address")?.toString().trim() || "", city: form.get("city")?.toString() || "—", note: form.get("note")?.toString() || "—", subtotal, discount, freight, total, airdropCode: airdrop?.code || "", airdropName: airdrop?.name || "", status: "Novo", createdAt, items: state.cart.map((item) => ({ id: item.id, quantity: item.quantity })), shipping: { ...(state.cartShipping || {}), carrier: selected?.carrier || "", service: selected?.service || "", method: selected?.service || "", packages: state.cartShipping?.volumes || [], volumes: selected?.volumes || 0, weight: state.cartShipping?.volumes?.reduce((sum, volume) => sum + volume.realWeight, 0) || "", cubedWeight: state.cartShipping?.volumes?.reduce((sum, volume) => sum + volume.cubedWeight, 0) || "", quoteId: state.cartShipping?.id || "", quotedAt: state.cartShipping?.quotedAt || "", expiresAt: state.cartShipping?.expiresAt || "" }, history: [{ at: createdAt, actor: "Cliente", from: null, to: "Novo", note: "Orçamento criado pelo catálogo com frete cotado." }] });
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

function importValue(row, aliases, fallback = "") {
  const key = aliases.find((alias) => row[alias] !== undefined && String(row[alias]).trim() !== "");
  return key ? String(row[key]).trim() : fallback;
}

function normalizeCatalogSku(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "-");
}

function importNumber(value) {
  const raw = String(value ?? "").trim().replace(/[^0-9,.-]/g, "");
  if (!raw) return 0;
  const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw.replace(/,/g, "");
  return Number(normalized) || 0;
}

function importedProductData(row, index, batchId) {
  const name = importValue(row, ["nome_produto", "product_name", "nome", "name"]);
  const brand = importValue(row, ["marca", "brand"], "IMPORTADO");
  const category = importValue(row, ["categoria", "category"], "Equipamentos");
  const system = importValue(row, ["sistema", "system"], "FIELD GEAR");
  const sku = normalizeCatalogSku(importValue(row, ["sku", "codigo", "codigo_produto", "product_sku"])) || `IMP-${batchId}-${String(index + 1).padStart(3, "0")}`;
  const price = importNumber(importValue(row, ["preco", "price"]));
  const stockCount = Math.max(0, Math.round(importNumber(importValue(row, ["estoque", "stock", "quantidade"]))));
  return { sku, brand: brand.toUpperCase(), name: name.toUpperCase(), type: `${system} · IMPORTED`, meta: importValue(row, ["meta", "modelo"], "FIELD READY"), price, stockCount, stock: stockLabel({ stockCount }), category, system, image: importValue(row, ["imagem", "image"], "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82"), specs: { FPS: importValue(row, ["fps"], "—"), Gearbox: importValue(row, ["gearbox", "gearbox_type"], "—"), Peso: importValue(row, ["peso", "weight"], "—"), Sistema: system, "Hop-Up": importValue(row, ["hop_up", "hopup"], "—"), Material: importValue(row, ["material"], "—") }, shipping: productShippingDefaults({ category }), description: importValue(row, ["descricao", "description"], "Produto importado para revisão."), tag: "Importado", active: true };
}

function summarizeImportRows(rows) {
  const existingSkus = new Set(products.map((product) => normalizeCatalogSku(product.sku)).filter(Boolean));
  return (rows || []).reduce((summary, row) => {
    const sku = normalizeCatalogSku(importValue(row, ["sku", "codigo", "codigo_produto", "product_sku"]));
    if (sku && existingSkus.has(sku)) summary.updated += 1;
    else summary.added += 1;
    return summary;
  }, { added: 0, updated: 0 });
}

function commitImport() {
  if (!state.importData?.validRows?.length) return;
  const batchId = String(Date.now());
  const snapshot = JSON.parse(JSON.stringify(products));
  const summary = { added: 0, updated: 0 };
  state.importData.validRows.forEach((row, index) => {
    const data = importedProductData(row, index, batchId);
    const existing = products.find((product) => normalizeCatalogSku(product.sku) === data.sku);
    if (existing) {
      Object.assign(existing, data, { id: existing.id, tag: existing.tag || "Importado" });
      existing.stock = stockLabel(existing);
      summary.updated += 1;
    } else {
      products.unshift({ id: `import-${batchId}-${index}`, ...data });
      summary.added += 1;
    }
  });
  state.importHistory.unshift({ id: `import-${batchId}`, at: new Date().toISOString(), fileName: state.importData.fileName, added: summary.added, updated: summary.updated, snapshot });
  state.importHistory = state.importHistory.slice(0, 10);
  state.importData = null;
  persist(); render(); showToast(`Carga aplicada: ${summary.added} novos · ${summary.updated} atualizados.`);
}

async function rollbackImport(id) {
  const entry = state.importHistory.find((item) => item.id === id) || state.importHistory[0];
  if (!entry?.snapshot) return;
  const confirmed = await confirmAction({ eyebrow: "IMPORT / ROLLBACK", title: "Desfazer esta carga?", message: "Os produtos voltarão ao estado anterior desta importação.", detail: entry.fileName, confirmLabel: "Desfazer carga", tone: "danger" });
  if (!confirmed) return;
  products.splice(0, products.length, ...JSON.parse(JSON.stringify(entry.snapshot)));
  state.importHistory = state.importHistory.filter((item) => item.id !== entry.id);
  persist();
  render();
  showToast("Última carga desfeita.");
}

function render() {
  heroInteractionCleanup?.();
  heroInteractionCleanup = null;
  heroRadarCleanup?.();
  heroRadarCleanup = null;
  let view = homePage();
  if (state.route === "catalog") view = catalogPage();
  if (state.route === "product" && state.selectedProduct) view = productPage(state.selectedProduct);
  if (state.route === "loadout") view = loadoutPage();
  if (state.route === "favorites") view = favoritesPage();
  if (state.route === "brands") view = brandsPage();
  if (state.route === "radar") view = radarPage();
  if (state.route === "admin") view = adminDashboardPage();
  if (state.route === "admin-products") view = adminProductsPage();
  if (state.route === "admin-stock") view = adminStockPage();
  if (state.route === "admin-prices") view = adminPricesPage();
  if (state.route === "admin-quotes") view = adminQuotesWorkspace();
  if (state.route === "admin-orders") view = adminOrdersPage();
  if (state.route === "admin-shipping") view = adminShippingPage();
  if (state.route === "admin-packages") view = adminPackagesPage();
  if (state.route === "admin-customers") view = adminCustomersPage();
  if (state.route === "quote" && state.selectedQuoteId) view = publicQuotePage(state.selectedQuoteId);
  if (state.route === "admin-import") view = adminImportPage();
  if (state.route === "admin-content") view = adminContentPage();
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
  invalidateShipping();
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
  invalidateShipping();
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
  invalidateShipping();
  persist();
  updateNav();
  renderDrawer();
}

function normalizeZip(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : "";
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + (findProduct(item.id)?.price || 0) * item.quantity, 0);
}

function shippingCartLines() {
  return state.cart.map((item) => {
    const product = findProduct(item.id);
    if (!product) return null;
    ensureProductShipping(product);
    return { id: product.id, name: product.name, product, quantity: item.quantity, shipping: product.shipping };
  }).filter(Boolean);
}

function uniqueOrientations(dimensions) {
  const [a, b, c] = dimensions.map((value) => Math.max(0.1, Number(value) || 0));
  return [...new Set([[a, b, c], [a, c, b], [b, a, c], [b, c, a], [c, a, b], [c, b, a]].map((orientation) => orientation.join("x")))].map((orientation) => orientation.split("x").map(Number));
}

function packUnits(units, pack) {
  const box = pack.inner;
  const layers = [];
  const placements = [];
  const ordered = [...units].sort((a, b) => Math.max(b.length, b.width, b.height) - Math.max(a.length, a.width, a.height) || b.volume - a.volume);
  for (const unit of ordered) {
    let placed = false;
    for (const [length, width, height] of uniqueOrientations([unit.length, unit.width, unit.height])) {
      if (length > box.length || width > box.width || height > box.height) continue;
      for (const layer of layers) {
        if (height > layer.height) continue;
        for (const row of layer.rows) {
          if (row.x + length <= box.length && row.y + width <= box.width) {
            placements.push({ unit, length, width, height, x: row.x, y: row.y, z: layer.z });
            row.x += length;
            placed = true;
            break;
          }
        }
        if (placed) break;
        if (layer.usedWidth + width <= box.width && length <= box.length) {
          layer.rows.push({ x: length, y: layer.usedWidth, width });
          layer.usedWidth += width;
          placements.push({ unit, length, width, height, x: 0, y: layer.usedWidth - width, z: layer.z });
          placed = true;
          break;
        }
      }
      if (placed) break;
      const z = layers.reduce((sum, layer) => sum + layer.height, 0);
      if (z + height <= box.height) {
        layers.push({ z, height, usedWidth: width, rows: [{ x: length, y: 0, width }] });
        placements.push({ unit, length, width, height, x: 0, y: 0, z });
        placed = true;
        break;
      }
    }
    if (!placed) return null;
  }
  return { placements };
}

function chooseShippingPackage(units) {
  const weight = units.reduce((sum, unit) => sum + unit.weight, 0);
  return state.shipping.packages.filter((pack) => pack.active !== false && pack.maxWeight >= weight).sort((a, b) => (a.inner.length * a.inner.width * a.inner.height) - (b.inner.length * b.inner.width * b.inner.height) || a.cost - b.cost).map((pack) => ({ pack, layout: packUnits(units, pack) })).find((candidate) => candidate.layout)?.pack || null;
}

function shippingUnit(line, unitIndex) {
  const data = line.shipping;
  return { id: line.id, name: line.name, unitIndex, length: Number(data.packagedLength || data.length), width: Number(data.packagedWidth || data.width), height: Number(data.packagedHeight || data.height), weight: Number(data.packagedWeight || data.weight) * 1, volume: Number(data.packagedLength || data.length) * Number(data.packagedWidth || data.width) * Number(data.packagedHeight || data.height), separate: Boolean(data.separate), fragile: Boolean(data.fragile) };
}

function buildShippingVolumes() {
  const lines = shippingCartLines();
  const singleUnits = [];
  const combinedUnits = [];
  lines.forEach((line) => Array.from({ length: Math.max(1, line.quantity) }, (_, index) => shippingUnit(line, index)).forEach((unit) => (unit.separate ? singleUnits : combinedUnits).push(unit)));
  const groups = singleUnits.map((unit) => [unit]);
  let current = [];
  combinedUnits.sort((a, b) => b.volume - a.volume).forEach((unit) => {
    const candidate = chooseShippingPackage([...current, unit]);
    if (current.length && !candidate) { groups.push(current); current = []; }
    current.push(unit);
  });
  if (current.length) groups.push(current);
  return groups.map((units, index) => {
    const pack = chooseShippingPackage(units) || state.shipping.packages.find((item) => item.active !== false) || defaultShippingPackages[0];
    const realWeight = Number(pack.packagingWeight || 0) + units.reduce((sum, unit) => sum + unit.weight, 0);
    const cubedWeight = (Number(pack.outer?.length || pack.inner.length) * Number(pack.outer?.width || pack.inner.width) * Number(pack.outer?.height || pack.inner.height)) / Number(state.shipping.cubingFactor || 5000);
    return { id: `VOL-${index + 1}`, packageId: pack.id, packageName: pack.name, units, realWeight: Number(realWeight.toFixed(2)), cubedWeight: Number(cubedWeight.toFixed(2)), chargeableWeight: Number(Math.max(realWeight, cubedWeight).toFixed(2)), dimensions: { ...(pack.outer || pack.inner) }, packagingCost: Number(pack.cost || 0) };
  });
}

function shippingSignature(zip) {
  return JSON.stringify({ zip, items: state.cart.map((item) => [item.id, item.quantity]), cubingFactor: state.shipping.cubingFactor, packages: state.shipping.packages.map((pack) => [pack.id, pack.active, pack.inner, pack.packagingWeight]) });
}

function calculateShippingQuote(zip) {
  const normalized = normalizeZip(zip);
  if (!normalized) return null;
  const key = shippingSignature(normalized);
  const cached = state.shippingCache[key];
  if (cached && Date.now() - cached.storedAt < 5 * 60 * 1000) return { ...cached.quote, fromCache: true };
  const volumes = buildShippingVolumes();
  const chargeableWeight = volumes.reduce((sum, volume) => sum + volume.chargeableWeight, 0);
  const regionFactor = Number(normalized[0]) >= 7 ? 1.22 : Number(normalized[0]) >= 4 ? 1.1 : 1;
  const subtotal = cartSubtotal();
  const freeShipping = subtotal >= Number(state.shipping.freeShippingMin || 0);
  const options = shippingProviders.map((provider) => {
    const basePrice = provider.id === "pickup" ? 0 : Math.max(provider.base, Number(state.shipping.flatSp || 0)) + (chargeableWeight * provider.perKg * regionFactor) + Math.max(0, volumes.length - 1) * 8;
    return { id: provider.id, carrier: provider.carrier, service: provider.service, price: provider.id === "field-economy" && freeShipping ? 0 : Number(basePrice.toFixed(2)), days: provider.days, volumes: volumes.length, recommended: provider.id === "field-economy" && !freeShipping, pickup: provider.id === "pickup" };
  }).sort((a, b) => a.price - b.price);
  const quote = { id: `SHIP-${Date.now()}`, zip: normalized, address: `Entrega para o CEP ${normalized}`, subtotal, volumes, options, selectedOptionId: options[0]?.id || "", quotedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + Number(state.shipping.quoteValidityHours || 24) * 3600000).toISOString(), providerMode: "local-simulator" };
  state.shippingCache[key] = { storedAt: Date.now(), quote };
  state.shippingCache = Object.fromEntries(Object.entries(state.shippingCache).slice(-12));
  return quote;
}

function selectedShippingOption() {
  return state.cartShipping?.options?.find((option) => option.id === state.cartShipping.selectedOptionId) || state.cartShipping?.options?.[0] || null;
}

function orderedShippingOptions(options = []) {
  const list = [...options];
  if (state.shippingSort === "speed") return list.sort((a, b) => Number(a.days.match(/\d+/)?.[0] || 99) - Number(b.days.match(/\d+/)?.[0] || 99) || a.price - b.price);
  if (state.shippingSort === "recommended") return list.sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || a.price - b.price);
  return list.sort((a, b) => a.price - b.price);
}

function cartShippingMarkup() {
  const quote = state.cartShipping;
  const selected = selectedShippingOption();
  if (!quote) return `<div class="shipping-calc"><div><span class="eyebrow">DELIVERY / FRETE</span><strong>Calcule antes de solicitar.</strong></div><div class="shipping-calc-form"><input id="cart-zip" inputmode="numeric" maxlength="9" placeholder="Digite seu CEP" aria-label="CEP para calcular frete" /><button class="outline-cta" data-action="calculate-shipping">Calcular frete</button></div><small>O cálculo usa peso, dimensões e embalagem estimada dos itens.</small></div>`;
  return `<div class="shipping-calc shipping-ready"><div class="shipping-calc-head"><div><span class="eyebrow">DELIVERY / ${quote.zip}</span><strong>Escolha como receber.</strong></div><button class="text-link" data-action="clear-shipping">Trocar CEP</button></div><div class="shipping-sort" role="group" aria-label="Ordenar opções de frete"><button class="${state.shippingSort === "price" ? "active" : ""}" data-action="shipping-sort" data-shipping-sort="price">Menor preço</button><button class="${state.shippingSort === "speed" ? "active" : ""}" data-action="shipping-sort" data-shipping-sort="speed">Mais rápido</button><button class="${state.shippingSort === "recommended" ? "active" : ""}" data-action="shipping-sort" data-shipping-sort="recommended">Recomendado</button></div><div class="shipping-options">${orderedShippingOptions(quote.options).map((option) => `<button class="shipping-option ${selected?.id === option.id ? "selected" : ""}" data-action="select-shipping" data-shipping-option="${option.id}"><span><strong>${option.carrier}</strong><small>${option.service} · ${option.days}${option.pickup ? ` · ${state.shipping.pickupAddress}` : ""}</small></span><b>${option.price ? moneyDetailed(option.price) : "Grátis"}</b><i>${selected?.id === option.id ? "✓" : ""}</i></button>`).join("")}</div><small class="shipping-meta">${quote.volumes.length} volume(s) · validade até ${new Date(quote.expiresAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small></div>`;
}

function airdropCartMarkup() {
  const live = activeAirdrop();
  const applied = appliedAirdrop();
  const appliedDiscount = airdropDiscount(applied, cartSubtotal());
  const upcoming = nextAirdrop();
  if (applied && appliedDiscount > 0) return `<section class="airdrop-cart is-applied"><div class="airdrop-cart-head"><div><span class="eyebrow">AIRDROP / RESGATADO</span><strong>${escapeHtml(applied.name)}</strong></div><span class="airdrop-live-badge">− ${moneyDetailed(appliedDiscount)}</span></div><div class="airdrop-applied-row"><span><b>${escapeHtml(applied.code)}</b> aplicado ao carrinho</span><button class="text-link" data-action="airdrop-clear">Remover</button></div></section>`;
  return `<section class="airdrop-cart"><div class="airdrop-cart-head"><div><span class="eyebrow">AIRDROP / ${live ? "NO AR" : "RADAR"}</span><strong>${live ? "Código liberado." : "Caixa de resgate."}</strong></div><span class="airdrop-live-badge">${live ? airdropDiscountLabel(live) : "OFFLINE"}</span></div><form class="airdrop-claim-form" id="airdrop-claim-form"><input name="airdropCode" autocomplete="off" maxlength="24" placeholder="Digite o código Airdrop" aria-label="Código Airdrop" /><button class="outline-cta" type="submit">Ativar</button></form><small class="airdrop-cart-help">${live ? `Drop ativo até ${live.expiresAt ? airdropDate(live.expiresAt) : "encerrar"}.` : upcoming ? `Próximo drop ${airdropDate(upcoming.startsAt)} · ${escapeHtml(upcoming.message)}` : "Acompanhe as redes da loja para descobrir o próximo drop."}</small></section>`;
}

function applyAirdropCode(codeValue = null) {
  const input = document.querySelector("#airdrop-claim-form input[name=airdropCode]");
  const code = String(codeValue ?? input?.value ?? "").trim().toUpperCase();
  const campaign = state.airdrops.find((item) => item.code === code);
  if (!campaign || airdropPhase(campaign) !== "active") { showToast("Airdrop indisponível ou ainda não liberado."); return; }
  const subtotal = cartSubtotal();
  if (subtotal < campaign.minSubtotal) { showToast(`Este drop pede um carrinho mínimo de ${moneyDetailed(campaign.minSubtotal)}.`); return; }
  state.appliedAirdropCode = campaign.code;
  persist();
  renderDrawer();
  showToast(`Airdrop ativado: ${airdropDiscountLabel(campaign)}.`);
}

function clearAirdrop() {
  state.appliedAirdropCode = "";
  persist();
  renderDrawer();
  showToast("Airdrop removido do carrinho.");
}

function invalidateShipping() {
  state.cartShipping = null;
}

function selectShippingOption(id) {
  if (!state.cartShipping?.options?.some((option) => option.id === id)) return;
  state.cartShipping.selectedOptionId = id;
  persist();
  renderDrawer();
  showToast("Opção de frete selecionada.");
}

function setShippingSort(sort) {
  if (!["price", "speed", "recommended"].includes(sort)) return;
  state.shippingSort = sort;
  persist();
  renderDrawer();
}

function calculateCartShipping() {
  const input = document.querySelector("#cart-zip");
  const normalized = normalizeZip(input?.value);
  if (!normalized) { showToast("Digite um CEP válido com 8 números."); return; }
  const quote = calculateShippingQuote(normalized);
  if (!quote) { showToast("Não foi possível calcular o frete."); return; }
  state.cartShipping = quote;
  persist();
  renderDrawer();
  showToast(quote.fromCache ? "Cotação recuperada do cache." : "Opções de frete calculadas.");
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
  const totals = cartTotals();
  footerEl.innerHTML = `${cartShippingMarkup()}${airdropCartMarkup()}<div class="summary-row"><span>Subtotal</span><strong>${moneyDetailed(totals.subtotal)}</strong></div>${totals.discount ? `<div class="summary-row airdrop-discount-row"><span>Desconto Airdrop</span><strong>− ${moneyDetailed(totals.discount)}</strong></div>` : ""}<div class="summary-row"><span>Frete</span><strong>${state.cartShipping ? (totals.freight ? moneyDetailed(totals.freight) : "Grátis") : "Informe seu CEP"}</strong></div><div class="summary-row total"><span>Total estimado</span><strong>${moneyDetailed(totals.total)}</strong></div><button class="quote-button" data-action="quote" ${state.cartShipping ? "" : "disabled"}>Solicitar orçamento</button>`;
}

function openDrawer() { drawer.classList.add("is-open"); drawerBackdrop.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); }
function closeDrawer() { drawer.classList.remove("is-open"); drawerBackdrop.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }
function openModal(content) { modalContent.innerHTML = content; modalLayer.classList.add("is-open"); modalLayer.classList.toggle("is-command", content.includes("command-palette")); modalLayer.setAttribute("aria-hidden", "false"); const title = modalContent.querySelector("h2"); if (title) title.id = "modal-title"; }
function closeModal(confirmResult = false) { const resolver = pendingConfirmation?.resolve; pendingConfirmation = null; modalLayer.classList.remove("is-open", "is-command", "is-confirm"); modalLayer.setAttribute("aria-hidden", "true"); modalContent.innerHTML = ""; const previousFocus = modalPreviousFocus; modalPreviousFocus = null; if (resolver) resolver(Boolean(confirmResult)); if (previousFocus && document.contains(previousFocus)) window.setTimeout(() => previousFocus.focus(), 0); }
function confirmAction({ eyebrow = "ACTION / CONFIRM", title = "Confirmar ação.", message = "Revise a ação antes de continuar.", detail = "", confirmLabel = "Confirmar", cancelLabel = "Cancelar", tone = "danger" } = {}) {
  if (pendingConfirmation) closeModal();
  modalPreviousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const confirmTone = ["danger", "warning", "accent"].includes(tone) ? tone : "danger";
  const detailMarkup = detail ? `<small class="confirm-dialog-detail">${escapeHtml(detail)}</small>` : "";
  const promise = new Promise((resolve) => { pendingConfirmation = { resolve }; });
  openModal(`<div class="confirm-dialog" role="alertdialog" aria-labelledby="modal-title" aria-describedby="confirm-dialog-message"><span class="confirm-dialog-mark ${confirmTone}" aria-hidden="true">${confirmTone === "danger" ? "!" : "✓"}</span><span class="eyebrow">${escapeHtml(eyebrow)}</span><h2>${escapeHtml(title)}</h2><p id="confirm-dialog-message">${escapeHtml(message)}</p>${detailMarkup}<div class="confirm-dialog-actions"><button class="outline-cta" data-action="confirm-cancel" type="button">${escapeHtml(cancelLabel)}</button><button class="modal-submit confirm-submit ${confirmTone}" data-action="confirm-accept" type="button">${escapeHtml(confirmLabel)}</button></div></div>`);
  modalLayer.classList.add("is-confirm");
  window.requestAnimationFrame(() => modalContent.querySelector("[data-action=confirm-cancel]")?.focus());
  return promise;
}

function quoteModal() {
  const totals = cartTotals();
  const { subtotal, discount, freight, total } = totals;
  const selected = totals.selected;
  openModal(`<span class="eyebrow">QUOTE / REQUEST</span><h2>Solicite seu<br>orçamento.</h2><p>Deixe seus dados e a equipe ${state.settings.storeName} continua a conversa pelo WhatsApp.</p><form class="form-grid" id="quote-form"><div class="form-row"><label class="form-label">Nome<input name="name" required placeholder="Seu nome" /></label><label class="form-label">WhatsApp<input name="phone" required placeholder="(11) 99999-9999" /></label></div><div class="form-row"><label class="form-label">CEP<input name="zip" value="${state.cartShipping?.zip || ""}" placeholder="00000-000" /></label><label class="form-label">Cidade<input name="city" placeholder="São Paulo" /></label></div><label class="form-label">Endereço de entrega<input name="address" placeholder="Rua, número, complemento" /></label><label class="form-label">Observação<textarea name="note" placeholder="Algum detalhe sobre seu loadout?"></textarea></label><div class="summary-row"><span>Subtotal</span><strong>${moneyDetailed(subtotal)}</strong></div>${discount ? `<div class="summary-row airdrop-discount-row"><span>Desconto Airdrop</span><strong>− ${moneyDetailed(discount)}</strong></div>` : ""}<div class="summary-row"><span>Frete${selected ? ` · ${selected.carrier} / ${selected.service}` : ""}</span><strong>${selected ? (freight ? moneyDetailed(freight) : "Grátis") : "Pendente"}</strong></div><div class="summary-row total"><span>Total estimado</span><strong>${moneyDetailed(total)}</strong></div><button class="modal-submit" type="submit">Criar orçamento e abrir WhatsApp</button></form>`);
  document.querySelector("#quote-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const quote = quoteRecord(form);
    const lines = state.cart.map((item) => { const product = findProduct(item.id); return `${item.quantity}x ${product.brand} ${product.name}`; }).join("\n");
    const message = `Olá, gostaria de solicitar orçamento da ${state.settings.storeName}.\n\nOrçamento ${quote.id}\n\nItens:\n${lines}\n\nNome: ${form.get("name")}\nWhatsApp: ${form.get("phone")}\nCEP: ${form.get("zip") || "Não informado"}\nEndereço: ${form.get("address") || "Não informado"}\nCidade: ${form.get("city") || "Não informado"}\nSubtotal: ${moneyDetailed(quote.subtotal)}\nAirdrop: ${quote.airdropCode ? `${quote.airdropCode} · desconto de ${moneyDetailed(quote.discount)}` : "Não utilizado"}\nFrete: ${quote.freight ? moneyDetailed(quote.freight) : "Grátis ou pendente"}\nTotal estimado: ${moneyDetailed(quote.total)}\nTransportadora: ${quote.shipping?.carrier || "A definir"}\nPrazo: ${quote.shipping?.deadline || "A confirmar"}\nObservação: ${form.get("note") || "—"}`;
    const link = `https://wa.me/${normalizeWhatsAppNumber(state.settings.whatsapp)}?text=${encodeURIComponent(message)}`;
    if (quote.airdropCode) {
      const campaign = state.airdrops.find((item) => item.code === quote.airdropCode);
      if (campaign) campaign.redeemed += 1;
    }
    state.cart = [];
    state.appliedAirdropCode = "";
    invalidateShipping();
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

function bindHeroRadar() {
  heroRadarCleanup?.();
  heroRadarCleanup = null;
  const radar = document.querySelector("[data-hero-radar]");
  const scope = radar?.querySelector(".hero-radar-scope");
  const playerEl = radar?.querySelector("[data-radar-player]");
  const enemyEls = [...(radar?.querySelectorAll("[data-radar-enemy]") || [])];
  if (!radar || !scope || !playerEl || enemyEls.length === 0) return;

  const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const playerWaypoints = [[.69, .62], [.77, .45], [.67, .28], [.47, .25], [.32, .42], [.38, .68], [.56, .78], [.78, .73]];
  const enemyWaypoints = [
    [[.23, .25], [.31, .39], [.24, .55], [.42, .31]],
    [[.69, .2], [.8, .31], [.72, .43], [.55, .23]]
  ];
  const random = (min, max) => min + Math.random() * (max - min);
  const makeActor = (x, y, pool, isPlayer = false) => ({ x, y, target: { x, y }, origin: { x, y }, pool, isPlayer, duration: isPlayer ? random(42000, 56000) : random(32000, 46000), startedAt: 0, switchAt: 0, downUntil: 0, lastClearedAt: 0 });
  const player = makeActor(.64, .59, playerWaypoints, true);
  const enemies = enemyEls.map((_, index) => {
    const starts = [[.24, .28], [.72, .24]];
    return makeActor(starts[index][0], starts[index][1], enemyWaypoints[index]);
  });
  let frameId = 0;
  let lastReadout = 0;
  let pulseTimeout = 0;
  let nextPingAt = 0;
  let manualScanUntil = 0;
  const playerName = radarPlayerName();
  const playerNameEl = radar.querySelector("[data-radar-player-name]");
  if (playerNameEl) playerNameEl.textContent = playerName;
  let active = true;

  const reducedMotion = () => Boolean(reducedMotionQuery?.matches);
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const chooseTarget = (actor, now) => {
    const candidates = actor.pool.filter((point) => distance({ x: point[0], y: point[1] }, actor.target) > .08).sort(() => Math.random() - .5);
    const next = actor.isPlayer ? candidates.find((point) => enemies.every((enemy) => distance({ x: point[0], y: point[1] }, enemy) > .13)) : candidates[0];
    const point = next || actor.pool[0];
    actor.target = { x: point[0] + random(-.012, .012), y: point[1] + random(-.012, .012) };
    actor.target.x = Math.min(.88, Math.max(.12, actor.target.x));
    actor.target.y = Math.min(.86, Math.max(.14, actor.target.y));
    actor.origin = { x: actor.x, y: actor.y };
    actor.startedAt = now;
    actor.duration = random(actor.isPlayer ? 42000 : 32000, actor.isPlayer ? 56000 : 46000);
    actor.switchAt = now + actor.duration + random(12000, actor.isPlayer ? 24000 : 20000);
  };
  const updateMarker = (element, actor, width, height) => {
    element.style.setProperty("--radar-dx", `${actor.x * width - width / 2}px`);
    element.style.setProperty("--radar-dy", `${actor.y * height - height / 2}px`);
  };
  const updateReadout = (now) => {
    if (now - lastReadout < 1000) return;
    lastReadout = now;
    const contacts = enemies.filter((enemy) => distance(player, enemy) < .24).length;
    const manualScan = now < manualScanUntil;
    const modes = manualScan ? ["MANUAL SCAN / TRACE"] : contacts ? ["CONTACT / SHIFT", "FLANK DETECTED", "BREAKING LINE"] : ["SECTOR MOVING", "SCAN / WEST FLANK", "PATROL ROUTE"];
    const readout = radar.querySelector("[data-radar-readout]");
    const mode = radar.querySelector("[data-radar-mode]");
    const coordinates = radar.querySelector("[data-radar-coordinates]");
    const clearing = enemies.some((enemy) => enemy.downUntil > now);
    if (readout) readout.textContent = clearing ? `${playerName} / CLEAR` : manualScan ? "SCAN LOCK" : contacts ? `${contacts} HOSTIS` : "SECTOR CLEAR";
    if (mode) mode.textContent = clearing ? "CONTACT NEUTRALIZED" : modes[Math.floor(now / 8000) % modes.length];
    if (coordinates) coordinates.textContent = `GRID ${String(Math.round(player.x * 9)).padStart(2, "0")} / ${String(Math.round(player.y * 9)).padStart(2, "0")}`;
    if ((contacts || manualScan) && now > nextPingAt) {
      const contact = enemies.find((enemy) => distance(player, enemy) < .24) || enemies[0];
      const ping = radar.querySelector("[data-radar-ping]");
      if (ping) {
        ping.style.setProperty("--radar-dx", `${contact.x * 100}%`);
        ping.style.setProperty("--radar-dy", `${contact.y * 100}%`);
        ping.classList.remove("is-active");
        void ping.offsetWidth;
        ping.classList.add("is-active");
        window.clearTimeout(pulseTimeout);
        pulseTimeout = window.setTimeout(() => ping.classList.remove("is-active"), 2200);
      }
      nextPingAt = now + random(12000, 18000);
    }
  };
  const triggerManualScan = (now = performance.now()) => {
    manualScanUntil = now + 10000;
    nextPingAt = now;
    lastReadout = 0;
    radar.classList.remove("is-focus");
    void radar.offsetWidth;
    radar.classList.add("is-focus");
    window.setTimeout(() => radar.classList.remove("is-focus"), 10200);
    updateReadout(now);
  };
  const onRadarKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerManualScan();
    }
  };
  const onRadarClick = (event) => {
    event.stopPropagation();
    triggerManualScan();
  };
  const moveActor = (actor, now) => {
    const progress = Math.min(1, Math.max(0, (now - actor.startedAt) / Math.max(1, actor.duration)));
    const eased = progress * progress * (3 - (2 * progress));
    actor.x = actor.origin.x + (actor.target.x - actor.origin.x) * eased;
    actor.y = actor.origin.y + (actor.target.y - actor.origin.y) * eased;
  };
  const tick = (now) => {
    frameId = 0;
    if (!active || reducedMotion()) return;
    if (!player.switchAt || now > player.switchAt) chooseTarget(player, now);
    moveActor(player, now);
    enemies.forEach((actor, index) => {
      const element = enemyEls[index];
      if (actor.downUntil > now) {
        element.classList.add("is-cleared");
        return;
      }
      if (actor.downUntil) {
        actor.downUntil = 0;
        element.classList.remove("is-cleared");
        chooseTarget(actor, now);
      }
      if (distance(player, actor) < .115 && now - actor.lastClearedAt > 18000) {
        actor.lastClearedAt = now;
        actor.downUntil = now + 4800;
        element.classList.add("is-cleared");
        radar.classList.remove("is-hunting");
        void radar.offsetWidth;
        radar.classList.add("is-hunting");
        window.setTimeout(() => radar.classList.remove("is-hunting"), 1800);
        return;
      }
      if (!actor.switchAt || now > actor.switchAt) chooseTarget(actor, now);
      moveActor(actor, now);
    });
    const bounds = scope.getBoundingClientRect();
    updateMarker(playerEl, player, bounds.width, bounds.height);
    enemies.forEach((actor, index) => updateMarker(enemyEls[index], actor, bounds.width, bounds.height));
    updateReadout(now);
    frameId = window.requestAnimationFrame(tick);
  };
  const start = () => {
    if (!reducedMotion() && !frameId) frameId = window.requestAnimationFrame(tick);
  };
  const onMotionPreferenceChange = () => {
    if (reducedMotion()) {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    } else start();
  };

  if (reducedMotion()) {
    const bounds = scope.getBoundingClientRect();
    updateMarker(playerEl, player, bounds.width, bounds.height);
    enemies.forEach((actor, index) => updateMarker(enemyEls[index], actor, bounds.width, bounds.height));
    updateReadout(1000);
  } else start();
  heroRadarPulse = triggerManualScan;
  radar.addEventListener("keydown", onRadarKeyDown);
  radar.addEventListener("click", onRadarClick);
  reducedMotionQuery?.addEventListener?.("change", onMotionPreferenceChange);
  if (reducedMotionQuery && !reducedMotionQuery.addEventListener) reducedMotionQuery.addListener(onMotionPreferenceChange);

  heroRadarCleanup = () => {
    active = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    window.clearTimeout(pulseTimeout);
    if (heroRadarPulse === triggerManualScan) heroRadarPulse = null;
    radar.removeEventListener("keydown", onRadarKeyDown);
    radar.removeEventListener("click", onRadarClick);
    reducedMotionQuery?.removeEventListener?.("change", onMotionPreferenceChange);
    if (reducedMotionQuery && !reducedMotionQuery.removeEventListener) reducedMotionQuery.removeListener(onMotionPreferenceChange);
  };
}

function bindHeroVideo() {
  heroInteractionCleanup?.();
  heroInteractionCleanup = null;
  const hero = document.querySelector("[data-hero-interactive]");
  const video = hero?.querySelector("[data-hero-video]");
  if (!hero || !video) return;

  const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const tabletQuery = window.matchMedia?.("(max-width: 1100px)");
  const mobileQuery = window.matchMedia?.("(max-width: 720px)");
  const sensorButton = hero.querySelector("[data-action=hero-sensor]");
  let frameId = 0;
  let metadataReady = false;
  let hasPointer = false;
  let orientationActive = false;
  let orientationBaseline = null;
  let targetProgress = 0.5;
  let currentProgress = 0.5;
  let lastFrameTime = 0;
  let lastSeekAt = 0;
  let renderedTime = 0;
  let seekInFlight = false;
  let initialFrameSyncId = 0;

  const clampProgress = (value) => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0.5));
  const reducedMotion = () => Boolean(reducedMotionQuery?.matches);
  const updateSensorButton = (active, fallback = false) => {
    if (!sensorButton) return;
    const label = sensorButton.querySelector("[data-sensor-label]");
    const status = sensorButton.querySelector("[data-sensor-status]");
    sensorButton.classList.toggle("is-active", active);
    sensorButton.classList.toggle("is-fallback", fallback);
    sensorButton.setAttribute("aria-pressed", String(active));
    sensorButton.setAttribute("aria-label", active ? "Desativar movimento por giroscópio" : "Ativar movimento por giroscópio");
    if (label) label.textContent = active ? "Sensor ativo" : fallback ? "Visão fixa" : "Ativar sensor";
    if (status) status.textContent = active ? "gyro linked / live aim" : fallback ? "center lock / safe view" : "mobile aim / tap to sync";
  };
  const setCenterFrame = () => {
    if (!metadataReady || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const centerTime = Math.max(0, Math.min(video.duration - 0.001, video.duration * 0.5));
    const applyCenterFrame = () => {
      if (hasPointer || !metadataReady) return;
      video.pause();
      seekInFlight = false;
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
    seekInFlight = false;
  };
  const frameLoop = (timestamp) => {
    frameId = 0;
    if (!metadataReady || reducedMotion() || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (seekInFlight) return;
    const elapsed = lastFrameTime ? Math.min(64, timestamp - lastFrameTime) : 16;
    lastFrameTime = timestamp;
    const smoothing = 1 - Math.exp(-elapsed / 92);
    currentProgress += (targetProgress - currentProgress) * smoothing;
    if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
    const desiredTime = clampProgress(currentProgress) * video.duration;
    const safeTime = Math.max(0, Math.min(video.duration - 0.001, desiredTime));
    const targetTime = Math.max(0, Math.min(video.duration - 0.001, clampProgress(targetProgress) * video.duration));
    const seekInterval = 1000 / 24;
    const isSettling = Math.abs(targetProgress - currentProgress) < 0.001;
    const needsSeek = Number.isFinite(safeTime) && Math.abs(renderedTime - safeTime) > (isSettling ? 0.003 : 0.012);
    if (needsSeek && !video.seeking && timestamp - lastSeekAt >= seekInterval) {
      seekInFlight = true;
      video.currentTime = safeTime;
      renderedTime = safeTime;
      lastSeekAt = timestamp;
      return;
    }
    if (Math.abs(targetProgress - currentProgress) > 0.001 || Math.abs(renderedTime - targetTime) > 0.006) frameId = requestAnimationFrame(frameLoop);
    else lastFrameTime = 0;
  };
  const startFrameLoop = () => {
    if (!frameId && !reducedMotion() && metadataReady) frameId = requestAnimationFrame(frameLoop);
  };
  const onPointerMove = (event) => {
    if (reducedMotion() || event.pointerType === "touch" || orientationActive) return;
    const bounds = hero.getBoundingClientRect();
    if (!bounds.width) return;
    hasPointer = true;
    const pointerProgress = clampProgress((event.clientX - bounds.left) / bounds.width);
    const tabletScale = tabletQuery?.matches ? 0.72 : 1;
    targetProgress = clampProgress(0.5 + (pointerProgress - 0.5) * tabletScale);
    startFrameLoop();
  };
  const onPointerLeave = () => {
    if (orientationActive) return;
    hasPointer = false;
    targetProgress = 0.5;
    startFrameLoop();
  };
  const onOrientation = (event) => {
    if (!orientationActive || !mobileQuery?.matches || reducedMotion()) return;
    const gamma = Number(event.gamma);
    if (!Number.isFinite(gamma)) return;
    if (orientationBaseline === null) orientationBaseline = gamma;
    const delta = Math.max(-28, Math.min(28, gamma - orientationBaseline));
    const normalized = delta / 28;
    hasPointer = true;
    targetProgress = clampProgress(0.5 + normalized * 0.32);
    hero.style.setProperty("--hero-operator-shift", `${Math.max(-18, Math.min(18, -normalized * 16))}px`);
    startFrameLoop();
  };
  const enableHeroSensor = async () => {
    if (!mobileQuery?.matches) { showToast("O sensor é uma experiência exclusiva para telas pequenas."); return; }
    if (orientationActive) {
      orientationActive = false;
      orientationBaseline = null;
      window.removeEventListener("deviceorientation", onOrientation);
      hasPointer = false;
      targetProgress = 0.5;
      hero.style.setProperty("--hero-operator-shift", "10px");
      setCenterFrame();
      updateSensorButton(false);
      showToast("Sensor desligado. Visão fixa centralizada.");
      return;
    }
    if (reducedMotion() || typeof window.DeviceOrientationEvent === "undefined") {
      updateSensorButton(false, true);
      showToast("Este aparelho não oferece giroscópio. Visão fixa ativada.");
      return;
    }
    try {
      if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
        const permission = await window.DeviceOrientationEvent.requestPermission();
        if (permission !== "granted") throw new Error("orientation-denied");
      }
      orientationActive = true;
      orientationBaseline = null;
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
      updateSensorButton(true);
      showToast("Mira giroscópica conectada.");
    } catch {
      orientationActive = false;
      orientationBaseline = null;
      hasPointer = false;
      targetProgress = 0.5;
      hero.style.setProperty("--hero-operator-shift", "10px");
      setCenterFrame();
      updateSensorButton(false, true);
      showToast("Permissão não disponível. Visão fixa centralizada.");
    }
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
  const onSeeked = () => {
    seekInFlight = false;
    if (!reducedMotion() && metadataReady && (hasPointer || Math.abs(targetProgress - 0.5) > 0.001)) startFrameLoop();
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
  hero.style.setProperty("--hero-operator-shift", "10px");
  updateSensorButton(false, typeof window.DeviceOrientationEvent === "undefined");
  heroSensorActivate = enableHeroSensor;
  video.addEventListener("loadedmetadata", onMetadata);
  video.addEventListener("loadeddata", onMetadata);
  video.addEventListener("durationchange", onMetadata);
  video.addEventListener("error", onVideoError);
  video.addEventListener("seeked", onSeeked);
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
    video.removeEventListener("seeked", onSeeked);
    hero.removeEventListener("pointermove", onPointerMove);
    hero.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("deviceorientation", onOrientation);
    if (heroSensorActivate === enableHeroSensor) heroSensorActivate = null;
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
  bindHeroRadar();
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
  document.querySelectorAll("[data-radar-scope]").forEach((el) => el.addEventListener("click", () => { state.radar.scope = el.dataset.radarScope; persist(); render(); }));
  document.querySelectorAll("[data-radar-type]").forEach((el) => el.addEventListener("change", () => { state.radar.type = el.value; persist(); render(); }));
  document.querySelectorAll("[data-radar-radius]").forEach((el) => el.addEventListener("change", () => { state.radar.radius = Number(el.value) || 100; persist(); render(); }));
  document.querySelectorAll("[data-radar-sort]").forEach((el) => el.addEventListener("change", () => { state.radar.sort = el.value; persist(); render(); }));
  document.querySelectorAll("[data-radar-view]").forEach((el) => el.addEventListener("click", () => { state.radar.view = el.dataset.radarView === "map" ? "map" : "feed"; persist(); render(); }));
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
  document.querySelectorAll("[data-delete-product]").forEach((el) => el.addEventListener("click", () => deleteProduct(el.dataset.deleteProduct)));
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
  if (settingsForm) settingsForm.addEventListener("submit", (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const cubingFactor = Math.max(1, Number(form.get("cubingFactor")) || 5000); const quoteValidityHours = Math.max(1, Number(form.get("quoteValidityHours")) || 24); state.settings = { storeName: form.get("storeName").toString().trim(), city: form.get("city").toString().trim(), whatsapp: form.get("whatsapp").toString().replace(/\D/g, ""), lowStock: Number(form.get("lowStock")) || 0 }; state.shipping = { ...state.shipping, originZip: normalizeZip(form.get("originZip")) || state.shipping.originZip, originAddress: form.get("originAddress").toString().trim(), originCity: form.get("originCity").toString().trim(), originState: form.get("originState").toString().trim().toUpperCase(), cubingFactor, quoteValidityHours, freeShippingMin: Math.max(0, Number(form.get("freeShippingMin")) || 0), flatSp: Math.max(0, Number(form.get("flatSp")) || 0), pickupAddress: form.get("pickupAddress").toString().trim(), pickupHours: form.get("pickupHours").toString().trim(), pickupInstructions: form.get("pickupInstructions").toString().trim() }; state.shippingCache = {}; persist(); render(); showToast("Configurações salvas."); });
  const airdropForm = document.querySelector("#airdrop-form");
  if (airdropForm) airdropForm.addEventListener("submit", saveAirdrop);
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "confirm-accept" && pendingConfirmation) { closeModal(true); return; }
  if (action === "confirm-cancel" && pendingConfirmation) { closeModal(false); return; }
  if (action === "toggle-theme") toggleTheme(event);
  if (action === "hero-sensor") heroSensorActivate?.();
  if (action === "hero-radar") heroRadarPulse?.();
  if (action === "open-search") searchPalette();
  if (action === "profile-setup") profileSetupModal();
  if (action === "radar-location") radarLocationModal();
  if (action === "radar-use-location") requestRadarLocation();
  if (action === "radar-skip-location") closeModal();
  const radarId = event.target.closest("[data-radar-id]")?.dataset.radarId;
  if (action === "radar-detail" && radarId) radarDetailModal(radarId);
  if (action === "radar-follow" && radarId) toggleRadarFollow(radarId);
  if (action === "radar-copy" && radarId) copyRadarBriefing(radarId);
  if (action === "radar-content-new") radarContentModal();
  if (action === "radar-content-edit" && radarId) radarContentModal(radarId);
  if (action === "radar-content-status" && radarId) updateRadarContentStatus(radarId, event.target.closest("[data-radar-status]")?.dataset.radarStatus);
  const radarProductId = event.target.closest("[data-radar-product]")?.dataset.radarProduct;
  if (action === "radar-product" && radarProductId) { const product = findProduct(radarProductId); if (product) { closeModal(); go("product", product); } }
  if (action === "clear-recent") { state.recentProducts = []; persist(); render(); showToast("Histórico de produtos limpo."); }
  if (action === "export-data") exportDataModal();
  if (action === "export-backup") exportBackup();
  if (action === "export-products") exportProducts();
  if (action === "export-quotes") exportQuotes();
  if (action === "cart") { renderDrawer(); openDrawer(); }
  if (action === "close-drawer") closeDrawer();
  if (action === "calculate-shipping") calculateCartShipping();
  if (action === "select-shipping") selectShippingOption(event.target.closest("[data-shipping-option]")?.dataset.shippingOption);
  if (action === "shipping-sort") setShippingSort(event.target.closest("[data-shipping-sort]")?.dataset.shippingSort);
  if (action === "clear-shipping") { invalidateShipping(); persist(); renderDrawer(); }
  if (action === "airdrop-clear") clearAirdrop();
  if (action === "airdrop-launch") launchAirdrop(event.target.closest("[data-airdrop-id]")?.dataset.airdropId);
  if (action === "airdrop-end") endAirdrop(event.target.closest("[data-airdrop-id]")?.dataset.airdropId);
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
  if (action === "import-rollback") rollbackImport(event.target.closest("[data-import-id]")?.dataset.importId);
  if (action === "reset-local-data") resetLocalData();
  if (action === "menu") openModal(`<span class="eyebrow">FIELD OPS / MENU</span><h2>Navegue<br>pelo arsenal.</h2><div class="form-grid"><button class="outline-cta" data-route="catalog">Catálogo</button><button class="outline-cta" data-route="radar">Radar Airsoft</button><button class="outline-cta" data-route="loadout">Monte seu loadout</button><button class="outline-cta" data-route="favorites">Favoritos</button><button class="outline-cta" data-route="admin">Painel operacional</button></div>`);
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
  if (action === "quote-edit" && quoteId) quoteEditModalComplete(quoteId);
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
  if (action === "order-shipping" && orderId) orderShippingModal(orderId);
  if (action === "order-toggle-item" && orderId) toggleOrderItem(orderId, event.target.closest("[data-item-index]")?.dataset.itemIndex);
  if (action === "shipping-status" && orderId) shippingStatusModal(orderId);
  if (action === "shipping-label" && orderId) generateShippingLabel(orderId);
  if (action === "shipping-post" && orderId) markOrderPosted(orderId);
  if (action === "shipping-track" && orderId) trackingModal(orderId);
  if (action === "order-package" && orderId) orderPackageModal(orderId);
  if (action === "select-order-package" && orderId) applyOrderPackage(orderId, event.target.closest("[data-package-id]")?.dataset.packageId);
  if (action === "package-new") packageModal();
  const packageId = event.target.closest("[data-package-id]")?.dataset.packageId;
  if (action === "package-edit" && packageId) packageModal(packageId);
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

document.addEventListener("submit", (event) => {
  if (event.target?.id !== "airdrop-claim-form") return;
  event.preventDefault();
  applyAirdropCode();
});

modalLayer.addEventListener("click", (event) => { if (event.target === modalLayer) closeModal(); });
drawerBackdrop.addEventListener("click", closeDrawer);
window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchPalette(); }
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) { event.preventDefault(); searchPalette(); }
  if (event.key === "Escape" && modalLayer.classList.contains("is-open")) closeModal();
  if (event.key === "Tab" && modalLayer.classList.contains("is-confirm")) {
    const focusables = [...modalContent.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])")];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.addEventListener("hashchange", () => { const route = location.hash.replace("#", "") || "home"; const productMatch = route.match(/^product\/(.+)$/); const quoteMatch = route.match(/^quote\/(.+)$/); closeModal(); state.route = productMatch ? "product" : quoteMatch ? "quote" : ["home", "catalog", "brands", "radar", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-orders", "admin-shipping", "admin-packages", "admin-customers", "admin-import", "admin-content", "admin-settings"].includes(route) ? route : "home"; state.selectedProduct = productMatch ? findProduct(productMatch[1]) : null; state.selectedQuoteId = quoteMatch ? quoteMatch[1] : null; render(); });

const initialRoute = location.hash.replace("#", "") || "home";
const initialProductMatch = initialRoute.match(/^product\/(.+)$/);
const initialQuoteMatch = initialRoute.match(/^quote\/(.+)$/);
state.route = initialProductMatch ? "product" : initialQuoteMatch ? "quote" : ["home", "catalog", "brands", "radar", "loadout", "favorites", "admin", "admin-products", "admin-stock", "admin-prices", "admin-quotes", "admin-orders", "admin-shipping", "admin-packages", "admin-customers", "admin-import", "admin-content", "admin-settings"].includes(initialRoute) ? initialRoute : "home";
state.selectedProduct = initialProductMatch ? findProduct(initialProductMatch[1]) : null;
state.selectedQuoteId = initialQuoteMatch ? initialQuoteMatch[1] : null;
applyTheme(state.theme);
render();
renderDrawer();
