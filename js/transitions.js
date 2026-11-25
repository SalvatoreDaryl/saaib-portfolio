/* Saaib portfolio - iris wipe and scene transitions
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

function cabinShelfPos() {
  const r = cv.getBoundingClientRect(),
    s = Math.max(r.width / W, r.height / H);
  return [
    r.left + (r.width - W * s) * op + 36 * s,
    r.top + (r.height - H * s) * 0.88 + 76 * s,
  ];
}
function heroPos() {
  const r = cv.getBoundingClientRect(),
    s = Math.max(r.width / W, r.height / H);
  return [
    r.left + (r.width - W * s) * op + CBX * s,
    r.top + (r.height - H * s) * 0.88 + 138 * s,
  ];
}
function iris(close, cb, pos) {
  if (reduce) {
    cb();
    return;
  }
  const el = $("#iris"),
    p0 = pos || heroPos(),
    R0 = Math.max(
      ...[
        [0, 0],
        [innerWidth, 0],
        [0, innerHeight],
        [innerWidth, innerHeight],
      ].map((c) => Math.hypot(c[0] - p0[0], c[1] - p0[1])),
    ),
    s = performance.now();
  el.style.display = "block";
  el.style.setProperty("--x", p0[0] + "px");
  el.style.setProperty("--y", p0[1] + "px");
  (function step(n) {
    let p = Math.min(1, (n - s) / 650);
    p = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    el.style.setProperty(
      "--r",
      Math.round((close ? R0 * (1 - p) : R0 * p) / 12) * 12 + "px",
    );
    if (p < 1) requestAnimationFrame(step);
    else {
      if (!close) el.style.display = "none";
      cb();
    }
  })(s);
}
function run(fn, pos) {
  iris(
    true,
    () => {
      fn();
      iris(
        false,
        () => {
          busy = false;
          body.classList.remove("leaving");
        },
        pos,
      );
    },
    pos,
  );
}
function switchSectionWithIris(k) {
  if (busy || view !== "hub" || cur === k) return;
  busy = true;
  run(() => openSection(k), cabinShelfPos());
}
function go(k) {
  if (busy || view !== "title") return;
  busy = true;
  body.classList.add("leaving");
  dT = 1;
  if (reduce) {
    dOpen = 1;
    run(() => enter(k));
  } else setTimeout(() => run(() => enter(k)), 750);
}
function toTitle() {
  if (busy || view !== "hub") return;
  busy = true;
  body.classList.add("leaving");
  run(leave);
}
