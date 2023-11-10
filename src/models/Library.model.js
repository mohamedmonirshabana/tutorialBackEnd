const mongoose = require('mongoose');
const common = require('../common/constants');

const Schema = mongoose.Schema;

const librarySchema = new Schema({
    title: {
        type: String
    },
    urlLink: {
        type: String
    },
    linkDescription: {
        type: String
    }
});

module.exports = mongoose.model(common.LIBRARY_MODULE_NAME, librarySchema);