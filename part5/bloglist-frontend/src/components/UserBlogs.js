import React from 'react'
import Blog from './Blog'

const UserBlogs = (props) => (
  <div>
    <h2>Blogs</h2>
    <span>{props.user.name} logged in</span>
    <button onClick={props.handleLogOut}>
      Logout
    </button>
    <div style={{marginTop: "10px"}}>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
)

export default UserBlogs