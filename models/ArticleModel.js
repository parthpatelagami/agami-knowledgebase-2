const { DataTypes } = require("sequelize");
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");
const CompanyModel = require("./CompanyModel");
const CategoryModel = require("./CategoryModel");
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
        references: {
          model: "product_mst",
          key: "id",
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "category_mst",
          key: "id",
        },
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "company_mst",
          key: "id",
        },
      },
      visibility: {
        type: Sequelize.ENUM("0", "1"),
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_mst",
          key: "id",
        },
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: () => Date.now(),
      },
      modified_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_mst",
          key: "id",
        },
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

  Article.belongsTo(UserModel(sequelize, Sequelize), {
    foreignKey: "created_by",
    as: "createdBy",
  });

  Article.belongsTo(UserModel(sequelize, Sequelize), {
    foreignKey: "modified_by",
    as: "modifiedBy",
  });

  Article.belongsTo(ProductModel(sequelize, Sequelize), {
    foreignKey: "product_id",
    as: "productId",
  });

  Article.belongsTo(CategoryModel(sequelize, Sequelize), {
    foreignKey: "category_id",
    as: "categoryId",
  });

  Article.belongsTo(CompanyModel(sequelize, Sequelize), {
    foreignKey: "company_id",
    as: "companyId",
  });

  Article.createArticle = async (articleData) => {
    return Article.create(articleData);
  };

  return Article;
};

module.exports = ArticleModel;
