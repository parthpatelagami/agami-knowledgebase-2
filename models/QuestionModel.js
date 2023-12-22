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
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
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
        },
        modified_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
  