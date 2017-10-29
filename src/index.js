import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import FrontPage from './pages/FrontPage';

import { configureStore } from './store'
// import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <FrontPage />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()