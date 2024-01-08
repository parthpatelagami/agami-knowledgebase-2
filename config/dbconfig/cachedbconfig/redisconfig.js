const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});


redisClient.on('connect', err => console.log('Redis Connnected', err));

redisClient.on('error', err => console.log('Redis Client Error', err));



module.exports = redisClient;
