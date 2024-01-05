const express = require("express")
const {
    createNewQuestionsController, getAllQuestionsController, editQuestionsController, deleteQuestionsController, getQuestionByIdController, getQuestionsByUser,
    searchQuestion
} = require("../controllers/QuestionsController")

//router object
const router = express.Router()

router.post("/questions", createNewQuestionsController)
router.get("/questions", getAllQuestionsController)
router.put("/questions/:id", editQuestionsController)
router.delete("/questions/:id", deleteQuestionsController)
router.get("/questions/:id", getQuestionByIdController)
router.get("/users/questions", getQuestionsByUser)
router.post("/searchquestions", searchQuestion)

module.exports = router
