const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs are defined with an unique id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'New methods in code',
      author: 'Maria Jose Montero',
      url: 'www.fullstackopen.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain('New methods in code')
  })

  test('if likes property is missing, it will get value 0', async () => {
    const newBlog = {
      title: 'New methods in code',
      author: 'Maria Jose Montero',
      url: 'www.fullstackopen.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).not.toContain(undefined)
  })
})

describe('when there is required info missing', () => {
  test('when url and title are missing it should return 400', async () => {
    const newBlog = {
      author: 'Maria Jose Montero',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    const contents = blogsAtEnd.map(r => r.id)
    expect(contents).not.toContain(blogToDelete.id)
  })
})

describe('when a blog is updated', () => {
  test('updating the information of an individual post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.title = 'New title'
    blogToUpdate.url = 'www.new-url.com'
    blogToUpdate.author = 'New author'
    blogToUpdate.likes = 10

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    expect(blogsAtStart[0].title).toBe('New title')
    expect(blogsAtStart[0].url).toBe('www.new-url.com')
    expect(blogsAtStart[0].author).toBe('New author')
    expect(blogsAtStart[0].likes).toBe(10)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
