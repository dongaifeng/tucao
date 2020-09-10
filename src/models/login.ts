import { history, Reducer, Effect } from 'umi';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {};
  reducers: {};
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: 'ok',
  },

  effects: {},

  reducers: {},
};

export default Model;
