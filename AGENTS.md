# Hotarego Games website

Static GitHub Pages site for https://hotarego.github.io. No build step: `index.html`, `styles.css`
and `app.js` are served as-is, and `app.js` renders the game list from `games.json`.

## Source of truth
`games.json` and `assets/games/` are generated. Never edit them by hand.
Each game folder in the workspace (a sibling of this folder) owns a `game.json` describing it.

## Keeping the site in sync with the games
Whenever a game's `game.json`, screenshots or version changes, or a game is added or removed:

1. `python scripts/sync_games.py`
2. `python -m unittest discover -s tests`
3. Commit and push this repo together with the game change.

`python scripts/sync_games.py --check` exits non-zero when the site is out of date.

## game.json fields
- Required: `id` (lowercase-kebab-case, immutable), `title`, `tagline`, `description`,
  `status` (`released` | `beta` | `in-development` | `concept`), `platforms` (list).
- Optional: `genres`, `tech`, `highlights`, `accent` (CSS color), `screenshots` (paths relative to
  the game folder), `links` (`playStore`, `download`, `trailer`, `repo`; https URLs only),
  `version` or `versionSource` (file containing `versionName = "x.y.z"`).
- `updated` is taken from the game repo's latest commit date.

Only the fields above are published. Game repos may be private, so never link to them unless they
are public.
