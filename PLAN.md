# Bug Fix Plan — Web Games Site

**Goal:** Fix all layout, overflow, UI, and game-mechanics bugs found across the 28-game site so that desktop screens never scroll, mobile screens can scroll when content overflows, the hub card grid renders uniformly, and all game interactions work correctly.

**Architecture:** Pure static HTML/CSS/JS — no build tools. Every fix is a targeted edit inside the relevant `games/<name>/index.html` or the root `index.html`. No new files are created.

**How to test each fix:** Open the game in Chrome DevTools, toggle device simulation between a 1440×900 desktop and a 390×844 iPhone viewport, confirm the desktop never shows a scrollbar and the mobile scrolls freely.

---

## Bug 1 — Hub (index.html): newer cards missing Bootstrap flex classes

**File:** `index.html`

**Problem:** Cards added after the initial batch (Alien Invaders through Battleship, lines 334–499) are missing `d-flex flex-column h-100` on the `<article>` and `d-flex flex-wrap` on the `.tags` div. Without these, Bootstrap's equal-height column grid doesn't stretch cards to the same height and tags wrap inconsistently.

**Cards affected (10 cards):** Alien Invaders, Tower Defense, Solitaire, Sliding Puzzle, Road Hopper, Reversi, Maze Chase, Lights Out, Checkers, Battleship.

- [ ] **Step 1: Fix Alien Invaders card** (line 334)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">👾</div>
      <h3>Alien Invaders</h3>
      <p>Defend the screen from descending alien waves. Move, shoot, dodge enemy fire, and survive as the pace keeps rising.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">👾</div>
      <h3>Alien Invaders</h3>
      <p>Defend the screen from descending alien waves. Move, shoot, dodge enemy fire, and survive as the pace keeps rising.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 2: Fix Tower Defense card** (line 351)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🏰</div>
      <h3>Tower Defense</h3>
      <p>Build towers beside a winding path and stop enemy waves. Upgrade defenses, manage coins, and protect your base.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🏰</div>
      <h3>Tower Defense</h3>
      <p>Build towers beside a winding path and stop enemy waves. Upgrade defenses, manage coins, and protect your base.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 3: Fix Solitaire card** (line 367)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">♠️</div>
      <h3>Solitaire</h3>
      <p>A clean Klondike solitaire board with drag-and-drop cards, timer, moves, and foundation progress tracking.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">♠️</div>
      <h3>Solitaire</h3>
      <p>A clean Klondike solitaire board with drag-and-drop cards, timer, moves, and foundation progress tracking.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 4: Fix Sliding Puzzle card** (line 384)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🧩</div>
      <h3>Sliding Puzzle</h3>
      <p>Slide numbered tiles into order with the fewest moves. Includes shuffle logic, timer, and satisfying tile animations.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🧩</div>
      <h3>Sliding Puzzle</h3>
      <p>Slide numbered tiles into order with the fewest moves. Includes shuffle logic, timer, and satisfying tile animations.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 5: Fix Road Hopper card** (line 401)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🐸</div>
      <h3>Road Hopper</h3>
      <p>Hop across lanes, rivers, and moving hazards. Reach safe zones without getting hit or falling off the path.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🐸</div>
      <h3>Road Hopper</h3>
      <p>Hop across lanes, rivers, and moving hazards. Reach safe zones without getting hit or falling off the path.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 6: Fix Reversi card** (line 418)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">⚫</div>
      <h3>Reversi</h3>
      <p>Place discs, flip lines, and control the board. A polished local strategy game with valid-move highlights and score tracking.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">⚫</div>
      <h3>Reversi</h3>
      <p>Place discs, flip lines, and control the board. A polished local strategy game with valid-move highlights and score tracking.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 7: Fix Maze Chase card** (line 435)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🟡</div>
      <h3>Maze Chase</h3>
      <p>Navigate a neon maze, collect every orb, and avoid roaming enemies. Grab power cores to turn the chase around.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🟡</div>
      <h3>Maze Chase</h3>
      <p>Navigate a neon maze, collect every orb, and avoid roaming enemies. Grab power cores to turn the chase around.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 8: Fix Lights Out card** (line 452)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">💡</div>
      <h3>Lights Out</h3>
      <p>Toggle glowing tiles until the whole grid goes dark. A compact logic puzzle with levels, move counts, and clean neon feedback.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">💡</div>
      <h3>Lights Out</h3>
      <p>Toggle glowing tiles until the whole grid goes dark. A compact logic puzzle with levels, move counts, and clean neon feedback.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 9: Fix Checkers card** (line 469)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🔴</div>
      <h3>Checkers</h3>
      <p>Jump, capture, and crown your pieces. A focused local checkers implementation with move hints and king animations.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🔴</div>
      <h3>Checkers</h3>
      <p>Jump, capture, and crown your pieces. A focused local checkers implementation with move hints and king animations.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 10: Fix Battleship card** (line 486)

  Find:
  ```html
  <article class="game-card rv d4">
      <div class="game-thumb">🚢</div>
      <h3>Battleship</h3>
      <p>Place your fleet, scan the enemy grid, and sink every ship. Built for clean turn-based play against a simple computer opponent.</p>
      <div class="tags">
  ```
  Replace with:
  ```html
  <article class="game-card rv d4 d-flex flex-column h-100">
      <div class="game-thumb">🚢</div>
      <h3>Battleship</h3>
      <p>Place your fleet, scan the enemy grid, and sink every ship. Built for clean turn-based play against a simple computer opponent.</p>
      <div class="tags d-flex flex-wrap">
  ```

