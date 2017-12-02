import { all, call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { SagaIterator } from 'redux-saga';

function createRequest(request: any) {
  return axios({
      method: request.method,
      url: process.env.REACT_APP_API_URL + request.url,
      data: request.data,
      headers: {
        Accept: 'application/json',
      },
    })
}

function* callApi(action: any) {
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

function* executeFetch(action: any) {
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

function* handleRequest(action: any): SagaIterator {
  yield takeEvery(((action: any) => action.payload && action.payload.request), callApi)
}

function* handleFetch(action: any): SagaIterator {
  yield takeEvery(((action: any) => action.payload && action.payload.fetch), executeFetch)
}

export default function* root() {
  yield all([
    takeEvery('*', handleRequest),
    takeEvery('*', handleFetch)
  ])
}