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

---

### `2048/index.html` — 2048 Puzzle
Self-contained. Layout B (two-column panels). No scroll.

Key variables: `board` (4×4 number matrix), `score`, `best` (localStorage `"2048Best"`), `moves`.

Key functions:
- `slideRow(row)` — strips zeros, merges adjacent equals left-to-right, pads with zeros
- `move(dir)` — applies `slideRow` across all rows/columns for a direction, spawns tile
- `spawnTile()` — places a 2 (90%) or 4 (10%) in a random empty cell
- `renderBoard()` — rebuilds absolutely-positioned tile divs in `#tile-layer`; uses `TILE_COLORS` map
- `checkGameOver()` — detects 2048 win and board-full lose states

Tiles are `position:absolute` divs moved via CSS `transform:translate()` with `transition:transform 0.1s ease`.

---

### `wordle/index.html` — Wordle Word Game
Self-contained. Layout B (two-column panels). Scroll below 700px.

Key variables: `secret` (uppercase 5-letter word), `currentRow` (0–5), `currentGuess` (letter array), `stats` object, `ANSWERS` array, `VALID_WORDS` Set.

Key functions:
- `evaluateGuess(guess, secret)` — two-pass algorithm; returns array of `'correct'|'present'|'absent'`
- `revealRow(rowIdx, results)` — CSS `rotateX` flip with 80ms stagger; colour applied mid-flip
- `submitGuess()` — validates, evaluates, reveals, checks win/loss
- `updateKeyboard(word, results)` — updates on-screen key colours (green > yellow > grey)
- `showToast(msg)` — fades in/out pill above grid; auto-dismisses 1.8s

---

### `breakout/index.html` — Breakout Arcade
Self-contained. Layout A (fullscreen canvas). HUD is an absolute `<div>` above canvas.

State machine: `idle | running | paused | dead`.

Key variables: `ball {x,y,vx,vy,destroyed}`, `paddle {x,y,w,h}`, `bricks[]`, `keys` Set, `level`, `lives`.

Key functions:
- `reflectPaddle()` — hit pos normalised to −1..1, angle = hitPos × (π/3), decomposed to vx/vy
- `initLevel()` — positions 7×5 brick grid, paddle, and ball for current level
- `loop()` → `update()` + `draw()` — RAF game loop; `keys` Set tracks held keyboard keys
- `resize()` — resizes canvas to wrapper, called on init and window resize

---

### `minesweeper/index.html` — Minesweeper
Self-contained. Layout B (two-column panels). Scroll below 768px.

Key variables: `grid[][]` (`{mine,revealed,flagged,adjacent}`), `diff` string, `firstClick` bool, `DIFFICULTIES` config object.

Key functions:
- `buildGrid()` — creates empty grid for selected difficulty, resets all state
- `placeMines(safeRow, safeCol)` — places mines post-first-click; 3×3 safe zone; computes adjacency
- `reveal(r, c)` — recursive flood fill for zero-adjacent cells
- `handleClick(r, c)` — first-click mine placement then reveal; chord-click on revealed numbers
- `handleRightClick(r, c)` — toggles flag; long-press (500ms touchstart) on mobile with `vibrate(30)`

Context menu suppressed on grid (`contextmenu` → `e.preventDefault()`).

---

### `flappy-bird/index.html` — Flappy Bird
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | dead`.

Key variables: `bird {x,y,vy,angle}`, `pipes[]` (`{x,gapY,scored}`), `stars[]`, constants `GRAVITY=0.4`, `FLAP_VY=−7`, `PIPE_GAP=150`.

Key functions:
- `gameLoop(timestamp)` — delta-time RAF (capped 50ms); normalises to 60fps via `dt = delta/16.67`
- `update(delta)` — bird physics, pipe scroll + scoring, star parallax, AABB collision
- `drawBird(x,y,angle,wingUp)` — canvas path: yellow circle, ellipse wing, orange beak triangle, eye
- `drawPipe(x, gapY)` — dark green body rects + lighter cap rects (6px wider each side)
- `flap()` — applies `FLAP_VY` impulse; starts game from idle/dead
- `die()` — freezes loop, sets death pose angle, shows overlay after 600ms

---

### `tetris/index.html` — Tetris
Self-contained. Layout B (two-column panels). Left panel: 10×20 CSS grid canvas. Right sidebar: stats + next piece preview.

State machine: `idle | running | paused | dead`.

Key variables: `board[][]` (10×20), `currentPiece {type,x,y,rotation}`, `bag[]` (7-bag shuffle), `ghostY`, `lockTimer`, `level`, `lines`, `score`.

Key functions:
- `spawnPiece()` — draws from bag; game-over if spawn position is blocked
- `rotate(piece, dir)` — SRS rotation matrix; tries up to 3 wall-kick offsets from `KICKS` table
- `tryMove(dx, dy)` — collision-checks and moves piece; returns boolean success
- `hardDrop()` — teleports piece to ghost position, scores 2×rows dropped, locks immediately
- `lockPiece()` — writes piece to board; calls `clearLines()`; resets lock timer
- `clearLines()` — scans board top-to-bottom; removes full rows, shifts rows down; adds score
- `drawBoard()` — renders board cells as coloured `div` backgrounds via CSS grid
- `drawGhost()` — projects piece straight down to lowest valid position

---

### `pong/index.html` — Pong
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | dead`.

