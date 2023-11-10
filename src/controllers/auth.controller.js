const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const jwtConfig = require('../configs/jwt.config');
const path = require('path');

exports.signin = async (req, res, next) => {
    const username = req.body.email;
    const password = req.body.password;
    try {
        const userAuth = await authService.login(username.toLowerCase(), password);
        const token = await jwt.sign({
            userId: userAuth._id,
            userrole: userAuth.role,
            username: userAuth.fullName
        }, jwtConfig.jwtSecret, {
            expiresIn: '360d'
        });
        res.status(200).json({
            token: token,
            username: userAuth.fullName,
            role: userAuth.role,
            id: userAuth._id
        });
    } catch (err) {
        next(err);
    }

};

exports.signup = async (req, res, next) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = await authService.checkEmail(email.toLowerCase());
    if (!checkEmail) {
        const createUser = await authService.createUser(fullname, email.toLowerCase(), password);
        const token = await jwt.sign({
            userId: createUser._id,
            userrole: createUser.role,
            username: createUser.fullName
        }, jwtConfig.jwtSecret, {
            expiresIn: '360d'
        });
        res.status(200).json({
            token: token,
            username: createUser.fullName,
            role: createUser.role,
            id: createUser._id
        });
    } else {
        res.status(422).json({
            message: "Email is Exist"
        });
    }
}

exports.forgetPassword = async (req, res, next) => {
    const email = req.body.email;
    const exist = await authService.checkEmail(email.toLowerCase());
    if (exist) {
        const foregtuser = await authService.forgetPassword(email.toLowerCase());
        res.status(200).json({
            message: "you get recover code to your email ",
            token: foregtuser
        })
    }
    res.status(422).json({
        message: "your email is not Exist"
    })
};

exports.renewPassword = async (req, res, next) => {
    const userCode = req.params.urcode;
    const newpassword = req.body.password;
    const repass = await authService.repassword(userCode, newpassword);
    if (repass) {
        res.status(200).json({
            message: "redirect to Login page"
        })
    }
    res.status(500).json({
        message: "error in server"
    })
};