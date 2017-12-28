
import { put, select, takeEvery } from 'redux-saga/effects'

import {
  PERIOD_TOGGLE,
  COURSE_SET_SELECTED,
  COURSE_SET_SHOWN,
  COURSE_SET_SEARCHED,
} from '../actions/course'

const getSelectedCourses = state => state.course.selectedCourses
const getSearchInput = state => state.course.searchInput
const getPeriods = state => state.course.periods

function filterCoursesBySearched(courses, searched) {
  const includes = text => text.toLowerCase().includes(searched)
  const listIncludes = list => list.some(current => includes(current))

  return courses
    .filter(
      c =>
        includes(c.name) ||
        includes(c.tag) ||
        includes(c.type) ||
        includes(c.format) ||
        includes(c.start_date) ||
        includes(c.end_date) ||
        includes(c.credits.toString()) ||
        listIncludes(c.teachers)
    )
}

function filterCoursesByPeriods(courses, periods) {
  return courses.filter(c => c.periods.every(p => periods.includes(p)))
}

function* computeShownCourses(action) {
  const selectedCourses = yield select(getSelectedCourses)
  const searchInput = yield select(getSearchInput)
  const periods = yield select(getPeriods)
  const selectedPeriods = periods.filter(p => p.selected === true).map(p => p.name)

  const filteredBySearch = filterCoursesBySearched(selectedCourses, searchInput)
  const filteredByPeriods = filterCoursesByPeriods(filteredBySearch, selectedPeriods)
  const shownCourseIds = filteredByPeriods.map(c => c.id)

  yield put({ type: COURSE_SET_SHOWN, payload: shownCourseIds })
}

export function* handleShownCourses(action) {
  yield takeEvery(action => action.type === PERIOD_TOGGLE, computeShownCourses)
  yield takeEvery(action => action.type === COURSE_SET_SELECTED, computeShownCourses)
  yield takeEvery(action => action.type === COURSE_SET_SEARCHED, computeShownCourses)
}