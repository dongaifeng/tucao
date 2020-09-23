import request from 'umi-request';

export async function queryList(params: any) {
  return request('/api/getList', {
    params,
  });
}

export async function queryUser(params: any) {
  return request('/api/getUser', {
    params,
  });
}
