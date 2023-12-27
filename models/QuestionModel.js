const { DataTypes } = require('sequelize');
const UserModel = require('./UserModel');
const ProductModel = require('./ProductModel')
const CompanyModel = require('./CompanyModel')

const QuestionModel = (sequelize, Sequelize) => {
    const Question = sequelize.define(
      "questions_mst",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'product_mst',
            key: 'id',
          },
        },
        tag_id: {
            type: Sequelize.INTEGER,
        },
        visibility: {
            type: Sequelize.ENUM('0','1'),
            allowNull: false,
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'company_mst',
            key: 'id',
          },
        },
        created_date: {
          type: Sequelize.BIGINT,
          defaultValue: () => Date.now(),
          allowNull: false,
        },
        modified_date: {
            type: Sequelize.DATE,
        },
        created_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user_mst',
            key: 'id',
          },
        },
        modified_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'user_mst',
              key: 'id',
            },
        },
      },
      {
        tableName: "questions_mst",
        timestamps: false,
      }
    );

    Question.belongsTo(UserModel(sequelize, Sequelize), {
      foreignKey: 'created_by',
      as: 'createdBy',
    });
    
    Question.belongsTo(UserModel(sequelize, Sequelize), {
      foreignKey: 'modified_by',
      as: 'modifiedBy',
    });
    
    Question.belongsTo(ProductModel(sequelize, Sequelize), {
      foreignKey: 'product_id',
      as: 'productId',
    });
    
    Question.belongsTo(CompanyModel(sequelize, Sequelize), {
      foreignKey: 'company_id',
      as: 'companyId',
    });
    
  
    Question.createQuestion = async (questionData) => {
      return Question.create(questionData);
    };
  
    return Question;
  };
  
  module.exports = QuestionModel;
  