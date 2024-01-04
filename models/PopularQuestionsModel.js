const { DataTypes } = require('sequelize');
const QuestionModel = require('./QuestionModel');
const CompanyModel = require('./CompanyModel')

const PopularQuestion = (sequelize, Sequelize) => {
    const PopularQuestion = sequelize.define(
      "popular_questions",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        question_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'questions_mst',
            key: 'id',
          },
        },
        no_of_reply: {
            type: Sequelize.INTEGER,
        },
        no_of_upvotes: {
          type: Sequelize.INTEGER,
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'company_mst',
            key: 'id',
          },
        },
      },
      {
        tableName: "popular_questions",
        timestamps: false,
      }
    );

    PopularQuestion.belongsTo(QuestionModel(sequelize, Sequelize), {
      foreignKey: 'question_id',
      as: 'questionId',
    });
    
    PopularQuestion.belongsTo(CompanyModel(sequelize, Sequelize), {
      foreignKey: 'company_id',
      as: 'companyId',
    });
    
  
    PopularQuestion.createPopularQuestion = async (popularQuestionData) => {
      return QuestPopularQuestionion.create(popularQuestionData);
    };
  
    return PopularQuestion;
  };
  
  module.exports = PopularQuestion;
  