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
  let result = _result ? _result : false

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

  for (var i = 0; i < _results.length; i++) {
    let _result = _results[i]
    results[_result.category - 1][_result.chapter - 1] = _result
  }

  res.json({
    success: true,
    results
  })
})

router.post('/updateClientExamResult', async (req, res) => {
  let target = {
    client: req.body.client,
    category: req.body.category,
    chapter: req.body.chapter
  }
  let update = {
    state: req.body.state,
    score: req.body.score
  }
  await Result.findOneAndUpdate(target, update, {new: true})

  res.json({
    success: true
  })
})

module.exports = router