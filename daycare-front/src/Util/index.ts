/* eslint-disable import/prefer-default-export */

export const queryToString = (query: object) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
