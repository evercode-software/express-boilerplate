const { errorHandler } = require('../../utils')
const { User, Post } = require('../../database/models')

class UserController {
    async index (req, res) {
        try {        
            const users = await User.findAll({
                include: [
                    {
                      model: Post,
                      as: 'posts'
                    }
                ]
            })
            res.json(users)
        } catch (error) {
            console.log(error);
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async show (req, res) {
        try {
            const id = req.params.userId
            const user = await User.findByPk(id,{
                include: [
                    {
                      model: Post,
                      as: 'posts'
                    }
                ]
            })
            if (!user) {
                return res.status(404).json({ message: 'Not found' })
            }
            res.json(user)
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }
}

module.exports = new UserController