import Bottleneck from 'bottleneck';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { OPT } from './options';

const redis_host = OPT.DOCKER ? 'redis' : 'localhost';

export const osmLimiter = new Bottleneck({
  /* Some basic options */
  maxConcurrent: 1,
  minTime: 1000,
  id: "osmLimiter",
 
  /* Clustering options */
  datastore: "ioredis",
  clearDatastore: false,
  clientOptions: {
    host: redis_host,
    port: 6379,
    enableOfflineQueue: !OPT.DOCKER,
 
    // Redis client options
    // Using NodeRedis? See https://github.com/NodeRedis/node_redis#options-object-properties
    // Using ioredis? See https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
  }
});


const redisClient = new Redis({
  enableOfflineQueue: !OPT.DOCKER,
  host: redis_host,
  port: 6379,
})
redisClient.on('error', (err) => {
  console.error(err)
  if (!OPT.DOCKER) {
    redisClient.disconnect()
    return
  }

  if (err.code === 'ECONNREFUSED') {
    process.exit(1)
  }
  redisClient.connect()
});


const opts = {
  // Basic options
  storeClient: redisClient,
  points: 20, // Number of points
  duration: 4, // Per second(s)
  
  // Custom
  execEvenly: false, // Do not delay actions evenly
  blockDuration: OPT.RATE_LIMITING_BLOCK_DURATION * 60, // Do not block if consumed more than points
  keyPrefix: 'rlflx', // must be unique for limiters with different purpose
};
export const RateLimiter = new RateLimiterRedis(opts)
