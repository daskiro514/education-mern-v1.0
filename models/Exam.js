const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course'
  },
  question: {
    type: String
  },
  answer: {
    type: String
  },
})

module.exports = mongoose.model('exam', ExamSchema)