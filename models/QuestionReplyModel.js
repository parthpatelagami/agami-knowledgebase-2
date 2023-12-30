const { DataType } = require('sequelize');
const UserModel = require('./UserModel');
const QuestionModel = require('./QuestionModel');
const CompanyModel = require('./CompanyModel');


const QuestionReplyModel = (sequelize, Sequelize)=>{
    const QuestioReply = sequelize.define(
        "question_reply_mst",
        {            
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                },
            reply:{
                type: Sequelize.TEXT,
                allowNull: true,                
            },
            question_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model:"questions_mst",
                    key:"id"
                }
            },
            parent_question_reply_id:{
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            reply_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model:"user_mst",
                    key:"id"
                }
            },
            reply_date:{
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            company_id:{
                type: Sequelize.INTEGER,
                allowNull:false,
                references:{
                    model:"company_mst",
                    key:"id"
                }
            } 
            
        },
        {
            tableName: "question_reply_mst",
            timestamps: false,
        }
    );
    QuestioReply.belongsTo(UserModel(sequelize, Sequelize),{
        foreignKey: 'reply_by',
        as: 'createdBy',
    });

    QuestioReply.belongsTo(CompanyModel(sequelize, Sequelize),{
        foreignKey: 'company_id',
        as:'companyId'
    });

    QuestioReply.belongsTo(QuestionModel(sequelize, Sequelize),{
        foreignKey:"question_id",
        as:'questionId'
    });

    QuestioReply.createQuestionReply = async (questionReplyData) =>{
        return QuestioReply.create(questionReplyData);
    };

    return QuestioReply;

}

module.exports = QuestionReplyModel