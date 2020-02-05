const blogs = [
  {
    id: '5e34411d5ded3ab6ffcfb498',
    title: 'Test 4',
    author: 'Test 4',
    likes: 0,
    user: {
      _id: '5e3abe9916995fd23a7e680d',
      username: 'mluukkai19',
      name: 'test'
    }
  },
  {
    id: '5e3423a61ac354b637629bf2',
    title: 'test 2',
    author: 'tes',
    likes: 4,
    user: {
      _id: '5e3abe9916995fd23a7e680d',
      username: 'mluukkai19',
      name: 'test'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
