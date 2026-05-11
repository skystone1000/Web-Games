GAME_TITLE:       Solitaire
GAME_FOLDER:      solitaire
GAME_EMOJI:       ♠️
GENRE_TAG:        Cards
SHORT_HUB_DESC:   A clean Klondike solitaire board with drag-and-drop cards, timer, moves, and foundation progress tracking.

LAYOUT_TYPE:      B — Two-column panels  (card table left, sidebar right, collapse on mobile)

MOBILE_SCROLL:    yes, below 980px

GAME_DESCRIPTION:
- Objective: Move all cards to the four foundations in ascending suit order from Ace to King.
- Win condition: All 52 cards are placed in the foundations.
- Turn structure: Turn-based single-player card puzzle using standard Klondike rules.
- Player count: Single-player.
- Special mechanics: Draw-one or draw-three mode, tableau stacking in descending alternating colours, face-down cards reveal when uncovered, and empty tableau spaces accept kings.
- Score model: Track moves, time, foundation count, draw mode, and persistent best time/move count using localStorage key solitaireBest.
- Visual feedback: Draggable cards lift with shadow, legal drop targets glow, invalid drops snap back, and completed foundations shimmer.

CONTROLS:
- Drag card/stack: move between tableau, foundation, or waste
- Click / tap card: auto-move when one legal move exists
- Click / tap stock: draw card/cards
- New Deal button: restart with a shuffled deck
- Draw Mode toggle: switch draw-one / draw-three before a new deal

SIDEBAR_STATS:
- Moves
- Time
- Foundations
- Best
- Mode

EXTRA_REQUIREMENTS:
For mobile, support tap-to-select then tap-to-drop as an alternative to drag-and-drop.
