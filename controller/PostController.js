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

const postController = {
    getPostById
}

module.exports = postController