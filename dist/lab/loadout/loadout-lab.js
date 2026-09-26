(() => {
  const story = document.querySelector("[data-lab-story]");
  const scene = document.querySelector("[data-lab-scene]");
  const copy = document.querySelector("[data-lab-copy]");
  const cue = document.querySelector("[data-scroll-cue]");
  if (!story || !scene || !copy || !cue) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (value) => value * value * (3 - 2 * value);
  const range = (value, start, end) => clamp((value - start) / (end - start));

  function update() {
    frame = 0;
    const travel = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = reducedMotion ? .12 : clamp(-story.getBoundingClientRect().top / travel);
    const approach = ease(range(progress, .04, .82));
    const rifleFocus = ease(range(progress, .31, .88));
    const copyExit = ease(range(progress, .08, .34));
    const cueExit = ease(range(progress, .02, .16));
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const factor = isMobile ? .68 : 1;

    scene.style.setProperty("--camera-scale", (1 + approach * .18).toFixed(4));
    scene.style.setProperty("--camera-x", `${(-approach * 18 * factor).toFixed(2)}px`);
    scene.style.setProperty("--camera-y", `${(-approach * 8 * factor).toFixed(2)}px`);
    scene.style.setProperty("--rifle-opacity", (rifleFocus * .82).toFixed(4));
    scene.style.setProperty("--rifle-scale", (.93 + rifleFocus * .17).toFixed(4));
    scene.style.setProperty("--rifle-x", `${(rifleFocus * 13 * factor).toFixed(2)}px`);
    scene.style.setProperty("--rifle-y", `${(-rifleFocus * 7 * factor).toFixed(2)}px`);
    scene.style.setProperty("--rifle-blur", `${((1 - rifleFocus) * 3).toFixed(2)}px`);
    scene.style.setProperty("--atmosphere-opacity", (1 - approach * .16).toFixed(4));
    scene.style.setProperty("--light-opacity", (.5 + approach * .16).toFixed(4));
    copy.style.setProperty("--copy-opacity", (1 - copyExit).toFixed(4));
    copy.style.setProperty("--copy-y", `${(-copyExit * 22).toFixed(2)}px`);
    cue.style.setProperty("--cue-opacity", (1 - cueExit).toFixed(4));
  }

  function requestUpdate() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  update();
})();
