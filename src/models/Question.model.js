const mongoose = require('mongoose');
const questionName = require('../common/constants');
const common = require('../common/constants');
const Schema = mongoose.Schema;

const asnwerSchema = new Schema({
    answerTitle: {
        type: String
    },
    answerResult: {
        type: Boolean
    },
    answerAttach: {
        type: String
    },
    answerDegree: {
        type: Number,
        default: 0
    }
});

const questionSchema = new Schema({
    questionTitle: {
        type: String
    },
    questionAttach: {
        type: String,
        required: false
    },
    QuestionType: {
        type: String,
        default: 'single'
    },
    questionDegree: {
        type: Number,
        default: 1
    },
    videoRelated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.VIDEO_MODULE_NAME,
        required: false,
    },
    questionAnswer: [{
        type: asnwerSchema
    }]
});

module.exports = mongoose.model(questionName.QUESTION_MODULE_NAME, questionSchema);