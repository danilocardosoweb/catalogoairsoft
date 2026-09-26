(() => {
  const story = document.querySelector("[data-lab-story]");
  const sticky = story?.querySelector(".lab-story-sticky");
  const video = document.querySelector("[data-lab-video]");
  const copy = document.querySelector("[data-lab-copy]");
  const debugPanel = document.querySelector("[data-lab-debug]");
  if (!story || !sticky || !video || !copy) return;

  const DEBUG = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const debug = {
    progress: debugPanel?.querySelector("[data-debug-progress]"),
    duration: debugPanel?.querySelector("[data-debug-duration]"),
    target: debugPanel?.querySelector("[data-debug-target]"),
    current: debugPanel?.querySelector("[data-debug-current]"),
    fps: debugPanel?.querySelector("[data-debug-fps]")
  };

  let duration = 0;
  let targetTime = 0;
  let renderedTime = 0;
  let scrollFrame = 0;
  let scrubFrame = 0;
  let previousPaint = performance.now();
  let measuredFps = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  function getProgress() {
    const travel = Math.max(1, story.offsetHeight - sticky.clientHeight);
    return clamp(-story.getBoundingClientRect().top / travel);
  }

  function updateDebug(progress) {
    if (!DEBUG || !debugPanel) return;
    debug.progress.textContent = progress.toFixed(2);
    debug.duration.textContent = duration ? `${duration.toFixed(2)}s` : "—";
    debug.target.textContent = targetTime.toFixed(2);
    debug.current.textContent = renderedTime.toFixed(2);
    debug.fps.textContent = measuredFps ? `${measuredFps}` : "—";
  }

  function paintVideo() {
    scrubFrame = 0;
    if (!duration || video.readyState < 1) return;

    if (reducedMotion) {
      renderedTime = 0;
      targetTime = 0;
    } else {
      const difference = targetTime - renderedTime;
      renderedTime += difference * 0.16;
      if (Math.abs(difference) < 0.012) renderedTime = targetTime;
    }

    const nextTime = clamp(renderedTime, 0, Math.max(0, duration - 0.001));
    if (Math.abs(video.currentTime - nextTime) > 0.006) video.currentTime = nextTime;

    const now = performance.now();
    const delta = now - previousPaint;
    if (delta > 0) measuredFps = Math.round(1000 / delta);
    previousPaint = now;
    updateDebug(getProgress());

    if (!reducedMotion && Math.abs(targetTime - renderedTime) > 0.012) scrubFrame = window.requestAnimationFrame(paintVideo);
  }

  function updateTarget() {
    scrollFrame = 0;
    const progress = getProgress();
    targetTime = reducedMotion ? 0 : progress * duration;
    const copyExit = clamp(progress / 0.12);
    copy.style.setProperty("--copy-opacity", (1 - copyExit).toFixed(4));
    copy.style.setProperty("--copy-y", `${(-copyExit * 18).toFixed(2)}px`);
    updateDebug(progress);
    if (!scrubFrame) scrubFrame = window.requestAnimationFrame(paintVideo);
  }

  function requestUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateTarget);
  }

  function markReady() {
    sticky.classList.add("is-video-ready");
  }

  function prepareVideo() {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    duration = video.duration;
    video.currentTime = 0;
    renderedTime = 0;
    targetTime = reducedMotion ? 0 : getProgress() * duration;
    markReady();
    updateDebug(getProgress());
    requestUpdate();
  }

  if (DEBUG && debugPanel) debugPanel.hidden = false;
  video.addEventListener("loadedmetadata", prepareVideo, { once: true });
  video.addEventListener("loadeddata", markReady, { once: true });
  video.addEventListener("error", () => sticky.classList.add("is-video-error"), { once: true });
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  if (video.readyState >= 1) prepareVideo();
  requestUpdate();
})();
