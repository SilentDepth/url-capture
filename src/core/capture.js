'use strict';

var webpage = require('webpage');

var Promise = require('../../lib/es6-promise.min').Promise;

var filenameNormalize = require('../util/filename-normalize');

module.exports = function (urlItem) {
  var phantomPage = webpage.create();
  var livingReqCnt = 0;
  var promiseHandlers = {};
  var resolveDelay;
  var isScrolled = false;

  function scrollPage() {
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

  function tryResolve() {
    if (isScrolled && !livingReqCnt) {
      resolveDelay = setTimeout(function () {
        if (__capture_args__.verbose) {
          urlItem.log('Try hit. Living requests: ' + livingReqCnt + '.');
        }
        promiseHandlers.scrolled.resolve();
      }, 500);
    }
  }

  // TODO: Custom viewport size
  phantomPage.viewportSize = {width: 1600, height: 1000};

  phantomPage.onResourceRequested = function () {
    clearTimeout(resolveDelay);
    livingReqCnt++;
  };
  phantomPage.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
      livingReqCnt--;
      tryResolve();
    }
  };
  // Suppress in-page error (which might print much log)
  // 屏蔽页面内错误（减少不必要的日志输出）
  phantomPage.onError = function () {};

  return Promise.race([
    // Timeout control
    // 超时控制
    new Promise(function (resolve, reject) {
      // TODO: replace magic number
      setTimeout(reject, 5000, 'timeout');
    }),
    // Normally open the URL
    // 正常打开URL
    new Promise(function (resolve, reject) {
      phantomPage.open(urlItem.url, function (status) {
        if (status === 'success') {
          resolve();
        } else {
          reject('failed');
        }
      });
    }).then(function () {
      /* Scroll phase */
      /* 滚动阶段 */

      if (__capture_args__.verbose) {
        urlItem.log('Scrolling.');
      }
      return new Promise(function (resolve) {
        promiseHandlers.scrolled = {resolve: resolve};
        var int = setInterval(function () {
          if (isScrolled) {
            clearInterval(int);
            if (__capture_args__.verbose) {
              urlItem.log('Scrolling finished.');
            }
            tryResolve();
          } else {
            isScrolled = phantomPage.evaluate(scrollPage);
          }
        }, 200);
      });
    })
  ]).catch(function (reason) {
    if (reason === 'timeout') {
      if (!__capture_args__.silent) {
        urlItem.log('Loading timeout.');
      }
    } else {
      // TODO: more detail
      return Promise.reject();
    }
  }).then(function () {
    /* Render phase */
    /* 截图阶段 */

    if (__capture_args__.verbose) {
      urlItem.log('Rendering.');
    }
    // TODO: need simplify
    if (__capture_args__.urls.length === 1) {
      phantomPage.render(
        __capture_args__.output
          ? __capture_args__.output
          : './screenshots/' + filenameNormalize(urlItem.url) + '.png'
      );
    } else {
      phantomPage.render(
        (__capture_args__.output ? __capture_args__.output : './screenshots')
        + '/' + filenameNormalize(urlItem.url) + '.png'
      )
    }

    if (__capture_args__.verbose) {
      urlItem.log('Rendering finished.');
    }
  }).catch(function () {
    if (!__capture_args__.silent) {
      urlItem.log('Loading failed.');
    }
  });
};