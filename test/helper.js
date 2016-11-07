'use strict';

exports.makeArgs = function (str) {
  var tokens = [];
  var currToken = '';
  var inString = false;
  Array.prototype.forEach.call(str, function (char) {
    if (/\S/.test(char)) {
      if (/["']/.test(char)) {
        inString = !inString;
      } else {
        currToken += char;
      }
    } else {
      if (currToken.length !== 0) {
        if (inString) {
          currToken += char;
        } else {
          tokens.push(currToken);
          currToken = '';
        }
      }
    }
  });
  if (currToken.length > 0) {
    tokens.push(currToken);
  }
  return tokens;
};