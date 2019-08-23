import { encode, decode, hashCode } from './code';
import Config from './config.json';
// 当然 config 可以放在其他地方比如全局
/**
 * 设置sessionStroage
 *
 * @param {string} key
 * @param {string} val
 */
export function setSession(key, val) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, val.toString());
}

/**
 * sessionStorage中获取指定值
 *
 * @param  {string} key
 * @return {string}
 */
export function getSession(key) {
  return sessionStorage.getItem(key);
}

/**
 * sessionStorage中移除指定值
 *
 * @param {string} key
 */
export function removeSession(key) {
  sessionStorage.removeItem(key);
}

/**
 * 设置localStroage
 *
 * @param {string} key
 * @param {string} val
 */
export function setLocal(key, val) {
  localStorage.removeItem(key);
  localStorage.setItem(key, val.toString());
}

/**
 * localStorage中获取指定值
 *
 * @param  {string} key
 * @return {string}
 */
export function getLocal(key) {
  return localStorage.getItem(key);
}

/**
 * localStorage中移除指定值
 *
 * @param {string} key
 */
export function removeLocal(key) {
  localStorage.removeItem(key);
}

/**
 * 设置cookie
 *
 * @param {string} key  cookie的key
 * @param {string} val  cookie的值
 * @param {number} days 过期日期(可选 不设置时 默认为1 单位天)
 */
export function setCookie(key, val, days) {
  const exp = new Date();
  exp.setTime(exp.getTime() + ((days || 1) * 24 * 60 * 60 * 1000));
  const v = escape(val);
  document.cookie = `${key}=${v};expires=${exp.toGMTString()}`;
}

/**
 * 获取指定cookie
 *
 * @param  {string} key cookie的key
 * @return {string}     若未取到则为null
 */
export function getCookie(key) {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  return arr ? unescape(arr[2]) : null;
}

/**
 * 移除cookie(设置其过期)
 *
 * @param {string} key
 */
export function removeCookie(key) {
  const val = getCookie(key);
  if (val !== null) {
    // 设置过期时间为前一天
    setCookie(key, val, -1);
  }
}

/**
 * 设置指定用户token到本地(存储格式为 username-tk: tk)
 *
 * @param {string} username
 * @param {string} tk
 */
export function setToken(username, tk) {
  setCookie(`${Config.app}_USR`, username);
  const key = `${username}-tk`;
  setSession(hashCode(key), encode(tk, 'base64'));
}

/**
 * 获取指定用户本地token
 *
 * @param  {string} username
 * @return {string}
 */
export function getToken(username) {
  const key = `${username}-tk`;
  const val = getSession(hashCode(key));
  return val === null ? null : decode(val, 'base64');
}

/**
 * 移除指定用户本地token
 *
 * @param {string} username
 */
export function removeToken(username) {
  const key = `${username}-tk`;
  return removeSession(hashCode(key));
}
