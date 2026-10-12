/* Version 2 : mêmes contenus que la version classique, interface enrichie */
(function(){
  'use strict';
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var norm = function(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim(); };
  var el = function(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
  var params = new URLSearchParams(location.search);
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Notifications ---------- */
  var toasts = el('div', 'toasts');
  toasts.setAttribute('role', 'status');
  document.body.appendChild(toasts);
  function toast(message){
    var t = el('div', 'toast'), close = el('button', '', 'Fermer');
    close.type = 'button';
    t.appendChild(el('span', '', message)); t.appendChild(close);
    toasts.appendChild(t);
    var remaining = 6000, started = 0, timer = 0;
    function dismiss(){ clearTimeout(timer); t.classList.add('leaving'); setTimeout(function(){ t.remove(); }, 180); }
    function run(){ started = Date.now(); timer = setTimeout(dismiss, remaining); }
    function pause(){ clearTimeout(timer); remaining = Math.max(1500, remaining - (Date.now() - started)); }
    close.addEventListener('click', dismiss);
    t.addEventListener('mouseenter', pause); t.addEventListener('mouseleave', run);
    t.addEventListener('focusin', pause); t.addEventListener('focusout', run);
    /* le compte à rebours s'arrête quand l'onglet n'est pas visible */
    document.addEventListener('visibilitychange', function(){ if (t.isConnected) { if (document.hidden) pause(); else run(); } });
    run();
  }

  /* ---------- Thème clair ou sombre, mémorisé ---------- */
  var themeBtn = $('#theme-toggle');
  function setTheme(dark, save){
    if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.textContent = dark ? 'Thème clair' : 'Thème sombre';
    if (save) { try { localStorage.setItem('kloto-theme', dark ? 'dark' : 'light'); } catch (e) {} }
  }
  setTheme(document.documentElement.dataset.theme === 'dark', false);
  themeBtn.addEventListener('click', function(){ setTheme(document.documentElement.dataset.theme !== 'dark', true); });

  $$('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ $$('.lang button').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); }); });
  });

  /* ---------- Mairie ouverte ou fermée (le Togo est à l'heure UTC toute l'année) ---------- */
  var SLOTS = [[420, 720], [870, 1050]];
  function fmt(v){ return Math.floor(v / 60) + ' h ' + String(v % 60).padStart(2, '0'); }
  function mairieState(){
    var now = new Date(), d = now.getUTCDay(), m = now.getUTCHours() * 60 + now.getUTCMinutes();
    var weekday = d >= 1 && d <= 5, cur = null, next = null;
    if (weekday) SLOTS.forEach(function(s){ if (m >= s[0] && m < s[1]) cur = s; if (!next && m < s[0]) next = s; });
    if (cur) return { open: true, day: d, text: 'Mairie ouverte, ferme à ' + fmt(cur[1]) };
    if (weekday && next) return { open: false, day: d, text: 'Mairie fermée, ouvre à ' + fmt(next[0]) };
    return { open: false, day: d, text: 'Mairie fermée, ouvre ' + (d >= 1 && d <= 4 ? 'demain' : 'lundi') + ' à ' + fmt(SLOTS[0][0]) };
  }
  var state = mairieState(), statusEl = $('#status');
  statusEl.textContent = state.text;
  statusEl.dataset.open = String(state.open);

  /* ---------- Menu : panneaux déroulants, tiroir sur téléphone, barre collante ---------- */
  var nav = $('#site-navigation'), toggle = $('.menu-toggle'), menu = $('#primary-menu');
  function closeSubs(except){
    $$('.menu > li.open').forEach(function(li){
      if (li === except) return;
      li.classList.remove('open', 'kb');
      li.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  }
  $$('.menu > li.menu-item-has-children > button').forEach(function(btn){
    btn.addEventListener('click', function(e){
      var li = btn.parentElement, open = !li.classList.contains('open');
      closeSubs(li);
      li.classList.toggle('kb', e.detail === 0);   /* detail vaut 0 quand le clic vient du clavier */
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  function setDrawer(open, fromKeyboard){
    document.body.classList.toggle('no-anim', !!fromKeyboard);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) $('.drawer-close button').focus({ preventScroll: true }); else toggle.focus({ preventScroll: true });
  }
  toggle.addEventListener('click', function(e){ setDrawer(!document.body.classList.contains('nav-open'), e.detail === 0); });
  $$('[data-drawer-close]').forEach(function(b){ b.addEventListener('click', function(e){ setDrawer(false, e.detail === 0); }); });
  menu.addEventListener('keydown', function(e){
    if (e.key !== 'Tab' || !document.body.classList.contains('nav-open')) return;
    var items = $$('a,button', menu), first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.addEventListener('click', function(e){ if (!e.target.closest('.menu')) closeSubs(); });
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    if (document.body.classList.contains('nav-open')) { setDrawer(false, true); return; }
    var li = document.activeElement.closest && document.activeElement.closest('.menu > li.open');
    closeSubs();
    if (li) li.querySelector('button').focus();
  });
  new IntersectionObserver(function(entries){
    var away = !entries[0].isIntersecting;
    nav.classList.toggle('is-stuck', away);
    document.body.classList.toggle('is-scrolled', away);
  }).observe($('#masthead'));

  var toTop = el('a', 'button to-top', 'Haut de page');
  toTop.href = '#top';
  document.body.appendChild(toTop);

  /* ---------- Recherche instantanée ---------- */
  var S = 'Démarches et services', P = 'Pages', A = 'Actualités';
  function svc(t, d, k){ return { g: S, t: t, d: d, k: k, u: 'index.html?s=' + encodeURIComponent(t) + '#services' }; }
  var INDEX = [
    svc('État civil', 'Naissance, mariage, décès, légalisation de documents', 'acte certificat copie livret'),
    svc('Urbanisme', 'Permis de construire, lotissement, occupation du domaine public', 'terrain construction'),
    svc('Taxes', 'Taxes et redevances communales, où et comment payer', 'impots payer marche'),
    svc('Marchés publics', "Avis d'appel d'offres et résultats d'attribution", 'fournisseurs'),
    svc('Emploi', 'Offres de la mairie et opportunités dans la commune', 'recrutement travail stage'),
    svc('Éducation', 'Écoles, cantines et appui aux établissements', 'scolaire'),
    svc('Santé', 'Centres de santé, campagnes de vaccination, hygiène', 'hopital'),
    svc('Social', 'Aide aux personnes vulnérables, jeunesse, genre', ''),
    svc('Sécurité', 'Prévention, protection civile, numéros utiles', 'urgences'),
    svc('Environnement', 'Collecte des déchets, assainissement, espaces verts', 'ordures caniveau'),
    svc('Culture', 'Fêtes traditionnelles, artisanat, équipements culturels', 'batik'),
    svc('Tourisme', 'Sites à visiter, guides et hébergements', 'cascade mont chateau'),
    svc('Finances', 'Budget, comptes administratifs, redevabilité', ''),
    svc('Statistiques', 'Population, équipements et indicateurs de la commune', 'chiffres'),
    svc('Jumelages', 'Villes partenaires et coopération décentralisée', ''),
    { g: S, t: 'Signaler un problème dans ma rue', d: 'Dépôt d\'ordures, caniveau bouché, lampadaire en panne', k: 'voirie eclairage signalement', u: 'index.html#signaler', top: 1 },
    { g: P, t: 'Contact et horaires', d: 'Coordonnées, horaires d\'ouverture, formulaire', k: 'telephone adresse email ecrire carte', u: 'contact.html', top: 1 },
    { g: P, t: 'La commune de Kloto 1', d: 'Présentation, cantons, chiffres clés, repères', k: 'a propos kpalime histoire population', u: 'a-propos.html', top: 1 },
    { g: P, t: 'La décentralisation au Togo', d: 'Ce que fait la commune, les lois, les élections', k: 'loi communes', u: 'a-propos.html#decentralisation' },
    { g: P, t: 'Les huit cantons', d: 'Gbalavé, Hanyigba, Kpadapé, Kpalimé, Tomé, Tové, Womé, Yokélé', k: 'quartiers', u: 'a-propos.html#cantons' },
    { g: P, t: 'Le maire et le bureau exécutif', d: 'Mot du maire, adjoints, conseil municipal', k: 'atigaku elus conseil municipal', u: 'index.html#maire' },
    { g: P, t: 'Galerie', d: 'Kpalimé et ses environs en images', k: 'photos cascade cathedrale chateau', u: 'index.html#galerie' },
    { g: P, t: 'Annonces et avis', d: 'Appels d\'offres, communiqués, recrutements', k: '', u: 'actualites.html#annonces' },
    { g: A, t: 'Session budgétaire du conseil municipal', d: '5 octobre 2026', k: 'budget', u: 'actualites.html' },
    { g: A, t: 'Kloto 1, Kloto 2 et Kloto 3 s\'unissent pour le climat', d: 'Mars 2026', k: 'intercommunalite solidarite environnement', u: 'actualites.html?cat=environnement' },
    { g: A, t: 'Les administrations communales en formation à Kpalimé', d: 'Janvier 2026', k: 'gestion municipale', u: 'actualites.html' },
    { g: A, t: 'Le conseil municipal prépare le budget 2026', d: 'Novembre 2025', k: 'session budgetaire', u: 'actualites.html' },
    { g: A, t: 'Le maire Kossi Afélété Atigaku prend ses fonctions', d: '12 novembre 2025', k: 'passation', u: 'actualites.html' },
    { g: A, t: 'Kossi Afélété Atigaku élu maire de Kloto 1', d: '17 octobre 2025', k: 'election', u: 'actualites.html' }
  ];
  INDEX[0].top = INDEX[1].top = INDEX[2].top = 1;
  INDEX.forEach(function(it){ it.hay = norm(it.t + ' ' + it.d + ' ' + it.k); });
  var dialog = $('#search-dialog'), sInput = $('#search-input'), sResults = $('#search-results'), sCount = $('#search-count');
  function renderSearch(){
    var q = norm(sInput.value), words = q.split(/\s+/).filter(Boolean);
    var hits = q ? INDEX.filter(function(it){ return words.every(function(w){ return it.hay.indexOf(w) !== -1; }); }).slice(0, 10)
                 : INDEX.filter(function(it){ return it.top; });
    sResults.textContent = '';
    sCount.textContent = !q ? 'Les plus demandés' : hits.length + (hits.length > 1 ? ' résultats' : ' résultat');
    if (!hits.length) {
      sResults.appendChild(el('p', '', 'Aucun résultat pour « ' + sInput.value.trim() + ' ». Essayez « état civil », « taxes » ou « contact ».'));
      return;
    }
    var group = '';
    hits.forEach(function(it){
      if (it.g !== group) { group = it.g; sResults.appendChild(el('h3', '', group)); }
      var a = el('a'); a.href = it.u;
      a.appendChild(el('strong', '', it.t)); a.appendChild(el('span', '', it.d));
      sResults.appendChild(a);
    });
  }
  function openSearch(){ if (dialog.open) return; sInput.value = ''; renderSearch(); dialog.showModal(); sInput.focus(); }
  $$('[data-search-open]').forEach(function(b){ b.addEventListener('click', openSearch); });
  sInput.addEventListener('input', renderSearch);
  dialog.addEventListener('click', function(e){ if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', function(e){
    var links = $$('a', sResults), i = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); (links[i + 1] || links[0] || sInput).focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i - 1] : sInput).focus(); }
    else if (e.key === 'Enter' && document.activeElement === sInput && links[0]) { e.preventDefault(); links[0].click(); }
  });
  document.addEventListener('keydown', function(e){
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    e.preventDefault(); openSearch();
  });

  /* ---------- Validation champ par champ ---------- */
  function fieldMessage(f){
    var v = f.value.trim();
    if (f.required && !v) return 'Ce champ est à remplir.';
    if (f.type === 'email' && v && !f.checkValidity()) return 'Saisissez une adresse e-mail valide, par exemple nom@exemple.tg.';
    return '';
  }
  function checkField(f){
    var msg = fieldMessage(f), holder = f.closest('.field') || f.form.parentElement, err = $('.field-error', holder);
    if (msg) {
      if (!err) { err = el('p', 'field-error'); err.id = f.id + '-error'; holder.appendChild(err); }
      err.textContent = msg;
      f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', err.id);
    } else {
      if (err) err.remove();
      f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby');
    }
    return !msg;
  }
  function liveForm(form, onValid){
    if (!form) return;
    var fields = $$('input:not([type=file]),select,textarea', form);
    fields.forEach(function(f){
      f.addEventListener('blur', function(){ if (f.value.trim() || f.hasAttribute('aria-invalid')) checkField(f); });
      /* une erreur affichée disparaît dès que la saisie redevient correcte */
      f.addEventListener('input', function(){ if (f.hasAttribute('aria-invalid')) checkField(f); });
    });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var bad = fields.filter(function(f){ return !checkField(f); });
      var summary = $('.form-error', form);
      if (bad.length) {
        if (summary) { summary.hidden = false; summary.textContent = bad.length + (bad.length > 1 ? ' champs à corriger.' : ' champ à corriger.'); }
        bad[0].focus();
        return;
      }
      if (summary) summary.hidden = true;
      onValid(form);
    });
  }
  function swap(form, done, again){
    form.hidden = true; done.hidden = false; $('h3', done).focus();
    again.onclick = function(){ form.reset(); $$('.char-count', form).forEach(function(c){ c.textContent = c.dataset.empty; }); done.hidden = true; form.hidden = false; $('input,select', form).focus(); };
  }
  liveForm($('#report'), function(form){
    $('#done-type').textContent = $('#r-type').value;
    $('#done-lieu').textContent = $('#r-lieu').value.trim() + ', canton de ' + $('#r-canton').value;
    swap(form, $('#report-done'), $('#report-again'));
    toast('Signalement envoyé (démonstration, rien n\'a été transmis).');
  });
  liveForm($('#contact-form'), function(form){
    swap(form, $('#contact-done'), $('#contact-again'));
    toast('Message envoyé (démonstration, rien n\'a été transmis).');
  });
  liveForm($('#newsletter'), function(form){
    form.reset(); $('#n-out').textContent = '';
    toast('Inscription enregistrée (démonstration).');
  });

  /* ---------- Accueil : filtre des services, compteurs, visionneuse ---------- */
  var filter = $('#filter');
  if (filter) {
    var rows = $$('#guide li'), empty = $('#empty');
    var applyFilter = function(){
      var words = norm(filter.value).split(/\s+/).filter(Boolean), shown = 0;
      rows.forEach(function(li){
        var hay = norm(li.textContent + ' ' + (li.dataset.k || ''));
        var hit = words.every(function(w){ return hay.indexOf(w) !== -1; });
        li.hidden = !hit; if (hit) shown++;
      });
      $$('#guide .service-group').forEach(function(g){ g.hidden = !$('li:not([hidden])', g); });
      empty.hidden = shown > 0;
      if (!shown) empty.textContent = 'Aucun service ne correspond à « ' + filter.value.trim() + ' ». Essayez « état civil », « taxes » ou « permis ».';
    };
    filter.addEventListener('input', applyFilter);
    if (params.get('s')) { filter.value = params.get('s'); applyFilter(); }
  }

  var counters = $('.counters');
  if (counters && !reduceMotion) {
    var nf = new Intl.NumberFormat('fr-FR');
    new IntersectionObserver(function(entries, obs){
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      $$('dd', counters).forEach(function(dd){
        var target = parseInt(dd.textContent.replace(/\D/g, ''), 10), start = performance.now(), dur = 900;
        (function tick(now){
          var p = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - p, 4);
          dd.textContent = nf.format(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: .4 }).observe(counters);
  }

  var shots = $$('.gallery-item');
  if (shots.length) {
    var box = el('dialog', 'lightbox'), fig = el('figure'), big = el('img'), cap = el('figcaption'), bar = el('div', 'lightbox-bar');
    var count = el('span', 'lightbox-count'), prev = el('button', 'button button-outline', 'Précédente'), next = el('button', 'button button-outline', 'Suivante'), shut = el('button', 'button', 'Fermer');
    [prev, next, shut].forEach(function(b){ b.type = 'button'; });
    box.setAttribute('aria-label', 'Visionneuse de la galerie');
    fig.appendChild(big); fig.appendChild(cap);
    [count, prev, next, shut].forEach(function(n){ bar.appendChild(n); });
    box.appendChild(fig); box.appendChild(bar); document.body.appendChild(box);
    var current = 0;
    var show = function(i){
      current = (i + shots.length) % shots.length;
      var img = $('img', shots[current]);
      big.src = img.currentSrc || img.src; big.alt = img.alt;
      cap.innerHTML = $('figcaption', shots[current]).innerHTML;
      count.textContent = (current + 1) + ' / ' + shots.length;
    };
    shots.forEach(function(item, i){
      var img = $('img', item), btn = el('button', 'gallery-open');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Agrandir la photo : ' + $('strong', item).textContent);
      item.insertBefore(btn, img); btn.appendChild(img);
      btn.addEventListener('click', function(){ show(i); box.showModal(); shut.focus(); });
    });
    prev.addEventListener('click', function(){ show(current - 1); });
    next.addEventListener('click', function(){ show(current + 1); });
    shut.addEventListener('click', function(){ box.close(); });
    box.addEventListener('click', function(e){ if (e.target === box) box.close(); });
    box.addEventListener('keydown', function(e){
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    box.addEventListener('close', function(){ var b = $('.gallery-open', shots[current]); if (b) b.focus(); });
  }

  /* ---------- À propos : le sommaire suit la lecture ---------- */
  var tocLinks = $$('.toc a[href^="#"]');
  if (tocLinks.length) {
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        tocLinks.forEach(function(a){
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    tocLinks.forEach(function(a){ var sec = $(a.getAttribute('href')); if (sec) spy.observe(sec); });
  }

  /* ---------- Actualités : filtres instantanés, adresse partageable ---------- */
  var list = $('#post-list');
  if (list) {
    var posts = $$('.post-item', list), PAGE = 4, expanded = false;
    var cat = params.get('cat') || '', query = params.get('q') || '';
    var bar2 = el('div', 'news-toolbar'), tabs = el('div', 'news-tabs');
    tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Filtrer par catégorie');
    [['', 'Toutes'], ['vie-municipale', 'Vie municipale'], ['environnement', 'Environnement']].forEach(function(c){
      var b = el('button', '', c[1]); b.type = 'button'; b.dataset.cat = c[0]; tabs.appendChild(b);
    });
    var searchForm = $('#news-search'), qInput = $('#news-q'), oldWidget = searchForm.closest('.widget');
    bar2.appendChild(tabs); bar2.appendChild(searchForm); oldWidget.remove();
    $('button', searchForm).textContent = 'Filtrer';
    var info = el('p', 'news-count'); info.setAttribute('role', 'status');
    var none = el('p', 'no-results'), reset = el('button', 'button button-outline', 'Réinitialiser les filtres');
    reset.type = 'button'; none.hidden = true;
    var moreWrap = el('p', 'load-more'), more = el('button', 'button button-outline', 'Afficher plus d\'articles');
    more.type = 'button'; moreWrap.appendChild(more);
    list.parentNode.insertBefore(bar2, list); list.parentNode.insertBefore(info, list);
    list.parentNode.insertBefore(none, list.nextSibling); list.parentNode.insertBefore(moreWrap, none.nextSibling);
    $('.pagination').hidden = true;
    qInput.value = query;
    var apply = function(){
      var words = norm(query).split(/\s+/).filter(Boolean);
      var hits = posts.filter(function(p){
        var ok = (!cat || p.dataset.cat === cat) && words.every(function(w){ return norm(p.textContent).indexOf(w) !== -1; });
        p.hidden = true; return ok;
      });
      hits.forEach(function(p, i){ p.hidden = !expanded && i >= PAGE; });
      $$('button', tabs).forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.cat === cat)); });
      info.textContent = hits.length + (hits.length > 1 ? ' articles' : ' article') + (cat || query ? ' pour ce filtre' : '');
      none.hidden = hits.length > 0;
      if (!hits.length) { none.textContent = 'Aucun article ne correspond. '; none.appendChild(reset); }
      moreWrap.hidden = expanded || hits.length <= PAGE;
      var url = new URL(location.href);
      if (cat) url.searchParams.set('cat', cat); else url.searchParams.delete('cat');
      if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    };
    var setCat = function(c){ cat = c; expanded = false; apply(); };
    tabs.addEventListener('click', function(e){ var b = e.target.closest('button'); if (b) setCat(b.dataset.cat); });
    $$('[data-cat-link]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); setCat(a.dataset.catLink); list.scrollIntoView({ block: 'start' }); }); });
    qInput.addEventListener('input', function(){ query = qInput.value.trim(); expanded = false; apply(); });
    searchForm.addEventListener('submit', function(e){ e.preventDefault(); });
    more.addEventListener('click', function(){ expanded = true; apply(); });
    reset.addEventListener('click', function(){ cat = ''; query = ''; qInput.value = ''; expanded = false; apply(); qInput.focus(); });
    apply();
  }

  /* ---------- Contact : horaires du jour, compteur de caractères, service présélectionné ---------- */
  var hours = $('#hours');
  if (hours) {
    var row = $('tr[data-day="' + state.day + '"]', hours);
    if (row) row.classList.add('is-today');
    var line = el('p', 'hours-status', state.text.replace('Mairie ', 'Aujourd\'hui : ') + '.');
    hours.parentNode.insertBefore(line, hours);
  }
  var message = $('#c-message');
  if (message) {
    var max = message.maxLength, counter = el('span', 'char-count');
    counter.dataset.empty = '0 / ' + max + ' caractères';
    counter.textContent = counter.dataset.empty;
    message.parentNode.appendChild(counter);
    message.addEventListener('input', function(){ counter.textContent = message.value.length + ' / ' + max + ' caractères'; });
    var wanted = params.get('service'), select = $('#c-service');
    if (wanted && $('option[value="' + wanted + '"]', select)) select.value = wanted;
  }
})();
