const express = require('express')
const router = express.Router()

// MODEL
const User = require('../../models/User')
const Result = require('../../models/Result')

router.post('/createExamResult', async (req, res) => {
  let nextChapter = Number(req.body.chapter) + 1
  let nextCategory = Number(req.body.category)
  if (nextChapter > 10) {
    nextChapter = 1
    nextCategory++
  }

  await User.findByIdAndUpdate(req.body.client, {
    nextCategory,
    nextChapter
  }, { new: true })

  const newResult = new Result({ ...req.body })
  await newResult.save()

  res.json({
    success: true,
    nextCategory,
    nextChapter
  })
})

router.get('/getChapterExamResult', async (req, res) => {
  const chapter = req.query.chapter
  const category = req.query.category
  const clientID = req.query.clientID

  const _result = await Result.findOne({ chapter, category, client: clientID })
  let result = _result ? true : false

  res.json({
    success: true,
    result
  })
})

router.get('/getClientExamResults/:id', async (req, res) => {
  const clientID = req.params.id

  let results = []
  for (var i = 0; i < 3; i++) {
    let chapterResults = []
    for (var j = 0; j < 10; j++) {
      let chapterResult = {
        state: 'Incomplete',
        score: ''
      }
      chapterResults.push(chapterResult)
    }
    results.push(chapterResults)
  }

  const _results = await Result.find({ client: clientID })
  const categoryLength = Math.floor(_results.length / 10)
  const chapterLength = _results.length % 10

  for (var i = 0; i < categoryLength; i++) {
    for (var j = 0; j < 10; j++) {
      results[i][j].state = _results[i * 10 + j].state
      results[i][j].score = _results[i * 10 + j].score
    }
  }
  for (var i = 0; i < chapterLength; i++) {
    results[categoryLength][i].state = _results[categoryLength * 10 + i].state
    results[categoryLength][i].score = _results[categoryLength * 10 + i].score
  }

  res.json({
    success: true,
    results
  })
})

module.exports = router