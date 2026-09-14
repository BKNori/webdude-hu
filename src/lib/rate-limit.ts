// Simple in-memory rate limiting utility
// In production, consider using Redis or a similar solution for distributed systems

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitStore>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute default
): { success: boolean; resetTime?: number; remaining?: number } {
  const now = Date.now();

  // Clean up expired entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetTime < now) {
    // New window or expired
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { success: true, resetTime, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    // Rate limit exceeded
    return { success: false, resetTime: existing.resetTime, remaining: 0 };
  }

  // Increment count
  existing.count++;
  rateLimitStore.set(identifier, existing);
  return {
    success: true,
    resetTime: existing.resetTime,
    remaining: maxRequests - existing.count,
  };
}

export function getClientIdentifier(req: Request): string {
  // Try to get IP from various headers
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");

  const ip = forwarded?.split(",")[0] || realIp || cfConnectingIp || "unknown";

  // Add user agent to make it more specific
  const userAgent = req.headers.get("user-agent") || "unknown";

  return `${ip}-${userAgent}`;
}
