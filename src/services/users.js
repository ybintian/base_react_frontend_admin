import request from '../utils/request';

export function fetch(params = {}) {
  return request('/admin_api/v1/users', {
    method: 'get',
    params: params,
  });
}

export function create(params = {}) {
  return request('/admin_api/v1/users', {
    method: 'post',
    params: params,
  });
}

export function update(params = {}, id) {
  return request(`/admin_api/v1/users/${params.id}`, {
    method: 'put',
    params: params,
  });
}

export function destroy(params = {}) {
  return request(`/admin_api/v1/users/${params.id}`, {
    method: 'delete',
  });
}
