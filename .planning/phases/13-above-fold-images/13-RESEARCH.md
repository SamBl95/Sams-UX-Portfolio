# Phase 13: Above-Fold Images — Research

**Researched:** 2026-05-20
**Domain:** Static image embedding — vanilla HTML, Webflow CDN assets, local vs. hotlink
**Confidence:** HIGH

---

## Summary

Phase 13 replaces image placeholders on the homepage case study cards (IMG-01) and the /work page feature rows (IMG-02) with real images sourced from samsux.webflow.io.

The core discovery from crawling the Webflow site is that suitable preview images **already exist** on the Webflow CDN and are publicly accessible with no authentication. Three matching images were found — one per case study — hosted at `cdn.prod.website-files.com`. All three returned HTTP 200 with valid `image/png` content types when probed directly.

The homepage cards (IMG-01) have **no existing image slot in the HTML**. The card component (`_card.css`) uses a metric-chip design pattern — there is no `.card__image` element or CSS rule. Adding images requires both a new HTML element and new CSS rules inside `_card.css`. The /work page feature rows (IMG-02) have an existing `.work__feature-image` div placeholder styled as a 16:9 background-color block — replacing this placeholder only requires adding an `<img>` inside the existing div, plus a small CSS update.

**Primary recommendation:** Download images to `public/assets/images/` and reference them with root-relative paths. Do not hotlink from the Webflow CDN — the URLs contain Webflow's internal content hash and can change without notice.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Image display on homepage cards | Browser / Client | — | Static HTML rendered by Vite MPA, no server rendering |
| Image display on /work feature rows | Browser / Client | — | Same — static HTML |
| Image file storage | CDN / Static | — | Files live in `public/` and are served as static assets by Vite |
| CSS sizing and aspect ratio | Browser / Client | — | Controlled by `_card.css` and `_work.css` component files |

---

## Image Placeholder Audit

### Homepage — `index.html` (root)

The homepage has **no image slots**. The three case study cards use a metric-chip design pattern with NO `<img>` or image container element:

```html
<!-- CARD 1: i-Exchange (line 83) -->
<a href="/case-studies/i-exchange" class="card js-reveal" data-reveal-delay="0">
  <div class="card__metric-chip">           <!-- ← teal accent block, no image -->
    <span class="card__metric-value">35%</span>
    <span class="card__metric-label">Search accuracy improvement</span>
  </div>
  <div class="card__body"> ... </div>
  <footer class="card__footer"> ... </footer>
</a>

<!-- CARD 2: Cassi (line 101) — same structure -->
<!-- CARD 3: Community (line 119) — same structure -->
```

**What IMG-01 requires:** Add a new `.card__image` container above or below `.card__metric-chip`, insert an `<img>` element inside it, and add matching CSS rules to `_card.css`. This is additive — no existing markup is removed.

### /work Page — `src/pages/work.html`

Three feature rows with identical placeholder structure, one per case study:

```html
<!-- i-Exchange (line 35–42) -->
<a class="work__feature" href="/case-studies/i-exchange">
  <div class="work__feature-image" aria-hidden="true"></div>   <!-- ← PLACEHOLDER: empty div -->
  <div class="work__feature-copy"> ... </div>
</a>

<!-- Cassi (line 44–51) — same structure -->
<!-- Community (line 53–60) — same structure -->
```

**Existing CSS for `.work__feature-image`** (`_work.css` lines 102–107, 167–169):
- Mobile: `aspect-ratio: 16/9; width: 100%; background-color: var(--color-surface);`
- Desktop (905px+): `flex: 0 0 40%;` (image column is 40% of the feature row width)

**What IMG-02 requires:** Add an `<img>` inside the existing empty div. Change `aria-hidden="true"` to be on the img (with empty alt) since the div becoming a real image container changes semantics. Update CSS to remove `background-color` placeholder and add `object-fit: cover` to the img.

---

## Discovered Webflow Image URLs

All URLs confirmed accessible via HTTP 200 on 2026-05-20. [VERIFIED: direct curl probe]

