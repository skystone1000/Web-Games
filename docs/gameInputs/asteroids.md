## Game Input

```
GAME_TITLE:       Asteroids
GAME_FOLDER:      asteroids
GAME_EMOJI:       🚀
GENRE_TAG:        Shooter
SHORT_HUB_DESC:   Pilot your ship through a tumbling asteroid field — rotate, thrust, and shoot
                  your way to the highest score before your three lives run out.

LAYOUT_TYPE:      A — Fullscreen canvas
                  All HUD (score, best, lives, level) drawn on canvas. Overlay system for
                  start/pause/game-over. No sidebar.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Pilot a triangular ship through a 2D asteroid field. Shoot asteroids to split and
  destroy them. Survive as long as possible across multiple levels and score as high as possible.

  Win condition: No win — game ends when all 3 lives are lost. Game over overlay shows final
  score, best score, and a "Try Again" button.

  Turn structure: Real-time.

  Player count: Single player.

  Special mechanics:
  - Asteroids in 3 sizes: Large (splits into 2 Medium on hit), Medium (splits into 2 Small),
    Small (destroyed entirely).
  - Scoring: Large = 20 pts, Medium = 50 pts, Small = 100 pts.
  - Ship physics: rotate left/right, thrust forward (adds velocity in the facing direction),
    no auto-deceleration (inertia), friction coefficient 0.98 applied every frame.
  - All objects wrap around screen edges (ship, asteroids, bullets).
  - Bullets: max 4 on screen at once; each despawns after 0.8 seconds.
  - Invincibility on respawn: ship blinks for 2.5 seconds and cannot be hit.
  - Level progression: each level starts with (3 + level) large asteroids; when the field is
    cleared a 1.5s pause plays before the next level begins.
  - Asteroid polygons: each asteroid has 8–12 vertices with random radii (60–100% of base
    radius) generated at spawn and kept fixed for that asteroid's lifetime.

  Score model:
  - Points per kill as above.
  - Extra life every 10,000 points (maximum 5 lives at any time).
  - Best score persists via localStorage key "asteroidsBest".

  Visual feedback:
  - Retro vector style: all objects drawn as thin white stroke outlines on the canvas (no fills).
  - Ship thruster: small orange particle dots emitted from the rear when thrusting.
  - Asteroid explosion: 6–8 short line segments radiate outward from the hit point and fade
    over 400ms.
  - HUD: score top-left, best top-right, lives (small ship icons) top-center, level below lives.
  - Stars: faint 1px white dots as a static background layer (generated once on init).
  - Pause overlay: standard overlay system with resume button.

CONTROLS:
  - Arrow Left / A: rotate ship counter-clockwise
  - Arrow Right / D: rotate ship clockwise
  - Arrow Up / W: thrust forward (hold)
  - Space: fire bullet
  - Escape / P: pause / resume
  - Mobile on-screen buttons: rotate-left (bottom-left), rotate-right (bottom-right),
    thrust (bottom-center), fire (bottom-center-right) — semi-transparent overlays on canvas

SIDEBAR_STATS:
  - (No sidebar — all HUD on canvas)
  - Score: top-left of canvas
  - Best: top-right of canvas
  - Lives: top-center as small ship-icon glyphs
  - Level: below lives

EXTRA_REQUIREMENTS:
  - Canvas rendering via requestAnimationFrame delta-time loop.
  - All game objects (ship, asteroids, bullets) are JS objects with: pos {x,y}, vel {x,y},
    angle, and radius properties.
  - Ship triangle: drawn from 3 points relative to its position/angle, recomputed each frame.
  - Bullet: 3px white circle, velocity = ship velocity + 8px/frame in facing direction.
  - Mobile controls: 4 semi-transparent touch buttons overlaid at canvas corners using
    absolutely positioned divs (not drawn on canvas) so they don't interfere with the game art.
  - Block default scroll on arrow keys and space with e.preventDefault().
  - Do not add audio.
```
