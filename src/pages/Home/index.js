import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BaseLayout
} from '../../components';

export class Home extends Component{
  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div>
          this is home
        </div>
      </BaseLayout>
    );
  }
}