# ────────────────────────────────────────────────────────────────────────────
# WebDude.hu — Electric Cyan → Cyber-Arany vizualis migracio (1. lepes: SZINEK)
# Egysegesites: #00B5F1 (Electric Cyan) → #f59e0b (Cyber-Arany / amber-500)
# Kizarva: src\actions (Midjourney prompt palettak — nem UI szinek)
# UTF-8 (BOM nelkul) iras, magyar ekezetek megorzese.
# ────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"
$root = "c:\CLI-PROJECTS\webdude-hu\src"
$svgRoot = "c:\CLI-PROJECTS\webdude-hu\public\assets\portfolio"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Csere-térkép: hosszú/specifikus mintáktól a rövidekig (sorrend kötelező)
$map = [ordered]@{
  # ── Hex színek ────────────────────────────────────────────────────────────
  "#00B5F1"              = "#f59e0b"  # brand (amber-500)
  "#00b5f1"              = "#f59e0b"
  "#0095C7"              = "#d97706"  # brand hover (amber-600)
  "#0095c7"              = "#d97706"
  "#00D4FF"              = "#fbbf24"  # gradiens világos (amber-400)
  "#00d4ff"              = "#fbbf24"
  "#007BA3"              = "#b45309"  # mély hover (amber-700)
  "#007ba3"              = "#b45309"
  "#007BA8"              = "#b45309"
  "#007ba8"              = "#b45309"
  # ── RGBA glow értékek ─────────────────────────────────────────────────────
  "rgba(0,181,241,"      = "rgba(245,158,11,"
  "rgba(0, 181, 241,"    = "rgba(245, 158, 11,"
  "rgba(0 181 241 "      = "rgba(245 158 11 "
  "rgba(0,149,199,"      = "rgba(217,119,6,"
  "rgba(0, 149, 199,"    = "rgba(217, 119, 6,"
  # ── Design token / class nevek ────────────────────────────────────────────
  "cyan-primary"         = "gold-primary"
  "cyan-hover"           = "gold-hover"
  "cyan-from"            = "gold-from"
  "cyan-to"              = "gold-to"
  "glow-blob-cyan-2"     = "glow-blob-gold-2"
  "gradient-border-cyan-3" = "gradient-border-gold-3"
  "gradient-border-cyan-2" = "gradient-border-gold-2"
  "gradient-border-cyan" = "gradient-border-gold"
  "hover-glow-cyan-3"    = "hover-glow-gold-3"
  "hover-glow-cyan-2"    = "hover-glow-gold-2"
  "hover-glow-cyan"      = "hover-glow-gold"
  "hover-border-cyan-3"  = "hover-border-gold-3"
  "hover-border-cyan-2"  = "hover-border-gold-2"
  "hover-border-cyan"    = "hover-border-gold"
  "glow-cyan-2-hover"    = "glow-gold-2-hover"
  "glow-cyan-2"          = "glow-gold-2"
  "glow-cyan-hover"      = "glow-gold-hover"
  "glow-cyan"            = "glow-gold"
  "glow-blob-cyan"       = "glow-blob-gold"
  # ── Tailwind default paletta cyan-* ──────────────────────────────────────
  "cyan-950"             = "amber-950"
  "cyan-900"             = "amber-900"
  "cyan-800"             = "amber-800"
  "cyan-700"             = "amber-700"
  "cyan-600"             = "amber-600"
  "cyan-500"             = "amber-500"
  "cyan-400"             = "amber-400"
  "cyan-300"             = "amber-300"
  "cyan-200"             = "amber-200"
  "cyan-100"             = "amber-100"
  "cyan-50"              = "amber-50"
  # ── Szöveges elnevezések (kommentek, aria, dokumentáció) ─────────────────
  "Electric Cyan"        = "Cyber-Arany"
  "ELECTRIC CYAN"        = "CYBER-ARANY"
}

$files = Get-ChildItem -Path $root -Recurse -Include *.tsx, *.ts, *.css
$totalHits = 0
$changedFiles = 0
$report = @()

foreach ($f in $files) {
  $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
  $original = $text
  $hits = 0
  foreach ($key in $map.Keys) {
    if ($text.Contains($key)) {
      $hits += ([regex]::Matches($text, [regex]::Escape($key))).Count
      $text = $text.Replace($key, $map[$key])
    }
  }
  # cyan-2 / cyan-3 (nem számjegyet követő) — pl. glow-cyan-2
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
    $report += "{0}`t{1}" -f $hits, $f.FullName.Replace("$root\", "")
  }
}

Write-Output "=== MIGRACIO KESZ ==="
Write-Output "Modositott fajlok: $changedFiles"
Write-Output "Osszes csere: $totalHits"
$report | Sort-Object -Descending | ForEach-Object { Write-Output $_ }