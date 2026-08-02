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

  // Scroll reveal. EB §22: restrained, and fully removed under reduced-motion.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        var el = en.target;
        setTimeout(function () { el.classList.add('is-in'); }, Math.min(i * 70, 280));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }
})();
