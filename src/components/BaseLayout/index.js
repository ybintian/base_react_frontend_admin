import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { SideMenu, GlobalHeader } from '../';

const { Content, Header, Footer } = Layout;

@connect(({ global }) => ({
  collapsed: global.collapsed,
}))
export class BaseLayout extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  render() {
    const {
      collapsed,
      location,
      history,
    } = this.props;

    return (
      <Layout>
        <SideMenu
          collapsed={collapsed}
          location={location}
          history={history} />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              collapsed={collapsed}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%', backgroundColor: '#fff' }}>
            {this.props.children}
          </Content>
          <Footer style={{ padding: 0 }}>
            footer
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
