// const Exam = require('../models/Exams.model');
// const ExamArchive = require('../models/studentExamArchive.model');
const QuestionModel = require('../models/Question.model');
const User = require('../models/user.model');
const Archive = require('../models/studentExamArchive.model');
const enrollModel = require('../models/enroll.model');
const common = require('../common/constants');
const ExamsModel = require('../models/Exams.model');
const CourseModel = require('../models/Course.model');
const TrackModel = require('../models/Track.model');

const {
    DeleteExamFromCourse
} = require('./courses.service');

exports.getPreExam2d = async () => {
    const preExam = await ExamsModel.findOne({
        $and: [{
            examname: 'preExam2D'
        }, {
            active: true
        }]
    });
    // return preExam;
    //get ExamQuestion Id
    const ExamId = preExam._id;
    const questionCount = +preExam.examQuestionCount;
    const examDegree = +preExam.examDegree;
    const examSucessPersent = +preExam.examsuccessPersent;
    const QuestionArr = await preExam.examquestion;
    const quesLength = +preExam.examquestion.length;

    const ExamOBj = {
        examID: ExamId,
        examName: preExam.examname,
        examQuestionCount: questionCount,
        Degree: examDegree,
        sucessPersent: examSucessPersent,
    };
    const myArr = [];
    for (let j = 0; j < quesLength; j++) {
        const questionid = QuestionArr[j].question;
        const Question = await QuestionModel.findById(questionid);
        const QOBj = {
            id: questionid,
            questiontitle: Question.questionTitle,
        };
        const ansT = [];
        const ansAr = Question.questionAnswer;
        for (let i = 0; i < ansAr.length; i++) {
            const ansObj = {
                title: ansAr[i].answerTitle,
                id: ansAr[i]._id
            };
            ansT.push(ansObj);
        }
        QOBj.answeres = ansT;
        myArr.push(QOBj);
    }
    ExamOBj.questions = myArr;
    const Data = JSON.stringify(ExamOBj);
    return ExamOBj;
};

exports.getPreExam3D = async () => {
    const preExam = await ExamsModel.findOne({
        $and: [{
            examname: 'preExam3D'
        }, {
            active: true
        }]
    });
    // return preExam;
    //get ExamQuestion Id
    const ExamId = preExam._id;
    const questionCount = +preExam.examQuestionCount;
    const examDegree = +preExam.examDegree;
    const examSucessPersent = +preExam.examsuccessPersent;
    const QuestionArr = await preExam.examquestion;
    const quesLength = +preExam.examquestion.length;

    const ExamOBj = {
        examID: ExamId,
        examName: preExam.examname,
        examQuestionCount: questionCount,
        Degree: examDegree,
        sucessPersent: examSucessPersent,
    };
    const myArr = [];
    for (let j = 0; j < quesLength; j++) {
        const questionid = QuestionArr[j].question;
        const Question = await QuestionModel.findById(questionid);
        const QOBj = {
            id: questionid,
            questiontitle: Question.questionTitle,
        };
        const ansT = [];
        const ansAr = Question.questionAnswer;
        for (let i = 0; i < ansAr.length; i++) {
            const ansObj = {
                title: ansAr[i].answerTitle,
                id: ansAr[i]._id
            };
            ansT.push(ansObj);
        }
        QOBj.answeres = ansT;
        myArr.push(QOBj);
    }
    ExamOBj.questions = myArr;
    const Data = JSON.stringify(ExamOBj);
    return ExamOBj;
};

