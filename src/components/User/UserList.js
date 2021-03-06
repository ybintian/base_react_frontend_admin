import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table, Popconfirm } from 'antd';
import zh_CN from '../../locales/zh_CN';

function mapStateToProps(state) {
  return {
    records: state.users.records,
    pagination: state.users.pagination,
  };
}

@connect(mapStateToProps)
export class UserList extends Component {
  static propTypes = {
    records: PropTypes.array,
    onRecordAction: PropTypes.func,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        page: 1,
        perPage: 10,
      },
    });
  }

  handleActionsClick = (actionName, record) => {
    this.props.onRecordAction && this.props.onRecordAction(actionName,record);
  }

  handleChange = (v) => {
    const { per_page } = this.props.pagination;
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        page: v,
        perPage: per_page,
      },
    });
  }

  handleShowSizeChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        page: page,
        perPage: pageSize,
      },
    });
  }

  render() {
    const { page, per_page, total } = this.props.pagination;
    const columns = [
    { dataIndex: 'id', key: 'id'}, 
    { dataIndex: 'username', key: 'username'},
    { dataIndex: 'email', key: 'email'},
    { dataIndex: 'nickname', key: 'nickname'},
    { title: zh_CN.action, key: 'action', render: (text, record) => (
        <span>
          <a style={{margin: 5}} onClick={this.handleActionsClick.bind(this, 'detail', record)}>详细</a>
          <a style={{margin: 5}} onClick={this.handleActionsClick.bind(this, 'edit', record)}>修改</a>
          <Popconfirm 
            title="确认要删除吗？"
            okText="是"
            cancelText="否"
            onConfirm={this.handleActionsClick.bind(this, 'destroy', record)}>
            <a style={{margin: 5}}>删除</a>
          </Popconfirm>
        </span>
      ),
    }].map(res => {
      if (!res.title){
        return {...res, title: zh_CN.user[res.dataIndex] || res.dataIndex};  
      } else {
        return res;
      }
    });

    return(
      <div style={{margin: '5px 15px'}}>
        <Table rowKey="id" columns={columns} dataSource={this.props.records} pagination={{
          current: page,
          pageSize: per_page,
          total: total,
          onChange: this.handleChange,
          showSizeChanger: true,
          onShowSizeChange: this.handleShowSizeChange,
        }} />
      </div>
    );
  }
}
