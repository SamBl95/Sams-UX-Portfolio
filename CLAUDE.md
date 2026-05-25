<!-- GSD:project-start source:PROJECT.md -->

## Project

**Sam Blake Portfolio v2**

A personal portfolio site for Sam Blake, a product designer with 3 years of experience across fintech (Santander UK), retail (Matalan), and property. Built as a Vite MPA with vanilla HTML/CSS. The site targets hybrid/remote product design roles in the North West England market.

**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

### Constraints

- **Tech stack**: Vanilla HTML + CSS only — no JS/CSS frameworks
- **Build**: Every page must be declared in `vite.config.js` rollupOptions.input
- **Design tokens**: No CSS hex values outside `_variables.css`, no inline styles, no arbitrary spacing
- **Scope**: Foundation only — structure and navigation, not content detail

<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->

## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| baseline-ui | Validates animation durations, enforces typography scale, checks component accessibility, and prevents layout anti-patterns in Tailwind CSS projects. Use when building UI components, reviewing CSS utilities, styling React views, or enforcing design consistency. | `.agents/skills/baseline-ui/SKILL.md` |
| emil-design-eng | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great. | `.agents/skills/emil-design-eng/SKILL.md` |
| frontend-design | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics. | `.agents/skills/frontend-design/SKILL.md` |
| plan-mode | Holistic, system-aware planning before implementing non-trivial tasks. Use when the task involves new features, architectural decisions, multi-file changes, unclear requirements, or multiple valid approaches. Triggers on "/plan", "plan this", "design an approach", "let's plan first". | `.agents/skills/plan-mode/SKILL.md` |
| web-animation-design | "Design and implement web animations that feel natural and purposeful. Use this skill proactively whenever the user asks questions about animations, motion, easing, timing, duration, springs, transitions, or animation performance. This includes questions about how to animate specific UI elements, which easing to use, animation best practices, or accessibility considerations for motion. Triggers on: easing, ease-out, ease-in, ease-in-out, cubic-bezier, bounce, spring physics, keyframes, transform, opacity, fade, slide, scale, hover effects, microinteractions, Framer Motion, React Spring, GSAP, CSS transitions, entrance/exit animations, page transitions, stagger, will-change, GPU acceleration, prefers-reduced-motion, modal/dropdown/tooltip/popover/drawer animations, gesture animations, drag interactions, button press feel, feels janky, make it smooth." | `.agents/skills/web-animation-design/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
