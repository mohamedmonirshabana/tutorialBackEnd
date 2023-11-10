const express = require('express');
const isauth = require('../middlewares/is-auth');
const isStudent = require('../middlewares/is-student');


const multerService = require('../utils/multer.service');
const upload = multerService("photos")
const examController = require('../controllers/exam.controller');


const router = express.Router();

router.get('/preexam2d', isauth, examController.preExam2d);
router.get('/preexam3d', isauth, examController.preExam3d);
router.get('/:examid', isauth, isStudent, examController.getExam);
router.post('/examresult/:examid', isauth, isStudent, examController.showAnswer);
router.get('/showresult/:archiveid', isauth, isStudent, examController.showExamDegree);
router.get('/history', isauth, isStudent, examController.showstudentExamArchive);


module.exports = router;