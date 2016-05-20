import React from 'react';

var TimeoutMixin = {
  componentWillMount() {
    this.setInterval(this.decrementTimer, 1000);
  },

  decrementTimer(){
    if (this.state.timeOut == 0) {
      this.props.alertTimeout();
      return;
    }
    this.setState({timeOut: this.state.timeOut - 1});
  },

  componentWillUnMount() {
    this.updateTimeOut(this.state.timeOut)
  }

};

module.exports = TimeoutMixin;

export default TimeoutMixin;
