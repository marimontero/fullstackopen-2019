import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogs = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    blogService.create({title, author, url}, props.token)
      .then(data => {
        props.setBlogs(props.blogs.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  return(
    <div>
      <h3>Create a blog</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <label>Author</label>
        <input
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
        <label>Url</label>
        <input
          value={url}
          onChange={event => setUrl(event.target.value)}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default CreateBlogs
