import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { List } from 'antd';
import E from 'wangeditor';
import { connect } from 'dva';
import './index.less';


@connect(({ articles }) => ({
  records: articles.records,
}))
export class RichTextEditor extends Component {
  static propTypes = {
    records: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentId: null,
    };
  }
  
  componentDidMount() {
    this.handleInitEditor();
    this.props.dispatch({
      type: 'articles/fetch',
      payload: {
        page: 1,
        perPage: 10,
      },
    });
  }

  handleInitEditor = () => {
    const div1 = this.refs.div1
    const editor = new E(div1);
    editor.create();
  }

  renderArticleList = () => {
    const { records } = this.props;
    return (
      <div>
        <List
          dataSource={records}
          renderItem={this.renderArticleListItem}
        />
      </div>
    );
  }

  renderArticleListItem = (record) => {
    const { currentId } = this.state;
    if (currentId && currentId === record.id) {
      return (
        <div
          onClick={this.handleListItemClick.bind(this, record)}
          style={{
            height: '40px',
            lineHeight: '40px',
            margin: '10px',
            color: '#F2F2F2',
            backgroundColor: '#666',
            padding: '0px 10px',
            borderLeft: '3px solid #ec7259',
          }}>
          {record.title}
        </div>
      );
    }

    return (
      <div 
        onClick={this.handleListItemClick.bind(this, record)}
        style={{
          height: '40px',
          lineHeight: '40px',
          margin: '10px',
          color: '#F2F2F2',
          padding: '0px 10px',
        }}>
        {record.title}
      </div>
    );
  }

  handleListItemClick = (record) => {
    this.setState({
      currentId: record.id,
    })
  }

  render() {
    return(
      <div>
        <Row style={{height: '100vh'}}>
          <Col span={8} style={{color: '#aaa'}}>
            <div style={{height: '100vh', backgroundColor: '#404040'}}>
              {this.renderArticleList()}
            </div>
          </Col>
          <Col span={15} offset={1} style={{height: '100vh'}}>
            <div ref="div1" className="text"/>
          </Col>
        </Row>
      </div>
    );
  }
}