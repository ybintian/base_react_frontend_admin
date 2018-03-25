import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  BaseLayout,
  UserList,
} from '../../components';

class User extends Component {
  constructor() {
    super(...arguments);
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

function mapStateToProps(state) {
  return {
  };
}

const UserWraper = connect(mapStateToProps)(User)

export { UserWraper as User };