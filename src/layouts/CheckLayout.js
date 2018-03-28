import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect()
export default class CheckLayout extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

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
