const router = require('express').Router()
const express = require('express')
const imageController = require('../controller/ImageController')
const fileupload = require('express-fileupload')
const { checkToken } = require('../middleware')
router.use(fileupload())
router.use(express.static('/public'))

// POST upload image
router.post('/upload/:id_post', checkToken, imageController.uploadImage)

// GET show image by post
router.get('/:id_post', imageController.showImageByPost)

// DELETE image by id
router.delete('/:id', checkToken, imageController.deleteImageById)

// GET show image on HTM
router.get('/:id/show', imageController.showImageOnHTM)

// GET show image on src
router.get('/:id/open', imageController.showImageOnSrc)

module.exports = router