const express = require('express');
const isauth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');

const userController = require('../controllers/user.controller');
const examController = require('../controllers/exam.controller');
const questionController = require('../controllers/question.controller');
const answerController = require('../controllers/answer.controller');
const trackController = require('../controllers/track.controller');
const courseController = require('../controllers/courses.controller');
const videoController = require('../controllers/video.controller');
const activitiesController = require('../controllers/activities.controller');
const librariesController = require('../controllers/library.controller');

const multerService = require('../utils/multer.service');
const upload = multerService('photos');
const videoMulter = require('../utils/video.multer.service');
const videoupload = videoMulter('videos');

const router = express.Router();

//student
router.get('/student/all', isauth, isAdmin, userController.studentAll);
router.get('/student/:sid', isauth, isAdmin, userController.studentDetails);

//exam
router.get('/exam/all', isauth, isAdmin, examController.getAllExam);
router.post('/exam/create', isauth, isAdmin, examController.createExam);
router.get('/exam/:examid', isauth, isAdmin, examController.getExamDetails);
router.patch('/exam/:examid', isauth, isAdmin, examController.ExamEdit);
//Add to Delete Exam From Course
router.delete('/exam/:examid', isauth, isAdmin, examController.deletExam); //add code i test it
router.patch('/exam/active/:examid', isauth, isAdmin, examController.activeExam);
router.patch('/exam/deactive/:examid', isauth, isAdmin, examController.deActiveExam);

//Question
router.post('/question/add/:examid', isauth, isAdmin, upload.single('imgattach'), questionController.AddQuestion);
router.get('/question/all', isauth, isAdmin, questionController.getAll);
router.get('/questions/:examid', isauth, isAdmin, questionController.getExamQuestion);
router.get('/question/answer/:quesid', isauth, isAdmin, questionController.getAnswersforQuestion);
router.get('/question/:id', isauth, isAdmin, questionController.getQuestion);
router.patch('/question/:id', isauth, isAdmin, upload.single('imgattach'), questionController.editQuestion);
//Add to Delete Question from Exam Service
router.delete('/question/:id', isauth, isAdmin, questionController.deleteQuestion); //Test and work

//answer
router.post('/answer/add/:qid', isauth, isAdmin, upload.single('imgattach'), answerController.addAnswer);
router.get('/answer/:qid/:ansid', isauth, isAdmin, answerController.getAnswer);
router.patch('/answer/edit/:qid/:ansid', isauth, isAdmin, upload.single('imgattach'), answerController.edit_Answer);
router.delete('/answer/:qid/:ansid', isauth, isAdmin, answerController.deleteAnswer); // it's work

//track
router.get('/track/all', isauth, isAdmin, trackController.GetallTrack);
router.post('/track/add', isauth, isAdmin, trackController.addTrack);
router.get('/track/:tid', isauth, isAdmin, trackController.GetTrackDetails);
router.patch('/track/:tid', isauth, isAdmin, trackController.putTrack);
router.delete('/track/:tid', isauth, isAdmin, trackController.deleteTrack);

//course
router.get('/course/all', isauth, isAdmin, courseController.showAllCours);
router.post('/course/add/:tid', isauth, isAdmin, courseController.addCourse);
router.get('/course/all/:tid', isauth, isAdmin, courseController.getCourseforTrack);
router.patch('/course/:cid', isauth, isAdmin, courseController.edit);
router.get('/course/details/:cid', isauth, isAdmin, courseController.courseDetails); //get CourseData
router.delete('/course/:cid', isauth, isAdmin, courseController.courseDelete); // it's work
// router.patch('/course/:cid/addvideo/:vid');
// router.patch('/course/:cid/addactivity/:aid');
router.patch('/course/:cid/addlibrary/:lid');

//video
router.get('/video/all', isauth, isAdmin, videoController.getAll);
router.post('/video/add/:cid', isauth, isAdmin, videoupload.single('videofile'), videoController.addVideo);
router.patch('/video/:vid', isauth, isAdmin, videoupload.single('videofile'), videoController.Edit);
router.get('/video/all/:cid', isauth, isAdmin, videoController.getbyCourse);

router.get('/video/show/:vid', videoController.GetVideo); //get Video File

router.get('/video/details/:vid', isauth, isAdmin, videoController.getvideobyid);
// router.patch('/video/:cid/:vid');
router.delete('/video/:vid', isauth, isAdmin, videoController.delevideo); // delete video from course

//activity
router.post('/activity/add/:cid', isauth, isAdmin, activitiesController.AddActive);
router.get('/activity/all', isauth, isAdmin, activitiesController.showAll);
router.get('/activity/all/:cid', isauth, isAdmin, activitiesController.activeforCourse);
router.get('/activity/:aid', isauth, isAdmin, activitiesController.showDetail);
router.patch('/activity/:aid', isauth, isAdmin, activitiesController.Edit);
router.delete('/activity/:aid', isauth, isAdmin, activitiesController.Delete); //Delet Activity from course


//library
router.post('/library/:cid', isauth, isAdmin, librariesController.addLibrary);
router.get('/library/all', isauth, isAdmin, librariesController.getAll);
router.get('/library/:lid', isauth, isAdmin, librariesController.showLibrary);
router.get('/library/all/:cid', isauth, isAdmin, librariesController.librariesforCourse);
router.patch('/library/:lid', isauth, isAdmin, librariesController.Edit);
router.delete('/library/:lid', isauth, isAdmin, librariesController.Delete); // Delete Library from Course


module.exports = router;