import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CheckLayout from './layouts/CheckLayout';
import {
  Login,
  Home,
} from './pages';

const BaseRoute = ({ component: Component, ...rest }) =>{
  return (
    <Route {...rest} render={props => (
      <CheckLayout history={props.history}>
        <Component {...props}/>
      </CheckLayout>
    )}/>
  );
}

export default function ({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <BaseRoute path="/index" component={Home}/>
        <BaseRoute path="/" component={Home}/>
      </Switch>
    </Router>
  );
}