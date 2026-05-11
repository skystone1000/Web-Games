GAME_TITLE:       Alien Invaders
GAME_FOLDER:      alien-invaders
GAME_EMOJI:       👾
GENRE_TAG:        Shooter
SHORT_HUB_DESC:   Defend the screen from descending alien waves. Move, shoot, dodge enemy fire, and survive as the pace keeps rising.

LAYOUT_TYPE:      A — Fullscreen canvas  (canvas fills remaining viewport, overlay for start/pause/end)

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
- Objective: Control a laser cannon at the bottom of the screen and destroy all alien rows before they reach the player zone.
- Win condition: Clear every alien in the current wave. Start a harder wave after each clear.
- Game over condition: The player is hit by enemy fire, aliens reach the defense line, or all lives are lost.
- Turn structure: Real-time single-player action game with continuous movement, projectiles, and wave progression.
- Player count: Single-player.
- Special mechanics: Aliens move as a formation, shift downward at screen edges, fire random bullets, and speed up as their count drops. Optional shields can absorb limited hits.
- Score model: Points for each alien destroyed, bonus points for clearing waves quickly, and a persistent best score using localStorage key alienInvadersBest.
- Visual feedback: Player shots use primary blue, enemy shots use cyan/red warning glows, destroyed aliens pop with small particle bursts, and the active wave banner pulses between rounds.

CONTROLS:
- Arrow Left / Arrow Right or A / D: move cannon
- Space: shoot / start / pause / resume
- Tap left/right side: move on mobile
- Tap fire button: shoot on mobile

SIDEBAR_STATS:
- Score
- Best
- Wave
- Lives

EXTRA_REQUIREMENTS:
Add difficulty scaling per wave, a short invulnerability flash after losing a life, and optional shield blocks between the player and aliens.
