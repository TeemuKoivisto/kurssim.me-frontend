import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import rootSaga from './sagas'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = composeWithDevTools()

  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(sagaMiddleware)(createStore))

  const createPersistentStore = compose(
    persistState(['course'])
  )(createStoreWithMiddleware)

  const store = createPersistentStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'))
    })
  }

  return store
}