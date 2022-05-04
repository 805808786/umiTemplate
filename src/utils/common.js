/* eslint-disable */
import { history } from 'umi';
import qs from 'qs';
import { cancelrequest } from './request';
import { message } from 'antd';

export function getPageQuery() {
  return qs.parse(window.location.href.split('?')[1]);
}

export function logout(shouldRedirect = true) {
  cancelrequest(); // 取消所有请求
  localStorage.clear();
  // const search = shouldRedirect ? qs.stringify({ redirect: window.location.href }) : '';
  const search = shouldRedirect
    ? qs.stringify({ url: window.location.href.split('worktable')[1] })
    : '';
  history.replace({
    pathname: '/login',
    search,
  });
}

export function notAuthorized() {
  cancelrequest(); // 取消所有请求
  history.replace('/notAuthorized');
}

export function createId() {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export function getFilenameFromUri(uri = '') {
  if (uri.indexOf('/') < 0) {
    return uri;
  }
  const chunks = uri.split('/');
  return chunks[chunks.length - 1];
}

export function getFileExtension(fileName = '') {
  if (fileName.indexOf('.') < 0) {
    return '';
  }
  return fileName.split('.').pop();
}

export function omitFileExtension(fileName = '') {
  if (fileName.indexOf('.') < 0) {
    return fileName;
  }
  const chunks = fileName.split('.');
  chunks.pop();
  return chunks.join('.');
}

// 接口解析
export function formatDataKeys(data = {}) {
  const result = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    result[newKey] = data[key];
  });
  return result;
}

export function packResponseData(res, throwErr) {
  if (!res) {
    return {};
  }
  const resData = formatDataKeys(res);
  let { msg, code, totalCount, data } = resData;
  if (![8200, 2000, 200].includes(code)) {
    msg && console.error(msg);
  } else {
    code = 2000;
  }
  // 兼容java数组接口
  const dataKeys = Object.keys(data ?? {});
  if (dataKeys.includes('data') && dataKeys.includes('data')) {
    totalCount = data.totalCount;
    data = data.data;
  }
  return { msg, code, totalCount, data };
}

export function setUserToken(token) {
  return localStorage.setItem('Authorization', token);
}

export function getUserToken(name) {
  return localStorage.getItem('Authorization');
}

export function getElementLocationFromBrowser(element) {
  if (element?.getBoundingClientRect) {
    const { x = 0, width = 0 } = element.getBoundingClientRect();
    const bodyWidth = document.body.offsetWidth;
    return x * 2 + width < bodyWidth ? 'left' : 'right';
  }
  return 'left';
}

export function twoDimensionalArray(array = [], divide = 2) {
  return array.reduce((arr, next, i) => {
    if (i % divide === 0) {
      arr.push([next]);
    } else {
      arr[arr.length - 1].push(next);
    }
    return arr;
  }, []);
}
