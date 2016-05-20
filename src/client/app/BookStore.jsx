import React from 'react';
import BookList from './BookList.jsx';
import ShippingDetails from './ShippingDetails.jsx';
import DeliveryDetails from './DeliveryDetails.jsx';
import SetIntervalMixin from "./SetIntervalMixin.jsx";


var BookStore = React.createClass({

  getInitialState(){
    return (
    {step: 1, timeOut: 60*15}
    );
  },

  updateTimeOut(timeOut){
    this.setState({timeOut: timeOut})
  },

  handleSubmit(){
    this.setState({step: this.state.step + 1});
  },

  render(){
    switch(this.state.step){
      case 1:
        return < BookList submitHandler={this.handleSubmit}
                          timeOut={this.state.timeOut}
                          updateTimeOut={this.updateTimeOut} />;
      case 2:
        return < ShippingDetails submitHandler={this.handleSubmit} />;
      case 3:
        return < DeliveryDetails submitHandler={this.handleSubmit} />;
    }
  }

});

export default BookStore;
