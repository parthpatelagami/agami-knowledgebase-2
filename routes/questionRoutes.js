const express = require("express");
const {
    createNewQuestionsController,getAllQuestionsController, editQuestionsController, deleteQuestionsController,getQuestionByIdController,getQuestionsByUser
} = require("../controllers/QuestionsController");

//router object
const router = express.Router();

router.post("/questions", createNewQuestionsController);
router.get("/questions",getAllQuestionsController);
router.put("/questions/:id",editQuestionsController);
router.delete("/questions/:id",deleteQuestionsController);
router.get("/questions/:id",getQuestionByIdController);
router.get("/questions/users/:id",getQuestionsByUser);

module.exports = router;
