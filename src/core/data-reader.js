'use strict';

var args = require('system').args;
var fs = require('fs');

var config = require('../../config');

module.exports = function () {
  // Validate arguments
  if (args.length === 1) {
    console.log([
      'No arguments found.',
      'Usage: phantomjs index.js path/to/url-data-file',
      '       phantomjs index.js url1 url2 ...'
    ].join('\n'));
    phantom.exit();
  }

  // Read data
  var lines;
  // If the first argument is a file, read the content
  if (fs.isFile(args[1])) {
    lines = fs.read(args[1]).split('\n');
    if (config['has_title_row']) lines.shift();
  // Otherwise treat it as URL
  // TODO: Custom data format
  } else {
    lines = Array.prototype.slice.call(args, 1).map(function (url, idx) {
      return (idx + 1) + ' ' + url;
    });
  }

  // Extract URLs
  var list = [];
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
