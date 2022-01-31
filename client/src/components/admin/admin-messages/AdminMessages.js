import React from 'react'
import { connect } from 'react-redux'
import AdminMessagesSidebar from './AdminMessagesSidebar'
import { Redirect } from 'react-router'

const AdminMessages = ({ chatClientID }) => {
  if (chatClientID !== null) {
    return <Redirect to={`/messages/${chatClientID}`} />
  }

  return (
    <div className='row admin-customers bg-pure-gold-grey py-4'>
      <div className='col-lg-12'>
        <div className='bg-white pure-gold-rounded-lg p-3'>
          <div className='admin-messages'>
            <div className='font-24 font-bold pt-2 pl-1'>
              MESSAGING
            </div>
            <hr/>

            <div className='row'>
              <div className='col-lg-3 border-right'>
                <AdminMessagesSidebar />
              </div>
              <div className='col-lg-9'>
                <div className='bg-white m-1 rounded-lg' style={{ height: '85vh' }}>
                  <div className='text-center'>
                    <div style={{ height: '40vh' }}></div>
                    <h1>Select A Client You Want Chat.</h1>
                    <div style={{ height: '40vh' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  chatClientID: state.admin.clientIDForChat
})

export default connect(mapStateToProps, {})(AdminMessages)