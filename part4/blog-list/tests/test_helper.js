const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Miquel Marti i Pol',
    url: 'http://htmliseasy.com',
    likes: 3
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Lluis Companys',
    url: 'http://browserCanExecuteOnlyJavascript.com',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}