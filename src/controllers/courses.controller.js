const courseService = require("../services/courses.service");

exports.addVideo = async (req, res) => {
  const courseid = req.params.courseid;
  const vieoid = req.body.videoid;
  const result = await courseService.addVideoCourse(courseid, videoid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "video is Exist on Course",
    });
  }
};

exports.addActivity = async (req, res) => {
  const courseid = req.params.courseid;
  const activityid = req.body.activityid;
  const result = await courseService.addActivities(courseid, activityid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "activity is exist",
    });
  }
};

exports.addLibrary = async (req, res) => {
  const courseid = req.params.courseid;
  const library = req.body.libraryid;
  const result = await courseService.addLibraries(courseid, library);
  if (result) {
    res.status(200).json(res);
  } else {
    res.status(400).json({
      msg: "library is Exist",
    });
  }
};

exports.getStudentCourse = async (req, res) => {
  const studentid = req.userId;
  const courseid = req.body.courseid;
  const track = req.body.trackId;
  const result = await courseService.getCourseforStudent(
    courseid,
    studentid,
    track
  );
  res.status(200).json(result);
};

exports.removeVideofromCourse = async (req, res) => {
  const courseid = req.params.courseid;
  const videoid = req.body.videoid;
  const result = await courseService.removeVideo(courseid, videoid);
  res.status(200).json(result);
};

exports.getCourById = async (req, res) => {
  const courID = req.params.courid;
  const result = await courseService.getCourseDetails(courID);
  // console.log(result);
  //   if (result) {
  res.status(200).json(result);
  //   }
  //   res.status(400).json({
  //     msg: "not found",
  //   });
};

//Admin
exports.showAllCours = async (req, res) => {
  const result = await courseService.showAllcourses();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not Found",
    });
  }
};

exports.addCourse = async (req, res) => {
  const trackid = req.params.tid;

  const coursename = req.body.coursename;
  const condition = req.body.condition;
  const conExam = req.body.examid;

  const Author = req.body.Author;
  const aboutCourse = req.body.aboutCourse;
  const instruction = req.body.instruction;
  const target = req.body.target;
  const result = await courseService.add(
    trackid,
    coursename,
    condition,
    conExam,
    Author,
    aboutCourse,
    instruction,
    target
  );
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not add",
    });
  }
};

exports.edit = async (req, res) => {
  const courseid = req.params.cid;
  const coursename = req.body.coursename;
  const condition = req.body.consition;
  const exam = req.body.examid;
  const author = req.body.author;
  const aboutCourse = req.body.aboutCourse;
  const instruction = req.body.instruction;
  const target = req.body.target;
  const result = await courseService.editCourseData(
    courseid,
    coursename,
    condition,
    exam,
    author,
    aboutCourse,
    instruction,
    target
  );
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not edit",
    });
  }
};

exports.courseDetails = async (req, res) => {
  const courseid = req.params.cid;
  const result = await courseService.showCourseData(courseid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not found",
    });
  }
};

exports.courseDelete = async (req, res) => {
  const id = req.params.cid;
  const result = await courseService.delete(id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not Found",
    });
  }
};

exports.getCourseforTrack = async (req, res) => {
  const trackid = req.params.tid;

  const result = await courseService.CourseforTrack(trackid);
  res.status(200).json(result);
};