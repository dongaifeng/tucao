import request from 'umi-request';

export async function queryFollows(params: any) {
  return request('/api/queryFollows', {
    params,
  });
}

export async function queryFans(params: any) {
  return request('/api/queryFans', {
    params,
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
