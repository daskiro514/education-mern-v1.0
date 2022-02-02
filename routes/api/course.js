const express = require('express')
const router = express.Router()

// MODEL
const Course = require('../../models/Course')
const Exam = require('../../models/Exam')

router.post('/addNewCourse', async (req, res) => {
  const newCourse = new Course({
    ...req.body
  })

  const exams = req.body.exams
  let examIds = []

  for (var i = 0; i < exams.length; i++) {
    let newExam = new Exam({
      ...exams[i],
      course: newCourse._id
    })
    await newExam.save()
    examIds.push(newExam._id)
  }

  newCourse.exams = examIds

  await newCourse.save()

  res.json({
    success: true
  })
})

router.get('/getCourses', async (req, res) => {
  const courses = await Course.find(req.query).populate('exams')

  res.json({
    success: true,
    courses
  })
})

router.get('/getCourse/:id', async (req, res) => {
  const courseID = req.params.id
  const course = await Course.findById(courseID).populate('exams')

  res.json({
    success: true,
    course
  })
})

router.post('/updateCourse/:id', async (req, res) => {
  const courseID = req.params.id

  const exams = req.body.exams
  let examIds = []

  await Exam.deleteMany({ course: courseID })

  let update = { ...req.body }

  for (var i = 0; i < exams.length; i++) {
    let newExam = new Exam({
      ...exams[i],
      course: courseID
    })
    await newExam.save()
    examIds.push(newExam._id)
  }

  update.exams = examIds

  await Course.findByIdAndUpdate(courseID, update, { new: true })

  res.json({
    success: true
  })
})

router.delete('/deleteCourse/:id', async (req, res) => {
  const courseID = req.params.id
  await Course.findByIdAndDelete(courseID)
  await Exam.deleteMany({ course: courseID })

  res.json({
    success: true
  })
})

module.exports = router