import React, { Component } from 'react';

export default class BaseLayout extends Component {

  componentDidMount() {
  }

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}