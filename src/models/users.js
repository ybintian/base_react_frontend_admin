import * as users from '../services/users'
import { updateRecord, destroyRecord } from '../utils/list';

export default {
  namespace: 'users',
  state: {
    records: [],
    pagination: {}
  },
  effects: {
    *fetch({ payload: { page, perPage } }, { call, put }) {
      const { data } = yield call(users.fetch, { page: page, per_page: perPage });
      if (data.success) {
        yield put({ type: 'setRecords', payload: { data } });
      }
    },
    *create({ payload: { user } }, { call, put }) {
      const { data } = yield call(users.create, { user });
      if (data.success) {
        yield put({ type: 'createRecord', payload: { record: data.record } });
      }
    },
    *update({ payload: { user, id } }, { call, put }) {
      const { data } = yield call(users.update, { user , id});
      if (data.success) {
        yield put({ type: 'updateRecord', payload: { record: data.record } });
      }
    },
    *destroy({ payload: { id } }, { call, put }) {
      const { data } = yield call(users.destroy, { id });
      if (data.success) {
        yield put({ type: 'destroyRecord', payload: { id } });
      }
    },
  },
  reducers: {
    setRecords (state, { payload }) {
      const { data } = payload;
      return { ...state, records: data.records, pagination: data.pagination};
    },
    createRecord (state, { payload }) {
      return { ...state, records: [payload.record, ...state.records]};
    },
    updateRecord (state, { payload }) {
      const records = updateRecord(state.records, payload.record);
      return { ...state, records: [...records]};
    },
    destroyRecord (state, { payload }) {
      const records = destroyRecord(state.records, payload.id);
      return { ...state, records: [...state.records]};
    },
  }
}