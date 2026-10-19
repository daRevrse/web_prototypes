/* Caritas Africa, maquette v6 : interactions de l'accueil. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(text, link) {
    clearTimeout(toastTimer);
    toastEl.textContent = text;
    if (link) {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      toastEl.append(" ", a);
    }
    toastEl.hidden = false;
    toastEl.classList.add("is-hidden");
    requestAnimationFrame(() => requestAnimationFrame(() => toastEl.classList.remove("is-hidden")));
    toastTimer = setTimeout(hideToast, 6000);
  }
  function hideToast() {
    toastEl.classList.add("is-hidden");
    setTimeout(() => { if (toastEl.classList.contains("is-hidden")) toastEl.hidden = true; }, 160);
  }
  toastEl.addEventListener("mouseenter", () => clearTimeout(toastTimer));
  toastEl.addEventListener("mouseleave", () => { toastTimer = setTimeout(hideToast, 2500); });

  /* Pages intérieures pas encore déclinées en v6 : on le dit, et on renvoie vers la v2 */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-soon]");
    if (!a) return;
    e.preventDefault();
    closeDd();
    const drawer = $("#drawer");
    if (drawer.open) drawer.close();
    toast("Cette page sera déclinée en v6 après validation de l'accueil.", { href: "../caritas-v2/" + a.getAttribute("href"), label: "Voir sa version v2" });
  });

  /* ---------- Menus déroulants ---------- */
  let openBtn = null;
  function openDd(btn) {
    if (openBtn === btn) return closeDd();
    closeDd(true);
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("is-open")));
    openBtn = btn;
  }
  function closeDd(instant) {
    if (!openBtn) return;
    const panel = document.getElementById(openBtn.getAttribute("aria-controls"));
    openBtn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    openBtn = null;
    if (instant) { panel.hidden = true; return; }
    setTimeout(() => { if (!panel.classList.contains("is-open")) panel.hidden = true; }, 170);
  }
  $$("[data-dd]").forEach((btn) => btn.addEventListener("click", () => openDd(btn)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openBtn) { const b = openBtn; closeDd(); b.focus(); }
  });
  document.addEventListener("click", (e) => { if (openBtn && !e.target.closest(".has-dd")) closeDd(); });
  document.addEventListener("focusin", (e) => { if (openBtn && !e.target.closest(".has-dd")) closeDd(); });

  /* ---------- Tiroir mobile ---------- */
  const drawer = $("#drawer");
  $("[data-drawer-open]").addEventListener("click", () => drawer.showModal());
  $$("[data-drawer-close]").forEach((b) => b.addEventListener("click", () => drawer.close()));
  drawer.addEventListener("click", (e) => { if (e.target === drawer) drawer.close(); });

  /* ---------- Langues ---------- */
  $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang === "fr") return;
    toast(b.dataset.lang === "en"
      ? "La version anglaise n'existe pas encore dans la maquette."
      : "La version portugaise n'existe pas encore dans la maquette.");
  }));

  /* ---------- Carrousel du grand cadre ---------- */
  (function () {
    const art = $("#hero-art");
    const slides = $$(".slide", art);
    const credit = $("#slide-credit");
    const count = $("#slide-count");
    const pauseBtn = $("[data-pause]");
    let i = 0, timer = null, paused = false, hovering = false;
    function go(n) {
      const next = (n + slides.length) % slides.length;
      if (next === i) return;
      slides[i].classList.remove("is-active");
      slides[next].classList.add("is-active");
      const img = $("img", slides[next]);
      if (img.loading === "lazy") img.loading = "eager";
      i = next;
      credit.textContent = slides[i].dataset.credit.replace(" : ", " : ");
      count.textContent = `${i + 1} / ${slides.length}`;
    }
    function schedule() {
      clearInterval(timer);
      if (paused || hovering || reduce.matches || document.hidden) return;
      timer = setInterval(() => go(i + 1), 7000);
    }
    $$("[data-slide]").forEach((b) => b.addEventListener("click", () => { go(i + Number(b.dataset.slide)); schedule(); }));
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.setAttribute("aria-label", paused ? "Reprendre le défilement" : "Mettre le défilement en pause");
      $("use", pauseBtn).setAttribute("href", paused ? "#i-play" : "#i-pause");
      schedule();
    });
    if (reduce.matches) pauseBtn.hidden = true;
    art.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; schedule(); } });
    art.addEventListener("pointerleave", () => { hovering = false; schedule(); });
    $(".band-ctrl").addEventListener("focusin", () => { hovering = true; schedule(); });
    $(".band-ctrl").addEventListener("focusout", () => { hovering = false; schedule(); });
    document.addEventListener("visibilitychange", schedule);
    let x0 = null;
    art.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    art.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); schedule(); }
    });
    schedule();
  })();

  /* ---------- Lettre d'information ---------- */
  (function () {
    const form = $("#newsletter");
    const input = $("#nl", form);
    const err = $("#nl-err", form);
    const ok = $("#nl-ok", form);
    const valid = () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true" && valid()) { input.removeAttribute("aria-invalid"); err.hidden = true; }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid()) {
        input.setAttribute("aria-invalid", "true");
        err.hidden = false;
        ok.hidden = true;
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      err.hidden = true;
      ok.hidden = false;
      form.reset();
    });
  })();
})();
