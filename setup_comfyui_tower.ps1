<#
.SYNOPSIS
    ComfyUI Einrichtungs-Skript für Windows 11 Tower (RTX 4080)
.DESCRIPTION
    Automatisiert die Einrichtung von ComfyUI auf dem Windows Tower von 4NGL.
    Idempotent — kann mehrfach ausgeführt werden.
.NOTES
    Zielsystem: Windows 11, RTX 4080 16GB VRAM, Python 3.12
    Benutzer:   4NGL @ 192.168.178.84
#>

#Requires -Version 5.1

# =============================================================================
# KONFIGURATION — absolute Pfade (keine relativen Pfade verwenden!)
# =============================================================================
$ComfyUIRoot    = "E:\ComfyUI"
$PythonExe      = "C:\Users\4NGL\AppData\Local\Programs\Python\Python312\python.exe"
$VenvDir        = "E:\ComfyUI\venv"
$VenvPython     = "E:\ComfyUI\venv\Scripts\python.exe"
$Requirements   = "E:\ComfyUI\requirements.txt"
$ManagerDir     = "E:\ComfyUI\custom_nodes\ComfyUI-Manager"
$ManagerRepo    = "https://github.com/ltdrdata/ComfyUI-Manager.git"
$ModelsDir      = "E:\ComfyUI\models"
$CuIndex        = "--index-url https://download.pytorch.org/whl/cu128"

# =============================================================================
# HILFSFUNKTIONEN
# =============================================================================

# Farbige Ausgabe-Helfer (alle Texte auf Deutsch)
function Write-OK   { param([string]$Msg) Write-Host "[OK]    $Msg" -ForegroundColor Green }
function Write-ERR  { param([string]$Msg) Write-Host "[FEHLER] $Msg" -ForegroundColor Red }
function Write-INFO { param([string]$Msg) Write-Host "[INFO]  $Msg" -ForegroundColor Cyan }
function Write-WARN { param([string]$Msg) Write-Host "[WARN]  $Msg" -ForegroundColor Yellow }

# Ergebnis-Tracking
$Script:Ergebnisse = [ordered]@{}

function Add-Ergebnis {
    param(
        [string]$Name,
        [string]$Status,
        [string]$Detail = ""
    )
    $Script:Ergebnisse[$Name] = @{ Status = $Status; Detail = $Detail }
}

# Prüft, ob der letzte Befehl erfolgreich war; bricht ab bei Fehler
function Assert-Erfolg {
    param([string]$SchrittName)
    if ($LASTEXITCODE -ne 0) {
        Write-ERR "Schritt '$SchrittName' ist fehlgeschlagen (Exit-Code: $LASTEXITCODE). Skript wird abgebrochen."
        Show-Zusammenfassung
        exit 1
    }
}

# =============================================================================
# SCHRITT 0: Ausgangszustand prüfen
# =============================================================================

Write-Host ""; Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  ComfyUI Einrichtung — Windows Tower"   -ForegroundColor Magenta
Write-Host "  RTX 4080 · Python 3.12 · CUDA 12.8"    -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta; Write-Host ""

# Prüfen, ob das ComfyUI-Hauptverzeichnis überhaupt existiert
if (-not (Test-Path $ComfyUIRoot)) {
    Write-ERR "ComfyUI-Verzeichnis '$ComfyUIRoot' existiert nicht."
    Write-ERR "Bitte ComfyUI zuerst nach E:\ComfyUI klonen/herunterladen."
    exit 1
}
Write-OK "ComfyUI-Verzeichnis gefunden: $ComfyUIRoot"

# Python-Installation prüfen
if (-not (Test-Path $PythonExe)) {
    Write-ERR "Python 3.12 nicht gefunden unter: $PythonExe"
    exit 1
}
Write-OK "Python 3.12 gefunden: $PythonExe"

# =============================================================================
# SCHRITT 1: LongPathsEnabled per Registry aktivieren
# =============================================================================

