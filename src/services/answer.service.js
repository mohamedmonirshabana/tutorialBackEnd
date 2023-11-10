const questinAnswerModel = require('../models/Question.model');

exports.addAnswer = async (qid, title, image, degree, result) => {
    if (result == "true") {
        result = true;
    } else {
        result = false;
    }
    // console.log(result);
    const question = await questinAnswerModel.findById(qid);
    // console.log(question.videoRelated);
    if (question.videoRelated == undefined) {
        question.videoRelated = null;
    }
    const answers = question.questionAnswer;
    const ansResult = answers.filter(ans => {
        return ans.answerTitle == title;
    });
    if (ansResult.length > 0) {
        return false;
    } else {
        const Data = {
            answerTitle: title,
            answerResult: result,
            answerAttach: image,
            answerDegree: degree
        };
        question.questionAnswer.push(Data);
        return await question.save();
    }

};

exports.getAnswer = async (qid, ansid) => {
    const question = await questinAnswerModel.findById(qid);
    const answers = question.questionAnswer;
    const answerData = answers.filter(answer => {
        return answer._id == ansid;
    });
    return answerData;
};

exports.EditAnswer = async (qid, ansid, title, result, image, degree) => {

    const question = await questinAnswerModel.findById(qid);
    const answers = question.questionAnswer;
    let id;
    const answer = answers.filter((ans, idx, answers) => {
        if (ans._id == ansid) {
            id = idx;
            return ans;
        }
    });

    answers[id].answerTitle = title;
    answers[id].answerResult = result;
    answers[id].answerAttach = image;
    answers[id].answerDegree = degree;

    question.questionAnswer = answers;

    return await question.save();


};

exports.delete = async (qid, ansid) => {
    const question = await questinAnswerModel.findById(qid);
    let answers = question.questionAnswer;

    answers = answers.filter(answer => {
        return answer._id != ansid;
    });

    question.questionAnswer = answers;
    return await question.save();
};