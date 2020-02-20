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
    db.query('insert into posts(id_user, content) values(?, ?)', [id_user, content])
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

const updatePost = (req, res, next) => {
    const id_post = req.params.id_post
    const content = req.body.content
    db.query('update posts set content = ? where id = ?', [content, id_post])
        .then(() => {
            res.json({
                "success": true,
                "id_post": id_post,
                "content": content,
                "message": "Post Updated"
            })
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err
            })
        })
}

const deletePostById = (req, res, next) => {
    const id_post = req.params.id_post
    const id_user = req.params.id_user
    db.query('delete from posts where id = ? and id_user = ?', [id_post, id_user])
        .then((results) => {
            if (results.affectedRows = 0) {
                res.status(404)
                res.json({
                    "success": false,
                    "message": "Post Not Found"
                })
            } else {
                res.json({
                    "success": true,
                    "post": id_post + " deleted from user " + id_user
                })
            }
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err
            })
        })
}



const postController = {
    getPostById,
    postAPost,
    updatePost,
    deletePostById
}

module.exports = postController