Key variables: `ball {x,y,vx,vy,speed}`, `player {y,score}`, `ai {y,score}`, `trail[]` (last 5 ball positions), constants `PADDLE_H=80`, `BALL_R=8`, `WIN_SCORE=7`.

Key functions:
- `gameLoop(ts)` — RAF loop; calls `update()` then `draw()`
- `update()` — ball physics, wall bounce, paddle collision with angle deflection, AI tracking
- `aiMove()` — tracks ball.y at 75% ball speed; capped to canvas bounds
- `ballHitPaddle(paddle)` — deflects ball; increases speed by 5%; adjusts angle by hit offset
- `draw()` — renders paddles, ball trail, ball, score, net dashes
- `serve(scorer)` — resets ball to centre with random vertical angle toward the scorer

---

### `connect-four/index.html` — Connect Four
Self-contained. Layout B (two-column panels). Left panel: 7×6 CSS grid board. Right sidebar: turn indicator + scores.

State machine: `idle | running | won`.

Key variables: `grid[][]` (7 cols × 6 rows), `currentPlayer` (1 or 2), `scores[]`.

Key functions:
- `dropDisc(col)` — finds lowest empty row in column; places disc; animates CSS `translateY`
- `checkWin(col, row)` — checks all 4 directions (horizontal, vertical, 2 diagonals) from placed cell; marks winning cells
- `getLowestRow(col)` — scans column from bottom for first empty cell
- `renderBoard()` — re-renders all 42 cells as coloured divs with transition classes
- `highlightWin(cells)` — adds `win-pulse` class to winning cell elements

---

### `whack-a-mole/index.html` — Whack-a-Mole
Self-contained. Layout C (centered board). 3×3 mole hole grid.

State machine: `idle | running | dead`.

Key variables: `score`, `best`, `timeLeft` (30s countdown), `activeMoles` set, `difficultyRamped` flag.

Key functions:
- `startGame()` — resets counters, starts countdown interval, calls `scheduleNextMole()`
- `scheduleNextMole()` — sets random timeout; picks random hole; spawns normal or golden mole
- `spawnMole(holeIdx, isGolden)` — adds `active` class to hole element; sets retreat timeout
- `whack(holeIdx)` — scores hit, removes `active` class, spawns floating score text, calls `scheduleNextMole()`
- `showFloatingScore(hole, pts)` — creates absolutely-positioned element; animates translateY + opacity
- `endGame()` — stops all timers, saves best, shows overlay

---

### `simon/index.html` — Simon
Self-contained. Layout C (centered board). 2×2 CSS grid quadrant buttons.

State machine: `idle | showing | input | dead`.

Key variables: `sequence[]`, `playerIndex`, `round`, `best`, `speedMs` (flash duration tier).

Key functions:
- `nextRound()` — pushes random colour to sequence; sets `showing` state; calls `playSequence()`
- `playSequence()` — iterates sequence with `setTimeout` delays; flashes each quadrant + plays tone
- `flashButton(colour)` — adds `active` class for `speedMs`ms; plays Web Audio oscillator at colour frequency
- `playerPress(colour)` — validates against `sequence[playerIndex]`; advances or triggers `gameOver()`
- `gameOver()` — flashes all quadrants red; shows overlay after animation; saves best
- `createTone(freq)` — creates Web Audio `OscillatorNode` + `GainNode`; plays for 350ms

---

### `hangman/index.html` — Hangman
Self-contained. Layout C (centered board). Inline SVG gallows + letter button grid.

State machine: `idle | running | won | dead`.

Key variables: `word`, `category`, `guessed` Set, `wrongCount` (0–6), `streak`, `WORDS` object (5 category arrays).

Key functions:
- `newGame()` — picks random category and word; resets SVG path visibility; resets letter buttons
- `guess(letter)` — checks if letter is in word; increments `wrongCount` or fills blanks; calls `checkWin()`
- `revealPart(n)` — animates the nth SVG path via `stroke-dashoffset` from full length to 0
- `updateBlanks()` — re-renders word display as `_` or revealed letter spans
- `checkWin()` — all letters guessed → won state; `wrongCount===6` → dead state
- `saveStreak()` — persists win streak to `localStorage["hangmanStreak"]`

