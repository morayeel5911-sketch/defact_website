# ComfyUI Tower Setup Plan

## Ziel
ComfyUI auf dem Tower (RTX 4080, 16GB VRAM) produktionsbereit einrichten für DEFACT 3D Asset-Generation (FLUX Full, Video-Assets).

---

## Phase 0: Python 3.12 statt 3.13 [KRITISCH]

### Warum
- Python 3.13 = `.0` Release → xformers, flash-attn, custom nodes werden likely brechen
- Oracle: "Don't treat 3.12 as fallback — start with 3.12"
- Kein Vorteil bei 3.13 für eine ComfyUI Workstation

### Schritte
1. **Python 3.12 von python.org herunterladen**
2. **Installieren** (Add to PATH)
3. **Verify**: `python --version` → `Python 3.12.x`

---

## Phase 1: PyTorch mit CUDA reinstallieren [KRITISCH]

### Problem
- Aktuell: PyTorch 2.9.1+cpu installiert → CUDA nicht verfügbar
- Treiber: CUDA 13.2, aber PyTorch unterstützt max CUDA 12.8
- Lösung: PyTorch mit CUDA 12.8 Backend installieren (backward compatible)

### Schritte
1. **Fix: Venv in E:\ComfyUI erstellt? Prüfen und ggf. neu erstellen:**
   ```powershell
   # Prüfen ob venv auf E: existiert
   Test-Path "E:\ComfyUI\venv\Scripts\python.exe"
   
   # Falls nein: Venv neu erstellen MIT vollem Pfad
   cd E:\ComfyUI
   E:\ComfyUI\venv\Scripts\python.exe --version  # Oder
   & "C:\Users\4NGL\AppData\Local\Programs\Python\Python312\python.exe" -m venv E:\ComfyUI\venv
   ```

2. **Fix: Sicherstellen, dass venv wirklich aktiv ist (nicht System Python):**
   ```powershell
   cd E:\ComfyUI
   # Venv Python explizit aufrufen (nicht via Activation!)
   .\venv\Scripts\python.exe -c "import sys; print(sys.executable)"
   # MUSS ausgeben: E:\ComfyUI\venv\Scripts\python.exe
   ```

3. **Deinstallieren System-Python Pakete** (Vorsicht — nur ComfyUI-specifische):
   ```powershell
   # Diese wurden fälschlich ins System Python installiert
   # Wir belassen sie (kein Schaden), aber venv neu bauen
   ```

4. **Komplette venv neu erstellen in E:\ComfyUI:**
   ```powershell
   cd E:\ComfyUI
   rmdir /s /q venv  # Altes venv löschen
   & "C:\Users\4NGL\AppData\Local\Programs\Python\Python312\python.exe" -m venv E:\ComfyUI\venv
   ```

5. **PyTorch CUDA 12.8 in venv installieren** (MIT vollem Pfad zu venv Python):
   ```powershell
   cd E:\ComfyUI
   .\venv\Scripts\python.exe -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
   ```

6. **ComfyUI requirements.txt in venv installieren:**
   ```powershell
   cd E:\ComfyUI
   .\venv\Scripts\python.exe -m pip install -r E:\ComfyUI\requirements.txt
   ```

7. **Flash Attention / xformers in venv:**
   ```powershell
   cd E:\ComfyUI
   .\venv\Scripts\python.exe -m pip install packaging
   .\venv\Scripts\python.exe -m pip install xformers
   ```

8. **Verify** (venv Python nutzen!):
   ```powershell
   cd E:\ComfyUI
   .\venv\Scripts\python.exe -c "import torch; print(f'PyTorch: {torch.__version__}, CUDA: {torch.cuda.is_available()}, Device: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else \"None\"}')"
   ```

### Neue Risiken (durch vorherige Fehlversuche)
- System-Python 3.12 hat jetzt ComfyUI-Pakete verschmutzt → nicht kritisch, aber messy
- Venv könnte falsch angelegt worden sein → komplett neu bauen sicherer
- Windows PATH Priorität: Python 3.13 steht eventuell vor 3.12 → volle Pfade nutzen

---

## Phase 2: ComfyUI-Manager installieren

