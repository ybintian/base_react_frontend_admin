import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import Router from './router';
import 'antd/dist/antd.less';

const app = dva({
  history: createHistory(),
});

app.router(Router);

app.start('#root');
