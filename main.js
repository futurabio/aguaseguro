// ── Hamburger menu ────────────────────────────────
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
document.addEventListener('click', function(e) {
  var nav = document.querySelector('nav');
  if (nav && !nav.contains(e.target)) closeMenu();
});

// ── Scroll to top ─────────────────────────────────
window.addEventListener('scroll', function() {
  var btn = document.getElementById('scrollTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
});

// ── Scroll reveal ─────────────────────────────────
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', function() {

  // Scroll reveal elements
  var revEls = document.querySelectorAll(
    '.stat-card, .step3, .who-card, .case, .ben, .size-card, .store, .tl-item, .tech-badge, .pd-item, .ret-card, .cta-strip, .review-card'
  );
  revEls.forEach(function(el, i) {
    var rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease ' + (i % 4 * 0.07) + 's, transform .5s ease ' + (i % 4 * 0.07) + 's';
      observer.observe(el);
    }
  });

  // FAQ icon toggle
  document.querySelectorAll('details').forEach(function(d) {
    d.addEventListener('toggle', function() {
      var fi = d.querySelector('.fi');
      if (fi) fi.textContent = d.open ? '×' : '+';
    });
  });

});
