const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })

  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password === undefined) {
      return response
        .status(400)
        .json({ error: '`password` is required' })
    }

    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'Password must be at least 3 characters long' })
    }

    if (body.username === undefined) {
      return response
        .status(400)
        .json({ error: '`username` is required' })
    }

    if (body.username.length < 3) {
      return response
        .status(400)
        .json({ error: 'Username must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
