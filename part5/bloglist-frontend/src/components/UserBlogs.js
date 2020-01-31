import React, { useState } from 'react'
import Blog from './Blog'
import CreateBlogs from './CreateBlogs'

const LoginFormContainer = (props) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Create Blog</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

const UserBlogs = (props) => (
  <div>
    <div>
      <h2>Blogs</h2>
      <span>{props.user.name} logged in</span>
      <button onClick={props.handleLogOut}>
        Logout
      </button>
      <LoginFormContainer>
        <CreateBlogs
          blogs={props.blogs}
          setBlogs={props.setBlogs}
          newBlog={props.newBlog}
          handleBlogChange={props.handleBlogChange}
          setNotification={props.setNotification}
          setNewError={props.setNewError}
        />
      </LoginFormContainer>
    </div>
    <div style={{ marginTop:'10px' }}>
      {props.blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
            handleLike={props.handleLike}
            handleRemoveBlog={props.handleRemoveBlog}
          />
        )
      }
    </div>
  </div>
)

export default UserBlogs