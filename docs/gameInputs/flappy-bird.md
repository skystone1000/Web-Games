## Game Input

```
GAME_TITLE:       Flappy Bird
GAME_FOLDER:      flappy-bird
GAME_EMOJI:       🐦
GENRE_TAG:        Arcade

SHORT_HUB_DESC:   Tap or press Space to keep your bird airborne and thread it through an endless
                  gauntlet of pipes. One wrong move and it's over — how far can you go?

LAYOUT_TYPE:      A — Fullscreen canvas
                  Canvas fills remaining viewport below the nav. Gravity simulation and pipe
                  scrolling drawn on canvas. Overlays for start/game-over states.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Navigate a bird through an infinite sequence of vertically-gapped pipe pairs. Each
  pipe pair successfully passed scores 1 point. Survive as long as possible.

  Win condition: No win state — the game is endless. Aim to beat your personal best.
  Game over condition: Bird collides with any pipe, the top of the canvas, or the ground.

  Turn structure: Real-time. Gravity pulls the bird downward continuously; each tap/press applies
  an upward velocity impulse.

  Player count: Single player.

  Special mechanics:
  - Physics: constant downward acceleration (gravity ~0.4 px/frame), tap impulse = −7 px/frame
    vertical velocity. Terminal fall velocity capped at +10 px/frame.
  - Pipes scroll left at a constant speed (~2.5 px/frame at 60fps). Gap between top and bottom
    pipe is fixed (150px). Pipe pair spacing is ~230px apart horizontally.
  - Bird rotation: tilts forward (positive rotation) as it falls, rotates upward (negative) on flap,
    clamped between −25° and +75°. Rendered as a rounded rect with a beak triangle (no image needed;
    use canvas arc/path drawing — yellow body, orange beak, white eye with black pupil).
  - Pipe gap Y position randomises per pair (within safe bounds so the gap is always reachable).
  - Score increments the instant the bird's X centre passes the pipe's right edge.
  - Collision detection: AABB with a small 4px inset (forgiveness hitbox).
  - Brief invincibility flash not used — one hit = instant death.
  - Ground: solid bar at canvas bottom (12px tall), drawn in dark green/brown matching the theme.

  Score model:
  - Score = pipes passed (resets each run).
  - Best score persists via localStorage key "flappyBest".

  Visual feedback:
  - Background: dark sky matching var(--bg), faint scrolling parallax layer of distant "stars"
    (small white dots moving at 0.5× pipe speed).
  - Bird drawn with canvas paths: yellow circle body, orange triangle beak, white+black eye.
  - Pipes: dark green filled rects with a lighter cap (wider rect at the open end).
  - Ground: dark striped bar, scrolls in sync with pipes.
  - Score: large white number centered at top of canvas.
  - On death: canvas dims (rgba overlay), bird stays in death pose (rotated 90°), score + best
    shown in overlay before game-over screen appears (0.6s delay).
  - Overlay states: idle (🐦, "Flappy Bird", "Tap or press Space to start"),
    dead (💀, "Game Over", score + best, "Try Again").

CONTROLS:
  - Space: flap (start / flap during game)
  - Click anywhere on canvas: flap
  - Tap anywhere on canvas: flap (mobile)
  - "Try Again" button (overlay): restart

SIDEBAR_STATS:
  HUD on canvas (not a sidebar — fullscreen layout):
  - Score (current run, large centered number on canvas)
  - Best (shown in overlay and as small top-right HUD during play)

EXTRA_REQUIREMENTS:
  - Game loop must use requestAnimationFrame with a fixed timestep (delta-time capped at 50ms
    per frame to prevent spiral-of-death on tab-switch resume).
  - Canvas must resize on window resize — recalculate pipe positions and ground Y proportionally.
  - Prevent default on Space keydown to avoid page scroll.
  - Prevent default on touchstart to avoid double-tap zoom on mobile.
  - Bird wing flap: alternate between two wing positions (up/down) each frame the bird is alive —
    draw two canvas paths (wing up = arc above body centre, wing down = arc below) toggled at ~8fps.
  - No audio. No particle effects needed — keep rendering minimal for smooth 60fps on mobile.
```
