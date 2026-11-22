/* Saaib portfolio - cat sprite and cursor-following cat renderer
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const PAL = { o: "#f0903a", d: "#b5551c", e: "#e8648a", c: "#ffe8c0" };
const sprite = (rows, w) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = rows.length;
  const x = c.getContext("2d");
  rows.forEach((r, j) =>
    [...r.padEnd(w, ".")].forEach((ch, i) => {
      if (PAL[ch]) {
        x.fillStyle = PAL[ch];
        x.fillRect(i, j, 1, 1);
      }
    }),
  );
  return c;
};
const SP = {
  cat: sprite(
    [
      ".........o......",
      "........oeo.....",
      "........ooooooo.",
      ".......ooooooooo",
      ".......ooooooooe",
      ".......oooooocc.",
      "......ooooooocc.",
      ".....ooooooooccc",
      "....dooodooooccc",
      "....ooooooooocc.",
      "...dooodooooocc.",
      "...ooooooooooc..",
      "..doooodoooooc..",
      "..oooooooooooc..",
      "..oooooooooooc..",
      ".ooooooooooocc..",
      ".oooooooooocccc.",
      ".dddddddddcccc..",
    ],
    16,
  ),
};

function hero(t, cx = CX, cb = CB) {
  const br = reduce ? 0 : Math.sin(t * 1.7) > 0 ? 0 : 1,
    cy = cb - 18,
    fc = S.face,
    tw = !reduce && t % 6 < 0.18 ? 1 : 0,
    sw = reduce ? 0 : Math.round(Math.sin(t * 1.8) * 1.5);
  S.hc = cx + 8;
  const dx = (S.sx - S.hc) * fc,
    dy = S.sy - (cy + 4),
    ex = dx > 30 ? 1 : 0,
    ey = dy < -25 ? -1 : dy > 40 ? 1 : 0,
    hx = dx > 60 ? 1 : 0,
    hy = dy < -30 ? -1 : 0;
  ctx.save();
  if (fc < 0) {
    ctx.translate(cx * 2 + 16, 0);
    ctx.scale(-1, 1);
  }
  R("#f0903a", cx - 1, cy + 16, 2, 2);
  R("#f0903a", cx - 2, cy + 13, 2, 3);
  R("#f0903a", cx - 2 + sw, cy + 10, 2, 3);
  R("#b5551c", cx - 2 + sw, cy + 9, 2, 2);
  ctx.drawImage(SP.cat, 0, 6, 16, 12, cx, cy + 6, 16, 12);
  ctx.drawImage(SP.cat, 0, 0, 16, 7, cx + hx, cy + br + hy, 16, 7);
  R("#f0903a", cx + 13 + hx, cy + tw + br + hy);
  R("#f0903a", cx + 12 + hx, cy + 1 + tw + br + hy, 3, 1);
  if (!tw) R("#e8648a", cx + 13 + hx, cy + 1 + br + hy);
  if (reduce || (t + 1.7) % 5.1 > 0.16) {
    R("#59d3c3", cx + 12 + ex + hx, cy + 3 + ey + br + hy, 2, 1);
    R("#1b1038", cx + 13 + ex + hx, cy + 3 + ey + br + hy);
  }
  R("#fff1d6", cx + 16 + hx, cy + 5 + br + hy, 2, 1);
  R("#fff1d6", cx + 16 + hx, cy + 6 + br + hy, 2, 1);
  ctx.restore();
}
