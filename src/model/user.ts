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
      console.log(payload, res);

      put({
        type: 'saveRegister',
        payload: res || {},
      });
    },
  },

  reducers: {
    saveRegister(state: StateType, { payload }) {},
  },
};

export default Model;
