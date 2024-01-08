const { INTEGER } = require('sequelize')
const dbconfig = require('../config/dbconfig/dbconfigmain')
const { log } = require('winston')
const { QuestionReply, User } = dbconfig.models


const addQuestionReply = async(req)=>{
    
    const { reply, question_id, parent_question_reply_id, reply_date, companyId, userId } = req
    try {
        const myReply = await QuestionReply.create({
            reply: reply,
            question_id: question_id,
            parent_question_reply_id: parent_question_reply_id,
            reply_by: userId,
            reply_date: reply_date,
            company_id: companyId,
        })
        
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
                parent_question_reply_id:null          
            },
        });
        console.log("Count: ", replies)
        return replies;                   
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
    }
   
}

async function getReplyByQuestionid(questionid, limitvalue, offsetvalue){
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
            offset:Number(offsetvalue),
            limit:Number(limitvalue),
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

async function getReplyByQuestionId(questionid, limitvalue, offsetvalue){
    
    let jArrFinalResponse=[];
    try{

        const arrQuestionMainReplyData = await QuestionReply.findAll({
            where: { 
                question_id: questionid,
                parent_question_reply_id: null
            },
            order: [
                ['reply_date', 'DESC'],
            ],
            attributes: ['id','reply','reply_date', 'reply_by'],
            offset:Number(offsetvalue),
            limit:Number(limitvalue),
            include:[
            {
                model: User,
                as: "createdBy",
                attributes: ['id','name','created_date']
            }
            ]
        });

        let arrQuestionReplyMasterIds = []
        arrQuestionMainReplyData.map(reply => arrQuestionReplyMasterIds.push(reply.id))
    
        const arrQuestionReplyData = await QuestionReply.findAll({
            where: { 
                question_id: questionid,
                parent_question_reply_id: arrQuestionReplyMasterIds,
            },
            order: [
                ['reply_date', 'DESC'],
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
        
        let arrMainQuestionReplyIds = [];
        let objChildReplyData = {};
        let objMainReplyData={};
        
        arrQuestionMainReplyData.map(({ id, reply, reply_date, createdBy }) => {
            const tempMainReplyData = {
                id,
                reply,
                reply_date,
                createdBy: {
                    id: createdBy.id,
                    name: createdBy.name,
                    created_date: createdBy.created_date,
                },
                child_data:[]
                
            };
          
            arrMainQuestionReplyIds.push(id);
            objMainReplyData[id] = tempMainReplyData;           
        });

        arrQuestionReplyData.map(({ id, reply, reply_date, parent_question_reply_id, createdBy }) => {
           
            const tempChildReplyData = {
                id,
                reply,
                reply_date,
                parent_question_reply_id,
                createdBy: {
                    id: createdBy.id,
                    name: createdBy.name,
                    created_date: createdBy.created_date,
                }
                
            };
                 
            objChildReplyData[id] = tempChildReplyData;            
        });

        Object.keys(objChildReplyData).forEach(childId => {
            const parentReplyId = objChildReplyData[childId].parent_question_reply_id;
            
            if (objMainReplyData[parentReplyId]) {                
                objMainReplyData[parentReplyId].child_data.push(objChildReplyData[childId]);
            }
        });

        Object.keys(objMainReplyData).map(replyId => {
            jArrFinalResponse.push(objMainReplyData[replyId]);
        });
        
        jArrFinalResponse.forEach(mainReply => {
            if (mainReply.child_data) {
                mainReply.child_data.reverse();
            }
        });
        
        return jArrFinalResponse.reverse();
        
        
    }catch(error){
        console.error('Error In getReplyByQuestionId():', error)
        throw error
    }
}

async function getReplyByQuestionsId(questionids, limit, offset){
    const id = questionids.split(",");
    
    try{
        const dataAllQuestions = await Promise.all(id.map(async item => {
            const data = await getReplyByQuestionId(item, limit, offset)
            console.log("Data", data);
            return { question_id: item, data: data}
        }))
       
        return({
            data:dataAllQuestions
        })
        
    }catch(error){
        console.error('Error In getReplyByQuestionsId():', error)
        throw error
    }
}


module.exports = { addQuestionReply , getAllReplyCount, getReplyByQuestionId, getReplyByQuestionsId}
