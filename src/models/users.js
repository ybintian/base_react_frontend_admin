import * as users from '../services/users'
import { updateRecord } from '../utils/list';

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
    *update({ payload: { user, id } }, { call, put }) {
      const { data } = yield call(users.update, { user , id});
      if (data.success) {
        yield put({ type: 'updateResult', payload: { result: data.result } });
      }
    },
  },
  reducers: {
    setResults (state, { payload }) {
      const { data } = payload;
      return { ...state, results: data.results, pagination: data.pagination};
    },
    updateResult (state, { payload }) {
      const results = updateRecord(state.results, payload.result);
      return { ...state, results: [...results]};
    }
  }
}