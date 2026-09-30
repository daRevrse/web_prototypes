/* Ibiza Bliss Resort — galerie : filtres et visionneuse (sans zoom) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;

  /* ---------- En-tête & menu (même comportement que l'accueil) ---------- */
  const header = $('.site-header');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!root.classList.contains('menu-open')) {
      if (y > 500 && y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 500) header.classList.remove('is-hidden');
    }
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  /* ---------- Vignettes : simple fondu une fois chargées ---------- */
  $$('.gal__btn img').forEach((img) => {
    const done = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ---------- Filtres (le filtre actif est gardé dans l'adresse : galerie.html#mariages) ---------- */
  const items = $$('.gal__item');
  const filters = $$('.gal-filter');
  const applyFilter = (cat, keep) => {
    if (!filters.some((f) => f.dataset.filter === cat)) cat = 'tout';
    filters.forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.filter === cat)));
    items.forEach((it) => { it.hidden = cat !== 'tout' && it.dataset.cat !== cat; });
    if (keep) history.replaceState(null, '', cat === 'tout' ? location.pathname : `#${cat}`);
  };
  filters.forEach((f) => f.addEventListener('click', () => applyFilter(f.dataset.filter, true)));
  applyFilter(decodeURIComponent(location.hash.slice(1)) || 'tout', false);

  /* ---------- Visionneuse ---------- */
  const lb = $('#lb');
  if (!lb || !$('#photos')) return; // page sans grille de photos
  const img = $('#lb-img');
  let list = [], pos = 0, opener = null;

  const render = () => {
    const b = list[pos];
    const thumb = $('img', b);
    img.classList.add('is-swapping');
    const full = new Image();
    full.onload = full.onerror = () => {
      if (list[pos] !== b) return; // une autre photo a été demandée entre-temps
      img.src = b.dataset.full;
      img.alt = thumb.alt;
      img.classList.remove('is-swapping');
    };
    full.src = b.dataset.full;
    $('#lb-cat').textContent = b.dataset.catLabel;
    $('#lb-alt').textContent = thumb.alt;
    $('#lb-count').textContent = `${pos + 1} / ${list.length}`;
    // précharge les photos voisines
    [pos - 1, pos + 1].forEach((k) => { new Image().src = list[(k + list.length) % list.length].dataset.full; });
  };
  const open = (btn) => {
    list = items.filter((it) => !it.hidden).map((it) => $('.gal__btn', it));
    pos = list.indexOf(btn);
    opener = btn;
    render();
    lb.showModal();
    root.style.overflow = 'hidden';
  };
  const step = (d) => { pos = (pos + d + list.length) % list.length; render(); };

  $('#photos').addEventListener('click', (e) => { const b = e.target.closest('.gal__btn'); if (b) open(b); });
  $('#lb-prev').addEventListener('click', () => step(-1));
  $('#lb-next').addEventListener('click', () => step(1));
  $('#lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('close', () => { root.style.overflow = ''; opener?.focus(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
  // un clic sur le fond (hors photo et boutons) ferme la visionneuse
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.id === 'lb-fig') lb.close(); });
  // balayage sur écran tactile
  let x0 = null;
  lb.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
  lb.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
})();
