/* 228 Villa — comportements du prototype (aucune dépendance). */
(function () {
  "use strict";

  /* ---------- Utilitaires ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const NF = new Intl.NumberFormat("fr-FR");
  const fmt = (n) => NF.format(n).replace(/[\u202F\u00A0\s]/g, "\u00A0");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;
  const termLabel = (t) => (t === "long" ? "Longue durée" : "Court terme");
  const photo = (v, i, sm) => `assets/img/villas/${v.id}/${String(i).padStart(2, "0")}${sm ? "-sm" : ""}.jpg`;
  const byId = (id) => VILLAS.find((v) => v.id === id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
  };
  let favs = new Set(store.get("228v-favs", []));

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function swapText(el, text) {
    if (el.textContent === text) return;
    el.textContent = text;
    if (!reduceMotion && el.animate) {
      el.animate([{ filter: "blur(2px)", opacity: 0.4 }, { filter: "blur(0)", opacity: 1 }], { duration: 220, easing: EASE });
    }
  }

  function waLink(text) { return `https://wa.me/${AGENT.whatsapp}?text=${encodeURIComponent(text)}`; }

  /* ---------- Filtres ---------- */
  function matches(v, s) {
    if (s.quartier && v.quartier !== s.quartier) return false;
    if (s.chambres && v.bedrooms < +s.chambres) return false;
    if (s.budget && v.price > +s.budget) return false;
    if (s.duree && v.term !== s.duree) return false;
    if (s.meublee && v.furnished !== true) return false;
    return true;
  }
  const readParams = () => {
    const p = new URLSearchParams(location.search);
    return { quartier: p.get("quartier") || "", chambres: p.get("chambres") || "", budget: p.get("budget") || "", duree: p.get("duree") || "", meublee: p.get("meublee") === "1", tri: p.get("tri") || "" };
  };
  const toQuery = (s) => {
    const p = new URLSearchParams();
    ["quartier", "chambres", "budget", "duree", "tri"].forEach((k) => s[k] && p.set(k, s[k]));
    if (s.meublee) p.set("meublee", "1");
    const q = p.toString();
    return q ? "?" + q : "";
  };

  /* ---------- Cartes ---------- */
  function heartBtn(v) {
    const on = favs.has(v.id);
    return `<button class="heart" type="button" data-fav="${v.id}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Enregistrer"} : ${esc(v.title)}"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heart"/></svg></button>`;
  }

  function mediaHTML(v, max) {
    const n = Math.min(v.photos, max);
    const href = `villa.html?ref=${v.id}`;
    const slides = Array.from({ length: n }, (_, i) =>
      `<a class="slide" href="${href}" tabindex="-1" aria-hidden="true"><img src="${photo(v, i + 1, true)}" alt="" loading="lazy" decoding="async" width="720" height="540"></a>`
    ).join("");
    return `<div class="media" data-carousel>
      <div class="track">${slides}</div>
      ${n > 1 ? `<button class="media-nav prev" type="button" aria-label="Photo précédente" hidden>${ic("chevron-left", "i-sm")}</button>
      <button class="media-nav next" type="button" aria-label="Photo suivante">${ic("chevron-right", "i-sm")}</button>
      <div class="dots" aria-hidden="true">${"<i></i>".repeat(n)}</div>` : ""}
      ${v.badge ? `<span class="badge">${esc(v.badge)}</span>` : ""}
      ${heartBtn(v)}
    </div>`;
  }

  function cardHTML(v) {
    const loc = v.area && v.area !== v.quartier ? `${v.quartier} · ${v.area}` : v.quartier;
    const facts = [plural(v.bedrooms, "chambre", "chambres"), `${v.bathrooms} sdb`, v.furnished ? "meublée" : null].filter(Boolean).join(" · ");
    return `<article class="card" data-id="${v.id}">
      ${mediaHTML(v, 5)}
      <div class="card-body">
        <div class="card-top"><h3 class="card-title"><a href="villa.html?ref=${v.id}">${esc(v.title)}</a></h3><span class="card-ref">${v.ref}</span></div>
        <p class="card-loc">${esc(loc)}</p>
        <p class="card-facts">${facts}</p>
        <p class="card-price">${fmt(v.price)} F CFA <span>/ mois</span></p>
      </div>
    </article>`;
  }

  function rowHTML(v, comparing) {
    const tags = [
      `<span class="tag">${termLabel(v.term)}</span>`,
      v.furnished ? `<span class="tag green">${ic("check", "i-sm")}Meublée</span>` : "",
      v.electricity ? `<span class="tag">Électricité</span>` : "",
      v.water ? `<span class="tag">Eau</span>` : "",
      v.video ? `<span class="tag">${ic("video", "i-sm")}Vidéo</span>` : "",
    ].join("");
    return `<article class="row-card" data-id="${v.id}">
      ${mediaHTML(v, 6)}
      <div class="row-body">
        <div class="card-top"><h2 class="card-title"><a href="villa.html?ref=${v.id}">${esc(v.title)}</a></h2><span class="card-ref">${v.ref}</span></div>
        <p class="meta-line"><span>${ic("pin", "i-sm")}${esc(v.address)}</span></p>
        <div>
          <p class="facts">
            <span>${ic("bed")}${plural(v.bedrooms, "chambre", "chambres")}</span>
            <span>${ic("bath")}${plural(v.bathrooms, "salle de bains", "salles de bains")}</span>
            ${v.garage ? `<span>${ic("car")}Garage ${v.garage} places</span>` : ""}
            ${v.year ? `<span>${ic("building")}Construite en ${v.year}</span>` : ""}
          </p>
          <div class="tags" style="margin-top:12px">${tags}</div>
        </div>
        <div class="row-foot">
          <p class="price">${fmt(v.price)} F CFA<span>par mois${v.deposit ? ` · caution ${fmt(v.deposit)} F` : ""}</span></p>
          <div class="row-actions">
            <button class="btn btn-secondary compare-toggle" type="button" data-compare="${v.id}" aria-pressed="${comparing}">${ic("plus", "i-sm i-plus")}${ic("check", "i-sm i-check")}Comparer</button>
            <a class="btn btn-primary" href="villa.html?ref=${v.id}">Voir la villa</a>
          </div>
        </div>
      </div>
    </article>`;
  }

  function initCarousels(root) {
    $$("[data-carousel]", root).forEach((m) => {
      if (m._init) return; m._init = true;
      const track = $(".track", m);
      const dots = $$(".dots i", m);
      const prev = $(".media-nav.prev", m), next = $(".media-nav.next", m);
      const count = $(".count-chip", m);
      const n = track.children.length;
      let raf = 0;
      const update = () => {
        raf = 0;
        const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
        dots.forEach((d, k) => d.classList.toggle("on", k === i));
        if (prev) prev.hidden = i <= 0;
        if (next) next.hidden = i >= n - 1;
        if (count) count.textContent = `${i + 1} / ${n}`;
      };
      track.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
      const go = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
      prev && prev.addEventListener("click", (e) => { e.preventDefault(); go(-1); });
      next && next.addEventListener("click", (e) => { e.preventDefault(); go(1); });
      update();
    });
  }

  function initHearts(root) {
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-fav]");
      if (!b) return;
      e.preventDefault();
      const id = b.dataset.fav, v = byId(id);
      favs.has(id) ? favs.delete(id) : favs.add(id);
      store.set("228v-favs", [...favs]);
      const on = favs.has(id);
      $$(`[data-fav="${id}"]`).forEach((x) => {
        x.setAttribute("aria-pressed", on);
        if (x.classList.contains("heart")) x.setAttribute("aria-label", `${on ? "Retirer des favoris" : "Enregistrer"} : ${v.title}`);
        const lbl = $(".lbl", x); if (lbl) lbl.textContent = on ? "Enregistrée" : "Enregistrer";
      });
      if (on && !reduceMotion) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
      toast(on ? "Villa ajoutée à vos favoris" : "Villa retirée de vos favoris");
    });
  }

  /* ---------- En-tête, menu, formulaires simples ---------- */
  function initHeader() {
    const h = $(".site-header");
    if (h) {
      const onScroll = () => h.classList.toggle("is-scrolled", window.scrollY > 4);
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
    const dlg = $("#mobile-menu");
    $$("[data-menu-open]").forEach((b) => b.addEventListener("click", () => dlg.showModal()));
    $$("[data-menu-close]").forEach((b) => b.addEventListener("click", () => dlg.close()));
    dlg && $$("a", dlg).forEach((a) => a.addEventListener("click", () => dlg.close()));
  }

  function validate(form) {
    let ok = true;
    $$("[data-req]", form).forEach((inp) => {
      const wrap = inp.closest(".input-wrap");
      let bad = !inp.value.trim();
      if (!bad && inp.dataset.req === "phone") bad = inp.value.replace(/\D/g, "").length < 8;
      if (!bad && inp.dataset.req === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
      wrap.classList.toggle("has-err", bad);
      inp.setAttribute("aria-invalid", bad);
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  }
  function liveClear(form) {
    form.addEventListener("input", (e) => {
      const w = e.target.closest(".input-wrap.has-err");
      if (w) { w.classList.remove("has-err"); e.target.removeAttribute("aria-invalid"); }
    });
  }

  function initNewsletter() {
    const f = $("#newsletter");
    if (!f) return;
    liveClear(f);
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(f)) return;
      $(".msg", f.parentElement).hidden = false;
      f.reset();
    });
  }

  /* ---------- Accueil ---------- */
  function initHome() {
    const grid = $("#home-cards");
    grid.innerHTML = VILLAS.map(cardHTML).join("") + `
      <aside class="owner-tile" aria-labelledby="owner-tile-t">
        <div>
          <div class="keys">${ic("key", "i-lg")}</div>
          <h3 id="owner-tile-t">Vous avez une villa à louer&nbsp;?</h3>
          <p>Proposez-la sur 228 Villa. Laissez vos coordonnées, l'équipe vous recontacte.</p>
        </div>
        <a class="btn btn-secondary" href="#proprietaires">Proposer mon bien ${ic("arrow-right", "i-sm")}</a>
      </aside>`;
    initCarousels(grid);

    const form = $("#search");
    const btnCount = $("#search-count");
    const note = $("#search-note");
    const submit = $(".search-submit", form);
    const state = () => ({ quartier: form.quartier.value, chambres: form.chambres.value, budget: form.budget.value, duree: form.duree.value });
    const update = () => {
      const n = VILLAS.filter((v) => matches(v, state())).length;
      swapText(btnCount, n === 0 ? "Aucune villa, réinitialiser" : n === 1 ? "Voir la villa" : `Voir les ${n} villas`);
      note.hidden = n !== 0;
      submit.dataset.empty = n === 0 ? "1" : "";
    };
    form.addEventListener("change", update);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (submit.dataset.empty) { form.reset(); update(); return; }
      location.href = "villas.html" + toQuery(state());
    });
    update();

    const of = $("#owner-form");
    liveClear(of);
    of.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(of)) return;
      const name = of.nom.value.trim().split(" ")[0];
      of.outerHTML = `<div class="owners-form"><div class="done" role="status">
        <span class="ok">${ic("check", "i-lg")}</span>
        <h3>Merci ${esc(name)}, c'est noté.</h3>
        <p style="color:#dfe3e8">Votre demande est prête à être transmise à 228 Villa. Pour aller plus vite, vous pouvez aussi écrire directement sur WhatsApp.</p>
        <a class="btn btn-primary" href="${waLink("Bonjour, je souhaite mettre ma propriété en location avec 228 Villa.")}" target="_blank" rel="noopener">${ic("chat", "i-sm")}Écrire sur WhatsApp</a>
        <p class="fine">Maquette&nbsp;: aucun message n'a été envoyé.</p>
      </div></div>`;
    });
  }

  /* ---------- Liste ---------- */
  function initList() {
    const s = readParams();
    let compare = new Set(store.get("228v-compare", []).filter(byId));
    const f = {
      quartier: $("#f-quartier"), chambres: $("#f-chambres"), budget: $("#f-budget"), tri: $("#f-tri"),
      meublee: $("#f-meublee"), reset: $("#f-reset"),
    };
    f.quartier.value = s.quartier; f.chambres.value = s.chambres; f.budget.value = s.budget; f.tri.value = s.tri;
    const durInput = $(`input[name="duree"][value="${s.duree}"]`) || $('input[name="duree"][value=""]');
    durInput.checked = true;
    f.meublee.setAttribute("aria-pressed", s.meublee);

    const seg = $("#seg-duree");
    const thumb = $(".thumb", seg);
    const placeThumb = () => {
      const lab = $("input:checked + label", seg);
      if (!lab) return;
      thumb.style.width = lab.offsetWidth + "px";
      thumb.style.transform = `translateX(${lab.offsetLeft}px)`;
    };

    const results = $("#results");
    const title = $("#list-title"), sub = $("#list-sub");

    const read = () => ({
      quartier: f.quartier.value, chambres: f.chambres.value, budget: f.budget.value,
      duree: $('input[name="duree"]:checked').value, meublee: f.meublee.getAttribute("aria-pressed") === "true", tri: f.tri.value,
    });

    const render = (animate) => {
      const st = read();
      let list = VILLAS.filter((v) => matches(v, st));
      if (st.tri === "prix-asc") list.sort((a, b) => a.price - b.price);
      if (st.tri === "prix-desc") list.sort((a, b) => b.price - a.price);
      if (st.tri === "chambres") list.sort((a, b) => b.bedrooms - a.bedrooms || a.price - b.price);

      ["quartier", "chambres", "budget"].forEach((k) => f[k].closest(".pill-select").classList.toggle("active", !!st[k]));
      const active = st.quartier || st.chambres || st.budget || st.duree || st.meublee;
      f.reset.hidden = !active;
      history.replaceState(null, "", "villas.html" + toQuery(st));

      swapText(title, list.length === 0 ? "Aucune villa ne correspond" : list.length === 1 ? "1 villa à louer" : `${list.length} villas à louer`);
      if (list.length) {
        const min = Math.min(...list.map((v) => v.price)), max = Math.max(...list.map((v) => v.price));
        sub.textContent = min === max ? `Loyer de ${fmt(min)} F CFA par mois` : `Loyers de ${fmt(min)} à ${fmt(max)} F CFA par mois, autour de Lomé`;
      } else sub.textContent = "Modifiez un filtre pour voir plus de villas.";

      if (!list.length) {
        results.innerHTML = `<div class="empty">
          <span class="ic">${ic("search_off", "i-lg")}</span>
          <h2>Aucune villa pour ces critères</h2>
          <p>Élargissez le budget ou le nombre de chambres, ou décrivez votre recherche à Aurore sur WhatsApp.</p>
          <div class="btns"><button class="btn btn-primary" type="button" data-reset>Réinitialiser les filtres</button>
          <a class="btn btn-secondary" href="${waLink("Bonjour Aurore, je cherche une villa à louer à Lomé. Mes critères : ")}" target="_blank" rel="noopener">${ic("chat", "i-sm")}Écrire à Aurore</a></div>
        </div>`;
      } else {
        results.innerHTML = list.map((v) => rowHTML(v, compare.has(v.id))).join("");
        if (!animate) $$(".row-card", results).forEach((c) => (c.style.animation = "none"));
        else $$(".row-card", results).forEach((c, i) => (c.style.animationDelay = i * 50 + "ms"));
        initCarousels(results);
      }
    };

    [f.quartier, f.chambres, f.budget, f.tri].forEach((el) => el.addEventListener("change", () => render(true)));
    $$('input[name="duree"]').forEach((r) => r.addEventListener("change", () => { placeThumb(); render(true); }));
    f.meublee.addEventListener("click", () => { f.meublee.setAttribute("aria-pressed", f.meublee.getAttribute("aria-pressed") !== "true"); render(true); });
    const resetAll = () => {
      f.quartier.value = ""; f.chambres.value = ""; f.budget.value = "";
      $('input[name="duree"][value=""]').checked = true; f.meublee.setAttribute("aria-pressed", "false");
      placeThumb(); render(true);
    };
    f.reset.addEventListener("click", resetAll);
    results.addEventListener("click", (e) => { if (e.target.closest("[data-reset]")) resetAll(); });

    /* Barre de filtres collante */
    const bar = $(".filterbar");
    const sentinel = document.createElement("div"); bar.before(sentinel);
    new IntersectionObserver(([en]) => bar.classList.toggle("is-stuck", !en.isIntersecting), { rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) + 1}px 0px 0px 0px` }).observe(sentinel);

    /* Comparateur */
    const tray = $("#tray");
    const renderTray = () => {
      const ids = [...compare];
      tray.classList.toggle("show", ids.length > 0);
      tray.setAttribute("aria-hidden", ids.length === 0);
      $(".tray-thumbs", tray).innerHTML = ids.map((id) => {
        const v = byId(id);
        return `<button type="button" data-uncompare="${id}" aria-label="Retirer ${esc(v.title)} de la comparaison" title="Retirer"><img src="${photo(v, 1, true)}" alt=""></button>`;
      }).join("") + '<span class="slot"></span>'.repeat(Math.max(0, 4 - ids.length));
      $(".tray-text", tray).innerHTML = `<strong>${ids.length} ${ids.length > 1 ? "villas sélectionnées" : "villa sélectionnée"}</strong>${ids.length < 2 ? "Ajoutez-en une autre pour comparer" : "Jusqu'à 4 villas"}`;
      $("#cmp-open").disabled = ids.length < 2;
      store.set("228v-compare", ids);
      $$("[data-compare]").forEach((b) => b.setAttribute("aria-pressed", compare.has(b.dataset.compare)));
    };
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-compare]");
      if (b) {
        const id = b.dataset.compare;
        if (compare.has(id)) compare.delete(id);
        else if (compare.size >= 4) { toast("4 villas maximum : retirez-en une pour ajouter celle-ci"); return; }
        else compare.add(id);
        renderTray();
      }
      const u = e.target.closest("[data-uncompare]");
      if (u) { compare.delete(u.dataset.uncompare); renderTray(); }
    });
    $("#cmp-clear").addEventListener("click", () => { compare.clear(); renderTray(); });

    const sheet = $("#cmp-sheet");
    $("#cmp-open").addEventListener("click", () => {
      const vs = [...compare].map(byId);
      const minP = Math.min(...vs.map((v) => v.price)), maxB = Math.max(...vs.map((v) => v.bedrooms)), maxS = Math.max(...vs.map((v) => v.bathrooms));
      const yn = (x) => (x === true ? "Oui" : x === false ? "Non" : "À préciser");
      const rows = [
        ["Loyer mensuel", (v) => v.price === minP && vs.length > 1 ? `<span class="best">${fmt(v.price)} F CFA<small>le moins cher</small></span>` : `${fmt(v.price)} F CFA`],
        ["Quartier", (v) => esc(v.quartier)],
        ["Chambres", (v) => v.bedrooms === maxB ? `<span class="best">${v.bedrooms}<small>le plus de chambres</small></span>` : v.bedrooms],
        ["Salles de bains", (v) => v.bathrooms === maxS ? `<span class="best">${v.bathrooms}<small>le plus de salles de bains</small></span>` : v.bathrooms],
        ["Garage", (v) => (v.garage ? `${v.garage} places` : "À préciser")],
        ["Construction", (v) => v.year || "À préciser"],
        ["Contrat", (v) => termLabel(v.term)],
        ["Meublée", (v) => yn(v.furnished)],
        ["Électricité", (v) => yn(v.electricity)],
        ["Eau", (v) => yn(v.water)],
        ["Gardiennage", (v) => yn(v.guard)],
        ["Caution", (v) => (v.deposit ? `${fmt(v.deposit)} F CFA` : "À préciser")],
      ];
      $(".sheet-body", sheet).innerHTML = `<table class="cmp">
        <thead><tr><th scope="col"><span class="sr-only">Critère</span></th>${vs.map((v) => `<th scope="col"><div class="cmp-head"><img src="${photo(v, 1, true)}" alt=""><a href="villa.html?ref=${v.id}">${esc(v.title)}</a><span class="card-ref">${v.ref}</span></div></th>`).join("")}</tr></thead>
        <tbody>${rows.map(([k, fn]) => `<tr><th scope="row">${k}</th>${vs.map((v) => `<td>${fn(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      sheet.showModal();
    });
    $("#cmp-close").addEventListener("click", () => sheet.close());
    sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });

    render(false);
    renderTray();
    requestAnimationFrame(placeThumb);
    window.addEventListener("resize", placeThumb);
    document.fonts && document.fonts.ready.then(placeThumb);
  }

  /* ---------- Fiche villa ---------- */
  function initVilla() {
    const v = byId(new URLSearchParams(location.search).get("ref")) || VILLAS[0];
    document.title = `${v.title} · ${fmt(v.price)} F CFA / mois · 228 Villa`;
    const n = v.photos;
    const photos = Array.from({ length: n }, (_, i) => ({ src: photo(v, i + 1), sm: photo(v, i + 1, true), alt: v.alts[i] || v.title }));

    $("#crumb-title").textContent = v.title;
    $("#v-title").textContent = v.title;
    $("#v-meta").innerHTML = `<span>${ic("pin", "i-sm")}${esc(v.address)}</span><span class="ref-chip">Réf. ${v.ref}</span>${v.badge ? `<span class="ref-chip">${esc(v.badge)}</span>` : ""}`;
    const saveBtn = $("#v-save");
    saveBtn.dataset.fav = v.id;
    saveBtn.setAttribute("aria-pressed", favs.has(v.id));
    $(".lbl", saveBtn).textContent = favs.has(v.id) ? "Enregistrée" : "Enregistrer";

    /* Galerie */
    const g = $("#gallery");
    const shown = Math.min(n, 5);
    g.classList.add("g" + shown);
    g.innerHTML = photos.slice(0, shown).map((p, i) => `<button type="button" data-open="${i}" aria-label="Agrandir la photo ${i + 1} : ${esc(p.alt)}"><img src="${i === 0 ? p.src : p.sm}" alt="${esc(p.alt)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></button>`).join("")
      + (n > 1 ? `<button class="btn btn-secondary all-photos" type="button" data-open="0" style="cursor:pointer">${ic("grid", "i-sm")}Afficher les ${n} photos</button>` : "");
    const gm = $("#gallery-mobile");
    gm.innerHTML = `<div class="track">${photos.map((p, i) => `<button type="button" data-open="${i}" aria-label="Agrandir la photo ${i + 1}"><img src="${p.sm}" alt="${esc(p.alt)}" ${i ? 'loading="lazy"' : ""} decoding="async"></button>`).join("")}</div>${n > 1 ? `<span class="count-chip">1 / ${n}</span>` : ""}`;
    gm.setAttribute("data-carousel", "");
    initCarousels(gm.parentElement);

    /* Faits clés */
    const kf = [
      [ic("bed", "i-lg"), v.bedrooms, v.bedrooms > 1 ? "chambres" : "chambre"],
      [ic("bath", "i-lg"), v.bathrooms, v.bathrooms > 1 ? "salles de bains" : "salle de bains"],
      v.garage ? [ic("car", "i-lg"), v.garage, "places de garage"] : null,
      v.year ? [ic("building", "i-lg"), v.year, "année de construction"] : null,
      [ic("file", "i-lg"), termLabel(v.term), "contrat"],
    ].filter(Boolean);
    $("#keyfacts").innerHTML = kf.map(([i, a, b]) => `<div>${i}<strong>${a}</strong><span>${b}</span></div>`).join("");
    $("#highlights").innerHTML = [
      v.furnished ? [ic("sofa"), "Villa meublée", "Vous posez vos valises : le mobilier est déjà en place."] : null,
      [ic("video"), "Visite en appel vidéo", "Depuis l'étranger, visitez la villa en direct avec l'agent avant de vous engager."],
      [ic("chat"), "Un agent joignable sur WhatsApp", `${AGENT.name} répond à vos questions sur cette villa (réf. ${v.ref}).`],
    ].filter(Boolean).map(([i, a, b]) => `<li>${i}<div><strong>${a}</strong><span>${b}</span></div></li>`).join("");
    $("#desc").textContent = v.description;

    const am = (icon, label, val, extra) => {
      const cls = val === true ? "" : val === false ? "no" : "unk";
      const txt = val === true ? label : val === false ? `${label}` : `${label}`;
      const note = val === false ? "<small>non inclus</small>" : val == null ? "<small>à préciser avec l'agent</small>" : extra ? `<small>${extra}</small>` : "";
      return `<li class="${cls}">${ic(icon)}<div><span>${txt}</span>${note ? "<br>" + note : ""}</div></li>`;
    };
    $("#amen").innerHTML = [
      am("sofa", "Meublée", v.furnished),
      am("zap", "Électricité", v.electricity),
      am("droplet", "Eau courante", v.water),
      am("shield", "Gardiennage", v.guard),
      am("car", "Garage", v.garage ? true : null, v.garage ? `${v.garage} places` : ""),
    ].join("");
    $("#terms").innerHTML = [
      ["Loyer mensuel", `${fmt(v.price)} F CFA`, ""],
      ["Caution", v.deposit ? `${fmt(v.deposit)} F CFA` : "À préciser avec l'agent", v.deposit ? "" : "soft"],
      ["Durée du contrat", termLabel(v.term), ""],
      ["Référence", v.ref, ""],
    ].map(([a, b, c]) => `<div><dt>${a}</dt><dd class="${c}">${b}</dd></div>`).join("");

    if (v.video) {
      $("#video-sec").hidden = false;
      $("#video-sec .video-wrap").innerHTML = `<video controls preload="none" playsinline poster="${photos[0].src}"><source src="${v.video}" type="video/mp4">Votre navigateur ne lit pas la vidéo. <a href="${v.video}">Télécharger la vidéo</a>.</video>`;
    }
    const loc = $("#loc");
    if (v.coords) {
      const [la, lo] = v.coords, d = 0.018;
      loc.innerHTML = `<div class="map"><iframe title="Carte : ${esc(v.title)}" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=${lo - d}%2C${la - d * 0.6}%2C${lo + d}%2C${la + d * 0.6}&layer=mapnik&marker=${la}%2C${lo}"></iframe></div>
        <p class="map-note">${esc(v.address)}. Position indiquée par l'annonce ; l'adresse exacte vous est confirmée par l'agent.</p>`;
    } else {
      loc.innerHTML = `<div class="no-map"><span class="ic">${ic("pin")}</span><p><strong>${esc(v.quartier)}</strong>, ${esc(v.address)}.<br>L'emplacement exact n'est pas encore renseigné : demandez-le à l'agent.</p></div>`;
    }

    /* Villas similaires */
    const sim = VILLAS.filter((x) => x.id !== v.id).sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price)).slice(0, 3);
    $("#similar").innerHTML = sim.map(cardHTML).join("");
    initCarousels($("#similar"));

    /* Composeur de visite */
    $("#book-price").innerHTML = `${fmt(v.price)} F CFA <span>/ mois</span>`;
    $("#book-sub").textContent = `Réf. ${v.ref} · ${termLabel(v.term).toLowerCase()}${v.deposit ? ` · caution ${fmt(v.deposit)} F` : ""}`;
    $("#mb-price").innerHTML = `${fmt(v.price)} F CFA<span>par mois</span>`;

    const fDayS = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
    const fMon = new Intl.DateTimeFormat("fr-FR", { month: "short" });
    const fLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const days = Array.from({ length: 10 }, (_, i) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i + 1); return d; });
    $("#days").innerHTML = days.map((d, i) => `<div class="opt day"><input type="radio" name="day" id="d${i}" value="${i}"><label for="d${i}"><small>${fDayS.format(d).replace(".", "")}</small><strong>${d.getDate()}</strong><em>${fMon.format(d).replace(".", "")}</em></label></div>`).join("");
    $("#slots").innerHTML = VISIT_SLOTS.map((t, i) => `<div class="opt slot"><input type="radio" name="slot" id="s${i}" value="${t}"><label for="s${i}">${t}</label></div>`).join("");

    const bf = $("#book-form");
    const seg = $("#seg-mode"), thumb = $(".thumb", seg);
    const placeThumb = () => { const lab = $("input:checked + label", seg); if (lab) { thumb.style.width = lab.offsetWidth + "px"; thumb.style.transform = `translateX(${lab.offsetLeft}px)`; } };
    const sumEl = $("#summary"), sumTxt = $("#summary-text"), wa = $("#book-wa"), slotErr = $("#slot-err");

    const current = () => {
      const mode = bf.mode.value;
      const di = bf.querySelector('input[name="day"]:checked');
      const sl = bf.querySelector('input[name="slot"]:checked');
      return { mode, day: di ? days[+di.value] : null, slot: sl ? sl.value : null };
    };
    const modeTxt = (m) => (m === "video" ? "en appel vidéo" : "en personne");
    const sentence = (c) => `Visite ${modeTxt(c.mode)} le ${fLong.format(c.day)} à ${c.slot}`;
    const updateSummary = () => {
      const c = current();
      const ready = c.day && c.slot;
      sumEl.classList.toggle("ready", !!ready);
      let t;
      if (ready) t = sentence(c);
      else if (c.day) t = `${fLong.format(c.day)} : choisissez une heure.`.replace(/^./, (x) => x.toUpperCase());
      else if (c.slot) t = `${c.slot} : choisissez un jour.`;
      else t = c.mode === "video" ? "Choisissez un jour et une heure : l'agent vous appelle en vidéo depuis la villa." : "Choisissez un jour et une heure pour visiter la villa en personne.";
      swapText(sumTxt, t);
      if (ready) slotErr.hidden = true;
      let msg = `Bonjour ${AGENT.name.split(" ")[0]}, je suis intéressé(e) par « ${v.title} » (réf. ${v.ref}, ${fmt(v.price)} F CFA/mois) vue sur 228villa.com.`;
      if (ready) msg += ` Serait-il possible d'organiser une visite ${modeTxt(c.mode)} le ${fLong.format(c.day)} à ${c.slot} ?`;
      wa.href = waLink(msg);
    };
    bf.addEventListener("change", (e) => { if (e.target.name === "mode") placeThumb(); updateSummary(); });
    liveClear(bf);
    bf.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = current();
      if (!c.day || !c.slot) { slotErr.hidden = false; (bf.querySelector('input[name="day"]:checked') ? $("#s0") : $("#d0")).focus(); return; }
      if (!validate(bf)) return;
      const box = $("#book-body");
      box.dataset.prev = box.innerHTML;
      box.innerHTML = `<div class="done" role="status">
        <span class="ok">${ic("calendar-check", "i-lg")}</span>
        <h3>Demande de visite prête</h3>
        <p><strong>${sentence(c)}</strong>, pour ${esc(bf.nom.value.trim())} (${esc(bf.tel.value.trim())}).</p>
        <p class="fine">Maquette : en ligne, cette demande sera transmise à ${AGENT.name}, qui vous confirmera le créneau. Aucun message n'a été envoyé.</p>
        <a class="btn btn-primary btn-block" href="${wa.href}" target="_blank" rel="noopener">${ic("chat", "i-sm")}Confirmer aussi sur WhatsApp</a>
        <button class="btn btn-ghost btn-block" type="button" id="book-edit">Modifier la demande</button>
      </div>`;
      $("#book-edit").addEventListener("click", () => location.reload());
    });
    updateSummary();
    requestAnimationFrame(placeThumb);
    window.addEventListener("resize", placeThumb);
    document.fonts && document.fonts.ready.then(placeThumb);

    /* Barre mobile */
    const mb = $(".mobile-bar"), book = $("#visite");
    $("#mb-go").addEventListener("click", () => book.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
    new IntersectionObserver(([en]) => mb.classList.toggle("hide", en.isIntersecting), { threshold: 0.15 }).observe(book);

    /* Partage */
    $("#v-share").addEventListener("click", async () => {
      const data = { title: v.title, text: `${v.title} · ${fmt(v.price)} F CFA / mois`, url: location.href };
      if (navigator.share) { try { await navigator.share(data); } catch (e) { /* annulé */ } return; }
      try { await navigator.clipboard.writeText(location.href); toast("Lien de la villa copié"); } catch (e) { toast("Copiez le lien depuis la barre d'adresse"); }
    });

    initLightbox(photos);
  }

  function initLightbox(photos) {
    const lb = $("#lightbox");
    const img = $(".lb-stage img", lb), cnt = $(".lb-count", lb), cap = $(".lb-cap", lb), thumbs = $(".lb-thumbs", lb);
    const n = photos.length;
    let i = 0;
    thumbs.innerHTML = n > 1 ? photos.map((p, k) => `<button type="button" data-k="${k}" aria-label="Photo ${k + 1}"><img src="${p.sm}" alt="" loading="lazy"></button>`).join("") : "";
    $(".lb-prev", lb).hidden = $(".lb-next", lb).hidden = n < 2;
    const show = (k, animate) => {
      i = (k + n) % n;
      const set = () => {
        img.src = photos[i].src; img.alt = photos[i].alt;
        cnt.textContent = `${i + 1} / ${n}`; cap.textContent = photos[i].alt;
        $$("button", thumbs).forEach((b, j) => b.setAttribute("aria-current", j === i));
        const cur = thumbs.children[i]; cur && cur.scrollIntoView({ block: "nearest", inline: "center" });
      };
      if (animate && !reduceMotion) { img.classList.add("swap"); setTimeout(() => { set(); img.onload = () => img.classList.remove("swap"); if (img.complete) img.classList.remove("swap"); }, 120); }
      else set();
      /* précharge la suivante */
      const nx = new Image(); nx.src = photos[(i + 1) % n].src;
    };
    document.addEventListener("click", (e) => {
      const o = e.target.closest("[data-open]");
      if (o) { show(+o.dataset.open, false); lb.showModal(); }
    });
    $(".lb-close", lb).addEventListener("click", () => lb.close());
    $(".lb-prev", lb).addEventListener("click", () => show(i - 1, true));
    $(".lb-next", lb).addEventListener("click", () => show(i + 1, true));
    thumbs.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) show(+b.dataset.k, true); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1, false); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1, false); }
    });
    /* Balayage : distance ou vitesse suffisent */
    const stage = $(".lb-stage", lb);
    let x0 = null, t0 = 0;
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse") return; x0 = e.clientX; t0 = performance.now(); stage.setPointerCapture(e.pointerId); });
    stage.addEventListener("pointermove", (e) => { if (x0 === null) return; img.style.transform = `translateX(${(e.clientX - x0) * 0.6}px)`; });
    const end = (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0, vel = Math.abs(dx) / Math.max(1, performance.now() - t0);
      img.style.transition = "transform 240ms cubic-bezier(0.23,1,0.32,1), opacity 160ms ease"; img.style.transform = "";
      setTimeout(() => (img.style.transition = ""), 260);
      if (Math.abs(dx) > 60 || vel > 0.11) show(i + (dx < 0 ? 1 : -1), true);
      x0 = null;
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  }

  /* ---------- Démarrage ---------- */
  initHeader();
  initHearts(document);
  initNewsletter();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "list") initList();
  if (page === "villa") initVilla();
})();
