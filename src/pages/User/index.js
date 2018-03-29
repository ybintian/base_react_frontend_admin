import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import {
  BaseLayout,
  UserList,
  UserForm,
} from '../../components';

@connect(({ users }) => ({
  pagination: users.pagination,
}))
export class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(...arguments);
    this.state = {
      formVisible: false,
    };
  }

  handleRecordAction = (actionName, record) => {
    console.info(record);
    switch(actionName){
      case 'detail':
        this.setState({record: record}, () => {
          this.setState({
            detailVisible: true,
          });
        });
        break;
      case 'edit':
        console.info(111111);
        this.setState({
          formAction: 'edit',
          record: record,
        }, () => {
          this.setState({
            formVisible: true,
          });
        });
        break;
      case 'destroy':
        this.props.dispatch({
          type: 'users/destroy',
          payload: {
            id: record.id,
          },
        });
        break;
      default:
        break;
    }
  }

  handleNew = () => {
    this.setState({
      formVisible: true,
      formAction: 'new',
    });
  }

  handleFormCancel = () => {
    this.setState({
      formVisible: false,
    });
  }

  handleSave = (record) => {
    this.setState({
      formVisible: false,
    });
  }

  handleRefresh = () => {
    const { page, per_page } = this.props.pagination;
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        page: page,
        perPage: per_page,
      },
    });
  }

  render() {
    const { formVisible, formAction, record } = this.state;
    return (
      <BaseLayout {...this.props}>
        <div>
          <div style={{height: 50}}>
            <div>
              <Button onClick={this.handleRefresh} style={{margin: '5px 15px', float: 'right'}}>刷新</Button>
            </div>
            <div>
              <Button onClick={this.handleNew} style={{margin: '5px 15px', float: 'right'}}>新建</Button>
            </div>
          </div>
          <UserList onRecordAction={this.handleRecordAction} />
          <UserForm 
            visible={formVisible}
            onCreate={this.handleSave}
            onCancel={this.handleFormCancel}
            action={formAction}
            record={record}
          />
        </div>
      </BaseLayout>
    );
  }
}