### Schritte
1. **Clone**:
   ```powershell
   cd E:\ComfyUI\custom_nodes
   git clone https://github.com/ltdrdata/ComfyUI-Manager.git
   ```

2. **Restart ComfyUI** — Manager auto-installiert sich

3. **Verify**: Manager-Button in WebUI sichtbar

---

## Phase 3: FLUX Modelle downloaden

### Auswahl (RTX 4080 = 16GB VRAM)
| Modell | VRAM Bedarf | Qualität | Geschwindigkeit | Empfehlung |
|--------|-------------|----------|-----------------|------------|
| FLUX.1 [dev] fp16 | ~24 GB | 🔥🔥🔥 | Langsam | ❌ Passt nicht (ohne --lowvram) |
| FLUX.1 [dev] fp8 | ~11-13 GB | 🔥🔥 | Mittel | ✅ High-Quality final |
| FLUX.1 [schnell] fp8 | ~11-13 GB | 🔥 | Schnell (4 steps) | ✅ Primary — schnelle Iteration |
| FLUX.1 [schnell] GGUF Q4_K | ~5-7 GB | 🔥 | Sehr schnell | ✅ Für Tests / niedrige VRAM |

> ⚠️ **Oracle-Korrektur**: schnell fp8 ≈ dev fp8 in VRAM. Der Unterschied ist Steps (4 vs 20), nicht Speicher.

### Strategie
1. **FLUX.1 [schnell] fp8** als Primary (schnelle Iteration)
2. **FLUX.1 [dev] fp8** als High-Quality (finale Assets)
3. T5-XXL fp8 = ~5GB allein → `--normalvram` auto-offloaded

### Voraussetzungen vor Download
1. **Windows long paths aktivieren**:
   ```powershell
   # Als ADMIN in PowerShell:
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```

2. **Windows Defender exclusion**:
   ```powershell
   Add-MpPreference -ExclusionPath "E:\ComfyUI\models"
   ```

3. **huggingface-cli installieren**:
   ```powershell
   pip install huggingface-hub
   huggingface-cli login  # Token mit read-Rechten
   ```

4. **FLUX License akzeptieren** (für dev-Modell):
   - Auf HuggingFace `black-forest-labs/FLUX.1-dev` → License akzeptieren

### Download-Befehle (via huggingface-cli)
```powershell
cd E:\ComfyUI\models

# FLUX.1 schnell fp8
huggingface-cli download black-forest-labs/FLUX.1-schnell flux1-schnell-fp8.safetensors --local-dir diffusion_models/

# FLUX.1 dev fp8 (License erforderlich!)
huggingface-cli download black-forest-labs/FLUX.1-dev flux1-dev-fp8.safetensors --local-dir diffusion_models/

# VAE
huggingface-cli download black-forest-labs/FLUX.1-schnell ae.safetensors --local-dir vae/

# CLIP
huggingface-cli download comfyanonymous/flux_text_encoders clip_l.safetensors --local-dir clip/
huggingface-cli download comfyanonymous/flux_text_encoders t5xxl_fp8_e4m3fn.safetensors --local-dir clip/
```

---

## Phase 4: ComfyUI starten + Performance-Test

### Start
```powershell
cd E:\ComfyUI
.\venv\Scripts\activate
python main.py --normalvram --listen 127.0.0.1 --port 8188
```

> 🔒 `--listen 127.0.0.1` (nicht `0.0.0.0`) — nur lokal erreichbar, SSH-Tunnel als Bridge

### Flags
| Flag | Bedeutung |
|------|-----------|
| `--normalvram` | 16GB Optimierung (T5-XXL offloaded) |
| `--listen 127.0.0.1` | Nur localhost (sicher) |
| `--port 8188` | Standard Port |

### Performance-Test
1. **Einfacher Text-to-Image** Test:
   - Prompt: "chrome ritual object, clinical lighting, white background"
   - Resolution: 1024×1024
   - Steps: 4 (schnell) oder 20 (dev)
   - Ziel: < 10s pro Bild (schnell), < 60s (dev)

2. **VRAM-Monitoring** während Generation:
   ```powershell
   nvidia-smi -l 1
   ```

---

