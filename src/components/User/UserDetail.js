import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect(({ users }) =>({
  visible: users.detailVisible,
}))
export class UserDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
  }

  handleCancel = () => {
    this.props.dispatch({
      type: 'users/changeDetailVisible',
    })
  }

  render() {
    return (
      <Modal visible={this.props.visible} onOk={this.handleCancel} onCancel={this.handleCancel}>
        xxxxxxx
      </Modal>
    );
  }
}