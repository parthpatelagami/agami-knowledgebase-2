const express = require('express');
const { getAllReplyCount , addQuestionReply, getReplyByQuestionId, getReplyByQuestionsId } = require('../controllers/QuestionReplyController')
const router = express.Router();

router.get('/question/replycount/:id', getAllReplyCount);
router.post('/question/reply', addQuestionReply);
router.get('/question/reply/:id/:limit/:offset', getReplyByQuestionId)
router.get('/questions/reply/:id/:limit/:offset', getReplyByQuestionsId)

module.exports = router
