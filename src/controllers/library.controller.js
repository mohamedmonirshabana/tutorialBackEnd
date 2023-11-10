const libraryService = require('../services/library.service');

//Admin

exports.addLibrary = async (req, res) => {
    const cid = req.params.cid;
    const title = req.body.title;
    const url = req.body.url;
    const desc = req.body.desc;
    const libraryData = await libraryService.add(cid, title, url, desc);
    if (libraryData) {
        res.status(200).json(libraryData);
    } else {
        res.status(400).json({
            msg: 'not add'
        });
    }
};

exports.getAll = async (req, res) => {
    const result = await libraryService.showAll();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not found'
        });
    }
};

exports.showLibrary = async (req, res) => {
    const libid = req.params.libid;
    const result = await libraryService.showlibraryDetails(libid);
    // console.log("res", result);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not found'
        });
    }
};

exports.librariesforCourse = async (req, res) => {
    const cid = req.params.cid;
    const data = await libraryService.getLibraryforCourse(cid);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: "not found"
        });
    }
};

exports.Edit = async (req, res) => {
    const lid = req.params.lid;
    const title = req.body.title;
    const urllink = req.body.url;
    const desc = req.body.desc;
    const result = await libraryService.editLibrary(lid, title, urllink, desc);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not edit'
        });
    }
};

exports.Delete = async (req, res) => {
    const lid = req.params.lid;
    const result = await libraryService.deleteLibrary(lid);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'not delete'
        });
    }
};