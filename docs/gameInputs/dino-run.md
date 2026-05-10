## Game Input

```
GAME_TITLE:       Dino Run
GAME_FOLDER:      dino-run
GAME_EMOJI:       🦕
GENRE_TAG:        Runner
SHORT_HUB_DESC:   A little dinosaur, an endless desert, and an ever-growing stream of cacti and
                  pterodactyls. Jump, duck, and survive as long as you can.

LAYOUT_TYPE:      A — Fullscreen canvas
                  All HUD (score, best) drawn on canvas. Overlay for start/game-over. No sidebar.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Control a running dinosaur that must dodge ground obstacles (cacti) and aerial
  obstacles (pterodactyls). Survive as long as possible. Game speed increases over time.

  Win condition: No win — the game ends on any collision. Score = frames survived ÷ 10
  (increments ~6 pts/second at start). Best score persists.

  Turn structure: Real-time, continuous.

  Player count: Single player.

  Special mechanics:
  - Dino jump: single jump from the ground. Upward velocity applied on Space/Up/tap; gravity
    pulls dino back to the ground line. Cannot double-jump.
  - Dino duck: holding Down/S while on the ground (or mid-air) lowers the dino hitbox to
    roughly half standing height.
  - Speed ramp: game scroll speed starts at 6px/frame and increases by 0.001 per frame,
    capped at 14px/frame.
  - Obstacle types:
      a) Cactus clusters — 3 variants: small single, tall single, double cluster.
         All sit on the ground line.
      b) Pterodactyls — appear from score 200 onward. Fly at 3 possible heights:
         Low  (must jump over or can't duck under — jump required),
         Mid  (either jump or duck clears it),
         High (duck under while running — no jump needed).
  - Obstacle gap: minimum gap decreases as speed increases to keep challenge growing.
  - Day/night cycle: every 700 points the canvas background colour alternates between
    a near-black night (#080D1A) and a dark grey dusk (#1A1F2E) over a 200-frame fade.
  - Score milestone: every 100 points a brief white flash frame plays on the canvas.

  Score model:
  - Score increments each frame (÷10 for display).
  - Best score persists via localStorage key "dinoBest".

  Visual feedback:
  - All drawn on canvas. Geometric pixel-art inspired shapes (no image assets).
  - Dino: blocky rect-based sprite; legs alternate between 2 positions every 8 frames
    (running), held still in duck or jump pose.
  - Pterodactyl: two wing-position frames alternating every 12 frames.
  - Ground: a single horizontal line with occasional small pebble rectangles (1–3px).
  - Score and best drawn top-right of canvas.
  - Game-over overlay: "GAME OVER" text, final score, best, "Try Again" button.

CONTROLS:
  - Space / Arrow Up: jump (only when on ground)
  - Arrow Down / S: duck (hold to stay ducked)
  - Space / click canvas: start or retry from idle/game-over overlay
  - Tap canvas: jump (mobile)
  - Touch hold (bottom half of screen): duck (mobile)

SIDEBAR_STATS:
  - (No sidebar — HUD drawn on canvas)
  - Score: top-right of canvas
  - Best: below score on canvas
  - "HI" label flashes when current score exceeds best

EXTRA_REQUIREMENTS:
  - Canvas rendering via requestAnimationFrame. Delta-time loop capped at 50ms per frame.
  - Dino standing hitbox: 80% of visual rect for forgiving collision detection.
  - Dino duck hitbox: 80% wide × 50% tall of standing hitbox.
  - Pterodactyl spawns only after score reaches 200; spawn probability increases gradually.
  - Obstacle minimum gap: starts at 400px, decreases to floor of 200px as speed scales.
  - Running animation: alternate leg frame every 8 game-ticks; freeze on jump/duck.
  - Block default scroll on Arrow keys and Space with e.preventDefault().
  - Do not add audio.
```
