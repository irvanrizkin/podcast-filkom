const router = require('express').Router()
const userController = require('../controller/UserController')

// GET all user
router.get('/', userController.getAllUser)

// GET user by id
router.get('/:id', userController.getUserById)

module.exports = router