import React from 'react'
import { connect } from 'react-redux'
import { logout, setCurrentPage } from '../../actions/auth'
import { useHistory } from 'react-router-dom'

const CustomerSidebar = ({ user, logout, setCurrentPage, currentPage }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)
    await history.push(`/`)
    await history.push(`/dashboard`)

    if (location === 'dashboard') {
      await history.push(`/dashboard/academy/1/1`)
      return
    }
    await history.push(`/dashboard/${location}`)
  }

  return (
    <div className='col-lg-2 col-md-3 sidebar p-0'>
      <div className='container-fluid p-0'>
        <div className={'row mx-0 h5 menuItem rounded mt-5 p-1 pl-3 ' + (currentPage === 'dashboard' ? 'selected' : '')} onClick={() => goPage('dashboard')}>
          <div className='d-flex align-items-center'>
            <div><i className="fas fa-book mr-3"></i></div>
            <div>Academy</div>
          </div>
        </div>

        <div className='signoutLink pb-2'>
          <div className={'row mx-0 h5 menuItem rounded p-1 pl-3 ' + (currentPage === 'profile' ? 'selected' : '')} onClick={() => goPage('profile')}>
            <div className='d-flex align-items-center'>
              <div><i className='mr-3 fa fa-user'></i></div>
              <div>Profile</div>
            </div>
          </div>
          <div className={'row mx-0 h5 menuItem rounded p-1 pl-3 ' + (currentPage === 'settings' ? 'selected' : '')} onClick={() => goPage('settings')}>
            <div className='d-flex align-items-center'>
              <div><i className='mr-3 fa fa-sliders'></i></div>
              <div>Settings</div>
            </div>
          </div>
          <div className='row mx-0 h5 menuItem rounded p-1 pl-3' onClick={() => {
            setCurrentPage('dashboard')
            logout()
          }}>
            <div className='d-flex align-items-center'>
              <div><i className='mr-3 fa fa-user'></i></div>
              <div>Logout</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentPage: state.auth.currentPage
})

export default connect(mapStateToProps, { logout, setCurrentPage })(CustomerSidebar)