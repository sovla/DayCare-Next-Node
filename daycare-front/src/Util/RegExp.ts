/* eslint-disable no-useless-escape */
/* eslint-disable operator-linebreak */

export default class RegExp {
  static min(str: string, length: number) {
    return str.length >= length;
  }

  static max(str: string, length: number) {
    return str.length <= length;
  }

  static stringLength(str: string, min: number, max: number) {
    return min <= str.length && str.length <= max;
  }

  static isEmail(str: string) {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return regExp.test(str);
  }
}
