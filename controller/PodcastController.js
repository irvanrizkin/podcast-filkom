const db = require('../database')
const fs = require('fs')
const path = require('path')

const uploadPodcast = async(req, res, next) => {
    const file = req.files.podcast
    const id_post = req.params.id_post
    const id_user = req.user.id_user
    const fileAddress = "uploads/podcasts/" + id_user + "_" + id_post + "_" + file.name
    const [rows] = await db.query('select * from podcasts where link = ? limit 1', fileAddress)
    if (rows.length == 0) {
        file.mv(fileAddress, function(err, result) {
            if (err) {
                res.json({
                    "success": false,
                    "message": err
                })
            } else {
                db.query('insert into podcasts(link, id_post) values(?, ?)', [fileAddress, id_post])
                res.json({
                    "success": true,
                    "link": fileAddress,
                    "message": "Podcast uploaded"
                })
            }
        })
    } else {
        res.status(409)
        const error = new Error("Podcast already exist")
        next(error)
    }
}

const showPodcastByPost = async(req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('select * from podcasts where id_post = ?', [id_post])
    if (rows.length > 0) {
        res.json({
            "success": true,
            "podcasts": rows
        })
    } else {
        res.status(404)
        const error = new Error("Podcast Not Found At id_post " + id_post)
        next(error)
    }
}

const deletePodcastById = async(req, res, next) => {
    const id_podcast = req.params.id
    const [rows] = await db.query('select * from podcasts where id = ?', [id_podcast])
    if (rows.length > 0) {
        db.query('delete from podcasts where id = ?', [id_podcast])
        fs.unlinkSync(rows[0].link)
        res.json({
            "success": true,
            "id_podcast": id_podcast,
            "message": "deleted"
        })
    } else {
        res.status(404)
        const error = new Error("Podcast Not Found")
        next(error)
    }
}

// const streamPodcast = (req,res) => {
//     res.sendFile()
// }

const podcastController = {
    uploadPodcast,
    deletePodcastById,
    showPodcastByPost
}

module.exports = podcastController