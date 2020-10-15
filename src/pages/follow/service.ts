import request from 'umi-request';

export async function queryFollows(params: any) {
  return request('/api/queryFollows', {
    params,
  });
}
