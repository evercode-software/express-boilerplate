const router = require('express').Router()
const ProfileController = require('../app/controllers/profileController')

router.get('/', ProfileController.index)

module.exports = router