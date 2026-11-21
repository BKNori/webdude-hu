import * as Sentry from "@sentry/nextjs";
import { buildBaseSentryOptions } from "@/lib/sentry";

Sentry.init({
  ...buildBaseSentryOptions({ isServer: false }),
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
