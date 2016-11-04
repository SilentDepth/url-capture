'use strict';

var RESERVED = /[\\/:*?"<>|]/g;

module.exports = function (str) {
  return str.replace(RESERVED, '_');
};