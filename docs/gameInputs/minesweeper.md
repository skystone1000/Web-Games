## Game Input

```
GAME_TITLE:       Minesweeper
GAME_FOLDER:      minesweeper
GAME_EMOJI:       💣
GENRE_TAG:        Strategy

SHORT_HUB_DESC:   Uncover every safe cell on the grid without detonating a mine. Use number clues
                  to deduce where the mines are hiding — logic over luck.

LAYOUT_TYPE:      B — Two-column panels
                  Left panel: mine grid (CSS grid of cell divs).
                  Right sidebar: title, description, stat counters, difficulty selector,
                  status pill, rules, action buttons.

MOBILE_SCROLL:    yes, below 768px

GAME_DESCRIPTION:
  Objective: Reveal all cells that do not contain a mine. Right-click (or long-press on mobile)
  to flag suspected mine cells.

  Win condition: Every non-mine cell is revealed → win overlay with time and flags used.
  Game over condition: Clicking a mine cell reveals all mines and shows the game-over overlay.

  Turn structure: Turn-based (each click = one action). Timer runs from first click until win or loss.

  Player count: Single player.

  Special mechanics:
  - Three difficulty levels (selectable from sidebar before starting):
      Easy:   9×9  grid, 10 mines
      Medium: 16×16 grid, 40 mines
      Hard:   30×16 grid, 99 mines  (triggers mobile scroll exception)
  - On first click: mines are placed AFTER the first reveal so the first click is always safe.
    Cascade flood-fill: clicking a cell with 0 adjacent mines automatically reveals all neighbouring
    0-cells and their numbered borders recursively.
  - Numbers 1–8 indicate adjacent mine count, coloured distinctly (1 = blue, 2 = green, 3 = red,
    4 = dark blue, 5 = maroon, 6 = teal, 7 = black → use near-white on dark theme, 8 = grey).
  - Right-click / long-press toggles a flag (🚩) on unrevealed cells. Flagged cells cannot be
    revealed by accident.
  - Mine counter (sidebar) = total mines − flags placed (can go negative if over-flagged).
  - Chord click (click on a revealed number whose flag count equals the number): reveals all
    non-flagged neighbours in one action.

  Score model:
  - No point score. Stat counters: time elapsed, mines remaining, cells revealed.
  - Best time per difficulty persists via localStorage keys
    "minesweeperBestEasy" / "minesweeperBestMedium" / "minesweeperBestHard".

  Visual feedback:
  - Unrevealed cell: dark surface with subtle border, hover lifts slightly.
  - Revealed empty cell: slightly lighter background, no border.
  - Revealed number: number text in colour-coded style (see above).
  - Flagged cell: 🚩 emoji centered, accent-dim background.
  - Mine hit: cell flashes red, all mines revealed (💣 on mine cells, 🔴 on wrongly flagged cells).
  - Win: remaining un-flagged mines auto-flagged, brief glow sweep over the board.

CONTROLS:
  - Left-click: reveal cell
  - Right-click: place / remove flag
  - Long-press (mobile, 500ms): place / remove flag
  - Tap (mobile): reveal cell
  - "New Game" button: reset board (same difficulty)
  - Difficulty radio buttons (Easy / Medium / Hard): change grid size, resets game

SIDEBAR_STATS:
  - Mines left (total mines − flags placed)
  - Time (elapsed seconds from first click, mm:ss format)
  - Best Time (for current difficulty, persists localStorage)

EXTRA_REQUIREMENTS:
  - Difficulty selector in sidebar: three radio-button-style toggle pills (Easy / Medium / Hard).
    Changing difficulty resets and re-renders the board immediately.
  - Context menu (`contextmenu` event) must be suppressed on the grid to allow right-click flagging
    without the browser menu appearing.
  - Long-press for mobile flag: use a 500ms touchstart timer; cancel on touchmove or touchend
    before threshold; add subtle haptic hint via `navigator.vibrate(30)` if available.
  - Timer starts on first reveal (not on page load). Timer stops on win or loss.
  - Hard mode grid (30×16) needs horizontal scroll on the grid container at small screen widths
    (overflow-x: auto on the grid wrapper only — body scroll is still off unless mobile breakpoint).
```
