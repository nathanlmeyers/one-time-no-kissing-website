# One Time, No Kissing — Book Website

The promotional website for *One Time, No Kissing*, the debut novel by David Meyers (my dad).

**Live site:** https://onetimenokissing.com

Pittsburgh, 1969–1972. A public-school basketball team comes of age between
pickup games, civil rights, and the long shadow of Vietnam. Coming Fall 2026.

## Pages

- **`index.html`** — the whole site on one page: hero, synopsis, about the
  author, and reviews. The header nav scrolls to sections.
- **`404.html`** — not-found page in the same design; GitHub Pages serves it
  for any missing URL.

## Project structure

- `index.html` — the site's single page
- `reviews.js` — the review data and the tile grid + expand modal that renders it
- `reviews/reviews.md` — human-readable snapshot of the published reviews
- `styles.css` — shared styles
- `assets/` — cover art (`cover.webp` with `cover.png` fallback; the PNG is
  also the social-card image), author photo, favicons
- `robots.txt`, `sitemap.xml` — crawler hints for the single URL
- `STYLE_GUIDE.md` — design system (colors, type, spacing) for contributors

A static site deployed via GitHub Pages. Social-card and structured-data image
URLs are absolute (`https://onetimenokissing.com/...`) because link previews
ignore relative paths.
