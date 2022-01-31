import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { addNewCourse } from '../../../actions/course'

const AdminAcademyCreate = ({ match, addNewCourse }) => {
  const history = useHistory()
  const propsCategory = match.params.category
  const propsChapter = match.params.chapter

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: '1',
    chapter: '1',
    video: ''
  })

  const { title, description, category, chapter, video } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    setFormData({
      title: '',
      description: '',
      category: propsCategory,
      chapter: propsChapter,
      video: ''
    })
  }, [propsCategory, propsChapter])

  const onSubmit = e => {
    e.preventDefault()
    addNewCourse(history, formData)
  }

  return (
    <div className='admin-academy-create'>
      <div>
        <div className='font-36 pt-3'>New Course</div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <label className='manual-shadow'>Course Title</label>
                <input
                  type='text'
                  className='form-control manual-input'
                  name='title'
                  value={title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Description</label>
                <textarea
                  type='text'
                  className='form-control manual-input'
                  name='description'
                  rows={7}
                  value={description}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='manual-shadow'>Category</label>
                <div className='input-group mb-3'>
                  <select required className='form-control' name='category' onChange={onChange} value={category}>
                    <option value={'1'}>Ready</option>
                    <option value={'2'}>Set</option>
                    <option value={'3'}>Launch</option>
                  </select>
                  <select required className='form-control' name='chapter' onChange={onChange} value={chapter}>
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
                  type='text'
                  className='form-control manual-input'
                  name='video'
                  value={video}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='text-center mt-5'>
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

})

export default connect(mapStateToProps, { addNewCourse })(AdminAcademyCreate)