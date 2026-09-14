# WAVE Chrome Extension — WCAG Akadálymentesítés Ellenőrzés
> **Verzió:** v1.0  
> **Dátum:** 2026-08-13  
> **Leírás:** WAVE Chrome Extension használata a WebDude.hu weboldalak WCAG akadálymentesítésének ellenőrzésére

---

## 🎯 MIÉRT WAVE?

**Előnyök:**
- **Ingyenes:** Korlátlan használat
- **Real-time:** Élő akadálymentesítés ellenőrzés
- **WCAG 2.1:** Legújabb akadálymentesítési szabványok
- **Részletes:** Konkrét javaslatok és hiba leírások
- **Add-on szolgáltatás:** Ügyfeleknek is eladható

**Funkciók:**
- **Error Detection:** Hibák detektálása (piros ikonok)
- **Alerts:** Figyelmeztetések (sárga ikonok)
- **Features:** Jó gyakorlatok (zöld ikonok)
- **Structural Elements:** Strukturális elemek kiemelése
- **Contrast Check:** Kontraszt arány ellenőrzése

---

## 🛠️ TELEPÍTÉS ÉS HASZNÁLAT

### 1. Telepítés
1. Chrome Web Store megnyitása
2. Keresés: "WAVE Web Accessibility Evaluation Tool"
3. Telepítés gombra kattintás
4. Chrome eszköztárban megjelenik a WAVE ikon

### 2. Használat
1. Weboldal megnyitása a Chrome-ban
2. WAVE ikonra kattintás
3. Az oldal automatikusan elemzésre kerül
4. Hiba és figyelmeztető ikonok megjelenése az oldalon

### 3. Elemzés Értelmezése
- **Piros ikonok:** Helytelen akadálymentesítés (javítandó)
- **Sárga ikonok:** Figyelmeztetések (ellenőrizendő)
- **Zöld ikonok:** Jó gyakorlatok (fenntartandó)
- **Szürke ikonok:** Nem releváns elemek

---

## 📊 WCAG 2.1 SZABVÁNYOK

### A Szint (Legalacsonyabb)
- **Kontraszt:** 4.5:1 (normál szöveg), 3:1 (nagy szöveg)
- **Alternatív szöveg:** Képek alt attribútuma
- **Címek:** H1-H6 hierarchia
- **Form labels:** Input mezők címkéi

### AA Szint (Ajánlott)
- **Kontraszt:** 4.5:1 (normál szöveg), 3:1 (nagy szöveg)
- **Fókusz:** Billentyűzet navigáció
- **Link szöveg:** Leíró link szöveg
- **Reszponzív:** Mobil kompatibilitás

### AAA Szint (Legmagasabb)
- **Kontraszt:** 7:1 (normál szöveg), 4.5:1 (nagy szöveg)
- **Jelzők:** Hangjelzők és vizuális jelzők
- **Hiba megelőzés:** Form validáció

---

## 💼 ADD-ON SZOLGÁLTATÁS

### Ügyfélnek Eladható Csomagok
- **Basic WAVE Audit:** 1 oldal akadálymentesítés ellenőrzése
- **Full WAVE Audit:** Teljes weboldal akadálymentesítés ellenőrzése
- **WCAG Compliance:** AA szintű akadálymentesítés implementáció

### Árazás
- **Basic Audit:** 30.000 Ft
- **Full Audit:** 100.000 Ft
- **WCAG Compliance:** 250.000 Ft

---

## 🔧 GYAKORI HIBÁK ÉS JAVÍTÁSOK

### 1. Hiányzó Alt Attribútum
```html
<!-- Helytelen -->
<img src="logo.png">

<!-- Helyes -->
<img src="logo.png" alt="WebDude Logo">
```

### 2. Rossz Kontraszt Arány
```css
/* Helytelen */
.text { color: #999; background: #fff; }

/* Helyes */
.text { color: #333; background: #fff; }
```

### 3. Hiányzó Form Label
```html
<!-- Helytelen -->
<input type="email" placeholder="Email">

<!-- Helyes -->
<label for="email">Email</label>
<input type="email" id="email">
```

### 4. Hiányzó Heading Hierarchia
```html
<!-- Helytelen -->
<div class="title">Cím</div>

<!-- Helyes -->
<h1>Cím</h1>
```

---

## 🚀 DEPLOY UTASÍTÁSOK

1. **WAVE Extension Telepítése**
   - Chrome Web Store: WAVE Web Accessibility Evaluation Tool
   - Chrome eszköztárba telepítés

2. **Weboldal Elemzés**
   - Webold megnyitása
   - WAVE ikonra kattintás
   - Eredmények áttekintése

3. **Hibajavítás**
   - Piros ikonok javítása
   - Sárga ikonok ellenőrzése
   - Zöld ikonok fenntartása

4. **Újraellenőrzés**
   - WAVE újra futtatása
   - Eredmények validálása

---

## 📝 CHANGELOG

- **v1.0 (2026-08-13):** WAVE Chrome Extension dokumentáció
