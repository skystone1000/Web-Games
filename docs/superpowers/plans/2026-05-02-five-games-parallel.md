# Five New Games — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:dispatching-parallel-agents` to run Tasks 1–5 simultaneously, then execute Task 6 after all five complete.

**Goal:** Add five self-contained browser games (2048, Wordle, Breakout, Minesweeper, Flappy Bird) to the static games site at `games.adityamahajan.in`.

**Architecture:** Each game is one file: `<game-folder>/index.html`. All CSS in a `<style>` block in `<head>`. All JS in a `<script>` block at end of `<body>`. No build steps. Tasks 1–5 are fully independent and must run in parallel. Task 6 runs after all five complete and updates `index.html`, `docs/FEATURES.md`, and `docs/CODEBASE.md`.

**Tech Stack:** HTML5, CSS3, JavaScript ES2020+. Bootstrap 5 layout utilities only (no Bootstrap components). Canvas API for Breakout (Task 3) and Flappy Bird (Task 5). No npm, no frameworks, no external JS.

---

## Shared boilerplate every game file MUST use

Every `index.html` starts with this exact `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GAME_TITLE — Games</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../assets/css/games.css" />
    <style>
        /* REQUIRED: always-on nav glass */
        nav {
            background: rgba(8, 13, 26, 0.92);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 1px 0 var(--border);
        }
        /* REQUIRED: ambient background */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background:
                radial-gradient(ellipse 80% 60% at 70% 40%, rgba(41,121,255,0.14) 0%, transparent 70%),
                radial-gradient(ellipse 45% 45% at 15% 85%, rgba(0,229,255,0.08) 0%, transparent 60%);
        }
        /* game-specific CSS below */
    </style>
</head>
<body>
    <div id="header-placeholder"></div>
    <div class="game-viewport">
        <!-- game UI here -->
    </div>
    <script src="../assets/js/games.js"></script>
    <script>
        /* game JS here */
    </script>
</body>
</html>
```

Design tokens available from `games.css` (do NOT invent new colour values):
```
--primary:#2979FF  --primary-light:#5C9EFF  --accent:#00E5FF  --accent-dim:rgba(0,229,255,0.12)
--bg:#080D1A  --bg2:#0D1526  --surface:#111827  --surface2:#1A2438
--border:rgba(255,255,255,0.07)  --text:#E8EDF5  --text2:#8A99B3  --text3:#4A5568
--r:14px  --rs:8px  --shadow:0 8px 32px rgba(0,0,0,0.45)  --glow:0 0 40px rgba(41,121,255,0.18)
--ease:0.3s cubic-bezier(0.4,0,0.2,1)
```

---

## Task 1 — 2048

**Files:**
- Create: `2048/index.html`

### Layout (two-column panels, no scroll)

```
.game-viewport (flex column, padding-top:66px)
  └─ .game-area (flex:1, overflow-y:auto, padding:2rem 6vw)
       └─ .game-shell (grid: 1fr 360px, gap:2rem, max-width:1080px)
            ├─ left panel (.panel): score bar above 4×4 board
            └─ right sidebar (.panel .side): s-label, h1, description, stats, status, rules, buttons
```

Mobile: `@media (max-width:860px)` → single column, body overflow stays hidden (no page scroll on this game).

### Board DOM structure

```html
<div class="board-wrap" style="position:relative">
  <div id="board-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:10px;
       background:var(--surface2);border-radius:var(--r)">
    <!-- 16 background cells -->
    <div class="bg-cell" style="background:var(--bg2);border-radius:var(--rs);aspect-ratio:1"></div>
    <!-- × 16 -->
  </div>
  <div id="tile-layer" style="position:absolute;inset:0;pointer-events:none"></div>
</div>
```

Tiles are absolutely-positioned `<div>` elements inside `#tile-layer`. Their position is calculated from `(col * cellSize + col * gap + padding)` for both x and y. CSS `transition: transform 0.1s ease` makes movement smooth.

### Key JS — state

```javascript
let board = Array.from({length:4}, () => Array(4).fill(0));
let score = 0, moves = 0, won = false;
let best = Number(localStorage.getItem('2048Best') || 0);
```

### Key JS — spawn tile

```javascript
function spawnTile() {
    const empty = [];
    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
            if (board[r][c] === 0) empty.push([r, c]);
    if (!empty.length) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
    return [r, c]; // return coords so renderBoard can animate spawn
}
```

### Key JS — slide one row (call with reversed row for right/down)

```javascript
function slideRow(row) {
    // strip zeros
    let t = row.filter(v => v !== 0);
    // merge pairs left-to-right (each pair merges at most once)
    for (let i = 0; i < t.length - 1; i++) {
        if (t[i] === t[i + 1]) {
            t[i] *= 2;
            score += t[i];
            t.splice(i + 1, 1);
        }
    }
    // pad right with zeros
    while (t.length < 4) t.push(0);
    return t;
}
```

### Key JS — move in direction

```javascript
function move(dir) { // dir: 'left'|'right'|'up'|'down'
    const prev = JSON.stringify(board);
    const next = Array.from({length:4}, () => Array(4).fill(0));

    for (let i = 0; i < 4; i++) {
        let row;
        if (dir === 'left')  row = board[i].slice();
        if (dir === 'right') row = board[i].slice().reverse();
        if (dir === 'up')    row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        if (dir === 'down')  row = [board[3][i], board[2][i], board[1][i], board[0][i]];

        const slid = slideRow(row);

        if (dir === 'left')  next[i] = slid;
        if (dir === 'right') next[i] = slid.reverse();
        if (dir === 'up')    [0,1,2,3].forEach(r => next[r][i] = slid[r]);
        if (dir === 'down')  [0,1,2,3].forEach(r => next[3-r][i] = slid[r]);
    }

    if (JSON.stringify(next) === prev) return; // no change, don't count as move
    board = next;
    moves++;
    if (score > best) { best = score; localStorage.setItem('2048Best', best); }
    const spawned = spawnTile();
    renderBoard(spawned);
    updateStats();
    checkGameOver();
}
```

### Key JS — game over / win check

```javascript
function checkGameOver() {
    // Win: any tile === 2048
    if (!won && board.flat().includes(2048)) {
        won = true;
        showWinOverlay();
        return;
    }
    // Game over: no empty cells and no adjacent equal pair
    if (board.flat().some(v => v === 0)) return;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (c < 3 && board[r][c] === board[r][c+1]) return;
            if (r < 3 && board[r][c] === board[r+1][c]) return;
        }
    }
    showGameOver();
}
```

### Key JS — tile colour map

```javascript
const TILE_COLORS = {
    2:    {bg:'#1A2438', fg:'#E8EDF5'},
    4:    {bg:'#1E2B45', fg:'#E8EDF5'},
    8:    {bg:'#C06000', fg:'#fff'},
    16:   {bg:'#E07000', fg:'#fff'},
    32:   {bg:'#E05030', fg:'#fff'},
    64:   {bg:'#E03010', fg:'#fff'},
    128:  {bg:'#D4A800', fg:'#fff'},
    256:  {bg:'#DDBB00', fg:'#fff'},
    512:  {bg:'#E8CC00', fg:'#fff'},
    1024: {bg:'#2979FF', fg:'#fff'},
    2048: {bg:'#00E5FF', fg:'#080D1A'},
};
```

### Key JS — controls

```javascript
document.addEventListener('keydown', e => {
    const map = {ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',
                 a:'left',d:'right',w:'up',s:'down',A:'left',D:'right',W:'up',S:'down'};
    const dir = map[e.key];
    if (dir) { e.preventDefault(); move(dir); }
});

// Swipe (mobile)
let tx, ty;
document.addEventListener('touchstart', e => { tx=e.touches[0].clientX; ty=e.touches[0].clientY; }, {passive:true});
document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.max(Math.abs(dx),Math.abs(dy)) < 20) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up'));
});
```

### Stat IDs

