const User = require('../models/user.model');

exports.checkFirstTime = async (userid) => {
    const userData = await User.findById(userid);
    const firstTimeResult = userData.firstTime;
    return firstTimeResult;
};

exports.getUserData = async (userid) => {
    return await User.findById(userid);
};

exports.getUserExam = async (userid) => {
    const user = await User.findById(userid);
    return user.exames;
};

exports.allStudent = async () => {
    const result = await User.find({
        role: 'student'
    });
    return result;
};

exports.studentData = async (sid) => {
    const result = await User.findById(sid);
    return result;
};