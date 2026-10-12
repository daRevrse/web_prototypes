/* Version classique : comportements communs aux quatre pages */
(function(){
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var norm = function(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim(); };
  var params = new URLSearchParams(location.search);

  /* Menu principal */
  var nav = $('#site-navigation'), toggle = $('.menu-toggle');
  function closeSubs(except){
    $$('.menu > li.open').forEach(function(li){
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('button').setAttribute('aria-expanded','false');
    });
  }
  $$('.menu > li > button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var li = btn.parentElement, open = !li.classList.contains('open');
      closeSubs(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  toggle.addEventListener('click', function(){
    var open = !nav.classList.contains('toggled');
    nav.classList.toggle('toggled', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', function(e){ if (!e.target.closest('.menu')) closeSubs(); });
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    var li = document.activeElement.closest('.menu > li.open');
    closeSubs();
    if (li) li.querySelector('button').focus();
  });

  /* Langue (démonstration) */
  $$('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ $$('.lang button').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); }); });
  });

  /* Ouverte ou fermée : le Togo est à l'heure UTC toute l'année */
  var now = new Date(), day = now.getUTCDay(), min = now.getUTCHours() * 60 + now.getUTCMinutes();
  var isOpen = day >= 1 && day <= 5 && ((min >= 420 && min < 720) || (min >= 870 && min < 1050));
  if ($('#status')) $('#status').textContent = isOpen ? 'Actuellement ouverte.' : 'Actuellement fermée.';
  var todayRow = $('#hours tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add('is-today');

  /* Accueil : filtre des services, alimenté aussi par la recherche de l'en-tête */
  var filter = $('#filter'), empty = $('#empty'), rows = $$('#guide li');
  function applyFilter(){
    var q = norm(filter.value), shown = 0;
    rows.forEach(function(li){
      var hay = norm(li.textContent + ' ' + (li.dataset.k || ''));
      var hit = !q || q.split(/\s+/).every(function(w){ return hay.indexOf(w) !== -1; });
      li.hidden = !hit; if (hit) shown++;
    });
    $$('#guide .service-group').forEach(function(g){ g.hidden = $$('li:not([hidden])', g).length === 0; });
    empty.hidden = shown > 0;
    if (!shown) empty.textContent = 'Aucun service ne correspond à « ' + filter.value.trim() + ' ». Essayez « état civil », « taxes » ou « permis ».';
  }
  if (filter) {
    filter.addEventListener('input', applyFilter);
    if (params.get('s')) { filter.value = params.get('s'); $('#s').value = params.get('s'); applyFilter(); }
    $('#header-search').addEventListener('submit', function(e){
      e.preventDefault();
      filter.value = e.target.s.value; applyFilter();
      $('#services').scrollIntoView();
      $('#services-title').focus({preventScroll:true});
    });
  }

  /* Actualités : catégorie et mot-clé passés dans l'adresse, comme une archive WordPress */
  var list = $('#post-list');
  if (list) {
    var cat = params.get('cat'), q = norm(params.get('q') || '');
    if (cat || q) {
      var posts = $$('.post-item', list), count = 0, label = '';
      posts.forEach(function(p){
        var hit = (!cat || p.dataset.cat === cat) && (!q || norm(p.textContent).indexOf(q) !== -1);
        p.hidden = !hit; if (hit) count++;
      });
      var link = cat && $('[data-cat-link="' + cat + '"]');
      if (link) label = 'Catégorie : ' + link.textContent + '. ';
      if (q) { label += 'Recherche : « ' + params.get('q') + ' ». '; $('#news-q').value = params.get('q'); }
      var note = document.createElement('p');
      note.className = 'archive-note';
      note.textContent = label + count + (count > 1 ? ' articles. ' : ' article. ');
      var all = document.createElement('a');
      all.href = 'actualites.html'; all.textContent = 'Voir toutes les actualités';
      note.appendChild(all);
      list.parentNode.insertBefore(note, list);
      $('.pagination').hidden = true;
    }
  }

  /* Formulaires (démonstration : rien n'est envoyé) */
  function demoForm(formSel, doneSel, errSel, againSel, onDone){
    var form = $(formSel); if (!form) return;
    var done = $(doneSel), err = $(errSel);
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var missing = $$('[required]', form).filter(function(f){ return !f.value.trim() || !f.checkValidity(); });
      if (missing.length) {
        err.hidden = false;
        err.textContent = 'À compléter ou à corriger : ' + missing.map(function(f){ return $('label[for="' + f.id + '"]').firstChild.textContent.trim().toLowerCase(); }).join(', ') + '.';
        missing[0].focus();
        return;
      }
      err.hidden = true;
      if (onDone) onDone();
      form.hidden = true; done.hidden = false;
      $('h3', done).focus();
    });
    $(againSel).addEventListener('click', function(){
      form.reset(); done.hidden = true; form.hidden = false; $('input,select', form).focus();
    });
  }
  demoForm('#report', '#report-done', '#report-error', '#report-again', function(){
    $('#done-type').textContent = $('#r-type').value;
    $('#done-lieu').textContent = $('#r-lieu').value.trim() + ', canton de ' + $('#r-canton').value;
  });
  demoForm('#contact-form', '#contact-done', '#contact-error', '#contact-again');

  /* Lettre d'information (démonstration) */
  var news = $('#newsletter');
  if (news) news.addEventListener('submit', function(e){
    e.preventDefault();
    var input = $('#n-mail'), out = $('#n-out');
    if (!input.value.trim() || !input.checkValidity()) { out.style.color = '#a40e26'; out.textContent = 'Saisissez une adresse e-mail valide, par exemple nom@exemple.tg.'; input.focus(); return; }
    out.style.color = ''; out.textContent = 'Inscription enregistrée (démonstration).'; input.value = '';
  });
})();
