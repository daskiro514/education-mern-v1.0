import api from '../utils/api'
import {
  CLIENT_ADMIN_LOADED,
  CLIENTS_LOADED,
  CLIENT_LOADED
} from './types'

export const getAdmin = () => async dispatch => {
  const res = await api.get('/client/getAdmin')

  if (res.data.success) {
    dispatch({
      type: CLIENT_ADMIN_LOADED,
      payload: res.data.admin
    })
  }
}

export const getClients = () => async dispatch => {
  const res = await api.get('/client/getClients')

  if (res.data.success) {
    dispatch({
      type: CLIENTS_LOADED,
      payload: res.data.clients
    })
  }
}

export const getClient = clientID => async dispatch => {
  const res = await api.get(`/client/getClient/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: CLIENT_LOADED,
      payload: res.data.client
    })
  }
}