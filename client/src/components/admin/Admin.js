import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminSettings from './AdminSettings'
import AdminAcademy from './AdminAcademy'
import AdminCustomers from './AdminCustomers'
import AdminProfile from './AdminProfile'
import AdminAcademyCreate from './AdminAcademyCreate'
import AdminAcademyEdit from './AdminAcademyEdit'

const Admin = () => {

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
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Admin)