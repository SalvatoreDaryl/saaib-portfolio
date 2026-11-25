/* Saaib portfolio - cabin interior room and its renderer
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

/* ===== cabin (interior) ===== */
(() => {
  const [c, x] = mk(),
    f = (col, a, b, w, h) => {
      x.fillStyle = col;
      x.fillRect(a, b, w, h);
    };
  for (let y = -Q; y < 132; y += 8) {
    f(((y / 8) | 0) % 2 ? "#58301f" : "#4c2819", -P, y, LW, 8);
    f("#6b3d28", -P, y, LW, 1);
    f("#2e170e", -P, y + 7, LW, 1);
  }
  for (let n = 0; n < 40; n++)
    f("#2e170e", Math.floor(rnd() * W), Math.floor(rnd() * 124), 2, 1);
  f("#2a140f", -P, -Q, LW, 18);
  f("#4a2618", -P, 10, LW, 2);
  for (let y = 132; y < H + Q; y += 6) {
    f(((y / 6) | 0) % 2 ? "#3a2014" : "#32190f", -P, y, LW, 6);
    f("#22100a", -P, y, LW, 1);
  }
  x.clearRect(76, 34, 64, 62);
  f("#2a140f", 72, 30, 72, 4);
  f("#2a140f", 72, 30, 4, 70);
  f("#2a140f", 140, 30, 4, 70);
  f("#6b3d28", 70, 96, 76, 5);
  f("#2a140f", 70, 101, 76, 1);
  f("#2a140f", 106, 34, 3, 62);
  f("#2a140f", 76, 63, 64, 3);
  f("#5a4a6a", 158, 56, 60, 76);
  f("#5a4a6a", 170, 8, 36, 50);
  for (let y = 10; y < 132; y += 6) {
    const a = y < 56 ? 170 : 158,
      w = y < 56 ? 36 : 60;
    f("#3a2f4a", a, y, w, 1);
    for (let i = ((y / 6) | 0) % 2 ? 3 : 9; i < w; i += 12)
      f("#3a2f4a", a + i, y, 1, 6);
  }
  f("#3a2014", 152, 52, 72, 6);
  f("#6b3d28", 152, 52, 72, 1);
  f("#0e0610", 172, 92, 32, 40);
  f("#1a0c18", 172, 92, 32, 3);
  f("#7a6a8a", 148, 130, 80, 4);
  f("#4a3a5a", 148, 134, 80, 1);
  f("#8f2a3a", 100, 148, 126, 26);
  f("#d9453b", 104, 151, 118, 1);
  f("#d9453b", 104, 170, 118, 1);
  f("#ffd27a", 110, 154, 106, 1);
  f("#ffd27a", 110, 166, 106, 1);
  f("#2a140f", 6, 20, 3, 112);
  f("#2a140f", 63, 20, 3, 112);
  f("#1f1118", 9, 22, 54, 104);
  [58, 92, 126].forEach((sy) => {
    f("#3a2014", 8, sy, 56, 3);
    f("#58301f", 9, sy, 54, 1);
  });
  L.in = c;
})();
const MOTES = Array.from({ length: 16 }, () => ({
  x: 80 + rnd() * 60,
  y: 36 + rnd() * 58,
  p: rnd() * 6,
}));
function drawIn(t, dt) {
  ctx.clearRect(0, 0, W, H);
  CL.forEach((c) => {
    if (dt && (c.x += c.s * dt) > W + 70) c.x = -90;
  });
  const o = off(5);
  ctx.save();
  ctx.beginPath();
  ctx.rect(o[0] + 76, o[1] + 34, 64, 62);
  ctx.clip();
  ctx.translate(-24, -40);
  lay(L.sky, 2);
  grp(3, () => CL.forEach(cloud));
  lay(L.far, 4);
  lay(L.mid, 6);
  lay(L.water, 8);
  lay(L.bank, 10);
  grp(10, () => trees.forEach((tr) => pine(tr, t)));
  ctx.restore();
  lay(L.in, 5);
  grp(5, () => {
    const fl = reduce ? 0 : Math.sin(t * 9) + Math.sin(t * 17);
    disc(188, 112, 70, "#ff9a4a", 0.04);
    disc(188, 116, 44 + fl, "#ff9a4a", 0.05);
    disc(188, 122, 24 + fl * 0.6, "#ffd27a", 0.07);
    R("#4a2618", 176, 126, 24, 4);
    for (let n = 0; n < 5; n++) {
      const h =
        9 +
        (n == 2 ? 6 : 0) +
        Math.round((reduce ? 0 : Math.sin(t * 9 + n * 2)) * 3);
      R("#e8642a", 176 + n * 5, 127 - h, 5, h);
      R("#ffb066", 177 + n * 5, 127 - h + 4, 3, h - 4);
      if (n == 2) R("#fff2b0", 178 + n * 5, 122, 1, 4);
    }
    hero(t, 124, 160);
    if (typeof drawBookshelf === "function") drawBookshelf(t, dt);
    if (!reduce) {
      MOTES.forEach((m) => {
        ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t + m.p);
        R(
          "#ffe6a0",
          m.x + Math.sin(t * 0.4 + m.p) * 6,
          m.y + Math.cos(t * 0.3 + m.p) * 5,
        );
        ctx.globalAlpha = 1;
      });
      for (let n = 0; n < 5; n++) {
        const p = (t * 0.5 + n / 5) % 1;
        ctx.globalAlpha = 1 - p;
        R("#ffb066", 190 + Math.sin(t * 3 + n * 2) * 4 * p, 120 - p * 40);
        ctx.globalAlpha = 1;
      }
    }
  });
}
