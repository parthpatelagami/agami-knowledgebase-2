const redisClientConfig = require("../config/dbconfig/cachedbconfig/redisconfig");
const checkDomainLicense = async (req, res) => {
  console.log('Checking domain license');
  try {
    const redisClient = await redisClientConfig();
    const key = process.env.COMPANY;
    const value = await redisClient.get(key);
   
  } catch (error) {
    console.error("Error checkDomainLicense ", error);
  }
};

module.exports = {
   checkDomainLicense 
};
