const dbconfig = require("../config/dbconfig/dbconfigmain");
const questionService = require("../service/QuestionsService")
const { Question,User,Product } = dbconfig.models;

exports.createNewQuestionsController = async (req, res) => {
  try {
    const {
      title,
      description,
      product_id,
      tag_id,
      visibility,
      company_id,
      modified_date,
      created_by,
      modified_by,
      companyId,
      userId
    } = req.body;
    const newQuestionJsonObject = {
      title,
      description,
      product_id,
      tag_id,
      visibility,
      company_id,
      modified_date,
      companyId,
      userId
    };
    const response = questionService.createNewQuestions(
      newQuestionJsonObject
    );
    if ((await response).status == 1) {
      res.status(201).json({ message: "Question registered successfully" });
    } else {
      console.error("Error during question registeration:");
      res.sendStatus(500);
    }
  } catch (error) {
    console.error("Error during question registeration:", error);
    res.sendStatus(500);
  }
};

  exports.getAllQuestionsController = async (req, res) => {

    try {
      const {
        companyId,
      } = req.body;
      const response = questionService.getAllQuestions(companyId);
      if((await response).status == 1) {
        res.status(200).json({ data: (await response).data });
      }
      else {
        console.error("Error during get all questions:", (await response).error);
        res.sendStatus(500);
      }
    } catch (error) {
      console.error("Error during question registeration:", error);
      res.sendStatus(500);
    }
  };

  exports.getQuestionByIdController = async (req, res) => {
    try {
      const questionId = req.params.id;
      const {
        companyId,
      } = req.body;
      const response = questionService.getQuestionById(questionId,companyId)
      if((await response).status == 1) {
        res.status(200).json({ data: (await response).data });
      }
      else if((await response).status == 400){
        console.error("Question not found...",);
        res.sendStatus(400);
      }
      else {
        console.error("Error during get questions:", (await response).error);
        res.sendStatus(500);
      }
    } catch (error) {
      console.error('Error during fetching question by ID:', error);
      res.sendStatus(500);
    }
  };

  exports.editQuestionsController = async (req, res) => {
  
      try {
        const {
          title,
          description,
          product_id,
          tag_id,
          visibility,
          company_id,
          modified_date,
          companyId,
          userId
        } = req.body;
        const editQuestionJsonObject = {
          title,
          description,
          product_id,
          tag_id,
          visibility,
          modified_date,
          companyId,
          userId,
        };
        const questionId = req.params.id; 
        const response = questionService.editQuestions(
          editQuestionJsonObject,questionId
        );
        if((await response).status == 400){
          console.error("Question not found...",);
          res.sendStatus(400);
        }
        else if ((await response).status == 1) {
          res.status(201).json({ message: "Question edited successfully" });
        } else {
          res.sendStatus(500);
        }
      } catch (error) {
        console.error("Error during question registeration:", error);
        res.sendStatus(500);
      }
  };

  exports.deleteQuestionsController = async (req, res) => {
    try {
      const questionId = req.params.id;
      const {
        companyId,
      } = req.body;
      const response = questionService.deleteQuestions(questionId,companyId);

      if((await response).status == 1) {
        res.status(200).json({ data: 'Question Deleted Successfully' });
      }
      else if((await response).status == 400){
        console.error("Question not found...",);
        res.sendStatus(400);
      }
      else {
        console.error("Error during get questions:", (await response).error);
        res.sendStatus(500);
      }
      const existingQuestion = await Question.findOne({ where: { id: questionId } });
  
      if (!existingQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      await existingQuestion.destroy();
  
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error during question deletion:', error);
      res.sendStatus(500);
    }
  };

  exports.getQuestionsByUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        companyId,
      } = req.body;
      const response = questionService.getQuestionsByUser(userId,companyId);
      if((await response).status == 1) {
        res.status(200).json({ data: (await response).data });
      }
      else if((await response).status == 404) {
        res.status(400).json({ data: 'User Not FOund' });
      }
      else {
        console.error("Error during get questions by user id", (await response).error);
        res.sendStatus(500);
      }
    } catch (error) {
      console.error("Error during get questions by user:", error);
      res.sendStatus(500);
    }
  };
  