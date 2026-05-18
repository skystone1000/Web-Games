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


---

### `alien-invaders/index.html` — Alien Invaders
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | paused | dead`.

Key variables: `player {x,y,w,h,speed,cooldown,invulnerableUntil}`, `aliens[]`, `playerBullets[]`, `enemyBullets[]`, `particles[]`, `shieldCells[]`, `score`, `best`, `wave`, `lives`, `enemyFireTimer`, `alienDir`, `initialAlienCount`, `shieldsEnabled`, `waveTransitionUntil`.

Persistent storage:
- `BEST_KEY = "alienInvadersBest"`

Key functions:
- `resizeCanvas()` — sizes canvas to its container, applies DPR scaling, updates player dimensions/position, rebuilds stars, redraws idle/dead state
- `buildStars()` — creates responsive starfield particles based on canvas area
- `setupWave()` — resets bullets/particles, creates alien rows/columns, scales enemy fire timing, optionally builds shields
- `buildShields()` — creates 3 or 4 destructible shield clusters with 3 HP cells
- `startGame()` — resets score, wave, lives, player position/cooldown, grants initial invulnerability, starts wave 1
- `startNextWave()` — increments wave, rebuilds alien formation, shows wave banner
- `togglePause()` — switches between running and paused, or starts from idle/dead
- `shoot()` — fires one player bullet if running and cooldown is ready
- `loseLife()` — handles player hit, decrements lives, clears enemy bullets, triggers invulnerability flash or game over
- `gameOver(reason)` — freezes game state, saves best score, shows game-over overlay with reason and final score
- `clearWave()` — awards time-based wave clear bonus, updates best, queues next wave after delay
- `update(dt)` — main simulation step: player movement, cooldowns, alien update, bullets, particles, enemy fire, reach-line checks
- `updateAliens(dt, aliveAliens)` — moves formation, flips direction at edges, drops aliens downward, scales speed as aliens die
- `updateBullets(dt)` — moves bullets, detects alien hits, shield hits, player hits, removes dead/offscreen bullets
- `updateEnemyFire(dt, aliveAliens)` — chooses bottom-most aliens by column and fires random enemy bullets
- `updateParticles(dt)` — moves and fades burst particles
- `checkAlienReach(aliveAliens)` — ends game when any alien crosses the defense line
- `hitShield(bullet, damage)` — applies damage to shield cells and destroys bullet on impact
- `hitPlayer(bullet)` — AABB collision check against player cannon
- `rectsOverlap(a,b)` — shared AABB helper for collisions
- `burst(x,y,count,type)` — spawns particle bursts for alien kills, shots, shield hits, and player damage
- `draw(dt)` — clears and redraws the entire canvas scene
- `drawBackground(dt)` — draws vertical gradient, moving starfield, and subtle sci-fi grid
- `drawDefenseLine()` — draws dashed red player danger line
- `drawPlayer()` — draws cannon and handles invulnerability blinking
- `drawAliens()` — draws glowing alien sprites with row-based colours and wobble animation
- `drawBullets()` — draws primary-blue player shots and cyan/red enemy shots
- `drawShields()` — draws shield cells with opacity/colour based on remaining HP
- `drawParticles()` — draws fading circular particles
- `roundedRect(x,y,w,h,r)` — shared canvas helper for rounded rectangles
- `loop(now)` — RAF loop with capped delta time
- `showOverlay(emoji,title,sub,buttonText)` — updates and displays start/pause/game-over overlay
- `hideOverlay()` — hides overlay while game is running
- `showWaveBanner(text)` — displays pulsing wave/status banner
- `setStatus(text)` — updates top-left status pill
- `updateBest()` — saves score to localStorage if it beats best
- `updateStats()` — syncs score, best, wave, and lives UI
- `setMove(direction, active)` — toggles left/right movement flags
- `bindHold(button, direction)` — adds hold-to-move pointer controls for mobile buttons

Event bindings:
- `keydown` — Arrow Left/Right, A/D movement; Space fire/start/resume; P/Escape pause
- `keyup` — stops keyboard movement
- `canvas pointerdown/up/cancel` — mobile side-tap movement
- `ovBtn` — start/resume/play again
- `newBtn` — restart game
- `pauseBtn` — pause/resume
- `shieldBtn` — toggle shield blocks
- `leftTouch/rightTouch` — hold-to-move mobile controls
- `fireTouch` — fire/start/resume on mobile
- `resize` — recompute canvas dimensions and redraw


---

### `tower-defense/index.html` — Tower Defense
Self-contained. Layout B (two-column panels: canvas/path left, tower shop sidebar right).

State machine: `idle | running | paused | dead | won`.

Key variables: `coins`, `wave`, `baseHealth`, `kills`, `best`, `enemies[]`, `towers[]`, `projectiles[]`, `particles[]`, `selectedType`, `selectedTower`, `hover`, `spawnLeft`, `spawnTimer`, `spawnInterval`, `waveActive`.

Persistent storage:
- `BEST_KEY = "towerDefenseBest"`

Key objects:
- `towerTypes.basic` — balanced damage/range/fire-rate tower
- `towerTypes.slow` — slower firing tower that applies enemy slow
- `towerTypes.splash` — explosive tower with area damage
- `path[]` — fixed waypoint route used by enemies
- `enemy` — `{x,y,seg,hp,maxHp,speed,reward,slowUntil,slowFactor,hitUntil,alive}`
- `tower` — `{x,y,type,level,cooldown}`
- `projectile` — `{x,y,target,speed,damage,color,type,splash,slow,slowDuration,born}`

Key functions:
- `resizeCanvas()` — resizes the canvas to the map panel and preserves a 900×560 logical drawing space
- `resetGame()` — restores starting coins, base health, wave state, towers, enemies, projectiles, and UI
- `startWave()` — starts the next wave, sets enemy spawn count/timing, and enters running state
- `togglePause()` — pauses or resumes the wave using Space or the Pause button
- `completeWave()` — awards wave-clear bonus coins, updates best wave, and shows the next-wave overlay
- `gameOver()` — stops the game, records best wave, and shows the game-over overlay
- `waveDef(n)` — returns wave-specific enemy count, health, speed, reward, and spawn interval
- `spawnEnemy()` — creates an enemy at the first path waypoint
- `update(dt, now)` — main simulation step for spawning, enemies, towers, projectiles, particles, and wave completion
- `updateEnemies(dt, now)` — moves enemies along path waypoints and applies base damage on leaks
- `updateTowers(dt, now)` — finds targets in range and fires projectiles based on tower cooldowns
- `updateProjectiles(dt, now)` — moves projectiles toward targets and resolves impacts
- `hitEnemy(enemy, projectile, now)` — applies direct or splash damage on projectile impact
- `applyDamage(enemy, damage, projectile, now)` — damages enemies, applies slow effects, awards coins/kills on defeat
- `damageBase()` — reduces base health, triggers warning glow, and checks game over
- `findTarget(tower, range)` — chooses the furthest-progress enemy inside tower range
- `getTowerStats(tower)` — computes range, damage, cooldown, and splash radius from tower type and level
- `upgradeCost(tower)` — calculates next upgrade cost
- `sellValue(tower)` — calculates partial refund value
- `selectTowerType(type)` — selects a tower card from the shop
- `placeTower(x,y)` — snaps placement to grid, validates tile, spends coins, and creates tower
- `validBuildSpot(x,y)` — prevents building outside map, on the path, or too close to another tower
- `distanceToPath(x,y)` — computes closest distance from a tile to the enemy path
- `findTowerAt(x,y)` — selects existing tower under pointer
- `upgradeSelected()` — upgrades the selected tower up to level 3
- `sellSelected()` — removes selected tower and refunds coins
- `burst(x,y,count,color)` — spawns impact/build/projectile particles
- `draw(dt)` — full render pass for background, path, hover tile, towers, enemies, projectiles, particles, and base
- `drawBackground()` — draws gradient map background and grid
- `drawPath()` — draws the thick readable enemy path
- `drawBuildHover()` — previews valid/invalid placement and selected tower range
- `drawTowers()` — draws placed towers and selected range ring
- `drawRange(x,y,range,color,alpha)` — shared tower range ring renderer
- `drawEnemies()` — draws enemies, hit flashes, slow state, and HP bars
- `drawProjectiles()` — draws glowing tower shots
- `drawParticles()` — draws fading impact particles
- `drawBase()` — draws the base at the path endpoint
- `roundedRect(x,y,w,h,r)` — canvas helper for rounded rectangles
- `updateStats()` — syncs Coins, Wave, Base Health, Kills, Best Wave, and wave preview UI
- `updateBestWave()` — persists highest wave to localStorage
- `updateButtons()` — updates Start/Pause button states and labels
- `updateShop()` — enables/disables tower cards based on coins and selection
- `updateSelectionBox()` — shows selected tower/type stats and upgrade/sell actions
- `showOverlay(emoji,title,sub,buttonText)` — displays start/pause/win/game-over overlay
- `hideOverlay()` — hides overlay while running
- `loop(now)` — capped delta-time RAF loop

Event bindings:
- `towerShop click` — select Basic, Slow, or Splash tower
- `canvas pointerdown` — place tower or select existing tower
- `canvas pointermove` — update build preview hover tile
- `upgradeBtn click` — upgrade selected tower
- `sellBtn click` — sell selected tower
- `startBtn click` — start next wave
- `pauseBtn click` — pause/resume
- `ovBtn click` — start/resume/play again from overlay
- `keydown Space` — pause/resume or start wave
- `resize` — recompute canvas scaling and redraw



---

### `solitaire/index.html` — Solitaire
Self-contained. Layout B (two-column panels: card table left, stats/rules sidebar right).

State machine: `idle | running | paused | won`.

Key variables: `stock[]`, `waste[]`, `foundations {S,H,D,C}`, `tableau[]`, `moves`, `elapsed`, `dealMode`, `preferredMode`, `selected`, `drag`, `best`.

Persistent storage:
- `BEST_KEY = "solitaireBest"`

Key objects:
- `card` — `{id,suit,rank,color,faceUp}`
- `source` — `{zone,pile,index,suit}`
- `target` — `{zone,pile,suit}`
- `selected` — `{source,cards}`
- `drag` — active pointer drag context for card or stack movement

Key functions:
- `createDeck()` — creates and shuffles a 52-card deck
- `newDeal()` — resets the game, deals the Klondike tableau, starts timer, and applies selected draw mode
- `startTimer()` — increments elapsed time while state is running
- `togglePause()` — pauses or resumes the active deal
- `drawFromStock()` — draws 1 or 3 cards, or recycles waste back into stock
- `makeCard(card, source, top, z)` — creates a DOM card element
- `render()` — redraws stock, waste, foundations, tableau, stats, buttons, and selection state
- `getStackOffset()` — computes responsive tableau card overlap so stacks fit the available panel height
- `findCardLocation(cardId)` — finds a card in tableau, waste, or foundations
- `getStackFromSource(source)` — returns the movable card or tableau stack from a source
- `sourceFromElement(el)` — reads card source data from DOM attributes
- `targetFromElement(el)` — reads pile target data from DOM attributes
- `canDragSource(source,cards)` — validates whether a card or stack can be moved
- `isLegalMove(cards,source,target)` — checks Klondike rules for tableau and foundation drops
- `possibleMovesFor(source,cards)` — lists all legal destinations for a selected card or stack
- `moveCards(source,target)` — performs a legal move, reveals uncovered tableau cards, increments moves, and checks win state
- `revealUncovered(source)` — flips the new top tableau card face-up when uncovered
- `checkWin()` — detects all 52 cards in foundations, saves best result, and shows win overlay
- `foundationCount()` — counts completed foundation cards
- `handleCardTap(source,cards)` — auto-moves if one legal move exists, otherwise selects the card/stack
- `handleSlotTap(target)` — attempts a tap-to-drop move for the selected card/stack
- `clearSelection()` — clears selected stack and target highlights
- `highlightLegalTargets(ctx)` — adds cyan glow to legal drop targets
- `beginDrag(e,cardEl)` — starts pointer tracking for drag-and-drop
- `startDragging()` — creates a floating drag layer with cloned cards
- `moveDragLayer(clientX,clientY)` — positions dragged card stack under the pointer
- `endDrag(e)` — resolves drop target or snaps cards back
- `readBest()` — loads best time/move result from localStorage
- `saveBest()` — stores best completed game result
- `formatTime(seconds)` — formats timer as `m:ss`
- `bestLabel()` — formats best result as time / moves
- `updateStats()` — syncs Moves, Time, Foundations, Best, and Mode UI
- `updateButtons()` — enables/disables pause and draw-mode controls based on state
- `updateSelectionBox()` — updates selected card/stack helper text
- `setStatus(text)` — updates the sidebar status pill
- `showOverlay(emoji,title,sub,buttonText)` — displays start/pause/win overlay
- `hideOverlay()` — hides overlay during active play

Event bindings:
- `table pointerdown` — starts drag, draws from stock, selects cards, or handles tap-to-drop targets
- `table pointermove` — moves drag layer and starts drag after movement threshold
- `table pointerup` — completes drag/drop or card tap
- `table pointercancel` — cancels active drag
- `ovBtn click` — new deal or resume
- `newBtn click` — new shuffled deal
- `pauseBtn click` — pause/resume
- `modeBtn click` — toggle Draw 1 / Draw 3 before a deal
- `keydown Space` — pause/resume or start a new deal
- `resize` — recompute tableau spacing and redraw


---

### `sliding-puzzle/index.html` — Sliding Puzzle
Self-contained. Layout C (centered fixed-aspect board with flanking info/control panels).

State machine: `idle | running | won`.

Key variables: `size`, `tiles[]`, `moves`, `elapsed`, `timerId`, `state`, `tileEls`, `emptyEl`.

Persistent storage:
- `BEST_PREFIX = "slidingPuzzleBest"`
- Active keys: `"slidingPuzzleBest3"`, `"slidingPuzzleBest4"`, `"slidingPuzzleBest5"`

Key functions:
- `solvedTiles(n)` — returns the solved tile array for the selected size
- `startPuzzle(newSize)` — resets moves/time, generates a solvable shuffle, starts the timer, and renders the board
- `makeSolvableShuffle(n)` — creates a guaranteed-solvable shuffle by applying random legal moves from the solved state
- `neighbours(index,n)` — returns legal neighbouring indexes for a board cell
- `canSlide(index)` — checks whether a tile is adjacent to the empty cell
- `slideIndex(index)` — swaps the selected tile with the empty cell, increments moves, renders, and checks win state
- `slideByDirection(direction)` — handles Arrow/WASD movement by choosing the neighbouring tile that should slide into the empty space
- `isSolved(arr)` — checks whether the board is in ascending solved order with the empty cell last
- `winGame()` — stops timer, saves best result, triggers solved glow/confetti, and shows win overlay
- `startTimer()` — starts a one-second timer while state is running
- `stopTimer()` — clears the active timer interval
- `render()` — positions all tile DOM elements, updates movable states, renders empty slot, mini preview, and stats
- `renderMiniGrid()` — renders the solved-target preview grid for the active size
- `readBest()` — loads the best moves/time result for the active size from localStorage
- `saveBest()` — saves the current result if it beats the stored result by moves, then time
- `bestText()` — formats the active size best result
- `updateStats()` — syncs Moves, Time, Size, and Best UI
- `formatTime(total)` — formats elapsed seconds as `m:ss`
- `setStatus(text)` — updates the status pill
- `showOverlay(emoji,title,sub,buttonText)` — displays the win/start overlay
- `hideOverlay()` — hides the overlay during play
- `celebrate()` — creates temporary confetti particles after solving
- `init()` — creates the first solvable puzzle and starts the game

Event bindings:
- `shuffleBtn click` — generate a new puzzle with the current size
- `ovBtn click` — shuffle again after win
- `sizeButtons click` — switch between 3×3, 4×4, and 5×5
- `tile click` — slide tile if adjacent to empty space
- `keydown Arrow keys / WASD` — slide a neighbouring tile into the empty space
- `resize` — recompute tile dimensions and rerender board


```md id="r7lc59"
---

