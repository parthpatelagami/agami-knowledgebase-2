const cron = require("node-cron")
const  { calculatePopularQuestions } =  require("../utility/calculatePopularQuestion");

cron.schedule('* * * * * *', () => {
  try {
    console.log("============================= Cron Started ==================================")
    calculatePopularQuestions();
  } catch (error) {
    console.error("Error in cron job:", error.message);
  }
});
