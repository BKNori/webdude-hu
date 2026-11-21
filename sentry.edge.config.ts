import * as Sentry from "@sentry/nextjs";
import { buildBaseSentryOptions } from "./src/lib/sentry";

Sentry.init(buildBaseSentryOptions({ isServer: true }));
