import request from 'umi-request';

export async function queryFollows(params: any) {
  return request('/api/queryFollows', {
    params,
  });
}

export async function follow(data: any) {
  return request('/api/follow', {
    method: 'POST',
    data,
  });
}
