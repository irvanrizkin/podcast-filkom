const db = require('../database')

const getCommentByPost = async(req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('select * from comments where id_post = ?', [id_post])
    res.json({
        "success": true,
        "comments": rows
    })
}

const postCommentOnPost = (req, res, next) => {
    const id_post = req.params.id_post
    const id_user = req.body.id_user
    const content = req.body.content
    db.query('insert into comments(id_post, id_user, content) values(?, ?, ?)', [id_post, id_user, content])
        .then(() => {
            res.json({
                "success": true,
                "id_post": id_post,
                "id_user": id_user,
                "content": content,
                "message": "Comment Added"
            })
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err
            })
        })
}

const commentController = {
    getCommentByPost,
    postCommentOnPost
}

module.exports = commentController