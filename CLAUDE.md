<!-- GSD:project-start source:PROJECT.md -->

## Project

**Sam Blake Portfolio v2** — Vite MPA, vanilla HTML/CSS. Product designer, 3 years. Fintech (Santander UK), retail (Matalan), property. Targeting hybrid/remote roles, North West England.

### Constraints
- **Tech stack**: Vanilla HTML + CSS only — no JS/CSS frameworks
- **Build**: Every page must be declared in `vite.config.js` rollupOptions.input
- **Design tokens**: No CSS hex values outside `_variables.css`, no inline styles, no arbitrary spacing

<!-- GSD:project-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

| Skill | Path |
|-------|------|
| baseline-ui | `.agents/skills/baseline-ui/SKILL.md` |
| emil-design-eng | `.agents/skills/emil-design-eng/SKILL.md` |
| frontend-design | `.agents/skills/frontend-design/SKILL.md` |
| plan-mode | `.agents/skills/plan-mode/SKILL.md` |
| web-animation-design | `.agents/skills/web-animation-design/SKILL.md` |

<!-- GSD:skills-end -->

## Image naming convention

All case study images follow this naming convention:
[project]-[section]-[class]-[description]

**Project codes:**
i-exchange, cassi, community

**Section codes:**
bg = Background
emp = Empathise
def = Define
ide = Ideate
proto = Prototype
test = Test
final = Final Product
results = Results

**Class codes:**
dec = Decorative. Undraw SVGs and illustrations that support narrative. Never dominant. Max 40% width desktop unless specified. Full width mobile. object-fit contain always.
ev = Evidence. Research artifacts, interview notes, workshop outputs, spreadsheets. Medium size, readable but not enormous. Illustrative grid layouts where multiple evidence images appear together.
before = Before image. Screenshot of the old product showing problems. Always full width. Always uses the anno-image component with negative callouts. Never paired side by side with after in the heuristics sections.
after = After image. Final shipped design. Always full width. Always uses the anno-image component with positive callouts. Only appears in the Final Product section.
des = Design iteration. Wireframes, prototypes, hi-fi iterations showing process. Small to medium. Never annotated. Often paired side by side to show progression.
result = Result or data artifact. Charts, spreadsheets, metrics. Medium to large, needs to be readable.

**Display rules by class:**
dec: image-block--decorative component, max 40% width desktop, full width mobile, object-fit contain, no annotation
ev: medium size, readable, use grid layout when multiple evidence images appear together
before: full width, anno-image component, negative callouts, heuristics sections only
after: full width, anno-image component, positive callouts, Final Product section only
des: small to medium, side by side pairs where showing iteration, no annotation
result: medium to large, readable, clean caption explaining the data

**Grid layouts:**
3 column decorative grid: 3 columns desktop and tablet, single column mobile. Used for Background section story grids.
4 item evidence grid: 4 columns desktop, 2 columns tablet, stacked full width mobile. Used for interview notes and research artifacts.
2 item side by side: 50% each desktop, stacked full width mobile. Used for design iteration pairs.

**Case study layout modifiers:**
cs-two-col--narrow-media: use with `.cs-two-col` when the supporting media should be narrower than the text column on desktop.

**General rules:**
Always use loading='lazy'
Always use object-fit contain unless explicitly specified
Never stretch an image to fill available width
Never hardcode image dimensions
All images must have descriptive alt text
Redundant images are prefixed with redundant- and left in the folder but not placed
