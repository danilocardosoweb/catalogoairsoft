(() => {
  const story = document.querySelector("[data-lab-story]");
  const sticky = story?.querySelector(".lab-story-sticky");
  const video = document.querySelector("[data-lab-video]");
  const copy = document.querySelector("[data-lab-copy]");
  const labInterface = document.querySelector("[data-lab-interface]");
  const choicePanel = document.querySelector("[data-choice-panel]");
  const choiceList = document.querySelector("[data-choice-list]");
  const nextButton = document.querySelector("[data-stage-next]");
  const previousButton = document.querySelector("[data-stage-prev]");
  const debugPanel = document.querySelector("[data-lab-debug]");
  if (!story || !sticky || !video || !copy || !labInterface || !choicePanel || !choiceList || !nextButton || !previousButton) return;

  const DEBUG = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const debug = {
    progress: debugPanel?.querySelector("[data-debug-progress]"),
    duration: debugPanel?.querySelector("[data-debug-duration]"),
    target: debugPanel?.querySelector("[data-debug-target]"),
    current: debugPanel?.querySelector("[data-debug-current]"),
    fps: debugPanel?.querySelector("[data-debug-fps]")
  };

  const stages = [
    {
      id: "platform",
      kicker: "LOADOUT LAB / 01",
      title: "Escolha sua base.",
      description: "A plataforma define o ritmo da sua operação.",
      panelTitle: "Plataforma",
      hint: "Escolha 1",
      choices: [
        { id: "neptune-10", name: "NEPTUNE 10\"", brand: "ROSSI", meta: "AEG · 380 FPS · V2", price: 1899, image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg" },
        { id: "cm16-raider", name: "CM16 RAIDER", brand: "G&G", meta: "AEG · 350 FPS · V2", price: 1749, image: "https://images.unsplash.com/photo-1728297756861-7af4647fada6?auto=format&fit=crop&w=1200&q=82" }
      ]
    },
    {
      id: "optic",
      kicker: "LOADOUT LAB / 02",
      title: "Leia o campo.",
      description: "Uma óptica simples acelera a aquisição sem pesar a plataforma.",
      panelTitle: "Óptica",
      hint: "Escolha 1",
      choices: [
        { id: "red-dot-rd1", name: "RD-1 RED DOT", brand: "VECTOR", meta: "1X · 20 MM RAIL", price: 429, image: "https://images.unsplash.com/photo-1687726258745-8546ad8030d6?auto=format&fit=crop&w=1200&q=82" },
        { id: "optic-none", name: "SEM ÓPTICA", brand: "CONFIGURAÇÃO LIMPA", meta: "Menos peso · mira aberta", price: 0, image: "" }
      ]
    },
    {
      id: "protection",
      kicker: "LOADOUT LAB / 03",
      title: "Vista o necessário.",
      description: "Proteção modular para entrar em campo sem perder mobilidade.",
      panelTitle: "Proteção",
      hint: "Escolha 1",
      choices: [
        { id: "plate-carrier-mk2", name: "PLATE CARRIER MK2", brand: "8FIELDS", meta: "MOLLE · ONE SIZE", price: 689, image: "https://images.unsplash.com/photo-1752559342576-dcbbfda3dbb7?auto=format&fit=crop&w=1200&q=82" },
        { id: "protection-light", name: "SETUP LEVE", brand: "CONFIGURAÇÃO LIMPA", meta: "Mobilidade máxima", price: 0, image: "" }
      ]
    },
    {
      id: "ammo",
      kicker: "LOADOUT LAB / 04",
      title: "Escolha o ritmo.",
      description: "A munição certa fecha a preparação e mantém a operação consistente.",
      panelTitle: "Munição",
      hint: "Escolha 1",
      choices: [
        { id: "bb-bio-025", name: "BIO BB 0.25G", brand: "BLS", meta: "BIODEGRADÁVEL · 1 KG", price: 119, image: "https://mirtactical.com/product_images/uploaded_images/gim1.jpg" },
        { id: "ammo-later", name: "ESCOLHER DEPOIS", brand: "CONFIGURAÇÃO ABERTA", meta: "Adicione antes de solicitar", price: 0, image: "" }
      ]
    },
    {
      id: "sidearm",
      kicker: "LOADOUT LAB / 05",
      title: "Última decisão.",
      description: "Um backup para quando a distância encurta e o plano muda.",
      panelTitle: "Backup",
      hint: "Escolha 1",
      choices: [
        { id: "hi-capa-5-1", name: "HI-CAPA 5.1", brand: "KJW", meta: "GBB · 310 FPS · GAS", price: 999, image: "https://cdn.airsoftbazaar.com/uploads/listings/listing-mcuiii_2_Vm3Qfjev.jpg" },
        { id: "sidearm-none", name: "SEM BACKUP", brand: "CONFIGURAÇÃO ENXUTA", meta: "Apenas a plataforma", price: 0, image: "" }
      ]
    }
  ];

  const flatChoices = stages.flatMap((stage) => stage.choices);
  const firstChoiceByStage = Object.fromEntries(stages.map((stage) => [stage.id, stage.choices[0].id]));
  let selection = { ...firstChoiceByStage };
  let activeStage = 0;
  let saveMessage = "";

  try {
    const saved = JSON.parse(localStorage.getItem("fieldops-lab-loadout") || "null");
    if (saved && typeof saved === "object") selection = { ...selection, ...saved };
  } catch {
    selection = { ...firstChoiceByStage };
  }

  let duration = 0;
  let targetTime = 0;
  let renderedTime = 0;
  let scrollFrame = 0;
  let scrubFrame = 0;
  let nextSeekAt = 0;
  let previousPaint = performance.now();
  let measuredFps = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const formatMoney = (value) => value ? `R$ ${value.toLocaleString("pt-BR")}` : "Sem custo";
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[char]);

  function getProgress() {
    const travel = Math.max(1, story.offsetHeight - sticky.clientHeight);
    return clamp(-story.getBoundingClientRect().top / travel);
  }

  function getSelectedChoices() {
    return stages.map((stage) => flatChoices.find((choice) => choice.id === selection[stage.id])).filter(Boolean);
  }

  function updateSummary() {
    const selectedChoices = getSelectedChoices();
    const total = selectedChoices.reduce((sum, choice) => sum + choice.price, 0);
    const paidItems = selectedChoices.filter((choice) => choice.price > 0).length;
    const totalElement = document.querySelector("[data-lab-total]");
    const countElement = document.querySelector("[data-lab-selection-count]");
    if (totalElement) totalElement.textContent = formatMoney(total);
    if (countElement) countElement.textContent = `${String(selectedChoices.length).padStart(2, "0")} decisões registradas · ${paidItems} itens pagos`;
  }

  function renderStage(index) {
    activeStage = clamp(index, 0, stages.length - 1);
    const stage = stages[activeStage];
    const stageIndex = document.querySelector("[data-lab-stage-index]");
    const stageKicker = document.querySelector("[data-lab-stage-kicker]");
    const stageTitle = document.querySelector("[data-lab-stage-title]");
    const stageDescription = document.querySelector("[data-lab-stage-description]");
    const panelTitle = document.querySelector("[data-lab-panel-title]");
    const choiceHint = document.querySelector("[data-lab-choice-hint]");
    if (stageIndex) stageIndex.textContent = `${String(activeStage + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`;
    if (stageKicker) stageKicker.textContent = stage.kicker;
    if (stageTitle) stageTitle.textContent = stage.title;
    if (stageDescription) stageDescription.textContent = stage.description;
    if (panelTitle) panelTitle.textContent = stage.panelTitle;
    if (choiceHint) choiceHint.textContent = stage.hint;

    choiceList.innerHTML = stage.choices.map((choice) => {
      const selected = selection[stage.id] === choice.id;
      const image = choice.image ? `style="background-image: url('${escapeHtml(choice.image)}')"` : "";
      return `<button class="lab-choice${selected ? " is-selected" : ""}" type="button" role="option" aria-selected="${selected}" data-choice-id="${escapeHtml(choice.id)}"><span class="lab-choice-image${choice.image ? "" : " is-empty"}" ${image} aria-hidden="true"></span><span class="lab-choice-copy"><strong>${escapeHtml(choice.name)}</strong><small>${escapeHtml(choice.brand)} · ${escapeHtml(choice.meta)}</small></span><span class="lab-choice-price">${escapeHtml(formatMoney(choice.price))}</span></button>`;
    }).join("");

    previousButton.disabled = activeStage === 0;
    previousButton.setAttribute("aria-disabled", String(activeStage === 0));
    nextButton.innerHTML = activeStage === stages.length - 1 ? `Salvar configuração <span>✓</span>` : `Confirmar escolha <span>↗</span>`;
    const saveStatus = document.querySelector("[data-save-status]");
    if (saveStatus) saveStatus.textContent = saveMessage;
    updateSummary();
  }

  function updateInterface(progress) {
    const interfaceProgress = clamp((progress - 0.045) / 0.11);
    const stageIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
    if (stageIndex !== activeStage) renderStage(stageIndex);
    labInterface.style.setProperty("--ui-opacity", interfaceProgress.toFixed(4));
    choicePanel.style.setProperty("--panel-y", `${((1 - interfaceProgress) * 16).toFixed(2)}px`);
    choicePanel.style.pointerEvents = interfaceProgress > 0.62 ? "auto" : "none";
  }

  function updateDebug(progress) {
    if (!DEBUG || !debugPanel) return;
    debug.progress.textContent = progress.toFixed(2);
    debug.duration.textContent = duration ? `${duration.toFixed(2)}s` : "—";
    debug.target.textContent = targetTime.toFixed(2);
    debug.current.textContent = renderedTime.toFixed(2);
    debug.fps.textContent = measuredFps ? `${measuredFps}` : "—";
  }

  function scheduleScrub() {
    if (!scrubFrame) scrubFrame = window.requestAnimationFrame(paintVideo);
  }

  function paintVideo() {
    scrubFrame = 0;
    if (!duration || video.readyState < 1) return;

    if (reducedMotion) {
      renderedTime = 0;
      targetTime = 0;
    } else {
      const difference = targetTime - renderedTime;
      renderedTime += difference * 0.2;
      if (Math.abs(difference) < 0.012) renderedTime = targetTime;
    }

    const nextTime = clamp(renderedTime, 0, Math.max(0, duration - 0.001));
    const now = performance.now();
    if (!reducedMotion && now >= nextSeekAt && Math.abs(video.currentTime - nextTime) > 0.018) {
      nextSeekAt = now + 80;
      try {
        video.currentTime = nextTime;
      } catch {
        nextSeekAt = now;
      }
    }

    const delta = now - previousPaint;
    if (delta > 0) measuredFps = Math.round(1000 / delta);
    previousPaint = now;
    updateDebug(getProgress());
    if (!reducedMotion && Math.abs(targetTime - renderedTime) > 0.012) scheduleScrub();
  }

  function updateTarget() {
    scrollFrame = 0;
    initializeDuration();
    const progress = getProgress();
    targetTime = reducedMotion ? 0 : progress * duration;
    updateInterface(progress);
    const copyExit = clamp(progress / 0.12);
    copy.style.setProperty("--copy-opacity", (1 - copyExit).toFixed(4));
    copy.style.setProperty("--copy-y", `${(-copyExit * 18).toFixed(2)}px`);
    updateDebug(progress);
    scheduleScrub();
  }

  function requestUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateTarget);
  }

  function scrollToStage(index) {
    const travel = Math.max(1, story.offsetHeight - sticky.clientHeight);
    const progress = clamp((index + 0.18) / stages.length);
    window.scrollTo({ top: story.offsetTop + travel * progress, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function saveLoadout() {
    localStorage.setItem("fieldops-lab-loadout", JSON.stringify(selection));
    saveMessage = "Configuração salva neste dispositivo.";
    renderStage(activeStage);
  }

  function markReady() {
    sticky.classList.add("is-video-ready");
  }

  function initializeDuration() {
    if (duration || !Number.isFinite(video.duration) || video.duration <= 0) return false;
    duration = video.duration;
    video.currentTime = 0;
    renderedTime = 0;
    markReady();
    return true;
  }

  function prepareVideo() {
    if (!initializeDuration()) return;
    targetTime = reducedMotion ? 0 : getProgress() * duration;
    updateDebug(getProgress());
    requestUpdate();
  }

  choiceList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-choice-id]");
    if (!choiceButton) return;
    const stage = stages[activeStage];
    selection[stage.id] = choiceButton.dataset.choiceId;
    saveMessage = "";
    renderStage(activeStage);
  });

  previousButton.addEventListener("click", () => {
    if (activeStage > 0) scrollToStage(activeStage - 1);
  });

  nextButton.addEventListener("click", () => {
    if (activeStage === stages.length - 1) {
      saveLoadout();
      return;
    }
    scrollToStage(activeStage + 1);
  });

  renderStage(0);
  if (DEBUG && debugPanel) debugPanel.hidden = false;
  video.addEventListener("loadedmetadata", prepareVideo, { once: true });
  video.addEventListener("loadeddata", () => {
    markReady();
    prepareVideo();
  }, { once: true });
  video.addEventListener("error", () => sticky.classList.add("is-video-error"), { once: true });
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  if (video.readyState >= 1) prepareVideo();
  requestUpdate();
})();
