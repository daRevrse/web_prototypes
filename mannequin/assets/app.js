(() => {
  const root = document.documentElement;
  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);
  if (!hasGsap) root.classList.remove("intro");

  // Marques « à fournir » : compteurs et bascule d'affichage.
  const markers = document.querySelectorAll(".tbc:not(.tbc-photo), .tbc-block, .tbc-zone");
  const photos = new Set([...document.querySelectorAll("[data-photo]")].map((img) => img.dataset.photo));
  document.querySelectorAll("[data-tbc-count]").forEach((el) => { el.textContent = markers.length; });
  document.querySelectorAll("[data-photo-count]").forEach((el) => { el.textContent = photos.size; });

  const tbcToggle = document.querySelector("[data-tbc-toggle]");
  const setTbc = (off) => {
    root.classList.toggle("tbc-off", off);
    if (tbcToggle) {
      tbcToggle.textContent = off ? "Afficher le surlignage" : "Masquer le surlignage";
      tbcToggle.setAttribute("aria-pressed", String(off));
    }
  };
  let tbcOff = false;
  try { tbcOff = localStorage.getItem("mannequin-tbc-off") === "1"; } catch (e) {}
  setTbc(tbcOff);
  tbcToggle?.addEventListener("click", () => {
    tbcOff = !tbcOff;
    setTbc(tbcOff);
    try { localStorage.setItem("mannequin-tbc-off", tbcOff ? "1" : "0"); } catch (e) {}
  });

  // Menu mobile.
  const header = document.querySelector(".site-header");
  const menuButton = header?.querySelector(".menu-toggle");
  const setMenu = (open) => {
    header.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  menuButton?.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
  header?.querySelectorAll(".site-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header?.classList.contains("menu-open")) { setMenu(false); menuButton.focus(); }
  });

  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  const motionOn = () => hasGsap && root.classList.contains("motion");
  const headerHeight = () => header?.offsetHeight || 0;
  let lenis = null;
  const scrollToY = (y) => {
    if (lenis) lenis.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: root.classList.contains("motion") ? "smooth" : "auto" });
  };

  // Les mensurations défilent jusqu'à leur valeur.
  // Le décompte passe par une copie masquée aux lecteurs d'écran : la vraie valeur ne change jamais.
  const countUp = (scope) => {
    if (!motionOn()) return;
    scope.querySelectorAll(".stats dd").forEach((dd) => {
      const node = [...dd.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.nodeValue));
      if (!node) return;
      const num = document.createElement("span");
      num.className = "num";
      node.replaceWith(num);
      num.append(node);
      const anim = document.createElement("span");
      anim.className = "num-anim";
      anim.setAttribute("aria-hidden", "true");
      anim.textContent = "0";
      dd.prepend(anim);
      num.style.opacity = "0";
      const end = parseInt(node.nodeValue, 10);
      const o = { v: 0 };
      gsap.to(o, {
        v: end, duration: 1.3, ease: "power3.out",
        onUpdate: () => { anim.textContent = String(Math.round(o.v)); },
        onComplete: () => { anim.remove(); num.style.opacity = ""; },
      });
    });
  };

  // La carte composite : elle se retourne pendant le défilement.
  const stage = document.querySelector(".stage");
  const card = stage?.querySelector(".card");
  const front = stage?.querySelector(".face--front");
  const back = stage?.querySelector(".face--back");
  const FLIP_START = 0.06;
  const FLIP_SPAN = 0.62;
  let flipTrigger = null;
  let backCounted = false;

  const setSide = (side) => {
    if (card.dataset.side === side) return;
    card.dataset.side = side;
    // Seule la face visible reçoit le focus clavier.
    front.inert = side === "back";
    back.inert = side === "front";
    if (side === "back" && !backCounted) { backCounted = true; countUp(back); }
  };

  const goTo = (side) => {
    if (!flipTrigger) return;
    const p = side === "back" ? FLIP_START + FLIP_SPAN + 0.08 : 0;
    scrollToY(flipTrigger.start + (flipTrigger.end - flipTrigger.start) * p);
    const face = side === "back" ? back : front;
    const next = face.querySelector(`[data-flip-to="${side === "back" ? "front" : "back"}"]`);
    // Le focus suit la face, une fois qu'elle est visible.
    const until = performance.now() + 3000;
    const settle = () => {
      if (card.dataset.side === side) next?.focus({ preventScroll: true });
      else if (performance.now() < until) requestAnimationFrame(settle);
    };
    requestAnimationFrame(settle);
  };
  stage?.querySelectorAll("[data-flip-to]").forEach((btn) => {
    btn.addEventListener("click", () => goTo(btn.dataset.flipTo));
  });

  // Book : filtres par catégorie.
  const grid = document.querySelector("[data-book]");
  const items = grid ? [...grid.querySelectorAll(":scope > li")] : [];
  const filters = document.querySelectorAll(".filter");
  const applyFilter = (cat) => {
    items.forEach((item) => { item.hidden = !(cat === "tout" || item.dataset.cat === cat); });
  };
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (motionOn() && window.Flip) {
        revealBook();
        const state = Flip.getState(items);
        applyFilter(cat);
        Flip.from(state, {
          duration: 0.7, ease: "power3.inOut", absolute: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: "power3.out" }),
          onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
        });
        ScrollTrigger.refresh();
        return;
      }
      const wasHidden = new Map(items.map((item) => [item, item.hidden]));
      applyFilter(cat);
      items.forEach((item) => {
        item.classList.remove("is-entering");
        if (!item.hidden && wasHidden.get(item)) { void item.offsetWidth; item.classList.add("is-entering"); }
      });
    });
  });

  // Une fois filtré, le book est entièrement révélé.
  let bookRevealed = false;
  function revealBook() {
    if (bookRevealed) return;
    bookRevealed = true;
    gsap.set(".book-grid .shot", { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(".book-grid .shot img", { scale: 1.12 });
    gsap.set(".book-grid > li", { opacity: 1, y: 0 });
  }

  // Visionneuse.
  const viewer = document.querySelector(".viewer");
  // L'image est créée ici pour ne rien charger tant que la visionneuse est fermée.
  const viewerImg = document.createElement("img");
  viewer?.querySelector(".viewer__figure").prepend(viewerImg);
  const viewerCaption = viewer?.querySelector(".viewer__caption");
  let current = -1;
  let opener = null;
  const visibleShots = () => [...grid.querySelectorAll(":scope > li:not([hidden]) .shot")];

  const showShot = (index, dir = 0) => {
    const shots = visibleShots();
    if (!shots.length) return;
    current = (index + shots.length) % shots.length;
    const shot = shots[current];
    const thumb = shot.querySelector("img");
    if (!motionOn()) viewerImg.classList.add("is-swapping");
    const next = new Image();
    next.src = shot.dataset.full;
    const swap = () => {
      viewerImg.src = shot.dataset.full;
      viewerImg.alt = thumb.alt;
      viewerImg.classList.remove("is-swapping");
      if (motionOn() && dir) gsap.fromTo(viewerImg, { opacity: 0, xPercent: dir * 6 }, { opacity: 1, xPercent: 0, duration: 0.55, ease: "power3.out" });
    };
    next.decode ? next.decode().then(swap, swap) : (next.onload = swap);
    viewerCaption.innerHTML = "";
    viewerCaption.append(`${shot.dataset.caption}. Photo provisoire de `);
    const link = document.createElement("a");
    link.href = shot.dataset.profile;
    link.textContent = shot.dataset.credit;
    viewerCaption.append(link, ` sur Unsplash (${current + 1} / ${shots.length})`);
  };

  if (viewer && grid) {
    grid.addEventListener("click", (e) => {
      const shot = e.target.closest(".shot");
      if (!shot) return;
      opener = shot;
      viewerImg.src = shot.querySelector("img").currentSrc;
      showShot(visibleShots().indexOf(shot));
      viewer.showModal();
      lenis?.stop();
      if (motionOn()) {
        gsap.fromTo(viewerImg, { clipPath: "inset(100% 0% 0% 0%)", opacity: 1, xPercent: 0 }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.out" });
        gsap.from(viewerCaption, { y: 12, opacity: 0, duration: 0.5, delay: 0.25, ease: "power3.out" });
      }
    });
    viewer.addEventListener("click", (e) => {
      const action = e.target.closest("[data-viewer]")?.dataset.viewer;
      if (action === "close" || e.target === viewer) viewer.close();
      else if (action === "prev") showShot(current - 1, -1);
      else if (action === "next") showShot(current + 1, 1);
    });
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); showShot(current - 1, -1); }
      if (e.key === "ArrowRight") { e.preventDefault(); showShot(current + 1, 1); }
    });
    viewer.addEventListener("close", () => { lenis?.start(); opener?.focus(); });
  }

  // Demande de booking : vérifiée ici, jamais envoyée (maquette).
  const form = document.getElementById("booking-form");
  if (form) {
    const today = new Date();
    const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.start.min = iso(today);
    form.end.min = iso(today);
    form.start.addEventListener("change", () => { form.end.min = form.start.value || iso(today); });

    const setError = (name, message) => {
      const el = form.querySelector(`#err-${name}`);
      const field = name === "type" ? null : form.elements[name];
      if (el) { el.textContent = message || ""; el.hidden = !message; }
      if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
      if (name === "type") form.querySelector(".field--choices").classList.toggle("is-invalid", Boolean(message));
    };

    const validate = () => {
      const errors = {};
      if (!form.querySelector('input[name="type"]:checked')) errors.type = "Choisissez le type de projet.";
      if (!form.start.value) errors.start = "Indiquez la date de début.";
      if (form.end.value && form.start.value && form.end.value < form.start.value) errors.end = "La date de fin doit suivre la date de début.";
      if (!form.place.value.trim()) errors.place = "Indiquez le lieu du projet.";
      if (!form.elements.name.value.trim()) errors.name = "Indiquez votre nom.";
      if (!form.email.value.trim()) errors.email = "Indiquez votre email.";
      else if (!form.email.checkValidity()) errors.email = "Cet email semble incomplet, par exemple nom@marque.com.";
      ["type", "start", "end", "place", "name", "email"].forEach((n) => setError(n, errors[n]));
      return errors;
    };

    form.addEventListener("input", (e) => {
      if (form.dataset.tried) validate();
      if (e.target.name === "type") setError("type", "");
    });

    const status = form.querySelector(".slip__status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.dataset.tried = "1";
      const errors = validate();
      const first = Object.keys(errors)[0];
      if (first) {
        status.textContent = "";
        const target = first === "type" ? form.querySelector('input[name="type"]') : form.elements[first];
        target.focus();
        if (motionOn()) gsap.fromTo(form.querySelectorAll(".field__error:not([hidden])"), { x: -8, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "expo.out" });
        return;
      }
      const type = form.querySelector('input[name="type"]:checked').value;
      const date = new Date(form.start.value + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      status.textContent = `Demande prête : ${type.toLowerCase()} à ${form.place.value.trim()}, à partir du ${date}. Sur le site final, elle arrivera par email et WhatsApp.`;
      if (motionOn()) gsap.fromTo(status, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    });
  }

  // Le grand nom du pied de page occupe toute la largeur de la grille.
  const footerName = document.querySelector(".footer-name");
  const fitFooterName = () => {
    if (!footerName) return;
    const box = footerName.parentElement;
    const cs = getComputedStyle(box);
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    footerName.style.fontSize = "100px";
    const w = footerName.getBoundingClientRect().width;
    if (w) footerName.style.fontSize = `${(100 * avail) / w}px`;
  };
  fitFooterName();
  document.fonts?.ready.then(fitFooterName);
  window.addEventListener("resize", fitFooterName);

  if (!hasGsap) return;

  /* ---------------------------------------------------------------------- */
  /* Mouvement : GSAP (ScrollTrigger, SplitText, Flip, Draggable) et Lenis. */
  /* ---------------------------------------------------------------------- */

  gsap.registerPlugin(ScrollTrigger, ...[window.SplitText, window.Flip, window.Draggable, window.InertiaPlugin].filter(Boolean));
  const split = (el, vars) => (window.SplitText ? SplitText.create(el, vars) : null);
  const mm = gsap.matchMedia();
  const NO_REDUCE = "(prefers-reduced-motion: no-preference)";

  // Bandeau qui défile seul, accélère et change de sens avec le défilement.
  const marquee = (track, trigger, dir) => {
    if (!track) return;
    const loop = dir > 0
      ? gsap.to(track, { xPercent: -50, duration: 32, ease: "none", repeat: -1 })
      : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 28, ease: "none", repeat: -1 });
    let settle;
    ScrollTrigger.create({
      trigger, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 350);
        loop.timeScale(boost * self.direction);
        clearTimeout(settle);
        settle = setTimeout(() => gsap.to(loop, { timeScale: self.direction, duration: 0.8, ease: "power2.out" }), 120);
      },
    });
  };

  // Retournement de la carte, piloté par le défilement.
  // Sur téléphone, la carte ne s'épingle que si l'écran est assez haut pour la montrer entière.
  mm.add(`${NO_REDUCE} and (min-height: 520px) and (min-width: 641px), ${NO_REDUCE} and (min-height: 700px) and (max-width: 640px)`, () => {
    if (!card) return;
    root.classList.add("flip");
    card.dataset.side = "";
    setSide("front");
    const backPhotos = back.querySelectorAll(".back__photos figure");
    const tl = gsap.timeline({
      onUpdate: () => setSide(gsap.getProperty(card, "rotationY") > 90 ? "back" : "front"),
      scrollTrigger: {
        trigger: stage,
        start: () => `top ${headerHeight()}px`,
        end: "bottom bottom",
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
    tl.to(card, { rotationY: 180, duration: FLIP_SPAN, ease: "power2.inOut" }, FLIP_START)
      .to(card, { scale: 0.93, duration: FLIP_SPAN / 2, ease: "sine.out" }, FLIP_START)
      .to(card, { scale: 1, duration: FLIP_SPAN / 2, ease: "sine.in" }, FLIP_START + FLIP_SPAN / 2)
      .fromTo(backPhotos, { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.2, stagger: 0.035, ease: "power2.out" }, FLIP_START + FLIP_SPAN * 0.55)
      .to({}, { duration: 0.001 }, 1);
    flipTrigger = tl.scrollTrigger;

    return () => {
      root.classList.remove("flip");
      flipTrigger = null;
      delete card.dataset.side;
      front.inert = false;
      back.inert = false;
    };
  });

  mm.add(NO_REDUCE, () => {
    root.classList.add("motion");
    clearTimeout(window.introFallback);

    // Défilement amorti.
    let stopLenis = null;
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      const onAnchor = (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || a.classList.contains("skip-link") || !lenis) return;
        e.preventDefault();
        if (a.classList.contains("back-top")) { lenis.scrollTo(0, { duration: 1.8 }); document.querySelector(".wordmark")?.focus({ preventScroll: true }); return; }
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        lenis.scrollTo(target, { offset: -headerHeight() + (target === stage ? 0 : 1), duration: 1.4 });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      document.addEventListener("click", onAnchor);
      stopLenis = () => {
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenis = null;
      };
    }

    // Écran d'ouverture : le nom monte, le compteur suit le chargement de la carte, puis le rideau se lève.
    const runLoader = () => new Promise((resolve) => {
      const loader = document.querySelector(".loader");
      let seen = false;
      try { seen = sessionStorage.getItem("mannequin-loader") === "1"; } catch (e) {}
      if (!loader || seen) { loader?.remove(); resolve(); return; }
      try { sessionStorage.setItem("mannequin-loader", "1"); } catch (e) {}
      loader.style.display = "flex";
      lenis?.stop();
      const name = split(".loader__name", { type: "lines,chars", mask: "lines" });
      const count = loader.querySelector("[data-loader-count]");
      const bar = loader.querySelector(".loader__bar");
      // Le compteur suit le chargement réel des photos de la carte.
      const cardImgs = [...document.querySelectorAll(".face img")];
      const o = { v: 0 };
      let done = 0;
      const showProgress = (to, duration) => gsap.to(o, {
        v: to, duration, ease: "power2.out", overwrite: true,
        onUpdate: () => { count.textContent = String(Math.round(o.v)); gsap.set(bar, { scaleX: o.v / 100 }); },
      });
      const ready = Promise.race([
        Promise.all(cardImgs.map((img) => new Promise((r) => {
          const tick = () => { done += 1; showProgress((done / cardImgs.length) * 100, 0.5); r(); };
          if (img.complete) tick();
          else { img.addEventListener("load", tick, { once: true }); img.addEventListener("error", tick, { once: true }); }
        }))),
        new Promise((r) => setTimeout(r, 3500)),
      ]);
      // Un clic, une touche ou la molette passe l'écran d'ouverture.
      const skipped = new Promise((r) => {
        const events = ["keydown", "pointerdown", "wheel", "touchstart"];
        const skip = () => { events.forEach((t) => window.removeEventListener(t, skip)); r(); };
        events.forEach((t) => window.addEventListener(t, skip, { passive: true }));
      });
      const tl = gsap.timeline();
      tl.from(name ? name.chars : ".loader__name", { yPercent: 110, duration: 1, stagger: 0.04, ease: "power4.out" }, 0)
        .from(".loader .crop", { scale: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" }, 0.1)
        .from(".loader__foot", { opacity: 0, y: 12, duration: 0.6, ease: "power3.out" }, 0.3);
      Promise.race([Promise.all([tl.then(), ready]), skipped]).then(() => {
        tl.progress(1);
        showProgress(100, 0.25);
        const out = gsap.timeline({ onComplete: () => { loader.remove(); lenis?.start(); } });
        out.to(name ? name.chars : ".loader__name", { yPercent: -110, duration: 0.6, stagger: 0.025, ease: "power3.in" }, 0)
          .to([".loader__foot", ".loader .crop"], { opacity: 0, duration: 0.3 }, 0.15)
          .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power4.inOut" }, 0.45)
          .call(resolve, null, 0.85);
      });
    });

    // Entrée de la carte : repères de coupe, photo qui se révèle, nom qui monte, mensurations qui défilent.
    const intro = () => {
      const sheet = document.querySelector(".sheet");
      const name = split(".card-name", { type: "lines,chars", mask: "lines", linesClass: "split-line" });
      gsap.set(sheet, { visibility: "visible" });
      root.classList.remove("intro");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      // Les boutons ont leur propre transition CSS : on anime leurs conteneurs.
      tl.from(".site-header__inner", { y: -14, opacity: 0, duration: 0.7 }, 0)
        .from(".crop", { scale: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" }, 0.05)
        .from(card, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.1)
        .fromTo(".face__photo", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 0.25)
        .from(".face__photo img", { scale: 1.25, duration: 1.8 }, 0.25)
        .from(name ? name.chars : ".card-name", { yPercent: 110, duration: 1.05, stagger: 0.035 }, 0.5)
        .from([".card-id .tbc-tag", ".card-role", ".face--front .stats > div", ".card-agency", ".face--front .card-actions"],
          { y: 18, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }, 0.85)
        .add(() => countUp(front), 0.9)
        .from(".slug", { opacity: 0, duration: 0.6 }, 1.2);
      gsap.to(".slug__cue .icon", { y: 4, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    };
    (document.fonts?.ready || Promise.resolve()).then(runLoader).then(intro);

    // Progression de lecture.
    gsap.to(".read-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

    marquee(document.querySelector(".ticker__track"), ".ticker", 1);
    marquee(document.querySelector(".cta-band__track"), ".cta-band", -1);

    // Titres de section et grand nom du pied de page : les lettres montent depuis leur ligne.
    document.querySelectorAll(".display, .footer-name").forEach((title) => {
      const s = split(title, { type: "lines,chars", mask: "lines", linesClass: "split-line" });
      gsap.from(s ? s.chars : title, {
        yPercent: 110, duration: 1.1, stagger: 0.03, ease: "power4.out",
        scrollTrigger: { trigger: title, start: "top 88%", once: true },
      });
    });

    // Paragraphes : ligne par ligne, depuis leur masque. Le texte reste lisible tel quel par les lecteurs d'écran.
    document.querySelectorAll(".section-head__text p, .polas__text p, .parcours__intro .lead, .booking__intro .lead").forEach((p) => {
      const s = split(p, { type: "lines", mask: "lines", aria: "none" });
      if (!s) return;
      p.classList.add("js-lines");
      gsap.from(s.lines, {
        yPercent: 105, duration: 0.95, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: p, start: "top 90%", once: true },
      });
    });

    // Autres blocs : apparition discrète, groupée.
    const lift = ".filters, .facts > div, .subhead, .contacts li, .back-top";
    gsap.set(lift, { opacity: 0, y: 22 });
    ScrollTrigger.batch(lift, {
      start: "top 92%", once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "power3.out" }),
    });

    // Book : chaque tirage se développe de bas en haut, puis glisse en profondeur et penche avec la vitesse.
    gsap.set(".book-grid .shot", { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(".book-grid .shot img", { scale: 1.3 });
    gsap.set(".book-grid > li", { opacity: 0, y: 30 });
    ScrollTrigger.batch(".book-grid > li", {
      start: "top 90%", once: true,
      onEnter: (els) => {
        if (bookRevealed) return;
        gsap.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" });
        gsap.to(els.map((el) => el.querySelector(".shot")).filter(Boolean), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, stagger: 0.09, ease: "power4.out" });
        gsap.to(els.map((el) => el.querySelector(".shot img")).filter(Boolean), { scale: 1.12, duration: 1.7, stagger: 0.09, ease: "power3.out" });
      },
    });
    gsap.utils.toArray(".book-grid .shot").forEach((shot) => {
      gsap.fromTo(shot.querySelector("img"), { yPercent: -5 }, {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    const skewTo = gsap.quickTo(".book-grid .shot", "skewY", { duration: 0.5, ease: "power3" });
    let unskew;
    ScrollTrigger.create({
      trigger: ".book", start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        skewTo(gsap.utils.clamp(-3, 3, self.getVelocity() / -450));
        clearTimeout(unskew);
        unskew = setTimeout(() => skewTo(0), 140);
      },
    });

    // Polaroïds : lâchés sur le fond noir, ils se posent un à un.
    gsap.from(".pola", {
      y: -240, opacity: 0, rotation: (i) => [-14, 10, -9, 13][i % 4],
      duration: 1.15, stagger: 0.12, ease: "expo.out",
      scrollTrigger: { trigger: ".polas__row", start: "top 82%", once: true },
    });

    // Parcours : le trait avance, l'année en cours passe au noir.
    const cv = document.querySelector(".cv");
    if (cv) {
      ScrollTrigger.create({
        trigger: cv, start: "top 65%", end: "bottom 65%", scrub: 0.4,
        onUpdate: (self) => cv.style.setProperty("--progress", self.progress.toFixed(3)),
      });
      gsap.utils.toArray(".cv li").forEach((li) => {
        ScrollTrigger.create({ trigger: li, start: "top 65%", end: "bottom 65%", toggleClass: "is-current" });
      });
      gsap.from(".cv li", {
        x: -24, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: cv, start: "top 80%", once: true },
      });
    }

    // Formulaire de booking : la fiche se pose, puis les champs s'installent dans l'ordre.
    gsap.from(".slip", {
      y: 80, rotation: 2.5, opacity: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: ".slip", start: "top 88%", once: true },
    });
    gsap.from(".slip > *", {
      y: 28, opacity: 0, duration: 0.8, stagger: 0.06, delay: 0.25, ease: "power3.out",
      scrollTrigger: { trigger: ".slip", start: "top 88%", once: true },
    });

    // En-tête : s'efface quand on descend, revient quand on remonte.
    let headerHidden = false;
    const showHeader = (show) => {
      if (show === !headerHidden) return;
      headerHidden = !show;
      gsap.to(header, { yPercent: show ? 0 : -100, duration: 0.4, ease: show ? "power3.out" : "power2.in", overwrite: true });
    };
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        if (header.classList.contains("menu-open")) return showHeader(true);
        if (self.direction === 1 && self.scroll() > 400) showHeader(false);
        else if (self.direction === -1) showHeader(true);
      },
    });

    return () => {
      root.classList.remove("motion");
      stopLenis?.();
      gsap.set(header, { yPercent: 0 });
    };
  });

  // Pointeur fin : carte qui s'incline, curseur, liens qui roulent, boutons aimantés,
  // photo du parcours sous le pointeur, polaroïds à lancer.
  mm.add(`${NO_REDUCE} and (hover: hover) and (pointer: fine)`, () => {
    root.classList.add("has-cursor");
    const cleanups = [];
    const on = (el, type, fn, opts) => { el?.addEventListener(type, fn, opts); cleanups.push(() => el?.removeEventListener(type, fn, opts)); };

    // La carte s'incline vers le pointeur, la photo glisse en sens inverse.
    const sheet = document.querySelector(".sheet");
    const frontImg = document.querySelector(".face__photo img");
    if (sheet && stage) {
      gsap.set(sheet, { transformPerspective: 1400 });
      const rx = gsap.quickTo(sheet, "rotationX", { duration: 0.9, ease: "power3" });
      const ry = gsap.quickTo(sheet, "rotationY", { duration: 0.9, ease: "power3" });
      const ix = gsap.quickTo(frontImg, "x", { duration: 0.9, ease: "power3" });
      const iy = gsap.quickTo(frontImg, "y", { duration: 0.9, ease: "power3" });
      on(stage, "pointermove", (e) => {
        const r = sheet.getBoundingClientRect();
        const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2));
        const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2));
        ry(nx * 5); rx(-ny * 4); ix(-nx * 10); iy(-ny * 8);
      });
      on(stage, "pointerleave", () => { rx(0); ry(0); ix(0); iy(0); });
    }

    // Curseur : un carré qui devient « Voir » sur le book et « Lancer » sur les polaroïds.
    const cursor = document.querySelector(".cursor");
    const label = cursor.querySelector(".cursor__label");
    const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    let mode = "";
    const setMode = (next) => {
      if (next === mode) return;
      mode = next;
      const big = next === "voir" || next === "lancer";
      label.textContent = next === "voir" ? "Voir" : next === "lancer" ? "Lancer" : "";
      gsap.to(cursor, { width: big ? 84 : next === "link" ? 40 : 14, height: big ? 84 : next === "link" ? 40 : 14, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(label, { opacity: big ? 1 : 0, duration: 0.2, overwrite: "auto" });
    };
    gsap.set(cursor, { opacity: 0 });
    on(window, "pointermove", (e) => { cx(e.clientX); cy(e.clientY); gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" }); });
    on(document, "pointerover", (e) => {
      const t = e.target;
      if (t.closest(".shot")) setMode("voir");
      else if (t.closest(".pola")) setMode("lancer");
      else if (t.closest("a, button, label, select, input, textarea")) setMode("link");
      else setMode("");
    });
    on(document.documentElement, "pointerleave", () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));

    // Liens dont les lettres roulent au survol.
    const rolls = [...document.querySelectorAll("[data-roll]")].map((el) => {
      const text = el.textContent.trim();
      el.setAttribute("aria-label", text);
      el.innerHTML = `<span class="roll" aria-hidden="true"><span class="roll__a">${text}</span><span class="roll__b">${text}</span></span>`;
      const a = split(el.querySelector(".roll__a"), { type: "chars" });
      const b = split(el.querySelector(".roll__b"), { type: "chars" });
      const chars = [...(a ? a.chars : []), ...(b ? b.chars : [])];
      on(el, "pointerenter", () => gsap.to(chars, { yPercent: -100, duration: 0.45, stagger: 0.018, ease: "power3.inOut", overwrite: true }));
      on(el, "pointerleave", () => gsap.to(chars, { yPercent: 0, duration: 0.45, stagger: 0.018, ease: "power3.inOut", overwrite: true }));
      return { el, text };
    });
    cleanups.push(() => rolls.forEach(({ el, text }) => { el.textContent = text; el.removeAttribute("aria-label"); }));

    // Boutons aimantés : ils suivent un peu le pointeur et s'enfoncent à l'appui.
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      });
      on(el, "pointerleave", () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "expo.out", overwrite: "auto" }));
      on(el, "pointerdown", () => gsap.to(el, { scale: 0.96, duration: 0.12, ease: "power2.out" }));
      on(el, "pointerup", () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" }));
    });
    cleanups.push(() => gsap.set("[data-magnetic]", { clearProps: "x,y,scale" }));

    // Parcours : la photo de l'année suit le pointeur.
    const cvList = document.querySelector(".cv");
    const preview = document.querySelector(".cv-preview");
    if (cvList && preview) {
      const pimg = document.createElement("img");
      pimg.alt = "";
      preview.prepend(pimg);
      gsap.set(preview, { scale: 0.85 });
      const px = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
      const py = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
      on(cvList, "pointermove", (e) => { px(e.clientX - preview.offsetWidth * 0.75); py(e.clientY); });
      on(cvList, "pointerover", (e) => {
        const li = e.target.closest("li[data-preview]");
        if (!li || pimg.dataset.src === li.dataset.preview) return;
        pimg.dataset.src = li.dataset.preview;
        pimg.src = li.dataset.preview;
        gsap.fromTo(pimg, { scale: 1.2 }, { scale: 1, duration: 0.7, ease: "power3.out" });
        gsap.to(preview, { opacity: 1, scale: 1, rotation: gsap.utils.random(-4, 4), duration: 0.45, ease: "power3.out", overwrite: "auto" });
      });
      on(cvList, "pointerleave", () => {
        delete pimg.dataset.src;
        gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      });
      cleanups.push(() => pimg.remove());
    }

    // Polaroïds : on les attrape et on les lance sur le fond noir.
    let drags = [];
    if (window.Draggable) {
      drags = Draggable.create(".pola", {
        type: "x,y", bounds: ".polas", inertia: Boolean(window.InertiaPlugin), zIndexBoost: true, edgeResistance: 0.7,
        onPress() { gsap.to(this.target, { scale: 1.06, rotation: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" }); },
        onRelease() { gsap.to(this.target, { scale: 1, rotation: gsap.utils.random(-9, 9), duration: 0.7, ease: "expo.out" }); },
      });
      document.querySelectorAll(".pola img").forEach((img) => { img.draggable = false; });
    }

    return () => {
      root.classList.remove("has-cursor");
      cleanups.forEach((fn) => fn());
      drags.forEach((d) => d.kill());
    };
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
