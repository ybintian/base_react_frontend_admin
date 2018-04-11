import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import Router from './router';
import 'antd/dist/antd.less';

const app = dva({
  history: createHistory(),
});

app.model(require('./models/login').default);
app.model(require('./models/global').default);
app.model(require('./models/users').default);
app.model(require('./models/articles').default);

app.router(Router);

app.start('#root');
