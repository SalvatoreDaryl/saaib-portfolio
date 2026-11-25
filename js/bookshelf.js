/* Saaib portfolio - interactive cabin bookshelf & full-screen arched bookshelf scene
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const CABIN_SHELF_Y = [58, 92, 126];
const CABIN_SHELF_BOUNDS = [
  { x0: 19, x1: 30 },
  { x0: 23, x1: 34 },
  { x0: 11, x1: 22 },
];

const FULL_SHELF_Y = [62, 108, 156];
const FULL_BOOK_SLOTS = [
  { shelf: 0, x: 86 },  // Project 01 (left of cloche)
  { shelf: 0, x: 204 }, // Project 02 (right of stacked books)
  { shelf: 1, x: 88 },  // Project 03 (left of framed heart)
  { shelf: 1, x: 162 }, // Project 04 (between framed art & candles)
  { shelf: 2, x: 146 }, // Project 05 (between butterfly frame & potion)
  { shelf: 2, x: 218 }, // Project 06 (right of chest)
];

const shelfState = {
  selected: 0,
  hovered: -1,
  anims: PROJECTS.map(() => 0),
  cabinRects: PROJECTS.map(() => ({ x: 0, y: 0, w: 6, h: 14 })),
  fullRects: PROJECTS.map(() => ({ x: 0, y: 0, w: 12, h: 30 })),
};

function computeShelfLayouts() {
  const cursors = CABIN_SHELF_BOUNDS.map((b) => b.x0);
  PROJECTS.forEach((p, idx) => {
    const s = Math.max(0, Math.min(2, p.book && p.book.shelf != null ? p.book.shelf : idx % 3));
    const cw = 5;
    const ch = 13 + (idx % 3);
    shelfState.cabinRects[idx] = { x: cursors[s], y: CABIN_SHELF_Y[s] - ch, w: cw, h: ch, shelf: s };
    cursors[s] += cw + 2;

    const slot = FULL_BOOK_SLOTS[idx] || { shelf: idx % 3, x: 88 + (idx % 4) * 32 };
    const fw = (p.book && p.book.w) || 12;
    const fh = (p.book && p.book.h) || 30;
    shelfState.fullRects[idx] = {
      x: slot.x,
      y: FULL_SHELF_Y[slot.shelf] - fh,
      w: fw,
      h: fh,
      shelf: slot.shelf,
    };
  });
}
computeShelfLayouts();

function activeRects() {
  return cur === "projects" ? shelfState.fullRects : shelfState.cabinRects;
}

/* ===== Static Full-Screen Arched Bookshelf Layer (L.shelf) ===== */
(() => {
  const [c, x] = mk(),
    f = (col, a, b, w = 1, h = 1) => {
      x.fillStyle = col;
      x.fillRect(a, b, w, h);
    };

  // Deep atmospheric room backdrop
  f("#0b0710", -P, -Q, LW, LH);
  f("#130c1c", 48, 0, 224, H);

  // Arched bookshelf silhouette (x=68..252, y=10..174)
  for (let y = 10; y < 34; y++) {
    const t = (34 - y) / 24;
    const inset = Math.round(t * t * 34);
    f("#221526", 68 + inset, y, 184 - inset * 2, 1);
    f("#120a18", 74 + inset, y + 4, 172 - inset * 2, 1);
  }
  f("#221526", 68, 34, 184, 140);
  f("#120a18", 74, 34, 172, 134);

  // Outer carved frame & subtle arch keystone
  f("#332038", 68, 34, 2, 140);
  f("#332038", 250, 34, 2, 140);
  f("#3b2842", 156, 12, 8, 6);
  f("#2b1c30", 158, 18, 4, 3);

  // 3 main wooden shelves
  FULL_SHELF_Y.forEach((sy) => {
    f("#2d1b2e", 72, sy, 176, 5);
    f("#442b45", 74, sy, 172, 1);
    f("#1a0f1c", 74, sy + 4, 172, 1);
  });

  // --- Shelf 0 (y = 62) filler books & curiosities ---
  // Far-left dark plum/sage filler books
  f("#31233d", 76, 36, 8, 26);
  f("#58755a", 78, 41, 4, 1);
  f("#394d3b", 101, 33, 9, 29);
  f("#d9c28f", 102, 38, 7, 1);

  // Glass cloche with sprouting plant (x=114..132)
  f("#33243b", 114, 59, 18, 3);
  f("#526378", 116, 40, 14, 19);
  f("#191224", 118, 42, 10, 17);
  f("#8fa8bd", 117, 41, 1, 14);
  f("#2d1b2e", 120, 56, 6, 3);
  // Plant inside cloche
  f("#425947", 122, 47, 2, 9);
  f("#58755a", 120, 48, 2, 3);
  f("#8fb8a2", 124, 46, 2, 3);
  f("#8fb8a2", 121, 44, 2, 2);

  // Horizontal stacked botanical books + tiny chest (x=136..178)
  f("#425947", 136, 56, 42, 6);
  f("#b8cfa8", 140, 58, 32, 1);
  f("#4b3859", 138, 50, 38, 6);
  f("#d8b4d8", 142, 52, 26, 1);
  f("#384c66", 140, 45, 34, 5);
  f("#cfd6e0", 144, 47, 24, 1);
  // Tiny box on top of stack
  f("#4b3859", 150, 38, 16, 7);
  f("#d9c28f", 157, 41, 2, 2);

  // Right-side filler books on Shelf 0
  f("#425947", 182, 32, 9, 30);
  f("#b8cfa8", 184, 36, 5, 1);
  f("#31233d", 192, 36, 10, 26);
  f("#4e6785", 218, 35, 9, 27);
  f("#3b263d", 229, 33, 14, 29);

  // --- Shelf 1 (y = 108) filler books & curiosities ---
  // Left dark filler
  f("#2b1e36", 76, 78, 9, 30);
  f("#b8cfa8", 78, 84, 5, 1);

  // Framed gold-bordered botanical/heart art (x=104..130, y=76..106)
  f("#8f7444", 104, 76, 26, 30);
  f("#d9c28f", 105, 77, 24, 28);
  f("#cfd6e0", 108, 80, 18, 22);
  // Botanical crimson/plum motif inside frame
  f("#5a2742", 113, 85, 8, 11);
  f("#3b162a", 115, 87, 4, 6);

  // Roman numeral I & II slate-blue tomes (x=134..156)
  f("#384c66", 134, 76, 10, 32);
  f("#4e6785", 145, 76, 10, 32);
  f("#cfd6e0", 138, 88, 2, 5);
  f("#cfd6e0", 148, 88, 1, 5);
  f("#cfd6e0", 151, 88, 1, 5);

  // Stacked books + melted white candles + trailing ivy (x=180..242)
  f("#2c382e", 180, 101, 52, 7);
  f("#425947", 182, 95, 48, 6);
  f("#4b3859", 186, 90, 38, 5);
  // Melted candles
  f("#d6d0c8", 194, 79, 4, 11);
  f("#e8e2d8", 200, 82, 3, 8);
  f("#d6d0c8", 193, 89, 12, 1);
  // Trailing green ivy
  f("#425947", 230, 74, 3, 18);
  f("#58755a", 227, 78, 3, 3);
  f("#58755a", 233, 82, 3, 3);
  f("#8fb8a2", 229, 89, 2, 4);
  f("#58755a", 232, 94, 2, 14);
  f("#8fb8a2", 233, 108, 2, 6);

  // --- Shelf 2 (y = 156) filler books & curiosities ---
  // Framed butterfly specimen (x=78..116, y=126..154)
  f("#8f7444", 78, 126, 38, 28);
  f("#d9c28f", 79, 127, 36, 26);
  f("#d6d0c8", 82, 130, 30, 20);
  // 4 tiny butterflies inside specimen frame
  f("#384c66", 86, 133, 6, 4);
  f("#5a3d5c", 100, 133, 6, 4);
  f("#425947", 87, 142, 5, 4);
  f("#8f7444", 100, 141, 6, 5);

  // Small leaning sage book
  f("#425947", 120, 128, 9, 28);
  f("#31233d", 132, 126, 10, 30);

  // Green potion bottle & test tubes on stacked books (x=162..196)
  f("#3b263d", 162, 149, 34, 7);
  f("#4b3859", 164, 144, 30, 5);
  // Potion bottle
  f("#7d94a6", 169, 134, 8, 10);
  f("#58755a", 170, 137, 6, 6);
  f("#8fb8a2", 171, 139, 4, 2);
  f("#8f7444", 172, 132, 2, 2);
  // Test tube rack
  f("#332038", 182, 136, 10, 8);
  f("#8fa8bd", 184, 133, 2, 9);
  f("#8fa8bd", 188, 133, 2, 9);
  f("#6e3352", 184, 137, 2, 4);
  f("#58755a", 188, 138, 2, 3);

  // Locked wooden chest with brass keyhole (x=198..216)
  f("#3f2940", 198, 141, 18, 15);
  f("#543856", 198, 141, 18, 2);
  f("#d9c28f", 206, 146, 2, 4);

  // Hanging brass key on far right
  f("#4b3859", 234, 128, 8, 28);
  f("#d9c28f", 237, 134, 2, 8);

  L.shelf = c;
})();