- [ ] **Step 11: Verify** — Open the hub in a browser. All 28 cards in the grid should have equal height within each row; Play buttons should be vertically aligned across cards.

---

## Bug 2 — Asteroids: redundant inline styles on game-viewport div

**File:** `games/asteroids/index.html` — line 166

**Problem:** The `.game-viewport` div carries `style="flex-direction:column;align-items:stretch;padding-top:66px"` as inline attributes. The CSS block at line 53 already declares the same properties. Inline styles take precedence over the stylesheet and will shadow any future CSS fixes to `.game-viewport` for this game.

- [ ] **Step 1: Remove inline style from game-viewport div** (line 166)

  Find:
  ```html
  <div class="game-viewport" style="flex-direction:column;align-items:stretch;padding-top:66px">
  ```
  Replace with:
  ```html
  <div class="game-viewport">
  ```

- [ ] **Step 2: Verify** — Open Asteroids. The layout (nav offset, canvas fill) should look identical to before.

---

## Bug 3 — Breakout: HUD bar overlaps top of canvas

**File:** `games/breakout/index.html`

**Problem:** The `.game-viewport` is a flex column with `padding-top: 66px` (nav clearance). The `#hud` bar is `position: absolute; top: 66px`, so it sits on top of the `#canvas-wrap` which is `flex: 1`. The HUD (~50px tall) covers the top portion of the canvas — the first two rows of bricks are hidden underneath it.

**Fix:** Convert `#hud` from absolutely-positioned to a normal flex item. The flex column will then stack nav-offset → HUD → canvas naturally.

- [ ] **Step 1: Change #hud from absolute to flex-item**

  Find (lines 59–74):
  ```css
  #hud {
      position: absolute;
      top: 66px;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 8px 20px;
      background: rgba(13, 21, 38, 0.9);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      flex-shrink: 0;
  }
  ```
  Replace with:
  ```css
  #hud {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 8px 20px;
      background: rgba(13, 21, 38, 0.9);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      flex-shrink: 0;
  }
  ```

- [ ] **Step 2: Verify** — Open Breakout. Start a game. The HUD (Score / Best / Lives / Level) should sit between the nav and the canvas. No bricks should be hidden behind it. Resize down to 390px width and confirm the HUD still sits above the canvas and bricks are fully visible.

---

## Bug 4 — 2048: desktop page scroll via .game-area overflow-y:auto

**File:** `games/2048/index.html`

