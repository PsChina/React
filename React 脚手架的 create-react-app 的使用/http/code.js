import pako from 'pako';
import utils from 'utility';  // https://github.com/node-modules/utility

export function encode(str, type, opt) {
  let s = str;
  switch (type) {
    case 'base64':
      // opt is true means code result is url safe
      s = (opt === true ? utils.base64encode(str, true) : utils.base64encode(str)); break;
    case 'sha1':    // encode only, can be base64 encoded
      s = (opt === 'base64' ? utils.sha1(str, opt) : utils.sha1(str)); break;
    case 'sha256':  // encode only
      s = utils.sha256(str); break;
    case 'md5':     // encode only, can be base64 encoded
      s = (opt === 'base64' ? utils.md5(str, opt) : utils.md5(str)); break;
    case 'deflate':
      s = pako.deflate(str, { to: 'string' }); break;
    default:
      break;
  }
  return s;
}

export function decode(str, type, opt) {
  let s = str;
  switch (type) {
    case 'base64':
      s = (opt === true ? utils.base64decode(str, true) : utils.base64decode(str)); break;
    case 'deflate':
      s = pako.inflate(str, { to: 'string' }); break;
    default:
      break;
  }
  return s;
}

export function hashCode(str) {
  let h = 0;
  const len = str.length;
  const t = 2147483648;
  for (let i = 0; i < len; i++) {
    h = (31 * h) + str.charCodeAt(i);
    if (h > 2147483647) h %= t;
  }
  return h;
}
