
import {
  COURSE_GET_ALL,
  COURSE_SET_SELECTED,
  COURSE_SET_FILTERED
} from '../actions/course'

const INITIAL_STATE = {
  courses: [],
  selectedCourses: [],
  filteredCourses: []
}

function sortCourses(a, b) {
  const aname = a.name.toLowerCase(), bname = b.name.toLowerCase()
  if (aname < bname) {
    return -1
  } else if (aname > bname) {
    return 1
  }
  return 0
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COURSE_SET_SELECTED:
      return { ...state, selectedCourses: action.payload.sort(sortCourses) }
    case COURSE_SET_FILTERED:
      // return state
      return { ...state, filteredCourses: action.payload.sort(sortCourses) }
    case COURSE_GET_ALL + '_SUCCESS':
      return { ...state, courses: action.payload.sort(sortCourses) }
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}