exports.getExam = async (examId) => {
    const Exam = await ExamsModel.findOne({
        $and: [{
            _id: examId
        }, {
            active: true
        }]
    });
    const ExamId = Exam._id;
    const questionCount = +Exam.examQuestionCount;
    const examDegree = +Exam.examDegree;
    const examSucessPersent = +Exam.examsuccessPersent;
    const QuestionArr = await Exam.examquestion;
    const quesLength = +Exam.examquestion.length;

    const ExamOBj = {
        examID: ExamId,
        examName: Exam.examname,
        examQuestionCount: questionCount,
        Degree: examDegree,
        sucessPersent: examSucessPersent,
    };
    const myArr = [];
    for (let j = 0; j < quesLength; j++) {
        const questionid = QuestionArr[j].question;
        const Question = await QuestionModel.findById(questionid);
        const QOBj = {
            id: questionid,
            questiontitle: Question.questionTitle,
        };
        const ansT = [];
        const ansAr = Question.questionAnswer;
        for (let i = 0; i < ansAr.length; i++) {
            const ansObj = {
                title: ansAr[i].answerTitle,
                id: ansAr[i]._id
            };
            ansT.push(ansObj);
        }
        QOBj.answeres = ansT;
        myArr.push(QOBj);
    }
    ExamOBj.questions = myArr;
    const Data = JSON.stringify(ExamOBj);
    return ExamOBj;
    //-------------------------------------
    // const exam_Id = exam._id;
    // const examName = exam.examname;
    // const questionCount = exam.examQuestionCount;
    // const examDegree = +exam.examDegree;
    // const exampersent = exam.examsuccessPersent;
    // //show Question 
    // const examQuestionid = await ExamsModel.findById(exam_Id).populate(common.QUESTION_MODULE_NAME);
    // const QuestionArr = examQuestionid.examquestion;
    // let quesArr = [];
    // for (i = 0; i < questionCount; i++) {
    //     const lenindex = Math.floor(Math.random() * questionCount);
    //     const questionid = QuestionArr[lenindex]._id;
    //     if (quesArr.indexOf(questionid) === -1) {
    //         quesArr.push(questionid);
    //     }
    // }
    // const allQuestion = [];
    // quesArr.forEach(async question => {
    //     const myquestion = await QuestionModel.findById(question);
    //     const quesobj = {
    //         quesId: myquestion._id,
    //         questionTitle: myquestion.questionTitle,
    //         quesAttach: myquestion.questionAttach,
    //         questiontype: myquestion.QuestionType,
    //         questionDegree: myquestion.questionDegree,
    //         answers: myquestion.questionAnswer
    //     };
    //     allQuestion.push(quesobj);
    // });
    // quesArr = [];
    // const Questionhold = {
    //     examid: examId,
    //     examName: examName,
    //     questionCount: questionCount,
    //     examDegree: examDegree,
    //     sucessPersent: exampersent,
    //     questions: allQuestion
    // };

    // return Questionhold;

};

exports.getStudentExam = async (userId, Answers, examid) => {
    let degree = 0;
    const userExam = await ExamsModel.findById(examid);
    const examDegree = +userExam.examDegree;
    const sucessPersent = +userExam.examsuccessPersent;
    const questionCount = +userExam.examQuestionCount;
    const archiveData = new Archive({
        studentId: userId,
        examtitle: userExam.examname,
        ExamId: userExam._id,
        ExamDate: new Date(),
        student_degree: 0,
        Exam_all_degree: examDegree,
        Exam_sucess_present: sucessPersent,
        student_persnet: 0
    });
    const Arch = await archiveData.save();
    Answers.map(async itemes => {
        await itemes.map(async (item) => {
            const questionid = item.questionid;
            const answerid = item.answerid;
            const QuestionData = await QuestionModel.findById(questionid);
            const questionTitle = QuestionData.questionTitle;
            const questionDegree = QuestionData.questionDegree;
            const answerData = QuestionData.questionAnswer;
            // get Answer
            const AnswerData = await QuestionModel.find({
                "questionAnswer._id": answerid
            }, {
                "questionAnswer.$": 1,
                _id: 0
            });
            const answerTitle = AnswerData[0].questionAnswer[0].answerTitle;
            const answerResult = AnswerData[0].questionAnswer[0].answerResult;
            const answerDegree = +AnswerData[0].questionAnswer[0].answerDegree;
            const answerId = AnswerData[0].questionAnswer[0]._id;
            degree += answerDegree;
            // console.log("subDegree", degree);
            const ansArr = [];
            const Obj = {
                AnswerTitle: answerTitle,
                answerId: answerid,
                answerResult: answerResult
            };
            ansArr.push(Obj);
            const quesObject = {
                QuestionTitle: questionTitle,
                QuestionId: questionid,
                VideoRealated: null,
                answers: ansArr
            };
            const studentPers = (examDegree * degree) / 100;
            const UpArchive = await Archive.findByIdAndUpdate(Arch._id, {
                student_degree: degree,
                student_persnet: studentPers,
                $push: {
                    Question: {
                        $each: [quesObject]
                    }
                }

            });
            if (userExam.examname.includes("preExam")) {
                const myD = {
                    exdate: new Date(),
                    exDegree: degree
                }
                const userData = await User.findByIdAndUpdate(userId, {
                    firstTime: false,
                    preExam: [myD]
                });
            } else {
                const myD = {
                    examName: userExam.examname,
                    examId: userExam._id,
                    examDate: new Date(),
                    examDegree: degree
                };
                const userData = await user.findByIdAndUpdate(userId, {
                    exams: [myD]
                });
            }

        });

    });

    return archiveData._id;
};

