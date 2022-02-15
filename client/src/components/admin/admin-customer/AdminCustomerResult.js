import React from "react"
import { connect } from "react-redux"
import { getClient, deleteClient } from "../../../actions/client"
import { useHistory } from "react-router-dom"
import { getChapterExamResult, updateClientExamResult } from "../../../actions/exam"

const AdminCustomerResult = ({ match, client, getClient, getChapterExamResult, updateClientExamResult, result }) => {
  const clientID = match.params.id
  const category = match.params.category
  const chapter = match.params.chapter
  const history = useHistory()
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    getClient(clientID)
    getChapterExamResult(clientID, category, chapter)
  }, [clientID, category, chapter, getClient, getChapterExamResult])

  const [rightAnswers, setRightAnswers] = React.useState([])

  React.useEffect(() => {
    if (result.answers.length > 0) {
      let _rightAnswers = []
      for (var i = 0; i < result.answers.length; i++) {
        _rightAnswers.push(false)
      }
      setRightAnswers(_rightAnswers)
    }
  }, [result])

  const toggleRightAnswer = (index, isRight) => {
    let _rightAnswers = [...rightAnswers]
    _rightAnswers[index] = isRight
    setRightAnswers(_rightAnswers)
  }

  React.useEffect(() => {
    let totalIsTrueNumber = 0
    for (var i = 0; i < rightAnswers.length; i++) {
      if (rightAnswers[i] === true) totalIsTrueNumber++
    }
    let _score = Math.round(totalIsTrueNumber / rightAnswers.length * 100)
    setScore(_score)
  }, [rightAnswers])

  const onSubmit = () => {
    updateClientExamResult({
      client: clientID,
      state: 'Completed',
      score,
      category,
      chapter
    }, history)
  }

  return (
    <div className='row admin-customers bg-pure-gold-grey py-4'>
      <div className='col-lg-12'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='row mb-3'>
            <div className='col-lg-6'>
              <div className='font-24 font-bold'>
                {client.firstName} {client.lastName}
                {client.state === 'Active' ?
                  <span className='ml-3 badge bg-pure-gold-primary'>ACTIVE</span>
                  :
                  <span className='ml-3 badge bg-pure-gold-danger'>INACTIVE</span>
                }
              </div>
            </div>
            <div className="col-lg-6 text-right pt-2 pr-3">
              <i className='fa fa-pause font-16 mx-1 cursor-pointer'></i>
              <i className='fa fa-play font-16 mx-1 cursor-pointer'></i>
              <i
                className='fa fa-trash font-16 mx-1 cursor-pointer'
                onClick={e => {
                  e.stopPropagation()
                  if (window.confirm('Are you sure?')) {
                    deleteClient(clientID)
                    history.push('/customers')
                  }
                }}
              ></i>
            </div>
          </div>
          <div className="row d-flex align-items-center" style={{ backgroundColor: 'rgba(183, 183, 183, 0.12)' }}>
            <div className="col-md-3 text-center py-3">
              <img alt='SETIMAGE' src={client.avatar} className="img-fluid rounded-lg" />
            </div>
            <div className="col-md-3 py-3">
              <div className="font-18 font-bold">User ID</div>
              <p className="font-16">{client._id}</p>
              <div className="font-18 font-bold">Email</div>
              <p className="font-16">{client.email}</p>
            </div>
            <div className="col-md-3 py-3">
              <div className="font-18 font-bold">Phone</div>
              <p className="font-16">{client.phone}</p>
              <div className="font-18 font-bold">Subscription</div>
              <p className="font-16">{client.subscription}</p>
            </div>
            <div className="col-md-3 py-3">
              <div className="font-18 font-bold">Current Period Start</div>
              <p className="font-16">01/04/2022</p>
              <div className="font-18 font-bold">Current Period End</div>
              <p className="font-16">02/04/2022</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 font-24 font-bold my-2">Chapter {chapter}</div>
            {result.answers.map((item, index) =>
              <div key={index} className="col-md-12">
                <div className="text-info">Question {index + 1}: </div>
                <div>{result.questions[index]}</div>
                <div className="ml-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input type="checkbox" value={rightAnswers[index]} onChange={() => toggleRightAnswer(index, !rightAnswers[index])} />
                      </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Some text" value={item} disabled />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className={"text-center font-36 " + (score < 50 ? 'text-danger ' : score < 70 ? 'text-warning' : 'text-success')}>Score: {score}%</div>
              <div className="text-right">
                <button className="btn bg-pure-gold-brown" onClick={() => onSubmit()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.client.client,
  result: state.exam.result
})

export default connect(mapStateToProps, { getClient, getChapterExamResult, updateClientExamResult })(AdminCustomerResult)