GAME_TITLE:       Lights Out
GAME_FOLDER:      lights-out
GAME_EMOJI:       💡
GENRE_TAG:        Logic
SHORT_HUB_DESC:   Toggle glowing tiles until the whole grid goes dark. A compact logic puzzle with levels, move counts, and clean neon feedback.

LAYOUT_TYPE:      C — Centered board     (fixed-aspect board centered in viewport with flanking info)

MOBILE_SCROLL:    yes, below 760px

GAME_DESCRIPTION:
- Objective: Turn off every lit tile on the board.
- Win condition: All lights are off.
- Turn structure: Turn-based single-player puzzle. Each click toggles one tile and its orthogonal neighbors.
- Player count: Single-player.
- Special mechanics: Multiple grid sizes, generated solvable levels, optional hint that marks a useful next tile, and a par target for each puzzle.
- Score model: Track moves, par, level, streak, and persistent best move count using localStorage key lightsOutBest.
- Visual feedback: Lit cells glow cyan, toggled cells pulse, solved board fades into a calm dark state, and low-move solutions get a Perfect badge.

CONTROLS:
- Click / tap light tile: toggle it and neighbors
- New Puzzle button: generate another puzzle
- Hint button: show one suggested tile
- Grid Size buttons: choose difficulty

SIDEBAR_STATS:
- Moves
- Par
- Level
- Best
- Streak

EXTRA_REQUIREMENTS:
Generate puzzles by applying random valid toggles from an all-off board so every puzzle is solvable.
