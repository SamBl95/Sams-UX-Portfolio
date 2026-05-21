---
phase: 13-above-fold-images
plan: 02
status: complete
---

# 13-02 Summary — Homepage Card Images

## What was built
- Added `.card__image` wrapper div + `<img>` element to all 3 homepage cards in `index.html`
- Images reference JPEG files (upgraded from PNGs after Figma export): `i-exchange-preview.jpg`, `cassi-preview.jpg`, `community-preview.jpg`
- Added `.card__image` (aspect-ratio 16/9, overflow:hidden) and `.card__image img` (object-fit:cover) rules to `_card.css`
- Images load `eager` with explicit `width="800" height="450"` to prevent layout shift

## Notes
- Plan referenced PNG files; actual delivery uses higher-quality JPEGs (same filenames minus extension)
- Plan referenced `work.html`; page was renamed to `case-studies.html` during this phase (URL: `/work` → `/case-studies`)
- Card body layout was also overhauled ad-hoc: metric chip moved below title, CTA made full-width primary btn with space-between arrow, padding tightened

## Verification passed
- All 3 homepage cards display real 16:9 images above the card body
- Images use local JPEG files, no CDN hotlinks
- `.card__image` CSS enforces aspect-ratio and prevents overflow
- Hover/reveal animations unaffected

## Artifacts
- `index.html` — 3 `.card__image` blocks with real img elements
- `src/styles/3-components/_card.css` — `.card__image` + `.card__image img` rules
- `public/assets/images/i-exchange-preview.jpg`
- `public/assets/images/cassi-preview.jpg`
- `public/assets/images/community-preview.jpg`
