import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table } from 'antd';

function mapStateToProps(state) {
  return {
    results: state.users.results,
  };
}

@connect(mapStateToProps)
export class UserList extends Component {
  static propTypes = {
    results: PropTypes.array,
  }

  componentDidMount() {
  }

  render() {
    const columns = [
    { title: 'id', dataIndex: 'id', key: 'id'}, 
    { title: 'username', dataIndex: 'username', key: 'username'},
    { title: 'email', dataIndex: 'email', key: 'email'},
    { title: 'Action', key: 'action', render: (text, record) => (
        <span>
          <a style={{margin: 5}}>详情</a>
          <a style={{margin: 5}}>编辑</a>
          <a style={{margin: 5}}>删除</a>
        </span>
      ),
    }];

    return(
      <Table rowKey="id" columns={columns} dataSource={this.props.results} />
    );
  }
}
