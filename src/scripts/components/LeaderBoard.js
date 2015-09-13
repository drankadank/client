'use strict';

import React from 'react';
import LeaderItem from './LeaderItem';
import Firebase from 'firebase';
import moment from 'moment';

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: []
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
  }

  componentWillMount() {
    let chugsRef = this.fireRef.child('chugs');
    chugsRef.orderByChild('totalTime').on('child_added', snapshot => {
      let leaders = this.state.leaders;
      leaders.unshift(snapshot.val());
      this.setState({
        leaders: leaders
      });
    });
  }

  render() {
    return (
      <div id="leaderboard">
        {this.orderedLeaders}
      </div>
    );
  }

  get orderedLeaders() {

    return this.state.leaders.map(leader => {
      return (
        <LeaderItem
          userId={leader.userId}
          time={leader.totalTime} />
      );
    });
  }

  static PropTypes = {
    displayName: React.PropTypes.string,
    profileImageURL: React.PropTypes.string,
    id: React.PropTypes.string
  }

  static defaultProps = {}

  static contextTypes = {}
}