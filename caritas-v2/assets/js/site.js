/* Caritas Africa v2 — comportements du prototype (aucune dépendance). */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const fDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const date = (iso) => fDate.format(new Date(iso + "T12:00:00"));
  const cover = (p) => `assets/img/pubs/${p.cover}`;

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3600);
  }

  /* ---------- Contrôles segmentés : le curseur glisse sous l'option choisie ---------- */
  function placeThumb(seg, animate) {
    const thumb = $(".seg-thumb", seg), lab = $("input:checked + label", seg);
    if (!thumb || !lab) return;
    thumb.classList.toggle("anim", !!animate && !reduceMotion);
    thumb.style.transform = `translate(${lab.offsetLeft}px, ${lab.offsetTop}px) scale(${lab.offsetWidth / 100}, ${lab.offsetHeight / 100})`;
  }
  function initSegs() {
    const segs = $$(".seg");
    segs.forEach((seg) => $$("input", seg).forEach((r) => r.addEventListener("change", () => placeThumb(seg, true))));
    const all = () => segs.forEach((s) => placeThumb(s, false));
    requestAnimationFrame(all);
    window.addEventListener("resize", all);
    document.fonts && document.fonts.ready.then(all);
  }

  /* ---------- Fichiers PDF ---------- */
  const LANG_FR = { fr: "français", en: "anglais", pt: "portugais" };
  function filesHTML(p, big) {
    return Object.entries(p.files).map(([l, url]) =>
      `<a class="file${big ? " file-lg" : ""}" href="${url}" target="_blank" rel="noopener" hreflang="${l}" aria-label="${esc(p.title)}, PDF en ${LANG_FR[l]}">${ic("file-down")}<span>PDF</span> <abbr title="${LANG_LABEL[l]}">${l.toUpperCase()}</abbr></a>`
    ).join("");
  }
  function pubHTML(p) {
    const first = Object.values(p.files)[0];
    return `<article class="pub">
      <a class="frame" href="${first}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="${cover(p)}" alt="" loading="lazy" decoding="async"></a>
      <h3><a href="${first}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
      ${p.type === "rapport" ? "" : `<p class="pub-meta"><b>${TYPE_LABEL[p.type]}</b><span>${esc(p.date)}</span></p>`}
      ${p.sub ? `<p class="sub">${esc(p.sub)}</p>` : ""}
      <div class="files">${filesHTML(p)}</div>
    </article>`;
  }
  function featureHTML(p, headingTag) {
    const h = headingTag || "h3";
    return `<div class="cover"><img src="${cover(p)}" alt="Couverture : ${esc(p.title)}" width="1400" height="990" loading="lazy"></div>
      <div>
        <${h}>${esc(p.title)}</${h}>
        <p class="sub" lang="en">${esc(p.sub)}</p>
        <p class="desc">Le cadre qui oriente l'action de Caritas Africa et de ses organisations membres jusqu'en 2030.</p>
        <div class="files">${filesHTML(p, true)}</div>
      </div>`;
  }

  /* ---------- En-tête ---------- */
  function initHeader() {
    $$("[data-dropdown]").forEach((btn) => {
      const menu = document.getElementById(btn.getAttribute("aria-controls"));
      const li = btn.closest("li");
      let tOpen, tClose;
      const open = () => { clearTimeout(tClose); btn.setAttribute("aria-expanded", "true"); menu.classList.add("open"); };
      const close = () => { clearTimeout(tOpen); btn.setAttribute("aria-expanded", "false"); menu.classList.remove("open"); };
      btn.addEventListener("click", () => (btn.getAttribute("aria-expanded") === "true" ? close() : open()));
      if (fine) {
        li.addEventListener("mouseenter", () => { clearTimeout(tClose); tOpen = setTimeout(open, 80); });
        li.addEventListener("mouseleave", () => { clearTimeout(tOpen); tClose = setTimeout(close, 160); });
      }
      li.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); btn.focus(); } });
      document.addEventListener("click", (e) => { if (!li.contains(e.target)) close(); });
      li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) close(); });
    });
    const drawer = $("#drawer");
    $$("[data-drawer-open]").forEach((b) => b.addEventListener("click", () => drawer.showModal()));
    $$("[data-drawer-close]").forEach((b) => b.addEventListener("click", () => drawer.close()));
    drawer && drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("nav a, .drawer-actions a")) drawer.close(); });
    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
      if (b.getAttribute("aria-current") === "true") return;
      toast(b.dataset.lang === "en" ? "Mock-up: only the French version is prototyped." : "Maquete: apenas a versão francesa foi prototipada.");
    }));
  }

  function initNewsletter() {
    const f = $("#newsletter");
    if (!f) return;
    const field = $(".field", f), inp = $("input", f);
    inp.addEventListener("input", () => { field.classList.remove("has-err"); inp.removeAttribute("aria-invalid"); });
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
      field.classList.toggle("has-err", !ok);
      inp.setAttribute("aria-invalid", !ok);
      if (!ok) { inp.focus(); return; }
      $("#nl-ok").hidden = false; f.reset();
    });
  }

  /* ---------- Carrousel d'accueil (défilement automatique, sans contrôles visibles) ---------- */
  function initCarousel() {
    const hero = $("#hero");
    if (!hero) return;
    const slides = $$(".slide", hero), live = $("#slides");
    if (slides.length < 2 || reduceMotion) return;
    const DUR = 7000;
    let cur = 0, holds = new Set(), timer = null, startedAt = 0, remaining = DUR;

    const stopClock = () => { if (timer) { clearTimeout(timer); timer = null; remaining -= performance.now() - startedAt; } };
    const startClock = () => { if (timer || holds.size) return; startedAt = performance.now(); timer = setTimeout(() => { timer = null; go(cur + 1, false); }, Math.max(remaining, 0)); };
    const update = () => (holds.size ? stopClock() : startClock());

    function go(i, byUser) {
      const n = (i + slides.length) % slides.length;
      if (timer) { clearTimeout(timer); timer = null; }
      remaining = DUR;
      slides[cur].classList.remove("is-active"); slides[cur].inert = true;
      cur = n;
      slides[cur].classList.add("is-active"); slides[cur].inert = false;
      live.setAttribute("aria-live", byUser ? "polite" : "off");
      const next = $(".slide-media img", slides[(cur + 1) % slides.length]);
      if (next) next.loading = "eager";
      update();
    }

    if (fine) {
      hero.addEventListener("mouseenter", () => { holds.add("hover"); update(); });
      hero.addEventListener("mouseleave", () => { holds.delete("hover"); update(); });
    }
    hero.addEventListener("focusin", () => { holds.add("focus"); update(); });
    hero.addEventListener("focusout", (e) => { if (!hero.contains(e.relatedTarget)) { holds.delete("focus"); update(); } });
    document.addEventListener("visibilitychange", () => { document.hidden ? holds.add("hidden") : holds.delete("hidden"); update(); });

    /* Balayage au doigt */
    let x0 = null, y0 = 0;
    live.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { x0 = e.clientX; y0 = e.clientY; } });
    live.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1), true);
    });
    live.addEventListener("pointercancel", () => { x0 = null; });

    $(".slide-media img", slides[1]).loading = "eager";
    update();
  }

  /* ---------- Accueil ---------- */
  function initHome() {
    /* Réseau : six zones en onglets */
    const tabs = $("#zone-tabs"), panel = $("#zone-panel"), rule = $(".tab-rule", tabs);
    tabs.insertAdjacentHTML("afterbegin", ZONES.map((z, i) =>
      `<button class="zone-tab" role="tab" id="tab-${z.id}" aria-controls="zone-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><strong>${z.code}</strong><span>${esc(z.region)}</span></button>`).join(""));
    const btns = $$(".zone-tab", tabs);
    const placeRule = (b, animate) => {
      rule.classList.toggle("anim", !!animate && !reduceMotion);
      const w = b.offsetWidth - (parseFloat(getComputedStyle(b).paddingRight) || 0);
      rule.style.transform = `translateX(${b.offsetLeft}px) scaleX(${w / 100})`;
    };
    const show = (i, how) => {
      const z = ZONES[i];
      btns.forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "tab-" + z.id);
      panel.innerHTML = `<div><p class="zone-name">${z.code}</p><p class="zone-region">${esc(z.region)}</p></div>
        <dl class="zone-coord">
          <div><dt>Caritas coordinatrice de la zone</dt><dd>${esc(z.caritas)}</dd></div>
          <div><dt>Coordination</dt><dd>${esc(z.person)}<small>${esc(z.role)}</small></dd></div>
        </dl>`;
      if (how !== "init" && !reduceMotion) { panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap"); }
      placeRule(btns[i], how !== "init");
    };
    btns.forEach((b, i) => b.addEventListener("click", () => show(i, "pointer")));
    tabs.addEventListener("keydown", (e) => {
      const cur = btns.findIndex((b) => b.getAttribute("aria-selected") === "true");
      let n = null;
      if (e.key === "ArrowRight") n = (cur + 1) % btns.length;
      if (e.key === "ArrowLeft") n = (cur - 1 + btns.length) % btns.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = btns.length - 1;
      if (n !== null) { e.preventDefault(); show(n, "key"); btns[n].focus(); btns[n].scrollIntoView({ block: "nearest", inline: "nearest" }); }
    });
    show(0, "init");
    const re = () => placeRule(btns.find((b) => b.getAttribute("aria-selected") === "true"), false);
    window.addEventListener("resize", re);
    document.fonts && document.fonts.ready.then(re);

    /* Publications */
    const byId = (id) => PUBS.find((p) => p.id === id);
    $("#feature-pub").innerHTML = featureHTML(byId("cadre"));
    const rail = $("#rail");
    rail.innerHTML = PUBS.filter((p) => p.type === "rapport").sort((a, b) => b.year - a.year).map(pubHTML).join("");
    const [prev, next] = $$("[data-rail]");
    const syncRail = () => {
      prev.disabled = rail.scrollLeft < 4;
      next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 4;
    };
    $$("[data-rail]").forEach((b) => b.addEventListener("click", () => {
      const step = (rail.firstElementChild ? rail.firstElementChild.offsetWidth + 24 : 300) * Number(b.dataset.rail);
      rail.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
    }));
    rail.addEventListener("scroll", syncRail, { passive: true });
    window.addEventListener("resize", syncRail);
    syncRail();

    /* Déclarations, emplois et appels d'offres */
    $("#news-list").innerHTML = NEWS.map((n) => `<li><a href="${n.url}">
      <strong${n.lang === "EN" ? ' lang="en"' : ""}>${esc(n.title)}</strong>
      <span class="top"><span>${n.type}</span><time datetime="${n.date}">${date(n.date)}</time>${n.lang === "EN" ? "<span>En anglais</span>" : ""}</span>
      <span class="go">Lire ${ic("arrow-right")}</span></a></li>`).join("");
    $("#jobs-list").innerHTML = JOBS.map((n) => `<li><a href="${n.url}"><strong>${esc(n.title)}</strong><span><b>${n.type}</b><time datetime="${n.date}">Publié le ${date(n.date)}</time></span></a></li>`).join("");
  }

  /* ---------- Qui sommes-nous ---------- */
  function initAbout() {
    $("#values").innerHTML = VALUES.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#zones-rows").innerHTML = ZONES.map((z) => `<tr><td>${z.code}<small>${esc(z.region)}</small></td><td>${esc(z.caritas)}</td><td>${esc(z.person)}<small>${esc(z.role)}</small></td></tr>`).join("");
    $("#team").innerHTML = TEAM.map((g) => `<div class="team-group"><h3>${g.group}</h3><ul class="team">${g.people.map((p) => `<li><strong>${esc(p.name)}</strong><span>${esc(p.role)}</span><em>${p.country}</em></li>`).join("")}</ul></div>`).join("");

    /* Sous-navigation : section en cours */
    const links = $$(".subnav a");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const set = (id) => links.forEach((a) => a.setAttribute("aria-current", a === map.get(id)));
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) {
        set(vis[0].target.id);
        const a = map.get(vis[0].target.id);
        a && a.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }, { rootMargin: "-35% 0px -55% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
    set(links[0].getAttribute("href").slice(1));
  }

  /* ---------- Ressources ---------- */
  function initLibrary() {
    $("#lib-feature").innerHTML = featureHTML(PUBS.find((p) => p.id === "cadre"), "h2");
    const grid = $("#lib-grid"), count = $("#lib-count"), q = $("#lib-q"), lang = $("#lib-lang"), seg = $("#lib-type");
    const params = new URLSearchParams(location.search);
    const t0 = params.get("type") || "";
    const r0 = $(`input[name="type"][value="${t0}"]`, seg) || $('input[name="type"][value=""]', seg);
    r0.checked = true;
    lang.value = params.get("langue") || "";
    q.value = params.get("q") || "";

    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const render = (animate) => {
      const type = $('input[name="type"]:checked', seg).value, l = lang.value, text = norm(q.value.trim());
      const list = PUBS.filter((p) => p.id !== "cadre" || type || l || text)
        .filter((p) => !type || p.type === type)
        .filter((p) => !l || p.files[l])
        .filter((p) => !text || norm(`${p.title} ${p.sub} ${p.date} ${TYPE_LABEL[p.type]}`).includes(text))
        .sort((a, b) => b.year - a.year);
      count.innerHTML = list.length ? `<strong class="num">${list.length}</strong> document${list.length > 1 ? "s" : ""}` : "Aucun document";
      grid.innerHTML = list.length ? list.map(pubHTML).join("") : `<div class="empty" role="status"><h2>Aucun document ne correspond</h2><p>Essayez une autre langue ou un autre mot, ou affichez toute la bibliothèque.</p><button class="btn btn-line btn-sm" type="button" data-reset>Afficher tous les documents</button></div>`;
      if (!animate) $$(".pub", grid).forEach((c) => (c.style.animation = "none"));
      else $$(".pub", grid).forEach((c, i) => (c.style.animationDelay = Math.min(i, 8) * 40 + "ms"));
      const p = new URLSearchParams();
      if (type) p.set("type", type); if (l) p.set("langue", l); if (q.value.trim()) p.set("q", q.value.trim());
      history.replaceState(null, "", "ressources.html" + (p.toString() ? "?" + p : ""));
    };
    $$('input[name="type"]', seg).forEach((r) => r.addEventListener("change", () => render(true)));
    lang.addEventListener("change", () => render(true));
    let deb; q.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(() => render(false), 120); });
    grid.addEventListener("click", (e) => {
      if (!e.target.closest("[data-reset]")) return;
      $('input[name="type"][value=""]', seg).checked = true; lang.value = ""; q.value = "";
      placeThumb(seg, true); render(true);
    });
    render(false);
  }

  initHeader();
  initNewsletter();
  const page = document.body.dataset.page;
  if (page === "home") { initCarousel(); initHome(); }
  if (page === "about") initAbout();
  if (page === "library") initLibrary();
  initSegs();
})();
