# ────────────────────────────────────────────────────────────────────────────
# WebDude.hu v6.0 — Electric Cyan → Cyber-Arany SZIN migracio (1. lepes)
# SSOT: _DOCS/DESIGN_SYSTEM.md | Dontes: Norbi (Option A — teljes migracio)
#
# Hatokor:
#   - src\**\*.tsx|*.ts|*.css   (KIVÉVE: src\actions — Midjourney prompt palettak)
#   - public\assets\portfolio\**\*.svg (placeholder grafikak)
#
# Szinlekepezes (brand ramp):
#   #00B5F1 cyan-500  → #f59e0b amber-500  (brand alapszin)
#   #0095C7 cyan-600  → #d97706 amber-600  (gradiens veg + hover)
#   #00D4FF vilagos   → #fbbf24 amber-400  (shimmer / link hover)
#   #007BA3/BA8/7A9E  → #d97706 amber-600  (deep hover — AA-safe, hover a from stopbol)
#   #FF7A00 regi narancs → #d97706 amber-600 (narancs folt megszuntetese)
#
# UTF-8 (BOM nelkul) iras — magyar ekezetek megorzese.
# ────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"
$root = "c:\CLI-PROJECTS\webdude-hu\src"
$svgRoot = "c:\CLI-PROJECTS\webdude-hu\public\assets\portfolio"
$reportPath = "c:\CLI-PROJECTS\webdude-hu\_mentesek\20260916_amber-migration\_szin-migracio-jelentes.txt"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# ─ Csere-terkep: SPECIFIKUS → ALTALANOS sorrend kotelezo ───────────────────
$map = [ordered]@{
  # 1) TOROTT token classok javitasa (korabbi hibas bulk-csere maradvanyai)
  "[#00B5F1]/primary"  = "gold-primary"
  "[#00B5F1]/hover"    = "gold-hover"
  "[#00B5F1]/from"     = "gold-from"
  "[#00B5F1]/to"       = "gold-to"

  # 2) HEX szinek (nagy- es kisbetus valtozat)
  "#00B5F1"            = "#f59e0b"
  "#0095C7"            = "#d97706"
  "#00D4FF"            = "#fbbf24"
  "#007BA3"            = "#d97706"
  "#007BA8"            = "#d97706"
  "#007A9E"            = "#d97706"
  "#FF7A00"            = "#d97706"

  # 3) RGBA glow / shadow ertekek
  "rgba(0,181,241,"    = "rgba(245,158,11,"
  "rgba(0, 181, 241,"  = "rgba(245, 158, 11,"
  "rgba(0 181 241 "    = "rgba(245 158 11 "
  "rgba(0,149,199,"    = "rgba(217,119,6,"
  "rgba(0, 149, 199,"  = "rgba(217, 119, 6,"
  "rgba(255,122,0,"    = "rgba(217,119,6,"
  "rgba(255, 122, 0,"  = "rgba(217, 119, 6,"

  # 4) globals.css CSS class nevek (hosszabb elol!)
  "glow-blob-cyan-2"   = "glow-blob-gold-2"
  "glow-blob-cyan"     = "glow-blob-gold"
  "glow-cyan-2-hover"  = "glow-gold-2-hover"
  "glow-cyan-2"        = "glow-gold-2"
  "glow-cyan-hover"    = "glow-gold-hover"
  "glow-cyan"          = "glow-gold"
  "hover-glow-cyan-3"  = "hover-glow-gold-3"
  "hover-glow-cyan-2"  = "hover-glow-gold-2"
  "hover-glow-cyan"    = "hover-glow-gold"
  "hover-border-cyan-3" = "hover-border-gold-3"
  "hover-border-cyan-2" = "hover-border-gold-2"
  "hover-border-cyan"  = "hover-border-gold"
  "gradient-border-cyan-3" = "gradient-border-gold-3"
  "gradient-border-cyan-2" = "gradient-border-gold-2"
  "gradient-border-cyan" = "gradient-border-gold"

  # 5) Tailwind design token nevek (globals.css @theme)
  "cyan-primary"       = "gold-primary"
  "cyan-hover"         = "gold-hover"
  "cyan-from"          = "gold-from"
  "cyan-to"            = "gold-to"

  # 6) Tailwind paletta classok (csokkeno sorrend: cyan-500 a cyan-50 elott!)
  "cyan-950"           = "amber-950"
  "cyan-900"           = "amber-900"
  "cyan-800"           = "amber-800"
  "cyan-700"           = "amber-700"
  "cyan-600"           = "amber-600"
  "cyan-500"           = "amber-500"
  "cyan-400"           = "amber-400"
  "cyan-300"           = "amber-300"
  "cyan-200"           = "amber-200"
  "cyan-100"           = "amber-100"
  "cyan-50"            = "amber-50"

  # 7) Szoveges elnevezesek (kommentek)
  "Electric Cyan"      = "Cyber-Arany"
}

# ─ Fajllista osszeallitasa ────────────────────────────────────────────────
$files = @()
$files += Get-ChildItem -Path $root -Recurse -Include *.tsx, *.ts, *.css |
  Where-Object { $_.FullName -notmatch '\\actions\\' }
$files += Get-ChildItem -Path $svgRoot -Recurse -Include *.svg

Write-Output "Feldolgozando fajlok: $($files.Count)"

$totalHits = 0
$changedFiles = 0
$report = New-Object System.Collections.ArrayList

foreach ($f in $files) {
  $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
  $original = $text
  $hits = 0
  foreach ($key in $map.Keys) {
    $rx = [regex]::new([regex]::Escape($key), 'IgnoreCase')
    $m = $rx.Matches($text).Count
    if ($m -gt 0) {
      $hits += $m
      $text = $rx.Replace($text, $map[$key])
    }
  }
  # Biztonsagi halo: barmilyen maradek "cyan-2" / "cyan-3" (pl. glow-cyan-2)
  $rx23 = [regex]'cyan-([23])(?![0-9])'
  $m23 = $rx23.Matches($text).Count
  if ($m23 -gt 0) {
    $hits += $m23
    $text = $rx23.Replace($text, 'gold-$1')
  }
  if ($text -ne $original) {
    [System.IO.File]::WriteAllText($f.FullName, $text, $utf8NoBom)
    $changedFiles++
    $totalHits += $hits
    [void]$report.Add(("{0,5}  {1}" -f $hits, $f.FullName.Replace("c:\CLI-PROJECTS\webdude-hu\", "")))
  }
}

Write-Output "=== SZIN MIGRACIO KESZ ==="
Write-Output "Modositott fajlok: $changedFiles"
Write-Output "Osszes csere: $totalHits"

$header = @(
  "WebDude.hu — Electric Cyan → Cyber-Arany szin-migracio",
  "Datum: 2026-09-16",
  "Modositott fajlok: $changedFiles",
  "Osszes csere: $totalHits",
  "-----------------------------------------------"
)
$out = $header + ($report | Sort-Object -Descending)
[System.IO.File]::WriteAllLines($reportPath, $out, $utf8NoBom)
Write-Output "Jelentes: _mentesek\20260916_amber-migration\_szin-migracio-jelentes.txt"