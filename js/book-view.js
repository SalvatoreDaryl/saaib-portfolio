/* Saaib portfolio - physical book-opening transition & open-book project details
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

let bookOpen = false;
let bookBusy = false;

function renderBookContent(idx) {
  const p = PROJECTS[idx];
  if (!p) return;

  const tome = $("#book-tome");
  const b = p.book || {};
  tome.style.setProperty("--book-spine", b.spine || "#3b2c59");
  tome.style.setProperty("--book-shade", b.shade || "#261b3d");
  tome.style.setProperty("--book-trim", b.trim || "#ffd27a");

  $("#book-vol").textContent = p.volume || `VOL. 0${idx + 1}`;
  $("#book-title").textContent = p.title;
  $("#book-subtitle").textContent = p.subtitle || "";
  $("#book-overview").textContent = p.overview || "";
  $("#book-contribution").textContent = p.contribution || "";

  const techList = $("#book-tech");
  techList.textContent = "";
  (p.technologies || []).forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    techList.append(li);
  });

  const prevBox = $("#book-preview");
  prevBox.textContent = "";
  if (p.preview && p.preview.image) {
    const img = document.createElement("img");
    img.src = p.preview.image;
    img.alt = p.title + " preview";
    prevBox.append(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "preview-ph";
    ph.innerHTML =
      '<div class="preview-art" aria-hidden="true"><span></span><span></span><span></span></div>' +
      `<p class="preview-lbl">${(p.preview && p.preview.label) || "SCREENSHOT / PREVIEW PLACEHOLDER"}</p>` +
      `<p class="preview-cap">${(p.preview && p.preview.caption) || ""}</p>`;
    prevBox.append(ph);
  }

  const linksBox = $("#book-links");
  linksBox.textContent = "";
  const linkOrder = ["demo", "github", "docs"];
  linkOrder.forEach((key) => {
    const item = p.links && p.links[key];
    if (!item) return;
    if (item.url) {
      const a = document.createElement("a");
      a.className = "book-link";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = item.label;
      linksBox.append(a);
    } else {
      const span = document.createElement("span");
      span.className = "book-link is-placeholder";
      span.textContent = item.placeholder || `${item.label} — Placeholder`;
      linksBox.append(span);
    }
  });

  $("#book-counter").textContent = `${String(idx + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
}

function getShelfTransform(idx) {
  const sr = typeof getBookScreenRect === "function" ? getBookScreenRect(idx) : { left: 40, top: 120, width: 32, height: 64 };
  const cx = sr.left + sr.width / 2 - innerWidth / 2;
  const cy = sr.top + sr.height / 2 - innerHeight / 2;
  const sx = Math.max(0.05, sr.width / Math.min(820, innerWidth * 0.92));
  const sy = Math.max(0.08, sr.height / Math.min(540, innerHeight * 0.84));
  return `translate(${Math.round(cx)}px, ${Math.round(cy)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
}

function openBook(idx) {
  if (bookBusy || bookOpen || !PROJECTS.length) return;
  bookBusy = true;
  bookOpen = true;
  shelfState.selected = (idx + PROJECTS.length) % PROJECTS.length;
  shelfState.hovered = -1;
  cv.style.cursor = "";

  if (typeof syncBookshelfPrompt === "function") syncBookshelfPrompt();
  renderBookContent(shelfState.selected);

  const stage = $("#book-stage");
  const tome = $("#book-tome");
  stage.hidden = false;
  stage.classList.remove("is-open", "is-closing");

  if (reduce) {
    tome.style.transform = "translate(0px, 0px) scale(1)";
    stage.classList.add("is-open");
    bookBusy = false;
    $("#book-close").focus({ preventScroll: true });
    return;
  }

  tome.style.transition = "none";
  tome.style.transform = getShelfTransform(shelfState.selected);
  // Force layout before animating to center
  void tome.offsetWidth;

  tome.style.transition = "";
  requestAnimationFrame(() => {
    tome.style.transform = "translate(0px, 0px) scale(1)";
    setTimeout(() => {
      stage.classList.add("is-open");
      setTimeout(() => {
        bookBusy = false;
        $("#book-close").focus({ preventScroll: true });
      }, 360);
    }, 180);
  });
}

function closeBook() {
  if (bookBusy || !bookOpen) return;
  bookBusy = true;

  const stage = $("#book-stage");
  const tome = $("#book-tome");

  if (reduce) {
    stage.classList.remove("is-open", "is-closing");
    stage.hidden = true;
    bookOpen = false;
    bookBusy = false;
    if (typeof syncBookshelfPrompt === "function") syncBookshelfPrompt();
    const openBtn = $("#hud-open") || $("#shelf-open-btn");
    if (openBtn) openBtn.focus({ preventScroll: true });
    return;
  }

  stage.classList.remove("is-open");
  stage.classList.add("is-closing");

  setTimeout(() => {
    tome.style.transform = getShelfTransform(shelfState.selected);
    setTimeout(() => {
      stage.hidden = true;
      stage.classList.remove("is-closing");
      tome.style.transform = "";
      bookOpen = false;
      bookBusy = false;
      if (typeof syncBookshelfPrompt === "function") syncBookshelfPrompt();
      const openBtn = $("#shelf-open-btn");
      if (openBtn) openBtn.focus({ preventScroll: true });
    }, 340);
  }, 220);
}

function flipBook(delta) {
  if (bookBusy || !bookOpen || !PROJECTS.length) return;
  shelfState.selected = (shelfState.selected + delta + PROJECTS.length) % PROJECTS.length;
  if (typeof syncBookshelfPrompt === "function") syncBookshelfPrompt();

  const spread = $("#book-spread");
  if (!reduce) {
    spread.classList.remove("is-turning");
    void spread.offsetWidth;
    spread.classList.add("is-turning");
  }
  renderBookContent(shelfState.selected);
}
