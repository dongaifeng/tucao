import { history, Reducer, Effect } from 'umi';
import { register, login, getSvgCode } from '@/service/user';

import { CurrentUser } from './gloal.d';

export interface StateType {
  status?: 'ok' | 'error' | undefined;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  userInfo?: CurrentUser | null;
  svgCode?: String | undefined;
}

export interface UserModelType {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
    login: Effect;
    getSvgCode: Effect;
  };
  reducers: {
    saveRegister: Reducer;
    saveLogin: Reducer;
    saveSvgCode: Reducer;
  };
}

const Model: UserModelType = {
  namespace: 'user',

  state: {
    status: undefined,
    userInfo: null,
    svgCode: undefined,
  },

  effects: {
    *register({ payload }, { put, call }) {
      const res = yield call(register, payload);
      yield put({
        type: 'saveRegister',
        payload: res || {},
      });
    },

    *login({ payload, callback }, { put, call }) {
      const res = yield call(login, payload);

      console.log(res);

      if (res.code === 2000) {
        if (callback && typeof callback === 'function') callback(res.data);

        yield put({
          type: 'saveLogin',
          payload: res || {},
        });
      }
    },

    *getSvgCode({}, { put, call }) {
      const res = yield call(getSvgCode);

      yield put({
        type: 'saveSvgCode',
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

    saveSvgCode(state: StateType, { payload }) {
      return {
        ...state,
        svgCode: payload,
      };
    },
  },
};

export default Model;
