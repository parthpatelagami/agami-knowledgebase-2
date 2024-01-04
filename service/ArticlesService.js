const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Article, User, Category } = dbconfig.models;
const Sequelize = require("sequelize");

const getArticlesCountByUserId = async (req, res) => {
  const { userId, companyId } = req;
  try {
    const articlesCount = await Article.count({
      where: { company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: [],
          where: { id: userId },
        },
      ],
    });
    return articlesCount;
  } catch (error) {
    console.error("Error during get questions count by userId:", error);
    return error;
  }
};

const getLatestArticles = async (req, res) => {
  const { companyId } = req;
  try {
    const latestArticles = await Article.findAll({
      where: { company_id: companyId },
      order: [["created_date", "DESC"]],
      limit: 10,
    });
    res.status(200).json(latestArticles);
  } catch (error) {
    console.error("Error during get questions count by userId:", error);
    res.status(500).json(error);
  }
};

const getArticlesCountByCategory = async (req, res) => {
  const { companyId } = req;
  try {
    const articlesCountByCategory = await Article.findAll({
      attributes: [
        "category_id",
        [Sequelize.literal("COUNT(article_mst.id)"), "count"],
      ],
      where: { company_id: companyId },
      group: ["category_id"],
      include: [
        {
          model: Category,
          as: "categoryId",
          attributes: ["category_name"],
          where: { id: Sequelize.col("category_id") },
        },
      ],
    });

    const result = articlesCountByCategory.map((articleCount) => ({
      name: articleCount.categoryId.category_name,
      count: articleCount.get("count"),
    }));

    return result;
  } catch (error) {
    console.error("Error during get articles count by category:", error);
    return error;
  }
};

module.exports = {
  getArticlesCountByUserId,
  getLatestArticles,
  getArticlesCountByCategory,
};
