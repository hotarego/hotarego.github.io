# hotarego.github.io

The Hotarego Games website: https://hotarego.github.io

The game list is generated from the `game.json` file in each game folder of the workspace:

```bash
python scripts/sync_games.py          # regenerate games.json and screenshots
python -m unittest discover -s tests  # test the generator
python -m http.server 8000            # preview at http://localhost:8000
```

See [AGENTS.md](AGENTS.md) for the `game.json` format and update workflow.