/* ===== Cabin Small Bookshelf Props & Books (inside drawIn) ===== */
function drawCabinShelfProps(t) {
  // --- Shelf 0 (top, y=58) ---
  // Potted fern on left (x=10..17)
  R("#4a3348", 11, 53, 5, 5);
  R("#6b4a62", 10, 52, 7, 1);
  R("#2e544b", 12, 47, 2, 5);
  R("#4f806b", 10, 48, 2, 3);
  R("#4f806b", 14, 48, 2, 3);
  R("#8fb8a2", 13, 46, 2, 2);
  R("#8fb8a2", 16, 54, 1, 3);

  // Tiny glass cloche with sprout (x=32..37)
  R("#33243b", 32, 56, 6, 2);
  R("#526378", 33, 49, 4, 7);
  R("#191224", 34, 50, 2, 6);
  R("#8fb8a2", 34, 52, 2, 3);

  // Packed filler books (x=39..52)
  R("#384c66", 39, 44, 4, 14);
  R("#cfd6e0", 40, 47, 2, 1);
  R("#5a3d5c", 43, 46, 4, 12);
  R("#d8b4d8", 44, 49, 2, 1);
  R("#425947", 47, 43, 5, 15);
  R("#b8cfa8", 48, 46, 3, 1);

  // Brass candle on right (x=54..59)
  R("#8f6e3a", 54, 56, 5, 2);
  R("#d8cbb8", 55, 51, 3, 5);
  const fl = reduce ? 0 : Math.sin(t * 8) > 0 ? 1 : 0;
  R("#ff9a4a", 56, 49 - fl, 1, 2);
  R("#fff2b0", 56, 50, 1, 1);
  if (!reduce) disc(56, 50, 5, "#ffd27a", 0.08 + 0.03 * Math.sin(t * 7));

  // --- Shelf 1 (middle, y=92) ---
  // Stacked horizontal books + tiny framed art (x=10..21)
  R("#2c466b", 10, 89, 11, 3);
  R("#d8cbb8", 11, 89, 8, 1);
  R("#5a3254", 11, 86, 9, 3);
  R("#d9c28f", 12, 77, 7, 8);
  R("#cfd6e0", 13, 78, 5, 6);
  R("#5a2742", 15, 80, 2, 3);

  // Packed filler books (x=36..51)
  R("#4b3859", 36, 78, 4, 14);
  R("#b8cfa8", 37, 81, 2, 1);
  R("#425947", 40, 80, 4, 12);
  R("#ffd27a", 41, 83, 2, 1);
  R("#384c66", 44, 77, 4, 15);
  R("#cfd6e0", 45, 84, 2, 2);
  R("#5a3d5c", 48, 81, 3, 11);

  // Glowing teal vial + trailing vine (x=53..60)
  R("#263d4a", 53, 87, 4, 5);
  R("#59d3c3", 54, 88, 2, 3);
  if (!reduce) disc(55, 89, 4, "#59d3c3", 0.08 + 0.03 * Math.sin(t * 3.5));
  R("#4f806b", 58, 82, 2, 10);
  R("#8fb8a2", 59, 92, 1, 4);

  // --- Shelf 2 (bottom, y=126) ---
  // Packed filler books (x=24..38)
  R("#384c66", 24, 112, 4, 14);
  R("#cfd6e0", 25, 115, 2, 1);
  R("#4b3859", 28, 114, 4, 12);
  R("#d8b4d8", 29, 118, 2, 1);
  R("#425947", 32, 111, 4, 15);
  R("#b8cfa8", 33, 114, 2, 1);
  R("#31233d", 36, 115, 3, 11);

  // Tiny chest on stacked book (x=40..47)
  R("#4b3859", 40, 123, 8, 3);
  R("#3f2940", 41, 117, 6, 6);
  R("#d9c28f", 43, 119, 2, 2);

  // Potted botanical with trailing vine on right (x=50..60)
  R("#3a4b5c", 50, 120, 6, 6);
  R("#2e544b", 51, 114, 4, 6);
  R("#4f806b", 50, 115, 2, 3);
  R("#8fb8a2", 54, 115, 2, 3);
  R("#4f806b", 56, 120, 2, 4);
  R("#8fb8a2", 58, 124, 2, 5);
}

