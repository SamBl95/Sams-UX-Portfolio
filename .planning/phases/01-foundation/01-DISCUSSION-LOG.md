# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-17
**Phase:** 1-Foundation
**Areas discussed:** Component consistency, Nav link strategy, Contact page purpose, Blog structure

---

## Component Consistency

| Option | Description | Selected |
|--------|-------------|----------|
| Copy-paste | Manual copies on each page. No deps, but drift risk | |
| Vite HTML include plugin | Write once, include everywhere. One dev-dependency | ✓ |
| JS inject at runtime | Small script adds nav/footer. No build step but JS-dependent | |

**User's choice:** Vite HTML include plugin

| Option | Description | Selected |
|--------|-------------|----------|
| aria-current="page" only | Standard HTML, accessible, matches About page | |
| Active class + aria-current | .nav__link--active for visible highlight | |
| You decide | Cleanest given existing _nav.css | ✓ |

**User's choice:** You decide (Claude's discretion)

| Option | Description | Selected |
|--------|-------------|----------|
| Small JS script | Toggles .nav--open and aria-expanded | ✓ |
| CSS-only checkbox trick | No JS, but hacky markup | |
| Leave for later | Not in scope for foundation | |

**User's choice:** Small JS script (current intent)

---

## Nav Link Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Link to /contact page | Contact page becomes the nav destination | ✓ |
| Keep as #contact anchor | Scrolls to homepage section | |

**User's choice:** Link to /contact page

| Option | Description | Selected |
|--------|-------------|----------|
| Keep Work as homepage anchor | #case-studies scroll, no extra page | ✓ |
| Dedicated /work index page | Separate case study listing page | |
| Add Blog to nav too | Work stays as anchor, Blog gets nav link | |

**User's choice:** Keep as homepage anchor

| Option | Description | Selected |
|--------|-------------|----------|
| Add Blog to nav | Nav: Work / About / Blog / Get in touch | ✓ |
| Blog in footer only | Nav stays lean | |
| Homepage section + footer | Writing/Stories section on homepage | |

**User's choice:** Add Blog to nav

---

## Contact Page Purpose

| Option | Description | Selected |
|--------|-------------|----------|
| Reach me page | Same info as footer, no form | |
| Contact form | Real form, needs Formspree/EmailJS | |
| Work with me page | Editorial — types of work, availability | |

**User's choice:** Freeform — "It should be the main point of contact. Sits separately to home, no contact details on home. Email link, LinkedIn, and what I'm interested in hearing about."

| Option | Description | Selected |
|--------|-------------|----------|
| Remove homepage contact section entirely | Homepage ends with case studies | ✓ |
| Keep minimal CTA section | Short prompt with button to /contact | |

**User's choice:** Remove homepage contact section entirely

---

## Blog Structure (Stories)

| Option | Description | Selected |
|--------|-------------|----------|
| Card grid (like case studies) | Reuses Card component | |
| Date/title list | Minimal, editorial, fast to scan | ✓ |
| Mixed — featured + list | One featured post large, rest as list | |

**User's choice:** Date/title list

| Option | Description | Selected |
|--------|-------------|----------|
| Same structure as case studies | Nav + hero + content sections + footer | |
| Lighter layout | Article-style, comfortable reading width | |
| You decide | Cleanest given existing CSS architecture | ✓ |

**User's choice:** You decide (Claude's discretion)

| Option | Description | Selected |
|--------|-------------|----------|
| Blog | Straightforward | |
| Writing | Editorial feel | |
| Stories | Personal, career-narrative tone | ✓ |

**User's choice:** Stories

---

## Claude's Discretion

- Active nav state visual treatment (minimum `aria-current="page"`, may add `.nav__link--active`)
- Blog/Stories post page layout (article reading style, reusing existing tokens)

## Deferred Ideas

- Dedicated `/work` index page for case studies — future phase if site grows
- Real contact form (Formspree/EmailJS) — requires JS dependency
- SEO meta, Open Graph — content phase
- Mobile menu animation/transition polish — foundation gets it functional
