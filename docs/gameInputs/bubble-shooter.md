## Game Input

```
GAME_TITLE:       Bubble Shooter
GAME_FOLDER:      bubble-shooter
GAME_EMOJI:       🫧
GENRE_TAG:        Puzzle
SHORT_HUB_DESC:   Aim and fire coloured bubbles to pop matching clusters of three or more.
                  Clear the board before the bubbles reach the danger line.

LAYOUT_TYPE:      A — Fullscreen canvas
                  Canvas fills the viewport (minus the nav). Shooter at bottom-center.
                  HUD (score, best, level) drawn on canvas. No sidebar.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: A hex-offset grid of coloured bubbles fills the top of the canvas. The player aims
  a bubble from the bottom-center shooter and fires. When a fired bubble connects to a cluster
  of 3 or more same-coloured bubbles, the entire cluster pops. Clear all bubbles to advance to
  the next level.

  Win condition: Clearing all bubbles from the board = level complete. A level-complete overlay
  shows points scored, then the next level loads with a fresh board (same colour set, more rows).
  Game over when any bubble in the grid crosses the danger line near the bottom of the canvas.

  Turn structure: The game pauses between shots — the player takes time to aim, then fires on
  click/tap. The bubble travels until it contacts another bubble or the top wall.

  Player count: Single player.

  Special mechanics:
  - Bubble grid: hex offset layout (odd rows shifted right by half a bubble radius).
    Starting board: 8 rows of randomly coloured bubbles.
  - 5 bubble colours: Blue (#2979FF), Cyan (#00E5FF), Red (#E03010), Yellow (#D4A800),
    Green (#32C850).
  - Aim guide: dotted line from the shooter showing the projected path including one wall
    reflection (left or right wall). Aim is clamped to ±80° from vertical.
  - Bubble placement: when a fired bubble stops, it snaps to the nearest empty hex grid cell.
  - Cluster detection: BFS from the newly placed bubble. If 3+ same-colour neighbours found,
    all pop.
  - Floating bubble drop: after any pop, BFS from the ceiling to find bubbles no longer
    connected to the top wall — these fall off and score bonus points.
  - Ceiling descent: every 10 shots without a pop, the entire grid descends one row toward
    the danger line.
  - Next bubble preview: shown beside the shooter at the bottom.
  - Combo: popping 6–9 bubbles in one shot = ×2 multiplier; 10+ = ×3 multiplier.

  Score model:
  - 10 pts per popped bubble (×combo multiplier).
  - 20 pts per floating bubble dropped.
  - Best score persists via localStorage key "bubbleBest".

  Visual feedback:
  - Bubbles: filled circles with a subtle radial gradient and a small white specular highlight
    spot (top-left) for a 3D glassy appearance.
  - Pop animation: bubble expands slightly then bursts into 6–8 radial spark particles that
    fade over 300ms.
  - Floating-drop animation: freed bubbles fall off-screen with gravity acceleration.
  - Aim guide: dashed white line, partially transparent.
  - Danger line: subtle red glow line near the bottom; flashes brighter when any bubble row
    reaches it.
  - Level clear: brief full-canvas white flash over 200ms, then level complete overlay.

CONTROLS:
  - Mouse move: aim the shooter (angle tracks cursor)
  - Click: fire bubble
  - Touch drag: aim the shooter
  - Touch release: fire bubble

SIDEBAR_STATS:
  - (No sidebar — HUD drawn on canvas)
  - Score: top-left of canvas
  - Best: top-right of canvas
  - Level: top-center of canvas
  - Next bubble preview: drawn beside the shooter at the bottom-center

EXTRA_REQUIREMENTS:
  - Canvas rendering via requestAnimationFrame.
  - Bubble radius: 22px (scale proportionally if canvas width < 400px).
  - Hex grid math: row y = topOffset + row × (radius × 1.73); col x = col × (radius × 2) +
    (odd row ? radius : 0). Store grid as a 2D array.
  - BFS cluster detection: find all same-colour connected cells from the newly placed bubble.
  - BFS floating check: starting from all cells in row 0, mark reachable cells; any unmarked
    occupied cell is floating.
  - Aim angle clamped: minimum 10° from horizontal on each side (prevents nearly-horizontal
    shots that would loop along a wall indefinitely).
  - Shooter rotates to face the mouse/touch point. Draw as a small triangle or cannon shape.
  - Do not add audio.
```
