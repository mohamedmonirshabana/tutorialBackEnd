const userService = require('../services/user.service');

exports.userFirstTime = async (req, res, next) => {
    const userId = req.userId;
    const firstTime = await userService.checkFirstTime(userId);
    res.status(200).json({
        firstTime: firstTime
    });
};

exports.userHome = async (req, res, next) => {
    const userId = req.userId;
    const userData = await userService.getUserData(userId);
    res.status(200).json({
        userData: userData
    });
};

exports.userExam = async (req, res, next) => {
    const userId = req.userId;
    const userExam = await userService.getUserExam(userId);
    res.status(200).json({
        exames: userExam
    });
};

//for Admin
exports.studentAll = async (req, res) => {
    const data = await userService.allStudent();
    if (data) {
        res.status(200).json(data);
    }
};

exports.studentDetails = async (req, res) => {
    const sid = req.params.sid;
    const data = await userService.studentData(sid);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: "not exist"
        });
    }
};