const { INTEGER } = require('sequelize')
const dbconfig = require('../config/dbconfig/dbconfigmain')
const { QuestionReply, User } = dbconfig.models


const addQuestionReply = async(req)=>{
    console.log("Request in servies: ", req)
    const { reply, question_id, parent_question_reply_id, reply_by, reply_date } = req
    try {
        const myReply = await QuestionReply.create({
            reply: reply,
            question_id: question_id,
            parent_question_reply_id: parent_question_reply_id,
            reply_by: reply_by,
            reply_date: reply_date,
            company_id: 1,
        })
        console.log("Response: ", myReply)
        return 1;        
    } catch (error) {
        console.error("Error during added Reply: ", error);
        return 0;
    }
    
}

const getAllReplyCount = async(id)=>{

    try {
        const replies = await QuestionReply.count({
            where:{                
                question_id: id,          
            },
        });
        console.log("Count: ", replies)
        return replies;                   
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
    }
   
}

async function getReplyByQuestionId(questionid){
    const id = questionid
    try{
        const mainReplies = await QuestionReply.findAll({
            where: { 
                question_id: id,
                parent_question_reply_id: null
            },
            order: [
               
                ['reply_date', 'DESC'],
            ],
            attributes: ['id','reply','reply_date', 'reply_by'],
            
            include:[
            {
                model: User,
                as: "createdBy",
                attributes: ['id','name','created_date']
            }
            ]
        });
        
        const childReplies = await QuestionReply.findAll({
            where: { 
                question_id: id
            },
            order: [
                ['reply_date', 'DESC'],
                ['id', 'DESC'],
            ],
            attributes: ['id','reply','reply_date', 'reply_by', 'parent_question_reply_id'],
            include:[
            {
                model: User,
                as: "createdBy",
                attributes: ['id','name','created_date']
            }
            ]
        });

        const questionReplyWisedata = mainReplies.map(item => {
            const childData = childReplies
                .filter(item2 => item2.parent_question_reply_id === item.id)
                .map((childReply) => ({
                    reply: childReply.reply,
                    createdBy: {
                        id: childReply.createdBy.id,
                        name: childReply.createdBy.name,
                        created_date: childReply.createdBy.created_date
                    },
                    updated_date: childReply.reply_date,
                    id: childReply.id
                }));

            return {
                id: item.id,
                reply: item.reply,
                question_id: item.question_id,
                parent_question_reply_id: item.parent_question_reply_id,
                createdBy: {
                    id: item.createdBy.id,
                    name: item.createdBy.name,
                    created_date: item.createdBy.created_date
                },
                reply_date: item.reply_date,
                company_id: item.company_id,
                child_data: childData
            };
        });

        return questionReplyWisedata;
    }catch(error){
        console.error('Error:', error)
        throw error
    }
}

async function getReplyByQuestionsId(questionids){
    const id = questionids.split(",")

    try{
        const dataObject = await Promise.all(id.map(async item =>{
            const data = await getReplyByQuestionId(item)
            return {
                question_Id:item,
                data:data
            }            
        }))

        return({
            data:dataObject
        })
        
    }catch(error){
        console.error('Error:', error)
        throw error
    }
}


module.exports = { addQuestionReply , getAllReplyCount, getReplyByQuestionId, getReplyByQuestionsId}
