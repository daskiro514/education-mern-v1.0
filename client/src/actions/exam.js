import api from '../utils/api'
import {
  EXAM_RESULTS_LOADED,
  EXAM_RESULT_LOADED
} from './types'
import { loadUser } from './auth'

export const createExamResult = (formData, history) => async dispatch => {
  const res = await api.post('/exam/createExamResult', formData)

  if (res.data.success) {
    await dispatch(loadUser())
    await history.push(`/academy/${res.data.nextCategory}/${res.data.nextChapter}`)
  }
}

export const getChapterExamResult = (clientID, category, chapter) => async dispatch => {
  const res = await api.get(`/exam/getChapterExamResult/?chapter=${chapter}&category=${category}&clientID=${clientID}`)

  if (res.data.success) {
    dispatch({
      type: EXAM_RESULT_LOADED,
      payload: res.data.result
    })
  }
}

export const getClientExamResults = clientID => async dispatch => {
  const res = await api.get(`/exam/getClientExamResults/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: EXAM_RESULTS_LOADED,
      payload: res.data.results
    })
  }
}