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

const TYPE_SPEED   = 50;
const DELETE_SPEED = 30;
const PAUSE_AFTER  = 1500;

const container = document.querySelector('.hero__typewriter');
const display   = document.querySelector('.hero__typewriter-text');
const sr        = document.querySelector('.hero__typewriter-sr');

if (container && display) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Reduced motion: show first phrase statically, no cursor, no animation
    display.textContent = phrases[0];
  } else {
    initTypewriter();
  }
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
      // Type next character
      charIndex++;
      display.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        // Phrase complete — update screen reader text, then pause before deleting
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
