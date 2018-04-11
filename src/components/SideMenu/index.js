import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'dva/router';

import './index.less';

const { Sider } = Layout;

export class SideMenu extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  constructor() {
    super(...arguments);
    const fullPath = `${this.props.location.pathname}${this.props.location.search}`;
    const pathArray = fullPath && fullPath.split('/');
    const isInit = !pathArray[pathArray.length-2] && !pathArray[pathArray.length-1];
    this.state = {
      selectedKeys: isInit ?  ['home'] : [pathArray[pathArray.length - 1]],
      defaultOpenKeys: isInit ? [] : [pathArray[pathArray.length - 2]],
    };
  }

  onClick = obj => {
    this.setState({
      selectedKeys: [obj.key],
    });
    if (this.props.onClick) return this.props.onClick(obj);
    const url = '/' + obj.keyPath.reverse().join('/');
    this.props.history.push(url);
  }

  render() {
    const { collapsed } = this.props;
    const { selectedKeys } = this.state;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        width={256}
        className="sider"
      > 
        <div className="logo" key="logo">
          <Link to="/">
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
          onClick={this.onClick}
          >
            <Menu.Item key="home">
              <Icon type="home" />
              <span className="nav-text">主页</span>
            </Menu.Item>

            <Menu.Item key="users">
              <Icon type="user" />
              <span className="nav-text">用户</span>
            </Menu.Item>

            <Menu.Item key="articles">
              <Icon type="book" />
              <span className="nav-text">文章</span>
            </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
