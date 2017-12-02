import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import FrontPage from './pages/FrontPage'

import { configureStore } from './store'

import 'font-awesome/css/font-awesome.css'
import './index.css'

// import './types/redux-localstorage'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <FrontPage />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

navigator.serviceWorker.getRegistrations().then(function(registrations: any) {
  for (let registration of registrations) {
    registration.unregister()
}})
