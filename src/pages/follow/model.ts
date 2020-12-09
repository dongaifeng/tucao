import { Effect, Reducer } from 'umi';
import { FollowType } from './data.d';
import { queryFollows } from './service';

export interface StateType {
  follows: FollowType[];
}

interface EffectsType {
  fetchFollows: Effect;
}

interface ReducersType {
  saveFollows: Reducer<StateType>;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: EffectsType;
  reducers: ReducersType;
}

const Model: ModelType = {
  namespace: 'follow',
  state: {
    follows: [],
  },
  effects: {
    *fetchFollows({ payload }, { call, put }) {
      const { data } = yield call(queryFollows, payload);

      yield put({
        type: 'saveFollows',
        payload: Array.isArray(data) ? data : [],
      });
    },
  },

  reducers: {
    saveFollows(state: any, action) {
      return {
        ...state,
        follows: action.payload,
      };
    },
  },
};

export default Model;
