const jwt = require('jsonwebtoken');
function verifyJWT(req, res, next) {
    const { token } = req.body;

    if (!token) {
        res.status(400).send("You are not authorized user");
        return;
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        res.status(500).send("Invalid Token");
    }

}

module.exports = verifyJWT;