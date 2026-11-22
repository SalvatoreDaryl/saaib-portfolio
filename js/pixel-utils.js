/* Saaib portfolio - canvas setup, constants and pixel drawing helpers
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const W = 320,
  H = 180,
  P = 16,
  Q = 6,
  LW = W + 2 * P,
  LH = H + 2 * Q,
  HOR = 112,
  SUNX = 132,
  SUNY = 100,
  CX = 146,
  CB = 146,
  CBX = 205;
const cv = $("#c"),
  ctx = cv.getContext("2d");
cv.width = W;
cv.height = H;
let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const mk = () => {
  const c = document.createElement("canvas");
  c.width = LW;
  c.height = LH;
  const x = c.getContext("2d");
  x.translate(P, Q);
  return [c, x];
};
const R = (c, a, b, w = 1, h = 1) => {
  ctx.fillStyle = c;
  ctx.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h));
};
const disc = (cx, cy, r, c, al, x = ctx) => {
  x.globalAlpha = al;
  x.fillStyle = c;
  for (let j = -r; j <= r; j++) {
    const w = Math.floor(Math.sqrt(r * r - j * j));
    x.fillRect(Math.round(cx - w), Math.round(cy + j), w * 2 + 1, 1);
  }
  x.globalAlpha = 1;
};
function grad(x, y0, y1, cols, pw = 1) {
  const id = x.createImageData(LW, LH),
    d = id.data,
    C = cols.map(rgb),
    n = C.length - 1;
  for (let j = 0; j < LH; j++) {
    const y = j - Q;
    if (y < y0 || y > y1) continue;
    const v = Math.pow((y - y0) / (y1 - y0), pw) * n;
    for (let i = 0; i < LW; i++) {
      let k = Math.floor(v);
      if (v - k > (B4[(j & 3) * 4 + (i & 3)] + 0.5) / 16) k++;
      const c = C[Math.min(k, n)],
        o = (j * LW + i) * 4;
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = 255;
    }
  }
  x.putImageData(id, 0, 0);
}
function mtn(base, amp, f, col, hi, sd, vs, haze) {
  const [c, x] = mk();
  for (let i = -P; i < W + P; i++) {
    const n =
        Math.sin(i * f + sd) * 0.5 +
        Math.sin(i * f * 2.3 + sd * 2) * 0.3 +
        Math.sin(i * f * 5.1 + sd * 3) * 0.12,
      v = 1 - vs * Math.exp(-(((i - SUNX) / 45) ** 2));
    const top = Math.min(
      base - 2,
      Math.round(base - amp * (0.55 + n * 0.7) * v),
    );
    x.fillStyle = col;
    x.fillRect(i, top, 1, H + Q - top);
    x.fillStyle = hi;
    x.fillRect(i, top, 1, 1);
    if ((i + top) % 2 == 0) x.fillRect(i, top + 1, 1, 1);
  }
  if (haze) {
    x.globalAlpha = 0.3;
    x.fillStyle = "#f27f5a";
    x.fillRect(-P, base - 9, LW, 10);
    x.globalAlpha = 1;
  }
  return c;
}
