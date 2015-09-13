'use strict';

import React from 'react';
import User from './User';
import LeaderBoard from './LeaderBoard';
import LastRun from './LastRun';
import Line from './Line';
import Firebase from 'firebase';

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
    this.usersRef = this.fireRef.child('users');
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
          <User/>
        </div>

        <LeaderBoard/>
        <Line userId={this.state.user.id}/>
      </div>
    );
  }

  get loginButton() {
    if (this.state.user.id) {
      return;
    }

    return (
      <button onClick={this.login.bind(this)}>Login with Facebook</button>
    );
  }

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