import sys

content = open('c:\\CLI-PROJECTS\\webdude-hu\\src\\app\\szolgaltatasok\\ai-prompt-engineering\\page.tsx', 'r', encoding='utf-8').read()

old = '''const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
      {/* GEO Direct Answer blokk -- a Hero ala */}
      <DirectAnswerBlock
        id="ai-prompt-engineering-hero"
        question="Mit nyúgt a professional AI prompt engineering, és milyen ellennyel?"
        answer="Professzionális prompt rendszereket építek: ChatGPT és Claude promptok fejlesztése, optimalizálása és konfigurációja országos szolgáltatással. Megbízható, konzisztens AI rendszerek üzleti értékkel -- minimalizálva a hallucinációt, maximalizálva a hatékonyságot. Egyedi árajánlat kérése az igényei alapján."
      />
    })),  ;'''

new = '''const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),  ;'''

if old in content:
    content = content.replace(old, new)
    open('c:\\CLI-PROJECTS\\webdude-hu\\src\\app\\szolgaltatasok\\ai-prompt-engineering\\page.tsx', 'w', encoding='utf-8').write(content)
    print('SUCCESS: File updated')
else:
    print('FAIL: Old text not found')
    # Check if faqSchema exists
    if 'faqSchema' in content:
        print('faqSchema found in file')
    else:
        print('faqSchema NOT found')