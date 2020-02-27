require('dotenv').config()
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

const updateUserName = async(req, res, next) => {
  const id = req.params.id
  const newName = req.body.name
  const [rows] = await db.query('select * from users where id = ?', [id])
  if (rows.length > 0) {
  db.query('update users set name = ? where id = ?', [newName, id])
  res.json({
    "success": true,
    "message": "id_user " + id + " has been updated to " + newName
  })
  } else {
  res.status(404)
  const error = new Error("User Not Found")
  next(error)
  }
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
  const email = req.body.email
  const name = req.body.name
  const isEmail = validator.isEmail(email)
  if (isEmail) {
	const [rows] = await db.query('select * from users where email = ? limit 1', 
		[email])
  if (rows.length == 0) {
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 10)
		db.query('insert into users(email, name, password) values(?, ?, ?)', 
			[email, name, hashedPassword])
    .then(() => {
      res.json({
      "success": true,
      "email": email,
      "name": name,
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
    res.status(409)
    const error = new Error("Email already registered")
    next(error)
  }
  } else {
  res.status(406)
  const error = new Error("Incorrect Email")
  next(error)
  }
}

const loginUser = async(req, res, next) => {
  const email = req.body.email
  const [rows] = await db.query('select * from users where email = ?', [email])
  if (rows.length != 0) {
  const user = rows[0]
  const password = req.body.password
  const isVerified = await bcrypt.compare(password, user.password)
  if (isVerified) {
    const payload = {
    "id_user": user.id,
    "email": user.email
    }
    const token = await jwt.sign(payload, JWT_KEY)
    if (token) {
    res.json({
      "success": true,
      "token": token
    })
    } else {
    res.status(502)
    const error = new Error("JWT Error, can't create token")
    next(error)
    }
  } else {
    res.status(406)
    const error = new Error("Wrong Password")
    next(error)
  }
  } else {
  res.status(404)
  const error = new Error("User Not Registered")
  next(error)
  }
}

const userController = {
  getAllUser,
  getUserById,
  updateUserName,
  deleteUser,
  registerUser,
  loginUser
}

module.exports = userController
