const express = require('express');
const userController = require('../controllers/user.controller');
const isauth = require('../middlewares/is-auth');
const isStudent = require('../middlewares/is-student');
const router = express.Router();

router.get('/getfirst', isauth, isStudent, userController.userFirstTime);
router.get('/home', isauth, isStudent, userController.userHome);
router.get('/userExam', isauth, isStudent, userController.userExam);

module.exports = router;