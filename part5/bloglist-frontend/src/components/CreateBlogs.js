import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'

const CreateBlogs = (props) => {
  const title = useField('text', 'Title')
  const author = useField('text', 'Author')
  const url = useField('text', 'Url')

  const handleSubmit = (event) => {
    event.preventDefault()

    blogService.create({
      title: title.data.value,
      author: author.data.value,
      url: url.data.value
    }, props.token)
      .then(data => {
        props.setBlogs(props.blogs.concat(data))
        title.reset()
        author.reset()
        url.reset()

        props.setNotification('Blog was successfully created')
        setTimeout(() => {
          props.setNotification(null)
        }, 3000)
      })
      .catch(() => {
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
          <input {...title.data}/>
        </div>
        <div>
          <label>Author</label>
          <input {...author.data}/>
        </div>
        <div>
          <label>Url</label>
          <input {...url.data}/>
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

CreateBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  newBlog: PropTypes.string.isRequired,
  handleBlogChange: PropTypes.func.isRequired,
  setNotification: PropTypes.func,
  setNewError: PropTypes.func
}

export default CreateBlogs
