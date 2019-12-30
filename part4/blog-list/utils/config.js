require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = `mongodb+srv://marimontero:${process.env.MONGODB_URI}@cluster0-tnsll.mongodb.net/test?retryWrites=true&w=majority`

module.exports = {
  PORT,
  MONGODB_URI
}