- `#score-val` — current score
- `#best-val` — best score
- `#moves-val` — moves counter

### Verification

Open `2048/index.html` in a browser (via local file or `python3 -m http.server`). Check:
- [ ] Board shows 2 tiles on load
- [ ] Arrow keys slide tiles correctly
- [ ] Matching tiles merge (4+4→8, score increases)
- [ ] New tile spawns after each move
- [ ] 2048 tile triggers win overlay with "Keep Going" option
- [ ] Swipe works on mobile viewport (DevTools)
- [ ] Score persists to localStorage

- [ ] **Commit**
```bash
git add 2048/
git commit -m "feat: add 2048 puzzle game"
```

---

## Task 2 — Wordle

**Files:**
- Create: `wordle/index.html`

### Layout (two-column panels, scroll below 700px)

```
.game-viewport (flex column, padding-top:66px)
  └─ .game-area (flex:1, overflow-y:auto, padding:2rem 6vw)
       └─ .game-shell (grid: 1fr 340px, gap:2rem, max-width:1060px)
            ├─ left panel: guess-counter label, 6×5 grid, on-screen keyboard
            └─ right sidebar: s-label, h1, description, stats (Played/Wins/Streak), rules, New Word button

@media (max-width:700px) { body { overflow-y:auto; } .game-viewport { height:auto; min-height:100svh; } }
```

### Guess grid DOM

```html
<div id="guess-label" style="font-size:0.73rem;font-weight:700;letter-spacing:2px;
     color:var(--primary);text-transform:uppercase;margin-bottom:0.75rem">Guess 1 / 6</div>

<div id="grid" style="display:grid;grid-template-rows:repeat(6,1fr);gap:6px">
  <!-- 6 rows × 5 tiles, built by JS -->
</div>
```

Each tile:
```html
<div class="tile" data-row="R" data-col="C"
     style="width:clamp(42px,10vw,58px);aspect-ratio:1;border:2px solid var(--border);
            border-radius:var(--rs);display:grid;place-items:center;
            font-size:clamp(1.3rem,3vw,1.75rem);font-weight:800;
            transition:border-color 0.1s,background 0.15s,transform 0.15s">
</div>
```

Tile state classes:
- `.filled` — letter typed, not yet submitted: `border-color: rgba(255,255,255,0.25)`
- `.correct` — right letter, right position: `background: var(--accent); color: var(--bg); border-color: var(--accent)`
- `.present` — right letter, wrong position: `background: #F5A623; color: #fff; border-color: #F5A623`
- `.absent` — not in word: `background: var(--surface2); color: var(--text2); border-color: var(--surface2)`

### On-screen keyboard DOM (built by JS)

```javascript
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ENTERZ XCVBNMBKSP'];
// Build rows as flex divs; each key is a <button class="key" data-key="X">X</button>
// ENTER key: wider, label "Enter"; BKSP key: wider, label "⌫"
// Key colours mirror tile state (green > yellow > grey precedence)
```

### Key JS — evaluate guess

```javascript
function evaluateGuess(guess, secret) {
    const result = Array(5).fill('absent');
    const sec = secret.split('');
    const gue = guess.split('');
    // Pass 1: correct positions
    for (let i = 0; i < 5; i++) {
        if (gue[i] === sec[i]) { result[i] = 'correct'; sec[i] = null; gue[i] = null; }
    }
    // Pass 2: present in wrong position
    for (let i = 0; i < 5; i++) {
        if (gue[i] === null) continue;
        const j = sec.indexOf(gue[i]);
        if (j !== -1) { result[i] = 'present'; sec[j] = null; }
    }
    return result; // array of 'correct'|'present'|'absent'
}
```

### Key JS — reveal animation

```javascript
function revealRow(rowIdx, results) {
    const tiles = [...document.querySelectorAll(`[data-row="${rowIdx}"]`)];
    tiles.forEach((tile, i) => {
        setTimeout(() => {
            tile.style.transform = 'rotateX(90deg)';
            setTimeout(() => {
                tile.classList.add(results[i]);
                tile.style.transform = '';
            }, 175); // mid-flip: colour applied, then un-flip
        }, i * 80); // 80ms stagger
    });
}
```

### Key JS — submit guess

```javascript
function submitGuess() {
    if (currentGuess.length < 5) { showToast('Not enough letters'); return; }
    const word = currentGuess.join('');
    if (!VALID_WORDS.has(word)) { shakeRow(currentRow); showToast('Not in word list'); return; }

    const results = evaluateGuess(word, secret);
    revealRow(currentRow, results);
    updateKeyboard(word, results);

    const totalDelay = 5 * 80 + 350; // last tile finishes flipping
    setTimeout(() => {
        if (results.every(r => r === 'correct')) {
            bounceRow(currentRow);
            setTimeout(() => endGame(true), 400);
        } else {
            currentRow++;
            currentGuess = [];
            updateGuessLabel();
            if (currentRow === 6) setTimeout(() => endGame(false), 400);
        }
    }, totalDelay);
}
```

### Key JS — toast

```javascript
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = '0'; }, 1800);
}
```

Toast HTML (inside left panel, above grid):
```html
<div id="toast" style="opacity:0;transition:opacity 0.3s;position:absolute;top:8px;left:50%;
     transform:translateX(-50%);background:var(--text);color:var(--bg);
     padding:6px 16px;border-radius:50px;font-size:0.82rem;font-weight:700;
     pointer-events:none;white-space:nowrap;z-index:10"></div>
```

### Key JS — localStorage

```javascript
let stats = {
    played: Number(localStorage.getItem('wordlePlayed') || 0),
    wins:   Number(localStorage.getItem('wordleWins')   || 0),
    streak: Number(localStorage.getItem('wordleStreak') || 0),
};
function saveStats() {
    localStorage.setItem('wordlePlayed', stats.played);
    localStorage.setItem('wordleWins',   stats.wins);
    localStorage.setItem('wordleStreak', stats.streak);
}
```

### Word list