## Phase 5: SSH-Port-Forward + Mac-Integration

### 5a. SSH-Config auf Mac
```
# ~/.ssh/config
Host tower
    HostName 192.168.178.84
    User 4NGL
    IdentityFile ~/.ssh/id_ed25519_tower
    ForwardAgent yes

Host tower-comfy
    HostName 192.168.178.84
    User 4NGL
    IdentityFile ~/.ssh/id_ed25519_tower
    LocalForward 8188 localhost:8188
```

### 5b. ComfyUI Tunnel starten
```bash
ssh tower-comfy
# Oder: ssh -L 8188:localhost:8188 tower
```

### 5c. Asset-Sync Script
```bash
# Pull latest outputs
scp -r tower:/e/ComfyUI/output/* ~/defact-assets/
# Convert to WebP
for f in ~/defact-assets/*.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done
```

---

## Phase 6: DEFACT-Workflows erstellen

### Workflow 1: Shuriken Product Shot
```
[Load Checkpoint: FLUX-schnell-fp8]
    ↓
[CLIP Text Encode]
    Positive: "chrome 3d printed shuriken, clinical archive, studio lighting, white background, product photography, sharp focus"
    Negative: "blurry, low quality, watermark, text"
    ↓
[Empty Latent Image: 1024×1024]
    ↓
[KSampler: steps=4, cfg=1.0]
    ↓
[VAE Decode]
    ↓
[Save Image → E:\ComfyUI\output\shuriken_01.png]
```

### Workflow 2: Hero Image
```
[Load Checkpoint: FLUX-dev-fp8]
    ↓
[CLIP Text Encode]
    Positive: "futuristic ritual object, chrome and steel, museum display, dramatic lighting, cinematic, 8k"
    ↓
[Empty Latent Image: 1344×768]
    ↓
[KSampler: steps=20, cfg=3.5]
    ↓
[VAE Decode]
    ↓
[Upscale: 4x-UltraSharp]
    ↓
[Save Image → E:\ComfyUI\output\hero_01.png]
```

---

## Timeline

| Phase | Dauer | Abhängigkeit | Wer macht's |
|-------|-------|-------------|-------------|
| 0. Python 3.12 | 5 min | - | **Tower-Agent / Manuell** |
| 1. PyTorch CUDA | 10-20 min | Phase 0 | SSH remote |
| 2. Manager | 2 min | Phase 1 | SSH remote |
| 3. Modelle | 30-60 min | Phase 2, Internet | SSH remote |
| 4. Test | 5 min | Phase 3 | SSH remote |
| 5. SSH-Config | 5 min | - | Mac lokal |
| 6. Workflows | 15 min | Phase 4 | SSH remote |
| **Gesamt** | **~1-2h** | | |

### Phase 0 = Manueller Eingriff
Python 3.12 muss auf dem Tower **manuell** installiert werden (Download von python.org, Installer ausführen, "Add to PATH" aktivieren). Das kann nicht remote via SSH erledigt werden.

---

## Erfolgskriterien

- [ ] `torch.cuda.is_available()` → `True`
- [ ] ComfyUI startet ohne Fehler
- [ ] Manager-Button in WebUI sichtbar
- [ ] FLUX-schnell lädt erfolgreich
- [ ] Erstes Bild generiert in < 15s
- [ ] SSH-Tunnel zu `localhost:8188` funktioniert
- [ ] Asset-Sync manuell getestet

---

## Fallbacks

| Problem | Lösung |
|---------|--------|
| Python 3.13 inkompatibel | Python 3.12 + neues venv |
| CUDA Out of Memory | `--lowvram` oder `--novram` |
| Modelle zu groß | GGUF-Quantisierung nutzen |
| ComfyUI crash | `--disable-xformers` |
| Port 8188 belegt | `--port 8189` oder Prozess killen |
| flash-attn build fail | `pip install xformers` als Fallback |
| huggingface download fail | License nicht akzeptiert → HuggingFace Web UI |
| Windows Defender langsam | Exclusion auf `E:\ComfyUI\models\` setzen |
| Custom nodes compile error | MSVC Build Tools "Desktop C++" installieren |
| Long paths error | Registry key `LongPathsEnabled = 1` |
