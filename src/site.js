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

  // Mobile navigation — a full-screen drawer toggled by DISPLAY, never by a
  // transform that parks it outside the viewport. A translated-off panel is
  // still laid out, so it extends the document's scroll width: that is what
  // made every page on this site scroll 330px sideways on a phone while every
  // desktop check passed. Display:none removes it from layout entirely.
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('nav');
  function setNav(open) {
    nav.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-lock', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(nav.getAttribute('data-open') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
    // Following a link must close the drawer, or the body stays scroll-locked
    // on browsers that restore the page from the back-forward cache.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    // Rotating to landscape can cross the breakpoint with the drawer open,
    // leaving the body locked and the page apparently frozen.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000 && nav.getAttribute('data-open') === 'true') setNav(false);
    });
    var close = nav.querySelector('.nav__close');
    if (close) close.addEventListener('click', function () { setNav(false); toggle.focus(); });
  }

  // Mega panels. On the desktop they open on hover and focus, in CSS alone, so
  // they work before this script has loaded. In the drawer they are accordions,
  // which needs a click handler — and only there: the chevron button does not
  // exist as a control at desktop widths.
  Array.prototype.forEach.call(document.querySelectorAll('.drop'), function (drop) {
    var btn = drop.querySelector('.drop__x');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = drop.getAttribute('data-open') === 'true';
      // One panel at a time: two open accordions in a full-screen drawer means
      // the reader scrolls past the section they were looking for.
      Array.prototype.forEach.call(document.querySelectorAll('.drop[data-open=true]'), function (d) {
        if (d !== drop) {
          d.setAttribute('data-open', 'false');
          d.querySelector('.drop__x').setAttribute('aria-expanded', 'false');
        }
      });
      drop.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

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
