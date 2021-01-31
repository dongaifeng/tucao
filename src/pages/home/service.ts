import request from '@/utils/request';

export async function queryList(params: any) {
  return request('/api/article', {
    params,
  });
}

export async function queryFollowList(params: any) {
  return request('/api/article/follow', {
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

export async function collect(data: any) {
  return request('/api/article/collect', {
    method: 'POST',
    data,
  });
}

export async function like(data: any) {
  return request('/api/article/like', {
    method: 'POST',
    data,
  });
}

export async function queryComment(data: any) {
  return request('/api/article/queryComment', {
    method: 'POST',
    data,
  });
}

export async function createComment(data: any) {
  return request('/api/article/createComment', {
    method: 'POST',
    data,
  });
}
