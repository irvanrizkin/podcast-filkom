const express = require('express')
const app = express()
const port = 8000
const router = require('./router')

//Connect to Database
require('./database')

app.listen(port, () => {
    console.log("Listen to", port)
})

app.use(express.json())

app.use('/', router)