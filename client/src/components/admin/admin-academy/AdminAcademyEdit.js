import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { updateCourse, getCourseByID } from '../../../actions/course'
import { setAlert } from '../../../actions/alert'

const AdminAcademyEdit = ({ match, updateCourse, getCourseByID, course, setAlert }) => {
  const courseID = match.params.id
  const history = useHistory()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [category, setCategory] = React.useState('1')
  const [chapter, setChapter] = React.useState('1')
  const [video, setVideo] = React.useState('')

  const [exams, setExams] = React.useState([])
  const [examEdit, setExamEdit] = React.useState(false)
  const [examIndex, setExamIndex] = React.useState(0)
  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')

  React.useEffect(() => {
    getCourseByID(courseID)
  }, [getCourseByID, courseID])

  React.useEffect(() => {
    setTitle(course.title)
    setDescription(course.description)
    setCategory(course.category)
    setChapter(course.chapter)
    setVideo(course.video)
    setExams(course.exams ? course.exams : [])
  }, [course])

  const onSubmit = e => {
    e.preventDefault()
    let formData = { title, description, category, chapter, video, exams }
    if (exams.length < 1) {
      setAlert('You should set one quiz at least.', 'warning')
      return
    }
    updateCourse(history, courseID, formData)
  }

  const saveExam = () => {
    const _exam = {
      question,
      answer,
    }
    if (question === '' || answer === '') {
      setAlert('Invalid Inputs', 'warning')
    } else {
      let _exams = [...exams]
      _exams.push(_exam)
      setExams(_exams)
      setDefault()
    }
  }

  const editExam = (item, index) => {
    setExamIndex(index)
    setQuestion(item.question)
    setAnswer(item.answer)
    setExamEdit(true)
  }

  const updateExam = () => {
    const _exam = {
      question,
      answer,
    }
    if (question === '' || answer === '') {
      setAlert('Invalid Inputs', 'warning')
    } else {
      let _exams = [...exams]
      _exams.splice(examIndex, 1, _exam)
      setExams(_exams)
      setDefault()
    }
  }

  const deleteExam = index => {
    if (window.confirm('Are you sure?')) {
      let _exams = [...exams]
      _exams.splice(index, 1)
      setExams(_exams)
    }
  }

  const setDefault = () => {
    setQuestion('')
    setAnswer('')
    setExamEdit(false)
    setExamIndex(0)
  }

  return (
    <div className='admin-academy-create'>
      <div>
        <div className='font-36 pt-3'>Edit Course</div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <label className='manual-shadow'>Course Title</label>
                <input
                  className='form-control manual-input'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Description</label>
                <textarea
                  className='form-control manual-input'
                  rows={7}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Category</label>
                <div className='input-group mb-3'>
                  <select required className='form-control' onChange={e => setCategory(e.target.value)} value={category}>
                    <option value={'1'}>Ready</option>
                    <option value={'2'}>Set</option>
                    <option value={'3'}>Launch</option>
                  </select>
                  <select required className='form-control' onChange={e => setChapter(e.target.value)} value={chapter}>
                    <option value={'1'}>Chapter 1</option>
                    <option value={'2'}>Chapter 2</option>
                    <option value={'3'}>Chapter 3</option>
                    <option value={'4'}>Chapter 4</option>
                    <option value={'5'}>Chapter 5</option>
                    <option value={'6'}>Chapter 6</option>
                    <option value={'7'}>Chapter 7</option>
                    <option value={'8'}>Chapter 8</option>
                    <option value={'9'}>Chapter 9</option>
                    <option value={'10'}>Chapter 10</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Video Link (Vimeo)</label>
                <input
                  className='form-control manual-input'
                  value={video}
                  onChange={e => setVideo(e.target.value)}
                  required
                />
              </div>
              <div className='font-24 font-bold my-3'>
                QUIZ
              </div>
              <div className='font-18 font-bold my-2'>
                Add Question
              </div>
              <div className='form-group'>
                <label>Question</label>
                <input
                  className='form-control manual-input'
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <label className='mb-0'>Answer</label>
                    <div className='input-group'>
                      <input
                        className="form-control"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 mt-4'>
                    <input
                      type='button'
                      className='form-control bg-pure-gold-brown'
                      onClick={() => {
                        if (examEdit)
                          updateExam()
                        else
                          saveExam()
                      }}
                      value={examEdit ? 'Update Question' : 'Save Question'}
                      />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                {exams.map((item, index) =>
                  <div key={index}>
                    <div className='font-bold'>Question {index + 1}</div>
                    <div className='my-2'>{item.question}</div>
                    <div className='ml-2 font-bold'>Answer</div>
                    <div className='ml-2 my-2'>{item.answer}</div>
                    <div className='text-right'>
                      <input type='button' value='UPDATE' className='btn btn-sm mx-1 bg-pure-gold-brown' onClick={() => editExam(item, index)} />
                      <input type='button' value='DELETE' className='btn btn-sm mx-1 bg-pure-gold-grey2 text-white' onClick={() => deleteExam(index)} />
                    </div>
                    <hr />
                  </div>
                )}
              </div>
              <div className='text-center my-5'>
                <button type='submit' className='btn px-5 bg-pure-gold-brown'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  course: state.course.course
})

export default connect(mapStateToProps, { updateCourse, getCourseByID, setAlert })(AdminAcademyEdit)