Include two inline JS constants at the top of `<script>`:
- `const ANSWERS = [...]` — ~250 common 5-letter words (enough for extensive play; sample: `'ABOUT','ABOVE','ABUSE','ACUTE','ADMIT','ADOPT','ADULT','AFTER','AGAIN','AGENT','AGREE','AHEAD','ALARM','ALBUM','ALERT','ALIKE','ALIVE','ALLEY','ALLOW','ALONE','ALONG','ALOUD','ALPHA','ALTER','AMBER','ANGEL','ANGER','ANGLE','ANGRY','ANIME','ANKLE','ANNEX','ANTIC','ANVIL','APART','APPLE','APPLY','APRON','ARBOR','ARDOR','ARENA','ARGUE','ARISE','ARMOR','AROMA','AROSE','ARRAY','ARROW','ASCOT','ASHEN','ASIDE','ASKED','ATLAS','ATTIC','AUDIO','AUDIT','AVAIL','AWAKE','AWARD','AWARE','AWFUL','AXIAL','AZURE','BADGE','BADLY','BAGEL','BANJO','BASIN','BASIS','BATCH','BEGAN','BEGIN','BEING','BELOW','BENCH','BEVEL','BIRCH','BIRTH','BISON','BLAME','BLAND','BLAST','BLAZE','BLEAK','BLEND','BLESS','BLIND','BLOCK','BLOOD','BLOOM','BLOWN','BLUES','BLUNT','BLURB','BOARD','BOOST','BOOTH','BOUND','BRACE','BRAID','BRAIN','BRAND','BRAVE','BREAK','BREED','BRICK','BRIDE','BRIEF','BRINE','BRING','BRINK','BROAD','BROKE','BROOK','BROWN','BRUSH','BUDDY','BUILD','BUILT','BUNCH','BURST','CABIN','CAMEL','CANDY','CARRY','CARVE','CAUSE','CEASE','CEDAR','CHAIN','CHAIR','CHALK','CHARM','CHART','CHASE','CHEAT','CHECK','CHEEK','CHESS','CHEST','CHIEF','CHILD','CHINA','CHOIR','CHOSE','CIVIC','CIVIL','CLAIM','CLASP','CLASS','CLEAN','CLEAR','CLERK','CLICK','CLIFF','CLIMB','CLING','CLOUD','CLOWN','CLUMP','COAST','COBRA','COMET','COMIC','COMMA','CORAL','COUNT','COURT','COVER','CRACK','CRAFT','CRANE','CRASH','CRAZY','CRISP','CROSS','CROWD','CROWN','CRUEL','CRUSH','CRUST','CURVE','CYCLE','DAISY','DANDY','DANCE','DECAY','DELTA','DEPOT','DEPTH','DERBY','DEVIL','DIARY','DINER','DIRGE','DISCO','DRAFT','DRAIN','DRAWL','DREAM','DRINK','DRIVE','DROWN','DRYER','DRUID','DWARF','EAGLE','EARLY','EARTH','EIGHT','ELECT','ELITE','EMBER','EMPTY','ENEMY','ENJOY','ENSUE','ENTER','EQUAL','EQUIP','ERROR','ESSAY','EVERY','EXACT','EXIST','EXTRA','FABLE','FACET','FAINT','FAITH','FALSE','FANCY','FAULT','FEAST','FENCE','FERAL','FIELD','FIFTH','FIFTY','FIGHT','FINAL','FIRST','FIXED','FLAKE','FLAME','FLARE','FLASH','FLASK','FLEET','FLESH','FLICK','FLINT','FLOAT','FLOOD','FLOOR','FLOUR','FLUKY','FLUTE','FOAMY','FOCUS','FORCE','FORGE','FORTE','FORUM','FOUND','FRAME','FRANK','FRAUD','FRESH','FRONT','FROST','FROZE','FRUIT','FULLY','GAVEL','GHOST','GIANT','GIVEN','GIZMO','GLADE','GLEAM','GLEAN','GLIDE','GLOOM','GLORY','GLOSS','GLOVE','GLYPH','GOOSE','GRACE','GRADE','GRAIN','GRAND','GRANT','GRAPE','GRAPH','GRASP','GRAVE','GREAT','GREED','GREET','GRIEF','GRILL','GRIND','GROAN','GROIN','GROPE','GROSS','GROUP','GROVE','GROWN','GUARD','GUIDE','GUILD','GUILE','GUISE','GUSTO','GYPSY','HABIT','HAPPY','HARSH','HAVEN','HEART','HEAVY','HENCE','HINGE','HONOR','HORSE','HOTEL','HOUSE','HUMAN','HUMID','HUSKY','HYENA','IDEAL','ICING','IMAGE','INERT','INNER','INPUT','INTER','INTRO','INURE','IRONY','IVORY','JAUNT','JEWEL','JUICE','JUMPY','KNACK','KNIFE','KNEEL','KNIGHT','LARGE','LATHE','LAYER','LEARN','LEAST','LEFTY','LEVEL','LIGHT','LILAC','LINER','LINEN','LINER','LINER','LONER','LOOSE','LOVER','LUCID','LUNAR','LURID','LUSTY','MAGIC','MAJOR','MAKER','MANOR','MAPLE','MARCH','MARSH','MIRTH','MOCHA','MODAL','MONDE','MONTH','MORAL','MORPH','MOTOR','MOTTO','MOUND','MOUNT','MOURN','MOUSE','MOVER','MOVIE','MURAL','MUSIC','MYRRH','NAIVE','NERVY','NEVER','NIGHT','NOBLE','NOISE','NORTH','NOVEL','NURSE','OAKEN','OFTEN','OMEGA','ONION','OPERA','ORDER','ORGAN','OTHER','OTTER','OUTER','OUTWIT','OXIDE','OZONE','PAINT','PANIC','PAPER','PARSE','PASTA','PATCH','PAUSE','PEACE','PEARL','PEDAL','PIANO','PILOT','PINCH','PIRATE','PITCH','PIXEL','PIZZA','PLACE','PLAIN','PLAIT','PLANE','PLANT','PLATE','PLAZA','PLEAD','PLEAT','PLUCK','PLUMB','PLUME','PLUNK','PLUSH','POACH','POINT','POLAR','POLKA','PORKY','POWER','PRESS','PRICE','PRIDE','PRIME','PRINT','PRIOR','PRISM','PRIZE','PROBE','PRONE','PROOF','PROSE','PROUD','PRUNE','PSALM','PULSE','PUNCH','PUPIL','PURGE','PURSE','QUAKE','QUALM','QUERY','QUEST','QUEUE','QUICK','QUIET','QUITE','QUOTA','QUOTE','RAISE','RALLY','RANCH','RANGE','RAPID','RATIO','REACH','REALM','REBEL','REFER','REIGN','RELAX','REPAY','REPEL','REPLY','RERUN','REUSE','REVEL','RIDGE','RIGID','RISKY','RIVAL','RIVER','RIVET','ROBIN','ROCKY','ROUGE','ROUGH','ROUND','ROUTE','ROWER','ROYAL','RUGBY','RULER','RURAL','SABOT','SAINT','SALSA','SAUCE','SCALE','SCALP','SCAMP','SCENE','SCONE','SCOOP','SCOPE','SCORE','SCOUT','SCOWL','SCRAM','SCREW','SEIZE','SERVE','SEVEN','SHADE','SHAKE','SHALL','SHAME','SHAPE','SHARE','SHARK','SHARP','SHEEN','SHEEP','SHEER','SHELF','SHELL','SHIFT','SHINE','SHIRT','SHOCK','SHORE','SHOUT','SHOVE','SHOWN','SIEGE','SIGHT','SILLY','SINCE','SIXTH','SIXTY','SKILL','SKIMP','SLAVE','SLEEK','SLEET','SLEPT','SLICK','SLIDE','SLOPE','SLOTH','SLUMP','SMART','SMEAR','SMELL','SMIRK','SMOKE','SNAIL','SNAKE','SNARE','SNEAK','SNEER','SNORE','SOLAR','SOLID','SOLVE','SORRY','SOUTH','SPACE','SPARE','SPARK','SPAWN','SPEAK','SPEAR','SPELL','SPEND','SPICE','SPILL','SPINE','SPOKE','SPORT','SPREE','SPRAY','SQUAD','SQUID','STACK','STAIN','STAIR','STAKE','STALL','STAMP','STAND','STARK','START','STASH','STEAL','STEAM','STEEP','STEER','STERN','STICK','STILL','STING','STOCK','STONE','STOOD','STOOP','STORY','STOUT','STOVE','STRAP','STRAW','STRAY','STRIP','STUCK','STUDY','STUNT','STYLE','SUEDE','SUGAR','SUITE','SUNNY','SUPER','SURGE','SWAMP','SWARM','SWEAR','SWEEP','SWEET','SWEPT','SWIFT','SWIPE','SWIRL','SWORD','SWORE','SWUNG','SYNTH','TABLE','TALON','TASTE','TAUNT','TEMPO','TENTH','TERSE','THEIR','THEME','THERE','THESE','THICK','THING','THINK','THIRD','THORN','THOSE','THREE','THREW','TIGER','TIGHT','TILDE','TIMER','TITHE','TODAY','TOKEN','TONIC','TOUCH','TOUGH','TOWEL','TOWER','TOXIC','TRACK','TRAIL','TRAIN','TRAIT','TRAMP','TRASH','TREAD','TREND','TRIAL','TRIED','TRIM','TROOP','TROUT','TROVE','TRUCE','TRULY','TRUNK','TUNER','TUNIC','TWEAK','TWEED','TWICE','TWIRL','ULTRA','UNBOX','UNCLE','UNDER','UNITY','UNTIL','UPPER','USHER','VALOR','VALUE','VALVE','VAULT','VICAR','VIGOR','VIRAL','VIPER','VIVID','VOCAL','VOICE','VOTER','VOUCH','VYING','WAFER','WALTZ','WATCH','WATER','WEARY','WEAVE','WEDGE','WEEDY','WEIRD','WHELK','WHILE','WHIFF','WHIRL','WHILE','WHISK','WHOLE','WHOSE','WIELD','WINDY','WITCH','WOMAN','WOMEN','WORLD','WORSE','WORST','WORTH','WOULD','WOUND','WRATH','WRIST','WROTE','YACHT','YEARN','YIELD','YOUNG','YOURS','YOUTH','ZESTY'`).
- `const VALID_WORDS = new Set([...ANSWERS, /* additional valid guesses */])` — extend `ANSWERS` with ~500 additional plausible 5-letter words so most real English words validate.

