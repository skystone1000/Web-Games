GAME_TITLE:       Maze Chase
GAME_FOLDER:      maze-chase
GAME_EMOJI:       🟡
GENRE_TAG:        Maze
SHORT_HUB_DESC:   Navigate a neon maze, collect every orb, and avoid roaming enemies. Grab power cores to turn the chase around.

LAYOUT_TYPE:      A — Fullscreen canvas  (canvas fills remaining viewport, overlay for start/pause/end)

MOBILE_SCROLL:    no

GAME_DESCRIPTION:
- Objective: Collect all small orbs in the maze while avoiding enemy chasers.
- Win condition: Clear every orb from the maze.
- Game over condition: The player is caught when no power core is active and all lives are lost.
- Turn structure: Real-time single-player maze game with continuous movement and tile-based collision.
- Player count: Single-player.
- Special mechanics: Power cores temporarily make enemies vulnerable, tunnels wrap the player horizontally, and enemy movement alternates between chase, scatter, and frightened modes.
- Score model: Points for orbs, bonus points for power cores, combo points for catching vulnerable enemies, and persistent best score using localStorage key mazeChaseBest.
- Visual feedback: Orbs pulse softly, enemies glow red when dangerous and cyan when vulnerable, tunnels shimmer, and the player leaves a short motion trail.

CONTROLS:
- Arrow keys / WASD: choose movement direction
- Space: start / pause / resume
- Swipe: choose movement direction on mobile

SIDEBAR_STATS:
- Score
- Best
- Lives
- Orbs Left

EXTRA_REQUIREMENTS:
Keep the maze original rather than copying any exact commercial maze layout. Include simple enemy AI that is readable and fair.
