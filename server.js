require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { db } = require('./config/db')

const app = express()


app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))


const router = require('./routes/')
app.use(router)

const PORT = process.env.PORT || 6565
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})