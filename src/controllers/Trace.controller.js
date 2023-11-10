const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')

const examsModel = require('../models/Exams.model');
const QuestionModel = require('../models/Question.model');


exports.index = async (req, res) => {
    const name = "Manager";
    const Email = "manager@google.com";
    const password = "123456";
    const role = "admin";
    const passhash = await bcrypt.hash(password, 12);
    const AdminCreate = new userModel({
        fullName: name,
        email: Email,
        password: passhash,
        active: true,
        role: role,
        firstTime: false,
    });
    await AdminCreate.save();
    res.status(200).json({
        msg: "Account Create"
    })
};

exports.Gen = async (req, res) => {
    const Exams = [{
            examname: "preExam2D",
            examDegree: 31,
            examsuccessPersent: 0,
            examQuestionCount: 31,
            active: true,
            examquestion: []
        },
        {
            examname: "preExam3D",
            examDegree: 33,
            examsuccessPersent: 0,
            examQuestionCount: 33,
            active: true,
            examquestion: []
        }
    ];

    for (let i = 0; i < Exams.length; i++) {
        const ExamData = new examsModel(
            Exams[i]
        );
        await ExamData.save();
    }

    res.status(200).json({
        msg: "working"
    });
};

exports.addQuest = async (req, res) => {
    const Questions = [{

            questionTitle: "من أنواع الرسومات المتحركة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "رسومات متحركة ثنائية الأبعاد",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "رسومات متحركة ثلاثية الأبعاد",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "وقف الحركة stop motion ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "جميع ما سبق",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "من معايير تصميم الرسومات المتحركة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "توضح الفكرة وتحقق الأهداف ",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "صعوبة المحتوى التعليمي",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,
                },
                {
                    answerTitle: "تناسب فئة معينة من الطلاب",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "المبالغة فى استخدام الألوان",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "من اهم مميزات الرسومات المتحركة ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "توفير الوقت والجهد",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "التفاعلية",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "تنمية التفكير الإبداعي",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "جميع ما سبق",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "تعد مرحلة ............ هى اول مراحل انتاج فيديو رسومات متحركة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "مرحلة التحريك",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "مرحلة اعداد السيناريو",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "مرحلة تصميم الشخصيات",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "مرحلة المونتاج",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: " من اهم برامج انتاج رسومات وشخصيات ثنائية الأبعاد ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Adobe Photoshop",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Adobe illustrator",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Adobe encoder",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Adobe InDesign",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "تعد الوظيفة الأساسية لبرنامج فوتوشوب هي",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "تعديل الصور وتحسينها واضافة المؤثرات",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "رسم الشخصيات",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "تصميم كتب ومجلات",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: " عمل ستوري بورد Story board",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "الوحدة الأساسية فى برنامج الفوتوشوب هي",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "pixels",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Dots",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Vector",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "inches",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لإنشاء مشروع جديد فى الفوتوشوب يتم الضغط على",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "New Project",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "File",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Open",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Edit",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لإدراج العناصر داخل برنامج الفوتوشوب يتم الضغط على",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "New Project",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "File",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Open",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Edit",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "لتعديل أبعاد العناصر داخل برنامج الفوتوشوب يتم الضغط على",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Transform",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Move",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Edit",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Duplicate",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لتحسين جودة الصور فى برنامج فوتوشوب من قائمة ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Adjustments",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "layers",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Edit",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Type",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لقص أطراف من الصورة فى برنامج فوتوشوب نستخدم اداه",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Cut Tool ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Crop Tool",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "الوحدة الأساسية فى برنامج الاليستوريتور هي ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "pixels",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Dots",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Vector",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "inches",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لإضافة تأثيرات على العناصر فى برنامج  Illustrator نستخدم قائمة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Effects",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Characters",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Edit",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Window",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لعمل تدرج ألوان فى برنامج  Illustrator نستخدم أداه",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Fill",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Gradient",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Stroke",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "جميع ما سبق",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لحفظ رسمه بصيغة PNG فى برنامج  Illustrator نستخدم أداه",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Save",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Save as",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Path",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Export As",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "لإدراج عناصر فى برنامج  After effects نضغط على امر ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Insert File",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Put",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Open File",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Import File",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "للتحكم فى حجم العنصر فى برنامج  After effects نضغط على زر ......... من الكيبورد",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "R",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "S",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "T",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "P",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "للتحكم فى دوران العنصر فى برنامج After effects نضغط على زر ......... من الكيبورد",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "R",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "S",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "T",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "P",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لتشغيل حركة العناصر فى مساحه العمل فى برنامج After effects يتم الضغط زر ......... من الكيبورد",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Space",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "EST",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Shift",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Enter",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: " لكتابة نص فى برنامج After effects يتم استخدام أداه",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Font",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Type",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Character",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Pen",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لحفظ المشروع فى برنامج After effects نضغط على امر",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Export",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Save as",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Add To Render Queue ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "MP4",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لإضافة عنصر داخل مساحة العمل فى برنامج Blender نضغط على",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Shift+A",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Shift+O",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Shift+I ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Shift+M",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "للتحكم فى حجم العنصر داخل مساحة العمل فى برنامج Blender نضغط على ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "S+X",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "S+Z",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "S+Y",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "S+T",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                }
            ],

        },
        {

            questionTitle: "لعرض صور ورسومات على الشاشات يجب أن يكون مود الصورة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "CMYK",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "RST",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "RGB",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "JBG",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "يتم إضافة العناصر فى برنامج Premiere فى منطقة ………….",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Work Area",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "composition",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Work Space",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Timeline",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لحذف جزء من التراك فى برنامج Premiere يتم استخدام أداه ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "  Cut Tool",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: " Razor Tool ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Crop Tool",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Eraser Tool",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لإغلاق الإضاءة فى نهاية الفيديو فى برنامج Premiere يتم استخدام تأثير  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Light",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Time WArp",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Film Disolve",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Video Light",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "لعمل إنتقالات بين المشاهد فى برنامج Premiere يتم استخدام قائمة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Transforms",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Transitions",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Moves",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Motions",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: " من أكثر الامتدادات للفيديو استخداماً فى برنامج Premiere ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "H.264",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "AVI",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "MP4",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "GIF",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "يتم حفظ الفيديو فى برنامج Premiere بإستخدام أمر ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "Save",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "Save As",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Export Media ",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                },
                {
                    answerTitle: "Export Project",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        }

    ];
    const exam = await examsModel.findOne({
        examname: "preExam2D"
    });
    for (let i = 0; i < Questions.length; i++) {
        const QuestionAdd = new QuestionModel({
            questionTitle: Questions[i].questionTitle,
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
        })
        const Data = await QuestionAdd.save();
        for (let r = 0; r < Questions[i].questionAnswer.length; r++) {
            const myD = await QuestionModel.findByIdAndUpdate(Data._id, {
                $push: {
                    questionAnswer: {
                        answerTitle: Questions[i].questionAnswer[r].answerTitle,
                        answerResult: Questions[i].questionAnswer[r].answerResult,
                        answerAttach: null,
                        answerDegree: Questions[i].questionAnswer[r].answerDegree
                    }
                }
            });
        }

        const upExam = await examsModel.findByIdAndUpdate(exam._id, {
            $push: {
                examquestion: {
                    question: QuestionAdd._id
                }
            }
        });

    }

    res.status(200).json({
        msg: "Done"
    })
};

