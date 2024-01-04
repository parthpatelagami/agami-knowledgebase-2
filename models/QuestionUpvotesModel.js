const { DataTypes } = require('sequelize');
const UserModel = require('./UserModel');
const CompanyModel = require('./CompanyModel');
const QuestionModel = require('./QuestionModel');

const QuestionUpvotesModel = (sequelize, Sequelize) => {
    const QuestionUpvote = sequelize.define(
      "questions_upvotes",
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
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'company_mst',
            key: 'id',
          },
        },
        upvoted_date: {
          type: Sequelize.BIGINT,
          defaultValue: () => Date.now(),
          allowNull: false,
        },
        upvoted_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user_mst',
            key: 'id',
          },
        },
      },
      {
        tableName: "questions_upvotes",
        timestamps: false,
      }
    );

    QuestionUpvote.belongsTo(QuestionModel(sequelize, Sequelize), {
      foreignKey: 'question_id',
      as: 'questionId',
    });
    
    
    QuestionUpvote.belongsTo(UserModel(sequelize, Sequelize), {
      foreignKey: 'upvoted_by',
      as: 'upvotedBy',
    });
    
    QuestionUpvote.belongsTo(CompanyModel(sequelize, Sequelize), {
      foreignKey: 'company_id',
      as: 'companyId',
    });
    
  
    QuestionUpvote.createQuestionUpvote = async (questionUpvoteData) => {
      return QuestionUpvote.create(questionUpvoteData);
    };
  
    return QuestionUpvote;
  };
  
  module.exports = QuestionUpvotesModel;
  