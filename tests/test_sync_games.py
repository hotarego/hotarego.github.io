import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

import sync_games  # noqa: E402


def write_game(workspace: Path, folder: str, **overrides) -> Path:
    game_dir = workspace / folder
    game_dir.mkdir()
    meta = {
        "id": folder.lower(),
        "title": folder,
        "tagline": "A game.",
        "description": "A longer description.",
        "status": "in-development",
        "platforms": ["Android"],
        "version": "1.0.0",
    }
    meta.update(overrides)
    (game_dir / "game.json").write_text(json.dumps(meta), encoding="utf-8")
    return game_dir


class SyncGamesTest(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.workspace = Path(self._tmp.name)
        self.site = self.workspace / "site"
        self.site.mkdir()

    def tearDown(self):
        self._tmp.cleanup()

    def catalog(self):
        return sync_games.build_catalog(self.workspace, self.site)[0]["games"]

    def test_lists_only_folders_with_game_json(self):
        write_game(self.workspace, "Alpha")
        (self.workspace / "app-core").mkdir()
        self.assertEqual([g["id"] for g in self.catalog()], ["alpha"])

    def test_sorts_by_status_then_title(self):
        write_game(self.workspace, "Zeta", status="released")
        write_game(self.workspace, "Beta", status="concept")
        write_game(self.workspace, "Alpha")
        self.assertEqual([g["id"] for g in self.catalog()], ["zeta", "alpha", "beta"])

    def test_reads_version_from_source_file(self):
        game = write_game(self.workspace, "Alpha", versionSource="app/build.gradle.kts")
        (game / "app").mkdir()
        (game / "app" / "build.gradle.kts").write_text('versionName = "2.3.4"', encoding="utf-8")
        self.assertEqual(self.catalog()[0]["version"], "2.3.4")

    def test_internal_fields_are_not_published(self):
        game = write_game(self.workspace, "Alpha", versionSource="v.txt", secretNote="x")
        (game / "v.txt").write_text('versionName = "1.0"', encoding="utf-8")
        entry = self.catalog()[0]
        self.assertNotIn("versionSource", entry)
        self.assertNotIn("secretNote", entry)

    def test_plain_fields_are_published_as_english(self):
        write_game(self.workspace, "Alpha", highlights=["Fun"])
        entry = self.catalog()[0]
        self.assertEqual(entry["title"], {"en": "Alpha"})
        self.assertEqual(entry["platforms"], {"en": ["Android"]})
        self.assertEqual(entry["highlights"], {"en": ["Fun"]})

    def test_translations_are_published_in_language_order(self):
        write_game(
            self.workspace, "Alpha",
            title={"fa": "آلفا", "en": "Alpha"},
            platforms={"en": ["Android"], "fa": ["اندروید"]},
            tech=["Kotlin"],
        )
        entry = self.catalog()[0]
        self.assertEqual(list(entry["title"].items()), [("en", "Alpha"), ("fa", "آلفا")])
        self.assertEqual(entry["platforms"]["fa"], ["اندروید"])
        self.assertEqual(entry["tech"], ["Kotlin"])

    def test_sorts_by_english_title(self):
        write_game(self.workspace, "Beta", title={"en": "Beta", "fa": "الف"})
        write_game(self.workspace, "Alpha", title={"en": "Alpha", "fa": "ی"})
        self.assertEqual([g["id"] for g in self.catalog()], ["alpha", "beta"])

    def test_rejects_invalid_manifests(self):
        cases = [
            {"status": "shipped"}, {"id": "Bad Id"}, {"title": ""}, {"platforms": "Android"},
            {"title": {"fa": "فقط فارسی"}}, {"title": {"en": "A", "de": "B"}}, {"tagline": {"en": "A", "fa": " "}},
            {"highlights": {"en": ["ok"], "fa": "not a list"}}, {"genres": ["ok", ""]},
        ]
        for overrides in cases:
            with self.subTest(overrides=overrides):
                with tempfile.TemporaryDirectory() as tmp:
                    workspace = Path(tmp)
                    write_game(workspace, "Alpha", **overrides)
                    with self.assertRaises(sync_games.CatalogError):
                        sync_games.build_catalog(workspace, workspace / "site")

    def test_rejects_duplicate_ids(self):
        write_game(self.workspace, "Alpha", id="same")
        write_game(self.workspace, "Beta", id="same")
        with self.assertRaises(sync_games.CatalogError):
            self.catalog()

    def test_rejects_missing_screenshot(self):
        write_game(self.workspace, "Alpha", screenshots=["media/missing.jpg"])
        with self.assertRaises(sync_games.CatalogError):
            self.catalog()

    def test_sync_copies_screenshots_and_removes_stale_assets(self):
        game = write_game(self.workspace, "Alpha", screenshots=["media/one.jpg"])
        (game / "media").mkdir()
        (game / "media" / "one.jpg").write_bytes(b"img")
        stale = self.site / "assets" / "games" / "gone" / "old.jpg"
        stale.parent.mkdir(parents=True)
        stale.write_bytes(b"old")

        self.assertTrue(sync_games.sync(self.workspace, self.site))

        self.assertEqual((self.site / "assets/games/alpha/en/one.jpg").read_bytes(), b"img")
        self.assertFalse(stale.exists())
        self.assertFalse(stale.parent.exists())
        games = json.loads((self.site / "games.json").read_text(encoding="utf-8"))["games"]
        self.assertEqual(games[0]["screenshots"], {"en": ["assets/games/alpha/en/one.jpg"]})
        self.assertNotIn("clips", games[0])

    def test_screenshots_can_differ_per_language(self):
        game = write_game(self.workspace, "Alpha", screenshots={"en": ["media/en.jpg"], "fa": ["media/fa.jpg"]})
        (game / "media").mkdir()
        (game / "media" / "en.jpg").write_bytes(b"en")
        (game / "media" / "fa.jpg").write_bytes(b"fa")
        self.assertEqual(self.catalog()[0]["screenshots"], {
            "en": ["assets/games/alpha/en/en.jpg"],
            "fa": ["assets/games/alpha/fa/fa.jpg"],
        })

    def test_keeps_screenshots_that_share_a_filename(self):
        game = write_game(self.workspace, "Alpha", screenshots={"en": ["en/shot.jpg"], "fa": ["fa/shot.jpg"]})
        for lang in ("en", "fa"):
            (game / lang).mkdir()
            (game / lang / "shot.jpg").write_bytes(lang.encode())
        sync_games.sync(self.workspace, self.site)
        self.assertEqual((self.site / "assets/games/alpha/en/shot.jpg").read_bytes(), b"en")
        self.assertEqual((self.site / "assets/games/alpha/fa/shot.jpg").read_bytes(), b"fa")
        self.assertEqual(self.catalog()[0]["screenshots"], {
            "en": ["assets/games/alpha/en/shot.jpg"],
            "fa": ["assets/games/alpha/fa/shot.jpg"],
        })

    def test_sync_copies_clips(self):
        game = write_game(self.workspace, "Alpha", clips={"en": ["en.mp4"], "fa": ["fa.mp4"]})
        (game / "en.mp4").write_bytes(b"en-clip")
        (game / "fa.mp4").write_bytes(b"fa-clip")
        sync_games.sync(self.workspace, self.site)
        self.assertEqual((self.site / "assets/games/alpha/en/en.mp4").read_bytes(), b"en-clip")
        self.assertEqual((self.site / "assets/games/alpha/fa/fa.mp4").read_bytes(), b"fa-clip")
        games = json.loads((self.site / "games.json").read_text(encoding="utf-8"))["games"]
        self.assertEqual(games[0]["clips"], {
            "en": ["assets/games/alpha/en/en.mp4"],
            "fa": ["assets/games/alpha/fa/fa.mp4"],
        })

    def test_rejects_missing_clip(self):
        write_game(self.workspace, "Alpha", clips=["media/missing.mp4"])
        with self.assertRaises(sync_games.CatalogError):
            self.catalog()

    def test_sync_is_idempotent_and_check_detects_drift(self):
        write_game(self.workspace, "Alpha")
        self.assertTrue(sync_games.sync(self.workspace, self.site))
        self.assertFalse(sync_games.sync(self.workspace, self.site))
        self.assertFalse(sync_games.sync(self.workspace, self.site, check=True))

        write_game(self.workspace, "Beta")
        self.assertTrue(sync_games.sync(self.workspace, self.site, check=True))
        self.assertEqual(len(json.loads((self.site / "games.json").read_text())["games"]), 1)

    def test_guide_link_is_published_and_stills_are_copied_beside_the_handbook(self):
        game = write_game(
            self.workspace, "Alpha", guide="dream-home/",
            guideMedia={"en": ["media/screenshot-home.jpg"], "fa": ["media/screenshot-home-fa.jpg"]},
        )
        (game / "media").mkdir()
        (game / "media" / "screenshot-home.jpg").write_bytes(b"home")
        (game / "media" / "screenshot-home-fa.jpg").write_bytes(b"home-fa")
        sync_games.sync(self.workspace, self.site)
        games = json.loads((self.site / "games.json").read_text(encoding="utf-8"))["games"]
        self.assertEqual(games[0]["guide"], "dream-home/")
        self.assertNotIn("guideMedia", games[0])
        self.assertEqual((self.site / "dream-home/media/en/home.jpg").read_bytes(), b"home")
        self.assertEqual((self.site / "dream-home/media/fa/home.jpg").read_bytes(), b"home-fa")


if __name__ == "__main__":
    unittest.main()
