
import {
  COURSE_GET_ALL
} from '../actions/course'

const INITIAL_STATE = {
  courses: [],
}

function sortCourses(a: any, b: any) {
  const aname = a.name.toLowerCase(), bname = b.name.toLowerCase()
  if (aname < bname) {
    return -1
  } else if (aname > bname) {
    return 1
  }
  return 0
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case COURSE_GET_ALL + '_SUCCESS':
      return { ...state, courses: action.payload.sort(sortCourses) }
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}