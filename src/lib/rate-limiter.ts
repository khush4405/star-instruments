type RateLimitEntry = {
  count: number;
  timestamp: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

export function rateLimit(ip: string, maxRequests: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry) {
    rateLimits.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // If window has passed, reset
  if (now - entry.timestamp > windowMs) {
    rateLimits.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // If within window and under limit
  if (entry.count < maxRequests) {
    entry.count += 1;
    return { allowed: true, remaining: maxRequests - entry.count };
  }

  // Blocked
  return { allowed: false, remaining: 0 };
}
