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

const userController = {
    getAllUser,
    getUserById
}

module.exports = userController