import React, { useState, useEffect } from 'react'
import loginService from './services/login.js'
import blogService from './services/blogs.js'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogChange = async (event) => {
    setNewBlog(event.target.value)
  }

  return (
    <div className="App">
      <Notification notification={notification} newError={newError}/>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        :
        <UserBlogs
          user={user}
          blogs={blogs}
          handleLogOut={handleLogOut}
          newBlog={newBlog}
          setBlogs={setBlogs}
          handleBlogChange={handleBlogChange}
          setNotification={setNotification}
          setNewError={setNewError}
        />
      }
    </div>
  )
}

export default App
