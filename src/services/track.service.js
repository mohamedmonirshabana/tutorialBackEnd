const trackModel = require('../models/Track.model');
const courseModel = require('../models/Course.model');
const enrollModel = require('../models/enroll.model');
const common = require('../common/constants');

//show All Tack for all user

exports.getTrack2D = async () => {
    const trackData = await trackModel.find({
        tags: '2D'
    });
    return trackData;
};

exports.getTrack3D = async () => {
    const trackData = await trackModel.find({
        tags: '3D'
    });
    return trackData;
};

//show Details for One Track With Courses

//Add Track by Admin

//Add Course for Track



//Edit Track by Admin


exports.enrollTrack = async (trackid, userid) => {
    const studentresult = await enrollModel.findOne({
        $and: [{
            user: userid
        }, {
            track: trackid
        }]
    });
    console.log("user Data ", userid)
    console.log("Back enroll", studentresult);
    // const enrollData = await enrollModel.findOne({
    //     $and: [{
    //         user: userid
    //     }, {
    //         track: trackid
    //     }]
    // });
    // console.log(enrollData);
    // if (enrollData === null) {

    // console.log("if true", enrollData);
    const TrackData = await trackModel.findById(trackid);
    const trackCourses = TrackData.Courses;
    const courseArray = [];
    const createentroll = new enrollModel({
        user: userid,
        track: trackid,

    });
    const enrollData = await createentroll.save();
    for (let i = 0; i < trackCourses.length; i++) {
        const courseid = trackCourses[i].course;
        const coursDetails = await courseModel.findById(courseid);
        if (coursDetails.courseCondition) {
            const EN = {
                course: courseid,
                state: false
            };
            const Da = await enrollModel.findByIdAndUpdate(enrollData._id, {
                $push: {
                    course: [EN]
                }
            });
            // enrollD.state = false;
        } else {
            const EN = {
                course: courseid,
                state: true
            };
            const Da = await enrollModel.findByIdAndUpdate(enrollData._id, {
                $push: {
                    course: [EN]
                }
            });
            // enrollD.state = true;
        }

    }
    // trackCourses.map(async courseData => {
    //     // const enrollD = {
    //     //     course: courseid
    //     // };
    //     if (coursDetails.courseCondition) {
    //         const EN = {
    //             course: courseid,
    //             state: false
    //         };
    //         const Da = await enrollModel.findByIdAndUpdate(enrollData._id, {
    //             $push: {
    //                 course: [EN]
    //             }
    //         });
    //         // enrollD.state = false;
    //     } else {
    //         const EN = {
    //             course: courseid,
    //             state: true
    //         };
    //         const Da = await enrollModel.findByIdAndUpdate(enrollData._id, {
    //             $push: {
    //                 course: [EN]
    //             }
    //         });
    //         // enrollD.state = true;
    //     }

    //     // courseArray.push(enrollD);
    // });
    return enrollData._id;
    //------------------------------------
    // const createentroll = new enrollModel({
    //     user: userid,
    //     track: trackid,
    //     course: courseArray
    // });
    // return await createentroll.save();
    // }
    // console.log("if false", enrollData);
    // return false;
};

exports.getEnrollForUser = async (userid) => {
    const enrollServ = await enrollModel.find({
        user: userid
    });

    if (enrollServ) {
        return enrollServ;
    } else {
        return false;
    }

};

//--------------------------
//Admin

exports.allTrack = async () => {
    const Data = await trackModel.find();
    return Data;
};

exports.addTrack = async (trackname, abouttrack, tags) => {
    const track = new trackModel({
        trackName: trackname,
        tags: tags,
        About_track: abouttrack,
    });
    const result = await track.save();
    return result;
};

exports.trackDetails = async (trackid) => {
    const track = await trackModel.findById(trackid);
    return track;
};

exports.editTrack = async (trackid, trackname, aboutTrack) => {
    const track = await trackModel.findByIdAndUpdate(trackid, {
        trackName: trackname,
        About_track: aboutTrack
    });
    return track;

};

exports.deleteTrack = async (trackid) => {
    const track = await trackModel.findByIdAndDelete(trackid);
    return track;
};

exports.addCourse = async (trackid, courseId) => {
    // console.log(trackid);
    // console.log(courseId);
    const trackDocument = await trackModel.findById(trackid);
    if (trackDocument) {
        const myCourse = trackDocument.Courses;
        const check = myCourse.filter(cor => {
            return cor.course == courseId;
        });
        if (check.length > 0) {
            return false;
        }
        const courseData = {
            course: courseId
        };
        trackDocument.Courses.push(courseData);
        const result = await trackDocument.save();
        return result;
    }

};

exports.RemoveCourse = async (courId) => {
    const courIn = await trackModel.find({
        "Courses.course": {
            $in: [courId]
        }
    }).exec();
    if (courIn) {
        const delCour = await trackModel.updateMany({
            "Courses.course": {
                $in: [courId]
            }
        }, {
            $pull: {
                Courses: {
                    course: courId
                }
            }
        }).exec();
        return delCour;
    }
    return false;
};

exports.TrackCourse = async (tid) => {
    const data = await trackModel.findById(tid);
    const result = data.Courses;
    const Arr = [];
    for (let i = 0; i < result.length; i++) {
        Arr.push(result[i].course);
    }

    return Arr;

};

exports.freeTrack = async () => {
    return await trackModel.find();
};