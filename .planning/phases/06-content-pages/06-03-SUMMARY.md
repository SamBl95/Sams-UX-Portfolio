---
plan: 06-03
status: complete
---

## Summary

Implemented ANIM-05 clip-path hover border on stories list items, 72ch reading width on post body, and scroll-reveal entrances on stories pages.

## Changes

- `src/styles/3-components/_stories.css`: added position:relative to .stories__link; added ::before clip-path reveal rule; added hover reveal inside existing @media block; expanded prefers-reduced-motion block; added .post__body p { max-width: 72ch }
- `src/pages/stories/index.html`: js-reveal on heading and list (list has delay=100)
- `src/pages/stories/design-systems-and-portfolio-sites.html`: js-reveal on post__header and post__body (body has delay=100)

## Verification

- `.stories__link::before` clip-path reveal: resting inset(0 0 0 100%), hover inset(0 0 0 0) ✓
- prefers-reduced-motion: static border visible (clip-path: inset(0 0 0 0)) ✓
- `.post__body p { max-width: 72ch }` ✓
- stories/index.html: 2 js-reveal, 1 data-reveal-delay ✓
- design-systems post: 2 js-reveal, 1 data-reveal-delay ✓
