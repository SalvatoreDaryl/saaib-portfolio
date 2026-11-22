/* Saaib portfolio - terrain, sky, mountains, water, banks, foreground layers and scenery lists
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const bankTop = (i) =>
  i < 110
    ? 141 - Math.round(15 * Math.pow(Math.max(0, (110 - i) / 126), 0.85))
    : i > 230
      ? 141 - Math.round(15 * Math.pow((i - 230) / 106, 0.85))
      : 999;
const gt = (i) => {
  const w = Math.min(1, Math.max(0, Math.abs(i - 180) - 45) / 60),
    g = Math.round(148 + w * 2 * Math.sin(i * 0.09) - w * w * 9),
    d = Math.max(0, Math.min(1, Math.min(i - 110, 184 - i) / 5));
  return Math.round(g + d * 10);
};
const L = {};
(() => {
  // sky + sun
  let [c, x] = mk();
  grad(
    x,
    -Q,
    HOR,
    [
      "#140c2e",
      "#251448",
      "#3d1d5e",
      "#6a2a6e",
      "#a33b78",
      "#d6566f",
      "#f27f5a",
      "#ffb066",
      "#ffd98a",
    ],
    1.1,
  );
  for (let j = -24; j <= 24; j++) {
    if (j > 3 && j % 6 < 2) continue;
    const w = Math.floor(Math.sqrt(576 - j * j));
    x.fillStyle =
      j < -8 ? "#fff2b0" : j < 4 ? "#ffd98a" : j < 12 ? "#ffb066" : "#f27f5a";
    x.fillRect(SUNX - w, SUNY + j, w * 2 + 1, 1);
  }
  L.sky = c;
  L.far = mtn(HOR, 30, 0.03, "#6f3577", "#c0587c", 0.5, 0.85, true);
  L.mid = mtn(120, 20, 0.045, "#43225f", "#7b3a7a", 2, 0.5, false);
  [c, x] = mk();
  grad(
    x,
    115,
    162,
    ["#f0905a", "#d6566f", "#8a3a7a", "#4a2a6b", "#2a1650"],
    0.8,
  );
  L.water = c;
  [c, x] = mk();
  for (let i = -P; i < W + P; i++) {
    const t = bankTop(i);
    if (t > 200) continue;
    x.fillStyle = "#241552";
    x.fillRect(i, t, 1, H + Q - t);
    x.fillStyle = "#6a2f70";
    x.fillRect(i, t, 1, 1);
  }
  L.bank = c;
  [c, x] = mk();
  for (let i = -P; i < W + P; i++) {
    const g = gt(i);
    x.fillStyle = "#140a2a";
    x.fillRect(i, g, 1, H + Q - g);
    x.fillStyle = "#1d3358";
    x.fillRect(i, g, 1, 2);
    if (rnd() > 0.8) {
      x.fillStyle = "#2e5a78";
      x.fillRect(i, g, 1, 1);
    }
  }
  [
    [84, 0.8],
    [96, 0.5],
    [246, 0.7],
  ].forEach(([rx, s]) => {
    const g = gt(rx);
    x.fillStyle = "#3a2a5a";
    x.fillRect(rx, g - 4, Math.round(9 * s) + 4, 5);
    x.fillStyle = "#6a4a8a";
    x.fillRect(rx + 1, g - 5, Math.round(9 * s) + 1, 1);
  });
  for (let n = 0; n < 18; n++) {
    const fx = Math.round(-10 + rnd() * 340);
    if (fx > 104 && fx < 238) continue;
    const g = gt(fx);
    x.fillStyle = "#2e5a78";
    x.fillRect(fx, g - 5, 1, 5);
    x.fillStyle = ["#e8648a", "#ffd27a", "#fff1d6"][n % 3];
    x.fillRect(fx - 1, g - 7, 3, 2);
    x.fillRect(fx, g - 8, 1, 4);
  }
  L.fg = c;
})();
const STARS = Array.from({ length: 42 }, () => ({
  x: rnd() * W,
  y: rnd() * 60,
  p: rnd() * 6,
  b: rnd() > 0.88,
}));
const CL = [];
for (let i = 0; i < 5; i++)
  CL.push({
    x: rnd() * W,
    y: 26 + rnd() * 34,
    w: 28 + rnd() * 18,
    s: 1.5 + rnd() * 1.5,
    n: 0,
    p: ["#8f3a78", "#a33b78", "#f27f5a"],
  });
for (let i = 0; i < 4; i++)
  CL.push({
    x: rnd() * W,
    y: 76 + rnd() * 18,
    w: 46 + rnd() * 24,
    s: 4 + rnd() * 3,
    n: 1,
    p: ["#d6566f", "#e8764f", "#ffb066"],
  });
const trees = [];
[
  [-12, 108, 0],
  [232, 332, 1],
].forEach(([a, b, right]) => {
  for (let i = a; i < b; i += 6 + Math.floor(rnd() * 4)) {
    const cl = Math.min(1, right ? (i - 230) / 106 : (110 - i) / 126),
      h = Math.round(15 + Math.max(0, cl) * 18 + rnd() * 6);
    trees.push({
      x: i,
      b: bankTop(i) + 2,
      h,
      w: Math.round(9 + h * 0.25),
      ph: rnd() * 6,
      c: trees.length % 2 ? "#2a1a52" : "#190e38",
      dir: right ? -1 : 1,
    });
  }
});
trees.sort((a, b) => a.h - b.h);
const BLADES = Array.from({ length: 84 }, () => {
  const x = Math.round(-12 + rnd() * 344);
  return {
    x,
    h: 3 + Math.floor(rnd() * 6),
    ph: rnd() * 6,
    c: ["#1f3a5f", "#2e5a78", "#3f7f8a"][Math.floor(rnd() * 3)],
  };
}).filter((b) => b.x < 102 || b.x > 238);
const FLY = Array.from({ length: 22 }, () => ({
  x: -10 + rnd() * 340,
  y: 96 + rnd() * 54,
  p: rnd() * 6,
}));
