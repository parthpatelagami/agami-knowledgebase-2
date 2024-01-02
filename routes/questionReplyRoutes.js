const express = require('express');
const { getAllReplies , addQuestionReply, getReplyByQuestionId, getReplyByQuestionsId } = require('../controllers/QuestionReplyController')
const router = express.Router();

router.get('/question/replies/:id', getAllReplies);
router.post('/question/replies', addQuestionReply);
router.get('/question/reply/:id', getReplyByQuestionId)
router.get('/questions/replies/:id', getReplyByQuestionsId)

module.exports = router
