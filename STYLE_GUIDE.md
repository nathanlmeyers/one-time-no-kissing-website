# One Time, No Kissing — Style Guide

The single source of truth for the look and feel of the site. All tokens live in
`styles.css` under `:root` and `.otnk-root`. Use the CSS variables — don't hardcode
values.

## Typography

Loaded from Google Fonts (Cormorant Garamond + EB Garamond).

| Token | Stack | Use |
|---|---|---|
| `--display` | `'Cormorant Garamond', 'EB Garamond', Georgia, serif` | Headings, the "David Meyers" wordmark, reviewer names, eyebrows, book spine |
| `--body-font` | `'EB Garamond', 'Cormorant Garamond', Georgia, serif` | Body copy, paragraphs, nav |

**Weights:** body 400; emphasis/headings 600–700. Headings use tight tracking
(`letter-spacing:-.005em` to `-.01em`) and line-height ~0.95.

**Eyebrows / labels / nav:** uppercase, `letter-spacing` 0.1em–0.3em, 12–13px,
in `--muted` or `--accent`.

**Indicative sizes** (responsive via container-query tokens on `.otnk-root`):
hero title `--title-size` 86px → 68px → 44px; section headings `--about-h-size`
56px → 48px → 40px; body `--body-size` 20px → 17px; review text 17px.

## Color

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0d0a06` | Primary text, borders on the boxed nav button |
| `--muted` | `#6a604f` | Secondary text, captions, nav, eyebrows |
| `--accent` | `#7a3a1a` | Eyebrow labels, links on hover, CTA button background, "coming soon" badge |

Supporting (used inline, not tokenized):

- `#ffffff` — page background, header, footer
- `#23201b` — review / bio paragraph text (slightly softer than `--ink`)
- `#fdf5e2` — text on the accent CTA button
- `#f7f2e7` / `#efe7d5` / `#e7ddc6` — book spine / back / page-edge tones
- Borders & dividers: `rgba(0,0,0,0.08)` (hairlines), `rgba(0,0,0,0.18)` (inputs)
- Scrolled header: `rgba(255,255,255,0.82)` + 10px backdrop blur

## Shape & spacing

- **Corners are square.** Buttons, inputs, and the boxed Pre-order nav link all
  use `border-radius: 0`. The only rounding anywhere is the 2px "coming soon"
  badge. Do not introduce pills/rounded cards.
- Section padding: vertical 48–80px, horizontal `var(--section-pad-x)`.
- Dividers are 1px hairlines in `rgba(0,0,0,0.08)`.

## Components

- **Primary CTA** (`.otnk-cta`): accent background, `#fdf5e2` text, square,
  uppercase, brightens + lifts 1px on hover.
- **Secondary CTA** (`.otnk-cta-outline`): transparent with border, subtle fill on hover.
- **Boxed nav link** (`.otnk-nav-cta`): 1px `--ink` border, square, inverts to
  ink-fill / white-text on hover. Used for "Pre-order".
- **Active nav tab** (`a[aria-current="page"]`): shows the underline at full width.
- **Review card** (`.otnk-praise-card`): 17px text, name in `--display` uppercase,
  role italic in `--muted`; column dividers collapse to stacked rows ≤900px.

## Layout & responsiveness

- Single shared stylesheet (`styles.css`) for every page; keep it that way.
- Responsiveness uses **container queries** on `.otnk-frame`, not media queries.
  Breakpoints: tablet `≤900px`, mobile `≤540px`. Adjust the layout tokens on
  `.otnk-root` rather than writing one-off rules.
- Nav collapses into a hamburger dropdown at `≤540px`.

## Motion

- Progressive enhancement: motion is scoped to `html.otnk-js`; no-JS users see the
  full page. `.reveal` elements fade/slide in on scroll; `.hero-rise.dN` stagger
  on load.
- Easing: `cubic-bezier(.22,1,.36,1)`. Transitions ~.15–.32s for UI, ~.75–.9s for reveals.
- Always honor `@media (prefers-reduced-motion: reduce)` — it disables transforms,
  animation, and smooth scroll.

## Adding a new page

Copy the shell from `reviews.html` / `characters.html`: same `<head>` (update
title + OG), `<link rel="stylesheet" href="styles.css">`, the `otnk-js` head
script, the sticky `<header>` (wordmark → `index.html`, the 3-link nav with the
current tab marked `aria-current="page"`), the `<footer>`, and the year + menu +
reveal `<script>` block.
