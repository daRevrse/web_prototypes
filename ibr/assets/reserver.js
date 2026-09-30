/* Ibiza Bliss Resort — parcours de réservation
   Le formulaire s'adapte au type choisi. Pour brancher un vrai back-office,
   renseigner data-endpoint sur <form id="booking"> : la demande y est envoyée
   en JSON (POST). Sans endpoint, mode démo : la demande reste dans ce navigateur. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const form = $('#booking');
  const steps = $$('.step', form);
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const DRAFT_KEY = 'ibr-reservation-brouillon';
  const STORE_KEY = 'ibr-demandes';

  /* ---------- Outils ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  const isoLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = (v) => { const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (v, n) => { const d = parseIso(v); d.setDate(d.getDate() + n); return isoLocal(d); };
  const fmtDate = (v) => v ? parseIso(v).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const fmtShort = (v) => v ? parseIso(v).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '';
  const plural = (n, one, many) => `${n} ${Number(n) > 1 ? many : one}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* idem */ } },
  };
  // Heure de Kpogan (UTC+0)
  const lomeNow = () => { const n = new Date(); return { iso: `${n.getUTCFullYear()}-${pad(n.getUTCMonth() + 1)}-${pad(n.getUTCDate())}`, min: n.getUTCHours() * 60 + n.getUTCMinutes() }; };
  const todayIso = lomeNow().iso;

  const el = (name) => form.elements[name];
  const val = (name) => {
    const e = el(name);
    if (!e) return '';
    if (e instanceof RadioNodeList) return e.value;
    if (e.type === 'checkbox') return e.checked;
    return e.value.trim();
  };
  const vals = (name) => $$(`[name="${name}"]:checked`, form).map((i) => i.value);
  const type = () => val('type');

  /* ---------- Les cinq expériences ---------- */
  const TYPES = {
    chill:      { label: 'Journée Chill & Relax', title: 'Votre journée Chill & Relax', lede: 'Choisissez votre date et votre coin de plage.', img: 'assets/img/thumbs/plage-parasols.jpg', when: 'En journée', sun: '#F7C24A' },
    restaurant: { label: 'Table au restaurant', title: 'Votre table', lede: 'Choisissez la date : les créneaux disponibles s’affichent aussitôt.', img: 'assets/img/thumbs/grillades.jpg', when: 'Dès 17h', sun: '#E4772F' },
    conference: { label: 'Séminaire ou réunion', title: 'Votre séminaire', lede: 'Dites-nous combien vous serez et ce dont vous avez besoin.', img: 'assets/img/thumbs/conference.jpg', when: 'Le matin', sun: '#F2B64A' },
    evenement:  { label: 'Mariage ou événement', title: 'Votre événement', lede: 'Quelques repères pour préparer votre projet avec vous.', img: 'assets/img/thumbs/mariage-kente.jpg', when: 'Au coucher du soleil', sun: '#FF8A4C' },
    residence:  { label: 'Séjour en résidence', title: 'Votre séjour', lede: 'Choisissez une adresse et vos dates.', img: 'assets/img/thumbs/villa-washington.jpg', when: 'La nuit', sun: '#E9DCCB' },
    activite:   { label: 'Soirée ou activité', title: 'Votre soirée', lede: 'Une soirée de la semaine ou un événement de l’agenda.', img: 'assets/img/thumbs/soiree.jpg', when: 'Le soir', sun: '#D9A94E' },
  };
  const ALIASES = { mariage: 'evenement', event: 'evenement', resto: 'restaurant', table: 'restaurant', sejour: 'residence', soiree: 'activite', activites: 'activite' };
  // Champ « date » et champ « nombre » principaux de chaque type (préremplissage depuis l'accueil)
  const MAIN = {
    chill: ['chill_date', 'chill_adultes'], restaurant: ['resto_date', 'resto_couverts'], conference: ['conf_debut', 'conf_participants'],
    evenement: ['event_date', 'event_invites'], residence: ['res_arrivee', 'res_adultes'], activite: ['act_date', 'act_personnes'],
  };

  const people = (a, e) => [plural(Number(a) || 0, 'adulte', 'adultes'), Number(e) ? plural(Number(e), 'enfant', 'enfants') : ''].filter(Boolean).join(', ');
  const nights = () => {
    const a = val('res_arrivee'), d = val('res_depart');
    return a && d ? Math.round((parseIso(d) - parseIso(a)) / 864e5) : 0;
  };
  const DETAILS = {
    chill: () => [
      ['Date', fmtDate(val('chill_date'))],
      ['Moment', val('chill_moment')],
      ['Personnes', people(val('chill_adultes'), val('chill_enfants'))],
      ['Espace', val('chill_espace')],
      ['Activités', vals('chill_envies').join(', ')],
    ],
    restaurant: () => [
      ['Date', fmtDate(val('resto_date'))],
      ['Heure', val('resto_heure')],
      ['Couverts', val('resto_couverts')],
      ['Occasion', val('resto_occasion')],
      ['Remarques', val('resto_note')],
    ],
    conference: () => [
      ['Date', val('conf_multi') && val('conf_fin') ? `Du ${fmtDate(val('conf_debut'))} au ${fmtDate(val('conf_fin'))}` : fmtDate(val('conf_debut'))],
      ['Participants', val('conf_participants')],
      ['Espace', val('conf_espace')],
      ['Disposition', val('conf_disposition')],
      ['Restauration', vals('conf_restauration').join(', ')],
      ['Hébergement', val('conf_hebergement') ? 'Pour les participants' : ''],
    ],
    evenement: () => [
      ['Événement', val('event_type')],
      ['Date', val('event_flex') ? (val('event_periode') ? `Vers ${val('event_periode')}` : 'À définir') : fmtDate(val('event_date'))],
      ['Invités', val('event_invites')],
      ['Cadre', val('event_cadre')],
      ['Moments', val('event_moment')],
      ['Services', vals('event_services').join(', ')],
      ['Visite', val('event_visite') ? 'Souhaitée' : ''],
    ],
    residence: () => [
      ['Résidence', val('res_residence')],
      ['Dates', val('res_arrivee') && val('res_depart') ? `Du ${fmtDate(val('res_arrivee'))} au ${fmtDate(val('res_depart'))}` : fmtDate(val('res_arrivee'))],
      ['Durée', nights() > 0 ? plural(nights(), 'nuit', 'nuits') : ''],
      ['Voyageurs', people(val('res_adultes'), val('res_enfants'))],
    ],
    activite: () => {
      const a = act();
      return [
        ['Sortie', a ? a.titre : ''],
        ['Date', !a ? '' : a.jour !== undefined ? fmtDate(val('act_date')) : a.soon ? 'Bientôt annoncée' : fmtDate(a.date)],
        ['Participants', val('act_personnes')],
        ['Infos', val('act_infos')],
      ];
    },
  };
  const CONTACT = () => [
    ['Nom', [val('prenoms'), val('nom')].filter(Boolean).join(' ')],
    ['Téléphone', val('tel')],
    ['E-mail', val('email')],
    ['Contact', val('contact_pref')],
    ['Message', val('message')],
  ];
  const rowsHtml = (rows) => rows.filter((r) => r[1]).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  /* ---------- Type actif ---------- */
  const setType = (t) => {
    $$('.details', form).forEach((fs) => { const on = fs.dataset.type === t; fs.hidden = !on; fs.disabled = !on; });
    const cfg = TYPES[t];
    if (cfg) { $('#s2-title').textContent = cfg.title; $('#s2-lede').textContent = cfg.lede; }
    syncAll();
  };

  /* ---------- Règles dynamiques ---------- */
  // Dates : jamais dans le passé ; fin ≥ début ; départ > arrivée
  $$('input[type="date"]', form).forEach((i) => { i.min = todayIso; });

  // Soirées & activités : les sorties proposées viennent de agenda.js
  const AG = window.IBR_AGENDA || { hebdo: [], evenements: [] };
  const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const ACTS = [
    ...AG.hebdo.map((w) => ({ id: w.id, titre: w.titre, sous: `Chaque ${JOURS[w.jour]}`, jour: w.jour })),
    ...AG.evenements.filter((e) => !e.date || e.date >= todayIso)
      .map((e) => ({ id: e.id, titre: e.titre, sous: e.date ? fmtDate(e.date) : 'Date bientôt annoncée', date: e.date, soon: !e.date })),
  ];
  $('#act-opts').innerHTML = ACTS.map((a, i) => `<label class="opt"><input type="radio" name="act_choix" value="${esc(a.id)}" required${i === 0 ? ' checked' : ''}><span class="opt__body"><strong>${esc(a.titre)}</strong><small>${esc(a.sous)}</small></span></label>`).join('');
  const act = () => ACTS.find((a) => a.id === val('act_choix'));

  // Créneaux du restaurant, calculés selon le jour (17h–23h, minuit le week-end)
  const slotsBox = $('#slots');
  const buildSlots = (preferred) => {
    const d = val('resto_date');
    const keep = preferred ?? val('resto_heure');
    if (!d) { slotsBox.innerHTML = '<p class="hint">Choisissez d’abord une date&nbsp;: les créneaux s’affichent ici.</p>'; return; }
    const wd = parseIso(d).getDay();
    const weekend = wd === 6 || wd === 0;
    const last = weekend ? 23 * 60 : 22 * 60 + 30; // dernier créneau avant la fermeture
    const now = lomeNow();
    let html = '', open = 0;
    for (let t = 17 * 60; t <= last; t += 30) {
      const label = `${Math.floor(t / 60)}h${t % 60 ? pad(t % 60) : ''}`;
      const past = d === now.iso && t < now.min + 30;
      if (!past) open++;
      html += `<label class="chip chip--slot"><input type="radio" name="resto_heure" value="${label}" required${past ? ' disabled' : ''}${label === keep && !past ? ' checked' : ''}><span>${label}</span></label>`;
    }
    slotsBox.innerHTML = open ? html : '<p class="hint">Plus de créneau aujourd’hui : choisissez une autre date.</p>';
    $('#slots-hint').textContent = weekend ? 'Week-end : service jusqu’à minuit.' : 'En semaine : service de 17h à 23h.';
  };

  // Périodes envisagées pour un événement : les 18 prochains mois
  const periode = $('#ev-periode');
  (() => {
    const d = new Date(); d.setDate(1);
    let html = '<option value="">Choisir un mois</option>';
    for (let i = 0; i < 18; i++) {
      const m = new Date(d.getFullYear(), d.getMonth() + i, 1);
      const label = m.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      html += `<option value="${label}">${label.charAt(0).toUpperCase() + label.slice(1)}</option>`;
    }
    periode.innerHTML = html;
  })();

  const syncAll = () => {
    // Séminaire sur plusieurs jours
    const multi = val('conf_multi');
    $('#conf-fin-wrap').hidden = !multi;
    const debut = val('conf_debut');
    el('conf_fin').min = debut || todayIso;
    el('conf_fin').setCustomValidity(multi && debut && val('conf_fin') && val('conf_fin') < debut ? 'Le dernier jour doit suivre le premier.' : '');

    // Événement : date fixée ou simple période
    const flex = val('event_flex');
    $('#ev-date-wrap').hidden = flex;
    $('#ev-periode-wrap').hidden = !flex;

    // Séjour : départ après l'arrivée, nombre de nuits
    const arr = val('res_arrivee');
    el('res_depart').min = arr ? addDays(arr, 1) : addDays(todayIso, 1);
    const n = nights();
    el('res_depart').setCustomValidity(arr && val('res_depart') && n < 1 ? 'Le départ doit être après l’arrivée.' : '');
    $('#nights').textContent = n > 0 ? `${plural(n, 'nuit', 'nuits')} sur place` : '';

    // E-mail obligatoire seulement si c'est le canal choisi
    const byMail = val('contact_pref') === 'E-mail';
    el('email').required = byMail;
    $('#email-opt').hidden = byMail;
    // Le navigateur accepte « nom@domaine » : on exige un domaine complet
    const mail = val('email');
    el('email').setCustomValidity(mail && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(mail) ? 'Adresse e-mail incomplète (ex. nom@exemple.com).' : '');

    // Soirée ou activité : la date dépend de la sortie choisie
    const a = act();
    const weekly = !!a && a.jour !== undefined;
    $('#act-date-wrap').hidden = !weekly;
    el('act_date').setCustomValidity(weekly && val('act_date') && parseIso(val('act_date')).getDay() !== a.jour ? `Choisissez un ${JOURS[a.jour]}.` : '');
    $('#act-hint').textContent = !a ? '' : weekly ? `Chaque ${JOURS[a.jour]} : choisissez la date de votre soirée.`
      : a.soon ? 'Date bientôt annoncée : l’équipe vous prévient dès qu’elle est connue.' : `Le ${fmtDate(a.date)}.`;

    syncSteppers();
    updateSummary();
  };

  /* ---------- Compteurs ---------- */
  const syncSteppers = () => $$('.stepper').forEach((st) => {
    const input = $('input', st);
    const v = Number(input.value);
    const [minus, plus] = $$('button', st);
    minus.disabled = input.min !== '' && v <= Number(input.min);
    plus.disabled = input.max !== '' && v >= Number(input.max);
  });
  form.addEventListener('click', (e) => {
    const b = e.target.closest('.stepper button');
    if (!b) return;
    const input = $('input', b.parentElement);
    const stepV = Number(input.dataset.inc) || 1;
    const min = input.min === '' ? -Infinity : Number(input.min);
    const max = input.max === '' ? Infinity : Number(input.max);
    input.value = Math.min(max, Math.max(min, (Number(input.value) || 0) + Number(b.dataset.d) * stepV));
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });

  /* ---------- Résumé en direct ---------- */
  const sum = $('#sum'), sumImg = $('#sum-img'), sumList = $('#sum-list'), mini = $('#mini-sum');
  const updateSummary = () => {
    const t = type(), cfg = TYPES[t];
    const src = cfg ? cfg.img : 'assets/img/thumbs/hero-allee.jpg';
    if (!sumImg.src.endsWith(src)) {
      sumImg.classList.add('is-swapping');
      const img = new Image();
      img.onload = img.onerror = () => { sumImg.src = src; sumImg.classList.remove('is-swapping'); };
      img.src = src;
    }
    $('#sum-type').textContent = cfg ? cfg.label : 'Votre demande';
    $('#sum-when').textContent = cfg ? cfg.when : 'Choisissez une expérience';
    sum.style.setProperty('--type-sun', cfg ? cfg.sun : '');
    const rows = cfg ? DETAILS[t]().filter((r) => r[1]) : [];
    const contact = step >= 3 ? CONTACT().filter((r) => r[1] && ['Nom', 'Téléphone'].includes(r[0])) : [];
    sumList.innerHTML = rows.length || contact.length
      ? rowsHtml([...rows, ...contact])
      : `<p class="sum__empty">${cfg ? 'Vos choix s’afficheront ici au fil de la demande.' : 'Choisissez une expérience pour commencer.'}</p>`;
    // Résumé court pour la barre du bas (mobile)
    if (cfg) {
      const [dName, nName] = MAIN[t];
      const d = t === 'evenement' && val('event_flex') ? val('event_periode') : fmtShort(val(dName));
      const unit = { chill: 'pers.', restaurant: 'couv.', conference: 'part.', evenement: 'invités', residence: 'pers.', activite: 'pers.' }[t];
      mini.textContent = [cfg.label, d, val(nName) ? `${val(nName)} ${unit}` : ''].filter(Boolean).join(' · ');
    } else mini.textContent = '';
  };

  /* ---------- Validation ---------- */
  const messageFor = (e) => {
    const v = e.validity;
    if (v.customError) return e.validationMessage;
    if (v.valueMissing) {
      if (e.type === 'radio') return e.name === 'type' ? 'Choisissez une expérience pour continuer.' : e.name === 'resto_heure' ? 'Choisissez une heure d’arrivée.' : 'Choisissez une option.';
      if (e.type === 'date') return 'Choisissez une date.';
      if (e.type === 'checkbox') return 'Cochez cette case pour envoyer la demande.';
      if (e.tagName === 'SELECT') return 'Choisissez une période.';
      if (e.name === 'email') return 'Indiquez votre e-mail pour être recontacté par ce canal.';
      if (e.name === 'tel') return 'Indiquez un numéro pour vous joindre.';
      return 'Ce champ est nécessaire.';
    }
    if (v.typeMismatch && e.type === 'email') return 'Adresse e-mail incomplète (ex. nom@exemple.com).';
    if (v.rangeUnderflow) return e.type === 'date' ? 'Cette date est déjà passée.' : `Minimum ${e.min}.`;
    if (v.rangeOverflow) return `Maximum ${e.max}. Au-delà, écrivez-nous.`;
    if (v.badInput) return 'Valeur invalide.';
    return 'Vérifiez ce champ.';
  };
  const holderOf = (e) => e.closest('.check') || (e.type === 'radio' ? e.closest('.group') : e.closest('.field')) || e.closest('.group');
  const setError = (e, msg) => {
    const holder = holderOf(e);
    if (!holder) return;
    holder.classList.toggle('is-invalid', !!msg);
    let m = $(':scope > .field__msg', holder);
    if (msg) {
      if (!m) { m = document.createElement('p'); m.className = 'field__msg'; m.id = `err-${e.name}`; holder.appendChild(m); }
      m.textContent = msg;
      $$(`[name="${e.name}"]`, holder).forEach((i) => { i.setAttribute('aria-invalid', 'true'); i.setAttribute('aria-describedby', m.id); });
    } else if (m) {
      m.remove();
      $$(`[name="${e.name}"]`, holder).forEach((i) => { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); });
    }
  };
  const validateStep = (n) => {
    syncAll();
    const seen = new Set();
    let first = null;
    $$('input, select, textarea', steps[n - 1])
      .filter((e) => e.name && !e.matches(':disabled') && !e.closest('[hidden]'))
      .forEach((e) => {
        if (seen.has(e.name)) return;
        seen.add(e.name);
        const ok = e.checkValidity();
        setError(e, ok ? '' : messageFor(e));
        if (!ok && !first) first = e;
      });
    // Restaurant : aucun créneau encore ouvert
    if (n === 2 && type() === 'restaurant' && !$('input[name="resto_heure"]:not(:disabled)', form) && val('resto_date')) {
      first = first || el('resto_date');
      setError(el('resto_date'), 'Plus de créneau ce jour-là : choisissez une autre date.');
    }
    if (first) {
      const target = first.type === 'radio' ? ($(`[name="${first.name}"]:not(:disabled)`, form) || first) : first;
      target.focus({ preventScroll: true });
      holderOf(first)?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    }
    return !first;
  };
  // Une erreur disparaît dès que le champ est corrigé
  form.addEventListener('input', (e) => { if (e.target.name && e.target.getAttribute('aria-invalid') && e.target.checkValidity()) setError(e.target, ''); });
  form.addEventListener('change', (e) => { if (e.target.name && e.target.getAttribute('aria-invalid') && e.target.checkValidity()) setError(e.target, ''); });

  /* ---------- Étapes ---------- */
  let step = 1, maxStep = 1;
  const header = $('#bk-header');
  const NEXT_LABEL = ['Continuer', 'Continuer', 'Vérifier ma demande', 'Envoyer la demande'];
  const go = (n, { push = true, focus = true } = {}) => {
    step = n;
    maxStep = Math.max(maxStep, n);
    steps.forEach((s, i) => { s.hidden = i !== n - 1; });
    $$('.progress li').forEach((li, i) => {
      li.classList.toggle('is-done', i + 1 < n);
      li.classList.toggle('is-current', i + 1 === n);
      const b = $('button', li);
      b.disabled = i + 1 > maxStep;
      if (i + 1 === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    $('#progress-m').textContent = `Étape ${n} sur 4`;
    header.style.setProperty('--p', n / 4);
    prevBtn.hidden = n === 1;
    $('.next__label', nextBtn).textContent = NEXT_LABEL[n - 1];
    $('#send-error').hidden = true;
    if (n === 4) renderReview();
    updateSummary();
    if (focus) {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      $('.step__title', steps[n - 1]).focus({ preventScroll: true });
    }
    if (push) history.pushState({ step: n }, '', `#etape-${n}`);
    saveDraft();
  };
  // Aller directement à une étape déjà atteinte, en revalidant celles d'avant
  const goTo = (n) => {
    for (let s = step; s < n; s++) if (!validateStep(s)) { if (s !== step) go(s); return; }
    go(n);
  };
  $$('.progress button').forEach((b) => b.addEventListener('click', () => goTo(Number(b.dataset.goto))));
  prevBtn.addEventListener('click', () => go(step - 1));
  addEventListener('popstate', (e) => {
    if (!$('#bk').classList.contains('is-done')) go(Math.min(e.state?.step || 1, maxStep), { push: false });
  });

  // Changer d'expérience remet à zéro la suite du parcours
  form.addEventListener('change', (e) => {
    if (e.target.name === 'type') { setType(e.target.value); maxStep = 1; go(1, { push: false, focus: false }); }
    if (e.target.name === 'resto_date') buildSlots();
  });
  form.addEventListener('input', () => { syncAll(); saveDraft(); });

  /* ---------- Récapitulatif ---------- */
  const renderReview = () => {
    const cfg = TYPES[type()];
    const block = (title, rows, to) => `<section class="rv"><div class="rv__head"><h3>${title}</h3><button type="button" class="bk-link" data-edit="${to}">Modifier</button></div><dl class="sum__list">${rowsHtml(rows)}</dl></section>`;
    $('#review').innerHTML =
      block('Expérience', [['Choix', cfg.label]], 1) +
      block('Détails', DETAILS[type()](), 2) +
      block('Coordonnées', CONTACT(), 3);
  };
  $('#review').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) go(Number(b.dataset.edit)); });

  /* ---------- Brouillon ---------- */
  const saveDraft = () => {
    const data = {};
    $$('input, select, textarea', form).forEach((e) => {
      if (!e.name || e.name === 'consent') return;
      if (e.type === 'radio') { if (e.checked) data[e.name] = e.value; }
      else if (e.type === 'checkbox') { if (e.checked) (data[e.name] ||= []).push(e.value); }
      else if (e.value) data[e.name] = e.value;
    });
    store.set(DRAFT_KEY, { data, at: Date.now() });
  };
  const applyValues = (data) => {
    Object.entries(data).forEach(([name, v]) => {
      if (name === 'resto_heure') return;
      const list = $$(`[name="${name}"]`, form);
      list.forEach((e) => {
        if (e.type === 'radio') e.checked = e.value === v;
        else if (e.type === 'checkbox') e.checked = [].concat(v).includes(e.value);
        else e.value = v;
      });
    });
    if (data.type) setType(data.type);
    buildSlots(data.resto_heure);
  };
  const clearDraft = () => store.del(DRAFT_KEY);

  /* ---------- Envoi ---------- */
  const makeRef = () => {
    const d = new Date();
    const r = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(4, '0').slice(-4);
    return `IBR-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${r}`;
  };
  let last = null;
  const send = async () => {
    const t = type();
    const payload = {
      type: t,
      experience: TYPES[t].label,
      details: Object.fromEntries(DETAILS[t]().filter((r) => r[1])),
      contact: Object.fromEntries(CONTACT().filter((r) => r[1])),
      champs: Object.fromEntries([...new FormData(form)].filter(([k]) => k !== 'consent')),
      envoyeLe: new Date().toISOString(),
    };
    const ref = makeRef();
    const endpoint = form.dataset.endpoint;
    nextBtn.classList.add('is-loading');
    $('.next__label', nextBtn).textContent = 'Envoi…';
    $('#send-error').hidden = true;
    try {
      if (endpoint) {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref, ...payload }) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 900));
        store.set(STORE_KEY, [...(store.get(STORE_KEY) || []), { ref, ...payload }]);
      }
      last = { ref, t, payload, dates: icsDates(t) };
      showDone(!endpoint);
      clearDraft();
    } catch {
      $('#send-error').hidden = false;
      $('#send-error').focus();
    } finally {
      nextBtn.classList.remove('is-loading');
      $('.next__label', nextBtn).textContent = NEXT_LABEL[step - 1];
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step < 4) go(step + 1); else send();
  });

  /* ---------- Confirmation ---------- */
  const showDone = (demo) => {
    const { ref, t, payload } = last;
    const prenom = val('prenoms').split(' ')[0];
    const pref = val('contact_pref');
    $('#done-lede').textContent = `Merci ${prenom}, votre demande de ${TYPES[t].label.toLowerCase()} est bien partie.`;
    $('#done-ref').textContent = ref;
    $('#done-sum').innerHTML = rowsHtml(Object.entries(payload.details));
    $('#done-contact').textContent = pref === 'WhatsApp' ? `On vous écrit sur WhatsApp au ${val('tel')}`
      : pref === 'E-mail' ? `On vous répond à ${val('email')}` : `On vous rappelle au ${val('tel')}`;
    $('#ics').hidden = !last.dates;
    $('#done-demo').hidden = !demo;
    $('#bk').classList.add('is-done');
    const done = $('#done');
    done.hidden = false;
    history.replaceState({ step: 5 }, '', '#confirmation');
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    done.focus({ preventScroll: true });
  };
  $('#again').addEventListener('click', () => {
    form.reset();
    $$('.is-invalid', form).forEach((h) => h.classList.remove('is-invalid'));
    $$('.field__msg', form).forEach((m) => m.remove());
    setType('');
    buildSlots('');
    $('#done').hidden = true;
    $('#bk').classList.remove('is-done');
    maxStep = 1;
    go(1);
  });

  /* ---------- Fichier agenda (.ics) ---------- */
  function icsDates(t) {
    if (t === 'chill') return { start: val('chill_date') };
    if (t === 'restaurant') return { start: val('resto_date'), time: val('resto_heure') };
    if (t === 'conference') return { start: val('conf_debut'), end: val('conf_multi') && val('conf_fin') ? addDays(val('conf_fin'), 1) : '' };
    if (t === 'evenement') return val('event_flex') ? null : { start: val('event_date') };
    if (t === 'residence') return { start: val('res_arrivee'), end: val('res_depart') };
    if (t === 'activite') { const a = act(); if (!a || a.soon) return null; return { start: a.jour !== undefined ? val('act_date') : a.date }; }
    return null;
  }
  $('#ics').addEventListener('click', () => {
    if (!last?.dates) return;
    const { ref, t, dates } = last;
    const compact = (v) => v.replaceAll('-', '');
    const text = (s) => s.replace(/[\\,;]/g, (c) => `\\${c}`);
    let when;
    if (dates.time) {
      // Kpogan est à UTC+0 : l'heure locale est l'heure UTC
      const [h, m = '00'] = dates.time.replace('h', ':').split(':');
      const start = `${compact(dates.start)}T${pad(h)}${pad(m || '00')}00Z`;
      const endH = Number(h) + 2;
      when = `DTSTART:${start}\r\nDTEND:${compact(endH >= 24 ? addDays(dates.start, 1) : dates.start)}T${pad(endH % 24)}${pad(m || '00')}00Z`;
    } else {
      when = `DTSTART;VALUE=DATE:${compact(dates.start)}\r\nDTEND;VALUE=DATE:${compact(dates.end || addDays(dates.start, 1))}`;
    }
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ibiza Bliss Resort//Reservation//FR', 'BEGIN:VEVENT',
      `UID:${ref}@ibizablissresort.com`, `DTSTAMP:${stamp}`, when,
      `SUMMARY:${text(`${TYPES[t].label} — Ibiza Bliss Resort (à confirmer)`)}`,
      'LOCATION:Ibiza Bliss Resort\\, Kpogan\\, Togo',
      `DESCRIPTION:${text(`Demande ${ref}, en attente de confirmation. Tél. 96 69 91 91`)}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = `ibiza-bliss-${ref}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  /* ---------- Démarrage ---------- */
  const draft = store.get(DRAFT_KEY);
  const fresh = draft && Date.now() - draft.at < 7 * 864e5 && draft.data && Object.keys(draft.data).length > 1;
  if (fresh) {
    applyValues(draft.data);
    $('#bk-draft').hidden = false;
  }
  $('#draft-reset').addEventListener('click', () => {
    clearDraft();
    form.reset();
    setType('');
    buildSlots('');
    $('#bk-draft').hidden = true;
    maxStep = 1;
    go(1);
  });

  // Préremplissage depuis l'accueil : reserver.html?type=restaurant&date=2026-10-12&personnes=4
  const q = new URLSearchParams(location.search);
  let t = q.get('type');
  t = ALIASES[t] || t;
  let startStep = 1;
  if (t && TYPES[t]) {
    const radio = $(`input[name="type"][value="${t}"]`, form);
    radio.checked = true;
    setType(t);
    const [dName, nName] = MAIN[t];
    const d = q.get('date');
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= todayIso) el(dName).value = d;
    // Depuis une page résidence : reserver.html?type=residence&residence=Villa%20Washington
    const r = q.get('residence');
    const opt = r && $$('input[name="res_residence"]', form).find((i) => i.value === r && !i.disabled);
    if (t === 'residence' && opt) opt.checked = true;
    // Depuis l'agenda : reserver.html?type=activite&activite=soiree-jeudi
    const ac = q.get('activite');
    const acOpt = ac && $$('input[name="act_choix"]', form).find((i) => i.value === ac);
    if (t === 'activite' && acOpt) acOpt.checked = true;
    const p = Number(q.get('personnes'));
    if (p > 0) el(nName).value = Math.min(p, Number(el(nName).max) || p);
    buildSlots();
    $('#bk-draft').hidden = true;
    startStep = 2;
  } else if (fresh && draft.data.type) {
    startStep = 1;
  }
  syncAll();
  maxStep = startStep;
  history.replaceState({ step: startStep }, '', startStep > 1 ? `#etape-${startStep}` : location.pathname + location.search);
  go(startStep, { push: false, focus: false });
})();