### Primary case study preview images (usable for both IMG-01 and IMG-02)

| Case Study | File size | URL |
|------------|-----------|-----|
| i-Exchange | 305 KB | `https://cdn.prod.website-files.com/685151b1ced1885ded310707/6853174d2f696b7539a2e86e_d18732f5a6117b222f8ef4b59707b2bc_i-EX%20home.png` |
| Cassi | 84 KB | `https://cdn.prod.website-files.com/685151b1ced1885ded310707/688bd798678b2573079d7749_feb417d7bff539ef8dcd7321bef8ee22_Screenshot_2025-07-31_215110-removebg-preview%20%281%29.png` |
| Community | 61 KB | `https://cdn.prod.website-files.com/685151b1ced1885ded310707/688a342c9c532933d177b899_5f6f003f16ef98eb6e82cda6bffdadac_Community%20home%20mock%20up.png` |

### Other discovered images (NOT suitable for cards)

| Image | File size | Notes |
|-------|-----------|-------|
| i-Exchange logo | 0.8 KB | Tiny logo/icon — not a preview image |
| Cassi logo | 2.3 KB | Tiny logo/icon — not a preview image |
| Community logo | 0.7 KB | Tiny logo/icon — not a preview image |
| Rentokil RI logo | 0.6 KB | 587 bytes — icon only, Rentokil is not a current case study |
| Sam Blake headshot | 153 KB | Profile photo, not a case study image |
| Timer icon (SVG) | — | UI decoration, not a preview image |

### Webflow page availability

- `samsux.webflow.io` (homepage) — **accessible**, images crawled successfully
- `samsux.webflow.io/i-exchange` — HTTP 404 (slug does not exist at this path)
- `samsux.webflow.io/cassi` — HTTP 404
- `samsux.webflow.io/community` — HTTP 404
- `samsux.webflow.io/work` — HTTP 404
- `samsux.webflow.io/sitemap.xml` — HTTP 404

The Webflow site only has one accessible page (the homepage). All three case study preview images were found on that homepage and are sufficient for this phase.

---

## Standard Stack

No new npm packages are required for this phase. Implementation is pure HTML + CSS in the existing vanilla stack.

| Operation | Tool | Notes |
|-----------|------|-------|
| Download images | PowerShell `Invoke-WebRequest` or `curl` | One-off download to `public/assets/images/` |
| HTML changes | Direct HTML edits | 3 files: `index.html`, `work.html` |
| CSS changes | `_card.css`, `_work.css` | Add `.card__image` rules; update `.work__feature-image` |

### No new dependencies — package legitimacy audit skipped (no packages to install)

---

## Architecture Patterns

### Recommended Project Structure

```
public/
└── assets/
    └── images/
        ├── i-exchange-preview.png      # 305 KB, downloaded from Webflow CDN
        ├── cassi-preview.png           # 84 KB, downloaded from Webflow CDN
        └── community-preview.png       # 61 KB, downloaded from Webflow CDN
```

Public assets are served at the root by Vite. A file at `public/assets/images/foo.png` is referenced as `/assets/images/foo.png`. [VERIFIED: vite.config.js sets `publicDir: 'public'`]

### Pattern 1: Image element inside existing placeholder div (/work page)

The `.work__feature-image` div is already styled with `aspect-ratio: 16/9`. Add `<img>` with `object-fit: cover` to fill it:

```html
<!-- Before -->
<div class="work__feature-image" aria-hidden="true"></div>

<!-- After -->
<div class="work__feature-image">
  <img
    src="/assets/images/i-exchange-preview.png"
    alt="i-Exchange knowledge base homepage — redesigned search interface"
    width="800"
    height="450"
    loading="lazy"
    decoding="async"
  />
</div>
```

CSS update to `_work.css`:
```css
/* Remove background-color placeholder; add img rules */
.work__feature-image {
  aspect-ratio: 16 / 9;
  width:        100%;
  flex-shrink:  0;
  overflow:     hidden;   /* clip img to aspect-ratio box */
}

.work__feature-image img {
  width:      100%;
  height:     100%;
  object-fit: cover;
  display:    block;
}
```

