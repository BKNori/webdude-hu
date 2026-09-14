import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerationData {
  id: string;
  user_id: string;
  workflow_id: string;
  status: GenerationStatus;
  input_params: Record<string, unknown>;
  output_result?: unknown;
  error_message?: string;
  tokens_used: number;
  estimated_cost_usd: number;
  execution_time_ms: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export function useSupabaseGeneration(generationId: string | null) {
  const [status, setStatus] = useState<GenerationStatus>('pending');
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generationData, setGenerationData] = useState<GenerationData | null>(null);

  useEffect(() => {
    if (!generationId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Kezdeti adatok lekérése
    supabase
      .from('user_generations')
      .select('*')
      .eq('id', generationId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        if (data) {
          setGenerationData(data as GenerationData);
          setStatus(data.status);
          setResult(data.output_result);
          setError(data.error_message || null);

          if (data.status === 'completed' || data.status === 'failed') {
            setLoading(false);
          }
        }
      });

    // Real-time subscription
    const channel: RealtimeChannel = supabase
      .channel(`generation_${generationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_generations',
          filter: `id=eq.${generationId}`,
        },
        (payload) => {
          const data = payload.new as GenerationData;
          setGenerationData(data);
          setStatus(data.status);
          setResult(data.output_result);
          setError(data.error_message || null);

          if (data.status === 'completed' || data.status === 'failed') {
            setLoading(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [generationId]);

  return { status, result, error, loading, generationData };
}
