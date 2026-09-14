import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// LLM API hívások
async function callLLM(model: string, messages: Array<{role: string; content: string}>) {
  const apiKey = Deno.env.get(model.includes('gemini') ? 'GEMINI_API_KEY' : 
                      model.includes('claude') ? 'ANTHROPIC_API_KEY' : 
                      model.includes('gpt') ? 'OPENAI_API_KEY' : '');
  
  if (!apiKey) throw new Error(`API key not found for ${model}`);

  let url = '';
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  if (model.includes('gemini')) {
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    headers = { 'Content-Type': 'application/json' };
  } else if (model.includes('claude')) {
    url = 'https://api.anthropic.com/v1/messages';
    headers['anthropic-version'] = '2023-06-01';
  } else if (model.includes('gpt')) {
    url = 'https://api.openai.com/v1/chat/completions';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model.includes('gemini') ? 'gemini-1.5-pro' : 
             model.includes('claude') ? 'claude-3-5-sonnet-20240620' : 
             model.includes('gpt') ? 'gpt-4o' : model,
      messages: model.includes('gemini') ? [{role: 'user', parts: [{text: messages[0].content}]}] : messages,
      max_tokens: 4096,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (model.includes('gemini')) {
    return data.candidates[0].content.parts[0].text;
  } else if (model.includes('claude')) {
    return data.content[0].text;
  } else if (model.includes('gpt')) {
    return data.choices[0].message.content;
  }
  
  return '';
}

// Private prompt lekérés RPC hívással
async function getPrivatePrompt(supabase: any, slug: string) {
  const { data, error } = await supabase.rpc('get_private_prompt_by_slug', {
    prompt_slug: slug
  });
  
  if (error) throw new Error(`Failed to fetch prompt: ${error.message}`);
  return data;
}

// 6-Ágensű Orchestration Pipeline
async function runMultiAgentWorkflow(input: any, supabase: any) {
  const startTime = Date.now();
  let totalTokens = 0;
  let currentInput = input;

  try {
    // 1. Ágens: B2B Client Persona Simulator (Gemini 1.5 Pro)
    const personaPrompt = await getPrivatePrompt(supabase, 'b2b-persona-simulator');
    const personaResult = await callLLM('gemini-1.5-pro', [
      { role: 'system', content: personaPrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 1000; // Becsült token fogyasztás
    currentInput = { ...currentInput, personaContext: personaResult };

    // 2. Ágens: SaaS/B2B Copywriter Agent (Claude 3.5 Sonnet)
    const copywriterPrompt = await getPrivatePrompt(supabase, 'saas-copywriter');
    const copywriterResult = await callLLM('claude-3.5-sonnet', [
      { role: 'system', content: copywriterPrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 1500;
    currentInput = { ...currentInput, copywriterContent: copywriterResult };

    // 3. Ágens: Creative Director Agent (Claude 3.5 Sonnet)
    const creativePrompt = await getPrivatePrompt(supabase, 'creative-director');
    const creativeResult = await callLLM('claude-3.5-sonnet', [
      { role: 'system', content: creativePrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 1200;
    currentInput = { ...currentInput, creativeDesign: creativeResult };

    // 4. Ágens: Programmer Agent (Claude 3.5 Sonnet)
    const programmerPrompt = await getPrivatePrompt(supabase, 'programmer-agent');
    const programmerResult = await callLLM('claude-3.5-sonnet', [
      { role: 'system', content: programmerPrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 2000;
    currentInput = { ...currentInput, codeStructure: programmerResult };

    // 5. Ágens: SEO/AEO Optimizer Agent (GPT-4o)
    const seoPrompt = await getPrivatePrompt(supabase, 'seo-aeo-optimizer');
    const seoResult = await callLLM('gpt-4o', [
      { role: 'system', content: seoPrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 800;
    currentInput = { ...currentInput, seoData: seoResult };

    // 6. Ágens: Auditor Agent (GPT-4o)
    const auditorPrompt = await getPrivatePrompt(supabase, 'auditor-agent');
    const auditResult = await callLLM('gpt-4o', [
      { role: 'system', content: auditorPrompt },
      { role: 'user', content: JSON.stringify(currentInput) }
    ]);
    totalTokens += 500;

    const executionTime = Date.now() - startTime;
    const estimatedCost = totalTokens * 0.000008; // $8.00 / 1M token

    return {
      success: true,
      result: currentInput,
      tokensUsed: totalTokens,
      executionTimeMs: executionTime,
      estimatedCostUsd: estimatedCost
    };

  } catch (error) {
    throw new Error(`Multi-agent workflow failed: ${error.message}`);
  }
}

serve(async (req) => {
  // CORS beállítások
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, content-type',
      },
    });
  }

  try {
    const { workflowId, params } = await req.json();
    
    // Supabase kliens inicializálása service_role-al
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generálás létrehozása pending státusszal
    const { data: generation, error: createError } = await supabase
      .from('user_generations')
      .insert({
        workflow_id: workflowId,
        status: 'pending',
        input_params: params,
        user_id: req.headers.get('user-id') // Auth header-ből
      })
      .select()
      .single();

    if (createError) throw createError;

    // Aszinkron feldolgozás indítása waitUntil segítségével
    Deno.env.get('DENO_DEPLOYMENT_ID') && 
      (globalThis as any).waitUntil(
        runMultiAgentWorkflow(params, supabase).then(async (result) => {
          await supabase
            .from('user_generations')
            .update({
              status: 'completed',
              output_result: result.result,
              tokens_used: result.tokensUsed,
              estimated_cost_usd: result.estimatedCostUsd,
              execution_time_ms: result.executionTimeMs,
              completed_at: new Date().toISOString()
            })
            .eq('id', generation.id);
        }).catch(async (error) => {
          await supabase
            .from('user_generations')
            .update({
              status: 'failed',
              error_message: error.message
            })
            .eq('id', generation.id);
        })
      );

    // Azonnali válasz a kliensnek
    return new Response(
      JSON.stringify({ 
        success: true, 
        generationId: generation.id,
        status: 'pending'
      }),
      {
        status: 202,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
