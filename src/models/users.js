import * as users from '../services/users'

export default {
  namespace: 'users',
  state: {
    results: [],
    pagination: {}
  },
  effects: {
    *fetch({ payload: { page, perPage } }, { call, put }) {
      const { data } = yield call(users.fetch, { page: page, per_page: perPage });
      if (data.success) {
        yield put({ type: 'setResults', payload: { data } });
      }
    },
  },
  reducers: {
    setResults (state, { payload }) {
      const { data } = payload;
      return { ...state, results: data.results, pagination: data.pagination};
    },
  }
}