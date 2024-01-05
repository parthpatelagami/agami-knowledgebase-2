const { INTEGER } = require('sequelize')
const dbconfig = require('../config/dbconfig/dbconfigmain')
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

async function getReplyByQuestionId(questionid, limitvalue, offsetvalue){
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

async function getReplyByQuestionsId(questionids, limit, offset, clickPageNo){
    const id = questionids.split(",");
    
    try{
        const dataObject = await Promise.all(id.map(async item =>{
            const data = await getReplyByQuestionId(item)
            return {
                question_Id:item,
                data:data
            }            
        }))
        const recordsPerPage = limit;
        const totalRecords = await getAllReplyCount(1)
        const pageNo = clickPageNo === null || clickPageNo === undefined ? 1 : clickPageNo;
        const noOfPages = Math.ceil(totalRecords * 1.0 / recordsPerPage);
        const start = (pageNo - 1)*recordsPerPage
        const end = (pageNo * recordsPerPage) > totalRecords ? totalRecords : (pageNo * recordsPerPage)
        const currentPage = offset == null || offset == undefined ? 0 : offset;
        
        let loopStart = 0;
        if (currentPage > 2) {
            if ((currentPage + 2) <= (noOfPages - 1)) {
                loopStart = (currentPage - 2);
            } else if ((noOfPages - 5) < 0) {
                loopStart = 0;
            } else {
                loopStart = (noOfPages - 5);
            }
        } else {
            loopStart = 0;
        }
        console.log("loopStart", loopStart);

        let loopEnd = 0;
        if (currentPage > 2) {
            if ((currentPage + 2) > (noOfPages - 1)) {
                loopEnd = (noOfPages - 1);
            } else {
                loopEnd = (currentPage + 2);
            }
        } else if ((noOfPages - 1) >= 4) {
            loopEnd = 4;
        } else {
            loopEnd = noOfPages - 1;
        }
        console.log("loopend", loopEnd); 
        console.log("No of Pages", noOfPages)
        console.log("Start:", start)
        console.log("End:", end)
        return({
            data:dataObject
        })
        
    }catch(error){
        console.error('Error:', error)
        throw error
    }
}


module.exports = { addQuestionReply , getAllReplyCount, getReplyByQuestionId, getReplyByQuestionsId}
