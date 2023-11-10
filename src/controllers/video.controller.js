const videoService = require('../services/video.service');
const {
    getVideoDurationInSeconds
} = require('get-video-duration');
const fs = require('fs');
const path = require('path');
const VideoModel = require('../models/Video.model');




exports.deleteVideo = async (req, res) => {
    const videoid = req.params.id;
    const Data = await videoService.deleteVideo(videoid);
    res.status(200).json({
        msg: "video delete"
    });
};

//Admin
exports.getAll = async (req, res) => {
    const result = await videoService.All();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({
            msg: 'error'
        });
    }
};

exports.addVideo = async (req, res) => {
    const cid = req.params.cid;
    const title = req.body.title;
    const videofile = req.file;
    let file;
    if (videofile) {
        file = req.protocol + "://" + req.get("host") + "/videos/" + videofile.filename;
    }

    const fileR = videofile.filename;

    const filepath = path.resolve('src', 'videos', fileR);
    const duration = await getVideoDurationInSeconds(filepath);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    const videoTime = `${hours}:${minutes}:${seconds}`;
    const videoData = await videoService.addVideo(cid, title, videoTime, file, duration);
    if (videoData) {
        res.status(200).json(videoData);
    } else {
        res.status(400).json({
            msg: 'video not upload'
        });
    }
};

exports.Edit = async (req, res) => {
    const videoid = req.params.vid;
    const title = req.body.title;
    const videoFile = req.file;
    let file = null;
    if (videoFile) {
        file = req.protocol + "://" + req.get('host') + "/videos/" + videoFile.filename;
        const fileR = videoFile.filename;
        const filepath = path.resolve('src', 'videos', fileR);
        const duration = await getVideoDurationInSeconds(filepath);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        const videoTime = `${hours}:${minutes}:${seconds}`;
        const Data = await videoService.editVideo(videoid, title, videoTime, file);
        if (Data) {
            res.status(200).json(Data);
        }
    }
    const Data = await videoService.editVideo(videoid, title, null, null);
    res.status(200).json(Data);

};

exports.getbyCourse = async (req, res) => {
    const cid = req.params.cid;
    const data = await videoService.getvideobyCourseid(cid);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: 'not found'
        });
    }
};
exports.getvideobyid = async (req, res) => {
    const vid = req.params.vid;
    const data = await videoService.getvbyid(vid);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: 'not found'
        });
    }
};
exports.delevideo = async (req, res) => {
    const vid = req.params.vid;
    const data = await videoService.delete(vid);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({
            msg: 'not found'
        });
    }
};
//     return videoData;

exports.GetVideo = async (req, res) => {
    const vid = req.params.vid;
    const result = await videoService.Show(vid);
    const videofilepath = path.join(__dirname, "../videos", result);
    res.sendFile(videofilepath);

};