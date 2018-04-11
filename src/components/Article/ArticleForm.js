import React, {Component} from 'react';
import {Modal, Form, Input, Select} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'dva';

const FormItem = Form.Item;
const createFormField = Form.createFormField;
const Option = Select.Option;

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
export class ArticleForm extends Component{
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
        article: values,
      }

      if(this.props.action === 'edit') {
        payload.id = this.props.record.id
        await this.props.dispatch({
          type: 'articles/update',
          payload: payload,
        });
      } else if(this.props.action === 'new') {
        await this.props.dispatch({
          type: 'articles/create',
          payload: payload,
        });
      }

      this.props.onCancel();
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible, onCancel} = this.props;
    return(
      <Modal title="文章表单" visible={visible} onOk={this.handleOk} onCancel={onCancel}>
        <Form>
          <FormItem
          {...formItemLayout}
            label="标题"
          >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '必填',
            }]
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
          {...formItemLayout}
            label="分类"
          >
          {getFieldDecorator('category', {
            rules: [{
              required: true, message: '必选',
            }]
          })(
            <Select>
              <Option value="rich_text">富文本</Option>
              <Option value="markdown">markdown</Option>
            </Select>
          )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}