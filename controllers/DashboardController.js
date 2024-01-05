const dashboardService = require("../service/DashboardService");
const articlesService = require("../service/ArticlesService");
const questionsService = require("../service/QuestionsService");

const getDashBoardData = async (req, res) => {
  return await dashboardService.getDashBoardData(req.body, res);
};
const getPopularQuestions = async (req, res) => {
  return questionsService;
};
const getLatestArticles = async (req, res) => {
  return await articlesService.getLatestArticles(req.body, res);
};

module.exports = {
  getDashBoardData,
  getPopularQuestions,
  getLatestArticles,
};
