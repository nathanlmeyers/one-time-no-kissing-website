# One Time, No Kissing — Style Guide

The single source of truth for the look and feel of the site. All tokens live in
`styles.css` under `:root` and `.otnk-root`. Use the CSS variables — don't hardcode
values.

## Typography

Cormorant Garamond + EB Garamond, self-hosted from `assets/fonts/` (latin-subset
variable WOFF2, declared with `@font-face` at the top of `styles.css`; no
third-party font requests). Available weights: Cormorant 400–700 upright and
italic; EB Garamond 400–800 upright and italic.

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
56px → 48px → 40px. Body copy — the hero synopsis, review tiles, the review
modal, and the 404 message — is `--body-size` (17px at every width). The author
bio is the one deliberate exception at 18px. Captions and role lines are
12–13px italic in `--muted`.

## Color

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0d0a06` | Primary text, outline-button border |
| `--muted` | `#6a604f` | Secondary text, captions, nav, eyebrows |
| `--accent` | `#7a3a1a` | Eyebrow labels, "Read full review", inline links |

Supporting (used inline, not tokenized):

- `#ffffff` — page background, header, footer
- `#23201b` — review / bio paragraph text (slightly softer than `--ink`)
- `#f7f2e7` / `#efe7d5` / `#e7ddc6` — book spine / back / page-edge tones
- Borders & dividers: `rgba(0,0,0,0.08)` (hairlines), `rgba(0,0,0,0.14)` (review grid)
- Scrolled header: `rgba(255,255,255,0.82)` + 10px backdrop blur

## Shape & spacing

- **Corners are square.** Buttons and cards use `border-radius: 0`. Do not
  introduce pills/rounded cards.
- Section padding: vertical 48–80px, horizontal `var(--section-pad-x)`.
- Dividers are 1px hairlines in `rgba(0,0,0,0.08)`.

## Components

- **Outline button** (`.otnk-btn-outline`): 1px `--ink` border, square,
  uppercase display face, inverts to ink-fill / white-text on hover. Used for
  "Show all reviews" and the 404 page link.
- **Review tile** (`.otnk-review-tile`, built by `reviews.js`): 17px text, name
  in `--display` uppercase, role italic in `--muted`. 3 columns on desktop,
  2 on tablet, 1 on mobile. Below `900px` the grid starts collapsed to six
  tiles behind a "Show all N reviews" button; desktop always shows every tile.

## Layout & responsiveness

- Single shared stylesheet (`styles.css`) for every page; keep it that way.
- Responsiveness uses **container queries** on `.otnk-frame`, not media queries.
  Breakpoints: tablet `≤900px`, mobile `≤540px`. Adjust the layout tokens on
  `.otnk-root` rather than writing one-off rules.
- The nav is two inline links at every width (no hamburger).

## Motion

- Progressive enhancement: motion is scoped to `html.otnk-js`; no-JS users see the
  full page. `.reveal` elements fade/slide in on scroll; `.hero-rise.dN` stagger
  on load.
- Easing: `cubic-bezier(.22,1,.36,1)`. Transitions ~.15–.32s for UI, ~.75–.9s for reveals.
- Always honor `@media (prefers-reduced-motion: reduce)` — it disables transforms,
  animation, and smooth scroll.

## Adding a new page

The site is a single page (`index.html`); the header nav scrolls to sections.
If a separate page is ever needed, copy the shell from `index.html`: same
`<head>` (update title + OG), `<link rel="stylesheet" href="styles.css">`, the
`otnk-js` head script, the sticky `<header>` (wordmark → `index.html`, nav links
back to the home sections), the `<footer>`, and the year + menu + reveal
`<script>` block.
