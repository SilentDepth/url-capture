var webpage = require('webpage');
var config = require('../../config.json');
var normalize = require('../util/url-normalize');

// ES6 Promise polyfill
var Promise = require('../../lib/es6-promise.min.js').Promise;

module.exports = function (data) {
  var phantomPage = webpage.create();
  var livingReqCnt = 0;
  var promiseHandlers = {};

  phantomPage.viewportSize = data.type === 'mobile'
    ? config['viewport_size_mobile']
    : config['viewport_size_desktop'];
  phantomPage.onResourceRequested = function () {
    livingReqCnt++;
  };
  phantomPage.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
      livingReqCnt--;
    }
  };
  phantomPage.onResourceError = function (err) {
    if (err.id === 2) {
      console.error(err.url + ' ' + err.status + ' ' + err.statusText);
      promiseHandlers['open_target_url'].reject(err.status);
    }
  };
  phantomPage.onConsoleMessage = function (msg) {
    if (msg === 'phantomjs < loaded') {
      promiseHandlers['open_target_url'].resolve();
    }
  };
  phantomPage.onError = function () {};

  /* Execution */

  new Promise(function (resolve) {
    // Start
    window.counters.rendering++;
    phantomPage.open('static/html/main.html', function () {
      resolve();
    });
  }).then(function () {
    // Open & Timeout
    return Promise.race([
      new Promise(function (resolve, reject) {
        promiseHandlers['open_target_url'] = {
          resolve: resolve,
          reject: reject
        };
        phantomPage.switchToChildFrame('page');
        phantomPage.evaluate(function (url) {
          location.href = url;
        }, normalize(data.url));
      }),
      new Promise(function (resolve, reject) {
        setTimeout(reject, config['max_render_time'], 'timeout');
      })
    ]);
  }).catch(function (reason) {
    // Timeout-catch
    if (reason === 'timeout') {
      console.log('Timeout');
    } else {
      return Promise.reject(reason);
    }
  }).then(function () {
    // Stamp & Render
    console.log('Living requests: ' + livingReqCnt);

    phantomPage.stop();
    phantomPage.switchToChildFrame('page');
    var stampData = phantomPage.evaluate(function () {
      return {
        pageTitle: document.title,
        pageUrl: location.href
      };
    });
    phantomPage.switchToMainFrame();
    stampData.siteId = data.siteId;
    stampData.siteUrl = data.url;
    phantomPage.evaluate(function (data) {
      stamp(data);
    }, stampData);
    phantomPage.render('screenshots/' + data.siteId + (data.type ? '_' + data.type : '') + '.png');
  }).catch(function (reason) {
    // Fail-catch
    console.log('Fail: ' + reason);
    window.counters.failed++;
  }).then(function () {
    // Close
    phantomPage.close();
    window.counters.rendering--;
  });
};