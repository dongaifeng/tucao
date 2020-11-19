// 运行时配置

import { message } from 'antd';
export const dva = {
  config: {
    // dva里，effects和subscriptions的抛错全部会走onError hook，所以可以在onError里统一处理错误。
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
