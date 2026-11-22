/* Saaib portfolio - menu items, dialogue box, enter / leave cabin
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

function bmp(c, rows, cols) {
  c.width = rows[0].length;
  c.height = rows.length;
  const x = c.getContext("2d");
  rows.forEach((r, j) =>
    [...r].forEach((ch, i) => {
      const col = ch == "#" ? cols[0] : ch == "=" ? cols[1] || cols[0] : 0;
      if (col) {
        x.fillStyle = col;
        x.fillRect(i, j, 1, 1);
      }
    }),
  );
}
function MenuItem(k) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "mi";
  b.dataset.k = k;
  b.innerHTML =
    '<canvas class="ar"></canvas><canvas class="ic"></canvas><span></span>';
  bmp($(".ar", b), ARROW, ["#ffd27a"]);
  bmp($(".ic", b), ICONS[k].r, ICONS[k].c);
  $("span", b).textContent = SECT[k].label;
  b.onclick = () => (view === "title" ? go(k, false) : openSection(k));
  return b;
}
Object.keys(SECT).forEach((k) => {
  $("#qa .list").append(MenuItem(k));
  $("#tabs .list").append(MenuItem(k));
});

let view = "title",
  busy = false,
  cur = null,
  tw;
function say(el, txt, done) {
  clearInterval(tw);
  if (reduce) {
    el.textContent = txt;
    done();
    return;
  }
  let i = 0;
  el.textContent = "";
  tw = setInterval(() => {
    el.textContent = txt.slice(0, ++i);
    if (i >= txt.length) {
      clearInterval(tw);
      done();
    }
  }, 16);
}
function openSection(k) {
  cur = k;
  const d = $(".dlg"),
    ul = $("ul", d);
  ul.className = "";
  ul.textContent = "";
  document
    .querySelectorAll("#tabs .mi")
    .forEach((b) => b.classList.toggle("on", b.dataset.k === k));
  const s = SECT[k] || {
    head: "WELCOME, TRAVELER",
    intro:
      "The world map is still being drawn. Pick a destination above to look around.",
    items: [],
  };
  $("h3", d).textContent = s.head;
  s.items.forEach(([n, t, u]) => {
    const li = document.createElement("li"),
      b = document.createElement("b");
    b.textContent = n;
    li.append(b);
    if (u) {
      const a = document.createElement("a");
      a.href = u;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = t;
      li.append(a);
    } else {
      const sp = document.createElement("span");
      sp.textContent = t;
      li.append(sp);
    }
    ul.append(li);
  });
  say($("p", d), s.intro, () => ul.classList.add("show"));
  try {
    if (k && location.hash !== "#" + k) location.hash = k;
  } catch (e) {}
}
function enter(k) {
  view = "hub";
  cur = null;
  S.face = 1;
  if (reduce) paint(3, 0);
  body.classList.add("hub");
  ["#title", "#qa", "#credit"].forEach((s) => ($(s).hidden = true));
  $("#hub").hidden = false;
  openSection(k);
  $("#back").focus({ preventScroll: true });
}
function leave() {
  view = "title";
  cur = null;
  dT = dOpen = 0;
  S.face = -1;
  if (reduce) paint(3, 0);
  body.classList.remove("hub");
  ["#title", "#qa", "#credit"].forEach((s) => ($(s).hidden = false));
  $("#hub").hidden = true;
  try {
    history.replaceState(null, "", location.pathname + location.search);
  } catch (e) {}
  $("#start").focus({ preventScroll: true });
}
