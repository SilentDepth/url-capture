'use strict';

var ARG_MAP = {
  '-f': 'file',
  '-u': 'urls',
  '-o': 'output',
  '-s': 'silent'
};

/**
 * Parse args to object to make other logic easy
 * 转换命令行参数为对象以简化其他逻辑
 *
 * @param args {Array} system.args
 * @returns {Object}
 */

module.exports = function (args) {
  var argObject = {};
  var argType;

  args.forEach(function (arg, idx) {
    if (idx === 0) return;

    if (ARG_MAP[arg]) {
      argType = ARG_MAP[arg];
      switch (argType) {
        case 'silent':
          argObject.silent = true;
          argType = null;
          return;
        case 'urls':
          argObject.urls = [];
          return;
      }
    } else {
      if (!argType) {
        if (!argObject.urls) {
          argObject.urls = [arg];
        } else if (!argObject.output) {
          argObject.output = arg;
        }
      } else {
        switch (argType) {
          case 'file':
            argObject.file = arg;
            argType = null;
            return;
          case 'urls':
            argObject.urls.push(arg);
            return;
          case 'output':
            argObject.output = arg;
            argType = null;
            return;
        }
      }
    }
  });

  return argObject;
};
