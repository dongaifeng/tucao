import { history, Reducer, Effect } from 'umi';
import { register } from '@/service/user';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  userInfo: {} | null;
}

export interface UserModelType {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
  };
  reducers: {
    saveRegister: Reducer;
  };
}

const Model: UserModelType = {
  namespace: 'user',

  state: {
    status: 'ok',
    userInfo: null,
  },

  effects: {
    *register({ payload }, { put, call }) {
      const res = yield call(register, payload);
      console.log(res, '<----res');
      yield put({
        type: 'saveRegister',
        payload: res || {},
      });
    },
  },

  reducers: {
    saveRegister(state: StateType, { payload }) {
      console.log(payload);
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default Model;
