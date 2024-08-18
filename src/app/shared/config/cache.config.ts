import { registerAs } from '@nestjs/config'

export default registerAs('cache', () => ({
  redisUrl: process.env.REDIS_URL,
  ttl: process.env.CACHE_TTL,
}))
