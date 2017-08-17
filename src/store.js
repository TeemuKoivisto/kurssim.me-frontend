import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import { fromJS, Map } from 'immutable'

import rootReducer from './reducers'
import rootSaga from './sagas'

const immutableStoreConfig = {
  slicer: paths => state => (paths ? state.filter((v, k) => paths.indexOf(k) > -1) : state),
  serialize: subset => JSON.stringify(subset.toJS()),
  deserialize: serializedData => fromJS(JSON.parse(serializedData)),
  merge: (initialState, persistedState) => new Map(initialState).mergeDeep(persistedState)
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

  const createPersistentStore = compose(
    persistState(['auth', 'course'], immutableStoreConfig)
  )(createStoreWithMiddleware)

  const store = createPersistentStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  sagaMiddleware.run(rootSaga)


  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}