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

  // Reserve height immediately with whatever font is available — this runs before
  // the first paint (module scripts are deferred but execute before paint on most
  // browsers), preventing a layout shift when the hero fades in.
  reserveHeight();

  // Re-measure once Caveat has loaded to get the exact Caveat line metrics.
  // By this point the hero is mid-fade-in (160ms delay + 600ms animation) so
  // any correction happens while the element is still largely transparent.
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
 * Measures every phrase at the current viewport and locks the container to the
 * tallest rendered height. Uses height (not min-height) so the container is
 * fully fixed — it cannot grow during typing even if a phrase wraps differently
 * to what was measured. Caveat has uneven glyph widths so character-count alone
 * is not a reliable proxy for rendered height.
 */
function reserveHeight() {
  const prev = display.textContent;
  container.style.height = '';

  let maxH = 0;
  for (const phrase of phrases) {
    display.textContent = phrase;
    const h = container.getBoundingClientRect().height;
    if (h > maxH) maxH = h;
  }

  display.textContent = prev;
  if (maxH > 0) container.style.height = maxH + 'px';
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
