# New Game Prompt Template

Copy everything below the divider into your LLM prompt. Fill in the `[PLACEHOLDERS]` at the bottom.

---

## Project Context

You are adding a new browser game to a pure-static games site (`games.adityamahajan.in`). No build tools, no npm, no frameworks. The site uses GitHub Pages and deploys from the `main` branch automatically.

**Repo structure:**
```
/index.html                  → hub page (game card grid)
/includes/header.html        → shared nav fragment (fetched at runtime)
/assets/css/games.css        → shared styles + design tokens
/assets/js/games.js          → header inject + hamburger + scroll reveal
/[game-name]/index.html      → each game is a self-contained file
```

---

## Your Task

Produce a **single file**: `[GAME_FOLDER]/index.html`

All game CSS goes in a `<style>` block in `<head>`. All game logic goes in a `<script>` block at the end of `<body>`. No external game-specific files.

---

## Required `<head>` Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[GAME_TITLE] — Games</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

    <!-- Bootstrap (layout utilities only — loaded BEFORE games.css so custom styles override) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Shared design system — always after Bootstrap -->
    <link rel="stylesheet" href="/assets/css/games.css" />

    <style>
        /* game-specific CSS here */
    </style>
</head>
```

---

## Required `<body>` Structure

```html
<body>
    <!-- Header placeholder — games.js injects /includes/header.html here -->
    <div id="header-placeholder"></div>

    <div class="game-viewport">
        <!-- All game UI goes inside .game-viewport -->
    </div>

    <!-- Shared script FIRST, then game script -->
    <script src="/assets/js/games.js"></script>
    <script>
        /* game-specific JS here */
    </script>
</body>
```

---

## Design Tokens (do not invent new values — use these)

```css
--primary: #2979FF        /* blue — primary actions, X player */
--primary-light: #5C9EFF  /* lighter blue — hover states, accents */
--accent: #00E5FF         /* cyan — highlights, O player, food, matched */
--accent-dim: rgba(0, 229, 255, 0.12)
--bg: #080D1A             /* darkest background */
--bg2: #0D1526            /* slightly lighter — stat cards, status bars */
--surface: #111827        /* panel/card backgrounds */
--surface2: #1A2438       /* inner card elements */
--border: rgba(255,255,255,0.07)
--text: #E8EDF5           /* primary text */
--text2: #8A99B3          /* secondary text, descriptions */
--text3: #4A5568          /* tertiary text, labels */
--r: 14px                 /* standard border-radius */
--rs: 8px                 /* small border-radius */
--shadow: 0 8px 32px rgba(0,0,0,0.45)
--glow: 0 0 40px rgba(41,121,255,0.18)
--ease: 0.3s cubic-bezier(0.4,0,0.2,1)
```

---

## Standards & Rules

### Layout — game pages

1. **No page scroll.** Add to `<style>`:
   ```css
   html, body { overflow: hidden; height: 100%; }
   ```
2. **Force nav glass** (scroll never fires since body is overflow:hidden). Add to `<style>`:
   ```css
   nav {
       background: rgba(8, 13, 26, 0.92);
       backdrop-filter: blur(18px);
       -webkit-backdrop-filter: blur(18px);
       box-shadow: 0 1px 0 var(--border);
   }
   ```
3. **`.game-viewport` base** (from `games.css`) is `display:flex; align-items:center; justify-content:center; width:100vw; height:100dvh; overflow:hidden; background:var(--bg)`. Override `flex-direction`, `align-items`, `padding-top` as needed for your layout.
4. **Account for the nav** (height 66px). If your game uses a column layout, add `padding-top: 66px` to `.game-viewport`.
5. **Mobile scroll exception**: If the game has a sidebar or panel layout that genuinely can't fit a small screen, allow scroll at a specific breakpoint only:
   ```css
   @media (max-width: [breakpoint]px) {
       body { overflow-y: auto; }
       .game-viewport { height: auto; min-height: 100svh; }
   }
   ```
   Do NOT allow scroll on the full-canvas game types (snake-like, etc.).

### Header

- `games.js` fetches `/includes/header.html` (absolute path) and injects it into `#header-placeholder`.
- **Never use a relative path** for this fetch — it would break from subfolders.
- Never put a `<footer>` on any page.

### Bootstrap usage

- Use Bootstrap **only for layout utilities**: `d-flex`, `align-items-*`, `justify-content-*`, `flex-column`, `flex-wrap`, `gap-*`, `d-none`, `d-grid`, `position-*`, `overflow-hidden`, `w-100`, `h-100`, `text-center`, `text-uppercase`, `list-unstyled`, `mb-0`, Bootstrap grid (`row`, `col-*`, `g-*`).
- **Do NOT use Bootstrap components** (`.navbar`, `.card`, `.badge`, `.btn` base styles, modals, dropdowns) — they look different from the project's custom theme.
- Bootstrap loads before `games.css`. Our custom CSS always wins for visual styles.
- When a Bootstrap `!important` utility conflicts with a responsive CSS override, add `!important` to the override too.