exports.getArchiveDegree = async (archiveid) => {
    //get Exam Archive
    const ArchiveData = await Archive.findById(archiveid);
    const Data = {
        title: ArchiveData.examtitle,
        date: ArchiveData.ExamDate,
        examDegree: ArchiveData.Exam_all_degree,
        degree: ArchiveData.student_degree
    };
    return Data;
};


//Get Exam From Student and collect result 
exports.getStudentAnswers = async (userid, Data) => {
    let Degree = 0;
    const examid = Data.examid;

    const examData = await ExamsModel.findById(examid);
    const examDegree = examData.examDegree;
    const sucessPersent = examData.examsuccessPersent;
    const questiones = Data.questiones;


    //loock for part of json Array for questions
    const QArr = [];
    questiones.map(async question => {
        let QObj = {};
        const qid = question.questionid;
        const answers = question.answers;
        answers.map(async ans => {
            const ansid = ans.answerid;
            const QandA = await QuestionModel.findById(qid);
            QObj.QuestionTitle = QandA.questionTitle;
            QObj.QuestionId = qid;
            QObj.VideoRealated = QandA.videoRelated;
            const AnsArr = [];
            const Qanswers = QandA.questionAnswer;
            Qanswers.map(A => {
                const AnsOB = {};
                if (A._id == ansid) {
                    Degree += A.answerDegree;
                    const Ti = A.answerTitle;
                    const res = A.answerResult;
                    AnsOB.AnswerTitle = Ti;
                    AnsOB.answerId = ansid;
                    AnsOB.answerResult = res;
                    AnsArr.push(AnsOB);
                }
            });
            QObj.Question = AnsArr;
            QArr.push(QObj);
        })
    });
    const student_per = (Degree * examDegree) / 100;

    //start register in Archive
    const studentArchive = new Archive({
        studentid: userid,
        examtitle: examData.examname,
        ExamId: examid,
        ExamDate: Date.now(),
        student_degree: Degree,
        Exam_all_degree: examDegree,
        Exam_sucess_present: examData.examsuccessPersent,
        student_persnet: student_per,
        Question: QArr
    });
    const archiveData = await studentArchive.save();
    if (sucessPersent > 0) {

        if (archiveData.student_persnet >= archiveData.Exam_sucess_present) {
            const course = await CourseModel.findOne({
                "courseExam.exam": examid
            });
            const Track = await TrackModel.findOne({
                "Courses.course": course._id
            });
            const courseNext = await CourseModel.findOne({
                conditionExam: examid
            });
            const userenrol = await enrollModel.findOneAndUpdate({
                $and: [{
                        user: userid
                    },
                    {
                        track: Track._id
                    },
                    {
                        "course.course": courseNext._id
                    }
                ]
            }, {
                "course.state": true
            }).exec();
            return {
                course: false,
                target: courseNext._id,
                msg: `you sucess ${archiveData.student_persnet}`
            }
            //error 
            // const courseArr = await enrollModel.findOne({
            //     $and: [{
            //         user: userid
            //     }, {
            //         track: Track._id
            //     }]
            // });
            // let ind;
            // const myCourse = courseArr.course;
            // myCourse.forEach((cour, idx, myCourse) => {
            //     if (cour.course == courseNext._id) {
            //         ind = idx;
            //     }
            // });
            // const nextCourse = myCourse[ind + 1];


        } else {
            return {
                course: false,
                target: "Track",
                msg: `you must exam again ${archiveData.student_persnet}`
            }
        }
    } else {
        return {
            course: false,
            target: "Trackes",
            msg: "Choose your Track"
        }
    }

};



exports.showExamArchive = async (examid) => {
    const data = await Archive.findById(examid);
    return data;
}

exports.showArchiveforStudent = async (userid) => {
    const Data = await Archive.findOne({
        studentId: usserid
    });

    return Data;
};



