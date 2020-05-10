const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RateLimitRedis = require('rate-limit-redis');

module.exports = new RateLimit({
  store: new RateLimitRedis({
    client: redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  }),
  message: {
    error: 'Too many requests, please try again later.',
  },
  windowMs: 1000 * 60 * 5,
  max: 600,
});
