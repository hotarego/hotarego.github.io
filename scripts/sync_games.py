"""Build games.json and screenshot assets from the game folders in the workspace.

Every sibling folder of this site that contains a game.json is treated as a game.
Run from anywhere:

    python scripts/sync_games.py          # write games.json and copy screenshots
    python scripts/sync_games.py --check  # exit 1 if games.json is out of date
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

SITE_DIR = Path(__file__).resolve().parent.parent
STATUSES = ("released", "beta", "in-development", "concept")
REQUIRED = ("id", "title", "tagline", "description", "status", "platforms")
ID_PATTERN = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
VERSION_PATTERN = re.compile(r'versionName\s*=\s*"([^"]+)"')
PUBLIC_FIELDS = (
    "id", "title", "tagline", "description", "status", "platforms", "genres",
    "tech", "highlights", "accent", "links",
)


class CatalogError(Exception):
    pass


def read_version(game_dir: Path, meta: dict) -> str | None:
    source = meta.get("versionSource")
    if not source:
        return meta.get("version")
    path = game_dir / source
    if not path.is_file():
        raise CatalogError(f"{meta['id']}: versionSource not found: {source}")
    match = VERSION_PATTERN.search(path.read_text(encoding="utf-8"))
    if not match:
        raise CatalogError(f"{meta['id']}: no versionName in {source}")
    return match.group(1)


def read_updated(game_dir: Path) -> str | None:
    if not (game_dir / ".git").exists():
        return None
    result = subprocess.run(
        ["git", "-C", str(game_dir), "log", "-1", "--format=%cs"],
        capture_output=True, text=True, check=False,
    )
    return result.stdout.strip() or None


def validate(meta: dict, source: Path) -> None:
    missing = [key for key in REQUIRED if not meta.get(key)]
    if missing:
        raise CatalogError(f"{source}: missing {', '.join(missing)}")
    if not ID_PATTERN.match(meta["id"]):
        raise CatalogError(f"{source}: id must be lowercase-kebab-case, got {meta['id']!r}")
    if meta["status"] not in STATUSES:
        raise CatalogError(f"{source}: status must be one of {', '.join(STATUSES)}")
    if not isinstance(meta["platforms"], list):
        raise CatalogError(f"{source}: platforms must be a list")


def find_games(workspace: Path, site_dir: Path) -> list[tuple[Path, dict]]:
    games = []
    for folder in sorted(p for p in workspace.iterdir() if p.is_dir()):
        manifest = folder / "game.json"
        if folder.resolve() == site_dir.resolve() or not manifest.is_file():
            continue
        meta = json.loads(manifest.read_text(encoding="utf-8"))
        validate(meta, manifest)
        games.append((folder, meta))
    ids = [meta["id"] for _, meta in games]
    duplicates = sorted({i for i in ids if ids.count(i) > 1})
    if duplicates:
        raise CatalogError(f"duplicate game ids: {', '.join(duplicates)}")
    return games


def build_catalog(workspace: Path, site_dir: Path) -> tuple[dict, dict[Path, Path]]:
    """Return the catalog and a {source: destination} map of screenshots to copy."""
    entries, copies = [], {}
    for game_dir, meta in find_games(workspace, site_dir):
        entry = {key: meta[key] for key in PUBLIC_FIELDS if key in meta}
        entry["version"] = read_version(game_dir, meta)
        entry["updated"] = read_updated(game_dir)
        shots = []
        for rel in meta.get("screenshots", []):
            src = game_dir / rel
            if not src.is_file():
                raise CatalogError(f"{meta['id']}: screenshot not found: {rel}")
            dest_rel = f"assets/games/{meta['id']}/{src.name}"
            copies[src] = site_dir / dest_rel
            shots.append(dest_rel)
        entry["screenshots"] = shots
        entries.append(entry)
    entries.sort(key=lambda g: (STATUSES.index(g["status"]), g["title"].lower()))
    return {"games": entries}, copies


def render(catalog: dict) -> str:
    return json.dumps(catalog, indent=2, ensure_ascii=False) + "\n"


def sync(workspace: Path, site_dir: Path, check: bool = False) -> bool:
    """Write games.json and assets. Returns True if anything was (or would be) changed."""
    catalog, copies = build_catalog(workspace, site_dir)
    output = site_dir / "games.json"
    text = render(catalog)
    changed = not output.is_file() or output.read_text(encoding="utf-8") != text
    for src, dest in copies.items():
        if not dest.is_file() or dest.read_bytes() != src.read_bytes():
            changed = True
            if not check:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(src, dest)
    games_assets = site_dir / "assets" / "games"
    if games_assets.is_dir():
        keep = {dest.resolve() for dest in copies.values()}
        for path in sorted(games_assets.rglob("*"), reverse=True):
            if path.is_file() and path.resolve() not in keep:
                changed = True
                if not check:
                    path.unlink()
            elif path.is_dir() and not check and not any(path.iterdir()):
                path.rmdir()
    if changed and not check:
        output.write_text(text, encoding="utf-8", newline="\n")
    return changed


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="fail if the site is out of date")
    args = parser.parse_args(argv)
    try:
        changed = sync(SITE_DIR.parent, SITE_DIR, check=args.check)
    except CatalogError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2
    if args.check:
        print("out of date: run python scripts/sync_games.py" if changed else "up to date")
        return 1 if changed else 0
    print("games.json updated" if changed else "games.json already up to date")
    return 0


if __name__ == "__main__":
    sys.exit(main())