### `road-hopper/index.html` — Road Hopper
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | paused | dead | won`.

Key variables: `score`, `best`, `lives`, `timeLeft`, `goalsFilled`, `highestRow`, `player`, `lanes[]`, `objects[]`, `particles[]`, `shakeUntil`, `edgeWarnUntil`, `lastTime`.

Persistent storage:
- `BEST_KEY = "roadHopperBest"`

Key objects:
- `player` — `{col,row,x,y,targetX,targetY,moving,moveTime,moveDuration,safeUntil,onLog}`
- `lane` — `{row,type,direction,speed,objects}`
- `object` — moving vehicle/log hazard `{x,row,w,h,type,speed,direction,color}`
- `goalSlots[]` — fixed top-row goal columns; completed slots are tracked as occupied
- `particles[]` — short-lived burst particles for collisions, goals, and win feedback

Key functions:
- `resizeCanvas()` — sizes the fullscreen canvas to the available viewport and recalculates board scale
- `resetGame()` — resets score, lives, timer, player, goals, lane objects, particles, and state
- `startGame()` — starts a fresh run from idle/dead/won and hides the overlay
- `togglePause()` — switches between running and paused states
- `setupLanes()` — builds the fixed road, river, safe, start, and goal row definitions
- `spawnLaneObjects()` — creates vehicles and logs for each moving lane
- `resetPlayer()` — returns the hopper to the start row with a short safety window
- `hop(dx,dy)` — performs one grid-step move if the player is not already moving
- `completeGoal(slotIndex)` — fills a goal slot, awards points, checks win condition, and resets the player
- `loseLife(reason)` — handles collision/water/offscreen failures, decrements lives, shakes screen, and either respawns or ends game
- `winGame()` — awards remaining-time bonus, saves best score, and shows the victory overlay
- `gameOver(reason)` — saves best score and shows the game-over overlay
- `update(dt,now)` — main game simulation: timer, player interpolation, lane movement, collisions, log carrying, hazards, and particles
- `updateObjects(dt)` — moves vehicles/logs smoothly across lanes and wraps them around screen edges
- `updatePlayer(dt)` — interpolates player movement between grid cells and applies log carry when on river rows
- `checkCurrentRow(now)` — resolves road collision, river log safety, offscreen log carry, goal entry, and safe rows
- `checkVehicleCollision(obj)` — detects overlap between the player and road hazards
- `findLogUnderPlayer()` — returns the active log supporting the player on river rows
- `rowKind(row)` — identifies whether a grid row is road, river, safe, start, or goal
- `saveBest()` — persists the best score to localStorage
- `addScore(points)` — updates score and best display when needed
- `burst(x,y,count,color)` — creates particle bursts for collision and goal feedback
- `updateParticles(dt)` — moves and fades particles
- `draw()` — full render pass for background, board rows, hazards, player, particles, UI overlays, and warning effects
- `drawBackground()` — draws the ambient dark gradient and subtle grid
- `drawRows()` — draws start, safe, road, river, and goal rows with distinct styling
- `drawGoals()` — draws empty and completed goal slots
- `drawLaneObjects()` — draws cars, trucks, and logs with smooth positions
- `drawPlayer()` — draws the hopper with movement squash/stretch and invulnerability flash
- `drawParticles()` — draws fading collision/goal particles
- `drawWarningEffects()` — draws screen shake and red edge warning glow after damage or low time
- `gridToPixel(col,row)` — converts logical grid coordinates to canvas pixel positions
- `pixelToGrid(x,y)` — helper for mapping pointer/touch locations if needed
- `clamp(value,min,max)` — shared bounds helper
- `formatTime(seconds)` — formats remaining time for the stat UI
- `updateStats()` — syncs Score, Best, Goals, Lives, and Time
- `setStatus(text)` — updates the status pill
- `showOverlay(emoji,title,sub,buttonText)` — displays start, pause, win, and game-over overlay
- `hideOverlay()` — hides overlay while running
- `loop(now)` — capped delta-time `requestAnimationFrame` game loop

Event bindings:
- `keydown` — Arrow keys / WASD hop movement; Space start/pause/resume
- `touchstart` — records swipe start point
- `touchend` — converts swipe into one grid-step hop
- `upBtn/downBtn/leftBtn/rightBtn click` — mobile direction pad movement
- `ovBtn click` — start, resume, or play again
- `pauseBtn click` — pause/resume
- `newBtn click` — restart run
- `resize` — recompute canvas size and redraw
```



