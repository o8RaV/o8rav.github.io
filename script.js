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
  (function initStars() {
    var stars = document.getElementById('stars');
    var stars2 = document.getElementById('stars2');
    var stars3 = document.getElementById('stars3');
    if (stars) stars.style.setProperty('--stars-shadow', multipleBoxShadow(700));
    if (stars2) stars2.style.setProperty('--stars2-shadow', multipleBoxShadow(200));
    if (stars3) stars3.style.setProperty('--stars3-shadow', multipleBoxShadow(100));
  })();

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
