'use server';

import { logger } from '@/lib/logger';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface GetPrivatePromptResponse {
  success: boolean;
  prompt?: string;
  version?: number;
  error?: string;
}

export async function getPrivatePrompt(slug: string): Promise<GetPrivatePromptResponse> {
  try {
    logger.debug('getPrivatePrompt: Firestore lekérés', {
      layer: 'Firestore',
      meta: { slug },
    });

    // Firebase ellenőrzés
    if (!db) {
      logger.error('getPrivatePrompt: Firebase nincs inicializálva', undefined, { layer: 'Firestore' });
      return { success: false, error: 'Firebase nincs inicializálva' };
    }

    const promptDoc = await getDoc(doc(db, 'private_prompts', slug));
    
    if (!promptDoc.exists()) {
      return { success: false, error: 'Prompt nem található' };
    }

    const data = promptDoc.data();
    
    if (!data.isActive) {
      return { success: false, error: 'Prompt inaktív' };
    }

    return {
      success: true,
      prompt: data.prompt,
      version: data.version,
    };
  } catch (error) {
    logger.error('getPrivatePrompt: kivétel', error, { layer: 'Firestore', meta: { slug } });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ismeretlen hiba',
    };
  }
}
