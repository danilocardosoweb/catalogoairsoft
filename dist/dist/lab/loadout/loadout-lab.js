(() => {
  const labExperience = document.querySelector(".lab-experience");
  const story = document.querySelector("[data-lab-story]");
  const sticky = story?.querySelector(".lab-story-sticky");
  const video = document.querySelector("[data-lab-video]");
  const videoLock = document.querySelector("[data-lab-video-lock]");
  const copy = document.querySelector("[data-lab-copy]");
  const labInterface = document.querySelector("[data-lab-interface]");
  const choicePanel = document.querySelector("[data-choice-panel]");
  const choiceList = document.querySelector("[data-choice-list]");
  const stageRail = document.querySelector("[data-stage-rail]");
  const stageRailList = document.querySelector("[data-stage-rail-list]");
  const railStatus = document.querySelector("[data-lab-rail-status]");
  const calloutLines = document.querySelector("[data-callout-lines]");
  const calloutPath = document.querySelector("[data-callout-path]");
  const calloutTarget = document.querySelector("[data-callout-target]");
  const calloutEnd = document.querySelector("[data-callout-end]");
  const nextButton = document.querySelector("[data-stage-next]");
  const previousButton = document.querySelector("[data-stage-prev]");
  const debugPanel = document.querySelector("[data-lab-debug]");
  if (!story || !sticky || !video || !copy || !labInterface || !choicePanel || !choiceList || !nextButton || !previousButton) return;

  const DEBUG = window.LOADOUT_DEBUG === true || new URLSearchParams(window.location.search).get("debug") === "1";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cinematicAssets = Object.freeze({
    rifleDesktopVideo: video?.dataset.labVideoSrc || "./rifle-experience.mp4",
    rifleMobileVideo: video?.dataset.labMobileVideoSrc || "",
    riflePoster: video?.getAttribute("poster") || "./rifle-poster.jpg",
    pistolDesktopVideo: "",
    pistolMobileVideo: "",
    pistolPoster: ""
  });
  const debug = {
    section: debugPanel?.querySelector("[data-debug-section]"),
    progress: debugPanel?.querySelector("[data-debug-progress]"),
    duration: debugPanel?.querySelector("[data-debug-duration]"),
    target: debugPanel?.querySelector("[data-debug-target]"),
    current: debugPanel?.querySelector("[data-debug-current]"),
    fps: debugPanel?.querySelector("[data-debug-fps]"),
    ready: debugPanel?.querySelector("[data-debug-ready]")
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

  const calloutTargets = {
    platform: { desktop: [43, 52], mobile: [62, 57] },
    optic: { desktop: [49, 34], mobile: [83, 38] },
    protection: { desktop: [26, 49], mobile: [30, 51] },
    ammo: { desktop: [45, 72], mobile: [74, 76] },
    sidearm: { desktop: [35, 83], mobile: [42, 83] }
  };

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
  let seekInFlight = false;
  let seekGuardId = 0;
  let previousPaint = performance.now();
  let measuredFps = 0;
  let sourcePromise = null;
  let sourceObjectUrl = "";
  let sourceReady = false;
  let userReady = false;
  let scrollTriggerInstance = null;
  let lenis = null;
  let scrollDriverReady = false;
  let scrollProgress = 0;
  const maxScrubStep = 0.34;
  const choiceProgressStart = 0.08;
  const choiceProgressEnd = 0.92;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const formatMoney = (value) => value ? `R$ ${value.toLocaleString("pt-BR")}` : "Sem custo";
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[char]);

  function sourceUrl() {
    const isMobileViewport = window.matchMedia("(max-width: 760px)").matches;
    const declared = isMobileViewport && cinematicAssets.rifleMobileVideo
      ? cinematicAssets.rifleMobileVideo
      : cinematicAssets.rifleDesktopVideo || video.querySelector("source")?.getAttribute("src") || video.getAttribute("src");
    if (!declared) return "";
    try {
      return new URL(declared, document.baseURI).href;
    } catch {
      return declared;
    }
  }

  function primeVideo() {
    if (!userReady || reducedMotion || video.readyState < 1) return;
    try {
      const playPromise = video.play();
      if (playPromise?.then) playPromise.then(() => video.pause()).catch(() => {});
    } catch {}
  }

  function loadSeekableVideo() {
    if (sourcePromise || sourceReady || reducedMotion) return sourcePromise;
    const url = sourceUrl();
    if (!url) return null;
    sourcePromise = fetch(url, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        sourceObjectUrl = URL.createObjectURL(blob);
        video.removeAttribute("src");
        video.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
        video.src = sourceObjectUrl;
        video.load();
        sourceReady = true;
      })
      .catch(() => {
        video.src = url;
        video.load();
        sourceReady = true;
      });
    return sourcePromise;
  }

  function getProgress() {
    if (scrollDriverReady) return scrollProgress;
    const travel = Math.max(1, story.offsetHeight - sticky.clientHeight);
    return clamp(-story.getBoundingClientRect().top / travel);
  }

  function mapRifleProgress(progress) {
    const motionEnd = 0.94;
    if (progress >= motionEnd) return 1;
    return clamp(1 - Math.pow(1 - progress / motionEnd, 1.65));
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

  function stageIndexForProgress(progress) {
    const normalized = clamp((progress - choiceProgressStart) / (choiceProgressEnd - choiceProgressStart));
    return clamp(Math.floor(normalized * stages.length), 0, stages.length - 1);
  }

  function renderStageRail() {
    if (!stageRailList) return;
    stageRailList.innerHTML = stages.map((stage, index) => {
      const selectedChoice = flatChoices.find((choice) => choice.id === selection[stage.id]);
      const isActive = index === activeStage;
      const isComplete = index < activeStage;
      const hasImage = Boolean(selectedChoice?.image);
      const image = hasImage ? `style="background-image: url('${escapeHtml(selectedChoice.image)}')"` : "";
      const state = isActive ? "is-active" : isComplete ? "is-complete" : "";
      const current = isActive ? ' aria-current="step"' : "";
      const choiceName = selectedChoice?.name || "Aguardando escolha";
      return `<button class="lab-stage-step ${state}" type="button" data-stage-index="${index}" aria-label="${escapeHtml(stage.panelTitle)}: ${escapeHtml(choiceName)}"${current}><span class="lab-stage-marker"><b>${String(index + 1).padStart(2, "0")}</b></span><span class="lab-stage-step-image${hasImage ? "" : " is-empty"}" ${image} aria-hidden="true"></span><span class="lab-stage-step-copy"><strong>${escapeHtml(stage.panelTitle)}</strong><small>${escapeHtml(choiceName)}</small></span></button>`;
    }).join("");
    if (railStatus) railStatus.textContent = `${String(activeStage + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`;
  }

  function updateCallout() {
    if (!calloutLines || !calloutPath || !calloutTarget || !calloutEnd || !stageRailList) return;
    const stage = stages[activeStage];
    const activeStep = stageRailList.querySelector(`[data-stage-index="${activeStage}"]`);
    const endpoint = activeStep?.querySelector(".lab-stage-step-image") || activeStep;
    const stickyRect = sticky.getBoundingClientRect();
    const endpointRect = endpoint?.getBoundingClientRect();
    const targetSet = calloutTargets[stage.id];
    if (!endpointRect || !targetSet || !stickyRect.width || !stickyRect.height) return;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const [targetX, targetY] = targetSet[isMobile ? "mobile" : "desktop"];
    const endX = ((endpointRect.left + endpointRect.width / 2 - stickyRect.left) / stickyRect.width) * 100;
    const endY = ((endpointRect.top + endpointRect.height / 2 - stickyRect.top) / stickyRect.height) * 100;
    const elbowX = targetX + (endX - targetX) * 0.52;
    calloutPath.setAttribute("d", `M ${targetX.toFixed(2)} ${targetY.toFixed(2)} L ${elbowX.toFixed(2)} ${targetY.toFixed(2)} L ${elbowX.toFixed(2)} ${endY.toFixed(2)} L ${endX.toFixed(2)} ${endY.toFixed(2)}`);
    calloutTarget.setAttribute("cx", targetX.toFixed(2));
    calloutTarget.setAttribute("cy", targetY.toFixed(2));
    calloutEnd.setAttribute("cx", endX.toFixed(2));
    calloutEnd.setAttribute("cy", endY.toFixed(2));
    calloutLines.classList.add("is-visible");
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
    if (choiceHint) choiceHint.textContent = `${stage.choices.length} disponíveis`;

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
    renderStageRail();
    updateCallout();
    updateSummary();
  }

  function updateInterface(progress) {
    const interfaceProgress = clamp((progress - choiceProgressStart) / 0.08);
    const nextStage = stageIndexForProgress(progress);
    if (progress >= choiceProgressStart && nextStage !== activeStage) renderStage(nextStage);
    labInterface.style.setProperty("--ui-opacity", interfaceProgress.toFixed(4));
    choicePanel.style.setProperty("--panel-y", `${((1 - interfaceProgress) * 16).toFixed(2)}px`);
    choicePanel.style.pointerEvents = interfaceProgress > 0.62 ? "auto" : "none";
    labInterface.setAttribute("aria-hidden", String(interfaceProgress <= 0.62));
  }

  function updateContinuityGuard(progress) {
    if (!videoLock) return;
    const lockProgress = clamp((progress - 0.72) / 0.18);
    const easedLock = lockProgress * lockProgress * (3 - 2 * lockProgress);
    videoLock.style.setProperty("--lock-opacity", easedLock.toFixed(4));
    videoLock.style.setProperty("--lock-scale", (1 + lockProgress * 0.018).toFixed(4));
  }

  function updateDebug(progress) {
    if (!DEBUG || !debugPanel) return;
    if (debug.section) debug.section.textContent = "RIFLE";
    debug.progress.textContent = progress.toFixed(2);
    debug.duration.textContent = duration ? `${duration.toFixed(2)}s` : "—";
    debug.target.textContent = targetTime.toFixed(2);
    debug.current.textContent = renderedTime.toFixed(2);
    debug.fps.textContent = measuredFps ? `${measuredFps}` : "—";
    if (debug.ready) debug.ready.textContent = `${video.readyState}/4`;
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
      const step = Math.min(Math.abs(difference) * 0.2, maxScrubStep);
      renderedTime += Math.sign(difference) * step;
      if (Math.abs(difference) < 0.012) renderedTime = targetTime;
    }

    const nextTime = clamp(renderedTime, 0, Math.max(0, duration - 0.001));
    const now = performance.now();
    if (!reducedMotion && !seekInFlight && !video.seeking && now >= nextSeekAt && Math.abs(video.currentTime - nextTime) > 0.018) {
      nextSeekAt = now + 80;
      seekInFlight = true;
      try {
        video.currentTime = nextTime;
        window.clearTimeout(seekGuardId);
        seekGuardId = window.setTimeout(() => {
          seekInFlight = false;
          seekGuardId = 0;
          scheduleScrub();
        }, 180);
      } catch {
        seekInFlight = false;
        nextSeekAt = now;
      }
    }

    const delta = now - previousPaint;
    if (delta > 0) measuredFps = Math.round(1000 / delta);
    previousPaint = now;
    updateDebug(getProgress());
    if (!reducedMotion && (seekInFlight || Math.abs(targetTime - renderedTime) > 0.012)) scheduleScrub();
  }

  function updateTarget() {
    scrollFrame = 0;
    initializeDuration();
    applyProgress(getProgress());
  }

  function applyProgress(progress) {
    scrollProgress = clamp(progress);
    const progressForVideo = mapRifleProgress(scrollProgress);
    targetTime = reducedMotion ? 0 : progressForVideo * duration;
    updateInterface(scrollProgress);
    updateContinuityGuard(scrollProgress);
    const copyExit = clamp(scrollProgress / 0.12);
    copy.style.setProperty("--copy-opacity", (1 - copyExit).toFixed(4));
    copy.style.setProperty("--copy-y", `${(-copyExit * 18).toFixed(2)}px`);
    updateDebug(scrollProgress);
    scheduleScrub();
  }

  function requestUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateTarget);
  }

  function scrollToStage(index) {
    const travel = Math.max(1, story.offsetHeight - sticky.clientHeight);
    const segment = (choiceProgressEnd - choiceProgressStart) / stages.length;
    const progress = clamp(choiceProgressStart + segment * (index + 0.5));
    const top = story.offsetTop + travel * progress;
    if (lenis) {
      lenis.scrollTo(top, { duration: reducedMotion ? 0 : 0.85 });
    } else {
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    }
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
    applyProgress(getProgress());
  }

  function setupSmoothScroll() {
    if (reducedMotion || !window.gsap || !window.ScrollTrigger) return false;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      lenis = new window.Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false
      });
      lenis.on("scroll", () => ScrollTrigger.update());
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    scrollDriverReady = true;
    if (labExperience) labExperience.classList.add("is-scrolltrigger");
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: story,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
      scrub: 0.22,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyProgress(self.progress)
    });
    ScrollTrigger.refresh();
    return true;
  }

  function onSeeked() {
    seekInFlight = false;
    window.clearTimeout(seekGuardId);
    seekGuardId = 0;
    scheduleScrub();
  }

  function onFirstGesture() {
    userReady = true;
    primeVideo();
  }

  choiceList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-choice-id]");
    if (!choiceButton) return;
    const stage = stages[activeStage];
    selection[stage.id] = choiceButton.dataset.choiceId;
    saveMessage = "";
    renderStage(activeStage);
  });

  stageRailList?.addEventListener("click", (event) => {
    const stageButton = event.target.closest("[data-stage-index]");
    if (!stageButton) return;
    const stageIndex = Number(stageButton.dataset.stageIndex);
    if (!Number.isInteger(stageIndex)) return;
    if (scrollProgress >= 0.88) renderStage(stageIndex);
    else scrollToStage(stageIndex);
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
  video.addEventListener("loadedmetadata", prepareVideo);
  video.addEventListener("loadeddata", () => {
    markReady();
    prepareVideo();
    primeVideo();
  });
  video.addEventListener("seeked", onSeeked);
  video.addEventListener("error", () => sticky.classList.add("is-video-error"), { once: true });
  const smoothDriver = setupSmoothScroll();
  if (!smoothDriver) window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    if (scrollTriggerInstance && window.ScrollTrigger) window.ScrollTrigger.refresh();
    updateCallout();
    requestUpdate();
  }, { passive: true });
  window.addEventListener("pointerdown", onFirstGesture, { once: true, passive: true });
  window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });

  loadSeekableVideo();
  if (video.readyState >= 1 && sourceReady) prepareVideo();
  requestUpdate();

  window.addEventListener("pagehide", () => {
    window.clearTimeout(seekGuardId);
    if (sourceObjectUrl) URL.revokeObjectURL(sourceObjectUrl);
  }, { once: true });
})();
