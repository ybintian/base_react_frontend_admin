import React, { Component } from 'react';
import { connect } from 'dva';

class CheckLayout extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'login/check',
    });
  }


  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

const CheckLayoutWraper = connect()(CheckLayout)

export default CheckLayoutWraper;