# CLAUDE.md — Games Site Context

## Read this first, before looking at any code

This file is the entry point for every Claude session on this repo. It gives you enough context to work without re-reading the source files cold.

## Project
- **Site**: `games.adityamahajan.in` (GitHub Pages, CNAME configured)
- **Part of**: Aditya Mahajan's portfolio at `https://www.adityamahajan.in`
- **Stack**: Pure static HTML / CSS / JS — no build tools, no frameworks, no npm

## Documentation (read before touching code)
Full architecture, codebase reference, and feature descriptions live here:

| File | Read when... |
|---|---|
| `docs/ARCHITECTURE.md` | You need to understand how the site is structured |
| `docs/CODEBASE.md` | You're editing specific files or adding a new game |
| `docs/FEATURES.md` | You need to know what each feature does |
| `docs/superpowers/specs/` | Design decisions and rationale for past refactors |

**When you make significant changes, update the relevant doc file.**

## File Structure (quick reference)
```
/index.html                        → hub page (game card grid — 28 live games)
/includes/header.html              → nav fragment (fetched at runtime)
/assets/css/games.css              → ALL shared styles (tokens + components)
/assets/js/games.js                → header inject + hamburger + scroll reveal
/games/snake/index.html            → Snake game (fully self-contained)
/games/tic-tac-toe/index.html      → Tic Tac Toe (fully self-contained)
/games/memory-cards/index.html     → Memory Cards (fully self-contained)
/games/[game-name]/index.html      → pattern for all games
/docs/                             → architecture, codebase, features docs
```

## Critical Patterns

### Header injection
Every page has `<div id="header-placeholder">` at top of body.  
`games.js` fetches `/includes/header.html` (absolute path) and sets innerHTML.  
**Never use relative paths for the header fetch** — it must work from any subfolder.

### Asset paths
- From **hub** (`index.html`): `./assets/css/games.css`, `./assets/js/games.js`
- From **game pages** (`games/[game]/index.html`): `/assets/css/games.css`, `/assets/js/games.js`

### Game pages — required setup
Every game page MUST have:
1. `body { overflow: hidden }` in `<style>`
2. `<div id="header-placeholder">` as first element in body
3. `<div class="game-viewport">` wrapping all game UI
4. Nav glass override in `<style>` (scrollY never changes on game pages):
   ```css
   nav {
     background: rgba(8, 13, 26, 0.92);
     backdrop-filter: blur(18px);
     -webkit-backdrop-filter: blur(18px);
     box-shadow: 0 1px 0 var(--border);
   }
   ```
5. `<script src="/assets/js/games.js">` before the game's own `<script>`
6. All game CSS in `<style>` in `<head>` — no external game CSS files
7. All game logic in `<script>` at end of body — no external game JS files

### Adding a new game
1. Create `games/[game-name]/index.html` (copy `/games/snake/index.html` as template)
2. Add `<article class="game-card">` to `index.html` game grid
3. Update `docs/FEATURES.md` with the new game's feature description
4. Update `docs/CODEBASE.md` if the game introduces new patterns

## Design Tokens (do not change without syncing to portfolio)
```
--primary: #2979FF    --primary-light: #5C9EFF
--accent: #00E5FF     --bg: #080D1A    --surface: #111827
--text: #E8EDF5       --text2: #8A99B3  --text3: #4A5568
--border: rgba(255,255,255,0.07)
--ease: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```
These are duplicated from the portfolio repo (`portfolio/assets/css/main.css`).  
The sync comment in `games.css` marks the last sync date — update it when you sync.

## What NOT to do
- Do not add a `<footer>` to any page on this site
- Do not add scroll to game pages (only the hub scrolls)
- Do not create separate CSS files for individual games (use `<style>` in the game file)
- Do not use relative paths for `/includes/header.html` in `games.js`
- Do not use the class `.game-card` inside game pages — it belongs to hub card items in `games.css`. Use a different name (e.g. `.board-panel`) for the game's own panels
- Do not duplicate `html, body { overflow: hidden; height: 100% }` in a game's inline `<style>` — `games.css` already locks the page via `html:has(.game-viewport), body:has(.game-viewport) { overflow: hidden }`. The duplicate is redundant on desktop and adds cascade confusion on mobile.

## Layout B / Layout D mobile page-scroll — required pattern

Every 2-column (Layout B) and 3-column (Layout D) game must include this exact block in its mobile breakpoint, with `overscroll-behavior: auto` set explicitly. **Forgetting `overscroll-behavior: auto` is the single most common cause of "touchpad scroll doesn't work in DevTools" bugs.**

```css
@media (max-width: <YOUR_BREAKPOINT>) {
    /* Must use :has() to match games.css specificity (0-1-1).
       overscroll-behavior: auto overrides games.css `contain` for clean touchpad scroll. */
    html:has(.game-viewport),
    body:has(.game-viewport) {
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: auto;
    }

    .game-viewport {
        height: auto;
        min-height: 100svh;
        max-height: none;
        overflow: visible;
        /* layout-specific overrides... */
    }

    /* layout-specific overrides for .game-area, .game-shell, panels, etc. */
}
```

Plain `body { overflow-y: auto }` (specificity 0-0-1) does NOT work — it loses to the games.css `:has()` rule (0-1-1).

See `docs/ARCHITECTURE.md` § "CSS specificity gotcha" and `docs/template.md` Layout B/D sections for details.
