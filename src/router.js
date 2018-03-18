import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import BaseLayout from './layouts/BaseLayout';

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
        <BaseRoute path="/" component={HomePage}/>
        <BaseRoute path="/index" component={IndexPage}/>
      </Switch>
    </Router>
  );
}