const router = require('express').Router()
const imageController = require('../controller/ImageController')
const fileupload = require('express-fileupload')
const { checkToken } = require('../middleware')
router.use(fileupload())

// POST upload image
router.post('/upload/:id_post', checkToken, imageController.uploadImage)

// GET show image by post
router.get('/:id_post', imageController.showImageByPost)

// DELETE image by id
router.delete('/:id', checkToken, imageController.deleteImageById)

module.exports = router