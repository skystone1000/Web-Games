GAME_TITLE:       Battleship
GAME_FOLDER:      battleship
GAME_EMOJI:       🚢
GENRE_TAG:        Strategy
SHORT_HUB_DESC:   Place your fleet, scan the enemy grid, and sink every ship. Built for clean turn-based play against a simple computer opponent.

LAYOUT_TYPE:      B — Two-column panels  (two grids/main panel left, sidebar right, collapse on mobile)

MOBILE_SCROLL:    yes, below 980px

GAME_DESCRIPTION:
- Objective: Sink the opponent fleet before your own ships are destroyed.
- Win condition: All ships on one side are sunk.
- Turn structure: Turn-based single-player against a computer opponent. The setup phase lets the player place ships, then each side fires once per turn.
- Player count: Single-player versus simple AI.
- Special mechanics: Ships can be rotated during placement, invalid placements are blocked, hits and misses are tracked, and the AI can use a hunt/target mode after scoring a hit.
- Score model: Track shots fired, hit rate, ships sunk, fastest win by turns, and persistent best turn count using localStorage key battleshipBestTurns.
- Visual feedback: Misses ripple, hits flash cyan/red, sunk ships reveal their full outline, and the active phase label changes between Place Fleet, Your Turn, Enemy Turn, and Victory.

CONTROLS:
- Click / tap own grid during setup: place ship
- R key or Rotate button: rotate ship before placing
- Click / tap enemy grid: fire at cell
- New Game button: reset fleet and boards

SIDEBAR_STATS:
- Your Ships
- Enemy Ships
- Shots
- Accuracy
- Best Turns

EXTRA_REQUIREMENTS:
Use 10x10 boards with a compact mobile layout. Add Randomize Fleet and Clear Placement buttons.
