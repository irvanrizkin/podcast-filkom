const db = require('../database')


const getAllUser = async(req, res, next) => {
    try {
        const [rows] = await db.query('select * from users')
        res.json({
            "success": true,
            "data": rows
        })
    } catch (err) {
        next(err)
    }
}

const getUserById = async(req, res, next) => {
    const id = req.params.id
    const [rows] = await db.query('select * from users where id = ?', [id])
    if (rows.length > 0) {
        res.json({
            "success": true,
            "user": rows[0]
        })
    } else {
        res.status(404)
        const error = new Error("User Not Found")
        next(error)
    }
}

const updateUserName = (req, res, next) => {
    const id = req.params.id
    const newName = req.body.newName
    db.query('update users set name = ? where id ?', [newName, id])
        .then(() => {
            res.json({
                "success": true,
                "message": id + "user name changed to" + newName
            })
        })
        .catch(() => {
            res.status(404)
            const error = new Error("User Not Found")
            next(error)
        })
}

const deleteUser = async(req, res, next) => {
    const id = req.params.id
    const [rows] = await db.query('select * from users where id = ?', [id])
    if (rows.length > 0) {
        db.query('delete from users where id = ?', [id])
        res.json({
            "success": true,
            "message": "deleted user id " + id
        })
    } else {
        res.status(404)
        const error = new Error("User Not Found")
        next(error)
    }
}


const userController = {
    getAllUser,
    getUserById,
    updateUserName,
    deleteUser
}

module.exports = userController