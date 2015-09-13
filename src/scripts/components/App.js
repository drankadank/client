'use strict';

import React from 'react';
import Landing from './Landing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Landing/>
      </div>
    );
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}