'use strict';

import 'es6-shim';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

// Router.run(Routes, (Root) => {
//   React.render(<Root/>, document.getElementById('root'));
// });
React.render(<Router>{routes}</Router>, document.getElementById('root'));