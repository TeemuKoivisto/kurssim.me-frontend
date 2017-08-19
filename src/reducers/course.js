
import { fromJS } from 'immutable'

import {
  COURSE_GET_ALL
} from '../actions/course'

const INITIAL_STATE = fromJS({
  courses: [],
  bachelorCourses: [],
  masterCourses: [],
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COURSE_GET_ALL + '_SUCCESS':
      return state.merge({
        courses: [...action.payload.bachelorCourses, ...action.payload.masterCourses],
        bachelorCourses: action.payload.bachelorCourses,
        masterCourses: action.payload.masterCourses,
      })
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}