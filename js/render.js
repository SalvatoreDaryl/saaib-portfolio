/* Saaib portfolio - exterior renderer, frame loop and startup paint
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const paint = (t, dt) =>
  typeof view !== "undefined" && view === "hub"
    ? typeof cur !== "undefined" && cur === "projects" && typeof drawShelfScene === "function"
      ? drawShelfScene(t, dt)
      : drawIn(t, dt)
    : draw(t, dt);
let last = 0;
function draw(t, dt) {
  ctx.clearRect(0, 0, W, H);
  lay(L.sky, 2);
  grp(2, () => {
    STARS.forEach((s) => {
      if (Math.sin(t * 1.7 + s.p) > -0.35) {
        R("#fff1d6", s.x, s.y);
        if (s.b) {
          R("#fff1d6", s.x - 1, s.y);
          R("#fff1d6", s.x + 1, s.y);
          R("#fff1d6", s.x, s.y - 1);
          R("#fff1d6", s.x, s.y + 1);
        }
      }
    });
    const sp = ((t + 4) % 13) / 0.9;
    if (sp < 1 && !reduce) {
      for (let k = 0; k < 7; k++) {
        ctx.globalAlpha = 1 - k / 7;
        R("#fff1d6", 255 - sp * 120 + k * 2, 8 + sp * 50 - k);
      }
      ctx.globalAlpha = 1;
    }
    const pu = Math.sin(t * 0.9);
    disc(SUNX, SUNY, 40, "#ffd27a", 0.06 + 0.03 * pu);
    disc(SUNX, SUNY, 54, "#ff9a6a", 0.04 + 0.02 * pu);
  });
  CL.forEach((c) => {
    if (dt && (c.x += c.s * dt) > W + 70) c.x = -90;
  });
  grp(3, () => CL.filter((c) => !c.n).forEach(cloud));
  lay(L.far, 4);
  grp(6, () => CL.filter((c) => c.n).forEach(cloud));
  lay(L.mid, 6);
  lay(L.water, 8);
  grp(8, () => {
    for (let n = 0; n < 30; n++) {
      if (Math.sin(t * 2 + n * 5) < -0.2) continue;
      const y = 116 + n * 1.4,
        w = 2 + (n % 3) * 2 + n * 0.3;
      ctx.globalAlpha = 0.85 - n * 0.02;
      R(
        "#ffe6a0",
        SUNX + Math.sin(t * 1.1 + n * 1.7) * (4 + n * 0.9) - w / 2,
        y,
        w,
        1,
      );
    }
    ctx.globalAlpha = 1;
  });
  lay(L.bank, 10);
  grp(10, () => trees.forEach((tr) => pine(tr, t)));
  lay(L.fg, 15);
  grp(15, () => {
    cabin(t);
    deck(t);

    BLADES.forEach((b) => {
      const g = gt(b.x);
      for (let k = 0; k < b.h; k++)
        R(
          b.c,
          b.x +
            Math.round(
              (((reduce ? 0 : Math.sin(t * 1.7 + b.x * 0.25 + b.ph)) * k) /
                b.h) *
                1.6,
            ),
          g - 1 - k,
        );
    });
    hero(t);
    fishing(t);

    FLY.forEach((f) => {
      const a = Math.max(0, Math.sin(t * 1.8 + f.p * 3));
      if (a < 0.15) return;
      const x = f.x + Math.sin(t * 0.5 + f.p) * 10,
        y = f.y + Math.cos(t * 0.7 + f.p * 1.3) * 6;
      ctx.globalAlpha = a * 0.25;
      R("#ffe27a", x - 1, y - 1, 3, 3);
      ctx.globalAlpha = 1;
      R("#fff6b0", x, y);
    });
  });
}
function loop(ms) {
  const t = ms / 1000,
    dt = Math.min(0.05, t - last);
  last = t;
  dOpen += (dT - dOpen) * 0.14;
  if (S.sx < S.hc - 6) S.face = -1;
  else if (S.sx > S.hc + 6) S.face = 1;
  paint(t, dt);
  requestAnimationFrame(loop);
}
if (reduce) draw(3, 0);
else requestAnimationFrame(loop);
