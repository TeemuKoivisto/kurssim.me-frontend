import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import FrontPage from '@/pages/FrontPage';

import { configureStore } from '@/store'

import 'font-awesome/css/font-awesome.css'
import '@/index.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <FrontPage />
  </Provider>,
  document.getElementById('root')
)

navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister()
}})