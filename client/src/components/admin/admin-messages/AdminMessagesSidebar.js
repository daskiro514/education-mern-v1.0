import React from 'react'
import { connect } from 'react-redux'
import { getAdminClients, setChatClient } from '../../../actions/admin'
import { goPage } from '../../../actions/admin'
import { useHistory } from 'react-router'

const AdminMessagesSidebar = ({ getAdminClients, clients, goPage, setChatClient, clientID }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminClients()
  }, [getAdminClients])

  return (
    <div className='bg-white m-1 mb-4 rounded-lg'>
      <div className='p-2'>
        {clients.map((item, index) =>
          <div key={index} onClick={() => {
            goPage(history, `messages/${item._id}`)
            setChatClient(item._id)
          }} className={'d-flex align-items-center cursor-pointer p-2 rounded mb-1 link-item ' + (clientID === item._id ? 'message-client-selected' : '')}>
            <img src={item.avatar} alt='userAvatar' className='rounded-circle mr-2' width='35px' />
            <div style={{ lineHeight: '1' }}>
              <div>{`${item.firstName} ${item.lastName}`}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.clients,
  clientID: state.admin.clientIDForChat
})

export default connect(mapStateToProps, { getAdminClients, goPage, setChatClient })(AdminMessagesSidebar)