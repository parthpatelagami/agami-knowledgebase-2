const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Question, User, Product } = dbconfig.models;
const elSearchUtility = require("../service/elsearch/elSearchUtility");

exports.createNewQuestions = async (createQuestionData) => {
  try {
    Question.create({
      title: createQuestionData.title,
      description: createQuestionData.description,
      product_id: createQuestionData.product_id,
      tag_id: createQuestionData.tag_id,
      visibility: createQuestionData.visibility,
      company_id: createQuestionData.company_id,
      modified_date: createQuestionData.modified_date,
      created_by: createQuestionData.created_by,
      modified_by: createQuestionData.modified_by
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

exports.getAllQuestions = async () => {
  try {
    const questions = await Question.findAll({
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

exports.getQuestionById = async (questionId) => {
  try {
    const question = await Question.findOne({
      where: { id: questionId },
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
      where: { id: questionId },
    });

    if (!existingQuestion) {
      return { status: 404, error: "Question not found" };
    }

    existingQuestion.title = editQuestionJsonObject.title;
    existingQuestion.description = editQuestionJsonObject.description;
    existingQuestion.product_id = editQuestionJsonObject.product_id;
    existingQuestion.tag_id = editQuestionJsonObject.tag_id;
    existingQuestion.visibility = editQuestionJsonObject.visibility;
    existingQuestion.company_id = editQuestionJsonObject.company_id;
    existingQuestion.modified_date = editQuestionJsonObject.modified_date;
    existingQuestion.modified_by = editQuestionJsonObject.modified_by;

    await existingQuestion.save();
    return { status: 1, data: existingQuestion };
  } catch (error) {
    console.error("Error during question edit:", error);
    return { status: 0, error: error.message || "Unknown error" };
  }
};

exports.deleteQuestions = async (questionId) => {
  try {
    const existingQuestion = await Question.findOne({
      where: { id: questionId },
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

exports.getQuestionsByUser = async (userId) => {
  try {
    const questions = await Question.findAll({
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
