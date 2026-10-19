/* Caritas Africa, maquette v5 : interactions de l'accueil. */
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

  /* Pages intérieures pas encore déclinées en v5 : on le dit, et on renvoie vers la v2 */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-soon]");
    if (!a) return;
    e.preventDefault();
    closeMega();
    const drawer = $("#drawer");
    if (drawer.open) drawer.close();
    toast("Cette page sera déclinée en v5 après validation de l'accueil.", { href: "../caritas-v2/" + a.getAttribute("href"), label: "Voir sa version v2" });
  });

  /* ---------- Méga-menus ---------- */
  const scrim = $("[data-mega-scrim]");
  let openBtn = null;
  function openMega(btn) {
    if (openBtn === btn) return closeMega();
    const wasOpen = !!openBtn;
    closeMega(true);
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    scrim.hidden = false;
    if (wasOpen) panel.style.transitionDuration = "0ms";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panel.classList.add("is-open");
      scrim.classList.add("is-open");
      panel.style.transitionDuration = "";
    }));
    openBtn = btn;
  }
  function closeMega(instant) {
    if (!openBtn) return;
    const panel = document.getElementById(openBtn.getAttribute("aria-controls"));
    openBtn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    openBtn = null;
    if (instant) { panel.hidden = true; return; }
    scrim.classList.remove("is-open");
    setTimeout(() => {
      if (!panel.classList.contains("is-open")) panel.hidden = true;
      if (!openBtn) scrim.hidden = true;
    }, 170);
  }
  $$("[data-mega]").forEach((btn) => btn.addEventListener("click", () => openMega(btn)));
  scrim.addEventListener("click", () => closeMega());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openBtn) { const b = openBtn; closeMega(); b.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (openBtn && !e.target.closest(".site-header")) closeMega();
  });
  $$(".mega a").forEach((a) => a.addEventListener("click", () => closeMega()));

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

  /* ---------- Carrousel du héros ---------- */
  (function () {
    const hero = $("#hero");
    const slides = $$(".slide", hero);
    const pauseBtn = $("[data-pause]", hero);
    let i = 0, timer = null, paused = false, hovering = false;
    function go(n) {
      const next = (n + slides.length) % slides.length;
      if (next === i) return;
      slides[i].classList.remove("is-active");
      slides[i].inert = true;
      slides[next].classList.add("is-active");
      slides[next].inert = false;
      const img = $("img", slides[next]);
      if (img.loading === "lazy") img.loading = "eager";
      i = next;
    }
    function schedule() {
      clearInterval(timer);
      if (paused || hovering || reduce.matches || document.hidden) return;
      timer = setInterval(() => go(i + 1), 7000);
    }
    $$("[data-slide]", hero).forEach((b) => b.addEventListener("click", () => {
      go(i + Number(b.dataset.slide));
      schedule();
    }));
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.setAttribute("aria-label", paused ? "Reprendre le défilement" : "Mettre le défilement en pause");
      $("use", pauseBtn).setAttribute("href", paused ? "#i-play" : "#i-pause");
      schedule();
    });
    if (reduce.matches) pauseBtn.hidden = true;
    hero.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; schedule(); } });
    hero.addEventListener("pointerleave", () => { hovering = false; schedule(); });
    hero.addEventListener("focusin", () => { hovering = true; schedule(); });
    hero.addEventListener("focusout", () => { hovering = false; schedule(); });
    document.addEventListener("visibilitychange", schedule);
    let x0 = null;
    hero.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    hero.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); schedule(); }
    });
    schedule();
  })();

  /* ---------- Carrousel « Notre action » (défilement accroché + points) ---------- */
  $$("[data-dots]").forEach((group) => {
    const track = document.getElementById(group.dataset.dots);
    const dots = $$("button", group);
    let raf = 0;
    const current = () => Math.round(track.scrollLeft / track.clientWidth);
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const n = current();
        dots.forEach((d, k) => d.setAttribute("aria-current", k === n ? "true" : "false"));
      });
    }, { passive: true });
    dots.forEach((d, k) => d.addEventListener("click", () => {
      track.scrollTo({ left: k * track.clientWidth, behavior: reduce.matches ? "auto" : "smooth" });
    }));
    track.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const n = Math.max(0, Math.min(dots.length - 1, current() + (e.key === "ArrowRight" ? 1 : -1)));
      track.scrollTo({ left: n * track.clientWidth, behavior: reduce.matches ? "auto" : "smooth" });
    });
  });

  /* ---------- Onglets « À la une » ---------- */
  (function () {
    const tabs = $$(".spot-tabs [role=tab]");
    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (on && panel.hidden) {
          panel.classList.add("is-entering");
          panel.hidden = false;
          requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.remove("is-entering")));
        } else if (!on) panel.hidden = true;
      });
      if (focus) tab.focus();
    }
    tabs.forEach((t, k) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        let n = null;
        if (e.key === "ArrowRight") n = (k + 1) % tabs.length;
        if (e.key === "ArrowLeft") n = (k - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End") n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault();
        select(tabs[n], true);
      });
    });
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
