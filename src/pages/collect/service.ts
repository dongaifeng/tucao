import request from '@/utils/request';

export async function queryCollect(params: any) {
  return request('/api/article/queryCollect', {
    params,
  });
}

export async function publish(data: any) {
  return request('/api/article', {
    method: 'POST',
    data,
  });
}
