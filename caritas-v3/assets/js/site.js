/* Caritas Africa v3 — récit immersif : scènes pilotées par le scroll (aucune dépendance). */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const root = document.documentElement;
  const reduce = root.classList.contains("rm");
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const fDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const date = (iso) => fDate.format(new Date(iso + "T12:00:00"));
  const cover = (p) => `assets/img/pubs/${p.cover}`;

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3400);
  }

  /* ---------- Découpage des mots (le texte reste lisible tel quel) ---------- */
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(" ");
    return $$(".w", el);
  }
  function splitPhrases(el) {
    const parts = el.textContent.trim().split(/(?<=[,;:])\s+/);
    el.innerHTML = parts.map((p) => `<span class="l">${esc(p)}</span>`).join(" ");
    return $$(".l", el);
  }

  /* ---------- Fichiers PDF ---------- */
  const LANG_FR = { fr: "français", en: "anglais", pt: "portugais" };
  function filesHTML(p, big) {
    return Object.entries(p.files).map(([l, url]) =>
      `<a class="file${big ? " file-lg" : ""}" href="${url}" target="_blank" rel="noopener" hreflang="${l}" aria-label="${esc(p.title)}, PDF en ${LANG_FR[l]}">${ic("file-down")}<span>PDF</span> <abbr title="${LANG_LABEL[l]}">${l.toUpperCase()}</abbr></a>`).join("");
  }
  function pubHTML(p, i) {
    const first = Object.values(p.files)[0];
    return `<article class="pub rise" style="--d:${i || 0}">
      <a class="frame" href="${first}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="${cover(p)}" alt="" loading="lazy" decoding="async"></a>
      <h3><a href="${first}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
      ${p.type === "rapport" ? "" : `<p class="pub-meta"><b>${TYPE_LABEL[p.type]}</b> · ${esc(p.date)}</p>`}
      ${p.sub ? `<p class="sub">${esc(p.sub)}</p>` : ""}
      <div class="files">${filesHTML(p)}</div>
    </article>`;
  }
  function featureHTML(p, h) {
    h = h || "h3";
    return `<div class="cover"><img src="${cover(p)}" alt="Couverture : ${esc(p.title)}" width="1400" height="990" loading="lazy"></div>
      <div>
        <${h}>${esc(p.title)}</${h}>
        <p class="sub" lang="en">${esc(p.sub)}</p>
        <p class="desc">Le cadre qui oriente l'action de Caritas Africa et de ses organisations membres jusqu'en 2030.</p>
        <div class="files">${filesHTML(p, true)}</div>
      </div>`;
  }

  /* ---------- En-tête, tiroir, langues, lettre ---------- */
  function initChrome() {
    const drawer = $("#drawer");
    $$("[data-drawer-open]").forEach((b) => b.addEventListener("click", () => drawer.showModal()));
    $$("[data-drawer-close]").forEach((b) => b.addEventListener("click", () => drawer.close()));
    drawer && drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("nav a, .drawer-actions a")) drawer.close(); });
    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
      if (b.getAttribute("aria-current") === "true") return;
      toast(b.dataset.lang === "en" ? "Mock-up: only the French version is prototyped." : "Maquete: apenas a versão francesa foi prototipada.");
    }));
    const f = $("#nl-form");
    if (f) {
      const field = $(".field", f), inp = $("input", f);
      inp.addEventListener("input", () => { field.classList.remove("has-err"); inp.removeAttribute("aria-invalid"); });
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        field.classList.toggle("has-err", !ok); inp.setAttribute("aria-invalid", !ok);
        if (!ok) { inp.focus(); return; }
        $("#nl-ok").hidden = false; f.reset();
      });
    }
  }

  /* ---------- Révélations à l'entrée dans l'écran (une fois) ---------- */
  function initRise() {
    const els = $$(".rise");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Chiffres qui montent quand l'étape entre ---------- */
  function initCounters() {
    const nf = (v, d) => v.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
    const run = (el) => {
      const to = parseFloat(el.dataset.to), d = parseInt(el.dataset.dec || "0", 10);
      if (reduce) { el.textContent = nf(to, d); return; }
      const t0 = performance.now(), dur = 1300;
      const tick = (t) => { const k = easeOut(clamp((t - t0) / dur)); el.textContent = nf(to * k, d); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    };
    const els = $$("[data-to]");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.8 });
    els.forEach((e) => { if (!reduce) e.textContent = "0"; io.observe(e); });
  }

  /* ---------- Boucle de scroll unique ---------- */
  const scenes = [];
  let vh = innerHeight, vw = innerWidth, ticking = false;
  const metric = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, h: el.offsetHeight }; };
  const progress = (m) => clamp((scrollY - m.top) / Math.max(1, m.h - vh));
  function measure() { vh = innerHeight; vw = innerWidth; scenes.forEach((s) => s.measure && s.measure()); frame(); }
  function frame() { ticking = false; scenes.forEach((s) => s.update()); }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  function sceneProgressBar() {
    const header = $(".site-header");
    if (!header) return;
    scenes.push({ update() { const max = document.documentElement.scrollHeight - vh; header.style.setProperty("--read", (clamp(scrollY / Math.max(1, max))).toFixed(4)); } });
  }

  function sceneOpen() {
    const el = $("#ouverture");
    if (!el || reduce) return;
    let m;
    scenes.push({
      measure() { m = metric(el); },
      update() {
        const p = progress(m);
        el.style.setProperty("--lift", clamp(p / 0.3).toFixed(4));
        el.style.setProperty("--e", easeInOut(clamp((p - 0.04) / 0.5)).toFixed(4));
        el.style.setProperty("--shade", clamp((p - 0.42) / 0.25).toFixed(4));
        el.style.setProperty("--say", easeOut(clamp((p - 0.55) / 0.22)).toFixed(4));
      },
    });
  }

  function sceneInk() {
    $$("[data-ink]").forEach((el) => {
      const words = splitWords(el);
      if (reduce) { words.forEach((w) => w.classList.add("on")); return; }
      let lit = -1;
      scenes.push({
        update() {
          const r = el.getBoundingClientRect();
          const k = clamp((vh * 0.88 - r.top) / (vh * 0.88 - vh * 0.3 + r.height * 0.6));
          const n = Math.ceil(k * words.length);
          if (n === lit) return; lit = n;
          words.forEach((w, i) => w.classList.toggle("on", i < n));
        },
      });
    });
  }

  function sceneNetwork() {
    const el = $("#reseau"), list = $("#zones"), count = $("#net-count");
    if (!el) return;
    list.innerHTML = ZONES.map((z) => `<li class="zone"><span class="zone-code">${z.code}</span><span class="zone-region">${esc(z.region)}</span><p class="zone-who"><b>${esc(z.caritas)}</b> · ${esc(z.person)}</p><div class="zone-detail"><div><p>${esc(z.role)}</p></div></div></li>`).join("");
    const items = $$(".zone", list);
    if (reduce) { items.forEach((z) => z.classList.add("on")); return; }
    let m, last = -2;
    scenes.push({
      measure() { m = metric(el); },
      update() {
        const p = progress(m);
        count.textContent = Math.round(46 * easeOut(clamp(p / 0.26)));
        const idx = p < 0.3 ? -1 : Math.min(items.length - 1, Math.floor(((p - 0.3) / 0.62) * items.length));
        if (idx === last) return; last = idx;
        items.forEach((z, i) => { z.classList.toggle("on", i <= idx); z.classList.toggle("now", i === idx); });
      },
    });
  }

  function sceneTrack() {
    const el = $("#action"), track = $("#track");
    if (!el || reduce) return;
    const panels = $$(".panel", track), meter = $(".act-meter", el);
    const HOLD = 0.1; /* la piste reste immobile le temps de lire l'introduction */
    let m, maxX = 0;
    scenes.push({
      measure() {
        maxX = Math.max(0, track.scrollWidth - vw);
        el.style.setProperty("--track-h", (maxX / (1 - HOLD) + vh) + "px");
        m = metric(el);
      },
      update() {
        const p = progress(m), x = clamp((p - HOLD) / (1 - HOLD)) * maxX;
        track.style.setProperty("--x", x.toFixed(1));
        meter && meter.style.setProperty("--p", p.toFixed(4));
        panels.forEach((pn) => {
          const c = pn.offsetLeft - x + pn.offsetWidth / 2;
          pn.style.setProperty("--par", clamp((c - vw / 2) / vw, -1, 1).toFixed(3) * -4);
        });
      },
    });
    /* Le clavier suit la piste : un lien focalisé ramène sa vignette à l'écran */
    track.addEventListener("focusin", (e) => {
      const pn = e.target.closest(".panel");
      if (!pn || !m) return;
      const x = clamp(pn.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), 0, maxX);
      window.scrollTo({ top: m.top + (maxX ? (HOLD + (x / maxX) * (1 - HOLD)) * (m.h - vh) : 0), behavior: "auto" });
    });
  }

  function sceneMission() {
    const el = $("#mission");
    if (!el) return;
    const panes = $$(".mv-pane", el);
    const lines = panes.map((p) => splitPhrases($("[data-lines]", p)));
    if (reduce) { lines.flat().forEach((l) => l.classList.add("on")); return; }
    let m;
    scenes.push({
      measure() { m = metric(el); },
      update() {
        const p = progress(m), cur = p < 0.5 ? 0 : 1;
        el.style.setProperty("--p", p.toFixed(4));
        panes.forEach((pn, i) => pn.toggleAttribute("data-off", i !== cur));
        const local = cur === 0 ? clamp((p - 0.04) / 0.36) : clamp((p - 0.56) / 0.36);
        const n = Math.ceil(local * lines[cur].length);
        lines[cur].forEach((l, i) => l.classList.toggle("on", i < n));
      },
    });
  }

  function sceneRail() {
    const rail = $("#rail"), nav = $(".rail-nav");
    const chapters = $$("[data-chapter]");
    if (!rail || !chapters.length) return;
    rail.innerHTML = chapters.map((c) => `<li><a href="#${c.id}"><span>${esc(c.dataset.chapter)}</span></a></li>`).join("");
    const links = $$("a", rail);
    let ms = [], cur = -1;
    scenes.push({
      measure() { ms = chapters.map(metric); },
      update() {
        const y = scrollY + vh * 0.5;
        let i = 0; ms.forEach((m, k) => { if (m.top <= y) i = k; });
        if (i !== cur) { cur = i; links.forEach((a, k) => a.setAttribute("aria-current", k === i)); }
        const th = chapters[i].dataset.theme || "day";
        if (nav.dataset.theme !== th) nav.dataset.theme = th;
        nav.toggleAttribute("data-off", chapters[i].dataset.rail === "off");
      },
    });
  }

  function sceneParallax() {
    const img = $(".page-open > img");
    if (!img || reduce) return;
    scenes.push({ update() { if (scrollY < vh * 1.2) img.style.setProperty("--py", (scrollY * 0.22).toFixed(1)); } });
  }

  /* ---------- Accueil : données ---------- */
  function renderHome() {
    $("#news-list").innerHTML = NEWS.map((n) => `<li><a href="${n.url}"><strong${n.lang === "EN" ? ' lang="en"' : ""}>${esc(n.title)}</strong><span class="meta"><span>${n.type}</span><time datetime="${n.date}">${date(n.date)}</time>${n.lang === "EN" ? "<span>En anglais</span>" : ""}</span>${ic("arrow-right")}</a></li>`).join("");
    $("#jobs-list").innerHTML = JOBS.map((n) => `<li><a href="${n.url}"><strong>${esc(n.title)}</strong><span><b>${n.type}</b> · Publié le ${date(n.date)}</span></a></li>`).join("");
    $("#feature-pub").innerHTML = featureHTML(PUBS.find((p) => p.id === "cadre"));
    $("#shelf").innerHTML = PUBS.filter((p) => p.type === "rapport").sort((a, b) => b.year - a.year).slice(0, 6).map((p, i) => pubHTML(p, i)).join("");
  }

  /* ---------- Qui sommes-nous ---------- */
  function renderAbout() {
    $("#values").innerHTML = VALUES.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#zones-rows").innerHTML = ZONES.map((z) => `<tr><td>${z.code}<small>${esc(z.region)}</small></td><td>${esc(z.caritas)}</td><td>${esc(z.person)}<small>${esc(z.role)}</small></td></tr>`).join("");
    $("#team").innerHTML = TEAM.map((g) => `<div class="team-group"><h3>${g.group}</h3><ul class="team">${g.people.map((p) => `<li><strong>${esc(p.name)}</strong><span>${esc(p.role)}</span><em>${p.country}</em></li>`).join("")}</ul></div>`).join("");
    if ("IntersectionObserver" in window) {
      const links = $$(".toc a"), map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
      const io = new IntersectionObserver((ents) => {
        const vis = ents.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) links.forEach((a) => a.setAttribute("aria-current", a === map.get(vis[0].target.id)));
      }, { rootMargin: "-30% 0px -60% 0px" });
      map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
      const vio = new IntersectionObserver((ents) => ents.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)), { rootMargin: "-42% 0px -42% 0px" });
      $$("#values > div").forEach((d) => vio.observe(d));
    }
  }

  /* ---------- Ressources ---------- */
  function placeThumb(seg, animate) {
    const thumb = $(".seg-thumb", seg), lab = $("input:checked + label", seg);
    if (!thumb || !lab) return;
    thumb.classList.toggle("anim", !!animate && !reduce);
    thumb.style.transform = `translate(${lab.offsetLeft}px, ${lab.offsetTop}px) scale(${lab.offsetWidth / 100}, ${lab.offsetHeight / 100})`;
  }
  function renderLibrary() {
    $("#lib-feature").innerHTML = featureHTML(PUBS.find((p) => p.id === "cadre"), "h2");
    const grid = $("#lib-grid"), count = $("#lib-count"), q = $("#lib-q"), lang = $("#lib-lang"), seg = $("#lib-type");
    const params = new URLSearchParams(location.search);
    ($(`input[name="type"][value="${params.get("type") || ""}"]`, seg) || $('input[name="type"][value=""]', seg)).checked = true;
    lang.value = params.get("langue") || ""; q.value = params.get("q") || "";
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const render = (animate) => {
      const type = $('input[name="type"]:checked', seg).value, l = lang.value, text = norm(q.value.trim());
      const list = PUBS.filter((p) => p.id !== "cadre" || type || l || text).filter((p) => !type || p.type === type).filter((p) => !l || p.files[l])
        .filter((p) => !text || norm(`${p.title} ${p.sub} ${p.date} ${TYPE_LABEL[p.type]}`).includes(text)).sort((a, b) => b.year - a.year);
      count.innerHTML = list.length ? `<strong class="num">${list.length}</strong> document${list.length > 1 ? "s" : ""}` : "Aucun document";
      grid.innerHTML = list.length ? list.map((p) => pubHTML(p).replace(' rise"', '"')).join("") : `<div class="empty" role="status"><h2>Aucun document ne correspond</h2><p>Essayez une autre langue ou un autre mot, ou affichez toute la bibliothèque.</p><button class="btn btn-line btn-sm" type="button" data-reset>Afficher tous les documents</button></div>`;
      $$(".pub", grid).forEach((c, i) => { c.style.animation = animate ? "" : "none"; c.style.animationDelay = Math.min(i, 8) * 40 + "ms"; });
      const s = new URLSearchParams(); if (type) s.set("type", type); if (l) s.set("langue", l); if (q.value.trim()) s.set("q", q.value.trim());
      history.replaceState(null, "", "ressources.html" + (s.toString() ? "?" + s : ""));
    };
    $$('input[name="type"]', seg).forEach((r) => r.addEventListener("change", () => { placeThumb(seg, true); render(true); }));
    lang.addEventListener("change", () => render(true));
    let deb; q.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(() => render(false), 120); });
    grid.addEventListener("click", (e) => {
      if (!e.target.closest("[data-reset]")) return;
      $('input[name="type"][value=""]', seg).checked = true; lang.value = ""; q.value = "";
      placeThumb(seg, true); render(true);
    });
    render(false);
    const re = () => placeThumb(seg, false);
    requestAnimationFrame(re); addEventListener("resize", re); document.fonts && document.fonts.ready.then(re);
  }

  /* ---------- Démarrage ---------- */
  initChrome();
  $$("[data-words]").forEach(splitWords);
  const page = document.body.dataset.page;
  if (page === "home") { renderHome(); sceneOpen(); sceneInk(); sceneNetwork(); sceneTrack(); sceneMission(); sceneRail(); }
  if (page === "about") { renderAbout(); sceneParallax(); }
  if (page === "library") { renderLibrary(); sceneParallax(); }
  sceneProgressBar();
  initRise();
  initCounters();
  if (!reduce) root.classList.add("load");
  measure();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => requestAnimationFrame(measure));
  addEventListener("load", measure);
  document.fonts && document.fonts.ready.then(measure);
})();
