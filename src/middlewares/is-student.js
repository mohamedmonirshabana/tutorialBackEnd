module.exports = (req, res, next) => {
    const role = req.role;
    if (role == "student") {
        next();
    } else {
        const error = new Error("N Role Student");
        error.statusCode = 403;
        throw error;
        next(error);
    }
};