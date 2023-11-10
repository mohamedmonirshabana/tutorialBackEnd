const {
    now
} = require('mongoose');
const PreExam = require('../models/preExam.model');
const userPreExam = require('../models/userPreExam.model');

exports.ShowExam = async () => {
    const preEx = await PreExam.find().limit(10).exec();
    res.status(200).json({
        exam: preEx
    });
};

exports.collectPreExam = async (userId, examobject, examId) => {
    const userID = userId;
    let gdegree = 0;
    const questAnswerList = [];
    examobject.forEach(async exam => {
        const QuestionID = exam.questionId;
        const answerId = exam.answerId;
        const degree = await getQuesionDegree(QuestionID);
        const result = await questionCollect(QuestionID, answerId);
        if (result) {
            gdegree += +degree;
            //get Degree from Document
        }
        const qnswerObject = {
            question: QuestionID,
            answer: answerId
        }
        questAnswerList.push(qnswerObject);
    })

    return await addtouserPreExam(userID, gdegree, questAnswerList, examId);


};

async function addtouserPreExam(userId, degree, answerList, examId) {
    const userData = new userPreExam({
        examId: examId,
        userId: userId,
        examDate: Date.now(),
        ExamDegree: degree,
        answers: answerList
    })

    return await userData.save();
}

async function questionCollect(questionId, answerId) {
    const question = await PreExam.findById(questionId);
    const answerData = question.answer.forEach(answer => {
        if (answer._id == answerId) {
            return answer.answerResult;
        }
    });
    // const answer = await question.answer.findById(answerId);
    // return answer.answerResult


}

async function getQuesionDegree(questionId) {
    const question = await PreExam.findById(questionId);
    return question.degree;
}

exports.storeExamData = async () => {};