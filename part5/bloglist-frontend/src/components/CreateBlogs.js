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
        props.setNotification('Blog was successfully created')
        setTimeout(() => {
          props.setNotification(null)
        }, 3000)
      })
      .catch(error => {
        props.setNewError(true)
        props.setNotification('Error, could not create Blog post')
        setTimeout(() => {
          props.setNotification(null)
          props.setNewError(false)
        }, 5000)
      })
  }

  return(
    <div>
      <h3>Create a blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>Url</label>
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default CreateBlogs
