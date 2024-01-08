const redisClientConfig = require("../config/dbconfig/cachedbconfig/redisconfig");

const agmFilter = async (req, res, next) => {
  try {
    const redisClient = await redisClientConfig();

    const key = process.env.COMPANY;
    const value = await redisClient.get(key);
    if (value) {
      req.licenseCompany = value;
      next();
    } else {
      console.log("No Value Found");
      next();
    }
  } catch (error) {
    console.error("Error in Redis middleware:", error);
    next();
  }
};

module.exports = agmFilter;
