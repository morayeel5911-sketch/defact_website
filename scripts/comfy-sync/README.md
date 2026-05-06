# ComfyUI → Next.js Asset Sync Pipeline

Automatische Zwei-Wege-Synchronisation zwischen Tower-PC (ComfyUI Output) und Mac (DEFACT Next.js).

## Vorraussetzungen

- **Tower-PC:** Windows 11, ComfyUI läuft, OpenSSH-Server aktiv
- **Mac:** macOS, SSH-Key bereits für `4ngl@192.168.178.84` eingerichtet
- **Junction auf Tower-PC:** Einmalig ausführen (admin-Powershell):
  ```powershell
  cmd /c "mklink /J C:\Users\4NGL\comfy-output E:\ComfyUI\ComfyUI\output"
  ```
  (Dadurch wird `E:\ComfyUI\ComfyUI\output` unter `~/comfy-output` per SCP erreichbar.)

## Ordnerstruktur (lokal)

```
public/assets/comfy/
├── products/
├── textures/
├── backgrounds/
├── heroes/
└── raw/
```

## Scripts

### 1. sync-comfy-assets.sh
Wrapper → ruft `sync_comfy_assets.py` auf.

```bash
./sync-comfy-assets.sh --mode=full   # Checksums + nur Änderungen
./sync-comfy-assets.sh --mode=pull   # Alles ziehen
./sync-comfy-assets.sh --mode=check --dry-run  # Was würde passieren?
./sync-comfy-assets.sh --optimize    # Nach dem Pull: PNG → WebP
```

### 2. sync_comfy_assets.py
Python Engine. Umgebungsvariablen:
- `COMFY_TOWER_HOST` — default `192.168.178.84`
- `COMFY_TOWER_USER` — default `4ngl`
- `COMFY_TOWER_OUTPUT_DIR` — default `E:\ComfyUI\ComfyUI\output`
- `COMFY_SCP_PREFIX` — default `comfy-output` (Junction-Name)
- `COMFY_LOCAL_ASSET_DIR` — default `/Volumes/T7/Vault_T7/00-Projects/defact-3d/public/assets/comfy`

### 3. watch-comfy-output.py
Polling-Watcher. Erkennt neue Dateien und synced automatisch.

```bash
python3 watch-comfy-output.py --interval=30 --optimize
python3 watch-comfy-output.py --daemon --interval=60
```

## Next.js Integration

1. `lib/comfyAssets.ts` kopieren → Helper-Funktionen
2. `components/ui/ComfyImage.tsx` kopieren → `<ComfyImage>` Component
3. Assets verwenden:
   ```tsx
   import ComfyImage from "@/components/ui/ComfyImage";
   <ComfyImage category="products" filename="flux2_product_studio_00001_.png" alt="Shoe" />
   ```

## .gitignore

```gitignore
public/assets/comfy/*
```
Generierte Assets sollten **nicht** ins Git.

## Troubleshooting

- **SCP: No such file or directory** → Junction `comfy-output` prüfen (`ssh tower "dir comfy-output"`)
- **Permission denied** → SSH-Key checken: `ssh -o BatchMode=yes 4ngl@192.168.178.84 "echo OK"`
- **Kategorisierung falsch** → `sync_comfy_assets.py` → `CATEGORIES` dict anpassen
- **Große Dateien** → `--optimize` nutzt Pillow/sips → WebP (spart 60-80 %)