### Verification

- [ ] Grid shows 6×5 empty tiles on load
- [ ] Typing letters fills tiles with scale-bounce animation
- [ ] Enter submits and tiles flip left-to-right revealing colours
- [ ] Green/yellow/grey logic is correct (run: guess CRANE when secret is TIGER — C:absent, R:absent, A:absent, N:absent, E:absent; guess TIGER — all correct)
- [ ] Keyboard colours update after each guess
- [ ] Invalid word shows toast + shakes row
- [ ] Win shows bounce + result overlay with streak
- [ ] Loss reveals secret word
- [ ] Stats persist across page reload

- [ ] **Commit**
```bash
git add wordle/
git commit -m "feat: add Wordle word game"
```

---

## Task 3 — Breakout

**Files:**
- Create: `breakout/index.html`

### Layout (fullscreen canvas, Layout A)

```html
<div class="game-viewport" style="flex-direction:column;align-items:stretch;padding-top:66px">
  <!-- HUD bar (absolute div over canvas area) -->
  <div id="hud" style="position:absolute;top:66px;left:0;right:0;z-index:10;
       display:flex;justify-content:space-around;align-items:center;
       padding:8px 20px;background:rgba(13,21,38,0.9);backdrop-filter:blur(8px)">
    <div>Score: <span id="score-val">0</span></div>
    <div>Best: <span id="best-val">0</span></div>
    <div id="lives-val">❤❤❤</div>
    <div>Level: <span id="level-val">1</span></div>
  </div>

  <!-- Canvas wrapper -->
  <div id="canvas-wrap" style="flex:1;position:relative;overflow:hidden">
    <canvas id="game-canvas" style="display:block;width:100%;height:100%"></canvas>
    <!-- Overlay (start / pause / game-over) -->
    <div id="overlay" class="d-flex flex-column align-items-center justify-content-center"
         style="position:absolute;inset:0;gap:0.85rem;padding:18px;
                background:rgba(8,13,26,0.82);backdrop-filter:blur(6px)">
      <div id="ov-emoji" style="font-size:clamp(2.1rem,8vw,3.2rem)">🧱</div>
      <div id="ov-title" style="font-size:clamp(1.15rem,4vw,1.5rem);font-weight:800">Breakout</div>
      <div id="ov-sub" style="font-size:0.85rem;color:var(--text2);text-align:center;max-width:min(440px,92vw);line-height:1.5">
        Move the paddle with mouse, arrow keys, or touch. Don't let the ball fall!
      </div>
      <button class="btn btn-p d-inline-flex align-items-center gap-2" id="ov-btn">
        <span class="material-icons-round" style="font-size:17px">play_arrow</span>Start Game
      </button>
    </div>
  </div>
</div>
```

CSS: `html,body{overflow:hidden;height:100%} #overlay.hidden{display:none!important}`

### Key JS — constants and state

```javascript
const COLS = 7, ROWS_BRICKS = 5;
const BRICK_COLORS = ['#00E5FF','#5C9EFF','#8B5CF6','#F59E0B','#EF4444'];
const ROW_POINTS   = [50, 30, 10, 10, 10];
const PADDLE_H = 12, BALL_R = 7;

let state = 'idle'; // idle | running | paused | dead
let canvas, ctx, paddle, ball, bricks, score, best, lives, level;
let keys = new Set(); // held keys
let animId;
best = Number(localStorage.getItem('breakoutBest') || 0);
```

### Key JS — resize

```javascript
function resize() {
    const wrap = document.getElementById('canvas-wrap');
    canvas.width  = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
}
```

### Key JS — init level

```javascript
function initLevel() {
    const W = canvas.width, H = canvas.height;
    const gap = 6, padH = 50;
    const bw = (W - gap * (COLS + 1)) / COLS;
    const bh = 22;

    bricks = [];
    for (let r = 0; r < ROWS_BRICKS; r++) {
        for (let c = 0; c < COLS; c++) {
            bricks.push({
                x: gap + c * (bw + gap),
                y: padH + gap + r * (bh + gap),
                w: bw, h: bh,
                row: r,
                hp: level >= 2 && r < 2 ? 2 : 1, // 2-hit bricks from level 2
                alive: true,
            });
        }
    }

    paddle = { x: W/2 - 60, y: H - 40, w: 120, h: PADDLE_H };
    resetBall();
}

function resetBall() {
    const speed = 4 + level * 0.4;
    ball = {
        x: canvas.width / 2,
        y: canvas.height - 80,
        vx: (Math.random() < 0.5 ? 1 : -1) * speed * 0.6,
        vy: -speed,
        destroyed: 0, // bricks destroyed since last speed bump
    };
}
```

### Key JS — paddle bounce angle

```javascript
function reflectPaddle() {
    const hitPos = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2); // -1 to 1
    const angle  = hitPos * (Math.PI / 3); // max 60° from vertical
    const speed  = Math.hypot(ball.vx, ball.vy);
    ball.vx = speed * Math.sin(angle);
    ball.vy = -Math.abs(speed * Math.cos(angle));
}
```

### Key JS — game loop (RAF)

```javascript
function loop() {
    if (state !== 'running') return;
    update();
    draw();
    animId = requestAnimationFrame(loop);
}

function update() {
    const W = canvas.width, H = canvas.height;

    // Keyboard paddle movement (velocity-based)
    const spd = 7;
    if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A'))
        paddle.x = Math.max(0, paddle.x - spd);
    if (keys.has('ArrowRight') || keys.has('d') || keys.has('D'))
        paddle.x = Math.min(W - paddle.w, paddle.x + spd);

    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall reflections
    if (ball.x - BALL_R < 0)  { ball.x = BALL_R;      ball.vx = Math.abs(ball.vx); }
    if (ball.x + BALL_R > W)  { ball.x = W - BALL_R;  ball.vx = -Math.abs(ball.vx); }
    if (ball.y - BALL_R < 0)  { ball.y = BALL_R;       ball.vy = Math.abs(ball.vy); }

    // Paddle collision
    if (ball.vy > 0 &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.w &&
        ball.y + BALL_R > paddle.y && ball.y + BALL_R < paddle.y + paddle.h + 8) {
        reflectPaddle();
    }

    // Ball fell below paddle
    if (ball.y - BALL_R > H) {
        lives--;
        updateHUD();
        if (lives <= 0) {
            endGame();
        } else {
            resetBall();
        }
        return;
    }

    // Brick collisions
    for (const b of bricks) {
        if (!b.alive) continue;
        if (ball.x + BALL_R > b.x && ball.x - BALL_R < b.x + b.w &&
            ball.y + BALL_R > b.y && ball.y - BALL_R < b.y + b.h) {
            b.hp--;
            if (b.hp <= 0) {
                b.alive = false;
                score += ROW_POINTS[b.row];
                ball.destroyed++;
                // Speed bump every 4 bricks
                if (ball.destroyed % 4 === 0) {
                    const spd = Math.hypot(ball.vx, ball.vy) * 1.05;
                    const ang = Math.atan2(ball.vy, ball.vx);
                    ball.vx = spd * Math.cos(ang);
                    ball.vy = spd * Math.sin(ang);
                }
            }
            if (score > best) { best = score; localStorage.setItem('breakoutBest', best); }
            updateHUD();
            // Determine reflection axis
            const fromLeft   = ball.vx > 0 && ball.x < b.x + b.w / 2;
            const fromRight  = ball.vx < 0 && ball.x > b.x + b.w / 2;
            if (fromLeft || fromRight) ball.vx = -ball.vx;
            else ball.vy = -ball.vy;
            break; // one brick per frame
        }
    }

    // Level clear
    if (bricks.every(b => !b.alive)) {
        level++;
        cancelAnimationFrame(animId);
        // Flash all bricks white, pause 400ms, regenerate
        setTimeout(() => { initLevel(); loop(); }, 400);
    }
}
```

