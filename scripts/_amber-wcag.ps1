# ────────────────────────────────────────────────────────────────────────────
# WebDude.hu v6.0 — WCAG AA kontraszt javitas (2. lepes)
# Probléma: fehér szöveg arany (amber) háttéren = 2.15:1  → BUKIK (min 4.5:1)
# Megoldás: text-white → text-slate-950 arany háttérű CTA elemeken
#            (#f59e0b háttéren 10.1:1 = AAA, #d97706 háttéren 6.34:1 = AA)
# Csak azokat a JSX sorokat módosítja, ahol UGYANAZON a soron
# bg/from/to arany háttér ÉS text-white szerepel.
# ────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"
$root = "c:\CLI-PROJECTS\webdude-hu\src"
$reportPath = "c:\CLI-PROJECTS\webdude-hu\_mentesek\20260916_amber-migration\_wcag-jelentes.txt"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Arany hatter mintak (a szin-migracio utan)
$bgPattern = '(bg|from|to)-(\[#(f59e0b|d97706|fbbf24)\]|(amber-(400|500|600)))'
$files = Get-ChildItem -Path $root -Recurse -Include *.tsx, *.ts |
  Where-Object { $_.FullName -notmatch '\\actions\\' }

$changedFiles = 0
$changedLines = 0
$report = New-Object System.Collections.ArrayList

foreach ($f in $files) {
  $lines = [System.IO.File]::ReadAllLines($f.FullName, [System.Text.Encoding]::UTF8)
  $modified = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -notmatch 'text-white') { continue }
    if ($line -notmatch $bgPattern) { continue }
    $new = [regex]::Replace($line, 'text-white(?![-/])', 'text-slate-950')
    if ($new -ne $line) {
      $lines[$i] = $new
      $modified = $true
      $changedLines++
      $rel = $f.FullName.Replace("c:\CLI-PROJECTS\webdude-hu\", "")
      [void]$report.Add(("{0}:{1}" -f $rel, ($i + 1)))
    }
  }
  if ($modified) {
    [System.IO.File]::WriteAllLines($f.FullName, $lines, $utf8NoBom)
    $changedFiles++
  }
}

Write-Output "=== WCAG MIGRACIO KESZ ==="
Write-Output "Modositott fajlok: $changedFiles"
Write-Output "Modositott sorok: $changedLines"

$header = @(
  "WebDude.hu — WCAG AA kontraszt javitas (text-white → text-slate-950 arany hatteren)",
  "Datum: 2026-09-16",
  "Modositott fajlok: $changedFiles",
  "Modositott sorok: $changedLines",
  "-----------------------------------------------"
)
$out = $header + ($report)
[System.IO.File]::WriteAllLines($reportPath, $out, $utf8NoBom)
Write-Output "Jelentes: _mentesek\20260916_amber-migration\_wcag-jelentes.txt"