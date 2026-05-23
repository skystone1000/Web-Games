# Architecture — Games Site

## Overview
A pure-static site (GitHub Pages) at `games.adityamahajan.in`. No build tools, no frameworks, no bundling. Every page is a self-contained HTML file that shares a CSS design system and a small JS loader.

## Site Map
```
games.adityamahajan.in/                 → index.html        (games hub)
games.adityamahajan.in/games/snake/     → /games/snake/index.html  (snake game)
games.adityamahajan.in/games/[game]/    → /games/[game]/index.html (pattern)
```

## Shared Infrastructure

### `assets/css/games.css`
Single stylesheet for the whole site. Contains:
- **Design tokens** — CSS custom properties (`--primary`, `--bg`, `--surface`, etc.) copied from portfolio `main.css`. Sync comment at top marks last sync date.
- **Base reset** — box-sizing, margins, scrollbar styling
- **Typography** — Inter font assumed loaded via Google Fonts in each page's `<head>`
- **Shared components** — `.btn`, `.btn-p`, `.btn-o`, `.rv`/`.on` scroll reveal, `.tags`, `.tag.*`
- **Nav styles** — `nav`, `nav.scrolled`, `.nav-logo`, `.nav-links`, `.burger`, `.mob-nav`
- **Hub styles** — `.hub-hero`, `.game-grid`, `.game-card`, `.game-thumb`
- **Game viewport** — `.game-viewport` utility (100vw × 100vh, no scroll, flex center)

### `assets/js/games.js`
Runs on `DOMContentLoaded` on every page. Three responsibilities:
1. **Header inject** — `fetch('/includes/header.html')` → sets `innerHTML` of `#header-placeholder`. Uses absolute path so it works from any subfolder.
2. **Hamburger toggle** — wires `#burger` / `#mob-nav` / `#mob-close` after header is in DOM.
3. **Scroll reveal** — `IntersectionObserver` watches `.rv` elements, adds `.on` class on intersection.

### `includes/header.html`
Fragment injected into every page at runtime. Contains:
- `<nav>` — logo (🎮 Games), nav links (All Games, ← Portfolio), hamburger button
- `.mob-nav` — full-screen mobile overlay with same links

Header has NO inline scripts. All behaviour wired by `games.js` after inject.

## Page Types

### Hub (`index.html`)
- Imports: `./assets/css/games.css`, `./assets/js/games.js`
- Scrollable page with hero + game card grid
- Nav gets `scrolled` class dynamically as user scrolls

### Game pages (`/games/[game]/index.html`)
- Imports: `/assets/css/games.css`, `/assets/js/games.js`
- **No scroll** — `body { overflow: hidden }`, `.game-viewport { height: 100vh }`
- Nav glass forced via CSS override (scroll never fires since `body` is `overflow: hidden`)
- All game CSS in `<style>` in same file
- All game logic in `<script>` at bottom of same file
- Touch swipe support for mobile

## Cross-Repo Links
Links back to the portfolio use **absolute hardcoded URLs**:
```
https://www.adityamahajan.in
```
No relative paths cross repo boundaries.

## Deployment
GitHub Pages. CNAME file: `games.adityamahajan.in`. No CI/CD — pushes to `main` deploy automatically.
