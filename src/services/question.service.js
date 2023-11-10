const QuestionModel = require('../models/Question.model');
const {
    AddQuestiontoExam,
    deleteQuestion,
    ExamQues
} = require('./exam.service');

exports.add = async (examid, title, attach, Qtype, Degree, video) => {
    if (video) {
        // console.log("not null");
        const question = new QuestionModel({
            questionTitle: title,
            questionAttach: attach,
            QuestionType: Qtype,
            questionDegree: Degree,
            videoRelated: video
        });
        const result = await question.save();

        const examresult = await AddQuestiontoExam(examid, result._id);
        if (examresult) {
            return result;
        } else {
            return false;
        }
    } else {
        // console.log("null");
        const question = new QuestionModel({
            questionTitle: title,
            questionAttach: attach,
            QuestionType: Qtype,
            questionDegree: Degree,
        });
        const result = await question.save();

        const examresult = await AddQuestiontoExam(examid, result._id);
        if (examresult) {
            return result;
        } else {
            return false;
        }
    }
    // const question = new QuestionModel({
    //     questionTitle: title,
    //     questionAttach: attach,
    //     QuestionType: Qtype,
    //     questionDegree: Degree,
    // });
    // const result = await question.save();

    // const examresult = await AddQuestiontoExam(examid, result._id);
    // if (examresult) {
    //     return result;
    // } else {
    //     return false;
    // }
}

exports.allquestion = async () => {
    return await QuestionModel.find();
};

exports.getOneQuestion = async (qid) => {
    const data = await QuestionModel.findOne({
        _id: qid
    });
    return data;
};

exports.EditQ = async (qid, title, attach, Qtype, Degree, video) => {
    if (video == "") {
        video = null;
    }
    const question = await QuestionModel.findById(qid);
    question.questionTitle = title;
    question.QuestionType = Qtype;
    question.questionDegree = Degree;
    question.videoRelated = video;
    question.questionAttach = attach;

    const result = await question.save();
    return result;
};

exports.Delete = async (qid) => {
    const qforEx = await deleteQuestion(qid);
    // show result
    const result = await QuestionModel.findByIdAndDelete(qid);
    if (qforEx || result) {
        return result;
    } else {
        return false
    }
};

exports.getquestionforExam = async (examid) => {
    const questions = await ExamQues(examid);
    const myData = [];
    for (let i = 0; i < questions.length; i++) {
        const QData = await QuestionModel.findById(questions[i]);
        const ansArr = []
        for (let r = 0; r < QData.questionAnswer.length; r++) {
            const ansOb = {
                ansTitle: QData.questionAnswer[r].answerTitle,
                result: QData.questionAnswer[r].answerResult,
                ansid: QData.questionAnswer[r]._id
            }
            ansArr.push(ansOb);
        }
        const obj = {
            id: QData._id,
            title: QData.questionTitle,
            type: QData.QuestionType,
            Degree: QData.questionDegree,
            answers: ansArr
        }
        myData.push(obj);
    }

    return myData;

};

exports.questionAnswers = async (quesid) => {
    const question = await QuestionModel.findById(quesid);
    return question.questionAnswer;
};