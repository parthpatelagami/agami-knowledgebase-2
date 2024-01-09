const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Article, User, Category } = dbconfig.models;
const Sequelize = require("sequelize");

const createNewArticle = async (req) => {
  const {
    title,
    description,
    product_id,
    tag_id,
    visibility,
    companyId,
    modified_date,
    userId,
  } = req;
  try {
    const newArticle = await Article.create({
      title: title,
      description: description,
      product_id: product_id,
      tag_id: tag_id,
      visibility: visibility,
      company_id: companyId,
      modified_date: modified_date,
      created_by: userId,
      modified_by: userId,
    });
    return 1;
  } catch (error) {
    console.error("Error during Article registeration:", error);
  }
};
const getAllArticles = async (req) => {
  try {
    const { companyId } = req;
    const articles = await Article.findAll({
      where: { company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return { status: 200, data: articles };
  } catch (error) {
    console.error("Error during get all articles:", error);
    return { status: 500, data: {} };
  }
};

const getArticleById = async (req) => {
  try {
    const { articleId, companyId } = req;
    const article = await Article.findOne({
      where: { id: articleId, company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!article) {
      return { status: 404, data: {} };
    }
    return { status: 200, data: article };
  } catch (error) {
    console.error("Error during fetching article by ID:", error);
    return { status: 500, data: {} };
  }
};

const getArticleByUserId = async (req) => {
  try {
    const { userId } = req;
    const article = await Article.findAll({
      where: { created_by: userId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    if (!article) {
      return { status: 404, data: {} };
    }

    return { status: 200, data: article };
  } catch (error) {
    console.error("Error during fetching article by ID:", error);
    return { status: 500, data: {} };
  }
};

const editArticle = async (req) => {
  try {
    const {
      title,
      description,
      product_id,
      tag_id,
      visibility,
      company_id,
      modified_date,
      created_by,
      modified_by,
    } = req.body;
    const articleId = req.params.id;
    const existingArticle = await Article.findOne({ where: { id: articleId } });

    if (!existingArticle) {
      return { status: 404, data: {} };
    }

    existingArticle.title = title;
    existingArticle.description = description;
    existingArticle.product_id = product_id;
    existingArticle.tag_id = tag_id;
    existingArticle.visibility = visibility;
    existingArticle.company_id = company_id;
    existingArticle.modified_date = modified_date;
    existingArticle.modified_by = modified_by;

    await existingArticle.save();
    return { status: 201, data: {} };
  } catch (error) {
    console.error("Error during article update:", error);
    return { status: 500, data: {} };
  }
};

const deleteArticle = async (req) => {
  try {
    const articleId = req.params.id;
    const existingArticle = await Article.findOne({ where: { id: articleId } });

    if (!existingArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    await existingArticle.destroy();

    return { status: {}, data: {} };
  } catch (error) {
    console.error("Error during Article deletion:", error);
    res.sendStatus(500);
  }
};

const getAllArticlesCount = async (req, res) => {
  const { companyId } = req;
  try {
    const articlesCount = await Article.count({
      where: { company_id: companyId },
    });
    return articlesCount;
  } catch (error) {
    console.error("Error during get all articles count:", error);
    return error;
  }
};

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
    console.error("Error getting articles count by userId:", error);
    return error;
  }
};

const getLatestArticles = async (req, res) => {
  const { companyId, limit } = req;
  try {
    const options = {
      where: { company_id: companyId },
      order: [["created_date", "DESC"]],
    };
    if (req && limit && typeof limit === "number" && limit > 0) {
      options.limit = limit;
    }
    const latestArticles = await Article.findAll(options);
    return latestArticles;
  } catch (error) {
    console.error("Error getting latest articles count:", error);
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
  createNewArticle,
  getAllArticles,
  getArticleById,
  getArticleByUserId,
  editArticle,
  deleteArticle,
  getAllArticlesCount,
  getArticlesCountByUserId,
  getLatestArticles,
  getArticlesCountByCategory,
};
