export const joinUrl = (...urls: string[]): string => {
  return encodeURI(urls.join('/'));
};
