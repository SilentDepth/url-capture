var RE_HTTP = /^https?:\/\//;

module.exports = function (url) {
  return RE_HTTP.test(url) ? url : 'http://' + url;
};