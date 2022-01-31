import React from 'react'
import { connect } from 'react-redux'
import { getAdminClients } from '../../../actions/admin'
import { formatDateTime } from '../../../utils/formatDate1'

const AdminCustomers = ({ clients, getAdminClients }) => {

  React.useEffect(() => {
    getAdminClients()
  }, [getAdminClients])

  return (
    <div className='row admin-customers bg-pure-gold-grey py-4'>
      <div className='col-lg-12'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='font-24 font-bold'>Customers</div>
            </div>
            <div className='col-lg-6'>
              <div className='text-right'>
                <select
                  type='text'
                  className='search-filter'
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>InActive</option>
                </select>
                <input
                  type='text'
                  className='search-filter'
                  placeholder='Search'
                />
              </div>
            </div>
          </div>
          <div className='table-responsive'>
            <table className='table table-borderless'>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>AVATAR</th>
                  <th>NAME</th>
                  <th>STATE</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>PURCHASED SUBSCRIPTION</th>
                  <th>CURRENT PERIOD END</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((item, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='font-34 text-center'>
                      <img alt='SETIMAGE' src={item.avatar} width='60px' className='rounded-lg' />
                    </td>
                    <td>{item.firstName} {item.lastName}</td>
                    {item.state === 'Active' ?
                      <td><span className='badge bg-pure-gold-primary'>ACTIVE</span></td>
                      :
                      <td><span className='badge bg-pure-gold-danger'>INACTIVE</span></td>
                    }
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.subscription}</td>
                    <td>{item.state === 'Active' ? formatDateTime(item.currentPeriodEnd * 1000) : ''}</td>
                    <td>
                      <i className='fa fa-pause font-16 mr-2 cursor-pointer'></i>
                      <i className='fa fa-play font-16 mr-2 cursor-pointer'></i>
                      <i className='fa fa-trash font-16 mr-2 cursor-pointer'></i>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.clients
})

export default connect(mapStateToProps, { getAdminClients })(AdminCustomers)