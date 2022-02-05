import React from 'react'
import { connect } from 'react-redux'
import Chart from "react-apexcharts"
import { getAdminChartOptions, getAdminChartSeries } from '../../utils/adminCharts'

const AdminDashboard = () => {

  const LineChart = () => {
    return (
      <div>
        <Chart
          options={getAdminChartOptions()}
          series={getAdminChartSeries()}
          type='bar'
          height='250px'
        />
      </div>
    )
  }

  return (
    <div className='row admin-dashboard bg-pure-gold-grey py-4'>
      <div className='col-lg-7'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='font-14 text-pure-gold-grey'>Total Income</div>
          <div className='font-34 font-bold'>$682.5</div>
          <LineChart />
        </div>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='font-24 font-bold'>Latest Customer</div>
          <div className='row mt-3'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
              <div key={index} className='col-md-6'>
                <div className='latest-customer pl-2 mb-3'>
                  <div className='font-16 font-bold'>Tony Harman</div>
                  <div className='font-12 text-pure-gold-grey'>10/19/2021</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='col-lg-5'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='font-24 font-bold'>Track Sales</div>
          {[1, 2, 3, 4, 5, 6].map((item, index) =>
            <table key={index} className='my-3'>
              <tbody>
                <tr>
                  <td className='font-bold font-14 pr-3'>PRODUCT NAME:</td>
                  <td className='font-13'>MASTER MIND PACKAGE</td>
                </tr>
                <tr>
                  <td className='font-bold font-14 pr-3'>AMOUNT:</td>
                  <td className='font-13'>49.7$</td>
                </tr>
                <tr>
                  <td className='font-bold font-14 pr-3'>CUSTOMER:</td>
                  <td className='font-13'>Tony Harman</td>
                </tr>
                <tr>
                  <td className='font-bold font-14 pr-3'>DATE:</td>
                  <td className='font-13'>09/28/2021 09:46:40</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(AdminDashboard)