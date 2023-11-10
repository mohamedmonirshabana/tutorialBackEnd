const activeModel = require("../models/Activity.model");
const {
  addActivities,
  getactivefromCourse,
  DeleteActivity,
} = require("./courses.service");
const common = require("../common/constants");

exports.useranswer = async (activeid, userid, file) => {
  const active = await activeModel.findById(activeid);
  const Data = {
    userid: userid,
    userFile: file,
    ansDate: Date.now(),
  };
  active.userD.push(Data);
  return await active.save();
};

exports.showUserForActive = async (activeid) => {
  return await activeModel
    .findById(activeid)
    .populate(common.USER_MODULE_NAME)
    .exec();
};

//Admin
exports.add = async (title, cid) => {
  const activeData = new activeModel({
    title: title,
    userD: [],
  });
  const result = await activeData.save();
  const Data = await addActivities(cid, result._id);
  if (Data) {
    return result;
  } else {
    return false;
  }
};

exports.showAllActive = async () => {
  return await activeModel.find();
};

exports.showActivityDetails = async (aid) => {
  const activity = await activeModel.findById(aid);
  if (activity) {
    return activity;
  } else {
    return false;
  }
};

exports.activitiesforCourse = async (cid) => {
  const Data = await getactivefromCourse(cid);
  let y;
  const Arr = [];
  for (i = 0; i < Data.length; i++) {
    y = await reActive(Data[i]);
    const ob = {
      title: y.title,
      id: y._id,
    };
    Arr.push(ob);
  }
  return Arr;
};

exports.EditActivity = async (aid, title) => {
  const Data = await activeModel.findByIdAndUpdate(aid, {
    title: title,
  });
  return Data;
};

exports.deleteActivity = async (aid) => {
  //ddele
  const delAct = await DeleteActivity(aid);

  const Data = await activeModel.findByIdAndDelete(aid);
  if (delAct || Data) {
    return Data;
  } else {
    return false;
  }
};

async function reActive(vid) {
  return await activeModel.findById(vid);
}

exports.showActiveDD = async (actid) => {
  return await activeModel.findById(actid);
};
