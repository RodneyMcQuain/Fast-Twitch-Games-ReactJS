import React, { Component } from 'react';
import './App.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

//Class for the status of the addition of a game.
class Status extends Component {
  /*If statusGood and statusBad are false take no action.
    If statusGood or statusBad is true return an appropriate
    status message and set a timeout to make it false in 3000ms so the
    status message will disappear.*/
  render() {
    const { statusGood, statusBad } = this.props;

    if (!statusGood && !statusBad)
      return (
        <ReactCSSTransitionReplace
          transitionName="cross-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key="transitioning-component-0"></div>
        </ReactCSSTransitionReplace>
      );
    else if (statusGood) {
      setTimeout(() => {this.props.setStatusGood(false)}, 3000);

      return (
        <ReactCSSTransitionReplace
          transitionName="cross-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key="transitioning-component-1" id="status-game-to-add" className="status-good">Successful</div>
        </ReactCSSTransitionReplace>
      );
    } else if (statusBad) {
      setTimeout(() => {this.props.setStatusBad(false)}, 3000);

      return (
        <ReactCSSTransitionReplace
          transitionName="cross-fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key="transitioning-component-2" id="status-game-to-add" className="status-bad">Duplicate, nothing added</div>
        </ReactCSSTransitionReplace>
      );
    }
  }
}

export default Status;
