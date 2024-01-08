const { createClient } = require("redis");

const redisClientConfig = async () => {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });

  try {
    console.log("Starting Redis...");

    redisClient.on("error", (err) => console.log("Redis Client Error"));

    await redisClient.connect();

    console.log("Redis Connected.");

    return redisClient;
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
};

module.exports = redisClientConfig;
