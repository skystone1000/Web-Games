GAME_TITLE:       Checkers
GAME_FOLDER:      checkers
GAME_EMOJI:       🔴
GENRE_TAG:        Board
SHORT_HUB_DESC:   Jump, capture, and crown your pieces. A focused local checkers implementation with move hints and king animations.

LAYOUT_TYPE:      B — Two-column panels  (main board left, sidebar right, collapse on mobile)

MOBILE_SCROLL:    yes, below 900px

GAME_DESCRIPTION:
- Objective: Capture all opponent pieces or block them so they have no legal moves.
- Win condition: One player has no pieces remaining or no legal moves.
- Turn structure: Turn-based local two-player game with selectable pieces and highlighted legal destinations.
- Player count: Two-player local.
- Special mechanics: Diagonal moves, mandatory captures if enabled, multi-jump capture chains, king promotion on reaching the far row, and kings moving/capturing both directions.
- Score model: Track red pieces, blue pieces, captures this round, round wins, and optional fastest win using localStorage key checkersBestMoves.
- Visual feedback: Selected pieces glow primary blue, legal moves glow accent, captured pieces fade out, and promoted kings receive a crown icon/pulse.

CONTROLS:
- Click / tap piece: select piece
- Click / tap highlighted square: move or capture
- New Round button: reset board
- Toggle button: mandatory captures on/off if implemented

SIDEBAR_STATS:
- Red Pieces
- Blue Pieces
- Turn
- Captures
- Moves

EXTRA_REQUIREMENTS:
Add an optional rules toggle for forced captures. Keep the default rules simple and clearly explain them in the sidebar.