---

### `reversi/index.html` — Reversi
Self-contained. Layout B (two-column panels: main board left, sidebar right).

State machine: `running | ended`.

Key variables: `board`, `currentPlayer`, `validMoves[]`, `history[]`, `lastPlaced`, `lastFlipped[]`, `mode`, `aiThinking`, `rounds`, `bestMargin`.

Persistent storage:
- `BEST_KEY = "reversiBestMargin"`

Key constants:
- `BLACK = 1`
- `WHITE = 2`
- `EMPTY = 0`
- `SIZE = 8`
- `directions` — 8 directional offsets used for capture scanning

Key functions:
- `newBoard()` — creates the standard opening board with four centre discs
- `newRound()` — resets board, turn, history, animations, state, and modal
- `cloneBoard(src)` — deep-copies the board array for undo snapshots
- `snapshot()` — stores board, current player, animation markers, and state
- `restore(snap)` — restores a previous snapshot for undo
- `opponent(player)` — returns the opposite player colour
- `playerName(player)` — formats player colour as `Black` or `White`
- `inBounds(r,c)` — checks whether a board coordinate is valid
- `getFlipsForMove(r,c,player,grid)` — scans 8 directions and returns all captured discs for a move
- `getValidMoves(player,grid)` — returns all legal moves for a player
- `placeDisc(r,c,isAiMove)` — validates and applies a move, flips captured discs, stores undo history, and advances turn
- `refreshTurn(afterMove)` — recalculates valid moves, handles automatic passes, renders board, and triggers AI if needed
- `makeAiMove()` — selects an Easy AI move using corner preference, then maximum flips
- `isCorner(r,c)` — detects corner cells
- `scorePosition(r,c)` — gives positional priority to corners and edges for AI sorting
- `finishRound()` — ends the round, updates session wins/draws, saves best margin, and shows result modal
- `countDiscs()` — counts black and white discs on the board
- `render()` — redraws all 64 cells, discs, valid highlights, stats, turn pill, undo state, and best line
- `cellLabel(r,c)` — creates accessible ARIA labels for board cells
- `undo()` — restores the most recent board snapshot
- `setMode(nextMode)` — switches between Two Player and Easy AI modes
- `showEndModal(emoji,title,sub)` — displays the round result modal
- `hideEndModal()` — hides the modal
- `setStatus(text)` — updates sidebar status pill