SVG gallows parts drawn in order: gallows frame (3 paths) → head circle → torso → left arm → right arm → left leg → right leg.

---

### `asteroids/index.html` — Asteroids
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | dead`.

Key variables: `ship {x,y,vx,vy,angle,thrusting,invincible}`, `bullets[]`, `asteroids[]`, `particles[]`, `lives`, `score`, `wave`.

Key functions:
- `gameLoop(ts)` — delta-time RAF (capped 50ms); calls `update(dt)` + `draw()`
- `update(dt)` — ship physics (thrust/rotate/friction/wrap), bullet movement + lifetime, asteroid movement + wrap, collision detection
- `spawnWave()` — creates `3 + wave` large asteroids with random polygon vertices; skips spawn-safe zone around ship
- `splitAsteroid(a, bullet)` — removes asteroid; spawns 2 children at next smaller size (or nothing if small)
- `drawAsteroid(a)` — stroked polygon path using pre-computed vertex offsets
- `drawShip(s)` — triangle path + optional thruster flame; blinks when invincible
- `spawnParticles(x, y, count, speed)` — pushes line-segment explosion particles
- `wrapPos(obj)` — wraps x/y to opposite edge when out of canvas bounds

---

### `sudoku/index.html` — Sudoku
Self-contained. Layout B (two-column panels). Left panel: 9×9 CSS grid board. Right sidebar: difficulty selector + timer + stats + number pad.

State machine: `idle | running | won`.

Key variables: `puzzles` object (3 difficulty arrays of 81-char strings), `solutions` matching array, `board[]` (81 cells), `selected` index, `notesMode`, `elapsed`, `timerInterval`.

Key functions:
- `loadPuzzle(difficulty)` — picks random puzzle for difficulty; populates `board[]`; renders grid
- `selectCell(idx)` — sets `selected`; highlights peers (same row/col/box) and same-number cells
- `enterDigit(d)` — sets or clears `board[selected].value`; validates against solution; starts timer on first entry
- `toggleNote(idx, d)` — adds/removes candidate digit in `board[idx].notes` Set; updates cell micro-grid
- `checkWin()` — all non-given cells correct → triggers win animation
- `giveHint()` — finds first wrong/empty cell; reveals correct value after 500ms; adds 30s to `elapsed`
- `renderCell(idx)` — updates cell DOM: value or notes micro-grid; applies selected/peer/mistake classes
- `winAnimation()` — iterates cells left-to-right with 30ms stagger; adds green shimmer class

---

### `dino-run/index.html` — Dino Run
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | dead`.

Key variables: `dino {x,y,vy,ducking,jumping,frame}`, `obstacles[]` `{type,x,w,h,variant,height}`, `speed`, `score`, `best`, `nightMode`, `nightProgress`.

Key functions:
- `gameLoop(ts)` — delta-time RAF (capped 50ms); normalises to 60fps
- `update(dt)` — dino physics (jump/gravity/duck), obstacle scroll + spawn, collision (80% hitbox), speed ramp, score increment, night cycle fade
- `spawnObstacle()` — random cactus variant or pterodactyl (after score 200); enforces minimum gap
- `drawDino(dt)` — rect-based sprite: body, head, eye, arms, alternating legs (run), flat legs (duck/jump)
- `drawPterodactyl(o)` — two wing frames alternating every 12 ticks
- `drawCactus(o)` — variant-specific rect compositions (small/tall/double)
- `checkCollision(dino, obs)` — AABB check with 80%/50% hitbox scaling
- `die()` — freezes game loop; saves best; shows game-over overlay after 400ms

---

### `bubble-shooter/index.html` — Bubble Shooter
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | aiming | firing | popping | dead`.

Key variables: `grid[][]` (rows × cols of colour strings or null), `shooter {angle,current,next}`, `firedBubble {x,y,vx,vy}`, `particles[]`, `shotsSincePop`, `level`, `score`, `best`.

Key functions:
- `gameLoop(ts)` — RAF loop; calls `update()` + `draw()`
- `hexToPixel(row, col)` — converts grid coordinates to canvas pixel centre using hex-offset math
- `pixelToHex(x, y)` — finds nearest grid cell for a canvas position; snaps fired bubble on contact
- `bfsPop(row, col, colour)` — BFS from placed cell; returns all connected same-colour cells (pops if ≥3)
- `bfsFloating()` — BFS from row-0 cells; returns all cells not connected to ceiling (they drop)
- `castRay(angle)` — traces aim guide path with one wall reflection; returns array of line segments
- `drawBubble(x, y, colour, r)` — radial gradient fill + white specular highlight at top-left
- `spawnParticles(x, y, colour)` — 6–8 radial spark particles for pop animation
- `descentCheck()` — after 10 shots without a pop, shifts entire grid down one row; checks danger line
