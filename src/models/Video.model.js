const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoTitle: {
        type: String
    },
    videoLength: {
        type: String
    },
    videoFile: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(common.VIDEO_MODULE_NAME, videoSchema);