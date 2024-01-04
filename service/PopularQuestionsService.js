const dbconfig = require("../config/dbconfig/dbconfigmain");
const { PopularQuestion } = dbconfig.models;

exports.insertUpdatePopularQuestions = async (popularQuestionsInsertUpdateData) => {
  try {
    let newPopularQuestion;
    let popularQuestionInsertQueries = [];
    let popularQuestionUpdateQueries = [];
    let questionId;
    let popularQuestion;
    let ifPopularQuestionExist;

    for (let i = 0; i < popularQuestionsInsertUpdateData.length; i++) {
      popularQuestion = popularQuestionsInsertUpdateData[i];
      questionId = popularQuestion.question_id;
      ifPopularQuestionExist = await checkExistingPopularQuestion(questionId)
      if (ifPopularQuestionExist) {
        popularQuestionUpdateQueries.push(popularQuestion);
      } else {
        newPopularQuestion = {
          question_id: popularQuestion.question_id,
          no_of_reply: popularQuestion.no_of_reply,
          no_of_upvotes: popularQuestion.no_of_upvotes,
          company_id: popularQuestion.company_id,
        };
        popularQuestionInsertQueries.push(newPopularQuestion);
      }

    //   if (existingPopularQuestion) {
    //     //Update Popular Question
    //     popularQuestionUpdateQueries.push(existingPopularQuestion);
    //   } else {
    //     // Insert Popular Question
    //     newPopularQuestion = {
    //       question_id: popularQuestion.question_id,
    //       no_of_reply: popularQuestion.no_of_replies,
    //       no_of_upvotes: popularQuestion.no_of_upvotes,
    //       company_id: popularQuestion.company_id,
    //     };
    //     popularQuestionInsertQueries.push(newPopularQuestion);
    //   }
    }
    await Promise.all(popularQuestionUpdateQueries.map(async (update) => {
        await PopularQuestion.update(
          {
            no_of_reply: update.no_of_reply,
            no_of_upvotes: update.no_of_upvotes,
          },
          {
            where: {
              question_id: update.question_id,
            },
          }
        );
      }));
     const newPopularQuestions = await PopularQuestion.bulkCreate(popularQuestionInsertQueries);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getAllPopularQuestionData = async () => {
    try {
        const popularQuestion = await PopularQuestion.findAll();
        return { status: 1, data: popularQuestion};
    } catch (error) {
        console.error("Error during get all questions:", error);
        return { status: 0, error: error.message || "Unknown error" };
    }
};
const checkExistingPopularQuestion = async (questionId) => {
    let existingPopularQuestions = await getAllPopularQuestionData();
    let questionIds = [];
    for (const popularQuestionData of existingPopularQuestions.data) {
        questionIds.push(popularQuestionData.dataValues.question_id)
    }

    if(questionIds.includes(questionId)) {
        return true;
    }
    else {
        return false;
    }
}