function drawBookSprite(p, r, lift, isSelected, isHovered, t, detailed) {
  const b = p.book || {};
  const spine = b.spine || "#4b3859";
  const shade = b.shade || "#31233d";
  const trim = b.trim || "#ffd27a";
  const detail = b.detail || "bands";

  const dx = lift > 0.35 ? 1 : 0;
  const dy = -Math.round(lift * (detailed ? 3 : 2));
  const x = r.x + dx;
  const y = r.y + dy;
  const w = r.w;
  const h = r.h;

  if (lift > 0.1) {
    ctx.globalAlpha = 0.5 * lift;
    R("#09050d", r.x, r.y + 1, w, h - 1);
    ctx.globalAlpha = 1;
  }

  // Top page thickness
  R("#d8cbb8", x + 1, y, Math.max(1, w - 2), detailed ? 2 : 1);
  // Spine body & shadow
  const topOff = detailed ? 2 : 1;
  R(spine, x, y + topOff, w, h - topOff);
  R(shade, x + w - (detailed ? 2 : 1), y + topOff, detailed ? 2 : 1, h - topOff);

  if (detailed) {
    if (detail === "botanical") {
      R(trim, x + 2, y + 5, w - 5, 1);
      R(trim, x + Math.floor(w / 2) - 1, y + 9, 1, 10);
      R(trim, x + Math.floor(w / 2) - 3, y + 11, 2, 2);
      R(trim, x + Math.floor(w / 2), y + 14, 2, 2);
      R(trim, x + 2, y + h - 4, w - 5, 1);
    } else if (detail === "bands") {
      R(trim, x + 1, y + 5, w - 3, 1);
      R(trim, x + 1, y + 9, w - 3, 1);
      R(trim, x + 1, y + h - 5, w - 3, 1);
    } else if (detail === "mushroom") {
      R(trim, x + 3, y + 10, 5, 2);
      R(trim, x + 5, y + 12, 1, 4);
      R(trim, x + 2, y + h - 4, w - 5, 1);
    } else if (detail === "roman") {
      R(trim, x + 2, y + 5, w - 5, 1);
      R(trim, x + 4, y + 11, 1, 6);
      R(trim, x + 6, y + 11, 1, 6);
      R(trim, x + 2, y + h - 4, w - 5, 1);
    } else if (detail === "moon") {
      R(trim, x + 4, y + 8, 3, 1);
      R(trim, x + 3, y + 9, 1, 3);
      R(trim, x + 4, y + 12, 3, 1);
      R(trim, x + 2, y + h - 4, w - 5, 1);
    } else if (detail === "ribbon") {
      R(trim, x + 2, y + 5, w - 5, 1);
      R(trim, x + 4, y + 12, 3, 3);
      R("#e8648a", x + Math.floor(w / 2) - 1, y + h, 2, 3);
    }
  } else {
    R(trim, x + 1, y + 3, Math.max(1, w - 2), 1);
  }

  if (isSelected || isHovered) {
    const glowCol = isSelected ? "#ffd27a" : "#59d3c3";
    ctx.globalAlpha = isSelected ? 0.85 + 0.15 * Math.sin(t * 5) : 0.78;
    R(glowCol, x - 1, y, 1, h);
    R(glowCol, x + w, y, 1, h);
    R(glowCol, x, y - 1, w, 1);
    ctx.globalAlpha = 1;
  }
}