Write-INFO "Aktiviere Unterstützung für lange Dateipfade (LongPathsEnabled)..."
try {
    $regPath = "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem"
    Set-ItemProperty -Path $regPath -Name "LongPathsEnabled" -Value 1 -ErrorAction Stop
    Write-OK "LongPathsEnabled wurde auf 1 gesetzt."
    Add-Ergebnis "LongPathsEnabled" "OK" "Registry-Wert = 1"
}
catch {
    Write-WARN "Konnte LongPathsEnabled nicht setzen (keine Admin-Rechte?): $_"
    Add-Ergebnis "LongPathsEnabled" "FEHLER" "Keine Admin-Rechte"
}

# =============================================================================
# SCHRITT 2: Windows Defender Ausschluss für Models-Ordner
# =============================================================================

Write-INFO "Füge Windows Defender-Ausschluss für '$ModelsDir' hinzu..."
try {
    Add-MpPreference -ExclusionPath $ModelsDir -ErrorAction Stop
    Write-OK "Defender-Ausschluss für '$ModelsDir' hinzugefügt."
    Add-Ergebnis "Defender-Ausschluss" "OK" $ModelsDir
}
catch {
    Write-WARN "Konnte Defender-Ausschluss nicht setzen (keine Admin-Rechte?): $_"
    Add-Ergebnis "Defender-Ausschluss" "FEHLER" "Keine Admin-Rechte"
}

# =============================================================================
# SCHRITT 3: Virtuelle Umgebung (venv) verwalten
# =============================================================================

Write-INFO "Prüfe virtuelle Umgebung..."

# Fall 1: Venv existiert und hat ein gültiges python.exe
if (Test-Path $VenvPython) {
    Write-OK "Virtuelle Umgebung existiert und ist gültig: $VenvPython"
    Add-Ergebnis "venv" "OK" "Bereits vorhanden"
}
# Fall 2: Venv-Ordner existiert, aber python.exe fehlt (kaputt)
elseif (Test-Path $VenvDir) {
    Write-WARN "Venv-Ordner existiert, aber python.exe fehlt — venv ist beschädigt."
    Write-INFO "Lösche beschädigte venv und erstelle sie neu..."
    Remove-Item -Recurse -Force $VenvDir -ErrorAction Stop
    Write-OK "Alte venv gelöscht."

    Write-INFO "Erstelle neue virtuelle Umgebung mit $PythonExe..."
    & "$PythonExe" -m venv $VenvDir
    Assert-Erfolg "venv erstellen (nach Löschung)"
    Write-OK "Virtuelle Umgebung neu erstellt: $VenvDir"
    Add-Ergebnis "venv" "OK" "Neu erstellt (vorherige war beschädigt)"
}
# Fall 3: Venv existiert gar nicht
else {
    Write-INFO "Keine virtuelle Umgebung gefunden. Erstelle neue..."
    & "$PythonExe" -m venv $VenvDir
    Assert-Erfolg "venv erstellen"
    Write-OK "Virtuelle Umgebung erstellt: $VenvDir"
    Add-Ergebnis "venv" "OK" "Neu erstellt"
}

# Sicherstellen, dass pip auf dem neuesten Stand ist
Write-INFO "Aktualisiere pip in der venv..."
& "$VenvPython" -m pip install --upgrade pip
Write-OK "pip aktualisiert."

# =============================================================================
# SCHRITT 4: Pakete installieren (alle mit absolutem venv-Python-Pfad!)
# =============================================================================

# --- Schritt 4a: PyTorch mit CUDA 12.8 ---
Write-INFO "Installiere PyTorch (torch, torchvision, torchaudio) mit CUDA 12.8..."
& "$VenvPython" -m pip install torch torchvision torchaudio $CuIndex
Assert-Erfolg "PyTorch/CUDA-Installation"
Write-OK "PyTorch mit CUDA 12.8 installiert."

# Version für das Tracking ermitteln
$torchVersion = & "$VenvPython" -c "import torch; print(torch.__version__)" 2>$null
$cudaAvailable = & "$VenvPython" -c "import torch; print(torch.cuda.is_available())" 2>$null
Add-Ergebnis "torch (+CUDA 12.8)" "OK" "v$torchVersion · CUDA verfügbar: $cudaAvailable"

