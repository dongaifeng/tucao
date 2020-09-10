import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/queryCurrent');
}

export async function queryList(data: { size: number }) {
  return request('/api/queryList', {
    method: 'POST',
    data,
  });
}
