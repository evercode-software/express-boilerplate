const router = require('express').Router()

const UserController = require('../app/controllers/userController')

router.get('/', UserController.index)
router.get('/:userId', UserController.show)

module.exports = router