Event bindings:
- `board click` — place disc on highlighted legal cell
- `newBtn click` — start a new round
- `modalBtn click` — start a new round from result modal
- `undoBtn click` — undo last move
- `twoPlayerBtn click` — enable local two-player mode
- `aiBtn click` — enable Easy AI mode
- `keydown N` — start a new round
- `keydown Ctrl/Cmd + Z` — undo last move


---

### `maze-chase/index.html` — Maze Chase
Self-contained. Layout A (fullscreen canvas).

State machine: `idle | running | paused | caught | dead | won`.

Key variables: `grid`, `player {x,y,dir,nextDir,speed,mouth}`, `enemies[] {name,x,y,spawnX,spawnY,dir,color,corner,delay}`, `score`, `best`, `lives`, `orbsLeft`, `frightenedTimer`, `modeClock`, `enemyCombo`, `trail[]`.

Key functions:
- `resize()` — high-DPI canvas setup; computes responsive tile size and centred board placement
- `resetGame()` — rebuilds maze grid, clears spawn tile, resets player/enemies/lives/score, counts collectables
- `loop(ts)` — delta-time RAF loop capped at 50ms; updates and draws only while running
- `update(dt)` — advances timers, player movement, enemy AI, collisions, HUD, and mode state
- `setDirection(name)` — queues keyboard/swipe direction input; starts from idle on first movement
- `updatePlayer(dt)` — tile-centre turn handling, queued direction adoption, movement, orb collection, trail updates
- `collectAt(x,y)` — handles small orb and power core scoring; triggers frightened mode and win detection
- `currentMode()` — returns `Chase`, `Scatter`, or `Frightened` based on timers
- `chooseEnemyDir(enemy,index)` — readable enemy AI; picks target-seeking direction in chase/scatter and evasive direction in frightened mode
- `updateEnemies(dt)` — staggered enemy release, intersection decisions, speed changes, and tunnel wrapping
- `checkCollisions()` — resolves dangerous catches versus vulnerable enemy captures
- `loseLife()` — decrements lives, resets actors, shows caught overlay or ends the game
- `drawMaze()` — renders wall blocks, pulsing orbs, glowing power cores, and tunnel shimmer
- `drawPlayer()` — renders animated yellow player with mouth direction and motion trail
- `drawEnemy(enemy)` — renders glowing ghost-style enemies with vulnerable colour swap
- `showOverlay(...)` / `hideOverlay()` — shared fullscreen start/pause/end overlay controls


