const router = require('express').Router()
const { rateLimiter } = require('../utils')
const auth = require('../app/middleware/auth')
const authRoutes = require('./auth')
const profileRoutes = require('./profile')
const userRoutes = require('./users')

router.use('/api/auth', rateLimiter.set, authRoutes)
router.use('/api/profile', auth.check, rateLimiter.set, profileRoutes)
router.use('/api/users', auth.check, rateLimiter.set, userRoutes)

module.exports = router