const courseModel = require('../models/Course.model');
const enrollModel = require('../models/enroll.model');
const videoModel = require('../models/Video.model');
const {
    addCourse,
    RemoveCourse,
    TrackCourse
} = require('./track.service');

const common = require('../common/constants');




exports.addVideoCourse = async (courseid, videoid) => {
    const course = await courseModel.findById(courseid);
    const videoData = course.coursevideoes;
    const test = videoData.filter(video => {
        return video.video == videoid
    });
    if (test.length > 0) {
        return false;
    } else {
        const TotalCoursHour = course.courseDetails.courseHour;

        const videoData = await videoModel.findById(videoid);
        const videoTime = videoData.videoLength;
        const times = [TotalCoursHour, videoTime];
        //collect Time
        const totalSeconds = times.reduce((total, time) => total + timeToSeconds(time), 0);
        const totalTime = secondsToTime(totalSeconds);

        //-----------
        course.coursevideoes.push({
            video: videoid
        });
        course.courseDetails = totalTime;
        await course.save();
        return course;
    }

};

function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(":");
    return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seonds);
};

function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remSecond = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remSecond.toString().padStart(2, '0')}`;
};


exports.addLibraries = async (courseid, libraryid) => {
    const courseData = await courseModel.findById(courseid);
    const libraries = courseData.courselibraries;
    const test = libraries.filter(library => {
        return library.libray == libraryid
    });
    if (test.length > 0) {
        return false;
    } else {
        courseData.courselibraries.push({
            libray: libraryid
        });
        return await courseData.save();
    }
};



exports.getCourseforStudent = async (courseid, studentid, trackid) => {
    const ensureData = await enrollModel.findOne({
        $and: [{
                user: studentid
            },
            {
                track: trackid
            }
        ]
    });
    const courses = ensureData.course;
    const result = courses.filter(cour => {
        return cour.course == courseid;
    });
    if (result.length > 0) {
        const res = result[0].state;
        if (res) {
            const cours = await courseModel
                .findById(result[0].course)
                .populate(common.VIDEO_MODULE_NAME)
                .populate(common.ACTIVITY_MODULE_NAME)
                .populate(common.LIBRARY_MODULE_NAME);
            return course;
        } else {
            const cours = await courseModel.findById(result[0].course);
            return {
                msg: "you not Allow to see this Course",
                courseName: cours.coursename,
                courseDetails: cours.courseDetails,
                instruction: cours.courseinstructions,
                target: cours.coursetarget
            }
        }


    } else {
        return {
            msg: "you are not join to this course"
        };
    }
}

exports.getCourseGeneral = async (courseid) => {
    const courseData = await courseModel.findById(courseid).populate(common.VIDEO_MODULE_NAME);
    if (courseData) {
        const VideoData = courseData.coursevideoes;
        const videoArr = [];
        VideoData.map(async vid => {
            const videoD = await videoModel.findById(vid.video);
            const videoOBj = {
                title: videoD.videoTitle,
                Length: videoD.videoLength
            };
            videoArr.push(videoOBj);
        });
        return {
            msg: "you not Allow to see this Course",
            courseName: courseData.coursename,
            courseDetails: courseData.courseDetails,
            instruction: courseData.courseinstructions,
            target: courseData.coursetarget,
            videos: videoArr
        };
    }
};




exports.removeVideo = async (courseid, videoid) => {
    const course = await courseModel.findById(courseid);
    const videoAr = course.coursevideoes;

    const newvideoAr = videoAr.filter(v => {
        return v.video != videoid;
    });

    course.coursevideoes = newvideoAr;
    return await course.save();
};

exports.getCourseDetails = async (cid) => {
    const cour = await courseModel.findById(cid);
    if (cour) {
        return cour;
    }
    return false;
};

//Admin
exports.showAllcourses = async () => {
    return await courseModel.find();
};

exports.add = async (trackid, cname, condition, condExam, Author, abutcourse, instruction, target) => {
    let examidcon = null;
    if (condition) {
        examidcon = condExam;
    }
    const courseData = new courseModel({
        coursename: cname,
        courseCondition: condition,
        conditionExam: examidcon,
        courseDetails: {
            courseAuthor: Author,
            courseHour: "0:0:0",
            aboutcourse: abutcourse
        },
        courseinstructions: instruction,
        coursetarget: target,
        coursevideoes: [],
        courseActivities: [],
        courselibraries: []
    });
    const result = await courseData.save();
    const check = await addCourse(trackid, result._id);
    if (check) {
        return result;
    } else {
        return false;
    }
};

exports.editCourseData = async (courseid, coursename, condition, exam, Author, aboutcourse, instruction, target) => {
    let exm = null;
    if (condition) {
        exm = exam;
    }
    const courseData = await courseModel.findById(courseid);
    courseData.coursename = coursename;
    courseData.courseCondition = condition;
    courseData.conditionExam = exm;
    courseData.courseDetails.courseAuthor = Author;
    courseData.courseDetails.aboutcourse = aboutcourse;
    courseData.courseinstructions = instruction;
    courseData.coursetarget = target;
    return await courseData.save()
};

exports.showCourseData = async (cid) => {
    const course = await courseModel.findById(cid);
    return course;
}

exports.delete = async (cid) => {
    const trackres = await RemoveCourse(cid);
    const result = await courseModel.findByIdAndDelete(cid);
    if (trackres || result) {
        return result;
    }
    return false;
};

exports.addVideotoCourse = async (cid, vid, lengthTime) => {
    const courseData = await courseModel.findById(cid);
    const cours = courseData.coursevideoes;
    const check = cours.filter(cor => {
        return cor.video == vid;
    });
    if (check.length > 0) {
        return false;
    } else {
        courseData.coursevideoes.push({
            video: vid
        });
        const courseTimes = courseData.courseDetails.courseHour;
        const [hours, minutes, seconds] = courseTimes.split(":");
        const CourseSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
        const total = CourseSeconds + lengthTime;
        const Thours = Math.floor(total / 3600);
        const Tminutes = Math.floor((total % 3600) / 60);
        const Tseconds = Math.floor(total % 60);
        const totalTime = `${Thours}:${Tminutes}:${Tseconds}`;
        courseData.courseDetails.courseHour = totalTime;
        return await courseData.save();
    }
};

exports.getVideoArr = async (cid) => {
    const courseVideo = await courseModel.findById(cid);
    const Ar = [];
    const data = courseVideo.coursevideoes;
    data.map(A => {
        Ar.push(A.video);
    });

    return Ar;
};

exports.addActivities = async (courseid, activityid) => {
    const courseData = await courseModel.findById(courseid);
    const courseActivities = courseData.courseActivities;
    const test = courseActivities.filter(active => {
        return active.activity == activityid;
    });

    if (test.length > 0) {
        return false;
    } else {
        courseData.courseActivities.push({
            activity: activityid
        });
        return await courseData.save();
    }
};

exports.getactivefromCourse = async (cid) => {
    const courseactivities = await courseModel.findById(cid);
    const Arr = [];
    const data = courseactivities.courseActivities;
    data.map(A => {
        Arr.push(A.activity);
    });
    return Arr;
};

exports.addLibraryData = async (cid, lid) => {
    const course = await courseModel.findById(cid);
    const libraries = course.courselibraries;
    const data = libraries.filter(cour => {
        return cour.libray == lid;
    });
    if (data.length > 0) {
        return false;
    } else {
        course.courselibraries.push({
            libray: lid
        });
        return await course.save();
    }
};

exports.getLibraries = async (cid) => {
    const course = await courseModel.findById(cid);
    const Arr = [];
    const data = course.courselibraries;
    data.map(A => {
        Arr.push(A.libray);
    });
    return Arr;
};

//Delete Exam from xam Service
exports.DeleteExamFromCourse = async (exid) => {
    const examinCourse = await courseModel.find({
        "courseExam.exam": {
            $in: [exid]
        }
    }).exec();
    if (examinCourse) {
        const delexam = await courseModel.updateMany({
            "courseExam.exam": {
                $in: [exid]
            }
        }, {
            $pull: {
                courseExam: {
                    exam: exid
                }
            }
        });

        return delexam;
    }

    return false;
};

//Delete Video From Course
exports.DeleteVideoFromCourse = async (vid) => {
    const videoExist = await courseModel.find({
        "coursevideoes.video": {
            $in: [vid]
        }
    }).exec();

    if (videoExist) {
        const remVideo = await courseModel.updateMany({
            "coursevideoes.video": {
                $in: [vid]
            }
        }, {
            $pull: {
                coursevideoes: {
                    video: vid
                }
            }
        }).exec();
        return remVideo;
    }
    return false;
};

//Delete Activity 
exports.DeleteActivity = async (AcId) => {
    const Act = await courseModel.find({
        "courseActivities.activity": {
            $in: [AcId]
        }
    }).exec();
    if (Act) {
        const rmActivity = await courseModel.updateMany({
            "courseActivities.activity": {
                $in: [AcId]
            }
        }, {
            $pull: {
                courseActivities: {
                    activity: AcId
                }
            }
        }).exec();

        return rmActivity;
    }
    return false;
};

exports.removeLibrary = async (Libid) => {
    const libraryEx = await courseModel.find({
        "courselibraries.library": {
            $in: [Libid]
        }
    }).exec();
    if (libraryEx) {
        const remove = await courseModel.updateMany({
            "courselibraries.library": {
                $in: [Libid]
            }
        }, {
            $pull: {
                courselibraries: {
                    library: Libid
                }
            }
        }).exec();
        return remove;
    }
    return false;
};

exports.CourseforTrack = async (tid) => {
    const coursesID = await TrackCourse(tid);
    const Arr = [];
    for (let i = 0; i < coursesID.length; i++) {
        const myData = await courseModel.findById(coursesID[i]);
        const CourDate = new Date(myData.createdAt);
        const year = CourDate.getFullYear();
        const month = CourDate.getMonth();
        const d = CourDate.getDate();
        const obj = {
            id: myData._id,
            name: myData.coursename,
            Hour: myData.courseDetails.courseHour,
            videoes: myData.coursevideoes.length,
            CreateDate: `${year}-${month}-${d}`
        }
        Arr.push(obj);
    }

    return Arr;
};