---

### `lights-out/index.html` — Lights Out
Self-contained. Layout C (centered board with flanking info panels).

State machine: implicit puzzle state using `solved` boolean.

Key variables: `size`, `board[]`, `solution[]`, `playerPresses[]`, `moves`, `par`, `level`, `streak`, `best`, `hintIndex`.

Key functions:
- `generatePuzzle(advanceLevel)` — creates a solvable puzzle by applying random valid toggles from an all-off board; resets board state and HUD
- `toggleInArray(arr,row,col)` — toggles a selected tile plus its orthogonal neighbours inside any board-like array
- `renderBoard(pulsed)` — rebuilds the CSS grid, applies `on`, `hint`, and `pulse` classes, and attaches click handlers
- `pressCell(position)` — handles player input, toggles board cells, tracks player presses, increments moves, clears hints, and checks for win
- `showHint()` — computes `solution XOR playerPresses` and highlights one remaining useful tile
- `handleWin()` — locks the board, updates streak/best score, checks Perfect status, and opens the win modal
- `isSolved()` — returns true when all board entries are off
- `countLit()` — counts currently lit cells for status feedback
- `updateHud()` — syncs Moves, Par, Level, Best, and Streak counters
- `updateSizeButtons()` — keeps grid-size controls visually in sync with the selected difficulty