### Key JS — keyboard and mouse/touch

```javascript
document.addEventListener('keydown', e => {
    keys.add(e.key);
    if (e.key === ' ') { e.preventDefault(); handleSpace(); }
    if (['ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
});
document.addEventListener('keyup',  e => keys.delete(e.key));

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = Math.max(0, Math.min(canvas.width - paddle.w,
        e.clientX - rect.left - paddle.w / 2));
});

canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    paddle.x = Math.max(0, Math.min(canvas.width - paddle.w,
        e.touches[0].clientX - rect.left - paddle.w / 2));
}, { passive: false });
```

### Verification

- [ ] Game starts on Space / button click
- [ ] Paddle follows mouse and keyboard (hold key = continuous movement)
- [ ] Ball bounces off walls and paddle
- [ ] Bricks disappear on hit; score increments correctly
- [ ] Lives show as ❤ icons; losing all lives shows game-over overlay
- [ ] Level increments when all bricks cleared; bricks regenerate
- [ ] Level 2+ has 2-hit (cracked) bricks in top rows
- [ ] Best persists across reload

- [ ] **Commit**
```bash
git add breakout/
git commit -m "feat: add Breakout arcade game"
```

---

## Task 4 — Minesweeper

**Files:**
- Create: `minesweeper/index.html`

### Layout (two-column panels, scroll below 768px)

```
.game-viewport (flex column, padding-top:66px)
  └─ .game-area (flex:1, overflow-y:auto, padding:2rem 6vw)
       └─ .game-shell (grid: 1fr 340px, gap:2rem, max-width:1140px)
            ├─ left panel: difficulty pills + board grid wrapper (overflow-x:auto for hard)
            └─ right sidebar: s-label, h1, description, stat counters, rules, New Game button

@media (max-width:768px) { body{overflow-y:auto} .game-viewport{height:auto;min-height:100svh} }
```

### Difficulty config

```javascript
const DIFFICULTIES = {
    easy:   { cols: 9,  rows: 9,  mines: 10,  key: 'minesweeperBestEasy'   },
    medium: { cols: 16, rows: 16, mines: 40,  key: 'minesweeperBestMedium' },
    hard:   { cols: 30, rows: 16, mines: 99,  key: 'minesweeperBestHard'   },
};
let diff = 'easy';
```

### Grid cell data structure

```javascript
// 2D array: grid[row][col]
let grid = []; // each cell: { mine:bool, revealed:bool, flagged:bool, adjacent:number }
let firstClick = true, gameOver = false, won = false;
let minesLeft, revealedCount, timerInterval, elapsedSecs;
```

### Key JS — build grid (no mines yet — placed on first click)

```javascript
function buildGrid() {
    const { cols, rows } = DIFFICULTIES[diff];
    grid = Array.from({length: rows}, () =>
        Array.from({length: cols}, () =>
            ({ mine:false, revealed:false, flagged:false, adjacent:0 })));
    firstClick = true; gameOver = false; won = false;
    minesLeft = DIFFICULTIES[diff].mines;
    revealedCount = 0;
    clearInterval(timerInterval); elapsedSecs = 0;
    renderGrid();
    updateStats();
}
```

### Key JS — place mines after first click

```javascript
function placeMines(safeRow, safeCol) {
    const { cols, rows, mines } = DIFFICULTIES[diff];
    let placed = 0;
    while (placed < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (grid[r][c].mine) continue;
        if (Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1) continue; // safe zone
        grid[r][c].mine = true;
        placed++;
    }
    // Compute adjacent counts
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++)
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r+dr, nc = c+dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].mine)
                        count++;
                }
            grid[r][c].adjacent = count;
        }
    }
}
```

### Key JS — flood fill reveal

```javascript
function reveal(r, c) {
    const { cols, rows } = DIFFICULTIES[diff];
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const cell = grid[r][c];
    if (cell.revealed || cell.flagged || cell.mine) return;
    cell.revealed = true;
    revealedCount++;
    if (cell.adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++)
                if (dr !== 0 || dc !== 0) reveal(r + dr, c + dc);
    }
}
```

### Key JS — handle cell click

```javascript
function handleClick(r, c) {
    if (gameOver || won || grid[r][c].revealed || grid[r][c].flagged) return;
    if (firstClick) {
        firstClick = false;
        placeMines(r, c);
        startTimer();
    }
    if (grid[r][c].mine) {
        triggerGameOver(r, c);
        return;
    }
    reveal(r, c);
    renderGrid();
    updateStats();
    checkWin();
}

function handleRightClick(r, c) {
    if (gameOver || won || grid[r][c].revealed) return;
    grid[r][c].flagged = !grid[r][c].flagged;
    minesLeft += grid[r][c].flagged ? -1 : 1;
    renderGrid();
    updateStats();
}
```

### Key JS — chord click (click on revealed number)

```javascript
function handleChord(r, c) {
    const cell = grid[r][c];
    if (!cell.revealed || cell.adjacent === 0) return;
    const { cols, rows } = DIFFICULTIES[diff];
    let flagCount = 0;
    for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
            const nr = r+dr, nc = c+dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].flagged)
                flagCount++;
        }
    if (flagCount !== cell.adjacent) return;
    for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
            const nr = r+dr, nc = c+dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].flagged) {
                if (grid[nr][nc].mine) { triggerGameOver(nr, nc); return; }
                reveal(nr, nc);
            }
        }
    renderGrid(); updateStats(); checkWin();
}
```

### Key JS — long press (mobile flag)

```javascript
let longPressTimer = null;
gridEl.addEventListener('touchstart', e => {
    const cell = e.target.closest('[data-r]');
    if (!cell) return;
    longPressTimer = setTimeout(() => {
        const r = +cell.dataset.r, c = +cell.dataset.c;
        handleRightClick(r, c);
        navigator.vibrate?.(30);
    }, 500);
}, { passive: true });
gridEl.addEventListener('touchend',  () => clearTimeout(longPressTimer), { passive: true });
gridEl.addEventListener('touchmove', () => clearTimeout(longPressTimer), { passive: true });
gridEl.addEventListener('contextmenu', e => e.preventDefault());
```

### Number colours (CSS classes)

```css
.n1{color:#5C9EFF} .n2{color:#34D399} .n3{color:#F87171}
.n4{color:#1D4ED8} .n5{color:#991B1B} .n6{color:#0891B2}
.n7{color:#E8EDF5} .n8{color:#6B7280}
```

### Verification

- [ ] Board renders correct size for each difficulty
- [ ] First click is always safe (no mine on first-clicked cell or its 8 neighbours)
- [ ] Flood fill opens empty regions on click
- [ ] Right-click toggles flag; mine counter decrements
- [ ] Hitting a mine reveals all mines, shows game-over
- [ ] Winning (all non-mine cells revealed) shows win overlay with time
- [ ] Difficulty pill switches reset and re-render board
- [ ] Long-press flags on mobile (test in DevTools touch mode)
- [ ] Context menu is suppressed on the grid

- [ ] **Commit**
```bash
git add minesweeper/
git commit -m "feat: add Minesweeper strategy game"
```

---

## Task 5 — Flappy Bird

**Files:**
- Create: `flappy-bird/index.html`

### Layout (fullscreen canvas, Layout A)

