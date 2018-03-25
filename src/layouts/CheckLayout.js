import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
export default class CheckLayout extends Component {

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
