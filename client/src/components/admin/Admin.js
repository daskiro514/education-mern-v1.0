import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminSettings from './AdminSettings'
import AdminCustomers from './admin-customer/AdminCustomers'
import AdminProfile from './AdminProfile'
import AdminAcademy from './admin-academy/AdminAcademy'
import AdminAcademyCreate from './admin-academy/AdminAcademyCreate'
import AdminAcademyEdit from './admin-academy/AdminAcademyEdit'
import AdminMessages from './admin-messages/AdminMessages'
import AdminClientMessages from './admin-messages/AdminClientMessages'
import { getClientsMessageNumbers, getMessages, getAdminUnreadMessages } from '../../actions/message'
import { setAlert } from '../../actions/alert'

const checkArraysSame = (array1, array2) => {
  var isSame = (array1.length === array2.length) && array1.every(function (element, index) {
    return JSON.stringify(element) === JSON.stringify(array2[index])
  })
  return isSame
}

var firstIntervalID = -1

const Admin = ({ setAlert, getMessages, getAdminUnreadMessages }) => {

  React.useEffect(() => {
    var intervalID = setInterval(async function () {
      let messageNumbersFromDB = await getClientsMessageNumbers()

      if (localStorage.getItem('messageNumbers') === 'undefined' || localStorage.getItem('messageNumbers') === null || localStorage.getItem('messageNumbers') === '[]') {
        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
      }

      var clientIDForChat = localStorage.getItem('chatClient')
      let messageNumbersFromLocalStorage = JSON.parse(localStorage.getItem('messageNumbers'))

      if (messageNumbersFromDB === null || messageNumbersFromLocalStorage === null || messageNumbersFromDB === undefined || messageNumbersFromLocalStorage === undefined) return false

      if (messageNumbersFromDB.length !== messageNumbersFromLocalStorage.length) {
        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
        return false
      }

      if (checkArraysSame(messageNumbersFromLocalStorage, messageNumbersFromDB)) {

      } else {
        messageNumbersFromDB.forEach(element => {
          var elementFromLocal = messageNumbersFromLocalStorage.find(el => el.clientID === element.clientID)

          if (element.messageNumber > elementFromLocal.messageNumber) {
            setAlert(`There are ${element.messageNumber - elementFromLocal.messageNumber} new messages from ${element.clientFirstName} ${element.clientLastName}`, 'success')
          }

          if (element.clientID === clientIDForChat) {
            getMessages(element.clientID)
            getAdminUnreadMessages()
          }
        })

        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
      }
    }, 5000)

    if (firstIntervalID < 0) {
      firstIntervalID = intervalID
    } else {
      clearInterval(intervalID)
    }
  }, [getMessages, setAlert, getAdminUnreadMessages])

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AdminSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AdminDashboard} />
            <PrivateRoute exact path="/customers" component={AdminCustomers} />
            <PrivateRoute exact path="/academy/:category/:chapter" component={AdminAcademy} />
            <PrivateRoute exact path="/academy-create/:category/:chapter" component={AdminAcademyCreate} />
            <PrivateRoute exact path="/academy-edit/:id" component={AdminAcademyEdit} />
            <PrivateRoute exact path="/profile" component={AdminProfile} />
            <PrivateRoute exact path="/settings" component={AdminSettings} />
            <PrivateRoute exact path="/messages" component={AdminMessages} />
            <PrivateRoute exact path="/messages/:id" component={AdminClientMessages} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { setAlert, getMessages, getAdminUnreadMessages })(Admin)