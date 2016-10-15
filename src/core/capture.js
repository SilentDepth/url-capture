'use strict';

var webpage = require('webpage');
var config = require('../../config.json');
var normalize = require('../util/url-normalize');
var tag = require('../util/page-info');

// ES6 Promise polyfill
var Promise = require('../../lib/es6-promise.min.js').Promise;

function _scroll() {
  var vpHeight = window.innerHeight;
  var docHeight = document.body.scrollHeight;
  if (document.body.scrollTop + vpHeight < docHeight) {
    document.body.scrollTop += vpHeight;
    return false;
  } else {
    document.body.scrollTop = docHeight;
    return true;
  }
}

module.exports = function (data) {
  var page = webpage.create();
  var _resolve, _reject;
  page.onLoadFinished = function (status) {
    if (status === 'success') {
      _resolve();
    } else {
      _reject('failed');
    }
  };

  Promise.race([
    new Promise(function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
      page.open(normalize(data.url));
    }),

    new Promise(function (resolve, reject) {
      setTimeout(reject, 2000, 'timeout');
    })
  ]).then(function () {
    return new Promise(function (resolve) {
      console.log('rendering');
      setTimeout(function (resolve) {
        page.render('jd.png');
        resolve();
      }, 3000, resolve);
    });
  }).catch(function (reason) {
    console.log(reason);
  }).then(phantom.exit);
};

module.exports = function (data) {
  var page = webpage.create();
  var promiseHandlers = {};
  var waitTimeout;
  var livingReqCnt = 0;

  function _setup() {
    switch (data.type) {
      case 'mobile':
        page.viewportSize = config['viewport_size_mobile'];
        page.settings.userAgent = config['ua_mobile'];
        break;
      default:
        page.viewportSize = config['viewport_size_desktop'];
    }

    page.onLoadStarted = function () {
      console.log('Opening ' + tag(data));
    };

    page.onLoadFinished = function (status) {
      if (status === 'success') {
        promiseHandlers.open.resolve();
      } else {
        promiseHandlers.open.reject('fail');
      }
    };

    page.onResourceRequested = function () {
      clearTimeout(waitTimeout);
      livingReqCnt++;
    };

    page.onResourceReceived = function (res) {
      if (!res.stage || res.stage === 'end') livingReqCnt--;
    };

    // suppress webpage errors
    page.onError = function () {};
  }

  var normalRoutine = new Promise(function (resolve, reject) {
    // open

    _setup();
    promiseHandlers.open = {
      resolve: resolve,
      reject: reject
    };
    page.open(normalize(data.url));
  }).then(function () {
    // scroll
    console.log('Scrolling ' + tag(data));

    return new Promise(function (resolve) {
      var scrollInt = setInterval(function () {
        if (page.evaluate(_scroll)) {
          clearInterval(scrollInt);
          resolve();
        }
      }, 300);
    });
  }).then(function () {
    // wait
    console.log('Waiting ' + tag(data));
    return new Promise(function (resolve) {
      var waitInt = setInterval(function () {
        if (livingReqCnt === 0) {
          waitTimeout = setTimeout(resolve, 500, 'success');
        }
      }, 200);
    });
  });

  var timeoutRoutine = new Promise(function (resolve, reject) {
    setTimeout(reject, config['max_render_time'], 'timeout');
  });

  window.counters.rendering++;
  Promise.race([normalRoutine, timeoutRoutine]).then(function (result) {
    // render

    if (result === 'timeout') console.log('Timeout on ' + tag(data));
    console.log('Rendering ' + tag(data));
    return new Promise(function (resolve) {
      page.render('screenshots/' + data.siteId + (data.type ? '_' + data.type : '') + '.png');
      resolve();
    });
  }).catch(function (reason) {
    // fail
    window.counters.failed++;
    switch (reason) {
      case 'fail':
        console.log('Fail to load ' + tag(data));
        break;
      case 'timeout':
        console.log('Timeout on ' + tag(data));
        break;
    }
  }).then(function () {
    console.log('Closing ' + tag(data));
    page.close();
    window.counters.rendering--;
  });
};
