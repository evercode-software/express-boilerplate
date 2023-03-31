const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../utils')
const { User, AuthOtp } = require('../../database/models')
const { Op } = require("sequelize")
const simpleOtp = require('../services/simpleOtp')
const LoginCode = require('../mails/LoginCode')

class AuthController {
    async login (req, res) {
        try {
            // Get user from database based on user input
            const email = req.body.email
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            
            // If user not found, return 403 error
            if(!user){
                return res.status(400).json({message: 'User not found'})
            }

            // Generate OTP and hash it as a secret to be store in database
            const otp = await simpleOtp.generateOtp()
            const secret = await simpleOtp.generateSecret(otp)

            // Store secret OTP to database
            await AuthOtp.create({
                email: email,
                secret: secret
            })

            // Send login code to email
            await user.notify(new LoginCode(otp), res)

            res.json({ message: 'OTP sent' })
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async verify(req, res) {
        try {
            const email = req.body.email            
    
            // Get secret based on email that created in the last 10 minutes
            const otpData = await AuthOtp.findOne({
                where: {
                    email: email,
                    createdAt: {
                        // Get latest OTP created in the last 10 minutes
                        // 600000 miliseconds = 10 minutes
                        [Op.gte]: new Date(Date.now() - 600000) 
                    },
                },
                order: [['createdAt', 'DESC']]
            })

            // Check if OTP is valid
            if (!otpData) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
            
            // Check OTP send attempt
            if (otpData.attempts >= 5) {
                return res.status(400).json({ message: 'You have reached the maximum number of attempts, 5 times' });
            }
            
            // Check OTP is used
            if (otpData.is_used) {
                return res.status(400).json({ message: 'OTP has been used' });
            }
    
            const otp = req.body.otp
            const secret = otpData.secret
    
            // We need to use await because this function is a promised-based
            const verified = await simpleOtp.verify(otp, secret)
            
            // If OTP and email are match
            if (verified) {
                // Set OTP as used
                otpData.is_used = true;
                await otpData.save();

                // Get user instace based on email
                const user = await User.findOne({
                    where: {
                        email: email,
                    }
                })

                // Create a token for the user
                const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
                
                // Set cookie for logged in user
                res
                    .cookie('GTAC', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                    })
                    .json({ message: 'Logged in successfully' })
            } else {
                // Record how many times OTP entered incorrectly
                otpData.attempts += 1;
                await otpData.save();
                res.status(400).json({
                    'message': 'OTP verification failed',
                    'attempts': otpData.attempts,
                    'maxAttempts': 5
                })
            }
            
        } catch (error) {
            res.status(error.code||500).json(errorHandler.message(error))
        }
    }

    async logout (req, res) {
        const token = req.cookies.GTAC
        
        if (!token) {
            return res.json({ message: 'You have logged out.'});
        }

        res
            .clearCookie('GTAC')
            .json({ message: 'Successfully logged out'})
    };
}

module.exports = new AuthController