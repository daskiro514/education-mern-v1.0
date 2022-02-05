import React from 'react'
import { connect } from 'react-redux'
import { getAdminClients } from '../../../actions/admin'
import { formatDateTime } from '../../../utils/formatDate1'
import { deleteClient } from '../../../actions/client'
import { useHistory } from 'react-router-dom'

const AdminCustomers = ({ clients, getAdminClients, deleteClient }) => {
  const history = useHistory()

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
            <table className='table table-borderless table-striped'>
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
                  <tr key={index} className='cursor-pointer' onClick={() => history.push(`/customer/${item._id}`)}>
                    <td className='pl-3 rounded-left'>{index + 1}</td>
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
                    <td className='text-center rounded-right'>
                      <i className='fa fa-pause font-16 mx-1 cursor-pointer'></i>
                      <i className='fa fa-play font-16 mx-1 cursor-pointer'></i>
                      <i
                        className='fa fa-trash font-16 mx-1 cursor-pointer'
                        onClick={e => {
                          e.stopPropagation()
                          if (window.confirm('Are you sure?')) {
                            deleteClient(item._id)
                          }
                        }}
                      ></i>
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

export default connect(mapStateToProps, { getAdminClients, deleteClient })(AdminCustomers)