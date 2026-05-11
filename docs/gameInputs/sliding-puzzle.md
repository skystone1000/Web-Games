GAME_TITLE:       Sliding Puzzle
GAME_FOLDER:      sliding-puzzle
GAME_EMOJI:       🧩
GENRE_TAG:        Puzzle
SHORT_HUB_DESC:   Slide numbered tiles into order with the fewest moves. Includes shuffle logic, timer, and satisfying tile animations.

LAYOUT_TYPE:      C — Centered board     (fixed-aspect board centered in viewport with flanking info)

MOBILE_SCROLL:    yes, below 760px

GAME_DESCRIPTION:
- Objective: Arrange the numbered tiles in ascending order with the empty space in the final cell.
- Win condition: The board matches the solved state.
- Turn structure: Turn-based single-player puzzle. Each tile slide counts as one move.
- Player count: Single-player.
- Special mechanics: Use solvable shuffle generation only, allow 3x3 / 4x4 / 5x5 board sizes, and animate each tile into the empty space.
- Score model: Track moves, elapsed time, puzzle size, and persistent best moves/time per size using localStorage keys slidingPuzzleBest3, slidingPuzzleBest4, and slidingPuzzleBest5.
- Visual feedback: Movable tiles lift on hover, the solved board glows, and the final move triggers a short celebration animation.

CONTROLS:
- Click / tap tile next to empty space: slide tile
- Arrow keys / WASD: slide a neighboring tile into the empty space
- Shuffle button: generate a new solvable puzzle
- Size selector: switch between 3x3, 4x4, and 5x5

SIDEBAR_STATS:
- Moves
- Time
- Size
- Best

EXTRA_REQUIREMENTS:
Ensure the shuffle never starts already solved and never creates an unsolvable permutation.
