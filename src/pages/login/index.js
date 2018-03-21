import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  LoginForm
} from '../../components';
import './index.less';


const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    console.info(111, this.props);
  }

  componentDidUpdate() {
    console.info(111, this.props);
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        username: 'admin',
        password: '123456',
      }
    })
  }
  
  render() {
    
    return (
      <div className="user-login bg" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="user-login content-wraper">
          <div className="user-login form-wraper">
            <h3 className="user-login form-title" onClick={this.handleSubmit}>登录</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.info(state);
  return {
  };
}

const LoginWraper = connect(mapStateToProps)(Login)

export { LoginWraper as Login };
