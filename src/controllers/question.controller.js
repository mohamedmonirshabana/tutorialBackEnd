const questionService = require('../services/question.service');
// const multipart = require('multipart');

exports.AddQuestion = async (req, res) => {
    console.log("enter to control");
    // const multipartReader = multipart.createMultipartStream(req.body);
    // console.log(multipartReader);
    const examid = req.params.examid;
    const title = req.body.title;
    const image = req.file;
    const Qtype = req.body.type;
    const degree = req.body.degree;
    let videoid = req.body.video;
    // console.log(videoid);
    if (videoid == null || videoid == "null") {
        videoid = null;
    }
    // console.log("video  null");
    let file = null;
    if (image) {
        file = req.protocol + "://" + req.get('host') + "/images/" + image.filename;
    }

    const result = await questionService.add(examid, title, file, Qtype, degree, videoid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'question'
        });
    }
    // } else {
    //     // console.log("video not null");
    //     let file = null;
    //     if (image) {
    //         file = req.protocol + "://" + req.get('host') + "/images/" + image.filename;
    //     }

    //     const result = await questionService.add(examid, title, file, Qtype, degree, videoid);
    //     if (result) {
    //         res.status(200).json(result);
    //     } else {
    //         res.status(400).json({
    //             msg: 'question'
    //         });
    //     }
    // }

};

exports.getAll = async (req, res) => {
    const result = await questionService.allquestion();
    res.status(200).json(result);
}

exports.getQuestion = async (req, res) => {
    const id = req.params.id;
    const result = await questionService.getOneQuestion(id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: "not exist"
        });
    }
};

exports.editQuestion = async (req, res) => {
    const qid = req.params.id;
    const title = req.body.title;
    const image = req.file;
    const Qtype = req.body.type;
    const degree = req.body.degree;
    const videoid = req.body.video;

    let file = null;
    if (image) {
        file = req.protocol + "://" + req.get('host') + "/images/" + image.filename;
    }
    const result = await questionService.EditQ(qid, title, file, Qtype, degree, videoid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not edit'
        });
    }
};

exports.deleteQuestion = async (req, res) => {
    const qid = req.params.id;
    const result = await questionService.Delete(qid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not Delete'
        });
    }
};

exports.getExamQuestion = async (req, res) => {
    const examid = req.params.examid;
    const result = await questionService.getquestionforExam(examid);
    res.status(200).json(result);
};

exports.getAnswersforQuestion = async (req, res) => {
    const questionid = req.params.quesid;
    const Data = await questionService.questionAnswers(questionid);
    res.status(200).json(Data);
};