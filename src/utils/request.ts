/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request';
import { notification, message } from 'antd';

console.log(process.env.NODE_ENV, '-----');

const is_dev = process.env.NODE_ENV === 'development';

const codeMessage: { [propName: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */

const errorHandler = (error: { response: Response }) => {
  const { response } = error;

  if (response && response.status && is_dev) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  return response;
};

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  // getResponse: true,
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  let c_token = localStorage.getItem('x-auth-token');
  if (c_token) {
    const headers = {
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',
      Authorization: 'Bearer ' + c_token,
    };
    return {
      url: url,
      options: { ...options, headers: headers },
    };
  } else {
    return {
      url: url,
      options: { ...options },
    };
  }
});

// response拦截器, 处理response
request.interceptors.response.use(async (response, options) => {
  // let token = response.headers.get('x-auth-token');
  // if (token) {
  //   localStorage.setItem('x-auth-token', token);
  // }
  const data = await response.clone().json();
  console.log(is_dev);

  if (is_dev) {
    if (data.code === 'error') {
      notification.error({
        message: `请求错误 ${data.code}: ${response.url}`,
        description: data.message,
      });
    } else if (data.code === 'timeout') {
      notification.error({
        message: `token过期，请重新登录： ${data.code}: ${response.url}`,
        description: data.message,
      });
    } else if (data.code === 'no-login') {
      message.info('您还没有登录');
    }
  }
  return response;
});

export default request;
