import request from '../utils/request';

export function fetch(params = {}) {
  return request('/admin_api/v1/users', {
    method: 'get',
    params: params,
  });
}
