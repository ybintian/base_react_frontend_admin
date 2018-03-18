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
        <div>
          header
        </div>
        {this.props.children}
        <div>
          footer
        </div>
      </div>
    );
  }
}