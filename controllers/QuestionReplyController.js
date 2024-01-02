
const { addQuestionReplyInServies, getAllRepliesInServies } = require('../service/RepliesServies');


const addQuestionReply = async( req, res)=>{
    const replyData   = req.body
    try {
        const myReply = await addQuestionReplyInServies(replyData)
        console.log("Reply: ", myReply)
        res.status(200).json({message: "Reply added Successfully", data: myReply})
    } catch (error) {
        console.error("Error during added Reply: ", error);
        res.sendStatus(500);
    }
}

const getAllReplies = async(req, res)=>{
    const questionId = req.params.id
    
    try {
        const replies = await getAllRepliesInServies(questionId)
        res.status(200).json({message:"Getting All Replys Successfully", data: replies})
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
        res.sendStatus(400)
    }
}


module.exports = { addQuestionReply , getAllReplies}
