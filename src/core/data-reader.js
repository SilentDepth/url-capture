'use strict';

var args = require('system').args;
var fs = require('fs');

var config = require('../../config');

module.exports = function () {
  var list = [];

  // Validate arguments
  if (args.length === 1) {
    console.log('No arguments found. Usage: phantomjs index.js path/to/urls.txt (or any other name)');
    phantom.exit();
  }

  // Read data
  var lines = fs.read(args[1]).split('\n');
  if (config['has_title_row']) lines.shift();

  var tokens;
  lines.forEach(function (line) {
    // TODO: Custom separator
    tokens = line.split(/\s+/);
    // Ignore blank-leading line
    if (!tokens[0]) return;

    list.push({
      siteId: tokens[0],
      url: tokens[1]
    });
    if (!!tokens[2] && tokens[2] !== 'NULL') {
      list.push({
        siteId: tokens[0],
        url: tokens[2],
        type: 'mobile'
      });
    }
  });

  return list;
};
