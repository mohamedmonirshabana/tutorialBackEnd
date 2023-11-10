const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Course API",
            version: '1.0.0',
            description: ''
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    bearerFormat: "JWT",
                    name: "Authorization",
                    in: "header",
                    schema: "bearer",
                }
            }
        },
        security: [{
            bearerAuth: [],
        }],
        servers: [{
            url: "http://localhost:8000"
        }],
        paths: {
            '/auth/signup': {
                post: {
                    tags: ['auth'],
                    summary: ['Add a user Account'],
                    security: [],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fullname: {
                                            type: "string",
                                            require: true
                                        },
                                        email: {
                                            type: "string",
                                            require: true
                                        },
                                        password: {
                                            type: "string",
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            'description': 'user account is created sucess'
                        },
                        '422': {
                            'description': 'email is exist '
                        }
                    }
                }
            },
            '/auth/signin': {
                post: {
                    tags: ['auth'],
                    summary: ['login in site'],
                    description: ['for All user'],
                    security: [],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: {
                                            type: 'string',
                                            require: true
                                        },
                                        password: {
                                            type: "string",
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user login sucessfully'
                        },
                        '400': {
                            'description': 'bad request'
                        }
                    }
                }
            },
            '/auth/forgetpassword': {
                post: {
                    tags: ['auth'],
                    summary: ['user forget password and use it to send code'],
                    security: [],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user get code for reenter password'
                        },
                        '404': {
                            'description': 'email is not exist'
                        }
                    }
                }
            },
            '/auth/recoverpassword/{urcode}': {
                patch: {
                    tags: ['auth'],
                    summary: ['update uer password'],
                    security: [],
                    parameters: [{
                        name: 'urcode',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        password: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user urlcode is correct and '
                        },
                        '404': {
                            'description': 'url code not correct'
                        }
                    }
                }
            },
            '/user/getfirst': {
                get: {
                    tags: ['users'],
                    summary: ['ensure if user first time on site or not'],
                    'responses': {
                        '200': {
                            'description': 'user first time'
                        },
                        '400': {
                            'description': 'not first time'
                        }
                    }
                }
            },
            '/user/home': {
                get: {
                    tags: ['users'],
                    summary: ['user ome for Dashboard'],
                    'responses': {
                        '200': {
                            'description': 'home page for user'
                        },
                        '400': {
                            'description': 'not auth'
                        }
                    }
                }
            },
            '/user/userExam': {
                get: {
                    tags: ['users'],
                    summary: ['user show Exam'],
                    'responses': {
                        '200': {
                            'description': 'user Exam result'
                        },
                        '400': {
                            'description': 'no Exam'
                        }
                    }
                }
            },
            '/exam/preexam2d': {
                get: {
                    tags: ['exam'],
                    summary: ['preExam for user before Start Course'],
                    'responses': {
                        '200': {
                            'description': 'preExam'
                        },
                        '400': {
                            'description': 'not work'
                        }
                    }
                }
            },
            '/exam/preexam3d': {
                get: {
                    tags: ['exam'],
                    summary: ['preExam for user before Start Course'],
                    'responses': {
                        '200': {
                            'description': 'preExam'
                        },
                        '400': {
                            'description': 'not work'
                        }
                    }
                }
            },
            '/exam/{examid}': {
                get: {
                    tags: ['exam'],
                    summary: ['exam for student by id'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get Exam Questions'
                        },
                        '400': {
                            'description': 'bad request'
                        }
                    }
                }
            },
            '/exam/examresult/{examid}': {
                post: {
                    tags: ['exam'],
                    summary: ['show result for exam Done'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: "object",
                                    properties: {
                                        Data: {
                                            type: "array",
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'get exam result '
                        },
                        '400': {
                            'description': 'error for exam id'
                        }
                    }
                }
            },
            '/exam/showresult/{archiveid}': {
                get: {
                    tags: ['exam'],
                    summary: ['show student Degree with Archive in params'],
                    parameters: [{
                        name: 'archiveid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get Archive data'
                        },
                        '400': {
                            'description': 'not  Found'
                        }
                    }
                }
            },
            '/exam/history': {
                get: {
                    tags: ['exam'],
                    summary: ['history of exam '],
                    'responses': {
                        '200': {
                            'description': 'history for student'
                        },
                        '400': {
                            'description': 'bad request'
                        }
                    }
                }
            },
            '/track/': {
                get: {
                    tags: ['track'],
                    summary: ['show all Track'],
                    'responses': {
                        '200': {
                            'description': 'show all Track'
                        },
                        '400': {
                            'description': 'no Track'
                        }
                    }
                }
            },
            '/track/2d': {
                get: {
                    tags: ['track'],
                    summary: ['get All Track 2D'],
                    'responses': {
                        '200': {
                            'description': 'Show all Track in 2D'
                        },
                        '400': {
                            'description': "track not Found"
                        }
                    }
                },
            },
            '/track/3d': {
                get: {
                    tags: ['track'],
                    summary: ['get All Track 3D'],
                    'responses': {
                        '200': {
                            'description': 'Show all Track in 3D'
                        },
                        '400': {
                            'description': "track not Found"
                        }
                    }
                },
            },
            '/track/details/{trackid}': {
                get: {
                    tags: ['track'],
                    summary: ['show details for spacific Track'],
                    parameters: {
                        name: 'trackid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'show all Data Fro Track'
                        },
                        '404': {
                            'description': 'track id not Exist'
                        }
                    }
                }
            },
            '/track/enoll/{trackid}': {
                post: {
                    tags: ['track'],
                    summary: ['enroll student to Track'],
                    parameters: [{
                        name: 'tackid',
                        in: 'path',
                        required: true
                    }],
                    'response': {
                        '200': {
                            'description': 'enroll student in track'
                        },
                        '400': {
                            'description': 'you enrollalready '
                        }
                    }
                }
            },
            '/activ/{activeid}': {
                post: {
                    tags: ['activ'],
                    summary: ['student add some active for build '],
                    parameters: [{
                        name: 'activeid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        filecompress: {
                                            type: 'file',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'file uploded'
                        }
                    }
                }
            },
            '/library/{libid}': {
                get: {
                    tags: ['library'],
                    summary: ['show Library for student'],
                    parameters: [{
                        name: 'libid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'show library'
                        }
                    }
                }
            },
            '/course/courses': {
                get: {
                    tags: ['course'],
                    summary: ['get Course for Student'],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        courseid: {
                                            type: 'string',
                                            require: true
                                        },
                                        trackId: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'get course'
                        }
                    }
                }
            },
            '/admin/student/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get All student Data'],
                    'responses': {
                        '200': {
                            'description': 'get All student Data'
                        }
                    }
                }
            },
            '/admin/student/{sid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get all details for one student'],
                    parameters: [{
                        name: 'sid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get all Detail for one Student'
                        },
                        '400': {
                            'description': 'student id is not exist'
                        }
                    }
                }
            },
            '/admin/exam/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get all Exam for Admin'],
                    'responses': {
                        '200': {
                            'description': 'all exam in DB'
                        }
                    }
                }
            },
            '/admin/exam/create': {
                post: {
                    tags: ['admin'],
                    summary: ['create exam '],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        examName: {
                                            type: 'string',
                                            require: true
                                        },
                                        examDegree: {
                                            type: 'number',
                                            require: true
                                        },
                                        examSucessPersent: {
                                            type: 'number',
                                            require: true
                                        },
                                        examQuestionCount: {
                                            type: 'number',
                                            require: true
                                        },
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '201': {
                            'description': 'create Exam '
                        },
                        '400': {
                            'description': 'exam not Create'
                        }
                    }
                }
            },
            '/admin/exam/{examid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get exam Detail'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'exam details'
                        },
                        '400': {
                            'description': 'no exam '
                        }
                    }
                }
            },
            '/admin/exam/{examid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit exam Data by Admin'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        examname: {
                                            type: 'string',
                                            require: true
                                        },
                                        examDegree: {
                                            type: 'number',
                                            require: true
                                        },
                                        sucesspersent: {
                                            type: 'number',
                                            require: true
                                        },
                                        questioncount: {
                                            type: 'number',
                                            require: true
                                        },
                                        active: {
                                            type: 'boolean',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'exam updated'
                        },
                        '400': {
                            'description': 'not updated'
                        }
                    }
                }
            },
            '/admin/exam/{examid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete exam By Admin'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true
                    }],
                    'responses': {
                        '200': {
                            'description': 'exam Delete'
                        },
                        '400': {
                            'description': 'not delete'
                        }
                    }
                }
            },
            '/admin/exam/active/{examid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['active exam by id'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'exam Active'
                        },
                        '400': {
                            'description': 'fail'
                        }
                    }
                }
            },
            '/admin/exam/deactive/{examid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['stop exam by Deactive to false to not Work '],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true
                    }],
                    'responses': {
                        '200': {
                            'description': 'deactive exam'
                        },
                        '400': {
                            'description': 'not work'
                        }
                    }
                }
            },
            '/admin/question/add/{examid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add question for exam'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        imgattach: {
                                            type: 'file',
                                            require: false
                                        },
                                        type: {
                                            type: 'string',
                                            require: true
                                        },
                                        degree: {
                                            type: 'number',
                                            require: true
                                        },
                                        video: {
                                            type: 'string',
                                            require: false
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'question created',
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/question/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get All Question'],
                    'responses': {
                        '200': {
                            'description': 'all question'
                        }
                    }
                }
            },
            '/admin/questions/{examid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get question for one Exam'],
                    parameters: [{
                        name: 'examid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get questions'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/question/answer/{quesid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get Answers for Question'],
                    parameters: [{
                        name: 'quesid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get answers'
                        }
                    }
                }
            },
            '/admin/question/{id}': {
                get: {
                    tags: ['admin'],
                    summary: ['get question by id'],
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get question'
                        },
                        '400': {
                            'description': 'not exist'
                        }
                    }
                }
            },
            '/admin/question/{id}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit Question'],
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        imgattach: {
                                            type: 'file',
                                            require: false
                                        },
                                        type: {
                                            type: 'string',
                                            require: true
                                        },
                                        degree: {
                                            type: 'number',
                                            require: true
                                        },
                                        video: {
                                            type: 'string',
                                            require: false
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'edit Question'
                        },
                        '400': {
                            'description': 'not Edit'
                        }
                    }
                }
            },
            '/admin/question/{id}': {
                delete: {
                    tags: ['admin'],
                    summary: ['Delete Question byid'],
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true
                    }],
                    'responses': {
                        '200': {
                            'description': 'Question Delete'
                        },
                        '400': {
                            'description': 'not Delete'
                        }
                    }
                }
            },
            '/admin/answer/add/{qid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add Answer for Question'],
                    parameters: [{
                        name: 'qid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        imgattach: {
                                            type: 'file',
                                            require: true
                                        },
                                        degree: {
                                            type: 'number',
                                            require: true
                                        },
                                        result: {
                                            type: 'boolean',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'answer add'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/answer/{qid}/{ansid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get answer'],
                    parameters: [{
                        name: 'qid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }, {
                        name: 'ansid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get answer'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/answer/edit/{qid}/{ansid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit answer'],
                    parameters: [{
                        name: 'qid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }, {
                        name: 'ansid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        result: {
                                            type: 'boolean',
                                            require: true
                                        },
                                        imgattach: {
                                            typ: 'file',
                                            require: false
                                        },
                                        degree: {
                                            type: 'number',
                                            require: true
                                        }
                                    },
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'edit Answer'
                        }
                    }
                }
            },
            '/admin/answer/{qid}/{ansid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete answer'],
                    parameters: [{
                        name: 'qid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }, {
                        name: 'ansid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'delete answer'
                        }
                    }
                }
            },
            '/admin/track/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get All track for Admin'],
                    'responses': {
                        '200': {
                            'description': 'get all Track'
                        }
                    }
                }
            },
            '/admin/track/add': {
                post: {
                    tags: ['admin'],
                    summary: ['add a new Track'],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        trackname: {
                                            type: 'string',
                                            require: true
                                        },
                                        about: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'add new Track'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/track/{tid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get track details by name'],
                    parameters: [{
                        name: 'tid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get TrackDetails'
                        },
                        '400': {
                            'description': 'not Found'
                        }
                    }
                }
            },
            '/admin/track/{tid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit track by Trackid'],
                    parameters: [{
                        name: 'tid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        trackname: {
                                            type: 'string',
                                            require: true
                                        },
                                        about: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'edit Track'
                        },
                        '400': {
                            'description': 'not Edit'
                        }
                    }
                }
            },
            '/admin/track/{tid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete track'],
                    parameters: [{
                        name: 'tid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'delete track'
                        },
                        '400': {
                            'description': 'not delete'
                        }
                    }
                }
            },
            '/admin/course/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get all course for admin'],
                    'responses': {
                        '200': {
                            'description': 'get all Course for Admin'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/course/all/{tid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get Courses for Track'],
                    parameters: [{
                        name: 'tid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'Get Course for Track'
                        }
                    }
                }
            },
            '/admin/course/add/{tid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add course and add it for Track '],
                    parameters: [{
                        name: 'tid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        coursename: {
                                            type: 'string',
                                            require: true
                                        },
                                        condition: {
                                            type: 'boolean',
                                            require: true
                                        },
                                        examid: {
                                            type: 'string',
                                            require: false
                                        },
                                        Author: {
                                            type: 'string',
                                            require: true,
                                            example: 'Johne Ali'
                                        },
                                        aboutCourse: {
                                            type: 'string',
                                            require: true
                                        },
                                        instruction: {
                                            type: 'array',
                                            require: true,
                                            items: {
                                                type: 'string'
                                            },
                                            example: ["str1", "str2", "str3"]
                                        },
                                        target: {
                                            type: 'array',
                                            require: true,
                                            items: {
                                                type: 'string'
                                            },
                                            example: ["str1", "str2", "str3"]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'add Course'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/course/{cid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit course '],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        coursename: {
                                            type: 'string',
                                            require: true,
                                            example: 'course name'
                                        },
                                        consition: {
                                            type: 'boolean',
                                            require: true
                                        },
                                        examid: {
                                            type: 'string',
                                            require: false
                                        },
                                        author: {
                                            type: 'string',
                                            require: true
                                        },
                                        aboutCourse: {
                                            type: 'string',
                                            require: true
                                        },
                                        instruction: {
                                            type: 'array',
                                            require: true,
                                            items: {
                                                type: 'string'
                                            },
                                            example: ["str1", "str2", "str3"]
                                        },
                                        target: {
                                            type: 'array',
                                            require: true,
                                            items: {
                                                type: 'string'
                                            },
                                            example: ["str1", "str2", "str3"]
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/admin/course/details/{cid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get course one by id'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get course Data'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/course/{cid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete course by id'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'course Delete'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/video/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get all video'],
                    'responses': {
                        '200': {
                            'description': 'get all video'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/video/add/{cid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add video for course'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        videofile: {
                                            type: 'file',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'video add it'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/video/{vid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit video and remove old video'],
                    parameters: [{
                        name: 'vid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        videofile: {
                                            type: 'file',
                                            require: false
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'Edit Video'
                        }
                    }
                }
            },
            '/admin/video/details/{vid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get Video by id'],
                    parameters: [{
                        name: 'vid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get video Data'
                        }
                    }
                }
            },
            '/admin/video/all/{cid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get all video '],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get array'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/video/{vid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get video by id'],
                    parameters: [{
                        name: 'vid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get video'
                        },
                        '400': {
                            'description': 'not Found'
                        }
                    }
                }
            },
            '/admin/video/{vid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete video fro hard and DB'],
                    parameters: [{
                        name: 'vid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'video delete'
                        },
                        '400': {
                            'description': 'video not found in DB'
                        }
                    }
                }
            },
            '/admin/activity/add/{cid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add active for course'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'add active'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/activity/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get all activity'],
                    'responses': {
                        '200': {
                            'description': 'get all activity'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/activity/{aid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get one activity'],
                    parameters: [{
                        name: 'aid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get Details'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/activity/all/{cid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get activity by course id'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'activity for course'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/activity/{aid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit activity'],
                    parameters: [{
                        name: 'aid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'edit activity'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/activity/{aid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete activity'],
                    parameters: [{
                        name: 'aid',
                        in: 'path',
                        require: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'delete activeity'
                        },
                        '400': {
                            'description': 'not delete'
                        }
                    }
                }
            },
            '/admin/library/{cid}': {
                post: {
                    tags: ['admin'],
                    summary: ['add library'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        url: {
                                            type: 'string',
                                            require: true
                                        },
                                        desc: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'add library'
                        },
                        '400': {
                            'description': 'not add'
                        }
                    }
                }
            },
            '/admin/library/all': {
                get: {
                    tags: ['admin'],
                    summary: ['get all library'],
                    'responses': {
                        '200': {
                            'description': 'all library'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/library/{lid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get library Details by id'],
                    parameters: [{
                        name: 'lid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get library'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/library/all/{cid}': {
                get: {
                    tags: ['admin'],
                    summary: ['get library for course'],
                    parameters: [{
                        name: 'cid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'get library'
                        },
                        '400': {
                            'description': 'not found'
                        }
                    }
                }
            },
            '/admin/library/{lid}': {
                patch: {
                    tags: ['admin'],
                    summary: ['edit library'],
                    parameters: [{
                        name: 'lid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            require: true
                                        },
                                        url: {
                                            type: 'string',
                                            require: true
                                        },
                                        desc: {
                                            type: 'string',
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'edit'
                        },
                        '400': {
                            'description': 'not edit'
                        }
                    }
                }
            },
            '/admin/library/{lid}': {
                delete: {
                    tags: ['admin'],
                    summary: ['delete library'],
                    parameters: [{
                        name: 'lid',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }],
                    'responses': {
                        '200': {
                            'description': 'delete'
                        },
                        '400': {
                            'description': 'not delete'
                        }
                    }
                }
            }
        }
    },
    apis: [],
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};