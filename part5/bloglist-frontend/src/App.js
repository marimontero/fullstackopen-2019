import React, { useState, useEffect } from 'react'
import loginService from './services/login.js'
import blogService from './services/blogs.js'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Notification from './components/Notification'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const username = useField('text', 'Username')
  const password = useField('password', 'Password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newError, setNewError ] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.data.value,
        password: password.data.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('Error at login', exception)
      setNewError(true)
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
        setNewError(false)
      }, 5000)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogChange = async (event) => {
    setNewBlog(event.target.value)
  }

  const  handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(response => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : response.data))
      })
  }

  const handleRemoveBlog = (blog) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
        .catch(error => {
          setNotification({
            type: 'error',
            text: `error while deleting blog: ${error.response.data.error}`
          })
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
    }
  }

  return (
    <div className='App'>
      <Notification notification={notification} newError={newError}/>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
        :
        <UserBlogs
          user={user}
          blogs={blogs}
          handleLogOut={handleLogOut}
          newBlog={newBlog}
          setBlogs={setBlogs}
          handleLike={handleLike}
          handleRemoveBlog={handleRemoveBlog}
          handleBlogChange={handleBlogChange}
          setNotification={setNotification}
          setNewError={setNewError}
        />
      }
    </div>
  )
}

export default App
