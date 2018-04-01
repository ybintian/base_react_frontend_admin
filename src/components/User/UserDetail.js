import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import zh_CN from '../../locales/zh_CN';

@connect(({ users }) =>({
  visible: users.detailVisible,
  record: users.record,
}))
export class UserDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    record: PropTypes.object,
  }

  handleCancel = () => {
    this.props.dispatch({
      type: 'users/changeDetailVisible',
    })
  }

  renderCol = () => {
    const { record } = this.props;
    return Object.entries(record).map((item, key) => {
      return(
        <Row key={key}>
          <Col span={4} style={{textAlign: 'right'}}>
            {zh_CN.user[item[0]] || item[0]}：
          </Col>

          <Col span={20}>
            {item[1]}
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <Modal title="详情" visible={this.props.visible} onOk={this.handleCancel} onCancel={this.handleCancel}>
        {this.renderCol()}
      </Modal>
    );
  }
}