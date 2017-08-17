
import { combineReducers } from 'redux-immutablejs'
import auth from './auth'
import course from './course'

import { LOG_OUT } from '../actions/auth'

const combinedReducers = combineReducers({
  auth,
  course,
})

/**
 * Flushes all the states from the reducers when user logs out.
 * @param {Object} state 
 * @param {Object} action 
 */
const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    return combinedReducers(undefined, action)
  }
  return combinedReducers(state, action)
}

export default rootReducer