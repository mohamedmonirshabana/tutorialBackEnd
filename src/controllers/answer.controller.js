const answerService = require('../services/answer.service');

exports.addAnswer = async (req, res) => {
    const qid = req.params.qid;
    const title = req.body.title;
    const image = req.file;
    const degree = req.body.degree;
    const result = req.body.result;

    let file = null;
    if (image) {
        file = req.protocol + "://" + req.get("host") + "/images/" + image.filename;
    }
    const data = await answerService.addAnswer(qid, title, file, degree, result);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: "not add"
        });
    }

};

exports.getAnswer = async (req, res) => {
    const qid = req.params.qid;
    const ansid = req.params.ansid;
    const result = await answerService.getAnswer(qid, ansid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: "error"
        });
    }
};

exports.edit_Answer = async (req, res) => {
    const qid = req.params.qid;
    const ansid = req.params.ansid;
    const anstitle = req.body.title;
    const result = req.body.result;
    const image = req.file;
    const degree = req.body.degree;

    let file = null;
    if (image) {
        file = req.protocol + "://" + req.get('host') + "/images/" + image.filename;
    }
    const data = await answerService.EditAnswer(qid, ansid, anstitle, result, file, degree);
    res.status(200).json(data);

};

exports.deleteAnswer = async (req, res) => {
    const qid = req.params.qid;
    const ansid = req.params.ansid;

    const result = await answerService.delete(qid, ansid);
    res.status(200).json(result);
};