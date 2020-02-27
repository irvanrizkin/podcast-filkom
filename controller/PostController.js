const db = require('../database')

const getPostById = async(req, res, next) => {
  const id_post = req.params.id_post
  const [rows] = await db.query('select * from posts where id = ?', [id_post])
  if (rows.length != 0) {
    res.json({
      "success": true,
      "post": rows[0]
    })
  } else {
    res.status(404)
    res.json({
      "success": false,
      "message": "Post Not Found"
    })
  }
}

const postAPost = async(req, res, next) => {
  const id_user = req.user.id_user
  const content = req.body.content
  db.query('insert into posts(id_user, content) values(?, ?)', 
    [id_user, content])
    .then(() => {
      res.json({
        "success": true,
        "id_user": id_user,
        "post": content,
        "message": "Post Created"
      })
    })
    .catch((err) => {
      res.json({
        "success": false,
        "error": err
      })
    })
}

const updatePost = async(req, res, next) => {
  const id_post = req.params.id_post
  const content = req.body.content
  const [rows] = await db.query('select * from posts where id = ?', [id_post])
  if (rows.length > 0) {
    db.query('update posts set content = ? where id = ?', [content, id_post])
    res.json({
      "success": true,
      "content": content,
      "message": id_post + " id_post updated"
    })
  } else {
    res.status(404)
    const error = new Error("Post Not Found")
    next(error)
  }
}

const deletePostById = async(req, res, next) => {
  const id_post = req.params.id_post
  const id_user = req.user.id_user
  const [rows] = await db.query('select * from posts where id = ? and id_user = ?', 
    [id_post, id_user])
  if (rows.length > 0) {
    db.query('delete from posts where id = ? and id_user = ?', 
      [id_post, id_user])
    res.json({
      "success": true,
      "message": id_post + " post deleted from user " + id_user
    })
  } else {
    res.status(404)
    const error = new Error("Post Not Found")
    next(error)
  }
}

const postController = {
  getPostById,
  postAPost,
  updatePost,
  deletePostById
}

module.exports = postController

