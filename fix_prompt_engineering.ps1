$filePath = "c:\CLI-PROJECTS\webdude-hu\src\app\szolgaltatasok\ai-prompt-engineering\page.tsx"

$content = Get-Content -Path $filePath -Raw

$old = @'
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
      {"* GEO Direct Answer blokk -- a Hero ala */
      <DirectAnswerBlock
        id="ai-prompt-engineering-hero"
        question="Mit nyúgt a professional AI prompt engineering, és milyen ellennyel?"
        answer="Professzionális prompt rendszereket építek: ChatGPT és Claude promptok fejlesztése, optimalizálása és konfigurációja országos szolgáltatással. Megbízható, konzisztens AI rendszerek üzleti értékkel -- minimalizálva a hallucinációt, maximalizálva a hatékonyságot. Egyedi árajánlat kérése az igényei alapján."
      />
    })),  ;
}
'@

$new = @'
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),  ;
}
'@

if ($content -match [regex]::Escape($old)) {
    $content = $content -replace [regex]::Escape($old), $new
    $content | Out-File -Path $filePath -Encoding UTF8
    Write-Host "SUCCESS: File updated"
} else {
    Write-Host "FAIL: Old text not found"
    if ($content -match "faqSchema") {
        Write-Host "faqSchema found in file"
    } else {
        Write-Host "faqSchema NOT found"
    }
}