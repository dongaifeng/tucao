import { history, Reducer, Effect } from 'umi';
import { register, login } from '@/service/user';

import { CurrentUser } from './gloal.d';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  userInfo?: CurrentUser | null;
}

export interface UserModelType {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
    login: Effect;
  };
  reducers: {
    saveRegister: Reducer;
    saveLogin: Reducer;
  };
}

const Model: UserModelType = {
  namespace: 'user',

  state: {
    status: undefined,
    userInfo: null,
  },

  effects: {
    *register({ payload }, { put, call }) {
      const res = yield call(register, payload);
      yield put({
        type: 'saveRegister',
        payload: res || {},
      });
    },

    *login({ payload }, { put, call }) {
      const res = yield call(login, payload);

      yield put({
        type: 'saveLogin',
        payload: res || {},
      });
    },
  },

  reducers: {
    saveRegister(state: StateType, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },

    saveLogin(state: StateType, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
