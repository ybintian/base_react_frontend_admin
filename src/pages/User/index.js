import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BaseLayout
} from '../../components';

export class User extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div>
          user user user user
        </div>
      </BaseLayout>
    );
  }
}