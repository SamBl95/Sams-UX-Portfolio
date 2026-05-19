---
status: complete
phase: 11-seo
source: 11-01-SUMMARY.md, 11-02-SUMMARY.md
started: 2026-05-19T00:00:00Z
updated: 2026-05-19T00:00:00Z
---

## Current Test

## Current Test

[testing complete]

## Tests

### 1. Page Title and Meta Description
expected: Open the homepage in a browser. Right-click → View Page Source (or open DevTools → Elements → <head>). The <title> tag should read something like "Sam Blake | Product Designer — Portfolio" and the <meta name="description"> tag should have a meaningful description (150–160 chars) about Sam's work. Both should be present and not placeholder text.
result: pass

### 2. Canonical URL Tag
expected: Still in the homepage source, find <link rel="canonical" href="...">. The href should be the full absolute URL of the homepage (e.g. https://www.samsux.co.uk/). Check one other page (e.g. /about) — its canonical should match that page's URL, not the homepage.
result: pass

### 3. Open Graph Tags
expected: In the homepage source, find these OG meta tags: og:title, og:description, og:url, og:type (should be "website"), og:site_name (should be "Sam Blake | Product Designer"), og:locale (should be "en_GB"), og:image (should be an absolute URL ending in og-image.png). All should be present with non-empty content.
result: pass

### 4. JSON-LD Person Schema
expected: On the homepage and /about page, look in the page source for a <script type="application/ld+json"> block inside <head>. It should contain a JSON object with "@type": "Person" and fields like name, url, and jobTitle. Both pages should have this block.
result: pass

### 5. Sitemap
expected: Visit /sitemap.xml in the browser (e.g. http://localhost:5173/sitemap.xml or the live URL). The page should display XML with 10 <url> entries — one per page of the site. None of the <loc> values should contain .html extensions — they should be clean paths like /about, /work, /contact.
result: pass

### 6. robots.txt
expected: Visit /robots.txt in the browser. The file should load as plain text, contain "User-agent: *" and "Allow: /", and include a Sitemap: line pointing to the full sitemap URL.
result: pass

### 7. Clean URLs
expected: Navigate to /about (not /about.html) in the browser — the page should load normally. Try /contact and /work too. No .html extension should be required. (Note: this requires Vercel deployment or a server that honours vercel.json — it will NOT work with Vite dev server.)
result: issue
reported: "That gave me a 404 error"
severity: major

## Summary

total: 7
passed: 6
issues: 1
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Clean URLs (/about, /contact, /work) load without .html extension on Vercel"
  status: failed
  reason: "User reported: That gave me a 404 error"
  severity: major
  test: 7
  root_cause: "cleanUrls: true in vercel.json conflicts with rewrites — Vercel redirects the rewrite destination /src/pages/about.html to /src/pages/about (a non-existent clean URL), causing 404. Rewrites alone are sufficient."
  artifacts:
    - path: "vercel.json"
      issue: "cleanUrls: true removed — rewrites already provide clean URL routing"
  missing: []
  debug_session: ""
