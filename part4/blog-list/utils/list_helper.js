const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum,blog) => blog.likes ? sum + blog.likes : sum + 0, 0)
}

const favoriteBlog = (blogs) => {
  let likes = 0
  let mostLikes = {}

  blogs.forEach((blog) => {
    if (blog.likes > likes) {
      likes = blog.likes
      mostLikes = blog
    }
  })

  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
