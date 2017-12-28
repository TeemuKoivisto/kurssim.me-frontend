
import { put, select, takeEvery } from 'redux-saga/effects'

import {
  COURSE_SET_SHOWN,
  COURSE_SET_SEARCHED
} from '../actions/course'

const getSelectedCourses = state => state.course.selectedCourses
const getSearchInput = state => state.course.searchInput
const getPeriods = state => state.course.periods

function filterCourseIdsBySearched(searched, courses) {
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
    .map(c => c.id)
}

function* computeShownCourses(action) {
  const selectedCourses = yield select(getSelectedCourses)
  const searchInput = yield select(getSearchInput)
  const periods = yield select(getPeriods)

  const shownCourseIds = filterCourseIdsBySearched(searchInput, selectedCourses)

  yield put({ type: COURSE_SET_SHOWN, payload: shownCourseIds })
}

export function* handleShownCourses(action) {
  yield takeEvery(action => action.type === COURSE_SET_SEARCHED, computeShownCourses)
}