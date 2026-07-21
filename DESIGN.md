---
name: Handball-Tracker
description: Marketing site for a browser-based, sideline-first handball match tracker.
colors:
  ink-900: "#0a0c10"
  ink-850: "#12151c"
  ink-800: "#1a1f2a"
  ink-700: "#252b38"
  text-1: "#f0f2f6"
  text-2: "#a7b0be"
  text-3: "#7d8798"
  volt: "#e8ff00"
  ev-goal: "#00e87a"
  ev-save: "#7b5cfa"
  ev-shot: "#00d4ff"
  ev-card: "#ffc700"
  ev-red: "#ff3b3b"
typography:
  display:
    fontFamily: "Bebas Neue, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 10vw, 7.4rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bebas Neue, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bebas Neue, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  sm-plus: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
  "5xl": "128px"
components:
  button-primary:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "46px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#f2ff4d"
  button-lg:
    padding: "0 28px"
    height: "54px"
  button-ghost:
    textColor: "{colors.text-1}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "{colors.ink-850}"
  board:
    backgroundColor: "{colors.ink-850}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card:
    backgroundColor: "{colors.ink-850}"
    rounded: "{rounded.lg}"
    padding: "clamp(26px, 3.4vw, 38px)"
  lang-active:
    backgroundColor: "{colors.text-1}"
    textColor: "{colors.ink-900}"
    rounded: "7px"
    padding: "0 9px"
    height: "30px"
---

# Design System: Handball-Tracker

How this site is built. Deployed at <https://handball-tracker.com>. Tokens originate in the product's `polish-theme.css` (app repo `JerMous3/Handball-App-v2`) and are copied here deliberately so the marketing site and the product cannot drift. There is no build step linking them: **if a token changes there, change it here too.**

## 1. Overview

**Creative North Star: "The Sideline Instrument"**

This is not a brochure for a tool, it is the tool holding still. The site behaves like the app it sells: a live scoreboard that actually ticks in the hero, real product screenshots rather than illustrated abstractions, and numbers instead of adjectives. The voice is precise, unhurried, and sideline-literate: it speaks like a coach who knows the sport ("two-minute suspension", "seven metre", "throw-off", "GK save rate"), not like a SaaS company that has heard of it.

The surface is a tinted near-black carrying a single electric-yellow accent that is rationed to almost nothing. Density is calm and left-aligned, never centered, with feature sections that alternate sides and vary in height on purpose. The one structural signature is a timeline rail down the left edge, stamped with match timestamps (`00:00`, `04:15`, `HT`, `38:00`, `FT`), so the page is organised against a running clock the way a coach records a game. That structure is the thing a template cannot reproduce.

It explicitly rejects four neighbours. **Generic sports-tech neon** (dark plus glowing green plus a stadium photo plus "ELEVATE YOUR GAME"), which the inherited palette sits dangerously close to, so every other decision pulls away from it. **Enterprise analytics SaaS** (gradient-mesh hero, three identical icon-cards, a logo wall of clubs we do not have). **Editorial-typographic minimalism** (display serif, ruled columns, tracked mono kickers), a saturated lane and the wrong register for a sideline tool. And **fitness-app maximalism** (aggressive diagonals, motion blur, exclamation marks).

**Key Characteristics:**
- Tinted near-black canvas, blue-shifted, never pure `#000` or `#fff`.
- One accent (`--volt` yellow) rationed to under 10% of any screen.
- Bebas Neue display over Manrope body; numbers always tabular.
- A minute-stamped timeline rail as the load-bearing layout signature.
- Bilingual: Dutch is the real page (in the HTML), English is layered on by `i18n.js`.
- The product demonstrates itself: real screenshots, a real recording, a running clock.

## 2. Colors

A blue-tinted near-monochrome surface with exactly one accent. The strategy is **Restrained**: tinted near-neutrals carry everything and the accent stays under 10%.

Neutrals are tinted toward blue (hue ~258-265), never pure grey. `#000` and `#fff` are banned: the darkest surface is `#0a0c10` and the lightest text is `#f0f2f6`. Hex is canonical in the tokens; the OKLCH alongside each swatch is the perceptual reference the app was tuned in.

