import request from '../utils/request';

export function get(params) {
  return request(`/admin_api/v1/articles/${params.id}`, {
    method: 'get',
  });
}

export function fetch(params = {}) {
  return request('/admin_api/v1/articles', {
    method: 'get',
    params: params,
  });
}

export function create(params = {}) {
  return request('/admin_api/v1/articles', {
    method: 'post',
    params: params,
  });
}

export function update(params = {}, id) {
  return request(`/admin_api/v1/articles/${params.id}`, {
    method: 'put',
    params: params,
  });
}

export function destroy(params = {}) {
  return request(`/admin_api/v1/articles/${params.id}`, {
    method: 'delete',
  });
}
