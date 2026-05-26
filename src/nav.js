/**
 * nav.js — Mobile nav modal overlay.
 * Handles: open/close, hamburger↔X morph, overlay tap, Escape key,
 * focus trap, and animation-driven close.
 */

function initNav() {
  const nav     = document.querySelector('.nav');
  const toggle  = document.querySelector('.nav__toggle');
  const sheet   = document.getElementById('nav-sheet');
  const overlay = document.querySelector('.nav__overlay');
  if (!nav || !toggle || !sheet) return;

  let navCloseHandler = null;

  // --- Open ---

  function openNav() {
    // Cancel any in-progress close animation before re-opening
    if (navCloseHandler) {
      sheet.removeEventListener('animationend', navCloseHandler);
      navCloseHandler = null;
    }
    nav.classList.remove('nav--closing');
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    sheet.setAttribute('aria-hidden', 'false');
    sheet.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    const firstFocusable = sheet.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  // --- Close ---

  function closeNav() {
    nav.classList.remove('nav--open');
    nav.classList.add('nav--closing');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    sheet.setAttribute('aria-hidden', 'true');
    sheet.setAttribute('inert', '');
    document.body.style.overflow = '';
    toggle.focus();

    navCloseHandler = function () {
      navCloseHandler = null;
      nav.classList.remove('nav--closing');
    };
    sheet.addEventListener('animationend', navCloseHandler, { once: true });
  }

  // --- Toggle click ---
  toggle.addEventListener('click', () => {
    nav.classList.contains('nav--open') ? closeNav() : openNav();
  });

  // --- Overlay tap ---
  if (overlay) overlay.addEventListener('click', closeNav);

  // --- Escape key ---
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeNav();
    }
  });

  // --- Focus trap: cycle between first and last focusable in the sheet ---
  document.addEventListener('keydown', e => {
    if (!nav.classList.contains('nav--open') || e.key !== 'Tab') return;
    const focusables = [...sheet.querySelectorAll('a, button, [href], [tabindex]:not([tabindex="-1"])')];
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (!first) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

initNav();
