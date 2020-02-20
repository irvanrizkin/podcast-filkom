const router = require('express').Router()
const commentController = require('../controller/CommentController')
const { checkToken } = require('../middleware')

// GET comment by post
router.get('/:id_post', commentController.getCommentByPost)

module.exports = router