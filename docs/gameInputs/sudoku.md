## Game Input

```
GAME_TITLE:       Sudoku
GAME_FOLDER:      sudoku
GAME_EMOJI:       🧩
GENRE_TAG:        Logic
SHORT_HUB_DESC:   Fill the 9×9 grid so every row, column, and 3×3 box contains the digits 1–9.
                  Three difficulty levels — how fast can you solve it?

LAYOUT_TYPE:      B — Two-column panels
                  Left panel: 9×9 Sudoku grid.
                  Right sidebar: title, description, difficulty selector, stat counters,
                  status pill, rules, action buttons (New Puzzle, Hint, Check).

MOBILE_SCROLL:    yes, below 700px

GAME_DESCRIPTION:
  Objective: Fill a 9×9 grid with digits 1–9 so that every row, every column, and every 3×3
  sub-box contains each digit exactly once. Some cells are pre-filled (given cells); the player
  fills in the rest.

  Win condition: All cells filled correctly = win. Show a win overlay with elapsed time and a
  "New Puzzle" button.

  Turn structure: Turn-based — click a cell to select it, then press a digit key (or tap a
  number pad button) to fill it. Backspace/Delete clears the cell.

  Player count: Single player.

  Special mechanics:
  - Difficulties:
      Easy   = ~35 given cells (roughly one number in each row/col visible)
      Medium = ~28 given cells
      Hard   = ~22 given cells
  - Puzzle source: ~10 pre-authored puzzles per difficulty level, stored as 81-character
    strings (0 = empty) in the script. A random one is picked on "New Puzzle".
  - Cell selection: click/tap to select; keyboard arrow keys navigate between cells.
  - Number pad: on-screen 1–9 buttons + Erase + Notes toggle rendered below or beside the
    board for mouse and touch use.
  - Notes mode: when active, typing a digit adds/removes it as a small candidate in the cell
    (shown as a 3×3 micro-grid of tiny numbers inside the cell) rather than setting the value.
  - Mistake highlighting (on by default): cells containing a value that conflicts with the
    solution are outlined in red.
  - Hint button: highlights the first incorrect or empty cell and reveals its correct value
    after a 500ms delay. Costs +30 seconds added to the timer (shown as "+0:30" flash).

  Score model:
  - No points — timed challenge. Timer starts on the first digit entry.
  - Best time per difficulty persists via localStorage:
      "sudokuEasyBest", "sudokuMedBest", "sudokuHardBest"

  Visual feedback:
  - Selected cell: var(--primary) border glow.
  - Same-number highlight: all cells containing the same digit as the selected cell get a soft
    background tint (var(--accent-dim)).
  - Peer highlight: cells in the same row, column, and 3×3 box as the selected cell get a
    faint background (var(--surface2)).
  - Given cells: slightly different background (var(--bg2)), font-weight 700, not editable.
  - Mistake cells: 1px solid red border, no fill change.
  - Win: cells fill sequentially left-to-right with a green shimmer wave over 800ms.

CONTROLS:
  - Click / tap cell: select it
  - 1–9 keys: enter digit (or add note if notes mode is on)
  - Backspace / Delete: clear selected cell
  - Arrow keys: move selection to adjacent cell
  - On-screen number pad: 1–9 buttons + Erase + Notes toggle button
  - Difficulty pills (Easy / Medium / Hard): switch difficulty and load a new puzzle
  - "New Puzzle" button: load a fresh puzzle at the current difficulty (resets timer)
  - "Hint" button: reveal correct value for one cell (+30s penalty)

SIDEBAR_STATS:
  - Time (mm:ss, starts on first entry, shown live)
  - Best time for current difficulty (persists via localStorage)
  - Mistakes (count of currently wrong cells)
  - Difficulty selector: Easy / Medium / Hard pill buttons

EXTRA_REQUIREMENTS:
  - Board: 9×9 CSS grid. 3×3 sub-box borders are 2px; inner cell borders are 1px solid
    var(--border). Use border-right/border-bottom rules to thicken every 3rd line.
  - Notes mode: cell displays a 3×3 inner grid of tiny <span> elements (font-size ~0.5rem)
    for candidates 1–9; hidden by default, shown when notes mode is on.
  - Hint penalises timer: add 30 to elapsed seconds and flash "+0:30" in red on the timer
    display for 1.5s.
  - Puzzle data: embed the puzzle strings as JS arrays at the top of the <script> block.
    Solution strings (or a solver function) must also be present to validate cells.
  - Do not add audio.
```
