import { Effect, Reducer } from 'umi';
import { ListItemDataType, User } from './data.d';
import { queryList, queryUser } from './service';

export interface StateType {
  list: ListItemDataType[];
  recommend: ListItemDataType[];
  currentUser: Partial<User>;
}

interface EffectsType {
  fetchData: Effect;
  fetchUser: Effect;
  fetchRecommend: Effect;
}

interface ReducersType {
  queryList: Reducer<StateType>;
  saveUser: Reducer<StateType>;
  saveRecommend: Reducer<StateType>;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: EffectsType;
  reducers: ReducersType;
}

// effect 得名字 不能和 reducer 相同 会循环调用
const Model: ModelType = {
  namespace: 'home',
  state: {
    list: [],
    recommend: [],
    currentUser: {},
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      const res = yield call(queryList, payload);

      yield put({
        type: 'queryList',
        payload: Array.isArray(res) ? res : [],
      });
    },

    *fetchUser({}, { call, put }) {
      const res = yield call(queryUser);
      yield put({
        type: 'saveUser',
        payload: res || {},
      });
    },

    *fetchRecommend({ payload }, { call, put }) {
      const res = yield call(queryList, payload);

      yield put({
        type: 'saveRecommend',
        payload: Array.isArray(res) ? res : [],
      });
    },
  },

  reducers: {
    queryList(state: any, action) {
      return {
        ...state,
        list: action.payload,
      };
    },

    saveUser(state: any, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },

    saveRecommend(state: any, action) {
      return {
        ...state,
        recommend: action.payload,
      };
    },
  },
};

export default Model;