### Primary
- **Volt** (`#e8ff00`, `oklch(0.945 0.229 118)`): the single accent. Spent only on the primary call to action, live numerals (the running clock and the score), the active timeline-rail marker, and focus rings. Its rarity is the entire point.

### Neutral
- **Ink 900 / Page Canvas** (`#0a0c10`, `oklch(0.145 0.012 265)`): the page background.
- **Ink 850 / Raised Surface** (`#12151c`, `oklch(0.185 0.013 265)`): scoreboard, screenshot frames, plan cards, sticky nav backdrop.
- **Ink 800 / Inset** (`#1a1f2a`, `oklch(0.225 0.014 265)`): pressed and recessed states; the hairline between log rows.
- **Ink 700 / Hairline** (`#252b38`, `oklch(0.285 0.016 265)`): all borders, dividers, and section rules.
- **Text 1 / Primary** (`#f0f2f6`, `oklch(0.955 0.004 258)`): headings and high-emphasis text.
- **Text 2 / Body** (`#a7b0be`, `oklch(0.755 0.018 258)`): body copy. 8.7:1 on canvas.
- **Text 3 / Faint** (`#7d8798`, `oklch(0.625 0.021 258)`): labels, notes, rail timestamps. 5.2:1 on canvas and 4.9:1 on raised, so safe down to 12px.

### Event signal colors
Carried over from the app and used **only** as 6px dots in an event log, where they are semantic rather than decorative. Never as surface, text, or border color.

- **Goal** `#00e87a` · **Save** `#7b5cfa` · **Shot** `#00d4ff` · **Card** `#ffc700` · **Red** `#ff3b3b`

### Named Rules
**The Yellow Budget Rule.** `--volt` is permitted on exactly four things: the primary call to action, live numerals (clock and score), the active rail marker, and focus rings. A yellow heading, a yellow icon, or a yellow border is a bug. If everything is yellow, the trial button is not.

**The No-Pure-Extremes Rule.** `#000` and `#fff` are forbidden. Darkest is `#0a0c10`, lightest is `#f0f2f6`, and every neutral is tinted toward blue.

**The Semantic-Dot Rule.** Event colors exist only as log dots. The moment one becomes a background, a heading, or a border, it has left its lane.

## 3. Typography

**Display Font:** Bebas Neue (with Arial Narrow fallback)
**Body Font:** Manrope (with `ui-sans-serif, system-ui` fallback)

**Character:** A tall condensed uppercase display against a humanist sans built for small-size legibility. Bebas gives the headings a scoreboard-stencil authority; Manrope keeps the running copy quiet and readable on a dark surface. Both families already ship in the app, so the site adds no new font requests, self-hosted latin and latin-ext only.

### Hierarchy
- **Display** (Bebas Neue 400, `clamp(3.4rem, 10vw, 7.4rem)`, line-height 0.92, tracking -0.01em, uppercase): the hero headline only, capped at 12ch.
- **Headline** (Bebas Neue 400, `clamp(2.4rem, 5.6vw, 4.2rem)`, uppercase): major section openers (`.d-1`).
- **Title** (Bebas Neue 400, `clamp(1.9rem, 3.4vw, 2.7rem)`, uppercase): feature sub-heads (`.d-2`) and plan names.
- **Lede** (Manrope 400, `clamp(1.06rem, 1.6vw, 1.24rem)`, line-height 1.6, color Text 2): the sentence under a hero or section head, capped at 54ch.
- **Body** (Manrope 400, 17px, line-height 1.65, color Text 2): all running copy. Measure capped at 60ch (`--measure`), which renders as roughly 73 characters in Manrope, whose `ch` runs wide at about 0.61em.
- **Label** (Manrope 700, ~0.74rem, tracking 0.08em, uppercase, color Text 3): rail timestamps, the collapsed stamp, table headers, board meta.

