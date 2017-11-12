
import {
  COURSE_GET_ALL
} from '../actions/course'

const INITIAL_STATE = {
  courses: [],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COURSE_GET_ALL + '_SUCCESS':
      return { ...state, courses: action.payload }
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}