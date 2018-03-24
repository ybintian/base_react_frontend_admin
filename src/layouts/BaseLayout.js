import React, { Component } from 'react';
import { connect } from 'dva';

class BaseLayout extends Component {

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

const BaseLayoutWraper = connect()(BaseLayout)

export default BaseLayoutWraper;