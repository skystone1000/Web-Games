## Game Input

```
GAME_TITLE:       Hangman
GAME_FOLDER:      hangman
GAME_EMOJI:       🪢
GENRE_TAG:        Word
SHORT_HUB_DESC:   Guess the hidden word one letter at a time. Six wrong guesses and it's over —
                  can you figure it out before the hangman is complete?

LAYOUT_TYPE:      C — Centered board
                  SVG gallows on the left, word blanks in the center, A–Z letter grid below.
                  Stat row (streak, wins/losses, wrong count) sits inline above the gallows+blanks.

MOBILE_SCROLL:    yes, below 600px

GAME_DESCRIPTION:
  Objective: A random word is chosen from a built-in list. The player guesses one letter at a time
  by clicking (or typing) A–Z. Correct letters are revealed in their positions on the word blanks.
  Wrong guesses progressively draw the hangman figure. 6 wrong guesses = game over.

  Win condition: All letters revealed before 6 wrong guesses = win. 6 wrong guesses = loss.
  After each outcome, an overlay shows the full word and a "New Word" button.

  Turn structure: Turn-based — each letter click is one guess.

  Player count: Single player.

  Special mechanics:
  - Word list: ~300 common English words (5–9 letters, no proper nouns) bundled inline in the
    script. Each word is tagged with one of 5 categories: Animal, Food, Object, Place, Action.
  - Category label (e.g., "Animal") is shown above the blanks; no other hint is given.
  - Letter buttons (A–Z grid): correct guesses turn the button green; wrong guesses turn it red.
    Both are disabled after being used.
  - Hint (one use per game): reveals one random un-guessed correct letter, but counts as +1
    wrong guess penalty toward the 6-guess limit. The hint button is disabled after use.
  - Win streak: consecutive wins within a session. Resets on any loss.

  Score model:
  - Wins and losses tracked within the session.
  - Win streak persists across sessions via localStorage key "hangmanStreak".

  Visual feedback:
  - Gallows drawn as inline SVG. 6 stages reveal body parts progressively:
      1 wrong = head, 2 = body, 3 = left arm, 4 = right arm, 5 = left leg, 6 = right leg.
    Each part animates in with a CSS stroke-dashoffset draw animation (200ms per part).
  - Correct guess: letter blank scales in (scale 0→1, 150ms) with a cyan colour flash.
  - Win state: all blanks glow green; a CSS confetti shimmer overlays the board area.
  - Lose state: word is revealed in red across the blanks; gallows figure shakes (CSS keyframe).
  - Wrong guess counter displayed as "X / 6" below the gallows.

CONTROLS:
  - Click letter button (A–Z grid): guess that letter
  - Keyboard A–Z: guess the corresponding letter (only active letters, ignores used ones)
  - "New Word" button (on win/lose overlay): reset game, pick new word, keep streak/tally
  - "Hint" button (in-game): reveal one letter at cost of +1 wrong guess (disabled after use)

SIDEBAR_STATS:
  - Wrong guesses remaining shown as "X / 6" below the SVG gallows
  - Win Streak (persists via localStorage "hangmanStreak")
  - Wins / Losses (session, shown inline near the category label)

EXTRA_REQUIREMENTS:
  - Gallows: inline SVG with each body part as a separate <path> or <line> with
    stroke-dasharray / stroke-dashoffset animation. Base structure (gallows frame) always
    visible; body parts hidden (opacity 0) and revealed sequentially on wrong guesses.
  - Word blanks: a flex row of <span> elements, one per letter; each shows "_" until guessed,
    then the letter with a scale-in animation.
  - Letter grid: 3 rows (A–I, J–R, S–Z) of <button> elements, minimum 40×40px for touch.
  - Word list and category map must be embedded as a JS array in the <script> block — no
    external file.
  - Do not add audio.
```
