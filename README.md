# Web Games

A collection of 28 browser games built as a pure static site — no build tools, no frameworks, no npm. Every game is a single self-contained HTML file.

**Live site:** [games.adityamahajan.in](https://games.adityamahajan.in)  
**Part of:** [Aditya Mahajan's portfolio](https://www.adityamahajan.in)

---

## Local Development

The site uses `fetch()` to inject the shared header, so it must run over HTTP — opening `index.html` directly from the filesystem won't work.

```bash
# Python (built-in, no install needed)
python3 -m http.server 8001
# → http://localhost:8001

# Or use VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## Games

| Game | Path | Layout |
|---|---|---|
| Snake | `/games/snake/` | Fullscreen canvas (A) |
| Flappy Bird | `/games/flappy-bird/` | Fullscreen canvas (A) |
| Maze Chase | `/games/maze-chase/` | Fullscreen canvas (A) |
| Dino Run | `/games/dino-run/` | Fullscreen canvas (A) |
| Asteroids | `/games/asteroids/` | Fullscreen canvas (A) |
| Breakout | `/games/breakout/` | Fullscreen canvas (A) |
| Pong | `/games/pong/` | Fullscreen canvas (A) |
| Alien Invaders | `/games/alien-invaders/` | Fullscreen canvas (A) |
| Road Hopper | `/games/road-hopper/` | Fullscreen canvas (A) |
| Tic Tac Toe | `/games/tic-tac-toe/` | Two-column panels (B) |
| Memory Cards | `/games/memory-cards/` | Two-column panels (B) |
| 2048 | `/games/2048/` | Two-column panels (B) |
| Wordle | `/games/wordle/` | Two-column panels (B) |
| Connect Four | `/games/connect-four/` | Two-column panels (B) |
| Hangman | `/games/hangman/` | Two-column panels (B) |
| Battleship | `/games/battleship/` | Two-column panels (B) |
| Checkers | `/games/checkers/` | Two-column panels (B) |
| Reversi | `/games/reversi/` | Two-column panels (B) |
| Solitaire | `/games/solitaire/` | Two-column panels (B) |
| Tower Defense | `/games/tower-defense/` | Two-column panels (B) |
| Bubble Shooter | `/games/bubble-shooter/` | Two-column panels (B) |
| Whack-a-Mole | `/games/whack-a-mole/` | Centered board (C) |
| Simon | `/games/simon/` | Centered board (C) |
| Minesweeper | `/games/minesweeper/` | Centered board (C) |
| Tetris | `/games/tetris/` | Centered board (C) |
| Sudoku | `/games/sudoku/` | Three-column panels (D) |
| Lights Out | `/games/lights-out/` | Three-column panels (D) |
| Sliding Puzzle | `/games/sliding-puzzle/` | Three-column panels (D) |

---

## Project Structure

```
/index.html                   Hub page — game card grid
/includes/header.html         Nav fragment injected at runtime by games.js
/assets/css/games.css         Shared design system (tokens, components, layout)
/assets/js/games.js           Header inject + hamburger + scroll reveal
/games/[game]/index.html      One self-contained file per game
/docs/                        Architecture, codebase, feature, and template docs
```

Everything a game needs — CSS and JS — lives inside its own `index.html`. There are no external game-specific files.

---

## How to Add a New Game

### 1. Create the game file

```bash
cp games/snake/index.html games/my-game/index.html
```

Edit the new file:
- Change `<title>` and all game-specific content
- Replace the canvas/layout with your game's UI
- Write all game CSS inside `<style>` in `<head>`
- Write all game JS inside `<script>` at the end of `<body>` (after `games.js`)

### 2. Every game page requires these five things

```html
<!-- 1. Shared CSS — use absolute path -->
<link rel="stylesheet" href="/assets/css/games.css" />

<!-- 2. Nav glass override in <style> (scroll never fires on game pages) -->
<style>
  nav {
    background: rgba(8, 13, 26, 0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 1px 0 var(--border);
  }
</style>

<!-- 3. Header placeholder — first element in <body> -->
<div id="header-placeholder"></div>

<!-- 4. Game viewport wrapper -->
<div class="game-viewport">
  <!-- your game layout here -->
</div>

<!-- 5. Shared JS — before your game script -->
<script src="/assets/js/games.js"></script>
<script>
  // your game code here
</script>
```

> **Do NOT add** `html, body { overflow: hidden; height: 100% }` — `games.css` already handles this via `body:has(.game-viewport) { overflow: hidden }`.

### 3. Add a card to the hub

Open `index.html` and add an `<article class="game-card">` to the game grid:

```html
<article class="game-card rv d2">
  <a href="/games/my-game/" class="game-thumb" aria-hidden="true">🎮</a>
  <div class="game-info">
    <h2 class="game-name">My Game</h2>
    <p class="game-blurb">One sentence describing what makes this game fun.</p>
    <div class="tags"><span class="tag tag-logic">Logic</span></div>
    <a href="/games/my-game/" class="btn btn-p">Play</a>
  </div>
</article>
```

### 4. Update the docs

- Add the game's feature description to `docs/FEATURES.md`
- If the game introduces a new layout pattern, update `docs/CODEBASE.md`

---

## Layout Patterns

Pick the pattern that fits your game's needs. The canonical CSS for each is in `docs/template.md`.

### A — Fullscreen Canvas

For arcade games where the canvas fills the entire viewport.

```html
<div class="game-viewport">
  <canvas id="gameCanvas"></canvas>
  <div id="overlay"><!-- start/pause/end screen --></div>
</div>
```

The canvas resizes to fill `.game-viewport` on every window resize.

---

### B — Two-Column Panels (game left, sidebar right)

For board and strategy games. Uses a 70/30 grid split.

```html
<div class="game-viewport">
  <main class="game-area">
    <div class="my-layout">        <!-- position:absolute; inset:1.25rem 1.5rem -->
      <section class="board-panel"><!-- 70fr — game canvas or board --></section>
      <aside class="side-panel">  <!-- 30fr — title, stats, controls --></aside>
    </div>
  </main>
</div>
```

**Three rules Layout B must follow — breaking any one breaks the layout:**

| Rule | CSS |
|---|---|
| Shell uses absolute positioning | `.my-layout { position: absolute; inset: 1.25rem 1.5rem; }` |
| Row track prevents overflow | `grid-template-rows: minmax(0, 1fr)` — never plain `1fr` |
| Every panel opts out of grid overflow | `.board-panel, .side-panel { min-height: 0; }` |

**Mobile scroll** (copy this exactly at your breakpoint — typically `900px` or `980px`):

```css
@media (max-width: 900px) {
    /* Must use :has() to beat games.css specificity (0-1-1) */
    html:has(.game-viewport),
    body:has(.game-viewport) {
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: auto; /* critical — prevents touchpad scroll stall */
    }

    .game-viewport { height: auto; min-height: 100svh; max-height: none; overflow: visible; padding: 86px 4vw 24px; align-items: flex-start; justify-content: flex-start; }
    .game-area    { width: 100%; height: auto; overflow: visible; position: static; }
    .my-layout    { position: static; inset: auto; width: 100%; height: auto; grid-template-columns: 1fr; grid-template-rows: auto; }
    .side-panel   { height: auto; overflow: visible; }
}
```

> **`overscroll-behavior: auto` is mandatory.** `games.css` sets `overscroll-behavior: contain` to lock the desktop viewport. Forgetting to reset it in the mobile breakpoint is the single most common cause of two-finger scroll not working in DevTools device emulation.

---

### C — Centered Board

For games with a fixed-aspect board centered in the viewport.

```html
<div class="game-viewport">
  <div class="board-wrap"><!-- fixed-aspect board, flanked by info --></div>
</div>
```

---

### D — Three-Column Panels (info | game | controls)

For puzzle games that need side panels on both sides. Uses a 20/60/20 grid split.  
Always copy the blueprint from `docs/template.md` — it has important `container-type: size` and `cqh`/`cqw` requirements.

---

## Design System

All tokens are CSS custom properties defined in `assets/css/games.css`. Do not change them without syncing to the portfolio repo.

| Token | Value | Use |
|---|---|---|
| `--primary` | `#2979FF` | Buttons, accents |
| `--primary-light` | `#5C9EFF` | Highlights, stat values |
| `--accent` | `#00E5FF` | Cyan highlights, valid moves |
| `--bg` | `#080D1A` | Page background |
| `--surface` | `#111827` | Card/panel backgrounds |
| `--text` | `#E8EDF5` | Body text |
| `--text2` | `#8A99B3` | Secondary text |
| `--text3` | `#4A5568` | Muted/label text |
| `--border` | `rgba(255,255,255,0.07)` | Panel borders |
| `--ease` | `0.3s cubic-bezier(0.4,0,0.2,1)` | Standard transition |

**Shared components available from `games.css`:**

| Class | Description |
|---|---|
| `.btn` | Base button (block, flex-row, gap, border-radius) |
| `.btn-p` | Primary filled button (blue) |
| `.btn-o` | Outline button |
| `.game-viewport` | Full-viewport flex container |
| `.badge` | Small status badge with pulsing dot |
| `.s-label` | Section label (uppercase, spaced, small) |
| `.rv` / `.on` | Scroll-reveal animation (hub only) |
| `.d1`–`.d4` | Stagger delays for `.rv` elements |

---

## Key Rules

- **No footers.** The site has no footer on any page.
- **No external game files.** All game CSS goes in `<style>`, all game JS goes in `<script>` — both in the same `index.html`.
- **No `.game-card` inside game pages.** That class belongs to hub card items. Use `.board-panel`, `.side-panel`, or your own names inside game pages.
- **Asset paths differ by depth.** From the hub: `./assets/...`. From game pages: `/assets/...` (absolute).
- **Header path is always absolute.** `games.js` fetches `/includes/header.html` — never a relative path.

---

## Documentation

| File | Read when... |
|---|---|
| `docs/ARCHITECTURE.md` | You need to understand how the site is structured |
| `docs/CODEBASE.md` | You're editing specific files or adding a new game |
| `docs/FEATURES.md` | You need to know what each game does in detail |
| `docs/template.md` | You're implementing a new layout (copy the blueprints) |

---

## Deployment

GitHub Pages. `CNAME` → `games.adityamahajan.in`. Pushes to `main` deploy automatically — no CI/CD step needed.
