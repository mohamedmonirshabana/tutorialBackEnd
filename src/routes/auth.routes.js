const express = require('express');

const Trace = require('../controllers/Trace.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgetpassword', authController.forgetPassword);
router.patch('/recoverpassword/:urcode', authController.renewPassword);

router.get("/create", Trace.index);

router.get("/addExam", Trace.Gen);

router.get("/addQuestions", Trace.addQuest);

router.get("/addQuestions3D", Trace.addQuestA);

module.exports = router;