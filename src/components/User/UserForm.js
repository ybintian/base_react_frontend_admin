import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'dva';

const FormItem = Form.Item;
const createFormField = Form.createFormField;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const createForm = Form.create;

@connect()
@createForm({
  mapPropsToFields(props) {
    const {record, action} = props;
    let initValues = {};
    if (record && action === 'edit') {
      Object.entries(record).forEach(
        (item) => {
          if ([
            // date cols
          ].indexOf(item[0]) > -1) {
            initValues[item[0]] = createFormField({
              value: item[1] && moment(item[1])
            });
          } else {
            initValues[item[0]] = createFormField({
              value: item[1]
            });
          }
        }
      );
    }
    return initValues;
  }
})
export class UserForm extends Component{
  static propTypes = {
    form: PropTypes.object,
    action: PropTypes.string,
    visible: PropTypes.bool,
    record: PropTypes.object,
    onCreate: PropTypes.func,
    handleCancel: PropTypes.func,
    dispatch: PropTypes.func,
  }

  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
    }
  }

  handleOk = () => {
    this.props.form.validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      let payload = {
        user: values,
      }

      if(this.props.action === 'edit') {
        payload.id = this.props.record.id
        await this.props.dispatch({
          type: 'users/update',
          payload: payload,
        });
      } else if(this.props.action === 'new') {
        await this.props.dispatch({
          type: 'users/create',
          payload: payload,
        });
      }

      this.props.onCancel();
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码必须一致');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible, onCancel} = this.props;
    return(
      <Modal title="用户表单" visible={visible} onOk={this.handleOk} onCancel={onCancel}>
        <Form>
          <FormItem
          {...formItemLayout}
            label="用户名"
          >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '必填',
            }]
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
          {...formItemLayout}
            label="昵称"
          >
          {getFieldDecorator('nickname', {
            rules: [{
              required: true, message: '必填',
            }]
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
          {...formItemLayout}
            label="邮箱"
          >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '错误的邮箱格式',
            }, {
              required: true, message: '必填',
            }],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
          {...formItemLayout}
            label="密码"
          >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '必填',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
          </FormItem>

          <FormItem
          {...formItemLayout}
            label="密码"
          >
          {getFieldDecorator('password_confirmation', {
            rules: [{
              required: true, message: '必填',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" />
          )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}