const express = require('express');
const { getAllReplies , addQuestionReply } = require('../controllers/QuestionReplyController')
const router = express.Router();

router.get('/question/replies/:id', getAllReplies);
router.post('/question/replies', addQuestionReply);

module.exports = router
