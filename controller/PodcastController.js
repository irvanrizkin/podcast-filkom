const db = require('../database')
const fs = require('fs')
const path = require('path')

const uploadPodcast = async(req, res, next) => {
  const file = req.files.podcast
  const id_post = req.params.id_post
  const id_user = req.user.id_user
  const ext = path.extname(file.name)
  const fileAddress = "uploads/podcasts/" + id_user + "_" + id_post + "_" + 
    file.name
  const [postRow] = await db.query('select * from posts where id = ?', 
    [id_post])
  if (postRow.length > 0) {
    if (ext.localeCompare('.mp3') == 0) {
      const [rows] = await db.query('select * from podcasts where link = ? limit 1',
        fileAddress)
      if (rows.length == 0) {
        file.mv(fileAddress, function(err, result) {
          if (err) {
            res.json({
              "success": false,
              "message": err
            })
          } else {
            db.query('insert into podcasts(link, id_post) values(?, ?)', 
              [fileAddress, id_post])
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
    } else {
      res.status(406)
      const error = new Error("Not support file type except mp3")
      next(error)
    }
  } else {
    res.status(404)
    const error = new Error("Post Not Found")
    next(error)
  }
}

const showPodcastByPost = async(req, res, next) => {
  const id_post = req.params.id_post
  const [rows] = await db.query('select * from podcasts where id_post = ?', 
    [id_post])
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
  const [rows] = await db.query('select * from podcasts where id = ?', 
    [id_podcast])
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

const showPodcastOnHTM = (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.htm'))
}

const streamPodcast = async(req, res, next) => {
  const id_podcast = req.params.id
  const [rows] = await db.query('select * from podcasts where id = ?',
    id_podcast)
  if (rows.length > 0) {
    const path = rows[0].link
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ?
        parseInt(parts[1], 10) :
        fileSize - 1

      if (start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n' +
          start + ' >= ' + fileSize)
        return
      }

      const chunkSize = (end - start) + 1
      const file = fs.createReadStream(path, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
      }

      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg'
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  } else {
    res.status(404)
    const error = new Error("Podcast Not Found")
    next(error)
  }
}

const podcastController = {
  uploadPodcast,
  deletePodcastById,
  showPodcastByPost,
  showPodcastOnHTM,
  streamPodcast
}

module.exports = podcastController