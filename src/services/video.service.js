const videomodel = require('../models/Video.model');
const {
    addVideotoCourse,
    getVideoArr,
    DeleteVideoFromCourse
} = require('./courses.service');
const path = require('path');
const fs = require('fs');



exports.deleteVideo = async (videoid) => {
    const videoData = await videomodel.findById(videoid);

    const videoname = videoData.videoFile;


}

//Admin
exports.All = async () => {
    const result = await videomodel.find();
    return result;
};

exports.addVideo = async (cid, videoTitle, videoLength, videoFile, duration) => {
    const videoData = new videomodel({
        videoTitle: videoTitle,
        videoLength: videoLength,
        videoFile: videoFile
    });
    const video = await videoData.save();
    const check = await addVideotoCourse(cid, video._id, duration);
    if (check) {
        return video;
    } else {
        return false;
    }
};

exports.editVideo = async (vid, title, vLength, videofile) => {
    const video = await videomodel.findById(vid);
    if (video) {
        if (videofile != null) {
            removeVideoFile(video.videoFile);
            video.videoLength = vLength;
            video.videoFile = videofile;
        }
        video.videoTitle = title;
        return await video.save();
    }
    return false;
};

function removeVideoFile(videoname) {
    const filename = videoname.split('videos/')[1];
    // console.log(filename);
    const filepath = path.resolve('src', 'videos', filename);
    fs.unlink(filepath, (err => {
        if (err) console.log(err);
    }))
}

exports.getvideobyCourseid = async (cid) => {
    const Data = await getVideoArr(cid);
    let y;
    const Arr = [];
    for (i = 0; i < Data.length; i++) {
        y = await revideo(Data[i]);
        const ob = {
            title: y.videoTitle,
            url: y.videoFile,
            id: y._id
        };
        Arr.push(ob);
    }
    // console.log(Arr);
    return Arr;
};

exports.getvbyid = async (vid) => {
    const video = await videomodel.findById(vid);
    return video;
};

exports.delete = async (vid) => {
    const coursVideo = await DeleteVideoFromCourse(vid);

    const video = await videomodel.findById(vid);
    // console.log(video);
    const data = video.videoFile;
    // console.log(data);
    removeVideoFile(data);
    const vi = await videomodel.findByIdAndDelete(vid);
    if (coursVideo || vi) {
        return vi;
    }
    return false;
};

async function revideo(vid) {

    return await videomodel.findById(vid);

}

exports.Show = async (id) => {
    const video = await videomodel.findById(id);
    const videoname = video.videoFile.split("http://localhost:8000/videos/")[1];
    // console.log(video.videoFile);
    return videoname;
};