---
status: complete
phase: 09-content
source: 09-01-SUMMARY.md, 09-02-SUMMARY.md
started: 2026-05-19T00:00:00Z
updated: 2026-05-19T00:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Work history section — visible on About page
expected: Open /about. Scroll past "Giving back". A "Work history" section appears with three timeline entries: Matalan, Santander UK, and Self-employed (or similar), each with a role title, employer, date range, and a short description.
result: pass

### 2. Skills & tools section — visible on About page
expected: Below the work history, a "Skills & tools" section appears with three groups — Craft, Process, and Tools — each listing relevant items.
result: pass

### 3. Section order — About page flow
expected: Scrolling the About page reveals sections in this order: "How I got here" → "Giving back" → Work history → Skills & tools → "Beyond work". No sections missing or out of order.
result: pass

### 4. About page — mobile layout at 375px
expected: On a mobile viewport (375px), the work history timeline entries and skills groups stack vertically with no overflow, clipped text, or broken layout.
result: pass

### 5. Case study lede — measurable outcome visible
expected: Open any case study (e.g. i-Exchange or CASSI). The hero lede below the title contains a specific metric or outcome — e.g. "improving NPS by 12%" or "improved feedback submissions by 30%".
result: issue
reported: "only in the Hero Metrics container"
severity: minor

### 6. Stories article — structure and content
expected: Open the design-systems stories article. Page shows a date, title, at least two h2 subheadings, substantive body paragraphs, and a "← Back to stories" link at the top.
result: pass

## Summary

total: 6
passed: 5
issues: 1
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Case study hero lede contains a measurable outcome in the lede text"
  status: wont_fix
  reason: "Metrics are displayed as chips in the Hero Metrics container — a better visual treatment. Lede text handles narrative context only. By design."
  severity: minor
  test: 5
