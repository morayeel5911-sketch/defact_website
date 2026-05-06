#!/usr/bin/env python3
"""
ComfyUI Asset Sync Engine
=========================
Pulls assets from Tower-PC (Windows, ComfyUI output) to local Mac (Next.js public dir).
Uses SSH + remote Python for checksums, SCP for transfer.
No rsync required on Windows.

Usage:
    python3 sync_comfy_assets.py [--mode=full|check|pull] [--optimize] [--dry-run]

Modes:
    full    - Full sync: list remote, compare checksums, pull differences
    check   - Only report differences without transferring
    pull    - Transfer all matching files without checksum comparison

Environment:
    COMFY_TOWER_HOST       IP/hostname of Tower-PC (default: 192.168.178.84)
    COMFY_TOWER_USER       SSH user on Tower-PC (default: 4ngl)
    COMFY_TOWER_OUTPUT_DIR Remote output path in POSIX style (default: /e/ComfyUI/ComfyUI/output)
    COMFY_LOCAL_ASSET_DIR  Local destination (default: /Volumes/T7/Vault_T7/00-Projects/defact-3d/public/assets/comfy)
    COMFY_SSH_KEY          Path to SSH private key (optional)
"""

import argparse
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

TOWER_HOST = os.environ.get("COMFY_TOWER_HOST", "192.168.178.84")
TOWER_USER = os.environ.get("COMFY_TOWER_USER", "4ngl")
# Windows Tower PC uses E:\ drive. We access files via SCP through a junction
# in the user's home directory (created manually on Tower):
#   mklink /J C:\Users\4NGL\comfy-output E:\ComfyUI\ComfyUI\output
# Listing and MD5 still use the real path via Python on the remote.
TOWER_OUTPUT_DIR = os.environ.get("COMFY_TOWER_OUTPUT_DIR", "E:\\ComfyUI\\ComfyUI\\output")
SCP_REMOTE_PREFIX = os.environ.get("COMFY_SCP_PREFIX", "comfy-output")
LOCAL_ASSET_DIR = os.environ.get(
    "COMFY_LOCAL_ASSET_DIR",
    "/Volumes/T7/Vault_T7/00-Projects/defact-3d/public/assets/comfy",
)

SUPPORTED_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tiff"}

CATEGORIES: Dict[str, List[str]] = {
    "heroes": ["hero", "banner", "cover", "main", "headline"],
    "textures": ["texture", "material", "fabric", "surface"],
    "backgrounds": ["bg", "background", "scene", "env", "environment"],
    "products": ["product", "item", "shoe", "bag", "model", "defact"],
}


def ssh_cmd_base() -> List[str]:
    cmd = ["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10"]
    key = os.environ.get("COMFY_SSH_KEY")
    if key:
        cmd.extend(["-i", key])
    cmd.append(f"{TOWER_USER}@{TOWER_HOST}")
    return cmd