### Pattern 2: New image slot on homepage cards

Cards have no image element. A new `.card__image` block must be inserted. The design decision of **where** to place it relative to `.card__metric-chip` is for the planner to resolve with the user — options:

- **Above the chip:** Image at top, chip below — matches reference sites (joependlebury.com pattern)
- **Below the chip:** Chip at top as accent, image below — retains the existing visual hierarchy

```html
<!-- Recommended: image above metric chip -->
<a href="/case-studies/i-exchange" class="card js-reveal" data-reveal-delay="0">
  <div class="card__image">
    <img
      src="/assets/images/i-exchange-preview.png"
      alt="i-Exchange knowledge base homepage redesign"
      width="800"
      height="450"
      loading="lazy"
      decoding="async"
    />
  </div>
  <div class="card__metric-chip"> ... </div>
  ...
</a>
```

New CSS in `_card.css`:
```css
.card__image {
  aspect-ratio: 16 / 9;
  overflow:     hidden;
  flex-shrink:  0;
}

.card__image img {
  width:      100%;
  height:     100%;
  object-fit: cover;
  display:    block;
}
```

### Convention: `aria-hidden` placement

The existing `/work` HTML uses `aria-hidden="true"` on the container div. When a real `<img>` goes inside, `aria-hidden` on the wrapper silences the image from screen readers — which is correct only if the `alt` text of the img is empty. Convention for decorative/contextual images where the card title already describes the destination:

- `alt=""` on the `<img>` (empty, not missing — missing alt is an accessibility error)
- Remove `aria-hidden="true"` from the wrapper div (the empty alt handles SR suppression)

### Convention: `loading="lazy"` vs `eager`

Above-fold images should use `loading="eager"` (or omit the attribute, which defaults to eager in modern browsers). The cards section is below the hero but is the first piece of meaningful content — lazy-loading it creates a visible pop-in on initial scroll. [ASSUMED — depends on viewport height and scroll depth; confirm with visual testing]

`loading="lazy"` is appropriate for the /work page feature rows since they are the main page content and will be partially off-screen on mobile.

### Convention: explicit `width` and `height` attributes

The project has no existing `<img>` tags to compare against. Best practice for CLS (Cumulative Layout Shift) prevention is to include `width` and `height` attributes matching the image's intrinsic dimensions. This allows the browser to reserve the correct space before the image loads, even when CSS overrides the visual size with `object-fit`. [ASSUMED — confirmed as general web best practice, not specific to this project's conventions]

---

## Hotlink vs. Download Decision

**Recommendation: Download images to `public/assets/images/` (local)**

| Factor | Hotlink (Webflow CDN) | Download (local) |
|--------|----------------------|------------------|
| Reliability | URLs contain content hashes — can change if Sam re-uploads on Webflow | Stable indefinitely |
| Performance | External DNS + TLS handshake per image | Same origin, Vite optimisation |
| Webflow ToS | Webflow free plan may prohibit hotlinking assets from production sites | No concern |
| Maintenance | Breaks silently if Webflow project is deleted or migrated | Self-contained |
| Effort | Zero (just paste the URL) | ~5 minutes to download 3 files |

The Webflow CDN URLs are functional now but are not designed to be stable external references. The image filenames include Webflow's internal content hash (e.g., `d18732f5a6117b222f8ef4b59707b2bc_i-EX%20home.png`) — these hash prefixes change when assets are re-uploaded. Downloading once and serving locally is the only robust approach.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Image sizing/cropping | Custom clip or JS crop | CSS `object-fit: cover` on the `<img>` |
| Lazy loading | Intersection Observer JS | Native `loading="lazy"` attribute |
| Responsive images | JS-based srcset | HTML `srcset` / `sizes` attributes (optional for this phase — images are small) |
| Aspect ratio enforcement | Padding-top % hack | Native CSS `aspect-ratio` property (already used in `_work.css`) |

