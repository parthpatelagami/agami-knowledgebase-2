const dbconfig = require('../config/dbconfig/dbconfigmain')
const { QuestionReply, User } = dbconfig.models


const addQuestionReplyInServies = async(req)=>{
    console.log("Request in servies: ", req)
    const { reply, question_id, parent_question_reply_id, reply_by, company_id, reply_date } = req
    try {
        const myReply = await QuestionReply.create({
            reply: reply,
            question_id: question_id,
            parent_question_reply_id: parent_question_reply_id,
            reply_by: reply_by,
            reply_date: reply_date,
            company_id: company_id,
        })
        console.log("Response: ", myReply)
        return 1;        
    } catch (error) {
        console.error("Error during added Reply: ", error);
        return 0;
    }
    
}

const getAllRepliesInServies = async(id)=>{

    try {
        const replies = await QuestionReply.findAll({
            where: { reply_by: id },
            include:[
            {
                model: User,
                as: "createdBy",
                // attributes: ['name']
            }
            ]
        });
        return replies;                   
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
    }
   
}

module.exports = { addQuestionReplyInServies , getAllRepliesInServies}
