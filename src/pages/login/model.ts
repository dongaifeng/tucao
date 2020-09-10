import { Reducer, Effect } from 'umi';
import { queryCurrent, queryList } from './service';
import { CurrentUser } from './data.d';

export interface ModelState {
  currentUser: Partial<CurrentUser>;
  list: [];
}

interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchCurrent: Effect;
    getList: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModelState>;
    saveList: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'center',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const { data } = yield call(queryCurrent);

      yield put({
        type: 'saveCurrentUser',
        payload: data,
      });
    },
    *getList({ payload }, { call, put }) {
      const { data } = yield call(queryList, { size: payload });
      yield put({
        type: 'saveList',
        payLoad: data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state: any, action) {
      console.log('action', action);
      return {
        ...state,
        currentUser: action.payload,
      };
    },

    saveList(state: any, { payLoad }) {
      return {
        ...state,
        list: payLoad,
      };
    },
  },
};

export default Model;
