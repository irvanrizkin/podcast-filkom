const router = require('express').Router()
const postController = require('../controller/PostController')
const { checkToken } = require('../middleware')

// GET post by id
router.get('/:id_post', postController.getPostById)

// POST post a post
router.post('/', checkToken, postController.postAPost)

module.exports = router