exports.createQuestion = async (examId, questiontitle, questionimage, questiontype, questionDegree, videorelated) => {
    // console.log("hello");
    // console.log(questionimage);
    let questionid;
    if (questionimage != null) {
        // console.log("use if");
        const questionData = new QuestionModel({
            questionTitle: questiontitle,
            questionAttach: questionimage,
            QuestionType: questiontype,
            questionDegree: questionDegree,
            videoRelated: null
        });
        const question = await questionData.save();
        questionid = question._id;
    } else {
        const questionData = new QuestionModel({
            questionTitle: questiontitle,
            QuestionType: questiontype,
            questionDegree: questionDegree,
            videoRelated: null
        });
        const question = await questionData.save();
        questionid = question._id;
    }
    const exam = await ExamsModel.findById(examId);
    const data = {
        question: questionid
    };
    exam.examquestion.push(data);
    await exam.save();
    return exam;
    //questiondata, answerList, examID
    // const questionData = new QuestionModel({
    //     questionTitle: questiondata.title,
    //     questionAttach: questiondata.attach,
    //     QuestionType: questiondata.type,
    //     questionDegree: questiondata.degree,
    //     videoRelated: questiondata.video
    // });
    // const result = await questionData.save();
    // const answers = [];
    // for (i = 0; i < answerList.length; i++) {
    //     const answer = {
    //         answerTitle: answerList[i].title,
    //         answerResult: answerList[i].result,
    //         answerAttach: answerList[i].attach,
    //         answerDegree: answerList[i].Degree
    //     };
    //     answers.push(answer);
    // }

    // result.questionAnswer = answers;
    // await result.save();

    // const examq = await Exam.findById(examID);
    // const EQ = {
    //     question: result._id
    // };
    // examq.examquestion.push(EQ);
    // await examq.save();
}

exports.createAnswer = async (qid, title, result, image, degree) => {
    // console.log(result);
    const answerData = {
        answerTitle: title,
        answerResult: result,
        answerAttach: image,
        answerDegree: degree
    };
    const Question = await QuestionModel.findById(qid);
    Question.questionAnswer.push(answerData);
    return await Question.save();
};





async function addExamforArchive(studentid, examtitle, examid, studentDegree, examDegree, examsucesspersent, questionsList) {
    const studentpersent = (studentDegree / examDegree) * 100;
    const archiveData = new Archive({
        studentId: studentid,
        examtitle: examtitle,
        ExamId: examid,
        ExamDate: Date.now(),
        student_degree: studentDegree,
        Exam_all_degree: examDegree,
        Exam_sucess_present: examsucesspersent,
        student_persnet: studentpersent,
        question: questionsList
    });
    return await archiveData.save();
}

// const answers = await QuestionModel.findOne({
//     "questinAnswer._id": ansid
// });
// Degree += answers.answerDegree;

//admin
exports.getExamforAdmin = async (exid) => {
    const data = await ExamsModel.findById(exid);
    return data;
};

exports.showAllExam = async () => {
    const Data = await ExamsModel.find();
    return Data;
};

exports.CreateExam = async (examjson) => {
    const examName = examjson.examname;
    const examdegree = examjson.examDegree;
    const Exam_sucess_persent = examjson.examSucessPersent;
    const examquestionCount = examjson.examQuestionCount;
    const examData = new ExamsModel({
        examname: examName,
        examDegree: examdegree,
        examsuccessPersent: Exam_sucess_persent,
        examQuestionCount: examquestionCount,
        active: true
    });
    const exData = await examData.save();
    return exData;
};

exports.editExam = async (examid, examname, examDegree, sucesspresent, questionCount, active) => {
    const examData = await ExamsModel.findByIdAndUpdate(examid, {
        examname: examname,
        examDegree: examDegree,
        examsuccessPersent: sucesspresent,
        examQuestionCount: questionCount,
        active: active
    });
    return examData;

};

exports.delete = async (examid) => {
    const DaP = await DeleteExamFromCourse(examid);
    // console.log(Dap);
    const data = await ExamsModel.findByIdAndDelete(examid);
    if (Dap || data) {
        return data;
    }
    return false;
};

exports.DeactiveExam = async (examid) => {
    const examD = await ExamsModel.findByIdAndUpdate(examid, {
        active: false
    });
    return examD;
};

exports.ActiveExam = async (examid) => {
    const examD = await ExamsModel.findByIdAndUpdate(examid, {
        active: true
    });

    return examD;
};

exports.AddQuestiontoExam = async (examid, qid) => {
    const exam = await ExamsModel.findById(examid);
    const questions = exam.examquestion;
    const result = questions.filter(ques => {
        return ques.question == qid;
    });
    if (result.length > 0) {
        return false;
    } else {
        exam.examquestion.push({
            question: qid
        });
        await exam.save();
        return true;
    }
}

//Delete question and remove it from Exam
exports.deleteQuestion = async (qid) => {

    const exams = await ExamsModel.find({
        "examquestion.question": {
            $in: [qid]
        }
    }).exec();
    if (exams) {
        const exams2 = await ExamsModel.updateMany({
            "examquestion.question": {
                $in: [qid]
            }
        }, {
            $pull: {
                examquestion: {
                    question: qid
                }
            }
        }).exec();
        return exams2;
    } else {
        return false;
    }


};


exports.ExamQues = async (examid) => {
    const questions = await ExamsModel.findById(examid);
    const myArr = [];
    questions.examquestion.map(ques => {
        myArr.push(ques.question);
    });
    return myArr;
};