## Game Input

```
GAME_TITLE:       Wordle
GAME_FOLDER:      wordle
GAME_EMOJI:       🟩
GENRE_TAG:        Word

SHORT_HUB_DESC:   Guess the secret 5-letter word in six tries. Each guess reveals which letters
                  are correct, misplaced, or absent — deduce the answer before your guesses run out.

LAYOUT_TYPE:      B — Two-column panels
                  Left panel: 6×5 guess grid + on-screen keyboard below it.
                  Right sidebar: title, description, stat counters, status pill, rules, action buttons.

MOBILE_SCROLL:    yes, below 700px

GAME_DESCRIPTION:
  Objective: Guess a secret 5-letter English word. Players have 6 attempts.

  Win condition: Guessing the exact word (all 5 tiles turn green) wins the round. Exhausting all 6
  guesses without the correct word is a loss — the secret word is revealed.

  Turn structure: Turn-based. Each turn the player types a 5-letter word and presses Enter.
  The row is evaluated letter by letter:
    - Correct letter + correct position → tile turns green (var(--accent)).
    - Correct letter + wrong position   → tile turns yellow (#F5A623).
    - Letter not in the word            → tile turns dark grey (var(--surface2)).

  Player count: Single player.

  Special mechanics:
  - Only valid 5-letter English words may be submitted (validate against a JS word list bundled
    in the script; show a brief shake animation + "Not a word" toast on invalid input).
  - Letter reveal is animated: tiles flip one by one left-to-right (CSS rotateX flip, 350ms each,
    80ms stagger between tiles) — colour is revealed mid-flip.
  - On-screen keyboard tiles update to reflect the best known state of each letter
    (green > yellow > grey precedence).
  - A "bounce" animation plays on the winning row when the player solves the puzzle.
  - A "shake" animation plays on the active row for invalid words.
  - After each completed game show a result overlay with: win/loss label, the secret word,
    current streak, and a "Play Again" / "New Word" button that picks a new random word.

  Score model:
  - No numeric score. Track wins/losses and current win streak.
  - Streak persists via localStorage key "wordleStreak".
  - Win count and games played persist via localStorage keys "wordleWins" / "wordlePlayed".

  Visual feedback:
  - Tile states: empty (border var(--border)), filled-not-submitted (border rgba(255,255,255,0.25)),
    correct (green, var(--accent)), present (yellow, #F5A623), absent (var(--surface2)).
  - Active tile gets a brief scale-bounce when a letter is typed (scale 1 → 1.1 → 1, 100ms).
  - On-screen keyboard keys mirror tile colouring.

CONTROLS:
  - Physical keyboard: type letters, Backspace to delete, Enter to submit guess
  - On-screen keyboard: tap letter keys, Backspace, Enter
  - "New Word" button: pick a new random secret word, reset the grid

SIDEBAR_STATS:
  - Played (total games, persists localStorage "wordlePlayed")
  - Wins (persists localStorage "wordleWins")
  - Streak (current win streak, persists localStorage "wordleStreak")

EXTRA_REQUIREMENTS:
  - Bundle a curated word list of ~2500 common 5-letter words inline in the JS (const WORDS = [...])
    for answer selection, and a larger ~10000-word valid-guess list for validation.
  - Do NOT use an external API for word lists — everything must work offline.
  - Display the current guess number above the grid (e.g. "Guess 3 / 6") as a small label.
  - Toast notifications (brief disappearing pill at top of board area) for:
      "Not in word list"  (invalid submission)
      "Not enough letters" (fewer than 5)
      The secret word after a loss (e.g. "The word was BRAVE")
  - Toast auto-dismisses after 1.8s with a fade-out.
```
