const express = require('express')
const massive = require('massive')
const ctrl = require('./products_controller')
require('dotenv').config()

const app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
    })
        .then((db) => {
            app.set('db', db)
            console.log('db connected')
        })
        .catch(err => console.log(err))

app.use(express.json())

//ENDPOINTS
app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})
