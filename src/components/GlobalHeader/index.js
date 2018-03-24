import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import './index.less';

export class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  // triggerResizeEventWraper = Debounce(this.triggerResizeEvent)(600);

  triggerResizeEvent = () => { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
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
