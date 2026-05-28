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
- **Desktop: no page scroll** — `body { overflow: hidden }`, `.game-viewport { height: 100dvh }`
- **Mobile: page scrolls** for panel layouts (Layout B, D) at a breakpoint — body gets `overflow-y: auto`
- Nav glass forced via CSS override (scroll never fires since `body` is `overflow: hidden` at desktop)
- All game CSS in `<style>` in same file
- All game logic in `<script>` at bottom of same file
- Touch swipe support for mobile

#### Layout patterns (four types)

| Type | Used by | Structure |
|------|---------|-----------|
| A — Fullscreen canvas | Snake, Maze Chase, Flappy Bird | canvas fills viewport; start/pause/end handled by an overlay |
| B — Two-column panels | Tic Tac Toe, Checkers, Wordle | `70fr` game panel left · `30fr` sidebar right · collapses to single column ≤900 px |
| C — Centered board | Memory Cards, Whack-a-Mole | fixed-aspect board centred in viewport; flanking info inline or stacked |
| D — Three-column panels | Sliding Puzzle, Lights Out | `20fr` info left · `60fr` game center · `20fr` controls right · collapses to single column ≤1080 px |

**Type B** has precise CSS requirements — always copy the blueprint from `docs/template.md` → "Two-column layout (Layout Type B)". Key constraints: shell uses `position: absolute; inset:` (not `height: 100%`), row track uses `minmax(0, 1fr)` (not plain `1fr`), every `.panel` needs `min-height: 0`.

**Type D** — the three-column layout — uses a direct grid shell with `height: 100%` (not absolute-positioned). Key constraints: `grid-template-rows: minmax(0, 1fr)` on the shell, `container-type: size` on the center panel so the board can use `width: min(100cqw, 100cqh)`, `overflow-y: auto` on side panels for desktop scroll on short screens, and `max-height: none` + `align-items: flex-start` + `justify-content: flex-start` on `.game-viewport` at the mobile breakpoint. Always copy the blueprint from `docs/template.md` → "Three-column layout (Layout Type D)".

#### CSS specificity gotcha — mobile body scroll override
`games.css` sets:
```css
html:has(.game-viewport), body:has(.game-viewport) {
    overflow: hidden;
    overscroll-behavior: contain;
}
```
This has specificity (0-1-1). A plain `html, body` rule in a media query has (0-0-1) and **loses** to it. To override, the media query rule must use the same `:has(.game-viewport)` selector AND reset `overscroll-behavior`:
```css
@media (max-width: 1080px) {
    html:has(.game-viewport),
    body:has(.game-viewport) {
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: auto;   /* required — `contain` from games.css can stall touchpad/touch-emulation scroll */
    }
}
```

#### Why `overscroll-behavior: auto` is required on mobile breakpoints
`games.css` applies `overscroll-behavior: contain` to game pages so the page doesn't rubber-band behind a fullscreen game on desktop. On Layout B/D mobile breakpoints where the body becomes scrollable (`overflow-y: auto`), the inherited `contain` value can cause Chrome's touchpad scrolling — and especially the DevTools touch-emulation mode that triggers when you resize the viewport with the device toolbar — to refuse to initiate a scroll gesture from regions like panel borders or card surfaces. Resetting to `overscroll-behavior: auto` inside the mobile `:has()` block guarantees clean two-finger scroll. **Every 2-column and 3-column game's mobile breakpoint must include this reset.**

#### Do NOT duplicate `html, body { overflow: hidden; height: 100% }` in game inline `<style>`
`games.css` already locks the page via the `:has()` rule above. Adding a plain `html, body { overflow: hidden; height: 100% }` rule is redundant on desktop and creates cascade confusion when the mobile `:has()` override tries to flip `overflow-y` to `auto`. If you find this rule in an existing game, it is safe to remove.

## Cross-Repo Links
Links back to the portfolio use **absolute hardcoded URLs**:
```
https://www.adityamahajan.in
```
No relative paths cross repo boundaries.

## Deployment
GitHub Pages. CNAME file: `games.adityamahajan.in`. No CI/CD — pushes to `main` deploy automatically.
