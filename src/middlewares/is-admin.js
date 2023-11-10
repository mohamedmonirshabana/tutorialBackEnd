module.exports = (req, res, next) => {
    const role = req.role;
    // console.log(role);
    if (role == "admin") {
        next();
    } else {
        const error = new Error("No Role Admin");
        error.statusCode = 403;
        throw error;
    }
};