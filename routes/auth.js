const router = require('express').Router()

const AuthController = require('../app/controllers/authController')

router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)
router.get('/logout', AuthController.logout)

module.exports = router