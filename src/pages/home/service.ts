import request from '@/utils/request';

export async function queryList(params: any) {
  return request('/api/article', {
    params,
  });
}

export async function queryUser(params: any) {
  return request('/api/getUser', {
    params,
  });
}

export async function publish(data: any) {
  return request('/api/article', {
    method: 'POST',
    data,
  });
}