function drawBookshelf(t, dt) {
  drawCabinShelfProps(t);
  PROJECTS.forEach((p, idx) => {
    const r = shelfState.cabinRects[idx];
    const isHovered = shelfState.hovered === idx;
    const target = isHovered ? 1 : 0;
    if (reduce) shelfState.anims[idx] = target;
    else shelfState.anims[idx] += (target - shelfState.anims[idx]) * Math.min(1, (dt || 0.016) * 14);
    drawBookSprite(p, r, shelfState.anims[idx], false, isHovered, t, false);
  });
}

const SHELF_MOTES = Array.from({ length: 14 }, () => ({
  x: 74 + rnd() * 172,
  y: 26 + rnd() * 138,
  p: rnd() * 6,
}));

function drawShelfScene(t, dt) {
  ctx.clearRect(0, 0, W, H);
  lay(L.shelf, 0);

  // Candle flames on middle shelf (x=195, x=201)
  const fl = reduce ? 0 : Math.sin(t * 8) > 0 ? 1 : 0;
  R("#ff9a4a", 195, 76 - fl, 2, 3);
  R("#fff2b0", 195, 77, 1, 1);
  R("#ff9a4a", 201, 79 + fl, 1, 3);
  R("#fff2b0", 201, 80, 1, 1);
  if (!reduce) {
    disc(197, 79, 14, "#ffd27a", 0.06 + 0.02 * Math.sin(t * 6));
    disc(173, 139, 9, "#59d3c3", 0.06 + 0.03 * Math.sin(t * 3.5));
  }

  // Interactive project books
  PROJECTS.forEach((p, idx) => {
    const r = shelfState.fullRects[idx];
    const isHovered = shelfState.hovered === idx;
    const isSelected = !bookOpen && shelfState.selected === idx;
    const target = isHovered || isSelected ? 1 : 0;
    if (reduce) shelfState.anims[idx] = target;
    else shelfState.anims[idx] += (target - shelfState.anims[idx]) * Math.min(1, (dt || 0.016) * 14);
    drawBookSprite(p, r, shelfState.anims[idx], isSelected, isHovered, t, true);
  });

  // Floating pixel selector arrow above active book
  if (!bookOpen && PROJECTS[shelfState.selected]) {
    const r = shelfState.fullRects[shelfState.selected];
    const bob = reduce ? 0 : Math.round(Math.sin(t * 5) * 1);
    const ax = r.x + Math.floor(r.w / 2);
    const ay = r.y - 7 + bob;
    R("#ffd27a", ax - 2, ay, 5, 1);
    R("#ffd27a", ax - 1, ay + 1, 3, 1);
    R("#ffd27a", ax, ay + 2, 1, 1);
  }

  if (!reduce) {
    SHELF_MOTES.forEach((m) => {
      ctx.globalAlpha = 0.25 + 0.25 * Math.sin(t + m.p);
      R("#ffe6a0", m.x + Math.sin(t * 0.4 + m.p) * 4, m.y + Math.cos(t * 0.3 + m.p) * 3);
      ctx.globalAlpha = 1;
    });
  }
}

