import request from '@/utils/request';

export async function queryTucao(params: any) {
  return request('/api/article/' + params.userId, {
    params,
  });
}

export async function queryUserInfo(data: any) {
  return request('/api/getUser', {
    method: 'POST',
    data,
  });
}

export async function follow(data: any) {
  return request('/api/follow', {
    method: 'POST',
    data,
  });
}

export async function cancelFollow(data: any) {
  return request('/api/cancelFollow', {
    method: 'POST',
    data,
  });
}

export async function addTags(data: any) {
  return request('/api/addTags', {
    method: 'POST',
    data,
  });
}
