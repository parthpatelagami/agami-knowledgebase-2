const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Question,User,Product } = dbconfig.models;

exports.createNewQuestionsController = async (req, res) => {
    const { title, description, product_id, tag_id, visibility, company_id, modified_date, created_by, modified_by } = req.body;
  
    try {
      const newQuestion = await Question.create({
        title: title,
        description: description,
        product_id: product_id,
        tag_id: tag_id,
        visibility: visibility,
        company_id: company_id,
        modified_date: modified_date,
        created_by: created_by,
        modified_by: modified_by
      });
  
      res.status(201).json({ message: "Question registered successfully" });
    } catch (error) {
      console.error("Error during question registeration:", error);
      res.sendStatus(500);
    }
  };

  exports.getAllQuestionsController = async (req, res) => {

    try {

      const questions = await Question.findAll({
        include: [{
          model: User,
          as: 'createdBy',
          attributes: ['id', 'name', 'email'],
        }],
      })
      res.status(200).json({ data: questions });
    } catch (error) {
      console.error("Error during get all questions:", error);
      res.sendStatus(500);
    }
  };

  exports.getQuestionByIdController = async (req, res) => {
    try {
      const questionId = req.params.id;
      const question = await Question.findOne({ where: { id: questionId } });
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.status(200).json({ data:question });
    } catch (error) {
      console.error('Error during fetching question by ID:', error);
      res.sendStatus(500);
    }
  };

  exports.editQuestionsController = async (req, res) => {
   
    try {

      const { title, description, product_id, tag_id, visibility, company_id, modified_date, created_by, modified_by } = req.body;
      const questionId = req.params.id;
      const existingQuestion = await Question.findOne({ where: { id: questionId } });;

      if (!existingQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }

      existingQuestion.title = title;
      existingQuestion.description = description;
      existingQuestion.product_id = product_id;
      existingQuestion.tag_id = tag_id;
      existingQuestion.visibility = visibility;
      existingQuestion.company_id = company_id;
      existingQuestion.modified_date = modified_date;
      existingQuestion.modified_by = modified_by;

      await existingQuestion.save();
  
      res.status(201).json({ message: "Question updated successfully" });
    } catch (error) {
      console.error("Error during question update:", error);
      res.sendStatus(500);
    }
  };

  exports.deleteQuestionsController = async (req, res) => {
    try {
      const questionId = req.params.id;
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
      const questions = await Question.findAll({
        include: [{
          model: User,
          as: 'createdBy',
          attributes: ['id', 'name', 'email'],
          where: { id: 1 }
        },
        {
          model: Product,
          as: 'productId',
          attributes: ['id', 'product_name'],
        }
      ],
      });
      res.status(200).json({ data: questions });
    } catch (error) {
      console.error("Error during get questions by user:", error);
      res.sendStatus(500);
    }
  };
  