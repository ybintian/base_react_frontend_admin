import * as articles from '../services/articles'
import { updateRecord, destroyRecord } from '../utils/list';

export default {
  namespace: 'articles',
  state: {
    detailVisible: false,
    record: {},
    records: [],
    pagination: {}
  },
  effects: {
    *get({ payload: { id } }, { call, put }) {
      const { data } = yield call(articles.get, { id });
      if (data.success) {
        yield put({ type: 'setRecord', payload: { data } });
      }
    },
    *fetch({ payload: { page, perPage } }, { call, put }) {
      const { data } = yield call(articles.fetch, { page: page, per_page: perPage });
      if (data.success) {
        yield put({ type: 'setRecords', payload: { data } });
      }
    },
    *create({ payload: { article } }, { call, put }) {
      const { data } = yield call(articles.create, { article });
      if (data.success) {
        yield put({ type: 'createRecord', payload: { record: data.record } });
      }
    },
    *update({ payload: { article, id } }, { call, put }) {
      const { data } = yield call(articles.update, { article , id});
      if (data.success) {
        yield put({ type: 'updateRecord', payload: { record: data.record } });
      }
    },
    *destroy({ payload: { id } }, { call, put }) {
      const { data } = yield call(articles.destroy, { id });
      if (data.success) {
        yield put({ type: 'destroyRecord', payload: { id } });
      }
    },
  },
  reducers: {
    setRecord (state, { payload }) {
      const { data } = payload;
      return { ...state, record: data.record};
    },
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
      return { ...state, records: [...records]};
    },
    changeDetailVisible (state, { payload }) {
      return { ...state, detailVisible: !state.detailVisible};
    },
  }
}