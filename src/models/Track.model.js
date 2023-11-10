const mongoose = require('mongoose');

const common = require('../common/constants');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    trackName: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        require: true
    },
    About_track: {
        type: String,
        required: true
    },
    Courses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: common.COURSE_MODULE_NAME
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(common.TRACK_MODULE_NAME, TrackSchema);

//common.COURSE_MODULE_NAME