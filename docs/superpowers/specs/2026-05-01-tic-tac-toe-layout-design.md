# Tic Tac Toe Layout — No Scroll + Mobile Scroll Design

**Date:** 2026-05-01  
**File:** `tic-tac-toe/index.html`

## Goal

- **Desktop:** game fits entirely in the viewport with no scroll; board fills all available vertical space.
- **Mobile (≤900px):** natural page scroll, all content accessible by scrolling down.

## Approach

CSS-only. Container queries on desktop for precise board sizing; media query overrides on mobile for natural scroll.

## Desktop Changes (no breakpoint — applies everywhere above 900px)

| Target | Change | Reason |
|---|---|---|
| `.game-area` | Remove `overflow-y: auto`; change `place-items: center` → `align-items: stretch; justify-items: center` | Game shell must fill full height of the area, not just center within it |
| `.game-shell` | Change `align-items: start` → `align-items: stretch` | Both columns grow to the same height |
| `.hero-panel` | Add `container-type: size; display: flex; align-items: center; justify-content: center` | Becomes a sized container; board is centered within it |
| `.board` | Add `width: min(100cqw, 100cqh)` | Board takes the largest square fitting the panel's content box |

The board's existing `aspect-ratio: 1` cells already enforce a square overall shape — no additional `aspect-ratio` needed on `.board` itself.

## Mobile Changes (`@media (max-width: 900px)`)

All overrides go inside a new block at the end of the `<style>` tag. The 900px breakpoint matches the existing stacked-layout breakpoint so there's a single consistent threshold.

| Target | Change | Reason |
|---|---|---|
| `body` | `overflow-y: auto` | Overrides `overflow: hidden` set in the game page |
| `.game-viewport` | `height: auto; min-height: 100svh` | Overrides `100vh` from `games.css`; lets content determine height |
| `.game-area` | `overflow-y: visible` | Removes inner scroll zone; document scrolls instead |
| `.game-shell` | `align-items: start` | Resets stretch so stacked columns are natural height |
| `.hero-panel` | `container-type: normal` | Resets container; prevents board from querying a zero-height container |
| `.board` | `width: 100%` | Board fills column width; 3×3 square cells determine height naturally |

## What Is Not Changed

- HTML structure — no markup changes needed.
- The JS game logic — untouched.
- The existing `@media (max-width: 900px)` and `@media (max-width: 560px)` blocks — the new mobile block appends to the end of `<style>`.
- `games.css` — all overrides stay scoped to this file's `<style>` tag.
