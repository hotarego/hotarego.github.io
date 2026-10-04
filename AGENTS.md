# Hotarego Games website

Static GitHub Pages site for https://hotarego.github.io. No build step: `index.html`, `styles.css`
and `app.js` are served as-is, and `app.js` renders the game list from `games.json`.

## Source of truth
`games.json` and `assets/games/` are generated. Never edit them by hand.
Each game folder in the workspace (a sibling of this folder) owns a `game.json` describing it.

## Keeping the site in sync with the games
Whenever a game's `game.json`, screenshots, clips or version changes, or a game is added or removed:

1. `python scripts/sync_games.py`
2. `python -m unittest discover -s tests`
3. Commit and push this repo together with the game change.

`python scripts/sync_games.py --check` exits non-zero when the site is out of date.

## game.json fields
- Required: `id` (lowercase-kebab-case, immutable), `title`, `tagline`, `description`,
  `status` (`released` | `beta` | `in-development` | `concept`), `platforms` (list).
- Optional: `genres`, `tech`, `highlights`, `accent` (CSS color), `screenshots` and `clips`
 (paths relative to the game folder; `clips` are the promo videos), `links` (`playStore`,
 `download`, `trailer`, `repo`; https URLs only), `version` or `versionSource` (file containing
 `versionName = "x.y.z"`).
- `updated` is taken from the game repo's latest commit date.

## Languages
The site is in English (`en`) and Persian (`fa`). It follows the visitor's browser languages by
default, and the switcher can pin either language or go back to the system default.

- `title`, `tagline`, `description`, `platforms`, `genres`, `highlights`, `screenshots` and `clips`
 are either a plain English value or `{"en": ..., "fa": ...}`. English is required; a missing `fa`
 falls back to English. `games.json` always publishes the `{"en": ..., "fa": ...}` form. Media files
 are copied to `assets/games/<id>/<language>/` so both languages can use the same filename.
- Every page string lives in `STRINGS` in `app.js` with both languages. Keep `index.html`'s English
  text as the no-JavaScript fallback.
- Use logical CSS properties (`padding-inline-start`, `inset-inline-end`, ...) so RTL works, and
  never set `letter-spacing` on Persian text.

Only the fields above are published. Game repos may be private, so never link to them unless they
are public.