**Problem:** `.game-area` has `overflow-y: auto` (line 51), which lets the page scroll on desktop. There is also no mobile scroll enable at all — the two existing media queries (860px, 560px) don't set `body { overflow-y: auto }`, so mobile users who need to scroll the stacked single-column layout can't.

**Fix:** Remove `overflow-y: auto` from `.game-area`. Add a mobile breakpoint at 860px (when the layout collapses to a single column) that enables body scroll.

- [ ] **Step 1: Fix .game-area overflow and add mobile scroll**

  Find (line 47):
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow-y: auto;
      display: grid;
      align-items: start;
      justify-items: center;
      padding: 2rem 6vw;
      min-height: 0;
  }
  ```
  Replace with:
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow: hidden;
      display: grid;
      align-items: start;
      justify-items: center;
      padding: 2rem 6vw;
      min-height: 0;
  }
  ```

- [ ] **Step 2: Add mobile scroll to the 860px media query**

  Find (line 290):
  ```css
  @media (max-width: 860px) {
      .game-shell {
          grid-template-columns: 1fr;
          align-items: start;
      }

      .side {
          order: 2;
      }
  }
  ```
  Replace with:
  ```css
  @media (max-width: 860px) {
      body { overflow-y: auto; }

      .game-viewport {
          height: auto;
          min-height: 100svh;
      }

      .game-area {
          overflow-y: auto;
      }

      .game-shell {
          grid-template-columns: 1fr;
          align-items: start;
      }

      .side {
          order: 2;
      }
  }
  ```

- [ ] **Step 3: Verify** — Desktop (1440px): no scrollbar. Mobile (390px): content scrolls freely. The 4×4 board and sidebar should both be reachable.

---

## Bug 5 — Wordle: desktop page scroll via .game-area overflow-y:auto

**File:** `games/wordle/index.html`

**Problem:** `.game-area` has `overflow-y: auto` (line 45), which scrolls the page on desktop. The 700px mobile media query correctly enables `body { overflow-y: auto }`, so only the desktop `.game-area` line needs fixing.

- [ ] **Step 1: Fix .game-area overflow**

  Find (line 43):
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow-y: auto;
  ```
  Replace `overflow-y: auto` with `overflow: hidden`:
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow: hidden;
  ```

- [ ] **Step 2: Verify** — Desktop (1440px): no scrollbar on the Wordle board/keyboard layout. Mobile (390px): body scroll works, keyboard is reachable.

---

## Bug 6 — Tetris: desktop scroll + board underutilizes width

**File:** `games/tetris/index.html`

**Problem (a):** `.game-area` has `overflow-y: auto` (line 55) causing desktop scroll.
**Problem (b):** `#tetris-board { max-width: 340px }` is too narrow; on a 1440px desktop the board never fills its left-panel column. The board should grow to use more height (Tetris is a tall board — limit by `dvh`, not a fixed pixel cap).
**Problem (c):** No `body { overflow-y: auto }` in any mobile breakpoint, so mobile users cannot scroll the single-column stacked layout.

- [ ] **Step 1: Fix .game-area overflow**

  Find (line 51):
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow-y: auto;
      display: grid;
      align-items: start;
      justify-items: center;
      padding: 2rem 6vw;
      min-height: 0;
  }
  ```
  Replace with:
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow: hidden;
      display: grid;
      align-items: start;
      justify-items: center;
      padding: 2rem 6vw;
      min-height: 0;
  }
  ```

