'use strict';

import React from 'react';
import {
  App,
  Landing
} from './components';
import {
  Route,
  Redirect,
  NotFoundRoute
} from 'react-router';

export default (
  <Route name='app' path='/' component={App}>
    <Redirect
      from="/"
      to="/landing" />
    <Route name="landing" path='/landing' component={Landing} />
  </Route>
);