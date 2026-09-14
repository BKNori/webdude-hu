import { getPrivatePrompt } from '@/app/actions/getPrivatePrompt';

export interface BuildPromptOptions {
  slug: string;
  variables: Record<string, string>;
}

export async function buildPrompt(options: BuildPromptOptions): Promise<string> {
  const result = await getPrivatePrompt(options.slug);
  
  if (!result.success) {
    throw new Error(result.error);
  }

  let prompt = result.prompt || '';
  
  // Változók behelyettesítése {{variable}} formátumban
  Object.entries(options.variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
  });

  return prompt;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // XSS védelem
    .replace(/['"]/g, '') // SQL injection védelem
    .trim();
}

export function validateVariables(variables: Record<string, string>): boolean {
  // Ellenőrizzük, hogy minden változó nem üres és biztonságos
  return Object.values(variables).every(value => {
    const sanitized = sanitizeInput(value);
    return sanitized.length > 0 && sanitized.length <= 1000;
  });
}
