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

---

## Tetris (`/tetris/`)

### Gameplay
- Classic single-player: clear horizontal lines by filling a 10×20 grid with falling tetrominoes
- 7-bag randomiser ensures every piece appears once before any repeats
- Score, level, lines cleared, and best score persist via `"tetrisBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| ← → | Move piece left / right |
| ↓ | Soft drop (faster fall) |
| ↑ | Rotate clockwise |
| Z | Rotate counter-clockwise |
| Space | Hard drop (instant) |
| P | Pause / resume |

### Mechanics
- SRS rotation with wall kicks (up to 3 kick offsets tried per rotation)
- Ghost piece shows where the active piece will land
- Lock delay: 500ms after landing; resets on any successful move/rotate
- Speed: starts at 800ms per row, decreases by 60ms per level (floor 100ms)
- Lines → Level: 10 lines per level

### Score model
| Action | Points |
|---|---|
| 1 line | 100 × level |
| 2 lines | 300 × level |
| 3 lines | 500 × level |
| 4 lines (Tetris) | 800 × level |
| Soft drop (per row) | 1 |
| Hard drop (per row) | 2 |

### Visual feedback
- Each tetromino has its own colour; ghost piece is a faded translucent outline
- Line-clear: row flashes white then disappears with a translate-up animation
- Level-up: sidebar level counter pulses with a brief scale animation

---

## Pong (`/pong/`)

### Gameplay
- Single-player vs AI canvas game; player controls the left paddle with the mouse/touch
- AI controls the right paddle, tracking the ball at 75% ball speed
- First to 7 points wins; best win streak persists via `"pongBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Mouse move (vertical) | Move left paddle |
| Touch drag | Move left paddle |
| Click / tap | Start or restart from overlay |

### Physics
- Ball speed starts at 5 px/frame, increases 5% on each paddle hit
- Ball angle reflects off top/bottom walls; vertical component reversed
- Paddle hit angle: deflection depends on hit position relative to paddle centre (±45°)
- AI paddle capped at `ball.speed × 0.75` per frame to remain beatable

### Visual feedback
- Ball trail: last 5 positions drawn at decreasing opacity
- Serve indicator: brief "3… 2… 1…" countdown drawn on canvas after a point
- Win streak counter shown top-centre; pulses on new best
- Score drawn canvas top-left (player) and top-right (AI)

---

## Connect Four (`/connect-four/`)

### Gameplay
- Two-player (local alternating turns) on a 7×6 grid
- Drop a disc into any column; it falls to the lowest empty row
- Win by connecting four discs of your colour in a row, column, or diagonal
- Session scores only (no localStorage persistence)

### Controls
| Input | Action |
|---|---|
| Click column / hover arrow | Drop disc in that column |
| Tap column | Drop disc (mobile) |
| "New Game" button | Reset board and scores |

### Visual feedback
- Disc drop: CSS `translateY` fall animation from top of column (200ms ease-in)
- Win highlight: winning four cells pulse with a bright border glow
- Column hover: column header arrow indicator appears
- Turn indicator sidebar shows whose turn it is with the current player colour

---

## Whack-a-Mole (`/whack-a-mole/`)

### Gameplay
- 30-second countdown; moles pop up in random holes in a 3×3 grid
- Click or tap a mole before it retreats to score points
- Golden moles (rare) are worth +3 points; normal moles +1
- Best score persists via `"whackBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click mole | Score a hit |
| Tap mole | Score a hit (mobile) |
| "Play" overlay button | Start game |

### Mechanics
- Mole visibility window: 800–1200ms (random); retreats if not clicked
- At t=15s difficulty ramps: moles appear and disappear 30% faster
- Floating score text (+1 / +3) animates upward from the hole on each hit
- Miss clicks (clicking a hole without a mole) have no penalty

### Visual feedback
- Moles rise and fall via CSS `translateY` transition
- Timer bar depletes across the top of the game area
- Golden mole: yellow colour variant; regular mole: brown
- Game-over overlay shows final score and best

---

## Simon (`/simon/`)

### Gameplay
- Single-player memory sequence game with four coloured quadrant buttons
- Watch the pattern flash, then repeat it in the correct order
- Pattern grows by one each successful round; wrong press ends the game
- Best round persists via `"simonBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click quadrant | Press that colour button |
| Tap quadrant | Press that colour button (mobile) |