### Shared components (from `games.css`) — use these as-is

**Buttons:**
```html
<!-- Primary (filled blue) -->
<button class="btn btn-p d-inline-flex align-items-center gap-2">
    <span class="material-icons-round" style="font-size:17px">icon_name</span>Label
</button>

<!-- Outline -->
<a href="/" class="btn btn-o d-inline-flex align-items-center gap-2">
    <span class="material-icons-round" style="font-size:17px">arrow_back</span>All Games
</a>
```

**Badge pill:**
```html
<div class="badge d-inline-flex align-items-center gap-2">
    <div class="badge-dot"></div>Browser Game
</div>
```

**Section label:**
```html
<div class="s-label">Browser Game</div>
<h1>Game <span>Title</span></h1>
```

**Stat card:**
```html
<div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1rem;text-align:center">
    <div style="font-size:1.8rem;font-weight:800;color:var(--primary-light);line-height:1" id="statId">0</div>
    <div style="font-size:0.74rem;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-top:4px">Label</div>
</div>
```

**Panel (info/sidebar):**
```html
<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow);overflow:hidden">
```

**Status pill:**
```html
<div style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:50px;background:var(--accent-dim);border:1px solid rgba(0,229,255,0.22);color:var(--accent);font-size:0.78rem;font-weight:800">Ready</div>
```

### Panels and layout conventions

- A game's main content area typically uses a **two-column grid** (`grid-template-columns: 1fr [sidebar]px`) at desktop, collapsing to single column at a mobile breakpoint.
- The left/main panel holds the primary game area (canvas, board, cards).
- The right/sidebar panel holds: section label, h1, description, stat counters, action buttons, and rules list.
- Sidebar items order: badge → h1 → description → stats → status indicator → rules → action buttons → history (if applicable).

### Typography rules

- `h1` inside game pages: override the hub size down to `clamp(2rem, 4vw, 3.2rem)`, `font-weight:800`, `letter-spacing:-1.5px`.
- Highlight a word in h1 with `<span style="color:var(--primary-light)">word</span>`.
- Description text: `color:var(--text2); font-size:0.96rem; line-height:1.7`.
- Labels (uppercase trackers): `font-size:0.73rem; font-weight:700; letter-spacing:2px; color:var(--primary); text-transform:uppercase`.

### Ambient background

Every game page should have a subtle radial gradient ambient background:
```css
body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(41,121,255,0.14) 0%, transparent 70%),
        radial-gradient(ellipse 45% 45% at 15% 85%, rgba(0,229,255,0.08) 0%, transparent 60%);
}
```

All game UI must sit at `position:relative; z-index:1` or higher to appear above this layer.

### Hover & interaction patterns

- Cards/cells lift on hover: `transform: translateY(-3px)`, `border-color: rgba(41,121,255,0.45)`, `box-shadow: var(--glow)`.
- Interactive elements: `transition: transform var(--ease), border-color var(--ease), box-shadow var(--ease)`.
- Disabled state: `cursor: default; pointer-events: none`.

### Overlay system (for fullscreen games)

For games that need a start/pause/game-over screen:
```html
<div id="overlay" class="d-flex flex-column align-items-center justify-content-center" style="position:absolute;inset:0;gap:0.85rem;padding:18px;background:rgba(8,13,26,0.82);backdrop-filter:blur(6px)">
    <div id="ov-emoji" style="font-size:clamp(2.1rem,8vw,3.2rem)">🎮</div>
    <div id="ov-title" style="font-size:clamp(1.15rem,4vw,1.5rem);font-weight:800">Game Title</div>
    <div id="ov-sub" style="font-size:0.85rem;color:var(--text2);text-align:center;max-width:min(440px,92vw);line-height:1.5">Instruction text.</div>
    <button class="btn btn-p d-inline-flex align-items-center gap-2" id="ov-btn">
        <span class="material-icons-round" style="font-size:17px">play_arrow</span>Start Game
    </button>
</div>
```
Hide with: `#overlay.hidden { display: none !important; }` and toggle the `hidden` class in JS.

### State machine (for action games)

Use a `state` variable: `'idle' | 'running' | 'paused' | 'dead'`. Always guard game-tick functions with a state check. Example:
```js
let state = 'idle';

function startGame() {
    state = 'running';
    // ...
}
function togglePause() {
    if (state === 'running') { state = 'paused'; /* show overlay */ }
    else if (state === 'paused') { state = 'running'; /* hide overlay */ }
}
```

### Score & best score