### Named Rules
**The Tabular-Numeral Rule.** Every numeral uses `font-variant-numeric: tabular-nums`. A clock that reflows while ticking is a defect.

**The Bebas Floor Rule.** Bebas Neue is reserved for 40px and above (hero, section titles, plan names, board clock/score). Below 32px it reads cheap; never use it there.

**The Uppercase Lane Rule.** Uppercase is for the display face and short labels only. Never for body copy. Body line-height is 1.65 because light text on dark reads lighter than it measures and needs the room.

## 4. Elevation

The system is **near-flat and tonal**. Depth comes almost entirely from the four-step ink ramp (`ink-900` canvas up through `ink-850` raised surfaces) and 1px `ink-700` hairlines, not from shadows. There are only two shadows in the whole system, and both are large, soft, and reserved for the two elements that are literally lifted "off the page": the live scoreboard and the product screenshots. Everything else, nav included, sits flat and is separated by tone and rule alone.

### Shadow Vocabulary
- **Board lift** (`box-shadow: 0 24px 64px rgb(0 0 0 / 0.45)`): the hero scoreboard, the one element presented as a floating device.
- **Screenshot lift** (`box-shadow: 0 22px 56px rgb(0 0 0 / 0.4)`): product screenshot frames (`.shot`), which may also bleed past the content edge on wide viewports.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are separated by tone (`ink-850` on `ink-900`) and 1px hairlines (`ink-700`), not shadows. A drop shadow appears only on the scoreboard and screenshots. If you reach for a shadow to separate two panels, use a hairline instead.

## 5. Components

### Buttons
- **Shape:** medium radius (10px, `--radius-md`), 46px tall at rest (`--btn` min-height), 54px for the large hero variant (`.btn-lg`), Manrope 700.
- **Primary:** Volt background (`#e8ff00`) on Ink 900 text, padding `0 22px`. The single loudest thing on any page.
- **Ghost:** transparent with a 1px `ink-700` border and Text 1 label. The secondary, never-yellow action ("Watch the demo", "See what is included").
- **Hover / Active:** primary lightens to `#f2ff4d`; ghost shifts its border to `text-3` and fills with `ink-850`. Both use transform/opacity only, `160ms` on `--ease-out`. Primary nudges down 1px on `:active`.

### The Live Scoreboard (signature)
- The hero's self-demonstration: an `ink-850` card, `lg` radius, 1px `ink-700` border, `board lift` shadow, holding a running clock and score in Bebas Volt, a minute-stamped event log with semantic dots, and a pulsing "recording" foot.
- New log rows animate in (`logIn`, translateY + fade, 420ms). The simulation pauses off-screen and when the tab is hidden, and renders a static populated board under `prefers-reduced-motion`.

### The Timeline Rail (signature)
- The site's one structural signature: a hairline down the left with match timestamps marking each section. Passed markers use `text-2`; the active marker is `volt` with a filled dot scaled 1.4x; upcoming are `text-3`.
- Driven by `IntersectionObserver`, never a scroll listener. Below 1024px it collapses to a single inline `.stamp` timestamp above each section heading.
- This is the **only** place repeating small tracked labels are allowed. Do not add uppercase kickers anywhere else.

### The Brand Mark
- `Logo.png` is the mark, in the nav, footer, and favicon, rendered through `filter: brightness(0) invert(1); opacity: 0.94`. Every opaque pixel in the source is one flat navy (`#1F4A74`) with seams and counters carried by the alpha channel, which measures 2.09:1 on the canvas and all but disappears. `brightness(0)` takes the opaque pixels to black, `invert(1)` takes them to white, alpha untouched, so the silhouette is the original file exactly and the opacity keeps it off pure white.
- Do not "fix" this by committing a recoloured PNG. Keeping it in CSS means `Logo.png` stays the single source: replace that one file and both surfaces follow. Drop the filter only if the artwork is ever redrawn with light pixels of its own.

