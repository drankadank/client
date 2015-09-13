'use strict';

import React from 'react';
import Firebase from 'firebase';
import moment from 'moment';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
    this.lineRef = this.fireRef.child('line');
    this.usersRef = this.fireRef.child('users');
    this.timerRef = this.fireRef.child('timer');
  }



  render() {

  }



  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}