import {
  EXAM_RESULTS_LOADED,
  EXAM_RESULT_LOADED
} from '../actions/types'

const initialState = {
  results: [],
  result: false
}

const examReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case EXAM_RESULTS_LOADED:
      return {
        ...state,
        results: payload
      }
    case EXAM_RESULT_LOADED:
      return {
        ...state,
        result: payload
      }
    default:
      return state
  }
}

export default examReducer