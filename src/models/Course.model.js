const mongoose = require('mongoose');

const common = require('../common/constants');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {
        type: String,
        required: true
    },
    courseCondition: {
        type: Boolean
    },
    conditionExam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.EXAM_MODULE_NAME,
        required: false,
        default: null
    },
    courseDetails: {
        courseAuthor: {
            type: String,
            required: true
        },
        courseHour: {
            type: String,
            required: true
        },
        aboutcourse: {
            type: String,
            required: true
        }
    },
    courseinstructions: {
        type: [String],
        required: true
    },
    coursetarget: {
        type: [String],
        required: true
    },
    coursevideoes: [{
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.VIDEO_MODULE_NAME
        }
    }],
    courseExam: [{
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.EXAM_MODULE_NAME
        }
    }],
    courseActivities: [{
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.ACTIVITY_MODULE_NAME
        }
    }],
    courselibraries: [{
        libray: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.LIBRARY_MODULE_NAME
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(common.COURSE_MODULE_NAME, courseSchema);