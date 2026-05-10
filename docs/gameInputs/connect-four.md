## Game Input

```
GAME_TITLE:       Connect Four
GAME_FOLDER:      connect-four
GAME_EMOJI:       🔴
GENRE_TAG:        Strategy
SHORT_HUB_DESC:   Drop coloured discs to connect four in a row — horizontally, vertically, or
                  diagonally. Outsmart your opponent before they do.

LAYOUT_TYPE:      B — Two-column panels
                  Left panel: 7×6 game board + column hover header row.
                  Right sidebar: title, description, stat counters, status indicator, rules,
                  action buttons, match history.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Two players alternate dropping discs into a 7-column × 6-row vertical grid. A disc
  falls to the lowest available row in the chosen column. Connect exactly 4 of your own discs in
  a row — horizontally, vertically, or diagonally — to win.

  Win condition: 4 in a row wins. Draw if all 42 cells are filled with no winner. After each
  result a status message appears with a "New Round" button.

  Turn structure: Turn-based, alternating. Player 1 (blue/primary) always goes first each round.

  Player count: Two-player local (no AI).

  Special mechanics:
  - Column hover preview: hovering a column shows a ghost disc at the top in the current
    player's colour, indicating where the piece will land.
  - Drop animation: disc slides down from the top of the column to its landing row over ~250ms
    with an ease-in effect.
  - Full columns are visually dimmed and non-interactive (cursor: not-allowed).
  - After a win, the 4 winning cells pulse with a glow animation; all other cells are dimmed.

  Score model:
  - Win and draw tally tracked across rounds within a session (no localStorage needed).

  Visual feedback:
  - Player 1 discs: var(--primary) blue. Player 2 discs: var(--accent) cyan.
  - Winning cells: pulsing border glow in the winning player's colour.
  - Status bar below the board: shows whose turn it is (coloured disc icon + name) or the result.
  - Round history list in sidebar shows last 5 results.

CONTROLS:
  - Click any cell in a column (or the header hover area): drop disc in that column
  - "New Round" button: clear board, keep scores
  - "Reset Match" button: clear board and all scores

SIDEBAR_STATS:
  - Player 1 Wins (session)
  - Draws (session)
  - Player 2 Wins (session)
  - Rounds Played (session)

EXTRA_REQUIREMENTS:
  - Board rendered as a 7-column CSS grid of 42 circular cells (not canvas).
  - Ghost disc: absolutely positioned in a header row above the board, shown on column hover.
  - Drop animation: CSS transition on transform translateY from top-of-column to landing row.
  - Session-only scoring — no localStorage persistence needed.
  - Do not use the class .game-card inside this page; use .board-panel for the board container.
```
