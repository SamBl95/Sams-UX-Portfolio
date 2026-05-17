/**
 * typewriter.js — Hero typewriter animation.
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion.
 *
 * Timing:
 *   TYPE_SPEED   — ms per character typed
 *   DELETE_SPEED — ms per character deleted
 *   PAUSE_AFTER  — ms to hold the completed phrase before deleting
 */

const phrases = [
  "asks why so you don't have to",
  "has a habit of fixing things without being asked",
  "repairs the relationships between siloed teams",
];

const TYPE_SPEED   = 28;
const DELETE_SPEED = 18;
const PAUSE_AFTER  = 1500;

const container = document.querySelector('.hero__typewriter');
const display   = document.querySelector('.hero__typewriter-text');
const sr        = document.querySelector('.hero__typewriter-sr');

if (container && display) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show first phrase statically, no cursor, no animation
    display.textContent = phrases[0];
  }

  // Wait for Caveat to load before measuring — font metrics determine line count.
  // reserveHeight() runs sync between frames so there is no visual flicker.
  document.fonts.ready.then(() => {
    reserveHeight();
    if (!prefersReducedMotion) {
      initTypewriter();
    }
  });

  // Update on resize — debounced at 150ms
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reserveHeight, 150);
  });
}

/**
 * Measures the rendered height of the longest phrase at the current viewport
 * and pins container.style.minHeight to that value, eliminating layout shift.
 * Full phrase length is always used — wrapping is fine, truncation is not.
 */
function reserveHeight() {
  const longestText = phrases.reduce((a, b) => a.length >= b.length ? a : b, '');

  const prev = display.textContent;
  container.style.minHeight = '';
  display.textContent = longestText;
  const h = container.getBoundingClientRect().height;
  display.textContent = prev;

  if (h > 0) container.style.minHeight = h + 'px';
}

function initTypewriter() {
  // Reveal the blinking cursor
  container.classList.add('hero__typewriter--active');

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function tick() {
    const phrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      display.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        if (sr) sr.textContent = phrase;
        setTimeout(() => {
          isDeleting = true;
          tick();
        }, PAUSE_AFTER);
        return;
      }

      setTimeout(tick, TYPE_SPEED);
    } else {
      // Delete previous character
      charIndex--;
      display.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        // Phrase cleared — move straight to the next
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, TYPE_SPEED);
        return;
      }

      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Short delay before the first character appears so the page can settle
  setTimeout(tick, 800);
}
