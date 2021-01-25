import { history, Reducer, Effect } from 'umi';
import {
  register,
  login,
  getSvgCode,
  queryUser,
  modifyUser,
} from '@/service/user';
import { message } from 'antd';
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
    fetchUser: Effect;
    modifyUser: Effect;
  };
  reducers: {
    saveRegister: Reducer;
    saveLogin: Reducer;
    saveSvgCode: Reducer;
    saveUser: Reducer;
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

      if (res.code === 'success') {
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

    *fetchUser({}, { call, put }) {
      const res = yield call(queryUser);
      if (res.code === 'success') {
        localStorage.setItem('userid', res.data.user_id);

        yield put({
          type: 'saveUser',
          payload: res.data || null,
        });
      }
    },

    *modifyUser({ payload }, { put, call }) {
      const res = yield call(modifyUser, payload);
      if (res.code === 'success') {
        message.success(`${res.data.name}, 恭喜您修改信息成功！`);
      }
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

    saveUser(state: any, action) {
      return {
        ...state,
        userInfo: action.payload || {},
      };
    },
  },
};

export default Model;
