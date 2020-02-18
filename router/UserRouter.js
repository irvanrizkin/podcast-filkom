const router = require('express').Router()
const userController = require('../controller/UserController')

// GET all user
router.get('/', userController.getAllUser)

// GET user by id
router.get('/:id', userController.getUserById)

// PUT change user name
router.put('/:id', userController.updateUserName)

// DELETE delete user
router.delete('/:id', userController.deleteUser)

// POST register user
router.post("/", userController.registerUser)

module.exports = router