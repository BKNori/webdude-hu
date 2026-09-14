-- Admin Usage Dashboard Views SQL
-- Verzió: v1.0
-- Dátum: 2026-08-09
-- Leírás: Adminisztrátori Usage & Cost Dashboard nézetek és költségbecslő függvény

-- Dinamikus költségbecslő függvény
CREATE OR REPLACE FUNCTION public.calculate_estimated_cost_usd(
  workflow_type TEXT,
  tokens_used INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
  blended_rate NUMERIC;
BEGIN
  -- Mini/Könnyű modellek: $2.00 / 1M token
  IF workflow_type LIKE '%mini%' OR workflow_type = 'tinder_generator' THEN
    blended_rate := 0.000002; -- $2.00 / 1,000,000 tokens
  ELSE
    -- 6-Ágensű nehéz folyamatok: $8.00 / 1M token
    blended_rate := 0.000008; -- $8.00 / 1,000,000 tokens
  END IF;
  
  RETURN tokens_used * blended_rate;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- user_generations tábla (ha még nem létezik)
CREATE TABLE IF NOT EXISTS public.user_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  workflow_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  input_params JSONB,
  output_result JSONB,
  error_message TEXT,
  tokens_used INTEGER DEFAULT 0,
  estimated_cost_usd NUMERIC DEFAULT 0,
  execution_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- RLS engedélyezése
ALTER TABLE public.user_generations ENABLE ROW LEVEL SECURITY;

-- RLS szabályok
CREATE POLICY "Users can view own generations"
  ON public.user_generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own generations"
  ON public.user_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update generations"
  ON public.user_generations FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "Users can delete own generations"
  ON public.user_generations FOR DELETE
  USING (auth.uid() = user_id);

-- Indexek a gyors lekérdezéshez
CREATE INDEX IF NOT EXISTS idx_user_generations_user_id 
  ON public.user_generations(user_id);

CREATE INDEX IF NOT EXISTS idx_user_generations_status 
  ON public.user_generations(status);

CREATE INDEX IF NOT EXISTS idx_user_generations_workflow_id 
  ON public.user_generations(workflow_id);

CREATE INDEX IF NOT EXISTS idx_user_generations_created_at 
  ON public.user_generations(created_at DESC);

-- 1. Napi Összesítő és KPI Jelentés (admin_daily_usage_summary)
CREATE OR REPLACE VIEW public.admin_daily_usage_summary AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_requests,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_requests,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_requests,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
  COUNT(*) FILTER (WHERE status = 'processing') as processing_requests,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC / NULLIF(COUNT(*), 0)) * 100,
    2
  ) as success_rate_percent,
  ROUND(AVG(execution_time_ms) FILTER (WHERE status = 'completed'), 2) as avg_latency_ms,
  ROUND(SUM(estimated_cost_usd), 2) as total_cost_usd,
  ROUND(SUM(estimated_cost_usd) * 360, 0) as total_cost_huf
FROM public.user_generations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 2. Felhasználói Fogyasztási Rangsor (admin_user_consumption_ranking)
CREATE OR REPLACE VIEW public.admin_user_consumption_ranking AS
SELECT 
  p.id as user_id,
  p.email,
  p.current_plan,
  p.tokens_used as profile_tokens,
  COALESCE(SUM(ug.tokens_used), 0) as actual_measured_tokens,
  COALESCE(SUM(ug.estimated_cost_usd), 0) as total_cost_usd,
  ROUND(COALESCE(SUM(ug.estimated_cost_usd), 0) * 360, 0) as total_cost_huf,
  COUNT(ug.id) as total_generations,
  COUNT(ug.id) FILTER (WHERE ug.status = 'completed') as completed_generations
FROM public.profiles p
LEFT JOIN public.user_generations ug ON p.id = ug.user_id
GROUP BY p.id, p.email, p.current_plan, p.tokens_used
ORDER BY total_cost_usd DESC;

-- 3. AI Motorok Teljesítmény-Elemzése (admin_workflow_performance_stats)
CREATE OR REPLACE VIEW public.admin_workflow_performance_stats AS
SELECT 
  workflow_id,
  COUNT(*) as total_runs,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_runs,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_runs,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC / NULLIF(COUNT(*), 0)) * 100,
    2
  ) as reliability_rate_percent,
  ROUND(AVG(tokens_used) FILTER (WHERE status = 'completed'), 2) as avg_tokens_per_run,
  ROUND(AVG(estimated_cost_usd) FILTER (WHERE status = 'completed'), 4) as avg_cost_per_run_usd,
  ROUND(AVG(execution_time_ms) FILTER (WHERE status = 'completed'), 2) as avg_execution_time_ms
FROM public.user_generations
GROUP BY workflow_id
ORDER BY total_runs DESC;

-- 4. Hibajavító és Alerting Napló (admin_error_log_analysis)
CREATE OR REPLACE VIEW public.admin_error_log_analysis AS
SELECT 
  error_message,
  workflow_id,
  COUNT(*) as error_count,
  MAX(created_at) as last_seen_at,
  ARRAY_AGG(DISTINCT user_id) as affected_user_ids
FROM public.user_generations
WHERE status = 'failed' AND error_message IS NOT NULL
GROUP BY error_message, workflow_id
ORDER BY error_count DESC, last_seen_at DESC;

-- 5. Előfizetési Csomagok Eloszlása (admin_active_plans_distribution)
CREATE OR REPLACE VIEW public.admin_active_plans_distribution AS
SELECT 
  current_plan,
  COUNT(*) as user_count,
  ROUND(
    (COUNT(*)::NUMERIC / (SELECT COUNT(*) FROM public.profiles)) * 100,
    2
  ) as percentage_of_total,
  COALESCE(SUM(tokens_used), 0) as total_tokens_used,
  COALESCE(AVG(tokens_used), 2) as avg_tokens_per_user,
  COALESCE(SUM(
    SELECT COUNT(*) FROM public.user_generations ug 
    WHERE ug.user_id = profiles.id
  ), 0) as total_generations
FROM public.profiles
GROUP BY current_plan
ORDER BY 
  CASE current_plan
    WHEN 'agency' THEN 1
    WHEN 'ultra' THEN 2
    WHEN 'pro' THEN 3
    WHEN 'free' THEN 4
  END;

-- RLS a nézetekre - csak service_role férhet hozzá
ALTER VIEW public.admin_daily_usage_summary SET (security_invoker = true);
ALTER VIEW public.admin_user_consumption_ranking SET (security_invoker = true);
ALTER VIEW public.admin_workflow_performance_stats SET (security_invoker = true);
ALTER VIEW public.admin_error_log_analysis SET (security_invoker = true);
ALTER VIEW public.admin_active_plans_distribution SET (security_invoker = true);

-- Hozzáférés korlátozása a nézetekhez
DROP POLICY IF EXISTS "Service role only access views" ON public.admin_daily_usage_summary;
CREATE POLICY "Service role only access views"
  ON public.admin_daily_usage_summary FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role only access views" ON public.admin_user_consumption_ranking;
CREATE POLICY "Service role only access views"
  ON public.admin_user_consumption_ranking FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role only access views" ON public.admin_workflow_performance_stats;
CREATE POLICY "Service role only access views"
  ON public.admin_workflow_performance_stats FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role only access views" ON public.admin_error_log_analysis;
CREATE POLICY "Service role only access views"
  ON public.admin_error_log_analysis FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role only access views" ON public.admin_active_plans_distribution;
CREATE POLICY "Service role only access views"
  ON public.admin_active_plans_distribution FOR ALL
  USING (auth.role() = 'service_role');
