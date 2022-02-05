import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Vimeo from '@u-wave/react-vimeo'
import { getCourses } from '../../actions/course'
import { setAlert } from '../../actions/alert'
import { createExamResult, getChapterExamResult } from '../../actions/exam'

const CustomerAcademy = ({ match, getCourses, courses, user, setAlert, createExamResult, getChapterExamResult, result, clientID }) => {
  const history = useHistory()
  const { category, chapter } = match.params

  const [answers, setAnswers] = React.useState([])

  React.useEffect(() => {
    getCourses(category, chapter)
    getChapterExamResult(clientID, category, chapter)
  }, [category, chapter, clientID, getCourses, getChapterExamResult])

  React.useEffect(() => {
    if (courses.length) {
      let _answers = []
      for (var i = 0; i < courses[0].exams.length; i++) {
        let _answer = {
          isRight1: false,
          isRight2: false,
          isRight3: false,
          isRight4: false
        }
        _answers.push(_answer)
      }
      setAnswers(_answers)
    }
  }, [courses])

  const goChapter = (categoryIndex, chapterIndex) => {
    if (categoryIndex + 1 < user.nextCategory) {
      history.push(`/academy/${categoryIndex + 1}/${chapterIndex + 1}`)
    } else if (categoryIndex + 1 === user.nextCategory && chapterIndex + 1 <= user.nextChapter) {
      history.push(`/academy/${categoryIndex + 1}/${chapterIndex + 1}`)
    } else {
      setAlert("You must pass the current chapter exam.", 'danger')
    }
  }

  const setRightAnswer = async (index, key) => {
    answers[index][key] = !answers[index][key]
    await setAnswers([])
    await setAnswers(answers)
  }

  const onSubmit = () => {
    let score = 0
    let examRightAnswers = 0
    let userRightAnswers = 0
    let userAnswers = 0
    for (var i = 0; i < courses[0].exams.length; i++) {
      let exam = courses[0].exams[i]
      let answer = answers[i]
      for (var key in answer) {
        if (exam[key] === true) {
          examRightAnswers++
          if (answer[key] === true) {
            userRightAnswers++
          }
        }
        if (answer[key] === true) {
          userAnswers++
        }
      }
    }
    score = userRightAnswers / (examRightAnswers + userAnswers - userRightAnswers) * 100

    let state = 'Incomplete'
    if (score > 70) {
      state = 'Completed'
      setAlert('Congratulations! You passed the exam.', 'success')
    } else {
      setAlert('You did not pass the exam. Try again', 'warning')
    }

    let formData = {
      score,
      category,
      chapter,
      client: user._id,
      state
    }
    createExamResult(formData, history)
  }

  return (
    <div className='row admin-academy bg-pure-gold-grey py-4'>
      <div className='col-lg-12'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='font-24 font-bold'>Academy </div>
          <div className='row pt-4'>
            <div className='col-lg-3 col-md-5 border-right'>
              {['READY', 'SET', 'LAUNCH'].map((item, index) =>
                <div key={index} className='pb-4'>
                  <div className='font-18 font-bold'>
                    {item}
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((chapterItem, chapterIndex) =>
                    <div key={chapterIndex} to={`/academy/${index + 1}/${chapterItem}`} onClick={() => goChapter(index, chapterIndex)}>
                      <div className={'rounded-lg cursor-pointer font-16 pl-1 ' + ((index + 1) === Number(category) && chapterItem === Number(chapter) ? 'bg-pure-gold-brown ' : '') + (index + 1 < user.nextCategory ? '' : (index + 1 === user.nextCategory && chapterIndex + 1 <= user.nextChapter ? '' : 'cursor-disabled'))}>
                        <i className='fa fa-caret-right'></i> Chapter {chapterItem}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='col-lg-9 col-md-7'>
              {courses.length === 0 ? <div>There is no course in this chapter.</div> : null}
              {courses.map((course, index) =>
                <div key={index}>
                  <div className='font-18 font-bold text-center'>{course.title}</div>
                  <div className='font-18 pt-3 text-justify course-description'>
                    {course.description}
                  </div>
                  <div className="text-center p-1 pt-3">
                    <Vimeo
                      video={course.video}
                      responsive={true}
                    />
                  </div>
                </div>
              )}
              {answers.map((item, index) =>
                (courses.length === 1 && answers.length === courses[0].exams.length) ?
                  <div key={index} className='my-3'>
                    <div>Question {index + 1}: {courses[0].exams[index].question}</div>
                    <div className='row my-2'>
                      <div className='col-md-3'>
                        <div
                          className={'cursor-pointer p-2 rounded-lg bg-pure-gold-grey1 ' + (item.isRight1 ? 'bg-pure-gold-brown ' : '')}
                          onClick={() => setRightAnswer(index, "isRight1")}
                        >a) {courses[0].exams[index].answer1}</div>
                      </div>
                      <div className='col-md-3'>
                        <div
                          className={'cursor-pointer p-2 rounded-lg bg-pure-gold-grey1 ' + (item.isRight2 ? 'bg-pure-gold-brown ' : '')}
                          onClick={() => setRightAnswer(index, "isRight2")}
                        >b) {courses[0].exams[index].answer2}</div>
                      </div>
                      <div className='col-md-3'>
                        <div
                          className={'cursor-pointer p-2 rounded-lg bg-pure-gold-grey1 ' + (item.isRight3 ? 'bg-pure-gold-brown ' : '')}
                          onClick={() => setRightAnswer(index, "isRight3")}
                        >c) {courses[0].exams[index].answer3}</div>
                      </div>
                      <div className='col-md-3'>
                        <div
                          className={'cursor-pointer p-2 rounded-lg bg-pure-gold-grey1 ' + (item.isRight4 ? 'bg-pure-gold-brown ' : '')}
                          onClick={() => setRightAnswer(index, "isRight4")}
                        >d) {courses[0].exams[index].answer4}</div>
                      </div>
                    </div>
                  </div>
                  : null
              )}
              {courses.length > 0 ?
                result ?
                  <div className='text-center my-4 h4 color-brown'>
                    You have already passed this quiz
                  </div>
                  :
                  <div className='text-center my-4' onClick={() => onSubmit()}>
                    <button className='btn bg-pure-gold-brown'>
                      Submit
                    </button>
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  user: state.auth.user,
  result: state.exam.result,
  clientID: state.auth.user._id
})

export default connect(mapStateToProps, { getCourses, setAlert, createExamResult, getChapterExamResult })(CustomerAcademy)