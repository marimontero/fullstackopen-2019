import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const mockHandler = jest.fn()

  const blog = {
    author: 'Maria Montero',
    title: 'First test of React',
    url: 'www.mjm.com',
    likes: 8,
    user: {
      username: 'marimontero19',
      name: 'Maria Montero',
      id: '5d4567bed2b41c742240fa67'
    },
    id: '5d6d0c01dda6a862eaa2d3da'
  }

  const user = {
    blogs: [],
    username: 'Anna Joan',
    name: 'Anna Joan',
    id: '5d4567f5d2b41c765540fa68'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockHandler}
        handleRemoveBlog={mockHandler}
      />
    )
  })

  test('blog is not expanded', () => {
    const fullBlog = component.container.querySelector('.full-blog')
    expect(fullBlog).toBeNull()
  })

  test('blog is expanded', () => {
    const summaryBlog = component.container.querySelector('.summary-blog')
    fireEvent.click(summaryBlog)

    const fullBlog = component.container.querySelector('.full-blog')
    expect(fullBlog).not.toBeNull()
  })
})
