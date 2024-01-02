const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Question, User, Product } = dbconfig.models;

exports.createNewQuestions = async (newQuestionJsonObject) => {
  try {
    const createdQuestion = await Question.create({
      title: newQuestionJsonObject.title,
      description: newQuestionJsonObject.description,
      product_id: newQuestionJsonObject.product_id,
      tag_id: newQuestionJsonObject.tag_id,
      visibility: newQuestionJsonObject.visibility,
      company_id: newQuestionJsonObject.company_id,
      modified_date: newQuestionJsonObject.modified_date,
      created_by: newQuestionJsonObject.created_by,
      modified_by: newQuestionJsonObject.modified_by,
    });
    return { status: 1, data: createdQuestion };
  } catch (error) {
    console.error("Error during question registeration:", error);
    return { status: 0, error: error.message || 'Unknown error' };
  }
};

exports.getAllQuestions = async () => {
  try {
    const questions = await Question.findAll({
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['id', 'name', 'email'],
      }],
    })
    return { status: 1,data:questions };
  } catch (error) {
    console.error("Error during get all questions:", error);
    return { status: 0, error: error.message || 'Unknown error' };
  }
};

exports.getQuestionById = async (questionId) => {
  try {
    const question = await Question.findOne({ where: { id: questionId },
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['id', 'name', 'email'],
      }], });

    if (!question) {
      return {status:404,error:'Question not found'}
    }
    return { status: 1,data:question };
  } catch (error) {
    console.error("Error during get question:", error);
    return { status: 0, error: error.message || 'Unknown error' };
  }
}

exports.editQuestions = async (editQuestionJsonObject,questionId) => {
  try {
    const questionId = req.params.id;
    const existingQuestion = await Question.findOne({ where: { id: questionId } });;

    if (!existingQuestion) {
      return {status:404,error:'Question not found'}
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
    return { status: 1,data:existingQuestion };
  } catch (error) {
    console.error("Error during question edit:", error);
    return { status: 0, error: error.message || 'Unknown error' };
  }
};

exports.deleteQuestions = async (questionId) => {
  try {
    const existingQuestion = await Question.findOne({ where: { id: questionId } });
  
    if (!existingQuestion) {
      return {status:404,error:'Question not found'}
    }

    await existingQuestion.destroy();

    return { status: 1,data:'Question Deleted Successfully' };
  } catch (error) {
    console.error("Error during question delete:", error);
    return { status: 0, error: error.message || 'Unknown error' };
  }
};

exports.getQuestionsByUser = async (userId) => {
  try {
    const questions = await Question.findAll({
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['id', 'name', 'email'],
        where: { id: userId }
      },
      {
        model: Product,
        as: 'productId',
        attributes: ['id', 'product_name'],
      }
    ],
    });
    if (!questions) {
      return {status:404,error:'Question or User not found'}
    }
    return { status: 1,data:questions };
  } catch (error) {
    console.error("Error during get questions by user:", error);
    res.sendStatus(500);
  }
};