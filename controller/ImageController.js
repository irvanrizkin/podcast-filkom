const db = require('../database')
const path = require('path')

const uploadImage = async(req, res, next) => {
    const file = req.files.image
    const id_post = req.params.id_post
    const fileAddress = "uploads/images/" + file.name
    const [rows] = await db.query('select * from images where link = ? limit 1', [fileAddress])
    if (rows.length == 0) {
        file.mv(fileAddress, function(err, result) {
            if (err) {
                res.json({
                    "success": false,
                    "message": err
                })
            } else {
                db.query('insert into images(link, id_post) values(?, ?)', [fileAddress, id_post])
                res.json({
                    "success": true,
                    "message": "File uploaded"
                })
            }
        })
    } else {
        const error = new Error("Image already exist")
        next(error)
    }
}

const showImageByPost = async(req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('select * from images where id_post = ?', [id_post])
    if (rows.length > 0) {
        res.json({
            "success": true,
            "images": rows
        })
    } else {
        res.json({
            "success": false,
            "message": "Image Not Found"
        })
    }
}

const imageController = {
    uploadImage,
    showImageByPost
}

module.exports = imageController