const jwt = require('jsonwebtoken')
const { errorHandler, mailer } = require('../../utils')
const { User } = require('../../database/models')
const LoginCode = require('../mails/LoginCode')

class AuthController {
    async login (req, res, next) {
        try {
            // Get user from database based on user input
            const email = req.body.email
            const user = await User.findOne({
                where:{
                    email: email
                }
            })
            
            // If user not found, return 403 error
            if(!user){
                res.status(403).json({message: 'User not found'})
            }
            
            // Create a token for the user
            const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)

            // Send login code to email
            // await mailer.send(res, next, email)
            await user.notify(new LoginCode('123456'), res)
            
            // Set cookie for logged in user
            res
                .cookie('GTAC', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                })
                .json({ message: 'Logged in successfully' })
        } catch (error) {
            console.log(error);
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async logout (req, res) {
        res
            .clearCookie('GTAC')
            .json({ message: 'Successfully logged out'})
    };
}

module.exports = new AuthController