exports.addQuestA = async (req, res) => {
    const Questions = [{

            questionTitle: "تتميز الرسومات المتحركة بالتفاعلية والتكامل والجاذبية",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "صح",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "خطاء",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "يجب تحديد المحتوى قبل البدء في تنفيذ فيديو رسومات متحركة",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                    answerTitle: "صح",
                    answerResult: true,
                    answerAttach: null,
                    answerDegree: 1,

                },
                {
                    answerTitle: "خطاء",
                    answerResult: false,
                    answerAttach: null,
                    answerDegree: 0,

                }
            ],

        },
        {

            questionTitle: "يعد برنامج Photoshop أفضل برنامج لعمل Story Board ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,

            }],

        },
        {

            questionTitle: "لا يفضل عمل Story Board للأحداث قبل تفيذ الفيديو ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,

            }],

        },
        {

            questionTitle: " يتكون برنامج Photoshop من Layers  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "تعد أداه Pen Tool هيا اداه الرسم الأساسية فى برنامج Illustrator ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "تستخدم أداه Smooth Tool فى برنامج Illustrator لإزالة عيوب منحيات الرسم ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "لعمل إطار على الرسوم فى برنامج Illustrator نستخدم أداه Border ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {
            questionTitle: "لتعديل مستوى شفافية الرسومات فى برنامج Illustrator نستخدم أداه Opacity",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],
        },
        {

            questionTitle: "لإنشاء مساحة عمل جديدة داخل برنامج After Effects نضغط على New Projects",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }],

        },
        {

            questionTitle: "لقص جزء من الصورة فى مساحة العمل فى برنامج After Effects نستخدم امر Mask",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }],

        },
        {

            questionTitle: "للتحكم فى حجم العنصر فى برنامج After Effects نضغط على زر T من الكيبورد ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يتم تحريك العناصر في مساحة العمل فى برنامج After effects باستخدام امر Key Frame ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "لا يمكن إدراج ملف AI, PSD داخل مساحة العمل فى برنامج After effects  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,

            }],

        },
        {

            questionTitle: "يستخدم تأثير Color Key لإزالة الخلفيات من الصور والعناصر داخل برنامج After effects ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: "لكتابة نص فى برنامج After effects يتم استخدام أداه Font Tool   ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }],

        },
        {

            questionTitle: "يمكن إضافة تاثير حركى جاهز  فى برنامج After effects من خلال قائمة Presets ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "لحفظ وإخراج الفيديو فى صيغة AVI من برنامج After effects  نضغط على Save as ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: "فى برنامج After effects يمكن تحريك اجزاء من العناصر فقط",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يمكن اضافة رسومات متحركة جاهزة داخل برنامج  After effects ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: " لإضافة عنصر داخل مساحة العمل فى برنامج Blender نفتح قائمة Mesh  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: "يتم الضغط على Shift+D لأخد نسخة طبق الأصل من عنصر معين ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: "يستخدم أمرGlossy  لإعطاء بريق لامع للعنصر فى برنامج Blender ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يمكن تحويل صورة ثنائية الأبعاد إلى مجسم ثلاثي الأبعاد دون الحاجه إلى الرسم ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }],

        },
        {

            questionTitle: "لا يمكن ادراج خلفيات مجسمة جاهزة الى برنامج Blender ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }],

        },
        {

            questionTitle: "يمكن رسم عناصر ثنائية الأبعاد باستخدام برنامج Blender  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يستخدم برنامج Premiere فى رسم وتنسيق وتعديل الشخصيات والعناصر",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: "يجب تحديد اسم ومكان حفظ المشروع الجديد أولاً قبل البدء فى استخدام برنامج Premiere ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يجب اضافة مؤثرات صوتية فى كل مشهد فى الفيديو فى برنامج Premiere  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,

            }],

        },
        {

            questionTitle: " لا يشترط تناسق التعليق الصوتي مع المشاهد المعروضة فى برنامج Premiere ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }, {
                answerTitle: "خطاء",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,

            }],

        },
        {

            questionTitle: "يجب أن تكون المؤثرات الصوتية عاليه الصوت وواضحة بشدة فى برنامج Premiere",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "من اشهر صيغ حفظ الفيديوها MP4 ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },
        {

            questionTitle: "يجب ان يكون التعليق الصوتي خالي من التشويش فى برنامج Premiere  ",
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
            questionAnswer: [{
                answerTitle: "صح",
                answerResult: true,
                answerAttach: null,
                answerDegree: 1,
            }, {
                answerTitle: "خطاء",
                answerResult: false,
                answerAttach: null,
                answerDegree: 0,
            }],

        },

    ];
    const exam = await examsModel.findOne({
        examname: "preExam3D"
    });
    for (let i = 0; i < Questions.length; i++) {
        const QuestionAdd = new QuestionModel({
            questionTitle: Questions[i].questionTitle,
            questionAttach: null,
            QuestionType: "single",
            questionDegree: 1,
        })
        const Data = await QuestionAdd.save();
        for (let r = 0; r < Questions[i].questionAnswer.length; r++) {
            const myD = await QuestionModel.findByIdAndUpdate(Data._id, {
                $push: {
                    questionAnswer: {
                        answerTitle: Questions[i].questionAnswer[r].answerTitle,
                        answerResult: Questions[i].questionAnswer[r].answerResult,
                        answerAttach: null,
                        answerDegree: Questions[i].questionAnswer[r].answerDegree
                    }
                }
            });
        }

        const upExam = await examsModel.findByIdAndUpdate(exam._id, {
            $push: {
                examquestion: {
                    question: QuestionAdd._id
                }
            }
        });

    }

    res.status(200).json({
        msg: "Done"
    })
};