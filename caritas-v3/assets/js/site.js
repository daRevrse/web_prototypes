/* Caritas Africa v3 — le site v1 raconté au défilement (aucune dépendance). */
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
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2800);
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
        <p class="sub">${esc(p.sub)}</p>
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
    drawer && drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("nav a")) drawer.close(); });
    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
      if (b.getAttribute("aria-current") === "true") return;
      toast(b.dataset.lang === "en" ? "Maquette : seule la version française est prototypée." : "Maquete: apenas a versão francesa foi prototipada.");
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

  /* ---------- Réseau : six zones en onglets (accueil et page Notre réseau) ---------- */
  function initZones() {
    const tabs = $("#zone-tabs"), panel = $("#zone-panel"), rule = $(".tab-rule", tabs);
    tabs.insertAdjacentHTML("afterbegin", ZONES.map((z, i) =>
      `<button class="tab" role="tab" id="tab-${z.id}" aria-controls="zone-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><strong>${z.code}</strong><span>${esc(z.region)}</span></button>`).join(""));
    const btns = $$(".tab", tabs);
    const placeRule = (b, animate) => {
      rule.classList.toggle("anim", !!animate && !reduceMotion);
      rule.style.transform = `translateX(${b.offsetLeft}px) scaleX(${b.offsetWidth / 100})`;
    };
    const show = (i, how) => {
      const z = ZONES[i];
      btns.forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "tab-" + z.id);
      panel.innerHTML = `<div><p class="zone-name">${z.code}</p><p class="zone-region">${esc(z.region)}</p>${typeof ZONE_FULL !== "undefined" ? `<p class="zone-full"${["amecea", "imbisa"].includes(z.id) ? ' lang="en"' : ""}>${esc(ZONE_FULL[z.id])}</p>` : ""}</div>
        <dl class="zone-coord">
          <dt>Caritas coordinatrice de la zone</dt><dd>${esc(z.caritas)}</dd>
          <dt>Coordination</dt><dd>${esc(z.person)}<small>${esc(z.role)}</small></dd>
        </dl>`;
      if (how === "pointer" && !reduceMotion) { panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap"); }
      placeRule(btns[i], how === "pointer");
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
  }

  /* ---------- Accueil ---------- */
  function initHome() {
    /* Publications */
    const byId = (id) => PUBS.find((p) => p.id === id);
    $("#feature-pub").innerHTML = featureHTML(byId("cadre"));
    $("#home-pubs").innerHTML = ["r2023", "cooperation", "amour", "r2022"].map((id) => pubHTML(byId(id))).join("");
    $$("#home-pubs .pub").forEach((c, i) => { c.classList.add("rise"); c.style.setProperty("--d", i); });

    /* Déclarations et appels d'offres */
    $("#news-list").innerHTML = NEWS.map((n) => `<li><a href="${n.url}"><strong${n.lang === "EN" ? ' lang="en"' : ""}>${esc(n.title)}</strong><span class="meta"><span class="t">${n.type}</span><time datetime="${n.date}">${date(n.date)}</time>${n.lang === "EN" ? "<span>En anglais</span>" : ""}</span></a></li>`).join("");
    $("#jobs-list").innerHTML = JOBS.map((n) => `<li><a href="${n.url}"><strong>${esc(n.title)}</strong><span class="meta"><span class="t">${n.type}</span><time datetime="${n.date}">Publié le ${date(n.date)}</time></span></a></li>`).join("");
  }

  /* ---------- Qui sommes-nous ---------- */
  function initAbout() {
    $("#values").innerHTML = VALUES.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#zones-rows").innerHTML = ZONES.map((z) => `<tr><td>${z.code}<small>${esc(z.region)}</small></td><td>${esc(z.caritas)}</td><td>${esc(z.person)}<small>${esc(z.role)}</small></td></tr>`).join("");
    $("#team").innerHTML = TEAM.map((g) => `<div class="team-group"><h3>${g.group}</h3><ul class="team">${g.people.map((p) => `<li><strong>${esc(p.name)}</strong><span>${esc(p.role)}</span><em>${p.country}</em></li>`).join("")}</ul></div>`).join("");

    /* Sommaire : section en cours */
    const links = $$(".toc a");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const set = (id) => links.forEach((a) => a.setAttribute("aria-current", a === map.get(id)));
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) set(vis[0].target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
    set(links[0].getAttribute("href").slice(1));
  }

  /* ---------- Ressources ---------- */
  function initLibrary() {
    $("#lib-feature").innerHTML = featureHTML(PUBS.find((p) => p.id === "cadre"), "h2");
    const grid = $("#lib-grid"), count = $("#lib-count"), q = $("#lib-q"), lang = $("#lib-lang");
    const seg = $("#lib-type"), thumb = $(".seg-thumb", seg);
    const params = new URLSearchParams(location.search);
    const t0 = params.get("type") || "";
    const r0 = $(`input[name="type"][value="${t0}"]`, seg) || $('input[name="type"][value=""]', seg);
    r0.checked = true;
    lang.value = params.get("langue") || "";
    q.value = params.get("q") || "";

    const placeThumb = (animate) => {
      const lab = $("input:checked + label", seg);
      thumb.classList.toggle("anim", !!animate && !reduceMotion);
      thumb.style.transform = `translate(${lab.offsetLeft}px, ${lab.offsetTop}px) scale(${lab.offsetWidth / 100}, ${lab.offsetHeight / 100})`;
    };
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const render = (animate) => {
      const type = $('input[name="type"]:checked', seg).value, l = lang.value, text = norm(q.value.trim());
      const list = PUBS.filter((p) => p.id !== "cadre" || type || l || text)
        .filter((p) => !type || p.type === type)
        .filter((p) => !l || p.files[l])
        .filter((p) => !text || norm(`${p.title} ${p.sub} ${p.date} ${TYPE_LABEL[p.type]}`).includes(text))
        .sort((a, b) => b.year - a.year);
      count.innerHTML = list.length ? `<strong>${list.length}</strong> document${list.length > 1 ? "s" : ""}` : "Aucun document";
      grid.innerHTML = list.length ? list.map(pubHTML).join("") : `<div class="empty" role="status"><h2>Aucun document ne correspond</h2><p>Essayez une autre langue ou un autre mot, ou affichez toute la bibliothèque.</p><button class="btn btn-line btn-sm" type="button" data-reset>Afficher tous les documents</button></div>`;
      if (!animate) $$(".pub", grid).forEach((c) => (c.style.animation = "none"));
      else $$(".pub", grid).forEach((c, i) => (c.style.animationDelay = Math.min(i, 8) * 40 + "ms"));
      const p = new URLSearchParams();
      if (type) p.set("type", type); if (l) p.set("langue", l); if (q.value.trim()) p.set("q", q.value.trim());
      history.replaceState(null, "", "ressources.html" + (p.toString() ? "?" + p : ""));
    };
    $$('input[name="type"]', seg).forEach((r) => r.addEventListener("change", () => { placeThumb(true); render(true); }));
    lang.addEventListener("change", () => render(true));
    let deb; q.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(() => render(false), 120); });
    grid.addEventListener("click", (e) => {
      if (!e.target.closest("[data-reset]")) return;
      $('input[name="type"][value=""]', seg).checked = true; lang.value = ""; q.value = "";
      placeThumb(true); render(true);
    });
    render(false);
    requestAnimationFrame(() => placeThumb(false));
    window.addEventListener("resize", () => placeThumb(false));
    document.fonts && document.fonts.ready.then(() => placeThumb(false));
  }

  /* ---------- Nouvelles pages : outils partagés ---------- */
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const LANG_NAME = { FR: "Français", EN: "Anglais", PT: "Portugais" };

  function segThumb(seg) {
    const thumb = $(".seg-thumb", seg);
    const place = (animate) => {
      const lab = $("input:checked + label", seg);
      if (!lab || !thumb) return;
      thumb.classList.toggle("anim", !!animate && !reduceMotion);
      thumb.style.transform = `translate(${lab.offsetLeft}px, ${lab.offsetTop}px) scale(${lab.offsetWidth / 100}, ${lab.offsetHeight / 100})`;
    };
    $$("input", seg).forEach((r) => r.addEventListener("change", () => place(true)));
    requestAnimationFrame(() => place(false));
    window.addEventListener("resize", () => place(false));
    document.fonts && document.fonts.ready.then(() => place(false));
    return place;
  }

  function initToc() {
    const links = $$(".toc a");
    if (!links.length) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const set = (id) => links.forEach((a) => a.setAttribute("aria-current", a === map.get(id)));
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) set(vis[0].target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
    set(links[0].getAttribute("href").slice(1));
  }

  function docItem(n) {
    return `<li><article class="doc-item">
      <p class="meta"><span class="t">${n.type}</span><time datetime="${n.date}">${date(n.date)}</time>${n.lang !== "FR" ? "<span>En anglais</span>" : ""}</p>
      <h3><a href="${n.url}"${n.lang === "EN" ? ' lang="en"' : ""}>${esc(n.title)}</a></h3>
      ${n.sub ? `<p class="sub">${esc(n.sub)}</p>` : ""}
      ${n.pdf ? `<div class="files"><a class="file" href="${n.pdf}" target="_blank" rel="noopener" aria-label="${esc(n.title)}, PDF en ${LANG_NAME[n.lang].toLowerCase()}">${ic("file-down")}<span>PDF</span> <abbr title="${LANG_NAME[n.lang]}">${n.lang}</abbr></a></div>` : ""}
    </article></li>`;
  }
  function jobItem(j) {
    const onlyEn = j.langs.length === 1 && j.langs[0] === "EN";
    return `<li><article class="doc-item">
      <p class="meta"><span class="t">${j.type}</span><time datetime="${j.date}">Publié le ${date(j.date)}</time><span>Avis en ${j.langs.map((l) => LANG_NAME[l].toLowerCase()).join(", ")}</span></p>
      <h3><a href="${j.url}"${onlyEn ? ' lang="en"' : ""}>${esc(j.title)}</a></h3>
    </article></li>`;
  }

  /* Liste filtrable : type (contrôle segmenté), langue facultative, recherche, compteur */
  function filterable({ seg, radio, all, lang, q, list, count, rows, match, item, noun, nouns, emptyTitle }) {
    const place = segThumb(seg);
    const k0 = new URLSearchParams(location.search).get("type");
    if (k0) { const r = $(`input[value="${k0}"]`, seg); if (r) r.checked = true; }
    const render = () => {
      const k = $(`input[name="${radio}"]:checked`, seg).value, l = lang ? lang.value : "", t = norm(q.value.trim());
      const out = rows.filter((r) => (!k || r.kind === k) && (!l || r.lang === l) && (!t || norm(match(r)).includes(t)));
      count.innerHTML = out.length ? `<strong>${out.length}</strong> ${out.length > 1 ? nouns : noun}` : `Aucun résultat`;
      list.innerHTML = out.length ? out.map(item).join("") : `<li class="empty" role="status"><h2>${emptyTitle}</h2><p>Essayez un autre type ou un autre mot.</p><button class="btn btn-line btn-sm" type="button" data-reset>Tout afficher</button></li>`;
    };
    $$("input", seg).forEach((r) => r.addEventListener("change", render));
    lang && lang.addEventListener("change", render);
    let deb; q.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(render, 120); });
    list.addEventListener("click", (e) => {
      if (!e.target.closest("[data-reset]")) return;
      all.checked = true; if (lang) lang.value = ""; q.value = "";
      place(true); render();
    });
    render(); place(false);
  }

  /* ---------- Notre réseau ---------- */
  function initNetwork() {
    initZones();
    $("#network-news").innerHTML = NEWS_ALL.filter((n) => n.kind === "reseau").map(docItem).join("");
  }

  /* ---------- Nos actions ---------- */
  function initActions() {
    initToc();
    $("#approche-steps").innerHTML = APPROCHE_STEPS.map((s) => `<li><time>${s.date}</time><p>${esc(s.text)}</p></li>`).join("");
    $("#rechange-members").innerHTML = RECHANGE_MEMBERS.map((m) => `<li>${esc(m)}</li>`).join("");
    $("#declarations").innerHTML = NEWS_ALL.filter((n) => n.kind === "declaration").map(docItem).join("");
    $("#chantiers-list").innerHTML = JOBS_ALL.filter((j) => j.kind === "consultance").map(jobItem).join("");
  }

  /* ---------- Actualités ---------- */
  function initNews() {
    filterable({
      seg: $("#news-kind"), radio: "kind", all: $("#k-all"), lang: $("#news-lang"), q: $("#news-q"),
      list: $("#news-all"), count: $("#news-count"), rows: NEWS_ALL, item: docItem,
      match: (n) => `${n.title} ${n.sub} ${n.type}`, noun: "publication", nouns: "publications",
      emptyTitle: "Aucune publication ne correspond",
    });
  }

  /* ---------- Emplois et appels d'offres ---------- */
  function initJobs() {
    filterable({
      seg: $("#job-kind"), radio: "jkind", all: $("#j-all"), lang: null, q: $("#job-q"),
      list: $("#jobs-all"), count: $("#job-count"), rows: JOBS_ALL, item: jobItem,
      match: (j) => `${j.title} ${j.type}`, noun: "avis", nouns: "avis",
      emptyTitle: "Aucun avis ne correspond",
    });
  }

  /* ---------- Contact ---------- */
  function initContact() {
    const f = $("#contact-form");
    if (!f) return;
    const rules = [
      ["#c-nom", (v) => v.trim().length > 0],
      ["#c-prenom", (v) => v.trim().length > 0],
      ["#c-mail", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
      ["#c-objet", (v) => v.trim().length > 0],
      ["#c-msg", (v) => v.trim().length > 0],
    ];
    rules.forEach(([sel]) => $(sel).addEventListener("input", (e) => {
      e.target.closest(".field").classList.remove("has-err"); e.target.removeAttribute("aria-invalid");
    }));
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      let first = null;
      rules.forEach(([sel, ok]) => {
        const inp = $(sel), bad = !ok(inp.value);
        inp.closest(".field").classList.toggle("has-err", bad);
        inp.setAttribute("aria-invalid", bad);
        if (bad && !first) first = inp;
      });
      if (first) { first.focus(); return; }
      $("#contact-ok").hidden = false; f.reset();
    });
  }

  /* =====================================================================
     v3 : récit au défilement. Une seule boucle pilote toutes les scènes.
     ===================================================================== */
  const root = document.documentElement;
  const reduce = root.classList.contains("rm") || reduceMotion;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

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

  const scenes = [];
  let vh = innerHeight, vw = root.clientWidth, hh = 0, sh = 0, ticking = false;
  const header = $(".site-header");
  const metric = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, h: el.offsetHeight }; };
  /* Progression d'une section épinglée sous l'en-tête : 0 à l'accroche, 1 au décrochage */
  const progress = (m) => clamp((scrollY - (m.top - hh)) / Math.max(1, m.h - sh));
  /* sh : hauteur réelle d'une scène épinglée (100svh moins l'en-tête), lue sur la page plutôt que sur innerHeight */
  function measure() {
    vh = innerHeight; vw = root.clientWidth; hh = header ? header.offsetHeight : 0;
    const stage = $(".act-stage, .open-stage, .mv-stage, .net-stage");
    sh = stage ? stage.clientHeight : vh - hh;
    scenes.forEach((s) => s.measure && s.measure()); frame();
  }
  function frame() { ticking = false; scenes.forEach((s) => s.update()); }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  function sceneRead() {
    if (!header) return;
    scenes.push({ update() { header.style.setProperty("--read", clamp(scrollY / Math.max(1, root.scrollHeight - vh)).toFixed(4)); } });
  }

  function sceneOpen() {
    const el = $("#ouverture");
    if (!el) return;
    const fig = $(".open-media", el), img = $("img", fig), R = 1430 / 1310, FX = 0.58, FY = 0.4;
    const narrow = matchMedia("(max-width: 1040px)");
    let m;
    scenes.push({
      /* La photo couvre exactement la fenêtre de la v1 au repos, puis tout l'écran */
      measure() {
        m = metric(el);
        const W = fig.clientWidth, H = fig.clientHeight;
        const Wf = Math.max(W, H * R), Hf = Wf / R;
        const win = narrow.matches ? { l: 0, t: 0, w: W, h: H * 0.44 } : { l: W * 0.575, t: 0, w: W * 0.425, h: H };
        const Wr = Math.max(win.w, win.h * R), Hr = Wr / R;
        const set = (k, v) => fig.style.setProperty(k, v);
        set("--wf", Wf.toFixed(1) + "px"); set("--hf", Hf.toFixed(1) + "px"); set("--s0", (Wr / Wf).toFixed(4));
        set("--x0", (win.l + (win.w - Wr) * FX).toFixed(1) + "px"); set("--y0", (win.t + (win.h - Hr) * FY).toFixed(1) + "px");
        set("--x1", ((W - Wf) * FX).toFixed(1) + "px"); set("--y1", ((H - Hf) * FY).toFixed(1) + "px");
        img.style.objectFit = "fill";
      },
      update() {
        if (reduce) return;
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
          const k = clamp((vh * 0.86 - r.top) / (vh * 0.56 + r.height * 0.6));
          const n = Math.ceil(k * words.length);
          if (n === lit) return; lit = n;
          words.forEach((w, i) => w.classList.toggle("on", i < n));
        },
      });
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
        el.style.setProperty("--wipe", easeInOut(clamp((p - 0.42) / 0.16)).toFixed(4));
        panes.forEach((pn, i) => pn.toggleAttribute("data-off", i !== cur));
        const local = cur === 0 ? clamp((p - 0.04) / 0.34) : clamp((p - 0.56) / 0.34);
        const n = Math.ceil(local * lines[cur].length);
        lines[cur].forEach((l, i) => l.classList.toggle("on", i < n));
      },
    });
  }

  function sceneTrack() {
    const el = $("#actions"), track = $("#track");
    if (!el || !track || reduce) return;
    const panels = $$(".panel", track);
    const HOLD = 0.1; /* la piste reste immobile le temps de lire l'introduction */
    let m, maxX = 0;
    scenes.push({
      measure() {
        maxX = Math.max(0, track.scrollWidth - vw);
        el.style.setProperty("--track-h", `calc(${(maxX / (1 - HOLD)).toFixed(1)}px + var(--stage-h))`);
        m = metric(el);
      },
      update() {
        const p = progress(m), x = clamp((p - HOLD) / (1 - HOLD)) * maxX;
        track.style.setProperty("--x", x.toFixed(1));
        el.style.setProperty("--p", p.toFixed(4));
        panels.forEach((pn) => {
          const c = pn.offsetLeft - x + pn.offsetWidth / 2;
          pn.style.setProperty("--par", (clamp((c - vw / 2) / vw, -1, 1) * -4).toFixed(3));
        });
      },
    });
    /* Le clavier suit la piste : un lien focalisé ramène son panneau à l'écran */
    track.addEventListener("focusin", (e) => {
      const pn = e.target.closest(".panel");
      if (!pn || !m) return;
      const x = clamp(pn.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), 0, maxX);
      const span = m.h - sh;
      /* après le défilement natif du focus, qu'il faut remplacer */
      setTimeout(() => {
        $(".act-stage", el).scrollLeft = 0;
        window.scrollTo({ top: m.top - hh + (maxX ? (HOLD + (x / maxX) * (1 - HOLD)) * span : 0), behavior: "auto" });
      }, 0);
    });
  }

  function sceneNetwork() {
    const el = $("#reseau"), list = $("#zones"), count = $("#net-count");
    if (!el || !list) return;
    list.innerHTML = ZONES.map((z) => `<li class="zone"><span class="zn-code">${z.code}</span><span class="zn-region">${esc(z.region)}</span><p class="zn-who"><b>${esc(z.caritas)}</b>, ${esc(z.person)}</p><div class="zn-detail"><div><p>${esc(z.role)}</p></div></div></li>`).join("");
    const items = $$(".zone", list);
    if (reduce) { items.forEach((z) => z.classList.add("on")); return; }
    let m, last = -2;
    scenes.push({
      measure() { m = metric(el); },
      update() {
        const p = progress(m), span = m.h - sh;
        /* le compte commence quand le chiffre entre dans l'écran, et atteint 46 au premier quart de l'épinglage */
        count.textContent = Math.round(46 * easeOut(clamp((scrollY - (m.top - hh - 0.6 * sh)) / (0.6 * sh + 0.24 * span))));
        const idx = p < 0.3 ? -1 : Math.min(items.length - 1, Math.floor(((p - 0.3) / 0.62) * items.length));
        if (idx === last) return; last = idx;
        items.forEach((z, i) => { z.classList.toggle("on", i <= idx); z.classList.toggle("now", i === idx); });
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
        nav.toggleAttribute("data-off", chapters[i].dataset.rail === "off" || scrollY + vh > root.scrollHeight - 260);
      },
    });
  }

  /* Photo d'ouverture des pages intérieures : contenue, puis pleine largeur */
  function sceneWindow() {
    $$(".page-window").forEach((el) => {
      if (reduce) return;
      let m;
      scenes.push({
        measure() { m = metric(el); },
        update() {
          const begin = Math.max(0, m.top - vh), end = Math.max(begin + 1, m.top - hh - 40);
          el.style.setProperty("--k", (1 - easeInOut(clamp((scrollY - begin) / (end - begin)))).toFixed(4));
          el.style.setProperty("--pp", clamp((scrollY - begin) / Math.max(1, m.top + m.h - begin)).toFixed(4));
        },
      });
    });
  }

  /* Listes d'étapes qui s'allument dans l'ordre de lecture */
  function sceneSeq() {
    $$(".timeline, .org-steps").forEach((el) => {
      el.classList.add("seq");
      const run = () => {
        const items = $$(":scope > li", el);
        if (!items.length) return;
        if (reduce) { items.forEach((li) => li.classList.add("on")); el.style.setProperty("--fill", 1); return; }
        let lit = -1;
        scenes.push({
          update() {
            const r = el.getBoundingClientRect();
            const k = clamp((vh * 0.78 - r.top) / Math.max(1, r.height));
            el.style.setProperty("--fill", k.toFixed(4));
            const n = Math.ceil(k * items.length);
            if (n === lit) return; lit = n;
            items.forEach((li, i) => li.classList.toggle("on", i < n));
          },
        });
      };
      run();
    });
  }

  function initRise() {
    const els = $$(".rise");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
    els.forEach((e) => io.observe(e));
  }

  function initCounters() {
    const nf = (v, d) => v.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
    const els = $$("[data-to]");
    if (reduce || !("IntersectionObserver" in window)) return;
    const run = (el) => {
      const to = parseFloat(el.dataset.to), d = parseInt(el.dataset.dec || "0", 10), t0 = performance.now(), dur = 1300;
      const tick = (t) => { const k = easeOut(clamp((t - t0) / dur)); el.textContent = nf(to * k, d); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.8 });
    els.forEach((e) => { e.textContent = nf(0, parseInt(e.dataset.dec || "0", 10)); io.observe(e); });
  }

  /* Ce qui passe au centre de l'écran : étapes APPROCHE, valeurs */
  function initFocusBand() {
    const els = $$(".prog-steps .step, #values > div");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("on")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)), { rootMargin: "-38% 0px -38% 0px" });
    els.forEach((e) => io.observe(e));
  }

  function initStory() {
    $$("[data-words]").forEach(splitWords);
    const page = document.body.dataset.page;
    if (page === "home") { sceneOpen(); sceneInk(); sceneMission(); sceneTrack(); sceneNetwork(); sceneRail(); }
    sceneWindow();
    sceneSeq();
    sceneRead();
    initRise();
    initCounters();
    initFocusBand();
    if (!reduce) root.classList.add("load");
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    /* La barre d'adresse mobile qui apparaît ou disparaît ne doit pas recalculer les scènes */
    let lastW = innerWidth;
    addEventListener("resize", () => {
      if (innerWidth === lastW && Math.abs(innerHeight - vh) < 160) { vh = innerHeight; onScroll(); return; }
      lastW = innerWidth; requestAnimationFrame(measure);
    });
    addEventListener("load", measure);
    document.fonts && document.fonts.ready.then(measure);
  }

  initHeader();
  initNewsletter();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "about") initAbout();
  if (page === "library") initLibrary();
  if (page === "network") initNetwork();
  if (page === "actions") initActions();
  if (page === "news") initNews();
  if (page === "jobs") initJobs();
  if (page === "contact") initContact();
  initStory();
})();
