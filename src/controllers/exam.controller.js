const examService = require('../services/exam.service');
const path = require('path');

exports.preExam2d = async (req, res) => {
    const Data = await examService.getPreExam2d();
    res.status(200).json(Data);
};

exports.preExam3d = async (req, res) => {
    const Data = await examService.getPreExam3D();
    res.status(200).json(Data);
};

exports.getExam = async (req, res) => {
    const examid = req.params.examid;

    const Data = await examService.getExam(examid);

    res.status(200).json(Data);
};

exports.showAnswer = async (req, res) => {
    const userID = req.userId;
    const examid = req.params.examid;
    const Data = req.body;

    const result = await examService.getStudentExam(userID, Data, examid);

    res.status(200).json(result);
};

exports.showExamDegree = async (req, res) => {
    const archiveid = req.params.archiveid;
    const result = await examService.getArchiveDegree(archiveid);
    res.status(200).json(result);
};

exports.showExamAnswer = async (req, res) => {
    const examID = req.params.examid;
    const result = await examService.showExamArchive(examID);
    const Re = JSON.stringify(result);
    res.status(200).json(Re);
};

exports.showstudentExamArchive = async (req, res) => {
    const userid = req.userId;
    const data = await examService.showArchiveforStudent(userid);
    const result = JSON.stringify(data);
    res.status(200).json(result);
};


exports.addQuestion = async (req, res) => {
    const examid = req.params.examid;
    const title = req.body.questiontitle;
    const image = req.body.file;
    const qType = req.body.questiontype;
    const degree = req.body.questionDegree;
    const video = req.body.videoRelated;
    try {
        let file = null;
        if (image) {
            file = req.protocol + "://" + req.get("host") + "/images/" + image.filename;
        }
        const result = await examService.createQuestion(examid, title, file, qType, degree, video);
        // console.log(result);
        res.status(200).json(result);
    } catch (err) {
        // console.log(err);
    }
};

exports.addAnswer = async (req, res) => {
    // console.log(req.body.result);
    const qid = req.params.qid;
    const title = req.body.title;
    const result = req.body.result;
    const image = req.file;
    const degree = req.body.degree;
    let file = "";
    if (image) {
        file = req.protocol + "://" + req.get("host") + "/images" + image.filename;
    }
    const Data = await examService.createAnswer(qid, title, result, file, degree);
    res.status(200).json(Data);
};



//Admin

exports.createExam = async (req, res) => {
    const examname = req.body.examName;
    const examDegree = +req.body.examDegree;
    const examSucessPersent = +req.body.examSucessPersent;
    const examQuestionCount = +req.body.examQuestionCount;
    const examData = {
        examname,
        examDegree,
        examSucessPersent,
        examQuestionCount
    };
    // const myResult = JSON.stringify(examData);
    const create = await examService.CreateExam(examData);
    if (create) {
        res.status(201).json(create);
    } else {
        res.status(400).json({
            msg: "exam not create"
        });
    }
};

exports.getAllExam = async (req, res) => {
    // console.log("in Controller");
    const data = await examService.showAllExam();
    res.status(200).json(data);
};

exports.getExamDetails = async (req, res) => {
    const exid = req.params.examid;
    // console.log(exid);
    const result = await examService.getExamforAdmin(exid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'error'
        });
    }
};

exports.ExamEdit = async (req, res) => {
    const examid = req.params.examid;
    const exname = req.body.examname;
    const Degree = req.body.examDegree;
    const sucesspersent = req.body.sucesspersent;
    const qcount = req.body.questioncount;
    const active = req.body.active;

    const result = await examService
        .editExam(examid, exname, Degree, sucesspersent, qcount, active);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: "not update"
        });
    }
};

exports.deletExam = async (req, res) => {
    const exid = req.params.examid;
    const result = await examService.delete(exid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'exam not Delete'
        });
    }
};

exports.activeExam = async (req, res) => {
    const exid = req.params.examid;
    // console.log(exid);
    const result = await examService.ActiveExam(exid);
    if (result) {
        res.status(200).json({
            result: "ok"
        });
    } else {
        res.status(400).json({
            result: "not exist"
        });
    }
};

exports.deActiveExam = async (req, res) => {
    const exid = req.params.examid;
    const result = await examService.DeactiveExam(exid);
    if (result) {
        res.status(200).json({
            result: "ok"
        });
    } else {
        res.status(400).json({
            result: "not exist"
        });
    }

};