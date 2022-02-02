const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course'
  },
  question: {
    type: String
  },
  answer1: {
    type: String
  },
  isRight1: {
    type: Boolean
  },
  answer2: {
    type: String
  },
  isRight2: {
    type: Boolean
  },
  answer3: {
    type: String
  },
  isRight3: {
    type: Boolean
  },
  answer4: {
    type: String
  },
  isRight4: {
    type: Boolean
  }
})

module.exports = mongoose.model('exam', ExamSchema)