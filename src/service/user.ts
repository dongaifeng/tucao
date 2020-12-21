import request from '@/utils/request';

export async function register(data: {}) {
  return request('/api/register', {
    method: 'POST',
    data,
  });
}
export async function login(data: {}) {
  return request('/api/login', {
    method: 'POST',
    data,
  });
}
export async function getSvgCode() {
  return request('/api/captcha', {
    method: 'get',
  });
}
export async function sendCode(params: { email: string }) {
  return request('/api/sendcode', {
    method: 'get',
    params,
  });
}

export async function queryUser(params: any) {
  return request('/api/getUser', {
    params,
  });
}

export async function modifyUser(data: any) {
  return request('/api/updateUser', {
    method: 'POST',
    data,
  });
}

export async function uploadFile(data: any) {
  return request('/api/uploadFile', {
    // headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    data,
  });
}