### Cards / Containers
- **Corner Style:** `lg` radius (14px) for scoreboard, screenshot frames, video wrap, and plan cards.
- **Background:** `ink-850` raised surface on the `ink-900` canvas.
- **Border:** 1px `ink-700` hairline. **Shadow:** none, except the two lift shadows in Elevation.
- **Internal Padding:** `20px` (board) to `clamp(26px, 3.4vw, 38px)` (plan cards). The two pricing plans share identical chrome on purpose: emphasis comes from the button alone, so the trial stays the single loudest thing.

### Navigation
- Sticky, transparent-to-88% `ink-900` backdrop, 68px tall, Manrope 500 links in `text-2` that go `text-1` on hover or `aria-current`. A hairline bottom border fades in only once scrolled (`data-stuck='true'`).
- Same-page links hide below 860px (scrolling already provides them); only the cross-page call to action survives. Below 479px the wordmark drops and the logo mark alone carries the identity.
- **Language toggle:** a neutral pill group; the active language is a white (`text-1`) pill on Ink 900 text, deliberately **not** volt, so yellow stays reserved for the call to action.

### FAQ
- Native `<details>` / `<summary>`. It opens with JavaScript off, keyboard and screen-reader behaviour come from the browser, and the answer is genuinely hidden when closed. The open state animates with a keyframe (`faqIn`), not a transition, because transitions do not run on an element that was `display: none`. The plus icon rotates 45deg to a close. Do not rebuild this as buttons with `aria-expanded`.

## 6. Do's and Don'ts

### Do:
- **Do** keep `--volt` (`#e8ff00`) to the four budgeted uses: primary call to action, live numerals, active rail marker, focus rings. Everything else is neutral.
- **Do** tint every neutral toward blue (hue ~258-265); the darkest surface is `#0a0c10`, the lightest text `#f0f2f6`.
- **Do** set all numerals in `tabular-nums`, and reserve Bebas Neue for 40px and up.
- **Do** separate surfaces with tone and 1px `ink-700` hairlines; use a shadow only on the scoreboard and screenshots.
- **Do** show the product itself: real screenshots and the real recording, never illustrated abstractions of an interface.
- **Do** state what the product does and let numbers be the voice. Speak sideline-literate: "two-minute suspension", "seven metre", "throw-off".
- **Do** edit copy in both places: the Dutch in the HTML and the matching English in `i18n.js`, following the `data-i18n` / `data-i18n-html` / `data-i18n-alt` / `data-i18n-aria` contract. Dutch is the indexed page; English is layered on top.
- **Do** let the timeline rail be the only home for repeating small tracked labels, driven by `IntersectionObserver`.
- **Do** keep the `reveal` class script-applied (never in the markup), keep the FAQ as native `<details>`, and pause the hero simulation off-screen. These look like style but are robustness: baked into the markup or built the other way, they blank the page or break for real people.

### Don't:
- **Don't** ship **generic sports-tech neon**: dark background plus glowing green plus a stadium photo plus "ELEVATE YOUR GAME". The palette is close to this by inheritance; pull away from it everywhere.
- **Don't** build **enterprise analytics SaaS**: no gradient-mesh hero, no three identical icon-heading-paragraph cards, no logo wall of clubs we do not have, no "trusted by teams worldwide".
- **Don't** drift into **editorial-typographic minimalism** (display serif, ruled columns, tracked mono kickers) or **fitness-app maximalism** (aggressive diagonals, motion blur, hype copy, exclamation marks).
- **Don't** use breathless verbs: no "revolutionise", "unleash", "game-changing", "supercharge".
- **Don't** invent social proof: no fabricated testimonials, no club logos, no user counts, no prices that have not been decided. Empty is better than false.
- **Don't** use `#000`, `#fff`, a yellow heading/icon/border, or an event color as anything but a 6px log dot.
- **Don't** use side-stripe borders (`border-left` as a colored accent), gradient text or `background-clip: text`, glassmorphism, a hero-metric block (big number, small label, supporting stats), or emoji as icons. Icons are inline SVG, single stroke width, `currentColor`.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses. Also not `--`.
- **Don't** commit a recoloured `Logo.png`; the mark is recoloured in CSS so one file stays the source of truth.