### Mechanics
- Colours: Blue (top-left), Red (top-right), Yellow (bottom-left), Green (bottom-right)
- Audio tones via Web Audio API: Blue 330 Hz, Red 277 Hz, Yellow 220 Hz, Green 165 Hz
- Speed tiers: rounds 1–4 → 600ms flash; 5–9 → 450ms; 10+ → 300ms
- Tone plays for 350ms on flash; 150ms on player press

### Visual feedback
- Active quadrant brightens with a white overlay tint (0.35 opacity) and scale 1.05
- Wrong press: all quadrants flash red then fade, game-over overlay appears
- Centre hub shows round number during sequence and "YOUR TURN" during input phase
- Sequence plays automatically with 200ms gaps between flashes

---

## Hangman (`/hangman/`)

### Gameplay
- Guess the hidden word one letter at a time; six wrong guesses trigger a full gallows
- 60 bundled words across 5 categories: Animals, Countries, Sports, Foods, Tech
- Win/loss streak persists via `"hangmanStreak"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click letter button (A–Z) | Guess that letter |
| Keyboard letter key | Guess that letter |
| "New Game" button | Start fresh word |

### Mechanics
- Wrong guesses: after 6 the word is revealed and game-over state shown
- Category shown above the letter blanks
- Previously guessed letters are disabled (greyed out)
- Win: remaining blanks fill in with a green-tint animation

### Visual feedback
- Inline SVG gallows: 6 body parts (head → torso → arms × 2 → legs × 2) drawn progressively using `stroke-dashoffset` reveal animation
- Wrong letters shown in red below the gallows
- Win streak counter updates in the sidebar; a pulse animation plays on new best
- Letter buttons turn red (wrong) or green (correct) when guessed

---

## Asteroids (`/asteroids/`)

### Gameplay
- Retro vector-style arcade: navigate a ship through waves of asteroids
- Shoot asteroids to split them; large → medium → small → destroyed
- Best score persists via `"asteroidsBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| ← → (or A/D) | Rotate ship |
| ↑ (or W) | Thrust forward |
| Space | Fire bullet |
| Mobile buttons | On-screen ◄ ▲ ► 🔥 buttons |

### Physics & Mechanics
- Ship: inertia-based movement; thrust applies acceleration; friction 0.99 per frame
- Screen wrap: objects exit one edge and re-enter the opposite edge
- Asteroids: 3 sizes (large r=45, medium r=25, small r=12); random polygon silhouettes
- Bullet speed: 8 px/frame; lifetime 60 frames
- New wave when all asteroids are cleared; next wave adds 1 extra large asteroid

### Score model
| Target | Points |
|---|---|
| Large asteroid | 20 |
| Medium asteroid | 50 |
| Small asteroid | 100 |

### Visual feedback
- All stroked paths — no fills; retro vector aesthetic
- Thruster: particle trail emitted when thrusting (fades over 30 frames)
- Explosion: 8 radial line-segment particles on asteroid destruction
- Ship: briefly invincible with a blinking effect after death (3 lives total)
- HUD: lives (small ship icons), score, best — drawn on canvas top corners

---

## Sudoku (`/sudoku/`)

### Gameplay
- Fill the 9×9 grid so every row, column, and 3×3 box contains digits 1–9
- Three difficulty levels (Easy / Medium / Hard) with pre-authored puzzles
- Timed challenge; best time per difficulty persists via localStorage keys
  `"sudokuEasyBest"`, `"sudokuMedBest"`, `"sudokuHardBest"`

