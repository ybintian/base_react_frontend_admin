import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {


  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Form>
        <FormItem
          style={{width: 240}}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            } placeholder="用户名" />
          )}
        </FormItem>

        <FormItem
          style={{width: 240}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            } type="password" placeholder="密码" />
          )}
        </FormItem>
        
        <FormItem
          style={{width: 240}}>
          <Button type="primary" htmlType="submit" style={{width: 240}}>登录</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export { WrappedLoginForm as LoginForm };