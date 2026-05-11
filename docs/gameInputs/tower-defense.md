GAME_TITLE:       Tower Defense
GAME_FOLDER:      tower-defense
GAME_EMOJI:       🏰
GENRE_TAG:        Strategy
SHORT_HUB_DESC:   Build towers beside a winding path and stop enemy waves. Upgrade defenses, manage coins, and protect your base.

LAYOUT_TYPE:      B — Two-column panels  (canvas/path left, tower shop sidebar right, collapse on mobile)

MOBILE_SCROLL:    yes, below 980px

GAME_DESCRIPTION:
- Objective: Stop waves of enemies from reaching the base by placing and upgrading towers beside the path.
- Win condition: Survive all planned waves.
- Game over condition: Base health reaches zero.
- Turn structure: Semi-real-time single-player strategy game. Players build between or during waves while enemies follow a fixed path.
- Player count: Single-player.
- Special mechanics: Tower types with different range/fire-rate/damage, coin rewards for defeated enemies, upgrades, wave preview, and path-blocking prevention.
- Score model: Track coins, wave number, base health, enemies defeated, and persistent highest wave or best score using localStorage key towerDefenseBest.
- Visual feedback: Tower range rings on selection, projectiles use primary blue, enemy hit flashes use cyan, and base damage triggers a screen-edge warning glow.

CONTROLS:
- Click / tap tower card: select tower type
- Click / tap valid build tile: place tower
- Click / tap existing tower: open upgrade/sell actions
- Start Wave button: begin next wave
- Space: pause / resume

SIDEBAR_STATS:
- Coins
- Wave
- Base Health
- Kills
- Best Wave

EXTRA_REQUIREMENTS:
Start with three tower types: Basic, Slow, and Splash. Keep the first version small: one map, 10 waves, and clear readable enemy paths.
