'use strict';

import React from 'react';
import User from './User';
import LeaderBoard from './LeaderBoard';
import LastRun from './LastRun';
import Line from './Line';
import Firebase from 'firebase';
import moment from 'moment';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: null,
        profileImageURL: null,
        id: null
      }
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
    this.lineRef = this.fireRef.child('line');
    this.usersRef = this.fireRef.child('users');
    this.timerRef = this.fireRef.child('timer');
  }

  componentWillMount() {
    this.lineRef.orderByChild('joinedAt').limitToFirst(1).on('value', data => {
      if (!data.val()) {
        this.setState({
          user: null,
          startTime: null,
          totalTime: null,
          elapsedTime: null
        });
        return;
      }
      let userId = Object.keys(data.val())[0];
      this.usersRef.child(userId).once('value', data => {
        let val = data.val();
        this.setState({
          user: {
            id: userId,
            name: val.name,
            profileImage: val.profileImage
          }
        });
      });
    });
  }

  componentDidMount() {
    this.timerRef.on('child_changed', snapshot => {
      console.log('TIMER CHILD CHANGED')
      let timer = snapshot.val();
      if (timer.startTime) {
        this.setState({
          startTime: timer.startTime,
          totalTime: null
        });
      }
      if (timer.totalTime) {
        this.setState({
          startTime: null,
          totalTime: timer.totalTime
        });
      }
    });
    this.timer = setInterval(this.tick.bind(this), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <LastRun/>
        <div id="head">
            <h5>DrankBoard</h5>
        </div>
        <div id="body">
          {this.loginButton}
          {this.user}
        </div>

        <LeaderBoard/>
        <Line userId={this.state.user.id}/>
      </div>
    );
  }

  get user() {
    if (!this.state.user.id) {
      return (
        <div onClick={this.login.bind(this)} id="activeUser">
          <img src={"http://pickaface.net/avatar/ppic.jpg"} />
          <h4>Join the line!</h4>
          <p>{"00:00"}</p>
      </div>
      )
    }
    let timeString = '' + moment.duration(this.state.elapsedTime).seconds() + ' sec'
                    + ' '
                    + moment.duration(this.state.elapsedTime).milliseconds() +' ms';
    return (
      <div id="activeUser">
        <img src={this.state.user.profileImage} />
        <h4>{this.state.user.name}</h4>
        <p>{timeString}</p>
      </div>
    );
  }

  tick() {

    if (this.state.startTime) {
      console.log(Date.now() - this.state.startTime)
      this.setState({
        elapsedTime: Date.now() - this.state.startTime
      });
    }
  }

  // get loginButton() {
  //   if (this.state.user.id) {
  //     return;
  //   }

  //   return (
  //     <button onClick={this.login.bind(this)}>Login with Facebook</button>
  //   );
  // }

  login() {
    this.fireRef.authWithOAuthPopup('facebook', (err, authData) => {
      if (err) {
        console.log('login failed', err);
      } else {
        console.log(authData)
        this.usersRef.child(authData.facebook.id).set({
          name: authData.facebook.displayName,
          profileImage: authData.facebook.profileImageURL
        });
        this.setState({
          user: {
            id: authData.facebook.id,
            name: authData.facebook.displayName,
            profileImage: authData.facebook.profileImageURL
          }
        });
      }
    });
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}