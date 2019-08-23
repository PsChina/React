import axios from 'axios';
import { getCookie, getToken } from './storage';
import { encode } from './code';
import { callNotice } from './alert';
import Config from '../config/config.json';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleError(info, type) {
  callNotice(`${type} Failed`, info.toString(), 'error');
}

/**
 * 响应信息的个性化集中处理
 * 根据不同系统场景进行个性化调整
 */
function handleResult(detail) {
  if (detail && detail.rspCod === '_SSO_ERR') {
    callNotice('SSO Error', detail.rspMsg, 'warning');
    const btn = document.getElementById('reloginBtn');
    if (btn) {
      btn.click();
    }
  }
}

/**
 * 预处理请求地址中的请求参数(p=base64(params))
 * 返回处理后的地址
 */
function preUrl(url) {
  const arr = url.split('?');
  let params = '';
  if (arr.length > 1 && arr[1] !== '') {
    params = `?p=${encode(arr[1], 'base64')}`;
  }
  return `${arr[0]}${params}`;
}

function preFetchOpt(options) {
  const opt = options || {};
  // 非GET请求参数预处理(base64压缩)
  if (opt.body && opt.noEncrypt !== true) {
    opt.body = encode(opt.body, 'base64');
  }
  // 请求头预处理(tk, utf8编码)
  const headers = (opt.headers) ? opt.headers : {};
  if (!opt.noRequestTk) {
    const tk = getToken(getCookie(`${Config.app}_USR`));
    headers['Request-Tk'] = tk ? encode(tk, 'base64') : '';
  }
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json; charset=utf8';
  }
  opt.headers = headers;
  // delete no need prop
  delete opt.noEncrypt;
  delete opt.noRequestTk;
  return opt;
}

function preAjaxOpt(options) {
  const opt = options || {};
  const headers = opt.headers || {};
  const method = opt.method ? opt.method : 'get';
  // build new options
  opt.method = method;
  opt.responseType = 'json';
  if (opt.body) {
    opt.data = opt.noEncrypt ? opt.body : encode(opt.body, 'base64');
  }
  opt.headers = {
    ...headers,
    'Content-Type': headers['Content-Type'] || 'application/json; charset=utf8',
  };
  if (!opt.noRequestTk) {
    const tk = getToken(getCookie(`${Config.app}_USR`));
    opt.headers['Request-Tk'] = tk ? encode(tk, 'base64') : '';
  }
  // delete no need prop
  delete opt.body;
  delete opt.noEncrypt;
  delete opt.noRequestTk;
  return opt;
}

/**
 * 预处理请求配置options(body的base64压缩 headers的tk和编码)
 * 返回处理后的配置
 */
function preOpt(options, type) {
  if (type === 'fetch') {
    return preFetchOpt(options);
  } else if (type === 'ajax') {
    return preAjaxOpt(options);
  }
  return options || {};
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} requestUrl The URL we want to request
 * @param  {object} [options]  The options we want to pass to "fetch"
 * @return {object}            An object containing either "data" or "err"
 */
// export function fetch(requestUrl, options) {
//   // 请求url处理(参数base64压缩)
//   const url = ((options && options.noEncrypt) === true ? requestUrl : preUrl(requestUrl));
//   // 请求options处理(body and headers)
//   const opt = preOpt(options, 'fetch');
//   return fetch(url, opt).then(checkStatus).then(parseJSON).then(data => ({ data }))
//     .catch((err) => {
//       handleError(err, 'Fetch');
//       return { err };
//     });
// }

/**
 * Ajax request
 *
 * @param  {string} requestUrl The URL we want to request
 * @param  {object} [options]  The options we want to pass to "fetch"
 * @return {object}            An object containing either "data" or "err"
 */
export function request(requestUrl, options) {
  const url = ((options && options.noEncrypt) === true ? requestUrl : preUrl(requestUrl));
  const opt = preOpt(options, 'ajax')
  opt.url = url;
  return axios(opt).then(checkStatus)
    .catch((err) => {
      handleError(err, 'Ajax');
      return err;
    });
}

/**
 * 解析规范响应消息
 * response响应消息(mock: res.data, server: res): { rspCod: 200, rspMsg: 'xxx', rspObj: { obj1: {}, ... }, rspList: { list1: [], ... } }
 *
 * @param {object} res         response from mock or server
 * @return {objcet}
 */
export function parseResponse(res) {
  // mock data or real response data
  console.log('res =>', res);
  const detail = res.data || JSON.parse(res.request.responseText);
  handleResult(detail);
  return detail;
}

/**
 * 过滤不必要的请求参数
 *
 * @param {object} param
 * @return {object}
 */
export function filterParam(param) {
  const flag = typeof param === 'object';
  const obj = flag ? {} : param;
  if (flag) {
    const keys = Object.keys(param);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (param[key] === undefined || param[key] === null || param[key] === '') {
        // 过滤这一部分参数
      } else {
        obj[key] = param[key];
      }
    }
  }
  return obj;
}