- Session score: JS variable, reset on new game.
- Best/high score: `localStorage.getItem('gameNameBest')` / `localStorage.setItem('gameNameBest', ...)`.
- Use the camelCase key pattern: `snakeBest`, `memoryBest`, etc.

### Mobile & touch

- For canvas games: add swipe detection (touchstart / touchend with minimum 20px threshold). Block default touch scroll with `touch-action: none` on the canvas.
- For board/card games: ensure the game is usable at `min-width: 320px`. Use `clamp()` for font sizes and gaps. Test that all interactive elements are large enough to tap (`min 44px` touch target).
- When the game has a sidebar, collapse it on mobile (show only key stats + action buttons inline with the title using a grid).

### Keyboard shortcuts

- **Fullscreen games**: Arrow keys / WASD = direction, Space = start/pause/resume. Block default scroll on arrow keys with `e.preventDefault()`.
- **Turn-based games**: no keyboard shortcuts required unless naturally applicable.

### Win / end state

- Show a modal or overlay after the game ends.
- Include the final score, time, or move count.
- Always offer a "Play Again" / "New Round" button that resets to the initial state.
- For modal-style endings (not fullscreen overlay), use:
  ```css
  .win-modal { position:fixed;inset:0;z-index:35;background:rgba(8,13,26,0.72);backdrop-filter:blur(14px);padding:1rem; }
  .win-modal.show { display: flex !important; }
  ```

### Rules/instructions section

Every sidebar should include a brief "How to play" or rules section with Material Icon bullets:
```html
<div class="d-flex flex-column" style="gap:0.8rem;margin:1.2rem 0">
    <div class="d-flex" style="gap:0.75rem;color:var(--text2);font-size:0.88rem">
        <span class="material-icons-round" style="color:var(--primary-light);font-size:18px;flex-shrink:0">rule_icon</span>
        Rule description.
    </div>
</div>
```

### After generating the game file

1. Add a `<article class="game-card">` entry to `/index.html` game grid:
```html
<div class="col">
    <article class="game-card rv d[N] d-flex flex-column h-100">
        <div class="game-thumb">[EMOJI]</div>
        <h3>[GAME_TITLE]</h3>
        <p>[SHORT_DESCRIPTION]</p>
        <div class="tags d-flex flex-wrap">
            <span class="tag live">Live</span>
            <span class="tag js">JavaScript</span>
            <span class="tag">[GENRE_TAG]</span>
        </div>
        <a href="/[GAME_FOLDER]/" class="btn btn-p d-inline-flex align-items-center gap-2">
            <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play [GAME_TITLE]
        </a>
    </article>
</div>
```
2. Update `docs/FEATURES.md` with a section describing the new game's features.
3. Update `docs/CODEBASE.md` with the new game's file and any new patterns it introduces.

---

## Game Input — Fill These In

```
GAME_TITLE:       [e.g. "2048"]
GAME_FOLDER:      [e.g. "2048"  — used as the directory name and URL path]
GAME_EMOJI:       [e.g. 🔢  — shown in the hub card thumbnail]
GENRE_TAG:        [e.g. "Puzzle" — shown as a tag on the hub card]
SHORT_HUB_DESC:   [1–2 sentences for the hub card. Focus on what makes it fun.]

LAYOUT_TYPE:      [Choose one]
                  A — Fullscreen canvas  (snake-like: canvas fills remaining viewport, overlay for start/pause/end)
                  B — Two-column panels  (tic-tac-toe-like: main panel left, sidebar right, collapse on mobile)
                  C — Centered board     (memory-cards-like: fixed-aspect board centered in viewport with flanking info)

MOBILE_SCROLL:    [yes / no — does this layout need scroll on small screens?]
                  If yes: state the breakpoint (e.g. "yes, below 900px")

GAME_DESCRIPTION:
[Full description of game mechanics. Include:
  - Objective (what the player is trying to achieve)
  - Win condition (what triggers a win or game over)
  - Turn structure (real-time / turn-based / timed)
  - Player count (single / two-player local)
  - Any special mechanics (combos, power-ups, wrap-around edges, blocking, etc.)
  - Score model (how points are earned, whether there's a best score to persist)
  - Any specific visual feedback needed (glows, highlights, animations)
]

CONTROLS:
[List the controls. Example:
  - Arrow keys / WASD: move
  - Space: start / pause / resume
  - Click / tap cell: interact
  - Swipe: direction (mobile)
]

SIDEBAR_STATS:
[List the stat counters to show. Example:
  - Score (resets each game)
  - Best (persists via localStorage)
  - Time (elapsed)
  - Moves (total attempts)
]

EXTRA_REQUIREMENTS:
[Any extra notes — specific animations, sound (no audio without user interaction), AI opponent, timer countdown, difficulty levels, settings panel, etc. Leave blank if none.]
```
