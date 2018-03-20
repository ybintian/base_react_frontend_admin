import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import BaseLayout from './layouts/BaseLayout';
import {
  Login
} from './pages';

const HomePage = (props) => <div>{5}</div>

const IndexPage = () => <div>IndexPage</div>

const BaseRoute = ({ component: Component, ...rest }) =>{
  return (
    <Route {...rest} render={props => (
      <BaseLayout history={props.history}>
        <Component {...props}/>
      </BaseLayout>
    )}/>
  );
}

export default function ({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <BaseRoute path="/index" component={IndexPage}/>
        <BaseRoute path="/" component={HomePage}/>
      </Switch>
    </Router>
  );
}