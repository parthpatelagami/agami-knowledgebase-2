const questionsService = require("../service/QuestionsService");
const articlesService = require("../service/ArticlesService");

const getDashBoardData = async (req, res) => {
  try {
    const allQuestionsCount = await questionsService.getAllQuestionsCount(
      req,
      res
    );
    const myQuestionsCount = await questionsService.getQuestionsCountByUserId(
      req,
      res
    );
    const allArticlesCount = await articlesService.getAllArticlesCount(
      req,
      res
    );
    const myArticlesCount = await articlesService.getArticlesCountByUserId(
      req,
      res
    );
    const categoryCount = await articlesService.getArticlesCountByCategory(
      req,
      res
    );
    const dashboardData = {
      all_articles_count: allArticlesCount,
      all_questions_count: allQuestionsCount,
      my_questions_count: myQuestionsCount,
      my_article_count: myArticlesCount,
      category_count: categoryCount,
    };

    return dashboardData;
  } catch (error) {
    console.error("Error getting Dashboard Data:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getDashBoardData,
};
