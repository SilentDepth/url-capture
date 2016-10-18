'use strict';

var config = require('./config.json');
var dataReader = require('./src/core/data-reader');
var capture = require('./src/core/capture');

window.counters = {
  rendering: 0,
  failed: 0
};

var list = dataReader();
var pageCnt = list.length;

for (var i = 0, max = Math.min(pageCnt, config['max_threads'] - 1); i < max; i++) {
  capture(list[i]);
}

var currIdx = config['max_threads'] - 1;
var throttle = setInterval(function () {
  if (currIdx >= pageCnt && window.counters.rendering === 0) {
    console.log('Total pages: '+pageCnt+' ('+(pageCnt-window.counters.failed)+' rendered, '+window.counters.failed+' failed)');
    console.log('All tasks complete. Program terminated...');
    phantom.exit();
  } else if (currIdx < pageCnt && window.counters.rendering <= config['max_threads']) {
    var data = list[currIdx++];
    capture(data);
  }
}, 500);
