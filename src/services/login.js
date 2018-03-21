import request from '../utils/request';

export function fetch(params = {}) {
  return request('/admin_api/v1/authentication/login', {
    method: 'post',
    body: JSON.stringify(params),
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
  });
}