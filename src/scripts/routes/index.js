'use strict';

import React from 'react';
import {
  App
} from '../components';
import {
  Route,
  Redirect,
  NotFoundRoute
} from 'react-router';

export default (
  <Route name='app' path='/' handler={App}>
    {/* <Route name="home" path='/home' handler={Home}/> */}
    {/* <Route name="chug" path='/chug' handler={Chug}/> */}
  </Route>
);