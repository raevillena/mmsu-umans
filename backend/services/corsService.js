import redisClient from '../config/redis.js';

// -------- In-memory cache --------
let cachedOrigins = null;
let cacheExpiry = 0;

// how long to keep in-memory cache (ms)
const ORIGINS_CACHE_TTL = 540_000; // 30 seconds (adjust if you want)

export const getAllowedOrigins = async () => {
  const now = Date.now();

  // ✅ 1) Return from memory cache if still valid
  if (cachedOrigins && now < cacheExpiry) {
    return cachedOrigins;
  }

  // ---- 2) Try Redis first ----
  try {
    const data = await redisClient.get("allowed_origins");

    if (data) {
      const parsed = JSON.parse(data);

      // update in-memory cache
      cachedOrigins = parsed;
      cacheExpiry = now + ORIGINS_CACHE_TTL;

      return parsed;
    }
  } catch (err) {
    console.error("Redis CORS lookup failed, falling back to env:", err);
  }

  // ---- 3) Fallback to env ----
  const debug = process.env.DEBUG === "true";
  const raw = debug
    ? process.env.ALLOWED_ORIGINS_DEV
    : process.env.ALLOWED_ORIGINS_PROD;

  const envOrigins = raw
    ? raw.split(",").map(o => o.trim())
    : [];

  // cache the fallback too
  cachedOrigins = envOrigins;
  cacheExpiry = now + ORIGINS_CACHE_TTL;

  return envOrigins;
};