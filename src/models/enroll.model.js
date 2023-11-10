const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const enrollSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.USER_MODULE_NAME,
        required: true
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.TRACK_MODULE_NAME,
        required: true
    },
    course: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.COURSE_MODULE_NAME,
            required: false,
            default: null
        },
        state: {
            type: Boolean,
            requored: false
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(common.ENROLL_TRACK_USER_MODEL_NAME, enrollSchema);