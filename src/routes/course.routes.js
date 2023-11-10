const express = require('express');
const courseController = require('../controllers/courses.controller');
const isauth = require('../middlewares/is-auth');

const isStudent = require('../middlewares/is-student');
const router = express.Router();


router.get('/courses', isauth, isStudent, courseController.getStudentCourse);

router.get('/:courid', isauth, isStudent, courseController.getCourById);


module.exports = router;