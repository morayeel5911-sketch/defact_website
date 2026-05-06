#!/usr/bin/env python3
"""
generate_manifests.py — Regeneriert .manifest und manifest.json fuer alle ComfyUI-Asset-Kategorien.
"""
import json
import os
from pathlib import Path

BASE = os.environ.get("LOCAL_BASE", "/Volumes/T7/Vault_T7/00-Projects/defact-3d/public/assets/comfy")
CATEGORIES = ["products", "textures", "backgrounds", "heroes", "raw"]

def generate():
    base = Path(BASE)
    total = 0
    for cat in CATEGORIES:
        cat_dir = base / cat
        cat_dir.mkdir(parents=True, exist_ok=True)
        assets = sorted([
            f for f in cat_dir.iterdir()
            if f.is_file() and not f.name.startswith(".") and not f.name.endswith(".tmp")
        ])
        names = [f.name for f in assets]
        total += len(names)

        # .manifest (plain text)
        (cat_dir / ".manifest").write_text("\n".join(names) + "\n")

        # manifest.json (structured)
        data = {
            "category": cat,
            "assets": names,
            "formats": sorted({f.suffix.lstrip(".").lower() for f in assets})
        }
        (cat_dir / "manifest.json").write_text(json.dumps(data, indent=2) + "\n")

        print(f"[{cat}] {len(names)} assets")
        for n in names:
            print(f"  - {n}")

    print(f"\nTotal: {total} assets across {len(CATEGORIES)} categories")

if __name__ == "__main__":
    generate()
