#!/usr/bin/env bash
# sync-comfy-assets.sh
# Wrapper script for ComfyUI Asset Sync.
# Usage: ./sync-comfy-assets.sh [--optimize] [--dry-run] [--mode=full|check|pull]
#
# Environment overrides:
#   COMFY_TOWER_HOST       (default: 192.168.178.84)
#   COMFY_TOWER_USER       (default: 4ngl)
#   COMFY_TOWER_OUTPUT_DIR (default: /e/ComfyUI/ComfyUI/output)
#   COMFY_LOCAL_ASSET_DIR  (default: /Volumes/T7/Vault_T7/00-Projects/defact-3d/public/assets/comfy)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="${SCRIPT_DIR}/sync_comfy_assets.py"

if [[ ! -f "$PYTHON_SCRIPT" ]]; then
    echo "[!] sync_comfy_assets.py not found in ${SCRIPT_DIR}"
    exit 1
fi

python3 "$PYTHON_SCRIPT" "$@"
