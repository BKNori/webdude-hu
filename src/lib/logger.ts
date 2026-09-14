/**
 * logger.ts — WebDude Enterprise Logging Utility
 *
 * 5 réteg: ServerActions | ApiRoutes | ClientComponents | ErrorHandling | Firestore
 * 4 szint: info | debug (prod-ban elnémítva) | warn | error
 *
 * JSON-alapú strukturált kimenet — Incident Response és Anti-Drain Policy támogatáshoz.
 */

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
    const errorMessage =
      error instanceof Error ? error.message : error !== undefined ? String(error) : undefined;
    const stack = error instanceof Error ? error.stack : undefined;

    console.error(
      this.formatMessage('error', message, {
        ...options,
        meta: {
          ...options.meta,
          ...(errorMessage !== undefined ? { error: errorMessage } : {}),
          ...(stack !== undefined ? { stack } : {}),
        },
      })
    );
  }
}

export const logger = new Logger();