### Controls
| Input | Action |
|---|---|
| Click / tap cell | Select cell |
| 1–9 keys | Enter digit (or add note in notes mode) |
| Backspace / Delete | Clear selected cell |
| Arrow keys | Move selection to adjacent cell |
| On-screen number pad | 1–9 + Erase + Notes toggle |
| Difficulty pills | Switch difficulty and load new puzzle |
| "New Puzzle" button | Load fresh puzzle (resets timer) |
| "Hint" button | Reveal one cell (+30s penalty) |

### Mechanics
- Notes mode: digit keys add/remove small candidate numbers in a 3×3 micro-grid inside the cell
- Mistake highlighting: cells conflicting with the solution are outlined in red
- Hint penalty: +30 seconds added to elapsed time; "+0:30" flashes on the timer for 1.5s
- Timer starts on the first digit entry

### Visual feedback
- Selected cell: `--primary` border glow
- Same-number highlight: cells with the same digit as the selected cell get a soft background tint
- Peer highlight: row, column, and 3×3 box peers get a faint background
- Given cells: slightly different background, bold font, non-editable
- Win: cells fill sequentially left-to-right with a green shimmer wave over 800ms

---

## Dino Run (`/dino-run/`)

### Gameplay
- Endless runner: control a pixel-art dinosaur dodging cacti and pterodactyls
- Game speed increases continuously; no win condition — survive as long as possible
- Best score persists via `"dinoBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Space / ↑ | Jump (only on ground) |
| ↓ / S | Duck (hold to stay ducked) |
| Space / click canvas | Start or retry from overlay |
| Tap canvas | Jump (mobile) |
| Touch hold (bottom half) | Duck (mobile) |

### Physics & Mechanics
- Jump: upward velocity impulse; gravity pulls dino back to ground line; no double-jump
- Duck: lowers hitbox to ~50% standing height while key held
- Speed ramp: starts 6 px/frame, increases 0.001/frame, capped at 14 px/frame
- Obstacle types: 3 cactus variants (small single, tall single, double cluster); pterodactyls at 3 heights (low / mid / high) spawn after score 200
- Day/night cycle: canvas background alternates every 700 points over a 200-frame fade

### Visual feedback
- All drawn on canvas — geometric pixel-art inspired shapes, no image assets
- Dino legs alternate between 2 positions every 8 frames; held still on jump/duck
- Pterodactyl: 2 wing frames alternating every 12 frames
- Ground: horizontal line with occasional small pebble rectangles
- Score milestone: white flash every 100 points

---

## Bubble Shooter (`/bubble-shooter/`)

### Gameplay
- Aim and fire coloured bubbles from the bottom-centre to pop clusters of 3+ same-colour bubbles
- Clear all bubbles from the board to advance levels; grid descends if too many shots are wasted
- Best score persists via `"bubbleBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Mouse move | Aim shooter (angle tracks cursor) |
| Click | Fire bubble |
| Touch drag | Aim shooter |
| Touch release | Fire bubble |

### Mechanics
- Hex offset grid (odd rows shifted right by half a bubble radius); 8 starting rows
- 5 bubble colours: Blue, Cyan, Red, Yellow, Green
- Aim guide: dotted line showing projected path including one wall reflection; clamped ±80° from vertical
- Fired bubble snaps to nearest empty hex cell on contact
- BFS cluster detection: pops clusters of 3+ same-colour connected bubbles
- Floating bubble check: BFS from ceiling; any bubble no longer connected to top wall falls off for bonus points
- Ceiling descent: every 10 shots without a pop, entire grid moves down one row

### Score model
| Action | Points |
|---|---|
| Popped bubble | 10 × combo multiplier |
| Floating bubble dropped | 20 |
| Combo: 6–9 bubbles | ×2 multiplier |
| Combo: 10+ bubbles | ×3 multiplier |

