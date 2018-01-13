import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from '../store'

import FrontPage from './FrontPage'

const store = configureStore()

xit('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <FrontPage />
    </Provider>, div)
})