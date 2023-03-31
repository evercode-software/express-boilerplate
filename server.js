const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { corsConfig } = require('./config')
require('dotenv').config()

const app = express()

app.use(helmet())
app.use(cors(corsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})