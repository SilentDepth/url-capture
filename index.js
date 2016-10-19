'use strict';

var config = require('./config');
var dataReader = require('./src/core/data-reader');
var capture = require('./src/core/capture');
var format = require('./lib/string-template');

window.counters = {
  rendering: 0,
  failed: 0
};

// Read URL data
var list = dataReader();
var pageCnt = list.length;

// Capture them
for (var i = 0, max = Math.min(pageCnt, config['max_threads'] - 1); i < max; i++) {
  capture(list[i]);
}
var currIdx = config['max_threads'] - 1;
var throttle = setInterval(function () {
  if (currIdx >= pageCnt && window.counters.rendering === 0) {
    console.log(format('Total pages: {pageCnt} ({renderedCnt} rendered, {failedCnt} failed)', {
      pageCnt: pageCnt,
      renderedCnt: pageCnt - window.counters.failed,
      failedCnt: window.counters.failed
    }));
    console.log('All tasks complete. Program terminated...');
    phantom.exit();
  } else if (currIdx < pageCnt && window.counters.rendering <= config['max_threads']) {
    var data = list[currIdx++];
    capture(data);
  }
}, 500);
