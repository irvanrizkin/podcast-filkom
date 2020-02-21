const router = require('express').Router()
const imageController = require('../controller/ImageController')
const fileupload = require('express-fileupload')
router.use(fileupload())

// POST upload image
router.post('/upload/:id_post', imageController.uploadImage)

// GET show image by post
router.get('/:id_post', imageController.showImageByPost)

// DELETE image by id
router.delete('/:id', imageController.deleteImageById)

module.exports = router