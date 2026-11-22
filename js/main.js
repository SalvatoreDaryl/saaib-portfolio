/* Saaib portfolio - input handling, routing and startup
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

$("#start").onclick = () => go(null, true);
$("#back").onclick = toTitle;

addEventListener("keydown", (e) => {
  if (busy) return;
  const items = [
      ...document.querySelectorAll(view === "title" ? "#qa .mi" : "#tabs .mi"),
    ],
    ai = items.indexOf(document.activeElement),
    a = document.activeElement;
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
    toTitle();
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
    view === "hub" ? cur !== k && openSection(k) : go(k, false);
  } else if (view === "hub") toTitle();
}
addEventListener("hashchange", route);
if (SECT[location.hash.slice(1)]) {
  enter(location.hash.slice(1));
} else $("#start").focus({ preventScroll: true });
