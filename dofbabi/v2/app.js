/* Delight of Babi — V2 */
(function () {
  'use strict';

  var WHATSAPP = '22891910302';

  /* JS actif : on autorise les apparitions au scroll */
  document.documentElement.classList.add('js');

  /* --- nav sticky --- */
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 60); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- tiroir mobile --- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  burger.addEventListener('click', function () {
    var open = drawer.hasAttribute('hidden');
    if (open) { drawer.removeAttribute('hidden'); } else { drawer.setAttribute('hidden', ''); }
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.setAttribute('hidden', '');
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

  /* --- formulaire -> WhatsApp --- */
  var form = document.getElementById('orderForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var lines = [
      'Bonjour Delight of Babi 👋',
      '',
      'Objet : ' + d.get('type'),
      'Plat : ' + d.get('dish'),
      'Couverts : ' + (d.get('qty') || '1')
    ];
    if (d.get('when')) lines.push('Pour : ' + d.get('when'));
    if (d.get('where')) lines.push('Lieu : ' + d.get('where'));
    if (d.get('note')) lines.push('Précisions : ' + d.get('note'));
    lines.push('', 'Merci !');

    window.open(
      'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')),
      '_blank',
      'noopener'
    );
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
