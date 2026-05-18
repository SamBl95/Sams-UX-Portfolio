---
plan: 06-01
status: complete
---

## Summary

Implemented prose reading-width constraint and scroll-reveal entrances for the About page.

## Changes

- `src/styles/3-components/_about.css`: added `max-width: 72ch` to `.about-section__body p`
- `src/styles/3-components/_case-study.css`: added `max-width: 72ch` to `.cs-phase__body p`
- `src/pages/about.html`: added `js-reveal` to hero section, lede (with delay=100), and 3 content sections

## Verification

- `_about.css`: `.about-section__body p` contains `max-width: 72ch` ✓
- `_case-study.css`: `.cs-phase__body p` contains `max-width: 72ch` ✓
- `about.html`: 5 elements with `js-reveal`, 1 with `data-reveal-delay="100"` ✓
