import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import './index.less';

export class GlobalHeader extends PureComponent {
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  }


  render() {
    const {
       collapsed
    } = this.props;
    return (
      <div className="header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className="right">
        </div>
      </div>
    );
  }
}
