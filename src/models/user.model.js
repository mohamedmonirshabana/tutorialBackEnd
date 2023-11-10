const mongoose = require('mongoose');
const collection = require('../common/constants');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    reactiveCode: {
        type: String
    },
    role: {
        type: String
    },
    firstTime: {
        type: Boolean,
        default: true
    },
    preExam: [{
        exdate: {
            type: Date
        },
        exDegree: {
            type: Number
        }
    }],
    exames: [{
        examName: {
            type: String
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: collection.EXAM_MODULE_NAME,
            required: true
        },
        examDate: {
            type: Date
        },
        exameDegree: {
            type: Number
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(collection.USER_MODULE_NAME, userSchema);

//collection.EXAM_MODULE_NAME