### Visual feedback
- Bubbles: radial gradient fill + white specular highlight spot for a 3D glassy appearance
- Pop animation: bubble expands slightly then bursts into 6–8 radial spark particles (fade over 300ms)
- Floating-drop animation: freed bubbles fall off-screen with gravity acceleration
- Danger line: red glow near the bottom; flashes brighter when any row reaches it
- Level clear: full-canvas white flash (200ms) then level-complete overlay

---

## Alien Invaders (`/alien-invaders/`)

### Gameplay
- Control a laser cannon at the bottom of the screen and destroy descending alien waves
- Clear every alien in the current wave to advance to a harder wave
- Game ends if enemy fire hits the player with no lives remaining, aliens reach the defense line, or the player loses all lives
- Best score persists via `"alienInvadersBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Arrow Left / Arrow Right | Move cannon left or right |
| A / D | Move cannon left or right |
| Space | Start game / fire / resume from idle or game over |
| P / Escape | Pause or resume |
| New button | Restart from wave 1 |
| Pause button | Pause or resume |
| Shields button | Toggle shield blocks before starting or after game over |
| Tap left/right side | Move on mobile |
| Tap fire button | Fire on mobile / start or resume when not running |

### Mechanics
- Fullscreen canvas action game using a `requestAnimationFrame` loop
- State machine: `idle | running | paused | dead`
- Alien formation moves horizontally as a group and drops downward when it hits screen edges
- Alien speed increases by wave number and also rises as fewer aliens remain alive
- Enemy shots are fired by the lowest alien in randomly selected columns
- Player has 3 lives and receives a short invulnerability flash after taking damage
- Optional shield blocks sit between the aliens and player; each block has 3 HP
- Player and enemy bullets can damage shields
- Wave transition delay prevents instant shooting while a new wave banner is showing
- Canvas resizes responsively using device pixel ratio scaling
- Mobile controls are shown on smaller screens while preserving no-scroll gameplay

### Score model
| Action | Points |
|---|---|
| Destroy alien | Alien row value + wave bonus |
| Clear wave quickly | Time-based wave clear bonus |
| Best score | Saved when current score exceeds `"alienInvadersBest"` |

### Visual feedback
- Player shots use primary blue glow
- Enemy shots use cyan or red warning glow
- Destroyed aliens burst into small particles
- Shield impacts create cyan particle bursts
- Player flashes during invulnerability after losing a life
- Defense line is drawn above the cannon as a red dashed warning line
- Wave banner pulses between rounds
- Starfield and subtle moving grid create a sci-fi background
- Start, pause, and game-over states use a fullscreen glass overlay


---

## Tower Defense (`/tower-defense/`)

### Gameplay
- Build towers beside a winding path and stop enemies before they reach the base
- Survive all 10 planned waves to win
- Game ends when base health reaches zero
- Best wave persists via `"towerDefenseBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap tower card | Select tower type |
| Click / tap valid build tile | Place selected tower |
| Click / tap existing tower | Select tower for upgrade or sell actions |
| Start Wave button | Begin the next wave |
| Upgrade button | Upgrade selected tower up to level 3 |
| Sell button | Sell selected tower for partial coin refund |
| Space | Pause / resume |

### Mechanics
- One fixed readable map with a winding enemy path
- 10 waves with increasing enemy health, speed, and count
- Three tower types: Basic, Slow, and Splash
- Basic Tower: balanced single-target damage and reliable fire rate
- Slow Tower: lower damage but applies a temporary slow effect to enemies
- Splash Tower: slower projectile that damages clustered enemies around impact
- Towers can only be placed on valid ground tiles away from the path
- Path-blocking prevention stops towers from being placed on or too close to the enemy route
- Defeated enemies reward coins
- Selected towers show range rings and upgrade/sell information
- Towers can be upgraded up to level 3, improving range, damage, and fire timing
- Mobile layout collapses below 980px and allows vertical scrolling

### Score model
| Action | Reward |
|---|---|
| Defeat enemy | Coins based on wave difficulty |
| Clear wave | Bonus coins |
| Reach new wave | Updates best wave if higher than previous best |
| Survive all waves | Victory state after wave 10 |

