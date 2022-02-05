import {
  CLIENT_ADMIN_LOADED,
  CLIENT_LOADED
} from '../actions/types'

const initialState = {
  clientAdmin: {
    _id: '',
    firstName: '',
    lastName: ''
  },
  client: {}
}

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CLIENT_ADMIN_LOADED:
      return {
        ...state,
        clientAdmin: payload
      }
    case CLIENT_LOADED:
      return {
        ...state,
        client: payload
      }
    default:
      return state
  }
}

export default clientReducer