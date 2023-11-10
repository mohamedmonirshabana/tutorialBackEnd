const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const studetExamArchiveSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.USER_MODULE_NAME,
        required: true
    },
    examtitle: {
        type: String
    },
    ExamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.EXAM_MODULE_NAME,
        required: true
    },
    ExamDate: {
        type: Date,
        default: Date.now()
    },
    student_degree: {
        type: Number
    },
    Exam_all_degree: {
        type: Number
    },
    Exam_sucess_present: {
        type: Number
    },
    student_persnet: {
        type: Number
    },
    Question: [{
        QuestionTitle: String,
        QuestionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.QUESTION_MODULE_NAME,
            required: true
        },
        VideoRealated: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.VIDEO_MODULE_NAME,
            required: false,
            default: null
        },
        answers: [{
            AnswerTitle: String,
            answerId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            answerResult: Boolean
        }]
    }]

});

module.exports = mongoose.model(common.USEREXAMARCHIVE_MODULE_NAME, studetExamArchiveSchema);