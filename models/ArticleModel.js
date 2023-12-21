const { DataTypes } = require('sequelize');
const ArticleModel = (sequelize, Sequelize) => {
    const Article = sequelize.define(
      "article_mst",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.TEXT,
        },
        description: {
          type: Sequelize.TEXT,
        },
        product_id: {
          type: Sequelize.INTEGER,
        },
        tag_id: {
          type: Sequelize.INTEGER,
        },
        visibility: {
          type: Sequelize.ENUM('0','1'),
        },
        company_id: {
          type: Sequelize.INTEGER,
        },
        created_by: {
            type: Sequelize.INTEGER,
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW,
        },
        modified_by: {
            type: Sequelize.INTEGER,
        },
        modified_date: {
            type: Sequelize.DATE,
        },
      },
      {
        tableName: "article_mst",
        timestamps: false,
      }
    );
  
    Article.createArticle = async (articleData) => {
      return Article.create(articleData);
    };
  
    return Article;
  };
  
  module.exports = ArticleModel;
  