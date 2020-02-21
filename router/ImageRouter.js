const router = require('express').Router()
const imageController = require('../controller/ImageController')
const fileupload = require('express-fileupload')
router.use(fileupload())

// POST upload image
router.post('/upload/:id_post', imageController.uploadImage)

router.get('/:id_post', imageController.showImageByPost)

module.exports = router