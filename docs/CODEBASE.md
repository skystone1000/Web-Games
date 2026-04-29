# Codebase Reference — Games Site

## File Index

### `index.html` — Games Hub
Root page. Scrollable. Contains hero header and game card grid.

Key elements:
- `<div id="header-placeholder">` — games.js injects `includes/header.html` here
- `.hub-hero` — gradient background hero with badge + headline
- `.game-grid` — CSS grid of `.game-card` articles
- `.game-card.coming` — dimmed (opacity 0.65) for placeholder cards

Asset references (root-relative):
```html
<link rel="stylesheet" href="./assets/css/games.css" />
<script src="./assets/js/games.js"></script>
```

---

### `includes/header.html` — Shared Nav Fragment
Injected via `fetch('/includes/header.html')` by `games.js`. Contains:
- `<nav>` with `.nav-logo`, `.nav-links ul`, `#burger` button
- `#mob-nav` div (full-screen mobile menu) with `#mob-close` button

No inline scripts. Behaviour is wired by `games.js` after inject.

Nav links:
- **All Games** → `/` (hub)
- **← Portfolio** → `https://www.adityamahajan.in` (absolute)

---

### `assets/css/games.css` — Shared Stylesheet
Design tokens at top of file (sync comment included). Key classes:

| Class | Purpose |
|---|---|
| `.game-viewport` | 100vw × 100vh, overflow hidden, flex center — base for game pages |
| `.game-card` | Card with gradient top-border on hover, `::before` accent line |
| `.game-thumb` | 118px thumbnail area (emoji or image) |
| `.hub-hero` | Hero section with radial gradient + grid pattern backgrounds |
| `.rv` / `.rv.on` | Scroll reveal: opacity 0→1, translateY 28→0 |
| `.d1`–`.d4` | Transition-delay stagger classes (0.1s–0.4s) |
| `.btn-p` / `.btn-o` | Primary (filled blue) / outline button variants |
| `nav.scrolled` | Glass nav — applied by games.js on scroll |
| `.mob-nav.open` | Full-screen mobile nav overlay |

---

### `assets/js/games.js` — Shared Script
```
DOMContentLoaded
  └─ fetch /includes/header.html → #header-placeholder.innerHTML
       └─ wire #burger / #mob-nav / #mob-close
       └─ window scroll → nav.classList.toggle('scrolled', scrollY > 30)
  └─ IntersectionObserver → .rv elements get .on on intersection
```

---

### `snake/index.html` — Snake Game
Self-contained. All styles in `<style>`, all logic in `<script>`.

Game state machine:
```
idle ──[Space/click]──► running ──[Space/click]──► paused
                            │                          │
                            │                     [Space/click]
                            │                          │
                     [self-collision]                  ▼
                            └──────────► dead ──[Space/click]──► running
```

Key variables:
| Variable | Type | Description |
|---|---|---|
| `state` | string | `idle \| running \| paused \| dead` |
| `snake` | `{x,y}[]` | Array of segment positions (head at index 0) |
| `dir` | `{x,y}` | Current movement direction for this tick |
| `nextDir` | `{x,y}` | Direction queued by keyboard (applied next tick) |
| `food` | `{x,y}` | Current food position |
| `CELL` | 20 | Grid cell size in pixels |
| `SPEED` | 130 | Milliseconds per tick |

Key functions:
- `resize()` — sets `canvas.width/height` to fit `.canvas-wrap` in CELL multiples
- `init()` — resets snake, direction, score, places food
- `draw()` — renders grid, food (cyan glow), snake (gradient blue)
- `step()` — advances snake, checks self-collision, eats food
- `startGame()` — clears interval, resize, init, hides overlay, starts ticker
- `togglePause()` — pauses/resumes running game

Controls:
- Keyboard: Arrow keys + WASD for direction, Space for start/pause/resume
- Touch: swipe for direction (min 20px), tap = start/pause

CSS overrides in game's `<style>`:
- `body { overflow: hidden }` — prevents scroll
- `nav { background: ... }` — always-on glass (no scroll trigger available)
- `.game-viewport { flex-direction: column; padding-top: 66px }` — makes HUD + canvas layout work

---

## Patterns to Follow When Adding a New Game

1. Create `[game-name]/index.html`
2. Copy the head boilerplate from `snake/index.html` (fonts, games.css link)
3. Add `<div id="header-placeholder">` at top of body
4. Wrap game UI in `<div class="game-viewport">` (override flex direction as needed)
5. Override `nav` in `<style>` to force glass background
6. Add `body { overflow: hidden }` in `<style>`
7. Load `../assets/js/games.js` before game script
8. Add `<article class="game-card">` to `index.html` game grid
