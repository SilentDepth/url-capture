'use strict';

var args = require('system').args;
var fs = require('fs');

var config = require('../../config.json');

module.exports = function () {
  var list = [];

  // Set cwd
  // Default cwd is always where phantomjs is launched (not relative to this script)
  fs.changeWorkingDirectory(args[1] || '.');
  var lines = fs.read(config['url_file']).split('\n');
  if (config['has_title_row']) lines.shift();

  var tokens;
  // TODO: Change to modern style
  for (var i = 0, len = lines.length; i < len; i++) {
    tokens = lines[i].split(/\s+/);
    if (!tokens[0]) continue;
    list.push({
      siteId: tokens[0],
      url: tokens[1]
    });
    if (!!tokens[2] && tokens[2].trim() !== 'NULL') {
      list.push({
        siteId: tokens[0],
        url: tokens[2],
        type: 'mobile'
      });
    }
  }

  return list;
};
