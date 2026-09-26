(() => {
  const scroller = document.querySelector("[data-scene-scroller]");
  const shell = document.querySelector("[data-scene-shell]");
  if (!scroller || !shell) return;

  const progressReadout = document.querySelector("[data-progress-readout]");
  const sceneLabel = document.querySelector("[data-scene-label]");
  const sceneReadout = document.querySelector("[data-scene-readout]");
  const sceneTitle = document.querySelector("[data-scene-title]");
  const sceneDescription = document.querySelector("[data-scene-description]");
  const railButtons = [...document.querySelectorAll("[data-scene-jump]")];
  const hotspots = [...document.querySelectorAll("[data-hotspot]")];
  const detailPanel = document.querySelector("[data-detail-panel]");
  const detailKicker = document.querySelector("[data-detail-kicker]");
  const detailTitle = document.querySelector("[data-detail-title]");
  const detailCopy = document.querySelector("[data-detail-copy]");
  const detailProduct = document.querySelector("[data-detail-product]");
  const detailPrice = document.querySelector("[data-detail-price]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 760px)").matches;
  let raf = 0;
  let progress = 0;
  let activeHotspot = null;

  const scenes = [
    { label: "OPERATOR", readout: "Operador em posição", title: "Comece pelo<br><em>operador.</em>", description: "O conjunto começa antes da primeira escolha. Role para aproximar, encontrar os pontos de montagem e assumir o controle." },
    { label: "APPROACH", readout: "Aproximação em curso", title: "Encontre o<br><em>ponto certo.</em>", description: "O ambiente recua, o equipamento ganha escala e a leitura passa a acompanhar o movimento da câmera." },
    { label: "RIFLE", readout: "Hotspots disponíveis", title: "Agora, escolha<br><em>sua plataforma.</em>", description: "Esta primeira prova usa pontos demonstrativos. Produtos reais e compatibilidades entram somente na próxima etapa." }
  ];

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (value) => value * value * (3 - 2 * value);
  const range = (value, start, end) => clamp((value - start) / (end - start));

  function setSceneText(nextScene) {
    const scene = scenes[nextScene];
    if (!scene) return;
    sceneLabel.textContent = scene.label;
    sceneReadout.textContent = scene.readout;
    sceneTitle.innerHTML = scene.title;
    sceneDescription.textContent = scene.description;
    railButtons.forEach((button, index) => button.classList.toggle("is-active", index === nextScene));
  }

  function updateScene() {
    raf = 0;
    const rect = scroller.getBoundingClientRect();
    const travel = Math.max(1, scroller.offsetHeight - window.innerHeight);
    progress = reducedMotion ? .72 : clamp(-rect.top / travel);
    const approach = ease(range(progress, .08, .42));
    const rifle = ease(range(progress, .38, .78));
    const sceneIndex = progress < .33 ? 0 : progress < .66 ? 1 : 2;
    const mobileFactor = isMobile() ? .62 : 1;
    shell.style.setProperty("--lab-progress", progress.toFixed(4));
    shell.style.setProperty("--lab-operator-scale", (1 + approach * .12 + rifle * .04).toFixed(4));
    shell.style.setProperty("--lab-operator-x", `${(-approach * 8 * mobileFactor).toFixed(2)}px`);
    shell.style.setProperty("--lab-operator-y", `${(-approach * 8 * mobileFactor).toFixed(2)}px`);
    shell.style.setProperty("--lab-rifle-opacity", (rifle * .95).toFixed(4));
    shell.style.setProperty("--lab-rifle-scale", (.9 + rifle * .22).toFixed(4));
    shell.style.setProperty("--lab-rifle-x", `${(rifle * 16 * mobileFactor).toFixed(2)}px`);
    shell.style.setProperty("--lab-rifle-y", `${(-rifle * 8 * mobileFactor).toFixed(2)}px`);
    shell.style.setProperty("--lab-copy-y", `${(-approach * 12).toFixed(2)}px`);
    shell.style.setProperty("--lab-hotspots-opacity", Math.max(0, (rifle - .28) * 1.4).toFixed(4));
    progressReadout.textContent = `${String(Math.round(progress * 100)).padStart(2, "0")}%`;
    if (!activeHotspot) setSceneText(sceneIndex);
  }

  function requestUpdate() {
    if (!raf) raf = window.requestAnimationFrame(updateScene);
  }

  function openHotspot(kind) {
    const data = {
      optic: { kicker: "DEMO SLOT / OPTIC", title: "Óptica", copy: "Ponto demonstrativo para validar a leitura visual de acessórios sem afirmar compatibilidade técnica.", product: "RD-1 RED DOT", price: "R$ 429 · dado mockado" },
      magazine: { kicker: "DEMO SLOT / MAGAZINE", title: "Magazine", copy: "A área representa um slot de magazine. A seleção real dependerá dos dados de compatibilidade do catálogo.", product: "MAGAZINE DEMO", price: "Preço a definir · dado mockado" },
      rail: { kicker: "DEMO SLOT / RAIL", title: "Trilho / handguard", copy: "Um ponto de montagem para testar a narrativa. Nenhum encaixe real é presumido nesta prova.", product: "RAIL ACCESSORY DEMO", price: "Preço a definir · dado mockado" }
    }[kind];
    if (!data) return;
    activeHotspot = kind;
    detailKicker.textContent = data.kicker;
    detailTitle.textContent = data.title;
    detailCopy.textContent = data.copy;
    detailProduct.textContent = data.product;
    detailPrice.textContent = data.price;
    detailPanel.hidden = false;
    hotspots.forEach((button) => button.classList.toggle("is-active", button.dataset.hotspot === kind));
  }

  function closeHotspot() {
    activeHotspot = null;
    detailPanel.hidden = true;
    hotspots.forEach((button) => button.classList.remove("is-active"));
    updateScene();
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  hotspots.forEach((button) => button.addEventListener("click", () => openHotspot(button.dataset.hotspot)));
  document.querySelector("[data-close-detail]")?.addEventListener("click", closeHotspot);
  document.querySelector("[data-select-demo]")?.addEventListener("click", (event) => {
    event.currentTarget.textContent = "Marcado nesta prova ✓";
    event.currentTarget.disabled = true;
  });
  railButtons.forEach((button) => button.addEventListener("click", () => {
    const targetProgress = Number(button.dataset.sceneJump || 0);
    const top = scroller.offsetTop + targetProgress * Math.max(1, scroller.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  }));
  updateScene();
})();
