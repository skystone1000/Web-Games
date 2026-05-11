GAME_TITLE:       Reversi
GAME_FOLDER:      reversi
GAME_EMOJI:       ⚫
GENRE_TAG:        Strategy
SHORT_HUB_DESC:   Place discs, flip lines, and control the board. A polished local strategy game with valid-move highlights and score tracking.

LAYOUT_TYPE:      B — Two-column panels  (main board left, sidebar right, collapse on mobile)

MOBILE_SCROLL:    yes, below 900px

GAME_DESCRIPTION:
- Objective: Finish with more discs on the board than the opponent by placing pieces that capture straight lines of enemy discs.
- Win condition: The board is full or neither player has a legal move; the player with more discs wins.
- Turn structure: Turn-based local two-player game. A move is legal only if it flips at least one opponent disc.
- Player count: Two-player local, with optional simple AI opponent as an enhancement.
- Special mechanics: Legal moves are highlighted, captured discs flip with animation, players pass automatically if no legal move exists, and corners receive subtle priority highlights.
- Score model: Current black/white disc counts are shown every turn, total wins persist for the session, and optional best margin can persist with localStorage key reversiBestMargin.
- Visual feedback: Valid cells glow with accent dim, newly placed discs pop in, flipped discs rotate, and the winning colour gets a final board glow.

CONTROLS:
- Click / tap highlighted cell: place disc
- New Round button: reset board
- Undo button: revert the last move if implemented

SIDEBAR_STATS:
- Black
- White
- Turn
- Valid Moves
- Rounds

EXTRA_REQUIREMENTS:
Add a toggle for Two Player / Easy AI. The AI can pick the move that flips the most discs, with corner preference if available.
