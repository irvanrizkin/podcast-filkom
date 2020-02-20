const router = require('express').Router()
const commentController = require('../controller/CommentController')
const { checkToken } = require('../middleware')

// GET comment by post
router.get('/:id_post', commentController.getCommentByPost)

// POST comment on post
router.post('/:id_post', commentController.postCommentOnPost)

// PUT update comment
router.put('/:id_comment', commentController.updateComment)

// DELETE comment
router.delete('/:id_comment', commentController.deleteComment)

module.exports = router