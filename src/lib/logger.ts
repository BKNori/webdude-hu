/**
 * logger.ts — WebDude Enterprise Logging Utility
 *
 * 5 réteg: ServerActions | ApiRoutes | ClientComponents | ErrorHandling | Firestore
 * 4 szint: info | debug (prod-ban elnémítva) | warn | error
 *
 * JSON-alapú strukturált kimenet — Incident Response, Anti-Drain Policy
 * és produkciós Sentry hibakövetés (ha DSN konfigurált) támogatásával.
 */

import * as Sentry from '@sentry/nextjs';
import { getSentryDsn, sanitizeRecord, scrubSensitiveString } from '@/lib/sentry';

type LogLevel = 'info' | 'debug' | 'warn' | 'error';

export interface LogOptions {
  layer: 'ServerActions' | 'ApiRoutes' | 'ClientComponents' | 'ErrorHandling' | 'Firestore';
  meta?: Record<string, unknown>;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, options: LogOptions): string {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      layer: options.layer,
      message,
      meta: options.meta ?? {},
    });
  }

  /**
   * Általános rendszerinformációk és sikeres műveletek naplózása.
   */
  info(message: string, options: LogOptions): void {
    console.log(this.formatMessage('info', message, options));
  }

  /**
   * Részletes nyomkövetési adatok — kizárólag fejlesztési és tesztelési fázisban aktív.
   * Production buildben automatikusan elnémul.
   */
  debug(message: string, options: LogOptions): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, options));
    }
  }

  /**
   * Nem kritikus, de szokatlan eseményekre vonatkozó figyelmeztetések
   * (pl. fallback adatok betöltése, hiányzó opcionális konfiguráció).
   */
  warn(message: string, options: LogOptions): void {
    console.warn(this.formatMessage('warn', message, options));
  }

  /**
   * Kritikus hibák, kivételek és elbukott szerverhívások rögzítése.
   * Automatikusan kibontja az Error.message és Error.stack értékeket.
   */
  error(
    message: string,
    error?: unknown,
    options: LogOptions = { layer: 'ErrorHandling' }
  ): void {
    const safeMeta = options.meta ? sanitizeRecord(options.meta) : undefined;
    const rawErrorMessage =
      error instanceof Error ? error.message : error !== undefined ? String(error) : undefined;
    const errorMessage =
      rawErrorMessage !== undefined ? scrubSensitiveString(rawErrorMessage) : undefined;
    const stack =
      error instanceof Error && error.stack
        ? scrubSensitiveString(error.stack)
        : undefined;

    console.error(
      this.formatMessage('error', scrubSensitiveString(message), {
        ...options,
        meta: {
          ...safeMeta,
          ...(errorMessage !== undefined ? { error: errorMessage } : {}),
          ...(stack !== undefined ? { stack } : {}),
        },
      })
    );

    const isServer = typeof window === 'undefined';
    if (!getSentryDsn(isServer)) {
      return;
    }

    try {
      Sentry.withScope((scope) => {
        scope.setTag('logger.layer', options.layer);
        if (safeMeta && Object.keys(safeMeta).length > 0) {
          scope.setContext('logger_meta', safeMeta);
        }

        const safeMessage = scrubSensitiveString(message);
        let capturedError: Error;
        if (error instanceof Error) {
          capturedError = new Error(errorMessage ?? safeMessage);
          capturedError.name = error.name;
          if (stack) {
            capturedError.stack = stack;
          }
        } else {
          capturedError = new Error(
            errorMessage ? `${safeMessage}: ${errorMessage}` : safeMessage
          );
        }

        Sentry.captureException(capturedError);
      });
    } catch {
      // A Sentry telemetria hibája sosem akaszthatja meg az alkalmazás naplózását.
    }
  }
}

export const logger = new Logger();
