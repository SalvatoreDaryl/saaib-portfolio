/* Saaib portfolio - exterior cabin, fishing deck and fishing rod
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

/* ===== cabin (exterior) ===== */
let dOpen = 0,
  dT = 0;
function cabin(t) {
  const fl = reduce ? 0 : Math.sin(t * 13) * 0.5 + Math.sin(t * 21) * 0.5,
    wc = fl > 0 ? "#ffd27a" : "#ffb066",
    o = dOpen,
    X = CBX;
  for (let k = 0; k < 26; k++) {
    const hw = Math.round(3 + k * 1.1),
      y = 90 + k;
    R("#3a1f4a", X - hw, y, hw * 2 + 1, 1);
    R("#a33b78", X - hw, y);
    R("#a33b78", X + hw, y);
    if (k % 5 == 4) R("#2a1238", X - hw + 1, y, hw * 2 - 1, 1);
  }
  R("#a33b78", X - 1, 88, 3, 2);
  R("#4a3a5a", X + 14, 83, 7, 31);
  R("#6a5a7a", X + 14, 83, 7, 2);
  for (let y = 116; y < 148; y += 4) {
    const h = Math.min(4, 148 - y);
    R((y / 4) % 2 ? "#6b3a2a" : "#5d3023", X - 24, y, 49, h);
    R("#8a4e34", X - 24, y, 49, 1);
    if (h > 3) R("#3a1a10", X - 24, y + 3, 49, 1);
  }
  R("#2a140f", X - 25, 116, 1, 32);
  R("#2a140f", X + 25, 116, 1, 32);
  [-19, 11].forEach((dx) => {
    R("#2a140f", X + dx, 124, 9, 11);
    R(wc, X + dx + 1, 125, 7, 9);
    R("#2a140f", X + dx + 4, 125, 1, 9);
    R("#2a140f", X + dx + 1, 129, 7, 1);
  });
  R("#2a140f", X - 6, 127, 13, 21);
  R(o > 0.02 ? "#ffd98a" : "#4a2a1e", X - 5, 128, 11, 20);
  if (o < 0.98) {
    const dw = Math.round(11 * (1 - o));
    R("#4a2a1e", X - 5, 128, dw, 20);
    R("#3a1f14", X - 5, 138, dw, 1);
    R("#ffd27a", X - 5 + dw - 3, 139);
  }
  if (o > 0.05) {
    ctx.globalAlpha = 0.3 * o;
    for (let k = 0; k < 9; k++) R("#ffd98a", X - 5 - k, 148 + k, 11 + 2 * k, 1);
    ctx.globalAlpha = 1;
  }
  disc(X - 15, 129, 15 + fl, "#ffb066", 0.07);
  disc(X + 15, 129, 15 + fl, "#ffb066", 0.07);
  disc(X, 140, 22, "#ffb066", 0.05 + 0.05 * o);
  if (!reduce)
    for (let n = 0; n < 7; n++) {
      const p = (t * 0.16 + n / 7) % 1;
      ctx.globalAlpha = (1 - p) * 0.5;
      R(
        "#cdb8e0",
        X + 17 + Math.sin(t * 0.9 + n * 1.7) * 2 + p * 9,
        81 - p * 34,
        2 + p * 5,
        2 + p * 3,
      );
      ctx.globalAlpha = 1;
    }
}
function deck(t) {
  R("#8a5a3a", 126, 146, 56, 2);
  R("#b07a50", 126, 146, 56, 1);
  for (let x = 131; x < 181; x += 6) R("#5a3420", x, 147, 1, 1);
  R("#5a3420", 126, 148, 56, 2);
  [128, 144, 160, 176].forEach((x) => {
    R("#4a2a18", x, 150, 3, 10);
    R("#6b3d28", x, 150, 1, 10);
  });
  R("#6a7a8a", 168, 141, 6, 5);
  R("#8a9aaa", 168, 141, 6, 1);
  R("#59d3c3", 170, 139, 3, 2);
  if (!reduce)
    [129, 145, 161, 177].forEach((x, i) => {
      ctx.globalAlpha = 0.35 + 0.3 * Math.sin(t * 1.6 + i * 1.3);
      R("#ffe6a0", x - 3, 155, 8, 1);
      R("#ffe6a0", x - 5 + (((t * 3 + i) % 2) | 0), 157, 12, 1);
      ctx.globalAlpha = 1;
    });
}
function fishing(t) {
  for (let k = 0; k < 15; k++)
    R(k > 12 ? "#c9a37a" : "#8a5a3a", 132 - k, 146 - k);
  const sw = reduce ? 0 : Math.round(Math.sin(t * 0.7)),
    bb = reduce ? 0 : Math.round(Math.sin(t * 1.9) * 1.4);
  ctx.globalAlpha = 0.8;
  R("#e8e0d0", 118 + sw, 133, 1, 18 + bb);
  ctx.globalAlpha = 1;
  R("#d9453b", 117 + sw, 151 + bb, 3, 1);
  R("#e8e0d0", 117 + sw, 152 + bb, 3, 2);
  ctx.globalAlpha = 0.4 + 0.3 * (reduce ? 0 : Math.sin(t * 2.2));
  R("#ffe6a0", 113 + sw, 155 + bb, 11, 1);
  ctx.globalAlpha = 1;
}
