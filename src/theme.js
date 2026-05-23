/**
 * theme.js — Hamburger nav toggle with right-side drawer.
 * Vanilla JS, no dependencies.
 */

function initHamburger() {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;

  const menu    = nav.querySelector('.nav__menu');
  const overlay = nav.querySelector('.nav__overlay');
  const close   = nav.querySelector('.nav__close');

  function openNav() {
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    if (menu) menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    if (menu) menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('nav--open') ? closeNav() : openNav();
  });

  if (close)   close.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);

  document.addEventListener('click', e => {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeNav();
      toggle.focus();
    }
  });
}

initHamburger();

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
