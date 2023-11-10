const mongoose = require('mongoose');
const examName = require('../common/constants');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    examname: {
        type: String,
        required: true
    },
    examDegree: {
        type: Number,
        default: 10
    },
    examsuccessPersent: {
        type: Number,
        default: 10
    },
    examQuestionCount: {
        type: Number,
        default: 10
    },
    active: {
        type: Boolean,
        default: true
    },
    examquestion: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            refs: examName.QUESTION_MODULE_NAME
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(examName.EXAM_MODULE_NAME, examSchema);