
const RepliesServies = require('../service/RepliesServies');


const addQuestionReply = async( req, res)=>{
    const replyData   = req.body
    try {
        const myReply = await RepliesServies.addQuestionReply(replyData)
        console.log("Reply: ", myReply)
        res.status(200).json({message: "Reply added Successfully", data: myReply})
    } catch (error) {
        console.error("Error during added Reply: ", error);
        res.sendStatus(500);
    }
}

const getAllReplyCount = async(req, res)=>{
    const questionId = req.params.id
    console.log("Id",questionId)
    try {
        const replies = await RepliesServies.getAllReplyCount(questionId)
        console.log("Replies: ". replies)
        res.status(200).json({message:"Getting All Replys Successfully", data: replies})
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
        res.sendStatus(400)
    }
}

const getReplyByQuestionId = async(req, res)=>{
    const questionId = req.params.id
    try {
        const replies = await RepliesServies.getReplyByQuestionId(questionId);
        //console.log("Replies In Controller",replies)
        res.status(200).json({message:"Successfully Get Replies.", data: replies})
    } catch (error) {
        console.log("Error in ReplyData: ", error)
        res.sendStatus(500)
    }
}

const getReplyByQuestionsId = async(req, res)=>{
    const questionid = req.params.id
    try {
        const replies = await RepliesServies.getReplyByQuestionsId(questionid);
        res.status(200).json({message:"Success", data: replies})
    } catch (error) {
        console.log(error);

    }
}


module.exports = { addQuestionReply , getAllReplyCount, getReplyByQuestionId, getReplyByQuestionsId}
