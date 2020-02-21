const db = require('../database')
const fs = require('fs')

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
        res.status(404)
        const error = new Error("Image Not Found At id_post " + id_post)
        next(error)
    }
}

const deleteImageById = async(req, res, next) => {
    const id_image = req.params.id
    const [rows] = await db.query('select * from images where id = ?', [id_image])
    if (rows.length > 0) {
        db.query('delete from images where id = ?', [id_image])
        fs.unlinkSync(rows[0].link)
        res.json({
            "success": true,
            "id_image": id_image,
            "message": "deleted"
        })
    } else {
        res.status(404)
        const error = new Error("Image Not Found")
        next(error)
    }
}

const imageController = {
    uploadImage,
    showImageByPost,
    deleteImageById
}

module.exports = imageController