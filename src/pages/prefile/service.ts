import request from '@/utils/request';

export async function queryUserInfo(data: any) {
  return request('/api/getUser', {
    method: 'POST',
    data,
  });
}
