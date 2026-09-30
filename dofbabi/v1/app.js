/* Delight of Babi — V1 */
(function () {
  'use strict';

  var WHATSAPP = '22891910302';

  /* JS actif : on autorise les apparitions au scroll */
  document.documentElement.classList.add('js');

  /* --- header sticky + menu mobile --- */
  var head = document.getElementById('head');
  var burger = document.getElementById('burger');

  var onScroll = function () {
    head.classList.toggle('is-stuck', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', function () {
    var open = head.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  document.querySelectorAll('.head__nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      head.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- apparition au scroll ---
     Balayage simple plutôt qu'un IntersectionObserver : un scroll très rapide
     ne peut pas laisser un bloc coincé en invisible. */
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var queued = false;

  var sweep = function () {
    queued = false;
    var limit = window.innerHeight - 60;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('is-in');
      return false;
    });
    if (!pending.length) window.removeEventListener('scroll', schedule);
  };
  var schedule = function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  sweep();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);

  /* --- « Commander » depuis une carte : présélectionne le plat --- */
  var select = document.getElementById('f-dish');
  document.querySelectorAll('[data-dish]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wanted = btn.getAttribute('data-dish').toLowerCase();
      Array.prototype.some.call(select.options, function (opt, i) {
        if (opt.text.toLowerCase().indexOf(wanted.split(' ')[0]) === 0) {
          select.selectedIndex = i;
          return true;
        }
        return false;
      });
    });
  });

  /* --- formulaire -> message WhatsApp pré-rempli --- */
  var form = document.getElementById('orderForm');
  var status = document.getElementById('orderStatus');
  var where = document.getElementById('f-where');

  var say = function (html, warn) {
    status.innerHTML = html;
    status.classList.toggle('order__status--warn', !!warn);
    status.hidden = false;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var type = d.get('type');

    /* une livraison sans adresse ne sert à personne */
    if (type === 'Commande à livrer' && !String(d.get('where') || '').trim()) {
      where.classList.add('is-missing');
      where.focus();
      say('Indique ton quartier ou ton adresse pour qu\'on puisse te livrer.', true);
      return;
    }
    where.classList.remove('is-missing');

    var lines = [
      'Bonjour Delight of Babi 👋',
      '',
      'Demande : ' + type,
      'Plat : ' + d.get('dish'),
      'Quantité : ' + (d.get('qty') || '1')
    ];
    if (d.get('when')) lines.push('Pour : ' + d.get('when'));
    if (d.get('where')) lines.push('Lieu : ' + d.get('where'));
    if (d.get('note')) lines.push('Note : ' + d.get('note'));
    lines.push('', 'Merci !');

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    var win = window.open(url, '_blank', 'noopener');

    if (win) {
      say('Ton message est prêt dans WhatsApp — il ne reste qu\'à l\'envoyer.');
    } else {
      /* pop-up bloqué : on donne le lien plutôt que de laisser l'écran muet */
      say('WhatsApp n\'a pas pu s\'ouvrir tout seul. <a href="' + url +
          '" target="_blank" rel="noopener">Ouvrir la conversation</a> ' +
          'ou appelle le <a href="tel:+22891910302">91 91 03 02</a>.', true);
    }
  });

  /* --- année du footer --- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
