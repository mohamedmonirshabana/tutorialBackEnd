const express = require('express');
const trackController = require('../controllers/track.controller');
const isauth = require('../middlewares/is-auth');
const isStudent = require('../middlewares/is-student');


const router = express.Router();

router.get('/', isauth, isStudent, trackController.GetallTrack);
router.get('/2d', isauth, isStudent, trackController.get2DTrack);
router.get('/3d', isauth, isStudent, trackController.get3DTrack);

router.get('/allfree', trackController.trackFree);

router.get('/details/:trackid', trackController.GetTrackDetails);

router.get('/usertrack', isauth, isStudent, trackController.getTrackForUser);


router.post('/enroll/:traclid', isauth, trackController.enrollTrack);

module.exports = router;