/**
 * Portfolio — minimal JS: nav toggle, smooth scroll, year, star shadows.
 */

(function () {
  'use strict';

  // Generate multiple box-shadow string (like Sass multiple-box-shadow)
  // n = number of stars; positions random 0–2000px like original
  function multipleBoxShadow(n) {
    var parts = [];
    for (var i = 0; i < n; i++) {
      parts.push(random(2000) + 'px ' + random(2000) + 'px #FFF');
    }
    return parts.join(', ');
  }
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  // Apply star shadows on load (700 / 200 / 100 stars)
  var starsEl = document.getElementById('stars');
  var stars2El = document.getElementById('stars2');
  var stars3El = document.getElementById('stars3');
  (function initStars() {
    if (starsEl) starsEl.style.setProperty('--stars-shadow', multipleBoxShadow(700));
    if (stars2El) stars2El.style.setProperty('--stars2-shadow', multipleBoxShadow(200));
    if (stars3El) stars3El.style.setProperty('--stars3-shadow', multipleBoxShadow(100));
  })();

  // Parallax: scroll-driven + continuous drift when idle (different rates = depth)
  var scrollY = 0;
  var k1 = 0.5;
  var k2 = 0.35;
  var k3 = 0.2;
  var driftCycle = 2000; // matches ::after at top:2000px for seamless loop
  var driftDuration = 60; // seconds per full drift cycle

  function updateStarParallax() {
    // Use scrolling element so it works when body is scroll container (e.g. Brave)
    scrollY = (document.scrollingElement && document.scrollingElement.scrollTop) || window.scrollY || document.documentElement.scrollTop || 0;
    var t = (Date.now() / 1000) / driftDuration;
    var drift = (t % 1) * driftCycle;
    var y1 = scrollY * k1 + drift;
    var y2 = scrollY * k2 + drift * 0.8;
    var y3 = scrollY * k3 + drift * 0.6;
    if (starsEl) starsEl.style.transform = 'translateY(' + (-y1) + 'px)';
    if (stars2El) stars2El.style.transform = 'translateY(' + (-y2) + 'px)';
    if (stars3El) stars3El.style.transform = 'translateY(' + (-y3) + 'px)';
  }
  function tick() {
    updateStarParallax();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  window.addEventListener('scroll', updateStarParallax, { passive: true });
  document.body.addEventListener('scroll', updateStarParallax, { passive: true });

  // Mobile nav toggle
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click (mobile)
    var links = nav.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links (fallback for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
