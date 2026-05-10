## Game Input

```
GAME_TITLE:       Whack-a-Mole
GAME_FOLDER:      whack-a-mole
GAME_EMOJI:       🔨
GENRE_TAG:        Arcade
SHORT_HUB_DESC:   Moles pop up at random — tap them before they duck back down. How many can
                  you whack in 30 seconds?

LAYOUT_TYPE:      C — Centered board
                  3×3 grid of mole holes centered in the viewport.
                  Stat row (score, best, timer) sits above the board inline — no separate sidebar.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Moles pop up from 9 holes arranged in a 3×3 grid. Click or tap a mole before it
  retreats to score a point. The game lasts 30 seconds.

  Win condition: No win condition — game ends when the countdown reaches 0. A result overlay
  shows the final score, best score, and accuracy.

  Turn structure: Real-time, timed (30-second countdown).

  Player count: Single player.

  Special mechanics:
  - At any given moment, 1–2 moles are simultaneously visible (increases to 1–3 after 15 seconds).
  - Mole visibility window: 800ms–1100ms at the start, decreasing to 500ms–800ms in the final
    10 seconds, making the game harder over time.
  - Normal mole hit: +1 point, mole retreats immediately with a bonk animation.
  - Golden mole (≈15% spawn chance): yellow coloured, worth +3 points, visibility window only
    500ms at all times.
  - Clicking an empty hole: no effect, no penalty.
  - Clicking a hole after a mole has already retreated: no effect.

  Score model:
  - +1 per normal mole hit; +3 per golden mole hit.
  - Best score persists via localStorage key "whackBest".

  Visual feedback:
  - Mole pops up with a translateY spring animation (slides from inside the hole upward).
  - On hit: mole briefly shows 💥 and a floating "+1" or "+3" text animates upward and fades.
  - On retreat (not hit): mole slides back down smoothly.
  - Golden mole glows yellow; normal mole uses the surface/primary theme colours.
  - Timer bar: full-width strip above the 3×3 grid that depletes left-to-right over 30 seconds.
  - Result overlay: shows score, best, accuracy (hits ÷ total appearances × 100%), Play Again button.

CONTROLS:
  - Click / tap a mole: whack it
  - "Start" button on the idle overlay: begin the 30-second countdown
  - "Play Again" button on the result overlay: restart

SIDEBAR_STATS:
  - Score (updates live during game)
  - Best (persists via localStorage "whackBest")
  - Time remaining (live countdown from 30 to 0)
  - Accuracy shown on end overlay only (hits / total appearances)

EXTRA_REQUIREMENTS:
  - 3×3 grid of circular hole cells; each hole has a mole element that slides in/out via
    CSS transform translateY.
  - Floating score text (+1/+3): absolutely positioned over the hole, animates
    translateY(-30px) with opacity 0→1→0 over 600ms, then removed from DOM.
  - Timer bar: div that shrinks via CSS width transition from 100% to 0% over 30s.
  - Difficulty ramp: at t=15s, max simultaneous moles increases to 3 and visibility window
    floor drops by 300ms.
  - Do not add audio.
```
