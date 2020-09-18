import request from 'umi-request';

export async function queryList(params: any) {
  return request('/api/get_list', {
    params,
  });
}