### Visual feedback
- Tower range rings appear when placing or selecting towers
- Projectiles use primary blue/cyan styled glows
- Enemy hit flashes use cyan feedback
- Splash impacts create particle bursts
- Base damage triggers a red screen-edge warning glow
- Enemy health bars show remaining HP
- Path uses a clear thick route with cyan dashed guide styling
- Start, pause, victory, and game-over states use an in-map glass overlay


---

## Solitaire (`/solitaire/`)

### Gameplay
- Play a clean Klondike solitaire board with a standard 52-card deck
- Move all cards to the four foundations in ascending suit order from Ace to King
- Tableau cards stack in descending order with alternating colours
- Face-down tableau cards reveal automatically when uncovered
- Empty tableau spaces accept only Kings or stacks starting with a King
- Best result persists via `"solitaireBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Drag card / stack | Move cards between tableau, waste, and foundations |
| Click / tap card | Auto-move if exactly one legal move exists |
| Tap selected card again | Clear selected card / stack |
| Tap card then tap target | Mobile tap-to-select and tap-to-drop movement |
| Click / tap stock | Draw card/cards into waste |
| New Deal button | Restart with a shuffled deck |
| Draw Mode button | Toggle Draw 1 / Draw 3 before a new deal |
| Space | Pause / resume |

### Mechanics
- Standard Klondike setup with 7 tableau columns
- Stock and waste piles support Draw 1 or Draw 3 mode
- Waste recycles back into the stock when the stock is empty
- Foundation piles are suit-locked and build upward from Ace to King
- Tableau piles build downward using alternating red/black colours
- Legal drop targets glow cyan during drag or tap selection
- Invalid drops snap back without changing the board
- Timer starts on each new deal and pauses when the game is paused
- Win condition triggers when all 52 cards reach the foundations
- Mobile layout collapses below 980px and allows vertical scrolling

### Score model
| Action | Tracking |
|---|---|
| Successful card move | +1 move |
| Stock draw | +1 move |
| Waste recycle | +1 move |
| Completed game | Saves best time and moves |
| Best result | Stored as time / moves in `"solitaireBest"` |

### Visual feedback
- Draggable cards lift with shadow while moving
- Selected cards glow cyan for tap-to-drop play
- Legal drop targets glow cyan
- Invalid drops show a status message and snap back
- Completed foundations shimmer
- Face-down cards use a blue patterned card back
- Pause and win states use a glass overlay


---

## Sliding Puzzle (`/sliding-puzzle/`)

### Gameplay
- Slide numbered tiles into ascending order with the empty space in the final cell
- Complete the solved board to win
- Choose between 3×3, 4×4, and 5×5 puzzle sizes
- Best moves/time persist per size via `"slidingPuzzleBest3"`, `"slidingPuzzleBest4"`, and `"slidingPuzzleBest5"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap adjacent tile | Slide tile into the empty space |
| Arrow keys | Slide a neighbouring tile into the empty space |
| WASD | Slide a neighbouring tile into the empty space |
| Shuffle button | Generate a new solvable puzzle |
| 3×3 / 4×4 / 5×5 buttons | Switch puzzle size and start a new shuffle |

### Mechanics
- Board stores numbered tiles plus one empty cell
- Puzzle sizes supported: 3×3, 4×4, and 5×5
- Shuffles are generated by applying many random legal moves from the solved state
- Shuffle generation guarantees the puzzle is solvable
- Shuffle generation repeats if the result accidentally returns to the solved state
- Each successful slide increments the move counter
- Timer starts with each new shuffled puzzle
- Win condition checks whether all numbered tiles are ascending and the empty cell is last
- Per-size best result compares lower move count first, then faster time
- Mobile layout collapses below 760px and allows vertical scrolling

### Score model
| Action | Tracking |
|---|---|
| Successful tile slide | +1 move |
| New shuffle | Resets moves and timer |
| Complete puzzle | Saves best moves/time for the active size |
| Best result | Stored separately for 3×3, 4×4, and 5×5 |

