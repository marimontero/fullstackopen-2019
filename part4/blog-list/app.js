const express = require('express')
const config = require('./utils/config')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')

const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app
