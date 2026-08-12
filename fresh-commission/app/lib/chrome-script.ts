// Shared interactive behaviour for the public-site chrome: sticky-header
// scroll state, the mobile drawer, scroll-reveal, and the hero arch parallax.
// Verbatim port of the vanilla script used across the static design pages.
export const CHROME_SCRIPT = `
(function(){
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 90); };
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  var drawer = document.getElementById('drawer');
  if (drawer) {
    var openBtns = document.querySelectorAll('[data-drawer-open]');
    var closeBtns = document.querySelectorAll('[data-drawer-close]');
    var setDrawer = function(open){
      drawer.setAttribute('data-open', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    openBtns.forEach(function(b){ b.addEventListener('click', function(){ setDrawer(true); }); });
    closeBtns.forEach(function(b){ b.addEventListener('click', function(){ setDrawer(false); }); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') setDrawer(false);
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){ io.observe(el); });
  }

  var plate = document.querySelector('.hero .plate');
  if (plate && !reduce) {
    var ticking = false;
    var onPlateScroll = function () {
      var y = Math.min(window.scrollY, 600);
      plate.style.transform = 'translateY(' + (y * 0.08) + 'px)';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onPlateScroll); ticking = true; }
    }, { passive: true });
  }
})();
`;
