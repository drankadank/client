'use strict';

import React from 'react';
import Landing from './Landing';
import Firebase from 'firebase';
import moment from 'moment';

export default class LeaderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
    this.usersRef = this.fireRef.child('users');
  }

  componentDidMount() {
    this.fetchUserInfo(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchUserInfo(nextProps.userId);
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="tableItem">
          <img src="http://pickaface.net/avatar/ppic.jpg"/>
          <h5>...</h5>
          <p>...</p>
        </div>
      );
    }
    let { time } = this.props;
    let { name, profileImage } = this.state.user;
    let timeString = '' + moment.duration(time).seconds() + ' sec'
                    + ' '
                    + moment.duration(time).milliseconds() +' ms';
    return (
      <div className="tableItem">
        <img src={profileImage} />
        <div>
          <h5>{name}</h5>
          <p>{timeString}</p>
        </div>
      </div>
    );
  }

  fetchUserInfo(userId) {
    this.usersRef.child(userId).once('value', data => {
      let user = data.val();
      if (user) {
        this.setState({
          user: user
        });
      }
    });
  }

  static PropTypes = {
    userId: React.PropTypes.string,
    time: React.PropTypes.number
  }

  static defaultProps = {}

  static contextTypes = {}
}