Same shell as Breakout (canvas fills viewport below nav), but no HUD bar — score drawn on canvas.

```html
<div class="game-viewport" style="flex-direction:column;align-items:stretch;padding-top:66px">
  <div id="canvas-wrap" style="flex:1;position:relative;overflow:hidden">
    <canvas id="game-canvas" style="display:block;width:100%;height:100%"></canvas>
    <div id="overlay" class="d-flex flex-column align-items-center justify-content-center"
         style="position:absolute;inset:0;gap:0.85rem;padding:18px;
                background:rgba(8,13,26,0.82);backdrop-filter:blur(6px)">
      <div id="ov-emoji" style="font-size:clamp(2.1rem,8vw,3.2rem)">🐦</div>
      <div id="ov-title" style="font-size:clamp(1.15rem,4vw,1.5rem);font-weight:800">Flappy Bird</div>
      <div id="ov-sub" style="font-size:0.85rem;color:var(--text2);text-align:center;max-width:min(440px,92vw);line-height:1.5">
        Tap or press Space to flap. Thread through the pipes.
      </div>
      <button class="btn btn-p d-inline-flex align-items-center gap-2" id="ov-btn">
        <span class="material-icons-round" style="font-size:17px">play_arrow</span>Start Game
      </button>
    </div>
  </div>
</div>
```

### Key JS — constants

```javascript
const GRAVITY   = 0.4;
const FLAP_VY   = -7;
const PIPE_SPEED  = 2.5;
const PIPE_GAP    = 150;
const PIPE_SPACING = 230;
const GROUND_H  = 12;
const BIRD_R    = 14; // circle radius
```

### Key JS — state

```javascript
let state = 'idle'; // idle | running | dead
let bird, pipes, score, best, stars, groundOffset, wingUp, wingTimer, animId, lastTime;
best = Number(localStorage.getItem('flappyBest') || 0);
```

### Key JS — init

```javascript
function initGame() {
    const W = canvas.width, H = canvas.height;
    bird = { x: W * 0.22, y: H / 2, vy: 0, angle: 0 };
    pipes = [];
    score = 0;
    groundOffset = 0;
    wingUp = false; wingTimer = 0;
    // Seed first 3 pipe pairs off-screen to the right
    for (let i = 0; i < 3; i++) addPipe(W + i * PIPE_SPACING);
    // Stars (parallax layer)
    stars = Array.from({length: 40}, () => ({
        x: Math.random() * W,
        y: Math.random() * (H - GROUND_H - 80) + 40,
        r: Math.random() * 1.2 + 0.3,
    }));
}

function addPipe(x) {
    const H = canvas.height;
    const minY = 60, maxY = H - GROUND_H - PIPE_GAP - 60;
    const gapY = minY + Math.random() * (maxY - minY);
    pipes.push({ x, gapY, scored: false });
}
```

### Key JS — delta-time game loop

```javascript
function gameLoop(timestamp) {
    if (state !== 'running') return;
    const rawDelta = timestamp - (lastTime || timestamp);
    const delta = Math.min(rawDelta, 50); // cap spiral-of-death
    lastTime = timestamp;
    update(delta);
    draw();
    animId = requestAnimationFrame(gameLoop);
}

function startLoop() {
    lastTime = 0;
    animId = requestAnimationFrame(gameLoop);
}
```

### Key JS — update

```javascript
function update(delta) {
    const W = canvas.width, H = canvas.height;
    const dt = delta / 16.67; // normalise to 60fps equivalent

    // Bird physics
    bird.vy = Math.min(bird.vy + GRAVITY * dt, 10);
    bird.y  += bird.vy * dt;
    bird.angle = Math.max(-25, Math.min(75, bird.angle + (bird.vy > 0 ? 3 : -5) * dt));

    // Wing flap animation (~8fps)
    wingTimer += delta;
    if (wingTimer > 125) { wingUp = !wingUp; wingTimer = 0; }

    // Ground scroll
    groundOffset = (groundOffset + PIPE_SPEED * dt) % 30;

    // Pipes
    for (const p of pipes) {
        p.x -= PIPE_SPEED * dt;
        // Score: bird's centre passes pipe's right edge
        if (!p.scored && p.x + 52 < bird.x) {
            p.scored = true; score++;
            if (score > best) { best = score; localStorage.setItem('flappyBest', best); }
        }
    }
    // Remove off-screen pipes, add new ones
    if (pipes[0]?.x + 52 < 0) { pipes.shift(); addPipe(pipes[pipes.length - 1].x + PIPE_SPACING); }

    // Stars (half pipe speed)
    for (const s of stars) { s.x -= PIPE_SPEED * 0.5 * dt; if (s.x < 0) s.x = W; }

    // Collision
    const groundY = H - GROUND_H;
    if (bird.y + BIRD_R > groundY || bird.y - BIRD_R < 0) { die(); return; }
    for (const p of pipes) {
        const pipeW = 52;
        const inX = bird.x + BIRD_R - 4 > p.x && bird.x - BIRD_R + 4 < p.x + pipeW;
        const inGap = bird.y + BIRD_R - 4 > p.gapY && bird.y - BIRD_R + 4 < p.gapY + PIPE_GAP;
        if (inX && !inGap) { die(); return; }
    }
}
```

### Key JS — draw bird

```javascript
function drawBird(x, y, angle, wingUp) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);

    // Body (yellow circle)
    ctx.beginPath();
    ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
    ctx.fillStyle = '#F6C90E';
    ctx.fill();

    // Wing
    ctx.beginPath();
    if (wingUp) {
        ctx.ellipse(-2, -BIRD_R + 4, 8, 5, -0.4, 0, Math.PI * 2);
    } else {
        ctx.ellipse(-2, BIRD_R - 4, 8, 5, 0.4, 0, Math.PI * 2);
    }
    ctx.fillStyle = '#E0A800';
    ctx.fill();

    // Beak (orange triangle pointing right)
    ctx.beginPath();
    ctx.moveTo(BIRD_R - 2, -3);
    ctx.lineTo(BIRD_R + 8, 0);
    ctx.lineTo(BIRD_R - 2, 3);
    ctx.closePath();
    ctx.fillStyle = '#FF8C00';
    ctx.fill();

    // Eye
    ctx.beginPath();
    ctx.arc(5, -4, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(6, -4, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();

    ctx.restore();
}
```

### Key JS — draw pipes

```javascript
function drawPipe(x, gapY) {
    const W = canvas.width, H = canvas.height;
    const pipeW = 52, capH = 14, capExtra = 6;

    ctx.fillStyle = '#2D5016'; // dark green body

    // Top pipe
    ctx.fillRect(x, 0, pipeW, gapY);
    // Top pipe cap (lighter, wider)
    ctx.fillStyle = '#3D6B20';
    ctx.fillRect(x - capExtra, gapY - capH, pipeW + capExtra * 2, capH);

    ctx.fillStyle = '#2D5016';
    // Bottom pipe
    ctx.fillRect(x, gapY + PIPE_GAP, pipeW, H - (gapY + PIPE_GAP));
    // Bottom pipe cap
    ctx.fillStyle = '#3D6B20';
    ctx.fillRect(x - capExtra, gapY + PIPE_GAP, pipeW + capExtra * 2, capH);
}
```

### Key JS — flap + controls

```javascript
function flap() {
    if (state === 'idle') { startRun(); return; }
    if (state === 'running') bird.vy = FLAP_VY;
}

document.addEventListener('keydown', e => {
    if (e.key === ' ') { e.preventDefault(); flap(); }
});
canvas.addEventListener('click', flap);
canvas.addEventListener('touchstart', e => { e.preventDefault(); flap(); }, { passive: false });
```

### Key JS — die sequence

