# Design: Five New Games — Parallel Implementation

**Date:** 2026-05-02  
**Status:** Approved

## Overview

Add five new browser games to `games.adityamahajan.in`. All games are pure static HTML/CSS/JS — no build tools, no npm, no frameworks. Each game lives in its own folder as a single `index.html` file.

## Games

| Game | Folder | Layout | Canvas? | Mobile scroll |
|------|--------|--------|---------|---------------|
| 2048 | `/2048/` | B — two-column panels | No (CSS grid tiles) | No |
| Wordle | `/wordle/` | B — two-column panels | No (CSS grid cells) | Yes, below 700px |
| Breakout | `/breakout/` | A — fullscreen canvas | Yes | No |
| Minesweeper | `/minesweeper/` | B — two-column panels | No (CSS grid cells) | Yes, below 768px |
| Flappy Bird | `/flappy-bird/` | A — fullscreen canvas | Yes | No |

Full specs for each game are in `docs/gameInputs/<game>.md`.

## Implementation Strategy

**Option A — parallel game agents + single cleanup agent.**

### Phase 1: 5 parallel agents (simultaneous)

Each agent has exactly one job: write `<game>/index.html`.

- **Agent 1 — 2048**: Layout B. CSS grid board; tiles are absolutely-positioned divs with CSS translate animations. Slide logic in JS. Style anchor: `tic-tac-toe/index.html`.
- **Agent 2 — Wordle**: Layout B. 6×5 guess grid + on-screen keyboard. Bundled word list in JS. Flip reveal animation via CSS rotateX. Style anchor: `tic-tac-toe/index.html`.
- **Agent 3 — Breakout**: Layout A. Fullscreen canvas. Velocity-based paddle (keyboard + mouse/touch). Level progression. Style anchor: `snake/index.html`.
- **Agent 4 — Minesweeper**: Layout B. CSS grid board. 3 difficulty levels. Right-click/long-press flagging. Flood-fill reveal. Style anchor: `tic-tac-toe/index.html`.
- **Agent 5 — Flappy Bird**: Layout A. Fullscreen canvas. Delta-time RAF loop. Bird drawn with canvas paths. Style anchor: `snake/index.html`.

Each agent reads:
- `docs/template.md`
- `docs/gameInputs/<game>.md`
- The style anchor game file
- `assets/css/games.css`

### Phase 2: cleanup agent (after all 5 complete)

One agent updates:
1. `index.html` — add 5 `<article class="game-card">` entries to the grid
2. `docs/FEATURES.md` — add a section per game describing its features
3. `docs/CODEBASE.md` — add each new game file and any new patterns it introduces

## Shared Conventions (all games must follow)

- `<div id="header-placeholder">` as first body element
- `<div class="game-viewport">` wrapping all game UI
- Nav glass override in `<style>` (always-on, no scroll state)
- `body::before` ambient radial gradient background
- All game CSS in `<head> <style>` — no external game CSS files
- All game JS in `<body> <script>` — no external game JS files
- `<script src="/assets/js/games.js">` before game script
- Design tokens only — no invented colour values
- Bootstrap layout utilities only — no Bootstrap components

## localStorage Keys

| Game | Key |
|------|-----|
| 2048 | `2048Best` |
| Wordle | `wordleStreak`, `wordleWins`, `wordlePlayed` |
| Breakout | `breakoutBest` |
| Minesweeper | `minesweeperBestEasy`, `minesweeperBestMedium`, `minesweeperBestHard` |
| Flappy Bird | `flappyBest` |

## Out of Scope

- Audio / sound effects
- Server-side anything
- Animations beyond what is specified in each game input file
- Any changes to `assets/css/games.css` or `assets/js/games.js`
