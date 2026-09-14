'use server';

import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export interface CreateSupabaseGenerationResponse {
  success: boolean;
  generationId?: string;
  error?: string;
}

export async function createSupabaseGeneration(
  workflowId: string,
  params: Record<string, unknown>
): Promise<CreateSupabaseGenerationResponse> {
  try {
    // Supabase Auth ellenőrzés
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Nincs bejelentkezve felhasználó' };
    }

    // Felhasználói jogosultság ellenőrzése
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('current_plan, has_product_access')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return { success: false, error: 'Felhasználó profil nem található' };
    }

    const hasAccess = profile.has_product_access === true || 
                      profile.current_plan !== 'free' ||
                      user.email === 'hello@webdude.hu';

    if (!hasAccess) {
      return { success: false, error: 'Nincs jogosultságod a generáláshoz' };
    }

    // Generálás létrehozása a Supabase Edge Function hívásával
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error: functionError } = await supabaseClient.functions.invoke(
      'multi-agent-chaining-v2',
      {
        body: { workflowId, params },
        headers: {
          'user-id': user.id,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      }
    );

    if (functionError) {
      return { success: false, error: functionError.message };
    }

    return { 
      success: true, 
      generationId: data.generationId 
    };
  } catch (error) {
    console.error('Hiba a generálás létrehozásakor:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Ismeretlen hiba' 
    };
  }
}
