import { all, fork, call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function createRequest(request) {
  return axios({
      method: request.method,
      url: process.env.REACT_APP_API_URL + request.url,
      data: request.data,
      headers: {
        Accept: 'application/json',
      },
    })
}

function* callApi(action) {
  yield put({ type: `${action.type}_REQUEST` })
  try {
    const result = yield call(createRequest, action.payload.request)
    yield put({ type: `${action.type}_SUCCESS`, payload: result.data })
  } catch (err) {
    if (err.response && err.response.data) {
      yield put({ type: `${action.type}_FAIL`, payload: err.response.data })
    } else {
      yield put({ type: `${action.type}_FAIL`, payload: err.toString() })      
    }
  }
}

function* executeFetch(action) {
  yield put({ type: `${action.type}_REQUEST` })
  try {
    const result = yield call(action.payload.fetch.exec)
    yield put({ type: `${action.type}_SUCCESS`, payload: result })
  } catch (err) {
    if (err.response && err.response.data) {
      yield put({ type: `${action.type}_FAIL`, payload: err.response.data })
    } else {
      yield put({ type: `${action.type}_FAIL`, payload: err.toString() })      
    }
  }
}

function* handleRequest(action) {
  yield takeEvery((action => action.payload && action.payload.request), callApi)
}

function* handleFetch(action) {
  yield takeEvery((action => action.payload && action.payload.fetch), executeFetch)
}

export default function* root() {
  yield all([
    fork(handleRequest),
    fork(handleFetch)
  ])
}