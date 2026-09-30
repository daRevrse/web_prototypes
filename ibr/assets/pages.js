/* Ibiza Bliss Resort — pages Restaurant et Soirées : onglets, statut, agenda */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Kpogan est à UTC+0
  const now = new Date();
  const todayIso = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;
  const parse = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- Onglets accessibles (carte du restaurant) ---------- */
  $$('[role="tablist"]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const select = (t, focus) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  /* ---------- Restaurant : ouvert ou fermé, à l'heure de Kpogan ---------- */
  const live = $('#resto-live');
  if (live) {
    const tick = () => {
      const d = new Date();
      const h = d.getUTCHours(), day = d.getUTCDay();
      const close = day === 6 || day === 0 ? 24 : 23;
      const open = h >= 17 && h < close;
      $('.live__dot', live).classList.toggle('is-open', open);
      $('span:last-child', live).textContent = open
        ? `Ouvert en ce moment · jusqu’à ${close === 24 ? 'minuit' : '23h'}`
        : h < 17 ? 'Fermé · ouvre aujourd’hui à 17h' : 'Fermé · réouverture demain à 17h';
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Agenda ---------- */
  const A = window.IBR_AGENDA;
  const list = $('#agenda-list');
  if (!A || !list) return;

  const fmtFull = (iso) => cap(parse(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  const book = (id) => `reserver.html?type=activite&activite=${encodeURIComponent(id)}`;

  // Rendez-vous de la semaine, avec la prochaine date calculée
  const hebdo = $('#hebdo');
  if (hebdo) {
    hebdo.innerHTML = A.hebdo.map((w) => {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      while (d.getUTCDay() !== w.jour) d.setUTCDate(d.getUTCDate() + 1);
      const next = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
      return `<li class="wk"><p class="wk__day">Chaque ${esc(d.toLocaleDateString('fr-FR', { weekday: 'long', timeZone: 'UTC' }))}</p>
        <h3>${esc(w.titre)}</h3><p>${esc(w.resume)}</p><p class="wk__next">Prochaine&nbsp;: ${esc(next)}</p>
        <a class="link-arrow" href="${book(w.id)}">Réserver ma soirée <span class="arrow" aria-hidden="true"></span></a></li>`;
    }).join('');
  }

  const upcoming = A.evenements.filter((e) => !e.date || e.date >= todayIso)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const past = A.evenements.filter((e) => e.date && e.date < todayIso).sort((a, b) => b.date.localeCompare(a.date));

  const card = (e) => {
    const isPast = e.date && e.date < todayIso;
    const d = e.date ? parse(e.date) : null;
    const when = d
      ? `<p class="ev__date"><strong>${d.getDate()}</strong><span>${d.toLocaleDateString('fr-FR', { month: 'short' })}</span></p>`
      : '<p class="ev__date ev__date--soon"><span>Bientôt</span></p>';
    const action = isPast
      ? '<span class="tag tag--muted">Passé</span>'
      : `<a class="link-arrow" href="${book(e.id)}">${e.date ? 'S’inscrire' : 'Être tenu informé'} <span class="arrow" aria-hidden="true"></span></a>`;
    return `<li class="ev${isPast ? ' is-past' : ''}">${when}
      <figure class="ev__img">${e.image ? `<img src="${esc(e.image)}" alt="" loading="lazy">` : ''}</figure>
      <div class="ev__body"><h3>${esc(e.titre)}</h3><p>${e.date ? esc(fmtFull(e.date)) : 'Date bientôt annoncée'}</p></div>
      <div class="ev__action">${action}</div></li>`;
  };

  // Filtres : à venir, les trois prochains mois, passés
  const months = [0, 1, 2].map((k) => {
    const m = new Date(now.getUTCFullYear(), now.getUTCMonth() + k, 1);
    return { key: `${m.getFullYear()}-${pad(m.getMonth() + 1)}`, label: cap(m.toLocaleDateString('fr-FR', { month: 'long' })) };
  });
  const views = [
    { key: 'avenir', label: 'À venir', items: () => upcoming, empty: 'Aucun événement annoncé pour le moment.' },
    ...months.map((m) => ({
      key: m.key, label: m.label,
      items: () => A.evenements.filter((e) => e.date && e.date.startsWith(m.key)).sort((a, b) => a.date.localeCompare(b.date)),
      empty: `Aucun événement annoncé en ${m.label.toLowerCase()}.`,
    })),
    { key: 'passes', label: 'Passés', items: () => past, empty: 'Aucun événement passé.' },
  ];
  const filters = $('#agenda-filters');
  filters.innerHTML = views.map((v, i) => `<button type="button" class="gal-filter" data-view="${v.key}" aria-pressed="${i === 0}">${esc(v.label)}</button>`).join('');
  const show = (key) => {
    const v = views.find((x) => x.key === key) || views[0];
    $$('.gal-filter', filters).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v.key)));
    const items = v.items();
    list.innerHTML = items.length ? items.map(card).join('')
      : `<li class="ev-empty"><p>${esc(v.empty)}</p><p>Les soirées du jeudi et du vendredi ont lieu chaque semaine.</p></li>`;
  };
  filters.addEventListener('click', (e) => { const b = e.target.closest('[data-view]'); if (b) show(b.dataset.view); });
  show('avenir');
})();
