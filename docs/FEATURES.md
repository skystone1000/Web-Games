# Features — Games Site

## Site-Wide Features

### Shared Header (games.js + includes/header.html)
- Fixed top nav injected via `fetch()` on every page
- Logo links to hub (`/`)
- "← Portfolio" links to `https://www.adityamahajan.in`
- **Desktop**: horizontal nav links
- **Mobile**: hamburger button opens full-screen overlay with same links
- Nav transitions to glass (blur + border) on scroll (hub) or always-on (game pages)

### Scroll Reveal (games.js)
- Elements with class `.rv` start invisible (opacity 0, translated down 28px)
- `IntersectionObserver` adds `.on` when element enters viewport
- Stagger delays via `.d1`–`.d4` classes (0.1s–0.4s)
- Used on hub page hero and game cards

### Design System
- Dark theme only: near-black backgrounds (#080D1A, #111827), white text
- Blue accent (#2979FF) + cyan highlight (#00E5FF)
- All interactive elements have hover transitions (translateY, glow, border color)
- Consistent border-radius (14px cards, 50px pills)

---

## Games Hub (`/`)

### Hero Section
- Animated badge with pulsing dot ("Interactive Playground")
- Large headline with gradient text span
- Subtitle describing the project

### Game Card Grid
- CSS `auto-fill minmax(300px, 1fr)` responsive grid — currently 3 live game cards
- Each card: emoji thumbnail, title, description, tag row, play button
- Hover: card lifts (translateY -5px), gradient top border appears, blue glow
- **Live cards**: bright, fully clickable, `btn-p` play button
- **Coming soon cards**: 65% opacity (`.coming` class), disabled button with "not-allowed" cursor

---

## Snake (`/snake/`)

### Gameplay
- Classic snake on a wrapping grid (edges teleport, no walls)
- Eating food grows snake by 1 segment and increments score
- Self-collision (head hits any body segment) = game over
- Speed: 130ms per tick (constant, no speed scaling)

### Controls
| Input | Action |
|---|---|
| Arrow keys / WASD | Change direction (180° reversal blocked) |
| Space | Start / pause / resume |
| Swipe (touch) | Change direction |
| Tap (touch) | Start / pause |
| Overlay button | Start / pause / resume |

### HUD
- Score counter (top-left) — resets each game
- Best score (top-right) — persists for the session (not localStorage)
- Game title centered

### Overlay System
Three overlay states, same UI:

| State | Emoji | Title | Button |
|---|---|---|---|
| `idle` | 🐍 | Snake | Start Game |
| `paused` | ⏸ | Paused | Resume |
| `dead` | 💀 | Game Over | Try Again |

Overlay has blur backdrop, dark tint, and game's final score in subtitle.

### Visuals
- Canvas: 20px grid cells, subtle grid lines
- Snake: gradient blue (head #5C9EFF with glow, body rgba(41,121,255) fading)
- Food: cyan (#00E5FF) with radial glow
- Grid: white lines at 2.2% opacity
- Controls hint (bottom-right): keyboard shortcut reference

### Responsiveness
- Canvas resizes dynamically on window resize
- Grid recalculates to always be a multiple of CELL (20px)
- On resize during game: state preserved, grid reinitialised at new size
- Touch swipe works on mobile

---

## Tic Tac Toe (`/tic-tac-toe/`)

### Gameplay
- Two-player local game (no AI). X always goes first each round.
- Win condition: 3 in a row, column, or diagonal
- Draw condition: all 9 cells filled with no winner

### Layout
- Two-column panel layout: left = game board + stats, right = sidebar
- On narrow screens: sidebar stacks below board
- `overflow-y: auto` on game area (inner scroll, no page scroll)

### Scoreboard
- Three stat counters: Player X wins, Draws, Player O wins
- Persists across rounds within a session until "Reset Match"

### Controls
| Control | Action |
|---|---|
| Click cell | Place mark |
| New Round | Clear board, keep scores |
| Reset Match | Clear board and all scores |
| All Games | Link back to hub `/` |

### Visual feedback
- Winning cells highlighted with cyan glow (`.cell.win`)
- X marks in blue (`--primary-light`), O marks in cyan (`--accent`)
- Status bar shows current player token + result message
- Round history list in sidebar (last 5 rounds visible, scrollable)

---

## Memory Cards (`/memory-cards/`)

### Gameplay
- 4 × 4 grid, 16 cards = 8 pairs
- Click two cards: if they match, they stay open; if not, they flip back after 760ms
- Blocking: cannot flip a third card while two are being evaluated

### Layout
- Two-column layout: left = info panel (title, stats, rules), right = card board
- Full-viewport, no scroll (`html, body { overflow: hidden }`)
- Board scales to fit available height: `width: min(100%, calc((100svh - 190px) * 0.96))`

### Stats
- **Moves**: total flip-pair attempts (increments after every 2 flips)
- **Pairs**: matched pairs out of 8
- **Time**: elapsed seconds from first card flip to completion

### Win modal
- Appears 450ms after last pair matched
- Shows total moves and time
- "Play Again" reshuffles and resets — clicking backdrop also dismisses

### Card animation
- CSS 3D card flip via `perspective` + `rotateY(180deg)` on `.card-inner`
- Flip duration: 480ms cubic-bezier easing
- Matched cards stay face-up with a cyan border glow

---

## 2048 (`/2048/`)

### Gameplay
- Single-player sliding tile puzzle on a 4×4 grid
- Arrow keys / WASD / swipe to slide all tiles in one direction
- Matching tiles merge (e.g. 4+4→8); score increments by merged value
- Win condition: reach a tile with value 2048 (player may keep going)
- Game over: board full with no possible merges

### Layout
- Two-column panel layout: left = 4×4 board, right = sidebar
- No page scroll; collapses to single column on narrow screens

### Stats
- Score (current game), Best (persists `"2048Best"`), Moves (total slides)

### Visual feedback
- Per-tile colour palette: 2–4 dark blue, 8–64 orange/red, 128–512 yellow, 1024 blue, 2048 cyan
- Spawn animation: `scale(0)→scale(1)` over 150ms; merge pop: `scale(1.15)→scale(1)` over 120ms
- Win and game-over overlays

---

## Wordle (`/wordle/`)

### Gameplay
- Single-player word guessing: 5-letter secret word, 6 tries
- Each guess evaluated: correct (green), present (yellow), absent (grey)
- Only valid 5-letter words accepted (bundled word list, works offline)

### Layout
- Two-column panel layout: left = 6×5 grid + on-screen keyboard, right = sidebar
- Scroll allowed below 700px

### Stats
- Played (`"wordlePlayed"`), Wins (`"wordleWins"`), Streak (`"wordleStreak"`)

### Visual feedback
- Tile flip reveal: CSS `rotateX` with 80ms stagger between tiles; colour applied mid-flip
- Scale-bounce on letter type; shake on invalid word; bounce on winning row
- Toast notifications (auto-dismiss 1.8s)
- On-screen keyboard mirrors tile colour state (green > yellow > grey precedence)

---

## Breakout (`/breakout/`)

### Gameplay
- Single-player arcade: bounce ball off paddle to destroy 7×5 brick grid
- Top rows worth more (50/30pts); rows 3–5 worth 10pts each
- Level clears when all bricks destroyed; bricks regenerate at next level
- 3 lives; game over when all lost; 2-hit bricks introduced from level 2

### Controls
| Input | Action |
|---|---|
| Arrow Left/Right or A/D | Move paddle (velocity-based, hold to move) |
| Mouse move | Paddle follows cursor X |
| Touch drag | Paddle follows finger X |
| Space | Start / pause / resume |

### HUD
- Score, Best (`"breakoutBest"`), Lives (❤ icons), Level — absolute bar above canvas

### Visual feedback
- Ball: white circle with cyan glow; Paddle: gradient blue rounded rect
- Brick row colours: cyan, light blue, purple, amber, red
- 2-hit bricks appear darker; flash white on each hit; level-clear flash + 400ms pause

---

## Minesweeper (`/minesweeper/`)

### Gameplay
- Single-player logic: reveal all non-mine cells without hitting a mine
- Difficulties: Easy (9×9, 10 mines), Medium (16×16, 40 mines), Hard (30×16, 99 mines)
- First click always safe (mines placed after first reveal)
- Flood-fill reveals connected zero-adjacent cells; chord click auto-reveals neighbours

### Controls
| Control | Action |
|---|---|
| Left-click | Reveal cell |
| Right-click | Toggle flag 🚩 |
| Long-press 500ms (mobile) | Toggle flag + haptic vibrate |
| Difficulty pills | Change grid, reset board |

### Stats
- Mines Left, Time (mm:ss, starts on first click), Best Time per difficulty

### Visual feedback
- Numbers colour-coded (1=blue, 2=green, 3=red, 4=dark blue, 5=maroon, 6=teal, 7=white, 8=grey)
- Mine hit: red flash, all mines revealed (💣 / 🔴 for wrong flags)
- Win: remaining mines auto-flagged

---

## Flappy Bird (`/flappy-bird/`)

### Gameplay
- Single-player endless arcade: flap through infinite pipe gauntlet
- Score = pipe pairs passed; best persists across sessions via `"flappyBest"`

### Controls
| Input | Action |
|---|---|
| Space | Flap / start |
| Click or tap canvas | Flap |
| Overlay button | Start / Try Again |

### Physics
- Gravity 0.4 px/frame; flap impulse −7 px/frame; terminal fall 10 px/frame
- Delta-time RAF loop capped at 50ms; bird rotation −25° to +75°

### Visual feedback
- Bird: yellow circle + orange beak + eye, drawn with canvas paths; wing flaps at ~8fps
- Pipes: dark green body with lighter caps; parallax star layer at 0.5× pipe speed
- Score drawn large and centred on canvas; death 600ms delay before overlay
