/* Saaib portfolio - pointer tracking and layer drawing helpers
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const S = { sx: NaN, sy: NaN, face: -1, hc: 0 }; // pointer position in scene px, cat facing (-1 left / 1 right), cat head x
let op = 0.5;
const upd = () => {
  op = (parseFloat(getComputedStyle(cv).objectPosition) || 50) / 100;
};
addEventListener("resize", upd);
upd();
addEventListener(
  "pointermove",
  (e) => {
    const r = cv.getBoundingClientRect(),
      k = Math.max(r.width / W, r.height / H);
    S.sx = (e.clientX - r.left - (r.width - W * k) * op) / k;
    S.sy = (e.clientY - r.top - (r.height - H * k) * 0.88) / k;
  },
  { passive: true },
);
const off = () => [0, 0];
const lay = (img, f) => {
  const o = off(f);
  ctx.drawImage(img, o[0] - P, o[1] - Q);
};
const grp = (f, fn) => {
  const o = off(f);
  ctx.save();
  ctx.translate(o[0], o[1]);
  fn();
  ctx.restore();
};
