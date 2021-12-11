const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  category: {
    type: String
  },
  chapter: {
    type: String
  },
  description: {
    type: String
  },
  video: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('course', CourseSchema)