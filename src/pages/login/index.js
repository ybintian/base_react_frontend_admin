import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LoginForm
} from '../../components';
import './index.less';


const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
  }

  componentDidMount() {
  }
  
  render() {
    
    return (
      <div className="user-login bg" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="user-login content-wraper">
          <div className="user-login form-wraper">
            <h3 className="user-login form-title">登录</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}



export { Login };
