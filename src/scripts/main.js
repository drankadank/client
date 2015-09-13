'use strict';

import 'es6-shim';
import React from 'react';
import Router from 'react-router';
import Routes from './routes';

Router.run(Routes, (Root) => {
  React.render(<Root/>, document.getElementById('root'));
});