function getBookAt(sx, sy) {
  if (Number.isNaN(sx) || Number.isNaN(sy)) return -1;
  const rects = activeRects();
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    if (sx >= r.x - 1 && sx <= r.x + r.w + 1 && sy >= r.y - 3 && sy <= r.y + r.h + 1) {
      return i;
    }
  }
  return -1;
}

function getBookScreenRect(index) {
  const rects = activeRects();
  const r = rects[index] || { x: 140, y: 80, w: 12, h: 30 };
  const cr = cv.getBoundingClientRect();
  const s = Math.max(cr.width / W, cr.height / H);
  const ox = cr.left + (cr.width - W * s) * op;
  const oy = cr.top + (cr.height - H * s) * 0.88;
  return {
    left: ox + r.x * s,
    top: oy + r.y * s,
    width: Math.max(24, r.w * s),
    height: Math.max(48, r.h * s),
  };
}

function selectBook(idx, updateUi = true) {
  if (!PROJECTS.length) return;
  shelfState.selected = (idx + PROJECTS.length) % PROJECTS.length;
  if (updateUi && typeof syncBookshelfPrompt === "function") {
    syncBookshelfPrompt();
  }
}

function stepBook(delta) {
  selectBook(shelfState.selected + delta, true);
}

cv.addEventListener("pointermove", () => {
  if (view !== "hub" || busy || bookOpen) {
    if (shelfState.hovered !== -1) {
      shelfState.hovered = -1;
      cv.style.cursor = "";
    }
    return;
  }
  const hit = getBookAt(S.sx, S.sy);
  if (hit !== shelfState.hovered) {
    shelfState.hovered = hit;
    cv.style.cursor = hit >= 0 ? "pointer" : "";
  }
});

cv.addEventListener("pointerleave", () => {
  shelfState.hovered = -1;
  cv.style.cursor = "";
});

cv.addEventListener("click", () => {
  if (view !== "hub" || busy || bookOpen) return;
  const hit = getBookAt(S.sx, S.sy);
  if (hit >= 0) {
    if (cur !== "projects") {
      selectBook(hit, true);
      switchSectionWithIris("projects");
      return;
    }
    selectBook(hit, true);
    if (typeof openBook === "function") {
      openBook(hit);
    }
  }
});

addEventListener(
  "wheel",
  (e) => {
    if (view !== "hub" || cur !== "projects" || busy || bookOpen) return;
    if (Math.abs(e.deltaY) < 4 && Math.abs(e.deltaX) < 4) return;
    const dir = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
    stepBook(dir);
  },
  { passive: true },
);
