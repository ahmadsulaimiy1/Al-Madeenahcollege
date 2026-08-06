/* Minimal, dependency-free. EB §24: no framework in the critical path. */
(function () {
  'use strict';

  // Theme toggle — light / dark / system, remembered.
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    var cur = root.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : cur === 'light' ? '' : 'dark';
    if (next) root.setAttribute('data-theme', next);
    else root.removeAttribute('data-theme');
    try { next ? localStorage.setItem('theme', next) : localStorage.removeItem('theme'); } catch (err) {}
  });

  // Mobile navigation.
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Mark the current page in navigation.
  var here = location.pathname.replace(/\/$/, '') || '/';
  Array.prototype.forEach.call(document.querySelectorAll('.nav a, .portal__nav a'), function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.replace(/\/$/, '') === here) a.setAttribute('aria-current', 'page');
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal. EB §22 as amended: entrance only, transform + opacity only,
  // once per element, and entirely removed under reduced-motion.
  var items = document.querySelectorAll('.reveal, .rv, .info');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  // Counters. Every figure here is a REAL number carried in data-to; the
  // animation reveals a fact, it does not invent one (EB §46).
  var figures = document.querySelectorAll('[data-to]');
  function runCounter(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var dp = parseInt(el.getAttribute('data-dp') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var locale = document.documentElement.lang === 'ar' ? 'ar-EG' : 'en-GB';
    var fmt = function (n) {
      return prefix + n.toLocaleString(locale, {
        minimumFractionDigits: dp, maximumFractionDigits: dp
      }) + suffix;
    };
    if (reduce) { el.textContent = fmt(to); return; }
    var start = null;
    var DUR = 1400;
    (function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(to);
    })(performance.now());
  }
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(figures, runCounter);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        runCounter(en.target);
        cio.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(figures, function (el) {
      el.textContent = el.getAttribute('data-prefix') || '0';
      cio.observe(el);
    });
  }

  // Girih stroke-draw needs each path's own length so the dash animation is
  // proportional rather than uniform — otherwise short segments finish first
  // and the pattern assembles in the wrong order.
  if (!reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('.girih--draw path'), function (p) {
      try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) {}
    });
  }
})();
