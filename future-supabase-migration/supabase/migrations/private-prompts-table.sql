-- Private Prompts Table Migration
-- Verzió: v1.0
-- Dátum: 2026-08-09
-- Leírás: private_prompts tábla létrehozása Zero-Prompt Policy implementációhoz

-- private_prompts tábla létrehozása
CREATE TABLE IF NOT EXISTS public.private_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('workflow', 'system', 'validation')),
  prompt TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS engedélyezése
ALTER TABLE public.private_prompts ENABLE ROW LEVEL SECURITY;

-- RLS szabályok - KIZÁRÓLAG service_role férhet hozzá
CREATE POLICY "Service role only access"
  ON public.private_prompts FOR ALL
  USING (auth.role() = 'service_role');

-- get_private_prompt_by_slug RPC függvény
CREATE OR REPLACE FUNCTION public.get_private_prompt_by_slug(prompt_slug TEXT)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  category TEXT,
  prompt TEXT,
  version INTEGER,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pp.id,
    pp.slug,
    pp.category,
    pp.prompt,
    pp.version,
    pp.is_active
  FROM public.private_prompts pp
  WHERE pp.slug = prompt_slug
    AND pp.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Index a slug gyors kereséshez
CREATE INDEX IF NOT EXISTS idx_private_prompts_slug 
  ON public.private_prompts(slug);

CREATE INDEX IF NOT EXISTS idx_private_prompts_category 
  ON public.private_prompts(category);

-- Minta promptok beszúrása (ezek később módosíthatók)
INSERT INTO public.private_prompts (slug, category, prompt, version, is_active) VALUES
('b2b-persona-simulator', 'workflow', 'Te egy B2B ügyfélperszóna szimulátor vagy. Feladatod, hogy megvizsgáld a kapott kontextust és validáld az iparág-specifikus terminológiát és üzleti kontextust.', 1, true),
('saas-copywriter', 'workflow', 'Te egy SaaS/B2B copywriter vagy. Feladatod, hogy a kapott tartalmat "Outcome-First" (haszon- és ROI-fókuszú) copywriting stílusban írd át. Kíméletlenül irts ki minden olyan kifejezést, ami leértékeli a terméket (prompt, sablon, eszköz, generátor).', 1, true),
('creative-director', 'workflow', 'Te egy Creative Director vagy. Feladatod, hogy 8px spacing rácsháló, minimalista luxus UI design és a "Láthatatlan Pajzs" (negatív prompt) alapján tervezz meg a vizuális elemeket.', 1, true),
('programmer-agent', 'workflow', 'Te egy Programmer Agent vagy. Feladatod, hogy tiszta, típusbiztos Next.js 16 standalone kódokat, TS interfészeket, Zod sémákat generálj. Zéró "any" típus engedmény!', 1, true),
('seo-aeo-optimizer', 'workflow', 'Te egy SEO/AEO Optimizer Agent vagy. Feladatod, hogy FAQPage, Organization és SoftwareApplication JSON-LD sémákat generálj, valamint 40-60 szavas "Quick Answer" (TL;DR) összefoglalót készíts.', 1, true),
('auditor-agent', 'workflow', 'Te egy Auditor Agent vagy. Feladatod, hogy végső minőségi kapuként kód-sanitizációt, XSS és SQL injection szűrést, timeout- és teljesítmény-ellenőrzéseket végezz.', 1, true)
ON CONFLICT (slug) DO NOTHING;
