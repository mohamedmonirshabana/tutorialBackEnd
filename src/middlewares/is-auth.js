const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');

module.exports = (req, res, next) => {
    // console.log("general middleware");
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        // console.log("not Header");
        const error = new Error('You Cannot Access');
        error.statusCode = 403;
        throw error;
    }
    const token = req.headers.authorization; //split(' ')[1]
    try {
        let decodertoken;
        decodertoken = jwt.verify(token, jwtConfig.jwtSecret);
        // console.log(decodertoken);
        req.userId = decodertoken.userId;
        req.role = decodertoken.userrole;
        next();
    } catch (err) {
        const error = new Error("No Authentication");
        error.statusCode = 401;
        throw error;
    }

};