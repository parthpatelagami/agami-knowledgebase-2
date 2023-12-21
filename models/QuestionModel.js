const { DataTypes } = require('sequelize');

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
            type: Sequelize.INTEGER
        },
        created_date: {
          type: Sequelize.DATE,
          defaultValue: DataTypes.NOW
        },
        modified_date: {
            type: Sequelize.DATE,
        },
        created_by: {
          type: Sequelize.INTEGER,
        },
        modified_by: {
            type: Sequelize.INTEGER,
          },
      },
      {
        tableName: "questions_mst",
        timestamps: false,
      }
    );
  
    Question.createQuestion = async (questionData) => {
      return Question.create(questionData);
    };
  
    return Question;
  };
  
  module.exports = QuestionModel;
  