const db = require('../database')
const fs = require('fs')
const path = require('path')

const uploadImage = async(req, res, next) => {
  const file = req.files.image
  const id_post = req.params.id_post
  const id_user = req.user.id_user
  const ext = path.extname(file.name)
	const fileAddress = "uploads/images/" + id_user + "_" + id_post + "_" + 
		file.name
	const [postRow] = await db.query('select * from posts where id = ?', 
		[id_post])
  if (postRow.length > 0) {
    if (ext.localeCompare('.jpg') == 0 || ext.localeCompare('.jpeg') == 0 ||
      ext.localeCompare('.png') == 0) {
			const [rows] = await db.query('select * from images where link = ? limit 1', 
				[fileAddress])
      if (rows.length == 0) {
        file.mv(fileAddress, function(err, result) {
          if (err) {
            res.json({
              "success": false,
              "message": err
            })
          } else {
						db.query('insert into images(link, id_post) values(?, ?)', 
							[fileAddress, id_post])
            res.json({
              "success": true,
              "message": "File uploaded",
              "link": fileAddress
            })
          }
        })
      } else {
        res.status(409)
        const error = new Error("Image already exist")
        next(error)
      }
    } else {
      res.status(406)
      const error = new Error("Not support file type except jpg, jpeg, png")
      next(error)
    }
  } else {
    res.status(404)
    const error = new Error("Post Not Found")
    next(error)
  }
}

const showImageByPost = async(req, res, next) => {
  const id_post = req.params.id_post
	const [rows] = await db.query('select * from images where id_post = ?', 
		[id_post])
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
	const [rows] = await db.query('select * from images where id = ?', 
		[id_image])
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

const showImageOnHTM = (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'image.htm'))
}

const showImageOnSrc = async(req, res, next) => {
  const id = req.params.id
  const [rows] = await db.query('select * from images where id = ?', [id])
  if (rows.length > 0) {
    const source = rows[0].link
    const file = fs.createReadStream(source)
    const head = {

    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    res.status(404)
    const error = new Error("Image Not Found")
    next(error)
  }
}

const imageController = {
  uploadImage,
  showImageByPost,
  deleteImageById,
  showImageOnHTM,
  showImageOnSrc
}

module.exports = imageController