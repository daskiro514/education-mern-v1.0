import React from "react"
import { connect } from "react-redux"
import { getClient, deleteClient } from "../../../actions/client"
import { useHistory } from "react-router-dom"
import { getClientExamResults } from "../../../actions/exam"

const AdminCustomer = ({ match, client, getClient, getClientExamResults, results }) => {
  const clientID = match.params.id
  const history = useHistory()

  React.useEffect(() => {
    getClient(clientID)
    getClientExamResults(clientID)
  }, [clientID, getClient, getClientExamResults])

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
            <div className="col-md-12 font-24 font-bold">PROGRESSION</div>
            {results.map((chapterResults, index) =>
              <div key={index} className="col-md-12 my-2">
                <div className="font-18 font-bold">{index === 0 ? 'READY' : index === 1 ? 'SET' : 'LAUNCH'}</div>
                <div className="row">
                  {chapterResults.map((item, index) =>
                    <div className="col-lg-3 my-1" key={index}>
                      <div>
                        Chapter {index + 1}: 
                        <span className={item.state === 'Completed' ? 'color-brown' : ''}> {item.state}</span>
                      </div>
                      <div>
                        Quiz Score: 
                        <span className={item.state === 'Completed' ? 'color-brown' : ''}> {item.state === 'Completed' ? item.score + ' %' : ''}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.client.client,
  results: state.exam.results
})

export default connect(mapStateToProps, { getClient, getClientExamResults })(AdminCustomer)