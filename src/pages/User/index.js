import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import {
  BaseLayout,
  UserList,
  UserForm,
} from '../../components';

@connect()
export class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(...arguments);
    this.state = {
      formVisible: false,
    };
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

  render() {
    const { formVisible, formAction, record } = this.state;
    return (
      <BaseLayout {...this.props}>
        <div>
          <Row style={{height: 50}}>
            <Col span={20}>
            </Col>
            <Col span={4}>
              <Button onClick={this.handleNew} style={{margin: '5px 15px', float: 'right'}}>新建</Button>
            </Col>
          </Row>
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
