/* Saaib portfolio - input handling, routing and startup
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

$("#start").onclick = () => go(null, true);
$("#back").onclick = () => {
  if (cur === "projects") switchSectionWithIris(null);
  else toTitle();
};

$("#shelf-prev-btn").onclick = () => stepBook(-1);
$("#shelf-next-btn").onclick = () => stepBook(1);
$("#shelf-open-btn").onclick = () => openBook(shelfState.selected);
$("#hud-prev").onclick = () => stepBook(-1);
$("#hud-next").onclick = () => stepBook(1);
$("#hud-open").onclick = () => openBook(shelfState.selected);
$("#book-close").onclick = closeBook;
$("#book-prev").onclick = () => flipBook(-1);
$("#book-next").onclick = () => flipBook(1);
$("#book-stage").onclick = (e) => {
  if (e.target === $("#book-stage")) closeBook();
};

addEventListener("keydown", (e) => {
  if (busy || bookBusy) return;

  if (bookOpen) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeBook();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      flipBook(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      flipBook(1);
    }
    return;
  }

  const items = [
      ...document.querySelectorAll(view === "title" ? "#qa .mi" : "#tabs .mi"),
    ],
    ai = items.indexOf(document.activeElement),
    a = document.activeElement;

  if (view === "hub" && cur === "projects") {
    const inTabs = a && a.closest && a.closest("#tabs");
    if (!inTabs && a !== $("#back")) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        stepBook(-1);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        stepBook(1);
        return;
      }
      if (e.key === "Enter" && !(a && a.classList.contains("shelf-btn") && a.id !== "shelf-open-btn")) {
        e.preventDefault();
        openBook(shelfState.selected);
        return;
      }
    } else if (inTabs && e.key === "ArrowDown") {
      e.preventDefault();
      $("#shelf-open-btn").focus();
      return;
    }
  }

  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    const d = /Down|Right/.test(e.key) ? 1 : -1;
    items[
      ai < 0
        ? d > 0
          ? 0
          : items.length - 1
        : (ai + d + items.length) % items.length
    ].focus();
    return;
  }
  if (e.key === "Escape" && view === "hub") {
    if (cur === "projects") switchSectionWithIris(null);
    else toTitle();
    return;
  }
  if (
    (e.key === "Enter" || e.key === " ") &&
    view === "title" &&
    !(a && a.classList.contains("mi"))
  ) {
    e.preventDefault();
    go(null, true);
  }
});
function route() {
  if (busy) return;
  const k = location.hash.slice(1);
  if (SECT[k]) {
    if (view === "hub") {
      if (cur !== k) {
        if (k === "projects" || cur === "projects") switchSectionWithIris(k);
        else openSection(k);
      }
    } else go(k, false);
  } else if (view === "hub") toTitle();
}
addEventListener("hashchange", route);
if (SECT[location.hash.slice(1)]) {
  enter(location.hash.slice(1));
} else $("#start").focus({ preventScroll: true });
