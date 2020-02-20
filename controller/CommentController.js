const db = require('../database')

const getCommentByPost = async(req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('select * from comments where id_post = ?', [id_post])
    res.json({
        "success": true,
        "comments": rows
    })
}

const commentController = {
    getCommentByPost
}

module.exports = commentController