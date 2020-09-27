import request from 'umi-request';

export async function register(data: {}) {
  return request('/api/register', {
    method: 'POST',
    data,
  });
}
