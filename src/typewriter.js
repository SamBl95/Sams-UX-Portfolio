/**
 * typewriter.js - Hero typewriter animation.
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion.
 *
 * Timing:
 *   TYPE_SPEED   - ms per character typed
 *   DELETE_SPEED - ms per character deleted
 *   PAUSE_AFTER  - ms to hold the completed phrase before deleting
 */

const phrases = [
  'asks why when everyone else asks how',
  'gets stakeholders on board, even the reluctant ones',
  'understands the problem before defining solutions',
  'turns messy requirements into usable products',
  'designs for systems, not just screens',
];

const TYPE_SPEED   = 28;
const DELETE_SPEED = 18;
const PAUSE_AFTER  = 1500;

const container = document.querySelector('.hero__typewriter');
const display   = document.querySelector('.hero__typewriter-text');
const prefix    = document.querySelector('.hero__typewriter-prefix');
const cursor    = document.querySelector('.hero__typewriter-cursor');
const sr        = document.querySelector('.hero__typewriter-sr');

if (container && display) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show first phrase statically, no cursor, no animation
    display.textContent = phrases[0];
    if (sr) sr.textContent = getScreenReaderText(phrases[0]);
  }

  // Reserve height immediately with whatever font is available. CSS owns the
  // line-height math; JS only tells it how many wrapped text lines are needed.
  reserveHeight();

  // Re-measure once Caveat has loaded to get the exact Caveat line metrics.
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => {
    reserveHeight();
    if (!prefersReducedMotion) {
      initTypewriter();
    }
  });

  // Update on resize, debounced at 150ms
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reserveHeight, 150);
  });
}

/**
 * Measures every phrase at the current viewport and sets the number of wrapped
 * animated-text lines CSS must reserve. Caveat has uneven glyph widths, and the
 * caret has its own inline width, so character-count alone is not reliable.
 */
function reserveHeight() {
  const lines = measureWrappedTextLines();
  container.style.setProperty('--typewriter-text-lines', String(lines));
}

function measureWrappedTextLines() {
  const wasActive = container.classList.contains('hero__typewriter--active');
  container.classList.add('hero__typewriter--active');

  try {
    const textRect = display.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const measureWidth = Math.max(textRect.width, containerRect.width);

    if (!measureWidth) return 2;

    const textStyles = window.getComputedStyle(display);
    const cursorStyles = cursor ? window.getComputedStyle(cursor) : null;
    const fontSize = parseFloat(textStyles.fontSize);
    const lineHeight = parseFloat(textStyles.lineHeight) || fontSize * 1.08;

    const probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.left = '-9999px';
    probe.style.top = '0';
    probe.style.boxSizing = 'border-box';
    probe.style.display = 'block';
    probe.style.width = `${measureWidth}px`;
    probe.style.whiteSpace = 'normal';
    probe.style.fontFamily = textStyles.fontFamily;
    probe.style.fontSize = textStyles.fontSize;
    probe.style.fontWeight = textStyles.fontWeight;
    probe.style.lineHeight = textStyles.lineHeight;
    probe.style.letterSpacing = textStyles.letterSpacing;

    document.body.appendChild(probe);

    let maxLines = 1;
    for (const phrase of phrases) {
      probe.textContent = phrase;

      if (cursorStyles) {
        const cursorProbe = document.createElement('span');
        cursorProbe.style.display = 'inline-block';
        cursorProbe.style.width = cursorStyles.width;
        cursorProbe.style.height = cursorStyles.height;
        cursorProbe.style.maxHeight = cursorStyles.maxHeight;
        cursorProbe.style.lineHeight = cursorStyles.lineHeight;
        cursorProbe.style.marginLeft = cursorStyles.marginLeft;
        cursorProbe.style.verticalAlign = cursorStyles.verticalAlign;
        probe.appendChild(cursorProbe);
      }

      const lines = Math.max(1, Math.ceil((probe.getBoundingClientRect().height - 0.5) / lineHeight));
      if (lines > maxLines) maxLines = lines;
    }

    probe.remove();
    return maxLines;
  } finally {
    if (!wasActive) container.classList.remove('hero__typewriter--active');
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
      charIndex++;
      display.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        if (sr) sr.textContent = getScreenReaderText(phrase);
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
        // Phrase cleared; move straight to the next
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

function getScreenReaderText(phrase) {
  const prefixText = prefix ? prefix.textContent.trim() : '';
  return prefixText ? `${prefixText} ${phrase}` : phrase;
}
