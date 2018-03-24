import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../../utils/pathTools';
import { Link } from 'dva/router';

import './index.less';

const { Sider } = Layout;

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter((item) => {
    return pathToRegexp(item).test(path);
  });
};

export class SideMenu extends Component {
  static propTypes = {
  }

  constructor() {
    super(...arguments);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(this.props),
      collapse: false,

    };
  }

  onClick = obj => {
    this.setState({
      selectedKeys: [obj.key],
    });
    if (this.props.onClick) return this.props.onClick(obj);
    const url = '/' + obj.keyPath.reverse().join('/');
    routerRedux.push(url);
  }

  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return urlToList(pathname).map(itemPath =>
      getMeunMatcheys(this.flatMenuKeys, itemPath).pop(),
    );
  }

  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    return urlToList(pathname)
      .map((item) => {
        return getMeunMatcheys(this.flatMenuKeys, item)[0];
      })
      .filter(item => item);
  }

  render() {
    const { collapsed, onCollapse } = this.props;
    const { openKeys } = this.state;
    const menuProps = collapsed
      ? {}
      : {
        openKeys,
      };

      let selectedKeys = this.getSelectedMenuKeys();
      if (!selectedKeys.length) {
        selectedKeys = [openKeys[openKeys.length - 1]];
      }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
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
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
          >
            <Menu.Item key="home">
              <Icon type="home" />
              <span className="nav-text">主页</span>
            </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