```javascript
function die() {
    state = 'dead';
    cancelAnimationFrame(animId);
    bird.angle = 75;
    // Draw once more in death pose, then show overlay after 600ms
    draw();
    setTimeout(() => {
        document.getElementById('ov-emoji').textContent = '💀';
        document.getElementById('ov-title').textContent = 'Game Over';
        document.getElementById('ov-sub').textContent =
            `Score: ${score}  •  Best: ${best}`;
        document.getElementById('ov-btn').innerHTML =
            `<span class="material-icons-round" style="font-size:17px">refresh</span>Try Again`;
        document.getElementById('overlay').classList.remove('hidden');
    }, 600);
}
```

### Verification

- [ ] Bird drops under gravity on load (idle, no movement)
- [ ] Space / click / tap makes bird flap upward
- [ ] Pipes scroll left continuously; gap position varies
- [ ] Score increments when bird passes each pipe pair
- [ ] Hitting pipe or ground triggers die() sequence with 0.6s delay
- [ ] Game-over overlay shows score and best
- [ ] Best persists across reload
- [ ] Canvas resizes correctly on window resize (pipes recalculate)
- [ ] Stars scroll at half pipe speed (parallax effect)
- [ ] Wing animates up/down at ~8fps

- [ ] **Commit**
```bash
git add flappy-bird/
git commit -m "feat: add Flappy Bird arcade game"
```

---

## Task 6 — Hub + Docs Update (run AFTER Tasks 1–5 complete)

**Files:**
- Modify: `index.html` (add 5 hub cards)
- Modify: `docs/FEATURES.md` (add 5 game sections)
- Modify: `docs/CODEBASE.md` (add 5 game file entries)

### Step 1 — Add 5 hub cards to `index.html`

Inside the `<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">` div, after the existing 3 cards, append:

```html
                    <div class="col">
                        <article class="game-card rv d1 d-flex flex-column h-100">
                            <div class="game-thumb">🔢</div>
                            <h3>2048</h3>
                            <p>Slide numbered tiles across a 4×4 grid and merge matching values to reach 2048. Simple to learn, endlessly satisfying to master.</p>
                            <div class="tags d-flex flex-wrap">
                                <span class="tag live">Live</span>
                                <span class="tag js">JavaScript</span>
                                <span class="tag">Puzzle</span>
                            </div>
                            <a href="/2048/" class="btn btn-p d-inline-flex align-items-center gap-2">
                                <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play 2048
                            </a>
                        </article>
                    </div>

                    <div class="col">
                        <article class="game-card rv d2 d-flex flex-column h-100">
                            <div class="game-thumb">🟩</div>
                            <h3>Wordle</h3>
                            <p>Guess the secret 5-letter word in six tries. Each guess reveals which letters are correct, misplaced, or absent.</p>
                            <div class="tags d-flex flex-wrap">
                                <span class="tag live">Live</span>
                                <span class="tag js">JavaScript</span>
                                <span class="tag">Word</span>
                            </div>
                            <a href="/wordle/" class="btn btn-p d-inline-flex align-items-center gap-2">
                                <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play Wordle
                            </a>
                        </article>
                    </div>

                    <div class="col">
                        <article class="game-card rv d3 d-flex flex-column h-100">
                            <div class="game-thumb">🧱</div>
                            <h3>Breakout</h3>
                            <p>Control a paddle to bounce a ball and smash through rows of colourful bricks. Clear the board without letting the ball fall.</p>
                            <div class="tags d-flex flex-wrap">
                                <span class="tag live">Live</span>
                                <span class="tag js">JavaScript</span>
                                <span class="tag">Arcade</span>
                            </div>
                            <a href="/breakout/" class="btn btn-p d-inline-flex align-items-center gap-2">
                                <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play Breakout
                            </a>
                        </article>
                    </div>

                    <div class="col">
                        <article class="game-card rv d4 d-flex flex-column h-100">
                            <div class="game-thumb">💣</div>
                            <h3>Minesweeper</h3>
                            <p>Uncover every safe cell on the grid without detonating a mine. Use number clues to deduce where the mines are hiding.</p>
                            <div class="tags d-flex flex-wrap">
                                <span class="tag live">Live</span>
                                <span class="tag js">JavaScript</span>
                                <span class="tag">Strategy</span>
                            </div>
                            <a href="/minesweeper/" class="btn btn-p d-inline-flex align-items-center gap-2">
                                <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play Minesweeper
                            </a>
                        </article>
                    </div>

                    <div class="col">
                        <article class="game-card rv d1 d-flex flex-column h-100">
                            <div class="game-thumb">🐦</div>
                            <h3>Flappy Bird</h3>
                            <p>Tap or press Space to keep your bird airborne and thread it through an endless gauntlet of pipes. How far can you go?</p>
                            <div class="tags d-flex flex-wrap">
                                <span class="tag live">Live</span>
                                <span class="tag js">JavaScript</span>
                                <span class="tag">Arcade</span>
                            </div>
                            <a href="/flappy-bird/" class="btn btn-p d-inline-flex align-items-center gap-2">
                                <span class="material-icons-round" style="font-size:17px">sports_esports</span>Play Flappy Bird
                            </a>
                        </article>
                    </div>
```

- [ ] Verify hub page shows 8 game cards total, all 5 new links are correct

### Step 2 — Update `docs/FEATURES.md`

Append the following after the existing Memory Cards section:

```markdown
---

## 2048 (`/2048/`)

### Gameplay
- Single-player sliding tile puzzle on a 4×4 grid
- Arrow keys / WASD / swipe to slide all tiles in one direction
- Matching tiles merge (e.g. 4+4→8); score increments by merged value
- Win condition: reach a tile with value 2048
- Game over: board full with no possible merges

### Layout
- Two-column panel layout: left = 4×4 board, right = sidebar
- No page scroll; collapses to single column on narrow screens

### Stats
- Score (current game)
- Best (persists via `localStorage` key `"2048Best"`)
- Moves (total slides this game)

### Visual feedback
- Per-tile colour palette (2 → dark blue, 8–64 → orange/red, 128–512 → yellow, 1024 → blue, 2048 → cyan)
- Spawn animation: `scale(0)` → `scale(1)` over 150ms
- Merge pop: `scale(1.15)` → `scale(1)` over 120ms
- Win/game-over overlays

---

## Wordle (`/wordle/`)

### Gameplay
- Single-player word guessing: guess the 5-letter secret word in 6 tries
- Each guess evaluated letter by letter: correct (green), present (yellow), absent (grey)
- Only valid 5-letter words accepted (bundled word list, offline)

### Layout
- Two-column panel layout: left = 6×5 grid + on-screen keyboard, right = sidebar
- Scroll allowed below 700px

### Stats
- Played (persists `"wordlePlayed"`)
- Wins (persists `"wordleWins"`)
- Streak (persists `"wordleStreak"`)

### Visual feedback
- Tile flip reveal: CSS `rotateX` with 80ms stagger between tiles
- Scale-bounce on letter type
- Shake animation on invalid word submission
- Toast notifications (auto-dismiss after 1.8s)
- Bounce animation on winning row
- On-screen keyboard mirrors tile colour state (green > yellow > grey precedence)

---

## Breakout (`/breakout/`)

### Gameplay
- Single-player arcade: bounce a ball off a paddle to destroy brick rows
- 7 columns × 5 rows of bricks per level; top rows worth more points
- Level clears when all bricks destroyed; bricks regenerate on next level
- 3 lives; game over when all lives lost

### Controls
| Input | Action |
|---|---|
| Arrow Left/Right or A/D | Move paddle (velocity-based, hold to move) |
| Mouse move | Paddle follows cursor X |
| Touch drag | Paddle follows finger X |
| Space | Start / pause / resume |

### HUD
- Score, Best, Lives (❤ icons), Level — absolute-positioned bar above canvas
- Best persists via `"breakoutBest"`

### Visual feedback
- Ball: white circle with cyan glow
- Paddle: gradient blue rounded rect
- Brick colours by row: cyan, light blue, purple, amber, red
- 2-hit bricks (level 2+) appear darker; flash white on each hit
- Level-clear: all bricks flash white, 400ms pause, then regenerate

---

## Minesweeper (`/minesweeper/`)

### Gameplay
- Single-player logic puzzle: reveal all non-mine cells without hitting a mine
- Three difficulties: Easy (9×9, 10 mines), Medium (16×16, 40 mines), Hard (30×16, 99 mines)
- First click is always safe (mines placed after first reveal)
- Flood-fill reveals connected zero-adjacent cells
- Chord click: click a revealed number whose flag count equals the number to auto-reveal neighbours

### Controls
| Control | Action |
|---|---|
| Left-click | Reveal cell |
| Right-click | Toggle flag |
| Long-press (mobile, 500ms) | Toggle flag |
| Tap | Reveal cell |
| Difficulty pills | Change grid / mine count, reset board |

### Stats
- Mines Left (mines − flags)
- Time (mm:ss, starts on first click)
- Best Time (per difficulty, persists localStorage)

### Visual feedback
- Numbered cells colour-coded (1=blue, 2=green, 3=red, 4=dark blue, 5=maroon, 6=teal, 7=white, 8=grey)
- Flagged cells: 🚩 with accent-dim background
- Mine hit: cells flash red, all mines revealed (💣 / 🔴 for wrong flags)
- Win: remaining mines auto-flagged

---

## Flappy Bird (`/flappy-bird/`)

### Gameplay
- Single-player endless arcade: tap / Space to flap through an infinite pipe gauntlet
- Score = number of pipe pairs passed; best persists across sessions

### Controls
| Input | Action |
|---|---|
| Space | Flap (or start game) |
| Click canvas | Flap |
| Tap canvas | Flap (mobile) |
| "Try Again" button | Restart after death |

### Physics
- Gravity: 0.4 px/frame; flap impulse: −7 px/frame; terminal fall velocity: 10 px/frame
- Delta-time RAF loop (capped at 50ms to prevent spiral-of-death on tab resume)
- Ball rotation: −25° to +75° based on vertical velocity

### Visual feedback
- Bird: yellow circle body + orange beak + white/black eye, drawn with canvas paths
- Wing alternates up/down at ~8fps
- Pipes: dark green with lighter cap rect
- Parallax star layer scrolls at 0.5× pipe speed
- On death: 0.6s delay before game-over overlay appears
```

