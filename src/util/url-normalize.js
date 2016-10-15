var RE_HTTP = /^http:\/\//;

module.exports = function (url) {
  return RE_HTTP.test(url) ? url : 'http://' + url;
};