# --- Schritt 4b: ComfyUI requirements.txt ---
if (Test-Path $Requirements) {
    Write-INFO "Installiere Abhängigkeiten aus $Requirements..."
    & "$VenvPython" -m pip install -r $Requirements
    Assert-Erfolg "requirements.txt"
    Write-OK "Abhängigkeiten aus requirements.txt installiert."
    Add-Ergebnis "requirements.txt" "OK" $Requirements
}
else {
    Write-WARN "$Requirements nicht gefunden — überspringe diesen Schritt."
    Add-Ergebnis "requirements.txt" "FEHLER" "Datei nicht gefunden"
}

# --- Schritt 4c: packaging ---
Write-INFO "Installiere 'packaging'..."
& "$VenvPython" -m pip install packaging
Assert-Erfolg "packaging"
Write-OK "'packaging' installiert."
Add-Ergebnis "packaging" "OK" "Installiert"

# --- Schritt 4d: xformers (CUDA 12.8) ---
Write-INFO "Installiere xformers (CUDA 12.8)..."
& "$VenvPython" -m pip install xformers $CuIndex
Assert-Erfolg "xformers"
Write-OK "xformers installiert."
Add-Ergebnis "xformers" "OK" "CUDA 12.8 Build"

# --- Schritt 4e: huggingface-hub ---
Write-INFO "Installiere huggingface-hub..."
& "$VenvPython" -m pip install huggingface-hub
Assert-Erfolg "huggingface-hub"
Write-OK "huggingface-hub installiert."
Add-Ergebnis "huggingface-hub" "OK" "Installiert"

# =============================================================================
# SCHRITT 5: ComfyUI-Manager klonen
# =============================================================================

Write-INFO "Prüfe ComfyUI-Manager..."

if (Test-Path $ManagerDir) {
    # Ordner existiert bereits
    if (Test-Path "$ManagerDir\.git") {
        Write-OK "ComfyUI-Manager bereits vorhanden (git-Repository)."
        Add-Ergebnis "ComfyUI-Manager" "OK" "Bereits geklont"
    }
    else {
        Write-WARN "ComfyUI-Manager-Ordner existiert, ist aber kein git-Repository. Überspringe Klonen."
        Add-Ergebnis "ComfyUI-Manager" "OK" "Bereits vorhanden (kein git-Repo)"
    }
}
else {
    # Sicherstellen, dass der custom_nodes-Ordner existiert
    $customNodesDir = Split-Path $ManagerDir -Parent
    if (-not (Test-Path $customNodesDir)) {
        New-Item -ItemType Directory -Path $customNodesDir -Force | Out-Null
    }

    Write-INFO "Klone ComfyUI-Manager von $ManagerRepo..."
    try {
        git clone $ManagerRepo $ManagerDir
        if ($LASTEXITCODE -eq 0) {
            Write-OK "ComfyUI-Manager erfolgreich geklont."
            Add-Ergebnis "ComfyUI-Manager" "OK" "Erfolgreich geklont"
        }
        else {
            Write-WARN "git clone meldete Exit-Code $LASTEXITCODE — fahre fort."
            Add-Ergebnis "ComfyUI-Manager" "WARN" "Clone Exit-Code: $LASTEXITCODE"
        }
    }
    catch {
        Write-WARN "git clone fehlgeschlagen: $_ — fahre trotzdem fort."
        Add-Ergebnis "ComfyUI-Manager" "FEHLER" $_.Exception.Message
    }
}

# =============================================================================
# SCHRITT 6: Verifikation — CUDA / GPU prüfen
# =============================================================================

Write-Host ""; Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  VERIFIKATION" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta; Write-Host ""

