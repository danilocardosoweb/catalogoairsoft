(() => {
  'use strict';

  const STORAGE_KEY = 'fieldops-lab-phase1-loadout';
  const chapterStart = 0.08;
  const chapterEnd = 0.88;
  const summaryStart = 0.9;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stages = [
    {
      id: 'helmet', label: 'Capacete', shortLabel: 'Capacete', kicker: 'LOADOUT LAB / 01',
      title: 'Proteja a cabeça.', description: 'Comece pelo conforto e pela proteção que sustentam toda a operação.',
      focus: [47, 15], polygon: [[34, 3], [57, 3], [62, 25], [35, 27]],
      choices: [
        { id: 'helmet-01', name: 'FAST BASE', brand: 'OPÇÃO MOCK 01', meta: 'Leve · trilho lateral', price: 329, badge: 'Base' },
        { id: 'helmet-02', name: 'FAST COMMS', brand: 'OPÇÃO MOCK 02', meta: 'Trilho · comunicação', price: 459, badge: 'Tático' },
        { id: 'helmet-03', name: 'MICH HIGH CUT', brand: 'OPÇÃO MOCK 03', meta: 'Cobertura · ajuste rápido', price: 389, badge: 'Proteção' },
        { id: 'helmet-04', name: 'BOONIE LIGHT', brand: 'OPÇÃO MOCK 04', meta: 'Leve · campo aberto', price: 199, badge: 'Leve' },
        { id: 'helmet-05', name: 'CONFIGURAÇÃO LIVRE', brand: 'OPÇÃO MOCK 05', meta: 'Espaço para personalizar', price: 0, badge: 'Livre' }
      ]
    },
    {
      id: 'face', label: 'Proteção facial', shortLabel: 'Proteção', kicker: 'LOADOUT LAB / 02',
      title: 'Mantenha o foco.', description: 'Escolha a proteção facial adequada ao seu estilo de jogo e ao seu conforto.',
      focus: [58, 25], polygon: [[43, 17], [64, 16], [68, 38], [45, 40]],
      choices: [
        { id: 'face-01', name: 'MÁSCARA FULL', brand: 'OPÇÃO MOCK 01', meta: 'Proteção integral · ventilada', price: 189, badge: 'Segura' },
        { id: 'face-02', name: 'MÁSCARA MESH', brand: 'OPÇÃO MOCK 02', meta: 'Tela metálica · leve', price: 119, badge: 'Leve' },
        { id: 'face-03', name: 'ÓCULOS CLEAR', brand: 'OPÇÃO MOCK 03', meta: 'Lente transparente · ajuste', price: 149, badge: 'Visão' },
        { id: 'face-04', name: 'ÓCULOS FUMÊ', brand: 'OPÇÃO MOCK 04', meta: 'Lente fumê · campo aberto', price: 159, badge: 'Sol' },
        { id: 'face-05', name: 'PROTEÇÃO MODULAR', brand: 'OPÇÃO MOCK 05', meta: 'Base para combinar', price: 229, badge: 'Modular' }
      ]
    },
    {
      id: 'vest', label: 'Colete', shortLabel: 'Colete', kicker: 'LOADOUT LAB / 03',
      title: 'Monte sua base.', description: 'O colete organiza o equipamento e deixa o acesso rápido quando a partida começa.',
      focus: [52, 43], polygon: [[31, 29], [69, 28], [75, 71], [27, 70]],
      choices: [
        { id: 'vest-01', name: 'PLATE CARRIER', brand: 'OPÇÃO MOCK 01', meta: 'Compacto · painel frontal', price: 349, badge: 'Base' },
        { id: 'vest-02', name: 'CHEST RIG', brand: 'OPÇÃO MOCK 02', meta: 'Leve · acesso frontal', price: 279, badge: 'Ágil' },
        { id: 'vest-03', name: 'COLETE MODULAR', brand: 'OPÇÃO MOCK 03', meta: 'Módulos · expansão', price: 429, badge: 'Modular' },
        { id: 'vest-04', name: 'PLATE CARRIER LOW', brand: 'OPÇÃO MOCK 04', meta: 'Perfil baixo · mobilidade', price: 389, badge: 'Mobilidade' },
        { id: 'vest-05', name: 'CONFIGURAÇÃO LIVRE', brand: 'OPÇÃO MOCK 05', meta: 'Espaço para personalizar', price: 0, badge: 'Livre' }
      ]
    },
    {
      id: 'gloves', label: 'Luvas', shortLabel: 'Luvas', kicker: 'LOADOUT LAB / 04',
      title: 'Ganhe controle.', description: 'Ajuste, proteção e aderência para manter a mão firme em cada movimento.',
      focus: [30, 69], polygon: [[13, 56], [37, 57], [45, 87], [17, 90]],
      choices: [
        { id: 'gloves-01', name: 'LUVA TÁTICA', brand: 'OPÇÃO MOCK 01', meta: 'Palma aderente · ajuste', price: 89, badge: 'Controle' },
        { id: 'gloves-02', name: 'LUVA MEIO DEDO', brand: 'OPÇÃO MOCK 02', meta: 'Mobilidade · ventilação', price: 69, badge: 'Ágil' },
        { id: 'gloves-03', name: 'LUVA IMPACT', brand: 'OPÇÃO MOCK 03', meta: 'Proteção · reforço', price: 119, badge: 'Proteção' },
        { id: 'gloves-04', name: 'LUVA CAMUFLADA', brand: 'OPÇÃO MOCK 04', meta: 'Campo · aderência', price: 99, badge: 'Campo' },
        { id: 'gloves-05', name: 'SEM LUVAS', brand: 'OPÇÃO MOCK 05', meta: 'Jogue com sua preferência', price: 0, badge: 'Livre' }
      ]
    },
    {
      id: 'platform', label: 'Plataforma', shortLabel: 'Plataforma', kicker: 'LOADOUT LAB / 05',
      title: 'Escolha a plataforma.', description: 'A peça central do seu setup: pense no alcance, na cadência e na forma de jogar.',
      focus: [57, 62], polygon: [[39, 43], [73, 42], [83, 79], [39, 80]],
      choices: [
        { id: 'platform-01', name: 'RIFLE AEG', brand: 'OPÇÃO MOCK 01', meta: 'Versátil · uso geral', price: 1299, badge: 'Versátil' },
        { id: 'platform-02', name: 'SMG AEG', brand: 'OPÇÃO MOCK 02', meta: 'Compacta · curta distância', price: 999, badge: 'Compacta' },
        { id: 'platform-03', name: 'PISTOLA GBB', brand: 'OPÇÃO MOCK 03', meta: 'Backup · resposta rápida', price: 799, badge: 'Backup' },
        { id: 'platform-04', name: 'DMR AEG', brand: 'OPÇÃO MOCK 04', meta: 'Alcance · precisão', price: 1599, badge: 'Precisão' },
        { id: 'platform-05', name: 'PLATAFORMA LIVRE', brand: 'OPÇÃO MOCK 05', meta: 'Escolha sua base', price: 0, badge: 'Livre' }
      ]
    },
    {
      id: 'optic', label: 'Óptica', shortLabel: 'Óptica', kicker: 'LOADOUT LAB / 06',
      title: 'Leia o campo.', description: 'Uma óptica coerente com sua plataforma simplifica a mira e acelera a decisão.',
      focus: [73, 51], polygon: [[61, 30], [91, 29], [94, 53], [63, 55]],
      choices: [
        { id: 'optic-01', name: 'RED DOT', brand: 'OPÇÃO MOCK 01', meta: 'Aquisição rápida · compacto', price: 349, badge: 'Rápido' },
        { id: 'optic-02', name: 'HOLOGRÁFICA', brand: 'OPÇÃO MOCK 02', meta: 'Visão ampla · campo', price: 499, badge: 'Ampla' },
        { id: 'optic-03', name: 'MAGNIFIER', brand: 'OPÇÃO MOCK 03', meta: 'Ampliação · alcance', price: 579, badge: 'Alcance' },
        { id: 'optic-04', name: 'LUNETA 1–4X', brand: 'OPÇÃO MOCK 04', meta: 'Variável · precisão', price: 699, badge: 'Precisão' },
        { id: 'optic-05', name: 'SEM ÓPTICA', brand: 'OPÇÃO MOCK 05', meta: 'Plataforma aberta', price: 0, badge: 'Livre' }
      ]
    },
    {
      id: 'energy', label: 'Energia / munição', shortLabel: 'Energia', kicker: 'LOADOUT LAB / 07',
      title: 'Mantenha o ritmo.', description: 'Organize energia e munição para não interromper o jogo quando a operação apertar.',
      focus: [47, 77], polygon: [[34, 60], [68, 60], [74, 94], [29, 94]],
      choices: [
        { id: 'energy-01', name: 'BATERIA + 3 MAG', brand: 'OPÇÃO MOCK 01', meta: 'Autonomia · partida', price: 229, badge: 'Pronto' },
        { id: 'energy-02', name: 'CO2 + 2 MAG', brand: 'OPÇÃO MOCK 02', meta: 'Resposta · backup', price: 289, badge: 'Resposta' },
        { id: 'energy-03', name: 'BB 0,25G · 1KG', brand: 'OPÇÃO MOCK 03', meta: 'Munição · uso geral', price: 89, badge: 'Essencial' },
        { id: 'energy-04', name: 'BB BIO · 1KG', brand: 'OPÇÃO MOCK 04', meta: 'Munição · campo', price: 109, badge: 'Campo' },
        { id: 'energy-05', name: 'KIT DE RECARGA', brand: 'OPÇÃO MOCK 05', meta: 'Organização · reposição', price: 149, badge: 'Prático' }
      ]
    },
    {
      id: 'backup', label: 'Backup', shortLabel: 'Backup', kicker: 'LOADOUT LAB / 08',
      title: 'Feche o conjunto.', description: 'A última camada é o que mantém sua operação fluindo quando o plano muda.',
      focus: [77, 72], polygon: [[68, 53], [91, 53], [98, 88], [67, 90]],
      choices: [
        { id: 'backup-01', name: 'PISTOLA GBB', brand: 'OPÇÃO MOCK 01', meta: 'Compacta · backup', price: 799, badge: 'Backup' },
        { id: 'backup-02', name: 'COLDRE + MAG', brand: 'OPÇÃO MOCK 02', meta: 'Acesso · segurança', price: 239, badge: 'Acesso' },
        { id: 'backup-03', name: 'RÁDIO + PTT', brand: 'OPÇÃO MOCK 03', meta: 'Comunicação · equipe', price: 329, badge: 'Equipe' },
        { id: 'backup-04', name: 'LANTERNA TÁTICA', brand: 'OPÇÃO MOCK 04', meta: 'Visibilidade · suporte', price: 189, badge: 'Suporte' },
        { id: 'backup-05', name: 'DEIXAR EM ABERTO', brand: 'OPÇÃO MOCK 05', meta: 'Complete depois', price: 0, badge: 'Livre' }
      ]
    }
  ];

  const refs = {
    story: document.querySelector('[data-lab-story]'),
    sticky: document.querySelector('.lab-story-sticky'),
    interface: document.querySelector('[data-lab-interface]'),
    videoStage: document.querySelector('[data-lab-video-stage]'),
    video: document.querySelector('[data-lab-video]'),
    poster: document.querySelector('[data-lab-video-poster]'),
    videoLock: document.querySelector('[data-lab-video-lock]'),
    labCopy: document.querySelector('[data-lab-copy]'),
    missionKicker: document.querySelector('[data-lab-kicker]'),
    missionTitle: document.querySelector('[data-lab-title]'),
    missionDescription: document.querySelector('[data-lab-description]'),
    statusLabel: document.querySelector('[data-lab-status-label]'),
    total: document.querySelector('[data-lab-total]'),
    selectionCount: document.querySelector('[data-lab-selection-count]'),
    stageRail: document.querySelector('[data-stage-rail]'),
    choicePanel: document.querySelector('[data-choice-panel]'),
    choicePanelTitle: document.querySelector('[data-choice-panel-title]'),
    choicePanelIndex: document.querySelector('[data-lab-stage-index]'),
    choicePanelState: document.querySelector('[data-choice-panel-state]'),
    choicePanelHint: document.querySelector('[data-choice-panel-hint]'),
    choicePanelInstruction: document.querySelector('[data-choice-panel-instruction]'),
    choiceList: document.querySelector('[data-choice-list]'),
    stageSkip: document.querySelector('[data-stage-skip]'),
    stageSkipStatus: document.querySelector('[data-stage-skip-status]'),
    saveStatus: document.querySelector('[data-save-status]'),
    summaryPanel: document.querySelector('[data-summary-panel]'),
    summaryList: document.querySelector('[data-summary-list]'),
    summaryTotal: document.querySelector('[data-summary-total]'),
    saveLoadout: document.querySelector('[data-save-loadout]'),
    hotspotPolygon: document.querySelector('[data-hotspot-polygon]'),
    hotspotScan: document.querySelector('[data-hotspot-scan]'),
    hotspotLabel: document.querySelector('[data-hotspot-label]'),
    hotspotIndex: document.querySelector('[data-hotspot-index]'),
    hotspotName: document.querySelector('[data-hotspot-name]'),
    hotspotState: document.querySelector('[data-hotspot-state]'),
    calloutPath: document.querySelector('[data-callout-path]'),
    calloutTarget: document.querySelector('[data-callout-target]'),
    calloutEnd: document.querySelector('[data-callout-end]')
  };

  if (!refs.story || !refs.video || !refs.stageRail) return;

  let selection = {};
  let skipped = new Set();
  let currentStage = -1;
  let currentProgress = 0;
  let videoReady = false;
  let videoDuration = 0;
  let framePending = false;
  let lenis;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const formatMoney = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  const selectedChoice = (stage) => stage.choices.find((choice) => choice.id === selection[stage.id]);
  const totalValue = () => stages.reduce((sum, stage) => sum + (selectedChoice(stage)?.price || 0), 0);

  function loadLocalDraft() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      if (stored && stored.selection && typeof stored.selection === 'object') selection = stored.selection;
      if (stored && Array.isArray(stored.skipped)) skipped = new Set(stored.skipped);
    } catch (_) {
      selection = {};
      skipped = new Set();
    }
  }

  function saveLocalDraft(message = 'Rascunho salvo neste dispositivo.') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selection, skipped: [...skipped], savedAt: new Date().toISOString() }));
      refs.saveStatus.textContent = message;
    } catch (_) {
      refs.saveStatus.textContent = 'Não foi possível salvar neste dispositivo.';
    }
  }

  function renderStageRail(activeIndex, isSummary = false) {
    refs.stageRail.innerHTML = stages.map((stage, index) => {
      const choice = selectedChoice(stage);
      const state = choice ? 'is-selected' : skipped.has(stage.id) ? 'is-skipped' : '';
      return `<button class="lab-stage-step ${state} ${!isSummary && index === activeIndex ? 'is-active' : ''}" type="button" data-stage-jump="${index}" aria-label="Abrir ${stage.label}">
        <span class="lab-stage-step-number">${String(index + 1).padStart(2, '0')}</span>
        <span class="lab-stage-step-copy"><strong>${stage.shortLabel}</strong><small>${choice ? 'Equipado' : skipped.has(stage.id) ? 'Em aberto' : 'Aguardando'}</small></span>
      </button>`;
    }).join('') + `<button class="lab-stage-step lab-stage-summary ${isSummary ? 'is-active' : ''}" type="button" data-stage-summary aria-label="Abrir resumo">
      <span class="lab-stage-step-number">09</span><span class="lab-stage-step-copy"><strong>Resumo</strong><small>${isSummary ? 'Revisão' : 'Final'}</small></span>
    </button>`;
  }

  function renderStage(stageIndex) {
    const stage = stages[stageIndex];
    if (!stage) return;
    const choice = selectedChoice(stage);
    refs.choicePanelTitle.textContent = stage.label;
    refs.choicePanelIndex.textContent = `[ ${String(stageIndex + 1).padStart(2, '0')}/08 ]`;
    refs.choicePanelHint.textContent = 'Escolha uma opção para equipar este ponto do operador.';
    refs.choicePanelInstruction.textContent = stage.description;
    refs.choicePanelState.textContent = choice ? 'EQUIPADO' : skipped.has(stage.id) ? 'EM ABERTO' : 'ESCANEANDO';
    refs.choicePanelState.classList.toggle('is-complete', Boolean(choice));
    refs.choicePanelState.classList.toggle('is-skipped', skipped.has(stage.id) && !choice);
    refs.choiceList.innerHTML = stage.choices.map((item) => `
      <button class="lab-choice ${selection[stage.id] === item.id ? 'is-selected' : ''}" type="button" data-choice-id="${item.id}" aria-pressed="${selection[stage.id] === item.id}">
        <span class="lab-choice-mark" aria-hidden="true">${selection[stage.id] === item.id ? '✓' : '+'}</span>
        <span class="lab-choice-copy"><strong>${item.name}</strong><small>${item.brand} · ${item.meta}</small></span>
        <span class="lab-choice-price">${item.price ? formatMoney(item.price) : 'A definir'}</span>
        <span class="lab-choice-badge">${item.badge}</span>
      </button>`).join('');
    refs.stageSkip.textContent = skipped.has(stage.id) ? 'Reabrir peça →' : 'Pular peça →';
    refs.stageSkipStatus.textContent = skipped.has(stage.id) ? 'Esta etapa ficou em aberto.' : '';
  }

  function renderSummary() {
    refs.summaryList.innerHTML = stages.map((stage, index) => {
      const choice = selectedChoice(stage);
      const label = choice ? choice.name : skipped.has(stage.id) ? 'Em aberto' : 'Não definido';
      const value = choice?.price ? formatMoney(choice.price) : '—';
      return `<button class="lab-summary-row ${choice ? 'is-selected' : ''}" type="button" data-stage-jump="${index}">
        <span class="lab-summary-index">${String(index + 1).padStart(2, '0')}</span><span><strong>${stage.label}</strong><small>${label}</small></span><b>${value}</b><i aria-hidden="true">↗</i>
      </button>`;
    }).join('');
    refs.summaryTotal.textContent = formatMoney(totalValue());
  }

  function updateStatus() {
    const count = stages.filter((stage) => Boolean(selectedChoice(stage))).length;
    refs.total.textContent = formatMoney(totalValue());
    refs.summaryTotal.textContent = formatMoney(totalValue());
    refs.selectionCount.textContent = `${count} ${count === 1 ? 'peça equipada' : 'peças equipadas'}`;
  }

  function setStage(stageIndex) {
    if (currentStage === stageIndex) {
      renderStageRail(stageIndex);
      return;
    }
    currentStage = stageIndex;
    renderStage(stageIndex);
    renderStageRail(stageIndex);
    refs.videoStage.classList.remove('is-scanning');
    window.requestAnimationFrame(() => refs.videoStage.classList.add('is-scanning'));
  }

  function updateHud(stage, stageProgress) {
    const points = stage.polygon.map(([x, y]) => `${x},${y}`).join(' ');
    refs.hotspotPolygon.setAttribute('points', points);
    refs.hotspotIndex.textContent = `[ ${String(stages.indexOf(stage) + 1).padStart(2, '0')}/08 ]`;
    refs.hotspotName.textContent = stage.label.toUpperCase();
    const locked = stageProgress > 0.23;
    refs.hotspotState.textContent = locked ? 'PONTO IDENTIFICADO' : 'PEÇA ESCANEANDO...';
    refs.hotspotState.classList.toggle('is-locked', locked);
    refs.hotspotScan.setAttribute('x1', String(stage.polygon[0][0]));
    refs.hotspotScan.setAttribute('x2', String(stage.polygon[1][0]));
    refs.hotspotScan.setAttribute('y1', String(stage.polygon[0][1]));
    refs.hotspotScan.setAttribute('y2', String(stage.polygon[1][1]));
    refs.hotspotLabel.style.left = `${clamp(stage.focus[0], 12, 85)}%`;
    refs.hotspotLabel.style.top = `${clamp(stage.focus[1], 10, 86)}%`;

    const startX = stage.focus[0];
    const startY = stage.focus[1];
    const endX = 94;
    const endY = 52;
    const elbowX = Math.min(startX + 15, 82);
    refs.calloutPath.setAttribute('d', `M ${startX} ${startY} L ${elbowX} ${startY} L ${elbowX} ${endY} L ${endX} ${endY}`);
    refs.calloutTarget.setAttribute('cx', startX);
    refs.calloutTarget.setAttribute('cy', startY);
    refs.calloutEnd.setAttribute('cx', endX);
    refs.calloutEnd.setAttribute('cy', endY);
  }

  function progressFromScroll() {
    const maxScroll = Math.max(1, refs.story.offsetHeight - window.innerHeight);
    return clamp((window.scrollY - refs.story.offsetTop) / maxScroll);
  }

  function applyProgress(progress) {
    currentProgress = clamp(progress);
    const inSummary = currentProgress >= summaryStart;
    refs.interface.style.setProperty('--ui-opacity', String(clamp((currentProgress - 0.02) / 0.12)));
    refs.labCopy.style.setProperty('--copy-opacity', String(1 - clamp(currentProgress / 0.16)));
    refs.videoLock.style.setProperty('--lock-opacity', String(clamp((currentProgress - 0.78) / 0.13)));
    const activeNumber = Math.min(8, Math.floor(Math.max(0, (currentProgress - chapterStart) / ((chapterEnd - chapterStart) / 8))) + 1);
    refs.statusLabel.textContent = inSummary ? 'LOADOUT FINAL / 08' : `LOADOUT ${String(activeNumber).padStart(2, '0')} / 08`;

    if (inSummary) {
      refs.missionKicker.textContent = 'LOADOUT LAB / FINAL';
      refs.missionTitle.innerHTML = 'REVISE O<br /><em>LOADOUT.</em>';
      refs.missionDescription.textContent = 'Confira as escolhas demonstrativas antes de conectar o laboratório ao catálogo real.';
      refs.choicePanel.hidden = true;
      refs.summaryPanel.hidden = false;
      renderSummary();
      renderStageRail(-1, true);
    } else {
      refs.choicePanel.hidden = false;
      refs.summaryPanel.hidden = true;
      const normalized = clamp((currentProgress - chapterStart) / (chapterEnd - chapterStart));
      const rawIndex = normalized * stages.length;
      const stageIndex = Math.min(stages.length - 1, Math.floor(rawIndex));
      const stageProgress = clamp(rawIndex - stageIndex);
      refs.missionKicker.textContent = stages[stageIndex].kicker;
      refs.missionTitle.innerHTML = 'ESCANEIE O<br /><em>OPERADOR.</em>';
      refs.missionDescription.textContent = stages[stageIndex].description;
      setStage(stageIndex);
      updateHud(stages[stageIndex], stageProgress);
      refs.choicePanel.style.setProperty('--panel-progress', String(stageProgress));
      refs.choicePanel.classList.toggle('is-ready', stageProgress > 0.14);
    }

    if (videoReady && !reducedMotion) {
      const motionProgress = clamp(currentProgress / 0.94);
      const target = videoDuration * motionProgress;
      if (Number.isFinite(target) && Math.abs(refs.video.currentTime - target) > 0.035) refs.video.currentTime = target;
    }
  }

  function requestProgressUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(() => {
      framePending = false;
      applyProgress(progressFromScroll());
    });
  }

  function scrollToProgress(progress) {
    const maxScroll = Math.max(1, refs.story.offsetHeight - window.innerHeight);
    window.scrollTo({ top: refs.story.offsetTop + (maxScroll * clamp(progress)), behavior: 'auto' });
  }

  function handleChoice(choiceId) {
    const stage = stages[currentStage];
    if (!stage || !stage.choices.some((choice) => choice.id === choiceId)) return;
    selection[stage.id] = choiceId;
    skipped.delete(stage.id);
    renderStage(stage === stages[currentStage] ? currentStage : 0);
    renderStageRail(currentStage);
    updateStatus();
    saveLocalDraft('Escolha registrada neste dispositivo.');
    if (navigator.vibrate) navigator.vibrate(10);
  }

  function handleSkip() {
    const stage = stages[currentStage];
    if (!stage) return;
    if (skipped.has(stage.id)) skipped.delete(stage.id);
    else {
      skipped.add(stage.id);
      delete selection[stage.id];
    }
    renderStage(currentStage);
    renderStageRail(currentStage);
    updateStatus();
    saveLocalDraft(skipped.has(stage.id) ? 'Etapa deixada em aberto.' : 'Etapa reaberta.');
  }

  function setupEvents() {
    refs.choiceList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-choice-id]');
      if (button) handleChoice(button.dataset.choiceId);
    });
    refs.stageSkip.addEventListener('click', handleSkip);
    refs.stageRail.addEventListener('click', (event) => {
      const summaryButton = event.target.closest('[data-stage-summary]');
      if (summaryButton) return scrollToProgress(0.95);
      const stageButton = event.target.closest('[data-stage-jump]');
      if (!stageButton) return;
      const index = Number(stageButton.dataset.stageJump);
      scrollToProgress(chapterStart + ((chapterEnd - chapterStart) * ((index + 0.36) / stages.length)));
    });
    refs.summaryList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-stage-jump]');
      if (button) scrollToProgress(chapterStart + ((chapterEnd - chapterStart) * ((Number(button.dataset.stageJump) + 0.36) / stages.length)));
    });
    refs.saveLoadout.addEventListener('click', () => saveLocalDraft('Configuração salva localmente.'));
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);
  }

  function setupVideo() {
    const source = refs.video.dataset.labVideoSrc;
    if (!source || reducedMotion) return;
    refs.video.src = source;
    refs.video.addEventListener('loadedmetadata', () => {
      videoDuration = refs.video.duration || 0;
      videoReady = videoDuration > 0;
      refs.poster.classList.add('is-loaded');
      requestProgressUpdate();
    }, { once: true });
    refs.video.addEventListener('error', () => {
      refs.videoStage.classList.add('has-video-error');
    }, { once: true });
    refs.video.load();
  }

  function setupLenis() {
    if (reducedMotion || typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', requestProgressUpdate);
    const raf = (time) => {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    };
    window.requestAnimationFrame(raf);
  }

  function init() {
    loadLocalDraft();
    renderStageRail(0);
    renderStage(0);
    renderSummary();
    updateStatus();
    setupEvents();
    setupVideo();
    refs.interface.setAttribute('aria-hidden', 'false');
    applyProgress(progressFromScroll());
  }

  init();
})();
