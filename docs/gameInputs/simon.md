## Game Input

```
GAME_TITLE:       Simon
GAME_FOLDER:      simon
GAME_EMOJI:       🎯
GENRE_TAG:        Memory
SHORT_HUB_DESC:   Watch the colour sequence flash, then repeat it back in order. Each round adds
                  one more step — how far can your memory take you?

LAYOUT_TYPE:      C — Centered board
                  2×2 grid of large coloured quadrant buttons centered in the viewport.
                  Small stat row (Round, Best, Status) sits above or below the board inline.

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
  Objective: Simon flashes a growing sequence of coloured buttons. The player must repeat the
  exact sequence by clicking the buttons in the same order. Each successful round extends the
  sequence by one step.

  Win condition: No traditional win — the game ends when the player clicks a wrong button.
  Score = the round number reached (= sequence length at failure). Goal is to reach the highest
  round possible.

  Turn structure: Turn-based, alternating between Simon's playback phase and the player's input
  phase. Buttons are only interactive during the player's phase.

  Player count: Single player.

  Special mechanics:
  - 4 coloured quadrants: Red (top-left), Blue (top-right), Yellow (bottom-left),
    Green (bottom-right).
  - Simon's playback: each button in the sequence lights up (brightness surge + subtle scale)
    for a flash duration, followed by a gap before the next flash.
  - Speed schedule:
      Rounds 1–5:   400ms flash, 200ms gap
      Rounds 6–9:   300ms flash, 150ms gap
      Rounds 10+:   200ms flash, 100ms gap
  - One wrong click immediately ends the game (no second chance).
  - Short pause (800ms) between Simon's last flash and the player's input phase opening.

  Score model:
  - Score = round number when the player failed (e.g., failing on round 8 = score 7,
    since round 7 was completed successfully).
  - Best score persists via localStorage key "simonBest".

  Visual feedback:
  - Each quadrant has a muted base colour and a bright lit colour:
      Red:    base rgba(220,50,50,0.25)   → lit rgba(220,50,50,0.9)
      Blue:   base rgba(41,121,255,0.25)  → lit rgba(41,121,255,0.9)
      Yellow: base rgba(220,180,0,0.25)   → lit rgba(220,180,0,0.9)
      Green:  base rgba(50,200,80,0.25)   → lit rgba(50,200,80,0.9)
  - Wrong input: all 4 buttons flash to a dim red tint over 200ms, board shakes (CSS keyframe).
  - Round counter in the center hub increments with a brief scale-up animation at round start.
  - Status text below board: "Watch…" during playback, "Your turn!" during input phase,
    "Wrong! 😵" on fail.

CONTROLS:
  - Click / tap each colour quadrant: input the sequence during player's phase
  - Keyboard shortcuts: Q = Red, E = Blue, Z = Yellow, X = Green
  - "Start Game" button on the idle overlay: begin from round 1
  - "Try Again" button on the fail overlay: restart from round 1

SIDEBAR_STATS:
  - Round (current sequence length, shown in the center hub of the 2×2 grid)
  - Best (highest round reached, persists via localStorage "simonBest")
  - Status indicator: Watch / Your Turn / Wrong (text label near the board)

EXTRA_REQUIREMENTS:
  - Layout: 2×2 CSS grid of large quadrant buttons with a circular center hub element
    overlaid at the intersection (shows round number or 🎯 on idle).
  - Each quadrant: min(45vw, 45vh) so buttons are large and tappable on mobile.
  - Quadrant corner radii: outer corners rounded (var(--r)), inner corners sharp (0).
  - Web Audio API tone per colour (use OscillatorNode, only after first user gesture):
      Red    = 330 Hz (E4)
      Blue   = 277 Hz (C#4)
      Yellow = 220 Hz (A3)
      Green  = 165 Hz (E3)
    Tones play during both Simon's playback and the player's button presses.
    If Web Audio is unavailable, fall back silently (no error).
  - Buttons are pointer-events: none during Simon's playback phase.
  - Do not add background music.
```
