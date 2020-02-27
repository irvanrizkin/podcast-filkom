const router = require('express').Router()
const postController = require('../controller/PostController')
const { checkToken } = require('../middleware')

// GET post by id
router.get('/:id_post', postController.getPostById)

// POST post a post
router.post('/', checkToken, postController.postAPost)

// PUT update post
router.put('/:id_post', checkToken, postController.updatePost)

// DELETE post by id
router.delete('/:id_post', checkToken, postController.deletePostById)

module.exports = router
