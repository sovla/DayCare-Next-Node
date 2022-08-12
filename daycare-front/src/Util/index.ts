/* eslint-disable import/prefer-default-export */

export const objectToQueryString = (query: object) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const nullTypeGuard = (
  data: any | null,
  errorMessage: string = '빈 객체 입니다.'
): boolean => {
  if (data == null) {
    throw new Error(errorMessage);
  }
  return true;
};
