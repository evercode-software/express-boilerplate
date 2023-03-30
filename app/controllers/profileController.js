const { errorHandler } = require('../../utils')
const { User, Post } = require('../../database/models')

class UserController {
    async index (req, res) {
        try {
            res.json(req.user)
        } catch (error) {
            console.log(error);
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }
}

module.exports = new UserController