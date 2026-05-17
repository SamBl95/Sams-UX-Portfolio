/**
 * reveal.js — Scroll-reveal utility.
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion.
 *
 * Usage:
 *   Apply .js-reveal to any element. This module adds .js-reveal--visible
 *   when the element scrolls into the viewport, triggering the CSS entrance
 *   animation defined in _reveal.css.
 *   Use data-reveal-delay="100|200|300" for stagger effects within a group.
 */

(function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = document.querySelectorAll('.js-reveal');

  if (prefersReducedMotion) {
    // Make all reveal elements immediately visible — no animation, no invisible content
    elements.forEach(function (el) {
      el.classList.add('js-reveal--visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('js-reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold:  0.1,
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
