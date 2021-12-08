import React from 'react'
import { connect } from 'react-redux'

const AdminCustomers = () => {

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
                  <option>Inactive</option>
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
                  <th>USERNAME</th>
                  <th>AVATAR</th>
                  <th>NAME</th>
                  <th>STATE</th>
                  <th>PARTNER</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>PURCHASED SUBSCRIPTION</th>
                  <th>CURRENT PERIOD START</th>
                  <th>CURRENT PERIOD END</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>sbhooley</td>
                    <td className='font-34 text-center'><i className='fa fa-user-secret'></i></td>
                    <td>Steven Hooley</td>
                    {index % 2 === 0 ?
                      <td><span className='badge bg-pure-gold-primary'>ACTIVE</span></td>
                      :
                      <td><span className='badge bg-pure-gold-danger'>INACTIVE</span></td>
                    }
                    <td>Willette Whitted</td>
                    <td>sbhooley@gmail.com</td>
                    <td>4435184158</td>
                    <td>Master Mind Package</td>
                    <td>10/02/2021 11:56:42</td>
                    <td>11/02/2021 11:56:42</td>
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

})

export default connect(mapStateToProps, {})(AdminCustomers)