### Visual feedback
- Movable tiles glow and lift on hover
- Adjacent legal tiles receive a subtle cyan hint outline
- Tiles animate smoothly into the empty space
- Empty cell is shown with a dashed recessed slot
- Solved board glows with a cyan pulse
- Final move triggers a short confetti celebration
- Win state uses a glass overlay showing moves and time


---

## Road Hopper (`/road-hopper/`)

### Gameplay
- Hop from the bottom of the board to the safe goal spaces at the top
- Fill all 5 goal slots before the timer runs out to win
- Game ends if the hopper is hit by traffic, falls into water, rides offscreen on a log, runs out of lives, or runs out of time
- Best score persists via `"roadHopperBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Arrow keys | Hop one tile in a direction |
| WASD | Hop one tile in a direction |
| Space | Start / pause / resume |
| Swipe | Hop in swipe direction on mobile |
| Mobile direction pad | Hop one tile in a direction |

### Mechanics
- Fullscreen canvas arcade game with no page scroll
- Fixed 11×13 logical grid keeps player movement crisp and tile-based
- Vehicles and logs render smoothly between grid cells
- Road lanes contain cars and trucks moving in alternating directions
- River lanes contain moving logs that carry the player horizontally
- Missing a log in a river lane causes the player to fall into water
- Staying on a log too long can carry the player offscreen
- Hazard speed increases gradually over time and as goal slots are completed
- Each completed goal slot becomes occupied and cannot be reused
- Player gets a short safety window after respawning
- Timer counts down for the whole run
- Mobile supports swipe input and on-screen directional buttons

### Score model
| Action | Points |
|---|---|
| First forward hop into a higher row | 10 |
| Reach a goal slot | 250 + goal progress bonus |
| Win the game | Remaining time bonus |
| Best score | Saved when current score exceeds `"roadHopperBest"` |

### Visual feedback
- Safe rows and goal slots use cyan/green glow styling
- Danger road lanes flash subtly with red warning tint
- Collisions trigger red particle bursts and screen shake
- River logs bob slightly while moving
- Completed goals show filled frog icons
- Low time and collision states trigger a red screen-edge warning glow
- Start, pause, win, and game-over states use a fullscreen glass overlay



---

## Reversi (`/reversi/`)

### Gameplay
- Play a polished local Reversi / Othello-style strategy board
- Place discs to capture straight lines of opponent discs in any of 8 directions
- Finish with more discs than the opponent when the board is full or neither player has a legal move
- Play in Two Player mode or switch to Easy AI
- Best winning margin persists via `"reversiBestMargin"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap highlighted cell | Place disc |
| New Round button | Reset board |
| Undo button | Revert the last move |
| Two Player button | Switch to local two-player mode |
| Easy AI button | Switch to solo mode against simple AI |
| N key | Start a new round |
| Ctrl / Cmd + Z | Undo last move |

### Mechanics
- Standard 8×8 Reversi board
- Black starts with the standard four-disc centre opening
- A move is legal only if it flips at least one opponent disc
- Legal moves are highlighted with cyan glow
- Captures are checked in all 8 directions from the placed disc
- Captured discs flip to the current player colour
- Players pass automatically when they have no legal move
- Round ends when the board is full or neither player has a legal move
- Corners receive subtle priority highlights
- Easy AI prefers corner moves, then picks the move that flips the most discs
- Undo restores the previous board snapshot
- Mobile layout collapses below 900px and allows vertical scrolling

### Score model
| Action | Tracking |
|---|---|
| Disc placed | Board disc counts update |
| Disc flipped | Black / White totals update |
| Round won | Session round score updates |
| Draw | Session draw count updates |
| Best margin | Stored as `"reversiBestMargin"` |