# Prüfcode als PowerShell-String (kein Aktivieren — absoluter Python-Pfad!)
$verifyScript = @'
import torch
print("=== CUDA / GPU Verifikation ===")
print(f"PyTorch Version : {torch.__version__}")
cuda_ok = torch.cuda.is_available()
print(f"CUDA verfügbar   : {cuda_ok}")
if cuda_ok:
    device_name = torch.cuda.get_device_name(0)
    props = torch.cuda.get_device_properties(0)
    vram_gb = props.total_memory / (1024**3)
    print(f"GPU              : {device_name}")
    print(f"VRAM (gesamt)    : {vram_gb:.2f} GB")
    print(f"CUDA Cores       : {props.multi_processor_count} SMs")
else:
    print("CUDA ist NICHT verfügbar — bitte Treiber und Installation prüfen!")
'@

# Temporäre Datei für den Prüfcode
$tempPyFile = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.py'
Set-Content -Path $tempPyFile -Value $verifyScript -Encoding UTF8

Write-INFO "Führe CUDA/GPU-Verifikation aus..."
$output = & "$VenvPython" $tempPyFile 2>&1
$exitCode = $LASTEXITCODE

# Temporäre Datei aufräumen
Remove-Item $tempPyFile -Force -ErrorAction SilentlyContinue

# Ausgabe anzeigen
foreach ($line in $output) {
    if ($line -match "CUDA verfügbar\s+: True") {
        Write-Host "  $line" -ForegroundColor Green
    }
    elseif ($line -match "CUDA verfügbar\s+: False" -or $line -match "NICHT verfügbar") {
        Write-Host "  $line" -ForegroundColor Red
    }
    elseif ($line -match "GPU\s+:" -or $line -match "VRAM") {
        Write-Host "  $line" -ForegroundColor Cyan
    }
    else {
        Write-Host "  $line"
    }
}

# GPU-Name und VRAM für die Zusammenfassung extrahieren
$gpuName = ""
$vramGb  = ""
foreach ($line in $output) {
    if ($line -match "GPU\s+:\s+(.+)$") {
        $gpuName = $Matches[1].Trim()
    }
    if ($line -match "VRAM\s+\(gesamt\)\s+:\s+(.+)$") {
        $vramGb = $Matches[1].Trim()
    }
}

if ($exitCode -eq 0) {
    $cudaStat = if ($output -match "CUDA verfügbar\s+: True") { "OK" } else { "FEHLER" }
    Add-Ergebnis "Verifikation" $cudaStat "GPU: $gpuName · VRAM: $vramGb"
}
else {
    Write-ERR "Verifikation fehlgeschlagen (Exit-Code: $exitCode)"
    Add-Ergebnis "Verifikation" "FEHLER" "Script-Exit-Code: $exitCode"
}

# =============================================================================
# ZUSAMMENFASSUNG
# =============================================================================

Write-Host ""; Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  ZUSAMMENFASSUNG" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta; Write-Host ""

# Tabellenkopf
$headerFmt = "{0,-25} {1,-10} {2,-60}"
$headerLine = $headerFmt -f "Schritt", "Status", "Details"
Write-Host $headerLine -ForegroundColor White
Write-Host ("-" * 95) -ForegroundColor DarkGray

# Tabellenzeilen mit Farben
foreach ($name in $Script:Ergebnisse.Keys) {
    $entry   = $Script:Ergebnisse[$name]
    $status  = $entry.Status
    $detail  = $entry.Detail

    # Farbe basierend auf Status
    $color = switch ($status) {
        "OK"    { "Green" }
        "FEHLER" { "Red" }
        "WARN"  { "Yellow" }
        default  { "White" }
    }

    $line = $headerFmt -f $name, $status, $detail
    Write-Host $line -ForegroundColor $color
}

Write-Host ""

# Abschlussmeldung
$fehlerCount = ($Script:Ergebnisse.Values | Where-Object { $_.Status -eq "FEHLER" }).Count
if ($fehlerCount -eq 0) {
    Write-Host "ComfyUI ist bereit! Starte mit:" -ForegroundColor Green
    Write-Host "  & '$VenvPython' E:\ComfyUI\main.py" -ForegroundColor Cyan
}
else {
    Write-Host "Einrichtung mit $fehlerCount Fehler(n) abgeschlossen. Bitte die obigen Warnungen prüfen." -ForegroundColor Yellow
}
Write-Host ""
