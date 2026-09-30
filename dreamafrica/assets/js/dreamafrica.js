/* ============================================================
   DREAM AFRICA — interactions (vanilla, sans dépendance)
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header collant ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('site-nav');
  var scrim = document.querySelector('.nav-scrim');
  if (burger && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      if (scrim) scrim.classList.toggle('is-on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });
    if (scrim) scrim.addEventListener('click', function () { setNav(false); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- 3. Hero vidéo -----------------------------------
     Le diaporama Ken Burns reste visible par défaut ; la vidéo
     ne prend le dessus que si elle démarre réellement. Il suffit
     donc de déposer le .mp4 dans assets/video/ pour l'activer.
  ------------------------------------------------------------- */
  var hero = document.querySelector('.hero');
  var video = document.querySelector('.hero__video');
  if (hero && video) {
    video.muted = true;
    video.addEventListener('playing', function () { hero.classList.add('is-playing'); });
    video.addEventListener('error', function () { hero.classList.remove('is-playing'); });
    if (!reduce) {
      var p = video.play();
      if (p && typeof p.catch === 'function') { p.catch(function () { /* autoplay refusé : on garde le diaporama */ }); }
    }

    var sound = document.querySelector('[data-video-sound]');
    if (sound) {
      sound.classList.add('is-muted');
      sound.addEventListener('click', function () {
        video.muted = !video.muted;
        sound.classList.toggle('is-muted', video.muted);
        sound.setAttribute('aria-label', video.muted ? 'Activer le son de la vidéo' : 'Couper le son de la vidéo');
        if (!video.muted && video.paused) video.play();
      });
    }

    var pause = document.querySelector('[data-video-toggle]');
    if (pause) {
      pause.addEventListener('click', function () {
        if (video.paused) { video.play(); pause.setAttribute('aria-label', 'Mettre la vidéo en pause'); }
        else { video.pause(); pause.setAttribute('aria-label', 'Relancer la vidéo'); }
        pause.classList.toggle('is-muted', video.paused);
      });
    }
  }

  /* ---------- 4. Apparitions au scroll ---------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) || reduce) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- 5. Compteurs ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = prefix + target + suffix; return; }
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var k = Math.min((ts - t0) / 1400, 1);
        var eased = 1 - Math.pow(1 - k, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { run(en.target); io2.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { io2.observe(el); });
    } else {
      counters.forEach(run);
    }
  }

  /* ---------- 6. Sommaire latéral actif ---------- */
  var anchorLinks = document.querySelectorAll('.anchors a');
  if (anchorLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    anchorLinks.forEach(function (a) {
      var id = a.getAttribute('href').replace('#', '');
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var io3 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          anchorLinks.forEach(function (a) { a.classList.remove('is-active'); });
          if (map[en.target.id]) map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { io3.observe(document.getElementById(id)); });
  }

  /* ---------- 7. Filtres partenaires ---------- */
  var filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    var cards = document.querySelectorAll('[data-cat]');
    var countEl = document.querySelector('[data-filter-count]');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var shown = 0;
      cards.forEach(function (c) {
        var ok = cat === 'all' || c.getAttribute('data-cat') === cat;
        c.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown;
    });
  }

  /* ---------- 8. Formulaires (maquette) ---------- */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"], .btn');
      if (!btn) return;
      var old = btn.innerHTML;
      btn.innerHTML = 'Merci ! Message enregistré';
      btn.disabled = true;
      setTimeout(function () { btn.innerHTML = old; btn.disabled = false; form.reset(); }, 2600);
    });
  });

  /* ---------- 9. Année courante ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
