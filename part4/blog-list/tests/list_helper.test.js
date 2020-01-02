const listHelper = require('../utils/list_helper')
const blogsData = require('../tests/test_data')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('return the sum of all the likes', () => {
    const result = listHelper.totalLikes(blogsData)
    expect(result).toBe(36)
  })

  test('if array is empty, return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('blog with more likes', () => {
    const result = listHelper.favoriteBlog(blogsData)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})
