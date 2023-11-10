const express = require('express');
const libraryController = require('../controllers/library.controller');
const isauth = require('../middlewares/is-auth');


const router = express.Router();


router.get('/:libid', isauth, libraryController.showLibrary);

module.exports = router;