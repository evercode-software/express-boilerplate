const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../utils')

exports.check = (req, res, next) => {
    try {
        const token = req.cookies.GTAC
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized action.'});
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(error.code||500).json(errorHandler.message(error))
    }
}