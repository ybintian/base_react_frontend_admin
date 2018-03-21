import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import Router from './router';
import 'antd/dist/antd.less';

const app = dva({
  history: createHistory(),
});

app.model(require('./models/login').default);

app.router(Router);

app.start('#root');
