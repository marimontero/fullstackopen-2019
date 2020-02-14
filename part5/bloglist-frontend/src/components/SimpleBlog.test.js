import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {

  const blog = {
    title: 'This is a blog test',
    author: 'Maria Montero',
    likes: 10
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'This is a blog test'
  )

  expect(component.container).toHaveTextContent(
    'Maria Montero'
  )

  expect(component.container).toHaveTextContent(
    10
  )
})

test('clicking the button calls event handler twice', () => {

  const blog = {
    title: 'This is a blog test',
    author: 'Maria Montero',
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
