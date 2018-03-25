import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  BaseLayout,
  UserList,
} from '../../components';

@connect()
export class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        page: 1,
        perPage: 10,
      },
    })
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div>
          <UserList />
        </div>
      </BaseLayout>
    );
  }
}
