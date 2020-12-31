import { Effect, Reducer } from 'umi';
import { ListItemDataType } from './data.d';
import { CurrentUser } from '@/models/gloal';
import { queryList, queryUser, publish, collect, like } from './service';
import { message } from 'antd';

export interface StateType {
  list: ListItemDataType[];
  recommend: ListItemDataType[];
  currentUser: Partial<CurrentUser>;
  likeArticles: number[];
}

interface EffectsType {
  fetchData: Effect;
  loadMore: Effect;
  fetchUser: Effect;
  fetchRecommend: Effect;
  publish: Effect;
  collect: Effect;
  like: Effect;
}

interface ReducersType {
  queryList: Reducer<StateType>;
  saveUser: Reducer<StateType>;
  saveRecommend: Reducer<StateType>;
  saveLoadMore: Reducer<StateType>;
  saveLikeArticles: Reducer<StateType>;
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
    likeArticles: [],
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      const { data } = yield call(queryList, payload);

      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },

    *loadMore({ payload, callback }, { call, put }) {
      const { data } = yield call(queryList, payload);

      if (callback) {
        callback();
      }

      if (data.length > 0) {
        yield put({
          type: 'saveLoadMore',
          payload: Array.isArray(data) ? data : [],
        });
        return false;
      }

      message.info('没有更多了！');
    },

    *collect({ payload, callback }, { call, put }) {
      const res = yield call(collect, payload);
      if (res.code === 'success') {
        message.success(res.message || '成功');
        if (callback) {
          callback();
        }
      }
    },

    *like({ payload, callback }, { call, put }) {
      const res = yield call(like, payload);
      if (res.code === 'success') {
        message.success(res.message || '成功');

        yield put({
          type: 'saveLikeArticles',
          payload: payload.id,
        });

        if (callback) {
          callback();
        }
      }
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

    saveLoadMore(state: any, action) {
      const arr = state.list;
      return {
        ...state,
        list: [...arr, ...action.payload],
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

    saveLikeArticles(state: any, { payload }) {
      const arr = [...state.likeArticles, payload];
      return {
        ...state,
        likeArticles: arr,
      };
    },
  },
};

export default Model;
