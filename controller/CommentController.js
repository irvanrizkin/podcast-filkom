const db = require('../database')

const getCommentByPost = async(req, res, next) => {
  const id_post = req.params.id_post
  const [rows] = await db.query('select * from comments where id_post = ?', 
    [id_post])
  res.json({
    "success": true,
    "comments": rows
  })
}

const postCommentOnPost = async(req, res, next) => {
  const id_post = req.params.id_post
  const id_user = req.user.id_user
  const content = req.body.content
  const [rows] = await db.query('select * from posts where id = ?', [id_post])
  if (rows.length > 0) {
    db.query('insert into comments(id_post, id_user, content) values(?, ?, ?)',
      [id_post, id_user, content])
    res.json({
      "success": true,
      "id_post": id_post,
      "content": content,
      "message": "Comment Added"
    })
  } else {
    res.status(404)
    const error = new Error("Post Not Found")
    next(error)
  }
}

const updateComment = async(req, res, next) => {
  const id_comment = req.params.id_comment
  const content = req.body.content
  const [rows] = await db.query('select * from comments where id = ?', 
    [id_comment])
  if (rows.length > 0) {
    db.query('update comments set content = ? where id = ?', [content,
      id_comment])
    res.json({
      "success": true,
      "content": content,
      "message": id_comment + " id_comment updated"
    })
  } else {
    res.status(404)
    const error = new Error("Comment Not Found")
    next(error)
  }
}

const deleteComment = async(req, res, next) => {
  const id_comment = req.params.id_comment
  const [rows] = await db.query('select * from comments where id = ?', 
    [id_comment])
  if (rows.length > 0) {
    db.query('delete from comments where id = ?', [id_comment])
    res.json({
      "success": true,
      "message": "deleted comment id " + id_comment
    })
  } else {
    res.status(404)
    const error = new Error("Comment Not Found")
    next(error)
  }
}

const commentController = {
  getCommentByPost,
  postCommentOnPost,
  updateComment,
  deleteComment
}

module.exports = commentController
