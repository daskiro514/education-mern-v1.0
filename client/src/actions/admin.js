import api from '../utils/api'
import {
  ADMIN_CLIENTS_LOADED,
  ADMIN_CLEINT_LOADED,
  CLIENT_FOR_CHAT_LOADED
} from './types'

export const getAdminClients = () => async dispatch => {
  const res = await api.get('/admin/getAdminClients')

  if (res.data.success) {
    dispatch({
      type: ADMIN_CLIENTS_LOADED,
      payload: res.data.clients
    })
  }
}

export const goPage = (history, location) => async () => {
  await history.push(`/${location}`)
}

export const getClient = clientID => async dispatch => {
  const res = await api.get(`/admin/getClient/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: ADMIN_CLEINT_LOADED,
      payload: res.data.client
    })
  }
}

export const setChatClient = clientID => async dispatch => {
  localStorage.setItem('chatClient', clientID)
  
  dispatch({
    type: CLIENT_FOR_CHAT_LOADED,
    payload: clientID
  })
}