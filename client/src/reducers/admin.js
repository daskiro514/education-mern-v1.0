import {
  ADMIN_CLIENTS_LOADED,
  ADMIN_CLEINT_LOADED,
  CLIENT_FOR_CHAT_LOADED
} from '../actions/types'

const initialState = {
  clients: [],
  adminClient: {
    firstName: '',
    lastName: ''
  },
  clientIDForChat: null,
}

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADMIN_CLIENTS_LOADED:
      return {
        ...state,
        clients: payload,
      }
    case ADMIN_CLEINT_LOADED:
      return {
        ...state,
        adminClient: payload
      }
    case CLIENT_FOR_CHAT_LOADED:
      return {
        ...state,
        clientIDForChat: payload
      }
    default:
      return state
  }
}

export default adminReducer