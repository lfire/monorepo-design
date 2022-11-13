import qs from 'qs';
import { isString } from './is';

// use to test tree shaking
// export function sayHello(name = '**') {
//   console.log('Hello', name);
// }

export const qsConfig = {
  depth: 1,
  ignoreQueryPrefix: true,
  addQueryPrefix: true,
};

/**
 * 获取url参数
 * @param param
 * @param url
 */
export function getQuery(param?: string | string[], url?: string) {
  let search = url || window.location.search || '';
  search = search.replace(/.*\?/, '');
  const query = qs.parse(search, qsConfig);
  if (param) {
    if (isString(param)) return query[param];
    const res = {};
    Object.keys(query)
      .filter((k) => param.includes(k))
      .forEach((k) => {
        res[k] = query[k];
      });
    return res;
  }
  return query;
}

/**
 * 设置url参数
 * @param querys
 * @param url
 */
export function setQuery(querys: string | {}, url?: string) {
  let q = getQuery(undefined, url === undefined || (url && url.indexOf('?') > 0) ? url : `${url}?`);
  if (isString(querys)) {
    // @ts-ignore
    q = { ...q, ...getQuery(undefined, querys) };
  } else {
    // @ts-ignore
    q = { ...q, ...querys };
  }
  const pathname = url?.replace(/\?.*/, '') || window.location.pathname || '';
  return `${pathname}${qs.stringify(q, qsConfig)}`;
}
