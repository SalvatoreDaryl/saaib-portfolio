/* Saaib portfolio - cat sprite and keen, lively cursor-following cat renderer
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

const CAT_ANIM = { hx: 0, hy: 0, excited: 0 };

function hero(t, cx = CX, cb = CB) {
  const cy = cb - 18,
    fc = S.face;
  S.hc = cx + 8;

  const hasPtr = !Number.isNaN(S.sx) && !Number.isNaN(S.sy);
  const rawDx = hasPtr ? S.sx - S.hc : 20 * fc;
  const rawDy = hasPtr ? S.sy - (cy + 5) : 0;
  const dist = Math.hypot(rawDx, rawDy);
  const dx = rawDx * fc;

  // Keenness & excitement when cursor is nearby
  const near = hasPtr && dist < 34 ? 1 : 0;
  const pet = hasPtr && dist < 13 ? 1 : 0;
  CAT_ANIM.excited += ((near ? 1 : 0) - CAT_ANIM.excited) * 0.14;

  // Smooth head lean toward cursor
  const targetHx = hasPtr ? Math.max(-1, Math.min(2, dx / 22)) : 0;
  const targetHy = hasPtr ? Math.max(-1, Math.min(1, rawDy / 28)) : 0;
  if (reduce) {
    CAT_ANIM.hx = 0;
    CAT_ANIM.hy = 0;
  } else {
    CAT_ANIM.hx += (targetHx - CAT_ANIM.hx) * 0.22;
    CAT_ANIM.hy += (targetHy - CAT_ANIM.hy) * 0.22;
  }

  const hx = Math.round(CAT_ANIM.hx);
  const hy = Math.round(CAT_ANIM.hy);
  const br = reduce ? 0 : Math.sin(t * (near ? 4.2 : 2.1)) > 0.2 ? 0 : 1;
  const tw = !reduce && (t % 4.5 < 0.16 || (near && Math.sin(t * 14) > 0.7)) ? 1 : 0;
  const tailSpeed = near ? 7.5 : 2.6;
  const sw = reduce ? 0 : Math.round(Math.sin(t * tailSpeed) * (near ? 2 : 1.5));
  const swTip = reduce ? 0 : Math.round(Math.sin(t * tailSpeed - 0.8) * (near ? 2 : 1));

  // Keen pupil tracking inside 2x2 eye
  const ex = hasPtr ? (dx > 12 ? 1 : dx < -6 ? -1 : 0) : 0;
  const ey = hasPtr ? (rawDy < -10 ? -1 : rawDy > 14 ? 1 : 0) : 0;

  ctx.save();
  if (fc < 0) {
    ctx.translate(cx * 2 + 16, 0);
    ctx.scale(-1, 1);
  }

  // Lively curled & striped tail
  R("#f0903a", cx - 1, cy + 15, 2, 3);
  R("#f0903a", cx - 2 + Math.round(sw * 0.4), cy + 12, 2, 3);
  R("#f0903a", cx - 2 + sw, cy + 9, 2, 3);
  R("#b5551c", cx - 2 + swTip, cy + 7, 2, 2);
  R("#ffe8c0", cx - 2 + swTip, cy + 6, 1, 1);

  // Body (bobs gently with breathing)
  ctx.drawImage(SP.cat, 0, 6, 16, 12, cx, cy + 6, 16, 12);

  // Cute cream front paws
  R("#ffe8c0", cx + 12, cy + 17, 3, 1);
  R("#ffe8c0", cx + 10, cy + 17, 1, 1);

  // Head (leans keenly toward cursor)
  ctx.drawImage(SP.cat, 0, 0, 16, 7, cx + hx, cy + br + hy, 16, 7);

  // Back ear + perky front ear with pink inner
  R("#f0903a", cx + 13 + hx, cy + tw + br + hy);
  R("#f0903a", cx + 12 + hx, cy + 1 + tw + br + hy, 3, 1);
  if (!tw) R("#e8648a", cx + 13 + hx, cy + 1 + br + hy);

  // Expressive eyes (2x2 with catchlight; happy ^_^ squint when petted)
  if (pet && !reduce) {
    R("#1b1038", cx + 11 + hx, cy + 3 + br + hy, 3, 1);
    R("#1b1038", cx + 12 + hx, cy + 2 + br + hy, 1, 1);
  } else if (reduce || (t + 1.7) % 4.3 > 0.14) {
    const eyeX = cx + 11 + hx + (ex > 0 ? 1 : 0);
    const eyeY = cy + 2 + br + hy + (ey > 0 ? 1 : 0);
    R("#59d3c3", eyeX, eyeY, 2, 2);
    R("#1b1038", eyeX + (ex >= 0 ? 1 : 0), eyeY + (ey >= 0 ? 1 : 0), 1, 1);
    R("#fff1d6", eyeX, eyeY, 1, 1);
  } else {
    // Cute blink line
    R("#b5551c", cx + 11 + hx, cy + 3 + br + hy, 2, 1);
  }

  // Rosy cheek blush & cute pink nose + whiskers
  R("#e8648a", cx + 10 + hx, cy + 4 + br + hy, 1, 1);
  R("#e8648a", cx + 15 + hx, cy + 4 + br + hy, 1, 1);
  R("#fff1d6", cx + 16 + hx, cy + 5 + br + hy, 2, 1);
  R("#fff1d6", cx + 16 + hx, cy + 6 + br + hy, 2, 1);

  ctx.restore();

  // Tiny floating pixel heart when cursor pets/hovers right over the cat
  if (pet && !reduce) {
    const hBob = Math.round(Math.sin(t * 6) * 2);
    const hx0 = cx + 6;
    const hy0 = cy - 6 + hBob;
    R("#e8648a", hx0, hy0);
    R("#e8648a", hx0 + 2, hy0);
    R("#e8648a", hx0, hy0 + 1, 3, 1);
    R("#e8648a", hx0 + 1, hy0 + 2);
  }
}