---

## Common Pitfalls

### Pitfall 1: Missing `alt` attribute (accessibility error)

**What goes wrong:** Omitting `alt` entirely is treated as unknown content by screen readers — they may read the full filename URL.
**How to avoid:** Always include `alt`. For decorative images where the surrounding link/heading already conveys the content, use `alt=""` (empty string, not omitted).
**Warning signs:** Lighthouse accessibility score drops; axe reports "Images must have alternate text".

### Pitfall 2: `object-fit: cover` with no explicit height

**What goes wrong:** If the `<img>` has `width: 100%` but no height constraint, `object-fit: cover` does nothing because the image expands to its intrinsic height.
**How to avoid:** The parent container must have a fixed or ratio-constrained height. Use `aspect-ratio` on the parent + `width: 100%; height: 100%` on the `<img>`.
**Warning signs:** Images appear with their full intrinsic height, ignoring the intended 16:9 crop.

### Pitfall 3: Hotlinking Webflow CDN URLs directly in HTML

**What goes wrong:** Webflow content-hash URLs change when assets are re-uploaded. The portfolio breaks silently — images 404 with no warning.
**How to avoid:** Download all images to `public/assets/images/` during the execution phase before editing HTML.

### Pitfall 4: Homepage card image position disrupts card reveal animation

**What goes wrong:** The homepage cards use `js-reveal` with staggered `data-reveal-delay`. Adding a large image inside each card may cause a layout shift during the reveal animation if the image loads after the animation fires.
**How to avoid:** Use `loading="eager"` on homepage card images (not lazy) and include explicit `width`/`height` attributes to pre-reserve space.

### Pitfall 5: `aria-hidden="true"` on wrapper silences img alt

**What goes wrong:** The existing `/work` divs have `aria-hidden="true"`. If `<img alt="...">` (non-empty alt) is placed inside an `aria-hidden` wrapper, the alt text is suppressed and the image is invisible to screen readers even though it has meaningful alternative text.
**How to avoid:** Remove `aria-hidden="true"` from the wrapper div; control screen reader exposure via `alt=""` on the `<img>` directly.

### Pitfall 6: Cassi image is a removed-background PNG (not a mockup screenshot)

**What goes wrong:** The Cassi image (`Screenshot_2025-07-31_215110-removebg-preview`) is a background-removed PNG (transparent background, 84KB). On the dark `--color-surface` background this may look fine, but on the green `--color-bg` it may have no visible boundary.
**How to avoid:** Test the Cassi image on the dark background before finalising. The transparent background will reveal the container background colour — this may be desirable (floating UI feel) or may look unfinished.

---

## Image Quality Notes

| Case Study | Image | Quality Assessment |
|------------|-------|--------------------|
| i-Exchange | 305 KB PNG — i-EX home screenshot | Good resolution, likely a full-page or viewport screenshot. Large file suggests decent quality. |
| Cassi | 84 KB PNG — removebg screenshot (transparent bg) | Smaller — may be a cropped UI element rather than a full mockup. Transparent background. |
| Community | 61 KB PNG — Community home mock up | Smallest of the three. Likely a mobile or partial mockup. May pixelate at card width. |

The planner should include a step to visually inspect all three images before finalising the plan, since quality determines whether they need to be downloaded at higher resolution or whether the Webflow source is adequate.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| curl / PowerShell Invoke-WebRequest | Downloading images from CDN | ✓ | Windows 10 (curl built-in) | Invoke-WebRequest in PowerShell |
| Vite dev server | Viewing changes locally | ✓ | Detected via vite.config.js | — |
| No new npm packages | — | N/A | — | — |

---

## Validation Architecture

Nyquist validation is not applicable for this phase — this is a static asset + HTML/CSS edit phase with no behavioral logic to unit-test. The correct validation is visual inspection:

