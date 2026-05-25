/**
 * nav.js — Mobile bottom sheet nav launcher.
 * Handles: open/close, hamburger↔X morph, overlay tap, Escape key,
 * focus trap, and swipe-to-dismiss with drag physics.
 */

function initNav() {
  const nav     = document.querySelector('.nav');
  const toggle  = document.querySelector('.nav__toggle');
  const sheet   = document.getElementById('nav-sheet');
  const overlay = document.querySelector('.nav__overlay');
  if (!nav || !toggle || !sheet) return;

  // --- Open / close ---

  function openNav() {
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstTile = sheet.querySelector('.nav__tile');
    if (firstTile) firstTile.focus();
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
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

  // --- Focus trap: wrap tab between first and last tile ---
  document.addEventListener('keydown', e => {
    if (!nav.classList.contains('nav--open') || e.key !== 'Tab') return;
    const tiles = [...sheet.querySelectorAll('.nav__tile')];
    const first = tiles[0];
    const last  = tiles[tiles.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // --- Swipe-to-dismiss ---
  let touchStartY    = 0;
  let touchStartTime = 0;
  let isDragging     = false;

  sheet.addEventListener('touchstart', e => {
    touchStartY    = e.touches[0].clientY;
    touchStartTime = Date.now();
    isDragging     = false;
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    const deltaY = e.touches[0].clientY - touchStartY;
    if (deltaY > 0) {
      isDragging = true;
      sheet.style.transition = 'none';
      sheet.style.transform  = `translateY(${deltaY}px)`;
    }
  }, { passive: true });

  sheet.addEventListener('touchend', e => {
    if (!isDragging) return;
    const deltaY   = e.changedTouches[0].clientY - touchStartY;
    const elapsed  = Date.now() - touchStartTime;
    const velocity = deltaY / Math.max(elapsed, 1);

    if (deltaY > 60 || velocity > 0.4) {
      // Animate sheet to bottom edge, then clean up state
      sheet.style.transition = 'transform 200ms ease-in';
      sheet.style.transform  = 'translateY(100%)';
      setTimeout(() => {
        // Suppress the CSS close transition — animation already done
        sheet.style.transition = 'none';
        sheet.style.transform  = '';
        nav.classList.remove('nav--open');
        sheet.getBoundingClientRect(); // force reflow
        sheet.style.transition = '';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        sheet.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        toggle.focus();
      }, 200);
    } else {
      // Snap back with spring easing
      sheet.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      sheet.style.transform  = '';
      setTimeout(() => {
        sheet.style.transition = '';
      }, 350);
    }
    isDragging = false;
  });
}

initNav();
