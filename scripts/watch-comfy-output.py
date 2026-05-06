#!/usr/bin/env python3
"""
ComfyUI Output Watcher (Mac-side Polling)
=========================================
Polls the Tower-PC ComfyUI output directory via SSH and auto-syncs
new/changed files to the local Next.js public directory.

Usage:
    python3 watch-comfy-output.py [--interval=30] [--optimize]

Requirements:
    - SSH key-auth to Tower-PC already configured
    - sync_comfy_assets.py in the same directory
"""

import argparse
import os
import subprocess
import sys
import time
from pathlib import Path

DEFAULT_INTERVAL = 30  # seconds
SCRIPT_DIR = Path(__file__).parent.resolve()
SYNC_SCRIPT = SCRIPT_DIR / "sync_comfy_assets.py"


def ensure_daemon_log():
    log_dir = Path.home() / ".local" / "share" / "comfy-sync"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir / "watchdog.log"


def poll_once(optimize: bool) -> int:
    if not SYNC_SCRIPT.exists():
        print(f"[!] sync_comfy_assets.py not found at {SYNC_SCRIPT}")
        return 1

    cmd = [sys.executable, str(SYNC_SCRIPT), "--mode=full"]
    if optimize:
        cmd.append("--optimize")

    result = subprocess.run(cmd, capture_output=True, text=True)
    # Only print if something actually happened (not just "0 files need transfer")
    if "Pulled:" in result.stdout:
        for line in result.stdout.splitlines():
            if line.strip():
                print(line)
    return result.returncode


def watch(interval: int, optimize: bool):
    print(f"=== ComfyUI Watchdog ===")
    print(f"Polling every {interval}s | Optimize: {optimize}")
    print(f"Sync script: {SYNC_SCRIPT}")
    print("Press Ctrl+C to stop.\n")

    try:
        while True:
            poll_once(optimize)
            time.sleep(interval)
    except KeyboardInterrupt:
        print("\n[!] Interrupted by user.")
        raise SystemExit(0)


def main():
    parser = argparse.ArgumentParser(description="Watch ComfyUI output and auto-sync")
    parser.add_argument("--interval", type=int, default=DEFAULT_INTERVAL,
                        help=f"Polling interval in seconds (default {DEFAULT_INTERVAL})")
    parser.add_argument("--optimize", action="store_true",
                        help="Convert PNG/JPG to WebP after sync")
    parser.add_argument("--daemon", action="store_true",
                        help="Run as background daemon (logs to ~/.local/share/comfy-sync/watchdog.log)")
    args = parser.parse_args()

    if args.daemon:
        log_path = ensure_daemon_log()
        print(f"Daemon mode: logging to {log_path}")
        import logging
        logging.basicConfig(
            filename=str(log_path),
            level=logging.INFO,
            format="%(asctime)s %(message)s",
        )
        # Redirect stdout/stderr to log
        sys.stdout = open(str(log_path), "a")
        sys.stderr = sys.stdout

    watch(args.interval, args.optimize)


if __name__ == "__main__":
    main()
