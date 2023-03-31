const router = require('express').Router()
const { limiter } = require('../utils')
const auth = require('../app/middleware/auth')
const authRoutes = require('./auth')
const profileRoutes = require('./profile')
const userRoutes = require('./users')

router.use('/api/auth', limiter.guest, authRoutes)
router.use('/api/profile', auth.check, limiter.auth, profileRoutes)
router.use('/api/users', auth.check, limiter.auth, userRoutes)

module.exports = router