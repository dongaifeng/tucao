import { Effect, Reducer } from 'umi';
import { ListItemDataType, User } from './data.d';
import { queryList, queryUser, publish } from './service';
import { message } from 'antd';

export interface StateType {
  list: ListItemDataType[];
  recommend: ListItemDataType[];
  currentUser: Partial<User>;
}

interface EffectsType {
  fetchData: Effect;
  fetchUser: Effect;
  fetchRecommend: Effect;
  publish: Effect;
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
      const { data } = yield call(queryList, payload);

      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },

    *fetchUser({}, { call, put }) {
      const res = yield call(queryUser);
      yield put({
        type: 'saveUser',
        payload: res.data || {},
      });
    },

    *fetchRecommend({ payload }, { call, put }) {
      const { data } = yield call(queryList, payload);

      yield put({
        type: 'saveRecommend',
        payload: Array.isArray(data) ? data : [],
      });
    },

    *publish({ payload }, { call, select }) {
      const currentUser = yield select((state: any) => state.home.currentUser);
      const res = yield call(publish, { ...payload, ...currentUser });
      console.log(res, '<------');
      if (res.code === 2000) {
        message.success('发表成功！');
      }
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
