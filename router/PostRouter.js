const router = require('express').Router()
const postController = require('../controller/PostController')
const { checkToken } = require('../middleware')

// GET post by id
router.get('/:id_post', postController.getPostById)

// POST post a post
router.post('/', checkToken, postController.postAPost)

// PUT update post
router.put('/:id_post', postController.updatePost)

// DELETE post by id
router.delete('/:id_user/:id_post', postController.deletePostById)

module.exports = router