def ssh_exec(remote_cmd: str) -> Tuple[int, str, str]:
    full = ssh_cmd_base() + [remote_cmd]
    result = subprocess.run(full, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr


def remote_list_files() -> List[str]:
    """List image files in remote output dir using remote Python (py.exe on Windows)."""
    py_code = (
        "import os, json; "
        f"base=r'{TOWER_OUTPUT_DIR}'; "
        "files=[os.path.join(dp,f) for dp,dn,fn in os.walk(base) for f in fn]; "
        "print(json.dumps(files))"
    )
    rc, stdout, stderr = ssh_exec(f'py -c "{py_code}"')
    if rc != 0:
        print(f"[!] Failed to list remote files: {stderr.strip()}")
        return []
    try:
        files = json.loads(stdout.strip().splitlines()[-1])
        return [f for f in files if any(f.lower().endswith(ext) for ext in SUPPORTED_EXT)]
    except json.JSONDecodeError:
        print(f"[!] Failed to parse remote file list.\nstdout: {stdout}\nstderr: {stderr}")
        return []


def remote_checksums(files: List[str]) -> Dict[str, str]:
    """Compute MD5 checksums on remote by uploading a temporary Python script."""
    if not files:
        return {}

    import base64

    script_lines = [
        "import hashlib, json",
        "files = " + repr(files),
        "checksums = {}",
        "for f in files:",
        "    try:",
        "        with open(f, 'rb') as fh:",
        "            data = fh.read()",
        "        checksums[f] = hashlib.md5(data).hexdigest()",
        "    except Exception as e:",
        "        checksums[f] = 'ERR: ' + str(e)",
        "print(json.dumps(checksums))",
    ]
    remote_script = "C:/Users/4NGL/.comfy_sync_tmp.py"
    script_text = "\n".join(script_lines)
    b64 = base64.b64encode(script_text.encode()).decode()

    upload = ssh_cmd_base() + [
        f"powershell -Command \"$b=[Convert]::FromBase64String('{b64}');[IO.File]::WriteAllBytes('{remote_script}', $b)\""
    ]
    result = subprocess.run(upload, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[!] Failed to upload temp script: {result.stderr.strip()}")
        return {}

    rc, stdout, stderr = ssh_exec(f'py "{remote_script}"')
    ssh_exec(f'del "{remote_script}"')
    if rc != 0:
        print(f"[!] Remote checksum failed: {stderr.strip()}")
        return {}
    try:
        return json.loads(stdout.strip().splitlines()[-1])
    except json.JSONDecodeError:
        print(f"[!] Failed to parse checksums.\nstdout: {stdout}\nstderr: {stderr}")
        return {}


def local_checksum(filepath: Path) -> str:
    h = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def categorize_filename(name: str) -> str:
    """Auto-categorize based on filename keywords."""
    lower = name.lower()
    for category, keywords in CATEGORIES.items():
        if any(kw in lower for kw in keywords):
            return category
    # Default: products for anything unrecognized
    return "products"


def resolve_local_path(remote_path: str) -> Path:
    """Map a remote file path to a local categorized path."""
    # Works with both POSIX and Windows remote paths
    filename = remote_path.replace("\\", "/").split("/")[-1]
    category = categorize_filename(filename)
    return Path(LOCAL_ASSET_DIR) / category / filename


def scp_pull(remote_path: str, local_path: Path) -> bool:
    """Pull a single file via SCP using the junction prefix for Windows compatibility."""
    local_path.parent.mkdir(parents=True, exist_ok=True)

    # Convert E:\\... absolute path to junction-relative SCP path
    # remote_path = "E:\\ComfyUI\\ComfyUI\\output\\flux2_separate_vae_00001_.png"
    # -> scp_source = "comfy-output/flux2_separate_vae_00001_.png"
    norm_remote = remote_path.replace("\\", "/")
    norm_base = TOWER_OUTPUT_DIR.replace("\\", "/")
    if norm_remote.startswith(norm_base):
        rel = norm_remote[len(norm_base):].lstrip("/")
    else:
        rel = norm_remote.split("/")[-1]
    scp_source = f"{SCP_REMOTE_PREFIX}/{rel}"

    scp_cmd = ["scp", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10"]
    key = os.environ.get("COMFY_SSH_KEY")
    if key:
        scp_cmd.extend(["-i", key])
    scp_cmd.extend([f"{TOWER_USER}@{TOWER_HOST}:{scp_source}", str(local_path)])
    result = subprocess.run(scp_cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  [!] SCP failed for {remote_path}: {result.stderr.strip()}")
        return False
    return True


def optimize_file(local_path: Path, quality: int = 85) -> Optional[Path]:
    """Convert PNG/JPG to WebP using Pillow or sips. Returns path to webp if created."""
    if not str(local_path).lower().endswith((".png", ".jpg", ".jpeg")):
        return None
    webp_path = local_path.with_suffix(".webp")
    try:
        from PIL import Image
        with Image.open(local_path) as img:
            img.save(webp_path, "WEBP", quality=quality, method=6)
        print(f"  [opt] Created {webp_path.name}")
        return webp_path
    except ImportError:
        pass
    # Fallback to sips on macOS
    result = subprocess.run(
        ["sips", "-s", "format", "webp", "-s", f"quality {quality}", str(local_path), "--out", str(webp_path)],
        capture_output=True,
    )
    if result.returncode == 0:
        print(f"  [opt] Created {webp_path.name} (sips)")
        return webp_path
    return None


def sync(mode: str, optimize: bool, dry_run: bool) -> Dict[str, Any]:
    print(f"=== ComfyUI Asset Sync ===")
    print(f"Tower: {TOWER_USER}@{TOWER_HOST}:{TOWER_OUTPUT_DIR}")
    print(f"Local: {LOCAL_ASSET_DIR}")
    print(f"Mode:  {mode} | Optimize: {optimize} | Dry-run: {dry_run}\n")

    # Ensure local base dir exists
    Path(LOCAL_ASSET_DIR).mkdir(parents=True, exist_ok=True)

    # Gather remote files
    remote_files = remote_list_files()
    if not remote_files:
        print("[!] No remote files found.")
        return {"pulled": 0, "skipped": 0, "failed": 0}

    print(f"[*] Found {len(remote_files)} remote files.")

    if mode == "pull":
        to_pull = remote_files
        checksums = {}
    else:
        checksums = remote_checksums(remote_files)
        to_pull = []
        skipped = 0
        for rf in remote_files:
            local = resolve_local_path(rf)
            if local.exists():
                local_sum = local_checksum(local)
                remote_sum = checksums.get(rf, "")
                if local_sum == remote_sum:
                    skipped += 1
                    continue
            to_pull.append(rf)
        print(f"[*] {skipped} files already up-to-date.")
        print(f"[*] {len(to_pull)} files need transfer.\n")

    if dry_run:
        print("[DRY-RUN] Would transfer:")
        for rf in to_pull:
            print(f"  -> {resolve_local_path(rf)}")
        return {"pulled": 0, "skipped": len(remote_files) - len(to_pull), "failed": 0}

    pulled = 0
    failed = 0
    for rf in to_pull:
        local = resolve_local_path(rf)
        print(f"[>] {os.path.basename(rf)} -> {local.relative_to(LOCAL_ASSET_DIR)}")
        if scp_pull(rf, local):
            pulled += 1
            if optimize:
                optimize_file(local)
        else:
            failed += 1

    print(f"\n=== Sync Complete ===")
    print(f"Pulled:   {pulled}")
    print(f"Skipped:  {len(remote_files) - len(to_pull) if mode != 'pull' else 'N/A'}")
    print(f"Failed:   {failed}")
    return {"pulled": pulled, "skipped": len(remote_files) - len(to_pull) - failed if mode != 'pull' else 0, "failed": failed}


def main() -> int:
    parser = argparse.ArgumentParser(description="ComfyUI Asset Sync")
    parser.add_argument("--mode", choices=["full", "check", "pull"], default="full")
    parser.add_argument("--optimize", action="store_true", help="Convert PNG/JPG to WebP after sync")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen")
    parser.add_argument("--quality", type=int, default=85, help="WebP quality (default 85)")
    args = parser.parse_args()

    result = sync(args.mode, args.optimize, args.dry_run)
    return 0 if result["failed"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
