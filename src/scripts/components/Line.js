'use strict';

import React from 'react';
import Firebase from 'firebase';

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line: []
    };
    this.fireRef = new Firebase('https://drank.firebaseio.com/');
    this.lineRef = this.fireRef.child('line');
    this.usersRef = this.fireRef.child('users');
  }

  componentWillMount() {
    let lineIds = [];
    this.lineRef.on('child_added', this.lineAdded.bind(this));
    this.lineRef.on('child_removed', this.lineRemoved.bind(this));
  }

  render() {
    return (
      <div id="carrousell">
        <button disabled={!this.props.userId} onClick={this.joinLine.bind(this)}>Join Line</button>
        {this.line}
      </div>
    );
  }

  lineAdded(snapshot) {
    this.usersRef.child(snapshot.key()).once('value', data => {
      let { line } = this.state;
      let val = data.val();
      line.push({
        id: val.id,
        name: val.name,
        profileImage: val.profileImage
      });
      this.setState({
        line: line
      });
    });
  }

  lineRemoved(snapshot) {
    let { line } = this.state;
    line.shift();
    this.setState({
      line: line
    });
  }

  get line() {
    return this.state.line.map(user => {
      return (
        <div className="next">
          <img src={user.profileImage} />
        </div>
      );
    });
  }

  joinLine() {
    this.lineRef.child(this.props.userId).set({
      joinedAt: Date.now()
    });
  }

  static PropTypes = {
    userId: React.PropTypes.string
  }

  static defaultProps = {
    userId: null
  }

  static contextTypes = {}
}