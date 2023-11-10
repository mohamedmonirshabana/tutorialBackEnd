const trackeService = require("../services/track.service");

exports.get2DTrack = async (req, res) => {
  // console.log("2D");
  const result = await trackeService.getTrack2D();
  res.status(200).json(result);
};

exports.get3DTrack = async (req, res) => {
  const result = await trackeService.getTrack3D();
  // console.log(result);
  res.status(200).json(result);
};

exports.PostTrack = async (req, res) => {
  const trackName = req.body.trackname;
  const abouttrack = req.body.abouttrack;
  const Data = await trackeService.addTrack(trackName, abouttrack);
  res.status(200).json(Data);
};

exports.addCoursetoTrack = async (req, res) => {
  const trackid = req.params.trackid;
  const courseid = req.body.courseid;

  const result = await trackeService.addCourse(trackid, courseid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "course is exist in Track",
    });
  }
};

exports.enrollTrack = async (req, res) => {
  const userid = req.userId;
  const trackid = req.params.traclid;
  const result = await trackeService.enrollTrack(trackid, userid);
  // if (result) {
  // console.log(result);
  res.status(200).json({
    message: "you enroll to Track",
  });
  // console.log(result);
  // } else {
  //     res.status(400).json({
  //         message: "you enroll to this Track",
  //     });
  // }
};

exports.getTrackForUser = async (req, res) => {
  const userid = req.userId;
  const result = await trackeService.getEnrollForUser(userid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "no enroll",
    });
  }
};

//Admin
exports.GetallTrack = async (req, res) => {
  const Data = await trackeService.allTrack();
  res.status(200).json(Data);
};

exports.addTrack = async (req, res) => {
  const trackname = req.body.trackname;
  const about = req.body.about;
  const tags = req.body.tags;
  const result = await trackeService.addTrack(trackname, about, tags);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not add",
    });
  }
};

exports.GetTrackDetails = async (req, res) => {
  const trackId = req.params.trackid;
  const Data = await trackeService.trackDetails(trackId);
  // console.log(Data);
  if (Data) {
    res.status(200).json(Data);
  } else {
    res.status(400).json({
      msg: "not Found",
    });
  }
};

exports.putTrack = async (req, res) => {
  const trackid = req.params.tid;
  const trackname = req.body.trackname;
  const abouttrack = req.body.about;
  // console.log(trackname);
  const Data = await trackeService.editTrack(trackid, trackname, abouttrack);
  if (Data) {
    res.status(200).json(Data);
  } else {
    res.status(400).json({
      msg: "not edit",
    });
  }
};

exports.deleteTrack = async (req, res) => {
  const trackid = req.params.tid;
  const result = await trackeService.deleteTrack(trackid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not delete",
    });
  }
};

exports.trackFree = async (req, res) => {
  const result = await trackeService.freeTrack();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not Found",
    });
  }
};
