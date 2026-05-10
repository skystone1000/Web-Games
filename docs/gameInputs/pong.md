## Game Input

```
GAME_TITLE:       Pong
GAME_FOLDER:      pong
GAME_EMOJI:       🏓
GENRE_TAG:        Arcade
SHORT_HUB_DESC:   The original arcade classic — deflect the ball past the AI's paddle to score.
                  Speed climbs with every rally. First to 7 wins.

LAYOUT_TYPE:      A — Fullscreen canvas
                  All HUD (scores, best streak) drawn on canvas. Overlay system for start/pause/end.
                  No sidebar.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Control the left paddle. Score points by getting the ball past the AI's right paddle.
  First player to reach 7 points wins the match.

  Win condition: First to 7 goals wins. A win/loss overlay appears with final score, best win
  streak, and a "Play Again" button.

  Turn structure: Real-time, continuous.

  Player count: Single player vs AI.

  Special mechanics:
  - Ball launches toward the player at a random shallow angle after each point.
  - Ball speed increases by 5% on every paddle hit, capped at 3× initial speed; speed resets
    after each goal.
  - Deflection angle: depends on where the ball contacts the paddle. Hitting the top/bottom
    third produces a steeper angle; hitting the center produces a shallower angle.
  - Ball bounces off the top and bottom walls.
  - AI behaviour: AI paddle tracks the ball's Y position but moves at 75% of ball speed,
    creating natural lag and occasional misses. AI does not teleport or snap.
  - No power-ups or additional mechanics.

  Score model:
  - 1 point per goal scored against the opponent.
  - Best win streak (consecutive match wins) persists via localStorage key "pongBest".

  Visual feedback:
  - Dashed vertical center line divides the court.
  - Player score drawn large (top-left area) and AI score (top-right area) on canvas.
  - Ball leaves a faint cyan glow trail: last 5 positions drawn at decreasing opacity (20% each).
  - Brief white flash on the paddle and wall at the moment of collision (1 frame).
  - Win overlay: "You Win 🎉" with score. Loss overlay: "You Lose 💀" with score.

CONTROLS:
  - Arrow Up / W: move player paddle up
  - Arrow Down / S: move player paddle down
  - Space: start / pause / resume
  - Touch drag (left half of screen): move player paddle to finger Y position

SIDEBAR_STATS:
  - (No sidebar — all HUD on canvas)
  - Player score: drawn on canvas, top-left
  - AI score: drawn on canvas, top-right
  - Best win streak: small label drawn below the scores on the player's side

EXTRA_REQUIREMENTS:
  - Canvas rendering via requestAnimationFrame.
  - Paddle dimensions: 12px wide × 80px tall, positioned 20px from each edge.
  - Ball: 10px diameter circle. Initial speed ~5px/frame at 60fps.
  - Paddle movement speed: 7px/frame while key held.
  - AI moves at 75% of ball's current speed toward ball Y each frame.
  - Ball resets to center after each point with a 1-second pause.
  - Overlay system (start / pause / game-over) follows the standard overlay pattern.
  - Do not add audio.
```
