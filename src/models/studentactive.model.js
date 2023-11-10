const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const studentActivitySchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.USER_MODULE_NAME,
        required: true
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: common.ACTIVITY_MODULE_NAME,
        required: true
    },
    result: {
        type: String
    },
    fileresult: {
        type: String
    }
});

module.exports = mongoose.model(common.USERACTIVITY_MODULE_NAME, studentActivitySchema);