### Step 3 — Update `docs/CODEBASE.md`

Append the following after the Memory Cards section (or after the existing game entries):

```markdown
---

### `2048/index.html` — 2048 Puzzle
Self-contained. Layout B (two-column panels).

Key variables:
| Variable | Type | Description |
|---|---|---|
| `board` | `number[][]` | 4×4 matrix of tile values (0 = empty) |
| `score` | number | Current game score |
| `best` | number | Best score (localStorage `"2048Best"`) |
| `moves` | number | Total slides this game |

Key functions:
- `slideRow(row)` — strips zeros, merges adjacent equals left-to-right, pads with zeros
- `move(dir)` — applies `slideRow` across all rows/columns for a direction, spawns tile, renders
- `spawnTile()` — places a 2 (90%) or 4 (10%) in a random empty cell
- `renderBoard(spawned?)` — rebuilds tile layer DOM; applies colour from `TILE_COLORS` map
- `checkGameOver()` — detects 2048 win and board-full lose states

Board tiles are absolutely positioned `<div>` elements inside `#tile-layer`; movement uses CSS `transform: translate()` with `transition: transform 0.1s ease`.

---

### `wordle/index.html` — Wordle Word Game
Self-contained. Layout B (two-column panels). Scroll allowed below 700px.

Key variables:
| Variable | Type | Description |
|---|---|---|
| `secret` | string | Current 5-letter target word (uppercase) |
| `currentRow` | number | Which guess row the player is on (0–5) |
| `currentGuess` | string[] | Letters typed so far in current row |
| `stats` | object | `{played, wins, streak}` from localStorage |
| `ANSWERS` | string[] | ~250-word answer pool |
| `VALID_WORDS` | Set | All accepted 5-letter submissions |

Key functions:
- `evaluateGuess(guess, secret)` — returns array of `'correct'|'present'|'absent'`
- `revealRow(rowIdx, results)` — CSS rotateX flip with 80ms stagger, colour applied mid-flip
- `submitGuess()` — validates, evaluates, reveals, checks win/loss
- `updateKeyboard(word, results)` — updates on-screen key colours (green > yellow > grey)
- `showToast(msg)` — fades in/out pill notification above grid

---

### `breakout/index.html` — Breakout Arcade
Self-contained. Layout A (fullscreen canvas). HUD is an absolute-positioned `<div>`.

Key variables:
| Variable | Type | Description |
|---|---|---|
| `state` | string | `idle \| running \| paused \| dead` |
| `ball` | object | `{x,y,vx,vy,destroyed}` |
| `paddle` | object | `{x,y,w,h}` |
| `bricks` | object[] | `{x,y,w,h,row,hp,alive}` |
| `keys` | Set | Currently held keyboard keys |
| `level` | number | Current level (starts at 1) |
| `lives` | number | Remaining lives (starts at 3) |

Key functions:
- `reflectPaddle()` — calculates ball deflection angle based on hit position on paddle
- `initLevel()` — positions bricks, paddle, and ball for current level
- `loop()` → `update()` + `draw()` — RAF game loop
- `resize()` — resizes canvas to fit wrapper, recalculates positions

CSS: `html,body{overflow:hidden}` · `#overlay.hidden{display:none!important}`

---

### `minesweeper/index.html` — Minesweeper
Self-contained. Layout B (two-column panels). Scroll allowed below 768px.

Key variables:
| Variable | Type | Description |
|---|---|---|
| `grid` | object[][] | 2D array of `{mine,revealed,flagged,adjacent}` |
| `diff` | string | `'easy'\|'medium'\|'hard'` |
| `firstClick` | boolean | Whether mines have been placed yet |
| `minesLeft` | number | `totalMines − flags` |
| `DIFFICULTIES` | object | Config for each level: cols, rows, mines, localStorage key |

Key functions:
- `buildGrid()` — initialises empty grid for selected difficulty
- `placeMines(safeRow, safeCol)` — places mines after first click, computes adjacent counts
- `reveal(r, c)` — recursive flood fill for zero-adjacent cells
- `handleClick(r, c)` — first-click mine placement then reveal
- `handleRightClick(r, c)` — toggle flag
- `handleChord(r, c)` — auto-reveal neighbours when flag count matches number

---

### `flappy-bird/index.html` — Flappy Bird
Self-contained. Layout A (fullscreen canvas).

Key variables:
| Variable | Type | Description |
|---|---|---|
| `state` | string | `idle \| running \| dead` |
| `bird` | object | `{x, y, vy, angle}` |
| `pipes` | object[] | `{x, gapY, scored}` |
| `stars` | object[] | `{x, y, r}` — parallax background dots |
| `GRAVITY` | 0.4 | px/frame downward acceleration |
| `FLAP_VY` | −7 | px/frame vertical velocity on flap |
| `PIPE_GAP` | 150 | px between top and bottom pipe |

Key functions:
- `gameLoop(timestamp)` — RAF loop with delta-time (capped 50ms)
- `update(delta)` — physics, pipe scroll, scoring, collision
- `drawBird(x, y, angle, wingUp)` — canvas path rendering of bird
- `drawPipe(x, gapY)` — draws top + bottom pipe with caps
- `flap()` — applies FLAP_VY impulse; starts game if idle
- `die()` — freezes state, draws death pose, shows overlay after 600ms
```

- [ ] Verify `docs/FEATURES.md` has entries for all 5 new games
- [ ] Verify `docs/CODEBASE.md` has entries for all 5 new game files
- [ ] Verify `index.html` hub shows 8 game cards

- [ ] **Commit**
```bash
git add index.html docs/FEATURES.md docs/CODEBASE.md
git commit -m "docs: add hub cards and docs for 5 new games"
```
