import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import CustomerSidebar from './CustomerSidebar'
import CustomerDashboard from './CustomerDashboard'
import CustomerMessages from './CustomerMessages'
import { getAdminMessageNumbers, getMessages, getClientUnreadMessages } from '../../actions/message'
import { setAlert } from '../../actions/alert'

var firstIntervalID = -1

const Customer = ({ setAlert, clientID, getMessages, getClientUnreadMessages }) => {
  React.useEffect(() => {
    var intervalID = setInterval(async function () {
      let messageNumbersFromDB = await getAdminMessageNumbers(clientID)

      if (localStorage.getItem('adminMessageNumbers') === 'undefined' || localStorage.getItem('adminMessageNumbers') === null) {
        localStorage.setItem('adminMessageNumbers', JSON.stringify(messageNumbersFromDB))
      }

      let messageNumbersFromLocalStorage = JSON.parse(localStorage.getItem('adminMessageNumbers'))

      if (messageNumbersFromDB.messageNumber === 0) {

      } else if (messageNumbersFromDB.messageNumber > messageNumbersFromLocalStorage.messageNumber) {
        setAlert(`There are ${messageNumbersFromDB.messageNumber - messageNumbersFromLocalStorage.messageNumber} new messages from Admin`, 'success')
        getMessages(clientID)
        getClientUnreadMessages(clientID)
      } else if (messageNumbersFromDB.messageNumber < messageNumbersFromLocalStorage.messageNumber) {
        getMessages(clientID)
        getClientUnreadMessages(clientID)
      }

      localStorage.setItem('adminMessageNumbers', JSON.stringify(messageNumbersFromDB))
    }, 5000)

    if (firstIntervalID < 0) {
      firstIntervalID = intervalID
    } else {
      clearInterval(intervalID)
    }
  }, [getMessages, setAlert, getClientUnreadMessages, clientID])

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <CustomerSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <Route exact path='/'>
              <Redirect to='/academy/1/1' />
            </Route>
            <PrivateRoute exact path="/academy/:category/:chapter" component={CustomerDashboard} />
            <PrivateRoute exact path="/messages" component={CustomerMessages} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clientID: state.auth.user._id
})

export default connect(mapStateToProps, { setAlert, getMessages, getClientUnreadMessages })(Customer)