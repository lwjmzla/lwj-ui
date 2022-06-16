/**
 * 比较两者的值是否相等
 * @param {*} x 用来比较的值
 * @param {*} y 另一个用来比较的值
 */
 export function deepEqual(x: any, y: any): any {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    : x === y;
}

/**
 * 驼峰式命名转短横线命名
 *
 * @export
 * @param {*} [string='']
 * @returns
 */
 export function humpTurnDashed(string = '') {
  const rE = /\B([A-Z])/g;
  return string.replace(rE, '-$1').toLowerCase();
}
