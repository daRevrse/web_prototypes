/* Ibiza Bliss Resort — interactions du prototype */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- En-tête : fond au défilement, se cache en descendant ---------- */
  const header = $('.site-header');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!root.classList.contains('menu-open')) {
      if (y > 700 && y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 700) header.classList.remove('is-hidden');
    }
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu plein écran ---------- */
  const burger = $('.burger');
  const menu = $('#menu');
  let menuTimer;
  const setMenu = (open) => {
    clearTimeout(menuTimer);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    root.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      $('a', menu).focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      menuTimer = setTimeout(() => { menu.hidden = true; }, 360);
    }
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- Le ciel : la page change d'heure au défilement ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  const skyColors = { dawn: '#F3EBDD', noon: '#F5E2C0', afternoon: '#EFC98F', golden: '#E49A5E', sunset: '#8F3822', night: '#120E12' };
  const setSky = (sky) => {
    if (!sky || root.dataset.sky === sky) return;
    root.dataset.sky = sky;
    if (themeMeta && skyColors[sky]) themeMeta.content = skyColors[sky];
  };
  // La section qui traverse la ligne médiane de l'écran donne l'heure
  const skyObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setSky(en.target.dataset.sky); });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('body [data-sky]').forEach((el) => skyObserver.observe(el));

  /* ---------- Cadran solaire ---------- */
  const dial = $('.dial');
  const sun = $('.dial__sun');
  const label = $('#dial-label');
  const moments = $$('.moment');
  const CX = 110, CY = 110, R = 96;
  const pos = (t) => {
    const a = Math.PI * (1 - t);
    return [CX + R * Math.cos(a), CY - R * Math.sin(a)];
  };

  // Repères sur l'arc, un par moment
  const ticks = $('.dial__ticks');
  const tickEls = moments.map((m) => {
    const [x, y] = pos(parseFloat(m.dataset.sun));
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('r', '2.2');
    ticks.appendChild(c);
    return c;
  });

  let sunT = 0.1, sunRaf;
  const placeSun = (t) => {
    const [x, y] = pos(t);
    sun.setAttribute('transform', `translate(${x.toFixed(2)},${y.toFixed(2)})`);
  };
  // Le soleil suit l'arc (et non la corde) entre deux positions
  const moveSun = (target) => {
    cancelAnimationFrame(sunRaf);
    if (reduce) { sunT = target; placeSun(sunT); return; }
    const from = sunT, start = performance.now(), dur = 900;
    const ease = (k) => 1 - Math.pow(1 - k, 3);
    const step = (now) => {
      const k = Math.min(1, (now - start) / dur);
      sunT = from + (target - from) * ease(k);
      placeSun(sunT);
      if (k < 1) sunRaf = requestAnimationFrame(step);
    };
    sunRaf = requestAnimationFrame(step);
  };
  placeSun(sunT);

  let current = null;
  const activate = (m) => {
    if (current === m) return;
    current = m;
    const i = moments.indexOf(m);
    const night = m.dataset.sky === 'night';
    dial.classList.toggle('is-night', night);
    // la nuit, la lune se lève à gauche
    moveSun(night ? 0.22 : parseFloat(m.dataset.sun));
    tickEls.forEach((c, j) => c.classList.toggle('is-past', j <= i));
    $$('.dial__index li').forEach((li) => li.classList.toggle('is-active', li.dataset.for === m.id));
    if (label.textContent !== m.dataset.label) {
      label.classList.add('is-swapping');
      setTimeout(() => { label.textContent = m.dataset.label; label.classList.remove('is-swapping'); }, reduce ? 0 : 220);
    }
  };
  const momentObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) activate(en.target); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  moments.forEach((m) => momentObserver.observe(m));

  /* ---------- Apparitions ---------- */
  const revealEls = $$('.reveal, .reveal-img');
  // léger décalage entre éléments voisins d'un même bloc
  $$('.moment, .intro__text, .section-head, .stay__grid, .collage, .fire__side, .day__head').forEach((block) => {
    $$(':scope > .reveal, :scope > .reveal-img, :scope > * > .reveal-img', block).forEach((el, i) => {
      el.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`);
    });
  });
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => ro.observe(el));
  }

  /* ---------- Diaporama du hero : fondu enchaîné, sans zoom ---------- */
  const slider = $('#slider');
  if (slider) {
    const hero = slider.closest('.hero');
    const slides = $$('.hero__slide', slider);
    const dots = $$('.slider-dot');
    const cap = $('#slide-cap');
    const pauseBtn = $('#slider-pause');
    const ctrl = $('.slider-ctrl');
    let cur = 0;
    let userPaused = false, hoverPaused = false;
    root.style.setProperty('--slide-dur', '6000ms');

    // La pastille active se remplit ; quand elle est pleine, on passe à la photo suivante
    const run = () => {
      dots.forEach((d) => d.classList.remove('is-running'));
      if (reduce) return; // mouvement réduit : pas de défilement automatique
      void dots[cur].offsetWidth;
      dots[cur].classList.add('is-running');
    };
    const show = (i, manual) => {
      i = (i + slides.length) % slides.length;
      if (i !== cur) {
        slides[cur].classList.remove('is-active');
        slides[cur].setAttribute('aria-hidden', 'true');
        slides[i].classList.add('is-active');
        slides[i].removeAttribute('aria-hidden');
        cur = i;
      }
      dots.forEach((d, j) => { if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      cap.setAttribute('aria-live', manual ? 'polite' : 'off');
      cap.textContent = slides[i].dataset.caption;
      // précharge la photo suivante pour un fondu sans à-coup
      const next = $('img', slides[(i + 1) % slides.length]);
      if (next.loading === 'lazy') next.loading = 'eager';
      run();
    };
    dots.forEach((d, j) => {
      d.addEventListener('click', () => show(j, true));
      d.addEventListener('animationend', () => { if (j === cur && d.classList.contains('is-running')) show(cur + 1, false); });
    });
    $$('[data-slide]', hero).forEach((b) => b.addEventListener('click', () => show(cur + Number(b.dataset.slide), true)));

    const syncPause = () => hero.classList.toggle('is-paused', userPaused || hoverPaused || document.hidden);
    if (reduce) pauseBtn.hidden = true;
    pauseBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      pauseBtn.setAttribute('aria-label', userPaused ? 'Relancer le diaporama' : 'Mettre le diaporama en pause');
      $('.ico', pauseBtn).className = `ico ${userPaused ? 'ico--play' : 'ico--pause'}`;
      syncPause();
    });
    // pause pendant qu'on manipule les contrôles, ou quand l'onglet est caché
    ctrl.addEventListener('pointerenter', () => { hoverPaused = true; syncPause(); });
    ctrl.addEventListener('pointerleave', () => { hoverPaused = false; syncPause(); });
    ctrl.addEventListener('focusin', () => { hoverPaused = true; syncPause(); });
    ctrl.addEventListener('focusout', (e) => { if (!ctrl.contains(e.relatedTarget)) { hoverPaused = false; syncPause(); } });
    document.addEventListener('visibilitychange', syncPause);
    show(0, false);
  }

  /* ---------- Statut du restaurant, à l'heure de Kpogan (UTC+0) ---------- */
  const ticket = $('#resto-status');
  const pad = (n) => String(n).padStart(2, '0');
  const restoState = (d) => {
    const h = d.getUTCHours(), day = d.getUTCDay();
    const weekend = day === 6 || day === 0; // samedi, dimanche : jusqu'à minuit
    const close = weekend ? 24 : 23;
    if (h >= 17 && h < close) return { open: true, text: `Restaurant ouvert · ferme à ${close === 24 ? 'minuit' : '23h'}` };
    if (h < 17) return { open: false, text: 'Restaurant ouvert dès 17h' };
    return { open: false, text: 'Restaurant fermé · réouverture à 17h' };
  };
  const tick = () => {
    const s = restoState(new Date());
    $('.ticket__status-text', ticket).textContent = s.open ? 'Ouvert en ce moment' : s.text.replace('Restaurant ', '').replace(/^./, (c) => c.toUpperCase());
    $('.live__dot', ticket).classList.toggle('is-open', s.open);
  };
  tick();
  setInterval(tick, 30000);

  /* ---------- Réservation rapide : pas de date passée ---------- */
  const today = new Date();
  $$('#quickbook input[type="date"]').forEach((i) => { i.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`; });

  /* ---------- Galerie : boutons de défilement ---------- */
  const strip = $('.strip');
  $$('.gallery__ctrl .round').forEach((b) => b.addEventListener('click', () => {
    strip.scrollBy({ left: Number(b.dataset.dir) * strip.clientWidth * 0.75, behavior: reduce ? 'auto' : 'smooth' });
  }));
})();
