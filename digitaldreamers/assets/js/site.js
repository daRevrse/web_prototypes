/* Digital Dreamers — comportements du prototype (aucune dépendance). */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* En-tête et menu mobile */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 4);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }
  const drawer = $("#drawer");
  $$("[data-drawer-open]").forEach((b) => b.addEventListener("click", () => drawer.showModal()));
  $$("[data-drawer-close]").forEach((b) => b.addEventListener("click", () => drawer.close()));
  drawer && drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("nav a")) drawer.close(); });

  /* Éditions : onglets 2026 / 2025 / 2024 */
  const tabs = $("#ed-tabs");
  if (tabs) {
    const btns = $$(".tab", tabs), pill = $(".tab-pill", tabs);
    const place = (b, animate) => {
      pill.classList.toggle("anim", !!animate && !reduceMotion);
      pill.style.width = b.offsetWidth + "px";
      pill.style.transform = `translateX(${b.offsetLeft}px)`;
    };
    const show = (i, how) => {
      btns.forEach((b, k) => {
        const on = k === i;
        b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
        const p = document.getElementById(b.getAttribute("aria-controls"));
        p.hidden = !on;
        if (on && how === "pointer" && !reduceMotion) { p.classList.remove("in"); void p.offsetWidth; p.classList.add("in"); }
      });
      place(btns[i], how === "pointer");
    };
    btns.forEach((b, i) => b.addEventListener("click", () => show(i, "pointer")));
    tabs.addEventListener("keydown", (e) => {
      const cur = btns.findIndex((b) => b.getAttribute("aria-selected") === "true");
      let n = null;
      if (e.key === "ArrowRight") n = (cur + 1) % btns.length;
      if (e.key === "ArrowLeft") n = (cur - 1 + btns.length) % btns.length;
      if (n !== null) { e.preventDefault(); show(n, "key"); btns[n].focus(); }
    });
    show(0, "init");
    const re = () => place(btns.find((b) => b.getAttribute("aria-selected") === "true"), false);
    window.addEventListener("resize", re);
    document.fonts && document.fonts.ready.then(re);
  }

  /* Pré-inscription */
  const form = $("#reg-form");
  if (!form) return;
  const NEXT_JULY = new Date(new Date().getFullYear() + (new Date().getMonth() > 6 ? 1 : 0), 6, 31);
  const yearLabel = NEXT_JULY.getFullYear();
  const ageAt = (dob, at) => {
    let a = at.getFullYear() - dob.getFullYear();
    const m = at.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && at.getDate() < dob.getDate())) a--;
    return a;
  };
  const dobInput = $("#e-naissance"), ageNote = $("#age-note");
  $$("[data-year]").forEach((el) => (el.textContent = yearLabel));

  const rules = {
    "e-prenom": (v) => v.trim() ? "" : "Indiquez le prénom de l'enfant.",
    "e-nom": (v) => v.trim() ? "" : "Indiquez le nom de famille de l'enfant.",
    "e-naissance": (v) => {
      if (!v) return "Indiquez la date de naissance de l'enfant.";
      const d = new Date(v + "T12:00:00");
      if (isNaN(d)) return "Cette date n'est pas valide.";
      const a = ageAt(d, NEXT_JULY);
      if (a < 10 || a > 13) return `Votre enfant aura ${a} ans en juillet ${yearLabel}. Le programme accueille les enfants de 10 à 13 ans ; nos cours en ligne restent ouverts à tous.`;
      return "";
    },
    "p-nom": (v) => v.trim() ? "" : "Indiquez votre nom.",
    "p-tel": (v) => v.replace(/\D/g, "").length >= 8 ? "" : "Indiquez un numéro joignable, de préférence WhatsApp (8 chiffres minimum).",
    "p-email": (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Cette adresse e-mail semble incomplète, par exemple nom@exemple.com.",
    "consent": (_, el) => el.checked ? "" : "Cochez la case pour que l'équipe puisse vous recontacter.",
  };
  const check = (id) => {
    const el = document.getElementById(id), field = el.closest(".field") || el.closest(".consent-wrap");
    const msg = rules[id](el.value, el);
    field.classList.toggle("bad", !!msg);
    el.setAttribute("aria-invalid", !!msg);
    const err = $(".err span", field);
    if (err) err.textContent = msg;
    return msg;
  };
  const updateAge = () => {
    ageNote.classList.remove("show");
    if (!dobInput.value) return;
    const d = new Date(dobInput.value + "T12:00:00");
    if (isNaN(d)) return;
    const a = ageAt(d, NEXT_JULY);
    if (a >= 10 && a <= 13) { $("span", ageNote).textContent = `Votre enfant aura ${a} ans en juillet ${yearLabel} : c'est bien l'âge du programme.`; ageNote.classList.add("show"); }
  };
  dobInput.addEventListener("change", () => { check("e-naissance"); updateAge(); });
  Object.keys(rules).forEach((id) => {
    const el = document.getElementById(id);
    if (el.type === "checkbox") { el.addEventListener("change", () => check(id)); return; }
    el.addEventListener("blur", () => { if (el.value) check(id); });
    el.addEventListener("input", () => { if (el.closest(".bad")) check(id); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = Object.keys(rules).map((id) => [id, check(id)]).filter(([, m]) => m);
    const sum = $("#summary-err");
    if (errors.length) {
      $("ul", sum).innerHTML = errors.map(([id, m]) => `<li><a href="#${id}">${m}</a></li>`).join("");
      $("strong", sum).textContent = errors.length === 1 ? "Un point à corriger avant l'envoi :" : `${errors.length} points à corriger avant l'envoi :`;
      sum.classList.add("show");
      sum.focus();
      return;
    }
    sum.classList.remove("show");
    const v = (id) => document.getElementById(id).value.trim();
    const past = $('input[name="deja"]:checked');
    const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    $("#reg-body").innerHTML = `<div class="done" role="status" tabindex="-1">
      <span class="ok"><svg class="i i-lg" aria-hidden="true"><use href="#i-check"/></svg></span>
      <h2>Pré-inscription enregistrée pour ${esc(v("e-prenom"))}</h2>
      <dl>
        <dt>Enfant</dt><dd>${esc(v("e-prenom"))} ${esc(v("e-nom"))}${v("e-classe") ? ", " + esc(v("e-classe")) : ""}</dd>
        <dt>Déjà participé</dt><dd>${past ? esc(past.value) : "Non"}</dd>
        <dt>Parent</dt><dd>${esc(v("p-nom"))}, ${esc(v("p-tel"))}</dd>
      </dl>
      <p>L'équipe de BostonSolux Academy vous recontactera à l'annonce des dates de la prochaine édition. Une question en attendant ? Appelez le <a href="tel:+22891061873">+228 91 06 18 73</a>.</p>
      <p class="fine">Maquette : aucune donnée n'a été envoyée.</p>
      <a class="btn btn-line btn-sm" href="index.html">Retour à l'accueil</a>
    </div>`;
    const done = $("#reg-body .done");
    done.focus();
    done.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
})();
