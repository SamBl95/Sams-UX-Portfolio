---
plan: 11-01
phase: 11-seo
status: complete
commit: 06cde71
---

# Summary: SEO Head Blocks — All 10 Pages

## What was done

Added the full SEO head block to all 10 pages: canonical URL, OG tags (title, description, url, type, site_name, locale, image), and meta theme-color. Existing title and meta description tags were replaced with 150–160-character optimised versions.

## Files modified

- `index.html`
- `src/pages/about.html`
- `src/pages/contact.html`
- `src/pages/cv.html`
- `src/pages/work.html`
- `src/pages/case-studies/i-exchange.html`
- `src/pages/case-studies/cassi.html`
- `src/pages/case-studies/community.html`
- `src/pages/stories/index.html`
- `src/pages/stories/design-systems-and-portfolio-sites.html`

## Verification

- `grep -c 'rel="canonical"'` → 1 per file across all 10 ✓
- `grep -c 'og:image'` → 1 per file across all 10 ✓
- All og:site_name values = "Sam Blake | Product Designer" ✓
- All og:locale = "en_GB" ✓
- All og:image = "https://www.samsux.co.uk/og-image.png" ✓
- All theme-color = "#f5f2ed" ✓

## Requirements satisfied

SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06
