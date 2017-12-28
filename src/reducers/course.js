
import moment from 'moment'

import {
  PERIOD_TOGGLE,
  COURSE_GET_ALL,
  COURSE_SET_SELECTED,
  COURSE_SET_SEARCHED,
  COURSE_SET_SHOWN
} from '../actions/course'

import periods from './periods'

const INITIAL_STATE = {
  courses: [],
  selectedCourses: [],
  searchInput: '',
  shownCourseIds: [],
  periods: initPeriods()
}

// https://www.helsinki.fi/fi/opiskelu/opintojen-aikana/lukuvuosi-ja-opetusperiodit

function initPeriods() {
  const currentYear = new Date().getFullYear().toString()
  const currentYearPeriods = periods.find(y => y.year.substring(0, 4) === currentYear)
  const currentYearRange = getCurrentYearRange()
  // Format used in the aforementioned webpage, maybe this would be though better?:
  // periods: [
  //   { name: 'Periodi I', selected: true },
  //   { name: 'Periodi II', selected: true },
  //   { name: 'Periodi III', selected: true },
  //   { name: 'Periodi IV', selected: true },
  //   { name: 'Periodi V', selected: true }
  // ],
  const usedKeys = ["I periodi", "II periodi", "III periodi", "IV periodi"]
  return usedKeys.map(key => {
    const periodDateString = currentYearPeriods[key]
    const periodDates = parsePeriodDate(periodDateString, currentYearRange)
    return {
      name: key,
      start: periodDates[0],
      end: periodDates[1],
      selected: true
    }
  })
}

function getCurrentYearRange() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  if (currentMonth >= 8) {
    return [currentYear, currentYear + 1]
  } else {
    return [currentYear - 1, currentYear]
  }
}

function getPeriodYear(month, yearRange) {
  return month >= 8 ? yearRange[0] : yearRange[1]
}

/**
 * Parses period's date-string as in periods.json
 * @param {String} dateString - Eg. "5.9.-23.10."
 * @param {Array<Number>} yearRange - Eg. [2016, 2017]
 * @returns {Array<Date>} Returns an array of two dates, start and end
 */
function parsePeriodDate(dateString, yearRange) {
  const dates = dateString.split('-')
  return dates.map(date => {
    const chunks = date.split('.')
    const day = parseInt(chunks[0], 10)
    const month = parseInt(chunks[1], 10)
    const year = getPeriodYear(month, yearRange)
    // JS Date's months start from 0 eg. December is 11th month
    return new Date(year, month - 1, day) // .toISOString()
  })
}

function parseCoursePeriods(course, periods) {
  const startDate = moment(course.start_date, 'DD.MM.YYYY')
  const endDate = moment(course.end_date, 'DD.MM.YYYY')
  const coursePeriods = periods.filter(p => startDate.isBetween(moment(p.start), moment(p.end))
    || startDate.isSame(moment(p.start))
    || endDate.isBetween(moment(p.start), moment(p.end))
    || endDate.isSame(moment(p.end)))
  return coursePeriods.map(p => p.name)
}

function parseEnrollmentOpen(course) {
  const startDate = moment(course.enrollment_start_date, 'DD.MM.YYYY')
  const endDate = moment(course.enrollment_end_date, 'DD.MM.YYYY')
  return moment(new Date()).isBetween(startDate, endDate)
}

function addExtraFieldsToCourses(courses, state) {
  return courses.map(c => {
    return { ...c, open: parseEnrollmentOpen(c), periods: parseCoursePeriods(c, state.periods) }
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
    case PERIOD_TOGGLE:
      return {
        ...state,
        periods: state.periods.map(p => 
          p.name === action.payload ? { ...p, selected: !p.selected } : p
        )
      }
    case COURSE_SET_SELECTED:
      return { ...state, selectedCourses: action.payload.sort(sortCourses) }
    case COURSE_SET_SEARCHED:
      return { ...state, searchInput: action.payload }
    case COURSE_SET_SHOWN:
      return { ...state, shownCourseIds: action.payload }
    case COURSE_GET_ALL + '_SUCCESS':
      return { ...state, courses: addExtraFieldsToCourses(action.payload, state).sort(sortCourses) }
    case COURSE_GET_ALL + '_REQUEST':
    case COURSE_GET_ALL + '_FAIL':
    default:
      return state
  }
}