import React, { Component } from 'react';

export default class BaseLayout extends Component {
  constructor() {
    super(...arguments);
  }

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