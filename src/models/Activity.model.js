const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userD: [{
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.USER_MODULE_NAME,
            required: false,
            default: null
        },
        userFile: {
            type: String,
            required: false
        },
        ansDate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(common.ACTIVITY_MODULE_NAME, ActivitySchema);