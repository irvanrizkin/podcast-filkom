const router = require('express').Router()
const userController = require('../controller/UserController')

// GET all user
router.get('/', userController.getAllUser)

// GET user by id
router.get('/:id', userController.getUserById)

// POST change user name
router.put('/:id', userController.updateUserName)

module.exports = router