---

### `checkers/index.html` — Checkers
Self-contained. Layout B (two-column board + sidebar).

State machine: implicit turn-based state using `gameOver`, `turn`, `selected`, and `chainLock`.

Key variables: `board[8][8]`, `turn`, `selected`, `legalMoves[]`, `forcedCapture`, `chainLock`, `captures`, `moves`, `redWins`, `blueWins`, `bestMoves`, `lastKing`, `lastCapture`.

Key functions:
- `resetRound()` — builds a fresh 8×8 board, resets turn state, counters, highlights, and modal
- `newBoard()` — places 12 blue and 12 red pieces on playable dark squares
- `directionsFor(piece)` — returns allowed row directions for regular pieces or kings
- `getSimpleMoves(row,col)` — returns legal non-capturing diagonal moves for one piece
- `getCaptureMoves(row,col)` — returns legal jump captures for one piece
- `playerHasCapture(player)` — checks whether a player has any available capture
- `getLegalMovesForPiece(row,col)` — applies forced-capture and multi-jump rules for selected piece movement
- `getAllLegalMoves(player)` — gathers all legal moves for game-over detection
- `selectPiece(row,col)` — selects a current-player piece and highlights destinations
- `performMove(move)` — moves pieces, removes captured pieces, handles king promotion, and starts/continues multi-jump chains
- `endTurn()` — checks for winner, swaps active player, and refreshes UI state
- `checkForWinner()` — detects no-pieces or no-legal-moves win conditions
- `finishRound(winner,reason)` — updates wins, saves fastest win to `checkersBestMoves`, and shows win modal
- `renderBoard()` — rebuilds the board DOM with piece, selected, legal, capture, must-capture, crown, and capture-burst classes
- `updateHud()` — syncs pieces, turn, captures, moves, wins, fastest win, and forced-capture toggle state