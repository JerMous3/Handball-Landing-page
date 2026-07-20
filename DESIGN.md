# DESIGN.md

How this site is built. Deployed at <https://handball-tracker.com>.

Values originate in the product's `polish-theme.css` (in the app repo, `JerMous3/Handball-App-v2`) and are copied here deliberately so the marketing site and the product cannot drift. **If a token changes there, change it here too.** There is no build step linking them.

## Color

Strategy: **Restrained.** Tinted near-neutrals carry the surface, one accent stays under 10%.

Neutrals are tinted toward blue (hue ~265), never pure grey. `#000` and `#fff` are banned; the darkest surface is `#0a0c10` and the lightest text is `#f0f2f6`.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--ink-900` | `#0a0c10` | `oklch(0.145 0.012 265)` | Page canvas |
| `--ink-850` | `#12151c` | `oklch(0.185 0.013 265)` | Raised surface |
| `--ink-800` | `#1a1f2a` | `oklch(0.225 0.014 265)` | Inset / pressed |
| `--ink-700` | `#252b38` | `oklch(0.285 0.016 265)` | Borders, hairlines |
| `--text-1` | `#f0f2f6` | `oklch(0.955 0.004 258)` | Primary text |
| `--text-2` | `#a7b0be` | `oklch(0.755 0.018 258)` | Body copy. 8.7:1 on canvas |
| `--text-3` | `#7d8798` | `oklch(0.625 0.021 258)` | Faint. 5.2:1 on canvas, 4.9:1 on raised, so safe down to 12px |
| `--volt` | `#e8ff00` | `oklch(0.945 0.229 118)` | The accent |

### The yellow budget

`--volt` is permitted on exactly four things:

1. The primary call to action.
2. Live numerals: the running clock, the score.
3. The active marker on the timeline rail.
4. Focus rings.

Everything else is neutral. A yellow heading, a yellow icon, or a yellow border is a bug.

### Event colors

Carried over from the app, used **only** as 6px dots in an event log, where they are semantic rather than decorative. Never as surface, text, or border color.

`--ev-goal #00e87a` · `--ev-save #7b5cfa` · `--ev-shot #00d4ff` · `--ev-card #ffc700` · `--ev-red #ff3b3b`

## Typography

Both families already ship in the app, so the site adds no new font requests.

- **Display: Bebas Neue.** Condensed, uppercase only, single weight. Reserved for the hero and section titles at 40px and above, with `-0.01em` tracking. Bebas below 32px reads cheap; do not use it there.
- **Text: Manrope**, 400 / 500 / 600 / 700 / 800. Everything that is not a display heading.

Rules:

- All numerals use `font-variant-numeric: tabular-nums`. A clock that reflows while ticking is a defect.
- Body line-height `1.65`. Light text on dark reads lighter than it measures and needs the extra room.
- Measure capped at `60ch` (`--measure`). Manrope's `ch` runs wide, roughly `0.61em`, so 60ch renders as about 73 characters. Setting this to 68ch overshoots to ~83 and breaks the 65 to 75 guideline.
- Scale is fluid `clamp()`, ratio ≥ 1.25 between steps.
- Uppercase is for the display face and short labels only. Never for body copy.

## Layout

A two-column shell on desktop: a fixed-width timeline rail, then content.

```
grid-template-columns: 92px minmax(0, 1fr)   /* ≥1024px */
grid-template-columns: 1fr                    /* below: rail collapses inline */
```

Content is **left-aligned**, not centered. Feature sections alternate text/image sides and deliberately vary in height. Screenshots may bleed past the content edge toward the viewport.

Spacing is a 4px rhythm: `4 8 12 16 24 32 48 64 96 128`. Section separation varies on purpose; uniform padding everywhere is monotony.

Radii inherit from the app: `6px` / `10px` / `14px`.

## The timeline rail

The site's one structural signature. A hairline down the left with match timestamps (`00:00`, `04:15`, `12:30`, `HT`, `38:00`, `51:20`, `FT`) marking each section.

- Passed markers: `--text-2`. Active marker: `--volt` with a filled dot. Upcoming: `--text-3`.
- Driven by `IntersectionObserver`, never by a scroll listener.
- Below 1024px it collapses to a single inline timestamp above each section heading.

This is a deliberate, named system tied to the product. It is the *only* place repeating small labels are allowed; do not add tracked uppercase kickers anywhere else.

## Motion

- Transform and opacity only. Never animate layout properties.
- Ease out with exponential curves: `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce, no elastic.
- 150–300ms for micro-interactions, up to 500ms for section reveals.
- One orchestrated hero reveal, staggered. Scroll reveals are a single fade-and-rise, fired once.
- The hero clock ticks. Under `prefers-reduced-motion` it renders a static time and all reveals resolve instantly.

## The brand mark

`Logo.png` is the mark, in the nav, the footer and the favicon. It is rendered through a filter, and that is not decoration:

```css
.brand-mark {
  filter: brightness(0) invert(1);
  opacity: 0.94;
}
```

Every opaque pixel in the source file is the same flat navy (`#1F4A74`), and the ball seams and arrow counters are carried **entirely by the alpha channel** rather than by light pixels. Measured against the canvas that navy is **2.09:1**, so the mark rendered as-is is a dark blob with invisible internal detail.

`brightness(0)` takes the opaque pixels to black, `invert(1)` takes them to white, alpha untouched throughout. The result is the original silhouette exactly. The opacity keeps it off pure `#fff`.

**Do not "fix" this by committing a recoloured PNG.** Keeping it in CSS means `Logo.png` stays the single source: replace that one file and both surfaces follow. If the artwork is ever redrawn with light pixels of its own, drop the filter then, not before.

## Robustness rules

Three decisions that look like style but are not. Changing them breaks the page for real people.

- **The `reveal` class is applied by script, never written into the markup.** It sets `opacity: 0`. If it ships in the HTML, any script failure, blocked JS, or engine that never fires `IntersectionObserver` leaves the entire page blank. `site.js` adds the class, and a 1.2s failsafe removes it outright if the observer has reported nothing.
- **The FAQ is native `<details>`.** It opens with no JS, and keyboard plus screen-reader behaviour comes from the browser. It animates with a keyframe rather than a transition, because transitions do not run on an element that was `display: none`. Do not rebuild this as buttons with `aria-expanded`.
- **The hero simulation pauses when off screen and when the tab is hidden**, and renders a static populated board under `prefers-reduced-motion`.

## Bans

On top of the shared design laws:

- No side-stripe borders (`border-left` as a colored accent).
- No gradient text, no `background-clip: text`.
- No glassmorphism.
- No hero-metric block: big number, small label, supporting stats.
- No grid of identically-sized icon-heading-paragraph cards.
- No emoji as icons. Inline SVG, single stroke width, `currentColor`.
- No em dashes in copy.
- No invented social proof: no testimonials, club logos, or user counts we do not have.
