const router = require('express').Router()
const userController = require('../controller/UserController')

// GET all user
router.get('/', userController.getAllUser)

module.exports = router