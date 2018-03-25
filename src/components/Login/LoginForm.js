import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
export class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.object,
  }

  handleSubmit = () => {
    this.props.form.validateFields( async (errors, values) => {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values
        },
      });
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          style={{width: 240}}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '必填' }],
          })(
            <Input prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            } placeholder="用户名" />
          )}
        </FormItem>

        <FormItem
          style={{width: 240}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '必填' }],
          })(
            <Input prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            } type="password" placeholder="密码" />
          )}
        </FormItem>
        
        <FormItem
          style={{width: 240}}>
          <Button type="primary" style={{width: 240}} onClick={this.handleSubmit}>登录</Button>
        </FormItem>
      </Form>
    );
  }
}
