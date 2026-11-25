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
  b.title = SECT[k].label;
  b.setAttribute("aria-label", SECT[k].label);
  b.onclick = () => {
    if (view === "title") go(k, false);
    else if (k === "projects" || cur === "projects") switchSectionWithIris(k);
    else openSection(k);
  };
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
function syncBookshelfPrompt() {
  const shelfUi = $("#shelf-ui");
  if (!shelfUi || typeof PROJECTS === "undefined" || !PROJECTS.length) return;
  const idx = typeof shelfState !== "undefined" ? shelfState.selected : 0;
  const p = PROJECTS[idx] || PROJECTS[0];
  $("#shelf-vol").textContent = p.volume || `VOL. 0${idx + 1}`;
  $("#shelf-title").textContent = p.title;
  if ($("#hud-vol")) $("#hud-vol").textContent = p.volume || `VOL. 0${idx + 1}`;
  if ($("#hud-title")) $("#hud-title").textContent = p.title;
  const dots = $("#shelf-dots");
  if (dots.childElementCount !== PROJECTS.length) {
    dots.textContent = "";
    PROJECTS.forEach((proj, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "shelf-dot";
      btn.textContent = String(i + 1).padStart(2, "0");
      btn.setAttribute("aria-label", proj.title);
      btn.onclick = () => {
        if (typeof selectBook === "function") selectBook(i, true);
      };
      btn.ondblclick = () => {
        if (typeof openBook === "function") openBook(i);
      };
      dots.append(btn);
    });
  }
  [...dots.children].forEach((b, i) => b.classList.toggle("on", i === idx));
}

function openSection(k) {
  cur = k;
  const d = $(".dlg"),
    ul = $("ul", d),
    shelfUi = $("#shelf-ui");
  ul.className = "";
  ul.textContent = "";
  document
    .querySelectorAll("#tabs .mi")
    .forEach((b) => b.classList.toggle("on", b.dataset.k === k));

  if (k === "projects") {
    body.classList.add("shelf-mode");
    $("#back .back-txt").textContent = " CABIN";
    $("#back").title = "Back to Cabin";
    $("#back").setAttribute("aria-label", "Back to Cabin");
    if (typeof selectBook === "function") selectBook(0, false);
    $("h3", d).textContent = "THE BOOKSHELF";
    shelfUi.hidden = false;
    syncBookshelfPrompt();
    if ($("#hud-open")) $("#hud-open").focus({ preventScroll: true });
    try {
      if (location.hash !== "#projects") location.hash = "projects";
    } catch (e) {}
    return;
  }

  body.classList.remove("shelf-mode");
  $("#back .back-txt").textContent = " TITLE";
  $("#back").title = "Back to Title";
  $("#back").setAttribute("aria-label", "Back to Title");
  shelfUi.hidden = true;
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
  if (k !== "projects") $("#back").focus({ preventScroll: true });
}
function leave() {
  if (typeof bookOpen !== "undefined" && bookOpen) {
    $("#book-stage").hidden = true;
    $("#book-stage").classList.remove("is-open", "is-closing");
    bookOpen = false;
    bookBusy = false;
  }
  view = "title";
  cur = null;
  dT = dOpen = 0;
  S.face = -1;
  if (reduce) paint(3, 0);
  body.classList.remove("hub", "shelf-mode");
  ["#title", "#qa", "#credit"].forEach((s) => ($(s).hidden = false));
  $("#hub").hidden = true;
  try {
    history.replaceState(null, "", location.pathname + location.search);
  } catch (e) {}
  $("#start").focus({ preventScroll: true });
}
