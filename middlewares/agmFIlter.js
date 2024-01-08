const logger = require("../config/logger/logger.config.js");

const agmFilter = async (req, res, next) => {
  try {


    next();
  } catch (error) {
    logger.error("Error in agmFilter middleware:", error);
    next();
  }
};

module.exports = agmFilter;
