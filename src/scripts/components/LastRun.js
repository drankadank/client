'use strict';

import React from 'react';
import Landing from './Landing';
import Firebase from 'firebase';
import moment from 'moment';

export default class LastRun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: ''
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
    this.chugsRef = this.fireRef.child('chugs');
  }

  componentDidMount() {
    this.chugsRef.limitToLast(1).on('value', snapshot => {
      let key = Object.keys(snapshot.val())[0];
      this.chugsRef.child(key).on('value', snapshot => {
        let val = snapshot.val();
        console.log(val)
        if (val.totalTime) {
          this.setState({
            totalTime: val.totalTime
          });
        }
      });
    });
  }

  render() {
    let time = this.state.totalTime;
    let timeString = '' + moment.duration(time).seconds() + ' sec'
                    + ' '
                    + moment.duration(time).milliseconds() +' ms';
    return (
      <div className='last-run-banner'>
        <div>Last time: {timeString}</div>
      </div>
    );
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}