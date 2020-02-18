const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

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

const registerUser = async(req, res, next) => {
    const nim = req.body.nim
    const name = req.body.name
    const nimString = nim.toString()
    const isNim = nimString.length == 15 && validator.isNumeric(nimString)
    if (isNim) {
        const [rows] = await db.query('select * from users where nim = ? limit 1', [nim])
        if (rows.length == 0) {
            const angkatan = "20" + nimString.slice(0, 2)
            var prodi = ""
            switch (nimString.slice(5, 7)) {
                case "02":
                    prodi = "Teknik Informatika"
                    break;
                case "03":
                    prodi = "Teknik Komputer"
                    break;
                case "04":
                    prodi = "Sistem Informasi"
                    break;
                case "06":
                    prodi = "Pendidikan Teknologi Informasi"
                    break;
                case "07":
                    prodi = "Teknologi Informasi"
                    break;
                default:
                    res.status(406)
                    const error = new Error("Invalid NIM")
                    next(error)
                    break;
            }
            const password = req.body.password
            const hashedPassword = await bcrypt.hash(password, 10)
            db.query('insert into users(nim, name, password, angkatan, prodi) values(?, ?, ?, ?, ?)', [nim, name, hashedPassword, angkatan, prodi])
                .then(() => {
                    res.json({
                        "success": true,
                        "nim": nim,
                        "name": name,
                        "angkatan": angkatan,
                        "prodi": prodi,
                        "password": hashedPassword,
                        "message": "Register success"
                    })
                })
                .catch((err) => {
                    res.status(500)
                    res.json({
                        "success": false,
                        "error": err
                    })
                })
        } else {
            res.status(406)
            const error = new Error("NIM already registered")
            next(error)
        }
    } else {
        res.status(406)
        const error = new Error("Incorrect NIM")
        next(error)
    }
}

const userController = {
    getAllUser,
    getUserById,
    updateUserName,
    deleteUser,
    registerUser
}

module.exports = userController