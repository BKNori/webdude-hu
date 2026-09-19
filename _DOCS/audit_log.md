# Audit Log — Git History Cleanup

## 2026-09-19: Tömeges tárhely felszabadítás (History Rewrite)

### Végrehajtott műveletek
1. **`.gitignore` frissítés** — `deploy_dist/`, `deploy*.zip` kizárva
   - Commit: `78685ea` — `"chore: exclude deploy_dist and zip files from tracking"`

2. **`git filter-branch` — functions/node_modules törlése**
   - Eszköz: `git filter-branch --force --index-filter`
   - Cél: `functions/node_modules/` teljes történetéből történő eltávolítás
   - Eredmény: ✅ Sikeres

3. **`git filter-branch` — .firebase/logs törlése**
   - Eszköz: `git filter-branch --force --index-filter`
   - Cél: `.firebase/logs/` (különösen `vsce-debug.log`) teljes történetéből történő eltávolítás
   - Eredmény: ✅ Sikeres

4. **`git gc --prune=now --aggressive`**
   - Refs/original backup törlése
   - Reflog expire
   - Agresszív GC

5. **`git push origin master --force`**
   - GitHub.remote frissítve: `c036248...78685ea`

### Felszabadult tárhely
| Művelet | Pack méret (before) | Pack méret (after) | Felszabadulva |
|---------|-------------------|-------------------|---------------|
| eredeti állapot | 566,74 MB | — | — |
| után | — | 156,24 MB | **410,50 MB (72%)** |

### Validáció
- ✅ `npx tsc --noEmit` — Exit Code 0 (0 TypeScript hiba)
- ✅ `git status` — working tree clean
- ✅ `git log` — history átalakítva, összes commit tisztán

### Védelem
A következő fájlok/mappák **megmaradtak**, érintetlenek:
- `src/` (kód)
- `public/` (assetek, 198+ MB)
- `_docs/` (dokumentáció)
- `.env.local`, `AGENTS.md`, `CLAUDE.md`, konfig fájlok
- `server.js`, `deploy.ps1`, `deploy.bat`

### Jegyzetek
- A `deploy*.zip` fájlokat a `.gitignore` már eleve kizárta — nem voltak a git trackingben
- A `.next/` és `deploy_dist/` mappák soha nem voltak commitolva
- A valódi problémaforrás a `functions/node_modules/` (106+ MB a history-ban) és `.firebase/logs/vsce-debug.log` (több verzió, ~8,7 MB/verzió) volt