### Visual feedback
- Valid cells glow with accent-dim cyan styling
- Newly placed discs pop into the board
- Flipped discs rotate with a short flip animation
- Corners show subtle dashed priority markers
- Current turn pill displays the active colour
- Winning colour gets a final board glow
- Round result appears in a glass modal


---

## Maze Chase (`/maze-chase/`)

### Gameplay
- Navigate a neon maze, collect every small orb, and avoid roaming enemy chasers
- Grab power cores to temporarily make enemies vulnerable and score combo points by catching them
- Clear every orb from the maze to win; lose a life when caught by a dangerous enemy
- Best score persists via `"mazeChaseBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Arrow keys / WASD | Choose movement direction |
| Space | Start / pause / resume |
| Swipe | Choose movement direction on mobile |

### Mechanics
- Original 21 × 17 maze layout designed for this project rather than copying a commercial maze
- Real-time tile-based movement with queued turns at tile centres
- Horizontal tunnel row wraps the player and enemies from one side of the maze to the other
- 3 enemy chasers with readable AI and staggered release timing
- Enemy modes alternate between chase and scatter; power cores trigger frightened mode
- Chase targeting varies per enemy: direct player target, ahead-of-player target, and mirrored target
- Frightened enemies slow down, avoid the player, and can be caught for combo points
- Player loses one life on contact with a dangerous enemy and resets to the starting tile

### Score model
| Action | Points |
|---|---|
| Small orb collected | 10 |
| Power core collected | 50 |
| First vulnerable enemy caught | 200 |
| Consecutive vulnerable enemies caught | 400 / 800 / 1600 |
| Maze clear life bonus | 250 × remaining lives |

### Visual feedback
- Canvas-based neon maze with glowing blue wall blocks and subtle grid ambience
- Small orbs pulse softly; power cores glow cyan with a larger radial aura
- Enemy chasers glow red/orange/pink when dangerous and cyan when vulnerable
- Tunnel entrances shimmer with animated cyan dashed lines
- Player has an animated mouth direction and a short yellow motion trail
- Start, pause, caught, game-over, and win states use a fullscreen glass overlay



---

## Lights Out (`/lights-out/`)

### Gameplay
- Toggle glowing tiles until every light on the board is off
- Each move toggles the selected tile plus its orthogonal neighbours
- Choose between multiple grid sizes for different difficulty levels
- Every puzzle is generated from valid toggles starting from an all-off board, so each puzzle is solvable
- Best move count persists via `"lightsOutBest"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap light tile | Toggle that tile and its orthogonal neighbours |
| New Puzzle button | Generate another solvable puzzle |
| Hint button | Mark one useful next tile |
| Grid Size buttons | Choose puzzle size / difficulty |

### Mechanics
- Turn-based single-player logic puzzle
- Grid sizes: 3×3, 4×4, 5×5, and 6×6
- Solvable puzzle generation: starts with an all-off board, applies a random set of valid toggles, and stores that toggle set as a known solution path
- Move counter increments once per clicked/tapped tile
- Par is based on the number of generated solution toggles for that puzzle
- Hint system compares the original generated solution against the player’s pressed tiles and highlights one remaining useful tile
- Level increases when generating the next puzzle
- Streak increases after each solved puzzle and resets when an unfinished puzzle is skipped

### Score model
| Tracker | Behaviour |
|---|---|
| Moves | Number of player toggles in the current puzzle |
| Par | Target move count for the generated puzzle |
| Level | Current puzzle number for the selected grid size |
| Best | Lowest solved move count saved in localStorage |
| Streak | Consecutive solved puzzles without skipping an unfinished board |
| Perfect badge | Awarded when solved in moves ≤ par |

### Visual feedback
- Lit cells glow cyan with a bright radial highlight
- Toggled cells emit a quick pulse animation
- Hint tile gets a yellow outline and soft glow
- Solved board fades into a calmer dark state
- Win modal displays final move count, par, streak, and Perfect badge when earned


---

## Checkers (`/checkers/`)

