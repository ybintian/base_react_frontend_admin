import { message } from 'antd';
import fetch from 'dva/fetch';
import config from '../config';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if([401].indexOf(response.status) > -1){
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(_url, options) {
  const url = config.host + _url;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const Authorization = localStorage.getItem('Authorization');

  if (Authorization) headers.Authorization = Authorization;
  const response = await fetch(url, {
    ...options,
    headers: headers
  });

  checkStatus(response);

  const data = await response.json();
  
  if (data.success === false) {
    message.error(data.message);
  } else {
    message.success(data.message);
  }

  const ret = {
    data,
    headers: {},
  };


  return ret;
}
