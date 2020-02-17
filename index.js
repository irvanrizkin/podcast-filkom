const express = require('express')
const app = express()
const port = 101

//Connect to Database
db = require('./database')

app.listen(port, () => {
    console.log("Listen to", port)
})

app.use(express.json)