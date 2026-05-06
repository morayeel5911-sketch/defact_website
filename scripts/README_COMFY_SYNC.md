# ComfyUI ↔ Next.js Asset-Sync Pipeline

Automatische Zwei-Wege-Synchronisation zwischen **Tower-PC ComfyUI Output** und **DEFACT 3D Next.js**.

## 🏗 Architektur

```
┌──────────────┐     SSH+SCP     ┌──────────────────────────────┐
│ Tower-PC     │ ───────────────>│ Mac (Next.js Dev/Build)     │
│ E:\ComfyUI\… │   (polling)     │ public/assets/comfy/        │
│ RTX 4080     │                 │ {products,textures,…}/      │
└──────────────┘                 └──────────────────────────────┘
```

- **Tower** generiert Bilder (PNG, WebP, etc.)
- **Mac** synced per SSH+SCP alle N Sekunden, konvertiert PNG→WebP, kategorisiert

## 📁 Ordnerstruktur

`public/assets/comfy/`
```
├── products/       # 3D-Produktbilder (z.B. defact-*)
├── textures/       # PBR-Materialien, Tiles
├── backgrounds/    # Env-Maps, HDRs
├── heroes/         # Hero-Banner, große Key-Visuals
└── raw/            # Unkategorisierte Originale
```

Jeder Ordner enthält ein `.manifest` (Liste verfügbarer Assets).

## 🛠 Setup

### 1. SSH-Key Auth (einmalig)

Auf dem **Mac**:
```bash
ssh-copy-id 4ngl@192.168.178.84
```
Oder manuell: `~/.ssh/id_rsa.pub` → `C:\Users\4NGL\.ssh\authorized_keys` auf dem Tower.

### 2. Abhängigkeiten

```bash
# Mac
brew install webp          # cwebp CLI
pip3 install paramiko Pillow

# Windows (falls Script auf Tower laufen soll — optional)
pip install paramiko Pillow
```

### 3. Next.js sharp

Bereits in `package.json` enthalten (Next.js nutzt `sharp` automatisch für Image Optimization).

## 🚀 Nutzung

### Manueller Sync (einmalig)

```bash
cd /Volumes/T7/Vault_T7/00-Projects/defact-3d
bash scripts/sync-comfy-assets.sh
```

### Watcher (Echtzeit)

```bash
# Polling-Modus (SSH zu Tower alle 30s)
python3 scripts/watch-comfy-output.py

# Als Daemon
nochup python3 scripts/watch-comfy-output.py > logs/watch-comfy.log 2>&1 &
```

### Cron (alle 5 Minuten)

```bash
crontab -e
# Eintrag:
*/5 * * * * cd /Volumes/T7/Vault_T7/00-Projects/defact-3d && bash scripts/sync-comfy-assets.sh >> logs/sync.log 2>&1
```

## ⚙️ Konfiguration

Via Environment-Variablen oder direkt in den Scripts:

| Variable | Default | Beschreibung |
|----------|---------|--------------|
| `TOWER_IP` | `192.168.178.84` | Tower PC IP |
| `TOWER_USER` | `4ngl` | SSH-Benutzer |
| `TOWER_OUTPUT` | `E:\ComfyUI\ComfyUI\output` | Output-Ordner auf Tower |
| `LOCAL_BASE` | `…/public/assets/comfy` | Lokaler Zielordner |
| `COMFY_POLL_INTERVAL` | `30` | Poll-Intervall (Sek) |
| `COMFY_OPTIMIZE` | `true` | PNG→WebP aktiv |
| `COMFY_WEBP_QUALITY` | `90` | WebP Qualität (0-100) |
| `COMFY_WATCH_MODE` | `polling` | `polling` oder `watchdog` |

## 🖼 Next.js Integration

```tsx
import ComfyImage, { getComfyAssetUrl } from '@/components/ComfyImage'

// Bild rendern
<ComfyImage
  filename="flux2_separate_vae_00001_"
  category="heroes"
  alt="Hero Visual"
  fill
  priority
/>

// URL für R3F-Texturen
const textureUrl = getComfyAssetUrl('pbr_tile_01', 'textures')
```

## 🔧 Troubleshooting

### `Permission denied` bei SSH
- Prüfe `ssh 4ngl@192.168.178.84` funktioniert ohne Passwort
- `~/.ssh/id_rsa.pub` auf Tower in `authorized_keys` kopiert?

### `Can't ls: /C:/Users/4NGL/E:/...` (SFTP)
- Windows OpenSSH-Server mappt SFTP-Root auf User-Home. `E:` ist nicht erreichbar.
- **Fix:** Scripts nutzen **SSH+SCP** (nicht SFTP/rsync), welches absolute Windows-Pfade unterstützt.

### `cwebp: command not found`
- `brew install webp`
- Oder Fallback auf Pillow (Python) automatisch aktiv

### Keine neuen Dateien erkannt
- Prüfe `E:\ComfyUI\ComfyUI\output` auf dem Tower
- State-File löschen: `rm .comfy-watch-state.json`

## 📄 Dateien

| Datei | Zweck |
|-------|-------|
| `scripts/sync-comfy-assets.sh` | Manueller/Cron-Sync |
| `scripts/watch-comfy-output.py` | Echtzeit-Watcher mit Auto-Optimierung |
| `components/ComfyImage.tsx` | Next.js Image-Komponente |
| `public/assets/comfy/*` | Generierte Assets (nicht im Repo) |
| `.comfy-watch-state.json` | Persistente Datei-Hash-Map |

## 📝 Changelog

- **2026-05-06** — Pipeline v1.0 erstellt. SSH+SCP Strategie, WebP-Optimierung, Kategorisierung.
