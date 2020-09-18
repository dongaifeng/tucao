import { Effect, Reducer } from 'umi';
import { ListItemDataType } from './data.d';

import { queryList } from './service';

export interface StateType {
  list: ListItemDataType[];
}

interface EffectsType {
  fetchData: Effect;
}

interface ReducersType {
  queryList: Reducer;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: EffectsType;
  reducers: ReducersType;
}

const Model: ModelType = {
  namespace: 'home',
  state: {
    list: [],
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      const res = yield call(queryList, payload);

      yield put({
        type: 'queryList',
        payload: Array.isArray(res) ? res : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