### Gameplay
- Local two-player checkers game with red and blue pieces
- Capture all opponent pieces or block the opponent so they have no legal moves
- Select a piece to highlight legal diagonal moves and captures
- Reach the far row to promote a piece into a king
- Fastest win persists via `"checkersBestMoves"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap piece | Select that piece |
| Click / tap highlighted square | Move or capture |
| New Round button | Reset the board |
| Forced Captures toggle | Turn mandatory captures on/off |

### Mechanics
- Standard 8×8 checkerboard with playable dark squares
- Red starts from the bottom and moves upward; blue starts from the top and moves downward
- Regular pieces move diagonally forward by one square
- Captures jump diagonally over one adjacent enemy piece into an empty square
- Multi-jump chains are enforced after a capture when another capture is available from the landing square
- Kings can move and capture diagonally in both directions
- King promotion happens when a regular piece reaches the opponent’s back row
- Optional forced-capture rules are enabled by default and can be toggled off
- The game ends when one player has no pieces remaining or no legal moves

### Score model
| Tracker | Behaviour |
|---|---|
| Red Pieces | Remaining red pieces on the board |
| Blue Pieces | Remaining blue pieces on the board |
| Turn | Current player to move |
| Captures | Total captures in the current round |
| Moves | Total moves made in the current round |
| Round Wins | Red and blue win counters for the current session |
| Fastest Win | Lowest winning move count saved in localStorage |

### Visual feedback
- Selected pieces glow with the primary blue highlight
- Legal move destinations glow cyan
- Capture destinations glow yellow
- Pieces that currently must capture receive a subtle yellow square outline
- Captured pieces trigger a quick ring burst animation
- Promoted kings show a crown icon and pulse when crowned
- Win modal shows winner, move count, capture count, and win reason


---

## Battleship (`/battleship/`)

### Gameplay
- Place your fleet on a 10×10 board, then fire at the enemy 10×10 grid
- Sink the opponent fleet before the computer sinks yours
- Setup phase supports manual placement, rotation, random fleet placement, and clearing the board
- Battle phase alternates between one player shot and one computer shot
- Best winning turn count persists via `"battleshipBestTurns"` in localStorage

### Controls
| Input | Action |
|---|---|
| Click / tap own grid during setup | Place current ship |
| R key | Rotate current ship before placing |
| Rotate button | Rotate current ship before placing |
| Click / tap enemy grid | Fire at selected cell |
| New Game button | Reset fleet and boards |
| Randomize Fleet button | Auto-place the player fleet |
| Clear Placement button | Clear player ships during setup |

### Mechanics
- Two 10×10 boards: player waters and enemy waters
- Fleet includes Carrier 5, Battleship 4, Destroyer 3, Submarine 3, and Patrol Boat 2
- Ships can be placed horizontally or vertically
- Invalid placements are blocked when ships overlap or leave the board
- Enemy fleet is randomly placed at the start of each game
- Player ships are visible; enemy ships remain hidden until hit or sunk
- Each side fires once per turn after setup is complete
- Computer AI uses hunt/target behaviour: random shots until it hits, then nearby cells are prioritised
- A ship is sunk when all of its cells are hit
- The game ends when either fleet is completely sunk

### Score model
| Tracker | Behaviour |
|---|---|
| Your Ships | Player ships not yet sunk |
| Enemy Ships | Enemy ships not yet sunk |
| Shots | Number of player shots fired |
| Accuracy | Player hits divided by shots fired |
| Best Turns | Lowest winning turn count saved in localStorage |
| Turns | One turn is counted for each player shot during battle |

### Visual feedback
- Placement preview glows cyan for valid positions and red for invalid positions
- Player ships are shown as blue ship blocks on the player grid
- Misses show a circular ripple marker
- Hits flash with cyan/red impact styling
- Sunk ships reveal their full outline on the enemy board
- Active phase label changes between Place Fleet, Your Turn, Enemy Turn, Victory, and Defeat
- Victory modal shows turn count, shot count, and accuracy