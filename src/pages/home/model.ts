import { Effect, Reducer } from 'umi';
import { CommentType } from './data.d';
import { ArticleType, CurrentUser } from '@/models/gloal';
import {
  queryList,
  queryUser,
  publish,
  collect,
  like,
  queryComment,
  createComment,
  queryFollowList,
} from './service';
import { message } from 'antd';

export interface StateType {
  list: ArticleType[];
  recommend: ArticleType[];
  currentUser: Partial<CurrentUser>;
  likeArticles: number[];
  comments: CommentType[];
  activeArticleId: number | undefined;
}

interface EffectsType {
  fetchData: Effect;
  loadMore: Effect;
  fetchUser: Effect;
  fetchRecommend: Effect;
  publish: Effect;
  collect: Effect;
  like: Effect;
  featchComment: Effect;
  createComment: Effect;
}

interface ReducersType {
  queryList: Reducer<StateType>;
  saveUser: Reducer<StateType>;
  saveRecommend: Reducer<StateType>;
  saveLoadMore: Reducer<StateType>;
  saveLikeArticles: Reducer<StateType>;
  saveComments: Reducer<StateType>;
  saveActiveArticleId: Reducer<StateType>;
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
    comments: [],
    activeArticleId: undefined,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      const { key, ...query } = payload;
      const api = key === 'tab1' ? queryList : queryFollowList;

      const { data } = yield call(api, query);

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

    *publish({ payload, callback }, { call, select }) {
      const currentUser = yield select((state: any) => state.home.currentUser);
      const res = yield call(publish, { ...payload, ...currentUser });
      console.log(res, '<------');
      if (res.code === 'success') {
        if (callback) callback();
      }
    },

    *featchComment({ payload }, { call, put }) {
      yield put({
        type: 'saveActiveArticleId',
        payload: payload?.articleId,
      });

      const { data } = yield call(queryComment, payload);

      yield put({
        type: 'saveComments',
        payload: Array.isArray(data) ? data : [],
      });
    },

    *createComment({ payload, callback }, { call, put, select }) {
      const { user_id } = yield select((state: any) => state.home.currentUser);
      const { data } = yield call(createComment, {
        ...payload,
        userId: user_id,
      });

      yield put({
        type: 'saveComments',
        payload: Array.isArray(data) ? data : [],
      });

      console.log(data);
      message.success('评论成功！');

      if (callback) callback();
    },
  },

  reducers: {
    saveActiveArticleId(state: any, action) {
      return {
        ...state,
        activeArticleId: action.payload,
      };
    },

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

    saveComments(state: any, { payload }) {
      return {
        ...state,
        comments: payload,
      };
    },
  },
};

export default Model;
