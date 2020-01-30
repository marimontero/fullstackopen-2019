import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemoveBlog }) => {

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  if(!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        style={blogStyle}>
        {blog.title}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p onClick={() => setExpanded(false)}>{blog.title}</p>
      <a href={blog.url} alt={blog.title}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
      <p>added by {blog.author}</p>
      <button onClick={() => handleRemoveBlog(blog)}>Remove</button>
    </div>
  )
}

export default Blog