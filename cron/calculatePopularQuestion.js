const cron = require("node-cron")
const  { calculatePopularQuestions } =  require("../utility/calculatePopularQuestion");
 const logger = require("../config/logger/logger.config.js")

cron.schedule('0 20 * * *', () => {
  try {
    logger.info("============================= Cron Started ==================================")
    calculatePopularQuestions();
  } catch (error) {
    logger.error("Error in cron job:", error.message);
    logger.error("============================= Cron Ended with Error ==================================")
  }
});
