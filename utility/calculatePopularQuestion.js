const {getAllCompanyQuestionRepliesUpvotedCountData} = require("../service/QuestionsService");
const {insertUpdatePopularQuestions} = require("../service/PopularQuestionsService")
const logger = require("../config/logger/logger.config.js")

const MIN_REPLY_COUNT_FOR_POPULAR_QUESTION = 1;
const MIN_UPVOTES_COUNT_FOR_POPULAR_QUESTION = 1;

const calculatePopularQuestions = async () =>{
    logger.info("============================= Calculation Started For Popular Question==================================")
    try {
        const questionData = await getAllCompanyQuestionRepliesUpvotedCountData();
        var jsonObjectCompanyWiseQuestionData;
        let popularQuestionInsertUpdateArray = [];
        let popularQuestionObject;
        if(questionData!=undefined && questionData.status == 1) {
            jsonObjectCompanyWiseQuestionData = await getCompnayWisePopularQuestionData(questionData.data)
            if(jsonObjectCompanyWiseQuestionData!=undefined) {
                for (const jsonObjectCompanyQuestion in jsonObjectCompanyWiseQuestionData) {
                    if (jsonObjectCompanyWiseQuestionData.hasOwnProperty(jsonObjectCompanyQuestion)) {
                      for (const questionData of jsonObjectCompanyWiseQuestionData[jsonObjectCompanyQuestion]) { 
                        for (const key in questionData) {
                            if (questionData.hasOwnProperty(key)) {
                              const replyCount = questionData[key].reply_count;
                              const upvotesCount = questionData[key].upvotes_count;
                              popularQuestionObject = {question_id:key,no_of_reply:replyCount,no_of_upvotes:upvotesCount,company_id:jsonObjectCompanyQuestion}
                              popularQuestionInsertUpdateArray.push(popularQuestionObject)
                            }
                          }
                      }
                    }
                }
                insertUpdatePopularQuestions(popularQuestionInsertUpdateArray)
            }
        }
    }
    catch(error) {
        logger.error("Error in calculatePopularQuestions:", error.message);
    }

}

const getCompnayWisePopularQuestionData = async (questionData) =>{
    try {
        var jsonObjectCompanyWiseQuestionData = {};
        var questionArray;
        var question;
        var questionJsonObject;
        for(let i=0;i<questionData.length;i++) {
            question = questionData[i];
            if (question.company_id in jsonObjectCompanyWiseQuestionData) {
                questionArray = [...jsonObjectCompanyWiseQuestionData[question.company_id]]
                if(question.reply_count >=  MIN_REPLY_COUNT_FOR_POPULAR_QUESTION || question.upvotes_count >= MIN_UPVOTES_COUNT_FOR_POPULAR_QUESTION) {
                    questionJsonObject ={
                        [question.question_id]: { reply_count: question.reply_count, upvotes_count: question.upvotes_count },
                    };
                    questionArray.push(questionJsonObject)
                    jsonObjectCompanyWiseQuestionData[question.company_id] = questionArray;
                }
            }
            else {
                if(question.reply_count >=  MIN_REPLY_COUNT_FOR_POPULAR_QUESTION || question.upvotes_count >= MIN_UPVOTES_COUNT_FOR_POPULAR_QUESTION) {
                    questionJsonObject ={
                        [question.question_id]: { reply_count: question.reply_count, upvotes_count: question.upvotes_count },
                    };
                    jsonObjectCompanyWiseQuestionData[question.company_id] = [questionJsonObject];
                }
            }
        }
    }
    catch(error) {
        logger.error("Error in getCompnayWisePopularQuestionData:", error.message);
    }

    return jsonObjectCompanyWiseQuestionData;
}
module.exports = {
    calculatePopularQuestions
};
  