- [ ] **Step 2: Fix board sizing to use available height**

  Find (line 89):
  ```css
  #tetris-board {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(20, 1fr);
      gap: 1px;
      background: var(--bg2);
      border: 2px solid var(--border);
      border-radius: var(--rs);
      width: 100%;
      max-width: 340px;
      aspect-ratio: 1 / 2;
  }
  ```
  Replace with:
  ```css
  #tetris-board {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(20, 1fr);
      gap: 1px;
      background: var(--bg2);
      border: 2px solid var(--border);
      border-radius: var(--rs);
      width: min(100%, calc((100dvh - 140px) / 2));
      max-width: 400px;
      aspect-ratio: 1 / 2;
  }
  ```
  *(The board is 1:2 aspect ratio; `(100dvh - 140px) / 2` means the board height fills the viewport minus nav/padding, the division by 2 converts that height back to the board's width since height = 2×width. `max-width: 400px` is a comfortable upper cap.)*

- [ ] **Step 3: Add mobile scroll to 860px breakpoint**

  Find (line 295):
  ```css
  @media (max-width: 860px) {
      .game-shell {
          grid-template-columns: 1fr;
      }

      .side {
          order: 2;
      }

      #tetris-board {
          max-width: 280px;
      }
  }
  ```
  Replace with:
  ```css
  @media (max-width: 860px) {
      body { overflow-y: auto; }

      .game-viewport {
          height: auto;
          min-height: 100svh;
      }

      .game-area {
          overflow-y: auto;
      }

      .game-shell {
          grid-template-columns: 1fr;
      }

      .side {
          order: 2;
      }

      #tetris-board {
          width: min(100%, 280px);
          max-width: 280px;
      }
  }
  ```

- [ ] **Step 4: Verify** — Desktop: no scroll, board is taller and wider than before. Mobile 390px: body scrolls, board and sidebar both visible.

---

## Bug 7 — Minesweeper: desktop page scroll via .game-area overflow-y:auto

**File:** `games/minesweeper/index.html`

**Problem:** `.game-area` has `overflow-y: auto` (line 61). The 768px mobile media query already enables `body { overflow-y: auto }` and sets `.game-viewport { height: auto; min-height: 100svh }`, so only the desktop `.game-area` line needs fixing.

- [ ] **Step 1: Fix .game-area overflow**

  Find (line 57):
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow-y: auto;
  ```
  Replace `overflow-y: auto` with `overflow: hidden`:
  ```css
  .game-area {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow: hidden;
  ```

- [ ] **Step 2: Verify** — Desktop (1440px): no scrollbar. Mobile (390px): body scroll works.

---

## Bug 8 — Sudoku: desktop page scroll via .inner overflow-y:auto

**File:** `games/sudoku/index.html`

**Problem:** `.inner` (the content wrapper below the nav offset) has `overflow-y: auto` (line 62). The 700px mobile media query correctly enables `body { overflow-y: auto }`. Only the desktop `.inner` line needs fixing.

- [ ] **Step 1: Fix .inner overflow**

  Find (line 58):
  ```css
  .inner {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow-y: auto;
      padding: 2rem 6vw;
      display: flex;
      justify-content: center;
      align-items: flex-start;
  }
  ```
  Replace with:
  ```css
  .inner {
      flex: 1;
      position: relative;
      z-index: 1;
      overflow: hidden;
      padding: 2rem 6vw;
      display: flex;
      justify-content: center;
      align-items: flex-start;
  }
  ```

- [ ] **Step 2: Verify** — Desktop (1440px): no scrollbar. Mobile (390px): body scroll works, 9×9 grid and sidebar both reachable.

---

## Bug 9 — Hangman: desktop page scroll via .game-inner overflow-y:auto

**File:** `games/hangman/index.html`

**Problem:** `.game-inner` has `overflow-y: auto` (line 55). The 600px mobile media query correctly enables `body { overflow-y: auto }`. Only the desktop `.game-inner` line needs fixing.

- [ ] **Step 1: Fix .game-inner overflow**

  Find (line ~55 in the `.game-inner` rule, look for):
  ```css
  .game-inner {
      flex: 1;
      overflow-y: auto;
  ```
  Replace `overflow-y: auto` with `overflow: hidden`:
  ```css
  .game-inner {
      flex: 1;
      overflow: hidden;
  ```

- [ ] **Step 2: Verify** — Desktop (1440px): no scrollbar on the hangman board. Mobile (390px): body scroll works, the keyboard is fully reachable below the board.

---

## Mechanics Bug 10 — Whack-a-Mole: no "All Games" link when game ends

**File:** `games/whack-a-mole/index.html` — lines 356–364

**Problem:** When the 30-second game ends, `#overlay` is shown (z-index: 20) with only a "Play Again" button. The "All Games" `<a href="/">` link exists in the DOM but is outside `#overlay` in the `.inner` wrapper (z-index: 1), so it is completely covered by the overlay once the game ends. Players must use the browser's back button or manually navigate — there is no in-game way to return to the hub.

**Comparison:** Simon's game-over overlay correctly includes both "Try Again" and "All Games" links inside the overlay element.

- [ ] **Step 1: Add "All Games" link inside #overlay**

  Find (lines 361–363):
  ```html
              <button class="btn btn-p d-inline-flex align-items-center gap-2" id="ov-btn">
                  <span class="material-icons-round" style="font-size:17px">play_arrow</span>Start Game
              </button>
  ```
  Replace with:
  ```html
              <button class="btn btn-p d-inline-flex align-items-center gap-2" id="ov-btn">
                  <span class="material-icons-round" style="font-size:17px">play_arrow</span>Start Game
              </button>
              <a href="/" class="btn btn-o d-inline-flex align-items-center gap-2">
                  <span class="material-icons-round" style="font-size:17px">arrow_back</span>All Games
              </a>
  ```

- [ ] **Step 2: Verify** — Open Whack-a-Mole. Wait 30 seconds for the game to end (or start and wait). The result overlay should show both "Play Again" and "All Games" buttons. Clicking "All Games" should navigate to the hub at `/`.

---

## Summary

| # | Game / Page | Category | Bug | Fix |
|---|---|---|---|---|
| 1 | Hub (`index.html`) | Layout | 10 newer cards missing Bootstrap `d-flex flex-column h-100` and `d-flex flex-wrap` | Add classes to each `<article>` and `.tags` div |
| 2 | Asteroids | Layout | Redundant inline styles duplicate what CSS already sets | Remove `style="..."` attribute from `.game-viewport` div |
| 3 | Breakout | Layout | `#hud` is `position:absolute` overlapping canvas, hiding top bricks | Remove absolute positioning, let HUD be a normal flex item |
| 4 | 2048 | Layout | `.game-area { overflow-y: auto }` scrolls desktop; no mobile scroll enable | `overflow: hidden` on desktop; add `body { overflow-y: auto }` at 860px |
| 5 | Wordle | Layout | `.game-area { overflow-y: auto }` scrolls desktop | `overflow: hidden` on `.game-area` |
| 6 | Tetris | Layout | `.game-area { overflow-y: auto }` scrolls desktop; board too narrow; no mobile scroll | `overflow: hidden` + responsive board width + mobile scroll at 860px |
| 7 | Minesweeper | Layout | `.game-area { overflow-y: auto }` scrolls desktop | `overflow: hidden` on `.game-area` |
| 8 | Sudoku | Layout | `.inner { overflow-y: auto }` scrolls desktop | `overflow: hidden` on `.inner` |
| 9 | Hangman | Layout | `.game-inner { overflow-y: auto }` scrolls desktop | `overflow: hidden` on `.game-inner` |
| 10 | Whack-a-Mole | Mechanics | Game-over overlay covers the "All Games" link; no in-game navigation after game ends | Add "All Games" `<a href="/">` inside `#overlay` alongside the "Play Again" button |


Tic Tac To
Left and right empty space beside the Game and Info conatiner
game container taking up full screen height but not the inside grid

Memory Card Game
Left and right empty space beside the Game and Info conatiner
Cards on flipping are empty, put pairs of cards like alphabets or numbers

2048
Left and right empty space beside the Game and Info conatiner
Game Container not taking up full screen height

wordle
Left and right empty space beside the Game and Info conatiner
Game Container not taking up full screen height


Minesweeper 
Left and right empty space beside the Game and Info conatiner
make the board take up 60% of left side and 40 % left is the other column with text, make the size of grids such that there is no scroll and still take up the most size possible