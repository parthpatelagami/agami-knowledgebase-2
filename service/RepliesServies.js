const { INTEGER } = require('sequelize')
const dbconfig = require('../config/dbconfig/dbconfigmain')
const { QuestionReply, User } = dbconfig.models


const addQuestionReplyInServies = async(req)=>{
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

const getAllRepliesInServies = async(id)=>{

    try {
        const replies = await QuestionReply.findAll({
            where: { 
                question_id: id,
                parent_question_reply_id: -1
            },
            include:[
            {
                model: User,
                as: "createdBy",
                attributes: ['id','name','created_date']
            }
            ]
        });
        // console.log("RE",replies);
        return replies;                   
    } catch (error) {
        console.log("Error during geting all Reply: ", error)
    }
   
}

async function getReplyByQuestionIdInServies(questionid){
    const id = questionid
    try{
        const mainreplies = await QuestionReply.findAll({
            where: { 
                question_id: id,
                parent_question_reply_id: -1
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
        
        const chieldreplies = await QuestionReply.findAll({
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

        // const questionReplyWisedata = mainreplies.map(item => {
        //     console.log("Item Data ID: ",item.id);
        //     // item2.parent_question_reply_id === item.id
        //     const chielddata = chieldreplies.filter(item2 => item2.parent_question_reply_id === item.id).map((chieldreply) => {
        //             console.log("Chield replis: ". chieldreply)
        //             return ({                       
        //                 reply: chieldreply.reply,
        //                 reply_by:chieldreply.createdBy,                       
        //                 updated_date: chieldreply.reply_date,
        //                 reply_id: chieldreply.id   
        //         })})
        //     return {
        //         ...item,
        //         chielddata: chielddata
        //     };
        // });

        const questionReplyWisedata = mainreplies.map(item => {
            const chielddata = chieldreplies
                .filter(item2 => item2.parent_question_reply_id === item.id)
                .map((chieldreply) => ({
                    reply: chieldreply.reply,
                    createdBy: {
                        id: chieldreply.createdBy.id,
                        name: chieldreply.createdBy.name,
                        created_date: chieldreply.createdBy.created_date
                    },
                    updated_date: chieldreply.reply_date,
                    id: chieldreply.id
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
                chield_data: chielddata
            };
        });

        console.log("Parent question reply: ", questionReplyWisedata)
        return questionReplyWisedata;
    }catch(error){
        console.error('Error:', error)
        throw error
    }
}

async function getReplyByQuestionsIdInServies(questionid){
    const id = Number(questionid)
    try{
        const mainreplies = await QuestionReply.findAll({
            where: { 
                question_id: id,
                parent_question_reply_id: -1
            },
            offset: 0, 
            limit: 5,
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
        
        const chieldreplies = await QuestionReply.findAll({
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

        const questionReplyWisedata = mainreplies.map(item => {
            const chielddata = chieldreplies
                .filter(item2 => item2.parent_question_reply_id === item.id)
                .map((chieldreply) => ({
                    reply: chieldreply.reply,
                    createdBy: {
                        id: chieldreply.createdBy.id,
                        name: chieldreply.createdBy.name,
                        created_date: chieldreply.createdBy.created_date
                    },
                    updated_date: chieldreply.reply_date,
                    id: chieldreply.id
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
                chield_data: chielddata
            };
        });

        console.log("Parent question reply: ", questionReplyWisedata)
        return ({
            question_id: id,
            data: questionReplyWisedata
        });
    }catch(error){
        console.error('Error:', error)
        throw error
    }
}

module.exports = { addQuestionReplyInServies , getAllRepliesInServies, getReplyByQuestionIdInServies, getReplyByQuestionsIdInServies}
