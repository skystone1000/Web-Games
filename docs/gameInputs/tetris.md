## Game Input

```
GAME_TITLE:       Tetris
GAME_FOLDER:      tetris
GAME_EMOJI:       🧱
GENRE_TAG:        Puzzle
SHORT_HUB_DESC:   Stack falling tetrominoes and clear complete lines before the stack reaches the top.
                  Speed ramps up every 10 lines — how long can you last?

LAYOUT_TYPE:      B — Two-column panels
                  Left panel: 10×20 tetris board.
                  Right sidebar: title, description, next-piece preview, stat counters, status pill, rules, action buttons.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Rotate and position falling tetrominoes (7 standard shapes: I, O, T, S, Z, J, L) to
  complete full horizontal lines. Every completed line is cleared and points are earned. The game
  ends when a new piece spawns and overlaps already-filled cells (top-out).

  Win condition: No win condition — survive as long as possible and score as high as possible.
  Game over when the stack reaches the top of the board.

  Turn structure: Real-time. Pieces fall automatically; fall speed is determined by the current
  level. Level increments by 1 every 10 lines cleared.

  Player count: Single player.

  Special mechanics:
  - 7-bag randomiser: all 7 tetrominoes are shuffled into a bag and dealt in order, then a
    new bag is prepared, ensuring no piece goes missing for too long.
  - Ghost piece: a faded outline of the current piece shows where it will land.
  - Hard drop: instantly drops the piece to the ghost position.
  - Soft drop: player holds Down to accelerate the fall.
  - Lock delay: piece waits 500ms after landing before locking, allowing last-moment
    rotation/slide adjustments.
  - Wall kicks (SRS): when rotating near walls or other pieces, the piece nudges sideways to
    attempt the rotation rather than failing outright.
  - Line clear scoring: 1 line = 100 × level, 2 = 300 × level, 3 = 500 × level, 4 = 800 × level.
  - Soft drop score: +1 pt per cell descended; Hard drop score: +2 pts per cell.

  Score model:
  - Score accumulates from line clears and drop bonuses.
  - Best score persists via localStorage key "tetrisBest".

  Visual feedback:
  - Each tetromino colour: I=cyan, O=yellow, T=purple, S=green, Z=red, J=blue, L=orange.
  - Ghost piece rendered at 20% opacity of the piece colour.
  - Completed lines flash white for 80ms, then collapse with a smooth CSS height transition.
  - Merge pop: cleared row cells scale to 0 over 120ms.
  - Level-up: brief blue glow pulse on the board border.
  - Game-over overlay shows final score, best, and lines cleared.

CONTROLS:
  - Arrow Left / A: move piece left
  - Arrow Right / D: move piece right
  - Arrow Up / W / Z: rotate piece clockwise
  - Arrow Down / S: soft drop (hold to accelerate fall)
  - Space: hard drop (instant drop to ghost position)
  - Escape / P: pause / resume
  - Swipe left/right: move piece (mobile)
  - Swipe up: hard drop (mobile)
  - Swipe down: soft drop (mobile)

SIDEBAR_STATS:
  - Score (resets each game)
  - Best (persists via localStorage "tetrisBest")
  - Level (starts at 1, +1 every 10 lines)
  - Lines (total lines cleared this game)
  - Next piece preview: small 4×4 grid in the sidebar showing the upcoming tetromino

EXTRA_REQUIREMENTS:
  - Fall speed by level (ms per row): 1=800, 2=720, 3=630, 4=550, 5=470, 6=380, 7=300,
    8=220, 9=130, 10+=100.
  - Board is a 10-column × 20-row CSS grid of cells (not canvas); pieces are tracked as
    arrays of [row, col] cell coordinates.
  - Next piece preview is a 4×4 CSS grid rendered in the sidebar.
  - Wall-kick offsets follow the standard SRS kick table for all pieces.
  - Do not add audio.
```
