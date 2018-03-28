import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'dva';
import './index.less';

@connect()
export class GlobalHeader extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  }

  handleLogout = () => {
    this.props.dispatch({
      type: 'login/logout',
    })
  }

  render() {
    const {
       collapsed
    } = this.props;

    const menu = (
      <Menu className="menu" selectedKeys={[]}>
        <Menu.Divider />
        <Menu.Item key="logout">
          <div onClick={this.handleLogout}>
            <Icon type="logout" />退出登录
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className="right">
          <Dropdown overlay={menu}>
            <span>
              <Avatar size="small" className="avatar" />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}
