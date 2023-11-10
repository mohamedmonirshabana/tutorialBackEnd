const ActivitiesService = require("../services/activities.service");

exports.userAddActive = async (req, res) => {
  const activeid = req.params.activeid;
  const userid = req.userid;
  const fileZip = req.file;
  let file = "";
  if (fileZip) {
    file =
      req.protocol +
      "://" +
      req.get("host") +
      "/compressed/" +
      fileZip.filename;
  }
  const result = await ActivitiesService.useranswer(activeid, userid, file);
  res.status(200).json(result);
};

exports.showUserActive = async (req, res) => {
  const activeid = req.params.activeid;
  const Data = await ActivitiesService.showUserForActive(activeid);
  res.status(200).json(Data);
};

exports.showActiveData = async (req, res) => {
  const active = req.params.actid;
  const Data = await ActivitiesService.showActiveDD(active);
  res.status(200).json(Data);
};

//Admin
exports.AddActive = async (req, res) => {
  const cid = req.params.cid;
  const title = req.body.title;
  const result = await ActivitiesService.add(title, cid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not Add",
    });
  }
};

exports.showAll = async (req, res) => {
  const Data = await ActivitiesService.showAllActive();
  if (Data) {
    res.status(200).json(Data);
  } else {
    res.status(400).json({
      msg: "not found",
    });
  }
};

exports.showDetail = async (req, res) => {
  const aid = req.params.aid;
  const result = await ActivitiesService.showActivityDetails(aid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not found",
    });
  }
};

exports.activeforCourse = async (req, res) => {
  const cid = req.params.cid;
  const result = await ActivitiesService.activitiesforCourse(cid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not found",
    });
  }
};

exports.Edit = async (req, res) => {
  const aid = req.params.aid;
  const title = req.body.title;
  const result = await ActivitiesService.EditActivity(aid, title);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not update",
    });
  }
};

exports.Delete = async (req, res) => {
  const aid = req.params.aid;
  const result = await ActivitiesService.deleteActivity(aid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      msg: "not delete",
    });
  }
};
