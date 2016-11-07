'use strict';



module.exports = function URLItem(urlStr) {
  return {
    url: urlStr,

    log: function (msg) {
      console.log('[' + (Date.now() - __capture_start__) + '] [' + this.url + '] ' + msg);
    }
  };
};