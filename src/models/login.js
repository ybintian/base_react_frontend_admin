import * as login from '../services/login'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'login',
  state: {
    loginState: false,
    currentUser: {},
    token: '',
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      const { data } = yield call(login.login, { username, password });
      if (data.success) {
        localStorage.setItem('Authorization', data.token);
        yield put({ type: 'setUser', payload: { data } });
        yield put(routerRedux.push('/'));
      }
    },
    *logout({ payload }, { call, put }) {
      localStorage.setItem('Authorization', undefined);
      yield put({ type: 'unSetUser'});
      yield put(routerRedux.push('/login'));
    },
    *check(action, { call, put }) {
      const token = localStorage.getItem('Authorization');
      if (!token){ 
        yield put(routerRedux.push('/login'));
        yield put({ type: 'unSetUser'});
        return;
      }

      const { data } = yield call(login.check);
      if (data.success) {
        yield put({ type: 'setUser', payload: { data } });
      } else {
        yield put(routerRedux.push('/login'));
        yield put({ type: 'unSetUser'});
      }
    },
  },
  reducers: {
    setUser (state, { payload }) {
      const { data } = payload;
      return { ...state, currentUser: data.current_user, token: data.token, loginState: true };
    },
    unSetUser (state) {
      return { ...state, currentUser: {}, token: '', loginState: false };
    }
  }
}