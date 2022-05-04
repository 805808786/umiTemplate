/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
import config from 'config';
import { message } from 'antd';
import * as common from '@/utils/common';

let { token, cancel } = request.CancelToken.source();

export const cancelrequest = () => {
  cancel();
  token = request.CancelToken.source().token;
  cancel = request.CancelToken.source().cancel;
};

const fullUrlReg = /^(http|https)/;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const successHandler = (response) => {
  const { code, Code, msg } = response;
  switch (code || Code) {
    case 2000:
    case 8200:
      break;
    case 4002:
      common.logout();
      break;
    default:
      message.error(msg || '系统异常,请联系管理员');
      break;
  }

  return response;
};

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const { status } = response;
    switch (status) {
      case 401:
        common.logout();
        break;
      case 403:
        common.notAuthorized();
        break;
      default:
        message.error(`请求错误 ${codeMessage[status]}`);
        break;
    }
  } else if (!response) {
    if (!error.toString().startsWith('Cancel')) {
      message.error('网络异常');
    }
    return {};
  }

  return response;
};

export const createRequest = (
  extendOptions = {},
  success = successHandler,
  error = errorHandler,
) => {
  const req = extend({ ...extendOptions });

  const requestFunc = (url, method = 'GET', data, additional = {}) => {
    let { prefix } = extendOptions;
    prefix =
      prefix !== undefined
        ? prefix
        : fullUrlReg.test(url)
        ? ''
        : config.BASE_URL;
    const { headers } = additional;
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
        ...headers,
      },
      prefix,
      method,
      data,
      cancelToken: token,
      ...additional,
    };
    if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
      options.params = {
        ...data,
        ts: Date.now(),
      };
      options.data = {};
    }
    return req(url, options).then(success).catch(error);
  };
  return requestFunc;
};

export const requestWithoutPrefix = createRequest({ prefix: '' });

export default createRequest();
