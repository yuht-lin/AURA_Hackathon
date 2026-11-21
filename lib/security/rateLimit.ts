/**
 * Small in-memory sliding-window rate limiter.
 * Good enough for a single serverless instance; use a shared store (for example Redis) in production.
 */
const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 30, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }
  recent.push(now);
  buckets.set(key, recent);
  return false;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export function resetRateLimits(): void {
  buckets.clear();
}
