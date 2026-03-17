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
  var revEls = document.querySelectorAll(
    '.stat-card, .step3, .who-card, .case, .ben, .size-card, .store, .tl-item, .tech-badge, .pd-item, .ret-card, .cta-strip'
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
});

// ── FAQ + icon toggle ─────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('details').forEach(function(d) {
    d.addEventListener('toggle', function() {
      var fi = d.querySelector('.fi');
      if (fi) fi.textContent = d.open ? '×' : '+';
    });
  });
});

// ── Testimonials carousel ─────────────────────────
var testiCurrent = 0;
var testiTotal = 5;
var testiAuto;

function goToSlide(n) {
  testiCurrent = ((n % testiTotal) + testiTotal) % testiTotal;
  var track = document.getElementById('testiTrack');
  if (track) track.style.transform = 'translateX(-' + (testiCurrent * 100) + '%)';
  var dots = document.querySelectorAll('.testi-dot');
  dots.forEach(function(d, i) {
    d.classList.toggle('active', i === testiCurrent);
  });
}

function shiftSlide(dir) {
  goToSlide(testiCurrent + dir);
  resetAutoplay();
}

function resetAutoplay() {
  clearInterval(testiAuto);
  testiAuto = setInterval(function() { goToSlide(testiCurrent + 1); }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  var track = document.getElementById('testiTrack');
  if (!track) return;

  // Autoplay
  resetAutoplay();

  // Touch/swipe support
  var startX = 0;
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      shiftSlide(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  // Pause on hover
  track.addEventListener('mouseenter', function() { clearInterval(testiAuto); });
  track.addEventListener('mouseleave', function() { resetAutoplay(); });
});

// ── Scroll to top button ──────────────────────────
window.addEventListener('scroll', function() {
  var btn = document.getElementById('scrollTop');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});
