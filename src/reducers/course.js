
import moment from 'moment'

import {
  COURSE_GET_ALL,
  COURSE_SET_SELECTED,
  COURSE_SET_SHOWN
} from '../actions/course'

const INITIAL_STATE = {
  courses: [],
  selectedCourses: [],
  shownCourseIds: []
}

function parseEnrollmentOpen(course) {
  const startDate = moment(course.enrollment_start_date, 'DD-MM-YYYY')
  const endDate = moment(course.enrollment_end_date, 'DD-MM-YYYY')
  return moment(new Date()).isBetween(startDate, endDate)

}

function addExtraFieldsToCourses(courses) {
  return courses.map(c => {
    return { ...c, open: parseEnrollmentOpen(c) }
  })
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
    case COURSE_SET_SHOWN:
      return { ...state, shownCourseIds: action.payload }
    case COURSE_GET_ALL + '_SUCCESS':
      return { ...state, courses: addExtraFieldsToCourses(action.payload).sort(sortCourses) }
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}