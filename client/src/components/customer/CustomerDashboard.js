import React from 'react'
import { connect } from 'react-redux'
import Vimeo from '@u-wave/react-vimeo'

const CustomerAcademy = () => {

  return (
    <div className='row Customer-academy bg-pure-gold-grey py-4'>
      <div className='col-lg-12'>
        <div className='bg-white pure-gold-rounded-lg p-3 mb-3'>
          <div className='font-24 font-bold'>Academy <i className='fa fa-plus-circle text-pure-gold-grey'></i></div>
          <div className='row pt-4'>
            <div className='col-lg-3 col-md-5 border-right'>
              {['READY', 'SET', 'LAUNCH'].map((item, index) =>
                <div key={index} className='pb-4'>
                  <div className='font-18 font-bold'>
                    {item} <i className='fa fa-plus-circle text-pure-gold-grey cursor-pointer'></i>
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((moduleItem, moduleIndex) =>
                    <div key={moduleIndex} className={'rounded-lg cursor-pointer font-16 pl-1 ' + (index === 0 && moduleIndex === 0 ? 'bg-pure-gold-brown' : '')}>
                      <i className='fa fa-caret-right'></i> Chapter {moduleItem}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='col-lg-9 col-md-7'>
              <div className='font-18 font-bold'>
                Module 1: How To Setup An Online Wal-Mart Store
              </div>
              <div className='font-18 pt-3 text-justify'>
                The Walmart Marketplace is a platform that allows third-party sellers to list their items on Walmart.com, just like you would on Amazon or eBay. Follow the unique link in your approval email (subject line: “Your Account has been created in Walmart Marketplace”) to create your Partner Profile.
              </div>
              <div className='font-18 pt-3 text-justify'>
                The Registration Wizard will walk you through five main sections: Account Creation, Partner Registration, Taxes (W-9),  and Shipping Info. Now that you have created your Partner Profile, you will have access to the Seller Center. Here, you’ll find a “Launch Checklist” that outlines the next several requirements before you can launch your account.
              </div>
              <div className='font-18 pt-3 text-justify'>
                The final step for selling on Walmart Marketplace is launching your account. When you “mark as done” all the items on your Walmart Launch Checklist in Seller Center, a pop-up message will ask you to confirm that you’re ready to launch. When you select “confirm”, this will trigger a launch request.
              </div>
              <div className="text-center p-1 pt-3">
                <Vimeo
                  video={354682480}
                  responsive={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(CustomerAcademy)