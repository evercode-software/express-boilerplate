const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../utils')

exports.check = (req, res, next) => {
    const token = req.cookies.GTAC
    if (!token) {
        res.status(403).json({ message: 'Unauthorized action.'});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(error.code||500).json(errorHandler.message(error))
    }
}