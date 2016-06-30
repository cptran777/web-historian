exports.URL = url => {
  if (url.indexOf('http://www.') === 0) {
    return url.slice(7);
  }
  
  if (url.indexOf('www.') === 0) {
    return url;
  }

  if (url.indexOf('http://') === 0 && url.indexOf('www') !== 7) {
    return `www.${url.slice(7)}`;
  }
  
  if (url.indexOf('www.') !== 0) {
    return `www.${url}`;
  }
};