| Req ID | Behavior | Validation Method |
|--------|----------|-------------------|
| IMG-01 | Homepage cards show case study thumbnail images | Manual: open homepage, confirm 3 cards each show a real image |
| IMG-02 | /work feature rows show case study images | Manual: open /work, confirm 3 feature rows each show a real image |

Additional checks:
- Lighthouse accessibility score does not regress (no missing alt attributes)
- No layout shift visible when scrolling to cards section (CLS check)
- Images display correctly at 375px, 600px, 905px, 1240px viewport widths

---

## Security Domain

No security-relevant changes in this phase. Static image files and HTML attribute additions. No user input, no network calls from JavaScript, no new dependencies.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `loading="eager"` is correct for homepage cards (above fold on most screens) | Architecture Patterns | Cards may be below viewport — switch to `loading="lazy"` if cards are always off-screen on initial load |
| A2 | The three Webflow preview images are sufficient quality for card display | Image Quality Notes | Low-res images may look pixelated at card width; Sam may need to export higher-quality versions |
| A3 | Cassi transparent-background PNG will look acceptable on dark card background | Common Pitfalls — Pitfall 6 | May look unfinished; may need to obtain a screenshot with background instead |
| A4 | Webflow CDN URLs will remain accessible during the execution window | Hotlink vs. Download | URLs may 404 if Sam modifies the Webflow project between now and execution |

---

## Open Questions

1. **Homepage card image position: above or below the metric chip?**
   - What we know: The existing card design uses the chip as the top visual anchor (teal border, accent colour)
   - What's unclear: Whether adding an image above the chip changes the card hierarchy in a way Sam wants
   - Recommendation: Default to image-above-chip (matches reference sites); Sam can review the plan and request an alternative

2. **Should homepage cards add images at all, or only /work page?**
   - What we know: IMG-01 explicitly requires "homepage case study cards display real thumbnail images"
   - What's unclear: The current cards use metric chips prominently — adding images changes the card's visual language
   - Recommendation: Proceed as per IMG-01; the metric chip can remain below the image

3. **Cassi and Community image quality — adequate or needs re-export?**
   - What we know: Cassi is 84KB (small), Community is 61KB (smallest)
   - What's unclear: Whether these dimensions match card display width (likely ~600-800px CSS pixels)
   - Recommendation: Download and inspect during Wave 0 of execution; flag to Sam if pixelation is visible

---

## Sources

### Primary (HIGH confidence)
- Direct HTML reading of `index.html`, `src/pages/work.html` — image slot audit [VERIFIED: Read tool]
- Direct CSS reading of `_work.css`, `_card.css`, `_case-studies.css` — styling patterns [VERIFIED: Read tool]
- `vite.config.js` — confirmed `publicDir: 'public'` and MPA structure [VERIFIED: Read tool]
- `.planning/REQUIREMENTS.md` — IMG-01, IMG-02 definitions [VERIFIED: Read tool]
- `.planning/STATE.md` — decisions log confirming Webflow image source approach [VERIFIED: Read tool]
- CDN URL verification via `curl` — all three preview images return HTTP 200 [VERIFIED: curl probe 2026-05-20]

### Secondary (MEDIUM confidence)
- Webflow homepage crawl (samsux.webflow.io) — image URL discovery [VERIFIED: WebFetch 2026-05-20, page returned 200]
- CSS `object-fit: cover` + `aspect-ratio` pattern — standard modern CSS, no library required [ASSUMED: general web knowledge]

### Tertiary (LOW confidence)
- `loading="eager"` recommendation for homepage cards — depends on actual viewport coverage [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Image slot audit (HTML): HIGH — directly read source files
- Webflow CDN URL availability: HIGH — confirmed via curl with 200 responses
- CSS implementation patterns: HIGH — follows existing project conventions in `_work.css`
- Image quality adequacy: LOW — files verified to exist but visual quality not inspectable via tool
- Card image placement decision: MEDIUM — follows reference sites but is a design call

**Research date:** 2026-05-20
**Valid until:** 2026-06-19 (Webflow CDN URLs stable for ~30 days; Sam may re-upload assets)
