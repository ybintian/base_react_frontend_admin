import request from '../utils/request';

export function login(params = {}) {
  return request('/admin_api/v1/authentication/login', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export function check(params = {}) {
  return request('/admin_api/v1/authentication/check', {
    method: 'get',
  });
}