import { Reducer, Effect } from 'umi';
import { CurrentUser } from '@/models/gloal';
import { queryUserInfo, follow, cancelFollow } from './service';
import { message } from 'antd';
export interface ModalState {
  userInfo: Partial<CurrentUser>;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    getUserInfo: Effect;
    followHandle: Effect;
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
    *getUserInfo({ payload }, { call, put, select }) {
      let currentUserId = yield select(
        (state: any) => state.user.userInfo?.user_id,
      );

      if (!currentUserId) {
        currentUserId = localStorage.getItem('userid');
      }

      const response = yield call(queryUserInfo, { ...payload, currentUserId });

      yield put({
        type: 'saveUserInfo',
        payload: response.data ? response.data : {},
      });
    },

    *followHandle({ payload, callback }, { call, put }) {
      const { beFollowId, followStatus } = payload;
      let res, msg;
      if (followStatus) {
        // 取消关注
        res = yield call(cancelFollow, { beFollowId });
        msg = '取消关注成功';
      } else {
        // 关注
        res = yield call(follow, { beFollowId });
        msg = '关注成功';
      }

      if (res.code === 'success') {
        message.success(res.message || res);
        if (callback) callback();
      }
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
