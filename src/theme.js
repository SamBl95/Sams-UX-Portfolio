/**
 * theme.js — Scroll shadow only.
 * Nav open/close logic has moved to nav.js (bottom sheet launcher).
 */

function initScrollShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

initScrollShadow();
