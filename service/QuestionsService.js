const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Question, User, Product, sequelize } = dbconfig.models;
const elSearchUtility = require("../service/elsearch/elSearchUtility");
const logger = require("../config/logger/logger.config.js")

exports.createNewQuestions = async (createQuestionData) => {
  try {
    Question.create({
      title: createQuestionData.title,
      description: createQuestionData.description,
      product_id: createQuestionData.product_id,
      tag_id: createQuestionData.tag_id,
      visibility: createQuestionData.visibility,
      company_id: createQuestionData.companyId,
      modified_date: createQuestionData.modified_date,
      created_by: createQuestionData.userId,
      modified_by: createQuestionData.userId,
    }).then((createdQuestion) => {
      createQuestionData["question_id"] = createdQuestion.id;
      //Add Data To EL
      elSearchUtility.addQuestion(createQuestionData);
    });
    return { status: 1, data: {} };
  } catch (error) {
    console.error("Error during question registeration:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.getAllQuestions = async (companyId) => {
  try {
    const questions = await Question.findAll({
      where: { company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return { status: 1, data: questions };
  } catch (error) {
    console.error("Error during get all questions:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.getAllCompanyQuestionRepliesUpvotedCountData = async () => {
  try {
    const rawQuery = `
    SELECT q.id AS question_id,q.company_id, COUNT(DISTINCT qr.id) AS reply_count, COUNT(DISTINCT qu.id) AS upvotes_count FROM questions_mst q LEFT JOIN question_reply_mst qr ON q.id = qr.question_id LEFT JOIN questions_upvotes qu ON q.id = qu.question_id GROUP BY q.id;    `;

    const questions = await sequelize.query(rawQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
    
    return { status: 1, data: questions };
  } catch (error) {
    logger.error("Error during get all questions:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.getQuestionById = async (questionId, companyId) => {
  try {
    const question = await Question.findOne({
      where: { id: questionId, company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!question) {
      return { status: 404, error: "Question not found" };
    }
    return { status: 1, data: question };
  } catch (error) {
    console.error("Error during get question:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.editQuestions = async (editQuestionJsonObject, questionId) => {
  try {
    const questionId = req.params.id;
    const existingQuestion = await Question.findOne({
      where: { id: questionId, company_id: editQuestionJsonObject.companyId },
    });

    if (!existingQuestion) {
      return { status: 404, error: "Question not found" };
    }

    existingQuestion.title = editQuestionJsonObject.title;
    existingQuestion.description = editQuestionJsonObject.description;
    existingQuestion.product_id = editQuestionJsonObject.product_id;
    existingQuestion.tag_id = editQuestionJsonObject.tag_id;
    existingQuestion.visibility = editQuestionJsonObject.visibility;
    existingQuestion.company_id = editQuestionJsonObject.companyId;
    existingQuestion.modified_date = editQuestionJsonObject.modified_date;
    existingQuestion.modified_by = editQuestionJsonObject.userId;

    await existingQuestion.save();
    return { status: 1, data: existingQuestion };
  } catch (error) {
    console.error("Error during question edit:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.deleteQuestions = async (questionId, companyId) => {
  try {
    const existingQuestion = await Question.findOne({
      where: { id: questionId, company_id: companyId },
    });

    if (!existingQuestion) {
      return { status: 404, error: "Question not found" };
    }

    await existingQuestion.destroy();

    return { status: 1, data: "Question Deleted Successfully" };
  } catch (error) {
    console.error("Error during question delete:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.getQuestionsByUser = async (userId, companyId) => {
  try {
    const questions = await Question.findAll({
      where: { company_id: companyId },
      include: [
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email"],
          where: { id: userId },
        },
        {
          model: Product,
          as: "productId",
          attributes: ["id", "product_name"],
        },
      ],
    });
    if (!questions) {
      return { status: 404, error: "Question or User not found" };
    }
    return { status: 1, data: questions };
  } catch (error) {
    console.error("Error during get questions by user:", error);
    res.sendStatus(500);
  }
};

exports.getAllQuestionsCount = async (req, res) => {
  const { companyId } = req;
  try {
    const questionsCount = await Question.count({
      where: { company_id: companyId },
    });
    return questionsCount;
  } catch (error) {
    console.error("Error during get all questions count:", error);
    return error;
  }
};

exports.getQuestionsCountByUserId = async (req, res) => {
  const { companyId, userId } = req;
  try {
    const questionsCount = await Question.count({
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
    return questionsCount;
  } catch (error) {
    console.error("Error during get questions count by userId:", error);
    return error;
  }
};
