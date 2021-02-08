const express = require('express')
const massive = require('massive')
require('dotenv').config()

const app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((db) => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => console.log(err))

//ENDPOINTS

app.use(express.json())

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})