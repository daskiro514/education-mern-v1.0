const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  category: {
    type: String
  },
  chapter: {
    type: String
  },
  questions: [

  ],
  answers: [

  ],
  score: {
    type: String,
    default: '0'
  },
  state: {
    type: String,
    default: 'Incomplete'
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('result', ResultSchema)