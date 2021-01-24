import { Reducer, Effect } from 'umi';
import { CurrentUser } from '@/models/gloal';
import { queryUserInfo } from './service';

export interface ModalState {
  userInfo: Partial<CurrentUser>;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    getUserInfo: Effect;
  };
  reducers: {
    saveUserInfo: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'prefile',

  state: {
    userInfo: {},
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(queryUserInfo, payload);

      yield put({
        type: 'saveUserInfo',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    saveUserInfo(state, action) {
      return {
        ...(state as ModalState),
        userInfo: action.payload || {},
      };
    },
  },
};

export default Model;
