# Games Repo Refactor — Design Spec
**Date:** 2026-04-28  
**Status:** Implemented

## Goal
Restructure the Games sub-site from flat HTML files + portfolio CSS to a self-contained static site with per-game subfolders, shared design tokens, a dedicated games CSS/JS, and a fetched header.

## Architecture

### File Structure
```
/
├── index.html                  # Games hub — card grid
├── includes/
│   └── header.html             # Games nav (fetched at runtime)
├── assets/
│   ├── css/games.css           # Design tokens + games-specific styles
│   ├── js/games.js             # Header inject + scroll reveal + hamburger
│   └── images/thumbnails/      # Game thumbnail images (future)
├── snake/
│   └── index.html              # Snake — fully self-contained game page
└── [game-name]/
    └── index.html              # Pattern for future games
```

### Design System (Option A — duplicated tokens)
CSS custom properties in `assets/css/games.css` are copied verbatim from the portfolio repo's `main.css`. A sync comment at the top of the file marks the last sync date.

Token reference:
```
--primary: #2979FF    --primary-light: #5C9EFF
--accent: #00E5FF     --accent-dim: rgba(0,229,255,0.12)
--bg: #080D1A         --bg2: #0D1526
--surface: #111827    --surface2: #1A2438
--border: rgba(255,255,255,0.07)
--text: #E8EDF5       --text2: #8A99B3  --text3: #4A5568
--r: 14px  --rs: 8px  --ease: 0.3s cubic-bezier(0.4,0,0.2,1)
```

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Header inject path | Absolute `/includes/header.html` | Works from any subfolder depth without computing relative path |
| Asset paths from game pages | `../assets/` (one level up) | Games live at depth 1 (e.g. `/snake/`) not depth 2 |
| Asset paths from hub | `./assets/` | Hub is at root |
| Nav scroll effect on game pages | Always-on via CSS override in game's `<style>` | body is `overflow:hidden` so `scrollY` never changes |
| Shared JS for all pages | Yes — one `games.js` handles header inject, hamburger, scroll-reveal | Minimal duplication |
| Game page scrolling | `body { overflow: hidden }` + `.game-viewport { height: 100vh }` | Spec requirement |
| Old flat files | Left untouched (`tic-tac-toe.html`, `memory-cards.html`) | Not in scope |

## Individual Game Page Rules
1. `body { overflow: hidden }` — no scroll ever
2. `<link>` to `/assets/css/games.css`
3. `<script src="/assets/js/games.js">` before game script
4. `<div id="header-placeholder">` at top of body
5. `<div class="game-viewport">` wraps entire game UI
6. Override `.game-viewport` in `<style>` to `flex-direction: column` for HUD + canvas layout
7. Force nav glass in `<style>` (`nav { background: rgba(8,13,26,0.92); ... }`)
8. All game-specific styles in `<style>` in `<head>`
9. All game logic in `<script>` at bottom of body
10. Touch swipe controls for mobile

## Snake Game
- Canvas-based, CELL = 20px grid
- Controls: Arrow / WASD keys, touch swipe
- Space: start / pause / resume
- Wrapping walls (snake teleports edge-to-edge)
- No self-collision = instant game over
- Score and best score tracked in HUD
- Overlay panel for start / pause / game-over states
