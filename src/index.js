'use strict';

var args = require('system').args;

var Promise = require('../lib/es6-promise.min').Promise;

var parseArgs = require('./util/arguments');
var URLItem = require('./core/url-item');
var capture = require('./core/capture');

/* Global vars */
/* 全局变量 */

// system.args in object-style
// 对象化的命令行参数
window.__capture_args__ = parseArgs(args);

// Index of next URL to capture
// 待截图的URL序号
window.__capture_idx__ = 0;

// Parallel task count
// 并行任务计数
window.__capture_count__ = 0;

// Failed task count
// 失败任务计数
window.__capture_fail__ = 0;

/* Validate args */
/* 校验命令行参数 */

if (!__capture_args__.urls && !__capture_args__.file) {
  console.error('No url found.');
  phantom.exit(1);
}

if (!__capture_args__.output) {
  if (!__capture_args__.silent) {
    console.warn('No output set. Use ./screenshots by default.');
  }
  __capture_args__.output = './screenshots';
}

/* Get URLs */
/* 读取URL数据 */

var urlList;

if (__capture_args__.file) {
  if (!__capture_args__.silent && __capture_args__.urls) {
    console.warn('Both -f and -u are set. Use -f only.');
  }

  // TODO: urlList = readFile(__capture_args__.file);
  console.warn('Not yet developed.');
  phantom.exit(1);
} else {
  urlList = __capture_args__.urls;
}

/* Capture */
/* 截图 */

function run() {
  // TODO: remove magic number
  if (__capture_count__ < 10 && __capture_idx__ < urlList.length) {
    __capture_count__++;
    capture(new URLItem(urlList[__capture_idx__])).then(function () {
      __capture_count__--;
      run();
    });
    run();
  } else if (__capture_idx__ === urlList.length) {
    if (!__capture_args__.silent) {
      console.log('All tasks finished. Program terminated...');
    }
    phantom.exit();
  }
}

run();