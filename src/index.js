import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import Router from './router'

const app = dva({
  history: createHistory(),
});

app.router(Router);

app.start('#root');
