-- Supabase Stripe RLS Migration v2
-- Verzió: v2.0
-- Dátum: 2026-08-09
-- Leírás: Stripe integrációhoz szükséges táblák és RLS szabályok

-- stripe_webhook_events tábla a webhook eseményekhez
CREATE TABLE IF NOT EXISTS public.stripe_webhook_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  customer_id TEXT,
  subscription_id TEXT,
  data JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS engedélyezése
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS szabályok - csak service_role férhet hozzá
CREATE POLICY "Service role only access"
  ON public.stripe_webhook_events FOR ALL
  USING (auth.role() = 'service_role');

-- Index a webhook események gyors kereséséhez
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_event_id 
  ON public.stripe_webhook_events(event_id);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_customer_id 
  ON public.stripe_webhook_events(customer_id);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_subscription_id 
  ON public.stripe_webhook_events(subscription_id);

-- Stripe webhook endpoint ellenőrzése
CREATE OR REPLACE FUNCTION public.verify_stripe_webhook_signature(
  payload TEXT,
  signature TEXT,
  secret TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Itt kell implementálni a Stripe signature validációt
  -- Ez a függvény a backend Edge Function-ben lesz használva
  RETURN true; -- Placeholder
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
