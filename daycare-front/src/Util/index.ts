/* eslint-disable import/prefer-default-export */

export const objectToQueryString = (query: object) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
