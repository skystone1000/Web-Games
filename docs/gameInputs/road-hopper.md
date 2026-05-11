GAME_TITLE:       Road Hopper
GAME_FOLDER:      road-hopper
GAME_EMOJI:       🐸
GENRE_TAG:        Arcade
SHORT_HUB_DESC:   Hop across lanes, rivers, and moving hazards. Reach safe zones without getting hit or falling off the path.

LAYOUT_TYPE:      A — Fullscreen canvas  (canvas fills remaining viewport, overlay for start/pause/end)

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
- Objective: Move the hopper from the bottom of the board to the safe goal spaces at the top.
- Win condition: Fill all goal slots before the timer runs out.
- Game over condition: The hopper is hit by traffic, falls into water, rides offscreen on a log, or runs out of lives/time.
- Turn structure: Real-time single-player arcade game with grid-step movement and continuously moving hazards.
- Player count: Single-player.
- Special mechanics: Cars move in alternating lane directions, river logs carry the player, some hazards speed up over time, and each completed goal becomes occupied.
- Score model: Points for forward movement, reaching a goal, remaining time bonus, and persistent best score using localStorage key roadHopperBest.
- Visual feedback: Safe rows glow cyan, danger lanes flash subtly, collisions trigger a shake animation, and completed goals show filled icons.

CONTROLS:
- Arrow keys / WASD: hop one tile in a direction
- Space: start / pause / resume
- Swipe: hop direction on mobile

SIDEBAR_STATS:
- Score
- Best
- Goals
- Lives
- Time

EXTRA_REQUIREMENTS:
Use a fixed logical grid so movement feels crisp, but render vehicles/logs smoothly between cells.
