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
