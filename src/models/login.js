import * as login from '../services/login'

export default {
  namespace: 'login',

  state: {
    loginState: false,
  },

  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      const { data, headers } = yield call(login.fetch, { username, password });
      yield put({ type: 'setUser', payload: { data, total: headers['x-total-count'] } });
    },
  },
  reducers: {
    setUser (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}