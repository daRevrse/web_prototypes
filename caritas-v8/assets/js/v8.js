/* Caritas Africa v8 — mega menu, menu mobile, en-tête collant, apparitions, sommaire. */
(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const mega = document.querySelector('[data-mega]');
  const scrim = document.querySelector('[data-scrim]');
  const indicator = document.querySelector('[data-indicator]');
  const navBtns = [...document.querySelectorAll('.bar .nav-btn')];
  const triggers = [...document.querySelectorAll('.bar [data-panel]')];
  const panels = Object.fromEntries([...document.querySelectorAll('.mm-panel')].map((p) => [p.dataset.name, p]));
  const order = ['qui', 'reseau', 'action', 'actus', 'ressources', 'search'];
  const desktop = matchMedia('(min-width: 1180px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let current = null;
  let closeTimer = 0;
  let lastPointer = 'mouse';
  let hoverOpenedAt = 0;

  const triggerFor = (name) => triggers.find((t) => t.dataset.panel === name);

  /* ---------- Mega menu ---------- */
  function moveIndicator(btn) {
    if (!btn || !btn.classList.contains('nav-btn')) { indicator.classList.remove('is-on'); return; }
    const base = indicator.parentElement.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    const cs = getComputedStyle(btn);
    const pl = parseFloat(cs.paddingLeft);
    const pr = parseFloat(cs.paddingRight);
    const fresh = !indicator.classList.contains('is-on');
    if (fresh) indicator.classList.add('no-anim');
    indicator.style.transform = `translateX(${r.left - base.left + pl}px) scaleX(${r.width - pl - pr})`;
    if (fresh) { void indicator.offsetWidth; indicator.classList.remove('no-anim'); }
    indicator.classList.add('is-on');
  }

  function fitHeight() {
    if (current) mega.style.height = panels[current].offsetHeight + 'px';
  }

  function open(name, { focus = false } = {}) {
    clearTimeout(closeTimer);
    const panel = panels[name];
    if (!panel) return;
    const btn = triggerFor(name);
    if (current === name) { moveIndicator(btn); return; }

    const prev = current ? panels[current] : null;
    const dir = prev ? (Math.sign(order.indexOf(name) - order.indexOf(current)) || 1) : 0;
    if (prev) {
      prev.style.setProperty('--dir', dir);
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 380);
    }
    panel.classList.remove('is-leaving');
    panel.style.setProperty('--dir', dir);
    void panel.offsetWidth;
    panel.classList.add('is-active');

    current = name;
    mega.classList.add('is-open');
    scrim.classList.add('is-on');
    fitHeight();
    triggers.forEach((t) => t.setAttribute('aria-expanded', String(t.dataset.panel === name)));
    moveIndicator(btn);

    if (focus) {
      const target = panel.querySelector('input') || panel.querySelector('.mm-links a, a');
      if (target) setTimeout(() => target.focus({ preventScroll: true }), reduce.matches ? 0 : 60);
    }
  }

  function close({ restoreFocus = false } = {}) {
    clearTimeout(closeTimer);
    if (!current) return;
    const btn = triggerFor(current);
    panels[current].classList.remove('is-active');
    current = null;
    mega.classList.remove('is-open');
    mega.style.height = '0px';
    scrim.classList.remove('is-on');
    triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
    indicator.classList.remove('is-on');
    if (restoreFocus && btn) btn.focus();
  }

  const scheduleClose = () => { clearTimeout(closeTimer); closeTimer = setTimeout(close, 200); };

  document.addEventListener('pointerdown', (e) => { lastPointer = e.pointerType || 'mouse'; }, true);

  navBtns.forEach((btn) => {
    btn.addEventListener('pointerenter', (e) => {
      if (!desktop.matches || e.pointerType !== 'mouse') return;
      if (current !== btn.dataset.panel) hoverOpenedAt = performance.now();
      open(btn.dataset.panel);
    });
  });

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const name = btn.dataset.panel;
      const byMouse = e.detail > 0 && lastPointer === 'mouse';
      if (btn.classList.contains('nav-btn') && byMouse && current === name) {
        // Panneau déjà ouvert par le survol : un clic mène à la page de la rubrique, comme sur caritas.org.
        if (performance.now() - hoverOpenedAt < 450) return;
        const link = panels[name].querySelector('.mm-intro .link-arrow');
        if (link) { window.location.href = link.href; }
        return;
      }
      if (current === name) close();
      else open(name, { focus: name === 'search' || !byMouse });
    });
  });

  header.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && desktop.matches && current && current !== 'search') scheduleClose(); });
  header.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  scrim.addEventListener('click', () => close());

  header.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current) { e.preventDefault(); close({ restoreFocus: true }); return; }
    const i = navBtns.indexOf(document.activeElement);
    if (i === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = navBtns[(i + (e.key === 'ArrowRight' ? 1 : -1) + navBtns.length) % navBtns.length];
      next.focus();
      if (current) open(next.dataset.panel);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      open(navBtns[i].dataset.panel, { focus: true });
      if (current === navBtns[i].dataset.panel) {
        const first = panels[current].querySelector('.mm-links a');
        if (first) first.focus({ preventScroll: true });
      }
    }
  });

  header.addEventListener('focusout', (e) => {
    if (!desktop.matches) return;
    if (e.relatedTarget && !header.contains(e.relatedTarget)) close();
  });

  window.addEventListener('resize', () => {
    fitHeight();
    if (current) moveIndicator(triggerFor(current));
    if (!desktop.matches) close();
    if (desktop.matches) closeDrawer();
  });

  /* ---------- En-tête collant ---------- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');
  const accBtns = [...document.querySelectorAll('[data-acc]')];

  function openDrawer() {
    drawer.style.setProperty('--drawer-top', Math.max(0, header.getBoundingClientRect().bottom) + 'px');
    drawer.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    burger.querySelector('use').setAttribute('href', '#i-x');
    root.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    burger.querySelector('use').setAttribute('href', '#i-menu');
    root.style.overflow = '';
  }
  function expand(name) {
    accBtns.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.acc === name && b.getAttribute('aria-expanded') !== 'true')));
  }
  burger.addEventListener('click', () => (drawer.classList.contains('is-open') ? closeDrawer() : openDrawer()));
  accBtns.forEach((b) => b.addEventListener('click', () => expand(b.dataset.acc)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) { closeDrawer(); burger.focus(); } });

  /* ---------- Raccourcis « ouvrir une rubrique » ---------- */
  document.querySelectorAll('[data-open]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const name = chip.dataset.open;
      if (desktop.matches) {
        open(name);
        triggerFor(name).focus({ preventScroll: true });
      } else {
        openDrawer();
        accBtns.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.acc === name)));
      }
    });
  });

  /* ---------- Apparitions au défilement et chiffres ---------- */
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  const counters = [...document.querySelectorAll('[data-count]')];

  function countUp(el) {
    const end = parseInt(el.dataset.count, 10);
    const start = end > 1000 ? end - 95 : 0;
    if (reduce.matches) { el.textContent = end; return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 1400);
      el.textContent = Math.round(start + (end - start) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  let io = null;
  function observe() {
    if (!('IntersectionObserver' in window)) { reveals.forEach((el) => el.classList.add('is-in')); return; }
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  }
  observe();

  const replay = document.querySelector('[data-replay]');
  if (replay) {
    replay.addEventListener('click', () => {
      if (io) io.disconnect();
      reveals.forEach((el) => el.classList.remove('is-in'));
      counters.forEach((el) => { el.textContent = el.dataset.count; });
      requestAnimationFrame(() => requestAnimationFrame(observe));
    });
  }

  /* ---------- Sommaire ---------- */
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if ('IntersectionObserver' in window && tocLinks.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === '#' + entry.target.id)));
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('.g-section[id]').forEach((s) => spy.observe(s));
  }

  /* ---------- Formulaire d'exemple ---------- */
  const demo = document.querySelector('[data-demo-form]');
  if (demo) {
    demo.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = demo.querySelector('[data-demo-msg]');
      msg.style.color = 'var(--red)';
      msg.style.fontWeight = '700';
    });
  }
})();
