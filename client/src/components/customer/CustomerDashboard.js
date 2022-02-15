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
        let _answer = ''
        _answers.push(_answer)
      }
      setAnswers(_answers)
    }
  }, [courses])

  const goChapter = (categoryIndex, chapterIndex) => {
    history.push(`/academy/${categoryIndex + 1}/${chapterIndex + 1}`)
  }

  const setRightAnswer = (index, answer) => {
    let _answers = [...answers]
    _answers[index] = answer
    setAnswers(_answers)
  }

  const onSubmit = () => {
    let questions = []
    
    for (var i = 0; i < answers.length; i++) {
      let answer = answers[i]
      if (answer === '') {
        setAlert('You should insert the answer.', 'warning')
        return
      }
      let question = courses[0].exams[i].question
      questions.push(question)
    }

    let formData = {
      category,
      chapter,
      client: user._id,
      state: 'Pending',
      questions,
      answers
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
                      <div className={'rounded-lg cursor-pointer font-16 pl-1 ' + ((index + 1) === Number(category) && chapterItem === Number(chapter) ? 'bg-pure-gold-brown ' : '')}>
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
                    <div>Question {index + 1}: </div>
                    <div className='ml-3 text-info'>{courses[0].exams[index].question}</div>
                    <div>Answer: </div>
                    <div className='ml-3'>
                      <input
                        className='form-control'
                        value={item}
                        onChange={e => setRightAnswer(index, e.target.value)}
                      />
                    </div>
                  </div>
                  : null
              )}
              {courses.length > 0 ?
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