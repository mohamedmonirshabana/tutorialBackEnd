const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.checkEmail = async (email) => {
    const checkResult = await User.findOne({
        email: email
    });
    return checkResult;
};

exports.createUser = async (fullname, email, password) => {
    const hashpassword = await bcrypt.hash(password, 12);
    const userCreate = new User({
        fullName: fullname,
        email: email,
        password: hashpassword,
        active: true,
        role: 'student',
        firstTime: true
    })

    return await userCreate.save();
};


exports.forgetPassword = async (email) => {

    const userData = await User.findOne({
        email: email
    });
    if (!userData) {
        const err = new Error("user Account not Exist.");
        err.statusCode = 422;
        throw err;
    }
    const buf = await crypto.randomBytes(32);
    const token = buf.toString('hex');
    userData.active = false;
    userData.reactiveCode = token;
    await userData.save();

    return token;

};

exports.repassword = async (urcode, newpassword) => {
    const userData = await User.findOne({
        reactiveCode: urcode
    });
    const hashpass = await bcrypt.hash(newpassword, 12);
    if (userData) {
        userData.password = hashpass;
        userData.active = true;
        userData.reactiveCode = "";
        return await userData.save();
    }
}

exports.login = async (username, passwod) => {
    const user = await User.findOne({
        $and: [{
            email: username
        }, {
            active: true
        }]
    });
    if (user) {
        const passwordresult = await bcrypt.compare(passwod, user.password);
        if (passwordresult) {
            return user;
        } else {
            const error = new Error("Invalid password");
            error.statusCode = 422;
            throw error;
        }
    } else {
        const error = new Error("Invalid Email");
        error.statusCode = 422;
        throw error;
    }
};

exports.createManager = async (fullName, email, password) => {
    const hashpassword = await bcrypt.hash(password, 12);
    const userCreate = new User({
        fullName: fullname,
        email: email,
        password: hashpassword,
        active: true,
        role: 'manager',
        firstTime: true
    })

    return await userCreate.save();
}