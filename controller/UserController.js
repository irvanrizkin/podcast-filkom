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

const userController = {
    getAllUser
}

module.exports = userController