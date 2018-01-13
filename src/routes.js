import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import FrontPage from './pages/FrontPage'
import AboutPage from './pages/AboutPage'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={FrontPage} />
      <Route path='/about' exact component={AboutPage} />
    </Switch>
  </BrowserRouter>
)