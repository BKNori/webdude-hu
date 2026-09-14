-- Supabase Monetization RLS Migration
-- Verzió: v1.0
-- Dátum: 2026-08-09
-- Leírás: profiles tábla létrehozása, has_plan_access súlyozás, RLS védvonalak

-- profiles tábla létrehozása
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  current_plan TEXT NOT NULL CHECK (current_plan IN ('free', 'pro', 'ultra', 'agency')),
  tokens_used INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- has_plan_access súlyozott függvény
CREATE OR REPLACE FUNCTION public.has_plan_access(required_plan TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND (
      required_plan = 'free' OR
      current_plan = 'agency' OR
      current_plan = required_plan OR
      (required_plan = 'pro' AND current_plan IN ('ultra', 'agency')) OR
      (required_plan = 'ultra' AND current_plan = 'agency')
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS (Row Level Security) engedélyezése
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS szabályok
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Service role can do anything"
  ON public.profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Automatikus updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Onboarding trigger új felhasználókhoz
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, current_plan)
  VALUES (
    NEW.id,
    NEW.email,
    'free' -- alapértelmezett plan
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
