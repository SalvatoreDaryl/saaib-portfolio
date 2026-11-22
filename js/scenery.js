/* Saaib portfolio - animated clouds and pine trees
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

function cloud(c) {
  const { x, y, w, p } = c;
  R(p[0], x + w * 0.25, y, w * 0.45, 2);
  R(p[1], x, y + 2, w, 2);
  R(p[1], x + w * 0.1, y + 1, w * 0.25, 1);
  R(p[2], x + 3, y + 4, w - 8, 1);
  R(p[2], x + w * 0.55, y + 3, w * 0.3, 1);
}
function pine(tr, t) {
  const { x, b, h, w, ph, c, dir } = tr,
    th = h / 3,
    sa = reduce ? 0 : 1;
  for (let k = 0; k < h; k++) {
    const ti = Math.floor(k / th),
      kk = k - ti * th,
      hw = Math.max(
        1,
        Math.round(((((ti + 1) / 3) * w) / 2) * (0.35 + (0.65 * kk) / th)),
      ),
      sw = Math.round(Math.sin(t * 1.3 + ph) * 1.4 * (1 - k / h) * sa),
      y = b - h + k;
    R(c, x - hw + sw, y, hw * 2 + 1, 1);
    R("#8a3f7c", x + dir * hw + sw, y);
  }
  R(c, x - 1, b, 2, 3);
}
