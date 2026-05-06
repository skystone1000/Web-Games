## Game Input

```
GAME_TITLE:       Breakout
GAME_FOLDER:      breakout
GAME_EMOJI:       🧱
GENRE_TAG:        Arcade

SHORT_HUB_DESC:   Control a paddle to bounce a ball and smash through rows of colourful bricks.
                  Clear the board without letting the ball fall — classic arcade action.

LAYOUT_TYPE:      A — Fullscreen canvas
                  Canvas fills remaining viewport below the nav. Start/pause/game-over handled via
                  overlay. No sidebar — stats (score, lives, level) rendered as HUD directly on canvas
                  or as an absolute-positioned bar above the canvas.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Destroy all bricks on screen by bouncing a ball off a paddle at the bottom. Clear every
  brick to advance to the next level.

  Win condition (level clear): All bricks destroyed → brief flash + level counter increments →
  bricks regenerate at slightly increased density or colour. No overall win; game continues until
  all lives are lost.

  Game over condition: Ball passes below the paddle 3 times (3 lives).

  Turn structure: Real-time. Ball moves continuously at a constant speed once started.

  Player count: Single player.

  Special mechanics:
  - Paddle moves left/right only. Ball angle on paddle bounce is influenced by the hit position
    (edges deflect at a steeper angle, centre returns near-vertical).
  - Brick grid: 7 columns × 5 rows of bricks per level. Each row has a distinct colour (top rows
    worth more points: row 1 = 50pts, row 2 = 30pts, rows 3–5 = 10pts).
  - Some bricks require 2 hits (shown as a slightly darker, "cracked" variant) — introduced from
    level 2 onwards.
  - Ball speed increases slightly after every 4 bricks destroyed and again on each new level.
  - If the ball clips a corner it reflects both axes (corner bounce).
  - Losing a life resets ball and paddle to start position but keeps remaining bricks intact.

  Score model:
  - Points per brick hit (row-dependent, see above).
  - Best score persists via localStorage key "breakoutBest".
  - Level number shown in HUD.

  Visual feedback:
  - Ball: small circle, white fill with a subtle cyan glow (shadow: 0 0 8px var(--accent)).
  - Paddle: rounded-rect, gradient var(--primary) → var(--primary-light).
  - Bricks: solid filled rects with 2px gap, colours cycling through a palette per row:
      Row 1 (top): var(--accent) — cyan
      Row 2: var(--primary-light) — light blue
      Row 3: #8B5CF6 — purple
      Row 4: #F59E0B — amber
      Row 5: #EF4444 — red
  - Brick destroy: brief flash (fill → white → gone) over 80ms.
  - Level-clear: all remaining cells flash white in unison, 400ms pause, then regenerate.
  - Overlay states: idle (🧱, "Breakout", "Start Game"), paused (⏸ "Paused", "Resume"),
    dead (💀 "Game Over", final score, "Try Again").

CONTROLS:
  - Arrow Left / Arrow Right: move paddle
  - A / D: move paddle (alternative)
  - Space: start / pause / resume
  - Mouse move: paddle follows cursor X position (desktop only)
  - Touch drag: paddle follows finger X position (mobile)

SIDEBAR_STATS:
  HUD bar (absolute positioned above canvas, not a sidebar):
  - Score (resets each game)
  - Best (persists localStorage "breakoutBest")
  - Lives (3 hearts, displayed as ❤ icons)
  - Level (current level number)

EXTRA_REQUIREMENTS:
  - Paddle movement via keyboard should use a velocity approach (hold key = continuous movement,
    not per-keypress) — track keydown/keyup state in a Set.
  - Mouse/touch control should update paddle position directly to cursor/finger X (clamped to canvas
    bounds) — smoother than keyboard for most players; both input methods active simultaneously.
  - HUD rendered as a fixed `<div>` absolutely positioned over the canvas (not drawn on canvas),
    using the stat card style from the design system.
  - Canvas must resize on window resize; recalculate paddle and brick positions proportionally.
  - Block default scroll on arrow keys.
```
