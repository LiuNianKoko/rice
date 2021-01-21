(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"leGong","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 13:
/*!********************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/common/util.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http = _interopRequireDefault(__webpack_require__(/*! @/api/http.js */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var until = {
  'showLoading': function showLoading(va) {
    uni.showLoading({
      mask: true,
      title: va });

  },
  'tokenOverdue': function tokenOverdue() {
    // uni.showToast({
    // 	title: '请先登录!',
    // 	mask:true,
    // 	icon:'none',
    // 	duration: 1500,
    // 	success:function () {
    // 		setTimeout(function(){
    // 			uni.reLaunch({
    // 				url:'/pages/login/login'
    // 			})
    // 		},1000)
    // 	}
    // });
    var data = {
      user_token: uni.getStorageSync('token'),
      user_id: uni.getStorageSync('id') };

    (0, _http.default)('/api/User/get_user', 'post', data).then(function (res) {
      console.log(res);
      if (res.code == 200) {

      } else if (res.status == 1004 || res.code == 1004) {
        console.log(1004);
        uni.showModal({
          title: '您暂未登录',
          content: '是否前往登录!',
          success: function success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              uni.reLaunch({
                url: '/pages/login/login' });

            } else if (res.cancel) {
              console.log('用户点击取消');
              uni.switchTab({
                url: '/pages/index/index' });

            }
          } });

      }
    });
  },
  'reIndex': function reIndex() {
    uni.showModal({
      title: '您暂未登录',
      content: '是否前往登录!',
      success: function success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          uni.reLaunch({
            url: '/pages/login/login' });

        } else if (res.cancel) {
          console.log('用户点击取消');

        }
      } });

  },
  'hideLoading': function hideLoading() {
    uni.hideLoading();
  },
  'showToast': function showToast(e) {
    // uni.showToast({
    //     title: e,
    //     mask:true,
    //     icon:'none',
    //     duration: 2000
    // });
    uni.showToast({
      title: e,
      mask: true,
      icon: 'none',
      duration: 1500 });

  },
  setStorage: function setStorage(key, val) {
    console.log(key, val);
    uni.setStorageSync(key, val);
  },
  getStorage: function getStorage(key) {
    console.log(key);
    return uni.getStorageSync(key);
  },
  timestampToTime: function timestampToTime(timestamp, day) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var D = until.change(date.getDate()) + ' ';
    var h = until.change(date.getHours()) + ':';
    var m = until.change(date.getMinutes()) + ':';
    var s = until.change(date.getSeconds());
    if (day == 1) {
      return M + '月' + D + '日';
    } else if (day == 3) {
      return Y + M + '-' + D + ' ' + h + m + s;
    } else {
      return Y + M + '-' + D;
    }
  },
  gettime: function gettime() {
    var date = new Date().getTime();
    var date1 = new Date(date);
    var year = date1.getFullYear();
    var dayt = until.change(date1.getDate());
    var month = date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1;
    var yearmr = year + '-' + month + '-' + dayt;
    return yearmr;
  },
  change: function change(t) {
    if (t < 10) {
      return "0" + t;
    } else {
      return t;
    }
  } };var _default =

until;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!********************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/store/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    address: {}, //地址
    addrName: '', //收件人姓名
    orderData: {} //订单数据
  },
  mutations: {},


  actions: {} });var _default =

store;exports.default = _default;

/***/ }),

/***/ 15:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"leGong","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"leGong","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"leGong","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"leGong","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 218:
/*!**************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/components/erha-picker/city-data/province.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" }

// {
//   "label": "台湾",
//   "value": "66"
// },
// {
//   "label": "香港",
//   "value": "67"
// },
// {
//   "label": "澳门",
//   "value": "68"
// }
];var _default =
provinceData;exports.default = _default;

/***/ }),

/***/ 219:
/*!**********************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/components/erha-picker/city-data/city.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 220:
/*!**********************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/components/erha-picker/city-data/area.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "梁平县",
  "value": "500228" },
{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 221:
/*!*************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/components/erha-picker/city-data/streets.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var s = [[[["东华门街道", "景山街道", "交道口街道", "安定门街道", "北新桥街道", "东四街道", "朝阳门街道", "建国门街道", "东直门街道", "和平里街道", "前门街道", "崇文门外街道", "东花市街道", "龙潭街道", "体育馆路街道", "天坛街道", "永定门外街道"], ["西长安街街道", "新街口街道", "月坛街道", "展览路街道", "德胜街道", "金融街街道", "什刹海街道", "大栅栏街道", "天桥街道", "椿树街道", "陶然亭街道", "广安门内街道", "牛街街道", "白纸坊街道", "广安门外街道"], ["建外街道", "朝外街道", "呼家楼街道", "三里屯街道", "左家庄街道", "香河园街道", "和平街街道", "安贞街道", "亚运村街道", "小关街道", "酒仙桥街道", "麦子店街道", "团结湖街道", "六里屯街道", "八里庄街道", "双井街道", "劲松街道", "潘家园街道", "垡头街道", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "大屯街道", "望京街道", "小红门地区", "十八里店地区", "平房地区", "东风地区", "奥运村街道", "来广营地区", "常营地区", "三间房地区", "管庄地区", "金盏地区", "孙河地区", "崔各庄地区", "东坝地区", "黑庄户地区", "豆各庄地区", "王四营地区", "东湖街道", "首都机场街道"], ["右安门街道", "太平桥街道", "西罗园街道", "大红门街道", "南苑街道", "东高地街道", "东铁匠营街道", "卢沟桥街道", "丰台街道", "新村街道", "长辛店街道", "云岗街道", "方庄地区", "宛平城地区", "马家堡街道", "和义街道", "卢沟桥地区", "花乡地区", "南苑地区", "长辛店镇", "王佐镇"], ["八宝山街道", "老山街道", "八角街道", "古城街道", "苹果园街道", "金顶街街道", "广宁街道", "五里坨街道", "鲁谷街道"], ["万寿路街道", "永定路街道", "羊坊店街道", "甘家口街道", "八里庄街道", "紫竹院街道", "北下关街道", "北太平庄街道", "学院路街道", "中关村街道", "海淀街道", "青龙桥街道", "清华园街道", "燕园街道", "香山街道", "清河街道", "花园路街道", "西三旗街道", "马连洼街道", "田村路街道", "上地街道", "万柳地区", "东升地区", "曙光街道", "温泉地区", "四季青地区", "西北旺地区", "苏家坨地区", "上庄地区"], ["大峪街道", "城子街道", "东辛房街道", "大台街道", "王平地区", "永定地区", "龙泉地区", "潭柘寺镇", "军庄镇", "雁翅镇", "斋堂镇", "清水镇", "妙峰山镇"], ["城关街道", "新镇街道", "向阳街道", "东风街道", "迎风街道", "星城街道", "良乡地区", "周口店地区", "琉璃河地区", "拱辰街道", "西潞街道", "阎村镇", "窦店镇", "石楼镇", "长阳镇", "河北镇", "长沟镇", "大石窝镇", "张坊镇", "十渡镇", "青龙湖镇", "韩村河镇", "霞云岭乡", "南窖乡", "佛子庄乡", "大安山乡", "史家营乡", "蒲洼乡"], ["中仓街道", "新华街道", "北苑街道", "玉桥街道", "永顺地区", "梨园地区", "宋庄镇", "张家湾镇", "漷县镇", "马驹桥镇", "西集镇", "台湖镇", "永乐店镇", "潞城镇", "于家务回族乡"], ["胜利街道", "光明街道", "仁和地区", "后沙峪地区", "天竺地区", "杨镇地区", "牛栏山地区", "南法信地区", "马坡地区", "石园街道", "空港街道", "双丰街道", "旺泉街道", "高丽营镇", "李桥镇", "李遂镇", "南彩镇", "北务镇", "大孙各庄镇", "张镇", "龙湾屯镇", "木林镇", "北小营镇", "北石槽镇", "赵全营镇"], ["城北街道", "南口地区", "马池口地区", "沙河地区", "城南街道", "东小口地区", "天通苑北街道", "天通苑南街道", "霍营街道", "回龙观街道", "龙泽园街道", "史各庄街道", "阳坊镇", "小汤山镇", "南邵镇", "崔村镇", "百善镇", "北七家镇", "兴寿镇", "流村镇", "十三陵镇", "延寿镇"], ["兴丰街道", "林校路街道", "清源街道", "亦庄地区", "黄村地区", "旧宫地区", "西红门地区", "瀛海地区", "观音寺街道", "天宫院街道", "高米店街道", "荣华街道", "博兴街道", "青云店镇", "采育镇", "安定镇", "礼贤镇", "榆垡镇", "庞各庄镇", "北臧村镇", "魏善庄镇", "长子营镇", "北京经济技术开发区", "中关村国家自主创新示范区大兴生物医药产业基地", "国家新媒体产业基地"], ["泉河街道", "龙山街道", "怀柔地区", "雁栖地区", "庙城地区", "北房镇", "杨宋镇", "桥梓镇", "怀北镇", "汤河口镇", "渤海镇", "九渡河镇", "琉璃庙镇", "宝山镇", "长哨营满族乡", "喇叭沟门满族乡", "北京雁栖经济开发区"], ["滨河街道", "兴谷街道", "渔阳地区", "峪口地区", "马坊地区", "金海湖地区", "东高村镇", "山东庄镇", "南独乐河镇", "大华山镇", "夏各庄镇", "马昌营镇", "王辛庄镇", "大兴庄镇", "刘家店镇", "镇罗营镇", "黄松峪乡", "熊儿寨乡"], ["鼓楼街道", "果园街道", "檀营地区", "密云镇", "溪翁庄镇", "西田各庄镇", "十里堡镇", "河南寨镇", "巨各庄镇", "穆家峪镇", "太师屯镇", "高岭镇", "不老屯镇", "冯家峪镇", "古北口镇", "大城子镇", "东邵渠镇", "北庄镇", "新城子镇", "石城镇", "北京密云经济开发区"], ["百泉街道", "香水园街道", "儒林街道", "延庆镇", "康庄镇", "八达岭镇", "永宁镇", "旧县镇", "张山营镇", "四海镇", "千家店镇", "沈家营镇", "大榆树镇", "井庄镇", "大庄科乡", "刘斌堡乡", "香营乡", "珍珠泉乡"]]], [[["劝业场街道", "小白楼街道", "五大道街道", "新兴街道", "南营门街道", "南市街道"], ["大王庄街道", "大直沽街道", "中山门街道", "富民路街道", "二号桥街道", "春华街道", "唐家口街道", "向阳楼街道", "常州道街道", "上杭路街道", "东新街道", "鲁山道街道", "天津铁厂街道"], ["大营门街道", "下瓦房街道", "桃园街道", "挂甲寺街道", "马场街道", "越秀路街道", "友谊路街道", "天塔街道", "尖山街道", "陈塘庄街道", "柳林街道", "东海街道", "梅江街道"], ["长虹街道", "鼓楼街道", "兴南街道", "广开街道", "万兴街道", "学府街道", "向阳路街道", "嘉陵道街道", "王顶堤街道", "水上公园街道", "体育中心街道", "华苑街道"], ["光复道街道", "望海楼街道", "鸿顺里街道", "新开河街道", "铁东路街道", "建昌道街道", "宁园街道", "王串场街道", "江都路街道", "月牙河街道"], ["西于庄街道", "双环村街道", "咸阳北路街道", "丁字沽街道", "西沽街道", "三条石街道", "邵公庄街道", "芥园街道", "铃铛阁街道", "大胡同街道", "和苑街道"], ["张贵庄街道", "丰年村街道", "万新街道", "无瑕街道", "新立街道", "华明街道", "金钟街道", "军粮城街道", "金桥街道", "华新街道", "东丽湖街道", "天津开发区西区", "天津航空物流区", "天津空港经济区", "东丽区开发区", "综合保税区", "航空新城", "服务滨海新区建设管理委员会"], ["西营门街道", "李七庄街道", "赤龙南街道", "中北镇", "杨柳青镇", "辛口镇", "张家窝镇", "精武镇", "大寺镇", "王稳庄镇", "天津开发区微电子小区", "新技术产业园区", "西青高校区", "西青区开发区"], ["双新街道", "咸水沽镇", "葛沽镇", "小站镇", "双港镇", "辛庄镇", "双桥河镇", "八里台镇", "北闸口镇", "铁路十八局", "长青", "津南开发区东区", "津南开发区西区", "海河教育园区", "双林农场", "津南国家农业园区"], ["果园新村街道", "集贤里街道", "普东街道", "瑞景街道", "佳荣里街道", "青源街道", "广源街道", "天穆镇", "北仓镇", "双街镇", "双口镇", "青光镇", "宜兴埠镇", "小淀镇", "大张庄镇", "西堤头镇", "科技园区北区", "科技园区南区", "天津医药医疗器械工业园", "天津陆路港物流装备产业园", "天津风电产业园", "红旗农场", "曙光农场"], ["杨村街道", "下朱庄街道", "东蒲洼街道", "黄庄街道", "徐官屯街道", "运河西街道", "梅厂镇", "大碱厂镇", "崔黄口镇", "大良镇", "下伍旗镇", "南蔡村镇", "大孟庄镇", "泗村店镇", "河西务镇", "城关镇", "东马圈镇", "黄花店镇", "石各庄镇", "王庆坨镇", "汊沽港镇", "河北屯镇", "上马台镇", "大王古庄镇", "陈咀镇", "豆张庄镇", "曹子里镇", "大黄堡镇", "高村镇", "白古屯镇", "天津开发区逸仙科学工业园", "武清区开发区", "武清商务区", "武清京滨园", "武清地毯园", "武清汽车园", "武清科技谷", "武清农场"], ["海滨街道", "宝平街道", "钰华街道", "大白街道", "口东街道", "周良街道", "潮阳街道", "朝霞街道", "大口屯镇", "王卜庄镇", "方家庄镇", "林亭口镇", "八门城镇", "大钟庄镇", "新安镇", "霍各庄镇", "新开口镇", "大唐庄镇", "牛道口镇", "史各庄镇", "郝各庄镇", "牛家牌镇", "尔王庄镇", "黄庄镇", "天宝工业园区", "九园工业园区", "京津新城", "里自沽农场", "黄庄农场", "大钟农场"], ["塘沽街道", "杭州道街道", "新河街道", "大沽街道", "新北街道", "北塘街道", "胡家园街道", "汉沽街道", "寨上街道", "茶淀街道", "大港街道", "古林街道", "海滨街道", "新城镇", "杨家泊镇", "太平镇", "小王庄镇", "中塘镇", "开发区", "保税区", "天津滨海新区高新技术产业开发区", "东疆保税港区", "中心商务区", "临港经济区", "中新天津生态城", "临港产业园区一", "临港产业园区二"], ["芦台镇", "宁河镇", "苗庄镇", "丰台镇", "岳龙镇", "板桥镇", "潘庄镇", "造甲城镇", "七里海镇", "大北涧沽镇", "东棘坨镇", "北淮淀乡", "俵口乡", "廉庄子乡", "宁河县贸易开发区", "宁河县经济开发区", "一汽大众华北工业园", "天津未来科技城", "宁河县现代产业园区", "天津潘庄工业区", "潘庄农场"], ["静海镇", "唐官屯镇", "独流镇", "王口镇", "台头镇", "子牙镇", "陈官屯镇", "中旺镇", "大邱庄镇", "蔡公庄镇", "梁头镇", "团泊镇", "双塘镇", "大丰堆镇", "沿庄镇", "西翟庄镇", "良王庄乡", "杨成庄乡", "天津静海经济开发区", "天津子牙工业园区", "团泊新城"], ["文昌街道", "渔阳镇", "洇溜镇", "官庄镇", "马伸桥镇", "下营镇", "邦均镇", "别山镇", "尤古庄镇", "上仓镇", "下仓镇", "罗庄子镇", "白涧镇", "五百户镇", "侯家营镇", "桑梓镇", "东施古镇", "下窝头镇", "杨津庄镇", "出头岭镇", "西龙虎峪镇", "穿芳峪镇", "东二营镇", "许家台镇", "礼明庄镇", "东赵各庄镇", "孙各庄乡", "蓟县新城建设管理委员会"]]], [[["建北街道", "青园街道", "广安街道", "育才街道", "跃进街道", "河东街道", "长丰街道", "谈固街道", "中山东路街道", "阜康街道", "建安街道", "胜利北街道", "西兆通镇", "南村镇", "高营镇", "桃园镇"], ["东里街道", "中山街道", "南长街道", "维明街道", "友谊街道", "红旗街道", "新石街道", "苑东街道", "西里街道", "振头街道", "留营街道", "长兴街道", "彭后街道", "东风街道", "东华街道", "休门街道", "汇通街道"], ["革新街街道", "新华路街道", "宁安街道", "东焦街道", "西苑街道", "合作路街道", "联盟街道", "石岗街道", "五七街道", "天苑街道", "北苑街道", "大郭镇", "赵陵铺镇", "西三庄乡", "杜北乡"], ["矿市街道", "四微街道", "贾庄镇", "凤山镇", "横涧乡"], ["裕兴街道", "裕强街道", "东苑街道", "建通街道", "槐底街道", "裕华路街道", "裕东街道", "裕翔街道", "建华南街道", "方村镇"], ["廉州镇", "兴安镇", "贾市庄镇", "南营镇", "梅花镇", "岗上镇", "南董镇", "张家庄镇", "南孟镇", "增村镇", "常安镇", "西关镇", "九门回族乡", "石家庄经济技术开发区"], ["获鹿镇", "铜冶镇", "寺家庄镇", "上庄镇", "李村镇", "宜安镇", "黄壁庄镇", "大河镇", "山尹村镇", "石井乡", "白鹿泉乡", "上寨乡", "河北鹿泉经济开发区"], ["栾城镇", "冶河镇", "窦妪镇", "楼底镇", "南高乡", "柳林屯乡", "西营乡"], ["微水镇", "上安镇", "天长镇", "秀林镇", "南峪镇", "威州镇", "小作镇", "南障城镇", "苍岩山镇", "测鱼镇", "吴家窑乡", "北正乡", "于家乡", "孙庄乡", "南陉乡", "辛庄乡", "南王庄乡"], ["诸福屯街道", "三里屯街道", "正定镇", "新城铺镇", "新安镇", "南牛乡", "南楼乡", "西平乐乡", "北早现乡", "曲阳桥乡"], ["龙州镇", "南桥镇", "上碑镇", "口头镇", "独羊岗乡", "安香乡", "只里乡", "市同乡", "翟营乡", "城寨乡", "上方乡", "玉亭乡", "北河乡", "上闫庄乡", "九口子乡", "开发区"], ["灵寿镇", "青同镇", "塔上镇", "陈庄镇", "慈峪镇", "岔头镇", "三圣院乡", "北洼乡", "牛城乡", "狗台乡", "南寨乡", "南燕川乡", "北谭庄乡", "寨头乡", "南营乡"], ["高邑镇", "大营镇", "富村镇", "万城镇", "中韩乡"], ["深泽镇", "铁杆镇", "赵八镇", "白庄乡", "留村乡", "桥头乡"], ["赞皇镇", "院头镇", "西龙门乡", "南邢郭乡", "南清河乡", "西阳泽乡", "土门乡", "黄北坪乡", "嶂石岩乡", "许亭乡", "张楞乡"], ["无极镇", "七汲镇", "张段固镇", "北苏镇", "郭庄镇", "大陈镇", "高头回族乡", "郝庄乡", "东侯坊乡", "里城道乡", "南流乡"], ["平山镇", "东回舍镇", "温塘镇", "南甸镇", "岗南镇", "古月镇", "下槐镇", "孟家庄镇", "小觉镇", "蛟潭庄镇", "西柏坡镇", "下口镇", "西大吾乡", "上三汲乡", "两河乡", "东王坡乡", "苏家庄乡", "宅北乡", "北冶乡", "上观音堂乡", "杨家桥乡", "营里乡", "合河口乡"], ["城区街道", "槐阳镇", "殷村镇", "南佐镇", "宋曹镇", "南因镇", "姬村镇", "北褚镇", "马村镇", "东张乡", "赵同乡", "苏村乡", "苏阳乡", "北正乡", "前仙乡", "黑水河乡"], ["赵州镇", "范庄镇", "北王里镇", "新寨店镇", "韩村镇", "南柏舍镇", "沙河店镇", "前大章乡", "谢庄乡", "高村乡", "王西章乡"], ["晋州镇", "总十庄镇", "营里镇", "桃园镇", "东卓宿镇", "马于镇", "小樵镇", "槐树镇", "东里庄镇", "周家庄乡"], ["长寿街道", "化皮镇", "承安镇", "正莫镇", "南大岳镇", "杜固镇", "邯邰镇", "东王镇", "马头铺镇", "协神乡", "木村乡", "彭家庄回族乡"]], [["学院南路街道", "友谊街道", "广场街道", "永红桥街道", "小山街道", "文北街道", "钱营街道", "惠民道街道", "梁家屯路街道", "稻地镇", "女织寨乡"], ["乔屯街道", "文化路街道", "钓鱼台街道", "东新村街道", "缸窑街道", "机场路街道", "河北路街道", "龙东街道", "大里街道", "光明街道", "翔云道街道", "韩城镇", "果园乡"], ["林西街道", "唐家庄街道", "古冶街道", "赵各庄街道", "京华街道", "范各庄镇", "卑家店镇", "王辇庄乡", "习家套乡", "大庄坨乡"], ["马家沟街道", "开平街道", "税务庄街道", "陡电街道", "荆各庄街道", "开平镇", "栗园镇", "郑庄子镇", "双桥镇", "洼里镇", "越河镇"], ["小集镇", "黄各庄镇", "西葛镇", "大新庄镇", "钱营镇", "唐坊镇", "王兰庄镇", "柳树酄镇", "黑沿子镇", "丰南镇", "大齐各庄镇", "岔河镇", "南孙庄乡", "东田庄乡", "尖字沽乡"], ["太平路街道", "燕山路街道", "浭阳街道", "丰润镇", "任各庄镇", "左家坞镇", "泉河头镇", "王官营镇", "火石营镇", "新军屯镇", "小张各庄镇", "丰登坞镇", "李钊庄镇", "白官屯镇", "石各庄镇", "沙流河镇", "七树庄镇", "杨官林镇", "银城铺镇", "常庄镇", "姜家营乡", "欢喜庄乡", "刘家营乡"], ["唐海镇", "滨海镇", "柳赞镇", "一农场", "三农场", "四农场", "五农场", "六农场", "七农场", "八农场", "九农场", "十农场", "十一农场", "八里滩养殖场", "十里海养殖场", "南堡经济开发区", "曹妃甸工业区", "唐山湾生态城"], ["滦河街道", "古城街道", "滦城路街道", "响堂街道", "东安各庄镇", "雷庄镇", "茨榆坨镇", "榛子镇", "杨柳庄镇", "油榨镇", "古马镇", "小马庄镇", "九百户镇", "王店子镇"], ["友谊路街道", "倴城镇", "宋道口镇", "长凝镇", "胡各庄镇", "坨里镇", "姚王庄镇", "司各庄镇", "安各庄镇", "扒齿港镇", "程庄镇", "青坨营镇", "柏各庄镇", "南堡镇", "方各庄镇", "东黄坨镇", "马城镇"], ["乐安街道", "乐亭镇", "汤家河镇", "胡家坨镇", "闫各庄镇", "马头营镇", "新寨镇", "汀流河镇", "姜各庄镇", "毛庄镇", "中堡镇", "庞各庄乡", "大相各庄乡", "古河乡", "河北乐亭经济开发区", "乐亭县城区工业聚集区管理委员会"], ["迁西县栗乡街道", "兴城镇", "金厂峪镇", "洒河桥镇", "太平寨镇", "罗家屯镇", "东荒峪镇", "新集镇", "三屯营镇", "滦阳镇", "白庙子乡", "上营乡", "汉儿庄乡", "渔户寨乡", "旧城乡", "尹庄乡", "东莲花院乡", "新庄子乡", "迁西县栗乡工业产业聚集区"], ["无终街道", "玉田镇", "亮甲店镇", "鸦鸿桥镇", "窝洛沽镇", "石臼窝镇", "虹桥镇", "散水头镇", "林南仓镇", "林西镇", "杨家板桥镇", "彩亭桥镇", "孤树镇", "大安镇镇", "唐自头镇", "郭家屯镇", "杨家套镇", "林头屯乡", "潮洛窝乡", "陈家铺乡", "郭家桥乡"], ["华明路街道", "文化路街道", "遵化镇", "堡子店镇", "马兰峪镇", "平安城镇", "东新庄镇", "新店子镇", "党峪镇", "地北头镇", "东旧寨镇", "铁厂镇", "苏家洼镇", "建明镇", "石门镇", "西留村乡", "崔家庄乡", "兴旺寨乡", "西下营满族乡", "汤泉满族乡", "东陵满族乡", "刘备寨乡", "团瓢庄乡", "娘娘庄乡", "西三里乡", "候家寨乡", "小厂乡"], ["迁安镇", "夏官营镇", "杨各庄镇", "建昌营镇", "赵店子镇", "野鸡坨镇", "大崔庄镇", "杨店子镇", "蔡园镇", "马兰庄镇", "沙河驿镇", "木厂口镇", "扣庄乡", "彭店子乡", "上射雁庄乡", "闫家店乡", "五重安乡", "大五里乡", "太平庄乡"]], [["文化路街道", "海滨路街道", "北环路街道", "建设大街街道", "河东街道", "西港路街道", "燕山大街街道", "港城大街街道", "东环路街道", "白塔岭街道", "东港镇", "海港镇", "西港镇", "海阳镇", "北港镇", "杜庄镇", "石门寨镇", "驻操营镇", "北部工业区", "临港物流园区"], ["南关街道", "古城街道", "西关街道", "路南街道", "第一关镇", "石河镇", "孟姜镇"], ["西山街道", "东山街道", "海滨镇", "戴河镇", "牛头崖镇"], ["骊城街道", "抚宁镇", "留守营镇", "榆关镇", "台营镇", "大新寨镇", "茶棚乡", "深河乡"], ["青龙镇", "祖山镇", "木头凳镇", "双山子镇", "马圈子镇", "肖营子镇", "大巫岚镇", "土门子镇", "八道河镇", "隔河头镇", "娄杖子镇", "凤凰山乡", "龙王庙乡", "三星口乡", "干沟乡", "大石岭乡", "官场乡", "茨榆山乡", "平方子乡", "安子岭乡", "朱杖子乡", "草碾乡", "七道河乡", "三拨子乡", "凉水河乡"], ["昌黎镇", "靖安镇", "安山镇", "龙家店镇", "泥井镇", "大蒲河镇", "新集镇", "刘台庄镇", "茹荷镇", "朱各庄镇", "荒佃庄镇", "团林乡", "葛条港乡", "马坨店乡", "两山乡", "十里铺乡"], ["卢龙镇", "潘庄镇", "燕河营镇", "双望镇", "刘田各庄镇", "石门镇", "木井镇", "陈官屯镇", "蛤泊镇", "下寨乡", "刘家营乡", "印庄乡", "河北卢龙经济开发区"]], [["火磨街道", "陵园路街道", "光明路街道", "滏东街道", "罗城头街道", "渚河路街道", "浴新南街道", "农林路街道", "贸东街道", "贸西街道", "盛和路街道", "北张庄镇", "马庄乡"], ["丛台西街道", "联纺西街道", "联纺东街道", "光明桥街道", "丛台东街道", "四季青街道", "和平街道", "中华街道", "人民路街道", "柳林桥街道", "黄粱梦镇", "苏曹乡", "三陵乡"], ["胜利桥街道", "百家村街道", "铁路大院街道", "化林路街道", "庞村街道", "二六七二街道", "石化街道", "户村镇", "彭家寨乡", "康庄乡"], ["滏阳东路街道", "临水镇", "峰峰镇", "新坡镇", "大社镇", "和村镇", "义井镇", "彭城镇", "界城镇", "大峪镇", "西固义乡"], ["尚璧镇", "河沙镇镇", "南堡乡", "南吕固乡", "兼庄乡", "代召乡", "姚寨乡"], ["临漳镇", "南东坊镇", "孙陶集镇", "柳园镇", "称勾集镇", "狄邱乡", "张村集乡", "西羊羔乡", "香菜营乡", "杜村集乡", "章里集乡", "习文乡", "砖寨营乡", "柏鹤集乡"], ["成安镇", "商城镇", "漳河店镇", "李家疃镇", "辛义乡", "柏寺营乡", "道东堡乡", "北乡义乡", "长巷乡"], ["大名镇", "杨桥镇", "万堤镇", "龙王庙镇", "束馆镇", "金滩镇", "沙圪塔镇", "大街镇", "王村乡", "铺上乡", "黄金堤乡", "旧治乡", "西未庄乡", "孙甘店乡", "西付集乡", "埝头乡", "北峰乡", "张铁集乡", "红庙乡", "营镇回族乡"], ["平安街道", "涉城镇", "河南店镇", "索堡镇", "西戌镇", "井店镇", "更乐镇", "固新镇", "西达镇", "偏城镇", "神头乡", "辽城乡", "偏店乡", "龙虎乡", "木井乡", "关防乡", "合漳乡", "鹿头乡"], ["磁州镇", "高臾镇", "西光禄镇", "讲武城镇", "岳城镇", "观台镇", "林坛镇", "白土镇", "黄沙镇", "路村营乡", "辛庄营乡", "花官营乡", "时村营乡", "南城乡", "台城乡", "陶泉乡", "都党乡", "北贾壁乡"], ["肥乡镇", "天台山镇", "辛安镇镇", "大寺上镇", "毛演堡乡", "元固乡", "屯庄营乡", "东漳堡乡", "旧店乡"], ["临洺关镇", "大北汪镇", "张西堡镇", "广府镇", "南沿村镇", "永合会镇", "刘营镇", "西苏乡", "界河店乡", "刘汉乡", "正西乡", "讲武乡", "曲陌乡", "辛庄堡乡", "小龙马乡", "东杨庄乡", "小西堡乡", "西河庄乡", "西阳城乡"], ["新马头镇", "邱城镇", "梁二庄镇", "香城固镇", "南辛店乡", "古城营乡", "陈村回族乡"], ["鸡泽镇", "小寨镇", "双塔镇", "曹庄镇", "浮图店乡", "吴官营乡", "风正乡"], ["广平镇", "平固店镇", "胜营镇", "南阳堡镇", "十里铺乡", "南韩村乡", "东张孟乡"], ["馆陶镇", "房寨镇", "柴堡镇", "魏僧寨镇", "寿山寺乡", "王桥乡", "南徐村乡", "路桥乡"], ["魏城镇", "德政镇", "北皋镇", "双井镇", "牙里镇", "车往镇", "回隆镇", "张二庄镇", "东代固镇", "院堡镇", "棘针寨乡", "沙口集乡", "野胡拐乡", "仕望集乡", "前大磨乡", "南双庙乡", "大辛庄乡", "大马村乡", "边马乡", "北台头乡", "泊口乡"], ["曲周镇", "安寨镇", "侯村镇", "河南疃镇", "第四疃镇", "白寨镇", "槐桥乡", "南里岳乡", "大河道乡", "依庄乡"], ["武安镇", "康二城镇", "午汲镇", "磁山镇", "伯延镇", "淑村镇", "大同镇", "邑城镇", "矿山镇", "贺进镇", "阳邑镇", "徘徊镇", "冶陶镇", "上团城乡", "北安庄乡", "北安乐乡", "西土山乡", "西寺庄乡", "活水乡", "石洞乡", "管陶乡", "马家庄乡"]], [["南长街街道", "北大街街道", "西大街街道", "西门里街道", "泉东街道", "豫让桥街道", "东郭村镇", "大梁庄乡"], ["钢铁路街道", "中兴路街道", "达活泉街道", "张宽街道", "章村街道", "中华大街街道", "团结路街道", "泉西街道", "南大郭镇", "李村镇"], ["晏家屯镇", "南石门镇", "羊范镇", "皇寺镇", "会宁镇", "西黄村镇", "路罗镇", "将军墓镇", "浆水镇", "宋家庄镇", "太子井乡", "龙泉寺乡", "北小庄乡", "城计头乡", "白岸乡", "冀家村乡"], ["临城镇", "东镇镇", "西竖镇", "郝庄镇", "黑城乡", "鸭鸽营乡", "石城乡", "赵庄乡"], ["内丘镇", "大孟村镇", "金店镇", "官庄镇", "柳林镇", "五郭店乡", "南赛乡", "獐獏乡", "侯家庄乡"], ["柏乡镇", "固城店镇", "西汪镇", "王家庄乡", "龙华乡", "内步乡"], ["隆尧镇", "魏家庄镇", "尹村镇", "山口镇", "莲子镇镇", "固城镇", "北楼乡", "东良乡", "双碑乡", "牛家桥乡", "千户营乡", "大张庄乡", "柳行农场"], ["任城镇", "邢家湾镇", "辛店镇", "天口镇", "西固城乡", "永福庄乡", "大屯乡", "骆庄乡"], ["和阳镇", "贾宋镇", "郝桥镇", "东三召乡", "阎里乡", "河郭乡", "史召乡", "三思乡"], ["宁北街道", "凤凰镇", "河渠镇", "北河庄镇", "耿庄桥镇", "东汪镇", "贾家口镇", "四芝兰镇", "大陆村镇", "苏家庄镇", "换马店镇", "唐邱镇", "侯口乡", "纪昌庄乡", "北鱼乡"], ["巨鹿镇", "王虎寨镇", "西郭城镇", "官亭镇", "阎疃镇", "小吕寨镇", "苏家营镇", "堤村乡", "张王疃乡", "观寨乡"], ["新河镇", "寻寨镇", "白神首乡", "荆家庄乡", "西流乡", "仁让里乡"], ["广宗镇", "冯家寨镇", "北塘疃镇", "核桃园镇", "葫芦乡", "大平台乡", "件只乡", "东召乡"], ["平乡县中华路街道", "丰州镇", "平乡镇", "河古庙镇", "节固乡", "油召乡", "田付村乡", "寻召乡"], ["洺州镇", "梨园屯镇", "章台镇", "侯贯镇", "七级镇", "贺营镇", "方家营镇", "常庄镇", "第什营镇", "枣园乡", "固献乡", "贺钊乡", "张家营乡", "常屯乡", "高公庄乡", "赵村乡"], ["葛仙庄镇", "连庄镇", "油坊镇", "谢炉镇", "王官庄镇", "坝营镇"], ["临西镇", "河西镇", "下堡寺镇", "尖冢镇", "老官寨镇", "吕寨镇", "东枣园乡", "摇鞍镇乡", "大刘庄乡", "轴承工业园区"], ["凤岗街道", "南杜街道", "北胡街道", "西丁街道", "苏村镇", "大高村镇", "垂杨镇", "明化镇", "段芦头镇", "紫冢镇", "大村乡", "南便村乡", "大屯乡", "王道寨乡", "薛吴村乡"], ["褡裢街道", "桥东街道", "桥西街道", "赞善", "周庄街道", "新城镇", "白塔镇", "十里亭镇", "綦村镇", "册井乡", "刘石岗乡", "柴关乡", "蝉房乡"]], [["先锋街道", "新市场街道", "东风街道", "建南街道", "韩村北路街道", "颉庄乡", "富昌乡", "韩村乡", "南奇乡", "江城乡"], ["和平里街道", "五四路街道", "西关街道", "中华路街道", "东关街道", "联盟街道", "红星街道", "裕华街道", "永华街道", "南关街道", "韩庄乡", "东金庄乡", "百楼乡", "杨庄乡", "南大园乡", "焦庄乡", "五尧乡"], ["惠阳街道", "满城镇", "大册营镇", "神星镇", "南韩村镇", "方顺桥镇", "于家庄乡", "要庄乡", "白龙乡", "石井乡", "坨南乡", "刘家台乡", "河北满城经济开发区"], ["清苑镇", "冉庄镇", "阳城镇", "魏村镇", "温仁镇", "张登镇", "大庄镇", "臧村镇", "白团乡", "北店乡", "石桥乡", "李庄乡", "北王力乡", "东吕乡", "何桥乡", "孙村乡", "阎庄乡", "望亭乡", "河北清苑经济开发区"], ["安肃镇", "崔庄镇", "大因镇", "遂城镇", "高林村镇", "大王店镇", "漕河镇", "东史端乡", "留村乡", "正村乡", "户木乡", "瀑河乡", "东釜山乡", "义联庄乡"], ["城区社区管理办公室街道", "涞水镇", "永阳镇", "义安镇", "石亭镇", "赵各庄镇", "九龙镇", "三坡镇", "一渡镇", "明义乡", "王村乡", "东文山乡", "娄村满族乡", "其中口乡", "龙门乡", "胡家庄乡", "涞水县经济开发区"], ["阜平镇", "龙泉关镇", "平阳镇", "城南庄镇", "天生桥镇", "王林口镇", "台峪乡", "大台乡", "史家寨乡", "砂窝乡", "吴王口乡", "夏庄乡", "北果元乡"], ["定兴镇", "固城镇", "贤寓镇", "北河镇", "天宫寺镇", "小朱庄镇", "东落堡乡", "高里乡", "张家庄乡", "姚村乡", "肖村乡", "柳卓乡", "杨村乡", "北田乡", "北南蔡乡", "李郁庄乡"], ["仁厚镇", "王京镇", "高昌镇", "北罗镇", "白合镇", "军城镇", "川里镇", "长古城镇", "罗庄镇", "都亭乡", "南店头乡", "北店头乡", "雹水乡", "大洋乡", "迷城乡", "齐家佐乡", "羊角乡", "石门乡", "黄石口乡", "倒马关乡"], ["高阳镇", "庞口镇", "西演镇", "邢家南镇", "晋庄镇", "蒲口乡", "小王果庄乡", "龙化乡", "庞家佐乡", "高阳县经济开发区"], ["容城镇", "小里镇", "南张镇", "大河镇", "晾马台镇", "八于乡", "贾光乡", "平王乡"], ["涞源镇", "银坊镇", "走马驿镇", "水堡镇", "王安镇", "杨家庄镇", "白石山镇", "南屯镇", "南马庄乡", "北石佛乡", "金家井乡", "留家庄乡", "上庄乡", "东团堡乡", "塔崖驿乡", "乌龙沟乡", "烟煤洞乡"], ["望都镇", "固店镇", "贾村镇", "寺庄乡", "赵庄乡", "黑堡乡", "高岭乡", "中韩庄乡", "望都经济开发区"], ["安新镇", "大王镇", "三台镇", "端村镇", "赵北口镇", "同口镇", "刘李庄镇", "安州镇", "老河头镇", "圈头乡", "寨里乡", "芦庄乡"], ["易州镇", "梁格庄镇", "西陵镇", "裴山镇", "塘湖镇", "狼牙山镇", "良岗镇", "紫荆关镇", "高村镇", "桥头乡", "白马乡", "流井乡", "高陌乡", "大龙华乡", "安格庄乡", "凌云册乡", "西山北乡", "尉都乡", "独乐乡", "七峪乡", "富岗乡", "坡仓乡", "牛岗乡", "桥家河乡", "甘河净乡", "蔡家峪乡", "南城司乡"], ["恒州镇", "灵山镇", "燕赵镇", "羊平镇", "文德镇", "晓林镇", "路庄子乡", "下河乡", "庄窠乡", "孝墓乡", "东旺乡", "邸村乡", "产德乡", "齐村乡", "党城乡", "郎家庄乡", "范家庄乡", "北台乡"], ["蠡吾镇", "留史镇", "大百尺镇", "辛兴镇", "北郭丹镇", "万安镇", "桑园镇", "南庄镇", "大曲堤镇", "小陈乡", "林堡乡", "北埝头乡", "鲍墟乡"], ["蒲阳镇", "高于铺镇", "腰山镇", "蒲上镇", "神南镇", "白云乡", "河口乡", "安阳乡", "台鱼乡", "大悲乡"], ["博野镇", "小店镇", "程委镇", "东墟镇", "北杨镇", "城东镇", "南小王乡"], ["雄州镇", "昝岗镇", "大营镇", "龙湾镇", "朱各庄镇", "米家务镇", "北沙口乡", "双堂乡", "张岗乡"], ["双塔街道", "桃园街道", "清凉寺街道", "松林店镇", "码头镇", "东城坊镇", "高官庄镇", "东仙坡镇", "百尺竿镇", "义和庄镇", "刁窝镇", "林家屯乡", "孙庄乡", "豆庄乡", "开发区管理委员会", "新兴产业示范区"], ["祁州药市街道", "祁州镇", "伍仁桥镇", "石佛镇", "郑章镇", "大五女镇", "西佛落镇", "明官店乡", "南娄底乡", "西安国城乡", "北段村乡", "现代中药工业园区"], ["和平街道", "军城街道", "东盛街道", "北城街道", "兴华路街道", "方官镇", "新城镇", "泗庄镇", "辛立庄镇", "东马营镇", "辛桥镇", "肖官营乡", "梁家营乡", "张六庄乡"]], [["红旗楼街道", "胜利北路街道", "五一路街道", "花园街街道", "工业路街道", "姚家庄镇"], ["新华街街道", "大境门街道", "明德北街街道", "明德南街街道", "堡子里街道", "南营坊街道", "工人新村街道", "东窑子镇"], ["天泰寺街道", "皇城街道", "南关街道", "南大街街道", "大北街街道", "工业街街道", "建国街街道", "庞家堡镇", "深井镇", "崞村镇", "沙岭子镇", "洋河南镇", "大仓盖镇", "贾家营镇", "顾家营镇", "赵川镇", "河子西乡", "春光乡", "侯家庙乡", "东望山乡", "李家堡乡", "王家湾乡", "塔儿村乡", "江家屯乡"], ["城镇街道", "煤矿街道", "花园乡", "辛庄子乡", "定方水乡", "段家堡乡"], ["孔家庄街道", "孔家庄镇", "万全镇", "洗马林镇", "郭磊庄镇", "膳房堡乡", "北新屯乡", "宣平堡乡", "高庙堡乡", "旧堡乡", "安家堡乡", "北沙城乡"], ["西湾子街道办", "西湾子镇", "高家营镇", "四台嘴乡", "红旗营乡", "石窑子乡", "驿马图乡", "石嘴子乡", "狮子沟乡", "清三营乡", "白旗乡"], ["张北镇", "公会镇", "二台镇", "大囫囵镇", "小二台镇", "油篓沟镇", "大河镇", "台路沟乡", "馒头营乡", "二泉井乡", "单晶河乡", "海流图乡", "两面井乡", "大西湾乡", "郝家营乡", "白庙滩乡", "战海乡", "三号乡"], ["康保镇", "张纪镇", "土城子镇", "邓油坊镇", "李家地镇", "照阳河镇", "屯垦镇", "闫油坊乡", "丹清河乡", "哈咇嘎乡", "二号卜乡", "芦家营乡", "忠义乡", "处长地乡", "满德堂乡", "康保牧场", "屯垦林场"], ["平定堡镇", "小厂镇", "黄盖淖镇", "九连城镇", "高山堡乡", "小河子乡", "二道渠乡", "大二号回族乡", "闪电河乡", "长梁乡", "丰源店乡", "西辛营乡", "莲花滩乡", "白土窑乡"], ["南壕堑镇", "大青沟镇", "八道沟镇", "红土梁镇", "小蒜沟镇", "三工地镇", "满井镇", "大营盘乡", "大苏计乡", "石井乡", "七甲乡", "套里庄乡", "甲石河乡", "下马圈乡"], ["蔚州镇", "代王城镇", "西合营镇", "吉家庄镇", "白乐镇", "暖泉镇", "南留庄镇", "北水泉镇", "桃花镇", "阳眷镇", "宋家庄镇", "下宫村乡", "南杨庄乡", "柏树乡", "常宁乡", "涌泉庄乡", "杨庄窠乡", "南岭庄乡", "陈家洼乡", "黄梅乡", "白草村乡", "草沟堡乡"], ["西城镇", "东城镇", "化稍营镇", "揣骨疃镇", "东井集镇", "要家庄乡", "东坊城堡乡", "井儿沟乡", "三马坊乡", "高墙乡", "大田洼乡", "辛堡乡", "马圈堡乡", "浮图讲乡"], ["柴沟堡镇", "左卫镇", "头百户镇", "怀安城镇", "渡口堡乡", "第六屯乡", "西湾堡乡", "西沙城乡", "太平庄乡", "王虎屯乡", "第三堡乡"], ["沙城镇", "北辛堡镇", "新保安镇", "东花园镇", "官厅镇", "桑园镇", "存瑞镇", "土木镇", "大黄庄镇", "西八里镇", "小南辛堡镇", "狼山乡", "鸡鸣驿乡", "东八里乡", "瑞云观乡", "孙庄子乡", "王家楼回族乡"], ["涿鹿镇", "张家堡镇", "武家沟镇", "五堡镇", "保岱镇", "矾山镇", "大堡镇", "河东镇", "东小庄镇", "辉耀镇", "大河南镇", "温泉屯镇", "蟒石口镇", "栾庄乡", "黑山寺乡", "卧佛寺乡", "谢家堡乡"], ["赤城镇", "田家窑镇", "龙关镇", "雕鹗镇", "独石口镇", "白草镇", "龙门所镇", "后城镇", "东卯镇", "炮梁乡", "大海陀乡", "镇宁堡乡", "马营乡", "云州乡", "三道川乡", "东万口乡", "茨营子乡", "样田乡"]], [["西大街街道", "头道牌楼街道", "潘家沟街道", "中华路街道", "新华路街道", "石洞子沟街道", "桥东街道", "水泉沟镇", "狮子沟镇", "牛圈子沟镇", "大石庙镇", "双峰寺镇"], ["元宝山街道", "钢城街道", "秀水街道", "双塔山镇", "滦河镇", "大庙镇", "偏桥子镇", "陈栅子乡", "西地满族乡"], ["鹰手营子矿区铁北路街道", "鹰手营子镇", "北马圈子镇", "寿王坟镇", "汪家庄镇"], ["下板城镇", "甲山镇", "六沟镇", "三沟镇", "头沟镇", "高寺台镇", "鞍匠镇", "三家镇", "磴上镇", "上谷镇", "东小白旗乡", "刘杖子乡", "新杖子乡", "孟家院乡", "大营子乡", "八家乡", "满杖子乡", "石灰窑乡", "五道河乡", "岔沟乡", "岗子满族乡", "两家满族乡", "仓子乡"], ["兴隆镇", "半壁山镇", "挂兰峪镇", "青松岭镇", "六道河镇", "平安堡镇", "北营房镇", "孤山子镇", "蓝旗营镇", "雾灵山镇", "李家营镇", "南天门满族乡", "八卦岭满族乡", "陡子峪乡", "上石洞乡", "大杖子乡", "蘑菇峪乡", "三道河乡", "安子岭乡", "大水泉乡"], ["平泉镇", "黄土梁子镇", "榆树林子镇", "杨树岭镇", "七沟镇", "小寺沟镇", "党坝镇", "卧龙镇", "南五十家子镇", "北五十家子镇", "桲椤树镇", "柳溪镇", "王土房乡", "七家岱满族乡", "平房满族蒙古族乡", "茅兰沟满族蒙古族乡", "台头山乡", "松树台乡", "道虎沟乡"], ["中兴路街道", "滦平镇", "长山峪镇", "红旗镇", "金沟屯镇", "虎什哈镇", "巴克什营镇", "张百湾镇", "付营子镇", "平坊满族乡", "安纯沟门满族乡", "小营满族乡", "西沟满族乡", "邓厂满族乡", "五道营子满族乡", "马营子满族乡", "付家店满族乡", "火斗山乡", "两间房乡", "涝洼乡", "大屯满族乡"], ["安州街道", "隆化镇", "韩麻营镇", "中关镇", "七家镇", "汤头沟镇", "张三营镇", "唐三营镇", "蓝旗镇", "步古沟镇", "郭家屯镇", "荒地乡", "章吉营乡", "茅荆坝乡", "尹家营满族乡", "庙子沟蒙古族满族乡", "偏坡营满族乡", "山湾乡", "八达营蒙古族乡", "太平庄满族乡", "旧屯满族乡", "西阿超满族蒙古族乡", "白虎沟满族蒙古族乡", "碱房乡", "韩家店乡", "湾沟门乡"], ["大阁镇", "大滩镇", "鱼儿山镇", "土城镇", "黄旗镇", "凤山镇", "波罗诺镇", "黑山咀镇", "天桥镇", "胡麻营镇", "万胜永乡", "四岔口乡", "苏家店乡", "外沟门乡", "草原乡", "窟窿山乡", "小坝子乡", "五道营乡", "南关蒙古族乡", "选将营乡", "西官营乡", "王营乡", "北头营乡", "石人沟乡", "汤河乡", "杨木栅子乡"], ["宽城镇", "龙须门镇", "峪耳崖镇", "板城镇", "汤道河镇", "饽罗台镇", "碾子峪镇", "亮甲台镇", "化皮溜子乡", "塌山乡", "孟子岭乡", "独石沟乡", "东大地乡", "铧尖乡", "东黄花川乡", "苇子沟乡", "大字沟门乡", "大石柱子乡"], ["围场镇", "四合永镇", "克勒沟镇", "棋盘山镇", "半截塔镇", "朝阳地镇", "朝阳湾镇", "腰站镇", "龙头山镇", "新拨镇", "御道口镇", "道坝子乡", "黄土坎乡", "四道沟乡", "兰旗卡伦乡", "银窝沟乡", "新地乡", "广发永乡", "育太和乡", "郭家湾乡", "杨家湾乡", "大唤起乡", "哈里哈乡", "张家湾乡", "宝元栈乡", "山湾子乡", "三义永乡", "姜家店乡", "下伙房乡", "燕格柏乡", "牌楼乡", "城子乡", "老窝铺乡", "石桌子乡", "大头山乡", "南山嘴乡", "西龙头乡", "塞罕坝机械林场", "国营御道口牧场"]], [["建设北街街道", "车站街道", "南大街街道", "东环街道", "道东街道", "小赵庄乡"], ["水月寺街道", "南环中路街道", "南湖街道", "市场街道", "西环中街街道", "公园街道", "小王庄镇", "南陈屯乡"], ["旧州镇", "兴济镇", "杜生镇", "崔尔庄镇", "薛官屯乡", "捷地回族乡", "张官屯乡", "李天木回族乡", "风化店乡", "姚官屯乡", "杜林回族乡", "汪家铺乡", "刘家庙乡", "仵龙堂乡", "大官厅乡", "高川乡", "黄递铺乡", "大褚村回族乡", "纸房头乡"], ["清州镇", "金牛镇", "新兴镇", "流河镇", "木门店镇", "马厂镇", "盘古镇", "上伍乡", "曹寺乡", "陈嘴乡", "青县农场"], ["东光镇", "连镇镇", "找王镇", "秦村镇", "灯明寺镇", "南霞口镇", "大单镇", "龙王李镇", "于桥乡"], ["苏基镇", "辛集镇", "高湾镇", "赵毛陶乡", "香坊乡", "小山乡", "张会亭乡", "海兴县农场", "青先农场", "青锋农场"], ["盐山镇", "望树镇", "庆云镇", "韩集镇", "千童镇", "圣佛镇", "边务乡", "小营乡", "杨集乡", "孟店乡", "常庄乡", "小庄乡"], ["肃宁镇", "梁家村镇", "窝北镇", "尚村镇", "万里镇", "师素镇", "河北留善寺乡", "付家佐乡", "邵庄乡"], ["南皮镇", "冯家口镇", "寨子镇", "鲍官屯镇", "王寺镇", "乌马营镇", "大浪淀乡", "刘八里乡", "潞灌乡"], ["桑园镇", "铁城镇", "于集镇", "梁集镇", "安陵镇", "曹家洼乡", "宋门乡", "杨家寺乡", "沟店铺乡", "何庄乡", "吴桥经济技术开发区"], ["乐寿镇", "淮镇镇", "郭庄镇", "河城街镇", "韩村镇", "陌南镇", "陈庄镇", "徐留高乡", "商林乡", "段村乡", "张村乡", "临河乡", "小平王乡", "十五级乡", "垒头乡", "南河头乡", "西城乡", "本斋回族乡", "农场", "献县经济开发区"], ["孟村镇", "新县镇", "辛店镇", "高寨镇", "宋庄子乡", "牛进庄乡"], ["解放街道", "河东街道", "古楼街道", "泊镇", "交河镇", "齐桥镇", "寺门村镇", "郝村镇", "富镇镇", "文庙镇", "洼里王镇", "王武庄乡", "营子乡", "四营乡", "西辛店乡", "泊头市工业区管委会"], ["新华路街道", "西环路街道", "永丰路街道", "中华路", "出岸镇", "石门桥镇", "吕公堡镇", "长丰镇", "鄚州镇", "苟各庄镇", "梁召镇", "辛中驿镇", "麻家坞镇", "议论堡乡", "青塔乡", "北辛庄乡", "七间房乡", "北汉乡", "于村乡", "华北石油管理局", "开发区管理委员会", "河北任丘雁翎工业园区"], ["骅东街道", "骅中街道", "骅西街道", "黄骅镇", "南排河镇", "吕桥镇", "旧城镇", "羊二庄回族乡", "常郭乡", "滕庄子乡", "官庄乡", "齐家务乡", "羊三木回族乡"], ["瀛州镇", "米各庄镇", "景和镇", "卧佛堂镇", "束城镇", "留古寺镇", "沙河桥镇", "故仙乡", "黎民居乡", "兴村乡", "沙洼乡", "西九吉乡", "北石槽乡", "诗经村乡", "郭家村乡", "时村乡", "行别营乡", "尊祖庄乡", "龙华店乡", "果子洼回族乡", "河间经济开发区管理委员会", "河北河间瀛州经济开发区管理委员会"]], [["银河南路街道", "光明西道街道", "永华道街道", "落垡镇", "码头镇", "葛渔城镇", "东沽港镇", "杨税务乡", "仇庄乡", "调河头乡", "北史家务乡"], ["银河北路街道", "爱民东道街道", "解放道街道", "新开路街道", "新源道街道", "南尖塔镇", "万庄镇", "九州镇", "北旺乡", "新世纪步行街管理委员会"], ["固安镇", "宫村镇", "柳泉镇", "牛驼镇", "马庄镇", "东湾乡", "彭村乡", "渠沟乡", "礼让店乡", "固安温泉休闲商务产业园区"], ["城区街道", "永清镇", "韩村镇", "后奕镇", "别古庄镇", "里澜城镇", "管家务回族乡", "曹家务乡", "龙虎庄乡", "刘街乡", "三圣口乡", "永清县工业园区"], ["淑阳镇", "蒋辛屯镇", "渠口镇", "安头屯镇", "安平镇", "刘宋镇", "五百户镇", "钱旺镇", "钳屯镇", "香河开发区", "香河新兴产业示范区"], ["平舒镇", "旺村镇", "大尚屯镇", "南赵扶镇", "留各庄镇", "权村镇", "里坦镇", "广安镇", "北位乡", "臧屯乡", "摩配园区管委会"], ["文安镇", "新镇镇", "苏桥镇", "大柳河镇", "左各庄镇", "滩里镇", "史各庄镇", "赵各庄镇", "兴隆宫镇", "大留镇镇", "孙氏镇", "德归镇", "大围河回族满族乡"], ["北辰街道", "大厂镇", "夏垫镇", "祁各庄镇", "邵府镇", "陈府镇", "大厂工业园区"], ["霸州镇", "南孟镇", "信安镇", "堂二里镇", "煎茶铺镇", "胜芳镇", "杨芬港镇", "岔河集乡", "康仙庄乡", "东杨庄乡", "王庄子乡", "东段乡", "霸州经济技术开发区"], ["鼎盛东大街街道", "泃阳西大街街道", "泃阳镇", "李旗庄镇", "杨庄镇", "皇庄镇", "新集镇", "段甲岭镇", "黄土庄镇", "高楼镇", "齐心庄镇", "燕郊镇", "燕郊经济技术开发区", "三河市农业高新技术园区"]], [["河西街道", "河东街道", "路北街道", "中华街道", "郑家河沿镇", "赵家圈镇", "邓庄镇", "何家庄乡"], ["冀州镇", "官道李镇", "南午村镇", "周村镇", "码头李镇", "西王镇", "门家庄乡", "徐家庄乡", "北漳淮乡", "小寨乡"], ["枣强镇", "恩察镇", "大营镇", "嘉会镇", "马屯镇", "肖张镇", "张秀屯镇", "新屯镇", "王均乡", "唐林乡", "王常乡"], ["武邑镇", "清凉店镇", "审坡镇", "赵桥镇", "韩庄镇", "肖桥头镇", "龙店乡", "圈头乡", "大紫塔乡"], ["武强镇", "街关镇", "周窝镇", "豆村乡", "北代乡", "孙庄乡"], ["饶阳镇", "大尹村镇", "五公镇", "大官亭镇", "王同岳乡", "留楚乡", "东里满乡"], ["安平镇", "马店镇", "南王庄镇", "大何庄乡", "程油子乡", "西两洼乡", "大子文乡", "东黄城乡", "河北丝网工业园区"], ["郑口镇", "夏庄镇", "青罕镇", "故城镇", "武官寨镇", "饶阳店镇", "军屯镇", "建国镇", "西半屯镇", "辛庄乡", "里老乡", "房庄乡", "三朗乡"], ["景州镇", "龙华镇", "广川镇", "王瞳镇", "洚河流镇", "安陵镇", "杜桥镇", "王谦寺镇", "北留智镇", "留智庙镇", "刘集乡", "连镇乡", "梁集乡", "温城乡", "后留名府乡", "青兰乡"], ["阜城镇", "古城镇", "码头镇", "霞口镇", "崔家庙镇", "漫河乡", "建桥乡", "蒋坊乡", "大白乡", "王集乡"], ["唐奉镇", "深州镇", "辰时镇", "榆科镇", "魏家桥镇", "大堤镇", "前磨头镇", "王家井镇", "护驾迟镇", "大屯镇", "高古庄镇", "兵曹乡", "穆村乡", "东安庄乡", "北溪村乡", "大冯营乡", "乔屯乡", "河北省深州监狱", "深州市城市新区管理委员会", "深州市双井经济开发区", "经济开发区"]]], [[["坞城街道", "营盘街道", "北营街道", "平阳路街道", "黄陵街道", "小店街道", "龙城街道", "北格镇", "西温庄乡", "刘家堡乡"], ["柳巷街道", "文庙街道", "庙前街道", "迎泽街道", "桥东街道", "老军营街道", "郝庄镇"], ["巨轮街道", "三桥街道", "鼓楼街道", "杏花岭街道", "坝陵桥街道", "大东关街道", "职工新街街道", "敦化坊街道", "涧河街道", "杨家峪街道", "中涧河乡", "小返乡"], ["尖草坪街道", "光社街道", "上兰街道", "南寨街道", "迎新街道", "古城街道", "汇丰街道", "柴村街道", "新城街道", "向阳镇", "阳曲镇", "马头水乡", "柏板乡", "西焉乡"], ["千峰街道", "下元街道", "和平街道", "兴华街道", "万柏林街道", "杜儿坪街道", "白家庄街道", "南寒街道", "东社街道", "化客头街道", "小井峪街道", "西铭街道", "长风西街街道", "神堂沟街道", "王封乡"], ["义井街道", "罗城街道", "晋源街道", "金胜镇", "晋祠镇", "姚村镇"], ["清源镇", "徐沟镇", "东于镇", "孟封镇", "马峪乡", "柳杜乡", "西谷乡", "王答乡", "集义乡"], ["黄寨镇", "大盂镇", "东黄水镇", "泥屯镇", "中心镇建设管理办公室", "高村乡", "侯村乡", "凌井店乡", "西凌井乡", "北小店乡", "杨兴乡"], ["娄烦镇", "静游镇", "杜交曲镇", "庙湾乡", "马家庄乡", "盖家庄乡", "米峪镇乡", "天池店乡"], ["东曲街道", "西曲街道", "桃园街道", "屯兰街道", "河口镇", "镇城底镇", "马兰镇", "阁上乡", "加乐泉乡", "梭峪乡", "岔口乡", "常安乡", "原相乡", "邢家社乡"]], [["南关街道", "北关街道", "东街街道", "西街街道", "南街街道", "北街街道", "新建南路街道", "新建北路街道", "大庆路街道", "新华街街道", "西花园街道", "老平旺街道", "向阳里街道", "振华南街街道", "开源街街道"], ["新胜街道", "新平旺街道", "煤峪口街道", "永定庄街道", "同家梁街道", "四老沟街道", "忻州窑街道", "白洞街道", "雁崖街道", "挖金湾街道", "晋华宫街道", "马脊梁街道", "大斗沟街道", "王村街道", "姜家湾街道", "新泉路街道", "民胜街道", "口泉街道", "马口街道", "燕子山街道", "杏儿沟街道", "青磁窑街道", "平泉路街道", "四台沟街道", "和顺街道", "和瑞街道", "平盛路街道", "清泉街街道"], ["古店镇", "高山镇", "云冈镇", "口泉乡", "新旺乡", "水泊寺乡", "马军营乡", "西韩岭乡", "平旺乡", "鸦儿崖乡"], ["新荣镇", "破鲁堡乡", "郭家窑乡", "花元屯乡", "西村乡", "上深涧乡", "堡子湾乡", "新荣区街道管理中心"], ["龙泉镇", "罗文皂镇", "大白登镇", "王官屯镇", "古城镇", "东小村镇", "友宰镇", "长城乡", "北徐屯乡", "狮子屯乡", "下深井乡", "马家皂乡", "鳌石乡"], ["玉泉镇", "谷前堡镇", "米薪关镇", "逯家湾镇", "新平堡镇", "卅里铺乡", "南河堡乡", "贾家屯乡", "赵家沟乡", "南高崖乡", "张西河乡"], ["壶泉镇", "南村镇", "一斗泉乡", "蕉山乡", "加斗乡", "宜兴乡", "作疃乡", "梁庄乡", "望狐乡"], ["武灵镇", "东河南镇", "上寨镇", "落水河乡", "史庄乡", "赵北乡", "石家田乡", "柳科乡", "白崖台乡", "红石塄乡", "下关乡", "独峪乡"], ["永安镇", "西坊城镇", "蔡村镇", "沙圪坨镇", "王庄堡镇", "大磁窑镇", "东坊城乡", "裴村乡", "驼峰乡", "西留村乡", "下韩村乡", "南榆林乡", "吴城乡", "黄花滩乡", "大仁庄乡", "千佛岭乡", "官儿乡", "青磁窑乡"], ["云兴镇", "鹊儿山镇", "店湾镇", "管家堡乡", "张家场乡", "三屯乡", "马道头乡", "小京庄乡", "水窑乡"], ["西坪镇", "倍加造镇", "周士庄镇", "吉家庄乡", "峰峪乡", "杜庄乡", "党留庄乡", "瓜园乡", "巨乐乡", "许堡乡", "湖东", "东街", "西街"]], [["上站街道", "下站街道", "北大街街道", "南山路街道", "义井街道", "坡底街道"], ["平潭街街道", "蔡洼街道", "赛鱼街道", "沙坪街道", "贵石沟街道", "县区直属镇"], ["荫营镇", "河底镇", "义井镇", "平坦镇", "西南舁乡", "杨家庄乡", "李家庄乡", "旧街乡"], ["冠山镇", "冶西镇", "锁簧镇", "张庄镇", "东回镇", "柏井镇", "娘子关镇", "巨城镇", "石门口乡", "岔口乡"], ["秀水镇", "孙家庄镇", "路家村镇", "南娄镇", "牛村镇", "苌池镇", "上社镇", "西烟镇", "仙人乡", "北下庄乡", "下社乡", "梁家寨乡", "西潘乡", "东梁乡"]], [["东街街道", "西街街道", "英雄南路街道", "英雄中路街道", "紫金街街道", "太行东街街道", "太行西街街道", "延安南路街道", "常青街道", "五马街道"], ["长北街道", "故县街道", "老顶山镇", "堠北庄镇", "大辛庄镇", "马厂镇", "黄碾镇", "西白兔乡"], ["韩店镇", "苏店镇", "荫城镇", "西火镇", "八义镇", "贾掌镇", "郝家庄乡", "西池乡", "北呈乡", "东和乡", "南宋乡", "振兴新区", "工业园区"], ["古韩镇", "王桥镇", "侯堡镇", "夏店镇", "虒亭镇", "西营镇", "王村镇", "下良镇", "善福乡", "北底乡", "上马乡", "富阳工业园区", "社区管理服务中心"], ["麟绛镇", "上村镇", "渔泽镇", "余吾镇", "吾元镇", "张店镇", "丰宜镇", "李高乡", "路村乡", "河神庙乡", "西贾乡", "西流寨开发区", "康庄工业园区", "上莲开发区"], ["青羊镇", "龙溪镇", "石城镇", "苗庄镇", "杏城镇", "西沟乡", "东寺头乡", "虹梯关乡", "阳高乡", "北耽车乡", "中五井乡", "北社乡"], ["黎侯镇", "东阳关镇", "上遥镇", "西井镇", "黄崖洞镇", "西仵乡", "停河铺乡", "程家山乡", "洪井乡"], ["龙泉镇", "百尺镇", "店上镇", "晋庄镇", "树掌镇", "集店乡", "黄山乡", "东井岭乡", "石坡乡", "五龙山乡", "鹅屋乡", "桥上乡", "常平经济开发区"], ["丹朱镇", "鲍店镇", "石哲镇", "大堡头镇", "慈林镇", "色头镇", "南漳镇", "岚水乡", "碾张乡", "常张乡", "南陈乡", "宋村乡"], ["丰州镇", "洪水镇", "蟠龙镇", "监漳镇", "故城镇", "墨镫乡", "韩北乡", "大有乡", "贾豁乡", "故县乡", "上司乡", "石北乡", "涌泉乡", "分水岭乡"], ["定昌镇", "郭村镇", "故县镇", "新店镇", "漳源镇", "册村镇", "段柳乡", "松村乡", "次村乡", "牛寺乡", "南里乡", "南泉乡", "杨安乡"], ["沁河镇", "郭道镇", "灵空山镇", "王和镇", "李元镇", "中峪乡", "法中乡", "交口乡", "聪子峪乡", "韩洪乡", "官滩乡", "景凤乡", "赤石桥乡", "王陶乡"], ["潞华街道", "成家川街道", "店上镇", "微子镇", "辛安泉镇", "翟店镇", "合室乡", "黄牛蹄乡", "史回乡"]], [["东街街道", "西街街道", "南街街道", "北街街道", "矿区街道", "钟家庄", "西上庄", "北石店镇"], ["龙港镇", "中村镇", "郑庄镇", "端氏镇", "嘉峰镇", "郑村镇", "柿庄镇", "樊村河乡", "土沃乡", "张村乡", "苏庄乡", "胡底乡", "固县乡", "十里乡"], ["凤城镇", "北留镇", "润城镇", "町店镇", "芹池镇", "次营镇", "横河镇", "河北镇", "蟒河镇", "东冶镇", "白桑乡", "寺头乡", "西河乡", "演礼乡", "固隆乡", "董封乡", "驾岭乡", "林场管理处"], ["崇文镇", "礼义镇", "附城镇", "西河底镇", "平城镇", "杨村镇", "潞城镇", "夺火乡", "马圪当乡", "古郊乡", "六泉乡", "秦家庄乡"], ["南村镇", "下村镇", "大东沟镇", "周村镇", "犁川镇", "晋庙铺镇", "金村镇", "高都镇", "巴公镇", "大阳镇", "山河镇", "大箕镇", "柳树口镇", "北义城镇", "川底乡", "李寨乡", "南岭乡"], ["北城街道", "东城街道", "南城街道", "米山镇", "三甲镇", "神农镇", "陈区镇", "北诗镇", "河西镇", "马村镇", "野川镇", "寺庄镇", "建宁乡", "石末乡", "原村乡", "永录乡"]], [["北城街道", "南城街道", "神头街道", "北旺庄街道", "神头镇", "利民镇", "下团堡乡", "小平易乡", "滋润乡", "福善庄乡", "南榆林乡", "贾庄乡", "沙塄河乡", "窑子头乡", "张蔡庄乡"], ["井坪镇", "凤凰城镇", "白堂乡", "陶村乡", "下水头乡", "双碾乡", "阻虎乡", "高石庄乡", "西水界乡", "下面高乡", "下木角乡", "向阳堡乡", "榆岭乡"], ["东城管理委员会", "西城管理委员会", "玉井镇", "北周庄镇", "古城镇", "岱岳镇", "吴马营乡", "马营乡", "下喇叭乡", "合盛堡乡", "安荣乡", "薛圐圙乡", "后所乡", "张家庄乡", "马营庄乡", "山阴农牧场"], ["金城镇", "南河种镇", "下社镇", "镇子梁乡", "义井乡", "藏寨乡", "大黄巍乡", "杏寨乡", "下马峪乡", "南泉乡", "大临河乡", "白马石乡"], ["新城镇", "右卫镇", "威远镇", "元堡子镇", "牛心堡乡", "白头里乡", "高家堡乡", "丁家窑乡", "杨千河乡", "李达窑乡"], ["云中镇", "吴家窑镇", "金沙滩镇", "毛家皂镇", "何家堡乡", "新家园乡", "亲和乡", "海北头乡", "马辛庄乡", "河头乡", "金沙滩农牧场", "金沙滩林场"]], [["北关街道", "锦纶街道", "新华街道", "西南街道", "路西街道", "经纬街道", "安宁街道", "新建街道", "晋华街道", "乌金山镇", "东阳镇", "什贴镇", "长凝镇", "北田镇", "修文镇", "郭家堡乡", "张庆乡", "庄子乡", "东赵乡"], ["箕城镇", "云簇镇", "郝北镇", "社城镇", "河峪乡", "北寨乡", "西马乡", "岚峪乡", "讲堂乡", "城区管理委员会"], ["城区街道管理委员会", "辽阳镇", "桐峪镇", "麻田镇", "芹泉镇", "拐儿镇", "寒王乡", "石匣乡", "龙泉乡", "粟城乡", "羊角乡"], ["城区管理委员会", "义兴镇", "李阳镇", "松烟镇", "青城镇", "横岭镇", "喂马乡", "平松乡", "牛川乡", "马坊乡", "阳光占乡"], ["乐平镇", "皋落镇", "冶头镇", "沾尚镇", "大寨镇", "李家庄乡", "界都乡", "三都乡", "赵壁乡", "孔氏乡", "闫庄乡", "西寨乡"], ["朝阳镇", "南燕竹镇", "宗艾镇", "平头镇", "松塔镇", "西洛镇", "尹灵芝镇", "平舒乡", "解愁乡", "温家庄乡", "景尚乡", "上湖乡", "羊头崖乡", "马首乡"], ["明星镇", "胡村镇", "范村镇", "侯城乡", "北汪乡", "水秀乡", "阳邑乡", "小白乡", "任村乡", "白塔区管委会", "北城区管委会", "南城区管委会"], ["昌源城区管理委员会", "丹枫城区管理委员会", "麓台城区管理委员会", "昭馀镇", "东观镇", "古县镇", "贾令镇", "城赵镇", "来远镇", "西六支乡", "峪口乡", "祁县经济开发区管理委员会"], ["古城街道", "城东街道", "城西街道", "古陶镇", "段村镇", "东泉镇", "洪善镇", "宁固镇", "南政乡", "中都乡", "岳壁乡", "卜宜乡", "孟山乡", "朱坑乡", "襄垣乡", "杜家庄乡", "香乐乡"], ["东城管理委员会", "西城管理委员会", "北城管理委员会", "翠峰镇", "静升镇", "两渡镇", "夏门镇", "南关镇", "段纯镇", "马和乡", "英武乡", "王禹乡", "坛镇乡", "梁家焉乡", "交口乡"], ["北关街道", "西关街道", "东南街道", "西南街道", "北坛街道", "义安镇", "张兰镇", "连福镇", "洪山镇", "龙凤镇", "绵山镇", "义棠镇", "城关乡", "宋古乡", "三佳乡"]], [["中城街道", "东城街道", "西城街道", "南城街道", "北城街道", "安邑街道", "大渠街道", "姚孟街道", "解州镇", "龙居镇", "北相镇", "泓芝驿镇", "三路里镇", "陶村镇", "东郭镇", "席张乡", "金井乡", "王范乡", "冯村乡", "上郭乡", "上王乡"], ["猗氏镇", "嵋阳镇", "临晋镇", "七级镇", "东张镇", "孙吉镇", "三管镇", "牛杜镇", "耽子镇", "楚侯乡", "庙上乡", "角杯乡", "北辛乡", "北景乡", "临猗县城市社区管理办公室"], ["解店镇", "通化镇", "汉薛镇", "荣河镇", "万泉乡", "里望乡", "西村乡", "南张乡", "高村乡", "皇甫乡", "贾村乡", "王显乡", "光华乡", "裴庄乡"], ["桐城镇", "郭家庄镇", "畖底镇", "薛店镇", "东镇镇", "礼元镇", "河底镇", "神柏乡", "阳隅乡", "侯村乡", "裴社乡", "后宫乡", "石门乡", "社区管理办公室"], ["稷峰镇", "西社镇", "化峪镇", "翟店镇", "清河镇", "蔡村乡", "太阳乡"], ["龙兴镇", "三泉镇", "泽掌镇", "北张镇", "古交镇", "万安镇", "阳王镇", "泉掌镇", "横桥乡", "社区办", "新绛县煤化园区管委会"], ["古绛镇", "横水镇", "陈村镇", "卫庄镇", "么里镇", "南樊镇", "安峪镇", "大交镇", "郝庄乡", "冷口乡"], ["新城镇", "历山镇", "古城镇", "王茅镇", "毛家湾镇", "蒲掌乡", "英言乡", "解峪乡", "华峰乡", "长直乡", "皋落乡"], ["瑶峰镇", "庙前镇", "裴介镇", "水头镇", "埝掌镇", "泗交镇", "尉郭乡", "禹王乡", "胡张乡", "南大里乡", "祁家河乡"], ["圣人涧镇", "常乐镇", "张店镇", "张村镇", "曹川镇", "三门镇", "洪池乡", "杜马乡", "部官乡", "坡底乡"], ["古魏镇", "风陵渡镇", "陌南镇", "西陌镇", "永乐镇", "大王镇", "阳城镇", "东垆乡", "南卫乡", "学张乡"], ["城西街道", "城北街道", "城东街道", "虞乡镇", "卿头镇", "开张镇", "栲栳镇", "蒲州镇", "韩阳镇", "张营镇", "伍姓湖农场", "虞乡农场", "董村农场"], ["城区街道", "清涧街道", "樊村镇", "僧楼镇", "小梁乡", "柴家乡", "赵家庄乡", "下化乡", "阳村乡", "山西铝厂"]], [["秀容街道", "长征街街道", "新建路街道", "播明镇", "奇村镇", "三交镇", "庄磨镇", "豆罗镇", "董村镇", "曹张乡", "高城乡", "秦城乡", "解原乡", "合索乡", "阳坡乡", "兰村乡", "紫岩乡", "西张乡", "东楼乡", "北义井乡"], ["晋昌镇", "河边镇", "宏道镇", "杨芳乡", "南王乡", "蒋村乡", "神山乡", "季庄乡", "受禄乡"], ["台城镇", "耿镇镇", "豆村镇", "白家庄镇", "东冶镇", "沟南乡", "东雷乡", "高洪口乡", "门限石乡", "陈家庄乡", "建安乡", "神西乡", "蒋坊乡", "灵境乡", "阳白乡", "茹村乡"], ["上馆镇", "阳明堡镇", "峨口镇", "聂营镇", "枣林镇", "滩上镇", "新高乡", "峪口乡", "上磨坊乡", "胡峪乡", "雁门关乡"], ["繁城镇", "砂河镇", "大营镇", "下茹越乡", "杏园乡", "光裕堡乡", "集义庄乡", "东山乡", "金山铺乡", "柏家庄乡", "横涧乡", "神堂堡乡", "岩头乡", "繁峙县城居民"], ["凤凰镇", "阳方口镇", "东寨镇", "石家庄镇", "薛家洼乡", "余庄乡", "涔山乡", "化北屯乡", "西马坊乡", "新堡乡", "迭台寺乡", "圪廖乡", "怀道乡", "东马坊乡", "阳方口煤矿生活区", "城区居民"], ["鹅城镇", "杜家村镇", "康家会镇", "丰润镇", "堂尔上乡", "中庄乡", "双路乡", "段家寨乡", "辛村乡", "王村乡", "神峪沟乡", "娘子神乡", "娑婆乡", "赤泥洼乡"], ["龙泉镇", "义井镇", "八角镇", "东湖乡", "太平庄乡", "虎北乡", "贺职乡", "长畛乡", "烈堡乡", "大严备乡"], ["砚城镇", "小河头镇", "三岔镇", "前所乡", "李家坪乡", "孙家坪乡", "梁家坪乡", "胡会乡", "新寨乡", "韩家楼乡", "东秀庄乡", "杏岭子乡"], ["岚漪镇", "三井镇", "神堂坪乡", "高家会乡", "李家沟乡", "水峪贯乡", "西豹峪乡", "温泉乡", "阳坪乡", "大涧乡", "宋家沟乡", "王家岔乡"], ["文笔镇", "楼子营镇", "刘家塔镇", "巡镇镇", "鹿固乡", "前川乡", "单寨乡", "土沟乡", "旧县乡", "沙坪乡", "社梁乡", "沙泉乡", "赵家沟乡"], ["东关镇", "义门镇", "桥头镇", "杨家湾镇", "腰庄乡", "韩家川乡", "林遮峪乡", "冯家川乡", "土崖塔乡", "孙家沟乡", "窑洼乡", "窑圪台乡", "南河沟乡"], ["新关镇", "天峰坪镇", "老营镇", "万家寨镇", "窑头乡", "楼沟乡", "尚峪乡", "南堡子乡", "水泉乡", "陈家营乡"], ["北城街道", "南城街道", "轩煤矿区街道", "东社镇", "苏龙口镇", "崞阳镇", "大牛店镇", "闫庄镇", "长梁沟镇", "轩岗镇", "新原乡", "南白乡", "子干乡", "中阳乡", "沿沟乡", "大林乡", "西镇乡", "解村乡", "王家庄乡", "楼板寨乡", "段家堡乡", "山西鲁能晋北铝业工矿区", "原平市石豹沟煤矿工矿区", "原平农场"]], [["解放路街道", "鼓楼西街街道", "水塔街街道", "南街街道", "乡贤街街道", "辛寺街街道", "铁路东街道", "车站街街道", "汾河街道", "滨河", "屯里镇", "乔李镇", "大阳镇", "县底镇", "刘村镇", "金殿镇", "吴村镇", "土门镇", "魏村镇", "尧庙镇", "段店乡", "贾得乡", "贺家庄乡", "一平垣乡", "枕头乡", "河底乡"], ["乐昌镇", "史村镇", "曲村镇", "高显镇", "里村镇", "北董乡", "杨谈乡"], ["唐兴镇", "南梁镇", "里砦镇", "隆化镇", "桥上镇", "西阎镇", "中卫乡", "南唐乡", "王庄乡", "浇底乡"], ["新城镇", "赵康镇", "汾城镇", "南贾镇", "古城镇", "襄陵镇", "邓庄镇", "陶寺乡", "永固乡", "景毛乡", "西贾乡", "南辛店乡", "大邓乡"], ["大槐树镇", "甘亭镇", "曲亭镇", "苏堡镇", "广胜寺镇", "明姜镇", "赵城镇", "万安镇", "刘家垣镇", "淹底乡", "兴唐寺乡", "堤村乡", "辛村乡", "龙马乡", "山头乡", "左木乡"], ["岳阳镇", "北平镇", "古阳镇", "旧县镇", "石壁乡", "永乐乡", "南垣乡"], ["府城镇", "和川镇", "唐城镇", "冀氏镇", "马必乡", "杜村乡", "良马乡"], ["天坛镇", "响水河镇", "张庄乡", "东张乡", "槐埝乡", "北王乡", "北韩乡", "米家垣乡", "寨圪塔乡"], ["吉昌镇", "屯里镇", "壶口镇", "车城乡", "文城乡", "东城乡", "柏山寺乡", "中垛乡"], ["昌宁镇", "光华镇", "台头镇", "管头镇", "西坡镇", "双鹤乡", "关王庙乡", "尉庄乡", "西交口乡", "枣岭乡"], ["昕水镇", "曲峨镇", "三多乡", "太德乡", "徐家垛乡", "太古乡"], ["龙泉镇", "午城镇", "黄土镇", "阳头升乡", "寨子乡", "陡坡乡", "下李乡", "城南乡"], ["芝河镇", "桑壁镇", "阁底乡", "南庄乡", "打石腰乡", "坡头乡", "交口乡"], ["蒲城镇", "薛关镇", "黑龙关镇", "克城镇", "山中乡", "古县乡", "红道乡", "乔家湾乡", "太林乡"], ["永安镇", "对竹镇", "勍香镇", "和平镇", "僧念镇", "佃坪乡", "团柏乡", "邢家要乡", "社区管理委员会"], ["路东街道", "路西街道", "浍滨街道", "上马街道", "张村街道", "新田乡", "高村乡", "凤城乡"], ["鼓楼街道", "北环路街道", "南环路街道", "开元街道", "退沙街道", "白龙镇", "辛置镇", "大张镇", "李曹镇", "陶唐峪乡", "三教乡", "师庄乡"]], [["滨河街道", "凤山街道", "莲花池街道", "城北街道", "田家会街道", "交口街道", "西属巴街道", "吴城镇", "信义镇", "红眼川乡", "枣林乡", "坪头乡"], ["凤城镇", "开栅镇", "南庄镇", "南安镇", "刘胡兰镇", "下曲镇", "孝义镇", "南武乡", "西城乡", "北张乡", "马西乡", "西槽头乡"], ["天宁镇", "夏家营镇", "西营镇", "水峪贯镇", "西社镇", "庞泉沟镇", "洪相乡", "岭底乡", "东坡底乡", "会立乡", "夏家营生态工业园区管委会"], ["蔚汾镇", "魏家滩镇", "瓦塘镇", "康宁镇", "高家村镇", "罗峪口镇", "蔡家会镇", "交楼申乡", "恶虎滩乡", "东会乡", "固贤乡", "奥家湾乡", "蔡家崖乡", "贺家会乡", "孟家坪乡", "赵家坪乡", "圪垯上乡", "兴县资源环保循环经济综合开发示范基地"], ["临泉镇", "白文镇", "城庄镇", "兔坂镇", "克虎镇", "三交镇", "湍水头镇", "林家坪镇", "招贤镇", "碛口镇", "刘家会镇", "丛罗峪镇", "曲峪镇", "木瓜坪乡", "安业乡", "玉坪乡", "青凉寺乡", "石白头乡", "雷家碛乡", "八堡乡", "大禹乡", "车赶乡", "安家庄乡"], ["柳林镇", "穆村镇", "薛村镇", "庄上镇", "留誉镇", "三交镇", "成家庄镇", "孟门镇", "李家湾乡", "贾家垣乡", "陈家湾乡", "金家庄乡", "高家沟乡", "石西乡", "王家沟乡"], ["灵泉镇", "罗村镇", "义牒镇", "小蒜镇", "龙交乡", "和合乡", "前山乡", "曹家垣乡", "裴沟乡"], ["东村镇", "岚城镇", "普明镇", "界河口镇", "土峪乡", "上明乡", "王狮乡", "梁家庄乡", "顺会乡", "河口乡", "社科乡", "大蛇头乡", "岚县普明工业园区"], ["圪洞镇", "马坊镇", "峪口镇", "大武镇", "北武当镇", "积翠乡", "麻地会乡"], ["宁乡镇", "金罗镇", "枝柯镇", "武家庄镇", "暖泉镇", "下枣林乡", "车鸣峪乡"], ["水头镇", "康城镇", "双池镇", "桃红坡镇", "石口乡", "回龙乡", "温泉乡"], ["新义街道", "中阳楼街道", "振兴街道", "胜溪湖街道", "崇文街道", "兑镇镇", "阳泉曲镇", "下堡镇", "西辛庄镇", "高阳镇", "梧桐镇", "柱濮镇", "大孝堡乡", "下栅乡", "驿马乡", "南阳乡", "杜村乡"], ["文峰街道", "太和桥街道", "贾家庄镇", "杏花村镇", "冀村镇", "肖家庄镇", "演武镇", "三泉镇", "石庄镇", "杨家庄镇", "峪道河镇", "西河乡", "阳城乡", "栗家庄乡", "南薰街道", "辰北街道"]]], [[["海拉尔东路街道", "锡林路街道", "中山东路街道", "东街街道", "西街街道", "东风路街道", "迎新路街道", "成吉思汗大街街道", "保合少镇", "新城区鸿盛高科技园区"], ["新华西路", "中山西路", "光明路", "海拉尔西路", "环河街", "通道街", "钢铁路", "攸攸板镇"], ["小召前街", "兴隆巷", "长和廊", "石东路", "大南街", "鄂尔多斯路", "西菜园", "昭君路", "小黑河镇", "裕隆工业园区"], ["人民路街道", "大学西路街道", "乌兰察布东路街道", "大学东路街道", "中专路街道", "昭乌达路街道", "巴彦街道", "敕勒川路街道", "榆林镇", "黄合少镇", "金河镇", "金桥经济技术开发区"], ["察素齐镇", "毕克齐镇", "善岱镇", "台阁牧镇", "白庙子镇", "沙尔沁镇", "敕勒川镇", "北什轴乡", "塔布赛乡", "呼和浩特金山经济技术开发区"], ["双河镇", "新营子镇", "五申镇", "伍什家镇", "古城镇", "托县工业园区"], ["城关镇", "盛乐镇", "新店子镇", "舍必崖乡", "大红城乡", "羊群沟乡", "黑老夭乡", "巧什营乡", "盛乐经济工业园区"], ["城关镇", "宏河镇", "喇嘛湾镇", "老牛湾镇", "窑沟乡", "北堡乡", "韮菜庄乡", "五良太乡"], ["可镇", "哈乐镇", "西乌兰不浪镇", "大青山乡", "上秃亥乡", "德胜沟乡", "二份子乡", "哈拉合少乡", "耗赖山乡", "内蒙古武川经济开发区", "武川金三角开发区"]], [["和平街道", "财神庙街道", "西脑包街道", "南门外街道", "南圪洞街道", "东站街道", "回民街道", "天骄街道", "河东街道", "铁西街道", "东兴街道", "杨圪楞街道", "河东镇", "沙尔沁镇", "县级单位直辖村级单位（特殊镇）", "铝业工业园区"], ["少先路街道", "沼潭街道", "林荫路街道", "友谊大街街道", "阿尔丁大街街道", "团结大街街道", "鞍山道街道", "前进道街道", "市府东路街道", "白云路街道", "黄河西路街道", "昆工路街道", "昆北街道", "昆河镇", "卜尔汉图镇", "包钢厂区"], ["先锋道街道", "幸福路街道", "万青路街道", "富强路街道", "科学路街道", "青山路街道", "自由路街道", "乌素图街道", "青福镇", "兴胜镇", "包头市装备制造产业园区"], ["石拐街道", "大发街道", "大磁街道", "五当沟街道", "白狐沟街道", "大德恒", "五当召镇", "吉忽伦图苏木", "工业园区管理委员会"], ["矿山路街道", "通阳道街道"], ["沙河街道", "赛汗街道", "萨如拉街道", "白音席勒街道", "麻池镇", "哈林格尔镇", "哈业胡同镇", "阿嘎如泰苏木乡"], ["萨拉齐镇", "双龙镇", "美岱召镇", "沟门镇", "将军尧镇", "海子乡", "明沙淖乡", "苏波盖乡", "九峰山生态管理委员会"], ["金山镇", "西斗铺镇", "下湿壕镇", "银号镇", "怀朔镇", "兴顺西镇"], ["满都拉镇", "希拉穆仁镇", "百灵庙镇", "石宝镇", "乌克忽洞镇", "明安镇", "巴音花镇", "达尔罕苏木乡", "查干哈达苏木", "巴音敖包苏木", "西河乡", "小文公乡"]], [["凤凰岭街道", "海北街道", "新华街道", "新华西街道", "滨河街道", "林荫街道", "千里山镇", "乌海市海勃湾千里山工业园区"], ["拉僧仲街道", "西卓子山街道", "公乌素镇", "拉僧庙镇", "巴音陶亥镇"], ["三道坎街道", "五虎山街道", "新达街道", "巴音赛街道", "梁家沟街道", "苏海图街道", "滨海街道", "乌兰淖尔镇", "乌达经济开发区"]], [["西屯街道", "三中街街道", "永巨街道", "东城街道", "南新街街道", "站前街道", "铁南街道", "长青街道", "哈达街道", "西城街道", "桥北街道", "红庙子镇", "文钟镇", "红山工业园区", "红山物流园区", "红山区农畜产品加工产业园区"], ["西露天街道", "平庄城区街道", "平庄东城街道", "平庄西城街道", "马林街道", "云杉路街道", "风水沟镇", "元宝山镇", "美丽河镇", "平庄镇", "五家镇", "小五家乡"], ["振兴街道", "向阳街道", "松州街道", "铁东街道", "穆家营子镇", "初头朗镇", "大庙镇", "王府镇", "老府镇", "哈拉道口镇", "上官地镇", "安庆镇", "太平地镇", "当铺地满族乡", "夏家店乡", "城子乡", "大夫营子乡", "岗子乡", "玉龙街道", "全宁街道", "兴安街道"], ["天山镇", "天山口镇", "双胜镇", "坤都镇", "巴彦花镇", "绍根镇", "扎嘎斯台镇", "新民乡", "先锋乡", "罕苏木苏木", "赛汉塔拉苏木", "巴拉奇如德苏木", "乌兰哈达乡", "巴彦温都尔苏木", "轻工食品产业园", "新能源产业园", "绍根煤碳及煤化工产业园", "罕乌拉街道", "欧沐沦街道"], ["林东镇", "隆昌镇", "十三敖包镇", "碧流台镇", "富河镇", "白音勿拉镇", "哈拉哈达镇", "查干哈达苏木", "乌兰达坝苏木", "三山乡", "花加拉嘎乡", "上京高新技术产业集中区", "南塔工业集中区", "凤凰山工业集中区", "林东西城街道", "林东东城街道"], ["大板镇", "索博日嘎镇", "宝日勿苏镇", "查干诺尔镇", "巴彦琥硕镇", "西拉沐沦苏木", "巴彦塔拉苏木", "幸福之路苏木", "查干沐沦苏木", "大板煤电化基地"], ["林西镇", "新城子镇", "新林镇", "五十家子镇", "官地镇", "大井镇", "统部镇", "大营子乡", "十二吐乡", "城北街道办事处", "城南街道办事处", "内蒙古林西工业园区"], ["经棚镇", "宇宙地镇", "土城子镇", "同兴镇", "万合永镇", "芝瑞镇", "达来诺日镇", "新开地乡", "红山子乡", "达日罕乌拉苏木", "巴彦查干苏木", "浩来呼热苏木", "乌兰布统苏木", "应昌街道", "热水塘温泉疗养旅游开发区管委会", "克什克腾旗煤电化基地", "西拉沐沦街道", "克什克腾旗渔场"], ["乌丹镇", "乌敦套海镇", "五分地镇", "桥头镇", "广德公镇", "梧桐花镇", "海拉苏镇", "亿合公镇", "解放营子乡", "阿什罕苏木", "新苏莫苏木", "白音套海苏木", "毛山东乡", "格日僧苏木", "玉龙工业园区", "紫城街道筹备处", "全宁街道筹备处"], ["锦山镇", "美林镇", "王爷府镇", "小牛群镇", "牛家营子镇", "乃林镇", "西桥镇", "十家满族乡", "南台子乡", "乃林果树农场", "马鞍山羊场", "赤峰市和美工贸园区", "锦山工业园区"], ["天义镇", "小城子镇", "大城子镇", "八里罕镇", "黑里河镇", "甸子镇", "大双庙镇", "汐子镇", "大明镇", "忙农镇", "五化镇", "三座店镇", "必斯营子镇", "一肯中乡", "存金沟乡", "中京工业园", "塞飞亚食品工业园", "八里罕酒业园区", "再生资源产业园", "生物科技产业园区", "汐子工业园", "农机产业园区"], ["新惠镇", "四家子镇", "长胜镇", "贝子府镇", "四道湾子镇", "下洼镇", "金厂沟梁镇", "兴隆洼镇", "黄羊洼镇", "牛古吐乡", "木头营子乡", "古鲁板蒿乡", "丰收乡", "玛尼罕乡", "萨力巴乡", "敖润苏莫苏木", "国营种羊场", "敖汉旗新惠工业园区", "贝子府化工集中区", "四家子冶金工业集中区"]], [["科尔沁街道", "西门街道", "永清街道", "明仁街道", "施介街道", "清真街道", "东郊街道", "铁路街道", "红星街道", "霍林街道", "建国街道", "大林镇", "钱家店镇", "余粮堡镇", "木里图镇", "丰田镇", "清河镇", "育新镇", "庆和镇", "敖力布皋镇", "莫力庙苏木", "哲南农场", "三义堂农场", "高林屯种畜场", "胡力海原种繁殖场", "莫力庙羊场", "半截店牧场"], ["保康镇", "宝龙山镇", "舍伯吐镇", "巴彦塔拉镇", "门达镇", "架玛吐镇", "腰林毛都镇", "希伯花镇", "花吐古拉镇", "代力吉镇", "努日木镇", "花胡硕苏木乡", "协代苏木乡", "白兴吐苏木乡", "图布信苏木乡", "敖包苏木", "胜利乡", "白音塔拉农场", "珠日河牧场", "丰库牧场", "保康街道"], ["甘旗卡镇", "吉尔嘎朗镇", "金宝屯镇", "常胜镇", "查日苏镇", "双胜镇", "阿古拉镇", "朝鲁吐镇", "努古斯台镇", "海鲁吐镇", "阿都沁苏木", "茂道吐苏木", "巴嘎塔拉苏木", "散都苏木", "巴彦毛都苏木", "胜利农场", "孟根达坝牧场", "查金台牧场", "原种场", "大青沟管理局", "哈日乌苏种畜场", "乌兰敖道渔场", "金宝屯林场", "朝鲁吐林场", "茂道吐林场", "伊胡塔林场", "乌旦塔拉林场"], ["开鲁镇", "大榆树镇", "黑龙坝镇", "麦新镇", "义和塔拉镇", "建华镇", "小街基镇", "东风镇", "吉日嘎郎吐镇", "东来镇", "清河牧场", "辽河农场", "保安农场"], ["库伦镇", "扣河子镇", "白音花镇", "六家子镇", "额勒顺镇", "茫汗苏木", "先进苏木", "水泉乡", "库伦街道"], ["大沁他拉镇", "八仙筒镇", "青龙山镇", "新镇", "治安镇", "东明镇", "沙日浩来镇", "义隆永镇", "固日班花苏木", "白音他拉苏木", "明仁苏木", "黄花塔拉苏木", "土城子乡", "苇莲苏乡", "国有六号农场"], ["鲁北镇", "黄花山镇", "嘎亥图镇", "巨日合镇", "巴雅尔图胡硕镇", "香山镇", "阿日昆都楞镇", "巴彦塔拉苏木乡", "乌力吉木仁苏木乡", "道老杜苏木乡", "格日朝鲁苏木乡", "前德门苏木", "乌兰哈达苏木", "查布嘎图苏木", "乌额格其苏木", "乌额格其牧场", "香山农场", "乌日根塔拉农场", "嘎达苏种畜场"], ["珠斯花街道", "莫斯台街道", "宝日呼吉尔街道", "沙尔呼热街道", "达来胡硕苏木", "东蒙鑫农牧业有限责任公司"]], [["交通街道", "公园街道", "林荫街道", "建设街道", "富兴街道", "天骄街道", "诃额伦街道", "巴音门克街道", "幸福街道", "纺织街道", "兴盛街道", "民族街道", "泊尔江海子镇", "罕台镇", "铜川镇", "鄂尔多斯市装备制造基地", "东胜区轻纺工业园区", "铜川汽车博览园"], ["哈巴格希街道", "青春山街道", "滨河街道", "鄂尔多斯市高新技术产业园区", "鄂尔多斯市云计算产业园区"], ["工业街道", "昭君街道", "锡尼街道", "白塔街道", "西园街道", "平原街道", "树林召镇", "吉格斯太镇", "白泥井镇", "王爱召镇", "昭君镇", "恩格贝镇", "中和西镇", "展旦召苏木乡", "达拉特经济开发区", "鄂尔多斯市生态示范区管理委员会"], ["兴隆街道", "迎泽街道", "蓝天街道", "友谊街道", "薛家湾镇", "沙圪堵镇", "大路镇", "纳日松镇", "龙口镇", "准格尔召镇", "暖水乡", "十二连城乡", "布尔陶亥苏木乡", "准格尔经济开发区", "大路煤化工基地"], ["敖勒召其镇", "上海庙镇", "城川镇", "昂素镇", "上海庙经济开发区"], ["乌兰镇", "棋盘井镇", "蒙西镇", "木凯淖尔镇", "苏米图苏木乡", "阿尔巴斯苏木乡", "蒙西工业园区", "棋盘井工业园区"], ["锡尼镇", "巴拉贡镇", "吉日嘎朗图镇", "独贵特拉镇", "呼和木独镇", "伊和乌素苏木乡", "杭锦旗独贵塔拉工业园区管理委员会", "鄂尔多斯新能源产业示范区"], ["嘎鲁图镇", "乌审召镇", "图克镇", "乌兰陶勒盖镇", "无定河镇", "苏力德苏木乡", "纳林河化工项目区", "图克化工项目区", "乌审召生态化工项目区", "苏里格经济开发区"], ["阿勒腾席热镇", "札萨克镇", "乌兰木伦镇", "纳林陶亥镇", "苏布尔嘎镇", "红庆河镇", "伊金霍洛镇", "鄂尔多斯江苏工业园区", "鄂尔多斯圣圆煤化工基地", "鄂尔多斯蒙古源流文化产业园区", "伊金霍洛旗札萨克物流园区", "鄂尔多斯空港物流园区"]], [["正阳", "健康街道", "靠山街道", "胜利街道", "呼伦街道", "建设街道", "哈克镇", "奋斗镇"], ["第三街道", "第一街道", "第二街道", "第四街道", "第五街道", "灵泉镇"], ["那吉镇", "六合镇", "亚东镇", "霍尔奇镇", "向阳峪镇", "三岔河镇", "复兴镇", "兴安镇", "得力其鄂温克民族乡", "查巴奇鄂温克民族乡", "音河达斡尔鄂温克民族乡", "新发朝鲜民族乡", "那吉屯农场", "格尼河农场", "阿荣旗林业局"], ["尼尔基镇", "红彦镇", "宝山镇", "哈达阳镇", "阿尔拉镇", "汉古尔河镇", "西瓦尔图镇", "腾克镇", "奎勒河镇", "塔温敖宝镇", "巴彦鄂温克民族乡", "库如奇乡", "杜拉尔鄂温克民族乡", "国营甘河农场", "国营巴彦农场", "国营欧肯河农场", "国营东方红农场"], ["阿里河镇", "大杨树镇", "甘河镇", "吉文镇", "诺敏镇", "乌鲁布铁镇", "宜里镇", "克一河镇", "古里乡", "托扎敏乡", "大兴安岭管理局诺敏河农场", "大兴安岭农场宜里农场", "大兴安岭农场管理局扎兰河农场", "大兴安岭农场管理局古里农场", "加格达奇区", "松岭地区", "大杨树林业局", "甘河林业局", "克一河林业局", "吉文林业局", "阿里河林业局", "大兴安岭农工商联合公司", "大兴安岭农场管理局东方红农场", "大兴安岭农场管理局欧肯河农场", "大兴安岭林管局毕拉河林业局", "大兴安岭林管局伊图里河林业局", "大兴安岭林管局库都尔林业局", "大兴安岭林管局乌尔其汗林业局"], ["巴彦托海镇", "大雁镇", "伊敏河镇", "红花尔基镇", "巴彦查岗苏木", "锡尼河西苏木", "锡尼河东苏木", "巴彦塔拉达斡尔民族乡", "伊敏苏木", "辉苏木", "巴彦托海经济开发区", "伊敏河高载能工业园区", "大雁马铃薯高新技术示范园区", "呼伦贝尔新城区"], ["陈旗巴彦库仁镇", "陈旗宝日希勒镇", "陈旗呼和诺尔镇", "陈旗西乌珠尔苏木", "陈旗鄂温克民族苏木", "陈旗东乌珠尔苏木", "陈旗巴彦哈达苏木", "陈巴尔虎旗国营哈图达牧场", "陈旗国营浩特陶海农牧场", "陈旗国营特泥河牧场"], ["嵯岗镇", "阿木古郎镇", "新宝力格苏木乡", "乌布尔宝力格苏木乡", "罕达盖苏木", "吉布胡郎图苏木", "甘珠尔苏木", "嵯岗双娃牧场"], ["阿拉坦额莫勒镇", "阿日哈沙特镇", "呼伦镇", "贝尔苏木", "克尔伦苏木", "达赉苏木", "宝格德乌拉苏木", "敖尔金牧场"], ["东山街道", "道南街道", "道北街道", "兴华街道", "新开河镇", "满洲里市互市贸易区", "满洲里市经济合作区", "满洲里市东湖区", "满洲里市扎煤公司", "扎赉诺尔矿区", "满洲里市工业园区", "满洲里国际物流产业园区"], ["胜利街道", "红旗街道", "新工街道", "永兴街道", "建设街道", "暖泉街道", "免渡河镇", "博克图镇", "绰河源镇", "乌尔其汉镇", "库都尔镇", "图里河镇", "乌奴耳镇", "塔尔气镇", "伊图里河镇", "牧原镇", "莫拐农场", "牙克石农场", "免渡河农场"], ["兴华街道", "正阳街道", "繁荣街道", "向阳街道", "高台子街道", "铁东街道", "河西街道", "磨菇气镇", "卧牛河镇", "成吉思汗镇", "大河湾镇", "浩饶山镇", "柴河镇", "中和镇", "哈多河镇", "达斡尔民族乡", "鄂伦春民族乡", "萨马街鄂温克民族乡", "洼堤乡", "大河湾农场", "绰尔河农场", "扎兰屯马场", "成吉思汗牧场", "公安部后勤供应处农场", "南木林业局", "柴河林业局", "扎兰屯市林业局", "市原种场"], ["拉布达林街道", "上库力街道", "黑山头镇", "莫尔道嘎镇", "恩和哈达镇", "三河回族乡", "恩和俄罗斯族民族乡", "蒙兀室韦苏木", "奇乾乡", "海拉尔农垦集团有限公司拉布大林农场分公司", "三河金騋农牧有限责任公司", "海拉尔农垦集团有限责任公司上库力农场分公司", "海拉尔农垦集团有限责任公司苏沁牧场分公司"], ["河东街道", "河西街道", "森工街道", "金河镇", "阿龙山镇", "满归镇", "得耳布尔镇", "敖鲁古雅乡"]], [["团结", "车站", "先锋", "解放", "新华", "东环路", "铁南", "西环路", "北环路", "狼山镇", "新华镇", "干召庙镇", "乌兰图克镇", "双河镇", "城关镇", "白脑包镇", "曙光乡", "八一乡", "狼山农场", "临河农场", "金川", "汇丰"], ["隆兴昌镇", "塔尔湖镇", "套海镇", "新公中镇", "天吉太镇", "胜丰镇", "银定图镇", "复兴镇", "和胜乡", "巴彦淖尔市建丰农场", "内蒙古东土城劳动教养管理所"], ["巴彦高勒镇", "隆盛合镇", "渡口镇", "补隆淖镇", "沙金套海苏木", "乌兰布和农场", "巴彦套海农场", "哈腾套海农场", "包尔盖农场", "纳林套海农场", "沙漠林业实验中心农场"], ["乌拉山镇", "白彦花镇", "先锋镇", "新安镇", "西小召镇", "大佘太镇", "明安镇", "小佘太镇", "苏独仑镇", "额尔登布拉格苏木", "沙德格苏木", "巴彦淖尔市中滩农场", "巴彦淖尔市西山咀农场", "巴彦淖尔市新安农场", "巴彦淖尔市苏独仑农场", "巴彦淖尔市大佘太牧场", "巴彦淖尔市乌梁素海渔场"], ["海流图镇", "乌加河镇", "德岭山镇", "石哈河镇", "甘其毛都镇", "温更镇", "呼鲁斯太苏木", "川井苏木", "巴音乌兰苏木", "新忽热苏木", "牧羊海牧场", "同和太种畜场"], ["巴音宝力格镇", "呼和温都尔镇", "潮格温都尔镇", "获各琦苏木", "巴音前达门苏木", "乌盖苏木"], ["陕坝镇", "头道桥镇", "二道桥镇", "三道桥镇", "蛮会镇", "团结镇", "双庙镇", "沙海镇", "蒙海镇", "太阳庙农场"]], [["新体路街道", "桥东街道", "前进路街道", "常青街道", "虎山街道", "桥西街道", "新华街街道", "泉山街道", "白海子镇", "马莲渠乡"], ["卓资山镇", "旗下营镇", "卓资县十八台镇", "卓资县巴音锡勒镇", "卓资县梨花镇", "卓资县大榆树乡", "卓资县红召乡", "卓资县复兴乡"], ["化德县长顺镇", "化德县朝阳镇", "化德县七号镇", "化德县德包图乡", "化德县公腊胡洞乡", "化德县白音特拉乡"], ["七台镇", "十八顷镇", "大黑沙土镇", "西井子镇", "屯垦队镇", "小海子镇", "大库伦乡", "卯都乡", "玻璃忽镜乡", "三大顷乡"], ["城关镇", "张皋镇", "赛乌素镇", "鄂尔栋镇", "店子镇", "大库联乡", "民族团结乡", "大同夭乡", "五股泉乡", "南部矿区管委会"], ["岱海镇", "六苏木镇", "麦胡图镇", "永兴镇", "蛮汉镇", "天成乡", "曹碾满族乡", "厂汉营乡", "岱海循环工业发展区", "蛮汉山林场", "岱海林场", "岱海旅游区"], ["土贵乌拉镇", "平地泉镇", "玫瑰营镇", "巴音塔拉镇", "黄旗海镇", "乌拉哈乌拉乡", "黄茂营乡", "三岔口乡", "老圈沟乡", "察右前旗天皮山冶金化工工业园区", "察右前旗察哈尔工业园区"], ["科布尔镇", "铁沙盖镇", "黄羊城镇", "广益隆镇", "乌素图镇", "大滩乡", "宏盘乡", "巴音乡", "库联苏木", "乌兰哈页苏木", "察右中旗土城子乡", "辉腾锡勒园区管理委员会"], ["白音察干镇", "察哈尔右翼后旗土牧尔台镇", "察哈尔右翼后旗红格尔图镇", "察哈尔右翼后旗贲红镇", "察哈尔右翼后旗大六号镇", "察哈尔右翼后旗当郎忽洞苏木", "察哈尔右翼后旗乌兰哈达苏木", "察哈尔右翼后旗锡勒乡"], ["四子王旗乌兰花镇", "四子王旗吉生太镇", "四子王旗库伦图镇", "四子王旗供济堂镇", "四子王旗白音朝克图镇", "四子王旗红格尔苏木", "四子王旗江岸苏木", "四子王旗查干补力格苏木", "四子王旗脑木更苏木", "四子王旗东八号乡", "四子王旗忽鸡图乡", "四子王旗大黑河乡", "四子王旗巴音敖包苏木", "四子王旗乌兰牧场"], ["新城区街道", "旧城区街道", "北城区街道", "工业区街道", "南城区街道", "隆盛庄镇", "黑土台镇", "红砂坝镇", "巨宝庄镇", "三义泉镇", "浑源窑乡", "元山子乡", "官屯堡乡"]], [["爱国", "和平", "兴安", "胜利", "铁西", "都林", "五一", "城郊", "乌兰哈达镇", "葛根庙镇", "太本站镇", "义勒力特镇", "呼和马场", "乌兰浩特工业经济开发区", "乌兰浩特经济技术开发区"], ["阿尔山市林海街道", "阿尔山市新城街道", "阿尔山市温泉街道", "伊尔施街道", "阿尔山市天池镇", "阿尔山市白狼镇", "阿尔山市五岔沟镇", "明水河镇"], ["科尔沁镇", "索伦镇", "德佰斯镇", "大石寨镇", "归流河镇", "居力很镇", "察尔森镇", "额尔格图镇", "俄体镇", "满族屯满族乡", "乌兰毛都苏木乡", "阿力得尔苏木乡", "巴拉格歹乡", "桃合木苏木", "跃进马场", "索伦牧场", "阿力得尔牧场", "公主陵牧场", "绿水种畜场", "科右前旗工业园区"], ["巴彦呼舒镇", "巴仁哲里木镇", "吐列毛都镇", "杜尔基镇", "高力板镇", "好腰苏木镇", "代钦塔拉苏木", "新佳木苏木", "哈日诺尔苏木", "额木庭高勒苏木", "巴彦茫哈苏木", "巴彦淖尔苏木", "布敦化牧场", "吐列毛杜农场", "孟恩套力盖矿区工作部", "布敦化矿区工作部"], ["音德尔镇", "新林镇", "巴彦高勒镇", "胡尔勒镇", "阿尔本格勒镇", "巴达尔胡镇", "图牧吉镇", "好力保镇", "巴彦乌兰苏木", "宝力根花苏木", "阿拉达尔吐苏木", "巴彦扎拉嘎乡", "努文木仁乡", "内蒙古自治区图牧吉强制隔离戒毒所", "保安沼监狱", "乌兰监狱", "乌塔其监狱", "种畜场", "八一牧场", "巴达尔胡农场"], ["突泉镇", "六户镇", "东杜尔基镇", "永安镇", "水泉镇", "宝石镇", "学田乡", "九龙乡", "太平乡", "东杜尔基国营农场"]], [["格日勒敖都苏木", "二连浩特市社区建设管理局", "二连边境经济技术合作区"], ["希日塔拉街道", "宝力根街道", "杭盖街道", "楚古兰街道", "额尔敦街道", "南郊街道", "巴彦查干街道", "阿尔善宝拉格镇", "宝力根苏木", "朝克乌拉苏木", "巴彦锡勒办", "巴彦宝拉格苏木", "锡林郭勒盟经济技术开发区", "白音库伦牧场", "贝力克牧场", "毛登牧场"], ["别力古台镇", "洪格尔高勒镇", "查干淖尔镇", "那仁宝拉格苏木乡", "伊和高勒苏木乡乡", "吉尔嘎郎图苏木乡", "巴彦图嘎苏木", "玛尼图煤矿", "阿旗德力格尔工业园区"], ["满都拉图镇", "查干敖包镇", "巴彦淖尔镇", "巴彦乌拉苏木", "赛罕高毕苏木", "洪格尔苏木", "达来苏木", "苏尼特左旗芒来循环经济产业园区", "恩格尔河灌区"], ["赛汉塔拉镇", "朱日和镇", "乌日根塔拉镇", "桑宝拉格苏木乡", "额仁淖尔苏木", "赛罕乌力吉苏木", "阿其图乌拉苏木", "苏尼特右旗朱日和工业园区"], ["乌里雅斯太镇", "道特淖尔镇", "嘎达布其镇", "满都胡宝拉格镇", "额吉淖尔镇", "呼热图淖尔苏木", "萨麦苏木", "嘎海乐苏木", "阿拉坦合力苏木", "乌里雅斯太工业区", "宝格达乌拉总场"], ["巴拉嘎尔高勒镇", "巴彦花镇", "吉仁高勒镇", "浩勒图高勒镇", "高日罕镇", "巴彦胡舒苏木乡", "乌兰哈拉嘎苏木", "西乌旗白音华能源化工园区", "林业总场"], ["宝昌镇", "千斤沟镇", "红旗镇", "骆驼山镇", "永丰镇", "幸福乡", "贡宝拉格苏木乡", "万寿滩良种场"], ["新宝拉格镇", "巴彦塔拉镇", "翁贡乌拉苏木乡", "宝格达音髙勒苏木"], ["明安图镇", "星耀镇", "伊和淖尔苏木乡", "乌兰查布苏木乡", "宝拉根陶海苏木", "额里图种畜场", "哲日根图林场"], ["上都镇", "桑根达来镇", "哈毕日嘎镇", "宝绍代苏木乡", "那日图苏木乡", "赛音呼都嘎苏木乡", "扎格斯台苏木", "五一种畜场总场", "黑城子示范区"], ["大北沟镇", "多伦诺尔镇", "大河口乡", "蔡木山乡", "西干沟乡", "多伦新型工业化化工区"]], [["温都尔勒图镇", "巴润别立镇", "巴彦浩特镇", "嘉尔嘎勒赛汉镇", "吉兰泰镇", "宗别立镇", "敖伦布拉格镇", "腾格里额里斯镇", "巴彦木仁苏木乡", "乌力吉苏木乡", "巴彦诺日公苏木乡", "额尔克哈什哈苏木乡", "银根苏木", "超格图呼热苏木", "腾格里经济技术开发区", "巴彦浩特额鲁特街道", "巴彦浩特南环路街道", "巴彦浩特新华街道", "巴彦浩特王府街道"], ["巴丹吉林镇", "雅布赖镇", "阿拉腾敖包镇", "曼德拉苏木", "阿拉腾朝格苏木", "巴音高勒苏木", "塔木素布拉格苏木"], ["达来呼布镇", "额济纳旗东风镇", "哈日布日格德音乌拉镇", "额济纳旗赛汉陶来苏木", "额济纳旗马鬃山苏木", "额济纳旗苏泊淖尔苏木", "巴彦陶来苏木", "温图高勒苏木"]]], [[["浑河湾街道", "新华街道", "西塔街道", "八经街道", "马路湾街道", "集贤街道", "南湖街道", "长白街道", "太原街街道", "北市场街道", "南市场街道", "沈水湾街道", "浑河站西街道"], ["大西街道", "滨河街道", "万莲街道", "大南街道", "山东庙街道", "朱剪炉街道", "新北站街道", "风雨坛街道", "皇城街道", "五里河街道", "南塔街道", "泉园街道", "丰乐街道", "马官桥街道", "东陵街道"], ["大北街道", "万泉街道", "洮昌街道", "文官街道", "二台子街道", "津桥街道", "东站街道", "北海街道", "长安街道", "新东街道", "东塔街道", "小东街道", "上园街道", "前进街道"], ["三台子街道", "辽河街道", "黄河街道", "三洞桥街道", "华山街道", "寿泉街道", "塔湾街道", "明廉街道", "新乐街道", "舍利塔街道", "北塔街道", "陵东街道"], ["昆明湖街道", "工人村街道", "七路街道", "启工街道", "笃工街道", "兴华街道", "兴工街道", "霁虹街道", "凌空街道", "重工街道", "艳粉街道", "保工街道", "兴顺街道", "贵和街道", "大青中朝友谊街道", "翟家街道", "西三环街道", "大潘街道", "彭驿站街道", "高花街道", "沈阳市经济技术开发区管理委员会"], ["解放街道", "民主街道", "临湖街道", "中兴街道", "湖西街道", "八一街道", "红菱街道", "林盛街道", "沙河街道", "十里河街道", "陈相街道", "姚千街道", "王纲街道", "永乐街道", "大沟街道", "白清街道", "佟沟街道"], ["英达街道", "东湖街道", "五三街道", "浑河站东街道", "高坎街道", "满堂街道", "深井子街道", "祝家街道", "白塔街道", "桃仙街道", "李相街道", "营城子街道", "汪家街道", "王滨街道", "望滨街道"], ["新城子街道", "清水台街道", "辉山街道", "道义街道", "虎石台街道", "财落街道", "沈北街道", "马刚街道", "石佛寺街道", "黄家街道", "尹家街道", "兴隆台街道", "清泉街道", "青年农场", "前进农场", "育新农场", "沈北新区马刚林场", "沈北新区示范农场", "沈北新区种畜场"], ["迎宾路街道", "陵西街道", "于洪街道", "北陵街道", "沙岭街道", "南阳湖街道", "城东湖街道", "平罗街道", "马三家街道", "造化街道", "大兴街道", "光辉街道", "马三家强制隔离戒毒所", "光辉农场", "监狱城"], ["蒲西街道", "蒲东街道", "于家房镇", "朱家房镇", "冷子堡镇", "刘二堡镇", "茨榆坨镇", "新民屯镇", "满都户镇", "杨士岗镇", "肖寨门镇", "长滩镇", "四方台镇", "城郊镇", "六间房镇", "养士堡镇", "潘家堡镇", "老大房镇", "大黑岗子镇", "牛心坨镇", "四方台农场"], ["北三家子街道", "胜利街道", "东关街道", "小城子镇", "张强镇", "方家屯镇", "郝官屯镇", "二牛所口镇", "北四家子乡", "两家子乡", "海洲窝堡乡", "沙金台蒙古族满族乡", "柳树屯蒙古族满族乡", "西关屯蒙古族满族乡", "东升满族蒙古族乡"], ["法库镇", "大孤家子镇", "三面船镇", "秀水河子镇", "叶茂台镇", "登仕堡子镇", "柏家沟镇", "丁家房镇", "孟家镇", "十间房镇", "冯贝堡镇", "依牛堡子镇", "五台子镇", "包家屯镇", "慈恩寺乡", "和平乡", "四家子蒙古族乡", "双台子乡", "卧牛石乡"], ["东城街道", "辽滨街道", "西城街道", "新柳街道", "新城街道", "大红旗镇", "梁山镇", "公主屯镇", "兴隆镇", "前当堡镇", "大民屯镇", "大柳屯镇", "兴隆堡镇", "胡台镇", "法哈牛镇", "柳河沟镇", "高台子镇", "张家屯镇", "罗家房镇", "三道岗子镇", "东蛇山子镇", "陶家屯镇", "周坨子镇", "金五台子乡", "红旗乡", "卢家屯乡", "姚堡乡", "于家窝堡乡", "新农乡"]], [["海军广场街道", "桂林街道", "人民路街道", "青泥洼桥街道", "昆明街道", "葵英街道", "桃源街道", "老虎滩街道", "东港街道"], ["香炉礁街道", "站北街道", "日新街道", "北京街道", "八一路街道", "人民广场街道", "白云街道"], ["中山公园街道", "白山路街道", "兴工街道", "春柳街道", "马栏街道", "南沙河口街道", "黑石礁街道", "李家街道", "星海湾街道"], ["周水子街道", "椒金山街道", "甘井子街道", "南关岭街道", "泡崖街道", "中华路街道", "兴华街道", "机场街道", "辛寨子街道", "红旗街道", "凌水街道", "大连湾街道", "泉水街道", "革镇堡街道", "营城子街道", "七贤岭街道", "大连华侨果树农场"], ["登峰街道", "市场街道", "得胜街道", "光荣街道", "水师营街道", "龙王塘街道", "铁山街道", "双岛湾街道", "三涧堡街道", "长城街道", "龙头街道", "北海街道", "旅顺经济开发区", "大连奶牛场", "龙头分园"], ["拥政街道", "友谊街道", "光明街道", "马桥子街道", "海青岛街道", "大孤山街道", "中长街道", "站前街道", "先进街道", "董家沟街道", "金石滩街道", "湾里街道", "二十里堡街道", "亮甲店街道", "登沙河街道", "大魏家街道", "杏树街道", "七顶山街道", "华家街道", "向应街道", "大李家街道", "得胜街道", "大窑湾街道", "炮台街道", "复州湾街道", "三十里堡街道", "石河街道"], ["丰荣街道", "铁西街道", "太平街道", "南山街道", "皮口街道", "城子坦街道", "大刘家街道", "杨树房街道", "大谭街道", "唐家房街道", "莲山街道", "双塔镇", "安波镇", "四平镇", "沙包镇", "星台镇", "墨盘乡", "同益乡", "乐甲满族乡"], ["大长山岛镇", "獐子岛镇", "广鹿岛镇", "小长山乡", "海洋乡"], ["新华", "文兰", "岭东", "共济", "铁东", "祝华", "岗店", "太阳街道", "长兴岛", "九龙", "交流岛街道", "复州城镇", "松树镇", "得利寺镇", "万家岭镇", "许屯镇", "永宁镇", "谢屯镇", "老虎屯镇", "红沿河镇", "李官镇", "仙浴湾镇", "元台镇", "瓦窝镇", "赵屯乡", "土城乡", "阎店乡", "西杨乡", "驼山乡", "三台满族乡", "泡崖乡", "杨家满族乡"], ["城关街道", "新华街道", "兴达街道", "昌盛街道", "明阳街道", "青堆镇", "徐岭镇", "黑岛镇", "栗子房镇", "大营镇", "塔岭镇", "仙人洞镇", "蓉花山镇", "长岭镇", "荷花山镇", "城山镇", "光明山镇", "大郑镇", "吴炉镇", "王家镇", "鞍子山乡", "太平岭满族乡", "步云山乡", "桂云花满族乡", "兰店乡", "石城乡"]], [["长甸街道", "解放街道", "山南街道", "园林街道", "胜利街道", "站前街道", "钢城街道", "和平街道", "对炉街道", "东长甸街道", "湖南街道", "常青街道", "新兴街道", "旧堡街道", "大孤山街道", "温泉街道", "玉佛山风景区管理委员会"], ["启明街道", "繁荣街道", "八家子街道", "兴盛街道", "共和街道", "永乐街道", "北陶官街道", "南华街道", "大陆街道", "新陶官街道", "新城街道", "永发街道", "宁远街道", "达道湾街道"], ["友好街道", "双山街道", "立山街道", "曙光街道", "灵山街道", "深南街道", "深北街道", "沙河街道", "滨河街道", "千山街道", "齐大山街道", "汪峪街道", "红岭街道"], ["对桩石街道", "汤岗子街道", "东鞍山街道", "唐家房镇", "大屯镇", "甘泉镇"], ["八角台街道", "台东街道", "台南街道", "台北街道", "西佛镇", "新开河镇", "黄沙坨镇", "高力房镇", "桑林镇", "富家镇", "达牛镇", "台安县韭菜台镇", "新台镇", "桓洞镇", "新华农场", "洪家农牧场", "西平林场"], ["阜昌街道", "大宁街道", "兴隆街道", "雅河街道", "仙人咀街道", "三家子镇", "石庙子镇", "黄花甸镇", "大营子镇", "苏子沟镇", "偏岭镇", "哈达碑镇", "新甸镇", "洋河镇", "杨家堡镇", "清凉山镇", "石灰窑镇", "前营子镇", "龙潭镇", "牧牛镇", "药山镇", "大房身镇", "朝阳镇", "红旗营子乡", "岭沟乡", "哨子河乡"], ["海州街道", "兴海街道", "响堂街道", "东四街道", "验军街道", "温泉街道", "孤山镇", "岔沟镇", "接文镇", "析木镇", "马风镇", "牌楼镇", "八里镇", "毛祁镇", "英落镇", "感王镇", "西柳镇", "中小镇", "王石镇", "南台镇", "腾鳌镇", "耿庄镇", "牛庄镇", "西四镇", "望台镇", "温香镇", "高坨镇"]], [["站前街道", "东公园街道", "福民街道", "新抚街道", "榆林街道", "永安台街道", "千金街道", "南阳街道", "南花园街道", "刘山街道", "千金乡"], ["东洲街道", "张甸街道", "搭连街道", "龙凤街道", "新屯街道", "万新街道", "老虎台街道", "平山街道", "章党街道", "抚东街道", "章党镇", "哈达镇", "碾盘乡", "兰山乡"], ["田屯街道", "工农街道", "建设街道", "和平街道", "光明街道", "朴屯街道", "演武街道", "五老屯街道", "古城子街道", "新民街道", "李石街道", "塔峪镇", "拉古满族乡"], ["河东街道", "长春街道", "葛布街道", "将军堡街道", "新华街道", "抚顺城街道", "前甸镇", "河北乡", "会元乡"], ["石文镇", "后安镇", "上马镇", "救兵镇", "马圈子乡", "峡河乡", "海浪乡", "汤图满族乡"], ["新宾镇", "旺清门镇", "永陵镇", "平顶山镇", "大四平镇", "苇子峪镇", "木奇镇", "上夹河镇", "南杂木镇", "红升乡", "响水河子乡", "红庙子乡", "北四平乡", "榆树乡", "下夹河乡"], ["清原镇", "红透山镇", "草市镇", "英额门镇", "南口前镇", "南山城镇", "湾甸子镇", "大孤家镇", "夏家堡镇", "土口子乡", "北三家乡", "敖家堡乡", "大苏河乡", "枸乃甸乡"]], [["南地街道", "工人街道", "平山街道", "东明街道", "崔东街道", "站前街道", "千金街道", "北台街道", "桥头街道"], ["河东街道", "河西街道", "彩屯街道", "竖井街道", "彩北街道", "东风街道", "石桥子街道", "日月岛街道", "张其寨街道", "火连寨街道"], ["金山街道", "北地街道", "高峪街道", "明山街道", "东兴街道", "新明街道", "牛心台街道", "卧龙街道", "高台子街道"], ["南芬街道", "铁山街道", "郭家街道", "思山岭街道", "下马塘街道"], ["观音阁街道", "小市镇", "草河掌镇", "草河城镇", "草河口镇", "连山关镇", "清河城镇", "田师傅镇", "南甸镇", "碱厂镇", "高官镇", "东营房乡"]], [["六道口街道", "七道街道", "八道街道", "九道街道", "广济街道", "兴东街道", "金山镇"], ["头道桥街道", "站前街道", "临江街道", "六道沟街道", "帽盔山街道", "纤维街道", "永昌街道", "花园街道", "江海街道", "西城街道", "浪头镇", "安民镇", "汤池镇"], ["鸭绿江街道", "金矿街道", "珍珠街道", "太平湾街道", "同兴镇", "五龙背镇", "楼房镇", "九连城镇", "汤山城镇"], ["宽甸镇", "灌水镇", "硼海镇", "红石镇", "毛甸子镇", "长甸镇", "永甸镇", "太平哨镇", "青山沟镇", "牛毛坞镇", "大川头镇", "青椅山镇", "杨木川镇", "虎山镇", "振江镇", "步达远镇", "大西岔镇", "八河川镇", "双山子镇", "石湖沟乡", "古楼子乡", "下露河朝鲜族乡"], ["大东街道", "新兴街道", "新城街道", "孤山镇", "前阳镇", "长安镇", "十字街镇", "长山镇", "北井子镇", "椅圈镇", "黄土坎镇", "马家店镇", "龙王庙镇", "小甸子镇", "菩萨庙镇", "黑沟镇", "新农镇", "合隆满族乡", "示范农场", "黄土坎农场", "海洋红农场", "兴隆农场", "五四农场"], ["凤凰城街道", "凤山街道", "草河街道", "宝山镇", "白旗镇", "沙里寨镇", "红旗镇", "蓝旗镇", "边门镇", "东汤镇", "石城镇", "大兴镇", "爱阳镇", "赛马镇", "弟兄山镇", "鸡冠山镇", "刘家河镇", "通远堡镇", "四门子镇", "青城子镇", "大堡蒙古族乡"]], [["天安街道", "石油街道", "北街街道", "敬业街道", "保安街道", "南街街道", "饶阳街道", "站前街道", "士英街道", "钟屯街道"], ["正大街道", "石桥子街道", "龙江街道", "榴花街道", "铁新街道", "凌安街道", "菊园街道", "康宁街道", "锦铁街道", "马家街道", "紫荆街道", "锦州北山农工商总公司"], ["太和街道", "兴隆街道", "汤河子街道", "凌西街道", "大薛街道", "女儿河街道", "营盘街道", "新民街道", "王家街道", "天桥街道", "杏山街道", "娘娘宫街道", "凌南街道", "松山街道", "锦州市果树农场"], ["黑山街道", "大虎山街道", "芳山镇", "白厂门镇", "常兴镇", "姜屯镇", "励家镇", "绕阳河镇", "半拉门镇", "无梁殿镇", "胡家镇", "新立屯镇", "八道壕镇", "四家子镇", "新兴镇", "太和镇", "镇安镇", "英城子乡", "段家乡", "大兴乡", "薛屯乡", "辽宁省锦州市小东种畜场"], ["义州街道", "城关街道", "刘龙台镇", "七里河镇", "大榆树堡镇", "稍户营子镇", "九道岭镇", "高台子镇", "瓦子峪镇", "头台镇", "前杨镇", "张家堡镇", "头道河镇", "留龙沟镇", "聚粮屯镇", "地藏寺满族乡", "大定堡满族乡", "白庙子乡"], ["大凌河街道", "金城街道", "八千街道", "大有街道", "石山镇", "余积镇", "双羊镇", "班吉塔镇", "沈家台镇", "三台子镇", "右卫满族镇", "阎家镇", "新庄子镇", "翠岩镇", "安屯镇", "大业镇", "建业镇", "温滴楼满族镇", "白台子镇", "板石沟乡", "谢屯乡", "辽宁省金城原种场"], ["北镇街道", "观音阁街道", "富屯街道", "广宁街道", "沟帮子街道", "沙子河街道", "大市镇", "罗罗堡镇", "常兴店镇", "正安镇", "闾阳镇", "中安镇", "廖屯镇", "赵屯镇", "青堆子镇", "高山子镇", "吴家镇", "鲍家乡", "大屯乡", "柳家乡", "辽宁省北镇市高山子监狱", "新立农场"]], [["八田地街道", "建丰街道", "建设街道", "跃进街道", "东风街道", "新兴街道", "新建街道", "营口高新区站前区工业园"], ["胜利街道", "清华街道", "滨海街道", "得胜街道", "五台子街道", "渔市街道", "河北街道", "沿海街道", "营口高新技术产业开发区", "辽宁（营口）沿海产业基地"], ["红海街道", "海星街道", "望海街道", "海东街道", "熊岳镇", "芦屯镇", "红旗满族镇"], ["老边街道", "城东街道", "路南镇", "柳树镇", "边城镇", "营口市中小企业创业园区"], ["鼓楼街道", "西城街道", "东城街道", "太阳升街道", "团山街道", "西海街道", "九垄地街道", "归州街道", "高屯镇", "沙岗镇", "九寨镇", "万福镇", "卧龙泉镇", "青石岭镇", "暖泉镇", "榜式堡镇", "团甸镇", "双台镇", "杨运镇", "徐屯镇", "什字街镇", "矿洞沟镇", "陈屯镇", "梁屯镇", "小石棚乡", "果园乡", "二台乡"], ["石桥街道", "青花街道", "金桥街道", "钢都街道", "南楼街道", "水源镇", "沟沿镇", "石佛镇", "高坎镇", "旗口镇", "虎庄镇", "官屯镇", "博洛铺镇", "永安镇", "汤池镇", "建一镇", "黄土岭镇", "周家镇", "大石桥市水稻良种场", "大石桥市示范场"]], [["新兴街道", "和平街道", "西山街道", "河北街道", "站前街道", "西阜新街道", "五龙街道", "平安西部街道", "工人村街道", "东梁街道", "韩家店镇"], ["兴隆街道", "中兴街道", "益民街道", "新发街道", "长营子蒙古族镇"], ["红树街道", "煤海街道", "高德街道", "孙家湾街道", "城南街道", "水泉镇"], ["清河街道", "六台街道", "艾友街道", "新北街道", "河西镇", "乌龙坝镇"], ["西苑街道", "北苑街道", "东苑街道", "学苑街道", "中苑街道", "华东街道", "四合镇", "六家子管委会"], ["城区街道", "阜新镇", "东梁镇", "佛寺镇", "伊吗图镇", "旧庙镇", "务欢池镇", "建设镇", "大巴镇", "泡子镇", "十家子镇", "王府镇", "于寺镇", "富荣镇", "新民镇", "福兴地镇", "平安地镇", "沙拉镇", "大固本镇", "大五家子镇", "大板镇", "招束沟镇", "八家子镇", "蜘蛛山镇", "塔营子镇", "扎兰营子镇", "七家子镇", "红帽子镇", "紫都台镇", "化石戈镇", "哈达户稍镇", "老河土镇", "太平镇", "卧凤沟乡", "苍土乡", "国华乡", "泡子农场"], ["彰武镇", "哈尔套镇", "章古台镇", "五峰镇", "冯家镇", "后新秋镇", "东六家子镇", "阿尔乡镇", "前福兴地镇", "双庙镇", "大四家子镇", "苇子沟镇", "兴隆山镇", "满堂红镇", "四合城镇", "大冷蒙古族镇", "两家子镇", "平安镇", "二道河子蒙古族乡", "西六家子蒙古族满族乡", "四堡子乡", "丰田乡", "大德乡", "兴隆堡乡"]], [["星火街道", "胜利街道", "跃进街道", "卫国路街道", "站前街道", "武圣街道", "襄平街道", "文圣街道", "南门街道", "东兴街道", "新华街道"], ["庆阳街道", "东京陵街道", "新城街道", "小屯镇", "罗大台镇"], ["工农街道", "光华街道", "新村街道", "长征街道", "曙光镇", "兰家镇"], ["苏家街道", "团山街道", "安平街道", "汤河镇", "安平乡"], ["望水台街道", "铁西街道", "祁家镇", "沙岭镇", "王家镇", "东宁卫乡"], ["首山镇", "刘二堡镇", "小北河镇", "黄泥洼镇", "唐马寨镇", "穆家镇", "柳壕镇", "河栏镇", "隆昌镇", "八会镇", "寒岭镇", "兴隆镇", "下达河乡", "吉洞峪满族乡", "甜水满族乡"], ["烟台街道", "万宝桥街道", "古城子街道", "佟二堡镇", "铧子镇", "张台子镇", "西大窑镇", "沈旦堡镇", "西马峰镇", "柳条寨镇", "柳河子镇", "大河南镇", "五星镇", "鸡冠山乡"]], [["胜利街道", "建设街道", "红旗街道", "辽河街道", "铁东街道", "双盛街道", "统一镇", "陆家镇"], ["振兴街道", "兴隆街道", "渤海街道", "新工街道", "于楼街道", "友谊街道", "曙光街道", "欢喜街道", "平安街道", "新生街道", "高升街道", "沈采街道", "锦采街道", "茨采街道", "创新街道", "兴盛街道", "兴海街道", "惠宾街道"], ["荣滨街道", "二界沟街道", "荣兴街道", "大洼街道", "田家街道", "榆树街道", "向海街道", "前进街道", "田庄台镇", "东风镇", "新开镇", "清水镇", "新兴镇", "西安镇", "新立镇", "唐家镇", "平安镇", "赵圈河镇"], ["沙岭镇", "高升镇", "胡家镇", "石新镇", "东郭镇", "羊圈子镇", "古城子镇", "坝墙子镇", "太平镇", "陈家镇", "甜水镇", "吴家镇", "得胜镇", "盘山县林场"]], [["红旗街道", "工人街道", "铁西街道", "铜钟街道", "柴河街道", "岭东街道", "辽海街道", "龙山乡", "铁岭经济开发区"], ["红旗街道", "向阳街道", "张相镇", "杨木林子镇", "聂家满族乡"], ["新台子镇", "阿吉镇", "平顶堡镇", "大甸子镇", "凡河镇", "腰堡镇", "镇西堡镇", "蔡牛镇", "李千户镇", "熊官屯镇", "横道河子镇", "双井子镇", "鸡冠山乡", "白旗寨满族乡", "种畜场"], ["西丰镇", "平岗镇", "郜家店镇", "凉泉镇", "振兴镇", "安民镇", "天德镇", "房木镇", "柏榆镇", "陶然镇", "钓鱼镇", "更刻镇", "德兴满族乡", "明德满族乡", "成平满族乡", "和隆满族乡", "营厂满族乡", "金星满族乡"], ["昌图镇", "老城镇", "八面城镇", "三江口镇", "金家镇", "宝力镇", "泉头镇", "双庙子镇", "亮中桥镇", "马仲河镇", "毛家店镇", "老四平镇", "大洼镇", "头道镇", "鴜鷺树镇", "傅家镇", "四合镇", "朝阳镇", "古榆树镇", "七家子镇", "东嘎镇", "四面城镇", "前双井镇", "通江口镇", "大四家子镇", "曲家店镇", "十八家子镇", "太平镇", "下二台镇", "平安堡镇", "大兴镇", "后窑镇", "长发镇", "三江口农场", "宝力农场", "新乡农场", "付家林场", "牤牛马场", "两家子农场"], ["兀术街街道", "调兵山街道", "晓明镇", "大明镇", "晓南镇"], ["新城街道", "老城街道", "兴开街道", "威远堡镇", "庆云堡镇", "中固镇", "八棵树镇", "金沟子镇", "八宝镇", "业民镇", "莲花镇", "靠山镇", "马家寨镇", "下肥镇", "松山镇", "城东镇", "李家台镇", "上肥地满族镇", "黄旗寨满族镇", "林丰满族乡", "三家子乡"]], [["南塔街道", "北塔街道", "前进街道", "凌河街道", "光明街道", "凌凤街道", "龙山街道", "站南街道", "红旗街道", "燕北街道", "燕都街道", "桃花吐镇", "他拉皋镇", "孙家湾镇", "长宝营子乡"], ["向阳街道", "燕山街道", "马山街道", "新华街道", "海龙街道", "开发区龙泉街道", "七道泉子镇", "西大营子镇", "召都巴镇", "大平房镇", "联合镇", "边杖子镇"], null, ["叶柏寿街道", "红山街道", "铁南街道", "万寿街道", "富山街道", "新城街道", "东城街道", "朱碌科镇", "建平镇", "黑水镇", "喀喇沁镇", "北二十家子镇", "沙海镇", "哈拉道口镇", "榆树林子镇", "老官地镇", "深井镇", "奎德素镇", "小塘镇", "马场镇", "昌隆镇", "张家营子镇", "青峰山镇", "太平庄镇", "青松岭乡", "杨树岭乡", "罗福沟乡", "烧锅营子乡", "白山乡", "三家蒙古族乡", "义成功乡", "八家国营农场", "热水国营畜牧农场"], ["大城子街道", "利州街道", "南哨街道", "南公营子镇", "山嘴子镇", "公营子镇", "白塔子镇", "中三家镇", "老爷庙镇", "六官营子镇", "平房子镇", "十二德堡镇", "羊角沟镇", "兴隆庄镇", "甘招镇", "东哨镇", "水泉镇", "尤杖子乡", "草场乡", "坤都营子乡", "大营子乡", "卧虎沟乡", "国营官大海农场", "冶金铸造工业园区"], ["城关街道", "南山街道", "冠山街道", "桥北街道", "三宝街道", "台吉街道", "双河街道", "西官营镇", "大板镇", "上园镇", "宝国老镇", "黑城子镇", "五间房镇", "台吉镇", "东官营镇", "龙潭镇", "北塔镇", "蒙古营镇", "大三家镇", "长皋乡", "常河营乡", "小塔子乡", "马友营蒙古族乡", "泉巨永乡", "哈尔脑乡", "南八家子乡", "章吉营乡", "三宝营乡", "巴图营乡", "台吉营乡", "娄家店乡", "北四家乡", "凉水河蒙古族乡", "三宝乡", "兴顺德国营农场", "下府经济开发区", "大黑山特别行政管理区"], ["东城街道", "北街街道", "南街街道", "凌北街道", "热水汤街道", "兴源街道", "红山街道", "城关街道", "万元店镇", "宋杖子镇", "三十家子镇", "杨杖子镇", "刀尔登镇", "松岭子镇", "四官营子镇", "沟门子镇", "小城子镇", "四合当镇", "乌兰白镇", "瓦房店镇", "大河北镇", "牛营子镇", "三道河子镇", "大王杖子乡", "刘杖子乡", "前进乡", "北炉乡", "三家子蒙古族乡", "佛爷洞乡", "河坎子乡"]], [["连山街道", "站前街道", "渤海街道", "兴工街道", "石油街道", "化工街道", "化机街道", "水泥街道", "锦郊街道", "钢屯镇", "寺儿堡镇", "新台门蒙古族镇", "沙河营乡", "孤竹营子乡", "白马石乡", "山神庙子乡", "塔山乡", "杨郊乡", "杨家杖子经济开发区"], ["葫芦岛街道", "东街道", "西街道", "望海寺街道", "龙湾街道", "滨海街道", "双龙街道", "玉皇街道", "连湾街道", "北港街道", "双树乡", "葫芦岛经济开发区", "葫芦岛市专利技术园区"], ["赵家屯街道", "沙锅屯街道", "邱皮沟街道", "苇子沟街道", "三家子街道", "小凌河街道", "九龙街道", "龙飞街道", "龙腾街道", "龙翔街道", "缸窑岭镇", "暖池塘镇", "高桥镇", "虹螺岘镇", "金星镇", "台集屯镇", "沙锅屯乡", "黄土坎乡", "大兴乡", "张相公屯乡", "乌金塘水库"], ["绥中镇", "西甸子镇", "宽帮满族镇", "大王庙满族镇", "万家镇", "前所镇", "高岭镇", "前卫镇", "荒地满族镇", "塔山屯镇", "高台镇", "王宝镇", "沙河镇", "小庄子镇", "西平坡满族乡", "葛家满族乡", "高甸子满族乡", "范家满族乡", "明水满族乡", "秋子沟乡", "加碑岩乡", "永安堡乡", "李家堡乡", "网户满族乡", "城郊乡", "大台山果树农场", "前所果树农场"], ["建昌镇", "八家子镇", "喇嘛洞镇", "药王庙镇", "汤神庙镇", "玲珑塔镇", "大屯镇", "牤牛营子乡", "素珠营子乡", "石佛乡", "王宝营子乡", "老大杖子乡", "要路沟乡", "魏家岭乡", "西碱厂乡", "头道营子乡", "新开岭乡", "贺杖子乡", "养马甸子乡", "和尚房子乡", "杨树湾子乡", "黑山科乡", "雷家店乡", "小德营子乡", "二道湾子蒙古族乡", "巴什罕乡", "娘娘庙乡", "谷杖子乡"], ["古城街道", "宁远街道", "城东街道", "温泉街道", "钓鱼台街道", "华山街道", "四家屯街道", "菊花街道", "临海街道", "曹庄镇", "沙后所满族镇", "东辛庄满族镇", "郭家满族镇", "红崖子镇", "徐大堡镇", "高家岭满族镇", "羊安满族乡", "元台子满族乡", "白塔满族乡", "望海满族乡", "刘台子满族乡", "大寨满族乡", "南大山满族乡", "围屏满族乡", "碱厂满族乡", "三道沟满族乡", "旧门满族乡", "药王满族乡"]]], [[["南岭街道", "自强街道", "民康街道", "新春街道", "长通街道", "全安街道", "曙光街道", "永吉街道", "桃源街道", "鸿城街道", "明珠街道", "富裕街道", "幸福乡"], ["新发街道", "站前街道", "南广街道", "东广街道", "群英街道", "兴业街道", "凯旋街道", "团山街道", "柳影街道", "欣园街道", "兰家镇", "米沙子镇", "万宝镇", "合隆镇"], ["前进街道", "桂林街道", "南湖街道", "永昌街道", "重庆街道", "清和街道", "红旗街道", "湖西街道", "富锋街道", "乐山镇", "永春镇"], ["东盛街道", "吉林街道", "荣光街道", "东站街道", "远达街道", "八里堡街道", "长青街道", "英俊镇", "劝农山镇（长春莲花山生态旅游度假区省级）", "泉眼镇", "四家乡（长春莲花山生态旅游度假区省级）"], ["正阳街道", "春城街道", "青年街道", "林园街道", "同心街道", "合心镇", "西新镇", "城西镇", "绿园经济开发区"], ["云山街道", "平湖街道", "奢岭街道", "山河街道", "齐家镇", "太平镇", "鹿乡镇", "双营子回族乡（梅花鹿产业经济开发区）（省级）"], ["九台街道", "营城街道", "九郊街道", "西营城街道", "土们岭街道", "苇子沟街道", "兴隆街道", "纪家街道", "波泥河街道", "卡伦湖街道", "东湖街道", "龙嘉街道", "沐石河镇", "城子街镇", "其塔木镇", "上河湾镇", "胡家回族乡", "莽卡满族乡"], ["农安镇", "伏龙泉镇", "哈拉海镇", "靠山镇", "开安镇", "烧锅镇", "高家店镇", "华家镇", "三盛玉镇", "巴吉垒镇", "三岗镇", "前岗乡", "龙王乡", "万顺乡", "杨树林乡", "永安乡", "青山口乡", "黄鱼圈乡", "新农乡", "万金塔乡", "小城子乡", "洼中高农场"], ["华昌街道", "正阳街道", "培英街道", "城郊街道", "五棵树镇", "弓棚镇", "闵家镇", "大坡镇", "黑林镇", "土桥镇", "新立镇", "大岭镇", "于家镇", "泗河镇", "八号镇", "刘家镇", "秀水镇", "保寿镇", "新庄镇", "育民乡", "红星乡", "太安乡", "先峰乡", "青山乡", "延和朝鲜族乡", "恩育乡", "城发乡", "环城乡"], ["胜利街道", "建设街道", "惠发街道", "夏家店街道", "大青嘴镇", "郭家镇", "松花江镇", "达家沟镇", "大房身镇", "岔路口镇", "朱城子镇", "布海镇", "天台镇", "菜园子镇", "同太乡", "边岗乡", "五台乡", "朝阳乡"]], [["兴华街道", "文庙街道", "东局子街道", "新地号街道", "延安街道", "站前街道", "民主街道", "莲花街道", "通江街道", "哈达湾街道", "新建街道", "延江街道", "吉林东市商贸示范区（特殊街道）", "孤店子镇", "桦皮厂镇", "左家镇", "两家子满族乡", "土城子满族朝鲜族乡", "幸福经济管理区", "吉林哈达湾经济开发区"], ["龙华街道", "湘潭街道", "铁东街道", "泡子沿街道", "龙潭街道", "新吉林街道", "山前街道", "新安街道", "遵义街道", "榆树街道", "东城街道", "承德街道", "靠山街道", "乌拉街镇", "缸窑镇", "江密峰镇", "大口钦镇", "金珠镇", "江北乡", "龙潭经济开发区", "金珠工业区"], ["德胜街道", "南京街道", "大东街道", "青岛街道", "向阳街道", "北极街道", "致和街道", "长春路街道", "临江街道", "北山街道", "黄旗街道", "大绥河镇", "搜登站镇", "越北镇", "欢喜乡", "吉林船营经济开发区"], ["泰山街道", "江南街道", "石井街道", "沿丰街道", "丰满街道", "红旗街道", "旺起镇", "江南乡", "前二道乡", "小白山乡"], ["口前镇", "双河镇", "西阳镇", "北大湖镇", "一拉溪镇", "万昌镇", "永吉经济开发区（特殊乡镇）", "金家乡", "黄榆乡"], ["民主街道", "长安街道", "河南街道", "奶子山街道", "拉法街道", "河北街道", "新农街道", "新站镇", "天岗镇", "白石山镇", "漂河镇", "黄松甸镇", "天北镇", "松江镇", "庆岭镇", "乌林朝鲜族乡", "前进乡"], ["明桦街道", "永吉街道", "胜利街道", "新华街道", "启新街道", "夹皮沟镇", "二道甸子镇", "红石砬子镇", "八道河子镇", "常山镇", "金沙镇", "桦郊乡", "横道河子乡", "公吉乡"], ["北城街道", "南城街道", "环城街道", "吉舒街道", "滨河街道", "法特镇", "白旗镇", "溪河镇", "朝阳镇", "小城镇", "上营镇", "水曲柳镇", "平安镇", "金马镇", "开原镇", "莲花乡", "亮甲山乡", "新安乡", "七里乡", "天德乡"], ["福安街道", "东宁街道", "河南街道", "磐石经济开发区（省级）（特殊街道）", "烟筒山镇", "红旗岭镇", "明城镇", "石嘴镇", "驿马镇", "牛心镇", "呼兰镇", "吉昌镇", "松山镇", "黑石镇", "朝阳山镇", "富太镇", "取柴河镇", "宝山乡"]], [["仁兴街道", "英雄街道", "站前街道", "北沟街道", "地直街道", "平西乡", "红嘴高新技术开发区"], ["平东街道", "北市场街道", "七马路街道", "四马路街道", "解放街道", "北门街道", "黄土坑街道", "平南街道", "山门镇", "石岭镇", "叶赫满族镇", "四平经济开发区（省级）（特殊乡镇）", "城东乡"], ["梨树镇", "郭家店镇", "榆树台镇", "孤家子镇（四平辽河农垦管理区）", "小城子镇", "喇嘛甸镇", "蔡家镇", "刘家馆子镇", "十家堡镇", "孟家岭镇", "万发镇", "东河镇", "沈洋镇", "林海镇", "小宽镇", "白山乡", "泉眼岭乡", "胜利乡", "四棵树乡", "双河乡", "金山乡", "国营梨树农场（四平辽河农垦管理区）", "良种场生产区"], ["伊通镇", "二道镇", "伊丹镇", "马鞍镇", "景台镇", "靠山镇", "大孤山镇", "小孤山镇", "营城子镇", "西苇镇", "河源镇", "黄岭子镇", "新兴乡", "莫里青乡", "三道乡"], ["河南街道", "河北街道", "东三街道", "岭东街道", "铁北街道", "岭西街道", "刘房子街道", "南崴子街道", "环岭街道", "苇子沟街道", "二十家子镇", "黑林子镇", "陶家屯镇", "范家屯镇", "响水镇", "大岭镇", "怀德镇", "双城堡镇", "双龙镇", "杨大城子镇", "毛城子镇", "玻璃城子镇", "朝阳坡镇", "大榆树镇", "秦家屯镇", "八屋镇", "十屋镇", "桑树台镇", "龙山乡", "永发乡", "省原种繁殖场", "四平农科院", "公主岭市种猪场", "十屋农场", "十屋种牛场", "创业农场", "公主岭市鹿场", "范家屯经济开发区"], ["郑家屯街道", "辽西街道", "辽南街道", "辽北街道", "辽东街道", "红旗街道", "茂林镇", "双山镇", "卧虎镇", "服先镇", "王奔镇", "玻璃山镇", "兴隆镇", "东明镇", "那木乡", "柳条乡", "新立乡", "永加乡", "双辽农场（四平辽河农垦管理区）", "双辽种羊场（四平辽河农垦管理区）", "双辽经济开发区"]], [["辽源民营经济开发区（特殊街道）", "寿山镇", "县级直管村级单位（特殊镇）", "工农乡"], ["灯塔镇", "县级直管村级单位（特殊镇）"], ["东丰镇", "大阳镇", "横道河镇", "那丹伯镇", "猴石镇", "杨木林镇", "小四平镇", "黄河镇", "拉拉河镇", "沙河镇", "南屯基镇", "大兴镇", "三合满族朝鲜族乡", "二龙山乡"], ["白泉镇", "渭津镇", "安石镇", "辽河源镇", "泉太镇", "建安镇", "安恕镇", "平岗镇", "云顶镇", "凌云乡", "甲山乡", "足民乡", "金洲乡"]], [["东昌街道", "民主街道", "老站街道", "团结街道", "新站街道", "光明街道", "龙泉街道", "金厂镇", "通化经济开发区（特殊乡镇）", "环通乡", "江东乡"], ["桃园街道", "东通化街道", "鸭园镇", "铁厂镇", "五道江镇", "二道江乡"], ["快大茂镇", "二密镇", "果松镇", "石湖镇", "大安镇", "光华镇", "兴林镇", "英额布镇", "三棵榆树镇", "西江镇", "通化聚鑫经济开发区管理委员会（特殊乡镇）", "富江乡", "四棚乡", "东来乡", "大泉源满族朝鲜族乡", "金斗朝鲜族满族乡", "东宝新村"], ["朝阳镇", "辉南镇", "样子哨镇", "杉松岗镇", "石道河镇", "辉发城镇", "抚民镇", "金川镇", "团林镇", "庆阳镇", "楼街朝鲜族乡", "辉南县经济技术开发区"], ["柳河镇", "三源浦朝鲜族镇", "五道沟镇", "驼腰岭镇", "孤山子镇", "圣水河子镇", "罗通山镇", "安口镇", "向阳镇", "红石镇", "凉水河子镇", "亨通镇", "柳南乡", "时家店乡", "姜家店朝鲜族乡"], ["新华街道", "光明街道", "和平街道办事处（梅河口市经济贸易开发区）（", "解放街道办事处（梅河口市经济贸易开发区）（", "福民街道办事处（梅河口市经济贸易开发区）（", "山城镇", "红梅镇", "海龙镇", "新合镇", "曙光镇", "中和镇", "黑山头镇", "水道镇", "进化镇", "一座营镇", "康大营镇", "牛心顶镇", "杏岭镇", "湾龙镇", "兴华镇", "双兴镇", "李炉乡", "小杨满族朝鲜族乡", "吉乐乡"], ["团结街道", "黎明街道", "通胜街道", "青石镇", "榆林镇", "花甸镇", "头道镇", "清河镇", "台上镇", "财源镇", "大路镇", "太王镇", "麻线乡", "凉水朝鲜族乡"]], [["新建街道", "通沟街道", "东兴街道", "红旗街道", "城南街道", "江北街道", "河口街道", "板石街道", "七道江镇", "六道江镇", "红土崖镇", "三道沟镇"], ["孙家堡子街道", "江源街道", "正岔街道", "城墙街道", "湾沟镇", "松树镇", "砟子镇", "石人镇", "大阳岔镇", "大石人镇"], ["抚松镇", "松江河镇", "泉阳镇", "露水河镇", "仙人桥镇", "万良镇", "新屯子镇", "东岗镇", "漫江镇", "北岗镇", "兴参镇", "长白山保护开发区管委会池西区（特殊乡镇）", "长白山保护开发区管委会池南区（特殊乡镇）", "兴隆乡", "抽水乡", "沿江乡", "抚松工业集中区"], ["靖宇镇", "三道湖镇", "龙泉镇", "那尔轰镇", "花园口镇", "景山镇", "赤松镇", "蒙江乡"], ["长白镇", "八道沟镇", "十四道沟镇", "马鹿沟镇", "宝泉山镇", "新房子镇", "十二道沟镇", "金华乡"], ["建国街道", "新市街道", "兴隆街道", "大湖街道", "森工街道", "大栗子街道", "桦树镇", "六道沟镇", "苇沙河镇", "花山镇", "闹枝镇", "四道沟镇", "蚂蚁河乡", "临江经济开发区", "临江硅藻土工业集中区"]], [["团结街道", "文化街道", "民主街道", "临江街道", "新区街道", "前进街道", "和平街道", "工农街道", "沿江街道", "铁西街道", "繁荣街道", "建设街道", "石化街道", "伯都讷街道", "长宁街道", "滨江街道", "镜湖街道", "大洼镇", "善友镇", "毛都站镇", "哈达山镇", "新城乡", "伯都乡", "华侨农场", "大洼商业渔场", "国营善友林场", "国营八家子苗圃", "良种繁育场", "哈达山林场", "雅达虹工业集中区"], ["前郭尔罗斯镇", "长山镇", "海渤日戈镇", "乌兰图嘎镇", "查干花镇", "王府站镇", "八郎镇", "哈拉毛都镇", "查干湖镇", "宝甸乡", "平凤乡", "达里巴乡", "吉拉吐乡", "白依拉嘎乡", "洪泉乡", "额如乡", "套浩太乡", "长龙乡", "乌兰塔拉乡", "东三家子乡", "浩特芒哈乡", "乌兰敖都乡", "吉林前郭经济开发区（特殊乡镇）", "红旗农场", "红光农场", "红星牧场", "查干花种畜场", "莲花泡农场", "乌兰嘎图林场", "查干花林场", "王府林场", "八郎农场", "查干湖渔场", "韩家店林场", "长山余热鱼苗繁殖场", "库里渔场", "哈拉毛都良种场", "哈拉毛都林场", "新庙泡渔场"], ["长岭镇", "太平川镇", "巨宝镇", "太平山镇", "前七号镇", "新安镇", "三青山镇", "大兴镇", "北正镇", "流水镇", "永久镇", "利发盛镇", "太平川（镇）农业园区（特殊乡镇）", "双龙工业园区（特殊乡镇）", "长岭经济开发区（特殊乡镇）", "集体乡", "光明乡", "三县堡乡", "海青乡", "前进乡", "东岭乡", "腰坨子乡", "八十八乡", "三团乡", "三十号乡", "长岭种马场", "太平川机械林场", "三团机械林场", "东岭机械林场", "十四号种畜场", "良种繁育场", "前七号机械林场"], ["乾安镇", "大布苏镇", "水字镇", "让字镇", "所字镇", "安字镇", "余字乡", "道字乡", "严字乡", "赞字乡", "国营林场", "腾字种畜场", "大遐畜牧场", "乾安鹿场", "来字良种繁育基地", "地字种畜场"], ["和兴街道", "育才街道", "联盟街道", "士英街道", "铁西街道", "三岔河镇", "长春岭镇", "五家站镇", "陶赖昭镇", "蔡家沟镇", "弓棚子镇", "三井子镇", "增盛镇", "新万发镇", "大林子镇", "新源镇", "得胜镇", "三骏满族蒙古族锡伯族乡", "永平乡", "新站乡", "更新乡", "肖家乡", "伊家店农场", "拉林灌区管理局", "下岱吉灌区管理局"]], [["海明街道", "长庆街道", "瑞光街道", "明仁街道", "铁东街道", "城南街道办事处（工业", "新立街道", "新华街道", "平安镇", "青山镇", "林海镇", "洮河镇", "平台镇", "到保镇", "岭下镇（查干浩特旅游经济开发区）（省级）", "东风乡", "三合乡", "东胜乡", "金祥乡", "德顺蒙古族乡", "镇南种羊场", "白城牧场", "洮儿河农场", "保民农场", "到保林场"], ["镇赉镇", "坦途镇", "东屏镇", "大屯镇", "沿江镇", "五棵树镇", "黑鱼泡镇", "哈吐气蒙古族乡", "莫莫格蒙古族乡", "建平乡", "嘎什根乡", "四方坨子农场", "白音套海牧场", "良种繁育场", "九龙山马场", "莫莫格林场", "大岗林场", "国营渔场", "到保农场"], ["开通镇", "瞻榆镇", "双岗镇", "兴隆山镇", "边昭镇", "鸿兴镇", "新华镇", "乌兰花镇", "新发乡", "新兴乡", "向海蒙古族乡", "包拉温都蒙古族乡", "团结乡", "十花道乡", "八面乡", "苏公坨乡", "通榆经济开发区", "三家子种牛场", "良井子畜牧场", "双岗鹿场", "同发牧场", "新华牛场"], ["团结街道", "富文街道", "光明街道", "兴隆街道", "永康街道", "通达街道", "洮府街道", "向阳街道", "瓦房镇", "万宝镇", "黑水镇", "那金镇", "安定镇", "福顺镇", "胡力吐蒙古族乡", "万宝乡", "聚宝乡", "东升乡", "野马乡", "永茂乡", "蛟流河乡", "大通乡", "二龙乡", "呼和车力蒙古族乡", "东方红畜牧场", "永茂林场", "市原种场"], ["慧阳街道", "临江街道", "长虹街道", "锦华街道", "安北街道", "月亮泡镇", "安广镇", "丰收镇", "新平安镇", "两家子镇", "舍力镇", "大岗子镇", "叉干镇", "龙沼镇", "太山镇", "四棵树乡", "联合乡", "大赉乡", "红岗子乡", "海坨乡", "新艾里蒙古族乡", "烧锅镇乡", "乐胜乡", "大安经济开发区（省级）", "新荒渔场", "东方红农场", "舍力林场", "五间房水库", "大岗子林场", "风水山牧场", "东风马场", "良种繁育场", "大安马场", "安广猪场", "红旗饲养场"]], [["进学街道", "北山街道", "新兴街道", "公园街道", "河南街道", "建工街道", "小营镇", "依兰镇", "三道湾镇", "朝阳川镇", "延吉市林业局", "东山农场", "延边原种场", "延边新兴工业集中区"], ["向上街道", "新华街道", "月宫街道", "月晴镇", "石岘镇", "长安镇", "凉水镇"], ["渤海街道", "胜利街道", "民主街道", "丹江街道", "大石头镇", "黄泥河镇", "官地镇", "沙河沿镇", "秋梨沟镇", "额穆镇", "贤儒镇", "大蒲柴河镇", "雁鸣湖镇", "江源镇", "江南镇", "大桥乡", "黑石乡", "青沟子乡", "翰章乡", "红石乡", "长白山森工集团敦化林业有限公司", "长白山森工集团黄泥河林业有限公司", "长白山森工集团大石头林业有限公司", "敦化市林业局", "敖东鹿场"], ["靖和街道", "新安街道", "河南街道", "近海街道", "春化镇", "敬信镇", "板石镇", "英安镇", "马川子乡", "杨泡满族乡", "三家子满族乡", "密江乡", "哈达门乡", "珲春林业局"], null, ["民慧街道", "光明街道", "文化街道", "八家子镇", "福洞镇", "头道镇", "西城镇", "南坪镇", "东城镇", "崇善镇", "龙城镇", "和龙林业局", "八家子林业局", "和龙市林业局"], ["南山社区工作委员会", "大明社区工作委员会", "大川社区工作委员会", "幸福社区工作委员会", "新民社区工作委员会", "新华社区工作委员会", "东振社区工作委员会", "江北社区工作委员会", "汪清镇", "大兴沟镇", "天桥岭镇", "罗子沟镇", "百草沟镇", "春阳镇", "复兴镇", "东光镇", "鸡冠乡", "汪清林业局", "天桥岭林业局", "大兴沟林业局", "八人沟农场", "罗子沟农场", "复兴农场"], ["明月镇", "松江镇", "二道白河镇", "两江镇", "石门镇", "万宝镇", "亮兵镇", "长白山保护开发区管委会池北区（特殊乡镇）", "县级直管村级单位（特殊镇）", "新合乡", "永庆乡", "白河林业局", "安图林业有限公司", "安图县林业局", "海沟金矿"]]], [[["兆麟街道", "新阳路街道", "抚顺街道", "共乐街道", "新华街道", "城乡路街道", "工农街道", "尚志街道", "斯大林街道", "通江街道", "经纬街道", "工程街道", "安静街道", "安和街道", "正阳河街道", "建国街道", "康安街道", "爱建街道", "群力街道", "太平镇", "新发镇", "新农镇", "榆树镇", "闫家岗农场", "道里区农垦"], ["花园街道", "奋斗路街道", "革新街道", "文化街道", "大成街道", "芦家街道", "荣市街道", "燎原街道", "松花江街道", "曲线街道", "通达街道", "七政街道", "和兴路街道", "哈西街道", "保健路街道", "先锋路街道", "新春街道", "跃进街道", "王岗镇", "红旗满族乡", "红旗农场", "南岗区农垦"], ["靖宇街道", "太古街道", "东莱街道", "滨江街道", "仁里街道", "南市街道", "崇俭街道", "振江街道", "东原街道", "大兴街道", "胜利街道", "南马街道", "民强街道", "大有坊街道", "南直路街道", "化工街道", "火车头街道", "新一街道", "三棵树大街街道", "水泥路街道", "太平大街街道", "黎华街道", "新乐街道", "永源镇", "巨源镇", "团结镇", "民主镇", "青年农场", "道外农垦"], ["兴建街道", "保国街道", "联盟街道", "友协街道", "新疆街道", "新伟街道", "平新街道", "平房镇", "平房农垦"], ["三电街道", "太阳岛街道", "松浦街道", "万宝街道", "松北街道", "对青山镇", "乐业镇"], ["香坊大街街道", "安埠街道", "通天街道", "新香坊街道", "铁东街道", "新成街道", "红旗街道", "六顺街道", "建筑街道", "哈平路街道", "安乐街道", "健康路街道", "大庆路街道", "进乡街道", "通乡街道", "和平路街道", "民生路街道", "文政街道", "王兆街道", "黎明街道", "成高子镇", "幸福镇", "朝阳镇", "向阳镇", "香坊实验农场", "香坊区农垦"], ["兰河街道", "呼兰街道", "建设路街道", "利民街道", "学院路街道", "腰卜街道", "康金街道", "双井街道", "长岭街道", "沈家街道", "二八镇", "石人镇", "白奎镇", "方台镇", "莲花镇", "大用镇", "利业镇", "杨林乡", "许卜乡", "孟家乡", "呼兰农垦"], ["金城街道", "金都街道", "通城街道", "河东街道", "阿什河街道", "玉泉街道", "新利街道", "双丰街道", "舍利街道", "小岭街道", "亚沟街道", "交界街道", "蜚克图镇", "平山镇", "松峰山镇", "红星镇", "金龙山镇", "杨树镇", "料甸镇", "阿城原种场"], ["双城市街道管委会", "五家街道", "新兴街道", "兰棱街道", "周家街道", "公正街道", "承旭街道", "承恩街道", "永治街道", "永和街道", "幸福街道", "韩甸镇", "单城镇", "东官镇", "农丰满族锡伯族镇", "杏山镇", "西官镇", "朝阳乡", "金城乡", "青岭满族乡", "联兴满族乡", "永胜乡", "临江乡", "水泉乡", "乐群满族乡", "万隆乡", "希勤满族乡", "同心满族乡"], ["依兰镇", "达连河镇", "江湾镇", "三道岗镇", "道台桥镇", "宏克利镇", "团山子乡", "愚公乡", "迎兰朝鲜族乡", "依兰县林业局", "依兰农场", "松花江农场"], ["方正镇", "会发镇", "大罗密镇", "得莫利镇", "天门乡", "松南乡", "德善乡", "宝兴乡", "方正林业局", "沙河农场"], ["宾州镇", "居仁镇", "宾西镇", "糖坊镇", "宾安镇", "新甸镇", "胜利镇", "宁远镇", "摆渡镇", "平坊镇", "满井镇", "常安镇", "永和乡", "鸟河乡", "民和乡", "经建乡", "三宝乡", "九龙山柞蚕育种场", "农垦农业职业学院"], ["巴彦镇", "兴隆镇", "西集镇", "洼兴镇", "龙泉镇", "巴彦港镇", "龙庙镇", "万发镇", "天增镇", "黑山镇", "松花江乡", "富江乡", "华山乡", "丰乐乡", "德祥乡", "红光乡", "山后乡", "镇东乡", "兴隆林业局", "工业园区"], ["木兰镇", "东兴镇", "大贵镇", "利东镇", "柳河镇", "新民镇", "建国乡", "吉兴乡", "兴隆林业局"], ["通河镇", "乌鸦泡镇", "清河镇", "浓河镇", "凤山镇", "祥顺镇", "三站乡", "富林乡", "清河林业局", "兴隆林业局", "岔林河农场"], ["延寿镇", "六团镇", "中和镇", "加信镇", "延河镇", "安山乡", "寿山乡", "玉河乡", "青川乡", "太平川", "庆阳农场"], ["尚志镇", "一面坡镇", "苇河镇", "亚布力镇", "帽儿山镇", "亮河镇", "庆阳镇", "石头河子镇", "元宝镇", "黑龙宫镇", "长寿乡", "乌吉密乡", "鱼池乡", "珍珠山乡", "老街基乡", "马延乡", "河东乡", "苇河林业局", "亚布力林业局"], ["五常镇", "拉林满族镇", "山河镇", "小山子镇", "安家镇", "牛家满族镇", "杜家镇", "背荫河镇", "冲河镇", "沙河子镇", "向阳镇", "龙凤山镇", "兴盛乡", "志广乡", "卫国乡", "常堡乡", "民意乡", "红旗满族乡", "八家子乡", "民乐朝鲜族乡", "营城子满族乡", "长山乡", "兴隆乡", "二河乡", "山河屯林业局"]], [["五龙街道", "湖滨街道", "江安街道", "正阳街道", "彩虹街道", "南航街道", "大民街道", "齐齐哈尔局直"], ["中华街道", "西大桥街道", "卜奎街道", "建设街道", "文化街道", "建华区（镇）直辖地域"], ["站前街道", "南浦街道", "通东街道", "光荣街道", "龙华街道", "北局宅街道", "东湖街道", "扎龙镇", "齐齐哈尔种畜场"], ["新兴街道", "新建街道", "林机街道", "道北街道", "水师营满族镇", "榆树屯镇"], ["红岸街道", "沿江街道", "电力街道", "幸福街道", "红宝石街道", "北兴街道", "铁北街道", "和平街道", "长青乡", "杜尔门沁达斡尔族乡"], ["东安街道", "富强街道", "跃进街道", "繁荣街道"], ["梅里斯街道", "雅尔塞镇", "卧牛吐达斡尔族镇", "达呼店镇", "共和镇", "梅里斯镇", "莽格吐达斡尔族乡", "哈拉海农场"], ["龙江镇", "景星镇", "龙兴镇", "山泉镇", "七棵树镇", "杏山镇", "白山镇", "头站镇", "黑岗乡", "广厚乡", "华民乡", "哈拉海乡", "鲁河乡", "济沁河乡"], ["依安镇", "依龙镇", "双阳镇", "三兴镇", "中心镇", "新兴镇", "富饶乡", "解放乡", "阳春乡", "新发乡", "太东乡", "上游乡", "红星乡", "先锋乡", "新屯乡", "依安农场", "红旗种马场"], ["泰来镇", "平洋镇", "汤池镇", "江桥蒙古族镇", "塔子城镇", "大兴镇", "和平镇", "克利镇", "胜利蒙古族乡", "宁姜蒙古族乡", "葡萄场", "果树场", "泰来县一苗圃", "泰来县二苗圃", "东方红机械林场", "六三监狱", "泰来农场", "第一良种场", "第二良种场", "宏胜种畜场", "二龙涛农场"], ["甘南镇", "兴十四镇", "平阳镇", "东阳镇", "巨宝镇", "长山乡", "中兴乡", "兴隆乡", "宝山乡", "查哈阳乡", "查哈阳农场", "北京市双河农场"], ["富裕镇", "富路镇", "富海镇", "二道湾镇", "龙安桥镇", "塔哈镇", "繁荣乡", "绍文乡", "忠厚乡", "友谊乡", "富裕牧场", "繁荣种畜场"], ["克山镇", "北兴镇", "西城镇", "古城镇", "北联镇", "西河镇", "双河镇", "河南乡", "河北乡", "古北乡", "西联乡", "发展乡", "西建乡", "向华乡", "曙光乡", "克山县河北林场", "克山县涌泉林场", "克山县北联林场", "克山农场", "克山县第一良种场", "克山县第二良种场", "克山县种猪场", "克山县种畜场"], ["克东镇", "宝泉镇", "乾丰镇", "玉岗镇", "蒲峪路镇", "润津乡", "昌盛乡", "第一苗圃", "第二苗圃", "爱华林场", "发展林场", "东兴林场", "红旗奶山羊场", "第一良种场", "第二良种繁殖场", "果树繁殖场", "种猪场", "黑龙江省社会救助安置中心"], ["拜泉镇", "三道镇", "兴农镇", "长春镇", "龙泉镇", "国富镇", "富强镇", "新生乡", "兴国乡", "上升乡", "兴华乡", "大众乡", "丰产乡", "永勤乡", "爱农乡", "时中乡"], ["雨亭街道", "通江街道", "拉哈镇", "二克浅镇", "学田镇", "龙河镇", "讷南镇", "六合镇", "长发镇", "通南镇", "同义镇", "九井镇", "老莱镇", "孔国乡", "和盛乡", "同心乡", "兴旺鄂温克族乡", "龙河镇保安林场", "龙河镇茂山林场", "龙河镇国庆林场", "学田镇富源林场", "老莱镇宽余林场", "新江林场", "一良苗圃", "黑龙江省老莱农场", "六合镇黎明奶牛场", "孔国乡进化种猪场", "二克浅镇二里种畜场", "龙河镇青色草原种畜场", "第一良种场", "第二良种场", "第三良种场", "第四良种场"]], [["向阳街道", "南山街道", "立新街道", "东风街道", "红军路街道", "西鸡西街道", "西山街道", "红星乡", "西郊乡"], ["桦木林街道", "大恒山街道", "小恒山街道", "二道河子街道", "张新街道", "奋斗街道", "柳毛街道", "红旗乡", "柳毛乡"], ["东兴街道", "矿里街道", "洗煤街道", "大通沟街道", "滴道河乡", "兰岭乡"], ["街里街道", "穆棱街道", "平岗街道", "碱场街道", "石磷街道", "梨树区（镇）直辖地域"], ["城子河街道", "正阳街道", "东海街道", "城西街道", "杏花街道", "长青乡", "永丰乡"], ["麻山街道", "麻山区（镇）直辖地域"], ["鸡东镇", "平阳镇", "向阳镇", "哈达镇", "永安镇", "永和镇", "东海镇", "兴农镇", "鸡林乡", "明德乡", "下亮子乡", "林业局", "八五一０农场"], ["虎林镇", "东方红镇", "迎春镇", "虎头镇", "杨岗镇", "东诚镇", "宝东镇", "新乐乡", "伟光乡", "珍宝岛乡", "阿北乡", "东方红林业局", "迎春林业局", "八五０农场", "八五四农场", "八五六农场", "八五八农场", "庆丰农场", "云山农场"], ["中心街道", "密山镇", "连珠山镇", "当壁镇", "知一镇", "黑台镇", "兴凯镇", "裴德镇", "白鱼湾镇", "柳毛乡", "杨木乡", "兴凯湖乡", "承紫河乡", "二人班乡", "太平乡", "和平乡", "富源乡", "林业局", "青年水库", "煤炭工业局", "经济开发区管理委员会", "牡丹江管理局局直", "八五五农场", "八五七农场", "八五一一农场", "兴凯湖农场", "牡丹江管理局北大营管委会", "牡丹江管理局双峰农场", "水产养殖有限公司", "种畜场", "水田良种场", "市良种场", "校办企业公司", "蜂蜜山粮库有限公司"]], [["北山街道", "红军街道", "光明街道", "胜利街道", "南翼街道"], ["育才街道", "红旗街道", "新南街道", "湖滨街道", "解放街道", "团结街道"], ["铁西街道", "铁东街道", "六号街道", "大陆街道", "富力街道", "麓林山街道"], null, ["工人村街道", "新一街道", "三街街道", "东山街道", "蔬园乡街道", "新华镇", "蔬园乡", "东方红乡", "鹤岗市林业局", "新华农场"], ["岭北街道", "岭南街道", "沟北街道", "沟南街道"], ["凤翔镇", "鹤北镇", "名山镇", "团结镇", "肇兴镇", "云山镇", "东明朝鲜族乡", "太平沟乡", "萝北县林业局", "鹤北林业局", "宝泉岭管理局局直", "江滨农场", "军川农场", "名山农场", "延军农场", "共青农场", "宝泉岭农场", "萝北县农业局"], ["绥滨镇", "绥东镇", "忠仁镇", "连生乡", "北岗乡", "富强乡", "北山乡", "福兴乡", "新富乡", "绥滨西林场", "国营中兴边防林场", "忠仁镇良种场", "绥东镇种畜场", "二九０农场", "绥滨农场", "普阳农场"]], [["二马路街道", "八马路街道", "中心站街道", "富安街道", "窑地街道", "长安街道", "铁西街道", "安邦乡"], ["中山街道", "北山街道", "南山街道", "东山街道", "中心街道", "西山街道", "长胜乡", "岭东区青山旅游公司", "岭东区岭东经营所"], ["振兴中路街道", "振兴东路街道", "集贤街道", "东荣街道", "太保镇"], ["红旗街道", "跃进街道", "东保卫街道", "七星街道", "双阳街道", "新安街道", "电厂街道", "七星镇", "双鸭山林业局宝山经营所", "双鸭山林业局大叶沟林场", "双鸭山农场"], ["福利镇", "集贤镇", "升昌镇", "丰乐镇", "太平镇", "腰屯乡", "兴安乡", "永安乡", "太平林场", "丰乐林场", "七星林场", "峻山林场", "爱林林场", "腰屯林场", "升平煤矿", "黑龙江省双鸭山监狱", "二九一农场", "良种场", "种畜场", "果树示范场"], ["友谊镇", "兴隆镇", "龙山镇", "凤岗镇", "兴盛乡", "东建乡", "庆丰乡", "建设乡", "友邻乡", "新镇乡", "成富朝鲜族满族乡", "红兴隆管理局局直", "友谊农场"], ["宝清镇", "七星泡镇", "青原镇", "夹信子镇", "龙头镇", "小城子镇", "朝阳乡", "万金山乡", "尖山子乡", "七星河乡", "双鸭山林业局上游经营所", "双鸭山林业局南瓮泉经营所", "双鸭山林业局七一林场", "双鸭山林业局七星河林场", "双鸭山林业局红旗林场", "双鸭山林业局三岔河林场", "双鸭山林业局青龙林场", "双鸭山林业局宝石经营所", "双鸭山林业局七星河金矿", "桦南林业局岚峰林场", "五九七农场", "八五二农场", "八五三农场"], ["饶河镇", "小佳河镇", "西丰镇", "五林洞镇", "西林子乡", "四排乡", "大佳河乡", "山里乡", "大通河乡", "小佳河林场", "威山林场", "西丰林场", "大牙克林场", "石场林场", "宝马山林场", "大岱林场", "永幸林场", "奇源林场", "芦源林场", "五林洞林场", "饶河农场", "红旗岭农场", "八五九农场", "胜利农场", "红卫农场"]], [["萨尔图街道", "铁人街道", "友谊街道", "富强街道", "拥军街道", "会战街道", "火炬街道", "东风街道", "东安街道"], ["龙凤街道", "兴化街道", "卧里屯街道", "东光街道", "三永街道", "龙凤镇", "高新区农场"], ["龙岗街道", "银浪街道", "奋斗街道", "庆新街道", "西宾街道", "乘风街道", "喇嘛甸镇", "红骥牧场", "星火牧场", "银浪牧场"], ["红岗街道", "八百垧街道", "杏南街道", "解放街道", "创业街道", "杏树岗镇", "红岗区铁人生态工业园区"], ["庆葡街道", "高台子镇街道", "林源镇街道", "立志街道", "新华街道", "大同镇街道", "大同镇", "高台子镇", "太阳升镇", "林源镇", "祝三乡", "老山头乡", "八井子乡", "双榆树乡", "和平牧场"], ["肇州镇", "永乐镇", "丰乐镇", "朝阳沟镇", "兴城镇", "二井镇", "双发乡", "托古乡", "朝阳乡", "永胜乡", "榆树乡", "新福乡", "乐园良种场", "卫星种畜场"], ["肇源镇", "三站镇", "二站镇", "茂兴镇", "古龙镇", "新站镇", "头台镇", "古恰镇", "福兴乡", "薄荷台乡", "和平乡", "超等乡", "民意乡", "义顺乡", "浩德乡", "大兴乡", "肇源农场", "种畜场", "新立良种繁育场", "立陡山良种场", "果树示范场", "经济作物示范场", "茂兴湖水产养殖场"], ["林甸镇", "红旗镇", "花园镇", "四季青镇", "鹤鸣湖镇", "东兴乡", "宏伟乡", "四合乡", "林甸县长青林场", "巨浪牧场", "国营苇场", "新兴畜牧场"], ["泰康镇", "胡吉吐莫镇", "烟筒屯镇", "他拉哈镇", "连环湖镇", "一心乡", "克尔台乡", "敖林西伯乡", "巴彦查干乡", "腰新乡", "江湾乡", "绿色草原牧场", "大山种羊场"]], [["旭日街道", "红升街道", "前进街道", "朝阳街道", "东升街道"], ["西水街道", "联合街道", "东升街道", "晨明镇", "浩良河镇", "迎春乡", "三岔河林场", "四合营林场", "亮子河林场", "石头河林场", "岩石经营所", "奋斗经营所", "桦阳经营所", "浩良河经营所", "太平经营所", "南岔经营所", "威岭经营所", "松青经营所", "柳树经营所", "浩良河化肥厂"], ["友好街道", "双子河街道", "铁林街道", "三合经营所", "松园林场", "中心经营所", "永青经营所", "碧云经营所", "友谊经营所", "青杨经营所", "岭峰林场", "奋斗林场", "东卡林场", "鸡爪河林场", "绿源林场", "广川经营所", "朝阳经营所"], ["西林街道", "新兴街道", "苔青街道"], ["向阳街道", "曙光街道", "解放经营所", "昆仑气林场", "开源河林场", "么河经营所", "冲锋经营所", "翠峦河经营所", "抚育河经营所", "尖山河经营所"], ["新青街道", "兴安街道", "红林经营所", "松林林场", "泉林林场", "水源林场", "笑山林场", "汤林林场", "桦林经营所", "青林林场", "结源林场", "北沟林场", "南沟林场", "乌拉嘎经营所", "柳树河林场", "北影林场"], ["美溪街道", "大西林林场", "五道库经营所", "缓岭经营所", "对青山经营所", "群峦经营所", "兰新经营所", "顺利河林场", "松岭经营所", "青山口林场", "金沙河林场", "桦皮羌子林场", "碧仓库林场", "三股流经营所", "卧龙河林场"], ["奋斗街道", "金山街道", "白山林场", "丰岭林场", "丰林林场", "丰沟经营所", "丰茂林场", "横山经营所", "丰丽林场", "大昆仑经营所", "小昆仑林场", "育林经营所"], ["五营街道", "五星街道", "翠北林场", "前丰林场", "永丰经营所", "平原经营所", "丽丰经营所", "杨树河经营所", "平山经营所", "丽林经营所"], ["乌马河街道", "伊敏林场", "伊东经营所", "东方红农场", "翠岭经营所", "河北经营所", "青山林场", "育苗经营所", "安全经营所", "伊青经营所", "前进经营所", "西岭林场", "伊林经营所"], ["河南街道", "河北街道", "日新林场", "石林林场", "东升林场", "二龙山林场", "高峰林场", "二清河林场", "守虎山林场", "泉石林场", "峻岭林场", "育林经营所", "团结经营所", "磨石山经营所", "中心苗卜", "克林经营所"], ["带岭街道", "大青川林场", "东方红林场", "秀水林场", "永翠林场", "明月林场", "红光林场", "秋沙鸭自然保护区", "北列林场", "南列林场", "寒月林场", "环山林场", "凉水自然保护区"], ["乌伊岭街道", "上游林场", "美峰林场", "美林林场", "建新林场", "移山林场", "林海林场", "桔源经营所", "东克林林场", "福民林场", "阿廷河林场", "永胜经营所", "前卫林场"], ["红星街道", "清水河经营所", "五星河经营所", "汤洪岭林场", "汤北林场", "霍吉河林场", "二杨经营所", "三杨林场", "汤南林场", "共青经营所", "库斯特林场", "二皮河经营所"], ["红山街道", "山峰林场", "阳光林场", "新风林场", "卫国林场", "查山经营所", "长青经营所", "青山农场", "溪水经营所", "蔚兰经营所", "永绪经营所", "美林经营所", "红山经营所"], ["朝阳镇", "乌云镇", "乌拉嘎镇", "常胜乡", "向阳乡", "沪嘉乡", "红光乡", "保兴乡", "青山乡", "太平林场", "清河林场", "马连林场", "嘉荫农场"], ["铁力镇", "双丰镇", "桃山镇", "朗乡镇", "年丰乡", "工农乡", "王杨乡", "铁力林业局", "双丰林业局", "桃山林业局", "朗乡林业局", "铁力农场"]], [["西林街道", "保卫街道", "桥南街道", "西南岗街道", "建设街道", "长安街道", "向阳区（镇）直辖地域"], ["前进区镇直辖", "前进区农垦"], ["晓云街道", "佳东街道", "造纸街道", "佳南街道", "建国街道", "建国镇", "松江乡", "东风区农垦"], ["佳西街道", "友谊街道", "大来镇", "敖其镇", "望江镇", "长发镇", "莲江口镇", "长青乡", "沿江乡", "西格木乡", "平安乡", "四丰乡", "群胜乡", "莲江口监狱", "郊区农垦"], ["驼腰子镇", "石头河子镇", "桦南镇", "土龙山镇", "孟家岗镇", "闫家镇", "金沙乡", "梨树乡", "明义乡", "大八浪乡", "桦南林业局", "曙光农场", "桦南种畜场"], ["横头山镇", "苏家店镇", "悦来镇", "新城镇", "四马架镇", "东河乡", "梨丰乡", "创业乡", "星火乡", "江川农场", "宝山农场"], ["香兰镇", "鹤立镇", "竹帘镇", "汤原镇", "汤旺乡", "胜利乡", "吉祥乡", "振兴乡", "太平川乡", "永发乡", "鹤立林业局", "香兰监狱", "汤原农场", "梧桐河农场"], ["同江市城市管理委员会", "同江镇", "乐业镇", "三村镇", "临江镇", "向阳镇", "青河镇", "街津口乡", "八岔乡", "金川乡", "银川乡", "街津口林场", "鸭北林场", "勤得利农场", "青龙山农场", "前进农场", "洪河农场", "鸭绿河农场", "浓江农场", "良种场", "畜牧场", "知青农场"], ["城东街道", "城关社区建设委员会", "城西街道", "长安镇", "砚山镇", "头林镇", "兴隆岗镇", "宏胜镇", "向阳川镇", "二龙山镇", "上街基镇", "锦山镇", "大榆树镇", "石砬山林场", "东风岗林场", "太东林场", "工农林场", "富锦市国营原种场", "富锦市国营果树示范场", "富锦市科研所", "工业园区", "建三江管理局局直", "七星农场", "大兴农场", "创业农场", "种猪场", "种畜场"], ["抚远镇", "寒葱沟镇", "浓桥镇", "乌苏镇", "通江乡", "浓江乡", "海青乡", "别拉洪乡", "鸭南乡", "前哨农场", "前锋农场", "二道河农场"]], [["兴安社区公共服务站", "兴乐社区公共服务站", "兴富社区公共服务站", "兴秀社区公共服务站", "兴平社区公共服务站", "兴和社区公共服务站", "兴城社区公共服务站", "兴盛社区公共服务站", "北山社区公共服务站", "欣源社区公共服务站", "冬梅社区公共服务站", "枫叶社区公共服务站", "安居社区公共服务站", "河南社区公共服务站", "新立社区公共服务站", "新建社区公共服务站", "新城社区公共服务站", "缸窑沟社区公共服务站", "红旗镇", "长兴乡", "种畜场", "北兴农场", "黑龙江红兴隆农垦宝利采金"], ["祥和社区公共服务站", "运管社区公共服务站", "安康社区公共服务站", "文苑社区公共服务站", "朝阳社区公共服务站", "东正社区公共服务站", "旭日社区公共服务站", "花园社区公共服务站", "银泉社区公共服务站", "运销社区公共服务站", "同仁社区公共服务站", "东方社区公共服务站", "学府社区公共服务站", "桃山社区公共服务站", "长青社区公共服务站", "万宝河镇"], ["东风街道", "向阳街道", "富强街道", "新富街道", "龙湖街道", "茄子河镇", "宏伟镇", "铁山乡", "中心河乡"], ["新起街道", "新华街道", "元明街道", "铁西街道", "城西街道", "勃利镇", "小五站镇", "大四站镇", "双河镇", "倭肯镇", "青山乡", "永恒乡", "抢垦乡", "杏树朝鲜族乡", "吉兴朝鲜族满族乡"]], [["新安街道", "长安街道", "七星街道", "五星街道", "兴隆镇"], ["阳明街道", "前进街道", "新兴街道", "桦林橡胶厂街道", "铁岭镇", "桦林镇", "磨刀石镇", "五林镇"], ["向阳街道", "黄花街道", "铁北街道", "新华街道", "大庆街道", "兴平街道", "北山街道", "三道关镇"], ["先锋街道", "火炬街道", "立新街道", "牡丹街道", "江滨街道", "沿江街道", "温春镇", "海南朝鲜族乡"], ["林口镇", "古城镇", "刁翎镇", "朱家镇", "柳树镇", "三道通镇", "龙爪镇", "莲花镇", "奎山乡", "青山乡", "建堂乡", "林口林业局"], ["绥芬河镇", "阜宁镇"], ["海林镇", "长汀镇", "横道镇", "山市镇", "柴河镇", "二道镇", "新安朝鲜族镇", "三道镇", "牡林工程公司街道", "柴河林机厂街道", "大海林林业局", "海林林业局", "柴河林业局", "海林农场", "山市种奶牛场"], ["城区街道", "宁安镇", "东京城镇", "渤海镇", "石岩镇", "沙兰镇", "海浪镇", "兰岗镇", "江南朝鲜族满族乡", "卧龙朝鲜族乡", "马河乡", "镜泊乡", "三陵乡", "东京城林业局", "宁安农场"], ["八面通镇", "穆棱镇", "下城子镇", "马桥河镇", "兴源镇", "福录乡", "河西乡", "共和乡", "八面通林业局", "穆棱林业局"], ["东宁镇", "三岔口镇", "大肚川镇", "老黑山镇", "道河镇", "绥阳镇", "绥阳林业局"]], [["花园街道", "兴安街道", "海兰街道", "西兴街道", "西岗子镇", "爱辉镇", "罕达汽镇", "幸福乡", "四嘉子乡", "坤河乡", "上马厂乡", "张地营子乡", "西峰山乡", "新生乡", "二站乡", "大平林场", "七二七林场", "望峰林场", "卡伦山林场", "胜山林场", "二站林场", "三站林场", "大岭林场", "桦皮窑林场", "滨南林场", "江防林场", "河南屯林场", "西岗子试验林场", "大新屯储木场", "宋集屯煤矿", "西岗子煤矿", "东方红煤矿", "锦河农场", "奶牛场", "种畜场", "第二良种场", "第一良种场"], ["嫩江镇", "伊拉哈镇", "双山镇", "多宝山镇", "海江镇", "前进镇", "长福镇", "科洛镇", "临江乡", "联兴乡", "白云乡", "塔溪乡", "霍龙门乡", "长江乡", "多宝山铜矿", "九三管理局局直", "鹤山农场", "大西江农场", "尖山农场", "荣军农场", "红五月农场", "七星泡农场", "嫩江农场", "山河农场", "嫩北农场", "建边农场", "马铃薯原种繁殖场"], ["奇克街道", "奇克镇", "逊河镇", "逊克县克林镇", "干岔子乡", "松树沟乡", "车陆乡", "新鄂乡", "新兴乡", "宝山乡", "道干林场", "干岔子林场", "新立林场", "三间房林场", "良种场", "种畜场", "逊克农场"], ["孙吴城区街道", "孙吴镇", "辰清镇", "西兴乡", "沿江满族乡", "腰屯乡", "卧牛河乡", "群山乡", "奋斗乡", "红旗乡", "正阳山乡", "清溪乡", "前进林场", "大河口林场", "正阳林场", "平山林场", "沿江林场", "辰清林场", "红旗林场", "向阳林场", "良种场", "种畜场", "红色边疆农场"], ["兆麟街道", "和平街道", "北岗街道", "庆华街道", "铁西街道", "铁南街道", "通北镇", "赵光镇", "海星镇", "石泉镇", "二井镇", "城郊乡", "东胜乡", "杨家乡", "主星乡", "通北林业局", "北安管理局局直", "长水河农场", "赵光农场", "红星农场", "建设农场"], ["青山街道", "龙镇", "和平镇", "五大连池镇", "双泉镇", "新发镇", "团结镇", "兴隆乡", "建设乡", "太平乡", "兴安乡", "朝阳乡", "元青山林场", "三九六林场", "小兴安林场", "二龙山林场", "朝阳林场", "引龙河林场", "焦得布林场", "小孤山林场", "药泉林场", "沾河林业局", "莲花管理委员会", "二龙山蚕种场", "畜牧场", "第二良种场", "花园劳教所", "永丰监狱", "华山监狱", "凤凰山监狱", "龙门农场", "襄河农场", "龙镇农场", "二龙山农场", "引龙河农场", "尾山农场", "格球山农场", "五大连池农场"]], [["紫来", "爱路", "大有", "吉泰", "东兴", "北林", "宝山镇", "绥胜镇", "西长发镇", "永安镇", "太平川镇", "秦家镇", "双河镇", "三河镇", "四方台镇", "津河镇", "张维镇", "东津镇", "东富镇", "红旗乡", "连岗乡", "新华乡", "兴福乡", "三井乡", "五营乡", "兴和乡", "绥化局直"], ["望奎镇", "通江镇", "卫星镇", "海丰镇", "莲花镇", "惠七满族镇", "先锋镇", "火箭镇", "东郊镇", "灵山满族乡", "后三乡", "灯塔乡", "东升乡", "恭六乡", "厢白满族乡", "白四林场", "种畜场", "第一良种场", "第二良种场"], ["颜河街道", "顺达街道", "兰亚街道", "正阳街道", "兰西镇", "榆林镇", "临江镇", "平山镇", "红光镇", "远大镇", "康荣乡", "燎原乡", "北安乡", "长江乡", "兰河乡", "红星乡", "长岗乡", "星火乡", "奋斗乡", "第一原种场", "第二原种场", "肉用种羊场"], ["北城街道", "西城街道", "靖城街道", "东城街道", "青冈镇", "中和镇", "祯祥镇", "兴华镇", "永丰镇", "芦河镇", "民政镇", "柞岗镇", "劳动镇", "迎春镇", "建设乡", "新村乡", "昌盛乡", "德胜乡", "连丰乡", "青冈县林场", "青冈县互利营林站", "青冈县果树场", "青冈县种马场", "青冈县种羊场", "青冈县原种场"], ["庆安镇", "民乐镇", "大罗镇", "平安镇", "勤劳镇", "久胜镇", "同乐镇", "建民乡", "巨宝山乡", "新胜乡", "丰收乡", "发展乡", "致富乡", "欢胜乡", "国有林场管理局", "柳河农场"], ["明水镇", "兴仁镇", "永兴镇", "崇德镇", "通达镇", "双兴乡", "永久乡", "树人乡", "光荣乡", "繁荣乡", "通泉乡", "育林乡", "国营林场", "县联社马场", "明水种畜场", "育林畜牧场", "国营第一良种", "国营第二良种", "国营第三良种"], ["绥棱镇", "上集镇", "四海店镇", "双岔河镇", "阁山镇", "靠山乡", "后头乡", "长山乡", "克音河乡", "绥中乡", "泥尔河乡", "阁山林场", "四海店林场", "三吉台林场", "半截河林场", "绥棱林业局", "绥棱农场", "种马场", "良种场", "奶山羊场"], ["铁西街道", "新兴街道", "安虹街道", "安达镇", "任民镇", "万宝山镇", "昌德镇", "升平镇", "羊草镇", "老虎岗镇", "中本镇", "太平庄镇", "吉兴岗镇", "火石山乡", "卧里屯乡", "青肯泡乡", "先源乡", "安达畜牧场", "原种场", "红旗泡水库管理所", "东湖水库管理站"], ["朝阳区", "东升区", "西园区", "正阳区", "肇东镇", "昌五镇", "宋站镇", "五站镇", "尚家镇", "姜家镇", "里木店镇", "四站镇", "涝洲镇", "五里明镇", "黎明镇", "西八里镇", "太平乡", "海城乡", "向阳乡", "洪河乡", "跃进乡", "德昌乡", "宣化乡", "安民乡", "明久乡", "四方山农场", "涝洲鱼种场"], ["海伦镇", "海北镇", "伦河镇", "共合镇", "海兴镇", "祥富镇", "东风镇", "百祥镇", "前进乡", "向荣乡", "长发乡", "东林乡", "海南乡", "共荣乡", "乐业乡", "福民乡", "丰山乡", "永富乡", "联发乡", "永和乡", "爱民乡", "扎音河乡", "双录乡", "林场公司", "东方红水库地区", "海伦农场", "红光农场", "海伦二粮种场", "海伦种畜场"]], [["呼玛镇", "韩家园镇", "三卡乡", "金山乡", "兴华乡", "鸥浦乡", "白银纳鄂伦春族民族乡", "北疆乡", "韩家园林业局"], ["塔河镇", "瓦拉干镇", "盘古镇", "古驿镇", "十八站鄂伦春族民族乡", "依西肯乡", "开库康乡", "十八站林业局"], ["西林吉镇", "图强镇", "阿木尔镇", "兴安镇", "北极镇", "古莲镇", "西林吉林业局", "图强林业局", "阿木尔林业局"]]], [[["南京东路街道", "外滩街道", "半淞园路街道", "小东门街道", "豫园街道", "老西门街道", "五里桥街道", "打浦桥街道", "淮海中路街道", "瑞金二路街道"], ["天平路街道", "湖南路街道", "斜土路街道", "枫林路街道", "长桥街道", "田林街道", "虹梅路街道", "康健新村街道", "徐家汇街道", "凌云路街道", "龙华街道", "漕河泾街道", "华泾镇", "漕河泾新兴技术开发区"], ["华阳路街道", "江苏路街道", "新华路街道", "周家桥街道", "天山路街道", "仙霞新村街道", "虹桥街道", "程家桥街道", "北新泾街道", "新泾镇"], ["江宁路街道", "石门二路街道", "南京西路街道", "静安寺街道", "曹家渡街道", "天目西路街道", "北站街道", "宝山路街道", "共和新路街道", "大宁路街道", "彭浦新村街道", "临汾路街道", "芷江西路街道", "彭浦镇"], ["曹杨新村街道", "长风新村街道", "长寿路街道", "甘泉路街道", "石泉路街道", "宜川路街道", "万里街道", "真如镇街道", "长征镇", "桃浦镇"], ["欧阳路街道", "曲阳路街道", "广中路街道", "嘉兴路街道", "凉城新村街道", "四川北路街道", "提篮桥街道", "江湾镇街道"], ["定海路街道", "平凉路街道", "江浦路街道", "四平路街道", "控江路街道", "长白新村街道", "延吉新村街道", "殷行街道", "大桥街道", "五角场街道", "新江湾城街道", "五角场镇"], ["江川路街道", "古美街道", "新虹街道", "浦锦街道", "莘庄镇", "七宝镇", "颛桥镇", "华漕镇", "虹桥镇", "梅陇镇", "吴泾镇", "马桥镇", "浦江镇", "莘庄工业区"], ["友谊路街道", "吴淞街道", "张庙街道", "罗店镇", "大场镇", "杨行镇", "月浦镇", "罗泾镇", "顾村镇", "高境镇", "庙行镇", "淞南镇", "宝山城市工业园区"], ["新成路街道", "真新街道", "菊园新区管委会", "嘉定镇街道", "南翔镇", "安亭镇", "马陆镇", "徐行镇", "华亭镇", "外冈镇", "江桥镇", "嘉定工业区"], ["潍坊新村街道", "陆家嘴街道", "周家渡街道", "塘桥街道", "上钢新村街道", "南码头路街道", "沪东新村街道", "金杨新村街道", "洋泾街道", "浦兴路街道", "东明路街道", "花木街道", "川沙新镇", "高桥镇", "北蔡镇", "合庆镇", "唐镇", "曹路镇", "金桥镇", "高行镇", "高东镇", "张江镇", "三林镇", "惠南镇", "周浦镇", "新场镇", "大团镇", "康桥镇", "航头镇", "祝桥镇", "泥城镇", "宣桥镇", "书院镇", "万祥镇", "老港镇", "南汇新城镇", "芦潮港农场", "东海农场", "朝阳农场", "中国（上海）自由贸易试验区（保税片区）", "金桥经济技术开发区", "张江高科技园区"], ["石化街道", "朱泾镇", "枫泾镇", "张堰镇", "亭林镇", "吕巷镇", "廊下镇", "金山卫镇", "漕泾镇", "山阳镇", "金山工业区"], ["岳阳街道", "永丰街道", "方松街道", "中山街道", "广富林街道", "九里亭街道", "泗泾镇", "佘山镇", "车墩镇", "新桥镇", "洞泾镇", "九亭镇", "泖港镇", "石湖荡镇", "新浜镇", "叶榭镇", "小昆山镇", "松江工业区", "佘山度假区", "上海松江出口加工区"], ["夏阳街道", "盈浦街道", "香花桥街道", "朱家角镇", "练塘镇", "金泽镇", "赵巷镇", "徐泾镇", "华新镇", "重固镇", "白鹤镇"], ["西渡街道", "奉浦街道", "南桥镇", "奉城镇", "庄行镇", "金汇镇", "四团镇", "青村镇", "柘林镇", "海湾镇", "上海市奉贤区海湾旅游区", "金海社区", "上海海港综合经济开发区"], ["城桥镇", "堡镇", "新河镇", "庙镇", "竖新镇", "向化镇", "三星镇", "港沿镇", "中兴镇", "陈家镇", "绿华镇", "港西镇", "建设镇", "新海镇", "东平镇", "长兴镇", "新村乡", "横沙乡", "前卫农场", "东平林场", "上实现代农业园区"]]], [[["梅园新村街道", "新街口街道", "玄武门街道", "锁金村街道", "红山街道", "孝陵卫街道", "玄武湖街道"], ["秦虹街道", "夫子庙街道", "红花街道", "双塘街道", "中华门街道", "五老村街道", "洪武路街道", "大光路街道", "瑞金路街道", "月牙湖街道", "光华路街道", "朝天宫街道", "夫管办", "高新园区"], ["莫愁湖街道", "沙洲街道", "双闸街道", "江心洲街道", "兴隆街道", "南苑街道", "建邺区新城科技园", "建邺区河西中央商务区", "建邺区江东商业文化旅游中心区", "中新南京生态科技岛"], ["宁海路街道", "华侨路街道", "湖南路街道", "中央门街道", "挹江门街道", "江东街道", "凤凰街道", "阅江楼街道", "热河南路街道", "幕府山街道", "建宁路街道", "宝塔桥街道", "小市街道"], ["泰山街道", "顶山街道", "沿江街道", "江浦街道", "桥林街道", "汤泉街道", "盘城街道", "星甸街道", "永宁街道", "老山林场", "汤泉农场", "珍珠泉管委会", "高新技术开发区"], ["尧化街道", "马群街道", "迈皋桥街道", "燕子矶街道", "栖霞街道", "龙潭街道", "仙林街道", "八卦洲街道", "西岗街道", "龙潭监狱", "栖霞经济开发区", "南京龙潭物流园", "南京市靖安三江口工业园", "南京市马群科技园", "南京仙林大学城", "江苏生命科技创新园", "江苏金箔文化产业园", "南京大学科学园", "南京紫东国际创意园", "南京金港科技创业中心", "新港环保科技园", "紫金（仙林）科技创业特别社区", "南京经济技术开发区"], ["雨花街道", "赛虹桥街道", "西善桥街道", "板桥街道", "铁心桥街道", "梅山街道", "雨花经济开发区", "板桥新城", "中国（南京）软件谷"], ["东山街道", "秣陵街道", "汤山街道", "淳化街道", "禄口街道", "江宁街道", "谷里街道", "湖熟街道", "横溪街道", "麒麟街道", "青龙山林场", "江宁开发区", "江宁滨江开发区", "江宁高新技术产业园", "麒麟科技创新园（生态科技城）"], ["大厂街道", "葛塘街道", "长芦街道", "雄州街道", "龙池街道", "程桥街道", "金牛湖街道", "横梁街道", "龙袍街道", "马鞍街道", "冶山街道", "竹镇镇", "六合开发区", "新材料产业园", "化工园区"], ["永阳街道", "柘塘街道", "白马镇", "东屏镇", "石湫镇", "洪蓝镇", "晶桥镇", "和凤镇", "溧水开发区"], ["淳溪街道", "古柏街道", "阳江镇", "砖墙镇", "漆桥镇", "固城镇", "东坝镇", "桠溪镇", "高淳县团结圩良种繁育场", "高淳县茶叶实验场", "高淳监狱", "高淳县傅家坛林场"]], [["东亭街道", "安镇街道", "东北塘街道", "羊尖镇", "鹅湖镇", "锡北镇", "东港镇", "无锡锡山开发区", "锡山台湾农民创业园"], ["堰桥街道", "长安街道", "钱桥街道", "前洲街道", "玉祁街道", "洛社镇", "阳山镇", "无锡惠山经济开发区"], ["河埒街道", "荣巷街道", "蠡园街道", "蠡湖街道", "华庄街道", "太湖街道", "雪浪街道", "马山街道", "胡埭镇"], ["崇安寺街道", "通江街道", "广瑞路街道", "上马墩街道", "江海街道", "广益街道", "迎龙桥街道", "南禅寺街道", "清名桥街道", "金星街道", "金匮街道", "扬名街道", "黄巷街道", "山北街道", "北大街街道", "惠山街道"], ["旺庄街道", "硕放街道", "江溪街道", "新安街道", "梅村街道", "鸿山街道", "无锡新加坡工业园", "无锡高新技术产业开发区", "无锡高新区综合保税区", "无锡太湖国际科技园"], ["澄江街道", "南闸街道", "云亭街道", "临港街道", "璜土镇", "月城镇", "青阳镇", "徐霞客镇", "华士镇", "周庄镇", "新桥镇", "长泾镇", "顾山镇", "祝塘镇", "江阴高新技术产业开发区", "江苏江阴靖江工业园区", "临港经济开发区"], ["宜城街道", "屺亭街道", "新庄街道", "新街街道", "芳桥街道", "张渚镇", "西渚镇", "太华镇", "徐舍镇", "官林镇", "杨巷镇", "新建镇", "和桥镇", "高塍镇", "万石镇", "周铁镇", "丁蜀镇", "湖父镇", "环科园", "宜兴经济开发区"]], [["黄楼街道", "丰财街道", "琵琶街道", "牌楼街道", "铜沛街道", "环城街道", "九里街道"], ["彭城街道", "子房街道", "黄山街道", "骆驼山街道", "大郭庄街道", "翠屏山街道", "大龙湖街道", "潘塘街道", "淮海食品城"], ["老矿街道", "大泉街道", "大吴街道", "潘安湖街道", "青山泉镇", "紫庄镇", "塔山镇", "汴塘镇", "江庄镇", "鹿庄粮棉原种场", "工业园区管委会"], ["王陵街道", "七里沟街道", "永安街道", "湖滨街道", "段庄街道", "翟山街道", "奎山街道", "和平街道", "金山街道", "泰山街道", "庞庄街道", "火花街道", "桃园街道", "苏山街道", "徐州泉山经济开发区", "徐州软件园管理委员会"], ["三河尖街道", "张双楼街道", "垞城街道", "张集街道", "义安街道", "利国街道", "电厂街道", "拾屯街道", "铜山街道", "新区街道", "三堡街道", "何桥镇", "黄集镇", "马坡镇", "郑集镇", "柳新镇", "刘集镇", "大彭镇", "汉王镇", "棠张镇", "张集镇", "房村镇", "伊庄镇", "单集镇", "利国镇", "大许镇", "茅村镇", "柳泉镇", "国营沿湖农场", "徐州高新技术产业开发区"], ["中阳里街道", "凤城街道", "孙楼街道", "首羡镇", "顺河镇", "常店镇", "欢口镇", "师寨镇", "华山镇", "梁寨镇", "范楼镇", "宋楼镇", "大沙河镇", "王沟镇", "赵庄镇", "大沙河林场"], ["沛城街道", "大屯街道", "汉源街道", "汉兴街道", "龙固镇", "杨屯镇", "胡寨镇", "魏庙镇", "五段镇", "张庄镇", "张寨镇", "敬安镇", "河口镇", "栖山镇", "鹿楼镇", "朱寨镇", "安国镇", "中煤集团大屯煤电（集团）公司", "沛县湖西农场管理委员会"], ["睢城街道", "金城街道", "睢河街道", "王集镇", "双沟镇", "岚山镇", "李集镇", "桃园镇", "官山镇", "高作镇", "沙集镇", "凌城镇", "邱集镇", "古邳镇", "姚集镇", "魏集镇", "梁集镇", "庆安镇", "经济开发区", "空港经济开发区"], ["新安街道", "北沟街道", "墨河街道", "唐店街道", "瓦窑镇", "港头镇", "合沟镇", "草桥镇", "窑湾镇", "棋盘镇", "马陵山镇", "新店镇", "邵店镇", "时集镇", "高流镇", "阿湖镇", "双塘镇", "经济开发区", "锡沂高新技术产业开发区", "马陵山风景名胜区"], ["东湖街道", "运河街道", "戴圩街道", "炮车街道", "邳城镇", "官湖镇", "四户镇", "宿羊山镇", "八义集镇", "土山镇", "碾庄镇", "港上镇", "邹庄镇", "占城镇", "新河镇", "八路镇", "铁富镇", "岔河镇", "陈楼镇", "邢楼镇", "戴庄镇", "车辐山镇", "燕子埠镇", "赵墩镇", "议堂镇", "邳城农场", "张楼农场", "江苏邳州经济开发区"]], [["雕庄街道", "青龙街道", "茶山街道", "红梅街道", "天宁街道", "兰陵街道", "郑陆镇"], ["五星街道", "永红街道", "北港街道", "西林街道", "南大街街道", "荷花池街道", "新闸街道", "邹区镇"], ["河海街道", "三井街道", "龙虎塘街道", "春江镇", "孟河镇", "新桥镇", "薛家镇", "罗溪镇", "西夏墅镇", "奔牛镇"], ["戚墅堰街道", "丁堰街道", "潞城街道", "湖塘镇", "牛塘镇", "洛阳镇", "遥观镇", "横林镇", "横山桥镇", "雪堰镇", "前黄镇", "礼嘉镇", "嘉泽镇", "湟里镇", "武进经济开发区", "高新区", "西太湖生态休闲区", "太湖旅游度假区管委会"], ["西城街道", "金城镇", "儒林镇", "直溪镇", "朱林镇", "薛埠镇", "指前镇", "开发区", "茅山旅游度假区"], ["昆仑街道", "溧城镇", "埭头镇", "上黄镇", "戴埠镇", "天目湖镇", "别桥镇", "上兴镇", "竹箦镇", "南渡镇", "社渚镇", "常州监狱", "溧阳监狱"]], [["横塘街道", "狮山街道", "枫桥街道", "镇湖街道", "浒墅关镇", "通安镇", "东渚镇", "浒墅关经济技术开发区", "苏州高新技术创业服务中心", "苏州科技城", "苏州高新区综合保税区"], ["长桥街道", "越溪街道", "郭巷街道", "横泾街道", "香山街道", "城南街道", "甪直镇", "木渎镇", "胥口镇", "东山镇", "光福镇", "金庭镇", "临湖镇", "江苏省太湖采石公司", "吴中区林场", "西山农业园区", "穹窿山风景区", "开发区", "国家苏州太湖旅游度假区"], ["元和街道", "太平街道", "黄桥街道", "北桥街道", "北河泾街道", "漕湖街道", "望亭镇", "黄埭镇", "渭塘镇", "阳澄湖镇", "开发区", "阳澄湖生态休闲旅游度假区", "苏州高铁新城"], ["双塔街道", "沧浪街道", "胥江街道", "吴门桥街道", "葑门街道", "友新街道", "观前街道", "平江街道", "苏锦街道", "娄门街道", "城北街道", "桃花坞街道", "石路街道", "金阊街道", "留园街道", "虎丘街道", "白洋湾街道"], ["太湖新城镇", "平望镇", "盛泽镇", "七都镇", "震泽镇", "桃源镇", "黎里镇", "吴江经济技术开发区", "东方丝绸市场"], ["虞山镇", "梅李镇", "海虞镇", "古里镇", "沙家浜镇", "支塘镇", "董浜镇", "辛庄镇", "尚湖镇", "虞山林场", "常熟经济技术开发区", "江苏省常熟高新技术产业开发区", "常熟虞山尚湖旅游度假区", "江苏常熟服装城管理委员会", "碧溪街道", "常熟昆承湖管理委员会", "常熟国家大学科技园", "东南街道"], ["杨舍镇", "塘桥镇", "金港镇", "锦丰镇", "乐余镇", "凤凰镇", "南丰镇", "大新镇", "张家港市现代农业示范园区", "张家港经济技术开发区", "张家港保税区", "张家港市市稻麦良种场", "张家港市畜禽良种场", "张家港市冶金工业园", "双山岛旅游度假区"], ["玉山镇", "巴城镇", "周市镇", "陆家镇", "花桥镇", "淀山湖镇", "张浦镇", "周庄镇", "千灯镇", "锦溪镇", "开发区"], ["城厢镇", "沙溪镇", "浏河镇", "浮桥镇", "璜泾镇", "双凤镇", "经济开发区", "科教新城"]], [["城东街道", "和平桥街道", "任港街道", "新城桥街道", "虹桥街道", "学田街道", "钟秀街道", "文峰街道", "观音山街道", "狼山镇街道", "南通崇川经济开发区"], ["永兴街道", "唐闸镇街道", "天生港镇街道", "秦灶街道", "陈桥街道", "幸福街道", "港闸开发区"], ["金沙街道", "兴东街道", "先锋街道", "金新街道", "西亭镇", "二甲镇", "东社镇", "三余镇", "十总镇", "石港镇", "刘桥镇", "平潮镇", "五接镇", "兴仁镇", "张芝山镇", "川姜镇", "环本农场"], ["海安镇", "城东镇", "曲塘镇", "李堡镇", "角斜镇", "大公镇", "雅周镇", "白甸镇", "南莫镇", "墩头镇", "海安县农场"], ["栟茶镇", "洋口镇", "苴镇", "长沙镇", "大豫镇", "掘港镇", "马塘镇", "丰利镇", "曹埠镇", "岔河镇", "双甸镇", "新店镇", "河口镇", "袁庄镇", "如东县经济开发区", "如东沿海经济开发区", "如东洋口港经济开发区", "如东东安科技园区", "如东沿海旅游经济开发区", "南通外向型农业开发区"], ["汇龙镇", "惠萍镇", "东海镇", "南阳镇", "海复镇", "合作镇", "王鲍镇", "吕四港镇", "启东经济开发区", "启东滨海工业园", "启东滨江化工园", "江苏吕四海洋经济开发区", "启隆生态科技产业园", "启东海工船舶工业园", "启东江海产业园", "圆陀角旅游度假区"], ["如城街道", "东陈镇", "丁堰镇", "白蒲镇", "下原镇", "九华镇", "石庄镇", "长江镇", "吴窑镇", "江安镇", "搬经镇", "磨头镇", "如皋市经济开发区", "如皋高新技术产业开发区", "南通市粮棉原种场", "如皋市蚕种场", "如皋市良种场", "如皋市种猪场", "如皋市农科所", "如皋市江滨医院", "如皋市中心沙水产养殖场", "如皋市九华水产养殖场"], ["常乐镇", "悦来镇", "四甲镇", "余东镇", "正余镇", "海永镇", "海门市经济技术开发区", "海门市永隆沙农场", "海门市大东农场", "海门市畜禽良种场", "海门市种羊场", "海门市包场渔场", "海门市长江芦荡养殖场", "海门市沿江渔场", "海门市三厂苗圃", "海门市农科所", "海门市财政局芦荡管理所", "江苏省国营江心沙农场", "海门市临江新区管理委员会", "海门港新区", "海门工业园区管理委员会", "海门高新区", "三厂工业园区"]], [["墟沟街道", "连云街道", "云山街道", "板桥街道", "连岛街道", "徐圩街道", "海州湾街道", "宿城街道", "高公岛街道", "前三岛乡", "连云港碱厂", "东辛农场"], ["朐阳街道", "新海街道", "云台街道", "新浦街道", "海州街道", "幸福路街道", "洪门街道", "宁海街道", "浦西街道", "新东街道", "新南街道", "路南街道", "锦屏镇", "新坝镇", "板浦镇", "浦南镇", "岗埠农场", "新浦经济开发区", "海州经济开发区"], ["青口镇", "柘汪镇", "石桥镇", "金山镇", "黑林镇", "厉庄镇", "海头镇", "塔山镇", "赣马镇", "班庄镇", "城头镇", "城西镇", "宋庄镇", "沙河镇", "墩尚镇", "沙河子园艺场", "赣榆海洋经济开发区", "赣榆经济开发区"], ["牛山街道", "石榴街道", "白塔埠镇", "黄川镇", "石梁河镇", "青湖镇", "温泉镇", "双店镇", "桃林镇", "洪庄镇", "安峰镇", "房山镇", "平明镇", "驼峰乡", "李埝乡", "山左口乡", "石湖乡", "曲阳乡", "张湾乡", "江苏东海经济开发区"], ["侍庄街道", "伊山镇", "杨集镇", "燕尾港镇", "同兴镇", "四队镇", "圩丰镇", "龙苴镇", "下车镇", "图河镇", "东王集镇", "小伊乡", "南岗乡", "五图河农场", "灌西盐场", "灌云经济开发区", "灌云临港产业区"], ["新安镇", "堆沟港镇", "田楼镇", "北陈集镇", "张店镇", "三口镇", "孟兴庄镇", "汤沟镇", "百禄镇", "新集镇", "李集乡"]], [["淮城镇", "平桥镇", "上河镇", "马甸镇", "朱桥镇", "溪河镇", "施河镇", "车桥镇", "泾口镇", "流均镇", "博里镇", "仇桥镇", "复兴镇", "苏嘴镇", "钦工镇", "顺河镇", "季桥镇", "席桥镇", "林集镇", "南闸镇", "建淮乡", "茭陵乡", "宋集乡", "城东乡", "三堡乡", "白马湖农场", "经济开发区", "淮安新材料产业园"], ["王营镇", "赵集镇", "吴城镇", "南陈集镇", "码头镇", "王兴镇", "棉花庄镇", "丁集镇", "五里镇", "徐溜镇", "渔沟镇", "吴集镇", "西宋集镇", "三树镇", "韩桥乡", "新渡乡", "老张集乡", "凌桥乡", "袁集乡", "刘老庄乡", "古寨乡", "淮安高新技术产业开发区"], ["城南街道", "清江街道", "浦楼街道", "闸口街道", "清安街道", "府前街道", "长西街道", "淮海街道", "长东街道", "柳树湾街道", "水渡口街道", "白鹭湖街道", "和平镇", "武墩镇", "盐河镇", "黄码乡", "宁连路"], ["高良涧街道", "朱坝街道", "黄集街道", "蒋坝镇", "岔河镇", "西顺河镇", "老子山镇", "三河镇", "东双沟镇", "洪泽经济开发区"], ["涟城镇", "高沟镇", "唐集镇", "保滩镇", "大东镇", "五港镇", "梁岔镇", "石湖镇", "朱码镇", "岔庙镇", "东胡集镇", "南集镇", "义兴镇", "成集镇", "红窑镇", "陈师镇", "前进镇", "徐集乡", "黄营乡", "杨口", "方渡", "南禄", "小李集工业园区管委会", "河网", "时码", "北集", "灰墩", "余圩", "浅集", "机场产业园区管委会", "麻垛农业开发区管委会", "经济开发区"], ["盱城街道", "太和街道", "古桑街道", "马坝镇", "官滩镇", "旧铺镇", "桂五镇", "管镇镇", "河桥镇", "鲍集镇", "黄花塘镇", "明祖陵镇", "铁佛镇", "淮河镇", "仇集镇", "观音寺镇", "天泉湖镇", "维桥乡", "穆店乡", "兴隆乡", "三河农场", "淮化集团"], ["黎城镇", "金南镇", "闵桥镇", "塔集镇", "前锋镇", "吕良镇", "陈桥镇", "金北镇", "戴楼镇", "银涂镇", "宝应湖农场", "复兴圩农场", "粮棉原种场", "金湖经济开发区"]], [["五星街道", "文峰街道", "先锋街道", "毓龙街道", "新洋街道", "大洋街道", "伍佑街道（城南新区）", "黄海街道（城南新区）", "新河街道（城南新区）", "南洋镇", "新兴镇", "便仓镇", "盐东镇", "黄尖镇", "亭湖新区", "环保产业园"], ["张庄街道", "盐龙街道", "潘黄街道", "滨湖街道", "北龙港街道", "中兴街道", "葛武街道", "北蒋街道", "鞍湖街道", "冈中街道", "盐渎街道", "新都街道（城南新区）", "大纵湖镇", "楼王镇", "学富镇", "尚庄镇", "秦南镇", "龙冈镇", "郭猛镇", "大冈镇", "农村经济开发区"], ["大中镇", "草堰镇", "白驹镇", "刘庄镇", "西团镇", "小海镇", "大桥镇", "草庙镇", "万盈镇", "南阳镇", "新丰镇", "三龙镇", "大中农场", "方强农场", "东坝头农场", "大丰经济开发区管委会", "大丰港经济开发区管委会", "大丰常州高新区管委会"], ["响水镇", "陈家港镇", "小尖镇", "黄圩镇", "大有镇", "双港镇", "南河镇", "运河镇", "县开发区", "省属黄海农场", "省属灌东盐场"], ["东坎镇", "五汛镇", "蔡桥镇", "正红镇", "通榆镇", "界牌镇", "八巨镇", "八滩镇", "滨淮镇", "天场镇", "陈涛镇", "滨海港镇", "滨淮农场", "新滩盐场", "开发区工业园", "开发区沿海工业园", "滨海港经济区", "滨海县现代农业产业园区"], ["阜城街道", "吴滩街道", "花园街道办事处（开", "金沙湖街道", "沟墩镇", "陈良镇", "三灶镇", "郭墅镇（澳洋工业园）", "新沟镇", "陈集镇", "羊寨镇", "芦蒲镇", "板湖镇", "东沟镇", "益林镇", "古河镇", "罗桥镇", "现代服务业园区"], ["合德镇", "临海镇", "千秋镇", "四明镇", "海河镇", "海通镇", "兴桥镇", "新坍镇", "长荡镇", "盘湾镇", "特庸镇", "洋马镇", "黄沙港镇", "县经济开发区", "淮海农场", "临海农场", "新洋农场", "盐场", "射阳港经济区"], ["近湖街道", "塘河街道（城南新区）", "开发区（钟庄街道）", "建阳镇", "九龙口镇", "恒济镇", "颜单镇", "沿河镇", "芦沟镇", "庆丰镇", "上冈镇", "冈西镇", "宝塔镇", "高作镇", "高新技术经济区"], ["溱东镇", "时堰镇", "五烈镇", "梁垛镇", "安丰镇", "南沈灶镇", "富安镇", "唐洋镇", "新街镇", "许河镇", "三仓镇", "头灶镇", "弶港镇", "东台镇", "江苏省新曹农场", "江苏省农垦弶港农场", "开发区", "沿海经济区", "城东新区", "西溪景区"]], [["东关街道", "汶河街道", "文峰街道", "曲江街道", "李典镇", "沙头镇", "头桥镇", "湾头镇", "汤汪乡", "产业园", "扬州市生态科技新城杭集镇", "扬州市生态科技新城泰安镇"], ["邗上街道", "蒋王街道", "汊河街道", "双桥街道", "梅岭街道", "甘泉街道", "新盛街道", "竹西街道", "瘦西湖街道", "公道镇", "方巷镇", "槐泗镇", "瓜洲镇", "杨寿镇", "杨庙镇", "西湖镇", "双桥乡", "平山乡", "城北乡", "江苏省扬州高新技术产业开发区", "维扬经济开发区", "物流园区"], ["仙女镇", "小纪镇", "武坚镇", "樊川镇", "真武镇", "宜陵镇", "丁沟镇", "郭村镇", "邵伯镇", "丁伙镇", "大桥镇", "吴桥镇", "浦头镇", "立新农场"], ["安宜镇", "氾水镇", "夏集镇", "柳堡镇", "射阳湖镇", "广洋湖镇", "鲁垛镇", "小官庄镇", "望直港镇", "曹甸镇", "西安丰镇", "山阳镇", "黄塍镇", "泾河镇", "开发区管委会"], ["真州镇", "新集镇", "新城镇", "马集镇", "刘集镇", "陈集镇", "大仪镇", "月塘镇", "青山镇", "原种场", "蚕种场", "园艺试验场", "水产试验场", "捺山茶场", "汽车工业园", "十二圩", "铜山", "开发区", "化学工业园区"], ["高邮街道", "龙虬镇", "汤庄镇", "卸甲镇", "三垛镇", "甘垛镇", "界首镇", "周山镇", "临泽镇", "送桥镇", "菱塘回族乡", "城南经济新区（车逻镇）", "经济开发区（马棚街道）", "菱塘光电科技园"]], [["正东路街道", "健康路街道", "大市口街道", "四牌楼街道", "象山街道", "谏壁街道", "京口工业园区", "共青团农场"], ["宝塔路街道", "和平路街道", "金山街道", "七里甸街道", "蒋乔街道", "官塘桥街道", "韦岗街道", "南山街道", "工业园区管委会"], ["高资街道", "高桥镇", "辛丰镇", "谷阳镇", "上党镇", "宝堰镇", "世业镇", "宜城街道", "江心洲生态农业园区", "荣炳盐资源区", "高新园区管委会"], ["云阳街道", "曲阿街道", "司徒镇", "延陵镇", "珥陵镇", "导墅镇", "皇塘镇", "吕城镇", "陵口镇", "访仙镇", "界牌镇", "丹北镇"], ["三茅街道", "新坝镇", "油坊镇", "八桥镇", "西来桥镇", "经济开发区"], ["华阳街道", "下蜀镇", "白兔镇", "边城镇", "茅山镇", "后白镇", "郭庄镇", "天王镇", "宝华镇", "开发区", "茅山管委会", "赤山湖管委会"]], [["城东街道", "城西街道", "城南街道", "城中街道", "城北街道", "京泰路街道", "红旗街道", "九龙镇", "罡杨镇", "苏陈镇", "城北物流园区", "海陵工业园区", "农业示范园区", "火车站街区"], ["口岸街道", "刁铺街道", "许庄街道", "永安洲镇", "白马镇", "胡庄镇", "大泗镇", "泰州市高港区科技创业园管理委员会"], ["罗塘街道", "三水街道", "溱潼镇", "蒋垛镇", "顾高镇", "大伦镇", "张甸镇", "梁徐镇", "桥头镇", "淤溪镇", "白米镇", "娄庄镇", "沈高镇", "兴泰镇", "俞垛镇", "华港镇", "溱湖风景区", "林场", "种猪场", "林业站", "渔业社"], ["戴窑镇", "合陈镇", "永丰镇", "新垛镇", "安丰镇", "海南镇", "钓鱼镇", "大邹镇", "沙沟镇", "中堡镇", "李中镇", "西郊镇", "临城镇", "垛田镇", "竹泓镇", "沈沦镇", "大垛镇", "荻垛镇", "陶庄镇", "昌荣镇", "茅山镇", "周庄镇", "陈堡镇", "戴南镇", "张郭镇", "昭阳镇", "大营镇", "下圩镇", "城东镇", "老圩乡", "周奋乡", "缸顾乡", "西鲍乡", "林湖乡", "开发区", "良种场"], ["靖城街道办", "新桥镇", "东兴镇", "斜桥镇", "西来镇", "季市镇", "孤山镇", "生祠镇", "马桥镇", "城南", "新港城", "城北园区", "江阴园区", "滨江新城"], ["济川街道", "黄桥镇", "分界镇", "古溪镇", "元竹镇", "珊瑚镇", "广陵镇", "曲霞镇", "张桥镇", "河失镇", "新街镇", "姚王镇", "宣堡镇", "滨江镇", "虹桥镇", "根思乡", "市农科所"]], [["幸福街道", "项里街道", "河滨街道", "古城街道", "双庄镇", "耿车镇", "埠子镇", "龙河镇", "洋北镇", "中扬镇", "陈集镇", "蔡集镇", "王官集镇", "洋河镇", "仓集镇", "郑楼镇", "罗圩乡", "屠园乡", "宿城开发区", "苏州宿迁工业园"], ["顺河街道", "豫新街道", "下相街道", "仰化镇", "大兴镇", "丁嘴镇", "来龙镇", "陆集镇", "关庙镇", "侍岭镇", "新庄镇", "晓店镇", "皂河镇", "黄墩镇", "曹集乡", "保安乡", "井头乡", "宿豫经济开发区", "宿迁生态化工科技产业园", "张家港宿豫工业园", "嶂山林场", "宿迁市软件与服务外包产业园"], null, ["众兴镇", "爱园镇", "王集镇", "裴圩镇", "新袁镇", "李口镇", "临河镇", "穿城镇", "张家圩镇", "高渡镇", "卢集镇", "庄圩乡", "里仁乡", "三庄乡", "南刘集乡", "八集乡", "棉花原种场", "泗阳农场", "江苏泗阳开发区"], ["青阳镇", "双沟镇", "上塘镇", "魏营镇", "临淮镇", "半城镇", "孙园镇", "梅花镇", "归仁镇", "金锁镇", "朱湖镇", "界集镇", "太平镇", "龙集镇", "四河乡", "峰山乡", "天岗湖乡", "车门乡", "瑶沟乡", "石集乡", "城头乡", "陈圩乡", "曹庙乡", "五里江农场", "洪泽湖农场", "泗洪经济开发区"]]], [[["清波街道", "湖滨街道", "小营街道", "南星街道", "紫阳街道", "望江街道"], ["长庆街道", "武林街道", "天水街道", "潮鸣街道", "朝晖街道", "文晖街道", "东新街道", "石桥街道"], ["凯旋街道", "采荷街道", "闸弄口街道", "四季青街道", "白杨街道", "下沙街道", "彭埠街道", "笕桥街道", "丁兰街道", "九堡街道"], ["米市巷街道", "湖墅街道", "小河街道", "和睦街道", "拱宸桥街道", "大关街道", "上塘街道", "祥符街道", "康桥街道", "半山街道"], ["北山街道", "西溪街道", "翠苑街道", "古荡街道", "西湖街道", "留下街道", "转塘街道", "蒋村街道", "灵隐街道", "文新街道", "三墩镇", "双浦镇"], ["西兴街道", "长河街道", "浦沿街道"], ["城厢街道", "北干街道", "蜀山街道", "新塘街道", "靖江街道", "南阳街道", "义蓬街道", "河庄街道", "新湾街道", "临江街道", "前进街道", "闻堰街道", "宁围街道", "新街街道", "楼塔镇", "河上镇", "戴村镇", "浦阳镇", "进化镇", "临浦镇", "义桥镇", "所前镇", "衙前镇", "瓜沥镇", "益农镇", "党湾镇", "萧山经济技术开发区", "萧山商业城", "围垦区", "红山农场", "萧山钱江世纪城"], ["临平街道", "南苑街道", "东湖街道", "星桥街道", "五常街道", "乔司街道", "运河街道", "崇贤街道", "仁和街道", "良渚街道", "闲林街道", "仓前街道", "余杭街道", "中泰街道", "塘栖镇", "径山镇", "瓶窑镇", "鸬鸟镇", "百丈镇", "黄湖镇"], ["富春街道", "春江街道", "鹿山街道", "东洲街道", "银湖街道", "万市镇", "洞桥镇", "渌渚镇", "永昌镇", "里山镇", "常绿镇", "场口镇", "常安镇", "龙门镇", "新登镇", "胥口镇", "大源镇", "灵桥镇", "新桐乡", "上官乡", "环山乡", "湖源乡", "春建乡", "渔山乡"], ["旧县街道", "桐君街道", "城南街道", "凤川街道", "富春江镇", "横村镇", "分水镇", "瑶琳镇", "百江镇", "江南镇", "莪山畲族乡", "钟山乡", "新合乡", "合村乡"], ["千岛湖镇", "文昌镇", "石林镇", "临岐镇", "威坪镇", "姜家镇", "梓桐镇", "汾口镇", "中洲镇", "大墅镇", "枫树岭镇", "里商乡", "金峰乡", "富文乡", "左口乡", "屏门乡", "瑶山乡", "王阜乡", "宋村乡", "鸠坑乡", "浪川乡", "界首乡", "安阳乡"], ["新安江街道", "洋溪街道", "更楼街道", "莲花镇", "乾潭镇", "梅城镇", "杨村桥镇", "下涯镇", "大洋镇", "三都镇", "寿昌镇", "航头镇", "大慈岩镇", "大同镇", "李家镇", "钦堂乡"], ["玲珑街道", "锦南街道", "锦城街道", "锦北街道", "青山湖街道", "高虹镇", "太湖源镇", "於潜镇", "太阳镇", "潜川镇", "昌化镇", "河桥镇", "湍口镇", "清凉峰镇", "岛石镇", "板桥镇", "天目山镇", "龙岗镇"]], [["南门街道", "江厦街道", "西门街道", "月湖街道", "鼓楼街道", "白云街道", "段塘街道", "望春街道"], ["百丈街道", "东胜街道", "明楼街道", "白鹤街道", "东柳街道", "东郊街道", "福明街道", "新明街道"], ["中马街道", "白沙街道", "孔浦街道", "文教街道", "甬江街道", "庄桥街道", "洪塘街道", "慈城镇"], ["大榭街道", "新碶街道", "小港街道", "大碶街道", "霞浦街道", "柴桥街道", "戚家山街道", "春晓街道", "梅山街道", "郭巨街道", "白峰街道", "保税区"], ["招宝山街道", "蛟川街道", "骆驼街道", "庄市街道", "贵驷街道", "澥浦镇", "九龙湖镇"], ["下应街道", "钟公庙街道", "石碶街道", "梅墟街道", "中河街道", "首南街道", "潘火街道", "瞻岐镇", "咸祥镇", "塘溪镇", "东钱湖镇", "东吴镇", "五乡镇", "邱隘镇", "云龙镇", "横溪镇", "姜山镇", "高桥镇", "横街镇", "集士港镇", "古林镇", "洞桥镇", "鄞江镇", "章水镇", "龙观乡"], ["丹东街道", "丹西街道", "爵溪街道", "石浦镇", "西周镇", "鹤浦镇", "贤庠镇", "墙头镇", "泗洲头镇", "定塘镇", "涂茨镇", "大徐镇", "新桥镇", "东陈乡", "晓塘乡", "黄避岙乡", "茅洋乡", "高塘岛乡"], ["跃龙街道", "桃源街道", "梅林街道", "桥头胡街道", "长街镇", "力洋镇", "一市镇", "岔路镇", "前童镇", "桑洲镇", "黄坛镇", "大佳何镇", "强蛟镇", "西店镇", "深甽镇", "胡陈乡", "茶院乡", "越溪乡"], ["梨洲街道", "凤山街道", "兰江街道", "阳明街道", "低塘街道", "朗霞街道", "临山镇", "黄家埠镇", "小曹娥镇", "泗门镇", "马渚镇", "牟山镇", "丈亭镇", "三七市镇", "河姆渡镇", "大隐镇", "陆埠镇", "梁弄镇", "大岚镇", "四明山镇", "鹿亭乡"], ["宗汉街道", "坎墩街道", "浒山街道", "白沙路街道", "古塘街道", "掌起镇", "观海卫镇", "附海镇", "桥头镇", "匡堰镇", "逍林镇", "新浦镇", "胜山镇", "横河镇", "崇寿镇", "庵东镇", "长河镇", "周巷镇", "龙山镇", "慈溪市农垦场", "慈溪市林场", "慈东工业区"]], [["五马街道", "七都街道", "滨江街道", "南汇街道", "松台街道", "双屿街道", "仰义街道", "大南街道", "蒲鞋市街道", "南郊街道", "广化街道", "丰门街道", "藤桥镇", "山福镇"], ["永中街道", "蒲州街道", "海滨街道", "永兴街道", "状元街道", "瑶溪街道"], ["景山街道", "梧田街道", "南白象街道", "茶山街道", "娄桥街道", "新桥街道", "三垟街道", "瞿溪街道", "郭溪街道", "潘桥街道", "丽岙街道", "仙岩街道", "泽雅镇"], ["北岙街道", "灵昆街道", "东屏街道", "元觉街道", "霓屿街道", "大门镇", "鹿西乡"], ["东城街道", "北城街道", "南城街道", "三江街道", "黄田街道", "乌牛街道", "瓯北街道", "桥头镇", "桥下镇", "大若岩镇", "碧莲镇", "巽宅镇", "岩头镇", "枫林镇", "岩坦镇", "沙头镇", "鹤盛镇", "金溪镇", "云岭乡", "茗岙乡", "溪下乡", "界坑乡", "县特产场场区", "四海山林场", "正江山林场"], ["昆阳镇", "鳌江镇", "水头镇", "萧江镇", "腾蛟镇", "山门镇", "顺溪镇", "南雁镇", "万全镇", "海西镇", "南麂镇", "麻步镇", "凤卧镇", "怀溪镇", "青街畲族乡", "闹村乡", "滨海新区"], ["灵溪镇", "龙港镇", "宜山镇", "钱库镇", "金乡镇", "藻溪镇", "桥墩镇", "矾山镇", "赤溪镇", "马站镇", "望里镇", "炎亭镇", "大渔镇", "莒溪镇", "南宋镇", "霞关镇", "沿浦镇", "凤阳畲族乡", "岱岭畲族乡"], ["大峃镇", "百丈漈镇", "南田镇", "西坑畲族镇", "黄坦镇", "珊溪镇", "巨屿镇", "玉壶镇", "峃口镇", "周壤镇", "铜铃山镇", "二源镇", "周山畲族乡", "桂山乡", "双桂乡", "平和乡", "公阳乡"], ["罗阳镇", "司前畲族镇", "百丈镇", "筱村镇", "泗溪镇", "彭溪镇", "雅阳镇", "仕阳镇", "三魁镇", "竹里畲族乡", "乌岩岭自然保护区"], ["安阳街道", "玉海街道", "锦湖街道", "东山街道", "上望街道", "莘塍街道", "汀田街道", "飞云街道", "仙降街道", "南滨街道", "潘岱街道", "云周街道", "塘下镇", "马屿镇", "陶山镇", "湖岭镇", "高楼镇", "桐浦镇", "林川镇", "曹村镇", "平阳坑镇", "芳庄乡", "北麂乡"], ["城东街道", "乐成街道", "城南街道", "盐盆街道", "翁垟街道", "白石街道", "石帆街道", "天成街道", "大荆镇", "仙溪镇", "雁荡镇", "芙蓉镇", "清江镇", "虹桥镇", "淡溪镇", "柳市镇", "北白象镇", "湖雾镇", "南塘镇", "南岳镇", "蒲岐镇", "磐石镇", "智仁乡", "龙西乡", "岭底乡"]], [["建设街道", "解放街道", "新嘉街道", "南湖街道", "新兴街道", "城南街道", "东栅街道", "长水街道", "七星街道", "凤桥镇", "余新镇", "新丰镇", "大桥镇"], ["新城街道", "嘉北街道", "塘汇街道", "高照街道", "王江泾镇", "油车港镇", "新塍镇", "王店镇", "洪合镇"], ["魏塘街道", "罗星街道", "惠民街道", "大云镇", "西塘镇", "干窑镇", "陶庄镇", "姚庄镇", "天凝镇"], ["武原街道", "西塘桥街道", "元通街道", "秦山街道", "沈荡镇", "百步镇", "于城镇", "澉浦镇", "通元镇"], ["硖石街道", "海洲街道", "海昌街道", "马桥街道", "许村镇", "长安镇", "周王庙镇", "丁桥镇", "斜桥镇", "黄湾镇", "盐官镇", "袁花镇"], ["当湖街道", "钟埭街道", "曹桥街道", "乍浦镇", "新埭镇", "新仓镇", "广陈镇", "林埭镇", "独山港镇"], ["梧桐街道", "龙翔街道", "凤鸣街道", "乌镇镇", "濮院镇", "屠甸镇", "石门镇", "河山镇", "洲泉镇", "大麻镇", "崇福镇", "高桥镇"]], [["月河街道", "朝阳街道", "爱山街道", "飞英街道", "龙泉街道", "凤凰街道", "康山街道", "仁皇山街道", "滨湖街道", "龙溪街道", "杨家埠街道", "环渚街道", "织里镇", "八里店镇", "妙西镇", "埭溪镇", "东林镇", "道场乡"], ["南浔镇", "双林镇", "练市镇", "善琏镇", "旧馆镇", "菱湖镇", "和孚镇", "千金镇", "石淙镇"], ["武康街道", "舞阳街道", "阜溪街道", "下渚湖街道", "乾元镇", "新市镇", "洛舍镇", "钟管镇", "雷甸镇", "禹越镇", "新安镇", "莫干山镇"], ["雉城街道", "画溪街道", "太湖街道", "龙山街道", "洪桥镇", "李家巷镇", "夹浦镇", "林城镇", "虹星桥镇", "小浦镇", "和平镇", "泗安镇", "煤山镇", "水口乡", "吕山乡"], ["递铺街道", "昌硕街道", "灵峰街道", "孝源街道", "鄣吴镇", "杭垓镇", "孝丰镇", "报福镇", "章村镇", "天荒坪镇", "梅溪镇", "天子湖镇", "溪龙乡", "上墅乡", "山川乡"]], [["塔山街道", "府山街道", "蕺山街道", "北海街道", "城南街道", "稽山街道", "迪荡街道", "东湖镇", "灵芝镇", "东浦镇", "鉴湖镇", "皋埠镇", "马山镇", "斗门镇", "孙端镇", "富盛镇", "陶堰镇"], ["柯桥街道", "柯岩街道", "华舍街道", "湖塘街道", "齐贤镇", "钱清镇", "福全镇", "马鞍镇", "平水镇", "安昌镇", "王坛镇", "兰亭镇", "稽东镇", "杨汛桥镇", "漓渚镇", "夏履镇"], ["百官街道", "曹娥街道", "东关街道", "道墟镇", "长塘镇", "上浦镇", "汤浦镇", "章镇镇", "下管镇", "丰惠镇", "永和镇", "梁湖镇", "驿亭镇", "小越镇", "谢塘镇", "盖北镇", "崧厦镇", "沥海镇", "岭南乡", "陈溪乡", "丁宅乡"], ["羽林街道", "南明街道", "七星街道", "澄潭镇", "梅渚镇", "回山镇", "大市聚镇", "小将镇", "沙溪镇", "镜岭镇", "儒岙镇", "城南乡", "东茗乡", "双彩乡", "新林乡", "巧英乡"], ["暨阳街道", "浣东街道", "陶朱街道", "大唐镇", "应店街镇", "次坞镇", "店口镇", "阮市镇", "直埠镇", "江藻镇", "山下湖镇", "枫桥镇", "赵家镇", "马剑镇", "五泄镇", "草塔镇", "王家井镇", "牌头镇", "同山镇", "安华镇", "街亭镇", "璜山镇", "陈宅镇", "岭北镇", "浬浦镇", "东白湖镇", "东和乡"], ["剡湖街道", "三江街道", "鹿山街道", "浦口街道", "甘霖镇", "长乐镇", "崇仁镇", "黄泽镇", "三界镇", "石璜镇", "谷来镇", "仙岩镇", "金庭镇", "北漳镇", "下王镇", "贵门乡", "里南乡", "竹溪乡", "雅璜乡", "王院乡", "通源乡", "嵊州经济开发区"]], [["城东街道", "城中街道", "城西街道", "城北街道", "江南街道", "三江街道", "西关街道", "秋滨街道", "新狮街道", "罗店镇", "雅畈镇", "安地镇", "白龙桥镇", "琅琊镇", "蒋堂镇", "汤溪镇", "罗埠镇", "洋埠镇", "乾西乡", "竹马乡", "长山乡", "箬阳乡", "沙畈乡", "塔石乡", "岭上乡", "莘畈乡", "苏孟乡"], ["多湖街道", "东孝街道", "孝顺镇", "傅村镇", "曹宅镇", "澧浦镇", "岭下镇", "江东镇", "塘雅镇", "赤松镇", "源东乡"], ["白洋街道", "壶山街道", "熟溪街道", "柳城畲族镇", "履坦镇", "桐琴镇", "泉溪镇", "新宅镇", "王宅镇", "桃溪镇", "茭道镇", "大田乡", "白姆乡", "俞源乡", "坦洪乡", "西联乡", "三港乡", "大溪口乡"], ["浦南街道", "仙华街道", "浦阳街道", "黄宅镇", "白马镇", "郑家坞镇", "郑宅镇", "岩头镇", "檀溪镇", "杭坪镇", "大畈乡", "中余乡", "前吴乡", "花桥乡", "虞宅乡"], ["安文镇", "新渥镇", "尖山镇", "仁川镇", "大盘镇", "方前镇", "玉山镇", "尚湖镇", "冷水镇", "深泽乡", "双峰乡", "双溪乡", "窈川乡", "盘峰乡", "高二乡", "维新乡", "胡宅乡", "万苍乡", "九和乡"], ["兰江街道", "云山街道", "永昌街道", "赤溪街道", "女埠街道", "上华街道", "游埠镇", "诸葛镇", "黄店镇", "香溪镇", "马涧镇", "梅江镇", "横溪镇", "灵洞乡", "水亭畲族乡", "柏社乡"], ["稠城街道", "江东街道", "稠江街道", "北苑街道", "后宅街道", "城西街道", "廿三里街道", "福田街道", "佛堂镇", "赤岸镇", "义亭镇", "上溪镇", "苏溪镇", "大陈镇"], ["吴宁街道", "南市街道", "白云街道", "江北街道", "城东街道", "六石街道", "巍山镇", "虎鹿镇", "歌山镇", "佐村镇", "东阳江镇", "湖溪镇", "马宅镇", "千祥镇", "南马镇", "画水镇", "横店镇", "三单乡"], ["东城街道", "西城街道", "江南街道", "石柱镇", "前仓镇", "舟山镇", "古山镇", "方岩镇", "龙山镇", "西溪镇", "象珠镇", "唐先镇", "花街镇", "芝英镇"]], [["新新街道", "府山街道", "荷花街道", "信安街道", "白云街道", "双港街道", "衢化街道", "花园街道", "石梁镇", "航埠镇", "黄家乡", "七里乡", "九华乡", "沟溪乡", "华墅乡", "姜家山乡", "万田乡", "石室乡"], ["樟潭街道", "浮石街道", "上方镇", "峡川镇", "莲花镇", "全旺镇", "大洲镇", "后溪镇", "廿里镇", "湖南镇", "高家镇", "杜泽镇", "灰坪乡", "太真乡", "双桥乡", "周家乡", "云溪乡", "举村乡", "岭洋乡", "黄坛口乡"], ["天马街道", "紫港街道", "金川街道", "白石镇", "招贤镇", "青石镇", "球川镇", "辉埠镇", "芳村镇", "何家乡", "同弓乡", "大桥头乡", "新昌乡", "东案乡"], ["桐村镇", "杨林镇", "苏庄镇", "齐溪镇", "村头镇", "华埠镇", "马金镇", "池淮镇", "中村乡", "长虹乡", "何田乡", "林山乡", "音坑乡", "大溪边乡"], ["龙洲街道", "东华街道", "湖镇镇", "小南海镇", "詹家镇", "溪口镇", "横山镇", "塔石镇", "罗家乡", "庙下乡", "石佛乡", "社阳乡", "大街乡", "沐尘畲族乡", "模环乡"], ["双塔街道", "虎山街道", "四都镇", "清湖镇", "坛石镇", "大桥镇", "新塘边镇", "廿八都镇", "长台镇", "上余镇", "凤林镇", "峡口镇", "石门镇", "贺村镇", "大陈乡", "碗窑乡", "保安乡", "塘源口乡", "张村乡"]], [["昌国街道", "环南街道", "城东街道", "盐仓街道", "临城街道", "岑港街道", "马岙街道", "双桥街道", "小沙街道", "金塘镇", "白泉镇", "干览镇"], ["沈家门街道", "东港街道", "朱家尖街道", "展茅街道", "六横镇", "虾峙镇", "桃花镇", "东极镇", "普陀山镇"], ["高亭镇", "东沙镇", "岱东镇", "岱西镇", "长涂镇", "衢山镇", "秀山乡"], ["菜园镇", "嵊山镇", "洋山镇", "五龙乡", "黄龙乡", "枸杞乡", "花鸟乡"]], [["海门街道", "白云街道", "葭沚街道", "洪家街道", "三甲街道", "下陈街道", "前所街道", "章安街道", "大陈镇", "椒江农场", "滨海工业区", "月湖新城"], ["东城街道", "南城街道", "西城街道", "北城街道", "新前街道", "澄江街道", "江口街道", "高桥街道", "宁溪镇", "北洋镇", "头陀镇", "院桥镇", "沙埠镇", "屿头乡", "上郑乡", "富山乡", "茅畲乡", "上垟乡", "平田乡"], ["路南街道", "路桥街道", "路北街道", "螺洋街道", "桐屿街道", "峰江街道", "新桥镇", "横街镇", "金清镇", "蓬街镇", "滨海工业城", "滨海新区"], ["玉城街道", "坎门街道", "大麦屿街道", "清港镇", "楚门镇", "干江镇", "沙门镇", "芦浦镇", "龙溪镇", "鸡山乡", "海山乡", "玉环经济开发区"], ["海游街道", "海润街道", "沙柳街道", "珠岙镇", "亭旁镇", "健跳镇", "横渡镇", "浦坝港镇", "花桥镇", "蛇蟠乡"], ["赤城街道", "始丰街道", "福溪街道", "白鹤镇", "石梁镇", "街头镇", "平桥镇", "坦头镇", "三合镇", "洪畴镇", "三州乡", "龙溪乡", "雷峰乡", "南屏乡", "泳溪乡"], ["安洲街道", "南峰街道", "福应街道", "横溪镇", "埠头镇", "白塔镇", "田市镇", "官路镇", "下各镇", "朱溪镇", "安岭乡", "溪港乡", "湫山乡", "淡竹乡", "皤滩乡", "上张乡", "步路乡", "广度乡", "大战乡", "双庙乡"], ["太平街道", "城东街道", "城西街道", "城北街道", "横峰街道", "泽国镇", "大溪镇", "松门镇", "箬横镇", "新河镇", "石塘镇", "滨海镇", "温峤镇", "城南镇", "石桥头镇", "坞根镇", "东部新区"], ["古城街道", "大洋街道", "江南街道", "大田街道", "邵家渡街道", "汛桥镇", "东塍镇", "汇溪镇", "小芝镇", "河头镇", "白水洋镇", "括苍镇", "永丰镇", "尤溪镇", "涌泉镇", "沿江镇", "杜桥镇", "上盘镇", "桃渚镇"]], [["紫金街道", "岩泉街道", "万象街道", "白云街道", "联城街道", "南明山街道", "碧湖镇", "大港头镇", "老竹畲族镇", "雅溪镇", "太平乡", "仙渡乡", "峰源乡", "丽新畲族乡", "黄村乡"], ["鹤城街道", "瓯南街道", "油竹街道", "温溪镇", "东源镇", "高湖镇", "船寮镇", "海口镇", "腊口镇", "北山镇", "山口镇", "仁庄镇", "万山乡", "黄垟乡", "季宅乡", "高市乡", "海溪乡", "章村乡", "祯旺乡", "祯埠乡", "舒桥乡", "巨浦乡", "万阜乡", "方山乡", "汤垟乡", "贵岙乡", "小舟山乡", "吴坑乡", "仁宫乡", "章旦乡", "阜山乡", "石溪乡"], ["五云街道", "新碧街道", "仙都街道", "壶镇镇", "新建镇", "舒洪镇", "大洋镇", "东渡镇", "东方镇", "大源镇", "七里乡", "前路乡", "三溪乡", "溶江乡", "双溪口乡", "胡源乡", "方溪乡", "石笕乡"], ["妙高街道", "云峰街道", "新路湾镇", "北界镇", "金竹镇", "大柘镇", "石练镇", "王村口镇", "黄沙腰镇", "三仁畲族乡", "濂竹乡", "应村乡", "高坪乡", "湖山乡", "蔡源乡", "焦滩乡", "龙洋乡", "柘岱口乡", "西畈乡", "垵口乡"], ["西屏街道", "水南街道", "望松街道", "古市镇", "玉岩镇", "象溪镇", "大东坝镇", "新兴镇", "叶村乡", "斋坛乡", "三都乡", "竹源乡", "四都乡", "赤寿乡", "樟溪乡", "枫坪乡", "板桥畲族乡", "裕溪乡", "安民乡"], ["浮云街道", "元和街道", "白龙山街道", "凤凰山街道", "崇头镇", "石塘镇", "紧水滩镇", "雾溪畲族乡", "安溪畲族乡", "赤石乡"], ["松源街道", "濛洲街道", "屏都街道", "黄田镇", "竹口镇", "荷地镇", "左溪镇", "贤良镇", "百山祖镇", "岭头乡", "五大堡乡", "淤上乡", "安南乡", "张村乡", "隆宫乡", "举水乡", "江根乡", "龙溪乡", "官塘乡"], ["红星街道", "鹤溪街道", "渤海镇", "东坑镇", "英川镇", "沙湾镇", "大均乡", "澄照乡", "梅岐乡", "郑坑乡", "大漈乡", "景南乡", "雁溪乡", "鸬鹚乡", "梧桐乡", "标溪乡", "毛垟乡", "秋炉乡", "大地乡", "家地乡", "九龙乡"], ["龙渊街道", "西街街道", "剑池街道", "石达石街道", "八都镇", "上垟镇", "小梅镇", "查田镇", "安仁镇", "锦溪镇", "住龙镇", "屏南镇", "兰巨乡", "宝溪乡", "竹垟畲族乡", "道太乡", "岩樟乡", "城北乡", "龙南乡"]]], [[["明光路街道", "胜利路街道", "三里街街道", "铜陵路街道", "七里站街道", "红光街道", "和平路街道", "城东街道", "长淮街道", "方庙街道", "嘉山路街道", "大兴镇", "合肥龙岗综合经济开发区"], ["亳州路街道", "双岗街道", "杏林街道", "海棠街道", "杏花村街道", "逍遥津街道", "三孝口街道", "四里河街道", "大杨镇", "三十岗乡", "庐阳工业区（林店街道）"], ["三里庵街道", "稻香村街道", "琥珀街道", "南七街道", "西园街道", "五里墩街道", "荷叶地街道", "笔架山街道", "井岗镇", "南岗镇", "小庙镇", "蜀山新产业园区"], ["骆岗街道", "常青街道", "芜湖路街道", "包公街道", "望湖街道", "义城街道", "烟墩街道", "滨湖世纪社区", "方兴社区", "淝河镇", "大圩镇"], ["水湖镇", "庄墓镇", "杨庙镇", "吴山镇", "岗集镇", "双墩镇", "下塘镇", "朱巷镇", "罗塘乡", "义井乡", "陶楼乡", "造甲乡", "左店乡", "杜集乡", "双凤开发区", "安徽省水家湖农场"], ["店埠镇", "撮镇镇", "梁园镇", "桥头集镇", "长临河镇", "石塘镇", "古城镇", "八斗镇", "元疃镇", "白龙镇", "包公镇", "陈集镇", "众兴乡", "张集乡", "马湖乡", "响导乡", "杨店乡", "牌坊回族满族乡", "肥东新城开发区", "合肥循环经济示范园"], ["上派镇", "三河镇", "官亭镇", "山南镇", "花岗镇", "紫蓬镇", "桃花镇", "丰乐镇", "高店乡", "铭传乡", "柿树岗乡", "严店乡", "桃花工业园管委会", "紫蓬山管委会"], ["庐城镇", "冶父山镇", "万山镇", "汤池镇", "郭河镇", "金牛镇", "石头镇", "同大镇", "白山镇", "盛桥镇", "白湖镇", "龙桥镇", "矾山镇", "罗河镇", "泥河镇", "乐桥镇", "柯坦镇", "安徽庐江经济开发区"], ["中庙街道", "亚父街道", "卧牛山街道", "凤凰山街道", "天河街道", "半汤街道", "栏杆集镇", "苏湾镇", "柘皋镇", "银屏镇", "夏阁镇", "中垾镇", "散兵镇", "烔炀镇", "黄麓镇", "槐林镇", "坝镇镇", "庙岗乡"]], [["方村街道", "张家山公共服务中心", "赭麓公共服务中心", "滨江公共服务中心", "赭山公共服务中心", "弋矶山公共服务中心", "汀棠公共服务中心", "天门山公共服务中心", "大砻坊公共服务中心", "镜湖新城公共服务中心", "荆山公共服务中心"], ["弋江桥街道", "中山南路街道", "利民路街道", "马塘街道", "瀂港街道", "火龙街道", "白马街道", "南瑞社区公共服务委员会", "芜湖高新技术产业开发区"], ["四褐山街道", "裕溪口街道", "官陡街道", "湾里街道", "清水街道", "沈巷镇", "二坝镇", "汤沟镇", "白茆镇", "安徽省江北产业集中区", "安徽芜湖鸠江经济开发区"], ["三山街道", "保定街道", "龙湖街道", "峨桥镇", "安徽芜湖三山经济开发区"], ["湾沚镇", "六郎镇", "陶辛镇", "红杨镇", "花桥镇", "安徽新芜经济开发区"], ["繁阳镇", "荻港镇", "孙村镇", "平铺镇", "新港镇", "峨山镇", "横山公共服务中心"], ["籍山镇", "许镇镇", "弋江镇", "三里镇", "何湾镇", "工山镇", "烟墩镇", "家发镇", "安徽南陵工业园区"], ["无城镇", "襄安镇", "陡沟镇", "石涧镇", "严桥镇", "开城镇", "蜀山镇", "牛埠镇", "刘渡镇", "姚沟镇", "泥汊镇", "福渡镇", "泉塘镇", "赫店镇", "红庙镇", "高沟镇", "鹤毛乡", "十里墩乡", "昆山乡", "洪巷乡", "安徽无为经济开发区"]], [["东风街道", "延安街道", "治淮街道", "东升街道", "解放街道", "曹山街道", "长淮卫镇", "李楼乡"], ["天桥街道", "青年街道", "纬二路街道", "黄庄街道", "宏业村街道", "燕山乡", "雪华乡"], ["秦集镇", "马城镇", "禹会虚镇", "长青乡", "安徽怀远马城经济开发区"], ["淮滨社区", "明珠社区", "小蚌埠镇", "吴小街镇", "曹老集镇", "梅桥镇", "沫河口镇", "蚌埠工业园区", "沫河口工业园区"], ["榴城镇", "包集镇", "龙亢镇", "河溜镇", "常坟镇", "双桥集镇", "魏庄镇", "万福镇", "唐集镇", "白莲坡镇", "褚集镇", "古城镇", "荆山镇", "淝南乡", "淝河乡", "陈集乡", "徐圩乡", "兰桥乡", "龙亢农场", "经济开发区", "安徽怀远龙亢经济开发区"], ["城关镇", "新集镇", "小溪镇", "双忠庙镇", "小圩镇", "东刘集镇", "头铺镇", "大新镇", "武桥镇", "朱顶镇", "浍南镇", "申集镇", "沱湖乡", "临北回族乡", "城南工业园"], ["城关镇", "王庄镇", "新马桥镇", "连城镇", "刘集镇", "任桥镇", "湖沟镇", "濠城镇", "石湖乡", "杨庙乡", "仲兴乡", "固镇开发区"]], [["大通街道", "上窑镇", "洛河镇", "九龙岗镇", "孔店乡", "淮南经济开发区"], ["田东街道", "新淮街道", "国庆街道", "淮滨街道", "朝阳街道", "公园街道", "洞山街道", "龙泉街道", "泉山街道", "舜耕镇", "安成镇", "曹庵镇", "三和镇", "史院乡"], ["谢家集街道", "蔡家岗街道", "立新街道", "谢三村街道", "平山街道", "望峰岗镇", "李郢孜镇", "唐山镇", "杨公镇", "孙庙乡", "孤堆回族乡"], ["新庄孜街道", "土坝孜街道", "毕家岗街道", "八公山镇", "山王镇", "李冲回族乡", "妙山林场", "八公山开发区（虚镇）"], ["田集街道", "高皇镇", "平圩镇", "泥河镇", "潘集镇", "芦集镇", "架河镇", "夹沟镇", "祁集镇", "贺疃镇", "古沟回族乡"], ["城关镇", "新集镇", "朱马店镇", "岳张集镇", "顾桥镇", "毛集镇", "夏集镇", "桂集镇", "焦岗湖镇", "凤凰镇", "杨村镇", "丁集镇", "刘集镇", "古店乡", "钱庙乡", "尚塘乡", "关店乡", "大兴集乡"], ["寿春镇", "双桥镇", "涧沟镇", "丰庄镇", "正阳关镇", "迎河镇", "板桥镇", "安丰塘镇", "堰口镇", "保义镇", "隐贤镇", "安丰镇", "众兴镇", "茶庵镇", "三觉镇", "炎刘镇", "刘岗镇", "双庙集镇", "小甸镇", "瓦埠镇", "大顺镇", "窑口镇", "八公山乡", "张李乡", "陶店回族乡", "安徽寿县工业园区", "寿西湖农场", "正阳关农场"]], [["沙塘路街道", "解放路街道", "湖东路街道", "桃源路街道", "霍里街道", "金家庄街道", "塘西街道", "慈湖街道", "江东街道", "濮塘镇", "慈湖高新技术产业开发区"], ["平湖街道", "雨山街道", "安民街道", "采石街道", "向山镇", "银塘镇", "佳山乡", "雨山经济开发区", "市经济技术开发区"], ["博望镇", "丹阳镇", "新市镇", "博望高新技术产业开发区"], ["姑孰镇", "黄池镇", "乌溪镇", "石桥镇", "塘南镇", "护河镇", "太白镇", "年陡镇", "湖阳镇", "大陇乡", "江心乡", "当涂经济开发区", "当涂青山河高新技术产业园区", "当涂大青山李白文化旅游区", "当涂现代农业示范区"], ["环峰镇", "运漕镇", "铜闸镇", "陶厂镇", "林头镇", "清溪镇", "仙踪镇", "昭关镇", "安徽含山工业园区", "安徽含山经济开发区", "含山县褒禅山经济园区"], ["历阳镇", "白桥镇", "姥桥镇", "功桥镇", "西埠镇", "香泉镇", "乌江镇", "善厚镇", "石杨镇", "安徽和县经济开发区", "安徽精细化工产业有机合成基地", "安徽和县台湾农民创业园"]], [["高岳街道", "矿山集街道", "朔里镇", "石台镇", "段圆镇", "淮北杜集经济开发区"], ["相南街道", "东街道", "西街道", "三堤口街道", "东山街道", "人民路街道", "刘桥街道", "任圩街道", "南黎", "曲阳", "渠沟镇", "淮北凤凰山经济开发区"], ["杨庄街道", "临海童街道", "百善街道", "任楼街道", "烈山镇", "宋町镇", "古饶镇", "烈山区工业园"], ["濉溪镇", "韩村镇", "刘桥镇", "五沟镇", "临涣镇", "双堆集镇", "铁佛镇", "南坪镇", "百善镇", "孙町镇", "四铺镇", "濉溪县经济开发区", "濉溪县濉芜产业园"]], [["东郊", "西湖镇", "铜官区虚镇", "铜陵市经济开发区"], ["五松镇", "顺安镇", "钟鸣镇", "天门镇", "老洲乡", "东联乡", "西联乡", "胥坝乡", "循环经济园", "金桥经济开发区"], ["桥南", "安矿", "铜山镇", "大通镇", "郊区虚镇", "灰河乡", "两矿一公司专管办", "大桥经济开发区"], ["枞阳镇", "欧山镇", "汤沟镇", "老洲镇", "陈瑶湖镇", "周潭镇", "横埠镇", "项铺镇", "钱桥镇", "麒麟镇", "义津镇", "浮山镇", "会宫镇", "官埠桥镇", "铁铜乡", "凤仪乡", "长沙乡", "钱铺乡", "金社乡", "白梅乡", "白湖乡", "雨坛乡", "枞阳经济开发区"]], [["宜城路街道", "新河路街道", "华中路街道", "人民路街道", "孝肃路街道", "滨江街道", "龙狮桥乡", "长风乡", "新洲乡"], ["德宽路街道", "玉琳路街道", "龙山路街道", "菱湖街道", "集贤路街道", "石化路街道", "花亭路街道", "海口镇", "十里铺乡", "山口乡", "大观开发区", "安徽安庆海口经济开发区", "皖河农场"], ["大桥街道", "大龙山镇", "杨桥镇", "罗岭镇", "白泽湖乡", "五横乡"], ["高河镇", "石牌镇", "月山镇", "马庙镇", "金拱镇", "茶岭镇", "公岭镇", "黄墩镇", "三桥镇", "小市镇", "黄龙镇", "平山镇", "腊树镇", "洪铺镇", "江镇镇", "凉亭乡", "石镜乡", "秀山乡", "清河乡", "雷埠乡"], ["梅城镇", "源潭镇", "余井镇", "王河镇", "黄铺镇", "槎水镇", "水吼镇", "官庄镇", "黄泥镇", "黄柏镇", "天柱山镇", "塔畈乡", "油坝乡", "龙潭乡", "痘姆乡", "五庙乡", "开发区", "旅游度假区"], ["晋熙镇", "徐桥镇", "新仓镇", "小池镇", "寺前镇", "天华镇", "牛镇镇", "弥陀镇", "北中镇", "百里镇", "大石乡", "城西乡", "江塘乡", "汤泉乡", "刘畈乡", "经济开发区", "花凉亭水电站"], ["孚玉镇", "复兴镇", "汇口镇", "许岭镇", "下仓镇", "二郎镇", "破凉镇", "凉亭镇", "长铺镇", "高岭乡", "程岭乡", "九姑乡", "千岭乡", "洲头乡", "佐坝乡", "北浴乡", "陈汉乡", "隘口乡", "柳坪乡", "趾凤乡", "河塌乡", "五里乡", "九成监狱管理分局", "华阳河农场总场"], ["华阳镇", "杨湾镇", "漳湖镇", "赛口镇", "高士镇", "鸦滩镇", "长岭镇", "太慈镇", "凉泉乡", "雷池乡", "望江县经济开发区", "安徽望江桥港经济开发区"], ["天堂镇", "店前镇", "来榜镇", "菖蒲镇", "头陀镇", "白帽镇", "温泉镇", "响肠镇", "河图镇", "五河镇", "主簿镇", "冶溪镇", "黄尾镇", "毛尖山乡", "莲云乡", "青天乡", "包家乡", "古坊乡", "田头乡", "中关乡", "石关乡", "姚河乡", "和平乡", "巍岭乡", "安徽岳西县经济开发区"], ["龙腾街道", "文昌街道", "龙眠街道", "孔城镇", "吕亭镇", "范岗镇", "新渡镇", "双港镇", "大关镇", "青草镇", "金神镇", "嬉子湖镇", "唐湾镇", "黄甲镇", "鲟鱼镇", "桐城经济开发区", "桐城双新经济开发区"]], [["昱东街道", "昱中街道", "昱西街道", "老街街道", "屯光镇", "阳湖镇", "黎阳镇", "新潭镇", "奕棋镇"], ["甘棠镇", "仙源镇", "汤口镇", "谭家桥镇", "太平湖镇", "焦村镇", "耿城镇", "三口镇", "乌石镇", "新明乡", "龙门乡", "新华乡", "新丰乡", "永丰乡", "黄山风景区"], ["岩寺镇", "西溪南镇", "潜口镇", "呈坎镇", "徽州区虚镇", "洽舍乡", "杨村乡", "富溪乡", "安徽徽州经济开发区"], ["徽城镇", "深渡镇", "北岸镇", "富堨镇", "郑村镇", "桂林镇", "许村镇", "溪头镇", "杞梓里镇", "霞坑镇", "岔口镇", "街口镇", "王村镇", "雄村镇", "三阳镇", "坑口乡", "上丰乡", "昌溪乡", "武阳乡", "金川乡", "小川乡", "新溪口乡", "璜田乡", "长陔乡", "森村乡", "绍濂乡", "石门乡", "狮石乡", "开发区类似乡级单位"], ["海阳镇", "齐云山镇", "万安镇", "五城镇", "东临溪镇", "蓝田镇", "溪口镇", "流口镇", "汪村镇", "商山镇", "山斗乡", "岭南乡", "渭桥乡", "板桥乡", "陈霞乡", "鹤城乡", "源芳乡", "榆村乡", "龙田乡", "璜尖乡", "白际乡"], ["碧阳镇", "宏村镇", "渔亭镇", "西递镇", "柯村镇", "美溪乡", "宏潭乡", "洪星乡"], ["祁山镇", "小路口镇", "金字牌镇", "平里镇", "历口镇", "闪里镇", "安凌镇", "凫峰镇", "塔坊镇", "新安镇", "大坦乡", "柏溪乡", "祁红乡", "溶口乡", "芦溪乡", "渚口乡", "古溪乡", "箬坑乡"]], [["琅琊街道", "东门街道", "西门街道", "南门街道", "北门街道", "清流街道", "扬子街道", "西涧街道", "安徽滁州琅琊经济开发区"], ["龙蟠街道", "乌衣镇", "沙河镇", "章广镇", "黄泥岗镇", "珠龙镇", "大柳镇", "腰铺镇", "施集镇", "南谯工业园区"], ["新安镇", "半塔镇", "水口镇", "汊河镇", "大英镇", "雷官镇", "施官镇", "舜山镇", "三城乡", "独山乡", "张山乡", "杨郢乡"], ["襄河镇", "古河镇", "大墅镇", "二郎口镇", "武岗镇", "马厂镇", "石沛镇", "十字镇", "西王镇", "六镇镇"], ["定城镇", "炉桥镇", "永康镇", "吴圩镇", "朱湾镇", "张桥镇", "藕塘镇", "池河镇", "连江镇", "界牌集镇", "仓镇", "三和集镇", "西卅店镇", "桑涧镇", "蒋集镇", "大桥镇", "严桥乡", "拂晓乡", "能仁乡", "七里塘乡", "二龙回族乡", "范岗乡", "安徽定远经济开发区", "定远盐化工业园", "凌家湖农场"], ["府城镇", "临淮镇", "武店镇", "西泉镇", "官塘镇", "刘府镇", "大庙镇", "殷涧镇", "总铺镇", "红心镇", "板桥镇", "大溪河镇", "小溪河镇", "枣巷镇", "黄湾乡", "安徽凤阳经济开发区", "安徽凤阳硅工业园区"], ["天长街道", "铜城镇", "汊涧镇", "秦栏镇", "大通镇", "杨村镇", "石梁镇", "金集镇", "永丰镇", "仁和集镇", "冶山镇", "郑集镇", "张铺镇", "新街镇", "万寿镇", "安徽省大圹圩农场"], ["明光街道", "明东街道", "明南街道", "明西街道", "张八岭镇", "三界镇", "管店镇", "自来桥镇", "涧溪镇", "石坝镇", "苏巷镇", "桥头镇", "女山湖镇", "古沛镇", "潘村镇", "柳巷镇", "泊岗乡"]], [["鼓楼街道", "文峰街道", "清河街道", "颍西街道", "西湖景区街道", "王店镇", "程集镇", "三合镇", "西湖镇", "九龙镇", "三十里铺镇", "三塔集镇", "马寨乡", "安徽颍州经济开发区"], ["河东", "新华街道", "向阳街道", "口孜镇", "插花镇", "袁寨镇", "枣庄镇", "老庙镇", "正午镇", "杨楼孜镇", "新乌江镇", "冉庙乡"], ["中市街道", "周棚街道", "伍明镇", "宁老庄镇", "闻集镇", "行流镇"], ["城关街道", "邢塘街道", "田桥街道", "城东街道", "杨桥镇", "同城镇", "谭棚镇", "老集镇", "滑集镇", "吕寨镇", "单桥镇", "长官镇", "宋集镇", "张新镇", "艾亭镇", "陈集镇", "韦寨镇", "迎仙镇", "瓦店镇", "姜寨镇", "庙岔镇", "黄岭镇", "白庙镇", "关庙镇", "杨小街镇", "高塘乡", "范兴集乡", "土陂乡", "谢集乡", "陶老乡", "张营乡", "庞营乡", "临泉县城南新区建设管理办公室"], ["城关镇", "旧县镇", "税镇镇", "皮条孙镇", "原墙镇", "倪邱镇", "李兴镇", "大新镇", "肖口镇", "关集镇", "三塔镇", "双浮镇", "蔡庙镇", "三堂镇", "苗老集镇", "赵庙镇", "宫集镇", "坟台镇", "洪山镇", "清浅镇", "五星镇", "高庙镇", "桑营镇", "大庙集镇", "阮桥镇", "双庙镇", "胡总镇", "郭庙镇", "赵集乡", "马集乡", "二郎乡", "开发区管理委员会"], ["方集镇", "中岗镇", "柴集镇", "新村镇", "朱寨镇", "柳沟镇", "赵集镇", "田集镇", "苗集镇", "黄岗镇", "焦陂镇", "张寨镇", "王堰镇", "地城镇", "洪河桥镇", "王家坝镇", "王化镇", "曹集镇", "鹿城镇", "会龙镇", "王店孜乡", "许堂乡", "段郢乡", "公桥乡", "龙王乡", "于集乡", "老观乡", "郜台乡", "安徽阜南经济开发区", "阜濛农场"], ["慎城镇", "谢桥镇", "南照镇", "杨湖镇", "江口镇", "润河镇", "新集镇", "六十铺镇", "耿棚镇", "半岗镇", "王岗镇", "夏桥镇", "江店孜镇", "陈桥镇", "黄桥镇", "八里河镇", "迪沟镇", "西三十铺镇", "红星镇", "十八里铺镇", "鲁口镇", "古城镇", "建颍乡", "五十铺乡", "盛堂乡", "关屯乡", "垂岗乡", "赛涧回族乡", "刘集乡", "黄坝乡"], ["东城", "西城", "颍南", "光武镇", "泉阳镇", "芦村镇", "新马集镇", "大黄镇", "田营镇", "陶庙镇", "王集镇", "砖集镇", "顾集镇", "代桥镇", "舒庄镇", "邴集乡", "靳寨乡", "任寨乡"]], [null, ["砀城镇", "赵屯镇", "李庄镇", "唐寨镇", "葛集镇", "周寨镇", "玄庙镇", "官庄坝镇", "曹庄镇", "关帝庙镇", "朱楼镇", "良梨镇", "程庄镇", "经济开发区", "薛楼板材加工园", "高铁新区"], ["龙城镇", "黄口镇", "杨楼镇", "闫集镇", "新庄镇", "刘套镇", "马井镇", "大屯镇", "赵庄镇", "杜楼镇", "丁里镇", "王寨镇", "祖楼镇", "青龙集镇", "张庄寨镇", "永堌镇", "白土镇", "官桥镇", "圣泉乡", "酒店乡", "孙圩子乡", "庄里乡", "石林乡", "萧县经济开发区"], ["灵城镇", "韦集镇", "黄湾镇", "娄庄镇", "杨疃镇", "尹集镇", "浍沟镇", "游集镇", "下楼镇", "朝阳镇", "渔沟镇", "高楼镇", "冯庙镇", "向阳乡", "朱集乡", "大路乡", "大庙乡", "禅堂乡", "虞姬乡", "灵璧县经济开发区"], ["泗城镇", "墩集镇", "丁湖镇", "草沟镇", "长沟镇", "黄圩镇", "大庄镇", "山头镇", "刘圩镇", "黑塔镇", "草庙镇", "屏山镇", "大路口乡", "大杨乡", "瓦坊乡", "泗县开发区管委会"]], [["中市街道", "东市街道", "三里桥街道", "望城街道", "清水河街道", "木厂镇", "马头镇", "东桥镇", "张店镇", "毛坦厂镇", "东河口镇", "双河镇", "施桥镇", "孙岗镇", "三十铺镇", "椿树镇", "城北乡", "翁墩乡", "淠东乡", "中店乡", "横塘岗乡", "先生店乡", "六安经济开发区"], ["鼓楼街道", "西市街道", "小华山街道", "苏埠镇", "韩摆渡镇", "新安镇", "顺河镇", "独山镇", "石婆店镇", "城南镇", "丁集镇", "固镇镇", "徐集镇", "分路口镇", "江家店镇", "单王乡", "青山乡", "石板冲乡", "西河口乡", "平桥乡", "罗集乡", "狮子岗乡", "六安市裕安区经济开发区"], ["叶集镇镇区", "叶集镇平岗", "三元镇", "孙岗乡"], ["城关镇", "河口镇", "周集镇", "临水镇", "新店镇", "石店镇", "马店镇", "孟集镇", "花园镇", "扈胡镇", "长集镇", "洪集镇", "姚李镇", "乌龙镇", "高塘镇", "龙潭镇", "岔路镇", "冯井镇", "众兴集镇", "夏店镇", "曹庙镇", "范桥镇", "潘集镇", "彭塔乡", "王截流乡", "临淮岗乡", "城西湖乡", "宋店乡", "三流乡", "邵岗乡", "白莲乡", "冯瓴乡", "安徽霍邱经济开发区", "水产局管辖村"], ["城关镇", "晓天镇", "桃溪镇", "万佛湖镇", "千人桥镇", "百神庙镇", "杭埠镇", "舒茶镇", "南港镇", "干汊河镇", "张母桥镇", "五显镇", "山七镇", "河棚镇", "汤池镇", "春秋乡", "柏林乡", "棠树乡", "阙店乡", "高峰乡", "庐镇乡", "舒城县经济开发区"], ["梅山镇", "麻埠镇", "青山镇", "燕子河镇", "天堂寨镇", "古碑镇", "吴家店镇", "斑竹园镇", "汤家汇镇", "南溪镇", "双河镇", "白塔畈镇", "张冲乡", "油坊店乡", "长岭乡", "槐树湾乡", "花石乡", "沙河乡", "桃岭乡", "果子园乡", "关庙乡", "全军乡", "铁冲乡", "现代产业园（经济开发区）"], ["衡山镇", "佛子岭镇", "下符桥镇", "但家庙镇", "与儿街镇", "黑石渡镇", "诸佛庵镇", "落儿岭镇", "磨子潭镇", "大化坪镇", "漫水河镇", "上土市镇", "单龙寺镇", "东西溪乡", "太平畈乡", "太阳乡", "经济开发区", "高桥湾现代产业园"]], [["花戏楼", "薛阁", "汤陵", "古井镇", "芦庙镇", "华佗镇", "魏岗镇", "牛集镇", "颜集镇", "五马镇", "十八里镇", "谯东镇", "十九里镇", "沙土镇", "观堂镇", "大杨镇", "城父镇", "十河镇", "双沟镇", "淝河镇", "古城镇", "龙杨镇", "立德镇", "张店乡", "赵桥乡", "亳州市经济技术开发区", "安徽亳州工业园区"], ["城关街道", "城西街道", "城东街道", "涡北街道", "西阳镇", "涡南镇", "楚店镇", "高公镇", "高炉镇", "曹市镇", "青町镇", "石弓镇", "龙山镇", "义门镇", "新兴镇", "临湖镇", "丹城镇", "马店集镇", "花沟镇", "店集镇", "陈大镇", "牌坊镇", "公吉寺镇", "标里镇", "单集林场", "安徽涡阳经济开发区"], ["漆园办事处（镇级", "庄周办事处（乡级", "城关镇", "双涧镇", "小涧镇", "坛城镇", "范集工业园区（镇级单位）", "许疃镇", "板桥集镇", "马集镇", "岳坊镇", "立仓镇", "楚村镇", "乐土镇", "三义镇", "篱笆镇", "蒙城县农业委员会（镇级单位）直辖村级单位", "王集乡", "小辛集乡", "安徽蒙城经济开发区管理委员会", "淮北矿业集团有限责任公司许疃煤矿", "白杨林场"], ["城关镇", "阚疃镇", "张村镇", "江集镇", "旧城镇", "西潘楼镇", "孙集镇", "汝集镇", "巩店镇", "王人镇", "王市镇", "永兴镇", "马店孜镇", "大李集镇", "胡集镇", "展沟镇", "程家集镇", "中疃镇", "望疃镇", "城北镇", "纪王场乡", "孙庙乡", "新张集乡", "柴湖良种繁殖场", "利辛县工业园区"]], [["池阳街道", "秋浦街道", "里山街道", "江口街道", "马衙街道", "墩上街道", "梅龙街道", "秋江街道", "杏花村街道", "清风街道", "清溪街道", "殷汇镇", "牛头山镇", "涓桥镇", "梅街镇", "梅村镇", "唐田镇", "牌楼镇", "乌沙镇", "棠溪镇", "安徽贵池工业园", "池州经济技术开发区", "池州市火车站站前区", "前江工业园", "安徽省江南产业集中区", "池州承接产业转移集中示范园区"], ["尧渡镇", "东流镇", "大渡口镇", "胜利镇", "张溪镇", "洋湖镇", "葛公镇", "香隅镇", "官港镇", "昭潭镇", "龙泉镇", "泥溪镇", "花园乡", "木塔乡", "青山乡", "东至经济开发区", "大渡口经济开发区"], ["仁里镇", "七都镇", "仙寓镇", "丁香镇", "小河镇", "横渡镇", "大演乡", "矶滩乡", "池州经济技术开发区石台工业园区"], ["蓉城镇", "木镇镇", "庙前镇", "陵阳镇", "新河镇", "丁桥镇", "朱备镇", "杨田镇", "九华镇", "酉华镇", "乔木乡", "杜村乡", "九华乡", "青阳县开发区"]], [["西林街道", "澄江街道", "鳌峰街道", "济川街道", "敬亭山街道", "双桥街道", "向阳街道", "水阳镇", "狸桥镇", "沈村镇", "古泉镇", "洪林镇", "寒亭镇", "文昌镇", "孙埠镇", "杨柳镇", "水东镇", "新田镇", "周王镇", "溪口镇", "朱桥乡", "养贤乡", "五星乡", "黄渡乡"], ["建平镇", "十字镇", "新发镇", "涛城镇", "梅渚镇", "毕桥镇", "飞鲤镇", "凌笪乡", "姚村乡", "郎溪经济开发区", "安徽省国营十字铺茶场", "上海市白茅岭监狱"], ["桃州镇", "柏垫镇", "誓节镇", "邱村镇", "新杭镇", "杨滩镇", "卢村乡", "东亭乡", "四合乡", "祠山岗茶场"], ["泾川镇", "茂林镇", "榔桥镇", "桃花潭镇", "琴溪镇", "蔡村镇", "云岭镇", "黄村镇", "丁家桥镇", "汀溪乡", "昌桥乡"], ["华阳镇", "临溪镇", "长安镇", "上庄镇", "扬溪镇", "伏岭镇", "金沙镇", "瀛洲镇", "板桥头乡", "家朋乡", "荆州乡", "生态工业园区"], ["旌阳镇", "蔡家桥镇", "三溪镇", "庙首镇", "白地镇", "俞村镇", "兴隆镇", "孙村镇", "版书镇", "云乐乡"], ["西津街道", "南山街道", "河沥街道", "汪溪街道", "竹峰街道", "港口镇", "梅林镇", "中溪镇", "宁墩镇", "仙霞镇", "甲路镇", "胡乐镇", "霞西镇", "云梯畲族乡", "南极乡", "万家乡", "青龙乡", "方塘乡"]]], [[["鼓东街道", "鼓西街道", "温泉街道", "东街街道", "南街街道", "安泰街道", "华大街道", "水部街道", "五凤街道", "洪山镇"], ["瀛洲街道", "后洲街道", "义洲街道", "新港街道", "上海街道", "苍霞街道", "茶亭街道", "洋中街道", "鳌峰街道", "宁化街道"], ["仓前街道", "东升街道", "对湖街道", "临江街道", "三叉街街道", "上渡街道", "下渡街道", "金山街道", "仓山镇", "城门镇", "盖山镇", "建新镇", "螺洲镇", "红星农场"], ["罗星街道", "马尾镇", "亭江镇", "琅岐镇"], ["茶园街道", "王庄街道", "象园街道", "鼓山镇", "新店镇", "岳峰镇", "宦溪镇", "寿山乡", "日溪乡"], ["甘蔗街道", "白沙镇", "南屿镇", "尚干镇", "祥谦镇", "青口镇", "南通镇", "上街镇", "荆溪镇", "竹岐乡", "鸿尾乡", "洋里乡", "大湖乡", "廷坪乡", "小箬乡", "江洋农场"], ["凤城镇", "敖江镇", "东岱镇", "琯头镇", "晓澳镇", "东湖镇", "丹阳镇", "长龙镇", "透堡镇", "马鼻镇", "官坂镇", "筱埕镇", "黄岐镇", "苔菉镇", "浦口镇", "坑园镇", "潘渡乡", "江南乡", "蓼沿乡", "安凯乡", "下宫乡", "小沧畲族乡", "马祖乡"], ["凤山镇", "松山镇", "起步镇", "中房镇", "飞竹镇", "鉴江镇", "白塔乡", "洪洋乡", "西兰乡", "霍口畲族乡", "碧里乡", "罗源湾"], ["梅城镇", "梅溪镇", "白樟镇", "金沙镇", "白中镇", "池园镇", "坂东镇", "塔庄镇", "省璜镇", "雄江镇", "东桥镇", "云龙乡", "上莲乡", "三溪乡", "桔林乡", "下祝乡"], ["樟城镇", "嵩口镇", "梧桐镇", "葛岭镇", "城峰镇", "清凉镇", "长庆镇", "同安镇", "大洋镇", "塘前乡", "富泉乡", "岭路乡", "赤锡乡", "洑口乡", "盖洋乡", "东洋乡", "霞拔乡", "盘谷乡", "红星乡", "白云乡", "丹云乡"], ["潭城镇", "苏澳镇", "流水镇", "澳前镇", "北厝镇", "平原镇", "敖东镇", "白青乡", "屿头乡", "大练乡", "芦洋乡", "中楼乡", "东庠乡", "岚城乡", "南海乡"], ["玉屏街道", "龙山街道", "龙江街道", "宏路街道", "石竹街道", "音西街道", "阳下街道", "海口镇", "城头镇", "南岭镇", "龙田镇", "江镜镇", "港头镇", "高山镇", "沙埔镇", "三山镇", "东瀚镇", "渔溪镇", "上迳镇", "新厝镇", "江阴镇", "东张镇", "镜洋镇", "一都镇", "江镜华侨", "东阁华侨"], ["吴航街道", "航城街道", "营前街道", "漳港街道", "首占镇", "玉田镇", "松下镇", "江田镇", "古槐镇", "文武砂镇", "鹤上镇", "湖南镇", "金峰镇", "文岭镇", "梅花镇", "潭头镇", "罗联乡", "猴屿乡"]], [["厦港街道", "中华街道", "滨海街道", "鹭江街道", "开元街道", "梧村街道", "筼筜街道", "莲前街道", "嘉莲街道", "鼓浪屿街道"], ["海沧街道", "新阳街道", "嵩屿街道", "东孚街道", "第一农场", "海沧农场", "天竺山林场", "厦门海沧保税港区"], ["湖里街道", "殿前街道", "禾山街道", "江头街道", "金山街道", "火炬高技术开发区", "象屿保税区"], ["集美街道", "侨英街道", "杏林街道", "杏滨街道", "灌口镇", "后溪镇", "第二农场", "省天马种猪场", "天马华侨农场", "坂头防护林场"], ["大同街道", "祥平街道", "莲花镇", "新民镇", "洪塘镇", "西柯镇", "汀溪镇", "五显镇", "凤南农场", "白沙仑农场", "竹坝华侨农场"], ["大嶝街道", "马巷镇", "新圩镇", "新店镇", "内厝镇", "大帽山农场"]], [["龙桥街道", "凤凰山街道", "霞林街道", "常太镇", "华亭镇", "灵川镇", "东海镇"], ["涵东街道", "涵西街道", "三江口镇", "白塘镇", "国欢镇", "梧塘镇", "江口镇", "萩芦镇", "白沙镇", "庄边镇", "新县镇", "大洋乡", "赤港开发区"], ["镇海街道", "拱辰街道", "西天尾镇", "黄石镇", "新度镇", "北高镇"], ["笏石镇", "东庄镇", "忠门镇", "东埔镇", "东峤镇", "埭头镇", "平海镇", "南日镇", "湄洲镇", "山亭镇", "月塘镇", "前沁农场", "后海管理局"], ["鲤城街道", "枫亭镇", "榜头镇", "郊尾镇", "度尾镇", "鲤南镇", "赖店镇", "盖尾镇", "园庄镇", "大济镇", "龙华镇", "钟山镇", "游洋镇", "西苑乡", "石苍乡", "社硎乡", "书峰乡", "菜溪乡"]], [["列东街道", "列西街道", "徐碧街道", "陈大镇", "洋溪镇", "福建梅列经济开发区"], ["城关街道", "白沙街道", "富兴堡街道", "荆西街道", "莘口镇", "岩前镇", "城东乡", "中村乡"], ["雪峰镇", "盖洋镇", "胡坊镇", "瀚仙镇", "城关乡", "沙溪乡", "夏阳乡", "枫溪乡", "夏坊乡"], ["龙津镇", "嵩溪镇", "嵩口镇", "灵地镇", "长校镇", "赖坊镇", "温郊乡", "林畲乡", "田源乡", "沙芜乡", "余朋乡", "李家乡", "里田乡"], ["翠江镇", "泉上镇", "湖村镇", "石壁镇", "曹坊镇", "安远镇", "淮土镇", "安乐镇", "水茜镇", "城郊乡", "城南乡", "济村乡", "方田乡", "治平畲族乡", "中沙乡", "河龙乡"], ["均溪镇", "石牌镇", "上京镇", "广平镇", "桃源镇", "太华镇", "建设镇", "奇韬镇", "华兴乡", "屏山乡", "吴山乡", "济阳乡", "武陵乡", "谢洋乡", "文江乡", "梅山乡", "湖美乡", "前坪乡", "东风农场"], ["城关镇", "梅仙镇", "西滨镇", "洋中镇", "新阳镇", "管前镇", "西城镇", "尤溪口镇", "坂面镇", "联合乡", "汤川乡", "溪尾乡", "中仙乡", "台溪乡", "八字桥乡"], ["凤岗街道", "虬江街道", "青州镇", "夏茂镇", "高砂镇", "高桥镇", "富口镇", "大洛镇", "南霞乡", "南阳乡", "郑湖乡", "湖源乡", "金沙园开发区", "金古园开发区", "青山纸业工业区", "海西物流园区"], ["古镛镇", "万安镇", "高唐镇", "白莲镇", "黄潭镇", "水南镇", "光明乡", "漠源乡", "南口乡", "万全乡", "安仁乡", "大源乡", "余坊乡"], ["杉城镇", "朱口镇", "新桥乡", "上青乡", "大田乡", "梅口乡", "下渠乡", "开善乡", "大龙乡"], ["濉溪镇", "里心镇", "溪口镇", "均口镇", "伊家乡", "黄坊乡", "溪源乡", "客坊乡", "黄埠乡", "福建建宁经济开发区"], ["燕东街道", "燕西街道", "燕南街道", "燕北街道", "西洋镇", "贡川镇", "安砂镇", "小陶镇", "大湖镇", "曹远镇", "洪田镇", "槐南镇", "上坪乡", "罗坊乡", "青水乡"]], [["海滨街道", "临江街道", "鲤中街道", "开元街道", "浮桥街道", "江南街道", "金龙街道", "常泰街道", "清濛经济开发区"], ["东湖街道", "丰泽街道", "泉秀街道", "清源街道", "华大街道", "城东街道", "东海街道", "北峰街道"], ["万安街道", "双阳街道", "罗溪镇", "马甲镇", "河市镇", "虹山乡"], ["山腰街道", "南埔镇", "界山镇", "后龙镇", "峰尾镇", "前黄镇", "涂岭镇"], ["螺城镇", "螺阳镇", "黄塘镇", "紫山镇", "洛阳镇", "东园镇", "张坂镇", "崇武镇", "山霞镇", "涂寨镇", "东岭镇", "东桥镇", "净峰镇", "小岞镇", "辋川镇", "百崎回族乡", "城南工业区", "惠南工业区"], ["凤城镇", "蓬莱镇", "湖头镇", "官桥镇", "剑斗镇", "城厢镇", "金谷镇", "龙门镇", "虎邱镇", "芦田镇", "感德镇", "魁斗镇", "西坪镇", "参内乡", "白濑乡", "湖上乡", "尚卿乡", "大坪乡", "龙涓乡", "长坑乡", "蓝田乡", "祥华乡", "桃舟乡", "福田乡"], ["桃城镇", "五里街镇", "一都镇", "下洋镇", "蓬壶镇", "达埔镇", "吾峰镇", "石鼓镇", "岵山镇", "东平镇", "湖洋镇", "坑仔口镇", "玉斗镇", "锦斗镇", "东关镇", "桂洋镇", "苏坑镇", "仙夹镇", "横口乡", "呈祥乡", "介福乡", "外山乡"], ["浔中镇", "龙浔镇", "三班镇", "龙门滩镇", "雷峰镇", "南埕镇", "水口镇", "赤水镇", "上涌镇", "葛坑镇", "盖德镇", "美湖镇", "杨梅乡", "汤头乡", "桂阳乡", "国宝乡", "大铭乡", "春美乡"], null, ["湖滨街道", "凤里街道", "灵秀镇", "宝盖镇", "蚶江镇", "祥芝镇", "鸿山镇", "锦尚镇", "永宁镇"], ["青阳街道", "梅岭街道", "西园街道", "罗山街道", "新塘街道", "灵源街道", "安海镇", "磁灶镇", "陈埭镇", "东石镇", "深沪镇", "金井镇", "池店镇", "内坑镇", "龙湖镇", "永和镇", "英林镇", "紫帽镇", "西滨镇", "安平开发区", "晋江市经济开发区", "泉州出口加工区"], ["溪美街道", "柳城街道", "美林街道", "省新镇", "仑苍镇", "东田镇", "英都镇", "翔云镇", "金淘镇", "诗山镇", "蓬华镇", "码头镇", "九都镇", "乐峰镇", "罗东镇", "梅山镇", "洪濑镇", "洪梅镇", "康美镇", "丰州镇", "霞美镇", "官桥镇", "水头镇", "石井镇", "眉山乡", "向阳乡", "雪峰管委会"]], [["东铺头街道", "西桥街道", "新桥街道", "巷口街道", "南坑街道", "通北街道", "浦南镇", "天宝镇", "芝山镇", "石亭镇", "芗城区奶牛场", "后房农场", "天宝林场", "五峰农场"], ["蓝田镇", "步文镇", "朝阳镇", "郭坑镇", "蓝田开发区管委会"], ["云陵镇", "陈岱镇", "东厦镇", "莆美镇", "列屿镇", "火田镇", "下河乡", "马铺乡", "和平乡", "和平农场", "常山华侨经济开发区", "云陵工业开发区"], ["绥安镇", "旧镇镇", "佛昙镇", "赤湖镇", "杜浔镇", "霞美镇", "官浔镇", "石榴镇", "盘陀镇", "长桥镇", "前亭镇", "马坪镇", "深土镇", "六鳌镇", "沙西镇", "古雷镇", "大南坂镇", "南浦乡", "赤岭畲族乡", "湖西畲族乡", "赤土乡", "漳浦盐场", "万安农场", "石古农场", "长桥农场", "白竹湖农场", "南山华侨茶果场", "中西林场", "玳瑁山茶场", "下蔡林场"], ["南诏镇", "四都镇", "梅岭镇", "桥东镇", "深桥镇", "太平镇", "霞葛镇", "官陂镇", "秀篆镇", "西潭镇", "金星乡", "白洋乡", "建设乡", "红星乡", "梅洲乡", "国营西山农场", "国营湖内林场", "岭下溪国有防护林场", "诏安工业园区管委会", "诏安金都工业集中区管委会"], ["武安镇", "岩溪镇", "陈巷镇", "枋洋镇", "坂里乡", "国营古农农场", "长泰经济开发区", "马洋溪生态旅游区", "林墩工业区"], ["西埔镇", "樟塘镇", "康美镇", "杏陈镇", "陈城镇", "前楼镇", "铜陵镇"], ["山城镇", "丰田镇", "靖城镇", "龙山镇", "金山镇", "和溪镇", "奎洋镇", "梅林镇", "书洋镇", "船场镇", "南坑镇", "大房农场"], ["小溪镇", "山格镇", "文峰镇", "南胜镇", "坂仔镇", "安厚镇", "大溪镇", "霞寨镇", "九峰镇", "芦溪镇", "五寨乡", "国强乡", "崎岭乡", "长乐乡", "秀峰乡", "安厚农场", "福建平和工业园区"], ["华丰镇", "丰山镇", "沙建镇", "新圩镇", "高安镇", "仙都镇", "高车乡", "马坑乡", "湖林乡", "福建土楼（华安）旅游区"], ["石码镇", "海澄镇", "角美镇", "白水镇", "浮宫镇", "程溪镇", "港尾镇", "九湖镇", "颜厝镇", "榜山镇", "紫泥镇", "东园镇", "东泗乡", "隆教畲族乡", "双第华侨农场", "九龙岭林场", "程溪农场", "良种场", "苍坂农场", "林下林场", "角美工业开发区", "招商局漳州开发区", "东园开发区", "龙池开发区"]], [["梅山街道", "黄墩街道", "紫云街道", "四鹤街道", "水南街道", "水东街道", "来舟镇", "樟湖镇", "夏道镇", "西芹镇", "峡阳镇", "南山镇", "大横镇", "王台镇", "太平镇", "塔前镇", "茫荡镇", "洋后镇", "炉下镇", "巨口乡", "赤门乡"], ["潭城街道", "童游街道", "将口镇", "徐市镇", "莒口镇", "麻沙镇", "黄坑镇", "水吉镇", "漳墩镇", "小湖镇", "崇雒乡", "书坊乡", "回龙乡"], ["双溪街道", "建西镇", "洋口镇", "元坑镇", "埔上镇", "大历镇", "大干镇", "仁寿镇", "郑坊镇", "洋墩乡", "岚下乡", "高阳乡"], ["南浦街道", "河滨街道", "富岭镇", "石陂镇", "临江镇", "仙阳镇", "水北街镇", "永兴镇", "忠信镇", "莲塘镇", "九牧镇", "万安乡", "古楼乡", "山下乡", "枫溪乡", "濠村乡", "管厝乡", "盘亭乡", "官路乡", "水南农场"], ["杭川镇", "寨里镇", "止马镇", "鸾风乡", "崇仁乡", "李坊乡", "华桥乡", "司前乡"], ["松源街道", "郑墩镇", "渭田镇", "河东乡", "茶平乡", "旧县乡", "溪东乡", "花桥乡", "祖墩乡"], ["熊山街道", "东平镇", "石屯镇", "铁山镇", "镇前镇", "星溪乡", "外屯乡", "杨源乡", "澄源乡", "岭腰乡"], ["昭阳街道", "通泰街道", "水北街道", "晒口街道", "城郊镇", "水北镇", "下沙镇", "卫闽镇", "沿山镇", "拿口镇", "洪墩镇", "大埠岗镇", "和平镇", "肖家坊镇", "大竹镇", "吴家塘镇", "桂林乡", "张厝乡", "金坑乡"], ["崇安街道", "新丰街道", "武夷街道", "星村镇", "兴田镇", "五夫镇", "上梅乡", "吴屯乡", "岚谷乡", "洋庄乡"], ["建安街道", "通济街道", "瓯宁街道", "芝山街道", "徐墩镇", "吉阳镇", "房道镇", "南雅镇", "迪口镇", "小桥镇", "玉山镇", "东游镇", "东峰镇", "小松镇", "顺阳乡", "水源乡", "川石乡", "龙村乡"]], [["东城街道", "南城街道", "西城街道", "中城街道", "西陂街道", "曹溪街道", "东肖街道", "龙门街道", "铁山街道", "北城街道", "红坊镇", "适中镇", "雁石镇", "白沙镇", "万安镇", "大池镇", "小池镇", "江山镇", "岩山镇", "苏坂镇"], ["凤城街道", "坎市镇", "下洋镇", "湖雷镇", "高陂镇", "抚市镇", "湖坑镇", "培丰镇", "龙潭镇", "峰市镇", "城郊镇", "仙师镇", "虎岗镇", "西溪乡", "金砂乡", "洪山乡", "湖山乡", "岐岭乡", "古竹乡", "堂堡乡", "合溪乡", "大溪乡", "陈东乡", "高头乡"], ["汀州镇", "大同镇", "古城镇", "新桥镇", "馆前镇", "童坊镇", "河田镇", "南山镇", "濯田镇", "四都镇", "涂坊镇", "策武镇", "三洲镇", "铁长乡", "庵杰乡", "宣成乡", "红山乡", "羊牯乡"], ["临江镇", "临城镇", "中都镇", "蓝溪镇", "稔田镇", "白砂镇", "古田镇", "才溪镇", "南阳镇", "蛟洋镇", "旧县镇", "湖洋镇", "溪口镇", "太拔镇", "通贤镇", "下都镇", "茶地镇", "庐丰畲族乡", "泮境乡", "步云乡", "官庄畲族乡", "珊瑚乡"], ["平川镇", "中山镇", "岩前镇", "十方镇", "中堡镇", "桃溪镇", "城厢镇", "东留镇", "武东镇", "万安镇", "永平镇", "象洞镇", "民主乡", "下坝乡", "中赤乡", "湘店乡", "大禾乡"], ["莲峰镇", "北团镇", "姑田镇", "朋口镇", "莒溪镇", "新泉镇", "庙前镇", "文亨镇", "四堡镇", "林坊镇", "揭乐乡", "塘前乡", "隔川乡", "罗坊乡", "曲溪乡", "赖源乡", "宣和乡"], ["菁城街道", "桂林街道", "新桥镇", "双洋镇", "永福镇", "溪南镇", "和平镇", "拱桥镇", "象湖镇", "赤水镇", "西园镇", "南洋镇", "芦芝镇", "官田乡", "吾祠乡", "灵地乡"]], [["蕉南街道", "蕉北街道", "城南镇", "漳湾镇", "七都镇", "八都镇", "九都镇", "霍童镇", "赤溪镇", "洋中镇", "飞鸾镇", "三都镇", "虎贝镇", "金涵畲族乡", "洪口乡", "石后乡", "东侨开发区"], ["松城街道", "松港街道", "长春镇", "牙城镇", "溪南镇", "沙江镇", "下浒镇", "三沙镇", "盐田畲族乡", "水门畲族乡", "崇儒畲族乡", "柏洋乡", "北壁乡", "海岛乡"], ["城东街道", "城西街道", "平湖镇", "大桥镇", "黄田镇", "鹤塘镇", "杉洋镇", "凤都镇", "水口镇", "大甲镇", "吉巷乡", "泮洋乡", "凤埔乡", "卓洋乡"], ["古峰镇", "双溪镇", "黛溪镇", "长桥镇", "屏城乡", "棠口乡", "甘棠乡", "熙岭乡", "路下乡", "寿山乡", "岭下乡"], ["鳌阳镇", "斜滩镇", "南阳镇", "武曲镇", "犀溪镇", "平溪镇", "凤阳镇", "大安乡", "坑底乡", "清源乡", "竹管垅乡", "芹洋乡", "托溪乡", "下党乡"], ["狮城镇", "咸村镇", "浦源镇", "七步镇", "李墩镇", "纯池镇", "泗桥乡", "礼门乡", "玛坑乡"], ["双城镇", "富溪镇", "城郊乡", "乍洋乡", "东源乡", "黄柏乡", "宅中乡", "楮坪乡", "英山乡"], ["城南街道", "城北街道", "阳头街道", "罗江街道", "赛岐镇", "穆阳镇", "上白石镇", "潭头镇", "社口镇", "晓阳镇", "溪潭镇", "甘棠镇", "下白石镇", "溪尾镇", "溪柄镇", "湾坞镇", "城阳镇", "坂中畲族乡", "范坑乡", "穆云畲族乡", "康厝畲族乡", "松罗乡", "福安畲族开发区", "湾坞工业集中区"], ["桐山街道", "桐城街道", "山前街道", "贯岭镇", "前岐镇", "沙埕镇", "店下镇", "太姥山镇", "磻溪镇", "白琳镇", "点头镇", "管阳镇", "嵛山镇", "硖门畲族乡", "叠石乡", "佳阳乡", "龙安开发区"]]], [[["公园街道", "滕王阁街道", "八一桥街道", "百花洲街道", "墩子塘街道", "大院街道", "豫章街道", "董家窑街道", "彭家桥街道", "沙井街道办事处（红谷滩", "扬子洲镇", "贤士湖管理处", "扬农管理处", "凤凰洲管理处（红谷滩新区）"], ["南浦街道", "朝阳洲街道", "广润门街道", "西湖街道", "系马桩街道", "绳金塔街道", "丁公路街道", "南站街道", "桃源街道", "十字街街道", "桃花镇", "南昌市朝阳农场"], ["洪都街道", "京山街道", "三家店街道", "岱山街道", "徐家坊街道", "青云谱镇", "南昌昌南工业园"], ["站前街道", "幸福街道", "招贤镇", "梅岭镇", "罗亭镇", "太平镇"], ["青山路街道", "上海路街道", "南钢街道", "京东镇", "罗家镇", "湖坊镇", "塘山镇", "蛟桥镇（南昌经济技术开发区）", "南昌昌东工业区", "白水湖管理处（南昌经济技术开发区）", "冠山管理处", "艾溪湖管理处（南昌高新开发区）", "湖西新建区（南昌高新开发区）"], ["长堎镇", "望城镇", "生米镇（红谷滩新区）", "西山镇", "石岗镇", "松湖镇", "樵舍镇", "乐化镇", "溪霞镇", "象山镇", "石埠镇", "联圩镇", "流湖镇", "厚田乡", "金桥乡", "铁河乡", "大塘坪乡", "昌邑乡", "南矶乡", "恒湖垦殖场", "成新实业有限公司", "朱港实业有限公司", "江西长堎外商投资工业区", "红角洲管理处（红谷滩新区）", "九龙湖管理处（红谷滩新区）", "江西桑海集团有限公司（南昌经济技术开发区）", "新祺周管理处（南昌经济技术开发区）", "新丰垦殖场"], ["莲塘镇", "向塘镇", "三江镇", "塘南镇", "幽兰镇", "蒋巷镇", "武阳镇", "冈上镇", "广福镇", "昌东镇（南昌高新开发区）", "麻丘镇（南昌高新开发区）", "泾口乡", "南新乡", "塔城乡", "黄马乡", "富山乡", "东新乡", "八一乡", "小蓝经济开发区", "南昌县银三角管理委员会", "南昌市五星垦殖场", "江西省良种繁殖场"], ["龙津镇", "万埠镇", "石鼻镇", "鼎湖镇", "长埠镇", "东阳镇", "黄洲镇", "乔乐乡", "长均乡", "新民乡", "江西安义工业园区", "国营万埠垦殖场"], ["民和镇", "李渡镇", "温圳镇", "文港镇", "梅庄镇", "张公镇", "罗溪镇", "架桥镇", "前坊镇", "三里乡", "二塘乡", "钟陵乡", "池溪乡", "南台乡", "三阳集乡", "七里乡", "下埠集乡", "衙前乡", "白圩乡", "长山晏乡", "泉岭乡", "五里垦殖场"]], [["西郊街道", "新枫街道", "鲇鱼山镇", "丽阳镇", "荷塘乡", "吕蒙乡", "昌江化工园区", "六零二所高科技园", "昌江开发区", "枫树山总场"], ["石狮埠街道", "新厂街道", "里村街道", "周路口街道", "昌江街道", "新村街道", "珠山街道", "太白园街道", "昌河街道", "竟成镇", "高新技术开发区"], ["浮梁镇", "鹅湖镇", "经公桥镇", "蛟潭镇", "湘湖镇", "瑶里镇", "洪源镇", "寿安镇", "三龙镇", "峙滩镇", "王港乡", "庄湾乡", "黄坛乡", "兴田乡", "江村乡", "勒功乡", "西湖乡", "罗家桥乡", "浮梁工业园区", "罗家垦殖场"], ["洎阳街道", "塔山街道", "镇桥镇", "乐港镇", "涌山镇", "众埠镇", "接渡镇", "洪岩镇", "礼林镇", "后港镇", "塔前镇", "双田镇", "临港镇", "高家镇", "名口镇", "浯口镇", "十里岗镇", "鸬鹚乡", "农业高新园", "江西乐平工业园区"]], [["东大街街道", "凤凰街街道", "八一街街道", "后埠街街道", "丹江街街道", "白源街街道", "安源镇", "高坑镇", "五陂镇", "青山镇", "五陂下垦殖场", "城郊管委会"], ["峡山口街道", "湘东镇", "荷尧镇", "老关镇", "腊市镇", "下埠镇", "排上镇", "东桥镇", "麻山镇", "广寒寨乡", "白竺乡"], ["琴亭镇", "路口镇", "良坊镇", "升坊镇", "坊楼镇", "闪石乡", "湖上乡", "三板桥乡", "神泉乡", "六市乡", "高洲乡", "荷塘乡", "南岭乡"], ["上栗镇", "桐木镇", "金山镇", "福田镇", "彭高镇", "赤山镇", "鸡冠山乡", "长平乡", "东源乡", "杨岐乡"], ["芦溪镇", "宣风镇", "上埠镇", "南坑镇", "银河镇", "源南乡", "长丰乡", "张佳坊乡", "新泉乡", "万龙山乡"]], [["十里街道", "五里街道", "七里湖街道办事处（九江经济技术开", "姑塘镇", "威家镇", "新港镇", "莲花镇", "赛阳镇", "虞家河乡", "高垅乡", "庐山林科所", "庐山生态文化新城"], ["甘棠街道", "湓浦街道", "人民路街道", "白水湖街道", "金鸡坡街道", "向阳街道办事处（九江经济技术开", "滨兴街道办事处（九江经济技术开", "茅山头企业集团（九江经济技术开发区）"], ["沙河街镇", "马回岭镇", "江洲镇", "城子镇", "港口街镇", "新合镇", "狮子镇", "永安乡", "涌泉乡", "新塘乡", "城门乡", "岷山乡", "沙河经济技术开发区", "新洲垦殖场", "赛城湖水产场", "岷山林场"], ["豫宁街道", "新宁镇", "泉口镇", "鲁溪镇", "船滩镇", "澧溪镇", "罗坪镇", "石门楼镇", "宋溪镇", "大洞乡", "横路乡", "官莲乡", "巾口乡", "东林乡", "上汤乡", "甫田乡", "清江乡", "石渡乡", "杨洲乡", "罗溪乡", "万福经济技术开发区管委会"], ["义宁镇", "白岭镇", "全丰镇", "古市镇", "大桥镇", "渣津镇", "马坳镇", "杭口镇", "港口镇", "溪口镇", "西港镇", "山口镇", "黄沙镇", "黄港镇", "何市镇", "上奉镇", "四都镇", "太阳升镇", "宁州镇", "路口乡", "黄龙乡", "上衫乡", "余段乡", "水源乡", "石坳乡", "东港乡", "上杭乡", "新湾乡", "布甲乡", "漫江乡", "复原乡", "竹坪乡", "征村乡", "庙岭乡", "黄坳乡", "大椿乡"], ["涂埠镇", "吴城镇", "三溪桥镇", "虬津镇", "艾城镇", "滩溪镇", "白槎镇", "梅棠镇", "燕坊镇", "马口镇", "柘林镇", "三角乡", "九合乡", "立新乡", "江上乡", "江西永修云山经济技术开发区", "云山企业集团", "恒丰企业集团", "八角岭垦殖场", "永丰垦殖场"], ["蒲亭镇", "聂桥镇", "车桥镇", "丰林镇", "吴山镇", "宝塔乡", "河东乡", "高塘乡", "林泉乡", "磨溪乡", "爱民乡", "邹桥乡", "塘山乡", "彭山林场", "园艺场"], ["都昌镇", "周溪镇", "三汊港镇", "中馆镇", "大沙镇", "万户镇", "南峰镇", "土塘镇", "大港镇", "蔡岭镇", "徐埠镇", "左里镇", "和合乡", "阳峰乡", "西源乡", "芗溪乡", "狮山乡", "鸣山乡", "春桥乡", "苏山乡", "多宝乡", "汪墩乡", "北山乡", "大树乡", "江西省对外经济技术合作蔡岭示范区", "都昌县良种场"], ["双钟镇", "流泗镇", "马影镇", "武山镇", "城山镇", "均桥镇", "大垅乡", "凰村乡", "张青乡", "付垅乡", "舜德乡", "流芳乡", "南北港水产场", "武山垦殖场"], ["龙城镇", "棉船镇", "马垱镇", "芙蓉墩镇", "定山镇", "天红镇", "杨梓镇", "东升镇", "瀼溪镇", "黄花镇", "太平关乡", "黄岭乡", "浩山乡", "建筑材料厂", "水产养殖场", "太泊湖农业综合开发区", "上十岭综合垦殖场", "芙蓉农场", "棉科所", "棉花原种场国营分场", "太泊湖水产养殖场", "黄乐林场"], ["湓城街道", "桂林街道", "码头镇", "白杨镇", "南义镇", "横港镇", "范镇", "肇陈镇", "高丰镇", "夏畈镇", "乐园乡", "洪一乡", "花园乡", "洪下乡", "武蛟乡", "横立山乡", "黄金乡", "南阳乡", "赛湖农场", "青山林场", "瑞昌市大德山林场"], ["茶山街道", "甘露镇", "江益镇", "金湖乡", "苏家垱乡", "泽泉乡"], ["南康镇", "白鹿镇", "温泉镇", "星子镇", "华林镇", "蛟塘镇", "横塘镇", "牯岭镇", "海会镇", "蓼南乡", "东牯山林场", "沙湖山管理处"]], [["城南街道", "城北街道", "袁河街道", "新钢街道", "水北镇", "下村镇", "良山镇", "罗坊镇", "姚圩镇", "珠珊镇", "河下镇", "观巢镇", "欧里镇", "水西镇", "鹄山乡", "人和乡", "界水乡", "南安乡", "新溪乡", "九龙山乡", "仙来"], ["钤东街道", "分宜镇", "杨桥镇", "湖泽镇", "双林镇", "钤山镇", "洋江镇", "凤阳镇", "洞村乡", "高岚乡", "操场乡", "分宜县工业园管理委员会", "分宜县芳山林场", "年珠林场", "山下林场", "上村林场", "长埠林场", "东坑林场"]], [["江边街道", "交通街道", "东湖街道", "梅园街道", "四青街道", "白露街道", "童家镇", "夏埠乡"], ["邓埠镇", "锦江镇", "潢溪镇", "中童镇", "马荃镇", "画桥镇", "春涛镇", "平定乡", "杨溪乡", "洪湖乡", "黄庄乡", "刘家站乡", "余江县工业园区", "鹰潭市龙岗新区", "高公寨营林场", "邓家埠水稻原种场", "余江县水产场", "塘潮源林场", "张公桥农场", "青年综合垦殖场", "大桥农场"], ["花园街道", "雄石街道", "东门街道", "泗沥镇", "河潭镇", "周坊镇", "鸿塘镇", "志光镇", "流口镇", "罗河镇", "金屯镇", "塘湾镇", "文坊镇", "冷水镇", "滨江镇", "天禄镇", "雷溪镇", "龙虎山镇（龙虎山风景旅游区管委会）", "上清镇（龙虎山风景旅游区管委会）", "白田乡", "彭湾乡", "樟坪畲族乡", "耳口乡", "贵溪市工业园区", "江北", "塔桥园艺场", "河潭埠垦殖场", "西窑林场", "双圳林场", "耳口林场", "冷水林场", "三县岭林场", "上清林场（龙虎山风景旅游区管委会）"]], [["解放街道", "赣江街道", "南外街道", "东外街道", "黄金岭街道办事处（赣州经济技术开", "沙石镇", "水东镇", "水南镇", "湖边镇（赣州经济技术开发区）", "沙河镇", "水西镇", "蟠龙镇（赣州经济技术开发区）", "潭口镇（赣州经济技术开发区）", "潭东镇（赣州经济技术开发区）", "赣州经济技术开发区", "沙河工业园"], ["蓉江街道", "东山街道", "唐江镇", "凤岗镇", "龙岭镇", "龙回镇", "镜坝镇", "横市镇", "浮石乡", "赤土畲族乡", "横寨乡", "朱坊乡", "太窝乡", "三江乡", "龙华乡", "十八塘乡", "麻双乡", "大坪乡", "坪市乡", "隆木乡", "南康市工业园"], ["梅林镇", "王母渡镇", "沙地镇", "江口镇", "田村镇", "南塘镇", "茅店镇", "吉埠镇", "五云镇", "湖江镇", "储潭镇", "韩坊镇", "阳埠乡", "大埠乡", "长洛乡", "大田乡", "石芫乡", "三溪乡", "白鹭乡", "江西赣县经济开发区"], ["嘉定镇", "大塘埠镇", "古陂镇", "大桥镇", "新田镇", "安西镇", "小江镇", "铁石口镇", "大阿镇", "油山镇", "小河镇", "西牛镇", "正平镇", "虎山乡", "崇仙乡", "万隆乡", "信丰县工业园"], ["南安镇", "新城镇", "樟斗镇", "池江镇", "青龙镇", "左拔镇", "黄龙镇", "吉村镇", "浮江乡", "河洞乡", "内良乡", "新世纪工业园"], ["东山镇", "陡水镇", "社溪镇", "营前镇", "黄埠镇", "寺下镇", "梅水乡", "油石乡", "安和乡", "双溪乡", "水岩乡", "平富乡", "五指峰乡", "紫阳乡", "上犹县黄埠工业区"], ["横水镇", "扬眉镇", "过埠镇", "铅厂镇", "长龙镇", "关田镇", "龙勾乡", "杰坝乡", "金坑乡", "思顺乡", "麟潭乡", "上堡乡", "聂都乡", "文英乡", "乐洞乡", "丰州乡", "天台山林场"], ["欣山镇", "孔田镇", "版石镇", "天心镇", "龙布镇", "鹤子镇", "三百山镇", "车头镇", "镇岗乡", "凤山乡", "新龙乡", "蔡坊乡", "重石乡", "长沙乡", "浮槎乡", "双芫乡", "塘村乡", "高云山乡", "九龙工业园"], ["龙南镇", "武当镇", "杨村镇", "汶龙镇", "程龙镇", "关西镇", "里仁镇", "渡江镇", "九连山镇", "桃江乡", "东江乡", "临塘乡", "南亨乡", "夹湖乡", "江西龙南经济技术开发区", "安基山林场"], ["历市镇", "岿美山镇", "老城镇", "天九镇", "龙塘镇", "岭北镇", "鹅公镇", "定南县工业园"], ["城厢镇", "大吉山镇", "陂头镇", "金龙镇", "南迳镇", "龙源坝镇", "中寨乡", "社迳乡", "龙下乡", "全南县工业园"], ["梅江镇", "青塘镇", "长胜镇", "黄陂镇", "固村镇", "赖村镇", "石上镇", "东山坝镇", "洛口镇", "小布镇", "黄石镇", "田头镇", "竹笮乡", "对坊乡", "固厚乡", "田埠乡", "会同乡", "湛田乡", "安福乡", "东韶乡", "肖田乡", "钓峰乡", "大沽乡", "蔡江乡", "宁都县水东工业园"], ["贡江镇", "铁山垅镇", "盘古山镇", "禾丰镇", "祁禄山镇", "梓山镇", "银坑镇", "岭背镇", "罗坳镇", "罗江乡", "小溪乡", "利村乡", "新陂乡", "靖石乡", "黄麟乡", "沙心乡", "宽田乡", "葛坳乡", "桥头乡", "马安乡", "仙下乡", "车溪乡", "段屋乡", "于都工业园"], ["潋江镇", "江背镇", "古龙冈镇", "梅窖镇", "高兴镇", "良村镇", "龙口镇", "兴江乡", "樟木乡", "东村乡", "兴莲乡", "杰村乡", "社富乡", "埠头乡", "永丰乡", "隆坪乡", "均村乡", "茶园乡", "崇贤乡", "枫边乡", "南坑乡", "城岗乡", "方太乡", "鼎龙乡", "长冈乡", "兴国县工业园"], ["文武坝镇", "筠门岭镇", "西江镇", "周田镇", "麻州镇", "庄口镇", "清溪乡", "右水乡", "高排乡", "晓龙乡", "珠兰乡", "洞头乡", "中村乡", "站塘乡", "永隆乡", "富城乡", "小密乡", "庄埠乡", "白鹅乡", "会昌县燕子窝工业园"], ["长宁镇", "晨光镇", "留车镇", "南桥镇", "吉潭镇", "澄江镇", "桂竹帽镇", "文峰乡", "三标乡", "菖蒲乡", "龙廷乡", "丹溪乡", "项山乡", "水源乡", "罗珊乡"], ["琴江镇", "小松镇", "屏山镇", "横江镇", "高田镇", "木兰乡", "丰山乡", "大由乡", "龙岗乡", "珠坑乡"], ["象湖镇", "瑞林镇", "壬田镇", "九堡镇", "沙洲坝镇", "谢坊镇", "武阳镇", "叶坪乡", "丁陂乡", "大柏地乡", "岗面乡", "日东乡", "万田乡", "黄柏乡", "云石山乡", "泽覃乡", "拔英乡", "江西瑞金经济开发区"]], [["古南街道", "永叔街道", "文山街道", "习溪桥街道", "北门街道", "白塘街道", "禾埠街道", "兴桥镇", "樟山镇", "长塘镇", "曲濑镇", "吉州区工业园小区"], ["河东街道", "滨江街道", "天玉镇", "值夏镇", "新圩镇", "富滩镇", "富田镇", "文陂镇", "东固畲族少数民族乡", "青原区河东经济开发区", "东固垦殖场"], ["高新街道", "金鸡湖街道", "敦厚镇", "永阳镇", "天河镇", "横江镇", "固江镇", "万福镇", "永和镇", "桐坪镇", "凤凰镇", "油田镇", "敖城镇", "梅塘镇", "浬田镇", "北源乡", "大冲乡", "登龙乡", "安塘乡", "官田乡", "指阳乡", "吉安高新技术产业园区", "井冈山经济技术开发区"], ["文峰镇", "阜田镇", "盘谷镇", "枫江镇", "黄桥镇", "金滩镇", "八都镇", "双村镇", "醪桥镇", "螺田镇", "白沙镇", "白水镇", "丁江镇", "乌江镇", "水南镇", "尚贤乡", "水田乡", "冠山乡", "吉水县工业园区"], ["水边镇", "马埠镇", "巴邱镇", "仁和镇", "砚溪镇", "罗田镇", "桐林乡", "福民乡", "戈坪乡", "金江乡", "金坪民族乡", "峡江县工业园区"], ["洋峰街道办", "金川镇", "三湖镇", "大洋洲镇", "七琴镇", "麦斜镇", "界埠镇", "溧江镇", "桃溪乡", "城上乡", "潭丘乡", "神政桥乡", "沂江乡", "荷浦乡", "新干工业园区", "地质大队", "黎山林场"], ["恩江镇", "坑田镇", "沿陂镇", "古县镇", "瑶田镇", "藤田镇", "石马镇", "沙溪镇", "佐龙乡", "八江乡", "潭城乡", "鹿冈乡", "七都乡", "陶塘乡", "中村乡", "上溪乡", "潭头乡", "三坊乡", "上固乡", "君埠乡", "龙冈畲族乡", "永丰县工业园区", "罗铺垦殖场", "官山林场"], ["澄江镇", "碧溪镇", "桥头镇", "禾市镇", "螺溪镇", "苏溪镇", "马市镇", "塘洲镇", "冠朝镇", "沙村镇", "老营盘镇", "小龙镇", "灌溪镇", "苑前镇", "万合镇", "沿溪镇", "石山乡", "南溪乡", "上模乡", "水槎乡", "上圯乡", "中龙乡", "小龙矿区管委会", "八一八矿区", "井冈山机场", "泰和县工业园区", "武山垦殖场", "综合垦殖场"], ["泉江镇", "雩田镇", "碧洲镇", "草林镇", "堆子前镇", "左安镇", "高坪镇", "大汾镇", "衙前镇", "禾源镇", "汤湖镇", "枚江镇", "珠田乡", "巾石乡", "大坑乡", "双桥乡", "新江乡", "五斗江乡", "西溪乡", "南江乡", "黄坑乡", "戴家埔乡", "营盘圩乡", "遂川县工业园区", "五指峰林场", "云岭林场"], ["芙蓉镇", "五丰镇", "枧头镇", "窑头镇", "百嘉镇", "高陂镇", "潞田镇", "沙坪镇", "夏造镇", "罗塘乡", "弹前乡", "武术乡", "宝山乡", "涧田乡", "顺峰乡", "韶口乡", "万安县工业园", "万安县麻源垦殖场"], ["平都镇", "浒坑镇", "洲湖镇", "横龙镇", "洋溪镇", "严田镇", "枫田镇", "竹江乡", "瓜畲乡", "钱山乡", "赤谷乡", "山庄乡", "洋门乡", "金田乡", "彭坊乡", "泰山乡", "寮塘乡", "甘洛乡", "章庄乡", "安福县工业园"], ["禾川镇", "石桥镇", "龙源口镇", "浬田镇", "龙门镇", "沙市镇", "文竹镇", "埠前镇", "怀忠镇", "高桥楼镇", "坳南乡", "曲白乡", "才丰乡", "烟阁乡", "在中乡", "三湾乡", "台岭乡", "龙田乡", "高溪乡", "莲洲乡", "高市乡", "象形乡", "芦溪乡", "永新县工业园区", "永新县综合垦殖场"], ["红星街道", "厦坪镇", "龙市镇", "古城镇", "新城镇", "大陇镇", "茨坪镇", "拿山乡", "黄垇乡", "下七乡", "长坪乡", "坳里乡", "鹅岭乡", "柏露乡", "茅坪乡", "葛田乡", "荷花乡", "睦村乡", "东上乡", "井企集团", "井冈山自然保护区", "井冈山市工业园区", "白石垦殖场"]], [["灵泉街道", "秀江街道", "湛郎街道", "珠泉街道", "化成街道", "官园街道", "下浦街道", "凤凰街道", "金园街道", "新康府街道（油茶林场）", "彬江镇", "西村镇", "金瑞镇", "温汤镇", "三阳镇", "慈化镇", "天台镇", "洪塘镇", "渥江镇", "新坊镇", "寨下镇", "芦村镇", "湖田镇", "新田镇", "南庙镇", "竹亭镇", "水江镇", "辽市镇", "洪江镇", "楠木乡", "柏木乡", "飞剑潭乡", "宜春经济开发区管理委员会", "袁州区工业园区", "宜春市明月山温泉风景名胜区管理局", "宜春市宜阳新区管理委员会", "农牧实验场", "西岭布果园场", "明月山采育林场"], ["冯川镇", "赤岸镇", "赤田镇", "宋埠镇", "干洲镇", "澡下镇", "会埠镇", "罗市镇", "上富镇", "甘坊镇", "仰山乡", "澡溪乡", "柳溪乡", "奉新县工业园区", "石溪", "百丈山名胜风景区", "干洲垦殖场", "东风垦殖场", "农牧渔良种场"], ["康乐街道", "株潭镇", "黄茅镇", "潭埠镇", "双桥镇", "高村镇", "罗城镇", "三兴镇", "高城镇", "白良镇", "鹅峰乡", "马步乡", "赤兴乡", "岭东乡", "白水乡", "仙源乡", "茭湖乡", "万载县工业园区"], ["敖阳街道", "田心镇", "徐家渡镇", "锦江镇", "泗溪镇", "翰堂镇", "南港镇", "敖山镇", "新界埠镇", "蒙山镇", "芦洲乡", "塔下乡", "镇渡乡", "野市乡", "墨山乡", "上高县工业园区", "上甘山林场"], ["新昌镇", "澄塘镇", "棠浦镇", "新庄镇", "潭山镇", "芳溪镇", "石市镇", "黄岗镇", "花桥乡", "同安乡", "天宝乡", "桥西乡", "宜丰县工业园区", "车上林场", "双峰林场", "石花尖垦殖场", "黄岗山垦殖场"], ["双溪镇", "仁首镇", "宝峰镇", "高湖镇", "璪都镇", "香田乡", "水口乡", "中源乡", "罗湾乡", "三爪仑乡", "雷公尖乡", "靖安县工业园区"], ["永宁镇", "温泉镇", "棋坪镇", "排埠镇", "三都镇", "大塅镇", "高桥乡", "港口乡", "带溪乡", "江西铜鼓工业园区", "花山林场", "大沩山林场", "茶山林场", "龙门林场"], ["剑光街道", "河洲街道", "剑南街道", "孙渡街道", "尚庄街道", "白土镇", "袁渡镇", "张巷镇", "杜市镇", "淘沙镇", "秀市镇", "洛市镇", "铁路镇", "丽村镇", "董家镇", "隍城镇", "小港镇", "石滩镇", "桥东镇", "荣塘镇", "拖船镇", "泉港镇", "梅林镇", "曲江镇", "上塘镇", "筱塘乡", "段潭乡", "蕉坑乡", "石江乡", "荷湖乡", "湖塘乡", "同田乡", "丰城市工业园区"], ["淦阳街道", "鹿江街道", "福城街道", "大桥街道", "张家山街道", "临江镇", "永泰镇", "黄土岗镇", "经楼镇", "昌付镇", "店下镇", "阁山镇", "刘公庙镇", "观上镇", "义成镇", "中洲乡", "洲上乡", "洋湖乡", "吴城乡", "樟树市工业园区", "滨江新城", "省双金园艺场"], ["瑞州街道", "筠阳街道", "蓝坊镇", "荷岭镇", "黄沙岗镇", "新街镇", "八景镇", "独城镇", "太阳镇", "建山镇", "田南镇", "相城镇", "灰埠镇", "石脑镇", "龙潭镇", "杨圩镇", "村前镇", "伍桥镇", "祥符镇", "大城镇", "华林山镇", "上湖乡", "汪家圩乡", "高安市新世纪工业城管委会", "英岗岭矿务局", "江西八景煤矿有限公司", "江西新茂实业公司", "相城垦殖场", "上游水库工程管理局", "江西省瑞州监狱"]], [["青云街道", "西大街街道", "荆公路街道", "六水桥街道", "文昌街道", "城西街道办事处（金巢开", "钟岭街道办事处（金巢开", "上顿渡镇", "温泉镇", "高坪镇", "秋溪镇", "荣山镇", "龙溪镇", "大岗镇", "云山镇", "唱凯镇", "罗针镇", "罗湖镇", "太阳镇", "东馆镇", "腾桥镇", "青泥镇", "孝桥镇", "抚北镇", "崇岗镇（金巢开发区）", "展坪乡", "连城乡", "桐源乡", "湖南乡", "七里岗乡", "嵩湖乡", "鹏田乡", "茅排乡", "河埠乡", "荣山垦殖场", "七里岗垦殖场", "开发区管理委员会"], ["建昌镇", "株良镇", "上唐镇", "里塔镇", "洪门镇", "沙洲镇", "龙湖镇", "新丰街镇", "万坊镇", "徐家镇", "天井源乡", "浔溪乡", "南城县工业园区管理委员会"], ["日峰镇", "宏村镇", "洵口镇", "熊村镇", "龙安镇", "德胜镇", "华山镇", "潭溪乡", "湖坊乡", "荷源乡", "厚村乡", "社苹乡", "樟溪乡", "西城乡", "中田乡", "黎川县工业园区管理委员会", "德胜企业集团"], ["琴城镇", "太和镇", "白舍镇", "市山镇", "洽湾镇", "桑田镇", "紫霄镇", "三溪乡", "东坪乡", "莱溪乡", "太源乡", "傅坊乡", "南丰县长红垦殖场", "南丰工业园区"], ["巴山镇", "相山镇", "航埠镇", "孙坊镇", "河上镇", "礼陂镇", "马鞍镇", "石庄乡", "六家桥乡", "白路乡", "三山乡", "白陂乡", "桃源乡", "许坊乡", "郭圩乡"], ["鳌溪镇", "公溪镇", "山砀镇", "龚坊镇", "戴坊镇", "牛田镇", "万崇镇", "增田镇", "招携镇", "湖溪乡", "罗陂乡", "湖坪乡", "南村乡", "谷岗乡", "金竹畲族乡", "大马头乡"], ["凤冈镇", "棠阴镇", "黄陂镇", "东陂镇", "梨溪镇", "二都镇", "中港镇", "桃陂镇", "新丰乡", "神岗乡", "圳口乡", "南源乡", "黄柏岭垦殖场", "青年垦殖场", "宜黄县工业园区"], ["秀谷镇", "浒湾镇", "双塘镇", "何源镇", "合市镇", "琅琚镇", "左坊镇", "对桥镇", "黄通乡", "陆坊乡", "陈坊积乡", "琉璃乡", "石门乡", "华侨农场", "江西金溪工业园区管理委员会"], ["鹤城镇", "马头山镇", "高阜镇", "嵩市镇", "乌石镇", "高田乡", "石峡乡"], ["孝岗镇", "小璜镇", "圩上桥镇", "马圩镇", "詹圩镇", "岗上积镇", "杨桥殿镇", "黎圩镇", "王桥镇", "珀玕乡", "邓家乡", "虎圩乡", "瑶圩乡", "红星垦殖场", "红光垦殖场", "红亮垦殖场", "甘坑生态林场", "江西铜业集团公司东同矿业有限责任公司", "江西磷肥厂", "东乡县经济开发区"], ["盱江镇", "头陂镇", "赤水镇", "驿前镇", "甘竹镇", "塘坊镇", "千善乡", "水南圩乡", "长桥乡", "杨溪乡", "尖峰乡", "翠雷山垦殖场", "广昌县工业园区"]], [["水南街道", "东市街道", "西市街道", "北门街道", "茅家岭街道", "灵溪街道", "沙溪镇", "朝阳镇", "秦峰镇"], ["永丰街道", "芦林街道", "丰溪街道", "下溪街道", "大石街道", "五都镇", "洋口镇", "横山镇", "桐畈镇", "湖丰镇", "大南镇", "排山镇", "毛村镇", "枧底镇", "泉波镇", "壶峤镇", "霞峰镇", "吴村镇", "沙田镇", "铜钹山镇", "东阳乡", "嵩峰乡", "少阳乡", "铜拔山垦殖场"], ["旭日街道", "罗桥街道", "兴园街道", "田墩镇", "上泸镇", "华坛山镇", "茶亭镇", "皂头镇", "四十八镇", "枫岭头镇", "煌固镇", "花厅镇", "五府山镇", "郑坊镇", "望仙乡", "石人乡", "清水乡", "石狮乡", "湖村乡", "尊桥乡", "应家乡", "黄沙岭乡", "铁山乡", "董团乡"], ["枫林", "冰溪镇", "临湖镇", "必姆镇", "横街镇", "文成镇", "下镇镇", "岩瑞镇", "双明镇", "紫湖镇", "仙岩镇", "樟村镇", "南山乡", "怀玉乡", "下塘乡", "四股桥乡", "六都乡", "三清乡"], ["河口镇", "永平镇", "石塘镇", "鹅湖镇", "湖坊镇", "武夷山镇", "汪二镇", "陈坊乡", "虹桥乡", "新滩乡", "葛仙山乡", "稼轩乡", "英将乡", "紫溪乡", "太源畲族乡", "天柱山乡", "篁碧畲族乡", "江西铜业集团公司永铜分公司", "铅山县青溪服务中心", "铅山县国营森林苗圃"], ["兴安街道", "岑阳镇", "葛源镇", "姚家乡", "莲荷乡", "司铺乡", "港边乡", "龙门畈乡", "青板乡", "铺前煤矿", "红桥垦殖场", "上坑源林场", "山黄林场", "新篁"], ["桃源街道", "曹溪镇", "漆工镇", "樟树墩镇", "南岩镇", "朱坑镇", "圭峰镇", "叠山镇", "港口镇", "弋江镇", "中畈乡", "葛溪乡", "湾里乡", "清湖乡", "旭光乡", "花亭垦殖场", "三县岭垦殖场"], ["玉亭镇", "瑞洪镇", "黄金埠镇", "古埠镇", "乌泥镇", "石口镇", "杨埠镇", "九龙镇", "社赓镇", "康山乡", "东塘乡", "大塘乡", "鹭鸶港乡", "三塘乡", "洪家嘴乡", "白马桥乡", "江埠乡", "枫港乡", "大溪乡", "梅港乡", "渔池湖水产场", "县良种场", "李梅林场", "康山垦总场", "禾斛岭垦殖场", "峡山林场", "信丰垦殖场"], ["饶州街道", "鄱阳镇", "谢家滩镇", "石门街镇", "四十里街镇", "油墩街镇", "田畈街镇", "金盘岭镇", "高家岭镇", "凰岗镇", "双港镇", "古县渡镇", "饶丰镇", "乐丰镇", "饶埠镇", "侯家岗乡", "莲花山乡", "响水滩乡", "枧田街乡", "柘港乡", "鸦鹊湖乡", "银宝湖乡", "游城乡", "珠湖乡", "白沙洲乡", "团林乡", "昌洲乡", "庙前乡", "莲湖乡", "芦田乡", "农科所", "饶洲监狱"], ["陈营镇", "石镇镇", "青云镇", "梓埠镇", "大源镇", "裴梅镇", "湖云乡", "齐埠乡", "汪家乡", "上坊乡", "苏桥乡", "珠田乡"], ["蚺城街道", "紫阳镇", "清华镇", "秋口镇", "江湾镇", "思口镇", "赋春镇", "镇头镇", "太白镇", "中云镇", "许村镇", "溪头乡", "段莘乡", "浙源乡", "沱川乡", "大鄣山乡", "珍珠山乡"], ["银城街道", "新营街道", "香屯街道", "绕二镇", "海口镇", "新岗山镇", "泗洲镇", "花桥镇", "黄柏乡", "万村乡", "张村乡", "昄大乡", "李宅乡", "龙头山乡", "江西省德兴铜矿"]]], [[["解放路街道", "千佛山街道", "趵突泉街道", "泉城路街道", "大明湖街道", "东关街道", "文东街道", "建新街道", "甸柳街道", "燕山街道", "姚家街道", "龙洞街道", "智远街道", "舜华路街道"], ["大观园街道", "杆石桥街道", "四里村街道", "魏家庄街道", "二七街道", "七里山街道", "六里山街道", "舜玉路街道", "泺源街道", "王官庄街道", "舜耕街道", "白马山街道", "七贤街道", "十六里河街道", "兴隆街道", "党家街道", "陡沟街道"], ["振兴街街道", "中大槐树街道", "道德街街道", "西市场街道", "五里沟街道", "营市街街道", "青年公园街道", "南辛庄街道", "段店北路街道", "张庄路街道", "匡山街道", "美里湖街道", "腊山街道", "兴福街道", "玉清湖街道", "吴家堡街道"], ["无影山街道", "天桥东街街道", "北村街道", "南村街道", "堤口路街道", "北坦街道", "制锦市街道", "宝华街道", "官扎营街道", "纬北路街道", "药山街道", "北园街道", "泺口街道", "桑梓店镇", "大桥镇"], ["山大路街道", "洪家楼街道", "东风街道", "全福街道", "孙村街道", "巨野河街道", "华山街道", "荷花路街道", "王舍人街道", "鲍山街道", "郭店街道", "唐冶街道", "港沟街道", "遥墙街道", "临港街道", "仲宫镇", "柳埠镇", "董家镇", "唐王镇", "西营镇", "彩石镇"], ["文昌街道", "崮云湖街道", "平安街道", "五峰山街道", "归德镇", "孝里镇", "万德镇", "张夏镇", "马山镇", "双泉镇"], ["榆山街道", "锦水街道", "东阿镇", "孝直镇", "孔村镇", "洪范池镇", "玫瑰镇", "安城镇"], ["济阳街道", "济北街道", "垛石镇", "孙耿镇", "曲堤镇", "仁风镇", "崔寨镇", "太平镇", "回河镇", "新市镇"], ["许商街道", "殷巷镇", "怀仁镇", "龙桑寺镇", "郑路镇", "贾庄镇", "玉皇庙镇", "白桥镇", "孙集镇", "韩庙镇", "沙河乡", "张坊乡"], ["明水街道", "双山街道", "枣园街道", "龙山街道", "埠村街道", "圣井街道", "普集街道", "绣惠街道", "相公庄街道", "文祖街道", "官庄街道", "垛庄镇", "水寨镇", "刁镇", "曹范镇", "白云湖镇", "高官寨镇", "宁家埠镇", "辛寨镇", "黄河镇"]], [["香港中路街道", "八大峡街道", "云南路街道", "中山路街道", "江苏路街道", "八大关街道", "湛山街道", "八大湖街道", "金门路街道", "珠海路街道"], ["辽宁路街道", "延安路街道", "登州路街道", "宁夏路街道", "敦化路街道", "辽源路街道", "合肥路街道", "大港街道", "即墨路街道", "台东街道", "镇江路街道", "浮山新区街道", "阜新路街道", "海伦路街道", "四方街道", "兴隆路街道", "水清沟街道", "洛阳路街道", "河西街道"], ["黄岛街道", "辛安街道", "薛家岛街道", "灵珠山街道", "长江路街道", "红石崖街道", "灵山卫街道", "珠海街道", "隐珠街道", "铁山街道", "滨海街道", "胶南街道", "王台镇", "张家楼镇", "琅琊镇", "泊里镇", "大场镇", "大村镇", "六汪镇", "海青镇", "宝山镇", "藏南镇"], ["中韩街道", "沙子口街道", "王哥庄街道", "北宅街道"], ["振华路街道", "沧口街道", "兴华路街道", "兴城路街道", "李村街道", "虎山路街道", "浮山路街道", "湘潭路街道", "楼山街道", "九水街道", "世园街道"], ["城阳街道", "夏庄街道", "流亭街道", "棘洪滩街道", "上马街道", "惜福镇街道"], ["阜安街道", "中云街道", "三里河街道", "九龙街道", "胶东街道", "胶北街道", "胶莱镇", "李哥庄镇", "铺集镇", "里岔镇", "胶西镇", "洋河镇"], ["环秀街道", "潮海街道", "通济街道", "北安街道", "龙山街道", "龙泉街道", "鳌山卫街道", "温泉街道", "蓝村镇", "灵山镇", "段泊岚镇", "移风店镇", "大信镇", "田横镇", "金口镇"], ["东阁街道", "李园街道", "同和街道", "凤台街道", "白沙河街道", "古岘镇", "仁兆镇", "南村镇", "蓼兰镇", "崔家集镇", "明村镇", "田庄镇", "新河镇", "店子镇", "大泽山镇", "旧店镇", "云山镇", "平度外向型工业加工区"], ["水集街道", "望城街道", "沽河街道", "姜山镇", "夏格庄镇", "院上镇", "日庄镇", "南墅镇", "河头店镇", "店埠镇", "马连庄镇"]], [["般阳路街道", "松龄路街道", "钟楼街道", "将军路街道", "昆仑镇", "岭子镇", "西河镇", "龙泉镇", "寨里镇", "罗村镇", "洪山镇", "双杨镇", "太河镇"], ["车站街道", "公园街道", "湖田街道", "和平街道", "科苑街道", "体育场街道", "四宝山街道", "马尚镇", "南定镇", "沣水镇", "傅家镇", "中埠镇", "房镇镇"], ["城东街道", "城西街道", "山头街道", "域城镇", "白塔镇", "八陡镇", "石马镇", "源泉镇", "池上镇", "博山镇"], ["闻韶街道", "雪宫街道", "辛店街道", "稷下街道", "齐陵街道", "齐都镇", "皇城镇", "敬仲镇", "朱台镇", "金岭镇", "凤凰镇", "金山镇"], ["丝绸路街道", "大街街道", "青年路街道", "永安街道", "城北路街道", "北郊镇", "南郊镇", "王村镇", "萌水镇", "商家镇"], ["索镇街道", "少海街道", "起凤镇", "田庄镇", "荆家镇", "马桥镇", "新城镇", "唐山镇", "果里镇"], ["田镇街道", "芦湖街道", "青城镇", "高城镇", "黑里寨镇", "唐坊镇", "常家镇", "花沟镇", "木李镇"], ["历山街道", "南麻街道", "鲁村镇", "东里镇", "悦庄镇", "西里镇", "大张庄镇", "中庄镇", "张家坡镇", "燕崖镇", "石桥镇", "南鲁山镇"]], [["中心街街道", "各塔埠街道", "矿区街道", "文化路街道办事", "龙山路街道", "光明路街道办事", "税郭镇", "孟庄镇", "齐村镇", "永安镇", "西王庄镇"], ["临城街道", "兴仁街道", "兴城街道", "张范街道", "沙沟镇", "周营镇", "邹坞镇", "陶庄镇", "常庄镇"], ["坛山街道办", "吴林街道办", "古邵镇", "阴平镇", "底阁镇", "榴园镇", "峨山镇"], ["运河街道", "邳庄镇", "张山子镇", "泥沟镇", "涧头集镇", "马兰屯镇"], ["山城街道", "店子镇", "西集镇", "桑村镇", "北庄镇", "城头镇", "徐庄镇", "水泉镇", "冯卯镇", "凫城镇"], ["荆河街道", "龙泉街道", "北辛街道", "善南街道", "东沙河镇", "洪绪镇", "南沙河镇", "大坞镇", "滨湖镇", "级索镇", "西岗镇", "姜屯镇", "鲍沟镇", "张汪镇", "官桥镇", "柴胡店镇", "羊庄镇", "木石镇", "界河镇", "龙阳镇", "东郭镇"]], [["文汇街道", "黄河路街道", "东城街道", "辛店街道", "胜利街道", "胜园街道", "牛庄镇", "六户镇", "史口镇", "龙居镇"], ["河口街道", "六合街道", "义和镇", "仙河镇", "孤岛镇", "新户镇", "开发区管委会", "河口蓝色经济开发区管理委员会"], ["垦利街道", "兴隆街道", "胜坨镇", "郝家镇", "永安镇", "黄河口镇", "董集镇", "开发区类似乡级单位", "红光类似乡级单位", "垦东类似乡级单位", "东营市现代畜牧业示范区类似乡级单位"], ["利津街道", "凤凰城街道", "北宋镇", "盐窝镇", "陈庄镇", "汀罗镇", "明集乡", "刁口乡", "利津县经济开发区", "利津县县城社区管理委员会"], ["广饶街道", "乐安街道", "大王镇", "稻庄镇", "丁庄镇", "李鹊镇", "大码头镇", "花官镇", "陈官镇", "东营农业高新技术产业示范区", "广饶滨海新区管理委员会"]], [["向阳街道", "东山街道", "毓璜顶街道", "通伸街道", "凤凰台街道", "奇山街道", "白石街道", "芝罘岛街道", "黄务街道", "只楚街道", "世回尧街道", "幸福街道"], ["清洋街道", "福新街道", "东厅街道", "门楼街道", "高疃镇", "张格庄镇", "回里镇"], ["宁海街道", "文化街道", "武宁街道", "大窑街道", "姜格庄街道", "观水镇", "龙泉镇", "玉林店镇", "水道镇", "高陵镇", "王格庄镇", "昆嵛镇", "莒格庄镇"], ["黄海路街道", "初家街道", "滨海路街道", "解甲庄街道", "莱山街道", "院格庄街道"], ["南长山街道", "砣矶镇", "北长山乡", "黑山乡", "大钦岛乡", "小钦岛乡", "南隍城乡", "北隍城乡"], ["东莱街道", "龙港街道", "新嘉街道", "徐福街道", "东江街道", "黄山馆镇", "北马镇", "芦头镇", "下丁家镇", "七甲镇", "石良镇", "兰高镇", "诸由观镇", "山东龙口高新技术产业园区管理委员会"], ["城厢街道", "古柳街道", "龙旺庄街道", "冯格庄街道", "柏林庄街道", "沐浴店镇", "团旺镇", "穴坊镇", "羊郡镇", "姜疃镇", "万第镇", "照旺庄镇", "谭格庄镇", "河洛镇", "吕格庄镇", "高格庄镇", "大夼镇", "山前店镇"], ["文昌路街道", "永安路街道", "三山岛街道", "城港路街道", "文峰路街道", "金仓街道", "沙河镇", "朱桥镇", "郭家店镇", "金城镇", "平里店镇", "驿道镇", "程郭镇", "虎头崖镇", "柞村镇", "夏邱镇", "土山镇"], ["登州街道", "紫荆山街道", "新港街道", "蓬莱阁街道", "南王街道", "刘家沟镇", "潮水镇", "大柳行镇", "小门家镇", "大辛店镇", "村里集镇", "北沟镇"], ["罗峰街道", "泉山街道", "梦芝街道", "温泉街道", "大秦家街道", "辛庄镇", "蚕庄镇", "金岭镇", "毕郭镇", "玲珑镇", "张星镇", "夏甸镇", "阜山镇", "齐山镇"], ["翠屏街道", "庄园街道", "松山街道", "观里镇", "蛇窝泊镇", "唐家泊镇", "桃村镇", "亭口镇", "臧家庄镇", "寺口镇", "苏家店镇", "杨础镇", "西城镇", "官道镇", "庙后镇", "山东栖霞经济开发区"], ["方圆街道", "东村街道", "凤城街道", "龙山街道", "留格庄镇", "盘石店镇", "郭城镇", "徐家店镇", "发城镇", "小纪镇", "行村镇", "辛安镇", "二十里店镇", "朱吴镇", "外向型工业加工区", "碧城工业区", "旅游度假区", "核电装备制造工业园区"]], [["城关街道", "南关街道", "西关街道", "北关街道", "于河街道", "望留街道", "潍城经济开发区"], ["寒亭街道", "开元街道", "固堤街道", "高里街道", "朱里街道"], ["凤凰街道", "坊安街道", "坊城街道", "九龙街道", "黄旗堡街道", "太保庄街道", "王家庄街道"], ["东关街道", "大虞街道", "梨园街道", "廿里堡街道", "潍州路街道", "北苑街道", "广文街道", "新城街道", "清池街道", "北海路街道"], ["城关街道", "东城街道", "五井镇", "冶源镇", "寺头镇", "九山镇", "辛寨镇", "山旺镇", "柳山镇", "蒋峪镇"], ["宝都街道", "宝城街道", "朱刘街道", "五图街道", "乔官镇", "唐吾镇", "红河镇", "营丘镇"], ["王府街道", "益都街道", "云门山街道", "黄楼街道", "弥河镇", "王坟镇", "庙子镇", "邵庄镇", "高柳镇", "何官镇", "东夏镇", "谭坊镇", "青州经济开发区管理委员会"], ["密州街道", "龙都街道", "舜王街道", "枳沟镇", "贾悦镇", "石桥子镇", "相州镇", "昌城镇", "百尺河镇", "辛兴镇", "林家村镇", "皇华镇", "桃林镇", "诸城经济开发区管理委员会"], ["圣城街道", "文家街道", "古城街道", "洛城街道", "孙家集街道", "化龙镇", "营里镇", "台头镇", "田柳镇", "上口镇", "侯镇", "纪台镇", "稻田镇", "羊口镇", "双王城生态经济园区管委会"], ["兴安街道", "新安街道", "景芝镇", "凌河镇", "官庄镇", "大盛镇", "石埠子镇", "石堆镇", "柘山镇", "辉渠镇", "吾山镇", "金冢子镇"], ["高密市朝阳街道", "高密市醴泉街道", "高密市密水街道", "柏城镇", "夏庄镇", "姜庄镇", "大牟家镇", "阚家镇", "井沟镇", "柴沟镇"], ["奎聚街道", "都昌街道", "围子街道", "柳疃镇", "龙池镇", "卜庄镇", "饮马镇", "北孟镇", "下营镇"]], [["许庄街道", "李营街道", "南张街道", "仙营街道", "金城街道", "廿里铺街道", "古槐街道", "济阳街道", "阜桥街道", "越河街道", "观音阁街道", "南苑街道", "安居街道", "唐口街道", "长沟镇", "石桥镇", "喻屯镇"], ["鼓楼街道", "龙桥街道", "酒仙桥街道", "大安镇", "新驿镇", "颜店镇", "新兖镇", "漕河镇", "兴隆庄镇", "小孟镇"], ["夏镇街道", "昭阳街道", "傅村街道", "韩庄镇", "欢城镇", "南阳镇", "鲁桥镇", "留庄镇", "两城镇", "马坡镇", "赵庙镇", "张楼镇", "微山岛镇", "西平镇", "高楼乡"], ["谷亭街道", "滨湖街道", "清河镇", "鱼城镇", "王鲁镇", "张黄镇", "王庙镇", "李阁镇", "唐马镇", "老砦镇", "罗屯镇"], ["金乡街道", "高河街道", "鱼山街道", "王丕街道", "羊山镇", "胡集镇", "霄云镇", "鸡黍镇", "司马镇", "马庙镇", "化雨镇", "卜集镇", "兴隆镇"], ["嘉祥镇街道", "卧龙山街道", "纸坊镇", "梁宝寺镇", "疃里镇", "马村镇", "金屯镇", "大张楼镇", "马集镇", "万张镇", "孟姑集镇", "老僧堂镇", "仲山镇", "满硐镇", "黄垓镇", "嘉祥经济开发区管理委员会"], ["中都街道", "汶上街道", "南站镇", "南旺镇", "次丘镇", "寅寺镇", "郭楼镇", "康驿镇", "苑庄镇", "义桥镇", "郭仓镇", "白石镇", "杨店镇", "刘楼镇", "军屯乡"], ["泗河街道", "济河街道", "泉林镇", "星村镇", "柘沟镇", "金庄镇", "苗馆镇", "中册镇", "杨柳镇", "泗张镇", "圣水峪镇", "高峪镇", "华村镇"], ["水泊街道", "梁山街道", "小路口镇", "韩岗镇", "拳铺镇", "杨营镇", "韩垓镇", "馆驿镇", "小安山镇", "寿张集镇", "黑虎庙镇", "马营镇", "赵堌堆乡", "大路口乡", "梁山经济开发区"], ["鲁城街道", "书院街道", "时庄街道", "小雪街道", "吴村镇", "姚村镇", "陵城镇", "尼山镇", "王庄镇", "息陬镇", "石门山镇", "防山镇"], ["钢山街道", "千泉街道", "凫山街道", "香城镇", "城前镇", "大束镇", "北宿镇", "中心店镇", "唐村镇", "太平镇", "石墙镇", "峄山镇", "看庄镇", "张庄镇", "田黄镇", "郭里镇"]], [["岱庙街道", "财源街道", "泰前街道", "上高街道", "徐家楼街道", "省庄镇", "邱家店镇", "大津口乡"], ["粥店街道", "天平街道", "北集坡街道", "山口镇", "祝阳镇", "范镇", "角峪镇", "徂徕镇", "满庄镇", "夏张镇", "道朗镇", "黄前镇", "大汶口镇", "马庄镇", "房村镇", "良庄镇", "下港镇", "化马湾乡"], ["文庙街道", "八仙桥街道", "泗店镇", "东疏镇", "伏山镇", "堽城镇", "蒋集镇", "磁窑镇", "华丰镇", "葛石镇", "东庄镇", "鹤山镇", "乡饮乡"], ["东平街道", "州城街道", "彭集街道", "沙河站镇", "老湖镇", "银山镇", "斑鸠店镇", "接山镇", "大羊镇", "梯门镇", "新湖镇", "戴庙镇", "商老庄乡", "旧县乡"], ["青云街道", "新汶街道", "新甫街道", "东都镇", "小协镇", "翟镇", "泉沟镇", "羊流镇", "果都镇", "西张庄镇", "天宝镇", "楼德镇", "禹村镇", "宫里镇", "谷里镇", "石莱镇", "放城镇", "刘杜镇", "汶南镇", "龙廷镇", "岳家庄乡"], ["新城街道", "老城街道", "王瓜店街道", "仪阳街道", "潮泉镇", "桃园镇", "王庄镇", "湖屯镇", "石横镇", "安临站镇", "孙伯镇", "安驾庄镇", "汶阳镇", "边院镇"]], [["环翠楼街道", "鲸园街道", "竹岛街道", "孙家疃街道", "张村镇", "羊亭镇", "温泉镇", "嵩山街道"], ["龙山路街道", "天福路街道", "环山路街道", "文登营镇", "大水泊镇", "张家产镇", "高村镇", "泽库镇", "侯家镇", "宋村镇", "泽头镇", "小观镇", "葛家镇", "米山镇", "界石镇", "开发区", "埠口港管理委员会"], ["宁津街道", "港湾街道", "桃园街道", "王连街道", "东山街道", "斥山街道", "崖头街道", "城西街道", "寻山街道", "崂山街道", "俚岛镇", "成山镇", "埠柳镇", "港西镇", "夏庄镇", "崖西镇", "荫子镇", "滕家镇", "大疃镇", "上庄镇", "虎山镇", "人和镇"], ["城区街道", "夏村镇", "乳山口镇", "海阳所镇", "白沙滩镇", "大孤山镇", "南黄镇", "冯家镇", "下初镇", "午极镇", "育黎镇", "崖子镇", "诸往镇", "乳山寨镇", "徐家镇"]], [["日照街道", "石臼街道", "秦楼街道", "卧龙山街道", "两城街道", "河山镇", "后村镇", "西湖镇", "陈疃镇", "南湖镇", "三庄镇"], ["岚山头街道", "安东卫街道", "碑廓镇", "虎山镇", "巨峰镇", "高兴镇", "黄墩镇", "中楼镇", "前三岛乡"], ["洪凝街道", "街头镇", "潮河镇", "许孟镇", "于里镇", "汪湖镇", "叩官镇", "中至镇", "高泽镇", "松柏镇", "石场乡", "户部乡"], ["城阳街道", "招贤镇", "阎庄镇", "夏庄镇", "刘官庄镇", "峤山镇", "小店镇", "龙山镇", "东莞镇", "浮来山镇", "陵阳镇", "店子集镇", "长岭镇", "安庄镇", "棋山镇", "洛河镇", "寨里河镇", "桑园镇", "果庄镇", "库山乡", "莒县经济开发区"]], [["凤城街道", "张家洼街道", "高庄街道", "鹏泉街道", "口镇", "羊里镇", "方下镇", "牛泉镇", "苗山镇", "雪野镇", "大王庄镇", "寨里镇", "杨庄镇", "茶业口镇", "和庄镇"], ["艾山街道", "里辛街道", "汶源街道", "颜庄镇", "辛庄镇"]], [["兰山街道", "银雀山街道", "金雀山街道", "柳青街道", "白沙埠镇", "枣园镇", "半程镇", "义堂镇", "李官镇", "方城镇", "汪沟镇"], ["罗庄街道", "傅庄街道", "盛庄街道", "册山街道", "高都街道", "沂堂镇", "褚墩镇", "黄山镇"], ["九曲街道", "相公街道", "太平街道", "汤头街道", "凤凰岭街道", "汤河镇", "八湖镇", "郑旺镇"], ["界湖街道", "岸堤镇", "孙祖镇", "双堠镇", "青驼镇", "张庄镇", "砖埠镇", "大庄镇", "辛集镇", "蒲汪镇", "湖头镇", "苏村镇", "铜井镇", "依汶镇", "马牧池乡"], ["郯城街道", "马头镇", "重坊镇", "李庄镇", "杨集镇", "港上镇", "高峰头镇", "庙山镇", "红花镇", "胜利镇", "花园乡", "归昌乡", "泉源乡"], ["沂城街道", "马站镇", "高桥镇", "许家湖镇", "黄山铺镇", "诸葛镇", "崔家峪镇", "四十里堡镇", "杨庄镇", "夏蔚镇", "沙沟镇", "高庄镇", "院东头镇", "龙家圈镇", "富官庄镇", "道托镇", "泉庄镇", "圈里乡"], ["卞庄街道", "大仲村镇", "兰陵镇", "长城镇", "磨山镇", "神山镇", "车辋镇", "尚岩镇", "向城镇", "新兴镇", "南桥镇", "庄坞镇", "鲁城镇", "矿坑镇", "金岭镇", "芦柞镇", "下村乡"], ["费城街道", "上冶镇", "薛庄镇", "探沂镇", "朱田镇", "梁邱镇", "新庄镇", "马庄镇", "胡阳镇", "石井镇", "大田庄乡", "南张庄乡"], ["平邑街道", "仲村镇", "武台镇", "保太镇", "柏林镇", "卞桥镇", "地方镇", "铜石镇", "温水镇", "流峪镇", "郑城镇", "白彦镇", "临涧镇", "丰阳镇"], ["十字路街道", "大店镇", "坊前镇", "板泉镇", "洙边镇", "文疃镇", "石莲子镇", "岭泉镇", "筵宾镇", "涝坡镇", "道口镇", "相沟镇"], ["蒙阴街道", "常路镇", "岱崮镇", "坦埠镇", "垛庄镇", "高都镇", "野店镇", "桃墟镇", "联城镇", "旧寨乡"], ["临沭街道", "郑山街道", "蛟龙镇", "大兴镇", "石门镇", "曹庄镇", "青云镇", "玉山镇", "店头镇"]], [["新湖街道", "新华街道", "天衢街道", "广川街道", "二屯镇", "黄河涯镇"], ["安德街道", "临齐街道", "郑家寨镇", "糜镇", "宋家镇", "徽王庄镇", "神头镇", "滋镇", "前孙镇", "边临镇", "义渡口镇", "丁庄镇", "于集乡"], ["宁城街道", "津城街道", "柴胡店镇", "长官镇", "杜集镇", "保店镇", "大柳镇", "大曹镇", "相衙镇", "时集镇", "张大庄镇", "刘营伍乡"], ["渤海路街道", "庆云镇", "常家镇", "尚堂镇", "崔口镇", "东辛店镇", "严务乡", "中丁乡", "徐园子乡"], ["邢侗街道", "恒源街道", "临盘街道", "临邑镇", "临南镇", "德平镇", "林子镇", "兴隆镇", "孟寺镇", "翟家镇", "理合务镇", "宿安乡"], ["晏城街道", "晏北街道", "表白寺镇", "焦庙镇", "赵官镇", "祝阿镇", "仁里集镇", "潘店镇", "胡官屯镇", "宣章屯镇", "马集镇", "华店镇", "刘桥镇", "安头乡", "大黄乡"], ["龙门街道", "桃园街道", "王凤楼镇", "前曹镇", "恩城镇", "王庙镇", "王杲铺镇", "张华镇", "腰站镇", "王打卦镇", "坊子乡", "三唐乡", "平原县经济开发区"], ["银城街道", "北城街道", "南城镇", "苏留庄镇", "新盛店镇", "雷集镇", "郑保屯镇", "白马湖镇", "东李官屯镇", "宋楼镇", "香赵庄镇", "双庙镇", "渡口驿乡", "田庄乡"], ["广运街道", "武城镇", "老城镇", "鲁权屯镇", "郝王庄镇", "甲马营镇", "四女寺镇", "李家户镇"], ["市中街道", "胡家街道", "云红街道", "郭家街道", "杨安镇", "朱集镇", "黄夹镇", "丁坞镇", "花园镇", "郑店镇", "化楼镇", "孔镇", "铁营镇", "西段乡", "大孙乡", "寨头堡乡"], ["市中街道", "伦镇", "房寺镇", "张庄镇", "辛店镇", "安仁镇", "辛寨镇", "梁家镇", "十里望镇", "莒镇", "李屯乡", "东城街道"]], [["古楼街道", "柳园街道", "新区街道", "湖西街道", "道口铺街道", "阎寺街道", "凤凰街道", "北城街道", "东城街道", "蒋官屯街道", "侯营镇", "沙镇镇", "堂邑镇", "梁水镇", "斗虎屯镇", "郑家镇", "张炉集镇", "于集镇", "许营镇", "朱老庄镇", "顾官屯镇", "广平乡", "韩集乡", "香江管委会"], ["博济桥街道", "侨润街道", "狮子楼街道", "阎楼镇", "阿城镇", "七级镇", "安乐镇", "定水镇", "石佛镇", "李台镇", "寿张镇", "十五里园镇", "张秋镇", "郭店屯镇", "西湖镇", "高庙王镇", "金斗营镇", "大布乡"], ["燕塔街道", "莘亭街道", "莘州街道", "东鲁街道", "张鲁镇", "朝城镇", "观城镇", "古城镇", "大张家镇", "古云镇", "十八里铺镇", "燕店镇", "董杜庄镇", "王奉镇", "樱桃园镇", "河店镇", "妹冢镇", "魏庄镇", "张寨镇", "大王寨镇", "徐庄镇", "王庄集镇", "柿子园镇", "俎店镇"], ["振兴街道", "信发街道", "温陈街道", "乐平铺镇", "冯官屯镇", "菜屯镇", "博平镇", "杜郎口镇", "韩屯镇", "胡屯镇", "肖庄镇", "贾寨镇", "洪官屯镇", "杨官屯乡"], ["铜城街道", "新城街道", "刘集镇", "牛角店镇", "大桥镇", "高集镇", "姜楼镇", "姚寨镇", "鱼山镇", "陈集乡"], ["清泉街道", "崇文街道", "烟庄街道", "贾镇", "桑阿镇", "柳林镇", "清水镇", "东古城镇", "北馆陶镇", "店子镇", "定远寨镇", "辛集镇", "梁堂镇", "范寨镇", "斜店乡", "甘官屯乡", "兰沃乡", "万善乡"], ["鱼丘湖街道", "汇鑫街道", "人和街道", "梁村镇", "尹集镇", "清平镇", "固河镇", "三十里铺镇", "琉璃寺镇", "赵寨子镇", "姜店镇", "杨屯镇"], ["青年路街道", "新华路街道", "先锋路街道", "大辛庄街道", "松林镇", "老赵庄镇", "康庄镇", "魏湾镇", "刘垓子镇", "八岔路镇", "潘庄镇", "烟店镇", "唐园镇", "金郝庄镇", "戴湾镇", "尚店镇"]], [["市中街道", "市西街道", "北镇街道", "市东街道", "彭李街道", "小营街道", "滨北街道", "梁才街道", "杜店街道", "沙河街道", "里则街道", "青田街道", "三河湖镇", "杨柳雪镇", "秦皇台乡"], ["富国街道", "富源街道", "下洼镇", "古城镇", "冯家镇", "泊头镇", "大高镇", "黄升镇", "滨海镇", "下河乡", "利国乡", "海防办"], ["孙武街道", "武定府街道", "何坊街道", "石庙镇", "桑落墅镇", "淄角镇", "胡集镇", "李庄镇", "麻店镇", "魏集镇", "清河镇", "姜楼镇", "辛店镇", "大年陈镇", "皂户李镇"], ["信城街道", "金阳街道", "商店镇", "温店镇", "河流镇", "翟王镇", "流坡坞镇", "水落坡镇", "劳店镇", "洋湖乡"], ["棣丰街道", "海丰街道", "水湾镇", "碣石山镇", "小泊头镇", "埕口镇", "马山子镇", "车王镇", "柳堡镇", "佘家镇", "信阳镇", "西小王镇"], ["城东街道", "锦秋街道", "博昌街道", "曹王镇", "兴福镇", "陈户镇", "湖滨镇", "店子镇", "吕艺镇", "纯化镇", "庞家镇", "乔庄镇"], ["黛溪街道", "黄山街道", "高新街道", "好生街道", "西董街道", "长山镇", "魏桥镇", "临池镇", "焦桥镇", "韩店镇", "孙镇镇", "九户镇", "青阳镇", "明集镇", "台子镇", "码头镇"]], [["东城街道", "西城街道", "南城街道", "北城街道", "牡丹街道", "何楼街道", "沙土镇", "吴店镇", "王浩屯镇", "黄堽镇", "都司镇", "高庄镇", "小留镇", "李村镇", "马岭岗镇", "安兴镇", "大黄集镇", "胡集镇", "皇镇乡"], ["天中街道", "滨河街道", "陈集镇", "冉固镇", "张湾镇", "黄店镇", "孟海镇", "马集镇", "仿山镇", "半堤镇", "杜堂镇", "南王店镇"], ["曹城街道", "磐石街道", "青菏街道", "郑庄街道", "倪集街道", "庄寨镇", "普连集镇", "青固集镇", "桃源集镇", "韩集镇", "砖庙镇", "古营集镇", "魏湾镇", "侯集回族镇", "苏集镇", "孙老家镇", "阎店楼镇", "梁堤头镇", "安才楼镇", "曹县邵庄镇", "曹县王集镇", "青岗集镇", "常乐集镇", "曹县大集镇", "曹县仵楼镇", "曹县楼庄乡", "曹县朱洪庙乡"], ["北城街道", "南城街道", "园艺街道", "东城街道", "郭村镇", "黄岗镇", "终兴镇", "高韦庄镇", "徐寨镇", "蔡堂镇", "朱集镇", "李新庄镇", "浮岗镇", "莱河镇", "时楼镇", "杨楼镇", "张集镇", "龙王庙镇", "谢集镇", "李田楼镇", "高老家乡", "曹庄乡"], ["文亭街道", "永昌街道", "成武县大田集镇", "成武县天宫庙镇", "成武县汶上集镇", "成武县南鲁集镇", "成武县伯乐集镇", "成武县苟村集镇", "成武县白浮图镇", "成武县孙寺镇", "成武县九女集镇", "成武县党集镇", "成武县张楼镇"], ["凤凰街道", "永丰街道", "龙固镇", "大义镇", "柳林镇", "章缝镇", "大谢集镇", "独山镇", "麒麟镇", "核桃园镇", "田庄镇", "太平镇", "万丰镇", "陶庙镇", "董官屯镇", "田桥镇", "营里镇"], ["郓州街道", "唐塔街道", "黄安镇", "杨庄集镇", "侯咽集镇", "武安镇", "郭屯镇", "丁里长镇", "玉皇庙镇", "程屯镇", "随官屯镇", "张营镇", "潘渡镇", "双桥镇", "南赵楼镇", "黄堆集镇", "唐庙镇", "李集镇", "黄集乡", "张鲁集乡", "水堡乡", "陈坡乡"], ["陈王街道", "古泉街道", "什集镇", "红船镇", "旧城镇", "闫什镇", "箕山镇", "李进士堂镇", "董口镇", "临濮镇", "彭楼镇", "凤凰镇", "郑营镇", "大埝镇", "引马镇", "左营乡", "富春乡"], ["城关街道", "鱼沃街道", "东明集镇", "刘楼镇", "陆圈镇", "马头镇", "三春集镇", "大屯镇", "武胜桥镇", "菜园集镇", "沙窝镇", "小井镇", "长兴集乡", "焦园乡"]]], [[["林山寨街道", "建设路街道", "棉纺路街道", "秦岭路街道", "桐柏路街道", "三官庙街道", "绿东村街道", "汝河路街道", "航海西路街道", "中原西路街道", "西流湖街道", "须水街道"], ["淮河路街道", "解放路街道", "铭功路街道", "一马路街道", "蜜蜂张街道", "五里堡街道", "大学路街道", "建中街街道", "福华街街道", "德化街街道", "嵩山路街道", "京广路街道", "长江路街道", "人和路街道", "马寨镇", "侯寨乡"], ["北下街街道", "西大街街道", "南关街道", "城东路街道", "东大街街道", "二里岗街道", "陇海马路街道", "紫荆山南路街道", "航海东路街道", "十八里河镇", "南曹乡", "圃田乡", "商都路街道"], ["经八路街道", "花园路街道", "人民路街道", "杜岭街道", "大石桥街道", "南阳路街道", "南阳新村街道", "文化路街道", "丰产路街道", "东风路街道", "北林路街道", "未来路街道", "凤凰台街道", "龙子湖街道", "祭城路街道", "兴达路街道", "国基路街道", "杨金路街道", "丰庆路街道", "如意湖街道", "博学路街道", "龙湖街道", "龙源路街道", "金光路街道"], ["济源路街道", "中心路街道", "新安路街道", "工业路街道", "矿山街道", "峡窝镇"], ["新城街道", "刘寨街道", "老鸦陈街道", "长兴路街道", "迎宾路街道", "大河路街道", "花园口镇", "古荥镇"], ["青年路街道", "东风路街道", "广惠街街道", "韩寺镇", "官渡镇", "狼城岗镇", "万滩镇", "白沙镇", "郑庵镇", "黄店镇", "大孟镇", "刘集镇", "雁鸣湖镇", "姚家镇", "刁家乡", "杨桥", "豫兴"], ["新华路街道", "杜甫路街道", "永安路街道", "孝义街道", "紫荆路街道", "米河镇", "新中镇", "小关镇", "竹林镇", "大峪沟镇", "河洛镇", "站街镇", "康店镇", "北山口镇", "西村镇", "芝田镇", "回郭镇", "鲁庄镇", "夹津口镇", "涉村镇"], ["索河街道", "京城路街道", "乔楼镇", "豫龙镇", "广武镇", "王村镇", "汜水镇", "高山镇", "刘河镇", "崔庙镇", "贾峪镇", "城关乡", "高村乡", "金寨回族乡"], ["青屏街街道", "新华路街道", "西大街街道", "城关镇", "米村镇", "牛店镇", "平陌镇", "超化镇", "苟堂镇", "大隗镇", "刘寨镇", "白寨镇", "岳村镇", "来集镇", "曲梁镇", "袁庄乡", "矿区街道", "尖山风景区管理委员会", "郑州曲梁产业集聚区管理委员会"], ["新建路街道", "新华路街道", "新烟街道", "新村镇", "辛店镇", "观音寺镇", "梨河镇", "和庄镇", "薛店镇", "孟庄镇", "郭店镇", "龙湖镇", "城关乡", "具茨山国家级森林公园管理委员会", "中心城区新区建设管理委员会"], ["嵩阳街道", "少林街道", "中岳街道", "大金店镇", "颖阳镇", "卢店镇", "告成镇", "阳城区镇", "大冶镇", "宣化镇", "徐庄镇", "东华镇", "白坪乡", "君召乡", "石道乡", "唐庄乡", "送表矿区"]], [["北书店街道", "午朝门街道", "大兴街道", "北道门街道", "北郊乡", "柳园口乡"], ["清平街道", "铁塔街道", "曹门街道", "宋门街道", "工业街道", "苹果园街道", "东郊乡", "土柏岗乡"], ["相国寺街道", "新华街道", "卧龙街道", "州桥街道", "西司门街道", "南苑街道", "五一街道", "仙人庄街道"], ["三里堡街道", "新门关街道", "繁塔街道", "官坊街道", "菜市街道", "南郊乡", "汪屯乡"], ["城西街道", "梁苑街道", "杏花营镇", "西郊乡", "水稻乡", "杏花营农场"], ["城关镇", "陈留镇", "仇楼镇", "八里湾镇", "曲兴镇", "朱仙镇", "半坡店乡", "罗王乡", "刘店乡", "袁坊乡", "杜良乡", "兴隆乡", "西姜寨乡", "万隆乡", "范村乡"], ["城关镇", "五里河镇", "傅集镇", "圉镇镇", "高阳镇", "葛岗镇", "阳堌镇", "邢口镇", "裴村店乡", "宗店乡", "板木乡", "竹林乡", "官庄乡", "湖岗乡", "苏木乡", "沙沃乡", "平城乡", "泥沟乡", "柿园乡", "西寨乡", "城郊乡", "工业园区"], ["咸平街道", "竖岗镇", "玉皇庙镇", "四所楼镇", "朱砂镇", "长智镇", "冯庄乡", "孙营乡", "大岗李乡", "邸阁乡", "练城乡", "厉庄乡"], ["城关镇", "洧川镇", "朱曲镇", "蔡庄镇", "永兴镇", "张市镇", "十八里镇", "水坡镇", "大营镇", "庄头镇", "邢庄乡", "大马乡", "岗李乡", "门楼任乡", "大桥乡", "南曹乡", "小陈乡"], ["兰阳街道", "桐乡街道", "惠安街道", "堌阳镇", "南彰镇", "考城镇", "红庙镇", "谷营镇", "三义寨乡", "东坝头乡", "小宋乡", "孟寨乡", "许河乡", "葡萄架乡", "阎楼乡", "仪封乡", "中原石油勘探三公司", "仪封园艺场", "造纸林场", "柳林林场", "西关农场", "畜牧良种农场", "固阳农科所"]], [["西关街道", "西南隅街道", "西北隅街道", "东南隅街道", "东北隅街道", "南关街道", "洛浦街道", "邙山街道", "道北路街道"], ["王城路街道", "金谷园街道", "西工街道", "邙岭路街道", "唐宫路街道", "汉屯路街道", "凯旋东路街道", "洛北街道", "红山街道"], ["东关街道", "瀍西街道", "五股路街道", "北窑街道", "塔湾街道", "杨文街道", "华林街道", "瀍河回族乡"], ["湖北路街道", "天津路街道", "长春路街道", "南昌路街道", "长安路街道", "重庆路街道", "郑州路街道", "武汉路街道", "徐家营街道", "珠江路街道", "周山路街道", "工农街道"], ["西霞院街道", "康乐街道", "吉利街道", "河阳街道"], ["安乐街道", "开元路街道", "龙门石窟街道", "关林街道", "太康东路街道", "古城街道", "科技园街道", "翠云路街道", "龙门镇", "安乐镇", "白马寺镇", "李楼镇", "丰李镇", "诸葛镇", "李村镇", "庞村镇", "寇店镇", "佃庄镇"], ["城关镇", "会盟镇", "平乐镇", "送庄镇", "白鹤镇", "朝阳镇", "小浪底镇", "麻屯镇", "横水镇", "常袋镇"], ["城关镇", "石寺镇", "五头镇", "磁涧镇", "铁门镇", "南李村镇", "北冶镇", "仓头镇", "正村镇", "石井镇", "曹村乡"], ["城关镇", "赤土店镇", "合峪镇", "潭头镇", "三川镇", "冷水镇", "陶湾镇", "石庙镇", "庙子镇", "狮子庙镇", "白土镇", "叫河镇", "栾川乡", "秋扒乡"], ["城关镇", "田湖镇", "旧县镇", "车村镇", "闫庄镇", "德亭镇", "大章镇", "白河镇", "纸房镇", "饭坡镇", "大坪乡", "库区乡", "何村乡", "九店乡", "黄庄乡", "木植街乡", "陶村林场", "五马寺林场", "王莽寨林场"], ["城关镇", "上店镇", "付店镇", "小店镇", "三屯镇", "刘店镇", "内埠镇", "陶营镇", "柏树乡", "十八盘乡", "靳村乡", "王坪乡", "蔡店乡", "大安工业园区"], ["城关镇", "柳泉镇", "韩城镇", "白杨镇", "香鹿山镇", "锦屏镇", "三乡镇", "张坞镇", "莲庄镇", "赵保镇", "樊村镇", "盐镇乡", "高村乡", "花果山乡", "上观乡", "董王庄乡"], ["城关镇", "王范回族镇", "上戈镇", "下峪镇", "河底镇", "兴华镇", "东宋镇", "马店镇", "故县镇", "赵村镇", "城郊乡", "小界乡", "长水乡", "罗岭乡", "底张乡", "西山底乡", "陈吴乡", "涧口乡"], ["城关镇", "鸣皋镇", "水寨镇", "彭婆镇", "白沙镇", "江左镇", "高山镇", "吕店镇", "半坡镇", "酒后镇", "白元镇", "鸦岭乡", "平等乡", "葛寨乡"], ["商城街道", "槐新街道", "首阳山街道", "伊洛街道", "翟镇", "岳滩镇", "顾县镇", "缑氏镇", "府店镇", "高龙镇", "山化镇", "邙岭镇", "大口镇"]], [["曙光街街道", "光明路街道", "中兴路街道", "矿工路街道", "西市场街道", "新新街街道", "青石山街道", "湛河北路街道", "西高皇街道", "焦店镇", "香山管委会"], ["东安路街道", "优越路街道", "五一路街道", "建设路街道", "东环路街道", "东工人镇街道", "光华路街道", "鸿鹰街道", "申楼街道", "北环路街道", "东高皇街道", "蒲城街道"], ["高庄街道", "龙兴街道", "人民路街道", "龙河街道"], ["马庄街道", "南环路街道", "姚孟街道", "九里山街道", "轻工路街道", "高阳路街道", "北渡街道", "荆山", "河滨街道", "曹镇乡"], ["铁路街道", "城关镇", "周庄镇", "闹店镇", "石桥镇", "商酒务镇", "大营镇", "张八桥镇", "杨庄镇", "赵庄镇", "肖旗乡", "前营乡", "李庄乡"], ["九龙街道", "昆阳街道", "盐都街道", "任店镇", "保安镇", "仙台镇", "叶邑镇", "廉村镇", "常村镇", "辛店镇", "洪庄杨镇", "夏李乡", "马庄回族乡", "田庄乡", "龚店乡", "龙泉乡", "水寨乡", "邓李乡"], ["露峰街道", "琴台街道", "鲁阳街道", "汇源街道", "下汤镇", "梁洼镇", "张官营镇", "张良镇", "尧山镇", "瓦屋镇", "赵村镇", "四棵树乡", "团城乡", "熊背乡", "让河乡", "观音寺乡", "昭平台库区乡", "背孜乡", "仓头乡", "董周乡", "张店乡", "辛集乡", "滚子营乡", "马楼乡"], ["龙山街道", "东城街道", "冢头镇", "安良镇", "堂街镇", "薛店镇", "长桥镇", "茨芭镇", "黄道镇", "李口镇", "王集乡", "姚庄回族乡", "白庙乡", "广阔天地乡", "渣元乡"], ["垭口街道", "寺坡街道", "朱兰街道", "院岭街道", "矿建街道", "铁山街道", "尚店镇", "八台镇", "尹集镇", "枣林镇", "庙街乡", "武功乡", "杨庄乡", "红山街道办事处"], ["煤山街道", "风穴路街道", "钟楼街道", "洗耳河街道", "汝南街道", "寄料镇", "温泉镇", "临汝镇", "小屯镇", "杨楼镇", "蟒川镇", "庙下镇", "米庙镇", "陵头镇", "纸坊镇", "大峪镇", "王寨乡", "骑岭乡", "夏店乡", "焦村乡"]], [["东大街街道", "头二三街道", "甜水井街道", "东关街道", "南关街道", "西大街街道", "北大街街道", "西关街道", "紫薇大道街道", "光华路街道", "永明路街道", "中华路街道", "宝莲寺镇", "高庄镇", "步行街综合治理办公室", "北大街综合治理办公室"], ["红旗路街道", "解放路街道", "灯塔路街道", "豆腐营街道", "洹北街道", "彰东街道", "彰北街道", "民航路街道", "曙光路街道"], ["梅园庄街道", "李珍街道", "电厂路街道", "纱厂路街道", "铁西路街道", "水冶街道", "清风街街道", "北蒙街道", "相台街道", "西郊乡"], ["田村街道", "彰武街道", "文昌大道街道", "文明大道街道", "太行小区街道", "中州路街道", "龙泉镇", "马投涧镇", "东风乡"], ["水冶镇", "铜冶镇", "善应镇", "柏庄镇", "白璧镇", "曲沟镇", "吕村镇", "伦掌镇", "崔家桥镇", "辛村镇", "韩陵镇", "永和镇", "都里镇", "磊口乡", "许家沟乡", "马家乡", "安丰乡", "洪河屯乡", "瓦店乡", "北郭乡"], ["城关镇", "菜园镇", "任固镇", "五陵镇", "宜沟镇", "白营镇", "伏道镇", "韩庄镇", "古贤镇", "瓦岗乡"], ["道口镇", "城关镇", "白道口镇", "留固镇", "上官镇", "牛屯镇", "万古镇", "高平镇", "王庄镇", "老店镇", "慈周寨镇", "焦虎镇", "枣村乡", "四间房乡", "八里营乡", "赵营乡", "大寨乡", "桑村乡", "老爷庙乡", "瓦岗寨乡", "半坡店乡", "小铺乡", "新区管委会"], ["城关镇", "东庄镇", "井店镇", "梁庄镇", "后河镇", "楚旺镇", "田氏镇", "二安镇", "张龙乡", "马上乡", "高堤乡", "亳城乡", "六村乡", "中召乡", "宋村乡", "石盘屯乡", "豆公乡"], ["开元街道", "振林街道", "龙山街道", "桂园街道", "合涧镇", "临淇镇", "东姚镇", "横水镇", "河顺镇", "任村镇", "姚村镇", "陵阳镇", "原康镇", "五龙镇", "采桑镇", "东岗镇", "桂林镇", "茶店镇", "石板岩镇", "城郊乡"]], [["中北街道", "中山路街道", "新华街街道", "鹤山街街道", "九矿广场街道", "鹤壁集镇", "姬家山乡"], ["红旗街道", "长风中路街道", "山城路街道", "汤河街街道", "鹿楼街道", "宝山街道", "大胡街道", "石林镇"], ["金山", "九州路街道", "黎阳路街道", "大赉店镇", "钜桥镇", "上峪乡", "大河涧乡", "长江路街道"], ["卫溪街道", "浚州街道", "黎阳街道", "伾山街道", "善堂镇", "屯子镇", "新镇镇", "小河镇", "卫贤镇", "王庄镇", "白寺乡"], ["朝歌街道", "桥盟街道", "卫都街道", "灵山街道", "高村镇", "北阳镇", "西岗镇", "庙口镇", "黄洞乡"]], [["西街街道", "东街街道", "渠东街道", "文化街街道", "向阳小区街道", "洪门镇", "小店镇"], ["胜利路街道", "解放路街道", "中同街街道", "健康路街道", "自由路街道", "南桥街道", "铁西街道", "平原镇"], ["宝西街道", "宝东街道", "大块镇", "耿黄镇", "潞王坟乡"], ["东干道街道", "荣校路街道", "北干道街道", "花园街道", "卫北街道", "新辉路街道", "和平路街道", "王村镇", "牧野镇", "新乡化学与物理电源产业园区管理委员会"], ["翟坡镇", "小冀镇", "七里营镇", "朗公庙镇", "古固寨镇", "大召营镇", "合河乡", "新乡经济开发区"], ["城关镇", "照镜镇", "黄堤镇", "中和镇", "徐营镇", "冯庄镇", "亢村镇", "史庄镇", "太山镇", "位庄乡", "大新庄乡", "原种场", "园艺场", "农场", "西工区管理委员会"], ["阳和街道", "原兴街道", "齐街镇", "太平镇", "福宁集镇", "韩董庄镇", "葛埠口乡", "蒋庄乡", "官厂乡", "大宾乡", "陡门乡", "路寨乡", "阳阿乡", "靳堂乡"], ["城关镇", "东屯镇", "丰庄镇", "石婆固镇", "王楼镇", "僧固乡", "位邱乡", "司寨乡", "马庄乡", "胙城乡", "榆林乡", "小潭乡", "国营林场", "新兴农场", "新乡市食品工业聚集区", "新乡市纺织工业聚集区"], ["城关镇", "黄陵镇", "黄德镇", "应举镇", "陈桥镇", "赵岗镇", "留光镇", "潘店镇", "李庄镇", "陈固镇", "居厢镇", "鲁岗镇", "尹岗镇", "城关乡", "回族乡", "王村乡", "荆宫乡", "曹岗乡", "冯村乡"], ["蒲西街道", "蒲东街道", "南蒲街道", "蒲北街道", "魏庄街道", "丁栾镇", "樊相镇", "恼里镇", "常村镇", "赵堤镇", "孟岗镇", "满村镇", "苗寨镇", "张三寨镇", "方里镇", "佘家镇", "芦岗乡", "武邱乡", "河南长垣起重工业园区管理委员会"], ["汲水镇", "太公镇", "孙杏村镇", "后河镇", "李源屯镇", "唐庄镇", "上乐村镇", "狮豹头乡", "安都乡", "顿坊店乡", "柳庄乡", "庞寨乡", "城郊乡", "原种场", "东风农场", "苗圃场", "农科所", "五四农场"], ["城关街道", "胡桥街道", "薄壁镇", "峪河镇", "百泉镇", "孟庄镇", "常村镇", "吴村镇", "南村镇", "南寨镇", "上八里镇", "北云门镇", "占城镇", "冀屯镇", "黄水乡", "拍石头乡", "高庄乡", "张村乡", "赵固乡", "西平罗乡", "洪洲乡", "沙窑乡"]], [["民生街道", "民主街道", "新华街道", "焦西街道", "焦南街道", "焦北街道", "七百间街道", "上白作街道", "王褚街道"], ["李封街道", "王封街道", "朱村街道", "冯封街道", "龙洞街道", "月山街道", "丹河街道", "许衡街道", "府城街道", "龙翔街道"], ["马村街道", "武王街道", "冯营街道", "九里山街道", "待王街道", "安阳城街道", "演马街道"], ["东方红街道", "焦东街道", "百间房街道", "太行街道", "艺新街道", "光亚街道", "定和街道", "中星街道", "新城街道"], ["城关镇", "七贤镇", "郇封镇", "周庄镇", "云台山镇", "王屯乡", "五里源乡", "西村乡", "小营工贸区"], ["博爱县清化镇", "博爱县鸿昌", "博爱县柏山镇", "博爱县月山镇", "博爱县许良镇", "博爱县磨头镇", "博爱县孝敬镇", "博爱县寨豁乡", "博爱县金城乡", "国营博爱农场"], ["木城街道", "龙源街道", "龙泉街道", "木栾街道", "詹店镇", "西陶镇", "谢旗营镇", "大封镇", "嘉应观乡", "乔庙乡", "圪当店乡", "三阳乡", "小董乡", "大虹桥乡", "北郭乡", "武陟宁郭农场"], ["温泉街道", "岳村街道", "张羌街道", "黄河街道", "祥云镇", "番田镇", "黄庄镇", "武德镇", "赵堡镇", "招贤乡", "北冷乡", "国营温县农场"], ["覃怀街道", "怀庆街道", "太行街道", "沁园街道", "崇义镇", "西向镇", "西万镇", "柏香镇", "山王庄镇", "紫陵镇", "常平乡", "王召乡", "王曲乡"], ["大定街道", "会昌街道", "河雍街道", "河阳街道", "化工镇", "南庄镇", "城伯镇", "谷旦镇", "赵和镇", "西虢镇", "槐树乡"]], [["中原路街道", "胜利路街道", "建设路街道", "人民路街道", "大庆路街道", "黄河路街道", "任丘路街道", "长庆路街道", "濮东街道", "岳村镇", "孟轲乡", "中原油田街道"], ["城关镇", "马庄桥镇", "瓦屋头镇", "仙庄镇", "柳格镇", "六塔乡", "巩营乡", "马村乡", "高堡乡", "古城乡", "大流乡", "韩村乡", "大屯乡", "固城乡", "双庙乡", "纸房乡", "阳邵乡"], ["城关镇", "韩张镇", "元村镇", "福坎镇", "张果屯镇", "千口镇", "杨村乡", "谷金楼乡", "西邵乡", "寺庄乡", "梁村乡", "近德固乡"], ["城关镇", "濮城镇", "龙王庄镇", "高码头镇", "王楼镇", "辛庄镇", "陈庄镇", "杨集乡", "白衣阁乡", "颜村铺乡", "陆集乡", "张庄乡"], ["城关镇", "侯庙镇", "孙口镇", "打渔陈镇", "马楼镇", "吴坝镇", "后方乡", "清水河乡", "夹河乡"], ["城关镇", "濮阳县柳屯镇", "濮阳县文留镇", "濮阳县庆祖镇", "濮阳县八公桥镇", "濮阳县徐镇镇", "濮阳县户部寨镇", "濮阳县鲁河镇", "濮阳县子岸镇", "濮阳县胡状镇", "濮阳县王称固镇", "濮阳县清河头乡", "濮阳县梁庄乡", "濮阳县白罡乡", "濮阳县梨园乡", "濮阳县五星乡", "濮阳县郎中乡", "濮阳县海通乡", "濮阳县渠村乡", "濮阳县习城乡"]], [["西大街道", "东大街道", "西关街道", "南关街道", "北大街道", "五一路街道", "高桥营街道", "丁庄街道", "七里店街道", "文峰街道", "新兴街道", "半截河街道", "东城区管委会"], ["许由", "新元", "将官池镇", "五女店镇", "尚集镇", "苏桥镇", "蒋李集镇", "张潘镇", "灵井镇", "陈曹乡", "邓庄乡", "小召乡", "河街乡", "桂村乡", "椹涧乡", "榆林乡", "艾庄回族乡"], ["安陵镇", "马栏镇", "柏梁镇", "陈化店镇", "望田镇", "大马镇", "陶城镇", "张桥镇", "彭店镇", "只乐镇", "南坞镇", "马坊乡"], ["城关镇", "颍桥回族镇", "麦岭镇", "颍阳镇", "王洛镇", "紫云镇", "库庄镇", "十里铺镇", "山头店镇", "湛北乡", "茨沟乡", "丁营乡", "姜庄乡", "范湖乡", "双庙乡", "汾陈乡"], ["颍川街道", "夏都街道", "韩城街道", "钧台街道", "火龙镇", "顺店镇", "方山镇", "神垕镇", "鸿畅镇", "梁北镇", "古城镇", "无梁镇", "文殊镇", "鸠山镇", "褚河镇", "范坡镇", "郭连镇", "朱阁镇", "浅井镇", "方岗镇", "花石镇", "张得镇", "苌庄乡", "磨街乡", "小吕乡", "山货回族乡"], ["建设路街道", "长兴路街道", "长社路街道", "金桥路街道", "和尚桥镇", "坡胡镇", "后河镇", "石固镇", "老城镇", "南席镇", "大周镇", "董村镇", "石象镇", "古桥镇", "增福庙乡", "官亭乡"]], [["老街街道", "马路街街道", "顺河街街道", "干河陈街道", "大刘镇", "阴阳赵镇", "空冢郭镇", "问十乡"], ["沙北街道", "城关镇", "孟庙镇", "商桥镇", "裴城镇", "新店镇", "龙城镇", "李集镇", "黑龙潭镇"], ["天桥街街道", "翟庄", "召陵镇", "邓襄镇", "万金镇", "老窝镇", "姬石镇", "青年镇"], ["舞泉镇", "吴城镇", "北舞渡镇", "莲花镇", "辛安镇", "孟寨镇", "太尉镇", "侯集镇", "九街镇", "文峰乡", "保和乡", "马村乡", "姜店乡", "章化乡"], ["城关镇", "繁城镇", "杜曲镇", "王岗镇", "台陈镇", "巨陵镇", "瓦店镇", "三家店镇", "窝城镇", "王孟镇", "大郭镇", "皇帝庙乡", "固厢乡", "石桥乡", "陈庄乡"]], [["湖滨街道", "前进街道", "车站街道", "涧河街道", "大安街道", "会兴街道", "崖底街道", "交口乡", "磁钟乡", "高庙乡"], ["大营镇", "原店镇", "西张村镇", "观音堂镇", "张汴乡", "张湾乡", "菜园乡", "张茅乡", "王家后乡", "硖石乡", "西李村乡", "宫前乡", "店子乡"], ["城关镇", "英豪镇", "张村镇", "洪阳镇", "天池镇", "仰韶镇", "仁村乡", "果园乡", "陈村乡", "坡头乡", "段村乡", "南村乡"], ["城关镇", "杜关镇", "五里川镇", "官道口镇", "朱阳关镇", "官坡镇", "范里镇", "东明镇", "双龙湾镇", "文峪乡", "横涧乡", "双槐树乡", "汤河乡", "瓦窑沟乡", "狮子坪乡", "沙河乡", "徐家湾乡", "潘河乡", "木桐乡"], ["千秋路街道", "朝阳路街道", "新义街街道", "常村路街道", "泰山路街道", "新区街道", "东区街道"], ["城关镇", "尹庄镇", "朱阳镇", "阳平镇", "故县镇", "豫灵镇", "大王镇", "阳店镇", "函谷关镇", "焦村镇", "川口乡", "寺河乡", "苏村乡", "五亩乡", "西阎乡", "灵宝市园艺场", "涧东区管委会", "涧西区管委会"]], [["东关街道", "新华街道", "汉冶街道", "仲景街道", "赤虎街道", "五里堡街道", "官庄镇", "瓦店镇", "红泥湾镇", "黄台岗镇", "金华镇", "溧河乡", "汉冢乡", "茶庵乡", "高庙乡"], ["七一街道", "卧龙岗街道", "武侯街道", "梅溪街道", "车站街道", "光武街道", "靳岗街道", "石桥镇", "潦河镇", "安皋镇", "蒲山镇", "陆营镇", "青华镇", "英庄镇", "潦河坡镇", "七里园乡", "谢庄乡", "王村乡", "龙王沟风景区"], ["城关镇", "留山镇", "云阳镇", "皇路店镇", "南河店镇", "板山坪镇", "乔端镇", "白土岗镇", "城郊乡", "小店乡", "皇后乡", "太山庙乡", "石门乡", "四棵树乡", "马市坪乡", "崔庄乡", "河南红阳机械厂", "河南向东机械厂", "河南红宇机械厂", "国营东风机械厂", "国营长江机械厂"], ["凤瑞街道", "释之街道", "独树镇", "博望镇", "拐河镇", "小史店镇", "赵河镇", "广阳镇", "二郎庙镇", "杨楼镇", "券桥乡", "杨集乡", "古庄店乡", "清河乡", "柳河乡", "四里店乡", "袁店回族乡", "河南中南机械厂", "方城大寺林场"], ["白羽街道", "紫金街道", "莲花街道", "丹水镇", "西坪镇", "双龙镇", "回车镇", "丁河镇", "桑坪镇", "米坪镇", "五里桥镇", "重阳镇", "太平镇", "阳城镇", "二郎坪镇", "石界河镇", "军马河镇", "田关乡", "寨根乡"], ["涅阳街道", "雪枫街道", "玉都街道", "石佛寺镇", "晁陂镇", "贾宋镇", "侯集镇", "老庄镇", "卢医镇", "遮山镇", "高丘镇", "曲屯镇", "枣园镇", "杨营镇", "安字营镇", "张林镇", "柳泉铺镇", "彭营镇", "二龙乡", "王岗乡", "马庄乡", "郭庄回族乡"], ["城关镇", "夏馆镇", "师岗镇", "马山口镇", "湍东镇", "赤眉镇", "瓦亭镇", "王店镇", "灌涨镇", "桃溪镇", "岞岖镇", "余关镇", "板场乡", "大桥乡", "赵店乡", "七里坪乡"], ["龙城街道", "商圣街道", "荆紫关镇", "老城镇", "香花镇", "厚坡镇", "丹阳镇", "盛湾镇", "金河镇", "寺湾镇", "仓房镇", "上集镇", "马蹬镇", "西簧乡", "毛堂乡", "大石桥乡", "滔河乡"], ["赵河街道", "潘河街道", "赊店镇", "桥头镇", "饶良镇", "兴隆镇", "晋庄镇", "李店镇", "苗店镇", "郝寨镇", "朱集镇", "下洼镇", "太和镇", "大冯营镇", "陌陂镇", "唐庄乡"], ["滨河街道", "文峰街道", "东兴街道", "兴唐街道", "源潭镇", "张店镇", "郭滩镇", "湖阳镇", "黑龙镇", "大河屯镇", "龙潭镇", "桐寨铺镇", "苍台镇", "上屯镇", "毕店镇", "少拜寺镇", "城郊乡", "桐河乡", "昝岗乡", "祁仪乡", "马振抚乡", "古城乡", "东王集乡"], ["汉城街道", "汉华街道", "王庄镇", "沙堰镇", "新甸铺镇", "施庵镇", "歪子镇", "五星镇", "溧河铺镇", "王集镇", "城郊乡", "前高庙乡", "樊集乡", "上庄乡", "上港乡"], ["城关镇", "月河镇", "吴城镇", "固县镇", "毛集镇", "大河镇", "埠江镇", "平氏镇", "淮源镇", "黄岗镇", "安棚镇", "朱庄镇", "程湾镇", "城郊乡", "回龙乡", "新集乡"], ["古城街道", "花洲街道", "湍河街道", "罗庄镇", "汲滩镇", "穰东镇", "孟楼镇", "林扒镇", "构林镇", "十林镇", "张村镇", "都司镇", "赵集镇", "刘集镇", "桑庄镇", "彭桥镇", "白牛镇", "腰店镇", "九龙镇", "文渠镇", "高集镇", "张楼乡", "夏集乡", "裴营乡", "陶营乡", "小杨营乡", "龙堰乡", "南阳市黄牛良种繁育场", "杏山旅游管理区杏山街道"]], [["平原街道", "长征街道", "前进街道", "白云街道", "东风街道", "八八街道", "建设街道", "解放街道", "谢集镇", "双八镇", "刘口乡", "水池铺乡", "观堂乡", "王楼乡", "李庄乡", "孙福集乡"], ["古城街道", "文化街道", "东方街道", "新城街道", "宋城街道", "古宋街道", "宋集镇", "郭村镇", "李口镇", "高辛镇", "坞墙镇", "冯桥镇", "路河镇", "闫集镇", "毛固堆镇", "包公庙乡", "娄店乡", "勒马乡", "临河店乡"], ["绿洲街道", "南华街道", "人和镇", "龙塘镇", "北关镇", "程庄镇", "王庄寨镇", "孙六镇", "白云寺镇", "王桥镇", "庄子镇", "双塔镇", "伯党乡", "花园乡", "野岗乡", "林七乡", "胡集乡", "禇庙乡", "老颜集乡", "商丘市农场", "商丘市林场"], ["长岗镇", "平岗镇", "周堂镇", "蓼堤镇", "西陵寺镇", "城关镇", "潮庄镇", "尚屯镇", "后台乡", "河集乡", "孙聚寨乡", "白楼乡", "河堤乡", "白庙乡", "胡堂乡", "尤吉屯乡", "董店乡", "涧岗乡", "匡城乡", "城郊乡"], ["城关镇", "张弓镇", "柳河镇", "逻岗镇", "石桥镇", "黄岗镇", "华堡镇", "刘楼乡", "程楼乡", "乔楼乡", "城郊乡", "阳驿乡", "孔集乡", "赵村乡", "产业集聚区"], ["长江新城街道", "浦东街道", "柘城县城关镇", "陈青集镇", "起台镇", "胡襄镇", "慈圣镇", "安平镇", "远襄镇", "岗王镇", "伯岗镇", "张桥镇", "邵元乡", "洪恩乡", "老王集乡", "大仵乡", "马集乡", "牛城乡", "惠济乡", "申桥乡", "李原乡", "皇集乡"], ["城关镇", "界沟镇", "木兰镇", "杜集镇", "谷熟镇", "大杨集镇", "利民镇", "张集镇", "站集镇", "稍岗镇", "黄冢乡", "沙集乡", "店集乡", "闻集乡", "芒种桥乡", "刘店乡", "大候乡", "城郊乡", "郑集乡", "李老家乡", "镇里固乡", "古王集乡", "刘集乡", "乔集乡", "田庙乡"], ["城关镇", "会亭镇", "马头镇", "济阳镇", "李集镇", "车站镇", "杨集镇", "韩道口镇", "太平镇", "罗庄镇", "火店镇", "北岭镇", "曹集乡", "胡桥乡", "歧河乡", "郭店乡", "业庙乡", "中峰乡", "桑固乡", "何营乡", "王集乡", "刘店集乡", "骆集乡", "孔庄乡"], ["演集镇", "城关镇", "芒山镇", "高庄镇", "酇城镇", "裴桥镇", "马桥镇", "薛湖镇", "蒋口镇", "陈集镇", "十八里镇", "太邱镇", "李寨镇", "苗桥镇", "顺和镇", "茴村镇", "酇阳镇", "龙岗镇", "马牧镇", "王集镇", "刘河镇", "双桥镇", "卧龙镇", "城厢乡", "候岭乡", "黄口乡", "新桥乡", "条河乡", "陈官庄乡"]], [["老城街道", "民权街道", "车站街道", "五里墩街道", "五星街道", "湖东街道", "南湾街道", "金牛山街道", "双井街道", "李家寨镇", "吴家店镇", "东双河镇", "董家河镇", "浉河港镇", "游河乡", "谭家河乡", "柳林乡", "十三里桥乡"], ["羊山街道", "前进街道", "南京路", "平桥街道", "甘岸街道", "五里店街道", "平西街道", "平东街道", "震雷山街道", "明港镇", "五里镇", "邢集镇", "平昌镇", "洋河镇", "肖王镇", "龙井乡", "胡店乡", "彭家湾乡", "长台乡", "肖店乡", "王岗乡", "高粱店乡", "查山乡", "土城街道", "明港工业管理区", "城阳城址保护区", "龙飞山", "北湖风景管理区", "农村改革发展综合试验核心区", "信阳国际家居产业小镇"], ["丽水街道", "宝城街道", "龙山街道", "周党镇", "竹竿镇", "灵山镇", "子路镇", "楠杆镇", "青山镇", "潘新镇", "彭新镇", "莽张镇", "东卜镇", "铁铺镇", "庙仙乡", "定远乡", "山店乡", "朱堂乡", "尤店乡", "高店乡", "河南省五一农场"], ["弦山街道", "紫水街道", "十里镇", "寨河镇", "孙铁铺镇", "马畈镇", "泼陂河镇", "白雀园镇", "砖桥镇", "仙居乡", "北向店乡", "罗陈乡", "殷棚乡", "南向店乡", "晏河乡", "凉亭乡", "斛山乡", "槐店乡", "文殊乡"], ["金兰山街道", "新集镇", "沙窝镇", "吴陈河镇", "苏河镇", "八里畈镇", "周河乡", "陡山河乡", "浒湾乡", "千斤乡", "卡房乡", "郭家河乡", "陈店乡", "箭厂河乡", "泗店乡", "田铺乡"], ["赤城街道", "鲇鱼山街道", "上石桥镇", "鄢岗镇", "双椿铺镇", "汪桥镇", "余集镇", "达权店镇", "丰集镇", "汪岗镇", "观庙镇", "金刚台镇", "河风桥乡", "李集乡", "苏仙石乡", "伏山乡", "吴河乡", "冯店乡", "长竹园乡", "汤泉池管理处"], ["蓼城", "番城", "秀水", "陈淋子镇", "黎集镇", "蒋集镇", "往流镇", "郭陆滩镇", "胡族铺镇", "方集镇", "三河尖镇", "段集镇", "汪棚镇", "张广庙镇", "陈集镇", "武庙集镇", "分水亭镇", "石佛店镇", "泉河铺镇", "祖师庙镇", "李店镇", "洪埠乡", "杨集乡", "马堽集乡", "草庙集乡", "南大桥乡", "赵岗乡", "张老埠乡", "沙河铺乡", "徐集乡", "丰港乡", "柳树店乡", "观堂乡"], ["春申街道", "定城街道", "弋阳街道", "老城街道", "双柳树镇", "伞陂镇", "卜塔集镇", "仁和镇", "付店镇", "踅孜镇", "桃林铺镇", "黄寺岗镇", "江家集镇", "传流店乡", "魏岗乡", "张集乡", "来龙乡", "隆古乡", "谈店乡", "上油岗乡", "白店乡", "黄湖农场", "河南省潢川经济技术开发区"], ["顺河街道", "滨湖街道", "栏杆街道", "桂花街道", "马集镇", "防胡镇", "新里镇", "期思镇", "赵集镇", "淮滨县台头乡", "王家岗乡", "固城乡", "三空桥乡", "张里乡", "邓湾乡", "张庄乡", "王店乡", "淮滨县谷堆乡", "芦集乡"], ["谯楼街道", "龙湖街道", "淮河街道", "包信镇", "夏庄镇", "东岳镇", "项店镇", "小茴店镇", "曹黄林镇", "孙庙乡", "路口乡", "彭店乡", "杨店乡", "张陶乡", "白土店乡", "岗李店乡", "长陵乡", "陈棚乡", "临河乡", "关店乡", "八里岔乡", "地矿局"]], [["陈州回族街道", "七一路街道", "荷花街道", "人和街道", "小桥街道", "城南", "城北", "文昌", "搬口", "金海路", "李埠口乡", "许湾乡"], ["扶亭街道", "城关镇", "崔桥镇", "江村镇", "白潭镇", "韭园镇", "练寺镇", "大新镇", "包屯镇", "汴岗镇", "曹里乡", "柴岗乡", "固城乡", "吕潭乡", "大李庄乡", "城郊乡", "国营农牧场"], ["娲城街道", "箕子台街道", "昆山街道", "西夏亭镇", "逍遥镇", "奉母镇", "红花集镇", "聂堆镇", "东夏亭镇", "西华营镇", "址坊镇", "田口乡", "清河驿乡", "皮营乡", "东王营乡", "大王庄乡", "李大庄乡", "叶埠口乡", "迟营乡", "黄土桥乡", "艾岗乡", "黄泛区农场", "五二农场"], ["新城街道", "东城街道", "老城街道", "黄寨镇", "练集镇", "魏集镇", "固墙镇", "白寺镇", "巴村镇", "谭庄镇", "邓城镇", "胡吉镇", "城关乡", "平店乡", "袁老乡", "化河乡", "姚集乡", "舒庄乡", "大武乡", "张明乡", "郝岗乡", "张庄乡", "汤庄乡", "商水县农场"], ["东城", "北城", "槐店回族镇", "刘庄店镇", "留福集镇", "老城镇", "赵德营镇", "付井镇", "纸店镇", "新安集镇", "白集镇", "刘湾镇", "莲池镇", "洪山镇", "石槽集乡", "范营乡", "李老庄乡", "大邢庄乡", "冯营乡", "周营乡", "北杨集乡", "卞路口乡"], ["洺南", "洺北", "新城", "吴台镇", "南丰镇", "白马镇", "宁平镇", "宜路镇", "钱店镇", "汲冢镇", "石槽镇", "城郊乡", "虎头岗乡", "汲水乡", "张完集乡", "丁村乡", "双楼乡", "秋渠乡", "东风乡", "巴集乡", "李楼乡", "胡集乡"], ["城关回族镇", "新站镇", "鲁台镇", "四通镇", "临蔡镇", "安岭镇", "白楼镇", "朱集乡", "豆门乡", "冯塘乡", "刘振屯乡", "王店乡", "大连乡", "葛店乡", "黄集乡", "齐老乡", "郑集乡", "曹河乡"], ["城关回族镇", "常营镇", "逊母口镇", "老冢镇", "朱口镇", "马头镇", "龙曲镇", "板桥镇", "符草楼镇", "马厂镇", "毛庄镇", "张集镇", "清集镇", "城郊乡", "杨庙乡", "王集乡", "高贤乡", "芝麻洼乡", "独塘乡", "大许寨乡", "五里口乡", "高朗乡", "转楼乡"], ["真源", "谷阳", "卫真", "鸣鹿", "涡北镇", "玄武镇", "宋河镇", "太清宫镇", "王皮溜镇", "试量镇", "辛集镇", "马铺镇", "贾滩镇", "杨湖口镇", "张店镇", "观堂镇", "生铁冢镇", "郑家集乡", "赵村乡", "任集乡", "唐集乡", "高集乡", "邱集乡", "穆店乡"], ["花园", "水寨", "东方", "莲花", "千佛阁", "光武", "南顿镇", "孙店镇", "李寨镇", "贾岭镇", "高寺镇", "新桥镇", "付集镇", "官会镇", "丁集镇", "郑郭镇", "秣陵镇", "王明口镇", "范集镇", "三店镇", "永丰镇"]], [["人民街道", "东风街道", "西园街道", "新华街道", "南海街道", "老街街道", "橡林街道", "雪松街道", "顺河街道", "刘阁街道", "香山街道", "水屯镇", "沙河店镇", "板桥镇", "诸市镇", "蚁蜂镇", "老河乡", "朱古洞乡", "胡庙乡", "古城乡", "金桥街道"], ["柏城街道", "柏亭街道", "柏苑街道", "五沟营镇", "权寨镇", "师灵镇", "出山镇", "盆尧镇", "嫘祖镇", "重渠乡", "人和乡", "宋集乡", "谭店乡", "芦庙乡", "杨庄乡", "专探乡", "二郎乡", "蔡寨回族乡", "焦庄乡", "老王坡农场", "产业集聚区"], ["蔡都街道", "芦岗街道", "重阳街道", "卧龙街道", "黄埠镇", "杨集镇", "洙湖镇", "党店镇", "朱里镇", "华陂镇", "塔桥镇", "东洪镇", "邵店镇", "五龙镇", "和店镇", "大路李乡", "无量寺乡", "杨屯乡", "蔡沟乡", "齐海乡", "崇礼乡", "韩寨乡", "东岸乡", "小岳寺乡", "西洪乡", "百尺乡"], ["古槐街道", "清河街道", "东皇街道", "杨埠镇", "东和店镇", "庙湾镇", "射桥镇", "西洋店镇", "阳城镇", "郭楼镇", "李屯镇", "万金店镇", "高杨店镇", "万冢镇", "十字路乡", "玉皇庙乡", "老王岗乡", "辛店乡", "双庙乡"], ["真阳街道", "清源街道", "寒冻镇", "汝南埠镇", "铜钟镇", "陡沟镇", "熊寨镇", "大林镇", "永兴镇", "慎水乡", "傅寨乡", "袁寨乡", "新阮店乡", "油坊店乡", "雷寨乡", "王勿桥乡", "吕河乡", "皮店乡", "彭桥乡", "兰青乡"], ["盘龙街道", "三里河街道", "朗陵街道", "竹沟镇", "任店镇", "新安店镇", "留庄镇", "刘店镇", "瓦岗镇", "双河镇", "石滚河镇", "李新店镇", "普会寺乡"], ["花园街道", "泌水街道", "古城街道", "羊册镇", "马谷田镇", "春水镇", "官庄镇", "赊湾镇", "郭集镇", "泰山庙镇", "王店镇", "高店乡", "盘古乡", "高邑乡", "铜山乡", "下碑寺乡", "象河乡", "付庄乡", "贾楼乡", "黄山口乡", "杨家集乡", "双庙街乡", "工业园区管委会", "石材开发区管委会"], ["汝宁街道", "三门闸街道", "古塔街道", "宿鸭湖街道", "王岗镇", "梁祝镇", "和孝镇", "老君庙镇", "留盆镇", "金铺镇", "东官庄镇", "常兴镇", "罗店镇", "韩庄镇", "三桥镇", "张楼镇", "南余店乡", "板店乡"], ["瞿阳街道", "车站街道", "莲花湖街道", "玉山镇", "查岈山镇", "石寨铺镇", "和兴镇", "沈寨镇", "阳丰镇", "常庄镇", "花庄镇", "槐树乡", "文城乡", "褚堂乡", "工业园区", "查岈山风景区", "凤鸣谷风景区"], ["古吕街道", "今是街道", "月亮湾街道", "砖店镇", "陈店镇", "佛阁寺镇", "练村镇", "棠村镇", "韩集镇", "龙口镇", "李桥回族镇", "黄楼镇", "孙召镇", "余店镇", "河坞乡", "关津乡", "宋岗乡", "顿岗乡", "涧头乡", "杨庄户乡", "化庄乡", "栎城乡", "弥陀寺乡"]]], [[["大智街", "一元街", "车站街", "四唯街", "永清街", "西马街", "球场街", "劳动街", "二七街", "新村街", "丹水池街", "台北街", "花桥街", "谌家矶街", "后湖街", "塔子湖街", "百步亭花园"], ["民族街", "花楼街", "水塔街", "民权街", "满春街", "民意街", "新华街", "万松街", "唐家墩街", "北湖街", "前进街", "常青街", "汉兴街", "江汉经济开发区", "武汉中央商务区管理委员会"], ["古田街道", "韩家墩街道", "宗关街道", "汉水桥街道", "宝丰街道", "荣华街道", "汉中街道", "汉正街道", "六角亭街道", "长丰街道", "易家街道"], ["建桥街", "晴川街", "鹦鹉街", "洲头街", "五里墩街", "琴断口街", "江汉二桥街", "永丰街", "江堤街", "四新街", "龙阳街"], ["积玉桥街", "杨园街", "徐家棚街", "粮道街", "中华路街", "黄鹤楼街", "紫阳街", "白沙洲街", "首义路街", "中南路街", "水果湖街", "珞珈山街", "石洞街", "南湖街", "东湖风景区街道（武昌）"], ["红卫路街道", "冶金街道", "新沟桥街道", "红钢城街道", "工人村街道", "青山镇街道", "厂前街道", "武东街道", "白玉山街道", "钢花村街道", "武钢集团公司", "中国一冶有限责任公司", "武钢实业公司", "中国一冶集体企业管理处", "开发区", "钢都花园管理委员会", "北湖工业园管理办公室"], ["珞南街道", "关山街道", "狮子山街道", "张家湾街道", "梨园街道", "卓刀泉街道", "洪山街道", "和平街道", "青菱街道", "八吉府街", "关东街道", "花山街道", "左岭街道", "九峰街道", "天兴乡", "清谭湖", "东湖风景区街道（洪山）"], ["吴家山街道", "柏泉办事", "将军路街道", "慈惠街道", "走马岭街道", "径河街道", "长青街道", "辛安渡办事", "东山办事", "常青花园新区街道管理委员会", "新沟镇街道", "金银湖街道", "产业管理处", "保税物流管理处", "海峡两岸科技产业管理处", "食品工业管理处", "临空经济管理处"], ["纱帽街道", "邓南街道", "东荆街道", "湘口街道"], ["蔡甸街道", "奓山街道", "永安街道", "侏儒山街道", "大集街道", "张湾街道", "沌口街", "军山街道", "沌阳街道", "索河镇", "玉贤镇", "消泗乡", "桐湖", "洪北管委会", "武汉市蔡甸区后官湖生态宜居新城管理委员会", "蔡甸经济开发区凤凰山事处", "成功现代都市农业发展区管理委员会", "武汉蔡甸经济发开区管理委员会"], ["纸坊街道", "金口街道", "乌龙泉街道", "郑店街道", "五里界街道", "金水", "安山街道", "山坡街道", "法泗街道", "湖泗街道", "舒安街道", "佛祖岭街道", "豹澥街道", "流芳街道", "滨湖街道", "江夏区经济开发区庙山", "江夏区经济开发区藏龙岛", "江夏区经济开发区大桥新区", "江夏区经济开发区梁子湖风景区办事", "金港新区"], ["前川街道", "祁家湾街道", "横店街道", "罗汉寺街道", "滠口街道", "六指街道", "天河街道", "王家河街道", "长轩岭街道", "李集街道", "姚集街道", "蔡榨街道", "武湖街道", "三里桥街道", "蔡店街道", "木兰乡", "木兰山风景区管理处", "大潭", "盘龙城经济开发区", "汉口北商贸物流枢纽区管委会"], ["邾城街道", "阳逻街道", "仓埠街道", "汪集街道", "李集街道", "三店街道", "潘塘街道", "旧街街道", "双柳街道", "涨渡湖街道", "辛冲街道", "徐古街道", "凤凰镇", "道观河风景旅游管理处", "新洲原种场"]], [["花湖街道", "江北管理区", "黄石港区环磁湖片区工作委员会", "黄石港区黄石港片区工作委员会", "黄石港区胜阳港片区工作委员会"], ["章山街道", "冶钢农场", "社区工作管理委员会", "西塞山工业园区管委会"], ["团城山街道", "社区事务管理委员会", "长乐山工业园管理委员会", "东方山风景区服务处"], ["区直辖村模拟镇"], ["兴国镇", "富池镇", "黄颡口镇", "韦源口镇", "太子镇", "大王镇", "陶港镇", "白沙镇", "浮屠镇", "三溪镇", "龙港镇", "洋港镇", "排市镇", "木港镇", "枫林镇", "王英镇", "率洲农场", "半壁山农场", "荆头山农场", "金海开发区", "城东新区"], ["东岳路街道", "东风路街道", "金湖街道", "罗家桥街道", "金山街道", "金牛镇", "保安镇", "灵乡镇", "金山店镇", "还地桥镇", "殷祖镇", "刘仁八镇", "陈贵镇", "大箕铺镇", "汪仁镇", "茗山乡", "东风农场管理区", "四顾闸管理处"]], [["武当路街道", "二堰街道", "五堰街道", "白浪开发区白浪街道", "大川镇人民政府", "小川乡", "茅塔乡", "鸳鸯乡"], ["花果街道", "红卫街道", "车城路街道", "汉江路街道", "黄龙镇", "柏林镇", "方滩乡", "西沟乡", "西城开发区", "十堰工业新区", "秦家坪林场", "凤凰山茶场"], ["安阳镇", "杨溪铺镇", "青曲镇", "白桑关镇", "南化塘镇", "白浪镇", "刘洞镇", "谭山镇", "梅铺镇", "青山镇", "郧县经济开发区（茶店镇）", "柳陂镇", "鲍峡镇", "胡家营镇", "谭家湾镇", "郧县城关镇", "大柳乡", "五峰乡", "叶大乡", "红岩背林场"], ["城关镇", "土门镇", "上津镇", "店子镇", "夹河镇", "羊尾镇", "观音镇", "马鞍镇", "河夹镇", "香口乡", "关防乡", "湖北口回族乡", "景阳乡", "六郎乡", "涧池乡", "安家乡", "槐树林特场管委会", "三官洞林区", "工业园区"], ["城关镇", "溢水镇", "麻家渡镇", "宝丰镇", "擂鼓镇", "秦古镇", "得胜镇", "上庸镇", "官渡镇", "潘口乡", "竹坪乡", "大庙乡", "双台乡", "楼台乡", "文峰乡", "深河乡", "柳林乡"], ["城关镇", "蒋家堰镇", "中峰镇", "水坪镇", "县河镇", "泉溪镇", "丰溪镇", "龙坝镇", "兵营镇", "汇湾镇", "新洲镇", "鄂坪乡", "天宝乡", "桃源乡", "向坝乡", "龙王垭茶场", "国营竹溪综合农场", "原种场", "渔种场", "种畜场", "王家山茶场", "标湖林场", "双竹林场", "八卦山林场", "源茂林场", "岱王沟林场", "望府座林场", "天池垭林场", "九里岗林场", "竹溪县十八里长峡管理局"], ["城关镇", "军店镇", "化龙堰镇", "土城镇", "大木厂镇", "青峰镇", "门古寺镇", "白鹤镇", "野人谷镇", "红塔镇", "窑淮镇", "尹吉甫镇", "姚坪乡", "沙河乡", "万峪河乡", "上龛乡", "中坝乡", "九道乡", "回龙乡", "五台乡", "国营杨岔山林场", "国营九口山林场", "国营毛家山林场", "国营代东河林场", "房县西蒿漆场", "房县园艺场", "谭家湾水库管养所", "温泉风景区", "房县旱粮粮种场"], ["均州路街道", "大坝路街道", "丹赵路街道", "三官殿街道", "土关垭镇", "浪河镇", "丁家营镇", "六里坪镇", "盐池河镇", "均县镇", "习家店镇", "蒿坪镇", "石鼓镇", "凉水河镇", "官山镇", "龙山镇", "新港经济开发管理处", "牛河林业开发管理区", "白杨坪林业开发管理区", "大沟林业开发管理区", "武当山特区"]], [["西陵街道", "学院街道", "云集街道", "西坝街道", "葛洲坝街道", "夜明珠街道", "东苑街道", "南苑街道", "北苑街道", "窑湾乡", "峡口风景区"], ["大公桥街道", "万寿桥街道", "宝塔河街道", "伍家岗街道", "伍家乡"], ["点军街道", "艾家镇", "桥边镇", "联棚乡", "土城乡"], ["古老背街道", "虎牙街道", "云池街道"], ["小溪塔街道办", "夷陵经济开发区", "樟村坪镇", "雾渡河镇", "分乡镇", "太平溪镇", "三斗坪镇", "乐天溪镇", "龙泉镇", "鸦鹊岭镇", "黄花镇", "下堡坪乡", "邓村乡", "三峡坝区"], ["鸣凤镇", "花林寺镇", "旧县镇", "洋坪镇", "茅坪场镇", "荷花镇", "河口乡"], ["古夫镇", "昭君镇", "峡口镇", "南阳镇", "黄粮镇", "水月寺镇", "高桥乡", "榛子乡"], ["茅坪镇", "归州镇", "屈原镇", "沙镇溪镇", "两河口镇", "郭家坝镇", "杨林桥镇", "九畹溪镇", "水田坝乡", "泄滩乡", "梅家河乡", "磨坪乡"], ["龙舟坪镇", "高家堰镇", "磨市镇", "都镇湾镇", "资丘镇", "渔峡口镇", "榔坪镇", "贺家坪镇", "大堰乡", "鸭子口乡", "火烧坪乡"], ["渔洋关镇", "仁和坪镇", "长乐坪镇", "五峰镇", "湾潭镇", "付家堰乡", "牛庄乡", "采花乡"], ["陆城街道", "红花套镇", "高坝洲镇", "聂家河镇", "松木坪镇", "枝城镇", "姚家店镇", "五眼泉镇", "王家畈镇", "潘家湾土家族乡", "松宜矿区管理委员会"], ["当阳市玉阳街道", "当阳市坝陵街道", "当阳市玉泉街道", "当阳市两河镇", "当阳市河溶镇", "当阳市育溪镇", "当阳市庙前镇", "当阳市王店镇", "当阳市半月镇", "当阳市草埠湖镇"], ["马家店街道", "安福寺镇", "白洋镇", "顾家店镇", "董市镇", "仙女镇", "问安镇", "七星台镇", "百里洲镇"]], [["真武山街道", "古城街道", "庞公街道", "檀溪街道", "隆中街道", "余家湖街道", "欧庙镇", "卧龙镇", "尹集乡"], ["汉江街道", "王寨街道", "中原街道", "定中门街道", "清河口街道", "屏襄门街道", "米公街道", "柿铺街道", "高新区紫贞街道", "高新区七里河街道", "高新区东风", "牛首镇", "太平店镇", "高新区团山镇", "高新区米庄镇", "经济开发区", "鱼梁洲开发区", "高新区汽车工业园", "高新区高新技术产业园", "高新区高新技术创业服务中心"], ["张湾", "刘集", "肖湾", "龙王镇", "石桥镇", "黄集镇", "伙牌镇", "古驿镇", "朱集镇", "程河镇", "双沟镇", "张家集镇", "黄龙镇", "峪山镇", "东津镇", "襄阳区经济技术开发区", "鹿门风景名胜区", "襄北农场", "深圳工业园"], ["城关镇", "武安镇", "九集镇", "李庙镇", "长坪镇", "薛坪镇", "板桥镇", "巡检镇", "东巩镇", "肖堰镇", "清河管理区"], null, ["城关镇", "黄堡镇", "后坪镇", "龙坪镇", "店垭镇", "马良镇", "歇马镇", "马桥镇", "寺坪镇", "过渡湾镇", "两峪乡", "湖北保康经济开发区管理委员会"], ["光化街道", "酂阳街道", "孟楼镇", "竹林桥镇", "薛集镇", "张集镇", "仙人渡镇", "洪山嘴镇", "李楼镇", "袁冲乡", "蔬菜原种场", "百花山林场", "林茂山林场", "二房营原种场"], ["北城街道", "南城街道", "环城街道", "琚湾镇", "七方镇", "杨当镇", "太平镇", "新市镇", "鹿头镇", "刘升镇", "兴隆镇", "王城镇", "吴店镇", "熊集镇", "平林镇", "枣阳经济开发区", "随阳农场", "车河农场"], ["鄢城街道", "南营街道", "郑集镇", "小河镇", "刘猴镇", "孔湾镇", "流水镇", "板桥镇", "王集镇", "雷河镇", "襄南监狱", "劳教所", "大雁工业园区", "宜城经济开发区"]], [["太和镇", "东沟镇", "梁子生态管理区（镇）", "涂家垴镇", "沼山镇", "梧桐湖新区"], ["华容镇", "葛店镇", "庙岭镇", "段店镇", "临江乡", "蒲团乡", "葛店开发区"], ["凤凰街道", "古楼街道", "西山街道", "泽林镇", "杜山镇", "新庙镇", "碧石镇", "汀祖镇", "燕矶镇", "杨叶镇", "花湖镇", "长港镇", "沙窝乡", "鄂州经济开发区"]], [["龙泉街道办", "泉口街道办", "栗溪镇", "子陵镇", "漳河镇", "马河镇", "石桥驿镇", "牌楼镇", "仙居乡", "东宝工业园区"], ["掇刀街道", "白庙街道", "兴隆街道", "双喜街道", "团林铺镇", "麻城镇"], ["新市镇", "永兴镇", "曹武镇", "罗店镇", "宋河镇", "坪坝镇", "三阳镇", "绿林镇", "杨集镇", "孙桥镇", "石龙镇", "永漋镇", "雁门口镇", "钱场镇", "开发区（镇）", "温泉新区", "太子山", "罗汉寺", "长滩", "何集", "易家岭", "屈家岭经济开发区", "原种场镇"], ["沙洋镇", "五里铺镇", "十里铺镇", "纪山镇", "拾回桥镇", "后港镇", "毛李镇", "官当镇", "李市镇", "马良镇", "高阳镇", "沈集镇", "曾集镇", "沙洋监狱管理局"], ["郢中街道", "洋梓镇", "长寿镇", "丰乐镇", "胡集镇", "双河镇", "磷矿镇", "文集镇", "冷水镇", "石牌镇", "旧口镇", "柴湖镇", "长滩镇", "东桥镇", "客店镇", "张集镇", "九里乡", "湖北钟祥经济开发区", "钟祥市官庄湖管理区", "南湖原种场", "罗汉寺种畜场", "双桥原种场", "东岳种畜场", "康桥湖农场", "大口林场", "盘石岭林场", "温峡水库", "石门水库", "黄坡水库", "湖北钟祥胡集经济技术开发区"]], [["孝南区书院街", "孝南区新华街", "孝南区广场街", "孝南区车站街道", "孝南区新铺镇", "孝南区西河镇", "孝南区杨店镇", "孝南区陡岗镇", "孝南区肖港镇", "孝南区毛陈镇", "孝南区三汊镇", "孝南区祝站镇", "孝南区朋兴乡", "孝南区卧龙乡", "孝南区闵集乡", "孝南区经济开发区", "孝南区朱湖", "孝南区东山头", "孝感开发区丹阳", "孝感开发区孝天", "孝感开发区槐荫"], ["花园镇", "丰山镇", "周巷镇", "小河镇", "王店镇", "卫店镇", "白沙镇", "邹岗镇", "小悟乡", "季店乡", "花西乡", "陡山乡", "开发区", "观音湖生态文化旅游渡假区", "双峰山旅游渡假区"], ["城关镇", "阳平镇", "芳畈镇", "新城镇", "夏店镇", "刘集镇", "河口镇", "四姑镇", "吕王镇", "黄站镇", "宣化店镇", "丰店镇", "大新镇", "三里镇", "高店乡", "彭店乡", "东新乡"], ["城关镇", "义堂镇", "曾店镇", "吴铺镇", "伍洛镇", "下辛店镇", "道桥镇", "隔蒲潭镇", "胡金店镇", "倒店乡", "沙河乡", "清明河乡", "县经济开发区"], ["城中街道", "城北街道", "四里棚街道", "东马坊街道", "长江埠街道", "田店镇", "杨河镇", "三合镇", "郎君镇", "黄滩镇", "天鹅镇", "义和镇", "陈河镇", "杨岭镇", "汤池镇", "经济技术开发区", "南垸良种场"], ["府城街道", "南城街道", "赵棚镇", "李店镇", "巡店镇", "棠棣镇", "雷公镇", "王义贞镇", "烟店镇", "孛畈镇", "伏水镇", "陈店乡", "辛榨乡", "木梓乡", "接官乡", "开发区"], ["仙女山街道", "汈东街道", "马口镇", "脉旺镇", "城隍镇", "分水镇", "沉湖镇", "田二河镇", "回龙镇", "新堰镇", "垌塚镇", "麻河镇", "刘家隔镇", "新河镇", "庙头镇", "杨林沟镇", "西江乡", "湾潭乡", "南河乡", "马鞍乡", "里潭乡", "韩集乡", "国营中洲农场", "华严农场", "三星垸原种场", "汈汊湖养殖场", "汉川市经济技术开发区"]], [["中山街道", "崇文街道", "解放街道", "胜利街道", "朝阳街道", "锣场镇", "岑河镇", "观音当镇", "关沮镇", "立新乡"], ["西城街道", "东城街道", "城南街道", "纪南镇", "川店镇", "马山镇", "八岭山镇", "李埠镇", "弥市镇", "郢城镇", "太湖港管理区", "菱角湖管理区"], ["埠河镇", "斗湖堤镇", "夹竹园镇", "闸口镇", "杨家厂镇", "麻豪口镇", "藕池镇", "黄山头镇", "孟家溪镇", "南平镇", "章庄铺镇", "狮子口镇", "斑竹垱镇", "毛家港镇", "甘家厂乡", "章田寺乡"], ["容城镇", "朱河镇", "新沟镇", "龚场镇", "周老嘴镇", "黄歇口镇", "汪桥镇", "程集镇", "分盐镇", "毛市镇", "福田寺镇", "上车湾镇", "汴河镇", "尺八镇", "白螺镇", "网市镇", "三洲镇", "桥市镇", "红城乡", "棋盘乡", "柘木乡", "人民大垸农场管理区", "荒湖农场管理区"], ["资市镇", "熊河镇", "白马寺镇", "沙岗镇", "普济镇", "郝穴镇", "马家寨乡", "秦市乡", "江北监狱", "三湖管理区", "六合垸管理区"], ["绣林街道", "笔架山街道", "新厂镇", "横沟市镇", "大垸镇", "小河口镇", "桃花山镇", "调关镇", "东升镇", "高基庙镇", "南口镇", "高陵镇", "团山寺镇", "久合垸乡", "天鹅洲开发区"], ["新堤街道", "滨湖街道", "螺山镇", "乌林镇", "龙口镇", "燕窝镇", "新滩镇", "峰口镇", "曹市镇", "府场镇", "戴家场镇", "瞿家湾镇", "沙口镇", "万全镇", "汊河镇", "黄家口镇", "老湾乡", "小港管理区", "大同湖管理区", "大沙湖管理区"], ["新江口镇", "南海镇", "八宝镇", "涴市镇", "老城镇", "陈店镇", "王家桥镇", "斯家场镇", "杨林市镇", "纸厂河镇", "街河市镇", "洈水镇", "刘家场镇", "沙道观镇", "万家乡", "卸甲坪土家族乡"]], [["赤壁街道", "东湖街道", "禹王街道", "南湖街道", "路口镇", "堵城镇", "陈策楼镇", "陶店乡", "火车站开发区", "黄冈高新技术产业园区", "武汉经济技术开发区黄冈产业园管委会"], ["团风镇", "淋山河镇", "方高坪镇", "回龙山镇", "马曹庙镇", "上巴河镇", "总路咀镇", "但店镇", "贾庙乡", "杜皮乡", "黄湖农场", "金锣港农场"], ["城关镇", "七里坪镇", "华河镇", "二程镇", "上新集镇", "高桥镇", "觅儿镇", "八里镇", "太平桥镇", "永河镇", "杏花乡", "火连畈茶场", "天台山旅游开发管理处", "红安经济开发区"], ["凤山镇", "骆驼坳镇", "大河岸镇", "九资河镇", "胜利镇", "河铺镇", "三里畈镇", "匡河镇", "白庙河镇", "大崎镇", "白莲河乡", "平湖乡", "罗田县经济开发区", "青苔关林场", "天堂寨林场", "薄刀峰林场", "黄狮寨林场"], ["温泉镇", "南河镇", "红山镇", "金家铺镇", "石头咀镇", "草盘地镇", "雷家店镇", "杨柳湾镇", "方家咀乡", "孔家坊乡", "陶家河乡", "桃花冲林场", "吴家山林场", "五峰山林场", "英山县经济开发区"], ["清泉镇", "巴河镇", "竹瓦镇", "汪岗镇", "团陂镇", "关口镇", "白莲镇", "蔡河镇", "洗马镇", "丁司垱镇", "散花镇", "兰溪镇", "绿杨乡", "策湖国家湿地公园管理处", "三角山旅游度假区管理委员会", "经济开发区镇"], ["漕河镇", "赤东镇", "蕲州镇", "管窑镇", "彭思镇", "横车镇", "株林镇", "刘河镇", "狮子镇", "青石镇", "张榜镇", "大同镇", "檀林镇", "向桥乡", "八里湖农场", "李时珍医药工业园区管委会"], ["黄梅镇", "孔垄镇", "小池镇", "下新镇", "大河镇", "停前镇", "五祖镇", "濯港镇", "蔡山镇", "新开镇", "独山镇", "分路镇", "柳林乡", "杉木乡", "苦竹乡", "刘佐乡", "挪步园风景管理处", "黄梅县农业开发总公司", "黄梅县农科所"], ["龙池", "鼓楼", "南湖", "中馆驿镇", "宋埠镇", "歧亭镇", "白果镇", "夫子河镇", "阎家河镇", "龟山镇", "盐田河镇", "张家畈镇", "木子店镇", "三河口镇", "黄土岗镇", "福田河镇", "乘马岗镇", "顺河镇", "铁门岗乡", "宋埠良种场", "麻城明山水库", "麻城三河水库", "狮子峰林场", "麻城林店茶场", "湖北省麻城开发区", "龟山风景区管理处", "湖北浮桥河国家湿地公园管理处", "五脑山林场"], ["武穴街道", "刊江街道", "田镇街道", "万丈湖街道", "梅川镇", "余川镇", "花桥镇", "大金镇", "石佛寺镇", "四望镇", "大法寺镇", "龙坪镇"]], [["温泉", "浮山", "永安", "汀泗桥镇", "向阳湖镇", "官埠桥镇", "横沟桥镇", "贺胜桥镇", "双溪桥镇", "马桥镇", "桂花镇", "高桥镇", "大幕乡", "向阳湖奶牛良种场", "咸宁市经济技术开发区", "湖北咸安经济开发区"], ["陆溪镇", "高铁岭镇", "官桥镇", "鱼岳镇", "新街镇", "渡普镇", "潘家湾镇", "牌洲湾镇", "头墩农场", "嘉鱼县经济开发区"], ["隽水镇", "麦市镇", "塘湖镇", "关刀镇", "沙堆镇", "五里镇", "石南镇", "北港镇", "马港镇", "四庄乡", "大坪乡", "鹿角山林场", "锡山森林公园管理处", "黄龙林场", "黄袍林场", "药姑林场"], ["天城镇", "沙坪镇", "石城镇", "桂花泉镇", "白霓镇", "路口镇", "金塘镇", "青山镇", "肖岭乡", "铜钟乡", "港口乡", "高枧乡", "崇阳县工业园区"], ["通羊镇", "南林桥镇", "黄沙铺镇", "厦铺镇", "九宫山镇", "闯王镇", "洪港镇", "大畈镇", "大路乡", "杨芳林乡", "燕厦乡", "慈口乡", "九宫山自然保护管理局", "开发区"], ["蒲圻街道", "赤马港街道", "陆水湖街道", "新店镇", "赵李桥镇", "茶庵岭镇", "车埠镇", "赤壁镇", "柳山湖镇", "神山镇", "中伙铺镇", "官塘驿镇", "黄盖湖镇", "余家桥乡", "蒲纺工业园", "官塘驿林场", "羊楼洞茶场", "沧湖开发区", "赤壁市经济开发区"]], [["西城街道（办", "东城街道（办", "南郊街道（办", "北郊街道（办", "城南新区", "万店镇", "何店镇", "洛阳镇", "府河镇", "淅河镇", "曾都区新型工业基地", "随州市经济开发区"], ["厉山镇", "高城镇", "殷店镇", "草店镇", "小林镇", "淮河镇", "万和镇", "尚市镇", "唐县镇", "吴山镇", "新街镇", "安居镇", "澴潭镇", "洪山镇", "长岗镇", "三里岗镇", "柳林镇", "均川镇", "万福店镇"], ["应山街道", "十里街道", "广水街道", "城郊街道", "武胜关镇", "杨寨镇", "陈巷镇", "长岭镇", "马坪镇", "关庙镇", "余店镇", "吴店镇", "郝店镇", "蔡河镇", "李店镇", "太平镇", "骆店镇", "中华山林场", "三潭风景区"]], [["舞阳坝街道", "六角亭街道", "小渡船街道", "龙凤镇", "崔坝镇", "板桥镇", "白杨坪镇", "三岔乡", "新塘乡", "红土乡", "沙地乡", "太阳河乡", "屯堡乡", "白果乡", "芭蕉侗族乡", "盛家坝乡", "沐抚"], ["都亭街道", "东城街道", "谋道镇", "柏杨坝镇", "汪营镇", "建南镇", "忠路镇", "团堡镇", "毛坝镇", "凉雾乡", "元堡乡", "南坪乡", "文斗乡", "沙溪乡", "佛宝山生态综合开发区"], ["业州镇", "高坪镇", "红岩寺镇", "景阳镇", "官店镇", "花坪镇", "长梁乡", "茅田乡", "龙坪乡", "三里乡"], ["信陵镇", "东瀼口镇", "沿渡河镇", "官渡口镇", "茶店子镇", "绿葱坡镇", "大支坪镇", "野三关镇", "水布垭镇", "清太坪镇", "溪丘湾乡", "金果坪乡"], ["珠山镇", "椒园镇", "沙道沟镇", "李家河镇", "高罗镇", "万寨乡", "长潭河侗族乡", "晓关侗族乡", "椿木营乡"], ["高乐山镇", "忠堡镇", "坪坝营镇", "朝阳寺镇", "清坪镇", "唐崖镇", "丁寨乡", "活龙坪乡", "小村乡", "黄金洞乡", "大路坝区"], ["翔凤镇", "百福司镇", "大河镇", "绿水镇", "旧司镇", "革勒车镇", "漫水乡", "三胡乡"], ["走马镇", "容美镇", "太平镇", "燕子镇", "中营镇", "铁炉乡", "五里乡", "下坪乡", "邬阳乡"]]], [[["文艺路街道", "朝阳街街道", "韭菜园街道", "五里牌街道", "火星街道", "马王堆街道", "东屯渡街道", "湘湖街道", "定王台街道", "荷花园街道", "东岸街道", "马坡岭街道", "东湖街道", "隆平高科技园"], ["坡子街街道", "城南路街道", "裕南街街道", "金盆岭街道", "新开铺街道", "青园街道", "桂花坪街道", "赤岭路街道", "文源街道", "先锋街道", "黑石铺街道", "大托铺街道", "暮云街道", "南托街道"], ["望月湖街道", "岳麓街道", "桔子洲街道", "银盆岭街道", "观沙岭街道", "望城坡街道", "西湖街道", "咸嘉湖街道", "望岳街道", "梅溪湖街道", "麓谷街道", "坪塘街道", "含浦街道", "天顶街道", "洋湖街道", "学士街道", "莲花镇", "雨敞坪镇"], ["芙蓉北路街道", "东风路街道", "清水塘街道", "望麓园街道", "湘雅路街道", "伍家岭街道", "新河街道", "通泰街街道", "四方坪街道", "洪山街道", "浏阳河街道", "月湖街道", "秀峰街道", "沙坪街道", "捞刀河街道", "青竹湖街道"], ["侯家塘街道", "左家塘街道", "圭塘街道", "砂子塘街道", "东塘街道", "雨花亭街道", "高桥街道", "洞井街道", "黎托街道", "井湾子街道", "同升街道", "东山街道", "跳马镇", "长沙雨花经济开发区管理委员会"], ["高塘岭街道", "丁字湾街道", "大泽湖街道", "月亮岛街道", "白沙洲街道", "金山桥街道", "黄金园街道", "乌山街道", "铜官街道", "雷锋街道", "桥驿镇", "茶亭镇", "靖港镇", "乔口镇", "白箬铺镇"], ["星沙街道", "泉塘街道", "湘龙街道", "榔梨街道", "长龙街道", "黄兴镇", "江背镇", "黄花镇", "春华镇", "果园镇", "路口镇", "高桥镇", "金井镇", "福临镇", "青山铺镇", "安沙镇", "北山镇", "开慧镇"], ["玉潭街道", "白马桥街道", "历经铺街道", "城郊街道", "道林镇", "花明楼镇", "东湖塘镇", "夏铎铺镇", "双江口镇", "煤炭坝镇", "坝塘镇", "灰汤镇", "双凫铺镇", "老粮仓镇", "流沙河镇", "巷子口镇", "龙田镇", "横市镇", "回龙铺镇", "黄材镇", "大成桥镇", "青山桥镇", "金洲镇", "大屯营镇", "资福镇", "菁华铺乡", "喻家坳乡", "沙田乡", "沩山乡"], ["淮川街道", "集里街道", "荷花街道", "关口街道", "社港镇", "官渡镇", "张坊镇", "达浒镇", "沿溪镇", "古港镇", "永和镇", "大瑶镇", "金刚镇", "文家市镇", "枨冲镇", "镇头镇", "普迹镇", "永安镇", "北盛镇", "龙伏镇", "澄潭江镇", "中和镇", "柏加镇", "洞阳镇", "大围山镇", "沙市镇", "淳口镇", "高坪镇", "官桥镇", "葛家镇", "小河乡", "蕉溪乡"]], [["月塘街道", "茨菇塘街道", "宋家桥街道", "桂花街道", "金山街道", "仙庾镇"], ["贺家土街道", "建设街道", "建宁街道", "董家段街道", "庆云街道", "枫溪街道", "龙泉街道", "白关镇"], ["田心街道", "响石岭街道", "清水塘街道", "铜塘湾街道", "井龙街道"], ["嵩山路街道", "泰山路街道", "栗雨街道", "群丰镇", "雷打石镇", "三门镇"], ["渌口镇", "朱亭镇", "古岳峰镇", "淦田镇", "龙门镇", "龙潭镇", "南洲镇", "龙船镇"], ["联星街道", "江桥街道", "春联街道", "谭桥街道", "酒埠江镇", "桃水镇", "网岭镇", "渌田镇", "石羊塘镇", "黄丰桥镇", "鸾山镇", "丫江桥镇", "皇图岭镇", "新市镇", "菜花坪镇", "莲塘坳镇", "宁家坪镇", "攸县工业园", "攸县网岭循环经济园"], ["下东街道", "思聪街道", "洣江街道", "云阳街道", "界首镇", "湖口镇", "马江镇", "高陇镇", "虎踞镇", "枣市镇", "火田镇", "严塘镇", "秩堂镇", "腰潞镇", "舲舫乡", "桃坑乡", "汉背", "茶陵县红色农场"], ["霞阳镇", "沔渡镇", "十都镇", "水口镇", "鹿原镇", "垄溪乡", "策源乡", "下村乡", "船形乡", "中村瑶族乡", "炎陵县大院农场", "炎陵县桃源洞管理局"], ["阳三石街道", "仙岳山街道", "国瓷街道", "来龙门街道", "白兔潭镇", "浦口镇", "王仙镇", "泗汾镇", "沈潭镇", "船湾镇", "均楚镇", "东富镇", "石亭镇", "孙家湾镇", "官庄镇", "嘉树镇", "板杉镇", "沩山镇", "枫林镇", "李畋镇", "明月镇", "左权镇", "茶山镇", "湖南醴陵经济开发区"]], [["雨湖路街道", "城正街街道", "平政路街道", "云塘街道", "广场街道", "中山路街道", "窑湾街道", "羊牯塘街道", "昭潭街道", "万楼街道", "先锋街道", "鹤岭镇", "楠竹山镇", "姜畲镇", "长城乡"], ["岳塘街道", "东坪街道", "中洲路街道", "书院路街道", "下摄司街道", "建设路街道", "五里堆街道", "社建村街道", "宝塔街道", "红旗街道", "霞城街道", "荷塘街道"], ["易俗河镇", "谭家山镇", "中路铺镇", "茶恩寺镇", "河口镇", "射埠镇", "花石镇", "青山桥镇", "石鼓镇", "云湖桥镇", "石潭镇", "杨嘉桥镇", "乌石镇", "白石镇", "分水乡", "排头乡", "锦石乡"], ["望春门街道", "新湘路街道", "昆仑桥街道", "东山街道", "山枣镇", "栗山镇", "中沙镇", "虞塘镇", "潭市镇", "棋梓镇", "壶天镇", "翻江镇", "金石镇", "白田镇", "月山镇", "泉塘镇", "梅桥镇", "毛田镇", "龙洞镇", "东郊乡", "金薮乡", "育塅乡"]], [["衡州路街道", "广东路街道", "东风路街道", "冶金街道", "苗圃街道", "粤汉街道", "东阳渡街道", "茶山坳镇", "和平乡", "酃湖乡", "金甲岭农场", "松林茶场"], ["先锋街道", "雁峰街道", "天马山街道", "黄茶岭街道", "白沙洲街道", "岳屏镇", "白沙洲工业园"], ["人民路街道", "青山街道", "潇湘街道", "五一街道", "合江街道", "黄沙湾街道", "角山乡"], ["蒸湘街道", "红湘街道", "联合街道", "呆鹰岭镇", "雨母山镇"], ["祝融街道", "南岳镇", "寿岳乡"], ["西渡镇", "集兵镇", "杉桥镇", "井头镇", "演陂镇", "金兰镇", "洪市镇", "曲兰镇", "金溪镇", "界牌镇", "渣江镇", "三湖镇", "台源镇", "关市镇", "库宗桥镇", "岘山镇", "石市镇", "樟木乡", "岣嵝乡", "栏垅乡", "大安乡", "溪江乡", "长安乡", "板市乡", "樟树乡"], ["云集镇", "廖田镇", "茶市镇", "冠市镇", "江口镇", "宝盖镇", "花桥镇", "铁丝塘镇", "泉溪镇", "洪山镇", "三塘镇", "谭子山镇", "鸡笼镇", "泉湖镇", "柞市镇", "茅市镇", "硫市镇", "栗江镇", "近尾洲镇", "咸塘镇", "松江镇", "相市乡", "衡州监狱"], ["开云镇", "白果镇", "东湖镇", "萱洲镇", "长江镇", "新桥镇", "店门镇", "永和乡", "福田铺乡", "岭坡乡", "贯塘乡", "江东乡"], ["洣水镇", "石湾镇", "新塘镇", "大浦镇", "吴集镇", "甘溪镇", "杨林镇", "草市镇", "杨桥镇", "霞流镇", "荣桓镇", "高湖镇", "白莲镇", "三樟镇", "蓬源镇", "南湾乡", "石滩乡", "河西开发区", "大浦工业园"], ["洪桥街道", "玉合街道", "永昌街道", "白鹤街道", "金桥镇", "鸟江镇", "粮市镇", "河洲镇", "归阳镇", "过水坪镇", "双桥镇", "灵官镇", "风石堰镇", "白地市镇", "黄土铺镇", "石亭子镇", "官家嘴镇", "步云桥镇", "砖塘镇", "蒋家桥镇", "太和堂镇", "马杜桥乡", "凤歧坪乡", "城连圩乡"], ["蔡子池街道", "灶市街街道", "水东江街道", "五里牌街道", "三架街道", "余庆街道", "黄市镇", "小水镇", "公平圩镇", "三都镇", "南阳镇", "夏塘镇", "龙塘镇", "哲桥镇", "永济镇", "遥田镇", "新市镇", "淝田镇", "大市镇", "仁义镇", "南京镇", "大义镇", "东湖圩镇", "马水镇", "导子镇", "亮源乡", "太平圩乡", "长坪乡", "太和圩乡", "坛下乡"], ["宜阳街道", "泉峰街道", "培元街道", "天堂山", "柏坊镇", "水口山镇", "烟洲镇", "荫田镇", "白沙镇", "西岭镇", "三角塘镇", "洋泉镇", "庙前镇", "罗桥镇", "板桥镇", "胜桥镇", "官岭镇", "新河镇", "蓬塘乡", "兰江乡", "大堡乡", "塔山瑶族乡"]], [["兴隆街道", "龙须塘街道", "汽车站街道", "小江湖街道", "东风路街道", "桥头街道", "滨江街道", "石桥街道", "爱莲街道", "高崇山镇", "渡头桥镇", "火车站乡"], ["中心路街道", "红旗路街道", "城北路街道", "城西街道", "翠园街道", "百春园街道", "城南街道", "火车南站街道", "学院路街道", "雨溪街道", "檀江街道", "罗士镇", "蔡锷乡", "板桥乡"], ["新滩镇街道", "状元洲街道", "田江街道", "茶元头街道", "陈家桥乡"], ["大禾塘街道", "两市塘街道", "宋家塘街道", "牛马司镇", "九龙岭镇", "仙槎桥镇", "火厂坪镇", "佘田桥镇", "灵官殿镇", "团山镇", "砂石镇", "廉桥镇", "流光岭镇", "流泽镇", "魏家桥镇", "野鸡坪镇", "杨桥镇", "水东江镇", "黑田铺镇", "简家陇镇", "界岭镇", "双凤乡", "周官桥乡", "堡面前乡", "斫曹乡"], ["酿溪镇", "严塘镇", "雀塘镇", "陈家坊镇", "潭溪镇", "寸石镇", "坪上镇", "龙溪铺镇", "巨口铺镇", "新田铺镇", "小塘镇", "太芝庙镇", "大新镇", "潭府乡", "迎光乡"], ["塘渡口镇", "白仓镇", "金称市镇", "塘田市镇", "黄亭市镇", "长阳铺镇", "岩口铺镇", "九公桥镇", "下花桥镇", "谷洲镇", "郦家坪镇", "五峰铺镇", "小溪市乡", "长乐乡", "蔡桥乡", "河伯乡", "黄荆乡", "诸甲亭乡", "罗城乡", "金江乡", "七里山园艺场", "五丰铺林场", "河伯岭林场"], ["桃洪镇", "小沙江镇", "金石桥镇", "司门前镇", "高平镇", "六都寨镇", "荷香桥镇", "横板桥镇", "周旺镇", "滩头镇", "鸭田镇", "西洋江镇", "岩口镇", "北山镇", "三阁司镇", "南岳庙镇", "七江镇", "羊古坳镇", "罗洪镇", "麻塘山乡", "虎形山瑶族乡", "大水田乡", "荷田乡", "山界回族乡"], ["文昌街道", "雪峰街道", "花古街道", "江口镇", "毓兰镇", "高沙镇", "竹市镇", "石江镇", "黄桥镇", "山门镇", "醪田镇", "花园镇", "岩山镇", "水东镇", "杨林镇", "古楼乡", "长塘瑶族乡", "罗溪瑶族乡", "月溪乡", "渣坪乡", "石柱乡", "桐山乡", "大屋瑶族乡", "茶铺茶场管理区"], ["长铺镇", "武阳镇", "李熙桥镇", "红岩镇", "唐家坊镇", "金屋塘镇", "瓦屋塘镇", "黄土矿镇", "东山侗族乡", "鹅公岭侗族苗族乡", "寨市苗族侗族乡", "乐安铺苗族侗族乡", "关峡苗族乡", "长铺子苗族侗族乡", "麻塘苗族瑶族乡", "河口苗族乡", "水口乡"], ["金石镇", "水庙镇", "崀山镇", "黄龙镇", "高桥镇", "回龙寺镇", "一渡水镇", "马头桥镇", "黄金瑶族乡", "麻林瑶族乡", "万塘乡", "清江桥乡", "安山乡", "丰田乡", "巡田乡", "靖位乡"], ["儒林镇", "茅坪镇", "西岩镇", "丹口镇", "五团镇", "长安营镇", "威溪乡", "白毛坪乡", "兰蓉乡", "汀坪乡", "蒋坊乡", "金紫乡"], ["辕门口街道", "迎春亭街道", "法相岩街道", "水西门街道", "邓元泰镇", "湾头桥镇", "文坪镇", "荆竹铺镇", "稠树塘镇", "邓家铺镇", "龙溪镇", "司马冲镇", "秦桥镇", "双牌镇", "大甸镇", "马坪乡", "晏田乡", "水浸坪乡"]], [["岳阳楼街道", "三眼桥街道", "吕仙亭街道", "金鹗山街道", "东茅岭街道", "五里牌街道", "望岳路街道", "城陵矶街道", "枫桥湖街道", "奇家岭街道", "洞庭街道", "洛王街道", "南湖街道", "站前街道", "王家河街道", "求索街道", "湖滨街道", "龙山街道", "月山街道", "西塘镇", "郭镇乡", "康王乡", "经济技术开发区通海路管理处", "金凤桥管理处", "木里港管理处"], ["长岭街道", "云溪镇", "陆城镇", "路口镇"], ["柳林洲街道", "广兴洲镇", "许市镇", "钱粮湖镇", "良心堡镇"], ["荣家湾镇", "黄沙街镇", "新墙镇", "柏祥镇", "筻口镇", "公田镇", "毛田镇", "月田镇", "张谷英镇", "新开镇", "步仙镇", "中洲乡", "长湖乡", "杨林乡", "东洞庭湖管委会"], ["三封寺镇", "治河渡镇", "北景港镇", "鲇鱼须镇", "万庾镇", "插旗镇", "注滋口镇", "操军镇", "东山镇", "梅田湖镇", "章华镇", "禹山镇", "新河乡", "团洲乡"], ["文星镇", "东塘镇", "樟树镇", "三塘镇", "岭北镇", "新泉镇", "湘滨镇", "南湖洲镇", "鹤龙湖镇", "金龙镇", "静河镇", "玉华镇", "六塘乡", "杨林寨乡"], ["汉昌镇", "安定镇", "三市镇", "加义镇", "长寿镇", "龙门镇", "虹桥镇", "南江镇", "梅仙镇", "浯口镇", "瓮江镇", "伍市镇", "向家镇", "童市镇", "岑川镇", "福寿山镇", "余坪镇", "石牛寨镇", "上塔市镇", "三阳乡", "木金乡", "板江乡", "大洲乡", "三墩乡"], ["汨罗镇", "新市镇", "古培镇", "白水镇", "川山坪镇", "弼时镇", "长乐镇", "大荆镇", "桃林寺镇", "三江镇", "屈子祠镇", "归义镇", "神鼎山镇", "罗江镇", "白塘镇", "营田"], ["长安街道", "桃矿街道", "五里牌街道", "忠防镇", "聂市镇", "江南镇", "桃林镇", "长塘镇", "白羊田镇", "詹桥镇", "黄盖镇", "羊楼司镇", "坦渡镇"]], [["启明街道", "府坪街道", "穿紫河街道", "丹阳街道", "白马湖街道", "德山街道", "东江街道", "永安街道", "南坪街道", "长庚街道", "芷兰街道", "芙蓉街道", "柳叶湖街道", "七里桥街道", "樟木桥街道", "河洑镇", "白鹤镇", "芦荻山乡", "丹洲乡"], ["玉霞街道", "红云街道", "郭家铺街道", "斗姆湖街道", "蒿子港镇", "中河口镇", "十美堂镇", "牛鼻滩镇", "韩公渡镇", "石公桥镇", "镇德桥镇", "周家店镇", "双桥坪镇", "灌溪镇", "蔡家岗镇", "草坪镇", "石门桥镇", "谢家铺镇", "黄土店镇", "尧天坪镇", "石板滩镇", "花岩溪镇", "许家桥回族维吾尔族乡", "鼎城区园艺场", "特种养殖场", "花岩溪林场", "贺家山原种场"], ["深柳镇", "大鲸港镇", "黄山头镇", "三岔河镇", "官垱镇", "下渔口镇", "陈家嘴镇", "大湖口镇", "安障乡", "安全乡", "安丰乡", "安康乡"], ["龙阳街道", "辰阳街道", "沧浪街道", "株木山街道", "蒋家嘴镇", "岩汪湖镇", "坡头镇", "酉港镇", "洲口镇", "罐头嘴镇", "沧港镇", "朱家铺镇", "太子庙镇", "崔家桥镇", "军山铺镇", "百禄桥镇", "西湖镇", "洋淘湖镇", "丰家铺镇", "龙潭桥镇", "聂家桥乡", "毛家滩回族维吾尔族乡", "西湖管理区"], ["澧西街道", "澧阳街道", "澧浦街道", "澧澹街道", "小渡口镇", "梦溪镇", "复兴镇", "盐井镇", "大堰垱镇", "王家厂镇", "金罗镇", "码头铺镇", "甘溪滩镇", "火连坡镇", "澧南镇", "如东镇", "涔南镇", "官垸镇", "城头山镇"], ["安福镇", "合口镇", "新安镇", "佘市桥镇", "太浮镇", "四新岗镇", "停弦渡镇", "修梅镇", "烽火乡", "刻木山乡"], ["漳江镇", "陬市镇", "盘塘镇", "热市镇", "黄石镇", "漆河镇", "理公港镇", "观音寺镇", "龙潭镇", "三阳港镇", "剪市镇", "茶庵铺镇", "西安镇", "沙坪镇", "桃花源镇", "架桥镇", "马鬃岭镇", "夷望溪镇", "青林回族维吾尔族乡", "枫树维吾尔族回族乡", "木塘垸乡", "双溪口乡", "九溪乡", "牛车河乡", "佘家坪乡", "泥窝潭乡", "杨溪桥乡", "郑家驿乡"], ["楚江街道", "永兴街道", "宝峰街道", "二都街道", "蒙泉镇", "夹山镇", "易家渡镇", "新关镇", "皂市镇", "维新镇", "太平镇", "磨市镇", "壶瓶山镇", "南北镇", "白云镇", "新铺乡", "三圣乡", "子良乡", "所街乡", "雁池乡", "罗坪乡", "秀坪园艺场", "东山峰农场", "大同山林场", "白云山林场", "洛浦寺林场", "夹山管理处"], ["三洲驿街道", "汪家桥街道", "襄阳街街道", "金鱼岭街道", "嘉山街道", "新洲镇", "白衣镇", "药山镇", "毛里湖镇", "涔澹农场"]], [["永定街道", "大庸桥街道", "西溪坪街道", "官黎坪街道", "崇文街道", "南庄坪街道", "新桥镇", "茅岩河镇", "教字垭镇", "天门山镇", "沅古坪镇", "尹家溪镇", "王家坪镇", "三家馆乡", "合作桥乡", "谢家垭乡", "罗塔坪乡", "罗水乡", "桥头乡", "四都坪乡", "原种场"], ["军地坪街道", "锣鼓塔街道", "协合乡", "中湖乡"], ["零阳镇", "岩泊渡镇", "溪口镇", "东岳观镇", "通津铺镇", "杉木桥镇", "象市镇", "江垭镇", "苗市镇", "零溪镇", "高桥镇", "龙潭河镇", "广福桥镇", "三合镇", "二坊坪镇", "南山坪乡", "洞溪乡", "杨柳铺乡", "三官寺土家族乡", "高峰土家族乡", "许家坊土家族乡", "金岩土家族乡", "赵家岗土家族乡", "甘堰土家族乡", "阳和土家族乡"], ["澧源镇", "瑞塔铺镇", "官地坪镇", "凉水口镇", "龙潭坪镇", "五道水镇", "陈家河镇", "廖家村镇", "利福塔镇", "八大公山镇", "桥自弯镇", "人潮溪镇", "空壳树乡", "竹叶坪乡", "走马坪白族乡", "刘家坪白族乡", "芙蓉桥白族乡", "马合口白族乡", "洪家关白族乡", "沙塔坪乡", "河口乡", "上河溪乡", "上洞街乡"]], [["大码头街道", "汽车路街道", "迎风桥镇", "沙头镇", "茈湖口镇", "长春镇", "新桥河镇", "张家塞乡", "长春工业园"], ["赫山街道", "桃花仑街道", "金银山街道", "会龙山街道", "鱼形山街道", "龙光桥街道", "八字哨镇", "泉交河镇", "欧江岔镇", "沧水铺镇", "岳家桥镇", "新市渡镇", "兰溪镇", "衡龙桥镇", "泥江口镇", "笔架山乡", "龙岭工业园"], ["明山头镇", "青树嘴镇", "厂窖镇", "武圣宫镇", "南洲镇", "华阁镇", "茅草街镇", "三仙湖镇", "麻河口镇", "浪拔湖镇", "乌嘴乡", "中鱼口乡"], ["修山镇", "鸬鹚渡镇", "石牛江镇", "牛田镇", "松木塘镇", "桃花江镇", "灰山港镇", "武潭镇", "马迹塘镇", "三堂街镇", "大栗港镇", "沾溪镇", "高桥乡", "鲊埠回族乡", "浮丘山乡", "板溪林场"], ["清塘铺镇", "仙溪镇", "长塘镇", "小淹镇", "羊角塘镇", "冷市镇", "奎溪镇", "烟溪镇", "渠江镇", "平口镇", "柘溪镇", "乐安镇", "滔溪镇", "梅城镇", "大福镇", "马路镇", "东坪镇", "江南镇", "高明乡", "龙塘乡", "田庄乡", "南金乡", "古楼乡"], ["琼湖街道", "胭脂湖街道", "四季红镇", "泗湖山镇", "南嘴镇", "新湾镇", "茶盘洲镇", "南大膳镇", "黄茅洲镇", "草尾镇", "阳罗洲镇", "共华镇", "南洞庭芦苇场", "漉湖芦苇场"]], [["人民路街道", "北湖街道", "燕泉街道", "下湄桥街道", "骆仙街道", "增福街道", "郴江街道", "涌泉街道", "安和街道", "石盖塘街道", "华塘镇", "鲁塘镇", "仰天湖瑶族乡", "保和瑶族乡"], ["苏仙岭街道", "南塔街道", "白鹿洞街道", "王仙岭街道", "卜里坪街道", "观山洞街道", "白露塘镇", "良田镇", "栖凤渡镇", "坳上镇", "许家洞镇", "五里牌镇", "五盖山镇", "飞天山镇"], ["龙潭街道", "鹿峰街道", "黄沙坪街道", "仁义镇", "太和镇", "洋市镇", "和平镇", "流峰镇", "塘市镇", "莲塘镇", "舂陵江镇", "荷叶镇", "方元镇", "樟市镇", "敖泉镇", "正和镇", "浩塘镇", "雷坪镇", "欧阳海镇", "四里镇", "桥市乡", "白水瑶族乡"], ["白石渡镇", "杨梅山镇", "瑶岗仙镇", "梅田镇", "黄沙镇", "迎春镇", "一六镇", "栗源镇", "岩泉镇", "玉溪镇", "天塘镇", "笆篱镇", "里田镇", "五岭镇", "浆水乡", "长村乡", "莽山瑶族乡", "关溪乡", "赤石乡"], ["马田镇", "湘阴渡镇", "塘门口镇", "金龟镇", "柏林镇", "鲤鱼塘镇", "便江镇", "悦来镇", "黄泥镇", "樟树镇", "太和镇", "油麻镇", "高亭司镇", "洋塘乡", "大布江乡", "龙形市乡", "七甲乡"], ["珠泉镇", "塘村镇", "袁家镇", "行廊镇", "龙潭镇", "石桥镇", "坦坪镇", "广发镇", "晋屏镇", "普满乡"], ["舜峰镇", "金江镇", "武水镇", "南强镇", "汾市镇", "水东镇", "楚江镇", "麦市镇", "香花镇", "花塘乡", "万水乡", "镇南乡", "西山瑶族乡"], ["热水镇", "土桥镇", "泉水镇", "暖水镇", "大坪镇", "三江口瑶族镇", "卢阳镇", "马桥镇", "井坡镇", "南洞乡", "濠头乡", "延寿瑶族乡", "集益乡", "文明瑶族乡", "大坪国有林场", "开发区"], ["沤江镇", "沙田镇", "清泉镇", "大塘镇", "四都镇", "寨前镇", "普乐镇", "桥头乡", "新坊乡", "东洛乡", "青山乡", "宋坪林场"], ["安平镇", "龙海镇", "灵官镇", "永乐江镇", "金紫仙镇", "龙市乡", "渡口乡", "华王乡", "牌楼乡", "平背乡", "承坪乡", "竹山乡", "洋际乡"], ["唐洞街道", "东江街道", "滁口镇", "三都镇", "蓼江镇", "兴宁镇", "州门司镇", "黄草镇", "汤溪镇", "清江镇", "白廊镇", "回龙山瑶族乡", "八面山瑶族乡"]], [["朝阳街道", "南津渡街道", "七里店街道", "徐家井街道", "接履桥街道", "石山脚街道", "水口山镇", "珠山镇", "黄田铺镇", "富家桥镇", "菱角塘镇", "邮亭圩镇", "石岩头镇", "大庆坪乡", "梳子铺乡", "凼底乡"], ["梅湾街道", "菱角山街道", "肖家园街道", "杨家桥街道", "梧桐街道", "凤凰街道", "珊瑚街道", "曲河街道", "岚角山街道", "花桥街镇", "普利桥镇", "牛角坝镇", "高溪市镇", "黄阳司镇", "上岭桥镇", "伊塘镇", "蔡市镇", "杨村甸乡"], ["龙山街道", "长虹街道", "浯溪街道", "观音滩镇", "茅竹镇", "大忠桥镇", "三口塘镇", "肖家镇", "八宝镇", "白水镇", "黄泥塘镇", "进宝塘镇", "潘市镇", "梅溪镇", "羊角塘镇", "下马渡镇", "七里桥镇", "大村甸镇", "黎家坪镇", "文富市镇", "文明铺镇", "龚家坪镇", "原种场", "畜牧场"], ["白牙市镇", "大庙口镇", "紫溪市镇", "横塘镇", "石期市镇", "井头圩镇", "端桥铺镇", "鹿马桥镇", "芦洪市镇", "新圩江镇", "花桥镇", "大盛镇", "南桥镇", "川岩乡", "水岭乡", "大庙口林场", "黄泥洞林场"], ["泷泊镇", "江村镇", "五里牌镇", "茶林镇", "何家洞镇", "麻江镇", "塘底乡", "上梧江瑶族乡", "理家坪乡", "五星岭乡", "打鼓坪乡", "双牌打鼓坪林场", "双牌五星岭林场", "阳明山国家森林公园管理局"], ["濂溪街道", "西洲街道", "上关街道", "营江街道", "东门街道", "富塘街道", "万家庄街道", "梅花镇", "寿雁镇", "仙子脚镇", "清塘镇", "祥霖铺镇", "蚣坝镇", "四马桥镇", "白马渡镇", "柑子园镇", "白芒铺镇", "桥头镇", "乐福堂乡", "审章塘瑶族乡", "横岭瑶族乡", "洪塘营瑶族乡", "道县大坪铺农场"], ["潇浦镇", "上江圩镇", "夏层铺镇", "桃川镇", "粗石江镇", "松柏瑶族乡", "千家峒瑶族乡", "兰溪瑶族乡", "源口瑶族乡"], ["文庙街道", "舜陵街道", "桐山街道", "东溪街道", "天堂镇", "水市镇", "湾井镇", "冷水镇", "太平镇", "禾亭镇", "仁和镇", "中和镇", "柏家坪镇", "清水桥镇", "鲤溪镇", "保安镇", "九疑山瑶族乡", "五龙山瑶族乡", "棉花坪瑶族乡", "桐木漯瑶族乡"], ["塔峰镇", "毛俊镇", "楠市镇", "所城镇", "新圩镇", "祠堂圩镇", "土市镇", "太平圩镇", "汇源瑶族乡", "犁头瑶族乡", "浆洞瑶族乡", "湘江源瑶族乡", "大桥瑶族乡", "荆竹瑶族乡", "蓝山荆竹林场", "蓝山浆洞林场", "蓝山南岭林场", "蓝山原种场", "蓝山黄毛岭茶场"], ["龙泉镇", "金陵镇", "骥村镇", "枧头镇", "新圩镇", "石羊镇", "新隆镇", "三井镇", "大坪塘镇", "陶岭镇", "金盆镇", "门楼下瑶族乡"], ["沱江镇", "大路铺镇", "白芒营镇", "涛圩镇", "河路口镇", "大圩镇", "水口镇", "码市镇", "涔天河镇", "界牌乡", "桥市乡", "大石桥乡", "湘江乡", "蔚竹口乡", "大锡乡", "小圩壮族乡"]], [["城中街道", "城北街道", "红星街道", "迎丰街道", "坨院街道", "河西街道", "城南街道", "黄金坳镇", "盈口乡", "凉亭坳乡", "黄岩旅游度假区"], ["中方镇", "泸阳镇", "花桥镇", "铜湾镇", "桐木镇", "铁坡镇", "新建镇", "接龙镇", "铜鼎镇", "新路河镇", "袁家镇", "蒿吉坪瑶族乡"], ["麻溪铺镇", "五强溪镇", "明溪口镇", "凉水井镇", "七甲坪镇", "筲箕湾镇", "官庄镇", "沅陵镇", "杜家坪乡", "楠木铺乡", "肖家桥乡", "火场土家族乡", "陈家滩乡", "清浪乡", "借母溪乡", "荔溪乡", "大合坪乡", "马底驿乡", "北溶乡", "二酉乡", "盘古乡"], ["辰阳镇", "孝坪镇", "田湾镇", "火马冲镇", "黄溪口镇", "潭湾镇", "安坪镇", "锦滨镇", "修溪镇", "船溪乡", "长田湾乡", "小龙门乡", "后塘瑶族乡", "苏木溪瑶族乡", "罗子山瑶族乡", "上蒲溪瑶族乡", "仙人湾瑶族乡", "龙头庵乡", "大水田乡", "桥头溪乡", "龙泉岩乡", "柿溪乡", "谭家场乡"], ["卢峰镇", "大江口镇", "低庄镇", "桥江镇", "龙潭镇", "均坪镇", "观音阁镇", "双井镇", "水东镇", "两丫坪镇", "黄茅园镇", "祖市殿镇", "葛竹坪镇", "深子湖镇", "思蒙镇", "三江镇", "统溪河镇", "北斗溪镇", "舒溶溪乡", "油洋乡", "小横垅乡", "淘金坪乡", "中都乡", "沿溪乡", "龙庄湾乡"], ["林城镇", "坪村镇", "堡子镇", "团河镇", "若水镇", "广坪镇", "马鞍镇", "金竹镇", "沙溪乡", "金子岩侗族苗族乡", "高椅乡", "宝田侗族苗族乡", "漠滨侗族苗族乡", "蒲稳侗族苗族乡", "青朗侗族苗族乡", "炮团侗族苗族乡", "地灵乡", "连山乡"], ["锦和镇", "江口墟镇", "岩门镇", "兰里镇", "吕家坪镇", "高村镇", "尧市镇", "郭公坪镇", "文昌阁乡", "大桥江乡", "舒家村乡", "隆家堡乡", "谭家寨乡", "石羊哨乡", "板栗树乡", "兰村乡", "和平溪乡", "黄桑乡"], ["波洲镇", "鱼市镇", "凉伞镇", "扶罗镇", "中寨镇", "晃洲镇", "林冲镇", "贡溪镇", "禾滩镇", "步头降苗族乡", "米贝苗族乡"], ["芷江镇", "罗旧镇", "新店坪镇", "碧涌镇", "公坪镇", "岩桥镇", "三道坑镇", "土桥镇", "楠木坪镇", "牛牯坪乡", "水宽乡", "大树坳乡", "梨溪口乡", "洞下场乡", "禾梨坳乡", "冷水溪乡", "晓坪乡", "罗卜田乡"], ["渠阳镇", "甘棠镇", "大堡子镇", "坳上镇", "新厂镇", "平茶镇", "太阳坪乡", "三锹乡", "文溪乡", "寨牙乡", "藕团乡"], ["双江镇", "县溪镇", "播阳镇", "牙屯堡镇", "菁芜洲镇", "溪口镇", "陇城镇", "万佛山镇", "独坡镇", "大高坪苗族乡", "坪坦乡", "通道县地连林场", "通道县播阳农场"], ["黔城镇", "安江镇", "托口镇", "雪峰镇", "江市镇", "沅河镇", "塘湾镇", "岔头乡", "茅渡乡", "大崇乡", "熟坪乡", "铁山乡", "群峰乡", "湾溪乡", "洗马乡", "沙湾乡", "深渡苗族乡", "龙船塘瑶族乡", "太平乡", "岩垅乡"]], [["乐坪街道", "花山街道", "黄泥塘街道", "长青街道", "大科街道", "涟滨街道", "大埠桥街道", "杉山镇", "万宝镇", "石井镇", "双江乡"], ["永丰镇", "荷叶镇", "井字镇", "梓门桥镇", "杏子铺镇", "走马街镇", "蛇形山镇", "洪山殿镇", "甘棠镇", "三塘铺镇", "青树坪镇", "花门镇", "锁石镇", "石牛乡", "沙塘乡", "印塘乡", "经济开发区"], ["上梅镇", "石冲口镇", "洋溪镇", "槎溪镇", "水车镇", "文田镇", "奉家镇", "炉观镇", "游家镇", "西河镇", "孟公镇", "琅塘镇", "白溪镇", "圳上镇", "吉庆镇", "温塘镇", "田坪镇", "桑梓镇", "曹家镇", "科头乡", "维山乡", "天门乡", "荣华乡", "金凤乡", "油溪乡", "坐石乡", "上渡", "大熊山国有林场", "古台山国有林场"], ["冷水江街道", "锡矿山街道", "沙塘湾街道", "布溪街道", "禾青镇", "渣渡镇", "铎山镇", "三尖镇", "金竹山镇", "中连乡"], ["蓝田街道", "六亩塘镇", "石马山镇", "安平镇", "湄江镇", "伏口镇", "桥头河镇", "七星街镇", "杨市镇", "枫坪镇", "斗笠山镇", "水洞底镇", "白马镇", "茅塘镇", "荷塘镇", "金石镇", "龙塘镇", "渡头塘镇", "三甲乡", "古塘乡"]], [["峒河街道", "乾州街道", "镇溪街道", "石家冲街道", "双塘街道", "矮寨镇", "马颈坳镇", "河溪镇", "丹青镇", "太平镇", "已略乡"], ["达岚镇", "兴隆场镇", "潭溪镇", "洗溪镇", "武溪镇", "浦市镇", "合水镇", "石榴坪乡", "解放岩乡", "小章乡", "白羊溪乡", "军亭界林场"], ["廖家桥镇", "茶田镇", "吉信镇", "腊尔山镇", "禾库镇", "沱江镇", "阿拉营镇", "木江坪镇", "山江镇", "落潮井镇", "新场镇", "筸子坪镇", "千工坪镇", "水打田乡", "林峰乡", "麻冲乡", "两林乡"], ["龙潭镇", "民乐镇", "吉卫镇", "麻栗场镇", "雅酉镇", "边城镇", "花垣镇", "双龙镇", "石栏镇", "长乐乡", "猫儿乡", "补抽乡"], ["普戎镇", "复兴镇", "迁陵镇", "清水坪镇", "比耳镇", "毛沟镇", "水田河镇", "葫芦镇", "碗米坡镇", "吕洞山镇", "阳朝乡", "长潭河乡", "扁朝牧场", "白云山农垦场", "钟灵山工业园", "麻风村"], ["古阳镇", "岩头寨镇", "默戎镇", "红石林镇", "断龙山镇", "高峰镇", "坪坝镇"], ["首车镇", "芙蓉镇", "永茂镇", "小溪镇", "青坪镇", "石堤镇", "万坪镇", "塔卧镇", "砂坝镇", "灵溪镇", "松柏镇", "泽家镇", "两岔乡", "西歧乡", "对山乡", "高坪乡", "朗溪乡", "润雅乡", "车坪乡", "毛坝乡", "万民乡", "盐井乡", "颗砂乡"], ["民安街道", "华塘街道", "兴隆街道", "石羔街道", "洗车河镇", "石牌镇", "茨岩塘镇", "红岩溪镇", "靛房镇", "苗儿滩镇", "里耶镇", "桂塘镇", "召市镇", "洗洛镇", "水田坝镇", "农车镇", "洛塔乡", "大安乡", "内溪乡", "咱果乡", "茅坪乡"]]], [[["沙面街道", "岭南街道", "华林街道", "多宝街道", "昌华街道", "逢源街道", "龙津街道", "金花街道", "彩虹街道", "南源街道", "西村街道", "站前街道", "桥中街道", "白鹤洞街道", "冲口街道", "花地街道", "石围塘街道", "茶滘街道", "东漖街道", "海龙街道", "东沙街道", "中南街道"], ["洪桥街道", "北京街道", "六榕街道", "流花街道", "光塔街道", "人民街道", "东山街道", "农林街道", "梅花村街道", "黄花岗街道", "华乐街道", "建设街道", "大塘街道", "珠光街道", "大东街道", "白云街道", "登峰街道", "矿泉街道"], ["赤岗街道", "新港街道", "昌岗街道", "江南中街道", "滨江街道", "素社街道", "海幢街道", "南华西街道", "龙凤街道", "沙园街道", "南石头街道", "凤阳街道", "瑞宝街道", "江海街道", "琶洲街道", "南洲街道", "华洲街道", "官洲街道"], ["五山街道", "员村街道", "车陂街道", "沙河街道", "石牌街道", "沙东街道", "天河南街道", "林和街道", "兴华街道", "棠下街道", "天园街道", "猎德街道", "冼村街道", "元岗街道", "黄村街道", "长兴街道", "龙洞街道", "凤凰街道", "前进街道", "珠吉街道", "新塘街道"], ["三元里街道", "松洲街道", "景泰街道", "同德街道", "黄石街道", "棠景街道", "新市街道", "同和街道", "京溪街道", "永平街道", "嘉禾街道", "均禾街道", "石井街道", "金沙街道", "云城街道", "鹤龙街道", "白云湖街道", "石门街道", "人和镇", "太和镇", "钟落潭镇", "江高镇"], ["黄埔街道", "红山街道", "鱼珠街道", "大沙街道", "文冲街道", "穗东街道", "南岗街道", "荔联街道", "长洲街道", "夏港街道", "萝岗街道", "东区街道", "联和街道", "永和街道", "九龙镇"], ["市桥街道", "沙头街道", "东环街道", "桥南街道", "小谷围街道", "大石街道", "洛浦街道", "石壁街道", "钟村街道", "大龙街道", "南村镇", "新造镇", "化龙镇", "石楼镇", "沙湾镇", "石基镇"], ["新华街道", "花城街道", "秀全街道", "新雅街道", "梯面镇", "花山镇", "花东镇", "炭步镇", "赤坭镇", "狮岭镇"], ["南沙街道", "珠江街道", "龙穴街道", "万顷沙镇", "横沥镇", "黄阁镇", "东涌镇", "大岗镇", "榄核镇"], ["街口街道", "江埔街道", "城郊街道", "温泉镇", "良口镇", "吕田镇", "太平镇", "鳌头镇", "流溪河林场", "黄龙带水库管理处", "大岭山林场"], ["荔城街道", "增江街道", "朱村街道", "永宁街道", "新塘镇", "石滩镇", "中新镇", "正果镇", "派潭镇", "小楼镇", "仙村镇"]], [["新华街道", "惠民街道", "西联镇", "西河镇", "龙归镇", "江湾镇", "重阳镇"], ["东河街道", "车站街道", "风采街道", "新韶镇", "乐园镇", "十里亭镇", "犁市镇", "花坪镇", "田螺冲", "曲仁"], ["松山街道", "马坝镇", "大塘镇", "枫湾镇", "小坑镇", "沙溪镇", "乌石镇", "樟市镇", "白土镇", "罗坑镇", "韶关发电厂", "曲江区大宝山矿", "韶关十六冶金建设公司"], ["太平镇", "马市镇", "澄江镇", "顿岗镇", "罗坝镇", "司前镇", "隘子镇", "城南镇", "沈所镇", "深渡水乡"], ["丹霞街道", "闻韶镇", "扶溪镇", "长江镇", "城口镇", "红山镇", "石塘镇", "董塘镇", "大桥镇", "周田镇", "黄坑镇"], ["龙仙镇", "坝仔镇", "江尾镇", "官渡镇", "周陂镇", "翁城镇", "新江镇", "铁龙林场"], ["乳城镇", "一六镇", "桂头镇", "洛阳镇", "大布镇", "大桥镇", "东坪镇", "游溪镇", "必背镇", "天井山林场", "乳阳林业局"], ["丰城街道", "黄礤镇", "马头镇", "梅坑镇", "沙田镇", "遥田镇", "回龙镇"], ["乐城街道", "北乡镇", "九峰镇", "廊田镇", "长来镇", "梅花镇", "三溪镇", "坪石镇", "黄圃镇", "五山镇", "两江镇", "沙坪镇", "云岩镇", "秀水镇", "大源镇", "庆云镇", "白石镇", "坪石", "梅田"], ["雄州街道", "乌迳镇", "界址镇", "坪田镇", "黄坑镇", "邓坊镇", "油山镇", "南亩镇", "水口镇", "江头镇", "湖口镇", "珠玑镇", "主田镇", "古市镇", "全安镇", "百顺镇", "澜河镇", "帽子峰镇", "东莞大岭山（南雄）产业转移工业园"]], [["桂园街道", "黄贝街道", "东门街道", "翠竹街道", "南湖街道", "笋岗街道", "东湖街道", "莲塘街道", "东晓街道", "清水河街道"], ["南园街道", "园岭街道", "福田街道", "沙头街道", "香蜜湖街道", "梅林街道", "莲花街道", "华富街道", "福保街道", "华强北街道", "福田保税区"], ["南头街道", "南山街道", "沙河街道", "蛇口街道", "招商街道", "粤海街道", "桃源街道", "西丽街道", "前海合作区"], ["新安街道", "光明", "西乡街道", "福永街道", "沙井街道", "松岗街道", "公明", "石岩街道", "大浪", "龙华", "民治", "观湖", "福城", "观澜", "深圳市宝安国际机场"], ["平湖街道", "坪地街道", "坪山街道", "坑梓街道", "葵涌街道", "大鹏街道", "南澳街道", "南湾街道", "坂田街道", "布吉街道", "龙城街道", "龙岗街道", "横岗街道", "深圳市大工业区"], ["梅沙街道", "盐田街道", "沙头角街道", "海山街道", "市保税区（沙头角）", "市保税区（盐田港）"]], [["翠香街道办", "梅华街道办", "前山街道办", "吉大街道办", "拱北街道办", "香湾街道办", "狮山街道办", "湾仔街道办", "唐家湾镇", "南屏镇", "横琴镇", "桂山镇", "万山镇", "担杆镇", "南屏科技园", "保税区", "前山商贸物流中心", "洪湾商贸物流中心", "金鼎工业园"], ["白藤街道", "莲洲镇", "斗门镇", "乾务镇", "白蕉镇", "井岸镇"], ["三灶镇", "南水镇", "红旗镇", "平沙镇", "联港工业区", "航空产业园"]], [["金霞街道", "珠池街道", "新津街道", "鸥汀街道", "龙祥街道", "外砂镇", "新溪镇"], ["石炮台街道", "金砂街道", "金厦街道", "东方街道", "大华街道", "同益街道", "光华街道", "东墩街道", "广厦街道", "海安街道", "新福街道", "乌桥街道", "岐山街道", "永祥街道", "鮀莲街道", "鮀江街道", "月浦街道"], ["达濠街道", "马窖街道", "礐石街道", "广澳街道", "滨海街道", "河浦街道", "玉新街道"], ["文光街道", "棉北街道", "城南街道", "金浦街道", "海门镇", "河溪镇", "和平镇", "西胪镇", "关埠镇", "谷饶镇", "贵屿镇", "铜盂镇", "金灶镇"], ["峡山街道", "井都镇", "成田镇", "司马浦镇", "陈店镇", "两英镇", "仙城镇", "胪岗镇", "红场镇", "雷岭镇", "陇田镇"], ["凤翔街道", "广益街道", "澄华街道", "上华镇", "隆都镇", "莲下镇", "莲上镇", "溪南镇", "东里镇", "盐鸿镇", "莲华镇"], ["后宅镇", "云澳镇", "深澳镇"]], [["石湾镇街道", "张槎街道", "祖庙街道", "南庄镇"], ["桂城街道", "九江镇", "西樵镇", "丹灶镇", "狮山镇", "大沥镇", "里水镇"], ["伦教街道", "勒流街道", "大良街道", "容桂街道", "陈村镇", "北滘镇", "乐从镇", "龙江镇", "杏坛镇", "均安镇"], ["西南街道", "云东海街道", "大塘镇", "乐平镇", "白坭镇", "芦苞镇", "南山镇", "省三水劳教所", "省南丰劳教所", "省女子劳教所", "省第二戒毒劳教所", "广州军区三水农场"], ["荷城街道", "杨和镇", "明城镇", "更合镇", "高明监狱", "云勇林场", "对川茶场", "佛山监狱"]], [["白沙街道", "潮连街道", "环市街道", "棠下镇", "荷塘镇", "杜阮镇"], ["江南街道", "外海街道", "礼乐街道"], ["会城街道办", "大泽镇", "司前镇", "罗坑镇", "双水镇", "崖门镇", "沙堆镇", "古井镇", "三江镇", "睦洲镇", "大鳌镇", "圭峰管理委员会", "银湖湾管理委员会", "新会经济开发区管理委员会"], ["台城街道", "大江镇", "水步镇", "四九镇", "白沙镇", "三合镇", "冲蒌镇", "斗山镇", "都斛镇", "赤溪镇", "端芬镇", "广海镇", "海宴镇", "汶村镇", "深井镇", "北陡镇", "川岛镇"], ["三埠街道", "长沙街道", "沙塘镇", "苍城镇", "龙胜镇", "大沙镇", "马冈镇", "塘口镇", "赤坎镇", "百合镇", "蚬冈镇", "金鸡镇", "月山镇", "赤水镇", "水口镇", "翠山湖新区"], ["沙坪街道", "龙口镇", "雅瑶镇", "古劳镇", "桃源镇", "鹤城镇", "共和镇", "址山镇", "宅梧镇", "双合镇", "广东省江门监狱", "江门市四堡林场"], ["恩城街道", "横陂镇", "圣堂镇", "良西镇", "沙湖镇", "牛江镇", "君堂镇", "大田镇", "那吉镇", "大槐镇", "东成镇", "恩平园区管委会"]], [["中华街道", "寸金街道", "民主街道", "中山街道", "沙湾街道", "调顺街道", "南桥街道", "北桥街道"], ["解放街道", "爱国街道", "工农街道", "友谊街道", "新兴街道", "海滨街道", "建设街道", "东新街道", "新园街道", "海头街道", "泉庄街道", "乐华街道"], ["南调街道", "麻斜街道", "南三镇", "坡头镇", "乾塘镇", "龙头镇", "官渡镇", "湛江市坡头区官渡工业园"], ["麻章镇", "太平镇", "湖光镇", "东山镇", "东简镇", "民安镇", "硇洲镇", "湖光农场"], ["遂城镇", "黄略镇", "洋青镇", "界炮镇", "乐民镇", "江洪镇", "杨柑镇", "城月镇", "乌塘镇", "建新镇", "岭北镇", "北坡镇", "港门镇", "草潭镇", "河头镇", "广前公司"], ["徐城街道办", "迈陈镇", "海安镇", "曲界镇", "前山镇", "西连镇", "下桥镇", "龙塘镇", "下洋镇", "锦和镇", "和安镇", "新寮镇", "南山镇", "城北乡", "角尾乡", "南华农场", "五一农场", "华海公司", "友好农场", "红星农场"], ["罗州街道办", "城南街道办", "城北街道办", "石城镇", "新民镇", "吉水镇", "河唇镇", "石角镇", "良垌镇", "横山镇", "安铺镇", "营仔镇", "青平镇", "车板镇", "高桥镇", "石岭镇", "雅塘镇", "石颈镇", "长山镇", "塘蓬镇", "和寮镇", "九洲江开发区"], ["雷城街道办", "西湖街道办", "新城街道办", "白沙镇", "沈塘镇", "客路镇", "杨家镇", "唐家镇", "企水镇", "纪家镇", "松竹镇", "南兴镇", "雷高镇", "东里镇", "调风镇", "龙门镇", "英利镇", "北和镇", "乌石镇", "覃斗镇", "附城镇", "湛江奋勇高新技术产业开发区管理委员会", "广东省丰收糖业发展有限公司", "广东省国营火炬农场", "广东省国营幸福农场", "湛江农垦东方红农场", "湛江农垦金星农场"], ["梅录街道", "塘尾街道", "大山江街道", "博铺街道", "海滨街道", "浅水镇", "长岐镇", "覃巴镇", "王村港镇", "振文镇", "樟铺镇", "吴阳镇", "塘缀镇", "黄坡镇", "兰石镇"]], [["红旗街道办", "河西街道办", "河东街道办", "露天矿街道办", "新华街道办", "官渡街道办", "站前街道办", "金塘镇", "公馆镇", "新坡镇", "镇盛镇", "鳌头镇", "袂花镇", "高山镇", "山阁镇", "茂南开发区"], ["南海街道", "高地街道", "马踏镇", "岭门镇", "坡心镇", "七迳镇", "树仔镇", "沙院镇", "麻岗镇", "旦场镇", "羊角镇", "小良镇", "霞洞镇", "观珠镇", "沙琅镇", "黄岭镇", "望夫镇", "罗坑镇", "那霍镇", "水东镇", "博贺镇", "林头镇", "电城镇", "陈村镇", "曙光农场", "水丰农场", "新华农场", "电白盐场"], ["石仔岭街道", "山美街道", "金山街道", "潘州街道", "宝光街道", "谢鸡镇", "新垌镇", "云潭镇", "分界镇", "根子镇", "泗水镇", "镇江镇", "沙田镇", "南塘镇", "荷花镇", "石板镇", "大井镇", "潭头镇", "大坡镇", "平山镇", "深镇镇", "马贵镇", "古丁镇", "曹江镇", "荷塘镇", "石鼓镇", "东岸镇", "长坡镇", "团结农场", "胜利农场", "火星农场"], ["河西街道", "东山街道", "下郭街道", "南盛街道", "石湾街道", "长岐镇", "同庆镇", "杨梅镇", "良光镇", "笪桥镇", "丽岗镇", "新安镇", "官桥镇", "林尘镇", "合江镇", "那务镇", "播扬镇", "宝圩镇", "平定镇", "文楼镇", "江湖镇", "中垌镇", "鉴江开发区", "新时代农场", "新华农场", "和平农场", "红阳农场", "红峰农场", "建设农场", "石滩农场"], ["东镇街道办", "镇隆镇", "水口镇", "丁堡镇", "池洞镇", "贵子镇", "怀乡镇", "茶山镇", "洪冠镇", "白石镇", "大成镇", "钱排镇", "合水镇", "新宝镇", "平塘镇", "思贺镇", "金垌镇", "朱砂镇", "北界镇", "信宜市国营红旗农场"]], [["端州区城东街道", "端州区城西街道", "端州区黄岗街道", "端州区睦岗街道"], ["坑口街道", "桂城街道", "广利街道", "永安镇", "沙浦镇", "凤凰镇", "莲花镇"], ["南岸街道", "河台镇", "乐城镇", "水南镇", "禄步镇", "小湘镇", "大湾镇", "新桥镇", "白诸镇", "莲塘镇", "活道镇", "蛟塘镇", "回龙镇", "白土镇", "金渡镇", "金利镇", "蚬岗镇"], ["排沙镇", "潭布镇", "江屯镇", "螺岗镇", "北市镇", "坑口镇", "赤坑镇", "南街镇", "宾亨镇", "五和镇", "横山镇", "木格镇", "石咀镇", "古水镇", "洲仔镇"], ["怀城镇", "闸岗镇", "坳仔镇", "汶朗镇", "甘洒镇", "凤岗镇", "洽水镇", "梁村镇", "大岗镇", "岗坪镇", "冷坑镇", "马宁镇", "蓝钟镇", "永固镇", "诗洞镇", "桥头镇", "中洲镇", "连麦镇", "下帅壮族瑶族乡", "广东省第一监狱"], ["江口镇", "江川镇", "白垢镇", "大洲镇", "渔涝镇", "河儿口镇", "连都镇", "杏花镇", "罗董镇", "长岗镇", "平凤镇", "南丰镇", "大玉口镇", "都平镇", "金装镇", "长安镇"], ["德城街道", "新圩镇", "回龙镇", "官圩镇", "马圩镇", "高良镇", "莫村镇", "永丰镇", "武垄镇", "播植镇", "凤村镇", "悦城镇", "九市镇"], ["城中街道", "东城街道", "贞山街道", "龙甫镇", "地豆镇", "威整镇", "罗源镇", "迳口镇", "大沙镇", "石狗镇", "黄田镇", "江谷镇", "下茆镇", "广东省济广监狱", "肇庆高新技术产业开发区"]], [["桥东街道", "桥西街道", "江南街道", "江北街道", "龙丰街道", "河南岸街道", "惠环街道", "陈江街道", "水口街道", "小金口街道", "汝湖镇", "三栋镇", "潼湖镇", "沥林镇", "马安镇", "横沥镇", "芦洲镇", "潼侨镇", "东江高新科技产业园", "惠南高新科技产业园", "惠州市林场"], ["淡水街道", "秋长街道", "惠阳区三和街道", "大亚湾澳头", "大亚湾霞涌", "大亚湾西区", "沙田镇", "新圩镇", "镇隆镇", "永湖镇", "良井镇", "平潭镇"], ["石坝镇", "麻陂镇", "观音阁镇", "公庄镇", "杨村镇", "柏塘镇", "泰美镇", "罗阳镇", "湖镇镇", "长宁镇", "福田镇", "龙华镇", "龙溪镇", "园洲镇", "石湾镇", "杨侨镇", "横河镇", "罗浮山管委会"], ["平山街道", "大岭镇", "白花镇", "梁化镇", "稔山镇", "铁涌镇", "平海镇", "吉隆镇", "黄埠镇", "多祝镇", "安墩镇", "高潭镇", "宝口镇", "白盆珠镇", "广东省惠州市国营惠东梁化林场", "广东省惠州市国营惠东九龙峰林场", "惠东县港口海龟湾自然保护区", "莲花山白盆珠省级自然保护区", "广东惠东古田省级自然保护区", "惠东县珠三角产业转移园", "巺寮滨海旅游渡假区管理委员会"], ["龙城街道", "麻榨镇", "永汉镇", "平陵镇", "龙田镇", "龙潭镇", "地派镇", "龙华镇", "龙江镇", "蓝田瑶族乡", "龙门县密溪林场", "南昆山生态旅游区管理委员会"]], [["江南街道", "金山街道", "西郊街道", "三角镇", "长沙镇", "城北镇", "西阳镇"], ["新城", "城东镇", "石扇镇", "梅西镇", "大坪镇", "石坑镇", "水车镇", "梅南镇", "丙村镇", "白渡镇", "松源镇", "隆文镇", "桃尧镇", "畲江镇", "雁洋镇", "松口镇", "南口镇", "程江镇", "扶大镇", "梅西水库"], ["湖寮镇", "青溪镇", "三河镇", "银江镇", "洲瑞镇", "光德镇", "桃源镇", "百侯镇", "大东镇", "大麻镇", "枫朗镇", "茶阳镇", "高陂镇", "西河镇", "丰溪林场", "洲瑞林场", "大埔林场"], ["北斗镇", "汤西镇", "汤南镇", "埔寨镇", "建桥镇", "龙岗镇", "潘田镇", "黄金镇", "小胜镇", "砂田镇", "八乡山镇", "丰良镇", "潭江镇", "汤坑镇", "留隍镇", "大龙华镇", "埔寨农场"], ["转水镇", "潭下镇", "郭田镇", "双华镇", "梅林镇", "华阳镇", "华城镇", "周江镇", "水寨镇", "河东镇", "岐岭镇", "长布镇", "横陂镇", "安流镇", "棉洋镇", "龙村镇"], ["石正镇", "八尺镇", "差干镇", "河头镇", "中行镇", "上举镇", "泗水镇", "长田镇", "热柘镇", "东石镇", "仁居镇", "大柘镇"], ["三圳镇", "文福镇", "广福镇", "新铺镇", "蓝坊镇", "南礤镇", "蕉城镇", "长潭镇", "华侨农场"], ["兴田街道", "福兴街道", "宁新街道", "永和镇", "新圩镇", "罗浮镇", "罗岗镇", "黄槐镇", "龙田镇", "石马镇", "宁中镇", "径南镇", "坭陂镇", "水口镇", "黄陂镇", "合水镇", "大坪镇", "叶塘镇", "新陂镇", "刁坊镇"]], [["新港街道", "香洲街道", "凤山街道", "田墘街道", "东洲街道", "遮浪街道", "马宫街道", "红草镇", "东涌镇", "捷胜镇"], ["梅陇镇", "小漠镇", "鮜门镇", "联安镇", "陶河镇", "赤坑镇", "大湖镇", "可塘镇", "黄羌镇", "平东镇", "海城镇", "鹅埠镇", "赤石镇", "公平镇", "附城镇", "城东镇", "梅陇农场"], ["河田镇", "水唇镇", "河口镇", "新田镇", "上护镇", "螺溪镇", "东坑镇", "南万镇"], ["东海街道", "河西街道", "城东街道", "甲子镇", "碣石镇", "湖东镇", "大安镇", "博美镇", "内湖镇", "南塘镇", "陂洋镇", "八万镇", "金厢镇", "潭西镇", "甲东镇", "河东镇", "上英镇", "桥冲镇", "甲西镇", "西南镇", "华侨管理区", "铜锣湖农场", "星都经济开发试验区", "大安农场", "罗经嶂林场", "湖东林场", "东海岸林场", "红岭林场", "畜牧果林场"]], [["上城街道", "新江街道", "东埔街道", "源西街道", "高埔岗街道", "源南镇", "埔前镇"], ["紫城镇", "龙窝镇", "九和镇", "上义镇", "蓝塘镇", "凤安镇", "义容镇", "古竹镇", "临江镇", "柏埔镇", "黄塘镇", "敬梓镇", "水墩镇", "南岭镇", "苏区镇", "瓦溪镇", "好义镇", "中坝镇"], ["老隆镇", "义都镇", "佗城镇", "鹤市镇", "黄布镇", "紫市镇", "通衢镇", "登云镇", "丰稔镇", "四都镇", "铁场镇", "龙母镇", "田心镇", "黎咀镇", "黄石镇", "赤光镇", "回龙镇", "新田镇", "车田镇", "岩镇镇", "麻布岗镇", "贝岭镇", "细坳镇", "上坪镇"], ["元善镇", "上坪镇", "内莞镇", "陂头镇", "溪山镇", "隆街镇", "田源镇", "油溪镇", "忠信镇", "高莞镇", "大湖镇", "三角镇", "绣缎镇"], ["阳明镇", "大坝镇", "长塘镇", "下车镇", "上陵镇", "优胜镇", "贝墩镇", "古寨镇", "彭寨镇", "合水镇", "公白镇", "青州镇", "浰源镇", "热水镇", "东水镇", "礼士镇", "林寨镇"], ["仙塘镇", "灯塔镇", "骆湖镇", "船塘镇", "顺天镇", "上莞镇", "曾田镇", "柳城镇", "义合镇", "蓝口镇", "黄田镇", "叶潭镇", "黄村镇", "康禾镇", "锡场镇", "新港镇", "双江镇", "涧头镇", "新回龙镇", "半江镇", "漳溪乡"]], [["南恩街道", "城南街道", "城北街道", "中洲街道", "城东街道", "岗列街道", "城西街道", "白沙街道", "埠场镇", "平冈镇", "闸坡镇", "双捷镇", "阳江林场罗琴分场", "平冈农场", "红十月农场"], ["东城镇", "北惯镇", "那龙镇", "东平镇", "雅韶镇", "大沟镇", "新洲镇", "合山镇", "塘坪镇", "大八镇", "红丰镇", "阳江监狱", "红五月农场", "鸡山农场", "阳江林场宝山分场", "阳江林场田畔分场", "阳东原种场", "阳东林场", "阳江林场东岸分场"], ["织篢镇", "程村镇", "塘口镇", "上洋镇", "溪头镇", "沙扒镇", "儒洞镇", "新圩镇", "织贡农场", "阳江林场儒洞分场"], ["春城街道", "河西街道", "河朗镇", "松柏镇", "石望镇", "春湾镇", "合水镇", "陂面镇", "圭岗镇", "永宁镇", "马水镇", "岗美镇", "河口镇", "潭水镇", "三甲镇", "双窖镇", "八甲镇", "三叶农场", "石录矿区", "花滩林场", "东湖林场", "河尾山林场", "南山矿", "阳春监狱", "硫铁矿"]], [["凤城街道", "东城街道", "洲心街道", "横荷街道", "源潭镇", "龙塘镇", "石角镇", "飞来峡镇", "清远市高新技术产业开发区", "清远市国营银盏林场"], ["太和镇", "太平镇", "山塘镇", "三坑镇", "龙颈镇", "禾云镇", "浸潭镇", "石潭镇", "笔架林场"], ["石角镇", "水头镇", "汤塘镇", "龙山镇", "高岗镇", "迳头镇"], ["青莲镇", "江英镇", "杜步镇", "七拱镇", "太平镇", "杨梅镇", "大崀镇", "小江镇", "岭背镇", "黄坌镇", "黎埠镇", "阳城镇", "秤架瑶族乡"], ["永和镇", "吉田镇", "太保镇", "禾洞镇", "福堂镇", "小三江镇", "上帅镇", "连山林场", "禾洞农林场"], ["三江镇", "大麦山镇", "寨岗镇", "三排镇", "涡水镇", "大坪镇", "香坪镇"], ["英城街道", "沙口镇", "望埠镇", "横石水镇", "桥头镇", "青塘镇", "白沙镇", "大站镇", "西牛镇", "九龙镇", "含光镇", "大湾镇", "石灰铺镇", "石牯塘镇", "下太镇", "波罗镇", "横石塘镇", "大洞镇", "连江口镇", "黎溪镇", "水边镇", "英红镇", "东华镇", "黄花镇"], ["连州镇", "星子镇", "大路边镇", "龙坪镇", "西岸镇", "保安镇", "丰阳镇", "东陂镇", "九陂镇", "西江镇", "瑶安瑶族乡", "三水瑶族乡"]], null, null, [["湘桥街道", "西湖街道", "金山街道", "太平街道", "南春街道", "西新街道", "桥东街道", "城西街道", "凤新街道", "意溪镇", "磷溪镇", "铁铺镇", "官塘镇", "红山林场", "开发区"], ["古巷镇", "登塘镇", "凤塘镇", "浮洋镇", "龙湖镇", "金石镇", "沙溪镇", "彩塘镇", "东凤镇", "庵埠镇", "江东镇", "归湖镇", "文祠镇", "凤凰镇", "赤凤镇", "枫溪镇", "万峰林场", "大坑苗圃场", "东山湖农场", "庵埠经济开发试验区"], ["黄冈镇", "上饶镇", "饶洋镇", "新丰镇", "建饶镇", "三饶镇", "新塘镇", "汤溪镇", "浮滨镇", "浮山镇", "东山镇", "新圩镇", "樟溪镇", "钱东镇", "高堂镇", "联饶镇", "所城镇", "大埕镇", "柘林镇", "汫洲镇", "海山镇", "韩江林场"]], [["榕华街道", "新兴街道", "中山街道", "西马街道", "东兴街道", "榕东街道", "仙桥街道", "梅云街道", "东升街道", "东阳街道", "渔湖镇", "炮台镇", "地都镇", "登岗镇"], ["曲溪街道", "磐东街道", "云路镇", "玉窖镇", "锡场镇", "新亨镇", "玉湖镇", "埔田镇", "霖磐镇", "月城镇", "白塔镇", "龙尾镇", "桂岭镇", "东径茶场", "坪上农场", "揭阳高新技术产业开发区", "卅岭农场", "蓝城区工业园区管理处", "珠海（揭阳）产业转移工业园"], ["河婆街道", "龙潭镇", "南山镇", "五经富镇", "京溪园镇", "灰寨镇", "塔头镇", "东园镇", "凤江镇", "棉湖镇", "金和镇", "大溪镇", "钱坑镇", "坪上镇", "五云镇", "上砂镇", "良田乡", "北山农林场", "果林场", "油桐林场", "高田农场", "河輋农场", "县苗圃场"], ["惠城镇", "华湖镇", "仙庵镇", "靖海镇", "周田镇", "前詹镇", "神泉镇", "东陇镇", "岐石镇", "隆江镇", "溪西镇", "鳌江镇", "东港镇", "葵潭镇", "东埔农场", "揭阳市大南山华侨管理区", "葵潭农场", "青坑林场", "揭阳（惠来）沿海经济开发试验区", "揭阳大南海石化工业区南海街道"], ["流沙东街道", "流沙南街道", "流沙西街道", "流沙北街道", "池尾街道", "燎原街道", "大南山街道", "赤岗镇", "大坝镇", "洪阳镇", "南溪镇", "广太镇", "麒麟镇", "南径镇", "占陇镇", "军埠镇", "下架山镇", "高埔镇", "云落镇", "大坪镇", "船埔镇", "梅林镇", "里湖镇", "梅塘镇", "后溪乡", "大池农场", "马鞍山农场", "大坪农场", "普侨区", "三坑农场", "乌石农场", "科技工业园", "英歌山工业园"]], [["云城街道", "高峰街道", "河口街道", "安塘街道", "腰古镇", "思劳镇", "前锋镇", "南盛镇"], ["六都镇", "高村镇", "白石镇", "镇安镇", "富林镇", "石城镇", "都杨镇", "大云雾林场"], ["新城镇", "车岗镇", "水台镇", "稔村镇", "东成镇", "太平镇", "里洞镇", "大江镇", "天堂镇", "河头镇", "簕竹镇", "六祖镇", "广东省西江林业局良洞迳林场", "云浮市国有水台林场", "国营新兴县岩头林场"], ["都城镇", "平台镇", "桂圩镇", "通门镇", "建城镇", "宝珠镇", "大方镇", "千官镇", "大湾镇", "河口镇", "宋桂镇", "东坝镇", "连滩镇", "历洞镇", "南江口镇", "西江林场", "通门林场", "大历林场", "同乐林场"], ["罗城街道", "素龙街道", "附城街道", "双东镇街道", "罗镜镇", "太平镇", "分界镇", "罗平镇", "船步镇", "满塘镇", "苹塘镇", "金鸡镇", "围底镇", "华石镇", "林滨镇", "黎少镇", "生江镇", "连州镇", "泗纶镇", "加益镇", "龙湾镇", "罗平农场"]]], [[["民生街道", "朝阳街道", "兴东街道", "三塘镇", "五塘镇", "昆仑镇", "九曲湾农场"], ["新竹街道", "中山街道", "建政街道", "南湖街道", "津头街道", "仙葫经济开发区管理委员会", "刘圩镇", "南阳镇", "伶俐镇", "长塘镇", "青秀山管理委员会"], ["福建园街道", "江南街道", "沙井街道", "那洪街道", "金凯街道", "吴圩镇", "苏圩镇", "延安镇", "江西镇", "经济技术开发区", "明阳工业园区管委会"], ["衡阳街道", "北湖街道", "西乡塘街道", "安吉街道", "华强街道", "新阳街道", "上尧街道", "安宁街道", "石埠街道", "心圩街道", "金陵镇", "双定镇", "坛洛镇", "那龙矿务局", "金光农场", "高新技术开发区管委会"], ["大沙田街道", "玉洞街道", "良庆镇", "那马镇", "那陈镇", "大塘镇", "南晓镇", "良庆经济开发区管委会"], ["蒲庙镇", "那楼镇", "新江镇", "百济镇", "中和乡"], ["城厢镇", "太平镇", "双桥镇", "宁武镇", "锣圩镇", "仙湖镇", "府城镇", "陆斡镇", "两江镇", "罗波镇", "灵马镇", "甘圩镇", "马头镇", "百合农场", "南宁华侨投资区", "东风农场"], ["城厢镇", "南圩镇", "雁江镇", "那桐镇", "乔建镇", "丁当镇", "古潭乡", "都结乡", "布泉乡", "屏山乡", "隆安华侨管理区管理委员会"], ["白山镇", "百龙滩镇", "林圩镇", "古零镇", "金钗镇", "周鹿镇", "永州镇", "乔利乡", "加方乡", "古寨瑶族乡", "里当瑶族乡", "光明山林场"], ["大丰镇", "明亮镇", "巷贤镇", "白圩镇", "三里镇", "乔贤镇", "西燕镇", "澄泰乡", "木山乡", "塘红乡", "镇圩瑶族乡"], ["宾州镇", "黎塘镇", "甘棠镇", "思陇镇", "新桥镇", "新圩镇", "邹圩镇", "大桥镇", "武陵镇", "中华镇", "古辣镇", "露圩镇", "王灵镇", "和吉镇", "洋桥镇", "陈平镇", "廖平农场"], ["横州镇", "百合镇", "那阳镇", "南乡镇", "新福镇", "莲塘镇", "平马镇", "峦城镇", "六景镇", "石塘镇", "陶圩镇", "校椅镇", "云表镇", "马岭镇", "马山乡", "平朗乡", "镇龙乡", "良圻农场"]], [["城中街道", "公园街道", "中南街道", "水上街道", "潭中街道", "河东街道", "静兰街道"], ["天马街道", "驾鹤街道", "箭盘山街道", "五里亭街道", "荣军街道", "白莲街道", "麒麟街道", "阳和街道", "雒容镇", "洛埠镇"], ["河西街道", "南站街道", "鹅山街道", "柳南街道", "柳石街道", "银山街道", "潭西街道", "南环街道", "太阳村镇"], ["解放街道", "雅儒街道", "胜利街道", "雀儿山街道", "钢城街道", "锦绣街道", "白露街道", "石碑坪镇", "沙塘镇", "长塘镇"], ["拉堡镇", "里雍镇", "百朋镇", "成团镇", "洛满镇", "流山镇", "三都镇", "里高镇", "进德镇", "穿山镇", "土博镇", "白沙镇", "新兴工业园", "新兴农场"], ["大埔镇", "龙头镇", "太平镇", "沙埔镇", "东泉镇", "凤山镇", "六塘镇", "冲脉镇", "寨隆镇", "古砦仫佬族乡", "马山乡", "社冲乡"], ["鹿寨镇", "中渡镇", "寨沙镇", "平山镇", "黄冕镇", "四排镇", "江口乡", "导江乡", "拉沟乡"], ["长安镇", "浮石镇", "泗顶镇", "板榄镇", "大将镇", "大良镇", "雅瑶乡", "大坡乡", "东起乡", "沙子乡", "桥板乡", "潭头乡"], ["融水镇", "和睦镇", "三防镇", "怀宝镇", "洞头镇", "大浪镇", "永乐镇", "四荣乡", "香粉乡", "安太乡", "汪洞乡", "同练瑶族乡", "滚贝侗族乡", "杆洞乡", "安陲乡", "白云乡", "红水乡", "拱洞乡", "良寨乡", "大年乡"], ["古宜镇", "斗江镇", "丹洲镇", "八江镇", "林溪镇", "独峒镇", "同乐苗族乡", "梅林乡", "富禄苗族乡", "洋溪乡", "良口乡", "老堡乡", "高基瑶族乡", "和平乡", "程村乡"]], [["秀峰街道", "丽君街道", "甲山街道"], ["叠彩街道", "北门街道", "大河乡"], ["南门街道", "象山街道", "平山街道", "二塘乡"], ["七星区街道", "东江街道", "穿山街道", "漓东街道", "朝阳乡", "桂林华侨旅游经济区管理委员会"], ["良丰街道", "雁山镇", "柘木镇", "大埠乡", "草坪回族乡"], ["临桂镇", "六塘镇", "会仙镇", "两江镇", "五通镇", "四塘镇", "南边山镇", "中庸镇", "茶洞乡", "宛田瑶族乡", "黄沙瑶族乡"], ["阳朔镇", "白沙镇", "福利镇", "兴坪镇", "葡萄镇", "高田镇", "金宝乡", "普益乡", "杨堤乡"], ["灵川镇", "大圩镇", "定江镇", "三街镇", "潭下镇", "九屋镇", "灵田镇", "潮田乡", "大境瑶族乡", "海洋乡", "兰田瑶族乡", "公平乡"], ["全州镇", "黄沙河镇", "庙头镇", "文桥镇", "大西江镇", "龙水镇", "才湾镇", "绍水镇", "石塘镇", "咸水镇", "凤凰镇", "安和镇", "两河镇", "枧塘镇", "永岁乡", "蕉江瑶族乡", "白宝乡", "东山瑶族乡"], ["兴安镇", "湘漓镇", "界首镇", "高尚镇", "严关镇", "溶江镇", "漠川乡", "白石乡", "崔家乡", "华江瑶族乡"], ["永福镇", "罗锦镇", "百寿镇", "苏桥镇", "三皇镇", "堡里镇", "广福乡", "永安乡", "龙江乡"], ["灌阳镇", "黄关镇", "文市镇", "新街镇", "新圩镇", "洞井瑶族乡", "观音阁乡", "西山瑶族乡", "水车乡"], ["龙胜镇", "瓢里镇", "三门镇", "龙脊镇", "平等镇", "泗水乡", "江底乡", "马堤乡", "伟江乡", "乐江乡"], ["资源镇", "中峰镇", "梅溪镇", "瓜里乡", "车田苗族乡", "两水苗族乡", "河口瑶族乡"], ["平乐镇", "二塘镇", "沙子镇", "同安镇", "张家镇", "源头镇", "阳安乡", "青龙乡", "桥亭乡", "大发瑶族乡"], ["荔城镇", "东昌镇", "新坪镇", "杜莫镇", "青山镇", "修仁镇", "大塘镇", "花箦镇", "双江镇", "马岭镇", "龙怀乡", "茶城乡", "蒲芦瑶族乡"], ["恭城镇", "栗木镇", "莲花镇", "嘉会镇", "西岭镇", "平安乡", "三江乡", "观音乡", "龙虎乡"]], [["城东街道", "城南街道", "城中办街道事处", "城北办街道事处", "角嘴街道", "东兴街道", "富民街道", "城东镇", "龙湖镇", "夏郢镇"], ["大塘街道", "兴龙街道", "长洲镇", "倒水镇"], ["龙圩镇", "大坡镇", "广平镇", "新地镇"], ["石桥镇", "沙头镇", "梨埠镇", "岭脚镇", "京南镇", "狮寨镇", "旺甫镇", "六堡镇", "木双镇"], ["藤州镇", "塘步镇", "埌南镇", "同心镇", "金鸡镇", "新庆镇", "象棋镇", "岭景镇", "天平镇", "蒙江镇", "和平镇", "太平镇", "古龙镇", "东荣镇", "大黎镇", "平福乡", "宁康乡"], ["蒙山镇", "西河镇", "新圩镇", "文圩镇", "黄村镇", "陈塘镇", "汉豪乡", "长坪瑶族乡", "夏宜瑶族乡"], ["岑城镇", "马路镇", "南渡镇", "水汶镇", "大隆镇", "梨木镇", "大业镇", "筋竹镇", "诚谏镇", "归义镇", "糯垌镇", "安平镇", "三堡镇", "波塘镇"]], [["中街街道", "东街街道", "西街街道", "海角街道", "地角街道", "高德街道", "驿马街道", "涠洲镇"], ["福成镇", "银滩镇", "平阳镇", "侨港镇"], ["南康镇", "营盘镇", "兴港镇"], ["廉州镇", "党江镇", "西场镇", "沙岗镇", "乌家镇", "闸口镇", "公馆镇", "白沙镇", "山口镇", "沙田镇", "石湾镇", "石康镇", "常乐镇", "星岛湖镇", "曲樟乡"]], [["渔州坪街道", "白沙万街道", "沙潭江街道", "王府街道", "企沙镇", "光坡镇"], ["水营街道", "珠河街道", "文昌街道", "大菉镇", "华石镇", "那梭镇", "那良镇", "峒中镇", "江山镇", "茅岭镇", "扶隆镇", "防城区滩营乡", "十万山瑶族乡", "小峰经济作物场", "荣光农场", "垌美农场", "那梭农场"], ["思阳镇", "在妙镇", "华兰镇", "叫安镇", "南屏瑶族乡", "平福乡", "那琴乡", "公正乡", "国有昌菱农场"]], [["向阳街道", "水东街道", "文峰街道", "南珠街道", "尖山街道", "沙埠镇", "康熙岭镇", "黄屋屯镇", "大番坡镇", "龙门港镇", "久隆镇", "东场镇", "那丽镇", "那彭镇", "那思镇", "犀牛脚镇", "丽光华侨农场", "钦州港经济技术开发区", "三娘湾旅游管理区", "广西钦州保税港区", "中马钦州产业园区"], ["长田街道", "鸿亭街道", "子材街道", "大垌镇", "平吉镇", "青塘镇", "小董镇", "板城镇", "那蒙镇", "长滩镇", "新棠镇", "大直镇", "大寺镇", "贵台镇"], ["灵城街道", "三海街道", "新圩镇", "丰塘镇", "平山镇", "石塘镇", "佛子镇", "平南镇", "烟墩镇", "檀圩镇", "那隆镇", "三隆镇", "陆屋镇", "旧州镇", "太平镇", "沙坪镇", "武利镇", "文利镇", "伯劳镇", "国营新光农场", "国营华山农场"], ["小江街道", "江城街道", "泉水镇", "石埇镇", "安石镇", "张黄镇", "大成镇", "白石水镇", "北通镇", "三合镇", "龙门镇", "福旺镇", "寨圩镇", "乐民镇", "六硍镇", "平睦镇", "官垌镇"]], [["贵城街道", "港城镇", "大圩镇", "庆丰镇", "根竹镇", "武乐镇", "奇石乡", "中里乡"], ["江南", "桥圩镇", "木格镇", "木梓镇", "湛江镇", "东津镇", "八塘镇", "新塘镇", "瓦塘镇"], ["覃塘镇", "东龙镇", "三里镇", "黄练镇", "石卡镇", "五里镇", "樟木镇", "山北乡", "蒙公乡", "大岭乡"], ["平南镇", "平山镇", "寺面镇", "六陈镇", "大新镇", "大安镇", "武林镇", "大坡镇", "大洲镇", "镇隆镇", "上渡镇", "安怀镇", "丹竹镇", "官成镇", "思旺镇", "大鹏镇", "同和镇", "东华镇", "思界乡", "国安瑶族乡", "马练瑶族乡"], ["木乐镇", "木圭镇", "石咀镇", "油麻镇", "社坡镇", "罗秀镇", "麻垌镇", "社步镇", "下湾镇", "木根镇", "中沙镇", "大洋镇", "大湾镇", "白沙镇", "石龙镇", "蒙圩镇", "西山镇", "南木镇", "江口镇", "金田镇", "紫荆镇", "马皮乡", "寻旺乡", "罗播乡", "厚禄乡", "垌心乡"]], [["玉城街道", "南江街道", "城西街道", "城北街道", "名山街道", "大塘镇", "茂林镇", "仁东镇", "仁厚镇"], ["福绵镇", "成均镇", "樟木镇", "新桥镇", "沙田镇", "石和镇"], ["容州镇", "杨梅镇", "灵山镇", "六王镇", "黎村镇", "杨村镇", "县底镇", "自良镇", "松山镇", "罗江镇", "石头镇", "石寨镇", "十里镇", "容西镇", "浪水镇"], ["温泉镇", "米场镇", "马坡镇", "珊罗镇", "平乐镇", "沙坡镇", "大桥镇", "乌石镇", "良田镇", "清湖镇", "古城镇", "沙湖镇", "横山镇", "滩面镇"], ["博白镇", "双凤镇", "顿谷镇", "水鸣镇", "那林镇", "江宁镇", "三滩镇", "黄凌镇", "亚山镇", "旺茂镇", "东平镇", "沙河镇", "菱角镇", "新田镇", "凤山镇", "宁潭镇", "文地镇", "英桥镇", "那卜镇", "大垌镇", "沙陂镇", "双旺镇", "松旺镇", "龙潭镇", "大坝镇", "永安镇", "径口镇", "浪平镇"], ["石南镇", "大平山镇", "葵阳镇", "城隍镇", "山心镇", "沙塘镇", "蒲塘镇", "北市镇", "龙安镇", "高峰镇", "小平山镇", "卖酒镇", "洛阳镇"], ["陵城街道", "城南街道", "城北街道", "北流镇", "新荣镇", "民安镇", "山围镇", "民乐镇", "西垠镇", "新圩镇", "大里镇", "塘岸镇", "清水口镇", "隆盛镇", "大坡外镇", "六麻镇", "新丰镇", "沙垌镇", "平政镇", "白马镇", "大伦镇", "扶新镇", "六靖镇", "石窝镇", "清湾镇"]], [["百城街道", "龙景街道", "阳圩镇", "四塘镇", "龙川镇", "永乐镇", "汪甸瑶族乡", "大楞乡", "泮水乡"], ["田州镇", "那坡镇", "坡洪镇", "那满镇", "百育镇", "玉凤镇", "头塘镇", "五村镇", "洞靖镇", "巴别乡"], ["平马镇", "祥周镇", "林逢镇", "思林镇", "印茶镇", "江城镇", "朔良镇", "义圩镇", "那拔镇", "作登瑶族乡"], ["马头镇", "新安镇", "果化镇", "太平镇", "坡造镇", "四塘镇", "旧城镇", "榜圩镇", "风梧镇", "海城乡", "黎明乡", "同老乡", "平果铝"], ["城关镇", "足荣镇", "隆桑镇", "敬德镇", "马隘镇", "东凌镇", "那甲镇", "都安乡", "荣华乡", "燕峒乡", "龙光乡", "巴头乡", "德保铝业"], ["城厢镇", "平孟镇", "坡荷乡", "龙合乡", "德隆乡", "百合乡", "百南乡", "百省乡", "百都乡"], ["泗城镇", "逻楼镇", "加尤镇", "下甲镇", "伶站瑶族乡", "朝里瑶族乡", "沙里瑶族乡", "玉洪瑶族乡"], ["同乐镇", "甘田镇", "新化镇", "花坪镇", "逻沙乡", "逻西乡", "幼平乡", "雅长乡"], ["乐里镇", "旧州镇", "定安镇", "六隆镇", "潞城瑶族乡", "利周瑶族乡", "平塘乡", "浪平乡", "八桂瑶族乡", "八渡瑶族乡", "那比乡", "高龙乡", "百乐乡", "者苗乡"], ["八达镇", "古障镇", "那劳镇", "马蚌镇", "普合苗族乡", "西平乡", "那佐苗族乡", "足别瑶族苗族乡"], ["新州镇", "桠杈镇", "天生桥镇", "平班镇", "德峨镇", "隆或镇", "沙梨乡", "者保乡", "者浪乡", "革步乡", "金钟山乡", "猪场乡", "蛇场乡", "克长乡", "岩茶乡", "介廷乡"], ["新靖镇", "化峒镇", "湖润镇", "安德镇", "龙临镇", "渠洋镇", "岳圩镇", "龙邦镇", "禄峒镇", "武平镇", "地州镇", "同德乡", "壬庄乡", "安宁乡", "南坡乡", "吞盘乡", "果乐乡", "新甲乡", "魁圩乡"]], [["八步街道", "城东街道", "江南街道", "贺街镇", "步头镇", "莲塘镇", "大宁镇", "南乡镇", "桂岭镇", "开山镇", "里松镇", "信都镇", "灵峰镇", "仁义镇", "铺门镇", "黄洞瑶族乡"], ["西湾街道", "黄田镇", "鹅塘镇", "沙田镇", "公会镇", "水口镇", "望高镇", "羊头镇", "大平瑶族乡"], ["昭平镇", "文竹镇", "黄姚镇", "富罗镇", "北陀镇", "马江镇", "五将镇", "走马镇", "樟木林镇", "仙回瑶族乡", "凤凰乡", "木格乡"], ["钟山镇", "回龙镇", "石龙镇", "凤翔镇", "珊瑚镇", "同古镇", "公安镇", "清塘镇", "燕塘镇", "红花镇", "花山瑶族乡", "两安瑶族乡"], ["富阳镇", "白沙镇", "莲山镇", "古城镇", "福利镇", "麦岭镇", "葛坡镇", "城北镇", "朝东镇", "新华乡", "石家乡", "柳家乡"]], [["金城江街道", "东江镇", "六圩镇", "六甲镇", "河池镇", "拔贡镇", "九圩镇", "五圩镇", "白土乡", "侧岭乡", "保平乡", "长老乡"], ["城关镇", "大厂镇", "车河镇", "芒场镇", "六寨镇", "月里镇", "吾隘镇", "罗富镇", "中堡苗族乡", "八圩瑶族乡", "里湖瑶族乡"], ["六排镇", "向阳镇", "岜暮乡", "八腊瑶族乡", "纳直乡", "更新乡", "下老乡", "坡结乡", "三堡乡"], ["凤城镇", "长洲镇", "三门海镇", "砦牙乡", "乔音乡", "金牙瑶族乡", "中亭乡", "平乐瑶族乡", "江洲瑶族乡"], ["东兰镇", "隘洞镇", "长乐镇", "三石镇", "武篆镇", "长江镇", "泗孟乡", "兰木乡", "巴畴乡", "金谷乡", "三弄瑶族乡", "大同乡", "花香乡", "切学乡"], ["东门镇", "龙岸镇", "黄金镇", "小长安镇", "四把镇", "天河镇", "怀群镇", "宝坛乡", "乔善乡", "纳翁乡", "兼爱乡"], ["思恩镇", "水源镇", "洛阳镇", "川山镇", "明伦镇", "东兴镇", "大才乡", "下南乡", "大安乡", "长美乡", "龙岩乡", "驯乐苗族乡"], ["巴马镇", "甲篆镇", "燕洞镇", "那社乡", "所略乡", "西山乡", "东山乡", "凤凰乡", "百林乡", "那桃乡"], ["安阳镇", "高岭镇", "地苏镇", "下坳镇", "拉烈镇", "百旺镇", "澄江镇", "大兴镇", "拉仁镇", "东庙乡", "隆福乡", "保安乡", "板岭乡", "永安乡", "三只羊乡", "龙湾乡", "菁盛乡", "加贵乡", "九渡乡"], ["大化镇", "都阳镇", "岩滩镇", "北景镇", "共和乡", "贡川乡", "百马乡", "古河乡", "古文乡", "江南乡", "羌圩乡", "乙圩乡", "板升乡", "七百弄乡", "雅龙乡", "六也乡"], ["庆远镇", "三岔镇", "洛西镇", "怀远镇", "德胜镇", "石别镇", "北山镇", "刘三姐镇", "洛东镇", "祥贝乡", "屏南乡", "福龙瑶族乡", "北牙瑶族乡", "同德乡", "安马乡", "龙头乡"]], [["城东街道", "城北街道", "河西街道", "八一街道", "来华街道", "凤凰镇", "良江镇", "小平阳镇", "迁江镇", "石陵镇", "平阳镇", "蒙村镇", "大湾镇", "桥巩镇", "寺山镇", "城厢镇", "三五镇", "五山乡", "陶邓乡", "良塘乡", "七洞乡", "石牙乡", "南泗乡", "高安乡", "正龙乡", "来华投资区"], ["城关镇", "大塘镇", "思练镇", "红渡镇", "古蓬镇", "果遂镇", "马泗乡", "欧洞乡", "安东乡", "新圩乡", "遂意乡", "北更乡"], ["象州镇", "石龙镇", "运江镇", "寺村镇", "中平镇", "罗秀镇", "大乐镇", "马坪镇", "妙皇乡", "百丈乡", "水晶乡"], ["武宣镇", "桐岭镇", "通挽镇", "东乡镇", "三里镇", "二塘镇", "黄茆镇", "禄新镇", "思灵乡", "金鸡乡", "黔江农场"], ["金秀镇", "桐木镇", "头排镇", "三角乡", "忠良乡", "罗香乡", "长垌乡", "大樟乡", "六巷乡", "三江乡"], ["岭南镇", "北泗镇", "河里镇"]], [["太平街道", "江南街道", "石景林街道", "新和镇", "濑湍镇", "江州镇", "左州镇", "那隆镇", "驮卢镇", "罗白乡", "板利乡", "新和华侨农场", "左江华侨农场"], ["新宁镇", "渠黎镇", "渠旧镇", "柳桥镇", "东门镇", "山圩镇", "中东镇", "东罗镇", "龙头乡", "岜盆乡", "昌平乡", "广西农垦国有山圩农场"], ["城中镇", "爱店镇", "明江镇", "海渊镇", "桐棉镇", "那堪镇", "亭亮镇", "寨安乡", "峙浪乡", "东安乡", "板棍乡", "北江乡", "那楠乡", "国营宁明华侨农场", "国营天西华侨农场"], ["龙州镇", "下冻镇", "水口镇", "金龙镇", "响水镇", "八角乡", "上降乡", "彬桥乡", "上龙乡", "武德乡", "逐卜乡", "上金乡"], ["桃城镇", "全茗镇", "雷平镇", "硕龙镇", "下雷镇", "五山乡", "龙门乡", "昌明乡", "福隆乡", "那岭乡", "恩城乡", "榄圩乡", "宝圩乡", "堪圩乡", "国营桃城华侨农场"], ["天等镇", "龙茗镇", "进结镇", "向都镇", "东平镇", "福新镇", "都康乡", "宁干乡", "驮堪乡", "进远乡", "上映乡", "把荷乡", "小山乡"], ["凭祥镇", "友谊镇", "上石镇", "夏石镇", "广西凭祥综合保税区"]]], [[["秀英街道", "海秀街道办", "长流镇", "西秀镇", "海秀镇", "石山镇", "永兴镇", "东山镇"], ["中山街道", "滨海街道", "金贸街道", "大同街道", "海垦街道", "金宇街道", "城西镇", "龙桥镇", "新坡镇", "遵谭镇", "龙泉镇"], ["国兴街道办", "府城街道办", "滨江街道办", "凤翔街道办", "龙塘镇", "云龙镇", "红旗镇", "三门坡镇", "大坡镇", "甲子镇", "旧州镇", "国营红明农场", "省岭脚热带作物场", "省长昌煤矿"], ["海府街道", "蓝天街道", "博爱街道", "海甸街道", "人民路街道", "白龙街道", "和平南街道", "白沙街道", "新埠街道", "灵山镇", "演丰镇", "三江镇", "大致坡镇", "国营桂林洋农场", "国营三江农场", "罗牛山农场"]], [["海棠湾镇"], ["吉阳镇"], ["天涯镇"], ["崖城镇"]]], [[["高笋塘街道", "太白街道", "牌楼街道", "双河口街道", "龙都街道", "周家坝街道", "沙河街道", "钟鼓楼街道", "百安坝街道", "五桥街道", "陈家坝街道", "小周镇", "大周镇", "新乡镇", "孙家镇", "高峰镇", "龙沙镇", "响水镇", "武陵镇", "瀼渡镇", "甘宁镇", "天城镇", "熊家镇", "高梁镇", "李河镇", "分水镇", "余家镇", "后山镇", "弹子镇", "长岭镇", "新田镇", "白羊镇", "龙驹镇", "走马镇", "罗田镇", "太龙镇", "长滩镇", "太安镇", "白土镇", "郭村镇", "柱山乡", "铁峰乡", "溪口乡", "长坪乡", "燕山乡", "梨树乡", "普子乡", "地宝土家族乡", "恒合土家族乡", "黄柏乡", "九池乡", "茨竹乡"], ["敦仁街道", "崇义街道", "荔枝街道", "江北街道", "江东街道", "李渡街道", "龙桥街道", "白涛街道", "马鞍街道", "南沱镇", "青羊镇", "百胜镇", "珍溪镇", "清溪镇", "焦石镇", "马武镇", "龙潭镇", "蔺市镇", "新妙镇", "石沱镇", "义和镇", "罗云乡", "大木乡", "武陵山乡", "大顺乡", "增福乡", "同乐乡"], ["七星岗街道", "解放碑街道", "两路口街道", "上清寺街道", "菜园坝街道", "南纪门街道", "朝天门街道", "大溪沟街道", "大坪街道", "化龙桥街道", "石油路街道"], ["新山村街道", "跃进村街道", "九宫庙街道", "茄子溪街道", "春晖路街道", "八桥镇", "建胜镇", "跳磴镇"], ["华新街街道", "江北城街道", "石马河街道", "大石坝街道", "寸滩街道", "观音桥街道", "五里店街道", "郭家沱街道", "铁山坪街道", "鱼嘴镇人民政府", "复盛镇人民政府", "五宝镇人民政府"], ["小龙坎街道", "沙坪坝街道", "渝碚路街道", "磁器口街道", "童家桥街道", "石井坡街道", "双碑街道", "井口街道", "歌乐山街道", "山洞街道", "新桥街道", "天星桥街道", "土湾街道", "覃家岗街道", "陈家桥街道", "虎溪街道", "西永街道", "联芳街道", "井口镇", "歌乐山镇", "青木关镇", "凤凰镇", "回龙坝镇", "曾家镇", "土主镇", "中梁镇"], ["杨家坪街道", "黄桷坪街道", "谢家湾街道", "石坪桥街道", "石桥铺街道", "中梁山街道", "渝州路街道", "二郎街道", "九龙镇", "华岩镇", "含谷镇", "金凤镇", "白市驿镇", "走马镇", "石板镇", "巴福镇", "陶家镇", "西彭镇", "铜罐驿镇"], ["铜元局街道", "花园路街道", "南坪街道", "海棠溪街道", "龙门浩街道", "弹子石街道", "南山街道", "天文街道", "南坪镇", "涂山镇", "鸡冠石镇", "峡口镇", "长生桥镇", "迎龙镇", "广阳镇"], ["天生街道", "朝阳街道", "北温泉街道", "东阳街道", "龙凤桥街道", "歇马镇", "澄江镇", "蔡家岗镇", "童家溪镇", "天府镇", "施家梁镇", "水土镇", "静观镇", "柳荫镇", "复兴镇", "三圣镇", "金刀峡镇"], ["古南街道", "文龙街道", "三江街道", "万盛街道", "东林街道", "万东镇", "南桐镇", "青年镇", "关坝镇", "丛林镇", "石林镇", "金桥镇", "黑山镇", "石角镇", "东溪镇", "赶水镇", "打通镇", "石壕镇", "永新镇", "三角镇", "隆盛镇", "郭扶镇", "篆塘镇", "丁山镇", "安稳镇", "扶欢镇", "永城镇", "新盛镇", "中峰镇", "横山镇"], ["龙岗街道", "棠香街道", "龙滩子街道", "双路街道", "通桥街道", "智凤街道", "龙水镇", "宝顶镇", "中敖镇", "三驱镇", "宝兴镇", "玉龙镇", "石马镇", "拾万镇", "回龙镇", "金山镇", "万古镇", "国梁镇", "雍溪镇", "珠溪镇", "龙石镇", "邮亭镇", "铁山镇", "高升镇", "季家镇", "古龙镇", "高坪镇"], ["双龙湖街道", "回兴街道", "鸳鸯街道", "翠云街道", "人和街道", "天宫殿街道", "龙溪街道", "龙山街道", "龙塔街道", "大竹林街道", "悦来街道", "两路街道", "双凤桥街道", "王家街道", "礼嘉街道", "宝圣湖街道", "金山街道", "康美街道", "仙桃街道", "玉峰山镇", "龙兴镇", "统景镇", "大湾镇", "兴隆镇", "木耳镇", "茨竹镇", "古路镇", "石船镇", "大盛镇", "洛碛镇"], ["龙洲湾街道", "鱼洞街道", "花溪街道", "李家沱街道", "南泉街道", "一品街道", "南彭街道", "惠民街道", "界石镇", "安澜镇", "跳石镇", "木洞镇", "双河口镇", "麻柳嘴镇", "丰盛镇", "二圣镇", "东泉镇", "姜家镇", "天星寺镇", "接龙镇", "石滩镇", "石龙镇"], ["城东街道", "城南街道", "城西街道", "正阳街道", "舟白街道", "冯家街道", "阿蓬江镇", "石会镇", "黑溪镇", "黄溪镇", "黎水镇", "金溪镇", "马喇镇", "濯水镇", "石家镇", "鹅池镇", "小南海镇", "邻鄂镇", "中塘乡", "蓬东乡", "沙坝乡", "白石乡", "杉岭乡", "太极乡", "水田乡", "白土乡", "金洞乡", "五里乡", "水市乡", "新华乡"], ["凤城街道", "晏家街道", "江南街道", "渡舟街道", "新市街道", "八颗街道", "菩提街道", "邻封镇", "但渡镇", "云集镇", "长寿湖镇", "双龙镇", "龙河镇", "石堰镇", "云台镇", "海棠镇", "葛兰镇", "洪湖镇", "万顺镇"], ["几江街道", "德感街道", "双福街道", "鼎山街道", "油溪镇", "吴滩镇", "石门镇", "朱杨镇", "石蟆镇", "永兴镇", "塘河镇", "白沙镇", "龙华镇", "李市镇", "慈云镇", "蔡家镇", "中山镇", "嘉平镇", "柏林镇", "先锋镇", "珞璜镇", "贾嗣镇", "夏坝镇", "西湖镇", "杜市镇", "广兴镇", "四面山镇", "支坪镇", "四屏镇"], ["合阳城街道", "钓鱼城街道", "南津街街道", "盐井街道", "草街街道", "云门街道", "大石街道", "沙鱼镇", "官渡镇", "涞滩镇", "肖家镇", "古楼镇", "三庙镇", "二郎镇", "龙凤镇", "隆兴镇", "铜溪镇", "双凤镇", "狮滩镇", "清平镇", "土场镇", "小沔镇", "三汇镇", "香龙镇", "钱塘镇", "龙市镇", "燕窝镇", "太和镇", "渭沱镇", "双槐镇"], ["中山路街道", "胜利路街道", "南大街街道", "茶山竹海街道", "大安街道", "陈食街道", "卫星湖街道", "青峰镇", "金龙镇", "临江镇", "何埂镇", "松溉镇", "仙龙镇", "吉安镇", "五间镇", "来苏镇", "宝峰镇", "双石镇", "红炉镇", "永荣镇", "三教镇", "板桥镇", "朱沱镇"], ["东城街道", "南城街道", "西城街道", "三泉镇", "南平镇", "神童镇", "鸣玉镇", "大观镇", "兴隆镇", "太平场镇", "白沙镇", "水江镇", "石墙镇", "金山镇", "头渡镇", "大有镇", "合溪镇", "黎香湖镇", "山王坪镇", "木凉镇", "楠竹山镇", "石溪镇", "德隆镇", "民主镇", "福寿镇", "河图镇", "庆元镇", "古花镇", "石莲乡", "乾丰乡", "骑龙乡", "中桥乡", "峰岩乡", "冷水关乡"], ["璧城街道", "璧泉街道", "青杠街道", "来凤街道", "丁家街道", "大路街道", "八塘镇", "七塘镇", "河边镇", "福禄镇", "大兴镇", "正兴镇", "广普镇", "三合镇", "健龙镇"], ["巴川街道", "东城街道", "南城街道", "蒲吕街道", "旧县街道", "土桥镇", "二坪镇", "水口镇", "安居镇", "白羊镇", "平滩镇", "小林镇", "双山镇", "虎峰镇", "石鱼镇", "福果镇", "庆隆镇", "少云镇", "维新镇", "高楼镇", "大庙镇", "围龙镇", "华兴镇", "永嘉镇", "安溪镇", "西河镇", "侣俸镇", "太平镇"], ["桂林街道", "梓潼街道", "上和镇", "龙形镇", "古溪镇", "宝龙镇", "玉溪镇", "米心镇", "群力镇", "双江镇", "花岩镇", "柏梓镇", "崇龛镇", "塘坝镇", "新胜镇", "太安镇", "小渡镇", "卧佛镇", "五桂镇", "田家镇", "别口镇", "寿桥镇"], ["昌元街道", "昌州街道", "广顺街道", "双河街道", "安富街道", "峰高街道", "荣隆镇", "仁义镇", "盘龙镇", "吴家镇", "直升镇", "万灵镇", "清升镇", "清江镇", "古昌镇", "河包镇", "观胜镇", "铜鼓镇", "清流镇", "远觉镇", "龙集镇"], ["汉丰街道", "文峰街道", "云枫街道", "镇东街道", "丰乐街道", "白鹤街道", "赵家街道", "大德镇", "镇安镇", "厚坝镇", "金峰镇", "温泉镇", "郭家镇", "白桥镇", "和谦镇", "河堰镇", "大进镇", "谭家镇", "敦好镇", "高桥镇", "九龙山镇", "天和镇", "中和镇", "义和镇", "临江镇", "竹溪镇", "铁桥镇", "南雅镇", "巫山镇", "岳溪镇", "长沙镇", "南门镇", "渠口镇", "满月乡", "关面乡", "白泉乡", "麻柳乡", "紫水乡", "三汇口乡", "五通乡"]], [["梁平县梁山街道", "梁平县双桂街道", "仁贤镇", "礼让镇", "云龙镇", "屏锦镇", "袁驿镇", "新盛镇", "福禄镇", "金带镇", "聚奎镇", "明达镇", "荫平镇", "和林镇", "回龙镇", "碧山镇", "虎城镇", "七星镇", "龙门镇", "文化镇", "合兴镇", "石安镇", "柏家镇", "大观镇", "竹山镇", "蟠龙镇", "星桥镇", "曲水镇", "安胜乡", "铁门乡", "龙胜乡", "复平乡", "紫照乡", "梁平县农场", "梁平县双桂工业园区"], ["葛城街道", "复兴街道", "巴山镇", "坪坝镇", "庙坝镇", "明通镇", "修齐镇", "高观镇", "高燕镇", "东安镇", "咸宜镇", "高楠镇", "龙田乡", "北屏乡", "左岚乡", "沿河乡", "双河乡", "蓼子乡", "鸡鸣乡", "周溪乡", "明中乡", "治平乡", "岚天乡", "厚坪乡", "河鱼乡"], ["三合街道", "名山街道", "虎威镇", "社坛镇", "三元镇", "许明寺镇", "董家镇", "树人镇", "十直镇", "高家镇", "兴义镇", "双路镇", "江池镇", "龙河镇", "武平镇", "包鸾镇", "湛普镇", "南天湖镇", "保合镇", "兴龙镇", "仁沙镇", "龙孔镇", "暨龙镇", "双龙镇", "仙女湖镇", "青龙乡", "太平坝乡", "都督乡", "栗子乡", "三建乡"], ["桂溪街道", "桂阳街道", "新民镇", "沙坪镇", "周嘉镇", "普顺镇", "永安镇", "高安镇", "高峰镇", "五洞镇", "澄溪镇", "太平镇", "鹤游镇", "坪山镇", "砚台镇", "曹回镇", "杠家镇", "包家镇", "白家镇", "永平镇", "三溪镇", "裴兴镇", "黄沙镇", "长龙镇", "沙河乡", "大石乡"], ["忠州街道", "白公街道", "新生镇", "任家镇", "乌杨镇", "洋渡镇", "东溪镇", "复兴镇", "石宝镇", "汝溪镇", "野鹤镇", "官坝镇", "石黄镇", "马灌镇", "金鸡镇", "新立镇", "双桂镇", "拔山镇", "花桥镇", "永丰镇", "三汇镇", "白石镇", "黄金镇", "善广乡", "石子乡", "磨子土家族乡", "涂井乡", "金声乡", "兴峰乡"], ["双江街道", "青龙街道", "人和街道", "盘龙街道", "龙角镇", "故陵镇", "红狮镇", "路阳镇", "农坝镇", "渠马镇", "黄石镇", "巴阳镇", "沙市镇", "鱼泉镇", "凤鸣镇", "宝坪镇", "南溪镇", "双土镇", "桑坪镇", "江口镇", "高阳镇", "平安镇", "云阳镇", "云安镇", "栖霞镇", "双龙镇", "泥溪镇", "蔈草镇", "养鹿镇", "水口镇", "堰坪镇", "龙洞镇", "后叶镇", "耀灵镇", "大阳镇", "外郎乡", "新津乡", "普安乡", "洞鹿乡", "石门乡", "上坝乡", "清水土家族自治乡"], ["永安街道", "鱼复街道", "夔门街道", "白帝镇", "草堂镇", "汾河镇", "康乐镇", "大树镇", "竹园镇", "公平镇", "朱衣镇", "甲高镇", "羊市镇", "吐祥镇", "兴隆镇", "青龙镇", "新民镇", "永乐镇", "安坪镇", "五马镇", "青莲镇", "岩湾乡", "平安乡", "红土乡", "石岗乡", "康坪乡", "太和土家族乡", "鹤峰乡", "冯坪乡", "长安土家族乡", "龙桥土家族乡", "云雾土家族乡"], ["高唐街道", "龙门街道", "庙宇镇", "大昌镇", "福田镇", "龙溪镇", "双龙镇", "官阳镇", "骡坪镇", "抱龙镇", "官渡镇", "铜鼓镇", "巫峡镇", "红椿乡", "两坪乡", "曲尺乡", "建坪乡", "大溪乡", "金坪乡", "平河乡", "当阳乡", "竹贤乡", "三溪乡", "培石乡", "笃坪乡", "邓家乡"], ["宁河街道", "柏杨街道", "城厢镇", "凤凰镇", "宁厂镇", "上磺镇", "古路镇", "文峰镇", "徐家镇", "白鹿镇", "尖山镇", "下堡镇", "峰灵镇", "塘坊镇", "朝阳镇", "田坝镇", "通城镇", "菱角镇", "蒲莲镇", "土城镇", "胜利乡", "大河乡", "天星乡", "长桂乡", "鱼鳞乡", "乌龙乡", "中岗乡", "花台乡", "兰英乡", "双阳乡", "中梁乡", "天元乡", "红池坝经济开发区"], ["南宾街道", "万安街道", "下路街道", "西沱镇", "悦崃镇", "临溪镇", "黄水镇", "马武镇", "沙子镇", "王场镇", "沿溪镇", "龙沙镇", "鱼池镇", "三河镇", "大歇镇", "桥头镇", "万朝镇", "冷水镇", "黄鹤镇", "黎场乡", "三星乡", "六塘乡", "三益乡", "王家乡", "河嘴乡", "石家乡", "枫木乡", "中益乡", "洗新乡", "龙潭乡", "新乐乡", "金铃乡", "金竹乡"], ["中和街道", "乌杨街道", "平凯街道", "清溪场镇", "隘口镇", "溶溪镇", "官庄镇", "龙池镇", "石堤镇", "峨溶镇", "洪安镇", "雅江镇", "石耶镇", "梅江镇", "兰桥镇", "膏田镇", "溪口镇", "妙泉镇", "宋农镇", "里仁镇", "钟灵镇", "孝溪乡", "海洋乡", "大溪乡", "涌洞乡", "中平乡", "岑溪乡"], ["桃花源街道", "钟多街道", "龙潭镇", "麻旺镇", "酉酬镇", "大溪镇", "兴隆镇", "黑水镇", "丁市镇", "龚滩镇", "李溪镇", "泔溪镇", "酉水河镇", "苍岭镇", "小河镇", "板溪镇", "涂市乡", "铜鼓乡", "可大乡", "偏柏乡", "五福乡", "木叶乡", "毛坝乡", "花田乡", "后坪乡", "天馆乡", "宜居乡", "万木乡", "两罾乡", "板桥乡", "官清乡", "南腰界乡", "车田乡", "腴地乡", "清泉乡", "庙溪乡", "浪坪乡", "双泉乡", "楠木乡"], ["汉葭街道", "绍庆街道", "靛水街道", "保家镇", "郁山镇", "高谷镇", "桑柘镇", "鹿角镇", "黄家镇", "普子镇", "龙射镇", "连湖镇", "万足镇", "平安镇", "长生镇", "新田镇", "鞍子镇", "太原镇", "龙溪镇", "梅子垭镇", "大同镇", "岩东乡", "鹿鸣乡", "棣棠乡", "三义乡", "联合乡", "石柳乡", "走马乡", "芦塘乡", "乔梓乡", "诸佛乡", "桐楼乡", "善感乡", "双龙乡", "石盘乡", "大垭乡", "润溪乡", "朗溪乡", "龙塘乡"]]], [[["督院街街道", "盐市口街道", "春熙路街道", "书院街街道", "合江亭街道", "水井坊街道", "牛市口街道", "龙舟路街道", "双桂路街道", "莲新街道", "沙河街道", "东光街道", "狮子山街道", "成龙路街道", "柳江街道", "三圣街道"], ["太升路街道", "草市街街道", "西御河街道", "汪家拐街道", "少城街道", "新华西路街道", "草堂街道", "府南街道", "光华街道", "东坡街道", "金沙街道", "黄田坝街道", "苏坡街道", "文家街道"], ["西安路街道", "西华街道", "人民北路街道", "荷花池街道", "驷马桥街道", "茶店子街道", "抚琴街道", "九里堤街道", "五块石街道", "黄忠街道", "营门口街道", "金泉街道", "沙河源街道", "天回镇街道", "凤凰山街道"], ["浆洗街街道", "望江路街道", "玉林街道", "跳伞塔街道", "火车南站街道", "双楠街道", "晋阳街道", "红牌楼街道", "簇桥街道", "机投桥街道", "金花桥街道", "簇锦街道", "华兴街道", "芳草街道", "肖家河街道", "石羊场街道", "桂溪街道"], ["猛追湾街道", "双桥子街道", "建设路街道", "府青路街道", "二仙桥街道", "跳蹬河街道", "双水碾街道", "万年场街道", "桃蹊路街道", "圣灯街道", "保和街道", "青龙街道", "龙潭街道", "白莲池街道"], ["龙泉街道", "大面街道", "十陵街道", "同安街道", "洛带镇", "西河镇", "洪安镇", "柏合镇", "茶店镇", "黄土镇", "山泉镇", "万兴乡"], ["红阳街道", "大弯街道", "弥牟镇", "大同镇", "城厢镇", "祥福镇", "姚渡镇", "清泉镇", "龙王镇", "福洪镇", "人和乡"], ["大丰街道", "三河街道", "新都街道", "石板滩镇", "新繁镇", "新民镇", "泰兴镇", "斑竹园镇", "清流镇", "马家镇", "龙桥镇", "木兰镇", "军屯镇"], ["柳城街道", "公平街道", "涌泉街道", "天府街道", "和盛镇", "永盛镇", "金马镇", "永宁镇", "万春镇", "寿安镇"], ["东升街道办", "西航港街道办", "华阳镇街道办", "中和街道办", "九江街道", "黄甲街道", "公兴街道", "协和街道", "太平镇", "永兴镇", "籍田镇", "正兴镇", "彭镇", "大林镇", "煎茶镇", "黄龙溪镇", "永安镇", "黄水镇", "金桥镇", "胜利镇", "新兴镇", "兴隆镇", "万安镇", "白沙镇", "三星镇", "合江镇"], ["赵镇街道", "三星镇", "清江镇", "官仓镇", "淮口镇", "白果镇", "五凤镇", "高板镇", "三溪镇", "福兴镇", "金龙镇", "赵家镇", "竹篙镇", "广兴镇", "隆盛镇", "转龙镇", "土桥镇", "云合镇", "又新镇", "栖贤乡", "平桥乡"], ["郫筒街道", "合作街道", "西园街道", "团结镇", "犀浦镇", "花园镇", "唐昌镇", "安德镇", "三道堰镇", "安靖镇", "红光镇", "新民场镇", "德源镇", "友爱镇", "古城镇", "唐元镇"], ["晋原镇街道", "王泗镇", "新场镇", "悦来镇", "安仁镇", "出江镇", "花水湾镇", "西岭镇", "斜源镇", "董场镇", "韩场镇", "三岔镇", "上安镇", "苏家镇", "青霞镇", "沙渠镇", "蔡场镇", "雾山乡", "金星乡", "鹤鸣乡"], ["鹤山街道", "大塘镇", "寿安镇", "朝阳湖镇", "西来镇", "大兴镇", "甘溪镇", "成佳镇", "复兴乡", "光明乡", "白云乡", "长秋乡"], ["五津街道", "花桥镇", "花源镇", "金华镇", "普兴镇", "兴义镇", "新平镇", "方兴镇", "安西镇", "永商镇", "邓双镇", "文井乡"], ["奎光塔街道", "幸福街道", "永丰街道", "灌口街道", "银杏街道", "蒲阳镇", "聚源镇", "崇义镇", "天马镇", "石羊镇", "柳街镇", "玉堂镇", "中兴镇", "青城山镇", "龙池镇", "胥家镇", "安龙镇", "大观镇", "向峨乡"], ["天彭街道", "龙门山镇", "新兴镇", "丽春镇", "九尺镇", "蒙阳镇", "通济镇", "丹景山镇", "隆丰镇", "敖平镇", "磁峰镇", "桂花镇", "军乐镇", "三界镇", "小渔洞镇", "红岩镇", "升平镇", "白鹿镇", "葛仙山镇", "致和镇"], ["文君街道", "临邛街道", "羊安镇", "牟礼镇", "桑园镇", "平乐镇", "夹关镇", "火井镇", "水口镇", "固驿镇", "冉义镇", "回龙镇", "高埂镇", "前进镇", "高何镇", "临济镇", "卧龙镇", "天台山镇", "宝林镇", "南宝山镇", "茶园乡", "道佐乡", "大同乡", "孔明乡"], ["崇阳街道", "三江镇", "江源镇", "羊马镇", "廖家镇", "元通镇", "观胜镇", "怀远镇", "三郎镇", "街子镇", "文井江镇", "王场镇", "白头镇", "道明镇", "隆兴镇", "大划镇", "崇平镇", "梓潼镇", "桤泉镇", "锦江乡", "公议乡", "鸡冠山乡", "济协乡", "燎原乡", "集贤乡"], ["简城街道", "射洪坝街道", "十里坝街道", "杨柳街道", "石桥镇", "新市镇", "石盘镇", "东溪镇", "平泉镇", "禾丰镇", "云龙镇", "三星镇", "养马镇", "贾家镇", "石板凳镇", "三岔镇", "镇金镇", "石钟镇", "施家镇", "三合镇", "平武镇", "金马镇", "踏水镇", "江源镇", "涌泉镇", "芦葭镇", "草池镇", "太平桥镇", "青龙镇", "老君井乡", "福田乡", "宏缘乡", "周家乡", "平窝乡", "武庙乡", "高明乡", "玉成乡", "丹景乡", "望水乡", "清风乡", "董家埂乡", "五星乡", "飞龙乡", "灵仙乡", "五指乡", "新民乡", "新星乡", "同合乡", "老龙乡", "壮溪乡", "海螺乡", "坛罐乡", "雷家乡", "安乐乡", "普安乡", "平息乡", "五合乡", "永宁乡"]], [["五星街街道", "东兴寺街道", "新街街道", "郭家坳街街道", "丹桂街道", "学苑街道", "仲权镇", "舒坪镇", "荣边镇", "红旗乡", "高峰乡", "农团乡", "漆树乡"], ["筱溪街道", "贡井街道", "艾叶镇", "建设镇", "长土镇", "龙潭镇", "桥头镇", "五宝镇", "莲花镇", "成佳镇", "白庙镇", "章佳乡", "牛尾乡"], ["大安街道", "龙井街道", "马冲口街道", "凉高山街道", "大山铺镇", "团结镇", "三多寨镇", "何市镇", "新店镇", "新民镇", "牛佛镇", "庙坝镇", "回龙镇", "永嘉乡", "和平乡", "凤凰乡"], ["沿滩镇", "卫坪镇", "兴隆镇", "富全镇", "永安镇", "联络镇", "邓关镇", "王井镇", "黄市镇", "瓦市镇", "仙市镇", "刘山乡", "九洪乡"], ["旭阳镇", "双石镇", "望佳镇", "鼎新镇", "乐德镇", "过水镇", "古文镇", "河口镇", "新桥镇", "正紫镇", "度佳镇", "东佳镇", "长山镇", "保华镇", "留佳镇", "来牟镇", "双古镇", "观山镇", "高山镇", "东兴镇", "铁厂镇", "金花乡", "雷音乡", "古佳乡", "于佳乡", "复兴乡", "墨林乡"], ["富世镇", "东湖镇", "琵琶镇", "狮市镇", "骑龙镇", "互助镇", "代寺镇", "中石镇", "童寺镇", "古佛镇", "永年镇", "彭庙镇", "兜山镇", "板桥镇", "福善镇", "李桥镇", "赵化镇", "安溪镇", "万寿镇", "飞龙镇", "怀德镇", "长滩镇", "龙万乡", "宝庆乡", "富和乡", "石道乡"]], [["大渡口街道", "炳草岗街道", "南山街道", "向阳村街道", "弄弄坪街道", "枣子坪街道", "长寿路街道", "密地街道", "瓜子坪街道", "银江镇"], ["清香坪街道", "玉泉街道", "河门口街道", "陶家渡街道", "摩梭河街道", "大宝鼎街道", "格里坪镇"], ["大河中路街道", "仁和镇", "平地镇", "大田镇", "福田镇", "同德镇", "金江镇", "布德镇", "前进镇", "大龙潭彝族乡", "啊喇彝族乡", "总发乡", "太平乡", "务本乡", "中坝乡"], ["攀莲镇", "丙谷镇", "得石镇", "撒莲镇", "垭口镇", "白马镇", "普威镇", "草场乡", "湾丘彝族乡", "白坡彝族乡", "麻陇彝族乡", "新山傈僳族乡"], ["桐子林镇", "红格镇", "渔门镇", "永兴镇", "益民乡", "新九乡", "和爱彝族乡", "红果彝族乡", "鳡鱼彝族乡", "共和乡", "国胜乡", "红宝苗族彝族乡", "惠民乡", "箐河傈僳族乡", "温泉彝族乡", "格萨拉彝族乡"]], [["南城街道", "北城街道", "大山坪街道", "邻玉街道", "蓝田街道", "茜草街道", "华阳街道", "张坝景区", "泰安街道", "况场街道", "黄舣镇", "弥陀镇", "通滩镇", "江北镇", "方山镇", "丹林镇", "分水岭镇", "石寨镇", "高新技术开发区", "酒业集中发展区", "轻工业园区"], ["安富街道", "永宁街道", "东升街道", "大渡口镇", "护国镇", "打古镇", "上马镇", "合面镇", "棉花坡镇", "丰乐镇", "白节镇", "天仙镇", "新乐镇", "渠坝镇", "龙车镇", "泸州化工园区"], ["小市街道", "高坝街道", "红星街道", "莲花池街道", "罗汉街道", "鱼塘街道", "安宁街道", "石洞镇", "胡市镇", "特兴镇", "双加镇", "金龙镇", "长安镇"], ["玉蟾街道", "福集镇", "嘉明镇", "喻寺镇", "得胜镇", "牛滩镇", "兆雅镇", "玄滩镇", "太伏镇", "云龙镇", "石桥镇", "毗卢镇", "奇峰镇", "潮河镇", "云锦镇", "立石镇", "百和镇", "天兴镇", "方洞镇", "海潮镇", "泸县城西工业园区", "泸县城北工业园区"], ["合江镇", "望龙镇", "白沙镇", "佛荫镇", "先市镇", "尧坝镇", "九支镇", "五通镇", "凤鸣镇", "榕山镇", "白鹿镇", "甘雨镇", "福宝镇", "先滩镇", "自怀镇", "大桥镇", "车辋镇", "白米镇", "参宝镇", "法王寺镇", "虎头镇", "神臂城镇", "南滩镇", "实录镇", "石龙镇", "密溪乡", "榕右乡", "合江县临港工业园区"], ["叙永镇", "江门镇", "马岭镇", "天池镇", "水尾镇", "两河镇", "落卜镇", "后山镇", "分水镇", "摩尼镇", "赤水镇", "龙凤镇", "正东镇", "观兴镇", "向林镇", "兴隆镇", "营山镇", "麻城镇", "大石乡", "黄坭乡", "合乐苗族乡", "白腊苗族乡", "枧槽苗族乡", "水潦彝族乡", "石坝彝族乡"], ["古蔺镇", "龙山镇", "永乐镇", "太平镇", "二郎镇", "大村镇", "石宝镇", "丹桂镇", "水口镇", "观文镇", "双沙镇", "德耀镇", "护家镇", "石屏镇", "土城镇", "皇华镇", "鱼化乡", "东新乡", "白泥乡", "椒园乡", "马嘶苗族乡", "马蹄乡", "箭竹苗族乡", "大寨苗族乡", "桂花乡", "黄荆乡"]], [["旌阳街道", "城南街道", "城北街道", "旌东街道", "工农街道", "八角井街道", "黄河街道", "天虹街道", "黄许镇", "孝泉镇", "柏隆镇", "孝感镇", "天元镇", "扬嘉镇", "德新镇", "双东镇", "新中镇", "和新镇", "东湖乡"], ["凯江镇", "南华镇", "回龙镇", "通济镇", "永太镇", "黄鹿镇", "集凤镇", "富兴镇", "辑庆镇", "兴隆镇", "龙台镇", "永安镇", "双龙镇", "玉兴镇", "永兴镇", "悦来镇", "继光镇", "仓山镇", "广福镇", "会龙镇", "万福镇", "普兴镇", "联合镇", "冯店镇", "积金镇", "太安镇", "杰兴镇", "南山镇", "东北镇", "古店乡", "青市乡", "瓦店乡", "石泉乡", "柏树乡", "白果乡", "清河乡", "高店乡", "石笋乡", "太平乡", "民主乡", "永丰乡", "元兴乡", "通山乡", "石龙乡", "合兴乡"], ["万安镇", "鄢家镇", "金山镇", "略坪镇", "御营镇", "慧觉镇", "调元镇", "新盛镇", "蟠龙镇", "白马关镇"], ["雒城镇", "三水镇", "连山镇", "高坪镇", "南兴镇", "向阳镇", "小汉镇", "金轮镇", "新丰镇", "兴隆镇", "和兴镇", "松林镇", "金鱼镇", "新平镇", "南丰镇", "西高镇", "北外乡", "西外乡"], ["方亭街道", "皂角街道", "元石镇", "回澜镇", "洛水镇", "禾丰镇", "双盛镇", "马祖镇", "隐峰镇", "马井镇", "蓥华镇", "南泉镇", "湔氐镇", "红白镇", "冰川镇", "师古镇"], ["剑南镇", "东北镇", "西南镇", "兴隆镇", "九龙镇", "遵道镇", "汉旺镇", "拱星镇", "土门镇", "广济镇", "金花镇", "玉泉镇", "板桥镇", "新市镇", "孝德镇", "富新镇", "齐天镇", "什地镇", "绵远镇", "清平镇", "天池乡", "四川绵竹经济开发区"]], [["城厢街道", "城北街道", "工区街道", "南山街道", "朝阳街道", "高新街道", "城南街道", "金家林街道", "科创园街道", "丰谷镇", "关帝镇", "塘汛镇", "青义镇", "龙门镇", "石塘镇", "吴家镇", "杨家镇", "金峰镇", "玉皇镇", "新皂镇", "河边镇", "磨家镇", "永兴镇", "城郊乡", "石洞乡"], ["涪江街道", "富乐街道", "春雷街道办", "松林街道办", "华丰街道办", "游仙镇", "石马镇", "新桥镇", "小枧沟镇", "魏城镇", "沉抗镇", "忠兴镇", "柏林镇", "徐家镇", "石板镇", "刘家镇", "玉河镇", "松垭镇", "白蝉镇", "观太镇", "云凤镇", "太平镇", "街子镇", "建华乡", "东林乡", "梓棉乡", "朝真乡", "东宣乡", "凤凰乡", "四川省新华劳动教育管理所"], ["桑枣镇", "花荄镇", "黄土镇", "塔水镇", "秀水镇", "河清镇", "界牌镇", "永河镇", "雎水镇", "清泉镇", "宝林镇", "沸水镇", "晓坝镇", "乐兴镇", "千佛镇", "兴仁乡", "高川乡", "迎新乡"], ["北坝镇", "潼川镇", "东塔镇", "百顷镇", "塔山镇", "柳池镇", "龙树镇", "石安镇", "富顺镇", "三元镇", "秋林镇", "永新镇", "新德镇", "新生镇", "鲁班镇", "景福镇", "紫河镇", "安居镇", "观桥镇", "郪江镇", "中新镇", "古井镇", "万安镇", "西平镇", "八洞镇", "凯河镇", "乐安镇", "建平镇", "前锋镇", "建设镇", "光辉镇", "中太镇", "金石镇", "新鲁镇", "黎曙镇", "刘营镇", "灵兴镇", "芦溪镇", "立新镇", "花园镇", "永明镇", "高堰乡", "忠孝乡", "双胜乡", "金鼓乡", "断石乡", "玉林乡", "乐加乡", "曙光乡", "建中乡", "宝泉乡", "广利乡", "协和乡", "双乐乡", "菊河乡", "幸福乡", "下新乡", "进都乡", "上新乡", "老马乡", "里程乡", "争胜乡", "云同乡"], ["云溪镇", "玉龙镇", "富驿镇", "金孔镇", "两河镇", "黄甸镇", "柏梓镇", "八角镇", "黑坪镇", "高灯镇", "金鸡镇", "安家镇", "林农镇", "巨龙镇", "龙泉乡", "折弓乡", "麻秧乡", "三元乡", "五龙乡", "茶亭乡", "金安乡", "洗泽乡", "毛公乡", "冯河乡", "石牛庙乡", "大兴回族乡", "宗海乡", "两岔河乡", "剑河乡", "来龙乡", "永泰乡", "黄溪乡", "榉溪乡", "双碑乡", "林山乡", "新农乡"], ["文昌镇", "长卿镇", "许州镇", "黎雅镇", "白云镇", "卧龙镇", "观义镇", "玛瑙镇", "石牛镇", "自强镇", "仁和镇", "东石乡", "三泉乡", "宏仁乡", "小垭乡", "演武乡", "仙峰乡", "双板乡", "豢龙乡", "双峰乡", "交泰乡", "金龙场乡", "石台乡", "仙鹅乡", "马鸣乡", "马迎乡", "二洞乡", "建兴乡", "宝石乡", "定远乡", "大新乡", "文兴乡"], ["曲山镇", "擂鼓镇", "通口镇", "永昌镇", "安昌镇", "永安镇", "禹里镇", "桂溪镇", "香泉乡", "陈家坝乡", "贯岭乡", "漩坪乡", "白坭乡", "小坝乡", "片口乡", "开坪乡", "坝底乡", "白什乡", "青片乡", "都坝乡", "桃龙藏族乡", "墩上乡", "马槽乡"], ["龙安镇", "古城镇", "南坝镇", "响岩镇", "平通镇", "豆叩镇", "大印镇", "大桥镇", "水晶镇", "高村乡", "水田羌族乡", "坝子乡", "水观乡", "平南羌族乡", "徐塘羌族乡", "锁江羌族乡", "土城藏族乡", "旧堡羌族乡", "阔达藏族乡", "黄羊关藏族乡", "虎牙藏族乡", "泗耳藏族乡", "白马藏族乡", "木座藏族乡", "木皮藏族乡"], ["华坪街道", "长城街道", "中坝镇", "太平镇", "三合镇", "含增镇", "青莲镇", "彰明镇", "龙凤镇", "武都镇", "大康镇", "新安镇", "战旗镇", "双河镇", "永胜镇", "小溪坝镇", "河口镇", "重华镇", "厚坝镇", "二郎庙镇", "马角镇", "雁门镇", "九岭镇", "西屏镇", "贯山镇", "大堰镇", "文胜镇", "方水镇", "香水镇", "八一镇", "东兴乡", "义新乡", "新兴乡", "新春乡", "东安乡", "铜星乡", "重兴乡", "云集乡", "石元乡", "敬元乡", "六合乡", "枫顺乡"]], [["东坝街道", "嘉陵街道", "河西街道", "雪峰街道", "南河街道", "上西街道", "回龙河街道", "杨家岩街道", "荣山镇", "大石镇", "盘龙镇", "宝轮镇", "赤化镇", "三堆镇", "工农镇", "白朝乡", "金洞乡", "龙潭乡", "袁家坝", "下西街道"], ["元坝镇", "卫子镇", "王家镇", "磨滩镇", "柏林沟镇", "太公镇", "虎跳镇", "红岩镇", "昭化镇", "石井铺镇", "明觉镇", "晋贤乡", "文村乡", "清水乡", "张家乡", "香溪乡", "青牛乡", "陈江乡", "丁家乡", "黄龙乡", "白果乡", "梅树乡", "射箭乡", "朝阳乡", "大朝乡", "沙坝乡", "柳桥乡", "紫云乡", "拣银岩社区街道"], ["朝天镇", "大滩镇", "羊木镇", "曾家镇", "中子镇", "沙河镇", "陈家乡", "小安乡", "鱼洞乡", "东溪河乡", "花石乡", "蒲家乡", "西北乡", "宣河乡", "转斗乡", "青林乡", "平溪乡", "两河口乡", "李家乡", "汪家乡", "麻柳乡", "临溪乡", "文安乡", "马家坝乡", "柏杨乡"], ["东河镇", "嘉川镇", "木门镇", "白水镇", "尚武镇", "张华镇", "黄洋镇", "普济镇", "三江镇", "金溪镇", "五权镇", "高阳镇", "双汇镇", "英萃镇", "国华镇", "龙凤镇", "九龙镇", "大河乡", "万家乡", "燕子乡", "水磨乡", "鼓城乡", "檬子乡", "福庆乡", "枣林乡", "麻英乡", "柳溪乡", "农建乡", "化龙乡", "大两乡", "万山乡", "正源乡", "天星乡", "盐河乡", "大德乡", "静乐寺管理办公室", "陈家岭管理办公室", "磨岩管理办公室"], ["乔庄镇", "青溪镇", "房石镇", "关庄镇", "凉水镇", "竹园镇", "木鱼镇", "沙州镇", "姚渡镇", "三锅镇", "马鹿镇", "黄坪乡", "瓦砾乡", "孔溪乡", "茶坝乡", "大坝乡", "桥楼乡", "蒿溪回族乡", "乐安寺乡", "前进乡", "曲河乡", "马公乡", "石坝乡", "红光乡", "苏河乡", "茅坝乡", "大院回族乡", "楼子乡", "金子山乡", "七佛乡", "建峰乡", "白家乡", "板桥乡", "骑马乡", "观音店乡", "营盘乡", "唐家河国家级自然保护区"], ["普安镇", "龙源镇", "城北镇", "盐店镇", "柳沟镇", "武连镇", "东宝镇", "开封镇", "元山镇", "演圣镇", "王河镇", "公兴镇", "金仙镇", "香沉镇", "白龙镇", "鹤龄镇", "杨村镇", "羊岭镇", "江口镇", "木马镇", "剑门关镇", "汉阳镇", "下寺镇", "江石乡", "田家乡", "闻溪乡", "姚家乡", "北庙乡", "西庙乡", "义兴乡", "毛坝乡", "凉山乡", "垂泉乡", "秀钟乡", "正兴乡", "马灯乡", "高池乡", "碗泉乡", "迎水乡", "国光乡", "柘坝乡", "公店乡", "吼狮乡", "长岭乡", "涂山乡", "圈龙乡", "碑垭乡", "广坪乡", "禾丰乡", "店子乡", "摇铃乡", "樵店乡", "锦屏乡", "柏垭乡", "高观乡", "张王乡", "上寺乡"], ["陵江镇", "云峰镇", "东青镇", "白桥镇", "八庙镇", "五龙镇", "永宁镇", "鸳溪镇", "三川镇", "龙王镇", "元坝镇", "唤马镇", "歧坪镇", "白驿镇", "漓江镇", "文昌镇", "岳东镇", "石马镇", "运山镇", "东溪镇", "高坡镇", "龙山镇", "中土镇", "亭子镇", "禅林乡", "白鹤乡", "浙水乡", "雍河乡", "新观乡", "石门乡", "月山乡", "白山乡", "彭店乡", "桥溪乡", "龙洞乡", "黄猫乡", "石灶乡", "河地乡", "双河乡", "苍溪九龙山自然保护区管理处", "苍溪县三溪口森林经营所", "苍溪县良种场"]], [["南津路街道", "凯旋路街道", "高升街街道", "镇江寺街道", "育才路街道", "介福路街道", "嘉禾街道", "广德街道", "富源路街道", "龙坪街道", "灵泉街道", "慈音街道", "九莲街道", "南强街道", "龙凤镇", "仁里镇", "复桥镇", "永兴镇", "河沙镇", "新桥镇", "桂花镇", "西宁乡", "老池乡", "保升乡", "唐家乡", "北固乡", "养身谷", "河东二期", "科教园管理办公室", "西宁工作办", "凤台工作办"], ["柔刚街道", "凤凰街道", "安居镇", "东禅镇", "分水镇", "石洞镇", "拦江镇", "保石镇", "白马镇", "中兴镇", "横山镇", "会龙镇", "三家镇", "玉丰镇", "西眉镇", "磨溪镇", "聚贤镇", "观音镇", "常理镇", "莲花乡", "步云乡", "大安乡", "马家乡"], ["赤城镇", "新会镇", "文井镇", "明月镇", "常乐镇", "天福镇", "红江镇", "宝梵镇", "大石镇", "吉祥镇", "鸣凤镇", "任隆镇", "三凤镇", "高坪镇", "蓬南镇", "群利镇", "吉星镇", "金桥镇", "下东乡", "新星乡", "罗戈乡", "板桥乡", "槐花乡", "黄泥乡", "荷叶乡", "金龙乡", "农兴乡", "新胜乡", "回水乡", "群力乡", "高升乡", "城南新区", "上游工业园管理委员会"], ["子昂街道", "平安街道", "太和镇", "大榆镇", "广兴镇", "金华镇", "沱牌镇", "太乙镇", "金家镇", "复兴镇", "天仙镇", "仁和镇", "青岗镇", "洋溪镇", "香山镇", "明星镇", "涪西镇", "陈古镇", "凤来镇", "潼射镇", "曹碑镇", "官升镇", "瞿河乡", "伏河乡", "青堤乡", "双溪乡", "文升乡", "万林乡", "太兴乡", "东岳乡", "金鹤乡", "玉太乡"], ["蓬莱镇", "隆盛镇", "回马镇", "天保镇", "河边镇", "卓筒井镇", "玉峰镇", "象山镇", "金元镇", "通仙乡", "智水乡"]], [["城东街道", "城南街道", "城西街道", "玉溪街道", "牌楼街道", "乐贤街道", "白马镇", "史家镇", "凌家镇", "朝阳镇", "永安镇", "全安镇", "靖民镇", "龚家镇", "凤鸣镇", "伏龙镇", "龙门镇"], ["东兴街道", "西林街道", "新江街道", "胜利街道", "高桥街道", "田家镇", "郭北镇", "高梁镇", "白合镇", "顺河镇", "双才镇", "小河口镇", "杨家镇", "椑木镇", "石子镇", "椑南镇", "永兴镇", "平坦镇", "中山镇", "柳桥镇", "双桥镇", "富溪镇", "同福镇", "永福镇", "三烈镇", "太安乡", "苏家乡", "新店乡", "大治乡"], ["严陵镇", "铺子湾镇", "新店镇", "向义镇", "界牌镇", "龙会镇", "高石镇", "东联镇", "靖和镇", "镇西镇", "庆卫镇", "山王镇", "黄荆沟镇", "观英滩镇", "新场镇", "连界镇", "越溪镇", "两河镇", "碗厂镇", "小河镇"], ["重龙镇", "甘露镇", "归德镇", "鱼溪镇", "金李井镇", "铁佛镇", "球溪镇", "顺河场镇", "龙结镇", "罗泉镇", "发轮镇", "兴隆街镇", "银山镇", "宋家镇", "太平镇", "骝马镇", "水南镇", "苏家湾镇", "新桥镇", "明心寺镇", "双河镇", "公民镇", "龙江镇", "双龙镇", "高楼镇", "陈家镇", "配龙镇", "走马镇", "孟塘镇", "马鞍镇", "狮子镇", "板栗桠镇", "龙山镇"], ["古湖街道", "金鹅街道", "山川镇", "响石镇", "圣灯镇", "黄家镇", "双凤镇", "龙市镇", "迎祥镇", "界市镇", "石碾镇", "周兴镇", "渔箭镇", "石燕桥镇", "李市镇", "胡家镇", "云顶镇", "桂花井镇", "普润镇"]], [["张公桥街道", "泊水街街道", "上河街街道", "大佛街道", "肖坝街道", "通江街道", "柏杨街道", "牟子镇", "土主镇", "白马镇", "茅桥镇", "青平镇", "苏稽镇", "水口镇", "安谷镇", "棉竹镇", "全福镇", "童家镇", "九峰镇", "罗汉镇", "临江镇", "车子镇", "悦来乡", "关庙乡", "石龙乡", "剑峰乡", "凌云乡", "迎阳乡", "九龙乡", "普仁乡", "平兴乡", "杨湾乡"], ["沙湾镇", "嘉农镇", "太平镇", "福禄镇", "牛石镇", "龚嘴镇", "葫芦镇", "踏水镇", "谭坝乡", "轸溪乡", "范店乡", "铜茨乡", "碧山乡", "沫江"], ["竹根镇", "牛华镇", "杨柳镇", "桥沟镇", "金粟镇", "金山镇", "辉山镇", "西坝镇", "冠英镇", "蔡金镇", "石麟镇", "新云乡"], ["永和镇", "金河镇", "和平彝族乡", "共安彝族乡", "吉星乡", "永胜乡"], ["玉津镇", "孝姑镇", "石溪镇", "清溪镇", "新民镇", "罗城镇", "芭沟镇", "龙孔镇", "定文镇", "敖家镇", "金石井镇", "泉水镇", "双溪乡", "九井乡", "同兴乡", "榨鼓乡", "铁炉乡", "大兴乡", "南阳乡", "纪家乡", "新盛乡", "寿保乡", "舞雩乡", "下渡乡", "玉屏乡", "岷东乡", "塘坝乡", "马庙乡", "公平乡", "伏龙乡"], ["研城镇", "马踏镇", "竹园镇", "研经镇", "周坡镇", "千佛镇", "王村镇", "三江镇", "东林镇", "磨池镇", "集益乡", "纯复乡", "三教乡", "高滩乡", "宝五乡", "四合乡", "黄钵乡", "胜泉乡", "门坎乡", "石牛乡", "高凤乡", "金峰乡", "分全乡", "镇阳乡", "天云乡", "乌抛乡", "大佛乡"], ["焉城镇", "黄土镇", "甘江镇", "界牌镇", "中兴镇", "三洞镇", "吴场镇", "木城镇", "华头镇", "甘霖镇", "新场镇", "顺河乡", "马村乡", "土门乡", "青州乡", "梧凤乡", "永青乡", "迎江乡", "龙沱乡", "南安乡", "歇马乡", "麻柳乡"], ["沐溪镇", "永福镇", "大楠镇", "箭板镇", "舟坝镇", "黄丹镇", "利店镇", "建和乡", "幸福乡", "新凡乡", "富和乡", "炭库乡", "底堡乡", "杨村乡", "高笋乡", "茨竹乡", "海云乡", "武圣乡", "凤村乡", "五马坪监狱"], ["沙坪镇", "大堡镇", "毛坪镇", "五渡镇", "新林镇", "黑竹沟镇", "红花乡", "宜坪乡", "杨村乡", "白杨乡", "觉莫乡", "万坪乡", "杨河乡", "共和乡", "新场乡", "平等乡", "哈曲乡", "金岩乡", "勒乌乡"], ["民建镇", "荣丁镇", "下溪镇", "苏坝镇", "烟峰镇", "劳动乡", "建设乡", "石梁乡", "荍坝乡", "民主乡", "老河坝乡", "雪口山乡", "镇江庙乡", "大竹堡乡", "袁家溪乡", "沙腔乡", "三河口乡", "梅子坝乡", "高卓营乡", "永红乡"], ["绥山镇", "高桥镇", "罗目镇", "九里镇", "龙池镇", "乐都镇", "符溪镇", "峨山镇", "双福镇", "桂花桥镇", "大为镇", "胜利镇", "龙门乡", "川主乡", "沙溪乡", "新平乡", "普兴乡", "黄湾乡", "东方电气集团峨嵋半导体材料有限公司", "四川川投峨眉铁合金（集团）有限责任公司", "四川省食品药品学校", "五二五厂", "西南交大峨眉校区"]], [["中城街道", "北城街道", "西城街道", "东南街道", "舞凤街道", "新建街道", "华凤街道", "和平路街道", "潆溪街道", "荆溪街道", "西山街道", "共兴镇", "金台镇", "芦溪镇", "李家镇", "双桥镇", "搬罾镇", "大林镇", "辉景镇", "永丰镇", "新复乡", "同仁乡", "梵殿乡", "顺河乡", "灯台乡", "龙桂乡", "桂花乡", "凤山乡", "渔溪乡", "潆华工业集中区"], ["白塔街道", "清溪街道", "小龙街道", "龙门街道", "青莲街道", "都京街道", "青松街道", "江陵镇", "擦耳镇", "老君镇", "东观镇", "长乐镇", "胜观镇", "永安镇", "阙家镇", "石圭镇", "青居镇", "会龙镇", "螺溪镇", "走马乡", "喻家乡", "马家乡", "黄溪乡", "万家乡", "御史乡", "隆兴乡", "斑竹乡", "鄢家乡", "佛门乡", "溪头乡", "凤凰乡", "南江乡"], ["火花街道", "凤垭街道", "都尉街道", "文峰街道", "西兴街道", "南湖街道", "曲水镇", "李渡镇", "吉安镇", "龙岭镇", "金凤镇", "安福镇", "安平镇", "世阳镇", "大通镇", "一立镇", "龙蟠镇", "里坝镇", "集凤镇", "金宝镇", "三会镇", "双桂镇", "七宝寺镇", "龙泉镇", "河西镇", "花园镇", "移山乡", "木老乡", "新场乡", "土门乡", "临江乡", "双店乡", "白家乡", "华兴乡", "大同乡", "盐溪乡", "桥龙乡", "天星乡", "大观乡", "大兴乡", "新庙乡", "桃园乡", "太和乡", "积善乡", "石楼乡", "礼乐乡"], ["滨江街道", "蜀北街道", "南隆镇", "河东镇", "老鸦镇", "永定镇", "碑院镇", "谢河镇", "盘龙镇", "铁佛塘镇", "石河镇", "王家镇", "富利镇", "楠木镇", "长坪镇", "东坝镇", "河坝镇", "定水镇", "大王镇", "黄金镇", "流马镇", "建兴镇", "三官镇", "伏虎镇", "双佛镇", "花罐镇", "大桥镇", "大河镇", "万年镇", "升钟镇", "升水镇", "大坪镇", "神坝镇", "碾盘乡", "火峰乡", "群龙乡", "大富乡", "碧龙乡", "三清乡", "中心乡", "五灵乡", "平桥乡", "梅家乡", "龙庙乡", "马王乡", "大堰乡", "窑场乡", "太华乡", "兴盛乡", "寒坡乡", "肖家乡", "四龙乡", "碾垭乡", "千秋乡", "玉镇乡", "小元乡", "柳驿乡", "石泉乡", "雄狮乡", "宏观乡", "永庆乡", "永红乡", "柳树乡", "保城乡", "双峰乡", "皂角乡", "丘垭乡", "光中乡", "铁鞭乡", "太霞乡", "店垭乡", "桐坪乡", "西河乡", "工业园区"], ["绥安街道", "朗池镇", "渌井镇", "东升镇", "骆市镇", "黄渡镇", "小桥镇", "灵鹫镇", "老林镇", "木垭镇", "消水镇", "双流镇", "绿水镇", "三兴镇", "蓼叶镇", "新店镇", "回龙镇", "星火镇", "西桥镇", "城南镇", "济川镇", "茶盘乡", "双溪乡", "带河乡", "四喜乡", "玲珑乡", "涌泉乡", "木顶乡", "清源乡", "龙伏乡", "双林乡", "明德乡", "普岭乡", "三元乡", "太蓬乡", "柏林乡", "孔雀乡", "合兴乡", "六合乡", "悦中乡", "高码乡", "安固乡", "大庙乡", "通天乡", "安化乡", "法堂乡", "增产乡", "丰产乡", "清水乡", "青山乡", "福源乡", "柏坪乡", "七涧乡", "凉风乡"], ["锦屏镇", "巨龙镇", "正源镇", "龙云镇", "金溪镇", "徐家镇", "河舒镇", "利溪镇", "龙蚕镇", "杨家镇", "罗家镇", "福德镇", "银汉镇", "兴旺镇", "相如镇", "高庙乡", "群乐乡", "长梁乡", "两路乡", "睦坝乡", "石梁乡", "平头乡", "鲜店乡", "茶亭乡", "诸家乡", "骑龙乡", "金甲乡", "新园乡", "三坝乡", "碧溪乡", "柳滩乡", "石孔乡", "开元乡", "新河乡", "南燕乡", "天成乡", "海田乡", "济渡乡", "凤石乡"], ["金城镇", "新政镇", "马鞍镇", "永乐镇", "日兴镇", "土门镇", "复兴镇", "观紫镇", "先锋镇", "三蛟镇", "回春镇", "柳垭镇", "义路镇", "立山镇", "三河镇", "瓦子镇", "大寅镇", "二道镇", "赛金镇", "丁字桥镇", "大仪镇", "张公镇", "五福镇", "周河镇", "杨桥镇", "保平镇", "文星镇", "双胜镇", "度门镇", "老木乡", "檬垭乡", "铜鼓乡", "中坝乡", "双盘乡", "凤仪乡", "双庆乡", "大风乡", "福临乡", "来仪乡", "碧泉乡", "乐兴乡", "石佛乡", "思德乡", "秋垭乡", "大罗乡", "义门乡", "合作乡", "龙桥乡", "板桥乡", "永光乡", "炬光乡", "九龙乡", "芭蕉乡", "灯塔乡", "武棚乡", "柴井乡", "光华乡"], ["晋城镇", "太平镇", "大全镇", "仙林镇", "古楼镇", "义兴镇", "关文镇", "凤鸣镇", "青狮镇", "槐树镇", "鸣龙镇", "双凤镇", "高院镇", "仁和镇", "多扶镇", "莲池镇", "常林乡", "占山乡", "宏桥乡", "金泉乡", "华光乡", "金源乡", "岱林乡", "李桥乡", "中岭乡", "西碾乡", "紫岩乡", "复安乡", "观凤乡", "青龙乡", "双洛乡", "义和乡", "中南乡", "双江乡", "凤和乡", "东岱乡", "同德乡", "祥龙乡", "车龙乡", "扶君乡", "东太乡", "永清乡", "金山乡", "罐垭乡"], ["保宁街道", "沙溪街道", "七里街道", "江南街道", "彭城镇", "双龙镇", "柏垭镇", "飞凤镇", "思依镇", "文成镇", "二龙镇", "石滩镇", "老观镇", "龙泉镇", "千佛镇", "望垭镇", "河溪镇", "妙高镇", "洪山镇", "石龙镇", "宝马镇", "水观镇", "金垭镇", "玉台镇", "裕华镇", "木兰镇", "东兴镇", "凉水镇", "五马镇", "垭口乡", "治平乡", "天宫乡", "天林乡", "枣碧乡", "北门乡", "桥楼乡", "河楼乡", "清泉乡", "博树回族乡", "解元乡", "西山乡", "方山乡", "金子乡", "三庙乡", "峰占乡", "鹤峰乡", "金城乡", "朱镇乡", "宝台乡", "福星乡"]], [["通惠街道", "大石桥街道", "苏祠街道", "白马镇", "象耳镇", "太和镇", "悦兴镇", "尚义镇", "多悦镇", "秦家镇", "万胜镇", "崇仁镇", "思蒙镇", "修文镇", "松江镇", "崇礼镇", "富牛镇", "永寿镇", "三苏乡", "广济乡", "盘鳌乡", "土地乡", "复盛乡", "复兴乡", "金花乡", "柳圣乡"], ["武阳镇", "江口镇", "凤鸣镇", "公义镇", "牧马镇", "谢家镇", "黄丰镇", "观音镇", "彭溪镇", "青龙镇", "保胜乡", "义和乡", "锦江乡"], ["文宫镇", "禾加镇", "龙马镇", "方家镇", "文林镇", "大化镇", "高家镇", "中农镇", "禄加镇", "宝飞镇", "彰加镇", "慈航镇", "汪洋镇", "钟祥镇", "始建镇", "满井镇", "富加镇", "龙正镇", "黑龙滩镇", "清水镇", "视高镇", "北斗镇", "兴盛镇", "观寺镇", "宝马镇", "珠嘉镇", "四公镇", "曹家镇", "天峨镇", "中岗镇", "向家镇", "识经镇", "曲江镇", "玉龙镇", "虞丞乡", "青岗乡", "古佛乡", "板燕乡", "石咀乡", "藕塘乡", "合兴乡", "促进乡", "鸭池乡", "双堡乡", "河口乡", "板桥乡", "元通乡", "里仁乡", "兆嘉乡", "鳌陵乡", "龙桥乡", "城堰乡", "谢安乡", "新店乡", "凤陵乡", "涂加乡", "松峰乡", "景贤乡", "农旺乡", "洪峰乡"], ["止戈镇", "三宝镇", "花溪镇", "洪川镇", "余坪镇", "槽渔滩镇", "中保镇", "东岳镇", "柳江镇", "高庙镇", "瓦屋山镇", "中山乡", "将军乡", "汉王乡", "桃源乡"], ["仁美镇", "丹棱镇", "杨场镇", "双桥镇", "张场镇", "石桥乡", "顺龙乡"], ["汉阳镇", "河坝子镇", "南城镇", "青城镇", "瑞峰镇", "黑龙镇", "西龙镇", "高台乡", "白果乡", "罗波乡"]], [["北城街道", "东城街道", "南城街道", "西城街道", "南岸街道", "西郊街道", "安阜街道", "白沙湾街道", "赵场街道", "象鼻街道", "沙坪街道", "南广镇", "李庄镇", "菜坝镇", "金坪镇", "高店镇", "牟坪镇", "李端镇", "邱场镇", "宗场镇", "宋家镇", "明威乡", "凉姜乡", "思坡乡"], ["南溪街道", "罗龙街道", "刘家镇", "江南镇", "大观镇", "汪家镇", "黄沙镇", "仙临镇", "长兴镇", "裴石镇", "马家乡", "大坪乡", "石鼓乡", "林丰乡", "留宾乡"], ["柏溪镇", "喜捷镇", "观音镇", "横江镇", "永兴镇", "白花镇", "柳嘉镇", "泥溪镇", "蕨溪镇", "商州镇", "高场镇", "安边镇", "双龙镇", "李场镇", "合什镇", "古罗镇", "孔滩镇", "复龙镇", "普安镇", "双谊镇", "古柏镇", "王场镇", "泥南镇", "隆兴乡", "龙池乡", "凤仪乡"], ["江安镇", "红桥镇", "桐梓镇", "井口镇", "怡乐镇", "留耕镇", "底蓬镇", "五矿镇", "迎安镇", "夕佳山镇", "水清镇", "铁清镇", "四面山镇", "大井镇", "阳春镇", "大妙乡", "蟠龙乡", "仁和乡"], ["长宁镇", "梅硐镇", "双河镇", "硐底镇", "花滩镇", "竹海镇", "老翁镇", "古河镇", "下长镇", "龙头镇", "开佛镇", "铜锣乡", "桃坪乡", "铜鼓乡", "井江乡", "三元乡", "富兴乡", "梅白乡"], ["文江镇", "庆符镇", "沙河镇", "嘉乐镇", "大窝镇", "罗场镇", "蕉村镇", "可久镇", "来复镇", "月江镇", "胜天镇", "复兴镇", "趱滩乡", "羊田乡", "落润乡", "潆溪乡", "庆岭乡", "双河乡", "四烈乡"], ["珙泉镇", "巡场镇", "孝儿镇", "底洞镇", "上罗镇", "洛表镇", "洛亥镇", "王家镇", "沐滩镇", "下罗镇", "曹营镇", "恒丰乡", "仁义乡", "玉和苗族乡", "罗渡苗族乡", "石碑乡", "观斗苗族乡"], ["筠连镇", "腾达镇", "巡司镇", "双腾镇", "沐爱镇", "维新镇", "镇舟镇", "蒿坝镇", "大雪山镇", "武德乡", "塘坝乡", "龙镇乡", "孔雀乡", "乐义乡", "高坎乡", "团林苗族乡", "联合苗族乡", "高坪苗族乡"], ["古宋镇", "僰王山镇", "共乐镇", "莲花镇", "九丝城镇", "石海镇", "太平镇", "周家镇", "五星镇", "玉屏镇", "大坝苗族乡", "毓秀苗族乡", "大河苗族乡", "麒麟苗族乡", "仙峰苗族乡"], ["锦屏镇", "新市镇", "中都镇", "龙华镇", "大乘镇", "富荣镇", "新安镇", "书楼镇", "屏山镇", "鸭池乡", "龙溪乡", "太平乡", "夏溪乡", "屏边彝族乡", "清平彝族乡"]], [["浓洄街道", "北辰街道", "广福街道", "万盛街道", "中桥街道", "枣山镇", "官盛镇", "协兴镇", "浓溪镇", "悦来镇", "兴平镇", "井河镇", "花桥镇", "龙台镇", "肖溪镇", "恒升镇", "石笋镇", "白市镇", "大安镇", "穿石乡", "广门乡", "广罗乡", "方坪乡", "化龙乡", "大龙乡", "崇望乡", "龙安乡", "彭家乡", "杨坪乡", "郑山乡", "蒲莲乡", "大有乡", "消河乡", "东岳乡", "苏溪乡", "白马乡"], ["奎阁街道", "大佛寺街道", "龙塘街道", "桂兴镇", "观阁镇", "广兴镇", "代市镇", "观塘镇", "护安镇", "龙滩镇", "虎城镇", "小井乡", "光辉乡", "新桥乡"], ["九龙镇", "花园镇", "坪滩镇", "龙孔镇", "镇裕镇", "白庙镇", "酉溪镇", "同兴镇", "兴隆镇", "秦溪镇", "顾县镇", "苟角镇", "天平镇", "石垭镇", "乔家镇", "罗渡镇", "裕民镇", "中和镇", "新场镇", "普安镇", "赛龙镇", "临溪镇", "朝阳乡", "北城乡", "镇龙乡", "粽粑乡", "排楼乡", "西板乡", "嘉陵乡", "石鼓乡", "平安乡", "恐龙乡", "团结乡", "黄龙乡", "双鄢乡", "东板乡", "长田乡", "鱼峰乡", "大石乡", "花板乡", "大佛乡", "齐福乡", "伏龙乡"], ["沿口镇", "中心镇", "烈面镇", "飞龙镇", "乐善镇", "万善镇", "龙女镇", "三溪镇", "赛马镇", "胜利镇", "金牛镇", "清平镇", "街子镇", "万隆镇", "礼安镇", "华封镇", "宝箴塞镇", "鸣钟乡", "真静乡", "猛山乡", "双星乡", "龙庭乡", "石盘乡", "旧县乡", "鼓匠乡", "白坪乡", "永胜乡", "新学乡", "金光乡", "八一乡", "高石乡"], ["鼎屏镇", "城北镇", "城南镇", "柑子镇", "龙安镇", "观音桥镇", "牟家镇", "合流镇", "坛同镇", "高滩镇", "九龙镇", "御临镇", "袁市镇", "丰禾镇", "八耳镇", "石永镇", "兴仁镇", "王家镇", "石滓镇", "三古镇", "太和乡", "新镇乡", "冷家乡", "长安乡", "西天乡", "梁板乡", "甘坝乡", "四海乡", "九峰乡", "椿木乡", "华蓥乡", "子中乡", "风垭乡", "黎家乡", "龙桥乡", "关河乡", "两河乡", "长滩乡", "凉山乡", "复盛乡", "古路乡", "荆坪乡", "柳塘乡", "护邻乡", "同石乡"], ["双河街道", "古桥街道", "华龙街道", "天池镇", "禄市镇", "永兴镇", "明月镇", "阳和镇", "高兴镇", "观音溪镇", "溪口镇", "庆华镇", "红岩乡"]], [["东城街道", "西城街道", "朝阳街道", "西外镇", "北外镇", "罗江镇", "蒲家镇", "复兴镇", "双龙镇", "魏兴镇", "江陵镇", "碑庙镇", "磐石镇", "东岳镇", "梓桐镇", "北山镇", "金石镇", "新村乡", "檬双乡", "龙滩乡", "安云乡", "青宁乡"], ["三里坪街道", "翠屏街道", "亭子镇", "福善镇", "麻柳镇", "檀木镇", "大树镇", "南岳镇", "万家镇", "景市镇", "百节镇", "赵家镇", "河市镇", "石板镇", "金垭镇", "渡市镇", "管村镇", "石梯镇", "石桥镇", "堡子镇", "平滩镇", "马家镇", "双庙镇", "金檀镇", "赵固镇", "桥湾镇", "大风乡", "江阳乡", "东兴乡", "安仁乡", "葫芦乡", "大滩乡", "花红乡", "黄庭乡", "黄都乡", "碑高乡", "木子乡", "陈家乡", "龙会乡", "罐子乡", "申家乡", "草兴乡", "木头乡", "大堰乡", "九岭乡", "五四乡", "银铁乡", "沿河乡", "香隆乡", "永进乡", "洛车乡", "道让乡", "虎让乡", "米城乡"], ["东乡镇", "君塘镇", "清溪镇", "普光镇", "天生镇", "柏树镇", "芭蕉镇", "南坝镇", "五宝镇", "峰城镇", "土黄镇", "华景镇", "樊哙镇", "新华镇", "黄金镇", "胡家镇", "毛坝镇", "双河镇", "大成镇", "土主镇", "下八镇", "红岭镇", "塔河镇", "茶河镇", "厂溪镇", "明月乡", "柳池乡", "三河乡", "老君乡", "黄石乡", "七里乡", "庙安乡", "天宝乡", "东林乡", "凉风乡", "上峡乡", "天台乡", "观山乡", "南坪乡", "凤林乡", "桃花乡", "白马乡", "漆碑乡", "三墩土家族乡", "漆树土家族乡", "龙泉土家族乡", "渡口土家族乡", "石铁乡", "红峰乡", "凤鸣乡", "花池乡", "庆云乡", "马渡乡", "隘口乡"], ["新宁镇", "普安镇", "回龙镇", "天师镇", "永兴镇", "讲治镇", "甘棠镇", "任市镇", "广福镇", "长岭镇", "八庙镇", "灵岩镇", "宝石镇", "长田乡", "骑龙乡", "新太乡", "沙坝场乡", "梅家乡", "靖安乡", "新街乡"], ["竹阳街道", "东柳街道", "白塔街道", "乌木镇", "团坝镇", "杨家镇", "清河镇", "柏林镇", "石河镇", "双拱镇", "石桥铺镇", "观音镇", "周家镇", "石子镇", "文星镇", "妈妈镇", "高穴镇", "欧家镇", "庙坝镇", "清水镇", "月华镇", "高明镇", "童家镇", "天城镇", "城西乡", "竹北乡", "朝阳乡", "人和乡", "中华乡", "黄家乡", "柏家乡", "李家乡", "二郎乡", "蒲包乡", "永胜乡", "新生乡", "安吉乡", "白坝乡", "双溪乡", "八渡乡", "中和乡", "杨通乡", "四合乡", "张家乡", "神合乡", "金鸡乡", "黄滩乡", "牌坊乡", "姚市乡", "莲印乡", "川主乡"], ["渠江镇", "天星镇", "临巴镇", "土溪镇", "三汇镇", "文崇镇", "涌兴镇", "贵福镇", "岩峰镇", "静边镇", "清溪场镇", "宝城镇", "有庆镇", "鲜渡镇", "琅琊镇", "李渡镇", "中滩镇", "龙潭镇", "三板镇", "丰乐镇", "渠南乡", "渠北乡", "青龙乡", "板桥乡", "锡溪乡", "河东乡", "李馥乡", "青神乡", "流溪乡", "东安乡", "汇东乡", "汇南乡", "汇北乡", "报恩乡", "安北乡", "平安乡", "千佛乡", "柏水乡", "大义乡", "义和乡", "水口乡", "巨光乡", "蔡和乡", "鹤林乡", "白兔乡", "青丝乡", "万寿乡", "射洪乡", "望江乡", "和乐乡", "龙凤乡", "新市乡", "宋家乡", "拱市乡", "屏西乡", "定远乡", "嘉禾乡", "望溪乡", "双土乡", "卷硐乡"], ["太平镇", "青花镇", "旧院镇", "罗文镇", "河口镇", "草坝镇", "竹峪镇", "大竹镇", "黄钟镇", "官渡镇", "白沙镇", "沙滩镇", "石窝镇", "八台镇", "石塘镇", "茶垭乡", "长石乡", "白羊乡", "铁矿乡", "固军乡", "井溪乡", "堰塘乡", "蜂桶乡", "花楼乡", "长坝乡", "曾家乡", "大沙乡", "秦河乡", "庙垭乡", "鹰背乡", "玉带乡", "新店乡", "魏家乡", "柳黄乡", "溪口乡", "永宁乡", "虹桥乡", "康乐乡", "白果乡", "钟亭乡", "庙子乡", "紫溪乡", "庙坡乡", "梨树乡", "皮窝乡", "丝罗乡", "罐坝乡", "石人乡", "赵塘乡", "中坪乡", "花萼乡", "曹家乡"]], [["东城街道", "西城街道", "河北街道", "青江街道", "北郊镇", "草坝镇", "合江镇", "大兴镇", "对岩镇", "沙坪镇", "中里镇", "上里镇", "严桥镇", "晏场镇", "多营镇", "碧峰峡镇", "南郊乡", "八步乡", "观化乡", "孔坪乡", "凤鸣乡", "望鱼乡"], null, ["严道镇", "花滩镇", "龙苍沟镇", "六合乡", "烈太乡", "安靖乡", "民建彝族乡", "烈士乡", "荥河乡", "新建乡", "泗坪乡", "新庙乡", "三合乡", "大田坝乡", "天凤乡", "宝峰彝族乡", "新添乡", "附城乡", "五宪乡", "烟竹乡", "青龙乡"], ["富林镇", "九襄镇", "乌斯河镇", "宜东镇", "富庄镇", "清溪镇", "大树镇", "皇木镇", "唐家镇", "富泉镇", "大田乡", "河西乡", "前域乡", "后域乡", "富乡乡", "梨园乡", "三交乡", "双溪乡", "西溪乡", "安乐乡", "万里乡", "马烈乡", "河南乡", "晒经乡", "料林乡", "小堡藏族彝族乡", "片马彝族乡", "坭美彝族乡", "永利彝族乡", "顺河彝族乡"], ["棉城街道", "新棉镇", "安顺彝族乡", "先锋藏族乡", "蟹螺藏族乡", "永和乡", "回隆彝族乡", "擦罗彝族乡", "栗子坪彝族乡", "美罗乡", "迎政乡", "宰羊乡", "丰乐乡", "新民藏族彝族乡", "挖角彝族藏族乡", "田湾彝族乡", "草科藏族乡"], ["城厢镇", "始阳镇", "小河乡", "思经乡", "鱼泉乡", "紫石乡", "两路乡", "大坪乡", "乐英乡", "多功乡", "仁义乡", "老场乡", "新华乡", "新场乡", "兴业乡"], ["芦阳镇", "飞仙关镇", "双石镇", "太平镇", "大川镇", "思延乡", "清仁乡", "龙门乡", "宝盛乡"], ["穆坪镇", "灵关镇", "陇东镇", "蜂桶寨乡", "硗碛乡", "永富乡", "明礼乡", "五龙乡", "大溪乡"]], [["东城街道", "西城街道", "回风街道", "江北街道", "宕梁街道", "玉堂街道", "大茅坪镇", "清江镇", "水宁寺镇", "化成镇", "曾口镇", "梁永镇", "三江镇", "鼎山镇", "大罗镇", "枣林镇", "平梁镇", "光辉镇", "寺岭镇", "梓桐庙镇", "凤溪镇", "花溪乡", "大和乡", "白庙乡", "关渡乡", "凌云乡", "金碑乡", "羊凤乡", "龙背乡"], ["登科街道", "明阳镇", "玉山镇", "渔溪镇", "三河场镇", "青木镇", "花丛镇", "柳林镇", "下八庙镇", "茶坝镇", "观音井镇", "三汇镇", "上八庙镇", "三星乡", "关公乡", "舞凤乡", "兴隆场乡", "石城乡", "九镇乡", "尹家乡", "双胜乡", "群乐乡", "万安乡", "玉井乡", "义兴乡"], ["诺江镇", "民胜镇", "火炬镇", "广纳镇", "铁佛镇", "麻石镇", "至诚镇", "洪口镇", "沙溪镇", "瓦室镇", "永安镇", "铁溪镇", "涪阳镇", "诺水河镇", "杨柏乡", "大兴乡", "东山乡", "三溪乡", "双泉乡", "文峰乡", "春在乡", "三合乡", "云昙乡", "唱歌乡", "芝苞乡", "龙凤场乡", "董溪乡", "澌波乡", "松溪乡", "九层乡", "胜利乡", "板凳乡", "文胜乡", "兴隆乡", "毛裕乡", "泥溪乡", "烟溪乡", "沙坪乡", "朱元乡", "长坪乡", "两河口乡", "空山乡", "青浴乡", "板桥口乡", "铁厂乡", "新场乡", "陈河乡", "草池乡", "回林乡"], ["南江镇", "沙河镇", "乐坝镇", "长赤镇", "正直镇", "大河镇", "光雾山镇", "东榆镇", "下两镇", "赶场镇", "杨坝镇", "天池镇", "关坝镇", "红光镇", "元潭镇", "赤溪镇", "八庙镇", "双流镇", "坪河镇", "燕山乡", "高塔乡", "团结乡", "傅家乡", "红四乡", "侯家乡", "双桂乡", "凤仪乡", "朱公乡", "黑潭乡", "和平乡", "高桥乡", "平岗乡", "仁和乡", "石滩乡", "关门乡", "兴马乡", "北极乡", "关路乡", "关田乡", "红岩乡", "桥亭乡", "贵民乡", "沙坝乡", "柳湾乡", "汇滩乡", "上两乡", "寨坡乡", "流坝乡"], ["同州街道", "江口镇", "响滩镇", "西兴镇", "佛楼镇", "白衣镇", "涵水镇", "岳家镇", "兰草镇", "驷马镇", "坦溪镇", "元山镇", "云台镇", "邱家镇", "笔山镇", "镇龙镇", "得胜镇", "鹿鸣镇", "青凤镇", "灵山镇", "土兴镇", "望京镇", "龙岗镇", "板庙镇", "泥龙镇", "五木镇", "青云乡", "元石乡", "六门乡", "大寨乡", "岩口乡", "喜神乡", "土垭乡", "石垭乡", "澌岸乡", "马鞍乡", "界牌乡", "粉壁乡", "澌滩乡", "高峰乡", "南风乡", "福申乡", "双鹿乡", "黑水乡"]], [["莲花街道", "三贤祠街道", "资溪街道", "狮子山街道", "雁江镇", "松涛镇", "宝台镇", "临江镇", "保和镇", "老君镇", "中和镇", "丹山镇", "小院镇", "堪嘉镇", "伍隍镇", "石岭镇", "东峰镇", "南津镇", "忠义镇", "碑记镇", "丰裕镇", "迎接镇", "祥符镇", "新场乡", "回龙乡", "清水乡", "四川大堰劳动教养管理所"], ["岳阳镇", "鸳大镇", "石桥铺镇", "通贤镇", "龙台镇", "姚市镇", "林凤镇", "毛家镇", "永清镇", "永顺镇", "石羊镇", "两板桥镇", "护龙镇", "李家镇", "元坝镇", "兴隆镇", "天林镇", "镇子镇", "文化镇", "周礼镇", "驯龙镇", "华严镇", "卧佛镇", "长河源镇", "忠义镇", "护建镇", "南薰镇", "城北乡", "城西乡", "思贤乡", "石鼓乡", "来凤乡", "天马乡", "人和乡", "团结乡", "悦来乡", "白水乡", "云峰乡", "岳新乡", "偏岩乡", "东胜乡", "坪河乡", "乾龙乡", "高升乡", "横庙乡", "瑞云乡", "白塔寺乡", "双龙街乡", "顶新乡", "和平乡", "高屋乡", "合义乡", "努力乡", "清流乡", "共和乡", "天宝乡", "协和乡", "鱼龙乡", "建华乡", "大平乡", "九龙乡", "岳源乡", "龙桥乡", "千佛乡", "拱桥乡", "宝华乡", "自治乡", "大埝乡", "朝阳乡"], ["天池镇", "石佛镇", "回澜镇", "石湍镇", "童家镇", "宝林镇", "大佛镇", "良安镇", "金顺镇", "中和场镇", "劳动镇", "中天镇", "佛星镇", "蟠龙镇", "东山镇", "通旅镇", "高寺镇", "龙溪乡", "全胜乡", "孔雀乡", "龙门乡", "双河场乡", "放生乡", "盛池乡", "凉水乡"]], [["马尔康镇", "卓克基镇", "松岗镇", "梭磨乡", "白湾乡", "党坝乡", "木尔宗乡", "脚木足乡", "沙尔宗乡", "龙尔甲乡", "大藏乡", "康山乡", "草登乡", "日部乡"], ["威州镇", "映秀镇", "卧龙镇", "水磨镇", "漩口镇", "三江镇", "耿达镇", "绵虒镇", "龙溪乡", "克枯乡", "雁门乡", "银杏乡"], ["杂谷脑镇", "米亚罗镇", "古尔沟镇", "薛城镇", "桃坪镇", "夹壁乡", "朴头乡", "甘堡乡", "蒲溪乡", "上孟乡", "下孟乡", "木卡乡", "通化乡"], ["凤仪镇", "南新镇", "叠溪镇", "光明镇", "雅都镇", "富顺镇", "渭门乡", "永和乡", "沟口乡", "土门乡", "东兴乡", "黑虎乡", "飞虹乡", "回龙乡", "三龙乡", "白溪乡", "洼底乡", "石大关乡", "太平乡", "松坪沟乡", "曲谷乡"], ["进安镇", "川主寺镇", "进安回族乡", "十里回族乡", "青云乡", "安宏乡", "大寨乡", "牟尼乡", "镇江关乡", "镇坪乡", "岷江乡", "大姓乡", "白羊乡", "红土乡", "红扎乡", "小姓乡", "燕云乡", "山巴乡", "水晶乡", "小河乡", "施家堡乡", "黄龙乡", "上八寨乡", "下八寨乡", "草原乡", "松潘林业局"], ["永乐镇", "漳扎镇", "双河镇", "永丰乡", "永和乡", "安乐乡", "白河乡", "保华乡", "罗依乡", "勿角乡", "马家乡", "郭元乡", "草地乡", "陵江乡", "黑河乡", "玉瓦乡", "大录乡", "九寨沟国营牧场", "九寨沟风景名胜管理局"], ["观音桥镇", "安宁镇", "勒乌镇", "沙耳乡", "庆宁乡", "咯尔乡", "万林乡", "河东乡", "河西乡", "集沐乡", "撒瓦脚乡", "卡拉足乡", "俄热乡", "太阳河乡", "二嘎里乡", "阿科里乡", "卡撒乡", "曾达乡", "独松乡", "马尔邦乡", "马奈乡", "毛日乡"], ["美兴镇", "四姑娘山镇", "两河口镇", "达维镇", "老营乡", "崇德乡", "新桥乡", "美沃乡", "沙龙乡", "宅垄乡", "新格乡", "日尔乡", "结斯乡", "沃日乡", "木坡乡", "抚边乡", "八角乡", "双柏乡", "窝底乡", "汗牛乡", "潘安乡"], null, ["壤柯镇", "南木达镇", "中壤塘镇", "蒲西乡", "宗科乡", "石里乡", "吾伊乡", "岗木达乡", "上杜柯乡", "茸木达乡", "尕多乡", "上壤塘乡"], ["阿坝镇", "贾洛镇", "哇尔玛乡", "麦昆乡", "河支乡", "龙藏乡", "求吉玛乡", "甲尔多乡", "各莫乡", "德格乡", "四洼乡", "安斗乡", "柯河乡", "垮沙乡", "安羌乡", "查理乡", "茸安乡", "洛尔达乡", "麦尔玛乡", "若柯河农场", "贾柯河牧场"], ["达扎寺镇", "唐克镇", "红星镇", "辖曼镇", "班佑乡", "阿西乡", "麦溪乡", "嫩哇乡", "冻列乡", "崇尔乡", "热尔乡", "占哇乡", "降扎乡", "巴西乡", "阿西茸乡", "求吉乡", "包座乡", "白河牧场", "辖曼牧场"], ["邛溪镇", "刷经寺镇", "瓦切镇", "安曲镇", "色地镇", "龙日乡", "江茸乡", "查尔玛乡", "阿木乡", "壤口乡", "麦洼乡"]], [["炉城镇", "姑咱镇", "新都桥镇", "塔公镇", "沙德镇", "金汤镇", "雅拉乡", "时济乡", "前溪乡", "舍联乡", "麦崩乡", "三合乡", "捧塔乡", "贡嘎山乡", "普沙绒乡", "吉居乡", "瓦泽乡", "呷巴乡", "甲根坝乡", "朋布西乡", "孔玉乡"], ["泸桥镇", "冷碛镇", "兴隆镇", "磨西镇", "燕子沟镇", "得妥镇", "烹坝镇", "岚安乡", "田坝乡", "杵坭乡", "加郡乡", "德威乡"], ["章谷镇", "巴底镇", "革什扎镇", "巴旺乡", "聂呷乡", "边耳乡", "丹东乡", "东谷乡", "水子乡", "格宗乡", "梭坡乡", "中路乡", "岳扎乡", "半扇门乡", "太平桥乡"], ["呷尔镇", "烟袋镇", "汤古乡", "斜卡乡", "三岩龙乡", "上团乡", "八窝龙乡", "乃渠乡", "乌拉溪乡", "魁多乡", "子耳彝族乡", "三垭彝族乡", "俄尔彝族乡", "小金彝族乡", "朵洛彝族乡", "踏卡彝族乡", "湾坝彝族乡", "洪坝乡"], ["河口镇", "呷拉镇", "西俄洛镇", "八角楼乡", "普巴绒乡", "祝桑乡", "米龙乡", "八衣绒乡", "波斯河乡", "恶古乡", "牙衣河乡", "麻郎错乡", "德差乡", "红龙乡", "柯拉乡", "瓦多乡", "木绒乡"], ["鲜水镇", "八美镇", "亚卓镇", "甲宗镇", "格西乡", "麻孜乡", "孔色乡", "葛卡乡", "仲尼乡", "红顶乡", "扎拖乡", "下拖乡", "瓦日乡", "木茹乡", "甲斯孔乡", "七美乡", "银恩乡", "维它乡", "龙灯乡", "协德乡", "色卡乡", "沙冲乡"], ["新都镇", "朱倭镇", "斯木镇", "泥巴乡", "雅德乡", "洛秋乡", "宜木乡", "仁达乡", "旦都乡", "充古乡", "更知乡", "卡娘乡", "宗塔乡", "宗麦乡", "上罗柯马乡", "下罗柯马乡"], ["甘孜镇", "查龙镇", "来马镇", "呷拉乡", "色西底乡", "南多乡", "生康乡", "贡隆乡", "扎科乡", "昔色乡", "卡攻乡", "仁果乡", "拖坝乡", "斯俄乡", "庭卡乡", "下雄乡", "四通达乡", "夺多乡", "泥柯乡", "茶扎乡", "大德乡", "卡龙乡"], ["如龙镇", "拉日马镇", "大盖镇", "沙堆乡", "乐安乡", "绕鲁乡", "色威乡", "甲拉西乡", "博美乡", "尤拉西乡", "子拖西乡", "和平乡", "洛古乡", "雄龙西乡", "麻日乡", "通宵乡", "友谊乡", "皮擦乡", "银多乡"], ["更庆镇", "马尼干戈镇", "竹庆镇", "阿须镇", "达马镇", "错阿镇", "普马乡", "岳巴乡", "八帮乡", "龚垭乡", "白垭乡", "汪布顶乡", "柯洛洞乡", "卡松渡乡", "俄南乡", "俄支乡", "玉隆乡", "中扎科乡", "然姑乡", "窝公乡", "温拖乡", "年古乡", "浪多乡", "打滚乡", "亚丁乡", "所巴乡"], ["建设镇", "阿察镇", "金沙乡", "绒盖乡", "章都乡", "麻绒乡", "河坡乡", "热加乡", "登龙乡", "赠科乡", "麻邛乡", "辽西乡", "纳塔乡", "安孜乡", "盖玉乡", "沙马乡", "山岩乡"], ["尼呷镇", "洛须镇", "色须镇", "虾扎镇", "温波镇", "蒙宜镇", "真达乡", "奔达乡", "正科乡", "麻呷乡", "德荣马乡", "长沙贡马乡", "呷衣乡", "格孟乡", "新荣乡", "宜牛乡", "起坞乡", "阿日扎乡", "长须贡马乡", "长沙干马乡", "长须干马乡", "瓦须乡"], ["色柯镇", "翁达镇", "洛若镇", "泥朵镇", "克戈乡", "然充乡", "康勒乡", "大章乡", "大则乡", "亚龙乡", "塔子乡", "年龙乡", "霍西乡", "旭日乡", "杨各乡", "甲学乡", "歌乐沱乡"], ["高城镇", "甲洼镇", "君坝乡", "哈依乡", "觉吾乡", "莫坝乡", "亚火乡", "绒坝乡", "呷洼乡", "奔戈乡", "村戈乡", "禾尼乡", "曲登乡", "喇嘛垭乡", "章纳乡", "上木拉乡", "下木拉乡", "中木拉乡", "濯桑乡", "藏坝乡", "格木乡", "拉波乡", "麦洼乡", "德巫乡"], ["夏邛镇", "中咱镇", "措拉镇", "拉哇乡", "党巴乡", "竹巴龙乡", "中心绒乡", "苏哇龙乡", "昌波乡", "地巫乡", "亚日贡乡", "波密乡", "莫多乡", "松多乡", "波戈溪乡", "甲英乡", "茶洛乡", "列衣乡", "德达乡"], ["香巴拉镇", "青德镇", "尼斯镇", "沙贡乡", "水洼乡", "青麦乡", "然乌乡", "洞松乡", "热打乡", "定波乡", "正斗乡", "白依乡"], ["金珠镇", "香格里拉镇", "桑堆镇", "省母乡", "傍河乡", "色拉乡", "巨龙乡", "邓波乡", "木拉乡", "赤土乡", "蒙自乡", "各卡乡", "吉呷乡", "俄牙同乡"], ["松麦镇", "瓦卡镇", "白松镇", "斯闸乡", "徐龙乡", "日龙乡", "曲雅贡乡", "奔都乡", "八日乡", "古学乡", "贡波乡", "茨巫乡"]], [["北城街道", "西城街道", "东城街道", "长安街道", "新村街道", "长宁街道", "马道镇", "礼州镇", "安宁镇", "川兴镇", "黄联关镇", "佑君镇", "太和镇", "安哈镇", "西郊乡", "高枧乡", "小庙乡", "四合乡", "月华乡", "兴胜乡", "琅环乡", "民胜乡", "西乡乡", "樟木箐乡", "响水乡", "开元乡", "大兴乡", "海南乡", "大箐乡", "经久乡", "西溪乡", "黄水乡", "洛古波乡", "裕隆回族乡", "高草回族乡", "中坝乡", "阿七乡", "荞地乡", "磨盘乡", "巴汝乡", "银厂乡", "白马乡", "马鞍山乡"], ["乔瓦镇", "瓦厂镇", "茶布朗镇", "雅砻江镇", "博科乡", "宁朗乡", "依吉乡", "俄亚纳西族乡", "水洛乡", "牦牛坪乡", "屋脚蒙古族乡", "项脚蒙古族乡", "李子坪乡", "列瓦乡", "芽祖乡", "下麦地乡", "西秋乡", "克尔乡", "白碉苗族乡", "三桷桠乡", "倮波乡", "卡拉乡", "后所乡", "沙湾乡", "固增苗族乡", "麦日乡", "东朗乡", "唐央乡", "博窝乡"], ["盐井镇", "卫城镇", "梅雨镇", "白乌镇", "树河镇", "黄草镇", "平川镇", "泸沽湖镇", "官地镇", "双河乡", "下海乡", "棉桠乡", "甘塘乡", "藤桥乡", "田湾乡", "大河乡", "盐塘乡", "巫木乡", "大草乡", "博大乡", "金河乡", "右所乡", "长柏乡", "桃子乡", "盖租乡", "前所乡", "沃底乡", "大坡蒙古族乡", "洼里乡", "梅子坪乡"], ["德州镇", "永郎镇", "乐跃镇", "麻栗镇", "阿月镇", "六所镇", "茨达镇", "小高镇", "王所镇", "巴洞镇", "宽裕镇", "锦川乡", "老碾乡", "大湾乡", "马安乡", "铁炉乡", "大山乡", "大六槽乡", "热河乡", "南山傈僳族乡", "金沙傈僳族乡"], ["城北街道", "城南街道", "鹿厂镇", "黎溪镇", "通安镇", "太平镇", "益门镇", "绿水镇", "新发镇", "云甸镇", "关河镇", "富乐镇", "彰冠镇", "木古镇", "六华镇", "内东乡", "外北乡", "爱民乡", "爱国乡", "凤营乡", "白鸡乡", "矮郎乡", "小黑箐乡", "河口乡", "中厂乡", "鱼鲊乡", "黎洪乡", "金雨乡", "树堡乡", "江竹乡", "新安傣族乡", "普隆乡", "竹箐乡", "杨家坝乡", "江普乡", "海潮乡", "芭蕉乡", "马宗乡", "法坪乡", "槽元乡", "黄柏乡", "白果湾乡", "下村乡", "龙泉乡", "六民乡"], ["鲹鱼河镇", "铅锌镇", "堵格镇", "姜州镇", "乌东德镇", "淌塘镇", "铁柳镇", "嘎吉镇", "满银沟镇", "新街镇", "鲁吉镇", "大崇镇", "松坪镇", "小坝乡", "拉马乡", "老君滩乡", "江西街乡", "溜姑乡", "野牛坪乡", "野租乡"], ["披砂镇", "松新镇", "竹寿镇", "华弹镇", "白鹤滩镇", "葫芦口镇", "西瑶镇", "景星乡", "俱乐乡", "新村乡", "幸福乡", "海子乡", "六铁乡", "新建乡", "稻谷乡", "新华乡", "石梨乡", "松林乡", "杉树乡", "梁子乡", "大同乡", "红星乡", "骑骡沟乡", "倮格乡", "跑马乡"], ["普基镇", "荞窝镇", "螺髻山镇", "永安乡", "向阳乡", "文坪乡", "黎安乡", "花山乡", "东山乡", "大坪乡", "辉隆乡", "洛乌沟乡", "雨水乡", "甘天地乡", "洛乌乡", "孟甘乡", "特兹乡", "吉乐乡", "特口乡", "耶底乡", "夹铁乡", "瓦洛乡", "哈力洛乡", "菜子乡", "祝联乡", "刘家坪乡", "月吾乡", "特补乡", "五道箐乡", "特尔果乡", "大槽乡", "马洪乡", "洛甘乡", "红莫依达乡"], ["特木里镇", "龙潭镇", "拖觉镇", "木尔乡", "九都乡", "拉达乡", "乌科乡", "沙洛乡", "洛古乡", "补尔乡", "觉撒乡", "美撒乡", "拉果乡", "乌依乡", "浪珠乡", "包谷坪乡", "合井乡", "罗家坪乡", "牛角湾乡", "补洛乡", "火烈乡", "乐安乡", "四棵乡", "地洛乡", "俄里坪乡", "瓦都乡", "采哈乡", "委只洛乡", "联补乡", "基只乡"], ["天地坝镇", "派来镇", "芦稿镇", "对坪镇", "桃坪乡", "热水河乡", "马依足乡", "红峰乡", "尔觉西乡", "热柯觉乡", "甲依乡", "木府乡", "寨子乡", "则祖乡", "基觉乡", "小银木乡", "春江乡", "红联乡", "青松乡", "放马坪乡", "梗堡乡", "山江乡", "洛觉乡", "向岭乡", "谷德乡", "高峰乡", "老寨子乡", "德溪乡", "南瓦乡", "依莫合乡", "土沟乡", "丙底乡", "依达乡", "丝窝乡"], ["新城镇", "城北乡", "树坪乡", "谷曲乡", "达洛乡", "龙恩乡", "美甘乡", "四开乡", "大坝乡", "地莫乡", "柳且乡", "博洛乡", "库莫乡", "解放乡", "三岗乡", "洒拉地坡乡", "三岔河乡", "尼地乡", "碗厂乡", "普诗乡", "玛增依乌乡", "塘且乡", "久特洛古乡", "齿可波西乡", "特口甲谷乡", "竹核乡", "阿并洛古乡", "格吾乡", "特布洛乡", "庆恒乡", "拉一木乡", "色底乡", "补约乡", "比尔乡", "库依乡", "金曲乡", "宜牧地乡", "波洛乡", "央摩租乡", "则普乡", "永乐乡", "且莫乡", "甘多洛古乡", "支尔莫乡", "龙沟乡", "日哈乡", "哈甘乡"], ["光明镇", "冕山镇", "红莫镇", "两河口镇", "米市镇", "洛哈镇", "尼波镇", "拉克乡", "则约乡", "贺波洛乡", "鲁基乡", "李子乡", "北山乡", "西河乡", "东河乡", "且拖乡", "博洛拉达乡", "沙马拉达乡", "巴久乡", "洛莫乡", "依洛乡", "热柯依达乡", "额尼乡", "乐武乡"], ["城厢镇", "漫水湾镇", "大桥镇", "复兴镇", "泸沽镇", "沙坝镇", "彝海镇", "石龙镇", "回龙镇", "河边镇", "锦屏镇", "后山镇", "里庄镇", "惠安镇", "宏模镇", "泽远镇", "回坪乡", "哈哈乡", "森荣乡", "林里乡", "铁厂乡", "河里乡", "冶勒乡", "拖乌乡", "曹古乡", "先锋乡", "金林乡", "腊窝乡", "联合乡", "麦地沟乡", "南河乡", "青纳乡", "和爱藏族乡", "棉沙湾乡", "马头乡", "窝堡乡", "新兴乡", "健美乡"], ["越城镇", "中所镇", "新民镇", "乃托镇", "普雄镇", "大瑞镇", "新乡乡", "马拖乡", "南箐乡", "丁山乡", "大花乡", "河东乡", "西山乡", "板桥乡", "瓦岩乡", "大屯乡", "保安藏族乡", "白果乡", "梅花乡", "拉普乡", "铁西乡", "尔觉乡", "四甘普乡", "贡莫乡", "拉白乡", "乐青地乡", "德吉乡", "依洛地坝乡", "尔赛乡", "古二乡", "竹阿觉乡", "保石乡", "五里箐乡", "书古乡", "瓦普莫乡", "申果乡", "瓦曲觉乡", "申普乡", "瓦曲乃乌乡", "瓦里觉乡", "拉吉乡"], ["新市坝镇", "田坝镇", "海棠镇", "吉米镇", "斯觉镇", "普昌镇", "玉田镇", "前进乡", "胜利乡", "新茶乡", "两河乡", "里克乡", "尼尔觉乡", "拉莫乡", "波波乡", "阿嘎乡", "阿尔乡", "石海乡", "团结乡", "嘎日乡", "则拉乡", "坪坝乡", "蓼坪乡", "阿兹觉乡", "乌史大桥乡", "黑马乡", "沙岱乡", "苏雄乡"], ["巴普镇", "觉洛乡", "井叶特西乡", "合姑洛乡", "巴古乡", "农作乡", "佐戈依达乡", "子威乡", "依洛拉达乡", "典补乡", "哈洛乡", "牛牛坝乡", "尔合乡", "竹库乡", "候古莫乡", "候播乃拖乡", "采红乡", "苏洛乡", "九口乡", "洛俄依甘乡", "拉木阿觉乡", "洛莫依达乡", "柳洪乡", "乐约乡", "尔其乡", "瓦古乡", "峨曲古乡", "炳途乡", "拖木乡", "尼哈乡", "龙门乡", "依果觉乡", "洒库乡", "瓦西乡", "树窝乡", "龙窝乡"], ["锦城镇", "西宁镇", "汶水镇", "黄琅镇", "金沙镇", "海湾乡", "杉树堡乡", "箐口乡", "帕哈乡", "永盛乡", "溪洛米乡", "顺河乡", "渡口乡", "回龙场乡", "马湖乡", "中田乡", "谷米乡", "柑子乡", "双河口乡", "罗山溪乡", "桂花乡", "烂坝子乡", "沙沱乡", "山棱岗乡", "长河乡", "谷堆乡", "八寨乡", "拉咪乡", "松树乡", "曲依乡", "千万贯乡", "五官乡", "上田坝乡", "大坪子乡", "簸箕梁子乡", "小沟乡", "莫红乡", "克觉乡", "坪头乡", "雷池乡", "巴姑乡", "咪姑乡", "一车乡", "斯古溪乡", "卡哈洛乡", "元宝山乡", "大岩洞乡", "岩脚乡"]]], [[["后巢乡", "云关乡", "小碧布依族苗族乡", "永乐乡", "新华社区服务中心", "西湖社区服务中心", "水口寺社区服务中心", "大南社区服务中心", "中南社区服务中心", "市府社区服务中心", "河滨社区服务中心", "遵义社区服务中心", "兴关社区服务中心", "沙冲社区服务中心", "沙南社区服务中心", "太慈社区服务中心", "湘雅社区服务中心", "油榨社区服务中心", "中曹司社区服务中心", "二戈寨社区服务中心", "见龙社区服务中心", "龙洞社区服务中心", "花果园社区服务中心"], ["黔灵镇", "中华社区服务中心", "中环社区服务中心", "中东社区服务中心", "东山社区服务中心", "延中社区服务中心", "市西社区服务中心", "威清社区服务中心", "普陀社区服务中心", "北京路社区服务中心", "栖霞社区服务中心", "黔东社区服务中心", "宅吉社区服务中心", "省府社区服务中心", "金狮社区服务中心", "中天社区服务中心", "贵乌社区服务中心", "头桥社区服务中心", "金龙社区服务中心", "圣泉社区服务中心", "三桥社区服务中心", "金关社区服务中心", "蔡关社区服务中心", "荷塘社区服务中心", "普天社区服务中心", "金鸭社区服务中心", "金惠社区服务中心", "水东社区服务中心"], ["青岩镇", "石板镇", "党武镇", "麦坪镇", "燕楼镇", "孟关苗族布依族乡", "湖潮苗族布依族乡", "久安乡", "高坡苗族乡", "黔陶布依族苗族乡", "马铃布依族苗族乡", "羊艾农场", "阳光社区服务中心", "贵筑社区服务中心", "溪北社区服务中心", "清溪社区服务中心", "明珠社区服务中心", "兴隆社区服务中心", "瑞华社区服务中心", "清浦社区服务中心", "黔江社区服务中心", "平桥社区服务中心", "航天社区服务中心", "航空社区服务中心", "金欣社区服务中心", "黄河社区服务中心", "三江社区服务中心", "小孟社区服务中心", "金竹社区服务中心", "花孟社区服务中心"], ["东风镇", "水田镇", "羊昌镇", "下坝镇", "新场镇", "百宜镇", "新堡布依族乡", "偏坡布依族乡", "顺新社区服务中心", "新天社区服务中心", "创新社区服务中心", "振新社区服务中心", "高新社区服务中心"], ["艳山红镇", "麦架镇", "沙文镇", "都拉布依族乡", "牛场布依族乡", "红云社区服务中心", "大山洞社区服务中心", "艳山红社区服务中心", "铝兴社区服务中心", "白沙关社区服务中心", "都新社区服务中心"], ["金华镇", "朱昌镇", "百花湖乡", "世纪城社区服务中心", "金源社区服务中心", "逸景社区服务中心", "碧海社区服务中心", "金麦社区服务中心", "新世界社区服务中心", "金华园社区服务中心", "金岭社区服务中心", "会展社区服务中心", "观山社区服务中心"], ["城关镇", "双流镇", "金中镇", "冯三镇", "楠木渡镇", "龙岗镇", "永温镇", "花梨镇", "南龙乡", "宅吉乡", "龙水乡", "米坪乡", "禾丰布依族苗族乡", "南江布依族苗族乡", "高寨苗族布依族乡", "毛云乡", "紫兴社区服务中心", "南山社区服务中心"], ["永靖镇", "温泉镇", "九庄镇", "小寨坝镇", "西山镇", "养龙司镇", "石硐镇", "鹿窝镇", "流长镇", "青山苗族乡", "新华社区服务中心"], ["龙场镇", "扎佐镇", "久长镇", "六广镇", "六屯镇", "洒坪镇", "六桶镇", "谷堡乡", "小箐乡", "大石布依族乡", "龙岗社区服务中心", "珍珠河社区服务中心"], ["红枫湖镇", "站街镇", "卫城镇", "新店镇", "暗流镇", "犁倭镇", "麦格苗族布依族乡", "王庄布依族苗族乡", "流长苗族乡", "新岭社区服务中心", "红塔社区服务中心", "巢凤社区服务中心", "百花社区服务中心", "红新社区服务中心"]], [["大河镇", "汪家寨镇", "大湾镇", "建设路社区服务中心", "黄土坡社区服务中心", "红岩社区服务中心", "荷泉社区服务中心", "荷城社区服务中心", "杉树林社区服务中心", "杨柳社区服务中心", "场坝社区服务中心", "凤凰社区服务中心", "广场社区服务中心", "明湖社区服务中心", "德坞社区服务中心", "西宁社区服务中心", "月照社区服务中心", "石桥社区服务中心", "双戛社区服务中心"], ["九龙街道", "银壶街道", "塔山街道", "岩脚镇", "木岗镇", "大用镇", "关寨镇", "牂牁镇", "新华镇", "龙河镇", "新窑镇", "郎岱镇", "梭戛苗族彝族回族乡", "牛场苗族彝族乡", "新场乡", "中寨苗族彝族布依族乡", "落别布依族彝族乡", "月亮河彝族布依族苗族乡"], ["双水街道", "尖山街道", "老鹰山街道", "董地街道", "比德镇", "化乐镇", "蟠龙镇", "阿戛镇", "勺米镇", "玉舍镇", "都格镇", "发耳镇", "鸡场镇", "木果镇", "保华镇", "陡箐镇", "米箩镇", "南开苗族彝族乡", "青林苗族彝族乡", "金盆苗族彝族乡", "坪寨彝族乡", "龙场苗族白族彝族乡", "营盘苗族彝族白族乡", "顺场苗族彝族布依族乡", "花戛苗族布依族彝族乡", "杨梅彝族苗族回族乡", "新街彝族苗族布依族乡", "野钟苗族彝族布依族乡", "果布戛彝族苗族布依族乡", "猴场苗族布依族乡"], ["亦资街道", "翰林街道", "两河街道", "红果街道", "胜境街道", "刘官街道", "民主镇", "大山镇", "保田镇", "石桥镇", "响水镇", "柏果镇", "新民镇", "盘关镇", "竹海镇", "英武镇", "鸡场坪镇", "双凤镇", "丹霞镇", "乌蒙镇", "普田回族乡", "坪地彝族乡", "淤泥彝族乡", "普古彝族苗族乡", "旧营白族彝族苗族乡", "羊场布依族白族苗族乡", "保基苗族彝族乡"]], [["老城街道", "万里路街道", "中华路街道", "迎红街道", "延安路街道", "舟水桥街道", "中山路街道", "北京路街道", "长征街道", "礼仪街道", "南关街道", "忠庄街道", "新蒲街道", "巷口镇", "海龙镇", "深溪镇", "金鼎山镇", "新舟镇", "虾子镇", "三渡镇", "永乐镇", "喇叭镇"], ["上海路街道", "洗马路街道", "大连路街道", "高桥街道", "董公寺街道", "高坪街道", "团泽镇", "板桥镇", "泗渡镇", "沙湾镇", "山盆镇", "芝麻镇", "松林镇", "毛石镇"], ["南白镇", "龙坑镇", "三岔镇", "苟江镇", "三合镇", "乌江镇", "龙坪镇", "团溪镇", "铁厂镇", "西坪镇", "尚嵇镇", "茅栗镇", "新民镇", "鸭溪镇", "石板镇", "乐山镇", "枫香镇", "泮水镇", "马蹄镇", "平正仡佬族乡", "洪关苗族乡"], ["海校街道", "娄山关街道", "楚米镇", "新站镇", "松坎镇", "高桥镇", "水坝塘镇", "官仓镇", "花秋镇", "羊磴镇", "九坝镇", "大河镇", "夜郎镇", "木瓜镇", "坡渡镇", "燎原镇", "狮溪镇", "茅石镇", "尧龙山镇", "风水镇", "容光镇", "芭蕉镇", "小水乡", "黄莲乡", "马鬃苗族乡"], ["洋川镇", "郑场镇", "旺草镇", "蒲场镇", "风华镇", "茅垭镇", "枧坝镇", "宽阔镇", "黄杨镇", "青杠塘镇", "太白镇", "温泉镇", "坪乐镇", "大路槽乡", "小关乡"], ["凤仪街道", "瑞溪镇", "和溪镇", "安场镇", "土坪镇", "流渡镇", "格林镇", "新州镇", "庙塘镇", "小雅镇", "中观镇", "芙蓉江镇", "班竹镇", "碧峰镇", "乐俭镇", "杨兴镇", "桴镇", "谢坝仡佬族苗族乡", "市坪苗族仡佬族乡"], ["玉溪镇", "三江镇", "隆兴镇", "旧城镇", "忠信镇", "洛龙镇", "阳溪镇", "三桥镇", "大磏镇", "平模镇", "上坝土家族乡", "棕坪乡", "桃源乡", "河口乡"], ["丹砂街道", "都濡街道", "大坪街道", "丰乐镇", "黄都镇", "涪洋镇", "镇南镇", "砚山镇", "浞水镇", "茅天镇", "柏村镇", "泥高镇", "分水镇", "蕉坝镇", "红丝乡", "石朝乡"], ["龙泉镇", "进化镇", "琊川镇", "蜂岩镇", "永和镇", "花坪镇", "绥阳镇", "土溪镇", "永安镇", "何坝镇", "天桥镇", "王寨镇", "新建镇", "石径乡"], ["湄江街道", "黄家坝街道", "鱼泉街道", "永兴镇", "复兴镇", "马山镇", "高台镇", "茅坪镇", "兴隆镇", "新南镇", "石莲镇", "西河镇", "洗马镇", "抄乐镇", "天城镇"], ["子营街道", "龙溪镇", "构皮滩镇", "大乌江镇", "敖溪镇", "龙家镇", "松烟镇", "关兴镇", "白泥镇", "花山苗族乡"], ["东皇街道", "九龙街道", "杉王街道", "马临街道", "土城镇", "同民镇", "醒民镇", "隆兴镇", "习酒镇", "回龙镇", "桑木镇", "永安镇", "良村镇", "温水镇", "仙源镇", "官店镇", "寨坝镇", "民化镇", "二郎镇", "二里镇", "三岔河镇", "大坡镇", "桃林镇", "程寨镇", "双龙乡", "坭坝乡"], ["市中街道", "文华街道", "金华街道", "天台镇", "复兴镇", "大同镇", "旺隆镇", "葫市镇", "元厚镇", "官渡镇", "长期镇", "长沙镇", "两河口镇", "丙安镇", "宝源乡", "石堡乡", "白云乡"], ["盐津街道", "中枢街道", "苍龙街道", "坛厂街道", "鲁班街道", "长岗镇", "五马镇", "茅坝镇", "九仓镇", "喜头镇", "大坝镇", "三合镇", "合马镇", "火石镇", "学孔镇", "龙井镇", "美酒河镇", "高大坪镇", "茅台镇", "后山苗族布依族乡"]], [["南街街道", "东街街道", "西街街道", "北街街道", "东关街道", "华西街道", "西航街道", "宋旗镇", "幺铺镇", "宁谷镇", "龙宫镇", "双堡镇", "大西桥镇", "七眼桥镇", "蔡官镇", "轿子山镇", "旧州镇", "新场布依族苗族乡", "岩腊苗族布依族乡", "鸡场布依族苗族乡", "杨武布依族苗族乡", "东屯乡", "黄腊布依族苗族乡", "刘官乡"], ["安平街道", "鼓楼街道", "白云镇", "高峰镇", "天龙镇", "夏云镇", "马场镇", "乐平镇", "齐伯镇", "十字回族苗族乡", "羊昌布依族苗族乡"], ["定南街道", "穿洞街道", "黄桶街道", "马官镇", "化处镇", "马场镇", "白岩镇", "坪上镇", "鸡场坡镇", "补郎苗族乡", "猴场苗族仡佬族乡", "猫洞苗族仡佬族乡"], ["白马湖街道", "环翠街道", "丁旗街道", "双龙山街道", "黄果树镇", "马厂镇", "良田镇", "扁担山镇", "募役镇", "江龙镇", "本寨镇", "六马镇", "沙子乡", "革利乡", "简嘎乡"], ["顶云街道", "关索街道", "龙潭街道", "永宁镇", "岗乌镇", "上关镇", "坡贡镇", "白水镇", "新铺镇", "沙营镇", "花江镇", "断桥镇", "普利乡"], ["松山街道", "五峰街道", "格凸河镇", "猴场镇", "猫营镇", "板当镇", "宗地镇", "大营镇", "坝羊镇", "火花镇", "白石岩乡", "四大寨乡"]], [["市西街道", "市东街道", "三板桥街道", "大新桥街道", "观音桥街道", "洪山街道", "麻园街道", "碧阳街道", "德溪街道", "碧海街道", "鸭池镇", "梨树镇", "岔河镇", "朱昌镇", "田坝镇", "长春堡镇", "撒拉溪镇", "杨家湾镇", "放珠镇", "青场镇", "水箐镇", "何官屯镇", "对坡镇", "大银镇", "林口镇", "生机镇", "清水铺镇", "亮岩镇", "燕子口镇", "八寨镇", "田坝桥镇", "海子街镇", "小坝镇", "层台镇", "小吉场镇", "普宜镇", "龙场营镇", "千溪彝族苗族白族乡", "阴底彝族苗族白族乡", "野角乡", "大河乡", "团结彝族苗族乡", "阿市苗族彝族乡", "大屯彝族乡", "田坎彝族乡"], ["红旗街道", "顺德街道", "慕俄格古城街道", "双山镇", "猫场镇", "马场镇", "羊场镇", "黄泥塘镇", "六龙镇", "达溪镇", "瓢井镇", "长石镇", "对江镇", "东关乡", "竹园彝族苗族乡", "响水白族彝族仡佬族乡", "文阁乡", "绿塘乡", "鼎新彝族苗族乡", "牛场苗族彝族乡", "小屯乡", "理化苗族彝族乡", "凤山彝族蒙古族乡", "安乐彝族仡佬族乡", "核桃彝族白族乡", "八堡彝族苗族乡", "兴隆苗族乡", "果瓦乡", "大山苗族彝族乡", "雨冲乡", "黄泥彝族苗族满族乡", "大水彝族苗族布依族乡", "沙厂彝族乡", "普底彝族苗族白族乡", "百纳彝族乡", "三元彝族苗族白族乡", "星宿苗族彝族仡佬族乡"], ["莲城街道", "水西街道", "文峰街道", "杜鹃街道", "金碧镇", "雨朵镇", "大关镇", "谷里镇", "素朴镇", "中坪镇", "重新镇", "林泉镇", "金兰镇", "甘棠镇", "洪水镇", "锦星镇", "钟山镇", "协和镇", "观音洞镇", "五里布依族苗族乡", "绿化白族彝族乡", "新仁苗族乡", "铁石苗族彝族乡", "太来彝族苗族乡", "永燊彝族苗族乡", "中建苗族彝族乡", "花溪彝族苗族乡", "定新彝族苗族乡", "金坡苗族彝族满族乡", "仁和彝族苗族乡", "红林彝族苗族乡"], ["西洛街道", "岩孔街道", "五龙街道", "鼓场街道", "安底镇", "沙土镇", "禹谟镇", "岚头镇", "清池镇", "柳塘镇", "平坝镇", "源村镇", "高坪镇", "化觉镇", "茶园镇", "木孔镇", "长坝镇", "后山镇", "石场苗族彝族乡", "桂花乡", "太平彝族苗族乡", "安洛苗族彝族满族乡", "新化苗族彝族满族乡", "大田彝族苗族布依族乡", "马路彝族苗族乡"], ["双堰街道", "文腾街道", "金凤街道", "三甲街道", "绮陌街道", "八步街道", "桂果镇", "牛场镇", "猫场镇", "化起镇", "龙场镇", "以那镇", "三塘镇", "阿弓镇", "珠藏镇", "中寨镇", "马场镇", "板桥镇", "白泥镇", "少普镇", "熊家场镇", "黑土镇", "自强苗族乡", "大平苗族彝族乡", "官寨苗族乡", "茶店布依族苗族彝族乡", "金龙苗族彝族布依族乡", "后寨苗族乡", "鸡场苗族彝族乡", "实兴乡", "上坪寨乡", "纳雍乡"], ["雍熙街道", "文昌街道", "居仁街道", "中岭镇", "阳长镇", "维新镇", "龙场镇", "乐治镇", "百兴镇", "张家湾镇", "勺窝镇", "寨乐镇", "玉龙坝镇", "沙包镇", "水东镇", "曙光镇", "新房彝族苗族乡", "厍东关彝族白族苗族乡", "董地苗族彝族乡", "化作苗族彝族乡", "姑开苗族彝族乡", "羊场苗族彝族乡", "锅圈岩苗族彝族乡", "昆寨苗族彝族白族乡", "左鸠戛彝族苗族乡", "猪场苗族彝族乡"], ["海边街道", "五里岗街道", "六桥街道", "陕桥街道", "草海镇", "么站镇", "金钟镇", "炉山镇", "龙场镇", "黑石头镇", "哲觉镇", "观风海镇", "牛棚镇", "迤那镇", "中水镇", "龙街镇", "雪山镇", "羊街镇", "小海镇", "盐仓镇", "东风镇", "二塘镇", "猴场镇", "秀水镇", "双龙镇", "麻乍镇", "兔街镇", "海拉镇", "玉龙镇", "哈喇河镇", "斗古镇", "金斗镇", "岔河镇", "黑土河镇", "新发布依族乡", "石门乡", "云贵乡", "板底乡", "大街乡"], ["城关镇", "白果镇", "妈姑镇", "财神镇", "六曲河镇", "野马川镇", "达依乡", "水塘堡彝族苗族乡", "兴发苗族彝族回族乡", "松林坡白族彝族苗族乡", "雉街彝族苗族乡", "珠市彝族乡", "罗州乡", "双坪彝族苗族乡", "铁匠苗族乡", "辅处彝族苗族乡", "可乐彝族苗族乡", "河镇彝族苗族乡", "德卓乡", "安乐溪乡", "朱明乡", "结构彝族苗族乡", "古基乡", "哲庄乡", "平山乡", "古达苗族彝族乡", "威奢乡"]], [["市中", "环北", "河西", "灯塔", "川硐", "坝黄镇", "云场坪镇", "漾头镇", "桐木坪乡", "滑石乡", "和平乡", "瓦屋乡", "六龙山乡"], ["谢桥街道", "茶店街道", "仁山街道", "万山镇", "高楼坪侗族乡", "黄道侗族乡", "敖寨侗族乡", "下溪侗族乡", "鱼塘侗族苗族乡", "大坪侗族土家族苗族乡"], ["双江街道", "凯德街道", "闵孝镇", "太平镇", "坝盘镇", "民和镇", "桃映镇", "怒溪镇", "德旺土家族苗族乡", "官和侗族土家族苗族乡"], ["皂角坪街道", "平溪街道", "新店镇", "大龙镇", "朱家场镇", "田坪镇", "亚鱼乡"], ["汤山街道", "泉都街道", "中坝街道", "本庄镇", "白沙镇", "龙塘镇", "花桥镇", "五德镇", "河坝镇", "国荣乡", "聚凤仡佬族侗族乡", "龙井侗族仡佬族乡", "大沙坝仡佬族侗族乡", "枫香侗族仡佬族乡", "青阳苗族仡佬族侗族乡", "石固仡佬族侗族乡", "坪地场仡佬族侗族乡", "甘溪仡佬族侗族乡", "坪山仡佬族侗族乡"], ["思唐街道", "关中坝街道", "双塘街道", "塘头镇", "许家坝镇", "大坝场镇", "文家店镇", "鹦鹉溪镇", "合朋溪镇", "张家寨镇", "孙家坝镇", "青杠坡镇", "瓮溪镇", "凉水井镇", "邵家桥镇", "大河坝镇", "亭子坝镇", "香坝镇", "长坝镇", "板桥镇", "思林土家族苗族乡", "胡家湾苗族土家族乡", "宽坪苗族土家族乡", "枫芸土家族苗族乡", "三道水土家族苗族乡", "天桥土家族苗族乡", "兴隆土家族苗族乡", "杨家坳苗族土家族乡"], ["峨岭街道", "龙津街道", "中兴街道", "板溪镇", "沙子坡镇", "天堂镇", "木黄镇", "合水镇", "朗溪镇", "缠溪镇", "洋溪镇", "新寨镇", "杉树镇", "刀坝镇", "紫薇镇", "杨柳镇", "罗场乡"], ["青龙街道", "玉水街道", "煎茶镇", "潮砥镇", "枫香溪镇", "稳坪镇", "复兴镇", "合兴镇", "高山镇", "泉口镇", "长堡镇", "共和镇", "平原镇", "荆角土家族乡", "堰塘土家族乡", "龙泉土家族乡", "钱家土家族乡", "沙溪土家族乡", "楠杆土家族乡", "长丰土家族乡", "桶井土家族乡"], ["团结街道", "和平街道", "沙子街道", "黑水镇", "谯家镇", "夹石镇", "淇滩镇", "官舟镇", "土地坳镇", "思渠镇", "客田镇", "洪渡镇", "中界镇", "甘溪镇", "板场镇", "泉坝镇", "中寨镇", "黄土镇", "新景镇", "塘坝镇", "晓景乡", "后坪乡"], ["大兴街道", "蓼皋街道", "世昌街道", "太平营街道", "九江街道", "盘石镇", "盘信镇", "大坪场镇", "普觉镇", "寨英镇", "孟溪镇", "乌罗镇", "甘龙镇", "长兴堡镇", "迓驾镇", "牛郎镇", "黄板镇", "平头镇", "大路镇", "木树镇", "冷水溪镇", "正大镇", "长坪乡", "妙隘乡", "石梁乡", "瓦溪乡", "永安乡", "沙坝河乡"]], [["黄草街道", "兴泰街道", "桔山街道", "丰都街道", "坪东街道", "木贾街道", "下五屯街道", "万峰林街道", "敬南镇", "泥凼镇", "南盘江镇", "捧乍镇", "鲁布格镇", "三江口镇", "乌沙镇", "白碗窑镇", "马岭镇", "威舍镇", "清水河镇", "顶效镇", "郑屯镇", "万屯镇", "鲁屯镇", "仓更镇", "七舍镇", "则戎乡", "沧江乡", "洛万乡", "猪场坪乡", "雄武乡"], ["东湖街道", "城南街道", "真武山街道", "城北街道", "屯脚镇", "巴铃镇", "百德镇", "雨樟镇", "潘家庄镇", "回龙镇", "下山镇", "新龙场镇", "大山镇", "马马崖镇", "波阳镇", "鲁础营回族乡"], ["盘水街道", "南湖街道", "龙吟镇", "江西坡镇", "地瓜镇", "楼下镇", "兴中镇", "青山镇", "罗汉镇", "新店镇", "白沙乡", "高棉乡"], ["东观街道", "莲城街道", "沙子镇", "碧痕镇", "大厂镇", "鸡场镇", "花贡镇", "中营镇", "光照镇", "茶马镇", "长流乡", "紫马乡", "安谷乡", "三宝彝族乡"], ["永丰街道", "珉谷街道", "龙场镇", "者相镇", "北盘江镇", "白层镇", "鲁贡镇", "小屯镇", "长田镇", "沙坪镇", "挽澜镇", "连环乡", "平街乡", "鲁容乡"], ["王母街道", "平洞街道", "新屯街道", "乐元镇", "打易镇", "乐旺镇", "桑郎镇", "麻山镇", "石屯镇", "蔗香镇", "郊纳镇", "大观镇", "边饶镇", "昂武镇", "油迈瑶族乡"], ["者楼街道", "纳福街道", "丫他镇", "巧马镇", "秧坝镇", "岩架镇", "八渡镇", "冗渡镇", "坡妹镇", "双江镇", "弼佑镇", "百口乡"], ["招堤街道", "栖凤街道", "钱相街道", "龙广镇", "德卧镇", "万峰湖镇", "木咱镇", "洒雨镇", "普坪镇", "龙山镇", "新桥镇", "海子镇", "笃山镇"]], [["城西街道", "大十字街道", "西门街道", "洗马河街道", "湾溪街道", "鸭塘街道", "开怀街道", "三棵树镇", "舟溪镇", "旁海镇", "湾水镇", "炉山镇", "万潮镇", "龙场镇", "碧波镇", "下司镇", "凯棠镇", "大风洞镇"], ["新州镇", "旧州镇", "重安镇", "谷陇镇", "平溪镇", "野洞河镇", "浪洞镇", "上塘镇", "一碗水乡", "纸房乡", "翁坪乡"], ["城关镇", "杨柳塘镇", "双井镇", "牛大场镇", "马号镇", "白垛乡", "甘溪乡", "马溪乡"], ["八弓镇", "台烈镇", "瓦寨镇", "桐林镇", "雪洞镇", "长吉镇", "良上镇", "滚马乡", "款场乡"], ["舞阳镇", "蕉溪镇", "青溪镇", "羊坪镇", "羊场镇", "都坪镇", "金堡镇", "江古镇", "涌溪乡", "报京乡", "大地乡", "尚寨土家族乡"], ["思旸镇", "水尾镇", "天马镇", "龙田镇", "大有镇", "注溪镇", "凯本镇", "平庄镇", "客楼镇", "天星乡", "羊桥土家族乡"], ["凤城街道", "邦洞街道", "社学街道", "坪地镇", "兰田镇", "瓮洞镇", "高酿镇", "石洞镇", "远口镇", "坌处镇", "白市镇", "渡马镇", "江东镇", "竹林镇", "注溪乡", "地湖乡"], ["三江镇", "茅坪镇", "敦寨镇", "启蒙镇", "平秋镇", "铜鼓镇", "平略镇", "大同乡", "新化乡", "隆里乡", "钟灵乡", "偶里乡", "固本乡", "河口乡", "彦洞乡"], ["仰阿莎街道", "柳川镇", "岑松镇", "南加镇", "南明镇", "革东镇", "太拥镇", "磻溪镇", "久仰镇", "南哨镇", "南寨镇", "观么镇", "敏洞乡"], ["台拱街道", "萃文街道", "施洞镇", "南宫镇", "革一镇", "方召镇", "排羊乡", "台盘乡", "老屯乡"], ["德凤街道", "高屯街道", "中潮镇", "孟彦镇", "敖市镇", "九潮镇", "岩洞镇", "水口镇", "洪州镇", "尚重镇", "双江镇", "肇兴镇", "龙额镇", "永从镇", "茅贡镇", "地坪镇", "顺化瑶族乡", "雷洞瑶族水族乡", "罗里乡", "坝寨乡", "口江乡", "德顺乡", "大稼乡", "平寨乡", "德化乡"], ["古州镇", "忠诚镇", "寨蒿镇", "平永镇", "乐里镇", "朗洞镇", "栽麻镇", "平江镇", "八开镇", "崇义乡", "三江水族乡", "仁里水族乡", "塔石瑶族水族乡", "定威水族乡", "兴华水族乡", "计划乡", "水尾水族乡", "平阳乡", "两汪乡"], ["丙妹镇", "贯洞镇", "洛香镇", "下江镇", "宰便镇", "西山镇", "停洞镇", "往洞镇", "庆云镇", "斗里镇", "东朗镇", "加鸠镇", "高增乡", "谷坪乡", "刚边壮族乡", "加榜乡", "秀塘壮族乡", "翠里瑶族壮族乡", "加勉乡"], ["丹江镇", "西江镇", "永乐镇", "郎德镇", "大塘镇", "望丰乡", "达地水族乡", "方祥乡"], ["杏山街道", "金竹街道", "谷硐镇", "宣威镇", "龙山镇", "贤昌镇", "坝芒布依族乡"], ["龙泉镇", "兴仁镇", "排调镇", "扬武镇", "雅灰乡", "南皋乡"]], [["广惠街道", "文峰街道", "小围寨街道", "沙包堡街道", "绿茵湖街道", "墨冲镇", "平浪镇", "毛尖镇", "匀东镇", "归兰水族乡"], ["金山", "马场坪", "凤山镇", "陆坪镇", "龙昌镇", "牛场镇", "道坪镇", "仙桥乡"], ["玉屏街道", "朝阳镇", "茂兰镇", "甲良镇", "佳荣镇", "小七孔镇", "瑶山瑶族乡", "黎明关水族乡"], ["金南街道", "宝山街道", "新巴镇", "德新镇", "盘江镇", "沿山镇", "昌明镇", "云雾镇"], ["雍阳街道", "瓮水街道", "平定营镇", "中坪镇", "建中镇", "永和镇", "珠藏镇", "玉山镇", "天文镇", "银盏镇", "猴场镇", "江界河镇", "岚关乡"], ["百泉镇", "影山镇", "基长镇", "下司镇", "麻尾镇", "麻万镇", "上司镇", "玉水镇"], ["金盆街道", "平舟镇", "牙舟镇", "通州镇", "大塘镇", "克度镇", "塘边镇", "甲茶镇", "者密镇", "掌布镇", "卡蒲毛南族乡"], ["斛兴街道", "龙坪镇", "边阳镇", "沫阳镇", "逢亭镇", "罗悃镇", "茂井镇", "红水河镇", "木引镇", "凤亭乡"], ["长寨街道", "广顺镇", "摆所镇", "代化镇", "白云山镇", "鼓扬镇", "敦操乡"], ["冠山街道", "龙山镇", "醒狮镇", "谷脚镇", "湾滩河镇", "洗马镇"], ["涟江街道", "濛江街道", "好花红镇", "摆金镇", "雅水镇", "断杉镇", "芦山镇", "王佑镇", "羡塘镇", "岗度镇"], ["三合街道", "大河镇", "普安镇", "都江镇", "中和镇", "周覃镇", "九阡镇"]]], [[["华山街道", "护国街道", "大观街道", "龙翔街道", "丰宁街道", "莲华街道", "红云街道", "黑林铺街道", "普吉街道", "西翥街道", "昆明国家高新技术产业开发区"], ["拓东街道", "鼓楼街道", "东华街道", "联盟街道", "金辰街道", "青云街道", "龙泉街道", "茨坝街道", "双龙街道", "松华街道", "盘龙区滇源街道", "盘龙区阿子营街道"], ["关上街道", "太和街道", "吴井街道", "金马街道", "小板桥街道", "官渡街道", "矣六街道", "六甲街道", "大板桥街道", "阿拉街道", "昆明经济技术开发区"], ["西苑街道", "马街街道", "金碧街道", "永昌街道", "前卫街道", "福海街道", "棕树营街道", "碧鸡街道", "海口街道", "团结街道", "昆明滇池国家旅游度假区"], ["铜都街道", "汤丹镇", "因民镇", "阿旺镇", "乌龙镇", "红土地镇", "拖布卡镇", "舍块乡"], ["龙城街道", "洛龙街道", "斗南街道", "乌龙街道", "吴家营街道", "雨花街道", "七甸街道", "洛羊街道", "大渔街道", "马金铺街道"], ["昆阳街道", "晋城镇", "二街镇", "上蒜镇", "六街镇", "双河彝族乡", "夕阳彝族乡"], ["永定街道", "罗免镇", "赤鹫镇", "东村镇", "款庄镇", "散旦镇"], ["匡远街道", "汤池街道", "北古城镇", "狗街镇", "竹山镇", "马街镇", "耿家营乡", "九乡乡", "昆明阳宗海风景名胜区"], ["鹿阜街道", "西街口镇", "长湖镇", "圭山镇", "大可乡"], ["嵩阳街道", "小街镇", "杨林镇", "牛栏江镇", "嵩明杨林经济技术开发区", "云南省嵩明职业教育基地"], ["屏山街道", "撒营盘镇", "转龙镇", "茂山镇", "团街镇", "中屏镇", "皎平渡镇", "乌东德镇", "翠华镇", "九龙镇", "云龙乡", "汤郎乡", "马鹿塘乡", "则黑乡", "乌蒙乡", "雪山乡", "禄劝工业园区管理委员会"], ["仁德街道", "羊街镇", "柯渡镇", "倘甸镇", "功山镇", "河口镇", "七星镇", "先锋镇", "鸡街镇", "凤合镇", "六哨乡", "联合乡", "金源乡", "甸沙乡", "昆明倘甸产业园区轿子山旅游开发区"], ["连然街道", "金方街道", "八街街道", "温泉街道", "青龙街道", "禄脿街道", "草铺街道", "太平新城街道", "县街街道"]], [["南宁街道", "建宁街道", "白石江街道", "寥廓街道", "西城街道", "益宁街道", "文华街道", "太和街道", "潇湘街道", "翠峰街道", "三宝街道", "沿江街道", "珠街街道", "越州镇", "东山镇", "茨营镇"], ["西平街道", "龙华街道", "金龙街道", "花山街道", "白水镇", "盘江镇", "炎方乡", "播乐乡", "大坡乡", "菱角乡", "德泽乡"], ["通泉街道", "鸡头村街道", "王家庄街道", "张安屯街道", "旧县街道", "马过河镇", "纳章镇", "马鸣乡", "大庄乡", "月望乡"], ["中枢街道", "同乐街道", "板桥镇", "三岔河镇", "马街镇", "召夸镇", "大莫古镇", "芳华镇", "小百户镇", "活水乡", "龙海乡", "陆良华侨管理区（镇）"], ["丹凤街道", "漾月街道", "大同街道", "雄壁镇", "葵山镇", "彩云镇", "竹基镇", "龙庆乡", "五龙乡", "高良乡"], ["罗雄街道", "腊山街道", "九龙街道", "板桥镇", "马街镇", "富乐镇", "阿岗镇", "大水井乡", "鲁布革乡", "旧屋基乡", "钟山乡", "长底乡", "老厂乡"], ["中安街道", "胜境街道", "营上镇", "黄泥河镇", "竹园镇", "后所镇", "大河镇", "墨红镇", "富村镇", "十八连山镇", "老厂镇", "古敢乡"], ["古城街道", "宝云街道", "金钟街道", "娜姑镇", "迤车镇", "乐业镇", "矿山镇", "者海镇", "大井镇", "待补镇", "大海乡", "老厂乡", "五星乡", "大桥乡", "纸厂乡", "马路乡", "火红乡", "新街乡", "雨碌乡", "鲁纳乡", "上村乡", "驾车乡", "田坝乡"], ["宛水街道", "西宁街道", "双龙街道", "虹桥街道", "丰华街道", "板桥街道", "来宾街道", "凤凰街道", "格宜镇", "田坝镇", "羊场镇", "倘塘镇", "落水镇", "务德镇", "海岱镇", "龙场镇", "龙潭镇", "热水镇", "宝山镇", "东山镇", "普立乡", "西泽乡", "得禄乡", "杨柳乡", "双河乡", "乐丰乡", "文兴乡", "阿都乡"]], [["玉兴路街道", "凤凰路街道", "玉带路街道", "北城街道", "春和街道", "李棋街道", "大营街街道", "研和街道", "高仓街道", "小石桥乡", "洛河乡"], ["大街街道", "江城镇", "前卫镇", "九溪镇", "路居镇", "安化彝族乡", "雄关乡"], ["凤麓街道", "龙街街道", "右所镇", "阳宗镇", "海口镇", "九村镇"], ["秀山街道", "九龙街道", "杨广镇", "河西镇", "四街镇", "纳古镇", "里山乡", "高大乡", "兴蒙乡"], ["宁州街道", "盘溪镇", "华溪镇", "青龙镇", "通红甸乡"], ["龙泉街道", "六街街道", "绿汁镇", "浦贝彝族乡", "十街彝族乡", "铜厂彝族乡", "小街乡"], ["双江街道", "小街街道", "甸中镇", "化念镇", "塔甸镇", "岔河乡", "大龙潭乡", "富良棚乡"], ["桂山街道", "古城街道", "扬武镇", "漠沙镇", "戛洒镇", "水塘镇", "平甸乡", "新化乡", "建兴乡", "老厂乡", "者竜乡", "平掌乡"], ["红河街道", "澧江街道", "甘庄街道", "曼来镇", "因远镇", "龙潭乡", "羊街乡", "那诺乡", "洼垤乡", "咪哩乡"]], [["兰城街道", "永昌街道", "九隆街道", "青华街道", "板桥镇", "河图镇", "汉庄镇", "蒲缥镇", "瓦窑镇", "潞江镇", "金鸡乡", "辛街乡", "西邑乡", "丙麻乡", "瓦渡乡", "水寨乡", "瓦马彝族白族乡", "瓦房彝族苗族乡", "杨柳白族彝族乡", "芒宽彝族傣族乡", "保山工贸园区", "保山市高黎贡山旅游渡假区"], ["甸阳镇", "由旺镇", "姚关镇", "仁和镇", "太平镇", "万兴乡", "摆榔彝族布朗族乡", "酒房乡", "旧城乡", "木老元布朗族彝族乡", "老麦乡", "何元乡", "水长乡", "保山市水长工业园区"], ["龙山镇", "镇安镇", "勐糯镇", "腊勐镇", "象达镇", "龙江乡", "碧寨乡", "龙新乡", "平达乡", "木城彝族傈僳族乡"], ["田园镇", "漭水镇", "柯街镇", "卡斯镇", "勐统镇", "温泉镇", "大田坝镇", "鸡飞镇", "翁堵镇", "湾甸傣族乡", "更戛乡", "珠街彝族乡", "耈街彝族苗族乡"], ["腾越镇", "固东镇", "滇滩镇", "猴桥镇", "和顺镇", "界头镇", "曲石镇", "明光镇", "中和镇", "芒棒镇", "荷花镇", "马站乡", "北海乡", "清水乡", "五合乡", "新华乡", "蒲川乡", "团田乡"]], [["凤凰街道", "龙泉街道", "太平街道", "旧圃镇", "永丰镇", "北闸镇", "盘河镇", "靖安镇", "洒渔镇", "乐居镇", "苏家院镇", "大山包镇", "炎山镇", "布嘎回族乡", "守望回族乡", "小龙洞回族彝族乡", "青岗岭回族彝族乡", "苏甲乡", "大寨子乡", "田坝乡"], ["文屏镇", "水磨镇", "龙头山镇", "小寨镇", "江底镇", "火德红镇", "龙树镇", "新街镇", "梭山镇", "乐红镇", "桃源回族乡", "茨院回族乡"], ["白鹤滩镇", "大寨镇", "小河镇", "药山镇", "马树镇", "老店镇", "茂租镇", "东坪镇", "新店镇", "崇溪镇", "金塘镇", "蒙姑镇", "红山乡", "包谷垴乡", "中寨乡", "炉房乡"], ["盐井镇", "普洱镇", "豆沙镇", "中和镇", "庙坝镇", "柿子镇", "兴隆乡", "落雁乡", "滩头乡", "牛寨乡"], ["翠华镇", "玉碗镇", "吉利镇", "天星镇", "木杆镇", "悦乐镇", "寿山镇", "高桥镇", "上高桥回族彝族苗族乡"], ["溪洛渡镇", "桧溪镇", "黄华镇", "茂林镇", "大兴镇", "莲峰镇", "务基镇", "码口镇", "团结乡", "细沙乡", "青胜乡", "马楠苗族彝族乡", "水竹乡", "墨翰乡", "伍寨彝族苗族乡"], ["中城镇", "南岸镇", "新滩镇", "会仪镇", "板栗镇"], ["乌峰街道", "南台街道", "旧府街道", "泼机镇", "黑树镇", "母享镇", "大湾镇", "以勒镇", "赤水源镇", "芒部镇", "雨河镇", "罗坎镇", "牛场镇", "五德镇", "坡头镇", "以古镇", "场坝镇", "塘房镇", "中屯镇", "木卓镇", "盐源镇", "碗厂镇", "坪上镇", "鱼洞乡", "花朗乡", "尖山乡", "杉树乡", "花山乡", "果珠彝族乡", "林口彝族苗族乡"], ["角奎镇", "洛泽河镇", "牛街镇", "海子镇", "荞山镇", "龙安镇", "钟鸣镇", "两河镇", "小草坝镇", "龙海镇", "龙街苗族彝族乡", "奎香苗族彝族乡", "树林彝族苗族乡", "柳溪苗族乡", "洛旺乡"], ["扎西镇", "旧城镇", "罗布镇", "林凤镇", "长安镇", "庙沟镇", "水田镇", "双河苗族彝族乡", "高田乡", "三桃乡"], ["云富街道", "向家坝镇", "太平镇", "两碗镇"]], [["西安街道", "大研街道", "祥和街道", "束河街道", "金山街道", "开南街道", "文化街道", "金安镇", "七河镇", "大东乡", "金江白族乡"], ["黄山镇", "石鼓镇", "巨甸镇", "白沙镇", "拉市镇", "奉科镇", "鸣音镇", "太安乡", "龙蟠乡", "黎明傈僳族乡", "鲁甸乡", "塔城乡", "大具乡", "宝山乡", "石头白族乡", "九河白族乡"], ["永北镇", "仁和镇", "期纳镇", "三川镇", "程海镇", "涛源镇", "鲁地拉镇", "片角镇", "顺州镇", "羊坪彝族乡", "六德傈僳族彝族乡", "东山傈僳族彝族乡", "光华傈僳族彝族乡", "松坪傈僳族乡", "大安彝族纳西族乡"], ["中心镇", "荣将镇", "兴泉镇", "石龙坝镇", "新庄傈僳族傣族乡", "通达傈僳族乡", "永兴傈僳族乡", "船房傈僳族傣族乡"], ["大兴镇", "拉伯乡", "永宁乡", "翠玉傈僳族普米族乡", "红桥乡", "宁利乡", "金棉乡", "西川乡", "西布河乡", "战河乡", "永宁坪乡", "跑马坪乡", "蝉战河乡", "新营盘乡", "烂泥箐乡"]], [["思茅镇", "南屏镇", "倚象镇", "思茅港镇", "六顺镇", "龙潭彝族傣族乡", "云仙彝族乡"], ["宁洱镇", "磨黑镇", "德化镇", "同心镇", "勐先镇", "梅子镇", "德安乡", "普义乡", "黎明乡"], ["联珠镇", "通关镇", "龙坝镇", "新安镇", "团田镇", "新抚镇", "景星镇", "鱼塘镇", "文武镇", "坝溜镇", "泗南江镇", "雅邑镇", "孟弄彝族乡", "龙潭乡", "那哈乡"], ["锦屏镇", "文井镇", "漫湾镇", "大朝山东镇", "花山镇", "大街镇", "太忠镇", "文龙镇", "安定镇", "景福镇", "曼等乡", "龙街乡", "林街乡"], ["威远镇", "永平镇", "正兴镇", "民乐镇", "凤山镇", "景谷镇", "碧安乡", "益智乡", "半坡乡", "勐班乡"], ["恩乐镇", "按板镇", "勐大镇", "者东镇", "九甲镇", "古城镇", "振太镇", "和平镇", "田坝乡"], ["勐烈镇", "整董镇", "曲水镇", "宝藏镇", "康平镇", "国庆乡", "嘉禾乡"], ["娜允镇", "勐马镇", "芒信镇", "富岩镇", "景信乡", "公信乡"], ["勐朗镇", "上允镇", "糯扎渡镇", "惠民镇", "东回镇", "发展河哈尼族乡", "谦六彝族乡", "糯福乡", "东河乡", "大山乡", "南岭乡", "雪林佤族乡", "木戛乡", "酒井哈尼族乡", "拉巴乡", "竹塘乡", "富邦乡", "安康佤族乡", "文东佤族乡", "富东乡"], ["勐梭镇", "勐卡镇", "翁嘎科镇", "中课镇", "新厂镇", "力所拉祜族乡", "岳宋乡"]], [["凤翔街道", "忙畔街道", "博尚镇", "南美乡", "蚂蚁堆乡", "章驮乡", "圈内乡", "马台乡", "邦东乡", "平村乡"], ["凤山镇", "鲁史镇", "小湾镇", "营盘镇", "三岔河镇", "勐佑镇", "雪山镇", "洛党镇", "诗礼乡", "新华乡", "大寺乡", "腰街乡", "郭大寨乡"], ["爱华镇", "漫湾镇", "大朝山西镇", "涌宝镇", "茂兰镇", "幸福镇", "大寨镇", "忙怀乡", "晓街乡", "茶房乡", "栗树乡", "后箐乡", "幸福农场", "新城农场"], ["德党镇", "小勐统镇", "永康镇", "勐板乡", "亚练乡", "乌木龙乡", "大雪山乡", "班卡乡", "崇岗乡", "大山乡", "勐底农场"], ["凤尾镇", "勐捧镇", "南伞镇", "忙丙乡", "勐堆乡", "木场乡", "军赛乡"], ["勐勐镇", "勐库镇", "沙河乡", "大文乡", "忙糯乡", "邦丙乡"], ["耿马镇", "勐永镇", "勐撒镇", "孟定镇", "大兴乡", "芒洪乡", "四排山乡", "贺派乡", "勐简乡", "耿马华侨农场", "勐撒农场", "孟定农场"], ["勐董镇", "岩帅镇", "勐省镇", "芒卡镇", "单甲乡", "糯良乡", "勐来乡", "勐角乡", "班洪乡", "班老乡", "勐省农场"]], [["鹿城镇", "东瓜镇", "吕合镇", "紫溪镇", "东华镇", "子午镇", "苍岭镇", "三街镇", "八角镇", "中山镇", "新村镇", "西舍路镇", "树苴乡", "大过口乡", "大地基乡"], ["妥甸镇", "大庄镇", "法脿镇", "鄂嘉镇", "大麦地镇", "安龙堡乡", "爱尼山乡", "独田乡"], ["共和镇", "新桥镇", "江坡镇", "凤屯镇", "蟠猫乡", "戌街乡", "安乐乡"], ["龙川镇", "沙桥镇", "五街镇", "红土坡镇", "马街镇", "兔街镇", "雨露白族自治乡", "一街乡", "罗武庄乡", "五顶山乡"], ["栋川镇", "光禄镇", "前场镇", "弥兴镇", "太平镇", "官屯镇", "适中乡", "左门乡", "大河口乡"], ["金碧镇", "石羊镇", "六苴镇", "龙街镇", "新街镇", "赵家店镇", "三岔河镇", "桂花镇", "昙华乡", "湾碧傣族傈僳族自治乡", "铁锁乡", "三台乡"], ["永定镇", "宜就镇", "中和镇", "莲池乡", "维的乡", "猛虎乡", "永兴乡"], ["元马镇", "黄瓜园镇", "羊街镇", "老城乡", "物茂乡", "江边乡", "新华乡", "平田乡", "凉山乡", "姜驿乡"], ["狮山镇", "高桥镇", "猫街镇", "插甸镇", "白路镇", "万德镇", "己衣镇", "田心乡", "发窝乡", "环州乡", "东坡傣族自治乡"], ["金山镇", "仁兴镇", "碧城镇", "勤丰镇", "一平浪镇", "广通镇", "黑井镇", "土官镇", "彩云镇", "和平镇", "恐龙山镇", "中村乡", "高峰乡", "妥安乡"]], [["城区街道", "锡城镇", "沙甸镇", "鸡街镇", "大屯镇", "老厂镇", "卡房镇", "蔓耗镇", "贾沙乡", "保和乡"], ["乐白道街道", "灵泉街道", "中和营镇", "小龙潭镇", "大庄回族乡", "羊街乡", "碑格乡"], ["文澜镇", "草坝镇", "雨过铺镇", "新安所镇", "芷村镇", "鸣鹫镇", "冷泉镇", "期路白苗族乡", "老寨苗族乡", "水田乡", "西北勒乡"], ["弥阳镇", "新哨镇", "虹溪镇", "竹园镇", "朋普镇", "巡检司镇", "西一镇", "西二镇", "西三镇", "东山镇", "五山乡", "江边乡"], ["玉屏镇", "新现镇", "和平镇", "白河镇", "白云乡", "新华乡", "湾塘乡"], ["临安镇", "官厅镇", "西庄镇", "青龙镇", "南庄镇", "岔科镇", "曲江镇", "面甸镇", "普雄乡", "李浩寨乡", "坡头乡", "盘江乡", "利民乡", "甸尾乡"], ["异龙镇", "宝秀镇", "坝心镇", "龙朋镇", "龙武镇", "哨冲镇", "牛街镇", "新城乡", "大桥乡"], ["中枢镇", "金马镇", "旧城镇", "午街铺镇", "白水镇", "向阳乡", "三塘乡", "永宁乡"], ["南沙镇", "新街镇", "牛角寨乡", "沙拉托乡", "嘎娘乡", "上新城乡", "小新街乡", "逢春岭乡", "大坪乡", "攀枝花乡", "黄茅岭乡", "黄草岭乡", "俄扎乡", "马街乡"], ["迤萨镇", "甲寅镇", "宝华镇", "乐育镇", "浪堤镇", "洛恩乡", "石头寨乡", "阿扎河乡", "大羊街乡", "车古乡", "架车乡", "垤玛乡", "三村乡"], ["金河镇", "金水河镇", "勐拉镇", "老勐镇", "铜厂乡", "老集寨乡", "者米拉祜乡", "阿得博乡", "沙依坡乡", "大寨乡", "马鞍底乡", "勐桥乡", "营盘乡"], ["大兴镇", "牛孔镇", "大黑山镇", "平河镇", "戈奎乡", "大水沟乡", "半坡乡", "骑马坝乡", "三猛乡"], ["河口镇", "南溪镇", "老范寨乡", "桥头苗族壮族乡", "瑶山乡", "莲花滩乡"]], [["开化街道", "卧龙", "新平街道", "古木镇", "平坝镇", "马塘镇", "德厚镇", "小街镇", "薄竹镇", "追栗街镇", "东山彝族乡", "柳井彝族乡", "新街乡", "喜古乡", "坝心彝族乡", "秉烈彝族乡", "红甸回族乡", "文山市三七产业园区管理委员会", "文山市马塘工业园区管理委员会"], ["江那镇", "平远镇", "稼依镇", "阿猛镇", "阿舍彝族乡", "维末彝族乡", "盘龙彝族乡", "八嘎乡", "者腊乡", "蚌峨乡", "干河彝族乡", "平远管理区", "稼依管理区", "回龙管理区"], ["西洒镇", "兴街镇", "蚌谷乡", "莲花塘乡", "新马街乡", "柏林乡", "法斗乡", "董马乡", "鸡街乡"], ["麻栗镇", "大坪镇", "董干镇", "天保镇", "猛硐瑶族乡", "下金厂乡", "八布乡", "六河乡", "杨万乡", "铁厂乡", "马街乡"], ["马白镇", "八寨镇", "仁和镇", "木厂镇", "夹寒箐镇", "小坝子镇", "都龙镇", "金厂镇", "坡脚镇", "南捞乡", "大栗树乡", "篾厂乡", "古林箐乡", "健康农场"], ["锦屏镇", "曰者镇", "双龙营镇", "八道哨彝族乡", "天星乡", "平寨乡", "树皮彝族乡", "腻脚彝族乡", "新店彝族乡", "舍得彝族乡", "官寨乡", "温浏乡"], ["莲城镇", "八宝镇", "南屏镇", "珠街镇", "那洒镇", "珠琳镇", "坝美镇", "董堡乡", "旧莫乡", "杨柳井乡", "板蚌乡", "曙光乡", "黑支果乡", "篆角乡", "五珠乡", "者兔乡", "者太乡", "底圩乡"], ["新华镇", "归朝镇", "剥隘镇", "里达镇", "田蓬镇", "木央镇", "板仑乡", "谷拉乡", "者桑乡", "那能乡", "洞波瑶族乡", "阿用乡", "花甲乡"]], [["允景洪街道办事", "嘎洒镇", "勐龙镇", "勐罕镇", "勐养镇", "普文镇", "景哈乡", "景讷乡", "大渡岗乡", "勐旺乡", "基诺乡", "景洪农场", "东风农场", "橄榄坝农场", "勐养农场", "大渡岗农场", "西双版纳州渡假区管理委员", "景洪工业园区", "西双版纳监狱"], ["勐海镇", "打洛镇", "勐混镇", "勐遮镇", "勐满镇", "勐阿镇", "勐宋乡", "勐往乡", "格朗和乡", "布朗山乡", "西定乡", "黎明农场"], ["勐腊镇", "勐捧镇", "勐满镇", "勐仑镇", "西双版纳磨憨经济开发区（尚勇镇）", "勐伴镇", "关累镇", "易武镇", "象明乡", "瑶区乡", "勐腊农场", "勐捧农场", "勐满农场", "勐醒农场"]], [["大理创新工业园区天井", "大理创新工业园区满江", "下关镇", "大理镇", "大理创新工业园区凤仪镇", "喜洲镇", "海东镇", "挖色镇", "湾桥镇", "银桥镇", "双廊镇", "上关镇", "太邑彝族乡"], ["苍山西镇", "漾江镇", "平坡镇", "顺濞镇", "富恒乡", "太平乡", "瓦厂乡", "龙潭乡", "鸡街乡"], ["祥城镇", "沙龙镇", "云南驿镇", "下庄镇", "普棚镇", "刘厂镇", "禾甸镇", "米甸镇", "鹿鸣乡", "东山彝族乡"], ["金牛镇", "宾居镇", "州城镇", "大营镇", "鸡足山镇", "力角镇", "平川镇", "乔甸镇", "钟英傈僳族彝族乡", "拉乌彝族乡"], ["弥城镇", "红岩镇", "新街镇", "寅街镇", "苴力镇", "密祉镇", "德苴乡", "牛街彝族乡"], ["南涧镇", "小湾东镇", "公郎镇", "宝华镇", "无量山镇", "拥翠乡", "乐秋乡", "碧溪乡"], ["南诏镇", "庙街镇", "大仓镇", "永建镇", "巍宝山乡", "马鞍山乡", "紫金乡", "五印乡", "牛街乡", "青华乡"], ["博南镇", "杉阳镇", "龙街镇", "龙门乡", "北斗彝族乡", "厂街彝族乡", "水泄彝族乡"], ["诺邓镇", "功果桥镇", "漕涧镇", "白石镇", "宝丰乡", "关坪乡", "团结彝族乡", "长新乡", "检槽乡", "苗尾傈僳族乡", "民建乡"], ["茈碧湖镇", "邓川镇", "右所镇", "三营镇", "凤羽镇", "乔后镇", "牛街乡", "炼铁乡", "西山乡"], ["金华镇", "老君山镇", "甸南镇", "沙溪镇", "马登镇", "羊岑乡", "弥沙乡", "象图乡"], ["云鹤镇", "辛屯镇", "松桂镇", "黄坪镇", "草海镇", "西邑镇", "龙开口镇", "金墩乡", "六合彝族乡"]], [["勐卯镇", "畹町镇", "弄岛镇", "姐相乡", "户育乡", "勐秀乡"], ["勐焕街道", "芒市镇", "遮放镇", "勐戛镇", "芒海镇", "风平镇", "轩岗乡", "江东乡", "西山乡", "中山乡", "三台山乡", "五岔路乡"], ["遮岛镇", "芒东镇", "勐养镇", "平山乡", "小厂乡", "大厂乡", "九保阿昌族乡", "曩宋阿昌族乡", "河西乡"], ["平原镇", "旧城镇", "那邦镇", "弄璋镇", "盏西镇", "卡场镇", "昔马镇", "太平镇", "新城乡", "油松岭乡", "芒章乡", "支那乡", "苏典傈僳族乡", "勐弄乡", "铜壁关乡"], ["章凤镇", "陇把镇", "景罕镇", "城子镇", "户撒阿昌族乡", "护国乡", "清平乡", "王子树乡", "勐约乡"]], [["六库镇", "鲁掌镇", "片马镇", "上江镇", "老窝镇", "大兴地镇", "称杆乡", "古登乡", "洛本卓乡"], ["上帕镇", "匹河乡", "子里甲乡", "架科底乡", "鹿马登乡", "石月亮乡", "马吉乡"], ["茨开镇", "丙中洛镇", "捧当乡", "普拉底乡", "独龙江乡"], ["金顶镇", "啦井镇", "营盘镇", "通甸镇", "河西乡", "中排乡", "石登乡", "兔峨乡"]], [["建塘镇", "小中甸镇", "虎跳峡镇", "金江镇", "上江乡", "三坝乡", "洛吉乡", "尼西乡", "格咱乡", "东旺乡", "五境乡"], ["升平镇", "奔子栏镇", "佛山乡", "云岭乡", "燕门乡", "拖顶乡", "霞若乡", "羊拉乡"], ["保和镇", "叶枝镇", "塔城镇", "永春乡", "攀天阁乡", "白济汛乡", "康普乡", "巴迪乡", "中路乡", "维登乡"]]], [[["八廓街道", "吉日街道", "吉崩岗街道", "扎细街道", "公德林街道", "嘎玛贡桑街道", "两岛街道", "金珠西路街道", "蔡公堂乡", "纳金乡", "娘热乡", "夺底乡"], ["东嘎镇", "乃琼镇", "羊达乡", "古荣乡", "柳梧乡", "马乡", "德庆乡"], ["甘丹曲果镇", "春堆乡", "松盘乡", "强嘎乡", "卡孜乡", "边交林乡", "江热夏乡", "阿朗乡", "唐古乡", "旁多乡"], ["当曲卡镇", "羊八井镇", "格达乡", "宁中乡", "公塘乡", "龙仁乡", "乌玛塘乡", "纳木湖乡"], ["塔荣镇", "麻江乡", "普松乡", "卡如乡", "尼木乡", "续迈乡", "帕古乡", "吞巴乡"], ["曲水镇", "达嘎乡", "才纳乡", "南木乡", "聂当乡", "茶巴拉乡"], ["德庆镇", "塔杰乡", "章多乡", "唐嘎乡", "雪乡", "帮堆乡"], ["工卡镇", "扎雪乡", "门巴乡", "扎西岗乡", "日多乡", "尼玛江热乡", "甲玛乡", "唐加乡"]], [["城北", "城南", "曲美乡", "聂日雄乡", "曲布雄乡", "联乡", "甲措雄乡", "纳尔乡", "年木乡", "东嘎乡", "边雄乡", "江当乡"], ["南木林镇", "普当乡", "仁堆乡", "拉布普乡", "多角乡", "卡孜乡", "土布加乡", "艾玛乡", "奴玛乡", "达孜乡", "索金乡", "茶尔乡", "秋木乡", "达那乡", "芒热乡", "热当乡", "甲措乡"], ["江孜镇", "纳如乡", "卡麦乡", "卡堆乡", "藏改乡", "日朗乡", "达孜乡", "热索乡", "重孜乡", "龙马乡", "紫金乡", "江热乡", "年堆乡", "康卓乡", "金嘎乡", "日星乡", "热龙乡", "车仁乡", "加克西乡"], ["协格尔镇", "岗嘎镇", "加措乡", "绒辖乡", "尼辖乡", "盆吉乡", "曲当乡", "扎果乡", "扎西宗乡", "长所乡", "曲洛乡", "措果乡", "克玛乡"], ["萨迦镇", "吉定镇", "木拉乡", "查荣乡", "拉洛乡", "赛乡", "扯休乡", "扎西岗乡", "雄玛乡", "麻布加乡", "雄麦乡"], ["曲下镇", "拉孜镇", "扎西宗乡", "曲玛乡", "彭措林乡", "扎西岗乡", "柳乡", "热萨乡", "芒普乡", "锡钦乡", "查务乡"], ["卡嘎镇", "桑桑镇", "切热乡", "秋窝乡", "达居乡", "亚木乡", "贡久布乡", "达若乡", "措迈乡", "尼果乡", "孔隆乡", "如萨乡", "阿木雄乡", "查孜乡", "日吾其乡", "多白乡", "雄巴乡"], ["卡嘎镇", "达木夏乡", "查布乡", "春哲乡", "则许乡", "娘热乡", "措布西乡", "纳当乡", "青都乡", "切琼乡", "美巴切勤乡", "列巴乡", "塔定乡", "荣玛乡", "通门乡", "仁钦则乡", "达那普乡", "达那塔乡", "南木切乡"], ["洛江镇", "嘎东镇", "巴扎乡", "玛乡", "旺丹乡", "曲奴乡", "杜琼乡", "强堆乡", "嘎普乡", "者下乡", "东喜乡"], ["德吉林镇", "帕当乡", "康雄乡", "普松乡", "然巴乡", "茶巴乡", "切洼乡", "母乡", "仁布乡"], ["康马镇", "涅如麦乡", "涅如堆乡", "嘎拉乡", "萨玛达乡", "康如乡", "少岗乡", "南尼乡", "雄章乡"], ["江嘎镇", "陈塘镇", "日屋镇", "确布乡", "扎西岗乡", "多布扎乡", "定结乡", "琼孜乡", "萨尔乡", "郭加乡"], ["帕羊镇", "拉让乡", "帕江乡", "仁多乡", "吉玛乡", "隆格尔乡", "霍尔巴乡", "吉拉乡", "纳久乡", "偏吉乡", "布多乡", "亚热乡", "琼果乡"], ["下司马镇", "帕里镇", "下亚东乡", "堆纳乡", "上亚东乡", "吉汝乡", "康布乡"], ["宗嘎镇", "吉隆镇", "折巴乡", "贡当乡", "差那乡", "萨勒乡"], ["聂拉木镇", "樟木镇", "亚来乡", "锁作乡", "门布乡", "乃龙乡", "波绒乡"], ["加加镇", "夏如乡", "旦嘎乡", "达吉岭乡", "如角乡", "拉藏乡", "雄如乡", "昌果乡"], ["岗巴镇", "昌龙乡", "直克乡", "孔玛乡", "龙中乡"]], [["城关镇", "俄洛镇", "卡若镇", "芒达乡", "沙贡乡", "若巴乡", "埃西乡", "如意乡", "日通乡", "柴维乡", "妥坝乡", "嘎玛乡", "面达乡", "约巴乡", "拉多乡"], ["江达镇", "岗托镇", "邓柯乡", "岩比乡", "卡贡乡", "生达乡", "娘西乡", "字嘎乡", "青泥洞乡", "汪布顶乡", "德登乡", "同普乡", "波罗乡"], ["莫洛镇", "敏都乡", "则巴乡", "罗麦乡", "沙东乡", "克日乡", "木协乡", "阿旺乡", "拉妥乡", "雄松乡", "哈加乡", "相皮乡"], ["桑多镇", "类乌齐镇", "吉多乡", "岗色乡", "宾达乡", "卡玛多乡", "尚卡乡", "伊日乡", "甲桑卡乡", "长毛岭乡"], ["丁青镇", "尺犊镇", "木塔乡", "布塔乡", "巴达乡", "甘岩乡", "嘎塔乡", "色扎乡", "协雄乡", "桑多乡", "当堆乡", "沙贡乡", "觉恩乡"], ["烟多镇", "吉塘镇", "香堆镇", "宗沙乡", "肯通乡", "扩达乡", "新卡乡", "王卡乡", "阿孜乡", "巴日乡", "荣周乡", "卡贡乡", "察拉乡"], ["白玛镇", "然乌镇", "帮达镇", "同卡镇", "林卡乡", "夏里乡", "拥乡", "瓦乡", "吉达乡", "卡瓦白庆乡", "吉中乡", "益庆乡", "拉根乡", "郭庆乡"], ["旺达镇", "田妥镇", "扎玉镇", "东坝乡", "中林卡乡", "美玉乡", "下林卡乡", "碧土乡", "仁果乡", "绕金乡"], ["嘎托镇", "如美镇", "曲孜卡乡", "木许乡", "纳西民族乡", "朱巴龙乡", "曲登乡", "徐中乡", "帮达乡", "戈波乡", "洛尼乡", "措瓦乡", "昂多乡", "宗西乡", "莽岭乡", "索多西乡"], ["孜托镇", "硕督镇", "康沙镇", "马利镇", "玉西乡", "新荣乡", "达龙乡", "腊久乡", "俄西乡", "中亦乡", "白达乡"], ["草卡镇", "边坝镇", "马武乡", "热玉乡", "尼木乡", "沙丁乡", "金岭乡", "加贡乡", "马秀乡", "都瓦乡", "拉孜乡"]], [["林芝镇", "百巴镇", "八一镇", "鲁朗镇", "更章门巴民族乡", "布久乡", "米瑞乡"], ["工布江达镇", "金达镇", "巴河镇", "错高乡", "朱拉乡", "仲莎乡", "江达乡", "娘蒲乡", "加兴乡"], ["米林镇", "卧龙镇", "派镇", "丹娘乡", "南伊珞巴民族乡", "羌纳乡", "里龙乡", "扎西绕登乡"], ["墨脱镇", "甘登乡", "加热萨乡", "达木珞巴民族乡", "帮辛乡", "格当乡", "德兴乡", "背崩乡"], ["扎木镇", "倾多镇", "松宗镇", "古乡", "玉许乡", "多吉乡", "康玉乡", "玉普乡", "易贡乡", "八盖乡"], ["竹瓦根镇", "上察隅镇", "下察隅镇", "古玉乡", "古拉乡", "察瓦龙乡"], ["朗镇", "仲达镇", "洞嘎镇", "金东乡", "拉多乡", "登木乡"]], [["泽当镇", "昌珠镇", "颇章乡", "结巴乡", "多颇章乡", "索珠乡", "亚堆乡"], ["扎唐镇", "桑耶镇", "阿扎乡", "扎其乡", "吉汝乡"], ["吉雄镇", "岗堆镇", "甲竹林镇", "江塘镇", "杰德秀镇", "朗杰学乡", "昌果乡", "东拉乡", "克西乡"], ["桑日镇", "增期乡", "白堆乡", "绒乡"], ["琼结镇", "拉玉乡", "下水乡", "加麻乡"], ["曲松镇", "罗布沙镇", "邱多江乡", "堆随乡", "下江乡"], ["措美镇", "哲古镇", "乃西乡", "古堆乡"], ["洛扎镇", "拉康镇", "生格乡", "边巴乡", "扎日乡", "色乡", "拉郊乡"], ["加查镇", "安绕镇", "拉绥乡", "崔久乡", "坝乡", "冷达乡", "洛林乡"], ["隆子镇", "日当镇", "加玉乡", "列麦乡", "热荣乡", "三林乡", "准巴乡", "斗玉珞巴民族乡", "雪沙乡", "扎日乡", "玉麦乡"], ["错那镇", "勒门巴民族乡", "贡日门巴民族乡", "吉巴门巴民族乡", "麻麻门巴民族乡", "库局乡", "曲卓木乡", "浪波乡", "觉拉乡", "卡达乡"], ["浪卡子镇", "打隆镇", "张达乡", "伦布雪乡", "多却乡", "普玛江塘乡", "阿扎乡", "卡龙乡", "白地乡", "卡热乡"]], [["那曲镇", "罗玛镇", "古露镇", "香茂乡", "油恰乡", "那么切乡", "孔玛乡", "达萨乡", "劳麦乡", "色雄乡", "尼玛乡", "达前乡"], ["阿扎镇", "嘉黎镇", "鸽群乡", "藏比乡", "忠玉乡", "措多乡", "措拉乡", "林堤乡", "夏玛乡", "绒多乡"], ["比如镇", "夏曲镇", "白嘎乡", "羊秀乡", "香曲乡", "达塘乡", "良曲乡", "茶曲乡", "扎拉乡", "恰则乡"], ["聂荣镇", "尼玛乡", "查当乡", "当木江乡", "永曲乡", "索雄乡", "白雄乡", "桑荣乡", "下曲乡", "色庆乡"], ["扎仁镇", "雁石坪镇", "强玛镇", "帕那镇", "措玛乡", "滩堆乡", "扎曲乡", "岗尼乡", "玛曲乡", "色务乡", "玛荣乡", "多玛乡", "帮爱乡"], ["申扎镇", "雄梅镇", "马跃乡", "买巴乡", "塔尔玛乡", "下过乡", "卡乡", "巴扎乡"], ["亚拉镇", "荣布镇", "若达乡", "热瓦乡", "西昌乡", "嘎木乡", "赤多乡", "嘎美乡", "加勤乡", "江达乡"], ["普保镇", "北拉镇", "佳琼镇", "德庆镇", "马前乡", "门当乡", "保吉乡", "青龙乡", "新吉乡", "尼玛乡"], ["雅安镇", "拉西镇", "杂色镇", "江绵乡", "岗切乡", "巴青乡", "阿秀乡", "玛如乡", "本塔乡", "贡日乡"], ["尼玛镇", "文部乡", "中仓乡", "卓瓦乡", "卓尼乡", "吉瓦乡", "甲谷乡", "阿索乡", "俄久乡", "荣玛乡", "达果乡", "申亚乡", "来多乡", "军仓乡"], ["措折罗玛镇", "协德乡", "雅曲乡", "嘎措乡", "措折强玛乡", "多玛乡", "巴岭乡"]], [["普兰镇", "巴嘎乡", "霍尔乡"], ["托林镇", "萨让乡", "达巴乡", "底雅乡", "香孜乡", "曲松乡", "楚鲁松杰乡"], ["狮泉河镇", "昆莎乡", "左左乡", "门士乡", "扎西岗乡"], ["日土镇", "热帮乡", "日松乡", "东汝乡", "多玛乡"], ["革吉镇", "雄巴乡", "亚热乡", "盐湖乡", "文布当桑乡"], ["改则镇", "物玛乡", "先遣乡", "麻米乡", "洞措乡", "古姆乡", "察布乡"], ["措勤镇", "磁石乡", "曲洛乡", "江让乡", "达雄乡"]]], [[["西一路街道", "长乐中路街道", "中山门街道", "韩森寨街道", "解放门街道", "自强路街道", "太华路街道", "长乐西路街道", "胡家庙街道"], ["南院门街道", "柏树林街道", "长乐坊街道", "东关南街街道", "太乙路街道", "文艺路街道", "长安路街道", "张家村街道"], ["青年路街道", "北院门街道", "北关街道", "红庙坡街道", "环城西路街道", "西关街道", "土门街道", "桃园路街道", "枣园街道"], ["纺织城街道", "十里铺街道", "红旗街道", "席王街道", "洪庆街道", "狄寨街道", "灞桥街道", "新筑街道", "新合街道"], ["张家堡街道", "三桥街道", "辛家庙街道", "徐家湾街道", "大明宫街道", "谭家街道", "草滩街道", "六村堡街道", "未央宫街道", "汉城街道", "未央湖街道", "建章路街道"], ["小寨路街道", "大雁塔街道", "长延堡街道", "电子城街道", "等驾坡街道", "鱼化寨街道", "丈八沟街道", "曲江街道"], ["凤凰路街道", "新华路街道", "振兴街道", "新兴街道", "北屯街道", "武屯镇", "关山镇"], ["骊山街道", "秦陵街道", "新丰街道", "代王街道", "斜口街道", "行者街道", "零口街道", "相桥街道", "雨金街道", "新市街道", "徐杨街道", "西泉街道", "栎阳街道", "马额街道", "何寨街道", "交口街道", "油槐街道", "北田街道", "铁炉街道", "任留街道", "穆寨街道", "小金街道", "仁宗街道"], ["韦曲街道", "郭杜街道", "滦镇街道", "引镇街道", "王寺街道", "马王街道", "太乙宫街道", "东大街道", "子午街道", "斗门街道", "细柳街道", "杜曲街道", "大兆街道", "黄良街道", "兴隆街道", "王曲街道", "鸣犊街道", "王莽街道", "五台街道", "高桥街道", "五星街道", "灵沼街道", "杨庄街道", "砲里街道", "魏寨街道"], ["鹿苑街道", "泾渭街道", "崇皇街道", "姬家街道", "通远镇", "耿镇", "张卜镇"], ["蓝关街道", "洩湖镇", "华胥镇", "前卫镇", "汤峪镇", "焦岱镇", "玉山镇", "三里镇", "普化镇", "葛牌镇", "灞源镇", "九间房镇", "蓝桥镇", "辋川镇", "厚镇", "三官庙镇", "安村镇", "孟村镇", "小寨镇"], ["二曲街道", "哑柏镇", "终南镇", "马召镇", "集贤镇", "楼观镇", "尚村镇", "广济镇", "厚畛子镇", "青化镇", "竹峪镇", "翠峰镇", "四屯镇", "司竹镇", "九峰镇", "富仁镇", "骆峪镇", "陈河镇", "板房子镇", "王家河镇"], ["甘亭街道办", "余下镇", "祖庵镇", "秦渡镇", "大王镇", "草堂镇", "蒋村镇", "庞光镇", "涝店镇", "甘河镇", "石井镇", "玉蝉镇", "五竹镇", "渭丰镇"]], [["七一路街道", "红旗街道", "桃园街道", "青年路街道", "王家河街道", "王益街道", "黄堡镇"], null, ["永安路街道", "天宝路街道", "咸丰路街道", "正阳路街道", "锦阳路街道", "坡头街道", "董家河镇", "庙湾镇", "瑶曲镇", "照金镇", "小丘镇", "孙塬镇", "关庄镇", "石柱镇"], ["宜阳街道", "彭镇", "五里镇", "太安镇", "棋盘镇", "尧生镇", "哭泉镇", "云梦乡"]], [["金陵街道", "经二路街道", "清姜街道", "姜谭街道", "桥南街道", "马营镇", "石鼓镇", "神农镇", "高家镇", "八鱼镇"], ["中山东路街道", "西关街道", "中山西路街道", "群众路街道", "东风路街道", "十里铺街道", "卧龙寺街道", "陈仓镇", "蟠龙镇", "金河镇", "硖石镇"], ["虢镇街道", "东关街道", "千渭街道", "阳平镇", "千河镇", "磻溪镇", "天王镇", "慕仪镇", "周原镇", "贾村镇", "县功镇", "新街镇", "坪头镇", "香泉镇", "赤沙镇", "拓石镇", "凤阁岭镇", "钓渭镇"], ["城关镇", "虢王镇", "彪角镇", "横水镇", "田家庄镇", "糜杆桥镇", "南指挥镇", "陈村镇", "长青镇", "柳林镇", "姚家沟镇", "范家寨镇"], ["凤鸣镇", "蔡家坡镇", "益店镇", "蒲村镇", "青化镇", "枣林镇", "雍川镇", "故郡镇", "京当镇"], ["城关街道", "天度镇", "午井镇", "绛帐镇", "段家镇", "杏林镇", "召公镇", "法门镇"], ["首善街道", "横渠镇", "槐芽镇", "汤峪镇", "常兴镇", "金渠镇", "营头镇", "齐镇", "陕西省太白山旅游区", "红河谷森林公园"], ["城关镇", "东风镇", "八渡镇", "东南镇", "温水镇", "天成镇", "曹家湾镇", "固关镇", "河北镇", "新集川镇"], ["城关镇", "崔家头镇", "南寨镇", "张家塬镇", "水沟镇", "草碧镇", "高崖镇"], ["九成宫镇", "崔木镇", "招贤镇", "两亭镇", "常丰镇", "丈八镇", "酒房镇"], ["双石铺镇", "凤州镇", "黄牛铺镇", "红花铺镇", "河口镇", "唐藏镇", "平木镇", "坪坎镇", "留凤关镇", "马头滩林业局", "辛家山林业场"], ["咀头镇", "桃川镇", "鹦鸽镇", "靖口镇", "太白河镇", "黄柏塬镇", "王家堎镇"]], [["人民路街道", "西兰路街道", "吴家堡街道", "渭阳西路街道", "陈杨寨街道", "古渡街道", "沣东街道", "钓台街道", "马泉街道", "渭滨街道", "双照街道", "马庄街道"], ["杨陵街道", "李台街道", "大寨街道", "五泉镇", "揉谷镇"], ["中山街道", "文汇路街道", "新兴街道", "渭阳街道", "渭城街道", "窑店街道", "正阳街道", "周陵街道", "底张街道", "北杜街道"], ["城关街道", "陂西镇", "独李镇", "大程镇", "西阳镇", "鲁桥镇", "陵前镇", "新兴镇", "嵯峨镇", "渠岸镇"], ["泾干街道", "永乐镇", "云阳镇", "桥底镇", "王桥镇", "口镇", "三渠镇", "高庄镇", "太平镇", "崇文镇", "安吴镇", "兴隆镇", "中张镇"], ["城关街道", "薛录镇", "梁村镇", "临平镇", "姜村镇", "王村镇", "马连镇", "阳峪镇", "峰阳镇", "注泔镇", "灵源镇", "阳洪镇", "梁山镇", "周城镇", "新阳镇", "大杨镇"], ["城关街道", "史德镇", "西张堡镇", "阡东镇", "烽火镇", "烟霞镇", "赵镇", "叱干镇", "南坊镇", "石潭镇", "昭陵镇", "骏马镇"], ["监军街道", "店头镇", "常宁镇", "甘井镇", "马坊镇", "渠子镇", "永平镇"], ["城关街道", "北极镇", "新民镇", "龙高镇", "永乐镇", "义门镇", "水口镇", "韩家镇", "太峪镇"], ["昭仁街道", "相公镇", "巨家镇", "丁家镇", "洪家镇", "亭口镇", "彭公镇", "枣元镇"], ["城关街道", "土桥镇", "职田镇", "张洪镇", "太村镇", "郑家镇", "湫坡头镇", "底庙镇", "马栏镇", "清塬镇"], ["城关街道", "官庄镇", "方里镇", "润镇", "车坞镇", "铁王镇", "石桥镇", "十里塬镇"], ["普集街道", "苏坊镇", "武功镇", "游风镇", "贞元镇", "长宁镇", "小村镇", "大庄镇"], ["东城街道", "西城街道", "店张街道", "西吴街道", "马嵬街道", "赵村镇", "桑镇", "南市镇", "庄头镇", "南位镇", "阜寨镇", "丰仪镇", "汤坊镇"]], [["杜桥街道", "人民街道", "解放街道", "向阳街道", "站南街道", "双王街道", "良田街道", "崇业路街道", "桥南镇", "阳郭镇", "故市镇", "下邽镇", "三张镇", "交斜镇", "辛市镇", "崇宁镇", "孝义镇", "吝店镇", "官底镇", "官路镇", "丰原镇", "阎村镇", "龙背镇", "官道镇"], ["华州街道", "杏林镇", "赤水镇", "高塘镇", "大明镇", "瓜坡镇", "莲花寺镇", "柳枝镇", "下庙镇", "金堆镇"], ["城关街道", "秦东镇", "太要镇", "桐峪镇", "代字营镇"], ["城关街道", "许庄镇", "朝邑镇", "安仁镇", "两宜镇", "羌白镇", "官池镇", "冯村镇", "双泉镇", "下寨镇", "韦林镇", "范家镇", "苏村镇", "赵渡镇", "埝桥镇", "段家镇", "国营陕西荔北企业公司", "国营陕西沙苑企业公司", "国营陕西黄河企业公司"], ["城关街道", "甘井镇", "坊镇", "洽川镇", "新池镇", "黑池镇", "路井镇", "和家庄镇", "王村镇", "同家庄镇", "百良镇", "金峪镇"], ["城关街道", "冯原镇", "王庄镇", "尧头镇", "赵庄镇", "交道镇", "寺前镇", "韦庄镇", "安里镇", "庄头镇"], ["城关街道", "罕井镇", "孙镇", "兴镇", "党睦镇", "高阳镇", "永丰镇", "荆姚镇", "苏坊镇", "龙阳镇", "洛滨镇", "陈庄镇", "桥陵镇", "尧山镇", "椿林镇", "龙池镇"], ["城关街道", "尧禾镇", "杜康镇", "西固镇", "林皋镇", "史官镇", "北塬镇", "雷牙镇"], ["城关街道", "庄里镇", "张桥镇", "美原镇", "流曲镇", "淡村镇", "留古镇", "老庙镇", "薛镇", "到贤镇", "曹村镇", "宫里镇", "梅家坪镇", "刘集镇", "齐村镇"], ["新城街道", "金城街道", "龙门镇", "桑树坪镇", "芝川镇", "西庄镇", "芝阳镇", "板桥镇"], ["太华路街道", "岳庙街道", "孟塬镇", "华西镇", "罗敷镇", "华山镇", "国营陕西华山企业公司"]], [["宝塔山街道", "南市街道", "凤凰山街道", "枣园街道", "桥沟街道", "河庄坪镇", "李渠镇", "姚店镇", "青化砭镇", "蟠龙镇", "柳林镇", "南泥湾镇", "临镇", "甘谷驿镇", "川口乡", "冯庄乡", "麻洞川乡", "万花山乡"], ["真武洞街道", "砖窑湾镇", "沿河湾镇", "招安镇", "化子坪镇", "坪桥镇", "建华镇", "高桥镇", "镰刀湾镇"], ["七里村街道", "黑家堡镇", "郑庄镇", "张家滩镇", "交口镇", "雷赤镇", "罗子山镇", "安沟镇"], ["大禹街道", "永坪镇", "延水关镇", "文安驿镇", "杨家圪台镇", "贾家坪镇", "关庄镇", "乾坤湾镇"], ["瓦窑堡街道", "杨家园子镇", "玉家湾镇", "安定镇", "马家砭镇", "南沟岔镇", "涧峪岔镇", "李家岔镇", "余家坪镇"], ["保安街道", "杏河镇", "顺宁镇", "旦八镇", "金丁镇", "永宁镇", "义正镇", "双河镇"], ["吴起街道", "铁边城镇", "周湾镇", "白豹镇", "长官庙镇", "长城镇", "五谷城镇", "吴仓堡镇", "庙沟镇"], ["美水街道", "下寺湾镇", "道镇", "石门镇", "桥镇乡", "劳山乡"], ["茶坊街道", "羊泉镇", "张村驿镇", "张家湾镇", "直罗镇", "牛武镇", "寺仙镇", "北道德乡"], ["凤栖街道", "旧县镇", "交口河镇", "老庙镇", "土基镇", "石头镇", "槐柏镇", "永乡镇", "菩堤乡"], ["丹州街道", "秋林镇", "云岩镇", "集义镇", "壶口镇", "英旺乡", "交里乡"], ["石堡镇", "白马滩镇", "瓦子街镇", "界头庙镇", "三岔镇", "圪台乡", "崾崄乡"], ["桥山街道", "店头镇", "隆坊镇", "田庄镇", "阿党镇", "双龙镇"]], [["北关街道", "东大街街道", "汉中路街道", "中山街街道", "东关街道", "鑫源街道", "七里街道", "龙江街道", "铺镇", "武乡镇", "河东店镇", "宗营镇", "老君镇", "汉王镇", "徐望镇"], ["汉山街道", "圣水镇", "大河坎镇", "协税镇", "梁山镇", "阳春镇", "高台镇", "新集镇", "濂水镇", "黄官镇", "青树镇", "红庙镇", "牟家坝镇", "法镇", "湘水镇", "小南海镇", "碑坝镇", "黎坪镇", "福成镇", "两河镇", "胡家营镇"], ["博望街道", "莲花街道", "龙头镇", "沙河营镇", "文川镇", "柳林镇", "老庄镇", "桔园镇", "原公镇", "上元观镇", "天明镇", "二里镇", "五堵镇", "双溪镇", "小河镇", "董家营镇", "三合镇", "陕西飞机制造公司"], ["洋州街道", "纸坊街道", "戚氏街道", "龙亭镇", "谢村镇", "马畅镇", "溢水镇", "磨子桥镇", "黄家营镇", "黄安镇", "黄金峡镇", "槐树关镇", "金水镇", "华阳镇", "茅坪镇", "八里关镇", "桑溪镇", "关帝镇"], ["城北街道", "城南街道", "杨河镇", "柳树镇", "沙河镇", "私渡镇", "桑园镇", "白龙塘镇", "峡口镇", "堰口镇", "茶镇", "高川镇", "两河口镇", "大河镇", "骆家坝镇", "子午镇", "白勉峡镇"], ["勉阳街道", "武侯镇", "周家山镇", "同沟寺镇", "新街子镇", "老道寺镇", "褒城镇", "金泉镇", "定军山镇", "温泉镇", "元墩镇", "阜川镇", "新铺镇", "茶店镇", "镇川镇", "漆树坝镇", "张家河镇", "长沟河镇"], ["汉源街道", "高寨子街道", "大安镇", "代家坝镇", "阳平关镇", "燕子砭镇", "广坪镇", "青木川镇", "毛坝河镇", "铁锁关镇", "胡家坝镇", "巴山镇", "巨亭镇", "舒家坝镇", "太阳岭镇", "安乐河镇", "二郎坝镇", "禅家岩镇"], ["兴州街道", "横现河街道", "接官亭镇", "西淮坝镇", "两河口镇", "金家河镇", "徐家坪镇", "白水江镇", "硖口驿镇", "马蹄湾镇", "乐素河镇", "郭镇", "黑河镇", "白雀寺镇", "仙台坝镇", "五龙洞镇", "观音寺镇"], ["泾洋街道", "渔渡镇", "盐场镇", "观音镇", "巴庙镇", "兴隆镇", "长岭镇", "三元镇", "简池镇", "碾子镇", "小洋镇", "青水镇", "赤南镇", "平安镇", "杨家河镇", "巴山镇", "黎坝镇", "仁村镇", "大池镇", "永乐镇"], ["紫柏街道", "马道镇", "武关驿镇", "留侯镇", "江口镇", "玉皇庙镇", "火烧店镇", "青桥驿镇"], ["袁家庄街道", "陈家坝镇", "大河坝镇", "西岔河镇", "岳坝镇", "长角坝镇", "石墩河镇"]], [["鼓楼街道", "青山路街道", "上郡路街道", "新明楼街道", "驼峰路街道", "崇文路街道", "航宇路街道", "长城路街道", "鱼河镇", "上盐湾镇", "镇川镇", "麻黄梁镇", "牛家梁镇", "金鸡滩镇", "马合镇", "巴拉素镇", "鱼河峁镇", "青云镇", "古塔镇", "大河塔镇", "小纪汗镇", "芹河镇", "孟家湾乡", "小壕兔乡", "岔河则乡", "补浪河乡", "红石桥乡"], ["横山街道", "石湾镇", "高镇", "武镇", "党岔镇", "响水镇", "波罗镇", "殿市镇", "塔湾镇", "赵石畔镇", "魏家楼镇", "韩岔镇", "白界镇", "雷龙湾镇"], ["神木镇", "高家堡镇", "店塔镇", "孙家岔镇", "大柳塔镇", "花石崖镇", "中鸡镇", "贺家川镇", "尔林兔镇", "万镇", "大保当镇", "马镇", "栏杆堡镇", "沙峁镇", "锦界镇"], ["府谷镇", "黄甫镇", "哈镇", "庙沟门镇", "新民镇", "孤山镇", "清水镇", "大昌汗镇", "古城镇", "三道沟镇", "老高川镇", "武家庄镇", "木瓜镇", "田家寨镇"], ["张家畔街道", "东坑镇", "青阳岔镇", "宁条梁镇", "周河镇", "红墩界镇", "杨桥畔镇", "王渠则镇", "中山涧镇", "杨米涧镇", "天赐湾镇", "小河镇", "龙洲镇", "黄蒿界镇", "海则滩镇", "席麻湾镇", "镇靖镇"], ["定边街道", "贺圈镇", "红柳沟镇", "砖井镇", "白泥井镇", "安边镇", "堆子梁镇", "白湾子镇", "姬塬镇", "杨井镇", "新安边镇", "张崾先镇", "樊学镇", "盐场堡镇", "郝滩镇", "石洞沟乡", "油房庄乡", "冯地坑乡", "学庄乡"], ["名州镇", "薛家峁镇", "崔家湾镇", "定仙墕镇", "枣林坪镇", "义合镇", "吉镇", "薛家河镇", "四十铺镇", "石家湾镇", "田庄镇", "中角镇", "满堂川镇", "张家砭镇", "白家硷镇"], ["银州街道", "桃镇", "龙镇", "杨家沟镇", "杜家石沟镇", "沙家店镇", "印斗镇", "郭兴庄镇", "城郊镇"], ["佳州街道", "坑镇", "店镇", "乌镇", "金明寺镇", "通镇", "王家砭镇", "方塌镇", "朱家坬镇", "螅镇", "朱官寨镇", "刘国具镇", "木头峪镇"], ["宋家川街道", "辛家沟镇", "郭家沟镇", "寇家塬镇", "岔上镇", "张家山镇"], ["宽州镇", "石咀驿镇", "折家坪镇", "玉家河镇", "高杰村镇", "李家塔镇", "店则沟镇", "解家沟镇", "下廿里铺镇"], ["双湖峪街道", "何家集镇", "老君殿镇", "裴家湾镇", "苗家坪镇", "三川口镇", "马蹄沟镇", "周家硷镇", "电市镇", "砖庙镇", "淮宁湾镇", "马岔镇", "驼耳巷乡"]], [["老城街道", "新城街道", "江北街道", "建民", "关庙镇", "张滩镇", "瀛湖镇", "五里镇", "大同镇", "恒口镇", "吉河镇", "流水镇", "大竹园镇", "洪山镇", "茨沟镇", "大河镇", "沈坝镇", "双龙镇", "叶坪镇", "中原镇", "县河镇", "紫荆镇", "早阳镇", "关家镇", "石梯镇", "坝河镇", "牛蹄镇", "晏坝镇", "谭坝镇"], ["城关镇", "涧池镇", "蒲溪镇", "平梁镇", "双乳镇", "铁佛寺镇", "漩涡镇", "汉阳镇", "双河口镇", "观音河镇"], ["城关镇", "饶峰镇", "两河镇", "迎丰镇", "池河镇", "后柳镇", "喜河镇", "熨斗镇", "云雾山镇", "中池镇", "曾溪镇"], ["城关镇", "四亩地镇", "江口镇", "广货街镇", "龙王镇", "筒车湾镇", "金川镇", "皇冠镇", "太山庙镇", "梅子镇", "新场镇"], ["城关镇", "蒿坪镇", "汉王镇", "焕古镇", "向阳镇", "洞河镇", "洄水镇", "双桥镇", "高桥镇", "红椿镇", "高滩镇", "毛坝镇", "瓦庙镇", "麻柳镇", "双安镇", "东木镇", "界岭镇"], ["城关镇", "佐龙镇", "滔河镇", "官元镇", "石门镇", "民主镇", "大道河镇", "堰门镇", "蔺河镇", "四季镇", "孟石岭镇", "南宫山镇"], ["城关镇", "兴隆镇", "老县镇", "大贵镇", "三阳镇", "洛河镇", "广佛镇", "八仙镇", "长安镇", "正阳镇", "西河镇"], ["城关镇", "曾家镇", "牛头店镇", "钟宝镇", "上竹镇", "华坪镇", "曙坪镇"], ["城关镇", "棕溪镇", "关口镇", "蜀河镇", "双河镇", "小河镇", "赵湾镇", "麻坪镇", "甘溪镇", "白柳镇", "吕河镇", "神河镇", "铜钱关镇", "段家河镇", "仙河镇", "金寨镇", "桐木镇", "构元镇", "石门镇", "红军镇", "仁河口镇"], ["城关镇", "中厂镇", "构扒镇", "卡子镇", "茅坪镇", "宋家镇", "西营镇", "仓上镇", "冷水镇", "双丰镇", "麻虎镇"]], [["城关街道", "大赵峪街道", "陈塬街道", "刘湾街道", "夜村镇", "沙河子镇", "杨峪河镇", "金陵寺镇", "黑山镇", "杨斜镇", "麻街镇", "牧护关镇", "大荆镇", "腰市镇", "板桥镇", "北宽坪镇", "三岔河镇", "闫村镇", "二龙山水库", "南秦水库", "二龙山国营林场", "商丹循环工业园", "荆河工业园", "荆河农业示范园", "高校园区", "商洛职业技术学院", "氟化硅产业业园"], ["城关街道", "四皓街道", "景村镇", "古城镇", "三要镇", "灵口镇", "寺耳镇", "巡检镇", "石坡镇", "石门镇", "麻坪镇", "洛源镇", "保安镇", "永丰镇", "柏峪寺镇", "高耀镇"], ["龙驹寨街道", "庾岭镇", "蔡川镇", "峦庄镇", "铁峪铺镇", "武关镇", "竹林关镇", "土门镇", "寺坪镇", "商镇", "棣花镇", "花瓶子镇"], ["城关街道", "富水镇", "湘河镇", "赵川镇", "过风楼镇", "试马镇", "清油河镇", "十里坪镇", "金丝峡镇", "青山镇"], ["城关街道", "十里铺街道", "高坝店镇", "天竺山镇", "中村镇", "银花镇", "西照川镇", "漫川关镇", "南宽坪镇", "户家塬镇", "杨地镇", "小河口镇", "色河铺镇", "板岩镇", "延坪镇", "两岭镇", "王阎镇", "法官镇"], ["永乐街道", "回龙镇", "铁厂镇", "大坪镇", "米粮镇", "茅坪回族镇", "西口回族镇", "高峰镇", "青铜关镇", "柴坪镇", "达仁镇", "木王镇", "云盖寺镇", "庙沟镇", "月河镇", "黑窑沟林厂", "木王林厂", "镇安县苗圃"], ["乾佑街道", "营盘镇", "下梁镇", "小岭镇", "凤凰镇", "红岩寺镇", "曹坪镇", "杏坪镇", "瓦房口镇"]]], [[["酒泉路街道", "张掖路街道", "雁南街道", "临夏路街道", "雁北街道", "五泉街道", "白银路街道", "皋兰路街道", "广武门街道", "伏龙坪街道", "靖远路街道", "草场街街道", "火车站街道", "拱星墩街道", "东岗街道", "团结新村街道", "东岗西路街道", "铁路东村街道", "铁路西村街道", "渭源路街道", "盐场路街道", "嘉峪关路街道", "焦家湾街道", "青白石街道", "高新区", "甘肃农垦集团", "甘肃监狱企业集团公司"], ["西园街道", "西湖街道", "建兰路街道", "敦煌路街道", "西站街道", "晏家坪街道", "龚家湾街道", "土门墩街道", "秀川街道", "阿干镇", "八里镇", "彭家坪镇", "西果园镇", "魏岭乡", "黄峪乡"], ["陈坪街道", "先锋路街道", "福利路街道", "西固城街道", "四季青街道", "临洮街街道", "西柳沟街道", "新城镇", "东川镇", "河口镇", "达川镇", "柳泉镇", "金沟乡", "新安路街道", "新和路街道"], ["培黎街道", "西路街道", "沙井驿街道", "十里店街道", "孔家崖街道", "银滩路街道", "刘家堡街道", "安宁堡街道"], ["窑街街道", "下窑街道", "矿区街道", "华龙街道", "海石湾镇", "花庄镇", "平安镇", "红古镇"], ["城关镇", "红城镇", "中堡镇", "武胜驿镇", "河桥镇", "连城镇", "苦水镇", "大同镇", "龙泉寺镇", "树屏镇", "上川镇", "柳树镇", "坪城乡", "民乐乡", "通远乡", "七山乡"], ["石洞镇", "忠和镇", "什川镇", "九合镇", "水阜镇", "黑石镇"], ["城关镇", "夏官营镇", "高崖镇", "金崖镇", "和平镇", "甘草店镇", "青城镇", "定远镇", "来紫堡乡", "三角城乡", "小康营乡", "连搭乡", "银山乡", "马坡乡", "新营乡", "清水驿乡", "龙泉乡", "韦营乡", "中连川乡", "贡井乡", "园子岔乡", "上花岔乡", "哈岘乡"]], [["胜利街道", "五一街道", "矿山街道", "新华街道", "建设街道", "前进街道", "峪苑街道", "朝阳街道"]], [["滨河路街道", "桂林路街道", "北京路街道", "金川路街道", "新华路街道", "广州路街道", "宁远堡镇", "双湾镇"], ["城关镇", "河西堡镇", "新城子镇", "朱王堡镇", "东寨镇", "水源镇", "红山窑乡", "焦家庄乡", "六坝乡", "南坝乡"]], [["人民路街道", "公园路街道", "四龙路街道", "工农路街道", "纺织路街道", "水川镇", "四龙镇", "王岘镇", "强湾乡", "武川乡"], ["长征街道", "电力路街道", "红会路街道", "兴平路街道", "王家山镇", "水泉镇", "共和镇", "宝积镇", "黄峤镇", "种田乡", "复兴乡"], ["北湾镇", "东湾镇", "乌兰镇", "刘川镇", "北滩镇", "五合镇", "大芦镇", "糜滩镇", "高湾镇", "平堡镇", "东升镇", "双龙镇", "三滩镇", "兴隆乡", "石门乡", "靖安乡", "永新乡", "若笠乡"], ["会师镇", "郭城驿镇", "河畔镇", "头寨子镇", "太平店镇", "甘沟驿镇", "侯家川镇", "柴家门镇", "汉家岔镇", "刘家寨子镇", "白草塬镇", "大沟镇", "四房吴镇", "中川镇", "老君坡镇", "平头川镇", "丁家沟镇", "杨崖集镇", "翟家所镇", "韩家集镇", "土门岘镇", "新塬镇", "草滩镇", "新庄镇", "新添堡回族乡", "党家岘乡", "八里湾乡", "土高山乡"], ["一条山镇", "芦阳镇", "上沙沃镇", "喜泉镇", "草窝滩镇", "红水镇", "中泉镇", "正路镇", "寺滩乡", "五佛乡", "漫水滩乡", "条山集团"]], [["大城街道", "七里墩街道", "东关街道", "中城街道", "西关街道", "石马坪街道", "天水郡街道", "玉泉镇", "太京镇", "藉口镇", "皂郊镇", "汪川镇", "牡丹镇", "关子镇", "平南镇", "天水镇", "娘娘坝镇", "中梁镇", "杨家寺镇", "齐寿镇", "大门镇", "秦岭乡", "华歧乡"], ["道北街道", "北道埠街道", "桥南街道", "社棠镇", "马跑泉镇", "甘泉镇", "渭南镇", "东岔镇", "花牛镇", "中滩镇", "新阳镇", "元龙镇", "伯阳镇", "麦积镇", "石佛镇", "三岔镇", "琥珀镇", "利桥镇", "五龙乡", "党川乡", "天水经济开发区", "天水市高新技术工业园", "天水市农业高新技术示范区", "天水市麦积区三阳工业示范区", "天水市麦积区廿铺工业示范区", "天水市麦积区东柯河工业园区"], ["永清镇", "红堡镇", "白驼镇", "金集镇", "秦亭镇", "山门镇", "白沙镇", "王河镇", "郭川镇", "黄门镇", "松树乡", "远门乡", "土门乡", "贾川乡", "丰望乡", "草川铺乡", "陇东乡", "新城乡", "清水县科技养殖示范园区"], ["兴国镇", "莲花镇", "西川镇", "陇城镇", "郭嘉镇", "五营镇", "叶堡镇", "魏店镇", "安伏镇", "千户镇", "王尹镇", "兴丰镇", "刘坪乡", "中山乡", "王铺乡", "王窑乡", "云山乡"], ["大像山镇", "磐安镇", "新兴镇", "安远镇", "六峰镇", "金山镇", "大庄镇", "大石镇", "礼辛镇", "武家河镇", "八里湾乡", "西坪乡", "谢家湾乡", "古坡乡", "白家湾乡"], ["城关镇", "洛门镇", "鸳鸯镇", "滩歌镇", "四门镇", "马力镇", "山丹镇", "温泉镇", "桦林镇", "龙台镇", "榆盘镇", "咀头乡", "高楼乡", "杨河乡", "沿安乡"], ["张家川镇", "龙山镇", "恭门镇", "马鹿镇", "梁山镇", "马关镇", "刘堡乡", "张棉乡", "胡川乡", "木河乡", "大阳乡", "川王乡", "连五乡", "平安乡", "阎家乡"]], [["东大街街道", "西大街街道", "东关街街道", "西关街街道", "火车站街街道", "地质新村街街道", "荣华街街道", "宣武街道", "黄羊河街道", "黄羊镇", "武南镇", "清源镇", "永昌镇", "双城镇", "丰乐镇", "高坝镇", "金羊镇", "和平镇", "羊下坝镇", "中坝镇", "永丰镇", "古城镇", "张义镇", "发放镇", "西营镇", "四坝镇", "洪祥镇", "谢河镇", "金沙镇", "松树镇", "怀安镇", "下双镇", "清水镇", "河东镇", "五和乡", "韩佐乡", "大柳乡", "长城乡", "柏树乡", "金塔乡", "九墩乡", "金山乡", "吴家井乡", "新华乡", "康宁乡", "东河乡", "九墩滩指挥部", "邓马营湖生态建设指挥部"], ["三雷镇", "东坝镇", "泉山镇", "西渠镇", "东湖镇", "红沙岗镇", "昌宁镇", "重兴镇", "薛百镇", "大坝镇", "苏武镇", "大滩镇", "双茨科镇", "红沙梁镇", "蔡旗乡", "夹河乡", "收成乡", "南湖乡"], ["古浪镇", "泗水镇", "土门镇", "大靖镇", "裴家营镇", "海子滩镇", "定宁镇", "黄羊川镇", "黑松驿镇", "永丰滩镇", "黄花滩镇", "西靖镇", "民权乡", "直滩乡", "新堡乡", "干城乡", "横梁乡", "十八里堡乡", "古丰乡"], ["华藏寺镇", "打柴沟镇", "安远镇", "炭山岭镇", "哈溪镇", "赛什斯镇", "石门镇", "松山镇", "天堂镇", "朵什镇", "东坪乡", "赛拉隆乡", "东大滩乡", "抓喜秀龙乡", "西大滩乡", "大红沟乡", "毛藏乡", "祁连乡", "旦马乡", "天祝建材厂", "天祝煤电公司"]], [["东街街道", "南街街道", "西街街道", "北街街道", "火车站街道", "梁家墩镇", "上秦镇", "大满镇", "沙井镇", "乌江镇", "甘浚镇", "新墩镇", "党寨镇", "碱滩镇", "三闸镇", "小满镇", "明永镇", "长安镇", "安阳乡", "花寨乡", "龙渠乡", "靖安乡", "平山湖蒙古族乡", "甘肃农垦张掖农场", "甘肃省农业科学院张掖试验场", "甘肃张掖工业园区", "张掖滨河新区"], ["红湾寺镇", "皇城镇", "马蹄藏族乡", "康乐乡", "白银蒙古族乡", "大河乡", "明花乡", "祁丰蔵族乡", "甘肃省绵羊育种场", "张掖宝瓶河牧场"], ["洪水镇", "六坝镇", "新天镇", "南古镇", "永固镇", "三堡镇", "南丰乡", "民联乡", "顺化乡", "丰乐乡", "民乐生态工业园区"], ["沙河镇", "新华镇", "蓼泉镇", "平川镇", "板桥镇", "鸭暖镇", "倪家营镇", "国营临泽农场", "五泉林场", "沙河林场", "小泉子治沙站", "园艺场", "良种繁殖场"], ["城关镇", "宣化镇", "南华镇", "巷道镇", "合黎镇", "骆驼城镇", "新坝镇", "黑泉镇", "罗城镇", "甘肃高台工业园区"], ["清泉镇", "位奇镇", "霍城镇", "陈户镇", "大马营镇", "东乐镇", "老军乡", "李桥乡", "国营山丹农场", "中牧公司山丹马场"]], [["东关街道", "中街街道", "西郊街道", "崆峒镇", "白水镇", "草峰镇", "安国镇", "柳湖镇", "花所乡", "索罗乡", "香莲乡", "西阳乡", "大秦乡", "白庙乡", "寨河乡", "大寨乡", "上杨乡", "麻武乡", "峡门乡", "平凉崆峒山生态文化旅游示范区管理委员会"], ["街道", "城关镇", "玉都镇", "高平镇", "荔堡镇", "王村镇", "窑店镇", "飞云镇", "丰台镇", "党原镇", "汭丰镇", "太平镇", "罗汉洞乡", "泾明乡", "红河乡", "温泉经济开发区", "张老寺农场"], ["街道", "中台镇", "邵寨镇", "独店镇", "什字镇", "朝那镇", "西屯镇", "上良镇", "百里镇", "蒲窝镇", "新开乡", "梁原乡", "龙门乡", "星火乡", "万宝川农场"], ["锦屏街道办", "锦屏镇", "新窑镇", "柏树镇", "黄寨镇", "黄花乡", "木林乡", "崇信县新窑工业园区管理委员会", "五举农场", "崇信县铜城工业园区管理委员会"], ["东华街道", "东华镇", "安口镇", "西华镇", "马峡镇", "策底镇", "上关镇", "河西镇", "神峪乡", "山寨乡", "砚峡乡", "石堡子开发区管委会"], ["水洛街道", "水洛镇", "南湖镇", "朱店镇", "万泉镇", "韩店镇", "卧龙镇", "阳川镇", "盘安镇", "大庄镇", "通化镇", "岳堡乡", "杨河乡", "赵墩乡", "柳梁乡", "良邑乡", "永宁乡", "郑河乡", "南坪乡"], ["城区街道", "城关镇", "威戎镇", "界石铺镇", "八里镇", "李店镇", "古城镇", "仁大镇", "甘沟镇", "城川镇", "曹务镇", "雷大镇", "四河镇", "细巷镇", "司桥乡", "双岘乡", "余湾乡", "贾河乡", "深沟乡", "治平乡", "新店乡", "红寺乡", "三合乡", "原安乡", "灵芝乡"]], [["东北街街道", "东南街街道", "工业园街道", "新城街道", "西北街街道", "西南街街道", "玉管局生活基地街道", "西洞镇", "清水镇", "总寨镇", "金佛寺镇", "上坝镇", "三墩镇", "银达镇", "西峰镇", "泉湖镇", "果园镇", "下河清乡", "黄泥堡乡", "铧尖乡", "东洞乡", "丰乐乡", "国营下河清农场", "酒泉经济技术开发区", "十号基地"], ["中东镇", "鼎新镇", "金塔镇", "东坝镇", "航天镇", "大庄子乡", "古城乡", "西坝乡", "羊井子湾乡", "甘肃亚盛农工商集团有限责任公司", "工业园区管委会", "农林场站"], ["渊泉镇", "柳园镇", "三道沟镇", "南岔镇", "锁阳城镇", "河东乡", "布隆吉乡", "西湖乡", "瓜州乡", "腰站子东乡族乡", "七墩回族东乡族乡", "双塔乡", "广至藏族乡", "沙河回族乡", "梁湖乡", "国营小宛农场"], ["党城湾镇", "马鬃山镇", "盐池湾乡", "石包城乡"], ["红柳湾镇", "阿克旗乡", "阿勒腾乡"], ["新市区街道", "玉门镇", "赤金镇", "花海镇", "老君庙镇", "黄闸湾镇", "下西号镇", "柳河镇", "昌马乡", "小金湾东乡族乡", "柳湖乡", "独山子东乡族乡", "六墩乡", "国营饮马农场", "国营黄花农场", "甘肃农垦裕盛农业公司", "甘肃省农垦建筑工程公司", "甘肃矿区"], ["七里镇", "沙州镇", "肃州镇", "莫高镇", "转渠口镇", "阳关镇", "月牙泉镇", "郭家堡镇", "黄渠镇", "国营敦煌农场", "青海石油管理局生活基地"]], [["北街", "南街", "西街", "肖金镇", "董志镇", "后官寨镇", "彭原镇", "温泉镇", "什社乡", "显胜乡"], ["庆城镇", "驿马镇", "三十里铺镇", "马岭镇", "玄马镇", "白马铺镇", "桐川镇", "赤城乡", "太白梁乡", "土桥乡", "蔡口集乡", "高楼乡", "南庄乡", "翟家河乡", "蔡家庙乡"], ["环城镇", "曲子镇", "甜水镇", "木钵镇", "洪德镇", "合道镇", "虎洞镇", "毛井镇", "樊家川镇", "天池乡", "演武乡", "八珠乡", "耿湾乡", "秦团庄乡", "山城乡", "南湫乡", "罗山川乡", "小南沟乡", "车道乡", "芦家湾乡", "四合原旅游开发办公室"], ["悦乐镇", "柔远镇", "元城镇", "南梁镇", "城壕镇", "五蛟镇", "上里塬乡", "王咀子乡", "白马乡", "怀安乡", "乔川乡", "乔河乡", "山庄乡", "林镇乡", "紫坊畔乡"], ["西华池镇", "老城镇", "太白镇", "板桥镇", "何家畔镇", "吉岘乡", "肖咀乡", "段家集乡", "固城乡", "太莪乡", "店子乡", "蒿咀铺乡"], ["山河镇", "榆林子镇", "宫河镇", "永和镇", "永正镇", "周家镇", "湫头镇", "西坡镇", "五顷原乡", "三嘉乡"], ["新宁镇", "平子镇", "早胜镇", "长庆桥镇", "和盛镇", "湘乐镇", "新庄镇", "盘克镇", "中村镇", "焦村镇", "米桥镇", "良平镇", "太昌镇", "春荣镇", "南义乡", "瓦斜乡", "金村乡", "九岘乡"], ["城关镇", "屯字镇", "孟坝镇", "三岔镇", "平泉镇", "开边镇", "太平镇", "临泾镇", "新城镇", "南川乡", "上肖乡", "新集乡", "方山乡", "殷家城乡", "马渠乡", "庙渠乡", "武沟乡", "郭原乡", "中原乡"]], [["中华路街道", "永定路街道", "凤翔镇", "内官营镇", "巉口镇", "称钩驿镇", "鲁家沟镇", "西巩驿镇", "宁远镇", "李家堡镇", "团结镇", "香泉镇", "符家川镇", "葛家岔镇", "白碌乡", "石峡湾乡", "新集乡", "青岚山乡", "高峰乡", "石泉乡", "杏园乡"], ["平襄镇", "马营镇", "鸡川镇", "榜罗镇", "常家河镇", "义岗川镇", "陇阳乡", "陇山乡", "陇川乡", "新景乡", "碧玉乡", "襄南乡", "李家店乡", "什川乡", "第三铺乡", "华家岭乡", "寺子川乡", "北城铺乡"], ["巩昌镇", "文峰镇", "首阳镇", "菜子镇", "福星镇", "通安驿镇", "云田镇", "碧岩镇", "马河镇", "柯寨镇", "渭阳乡", "宏伟乡", "和平乡", "双泉乡", "德兴乡", "永吉乡", "权家湾乡"], ["清源镇", "莲峰镇", "会川镇", "五竹镇", "路园镇", "北寨镇", "新寨镇", "麻家集镇", "锹峪乡", "大安乡", "秦祁乡", "庆坪乡", "祁家庙乡", "上湾乡", "峡城乡", "田家河乡"], ["洮阳镇", "八里铺镇", "新添镇", "辛店镇", "太石镇", "中铺镇", "峡口镇", "龙门镇", "窑店镇", "玉井镇", "衙下集镇", "南屏镇", "红旗乡", "上营乡", "康家集乡", "站滩乡", "漫洼乡", "连儿湾乡"], ["武阳镇", "三岔镇", "新寺镇", "金钟镇", "盐井镇", "殪虎桥镇", "大草滩镇", "四族镇", "石川镇", "贵清山镇", "马泉乡", "武当乡", "东泉乡"], ["岷阳镇", "蒲麻镇", "西寨镇", "梅川镇", "西江镇", "闾井镇", "十里镇", "茶埠镇", "中寨镇", "清水乡", "马坞乡", "寺沟乡", "麻子川乡", "秦许乡", "禾驮乡", "维新乡", "申都乡", "锁龙乡"]], [["钟楼滩街道", "吉石坝街道", "江北街道", "江南街道", "城关镇", "安化镇", "东江镇", "两水镇", "汉王镇", "洛塘镇", "角弓镇", "马街镇", "三河镇", "甘泉镇", "鱼龙镇", "琵琶镇", "外纳镇", "马营镇", "柏林镇", "姚寨镇", "坪垭藏族乡", "蒲池乡", "石门乡", "汉林乡", "池坝乡", "佛崖乡", "黄坪乡", "隆兴乡", "龙坝乡", "龙凤乡", "桔柑乡", "磨坝藏族乡", "玉皇乡", "郭河乡", "枫相乡", "三仓乡", "五库乡", "月照乡", "五马乡", "裕河乡"], ["城关镇", "黄渚镇", "红川镇", "小川镇", "纸坊镇", "抛沙镇", "店村镇", "王磨镇", "陈院镇", "沙坝镇", "黄陈镇", "鸡峰镇", "苏元镇", "索池镇", "宋坪乡", "二郎乡", "镡河乡"], ["城关镇", "碧口镇", "尚德镇", "中寨镇", "临江镇", "桥头镇", "黎坪镇", "天池镇", "堡子坝镇", "石坊镇", "石鸡坝镇", "丹堡镇", "中庙镇", "范坝镇", "铁楼藏族乡", "刘家坪乡", "玉垒乡", "口头坝乡", "尖山乡", "舍书乡"], ["城关镇", "哈达铺镇", "理川镇", "南阳镇", "官亭镇", "沙湾镇", "阿坞乡", "南河乡", "八力乡", "木耳乡", "庞家乡", "何家堡乡", "贾河乡", "将台乡", "车拉乡", "新城子藏族乡", "临江乡", "好梯乡", "韩院乡", "竹院乡", "兴化乡", "甘江头乡", "新寨乡", "狮子乡", "两河口乡"], ["城关镇", "平洛镇", "大堡镇", "岸门口镇", "两河镇", "长坝镇", "云台镇", "阳坝镇", "王坝镇", "碾坝镇", "豆坝镇", "望关镇", "大南峪镇", "周家坝镇", "寺台乡", "迷坝乡", "店子乡", "白杨乡", "太石乡", "铜钱乡", "三河坝乡"], ["汉源镇", "长道镇", "何坝镇", "姜席镇", "石峡镇", "洛峪镇", "西峪镇", "马元镇", "大桥镇", "石堡乡", "苏河乡", "卢河乡", "兴隆乡", "稍峪乡", "晒经乡", "十里乡", "蒿林乡", "太石河乡", "六巷乡", "西高山乡"], ["城关镇", "盐官镇", "石桥镇", "白河镇", "宽川镇", "永兴镇", "祁山镇", "红河镇", "永坪镇", "中坝镇", "罗坝镇", "雷坝镇", "崖城镇", "洮坪镇", "龙林镇", "马河乡", "固城乡", "湫山乡", "上坪乡", "江口乡", "雷王乡", "白关乡", "沙金乡", "桥头乡", "草坪乡", "王坝乡", "肖良乡", "三峪乡", "滩坪乡"], ["城关镇", "伏家镇", "江洛镇", "泥阳镇", "柳林镇", "嘉陵镇", "永宁镇", "银杏树镇", "水阳镇", "栗川镇", "麻沿河镇", "高桥镇", "大河店镇", "榆树乡", "虞关乡"], ["城关镇", "站儿巷镇", "西坡镇", "杨店乡", "左家乡", "显龙乡", "鱼池乡", "兴化乡", "张家乡", "云屏乡", "泰山乡", "金洞乡"]], [["城南街道", "城北街道", "东关街道", "西关街道", "八坊街道", "红园街道", "东区街道", "城郊镇", "枹罕镇", "南龙镇", "折桥镇"], ["韩集镇", "土桥镇", "马集镇", "莲花镇", "新集镇", "尹集镇", "营滩乡", "掌子沟乡", "麻尼寺沟乡", "漠泥沟乡", "刁祁乡", "漫路乡", "榆林乡", "井沟乡", "北塬乡", "坡头乡", "桥寺乡", "先锋乡", "河西乡", "安家坡乡", "南塬乡", "红台乡", "黄泥湾乡", "路盘乡", "民主乡"], ["附城镇", "苏集镇", "胭脂镇", "景古镇", "莲麓镇", "康丰乡", "虎关乡", "流川乡", "白王乡", "八松乡", "鸣鹿乡", "八丹乡", "上湾乡", "草滩乡", "五户乡"], ["刘家峡镇", "盐锅峡镇", "太极镇", "西河镇", "三塬镇", "岘塬镇", "陈井镇", "川城镇", "王台镇", "红泉镇", "关山乡", "徐顶乡", "三条岘乡", "坪沟乡", "新寺乡", "小岭乡", "杨塔乡"], ["城关镇", "三甲集镇", "祁家集镇", "庄禾集镇", "买家巷镇", "齐家镇", "水泉乡", "官坊乡", "阿力麻土东乡族乡"], ["城关镇", "三合镇", "三十里铺镇", "马家堡镇", "买家集镇", "松鸣镇", "梁家寺乡", "陈家集乡", "罗家集乡", "卜家庄乡", "新营乡", "新庄乡", "达浪乡"], ["锁南镇", "达板镇", "河滩镇", "那勒寺镇", "唐汪镇", "春台乡", "柳树乡", "东塬乡", "坪庄乡", "百和乡", "关卜乡", "赵家乡", "五家乡", "果园乡", "沿岭乡", "汪集乡", "风山乡", "车家湾乡", "高山乡", "大树乡", "北岭乡", "龙泉乡", "考勒乡", "董岭乡"], ["吹麻滩镇", "大河家镇", "居集镇", "癿藏镇", "刘集乡", "石塬乡", "柳沟乡", "关家川乡", "胡林家乡", "安集乡", "寨子沟乡", "郭干乡", "徐扈家乡", "中咀岭乡", "小关乡", "铺川乡", "银川乡"]], [["当周街道", "伊合昂街道", "坚木克尔街道", "通钦街道", "卡加曼乡", "卡加道乡", "佐盖多玛乡", "佐盖曼玛乡", "勒秀乡", "那吾乡", "甘南州综合实验场", "合作市苗圃"], ["城关镇", "新城镇", "冶力关镇", "羊永镇", "王旗镇", "初布乡", "古战回族乡", "卓洛回族乡", "长川回族乡", "流顺乡", "店子乡", "洮滨乡", "三岔乡", "石门乡", "羊沙乡", "八角乡"], ["柳林镇", "木耳镇", "扎古录镇", "纳浪乡", "喀尔钦乡", "刀告乡", "尼巴乡", "完冒乡", "阿子塘乡", "申藏乡", "恰盖乡", "康多乡", "勺哇土族乡", "洮砚乡", "藏巴哇乡", "卓尼县林场", "国营大峪牧场", "国营柏林牧场"], ["城关镇", "大川镇", "峰迭镇", "立节镇", "曲瓦乡", "巴藏乡", "大峪乡", "憨班乡", "坪定乡", "江盘乡", "东山乡", "南峪乡", "果耶乡", "八楞乡", "武坪乡", "插岗乡", "拱坝乡", "曲告纳乡", "博峪乡", "舟曲县林场"], ["电尕镇", "益哇乡", "卡坝乡", "达拉乡", "尼傲乡", "旺藏乡", "阿夏乡", "多儿乡", "桑坝乡", "腊子口乡", "洛大乡", "国营迭部县林场"], ["尼玛镇", "欧拉乡", "欧拉秀玛乡", "阿万仓乡", "木西合乡", "齐哈玛乡", "采日玛乡", "曼日玛乡", "河曲马场", "大水军牧场", "高原生物研究所"], ["郎木寺镇", "玛艾镇", "尕海乡", "西仓乡", "拉仁关乡", "双岔乡", "阿拉乡", "双岔林场", "李恰如种畜场"], ["拉卜楞镇", "王格尔塘镇", "阿木去乎镇", "桑科乡", "甘加乡", "达麦乡", "麻当乡", "曲奥乡", "唐尕昂乡", "扎油乡", "博拉乡", "吉仓乡", "科才乡", "夏河县种子站", "夏河县机饲总站", "夏河县桑科种羊场"]]], [[["东关大街社区公共服务中心", "清真巷社区公共服务中心", "大众街社区公共服务中心", "周家泉社区公共服务中心", "火车站社区公共服务中心", "康乐社区公共服务中心", "林家崖社区公共服务中心", "国际村社区公共服务中心", "富强巷社区公共服务中心", "青藏花园社区公共服务中心", "泰宁社区公共服务中心", "互助中路社区公共服务中心", "乐家湾镇政府", "韵家口镇政府"], ["人民街街道", "南滩街道", "仓门街街道", "礼让街街道", "饮马街街道", "南川东路街道", "南川西路街道", "总寨镇", "南川工业园"], ["西关大街街道", "古城台街道", "虎台街道", "胜利路街道", "兴海路街道", "文汇路街道", "通海路街道", "彭家寨镇"], ["朝阳街道", "小桥大街街道", "马坊街道", "火车西站", "大堡子镇", "廿里铺镇", "生物科技产业园"], ["桥头镇", "城关镇", "塔尔镇", "东峡镇", "黄家寨镇", "长宁镇", "景阳镇", "多林镇", "新庄镇", "青林乡", "青山乡", "逊让乡", "极乐乡", "石山乡", "宝库乡", "斜沟乡", "良教乡", "向化藏族乡", "桦林乡", "朔北藏族乡"], ["康川街道", "鲁沙尔镇", "西堡镇", "上新庄镇", "田家寨镇", "甘河滩镇", "共和镇", "多巴镇", "拦隆口镇", "上五庄镇", "李家山镇", "群加乡", "土门关乡", "汉东乡", "大才乡", "海子沟乡", "甘河工业园"], ["城关镇", "大华镇", "东峡乡", "日月乡", "和平乡", "波航乡", "申中乡", "巴燕乡", "寺寨乡"]], [["碾伯镇", "雨润镇", "寿乐镇", "高庙镇", "洪水镇", "高店镇", "瞿昙镇", "共和乡", "中岭乡", "李家乡", "下营乡", "芦化乡", "马营乡", "马厂乡", "蒲台乡", "中坝乡", "峰堆乡", "城台乡", "达拉乡"], ["平安镇", "小峡镇", "三合镇", "洪水泉乡", "石灰窑乡", "古城乡", "沙沟乡", "巴藏沟乡", "曹家堡临空综合经济园平安园区"], ["川口镇", "古鄯镇", "马营镇", "官亭镇", "巴州镇", "满坪镇", "李二堡镇", "峡门镇", "马场垣乡", "北山乡", "松树乡", "西沟乡", "总堡乡", "隆治乡", "大庄乡", "转导乡", "前河乡", "甘沟乡", "中川乡", "杏儿乡", "核桃庄乡", "新民乡"], ["威远镇", "丹麻镇", "高寨镇", "南门峡镇", "加定镇", "塘川镇", "五十镇", "五峰镇", "台子乡", "西山乡", "红崖子沟乡", "巴扎藏族乡", "哈拉直沟乡", "松多藏族乡", "东山乡", "东和乡", "东沟乡", "林川乡", "蔡家堡乡", "曹家堡临空综合经济园互助园区"], ["巴燕镇", "群科镇", "牙什尕镇", "甘都镇", "扎巴镇", "昂思多镇", "雄先藏族乡", "初麻乡", "查甫藏族乡", "塔加藏族乡", "金源藏族乡", "二塘乡", "谢家滩乡", "德恒隆乡", "沙连堡乡", "阿什奴乡", "石大仓乡", "李家峡管理委员会", "公伯峡管理委员会"], ["积石镇", "白庄镇", "街子镇", "道帏藏族乡", "清水乡", "岗察藏族乡", "查汗都斯乡", "文都藏族乡", "尕楞藏族乡"]], [["浩门镇", "青石咀镇", "泉口镇", "东川镇", "北山乡", "麻莲乡", "西滩乡", "阴田乡", "仙米乡", "珠固乡", "苏吉滩乡", "皇城蒙古族乡", "门源监狱", "门源种马场"], ["八宝镇", "峨堡镇", "默勒镇", "扎麻什乡", "阿柔乡", "野牛沟乡", "央隆乡"], ["三角城镇", "西海镇", "金滩乡", "哈勒景蒙古族乡", "青海湖乡", "甘子河乡"], ["沙柳河镇", "哈尔盖镇", "伊克乌兰乡", "泉吉乡", "吉尔孟乡", "青海湖农场", "三角城种羊场"]], [["隆务镇", "保安镇", "多哇镇", "兰采乡", "双朋西乡", "扎毛乡", "黄乃亥乡", "曲库乎乡", "年都乎乡", "瓜什则乡", "加吾乡"], ["马克堂镇", "康扬镇", "坎布拉镇", "贾加乡", "措周乡", "昂拉乡", "能科乡", "当顺乡", "尖扎滩乡"], ["泽曲镇", "麦秀镇", "和日镇", "宁秀乡", "王加乡", "西卜沙乡", "多禾茂乡"], ["优干宁镇", "宁木特镇", "多松乡", "赛尔龙乡", "柯生乡"]], [["恰卜恰镇", "倒淌河镇", "龙羊峡镇", "塘格木镇", "黑马河乡", "石乃亥乡", "沙珠玉乡", "铁盖乡", "廿地乡", "切吉乡", "江西沟乡", "湖东种羊场", "巴卡台农场", "安置农场", "铁卜加草改站"], ["尕巴松多镇", "唐谷镇", "巴沟乡", "秀麻乡", "河北乡", "省牧草良种繁殖场"], ["河阴镇", "河西镇", "拉西瓦镇", "常牧镇", "河东乡", "新街回族乡", "尕让乡"], ["子科滩镇", "河卡镇", "曲什安镇", "温泉乡", "龙藏乡", "中铁乡", "唐乃亥乡", "河卡种羊场"], ["茫曲镇", "过马营镇", "森多镇", "沙沟乡", "茫拉乡", "塔秀乡", "贵南草业开发有限责任公司"]], [["大武镇", "拉加镇", "大武乡", "东倾沟乡", "雪山乡", "下大武乡", "优云乡", "当洛乡"], ["赛来塘镇", "多贡麻乡", "马可河乡", "吉卡乡", "达卡乡", "知钦乡", "江日堂乡", "亚尔堂乡", "灯塔乡"], ["柯曲镇", "上贡麻乡", "下贡麻乡", "岗龙乡", "青珍乡", "江千乡", "下藏科乡"], ["吉迈镇", "满掌乡", "德昂乡", "窝赛乡", "莫坝乡", "上红科乡", "下红科乡", "建设乡", "桑日麻乡", "特合土乡"], ["智青松多镇", "门堂乡", "哇赛乡", "索呼日麻乡", "白玉乡", "哇尔依乡"], ["玛查理镇", "花石峡镇", "黄河乡", "扎陵湖乡"]], [["结古镇街道", "扎西科街道", "西杭街道", "新寨街道", "隆宝镇", "下拉秀镇", "仲达乡", "巴塘乡", "小苏莽乡", "上拉秀乡", "哈秀乡", "安冲乡"], ["萨呼腾镇", "昂赛乡", "结多乡", "阿多乡", "苏鲁乡", "查旦乡", "莫云乡", "扎青乡"], ["称文镇", "歇武镇", "扎朵镇", "清水河镇", "珍秦镇", "尕朵乡", "拉布乡"], ["加吉博洛格镇", "索加乡", "扎河乡", "多彩乡", "治渠乡", "立新乡"], ["香达镇", "白扎乡", "吉曲乡", "娘拉乡", "毛庄乡", "觉拉乡", "东坝乡", "尕羊乡", "吉尼赛乡", "着晓乡"], ["约改镇", "巴干乡", "秋智乡", "叶格乡", "麻多乡", "曲麻河乡"]], [["昆仑路街道", "黄河路街道", "金峰路街道", "河西街道", "西藏路街道", "郭勒木德镇", "唐古拉镇", "大格勒乡", "乌图美仁乡", "察尔汗工行委", "格尔木农垦有限公司"], ["河西街道", "河东街道", "火车站街道", "尕海镇", "怀头他拉镇", "柯鲁柯镇", "蓄集乡"], ["希里沟镇", "茶卡镇", "柯柯镇", "铜普镇", "海西州莫河畜牧场"], ["察汉乌苏镇", "香日德镇", "夏日哈镇", "宗加镇", "热水乡", "香加乡", "沟里乡", "巴隆乡"], ["新源镇", "木里镇", "江河镇", "快尔玛乡", "舟群乡", "织合玛乡", "苏里乡", "生格乡", "阳康乡", "龙门乡"]]], [[["凤凰北街街道", "解放西街街道", "文化街街道", "富宁街街道", "新华街街道", "玉皇阁北街街道", "前进街街道", "中山南街街道", "银古路街道", "胜利街街道", "丽景街街道", "掌政镇", "大新镇", "通贵乡", "月牙湖乡", "燕鸽湖管委会"], ["西花园街道", "北京西路街道", "文昌路街道", "朔方路街道", "宁华路街道", "贺兰山西路街道", "怀远路街道", "兴泾镇", "镇北堡镇"], ["满城北街街道", "黄河东路街道", "长城中路街道", "北京中路街道", "上海西路街道", "良田镇", "丰登镇"], ["杨和镇", "李俊镇", "望远镇", "望洪镇", "闽宁镇", "胜利乡", "黄羊滩农场", "玉泉营农场"], ["习岗镇", "金贵镇", "立岗镇", "洪广镇", "常信乡", "南梁台子管委会", "暖泉农场", "宁夏原种场", "京星农牧场"], ["城区街道", "东塔镇", "郝家桥镇", "崇兴镇", "宁东镇", "马家滩镇", "临河镇", "梧桐树乡", "白土岗乡", "灵武农场", "狼皮子梁管委会"]], [["长胜街道", "朝阳街道", "人民路街道", "长城街道", "青山街道", "石炭井街道", "白芨沟街道", "沟口街道", "长兴街道", "锦林街道", "星海镇"], ["育才路街道", "南街街道", "中街街道", "北街街道", "河滨街道", "火车站街道", "红果子镇", "尾闸镇", "园艺镇", "庙台乡", "礼和乡", "燕子墩乡", "简泉农场", "国营农林牧场", "良种繁殖场"], ["城关镇", "黄渠桥镇", "宝丰镇", "头闸镇", "姚伏镇", "崇岗镇", "陶乐镇", "高庄乡", "灵沙乡", "渠口乡", "通伏乡", "高仁乡", "红崖子乡", "前进农场"]], [["金积镇", "金银滩镇", "高闸镇", "扁担沟镇", "上桥镇", "古城镇", "金星镇", "胜利镇", "东塔寺乡", "板桥乡", "马莲渠乡", "郭家桥乡", "巴浪湖农场", "孙家滩管委会", "太阳山开发区"], ["红寺堡区新民街道", "红寺堡区红寺堡镇", "红寺堡区太阳山镇", "红寺堡区大河乡", "红寺堡区新庄集乡", "红寺堡区柳泉乡", "红寺堡工业园区管委会"], ["花马池镇", "大水坑镇", "惠安堡镇", "高沙窝镇", "王乐井乡", "冯记沟乡", "青山乡", "麻黄山乡"], ["豫海镇", "河西镇", "韦州镇", "下马关镇", "预旺镇", "王团镇", "丁塘镇", "田老庄乡", "马高庄乡", "张家塬乡", "兴隆乡"], ["裕民街道", "小坝镇", "大坝镇", "青铜峡镇", "叶盛镇", "瞿靖镇", "峡口镇", "邵岗镇", "陈袁滩镇", "连湖农场", "树新林场"]], [["南关街道", "古雁街道", "北塬街道", "三营镇", "官厅镇", "开城镇", "张易镇", "彭堡镇", "头营镇", "黄铎堡镇", "中河乡", "河川乡", "炭山乡", "寨科乡"], ["吉强镇", "兴隆镇", "平峰镇", "新营乡", "红耀乡", "田坪乡", "马建乡", "震湖乡", "兴平乡", "西滩乡", "王民乡", "什字乡", "马莲乡", "将台乡", "硝河乡", "偏城乡", "沙沟乡", "白崖乡", "火石寨乡"], ["城关镇", "沙塘镇", "联财镇", "陈靳乡", "好水乡", "观庄乡", "杨河乡", "神林乡", "张程乡", "凤岭乡", "山河乡", "温堡乡", "奠安乡"], ["香水镇", "泾河源镇", "六盘山镇", "新民乡", "兴盛乡", "黄花乡", "大湾乡"], ["白阳镇", "王洼镇", "古城镇", "红河镇", "新集乡", "城阳乡", "冯庄乡", "小岔乡", "孟塬乡", "罗洼乡", "交岔乡", "草庙乡"]], [["滨河镇", "文昌镇", "东园镇", "柔远镇", "镇罗镇", "宣和镇", "永康镇", "常乐镇", "迎水桥镇", "兴仁镇", "香山乡", "中卫山羊选育场", "中卫工业园区"], ["宁安镇", "鸣沙镇", "石空镇", "新堡镇", "恩和镇", "大战场镇", "舟塔乡", "白马乡", "余丁乡", "喊叫水乡", "徐套乡", "长山头农场", "渠口农场"], ["海城镇", "李旺镇", "西安镇", "三河镇", "七营镇", "史店乡", "树台乡", "关桥乡", "高崖乡", "郑旗乡", "贾塘乡", "曹洼乡", "九彩乡", "李俊乡", "红羊乡", "关庄乡", "甘城乡", "种羊场", "涵养林总场", "老城管理办公室", "海兴开发区"]]], [[["燕儿窝街道", "胜利路街道", "团结路街道", "解放南路街道", "新华南路街道", "和平路街道", "解放北路街道", "幸福路街道", "东门街道", "新华北路街道", "青年路街道", "碱泉街道", "延安路街道", "红雁街道", "南草滩街道", "二道桥街道", "黑甲山街道", "大湾街道", "赛马场街道"], ["长江路街道", "和田街街道", "扬子江路街道", "友好南路街道", "友好北路街道", "八一街道", "炉院街街道", "西山街道", "雅玛里克山街道", "红庙子街道", "长胜东街道", "长胜西街道", "长胜南街道", "火车南站街道", "仓房沟片区街道", "环卫路街道", "骑马山街道", "平顶山街道", "兵团农十二师一零四团", "兵团十二师西山农场"], null, ["水磨沟街道", "六道湾街道", "苇湖梁街道", "八道湾街道", "新民路街道", "南湖南路街道", "南湖北路街道", "七道湾街道", "榆树沟街道", "石人子沟街道", "水塔山街道", "华光街街道", "龙盛街街道", "振安街街道"], ["头屯河街道", "火车西站街道", "王家沟街道", "乌昌路街道", "北站西路街道", "头屯河区乡类似乡镇单位", "兵团十二师三坪农场", "兵团十二师五一农场", "新疆兵团十二师头屯河农场"], ["艾维尔沟街道", "乌拉泊街道", "达坂城区盐湖街道", "达坂城镇", "东沟乡", "西沟乡", "阿克苏乡", "柴窝堡管委会"], ["石化街道", "地磅街道", "卡子湾街道", "古牧地东路街道", "古牧地西路街道", "南路街道", "永祥街街道", "盛达东路片区管委会", "古牧地镇", "铁厂沟镇", "长山子镇", "羊毛工镇", "三道坝镇", "柏杨河乡", "芦草沟乡"], ["水西沟镇", "板房沟镇", "萨尔达坂乡", "甘沟乡", "永丰乡", "托里乡"]], [["金山路街道", "西宁路街道", "新北区"], ["天山路街道", "胜利路街道", "昆仑路街道", "银河路街道", "金龙镇街道", "五五新镇街道", "小拐乡", "农业开发区", "兵团一二九团", "兵团一三六团"], ["中兴路街道", "三平路街道"], ["柳树街街道", "乌尔禾镇", "兵团一三七团"]], [["老城路街道", "高昌路街道", "葡萄沟街道", "七泉湖镇", "大河沿镇", "亚尔镇", "艾丁湖镇", "葡萄镇", "恰特喀勒乡", "二堡乡", "三堡乡", "胜金乡", "红柳河园艺场", "原种场", "兵团二二一团"], ["鄯善镇", "七克台镇", "火车站镇", "连木沁镇", "鲁克沁镇", "辟展乡", "东巴扎回族民族乡", "吐峪沟乡", "达朗坎乡", "迪坎乡", "南山矿区", "园艺场"], ["托克逊镇", "库米什镇", "克尔碱镇", "阿乐惠镇", "伊拉湖镇", "夏乡", "郭勒布依乡", "博斯坦乡"]], [["东河区街道", "西河区街道", "新市区街道", "丽园街道", "石油新城街道", "雅满苏镇", "七角井镇", "星星峡镇", "二堡镇", "陶家宫镇", "五堡镇", "沁城乡", "乌拉台哈萨克民族乡", "双井子乡", "大泉湾乡", "回城乡", "花园乡", "南湖乡", "德外里都如克哈萨克乡", "西山乡", "天山乡", "白石头乡", "柳树沟乡", "三道岭矿区", "巴里坤县山南开发区", "伊吾县山南开发区管委会", "现代农业园区管理委员会", "哈密伊吾马场", "哈密工业园区", "兵团红星一场", "兵团红星二场", "兵团红星四场", "兵团黄田农场", "兵团火箭农场", "兵团柳树泉农场"], ["巴里坤镇", "博尔羌吉镇", "大河镇", "奎苏镇", "三塘湖镇", "萨尔乔克乡", "海子沿乡", "下涝坝乡", "石人子乡", "花园乡", "大红柳峡乡", "八墙子乡", "良种繁育场", "黄土场开发区", "兵团红山农场"], ["伊吾镇", "淖毛湖镇", "盐池镇", "苇子峡乡", "下马崖乡", "吐葫芦乡", "前山哈萨克民族乡", "伊吾县工业加工区", "兵团淖毛湖农场"]], [["宁边路", "延安北路", "北京南路", "建国路", "中山路街道", "绿洲路街道", "硫磺沟镇", "三工镇", "榆树沟镇", "二六工镇", "大西渠镇", "六工镇", "滨湖镇", "佃坝镇", "阿什里哈萨克民族乡", "庙尔沟乡", "新疆昌吉国家农业科技园区管理委员会", "昌吉市北部荒漠生态保护管理站", "昌吉国家高新技术产业开发区", "兵团共青团农场", "兵团军户农场"], ["博峰街", "阜新街", "准东", "甘河子镇", "城关镇", "九运街镇", "滋泥泉子镇", "上户沟哈萨克民族乡", "水磨沟乡", "三工河哈萨克民族乡", "兵团农六师土墩子农场", "兵团六运湖农场", "兵团二二二团农场"], ["呼图壁镇", "大丰镇", "雀尔沟镇", "二十里店镇", "园户村镇", "五工台镇", "石梯子哈萨克民族乡", "县良种繁育场", "干河子林场", "呼图壁种牛场", "兵团一零五团", "兵团一零六团", "兵团芳草湖总场"], ["玛纳斯镇", "乐土驿镇", "包家店镇", "凉州户镇", "北五岔镇", "六户地镇", "兰州湾镇", "广东地乡", "清水河子哈萨克民族乡", "塔西河乡", "旱卡子滩乡", "玛电工业区", "园艺场", "自治区林业厅玛纳斯平原林场", "新疆农科院玛纳斯试验站", "兵团农六师新湖农场", "兵团一四七团", "兵团一四八团", "兵团一四九团", "兵团一五零团"], ["奇台镇", "老奇台镇", "半截沟镇", "吉布库镇", "东湾镇", "西地镇", "碧流河镇", "三个庄子镇", "西北湾镇", "坎尔孜乡", "五马场乡", "古城乡", "乔仁乡", "七户乡", "塔塔尔乡", "兵团奇台农场", "兵团农六师北塔山牧场"], ["吉木萨尔镇", "三台镇", "泉子街镇", "北庭镇", "二工镇", "大有镇", "庆阳湖乡", "老台乡", "新地乡", "五彩湾工业园区", "兵团农六师红旗农场"], ["木垒镇", "木垒县西吉尔镇", "木垒县东城镇", "新户镇", "英格堡乡", "照壁山乡", "雀仁乡", "白杨河乡", "大石头乡", "大南沟乌孜别克乡", "博斯坦乡", "良种繁育场", "克热克库都克牧场"]], [["青得里街道", "顾力木图街道", "南城区街道", "小营盘镇", "达勒特镇", "乌图布拉格镇", "青得里镇", "贝林哈日莫墩乡", "阿热勒托海牧场", "五台工业园区", "兵团八十一团", "兵团八十四团", "兵团八十六团", "兵团八十九团", "兵团九十团"], ["阿拉套街道", "艾比湖镇"], ["精河镇", "大河沿子镇", "托里镇", "托托镇", "茫丁乡", "阿合其农场", "八家户农场", "精河工业园区", "兵团八十三团", "兵团九十一团"], ["博格达尔镇", "哈日布呼镇", "安格里格镇", "查干屯格乡", "扎勒木特乡", "塔秀乡", "呼和托哈种畜场", "昆得仑牧场", "孟克牧场", "兵团八十七团", "兵团八十八团"]], [["团结街道", "萨依巴格街道", "天山街道", "新城街道", "建设街道", "塔什店镇", "上户镇", "库尔勒市西尼尔镇", "铁克其乡", "恰尔巴格乡", "英下乡", "库尔勒市兰干乡", "和什力克乡", "哈拉玉宫乡", "阿瓦提乡", "库尔勒市托布力其乡", "普惠乡", "库尔楚园艺场", "包头湖农场", "普惠农场", "巴州阿瓦提农场", "巴州沙依东园艺场", "巴州奶牛场", "普惠牧场", "经济牧场", "良种场", "兵团二十九团", "兵团三十团"], ["轮台镇", "轮南镇", "群巴克镇", "阳霞镇", "哈尔巴克乡", "野云沟乡", "阿克萨来乡", "塔尔拉克乡", "草湖乡", "铁热克巴扎乡", "策达雅乡"], ["尉犁镇", "团结镇", "塔里木乡", "兴平乡", "墩阔坦乡", "喀尔曲尕乡", "阿克苏普乡", "古勒巴格乡", "兵团三十一团", "兵团三十三团", "兵团三十四团"], ["若羌镇", "依吞布拉克镇", "罗布泊镇", "瓦石峡镇", "铁干里克镇", "吾塔木乡", "铁木里克乡", "祁曼塔克乡", "兵团三十六团"], ["且末镇", "奥依亚依拉克镇", "塔提让镇", "塔中镇", "阿羌镇", "阿热勒乡", "琼库勒乡", "托格拉克勒克乡", "巴格艾日克乡", "英吾斯塘乡", "阿克提坎墩乡", "阔什萨特玛乡", "库拉木勒克乡", "兵团三十七团", "兵团三十八团"], ["焉耆镇", "七个星镇", "永宁镇", "四十里城子镇", "北大渠乡", "五号渠乡", "查汗采开乡", "包尔海乡", "王家庄牧场", "苏海良种场", "兵团二十七团"], ["和静镇", "巴仑台镇", "巴润哈尔莫墩镇", "哈尔莫墩镇", "巴音布鲁克镇", "巩乃斯镇", "乃门莫墩镇", "协比乃尔布呼乡", "克尔古提乡", "阿拉沟乡", "额勒再特乌鲁乡", "巴音郭愣乡", "乌拉斯台农场", "兵团二十一团", "兵团二十二团", "兵团二二三团", "兵团农二师湖光糖厂"], ["特吾里克镇", "塔哈其镇", "曲惠镇", "乌什塔拉回族民族乡", "苏哈特乡", "乃仁克尔乡", "新塔热乡", "清水河农场", "和硕县马兰公安管区", "兵团二师二十四团"], ["博湖镇", "本布图镇", "塔温觉肯乡", "乌兰再格森乡", "才坎诺尔乡", "查干诺尔乡", "博斯腾湖乡", "兵团二十五团"]], [["栏杆街道", "英巴扎街道", "红桥街道", "新城街道", "南城街道", "柯柯牙街道", "多浪街道", "喀勒塔勒镇", "阿依库勒镇", "依干其乡", "拜什吐格曼乡", "托普鲁克乡", "库木巴希乡", "红旗坡农场", "实验林场", "纺织工业城", "经济技术开发区", "特色产业园区"], ["温宿镇", "吐木秀克镇", "克孜勒镇", "阿热勒镇", "佳木镇", "托甫汗镇", "共青团镇", "柯柯牙镇", "托乎拉乡", "恰格拉克乡", "依希来木其乡", "古勒阿瓦提乡", "博孜墩柯尔克孜族乡", "兵团五团", "兵团六团"], ["热斯坦街道", "萨克萨克街道", "新城街道", "东城街道", "乌恰镇", "阿拉哈格镇", "齐满镇", "墩阔坦镇", "牙哈镇", "乌尊镇", "依西哈拉镇", "雅克拉镇", "玉奇吾斯塘乡", "比西巴格乡", "哈尼喀塔木乡", "阿克吾斯塘乡", "阿格乡", "塔里木乡", "水电二处", "库车种羊场", "库车监狱"], ["沙雅镇", "托依堡勒迪镇", "红旗镇", "英买力镇", "沙雅县哈德墩镇", "古勒巴格镇", "海楼镇", "努尔巴格乡", "塔里木乡", "盖孜库木乡", "央塔克协海尔乡", "新垦农场", "二牧场", "沙雅监狱", "沙雅县工业集中区"], ["新和镇", "尤鲁都斯巴格镇", "依其艾日克镇", "排先拜巴扎乡", "塔什艾日克乡", "渭干乡", "玉奇喀特乡", "塔木托格拉克乡", "桑塔木农场", "新和县工业园区"], ["拜城镇", "铁热克镇", "察尔其镇", "赛里木镇", "黑英山乡", "克孜尔乡", "托克逊乡", "亚吐尔乡", "康其乡", "布隆乡", "米吉克乡", "温巴什乡", "大桥乡", "老虎台乡", "大宛其农场", "种羊场"], ["乌什镇", "阿合雅镇", "依麻木镇", "阿克托海乡", "亚科瑞克乡", "阿恰塔格乡", "英阿瓦提乡", "亚曼苏柯尔克孜族乡", "奥特贝希乡", "兵团四团"], ["阿瓦提镇", "乌鲁却勒镇", "拜什艾日克镇", "阿依巴格乡", "塔木托格拉克乡", "英艾日克乡", "多浪乡", "巴格托格拉克乡", "阿克苏监狱"], ["柯坪镇", "盖孜力克镇", "阿恰勒镇", "玉尔其乡", "启浪乡"]], [["幸福路街道", "光明路街道", "上阿图什镇", "松他克乡", "阿扎克乡", "阿湖乡", "格达良乡", "哈拉峻乡", "吐古买提乡", "兵团农三师红旗农场"], ["阿克陶镇", "奥依塔克镇", "玉麦乡", "皮拉勒乡", "巴仁乡", "喀热克其克乡", "加马铁热克乡", "木吉乡", "布伦口乡", "克孜勒陶乡", "恰尔隆乡", "库斯拉甫乡", "塔尔塔吉克族乡", "托尔塔依农场", "阿克达拉牧场", "原种场", "克孜勒苏柯尔克孜自治州林场", "苗圃"], ["阿合奇镇", "库兰萨日克乡", "色帕巴依乡", "苏木塔什乡", "哈拉奇乡", "哈拉布拉克乡"], ["乌恰镇", "康苏镇", "乌鲁克恰提乡", "吾合沙鲁乡", "膘尔托阔依乡", "黑孜韦乡", "托云乡", "铁列克乡", "巴音库鲁提乡", "波斯坦铁列克乡", "吉根乡", "兵团托云牧场"]], [["恰萨街道", "亚瓦格街道", "吾斯塘博依街道", "库木德尔瓦扎街道", "乃则尔巴格镇", "夏马勒巴格镇", "多来特巴格乡", "浩罕乡", "色满乡", "荒地乡", "帕哈太克里乡", "伯什克然木乡", "阿瓦提乡", "英吾斯坦乡", "阿克喀什乡"], ["托克扎克镇", "兰干镇", "吾库萨克镇", "乌帕尔镇", "塔什米里克乡", "铁日木乡", "布拉克苏乡", "萨依巴格乡", "站敏乡", "木什乡", "县种畜场", "县园艺场", "县林场", "县良种场", "县英艾力克大畜场", "疏附广州工业城"], ["疏勒镇", "罕南力克镇", "牙甫泉镇", "巴仁乡", "洋大曼乡", "亚曼牙乡", "巴合齐乡", "塔孜洪乡", "英尔力克乡", "库木西力克乡", "塔合其乡", "艾尔木东乡", "阿拉力乡", "阿拉甫乡", "英阿瓦提乡", "疏勒南疆齐鲁工业园区", "兵团四十一团"], ["城镇", "乌恰镇", "城关乡", "乔勒潘乡", "龙甫乡", "芒辛乡", "色提力乡", "萨罕乡", "英也尔乡", "克孜勒乡", "托普鲁克乡", "苏盖提乡", "艾古斯乡", "依格孜也尔乡", "英吉沙工业园区", "兵团东风农场"], ["泽普镇", "奎依巴格镇", "波斯喀木乡", "泽普县依玛乡", "古勒巴格乡", "赛力乡", "依肯苏乡", "图呼其乡", "奎依巴格乡", "阿克塔木乡", "阿依库勒乡", "布依鲁克塔吉克族乡", "农场场部", "泽普县良种场", "园艺场", "国营林场"], ["叶尔羌街道", "莎车镇", "恰热克镇", "艾力西湖镇", "荒地镇", "阿瓦提镇", "白什坎特镇", "依盖尔其镇", "古勒巴格镇", "阿热勒乡", "恰尔巴格乡", "托木吾斯塘乡", "英吾斯塘乡", "乌达力克乡", "阿尔斯兰巴格乡", "孜热甫夏提塔吉克族乡", "亚喀艾日克乡", "喀群乡", "霍什拉甫乡", "达木斯乡", "米夏乡", "伊什库力乡", "拍克其乡", "塔尕尔其乡", "阔什艾日克乡", "墩巴格乡", "阿拉买提乡", "阿扎特巴格乡", "巴格阿瓦提乡", "喀拉苏乡", "喀什监狱", "莎车县良种繁育场", "莎车县第一林场（国营苗圃）", "莎车县国营二林场", "莎车县园艺场", "莎车县蚕种场", "莎车县鱼苗场", "农科院莎车农业试验站", "工业园区管委会", "英阿瓦提管理委员会"], ["喀格勒克镇", "恰尔巴格镇", "乌夏巴什镇", "洛克乡", "伯西热克乡", "铁提乡", "恰萨美其特乡", "吐古其乡", "江格勒斯乡", "加依提勒克乡", "巴仁乡", "乌吉热克乡", "夏合甫乡", "依力克其乡", "依提木孔乡", "宗朗乡", "柯克亚乡", "西合休乡", "棋盘乡", "萨依巴格乡", "阿克塔什农场", "良种场", "园艺场", "林场", "普萨牧场", "恰其库木管理区", "叶城工业园区", "兵团叶城牧场"], ["麦盖提镇", "巴扎结米乡", "希依提墩乡", "央塔克乡", "吐曼塔勒乡", "尕孜库勒乡", "克孜勒阿瓦提乡", "库木库萨尔乡", "昂格特勒克乡", "库尔玛乡", "胡杨林场", "园艺场", "五一林场", "兵团农三师前进水库管理处", "兵团四十五团", "兵团四十六团"], ["岳普湖镇", "艾西曼镇", "铁热木镇", "也克先拜巴扎镇", "岳普湖乡", "阿其克乡", "色也克乡", "巴依阿瓦提乡", "阿洪鲁库木乡", "岳普湖县农场", "岳普湖县林场", "岳普湖县奶牛场", "岳普湖县良种场", "岳普湖县大畜场", "兵团四十二团"], ["巴仁镇", "西克尔库勒镇", "夏普吐勒镇", "卧里托格拉克镇", "铁日木乡", "英买里乡", "江巴孜乡", "克孜勒博依乡", "米夏乡", "和夏阿瓦提乡", "克孜勒苏乡", "古勒鲁克乡", "玉代克力克乡", "兵团伽师总场"], ["巴楚镇", "色力布亚镇", "阿瓦提镇", "三岔口镇", "恰尔巴格乡", "多来提巴格乡", "阿纳库勒乡", "夏马勒乡", "阿克萨克玛热勒乡", "阿拉根乡", "琼库恰克乡", "英吾斯坦乡", "兵团四十八团"], ["塔什库尔干镇", "塔吉克阿巴提镇", "塔什库尔干乡", "塔合曼乡", "科克亚尔柯尔克孜族乡", "提孜那甫乡", "达布达尔乡", "马尔洋乡", "瓦恰乡", "班迪尔乡", "库科西鲁格乡", "大同乡", "麻扎尔种羊场", "巴扎达什牧林场"]], [["奴尔巴格街道", "古江巴格街道", "古勒巴格街道", "纳尔巴格街道", "拉斯奎镇", "玉龙喀什镇", "肖尔巴格乡", "伊里其乡", "古江巴格乡", "吐沙拉乡", "吉亚乡", "阿克恰勒乡", "北京工业园区"], ["巴格其镇", "罕艾日克镇", "英阿瓦提乡", "英艾日克乡", "布扎克乡", "拉依喀乡", "朗如乡", "塔瓦库勒乡", "伊斯拉木阿瓦提乡", "色格孜库勒乡", "喀什塔什乡", "吾宗肖乡", "和田县经济新区"], ["喀拉喀什镇", "扎瓦镇", "奎牙镇", "喀尔赛镇", "阿克萨拉依乡", "乌尔其乡", "托胡拉乡", "萨依巴格乡", "加汗巴格乡", "普恰克其乡", "芒来乡", "阔依其乡", "雅瓦乡", "吐外特乡", "英也尔乡", "喀瓦克乡", "兵团四十七团", "兵团二二四团"], null, ["城区街道", "洛浦镇", "山普鲁镇", "布亚乡", "恰尔巴格乡", "杭桂乡", "多鲁乡", "纳瓦乡", "拜什托格拉克乡", "阿其克乡", "良种场", "洛浦县北京农业科技示范园区"], ["策勒镇", "固拉合玛镇", "策勒乡", "达玛沟乡", "恰哈乡", "乌鲁克萨依乡", "奴尔乡", "博斯坦乡", "兵团一牧场"], ["木尕拉镇", "先拜巴扎镇", "加依乡", "科克亚乡", "阿热勒乡", "阿日希乡", "兰干乡", "斯也克乡", "托格日尕孜乡", "喀拉克尔乡", "奥依托格拉克乡", "阿羌乡", "英巴格乡", "希吾勒乡", "达里雅布依乡", "拉依苏良种场", "国营（昆仑）种羊场", "于田监狱"], ["尼雅镇", "尼雅乡", "若克雅乡", "萨勒吾则克乡", "叶亦克乡", "安迪尔乡", "亚瓦通古孜乡"]], [["萨依布依街道", "墩买里街道", "伊犁河路街道", "喀赞其街道", "都来提巴格街道", "琼科瑞克街道", "艾兰木巴格街道", "解放路街道", "伊宁市边境经济合作区管委会", "巴彦岱镇", "潘津镇", "英也尔乡", "汉宾乡", "塔什科瑞克乡", "喀尔墩乡", "托格拉克乡", "克伯克圩孜乡", "达达木图乡", "伊犁州农业良种繁育中心", "伊宁市园艺场", "伊犁州奶牛场"], ["团结路街道办", "乌东路街道办", "北京路街道", "乌鲁木齐西路街道", "火车站街道办", "开干齐乡", "兵团一三一团", "天北新区"], ["卡拉苏河街道", "亚欧东路街道", "亚欧西路街道", "工业园区街道", "伊车嘎善乡", "格干沟牧场", "莫乎尔牧场"], ["吉里于孜镇", "墩麻扎镇", "英塔木镇", "胡地于孜镇", "巴依托海镇", "吐鲁番于孜乡", "喀拉亚尕奇乡", "武功乡", "萨地克于孜乡", "愉群翁回族乡", "阿热吾斯塘乡", "维吾尔玉其温乡", "萨木于孜乡", "喀什乡", "麻扎乡", "温亚尔乡", "阿乌利亚乡", "曲鲁海乡", "青年农场", "多浪农场", "兵团七十团中心团场"], ["察布查尔镇", "爱新色里镇", "孙扎齐牛录镇", "堆齐牛录乡", "绰霍尔乡", "纳达齐牛录乡", "扎库齐牛录乡", "米粮泉回族乡", "坎乡", "阔洪奇乡", "海努克乡", "加尕斯台乡", "琼博拉乡", "安班巴格良繁场", "伊犁州平原林场", "山区林场", "都拉塔口岸", "兵团六十七团", "兵团六十八团", "兵团六十九团"], ["水定镇", "清水河镇", "芦草沟镇", "惠远镇", "萨尔布拉克镇", "兰干乡", "三道河乡", "三宫乡", "大西沟乡", "果子沟牧场", "良种繁育中心", "煤炭局", "兵团六十一团", "兵团六十二团", "兵团六十三团", "兵团六十四团", "兵团六十六团（中心团场）"], ["巩留镇", "阿克吐别克镇", "库尔德宁镇", "东买里镇", "阿尕尔森镇", "吉尔格郎乡", "塔斯托别乡", "提克阿热克乡", "综合农场", "阔什阿尕什羊场", "牛场", "良凡场", "林场", "莫乎尔农场", "兵团七十三团"], ["新源镇", "则克台镇", "阿热勒托别镇", "塔勒德镇", "那拉提镇", "肖尔布拉克镇", "喀拉布拉镇", "阿勒玛勒镇", "别斯托别乡", "坎苏乡", "吐尔根乡", "种羊场", "公安农场", "兵团七十一团", "兵团七十二团"], ["昭苏镇", "喀夏加尔镇", "阿克达拉镇", "洪纳海乡", "乌尊布拉克乡", "萨尔阔布乡", "喀拉苏乡", "察汗乌苏蒙古族乡", "夏特柯尔克孜族乡", "胡松图喀尔逊蒙古族乡", "种马场", "天山西部林业局昭苏林场", "昭苏马场", "兵团七十四团", "兵团七十五团", "兵团七十六团", "兵团七十七团"], ["特克斯镇", "乔拉克铁热克镇", "喀拉达拉镇", "齐勒乌泽克镇", "喀拉托海镇", "呼吉尔特蒙古民族乡", "阔克苏乡", "阔克铁热克柯尔克孜民族乡", "特克斯军马场", "科克苏林场", "兵团七十八团"], ["尼勒克镇", "苏布台乡", "喀拉苏乡", "加哈乌拉斯台乡", "尼勒克县乌赞乡", "科克浩特浩尔蒙古民族乡", "乌拉斯台乡", "克令乡", "喀拉托别乡", "胡吉尔台乡", "木斯乡", "尼勒克马场", "种蜂场", "兵团七十九团"]], [["和平街道", "杜别克街道", "新城街道", "二工镇", "恰夏镇", "喀拉哈巴克乡", "阿西尔达斡尔民族乡", "阿不都拉乡", "也门勒乡", "恰合吉牧场", "博孜达克农场", "窝依加依劳牧场", "地区种牛场", "兵团农九师一六三团", "兵团农九师一六四团"], ["南苑街道", "虹桥街道", "新市区街道", "西城街道", "奎河街道", "白杨沟镇", "哈图布呼镇", "皇宫镇", "车排子镇", "甘河子镇", "百泉镇", "四棵树镇", "古尔图镇", "西湖镇", "西大沟镇", "八十四户乡", "夹河子乡", "九间楼乡", "石桥乡", "头台乡", "吉尔格勒特郭愣蒙古民族乡", "塔布勒合特蒙古民族乡", "甘家湖牧场", "巴音沟牧场", "赛力克提牧场", "乌苏监狱", "兵团一二三团", "兵团一二四团", "兵团一二五团", "兵团一二六团", "兵团一二七团", "兵团一二八团", "兵团一三零团"], ["额敏镇", "玉什喀拉苏镇", "杰勒阿尕什镇", "上户镇", "玛热勒苏镇", "喀拉也木勒镇", "郊区乡", "额玛勒郭楞蒙古民族乡", "喇嘛昭乡", "霍吉尔特蒙古民族乡", "二道桥乡", "二支河牧场", "加尔布拉克农场", "阔什比克良种场", "萨尔也木勒牧场", "也木勒牧场", "塔城地区种羊场", "吾宗布拉克牧场", "兵团农九师一六五团", "兵团农九师一六六团", "兵团农九师一六七团", "兵团农九师一六八团", "兵团农九师团结农场"], ["三道河子镇", "四道河子镇", "老沙湾镇", "乌兰乌苏镇", "安集海镇", "东湾镇", "西戈壁镇", "柳毛湾镇", "金沟河镇", "商户地乡", "大泉乡", "博尔通古乡", "牛圈子牧场", "博尔通古牧场", "良种场", "兵团一二一团", "兵团一三三团", "兵团一三四团", "兵团一四一团", "兵团一四二团", "兵团一四三团", "兵团一四四团"], ["托里镇", "铁厂沟镇", "庙尔沟镇", "多拉特乡", "乌雪特乡", "库普乡", "阿克别里斗乡", "白杨河林场", "老风口林场", "巴尔鲁克山塔斯特林场", "兵团农九师一七零团"], ["哈拉布拉镇", "吉也克镇", "哈拉布拉乡", "新地乡", "阿勒腾也木勒乡", "江格斯乡", "察汗托海牧场", "兵团农九师一六一团"], ["和布克赛尔镇", "和什托洛盖镇", "夏孜盖乡", "铁布肯乌散乡", "查干库勒乡", "巴音傲瓦乡", "莫特格乡", "查和特乡", "伊克乌图布拉格牧场", "那仁和布克牧场", "巴尕乌图布拉格牧场", "布斯屯格牧场", "仓德格矿区", "兵团一八四团", "新疆屯鑫能源开发有限公司"]], [["金山路", "解放路", "团结路", "恰秀路街道", "北屯镇", "阿苇滩镇", "红墩镇", "切木尔切克镇", "阿拉哈克镇", "汗德尕特蒙古族乡", "拉斯特乡", "喀拉希力克乡", "萨尔胡松乡", "巴里巴盖乡", "切尔克齐乡", "喀拉尕什牧场", "阿克吐木斯克牧场", "兵团一八一团"], ["布尔津镇", "冲乎尔镇", "窝依莫克镇", "杜来提乡", "阔斯特克乡", "也格孜托别乡", "禾木哈纳斯蒙古民族乡"], ["库额尔齐斯镇", "可可托海镇", "恰库尔图镇", "喀拉通克镇", "杜热镇", "吐尔洪乡", "库尔特乡", "克孜勒希力克乡", "铁买克乡", "喀拉布勒根乡"], ["福海镇", "喀拉玛盖镇", "解特阿热勒镇", "阔克阿尕什乡", "齐干吉迭乡", "阿尔达乡", "地区一农场", "福海监狱", "兵团一八二团", "兵团一八三团", "兵团一八七团", "兵团一八八团"], ["阿克齐镇", "萨尔布拉克镇", "齐巴尔镇", "萨尔塔木乡", "加依勒玛乡", "库勒拜乡", "铁热克提乡", "兵团一八五团"], ["青河镇", "塔克什肯镇", "阿热勒托别镇", "阿热勒乡", "萨尔托海乡", "查干郭勒乡", "阿尕什敖包乡"], ["托普铁热克镇", "吉木乃镇", "喀尔交镇", "托普铁热克乡", "托斯特乡", "恰勒什海乡", "别斯铁热克乡", "兵团一八六团"]]]];var _default =

s;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 78:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 79);

/***/ }),

/***/ 79:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 80);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 8:
/*!*****************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/api/http.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var URL = '';













// URL = 'https://topt.sayyin.com';
URL = 'https://api.toptyouxuan.com';
// URL = 'http://192.168.0.105'

switch (uni.getSystemInfoSync().platform) {
  case 'android':
    console.log('运行Android上');
    break;
  case 'ios':
    console.log('运行iOS上');
    break;
  default:
    console.log('运行在开发者工具上');
    break;}
;

var http = function http(url, method, data) {

  return new Promise(function (resolve, reject) {
    uni.request({
      url: URL + url || '',
      method: method || 'get',
      data: data || null,
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // application/json
        // "Access-Token":uni.getStorageSync('jwt') || '',
      },

      success: function success(res) {
        resolve(res.data);
      },
      fail: function fail(err) {
        console.log(data);
        console.log(JSON.stringify(err));
        reject({ error: '网络错误' });
      } });

  });
};var _default =

http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 80:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 81:
/*!*****************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _log = console.log; // 如果在项目的APP.vue文件中的onlaunch中设置 console.log = ()=> {} 则在此也不会有打印信息
// log = ()=>{};	// 打开注释则该插件不会打印任何信息
var _app = {
  //交互控制
  log: function log(t) {
    _log(t);
  }, // 打印控制,
  showLoading: function showLoading(msg, ifmask) {
    uni.showLoading({
      title: msg,
      mask: ifmask || false });

  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },
  showToast: function showToast(msg, icon) {
    uni.showToast({
      title: msg,
      icon: icon || 'none' });

  },
  getPosterUrl: function getPosterUrl(objs) {// 后端获取背景图的url路径方法
    var
    backgroundImage =


    objs.backgroundImage,type = objs.type,formData = objs.formData;
    return new Promise(function (rs, rj) {
      var image;
      if (backgroundImage) {
        image = backgroundImage;
      } else {
        switch (type) {//根据type获取背景图, 一般要改成request获取
          case 1:
            image = '';
            break;
          default:
            image = '/static/1.png';
            break;}

      }
      if (image) {
        rs(image); // resolve图片的路径
      } else {
        rj('背景图片路径不存在');
      }
    });
  },






  //下面一般不用动他
  shareTypeListSheetArray: {
    array: [0, 1, 2, 3, 4, 5] },
  // 分享类型 0-图文链接 1-纯文字 2-纯图片 3-音乐 4-视频 5-小程序
  isArray: function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  },
  isObject: function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  },
  isPromise: function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  },
  isNull: function isNull(arg) {
    return arg === null;
  },
  isUndefined: function isUndefined(arg) {
    return arg === undefined;
  },
  isUndef: function isUndef(arg) {
    return arg === undefined;
  },
  isNotNull_string: function isNotNull_string(arg) {
    return arg !== null && arg !== undefined && arg !== '';
  },
  isFn: function isFn(fn) {
    return fn && typeof fn === 'function';
  },
  getStorage: function getStorage(key, scb, fcb) {
    uni.getStorage({
      key: key,
      success: function success(res) {
        if (res.data && res.data != "") {
          if (scb) scb(res.data);
        } else {
          if (fcb) fcb();
        }
      },
      fail: function fail() {
        if (fcb) fcb();
      } });

  },
  setStorage: function setStorage(key, data) {
    _log('设置缓存');
    _log('key：' + key);
    _log('data：' + JSON.stringify(data));
    uni.setStorage({
      key: key,
      data: data });

  },
  setStorageSync: function setStorageSync(key, data) {
    uni.setStorageSync(key, data);
  },
  getStorageSync: function getStorageSync(key) {
    return uni.getStorageSync(key);
  },
  clearStorageSync: function clearStorageSync() {
    uni.clearStorageSync();
  },
  removeStorageSync: function removeStorageSync(key) {
    uni.removeStorageSync(key);
  },
  getImageInfo: function getImageInfo(url, cb, fcb) {
    url = checkMPUrl(url);
    uni.getImageInfo({
      src: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      },
      fail: function fail(err) {
        if (fcb && typeof fcb == 'function') fcb(err);
      } });

  },
  downloadFile: function downloadFile(url, cb) {
    url = checkMPUrl(url);
    uni.downloadFile({
      url: url,
      success: function success(res) {
        if (cb && typeof cb == 'function') cb(res);
      } });

  },
  downloadFile_PromiseFc: function downloadFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      if (url.substring(0, 4) !== 'http') {
        rs(url);
      } else {
        url = checkMPUrl(url);
        _log('url:' + url);
        uni.downloadFile({
          url: url,
          success: function success(res) {
            if (res && res.tempFilePath)
            rs(res.tempFilePath);else

            rj('not find tempFilePath');
          },
          fail: function fail(err) {
            rj(err);
          } });

      }
    });
  },
  saveFile: function saveFile(url) {
    uni.saveFile({
      tempFilePath: url,
      success: function success(res) {
        _log('保存成功:' + JSON.stringify(res));
      } });

  },
  downLoadAndSaveFile_PromiseFc: function downLoadAndSaveFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      _log('准备下载并保存图片:' + url);
      if (url.substring(0, 4) === 'http') {
        url = checkMPUrl(url);
        uni.downloadFile({
          url: url,
          success: function success(d_res) {
            _log('下载背景图成功：' + JSON.stringify(d_res));
            if (d_res && d_res.tempFilePath) {






              uni.saveFile({
                tempFilePath: d_res.tempFilePath,
                success: function success(s_res) {
                  _log('保存背景图成功:' + JSON.stringify(s_res));
                  if (s_res && s_res.savedFilePath)
                  rs(s_res.savedFilePath);else

                  rs(d_res.tempFilePath);
                },
                fail: function fail(err) {
                  rs(d_res.tempFilePath);
                } });



            } else {
              rj('not find tempFilePath');
            }
          },
          fail: function fail(err) {
            rj(err);
          } });

      } else {
        rs(url);
      }
    });
  },
  checkFile_PromiseFc: function checkFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      uni.getSavedFileList({
        success: function success(res) {
          var d = res.fileList;
          var index = d.findIndex(function (item) {
            return item.filePath === url;
          });
          rs(index);
        },
        fail: function fail(err) {
          rj(err);
        } });

    });
  },
  removeSavedFile: function removeSavedFile(path) {
    uni.getSavedFileList({
      success: function success(res) {
        var d = res.fileList;
        var index = d.findIndex(function (item) {
          return item.filePath === path;
        });
        if (index >= 0)
        uni.removeSavedFile({
          filePath: path });

      } });

  },
  fileNameInPath: function fileNameInPath(path) {
    var s = path.split("/");
    return s[s.length - 1];
  },
  getImageInfo_PromiseFc: function getImageInfo_PromiseFc(imgPath) {
    return new Promise(function (rs, rj) {
      _log('准备获取图片信息:' + imgPath);
      imgPath = checkMPUrl(imgPath);
      uni.getImageInfo({
        src: imgPath,
        success: function success(res) {
          _log('获取图片信息成功:' + JSON.stringify(res));
          rs(res);
        },
        fail: function fail(err) {
          _log('获取图片信息失败:' + JSON.stringify(err));
          rj(err);
        } });

    });
  },
  previewImage: function previewImage(urls) {
    if (typeof urls == 'string')
    urls = [urls];
    uni.previewImage({
      urls: urls });

  },
  actionSheet: function actionSheet(obj, cb) {
    var sheetArray = [];
    for (var i = 0; i < obj.array.length; i++) {
      switch (obj.array[i]) {
        case 'sinaweibo':
          sheetArray[i] = '新浪微博';
          break;
        case 'qq':
          sheetArray[i] = 'QQ';
          break;
        case 'weixin':
          sheetArray[i] = '微信';
          break;
        case 'WXSceneSession':
          sheetArray[i] = '微信好友';
          break;
        case 'WXSenceTimeline':
          sheetArray[i] = '微信朋友圈';
          break;
        case 'WXSceneFavorite':
          sheetArray[i] = '微信收藏';
          break;
        case 0:
          sheetArray[i] = '图文链接';
          break;
        case 1:
          sheetArray[i] = '纯文字';
          break;
        case 2:
          sheetArray[i] = '纯图片';
          break;
        case 3:
          sheetArray[i] = '音乐';
          break;
        case 4:
          sheetArray[i] = '视频';
          break;
        case 5:
          sheetArray[i] = '小程序';
          break;
        default:
          break;}

    }
    this.showActionSheet(sheetArray, cb);
  },
  showActionSheet: function showActionSheet(sheetArray, cb) {
    uni.showActionSheet({
      itemList: sheetArray,
      success: function success(e) {
        if (cb && typeof cb == 'function') cb(e.tapIndex);
      } });

  },
  getProvider: function getProvider(type, cb, sheet) {
    var _this = this;
    uni.getProvider({
      service: type,
      success: function success(res) {
        if (sheet) {
          var obj = {};
          obj.array = res.provider;
          _this.actionSheet(obj, function (index) {
            if (cb && typeof cb == "function") cb(res.provider[index]);
          });
        } else {
          if (type == 'payment') {
            var providers = res.provider;
            var payTypeArray = [];
            for (var i = 0; i < providers.length; i++) {
              if (providers[i] == 'wxpay') {
                payTypeArray[i] = {
                  name: '微信支付',
                  value: providers[i],
                  img: '/static/image/wei.png' };

              } else if (providers[i] == 'alipay') {
                payTypeArray[i] = {
                  name: "支付宝支付",
                  value: providers[i],
                  img: '/static/image/ali.png' };

              }
            }
            if (cb && typeof cb == "function") cb(payTypeArray);
          } else {
            if (cb && typeof cb == "function") cb(res);
          }
        }
      } });

  } };



















































































































































































function checkMPUrl(url) {

  if (false) {}

  return url;
}

module.exports = _app;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 82:
/*!****************************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 78));var _app2 = _interopRequireDefault(__webpack_require__(/*! ./app.js */ 81));
var _QRCodeAlg = _interopRequireDefault(__webpack_require__(/*! ./QRCodeAlg.js */ 83));
var _imageTools = __webpack_require__(/*! ./image-tools.js */ 84);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var ShreUserPosterBackgroundKey = 'ShrePosterBackground_'; // 背景图片缓存名称前缀
var idKey = 'QSSHAREPOSTER_IDKEY'; //drawArray自动生成的idkey
var isMp = false;

isMp = true;


var nbgScale = 1;
// export default 
function getSharePoster(obj) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var result1, result2;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                returnPromise(obj));case 3:result1 = _context.sent;
              resolve(result1);_context.next = 21;break;case 7:_context.prev = 7;_context.t0 = _context["catch"](0);_context.prev = 9;



              if (obj.bgScale) {
                obj.bgScale = Number(obj.bgScale) - 0.1;
              } else {
                nbgScale = nbgScale - 0.1;
              }
              console.log('------------清除缓存后, 开始第二次尝试------------');_context.next = 14;return (
                returnPromise(obj));case 14:result2 = _context.sent;
              resolve(result2);_context.next = 21;break;case 18:_context.prev = 18;_context.t1 = _context["catch"](9);

              //TODO handle the exception
              reject(_context.t1);case 21:case "end":return _context.stop();}}}, _callee, null, [[0, 7], [9, 18]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());




}

function returnPromise(obj) {var

  type =

















  obj.type,formData = obj.formData,background = obj.background,posterCanvasId = obj.posterCanvasId,backgroundImage = obj.backgroundImage,reserve = obj.reserve,textArray = obj.textArray,drawArray = obj.drawArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasWH = obj.setCanvasWH,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,Context = obj.Context,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(rs, rj) {var bgObj, params, i, hasAllInfoCallback, _i, drawArrayItem, newData, drawArray_copy, _i2, item, _newData, item_idKey, poster;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

              _app2.default.showLoading('正在准备海报数据');
              if (!Context) {
                _app2.default.log('没有画布对象,创建画布对象');
                Context = uni.createCanvasContext(posterCanvasId, _this || null);
              }if (!(

              background && background.width && background.height)) {_context2.next = 7;break;}
              bgObj = background;_context2.next = 10;break;case 7:_context2.next = 9;return (

                getShreUserPosterBackground({
                  backgroundImage: backgroundImage,
                  type: type,
                  formData: formData }));case 9:bgObj = _context2.sent;case 10:


              bgScale = bgScale || nbgScale;
              bgObj.width = bgObj.width * bgScale;
              bgObj.height = bgObj.height * bgScale;

              _app2.default.log('获取背景图信息对象成功:' + JSON.stringify(bgObj));
              params = {
                bgObj: bgObj,
                type: type,
                bgScale: bgScale,
                getBgObj: function getBgObj() {
                  return params.bgObj;
                },
                setBgObj: function setBgObj(newBgObj) {
                  var n = _objectSpread(_objectSpread({}, params.bgObj), newBgObj);
                  params.bgObj = n;
                  bgObj = n;
                } };if (!

              imagesArray) {_context2.next = 23;break;}
              if (typeof imagesArray == 'function')
              imagesArray = imagesArray(params);
              _app2.default.showLoading('正在生成需绘制图片的临时路径');
              _app2.default.log('准备设置图片');_context2.next = 21;return (
                setImage(imagesArray));case 21:imagesArray = _context2.sent;
              _app2.default.hideLoading();case 23:

              if (textArray) {
                if (typeof textArray == 'function')
                textArray = textArray(params);
                textArray = setText(Context, textArray);

              }if (!
              qrCodeArray) {_context2.next = 38;break;}
              if (typeof qrCodeArray == 'function')
              qrCodeArray = qrCodeArray(params);
              _app2.default.showLoading('正在生成需绘制图片的临时路径');
              i = 0;case 28:if (!(i < qrCodeArray.length)) {_context2.next = 37;break;}
              _app2.default.log(i);if (!
              qrCodeArray[i].image) {_context2.next = 34;break;}_context2.next = 33;return (
                _app2.default.downloadFile_PromiseFc(qrCodeArray[i].image));case 33:qrCodeArray[i].image = _context2.sent;case 34:i++;_context2.next = 28;break;case 37:

              _app2.default.hideLoading();case 38:if (!

              drawArray) {_context2.next = 99;break;}
              if (typeof drawArray == 'function') {
                drawArray = drawArray(params);
              }if (!
              _app2.default.isPromise(drawArray)) {_context2.next = 44;break;}_context2.next = 43;return (
                drawArray);case 43:drawArray = _context2.sent;case 44:if (!(


              _app2.default.isArray(drawArray) && drawArray.length > 0)) {_context2.next = 99;break;}
              hasAllInfoCallback = false;
              _i = 0;case 47:if (!(_i < drawArray.length)) {_context2.next = 79;break;}
              drawArrayItem = drawArray[_i];
              if (_app2.default.isFn(drawArrayItem.allInfoCallback) && !hasAllInfoCallback) hasAllInfoCallback = true;
              drawArrayItem[idKey] = _i;
              newData = void 0;_context2.t0 =
              drawArrayItem.type;_context2.next = _context2.t0 ===
              'image' ? 55 : _context2.t0 ===


              'text' ? 59 : _context2.t0 ===


              'qrcode' ? 61 : _context2.t0 ===





              'custom' ? 67 : _context2.t0 ===

              'fillrect' ? 68 : _context2.t0 ===

              'strokeRect' ? 69 : _context2.t0 ===

              'roundStrokeRect' ? 70 : _context2.t0 ===

              'roundFillRect' ? 71 : 72;break;case 55:_context2.next = 57;return setImage(drawArrayItem);case 57:newData = _context2.sent;return _context2.abrupt("break", 74);case 59:newData = setText(Context, drawArrayItem);return _context2.abrupt("break", 74);case 61:if (!drawArrayItem.image) {_context2.next = 66;break;}_context2.next = 64;return _app2.default.downloadFile_PromiseFc(drawArrayItem.image);case 64:_context2.t1 = _context2.sent;newData = { image: _context2.t1 };case 66:return _context2.abrupt("break", 74);case 67:return _context2.abrupt("break", 74);case 68:return _context2.abrupt("break", 74);case 69:return _context2.abrupt("break", 74);case 70:return _context2.abrupt("break", 74);case 71:return _context2.abrupt("break", 74);case 72:


              _app2.default.log('未识别的类型');return _context2.abrupt("break", 74);case 74:


              if (newData && _app2.default.isObject(newData)) {
                drawArray[_i] = _objectSpread(_objectSpread({}, drawArrayItem),
                newData);

              };case 76:_i++;_context2.next = 47;break;case 79:if (!


              hasAllInfoCallback) {_context2.next = 99;break;}
              _app2.default.log('----------------hasAllInfoCallback----------------');
              drawArray_copy = _toConsumableArray(drawArray);
              drawArray_copy.sort(function (a, b) {
                var a_serialNum = !_app2.default.isUndef(a.serialNum) && !_app2.default.isNull(a.serialNum) ? Number(a.serialNum) : Number.NEGATIVE_INFINITY;
                var b_serialNum = !_app2.default.isUndef(b.serialNum) && !_app2.default.isNull(b.serialNum) ? Number(b.serialNum) : Number.NEGATIVE_INFINITY;
                return a_serialNum - b_serialNum;
              });
              _app2.default.log('开始for循环');

              _i2 = 0;case 85:if (!(_i2 < drawArray_copy.length)) {_context2.next = 98;break;}
              item = _objectSpread({}, drawArray_copy[_i2]);if (!

              _app2.default.isFn(item.allInfoCallback)) {_context2.next = 95;break;}
              _newData = item.allInfoCallback({
                drawArray: drawArray });if (!

              _app2.default.isPromise(_newData)) {_context2.next = 93;break;}_context2.next = 92;return _newData;case 92:_newData = _context2.sent;case 93:
              item_idKey = item[idKey];
              if (!_app2.default.isUndef(item_idKey)) {
                drawArray[item[idKey]] = _objectSpread(_objectSpread({}, item),
                _newData);

              } else {
                console.log('程序错误 找不到idKey!!!	...这不应该啊');
              }case 95:_i2++;_context2.next = 85;break;case 98:


              _app2.default.log('for循环结束');case 99:



              console.log('params:' + JSON.stringify(params));if (!(
              setCanvasWH && typeof setCanvasWH == 'function')) {_context2.next = 103;break;}_context2.next = 103;return (
                new Promise(function (resolve, reject) {
                  setCanvasWH(params);
                  setTimeout(function () {
                    resolve();
                  }, 50);
                }));case 103:_context2.next = 105;return (

                drawShareImage({
                  Context: Context,
                  type: type,
                  posterCanvasId: posterCanvasId,
                  reserve: reserve,
                  drawArray: drawArray,
                  textArray: textArray,
                  imagesArray: imagesArray,
                  bgObj: bgObj,
                  qrCodeArray: qrCodeArray,
                  setCanvasToTempFilePath: setCanvasToTempFilePath,
                  setDraw: setDraw,
                  bgScale: bgScale,
                  _this: _this,
                  delayTimeScale: delayTimeScale,
                  drawDelayTime: drawDelayTime }));case 105:poster = _context2.sent;

              _app2.default.hideLoading();
              rs({
                bgObj: bgObj,
                poster: poster,
                type: type });_context2.next = 113;break;case 110:_context2.prev = 110;_context2.t2 = _context2["catch"](0);


              //TODO handle the exception
              rj(_context2.t2);case 113:case "end":return _context2.stop();}}}, _callee2, null, [[0, 110]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


}

function drawShareImage(obj) {//绘制海报方法
  var
  Context =














  obj.Context,type = obj.type,posterCanvasId = obj.posterCanvasId,reserve = obj.reserve,bgObj = obj.bgObj,drawArray = obj.drawArray,textArray = obj.textArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,_this = obj._this,delayTimeScale = obj.delayTimeScale,drawDelayTime = obj.drawDelayTime;
  var params = {
    Context: Context,
    bgObj: bgObj,
    type: type,
    bgScale: bgScale };

  delayTimeScale = delayTimeScale !== undefined ? delayTimeScale : 15;
  drawDelayTime = drawDelayTime !== undefined ? drawDelayTime : 100;
  return new Promise(function (rs, rj) {
    try {
      _app2.default.showLoading('正在绘制海报');
      _app2.default.log('背景对象:' + JSON.stringify(bgObj));
      if (bgObj && bgObj.path) {
        _app2.default.log('背景有图片路径');
        Context.drawImage(bgObj.path, 0, 0, bgObj.width, bgObj.height);
      } else {
        _app2.default.log('背景没有图片路径');
        if (bgObj.backgroundColor) {
          _app2.default.log('背景有背景颜色:' + bgObj.backgroundColor);
          Context.setFillStyle(bgObj.backgroundColor);
          Context.fillRect(0, 0, bgObj.width, bgObj.height);
        } else {
          _app2.default.log('背景没有背景颜色');
        }
      }

      _app2.default.showLoading('绘制图片');
      if (imagesArray && imagesArray.length > 0)
      drawImage(Context, imagesArray);

      _app2.default.showLoading('绘制自定义内容');
      if (setDraw && typeof setDraw == 'function') setDraw(params);

      _app2.default.showLoading('绘制文本');
      if (textArray && textArray.length > 0)
      drawText(Context, textArray, bgObj);

      _app2.default.showLoading('绘制二维码');
      if (qrCodeArray && qrCodeArray.length > 0) {
        for (var i = 0; i < qrCodeArray.length; i++) {
          drawQrCode(Context, qrCodeArray[i]);
        }
      }

      _app2.default.showLoading('绘制可控层级序列');
      if (drawArray && drawArray.length > 0) {
        for (var _i3 = 0; _i3 < drawArray.length; _i3++) {
          var drawArrayItem = drawArray[_i3];
          _app2.default.log('绘制可控层级序列, drawArrayItem:' + JSON.stringify(drawArrayItem));
          switch (drawArrayItem.type) {
            case 'image':
              _app2.default.log('绘制可控层级序列, 绘制图片');
              drawImage(Context, drawArrayItem);
              break;
            case 'text':
              _app2.default.log('绘制可控层级序列, 绘制文本');
              drawText(Context, drawArrayItem, bgObj);
              break;
            case 'qrcode':
              _app2.default.log('绘制可控层级序列, 绘制二维码');
              drawQrCode(Context, drawArrayItem);
              break;
            case 'custom':
              _app2.default.log('绘制可控层级序列, 绘制自定义内容');
              if (drawArrayItem.setDraw && typeof drawArrayItem.setDraw === 'function')
              drawArrayItem.setDraw(Context);
              break;drawRoundStrokeRect, drawStrokeRect;
            case 'fillRect':
              _app2.default.log('绘制可控层级序列, 绘制填充直角矩形');
              drawFillRect(Context, drawArrayItem);
              break;
            case 'strokeRect':
              _app2.default.log('绘制可控层级序列, 绘制线条直角矩形');
              drawStrokeRect(Context, drawArrayItem);
              break;
            case 'roundStrokeRect':
              _app2.default.log('绘制可控层级序列, 绘制线条圆角矩形');
              drawRoundStrokeRect(Context, drawArrayItem);
              break;
            case 'roundFillRect':
              _app2.default.log('绘制可控层级序列, 绘制填充圆角矩形');
              drawRoundFillRect(Context, drawArrayItem);
              break;
            default:
              _app2.default.log('未识别的类型');
              break;}

        }
      }
      _app2.default.showLoading('绘制中');
      setTimeout(function () {
        _app2.default.log('准备执行draw方法');
        _app2.default.log('Context:' + Context);
        var fn = function fn() {
          _app2.default.showLoading('正在输出图片');
          var setObj = setCanvasToTempFilePath || {};
          if (setObj && typeof setObj == 'function')
          setObj = setCanvasToTempFilePath(bgObj, type);
          var canvasToTempFilePathFn;
          var data = _objectSpread({
            x: 0,
            y: 0,
            width: Number(bgObj.width),
            height: Number(bgObj.height),
            destWidth: Number(bgObj.width), // 若H5使用这里请不要乘以二
            destHeight: Number(bgObj.height), // 若H5使用这里请不要乘以二
            quality: .8,
            fileType: 'jpg' },
          setObj);

          console.log('canvasToTempFilePath的data对象:' + JSON.stringify(data));
          canvasToTempFilePathFn = function canvasToTempFilePathFn() {
            var toTempFilePathObj = _objectSpread(_objectSpread({},
            data), {}, {
              canvasId: posterCanvasId,
              success: function success(res) {
                _app2.default.hideLoading();
                rs(res);
              },
              fail: function fail(err) {
                _app2.default.hideLoading();
                console.log('输出图片失败');
                _app2.default.log('输出图片失败:' + JSON.stringify(err));
                rj('输出图片失败:' + JSON.stringify(err));
              } });

            uni.canvasToTempFilePath(toTempFilePathObj, _this || null);
          };
          var delayTime = 0;
          if (qrCodeArray) {
            qrCodeArray.forEach(function (item) {
              if (item.text) {
                delayTime += Number(item.text.length);
              }
            });
          }
          if (imagesArray) {
            imagesArray.forEach(function () {
              delayTime += delayTimeScale;
            });
          }
          if (textArray) {
            textArray.forEach(function () {
              delayTime += delayTimeScale;
            });
          }
          if (drawArray) {
            drawArray.forEach(function (item) {
              switch (item.type) {
                case 'text':
                  if (item.text) {
                    delayTime += item.text.length;
                  }
                  break;
                default:
                  delayTime += delayTimeScale;
                  break;}

            });
          }
          _app2.default.log('延时系数:' + delayTimeScale);
          _app2.default.log('总计延时:' + delayTime);
          setTimeout(canvasToTempFilePathFn, delayTime);
        };
        Context.draw(typeof reserve == 'boolean' ? reserve : false, fn);
      }, drawDelayTime);
    } catch (e) {
      //TODO handle the exception
      _app2.default.hideLoading();
      rj(e);
    }
  });
}

// export
function drawFillRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //填充矩形
  _app2.default.log('进入绘制填充直角矩形方法, drawArrayItem:' + JSON.stringify(drawArrayItem));
  Context.setFillStyle(drawArrayItem.backgroundColor || 'black');
  Context.setGlobalAlpha(drawArrayItem.alpha || 1);
  Context.fillRect(drawArrayItem.dx || 0, drawArrayItem.dy || 0, drawArrayItem.width || 0, drawArrayItem.height || 0);
  Context.setGlobalAlpha(1);
}

// export
function drawStrokeRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //线条矩形
  Context.setStrokeStyle(drawArrayItem.color || 'black');
  Context.setLineWidth(drawArrayItem.lineWidth || 1);
  Context.strokeRect(drawArrayItem.dx, drawArrayItem.dy, drawArrayItem.width, drawArrayItem.height);
}

// export
function drawRoundStrokeRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var
  dx = drawArrayItem.dx,dy = drawArrayItem.dy,width = drawArrayItem.width,height = drawArrayItem.height,r = drawArrayItem.r,lineWidth = drawArrayItem.lineWidth,color = drawArrayItem.color;
  r = r || width * .1;

  if (width < 2 * r) {
    r = width / 2;
  }
  if (width < 2 * r) {
    r = width / 2;
  }
  Context.beginPath();
  Context.moveTo(dx + r, dy);
  Context.arcTo(dx + width, dy, dx + width, dy + height, r);
  Context.arcTo(dx + width, dy + height, dx, dy + height, r);
  Context.arcTo(dx, dy + height, dx, dy, r);
  Context.arcTo(dx, dy, dx + width, dy, r);
  Context.closePath();
  Context.setLineWidth(lineWidth || 1);
  Context.setStrokeStyle(color || 'black');
  Context.stroke();
}

// export
function drawRoundFillRect(Context) {var drawArrayItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var
  dx = drawArrayItem.dx,dy = drawArrayItem.dy,width = drawArrayItem.width,height = drawArrayItem.height,r = drawArrayItem.r,backgroundColor = drawArrayItem.backgroundColor;
  r = r || width * .1;

  if (width < 2 * r) {
    r = width / 2;
  }
  if (width < 2 * r) {
    r = width / 2;
  }
  Context.beginPath();
  Context.moveTo(dx + r, dy);
  Context.arcTo(dx + width, dy, dx + width, dy + height, r);
  Context.arcTo(dx + width, dy + height, dx, dy + height, r);
  Context.arcTo(dx, dy + height, dx, dy, r);
  Context.arcTo(dx, dy, dx + width, dy, r);
  Context.closePath();
  Context.setFillStyle(backgroundColor);
  Context.fill();
}

// export 
function setText(Context, texts) {// 设置文本数据
  _app2.default.log('进入设置文字方法, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('texts是数组');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        _app2.default.log('字符串信息-初始化之前:' + JSON.stringify(texts[i]));
        texts[i] = setTextFn(Context, texts[i]);
      }
    }
  } else {
    _app2.default.log('texts是对象');
    texts = setTextFn(Context, texts);
  }
  _app2.default.log('返回texts:' + JSON.stringify(texts));
  return texts;
}

function setTextFn(Context, textItem) {
  _app2.default.log('进入设置文字方法, textItem:' + JSON.stringify(textItem));
  if (_app2.default.isNotNull_string(textItem.text)) {
    textItem.text = String(textItem.text);
    textItem.alpha = textItem.alpha !== undefined ? Number(textItem.alpha) : 1;
    textItem.color = textItem.color || 'black';
    textItem.size = textItem.size !== undefined ? Number(textItem.size) : 10;
    textItem.textAlign = textItem.textAlign || 'left';
    textItem.textBaseline = textItem.textBaseline || 'middle';
    textItem.dx = Number(textItem.dx) || 0;
    textItem.dy = Number(textItem.dy) || 0;
    textItem.size = Math.ceil(Number(textItem.size));
    _app2.default.log('字符串信息-初始化默认值后:' + JSON.stringify(textItem));
    var textLength = countTextLength(Context, {
      text: textItem.text,
      size: textItem.size });

    _app2.default.log('字符串信息-初始化时的文本长度:' + textLength);
    var infoCallBackObj = {};
    if (textItem.infoCallBack && typeof textItem.infoCallBack === 'function') {
      infoCallBackObj = textItem.infoCallBack(textLength);
    }
    textItem = _objectSpread(_objectSpread({},
    textItem), {}, {
      textLength: textLength },
    infoCallBackObj);

    _app2.default.log('字符串信息-infoCallBack后:' + JSON.stringify(textItem));
  }
  return textItem;
}

function countTextLength(Context, obj) {
  _app2.default.log('计算文字长度, obj:' + JSON.stringify(obj));var

  text =

  obj.text,size = obj.size;
  Context.setFontSize(size);
  var textLength;
  try {
    textLength = Context.measureText(text); // 官方文档说 App端自定义组件编译模式暂时不可用measureText方法
  } catch (e) {
    //TODO handle the exception
    textLength = {};
  }
  textLength = {};
  _app2.default.log('measureText计算文字长度, textLength:' + JSON.stringify(textLength));
  textLength = textLength && textLength.width ? textLength.width : 0;
  if (!textLength) {
    var l = 0;
    for (var j = 0; j < text.length; j++) {
      var t = text.substr(j, 1);
      var countL = countStrLength(t);
      _app2.default.log('计算文字宽度系数:' + countL);
      l += countL;
    }
    _app2.default.log('文字宽度总系数:' + l);
    textLength = l * size;
  }
  return textLength;
}

//计算字符长度系数
function countStrLength(t) {
  var l;
  if (/a/.test(t)) {
    l = 0.552734375;
  } else if (/b/.test(t)) {
    l = 0.638671875;
  } else if (/c/.test(t)) {
    l = 0.50146484375;
  } else if (/d/.test(t)) {
    l = 0.6396484375;
  } else if (/e/.test(t)) {
    l = 0.5673828125;
  } else if (/f/.test(t)) {
    l = 0.3466796875;
  } else if (/g/.test(t)) {
    l = 0.6396484375;
  } else if (/h/.test(t)) {
    l = 0.61572265625;
  } else if (/i/.test(t)) {
    l = 0.26611328125;
  } else if (/j/.test(t)) {
    l = 0.26708984375;
  } else if (/k/.test(t)) {
    l = 0.54443359375;
  } else if (/l/.test(t)) {
    l = 0.26611328125;
  } else if (/m/.test(t)) {
    l = 0.93701171875;
  } else if (/n/.test(t)) {
    l = 0.6162109375;
  } else if (/o/.test(t)) {
    l = 0.6357421875;
  } else if (/p/.test(t)) {
    l = 0.638671875;
  } else if (/q/.test(t)) {
    l = 0.6396484375;
  } else if (/r/.test(t)) {
    l = 0.3818359375;
  } else if (/s/.test(t)) {
    l = 0.462890625;
  } else if (/t/.test(t)) {
    l = 0.37255859375;
  } else if (/u/.test(t)) {
    l = 0.6162109375;
  } else if (/v/.test(t)) {
    l = 0.52490234375;
  } else if (/w/.test(t)) {
    l = 0.78955078125;
  } else if (/x/.test(t)) {
    l = 0.5068359375;
  } else if (/y/.test(t)) {
    l = 0.529296875;
  } else if (/z/.test(t)) {
    l = 0.49169921875;
  } else if (/A/.test(t)) {
    l = 0.70361328125;
  } else if (/B/.test(t)) {
    l = 0.62744140625;
  } else if (/C/.test(t)) {
    l = 0.6689453125;
  } else if (/D/.test(t)) {
    l = 0.76171875;
  } else if (/E/.test(t)) {
    l = 0.5498046875;
  } else if (/F/.test(t)) {
    l = 0.53125;
  } else if (/G/.test(t)) {
    l = 0.74365234375;
  } else if (/H/.test(t)) {
    l = 0.7734375;
  } else if (/I/.test(t)) {
    l = 0.2939453125;
  } else if (/J/.test(t)) {
    l = 0.39599609375;
  } else if (/K/.test(t)) {
    l = 0.634765625;
  } else if (/L/.test(t)) {
    l = 0.51318359375;
  } else if (/M/.test(t)) {
    l = 0.97705078125;
  } else if (/N/.test(t)) {
    l = 0.81298828125;
  } else if (/O/.test(t)) {
    l = 0.81494140625;
  } else if (/P/.test(t)) {
    l = 0.61181640625;
  } else if (/Q/.test(t)) {
    l = 0.81494140625;
  } else if (/R/.test(t)) {
    l = 0.65283203125;
  } else if (/S/.test(t)) {
    l = 0.5771484375;
  } else if (/T/.test(t)) {
    l = 0.5732421875;
  } else if (/U/.test(t)) {
    l = 0.74658203125;
  } else if (/V/.test(t)) {
    l = 0.67626953125;
  } else if (/W/.test(t)) {
    l = 1.017578125;
  } else if (/X/.test(t)) {
    l = 0.64501953125;
  } else if (/Y/.test(t)) {
    l = 0.603515625;
  } else if (/Z/.test(t)) {
    l = 0.6201171875;
  } else if (/[0-9]/.test(t)) {
    l = 0.58642578125;
  } else if (/[\u4e00-\u9fa5]/.test(t)) {
    l = 1;
  } else if (/ /.test(t)) {
    l = 0.2958984375;
  } else if (/\`/.test(t)) {
    l = 0.294921875;
  } else if (/\~/.test(t)) {
    l = 0.74169921875;
  } else if (/\!/.test(t)) {
    l = 0.3125;
  } else if (/\@/.test(t)) {
    l = 1.03125;
  } else if (/\#/.test(t)) {
    l = 0.63818359375;
  } else if (/\$/.test(t)) {
    l = 0.58642578125;
  } else if (/\%/.test(t)) {
    l = 0.8896484375;
  } else if (/\^/.test(t)) {
    l = 0.74169921875;
  } else if (/\&/.test(t)) {
    l = 0.8701171875;
  } else if (/\*/.test(t)) {
    l = 0.455078125;
  } else if (/\(/.test(t)) {
    l = 0.333984375;
  } else if (/\)/.test(t)) {
    l = 0.333984375;
  } else if (/\_/.test(t)) {
    l = 0.4482421875;
  } else if (/\-/.test(t)) {
    l = 0.4326171875;
  } else if (/\+/.test(t)) {
    l = 0.74169921875;
  } else if (/\=/.test(t)) {
    l = 0.74169921875;
  } else if (/\|/.test(t)) {
    l = 0.26904296875;
  } else if (/\\/.test(t)) {
    l = 0.416015625;
  } else if (/\[/.test(t)) {
    l = 0.333984375;
  } else if (/\]/.test(t)) {
    l = 0.333984375;
  } else if (/\;/.test(t)) {
    l = 0.24072265625;
  } else if (/\'/.test(t)) {
    l = 0.25634765625;
  } else if (/\,/.test(t)) {
    l = 0.24072265625;
  } else if (/\./.test(t)) {
    l = 0.24072265625;
  } else if (/\//.test(t)) {
    l = 0.42724609375;
  } else if (/\{/.test(t)) {
    l = 0.333984375;
  } else if (/\}/.test(t)) {
    l = 0.333984375;
  } else if (/\:/.test(t)) {
    l = 0.24072265625;
  } else if (/\"/.test(t)) {
    l = 0.435546875;
  } else if (/\</.test(t)) {
    l = 0.74169921875;
  } else if (/\>/.test(t)) {
    l = 0.74169921875;
  } else if (/\?/.test(t)) {
    l = 0.48291015625;
  } else {
    l = 1;
  }
  return l;
}

// export 
function setImage(images) {// 设置图片数据
  _app2.default.log('进入设置图片数据方法');
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, rejcet) {var i;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;if (!(

              images && _app2.default.isArray(images))) {_context3.next = 14;break;}
              _app2.default.log('images是一个数组');
              i = 0;case 4:if (!(i < images.length)) {_context3.next = 12;break;}
              _app2.default.log('设置图片数据循环中:' + i);_context3.next = 8;return (
                setImageFn(images[i]));case 8:images[i] = _context3.sent;case 9:i++;_context3.next = 4;break;case 12:_context3.next = 18;break;case 14:


              _app2.default.log('images是一个对象');_context3.next = 17;return (
                setImageFn(images));case 17:images = _context3.sent;case 18:

              resolve(images);_context3.next = 24;break;case 21:_context3.prev = 21;_context3.t0 = _context3["catch"](0);

              //TODO handle the exception
              rejcet(_context3.t0);case 24:case "end":return _context3.stop();}}}, _callee3, null, [[0, 21]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());


}

function base64ToPathFn(path) {
  var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  if (!reg.test(path)) {
    return Promise.resolve(path);
  }
  return (0, _imageTools.base64ToPath)(path);
}

function setImageFn(image) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {var imgUrl, hasinfoCallBack, imageInfo;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
              image.url) {_context4.next = 20;break;}_context4.next = 3;return (
                base64ToPathFn(image.url));case 3:image.url = _context4.sent;
              imgUrl = image.url;_context4.next = 7;return (
                _app2.default.downloadFile_PromiseFc(imgUrl));case 7:imgUrl = _context4.sent;
              image.url = imgUrl;
              hasinfoCallBack = image.infoCallBack && typeof image.infoCallBack === 'function';
              imageInfo = {};_context4.next = 13;return (
                _app2.default.getImageInfo_PromiseFc(imgUrl));case 13:imageInfo = _context4.sent;
              if (hasinfoCallBack) {
                image = _objectSpread(_objectSpread({},
                image),
                image.infoCallBack(imageInfo));

              }
              image.dx = Number(image.dx) || 0;
              image.dy = Number(image.dy) || 0;
              image.dWidth = Number(image.dWidth || imageInfo.width);
              image.dHeight = Number(image.dHeight || imageInfo.height);
              image = _objectSpread(_objectSpread({},
              image), {}, {
                imageInfo: imageInfo });case 20:


              resolve(image);case 21:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());

}

// export 
function drawText(Context, textArray, bgObj) {// 先遍历换行再绘制
  if (!_app2.default.isArray(textArray)) {
    _app2.default.log('遍历文本方法, 不是数组');
    textArray = [textArray];
  } else {
    _app2.default.log('遍历文本方法, 是数组');
  }
  _app2.default.log('遍历文本方法, textArray:' + JSON.stringify(textArray));
  var newArr = [];
  if (textArray && textArray.length > 0) {
    for (var j = 0; j < textArray.length; j++) {
      var textItem = textArray[j];
      if (textItem.text && textItem.lineFeed) {
        var lineNum = -1,
        maxWidth = bgObj.width,
        lineHeight = textItem.size,
        dx = textItem.dx;
        if (_app2.default.isObject(textItem.lineFeed)) {
          var lineFeed = textItem.lineFeed;
          lineNum = lineFeed.lineNum !== undefined && typeof lineFeed.lineNum === 'number' && lineFeed.lineNum >= 0 ?
          lineFeed.lineNum : lineNum;
          maxWidth = lineFeed.maxWidth !== undefined && typeof lineFeed.maxWidth === 'number' ? lineFeed.maxWidth :
          maxWidth;
          lineHeight = lineFeed.lineHeight !== undefined && typeof lineFeed.lineHeight === 'number' ? lineFeed.lineHeight :
          lineHeight;
          dx = lineFeed.dx !== undefined && typeof lineFeed.dx === 'number' ? lineFeed.dx : dx;
        }
        var chr = textItem.text.split("");
        var temp = "";
        var row = [];
        //循环出几行文字组成数组
        for (var a = 0, len = chr.length; a < len; a++) {
          if (countTextLength(Context, {
            text: temp,
            size: textItem.size }) <=
          maxWidth && countTextLength(Context, {
            text: temp + chr[a],
            size: textItem.size }) <=
          maxWidth) {
            temp += chr[a];
            if (a == chr.length - 1) {
              row.push(temp);
            }
          } else {
            row.push(temp);
            temp = chr[a];
          }
        }
        _app2.default.log('循环出的文本数组:' + JSON.stringify(row));
        //只显示几行 变量间距lineHeight  变量行数lineNum
        var allNum = lineNum >= 0 && lineNum < row.length ? lineNum : row.length;

        for (var i = 0; i < allNum; i++) {
          var str = row[i];
          if (i == allNum - 1 && allNum < row.length) {
            str = str.substring(0, str.length - 1) + '...';
          }
          var obj = _objectSpread(_objectSpread({}, textItem), {}, {
            text: str,
            dx: i === 0 ? textItem.dx : dx >= 0 ? dx : textItem.dx,
            dy: textItem.dy + i * lineHeight,
            textLength: countTextLength(Context, {
              text: str,
              size: textItem.size }) });


          _app2.default.log('重新组成的文本对象:' + JSON.stringify(obj));
          newArr.push(obj);
        }
      } else {
        newArr.push(textItem);
      }
    }
  }
  _app2.default.log('绘制文本新数组:' + JSON.stringify(newArr));
  drawTexts(Context, newArr);
}

function setFont() {var textItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (textItem.font && typeof textItem.font === 'string') {
    _app2.default.log(textItem.font);
    return textItem.font;
  } else {
    var fontStyle = 'normal';
    var fontVariant = 'normal';
    var fontWeight = 'normal';
    var fontSize = textItem.size || 10;
    var fontFamily = 'sans-serif';
    fontSize = Math.ceil(Number(fontSize));
    if (textItem.fontStyle && typeof textItem.fontStyle === 'string')
    fontStyle = textItem.fontStyle.trim();
    if (textItem.fontVariant && typeof textItem.fontVariant === 'string')
    fontVariant = textItem.fontVariant.trim();
    if (textItem.fontWeight && (typeof textItem.fontWeight === 'string' || typeof textItem.fontWeight === 'number'))
    fontWeight = textItem.fontWeight.trim();
    if (textItem.fontFamily && typeof textItem.fontFamily === 'string')
    fontFamily = textItem.fontFamily.trim();
    return fontStyle + ' ' +
    fontVariant + ' ' +
    fontWeight + ' ' +
    fontSize + 'px' + ' ' +
    fontFamily;
  }
}

function drawTexts(Context, texts) {// 绘制文本
  _app2.default.log('准备绘制文本方法, texts:' + JSON.stringify(texts));
  if (texts && _app2.default.isArray(texts)) {
    _app2.default.log('准备绘制文本方法, 是数组');
    if (texts.length > 0) {
      for (var i = 0; i < texts.length; i++) {
        drawTextFn(Context, texts[i]);
      }
    }
  } else {
    _app2.default.log('准备绘制文本方法, 不是数组');
    drawTextFn(Context, texts);
  }
}

function drawTextFn(Context, textItem) {
  _app2.default.log('进入绘制文本方法, textItem:' + JSON.stringify(textItem));
  if (textItem && _app2.default.isObject(textItem) && textItem.text) {
    Context.font = setFont(textItem);
    Context.setFillStyle(textItem.color);
    Context.setGlobalAlpha(textItem.alpha);
    Context.setTextAlign(textItem.textAlign);
    Context.setTextBaseline(textItem.textBaseline);
    Context.fillText(textItem.text, textItem.dx, textItem.dy);
    if (textItem.lineThrough && _app2.default.isObject(textItem.lineThrough)) {
      _app2.default.log('有删除线');
      var lineThrough = textItem.lineThrough;
      lineThrough.alpha = lineThrough.alpha !== undefined ? lineThrough.alpha : textItem.alpha;
      lineThrough.style = lineThrough.style || textItem.color;
      lineThrough.width = lineThrough.width !== undefined ? lineThrough.width : textItem.size / 10;
      lineThrough.cap = lineThrough.cap !== undefined ? lineThrough.cap : 'butt';
      _app2.default.log('删除线对象:' + JSON.stringify(lineThrough));
      Context.setGlobalAlpha(lineThrough.alpha);
      Context.setStrokeStyle(lineThrough.style);
      Context.setLineWidth(lineThrough.width);
      Context.setLineCap(lineThrough.cap);
      var mx, my;
      switch (textItem.textAlign) {
        case 'left':
          mx = textItem.dx;
          break;
        case 'center':
          mx = textItem.dx - textItem.textLength / 2;
          break;
        default:
          mx = textItem.dx - textItem.textLength;
          break;}

      switch (textItem.textBaseline) {
        case 'top':
          my = textItem.dy + textItem.size * .5;
          break;
        case 'middle':
          my = textItem.dy;
          break;
        default:
          my = textItem.dy - textItem.size * .5;
          break;}

      Context.beginPath();
      Context.moveTo(mx, my);
      Context.lineTo(mx + textItem.textLength, my);
      Context.stroke();
      Context.closePath();
      _app2.default.log('删除线完毕');
    }
    Context.setGlobalAlpha(1);
    Context.font = '10px sans-serif';
  }
}
// export 
function drawImage(Context, images) {// 绘制图片
  _app2.default.log('判断图片数据类型:' + JSON.stringify(images));
  if (images && _app2.default.isArray(images)) {
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        readyDrawImageFn(Context, images[i]);
      }
    }
  } else {
    readyDrawImageFn(Context, images);
  }

}

function readyDrawImageFn(Context, img) {
  _app2.default.log('判断绘制图片形状, img:' + JSON.stringify(img));
  if (img.url) {
    if (img.circleSet) {
      drawCircleImage(Context, img);
    } else if (img.roundRectSet) {
      drawRoundRectImage(Context, img);
    } else {
      drawImageFn(Context, img);
    }
  }
}

function drawImageFn(Context, img) {
  _app2.default.log('进入绘制默认图片方法, img:' + JSON.stringify(img));
  if (img.url) {
    var hasAlpha = !_app2.default.isUndef(img.alpha);
    img.alpha = Number(!_app2.default.isUndef(img.alpha) ? img.alpha : 1);
    Context.setGlobalAlpha(img.alpha);
    _app2.default.log('绘制默认图片方法, 有url');
    if (img.dWidth && img.dHeight && img.sx && img.sy && img.sWidth && img.sHeight) {
      _app2.default.log('绘制默认图片方法, 绘制第一种方案');
      Context.drawImage(img.url,
      Number(img.sx) || false, Number(img.sy) || false,
      Number(img.sWidth) || false, Number(img.sHeight) || false,
      Number(img.dx || 0), Number(img.dy || 0),
      Number(img.dWidth) || false, Number(img.dHeight) || false);
    } else if (img.dWidth && img.dHeight) {
      _app2.default.log('绘制默认图片方法, 绘制第二种方案');
      Context.drawImage(img.url, Number(img.dx || 0), Number(img.dy || 0),
      Number(img.dWidth) || false, Number(img.dHeight) || false);
    } else {
      _app2.default.log('绘制默认图片方法, 绘制第三种方案');
      Context.drawImage(img.url, Number(img.dx || 0), Number(img.dy || 0));
    }
    if (hasAlpha) {
      Context.setGlobalAlpha(1);
    }
  }
  _app2.default.log('绘制默认图片方法, 绘制完毕');
}

function drawCircleImage(Context, obj) {
  _app2.default.log('进入绘制圆形图片方法, obj:' + JSON.stringify(obj));var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,circleSet = obj.circleSet,imageInfo = obj.imageInfo;
  var x, y, r;
  if (typeof circleSet === 'object') {
    x = circleSet.x;
    y = circleSet.y;
    r = circleSet.r;
  }
  if (!r) {
    var d;
    d = dWidth > dHeight ? dHeight : dWidth;
    r = d / 2;
  }

  x = x ? dx + x : (dx || 0) + r;
  y = y ? dy + y : (dy || 0) + r;
  Context.save();
  Context.beginPath();
  Context.arc(x, y, r, 0, 2 * Math.PI, false);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  _app2.default.log('默认图片绘制完毕');
  Context.restore();
}

function drawRoundRectImage(Context, obj) {// 绘制矩形
  _app2.default.log('进入绘制矩形图片方法, obj:' + JSON.stringify(obj));
  Context.save();var

  dx =





  obj.dx,dy = obj.dy,dWidth = obj.dWidth,dHeight = obj.dHeight,roundRectSet = obj.roundRectSet,imageInfo = obj.imageInfo;
  var r;
  if (typeof roundRectSet === 'object') {
    r = roundRectSet.r;
  }
  r = r || dWidth * .1;

  if (dWidth < 2 * r) {
    r = dWidth / 2;
  }
  if (dHeight < 2 * r) {
    r = dHeight / 2;
  }
  Context.beginPath();
  Context.moveTo(dx + r, dy);
  Context.arcTo(dx + dWidth, dy, dx + dWidth, dy + dHeight, r);
  Context.arcTo(dx + dWidth, dy + dHeight, dx, dy + dHeight, r);
  Context.arcTo(dx, dy + dHeight, dx, dy, r);
  Context.arcTo(dx, dy, dx + dWidth, dy, r);
  Context.closePath();
  Context.setGlobalAlpha(0);
  Context.fillStyle = '#FFFFFF';
  Context.fill();
  Context.setGlobalAlpha(1);
  Context.clip();
  drawImageFn(Context, obj);
  Context.restore();
  _app2.default.log('进入绘制矩形图片方法, 绘制完毕');
}

// export 
function drawQrCode(Context, qrCodeObj) {//生成二维码方法， 参考了 诗小柒 的二维码生成器代码
  _app2.default.log('进入绘制二维码方法');
  _app2.default.showLoading('正在生成二维码');
  var qrcodeAlgObjCache = [];
  var options = {
    text: String(qrCodeObj.text || '') || '', // 生成内容
    size: Number(qrCodeObj.size || 0) || 200, // 二维码大小
    background: String(qrCodeObj.background || '') || '#ffffff', // 背景色
    foreground: String(qrCodeObj.foreground || '') || '#000000', // 前景色
    pdground: String(qrCodeObj.pdground || '') || '#000000', // 定位角点颜色
    correctLevel: Number(qrCodeObj.correctLevel || 0) || 3, // 容错级别
    image: String(qrCodeObj.image || '') || '', // 二维码图标
    imageSize: Number(qrCodeObj.imageSize || 0) || 40, // 二维码图标大小
    dx: Number(qrCodeObj.dx || 0) || 0, // x轴距离
    dy: Number(qrCodeObj.dy || 0) || 0 // y轴距离
  };
  var qrCodeAlg = null;
  var d = 0;
  for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
    d = i;
    if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.correctLevel) {
      qrCodeAlg = qrcodeAlgObjCache[i].obj;
      break;
    }
  }
  if (d == l) {
    qrCodeAlg = new _QRCodeAlg.default(options.text, options.correctLevel);
    qrcodeAlgObjCache.push({
      text: options.text,
      correctLevel: options.correctLevel,
      obj: qrCodeAlg });

  }
  var getForeGround = function getForeGround(config) {
    var options = config.options;
    if (options.pdground && (
    config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
    config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
    config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
    {
      return options.pdground;
    }
    return options.foreground;
  };
  var count = qrCodeAlg.getModuleCount();
  var ratioSize = options.size;
  var ratioImgSize = options.imageSize;
  //计算每个点的长宽
  var tileW = (ratioSize / count).toPrecision(4);
  var tileH = (ratioSize / count).toPrecision(4);
  //绘制
  for (var row = 0; row < count; row++) {
    for (var col = 0; col < count; col++) {
      var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
      var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
      var foreground = getForeGround({
        row: row,
        col: col,
        count: count,
        options: options });

      Context.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
      Context.fillRect(options.dx + Math.round(col * tileW), options.dy + Math.round(row * tileH), w, h);
    }
  }
  if (options.image) {




    // 画圆角矩形
    var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
      ctxi.setLineWidth(lineWidth);
      ctxi.setFillStyle(options.background);
      ctxi.setStrokeStyle(options.background);
      ctxi.beginPath(); // draw top and top right corner 
      ctxi.moveTo(x + r, y);
      ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
      ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
      ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
      ctxi.arcTo(x, y, x + r, y, r);
      ctxi.closePath();
      if (fill) {
        ctxi.fill();
      }
      if (stroke) {
        ctxi.stroke();
      }
    };var x = options.dx + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = options.dy + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(Context, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);Context.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
  }
  _app2.default.log('进入绘制二维码方法完毕');
  _app2.default.hideLoading();
}


function getShreUserPosterBackground(objs) {//检查背景图是否存在于本地， 若存在直接返回， 否则调用getShreUserPosterBackgroundFc方法
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {var savedFilePath;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;

              _app2.default.showLoading('正在获取海报背景图');_context5.next = 4;return (
                getShreUserPosterBackgroundFc(objs));case 4:savedFilePath = _context5.sent;
              _app2.default.hideLoading();
              resolve(savedFilePath);_context5.next = 15;break;case 9:_context5.prev = 9;_context5.t0 = _context5["catch"](0);

              _app2.default.hideLoading();
              _app2.default.showToast('获取分享用户背景图失败:' + JSON.stringify(_context5.t0));
              _app2.default.log(JSON.stringify(_context5.t0));
              reject(_context5.t0);case 15:case "end":return _context5.stop();}}}, _callee5, null, [[0, 9]]);}));return function (_x9, _x10) {return _ref5.apply(this, arguments);};}());


}

function getPosterStorage(type) {
  return _app2.default.getStorageSync(getStorageKey(type));
}

function removePosterStorage(type) {
  var ShreUserPosterBackgroundKey = getStorageKey(type);
  var pbg = _app2.default.getStorageSync(ShreUserPosterBackgroundKey);
  if (pbg && pbg.path) {
    _app2.default.removeStorageSync(ShreUserPosterBackgroundKey);
  }
}

function setPosterStorage(type, data) {
  _app2.default.setStorage(getStorageKey(type), data);
}

function getStorageKey(type) {
  return ShreUserPosterBackgroundKey + (type || 'default');
}

function getShreUserPosterBackgroundFc(objs, upimage) {//下载并保存背景图方法
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  _app2.default.log('获取分享背景图, 尝试清空本地数据');
  return new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve, reject) {var image, savedFilePath, imageObj, returnObj;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.prev = 0;

              _app2.default.showLoading('正在下载海报背景图');
              _app2.default.log('没有从后端获取的背景图片路径, 尝试从后端获取背景图片路径');if (!
              backgroundImage) {_context6.next = 7;break;}_context6.t0 = backgroundImage;_context6.next = 10;break;case 7:_context6.next = 9;return _app2.default.getPosterUrl(objs);case 9:_context6.t0 = _context6.sent;case 10:image = _context6.t0;_context6.next = 13;return (
                base64ToPathFn(image));case 13:image = _context6.sent;
              _app2.default.log('尝试下载并保存背景图:' + image);_context6.next = 17;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(image));case 17:savedFilePath = _context6.sent;if (!
              savedFilePath) {_context6.next = 32;break;}
              _app2.default.log('下载并保存背景图成功:' + savedFilePath);_context6.next = 22;return (
                _app2.default.getImageInfo_PromiseFc(savedFilePath));case 22:imageObj = _context6.sent;
              _app2.default.log('获取图片信息成功');
              returnObj = {
                path: savedFilePath,
                width: imageObj.width,
                height: imageObj.height,
                name: _app2.default.fileNameInPath(image) };

              _app2.default.log('拼接背景图信息对象成功:' + JSON.stringify(returnObj));


              setPosterStorage(type, _objectSpread({}, returnObj));



              _app2.default.hideLoading();
              _app2.default.log('返回背景图信息对象');
              resolve(_objectSpread({}, returnObj));_context6.next = 34;break;case 32:


              _app2.default.hideLoading();
              reject('not find savedFilePath');case 34:_context6.next = 39;break;case 36:_context6.prev = 36;_context6.t1 = _context6["catch"](0);


              //TODO handle the exception
              reject(_context6.t1);case 39:case "end":return _context6.stop();}}}, _callee6, null, [[0, 36]]);}));return function (_x11, _x12) {return _ref6.apply(this, arguments);};}());


}


module.exports = {
  getSharePoster: getSharePoster,
  setText: setText,
  setImage: setImage,
  drawText: drawText,
  drawImage: drawImage,
  drawQrCode: drawQrCode,
  drawFillRect: drawFillRect,
  drawStrokeRect: drawStrokeRect,
  drawRoundStrokeRect: drawRoundStrokeRect,
  drawRoundFillRect: drawRoundFillRect };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 83:
/*!***********************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/js_sdk/QuShe-SharerPoster/QS-SharePoster/QRCodeAlg.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = QRCodeAlg; /**
                                                                                                            * 获取单个字符的utf8编码
                                                                                                            * unicode BMP平面约65535个字符
                                                                                                            * @param {num} code
                                                                                                            * return {array}
                                                                                                            */
function unicodeFormat8(code) {
  // 1 byte
  var c0, c1, c2;
  if (code < 128) {
    return [code];
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}
/**
   * 获取字符串的utf8编码字节串
   * @param {string} string
   * @return {array}
   */
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}
/**
   * 二维码算法实现
   * @param {string} data              要编码的信息字符串
   * @param {num} errorCorrectLevel 纠错等级
   */
function QRCodeAlg(data, errorCorrectLevel) {
  this.typeNumber = -1; //版本
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null; //二维矩阵，存放最终结果
  this.moduleCount = 0; //矩阵大小
  this.dataCache = null; //数据缓存
  this.rsBlocks = null; //版本数据信息
  this.totalDataCount = -1; //可使用的数据量
  this.data = data;
  this.utf8bytes = getUTF8Bytes(data);
  this.make();
}
QRCodeAlg.prototype = {
  constructor: QRCodeAlg,
  /**
                           * 获取二维码矩阵大小
                           * @return {num} 矩阵大小
                           */
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  /**
      * 编码
      */
  make: function make() {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  },
  /**
      * 设置二位矩阵功能图形
      * @param  {bool} test 表示是否在寻找最好掩膜阶段
      * @param  {num} maskPattern 掩膜的版本
      */
  makeImpl: function makeImpl(maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  /**
      * 设置二维码的位置探测图形
      * @param  {num} row 探测图形的中心横坐标
      * @param  {num} col 探测图形的中心纵坐标
      */
  setupPositionProbePattern: function setupPositionProbePattern(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  /**
      * 创建二维码
      * @return {[type]} [description]
      */
  createQrcode: function createQrcode() {
    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;
    for (var i = 0; i < 8; i++) {
      this.makeImpl(i);
      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }
  },
  /**
      * 设置定位图形
      * @return {[type]} [description]
      */
  setupTimingPattern: function setupTimingPattern() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = r % 2 == 0;
    }
  },
  /**
      * 设置矫正图形
      * @return {[type]} [description]
      */
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    var pos = QRUtil.getPatternPosition(this.typeNumber);
    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  /**
      * 设置版本信息（7以上版本才有）
      * @param  {bool} test 是否处于判断最佳掩膜阶段
      * @return {[type]}      [description]
      */
  setupTypeNumber: function setupTypeNumber(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  /**
      * 设置格式信息（纠错等级和掩膜版本）
      * @param  {bool} test
      * @param  {num} maskPattern 掩膜版本
      * @return {}
      */
  setupTypeInfo: function setupTypeInfo(test, maskPattern) {
    var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    // vertical
    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
      // horizontal
      var mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    // fixed module
    this.modules[this.moduleCount - 8][8] = !test;
  },
  /**
      * 数据编码
      * @return {[type]} [description]
      */
  createData: function createData() {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //添加模式
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }
    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }
    // padding
    while (true) {
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD0, 8);
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD1, 8);
    }
    return this.createBytes(buffer);
  },
  /**
      * 纠错码编码
      * @param  {buffer} buffer 数据编码
      * @return {[type]}
      */
  createBytes: function createBytes(buffer) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var length = this.rsBlock.length / 3;
    var rsBlocks = new Array();
    for (var i = 0; i < length; i++) {
      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var data = new Array(this.totalDataCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;

  },
  /**
      * 布置模块，构建最终信息
      * @param  {} data
      * @param  {} maskPattern
      * @return {}
      */
  mapData: function mapData(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            var mask = QRUtil.getMask(maskPattern, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  } };

/**
        * 填充字段
        */
QRCodeAlg.PAD0 = 0xEC;
QRCodeAlg.PAD1 = 0x11;
//---------------------------------------------------------------------
// 纠错等级对应的编码
//---------------------------------------------------------------------
var QRErrorCorrectLevel = [1, 0, 3, 2];
//---------------------------------------------------------------------
// 掩膜版本
//---------------------------------------------------------------------
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7 };

//---------------------------------------------------------------------
// 工具类
//---------------------------------------------------------------------
var QRUtil = {
  /*
               每个版本矫正图形的位置
                */
  PATTERN_POSITION_TABLE: [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]],

  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  /*
                                                           BCH编码格式信息
                                                            */
  getBCHTypeInfo: function getBCHTypeInfo(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  /*
     BCH编码版本信息
      */
  getBCHTypeNumber: function getBCHTypeNumber(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d;
  },
  /*
     获取BCH位信息
      */
  getBCHDigit: function getBCHDigit(data) {
    var digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  /*
     获取版本对应的矫正图形位置
      */
  getPatternPosition: function getPatternPosition(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  /*
     掩膜算法
      */
  getMask: function getMask(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);}

  },
  /*
     获取RS的纠错多项式
      */
  getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  },
  /*
     获取评价
      */
  getLostPoint: function getLostPoint(qrCode) {
    var moduleCount = qrCode.getModuleCount(),
    lostPoint = 0,
    darkCount = 0;
    for (var row = 0; row < moduleCount; row++) {
      var sameCount = 0;
      var head = qrCode.modules[row][0];
      for (var col = 0; col < moduleCount; col++) {
        var current = qrCode.modules[row][col];
        //level 3 评价
        if (col < moduleCount - 6) {
          if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
            if (col < moduleCount - 10) {
              if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                lostPoint += 40;
              }
            } else if (col > 3) {
              if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 2 评价
        if (row < moduleCount - 1 && col < moduleCount - 1) {
          var count = 0;
          if (current) count++;
          if (qrCode.modules[row + 1][col]) count++;
          if (qrCode.modules[row][col + 1]) count++;
          if (qrCode.modules[row + 1][col + 1]) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
        //level 4 评价
        if (current) {
          darkCount++;
        }
      }
    }
    for (var col = 0; col < moduleCount; col++) {
      var sameCount = 0;
      var head = qrCode.modules[0][col];
      for (var row = 0; row < moduleCount; row++) {
        var current = qrCode.modules[row][col];
        //level 3 评价
        if (row < moduleCount - 6) {
          if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
            if (row < moduleCount - 10) {
              if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                lostPoint += 40;
              }
            } else if (row > 3) {
              if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                lostPoint += 40;
              }
            }
          }
        }
        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += 3 + sameCount - 5;
          }
          sameCount = 1;
        }
      }
    }
    // LEVEL4
    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  } };


//---------------------------------------------------------------------
// QRMath使用的数学工具
//---------------------------------------------------------------------
var QRMath = {
  /*
               将n转化为a^m
                */
  glog: function glog(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  /*
     将a^m转化为n
      */
  gexp: function gexp(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256) };


for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
//---------------------------------------------------------------------
// QRPolynomial 多项式
//---------------------------------------------------------------------
/**
 * 多项式类
 * @param {Array} num   系数
 * @param {num} shift a^shift
 */
function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}
QRPolynomial.prototype = {
  get: function get(index) {
    return this.num[index];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  /**
      * 多项式乘法
      * @param  {QRPolynomial} e 被乘多项式
      * @return {[type]}   [description]
      */
  multiply: function multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  /**
      * 多项式模运算
      * @param  {QRPolynomial} e 模多项式
      * @return {}
      */
  mod: function mod(e) {
    var tl = this.getLength(),
    el = e.getLength();
    if (tl - el < 0) {
      return this;
    }
    var num = new Array(tl);
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i);
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      while (num[0] == 0) {
        num.shift();
      }
    }
    return new QRPolynomial(num, 0);
  } };


//---------------------------------------------------------------------
// RS_BLOCK_TABLE
//---------------------------------------------------------------------
/*
二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
 */
var RS_BLOCK_TABLE = [
// L
// M
// Q
// H
// 1
[1, 26, 19],
[1, 26, 16],
[1, 26, 13],
[1, 26, 9],

// 2
[1, 44, 34],
[1, 44, 28],
[1, 44, 22],
[1, 44, 16],

// 3
[1, 70, 55],
[1, 70, 44],
[2, 35, 17],
[2, 35, 13],

// 4
[1, 100, 80],
[2, 50, 32],
[2, 50, 24],
[4, 25, 9],

// 5
[1, 134, 108],
[2, 67, 43],
[2, 33, 15, 2, 34, 16],
[2, 33, 11, 2, 34, 12],

// 6
[2, 86, 68],
[4, 43, 27],
[4, 43, 19],
[4, 43, 15],

// 7
[2, 98, 78],
[4, 49, 31],
[2, 32, 14, 4, 33, 15],
[4, 39, 13, 1, 40, 14],

// 8
[2, 121, 97],
[2, 60, 38, 2, 61, 39],
[4, 40, 18, 2, 41, 19],
[4, 40, 14, 2, 41, 15],

// 9
[2, 146, 116],
[3, 58, 36, 2, 59, 37],
[4, 36, 16, 4, 37, 17],
[4, 36, 12, 4, 37, 13],

// 10
[2, 86, 68, 2, 87, 69],
[4, 69, 43, 1, 70, 44],
[6, 43, 19, 2, 44, 20],
[6, 43, 15, 2, 44, 16],

// 11
[4, 101, 81],
[1, 80, 50, 4, 81, 51],
[4, 50, 22, 4, 51, 23],
[3, 36, 12, 8, 37, 13],

// 12
[2, 116, 92, 2, 117, 93],
[6, 58, 36, 2, 59, 37],
[4, 46, 20, 6, 47, 21],
[7, 42, 14, 4, 43, 15],

// 13
[4, 133, 107],
[8, 59, 37, 1, 60, 38],
[8, 44, 20, 4, 45, 21],
[12, 33, 11, 4, 34, 12],

// 14
[3, 145, 115, 1, 146, 116],
[4, 64, 40, 5, 65, 41],
[11, 36, 16, 5, 37, 17],
[11, 36, 12, 5, 37, 13],

// 15
[5, 109, 87, 1, 110, 88],
[5, 65, 41, 5, 66, 42],
[5, 54, 24, 7, 55, 25],
[11, 36, 12],

// 16
[5, 122, 98, 1, 123, 99],
[7, 73, 45, 3, 74, 46],
[15, 43, 19, 2, 44, 20],
[3, 45, 15, 13, 46, 16],

// 17
[1, 135, 107, 5, 136, 108],
[10, 74, 46, 1, 75, 47],
[1, 50, 22, 15, 51, 23],
[2, 42, 14, 17, 43, 15],

// 18
[5, 150, 120, 1, 151, 121],
[9, 69, 43, 4, 70, 44],
[17, 50, 22, 1, 51, 23],
[2, 42, 14, 19, 43, 15],

// 19
[3, 141, 113, 4, 142, 114],
[3, 70, 44, 11, 71, 45],
[17, 47, 21, 4, 48, 22],
[9, 39, 13, 16, 40, 14],

// 20
[3, 135, 107, 5, 136, 108],
[3, 67, 41, 13, 68, 42],
[15, 54, 24, 5, 55, 25],
[15, 43, 15, 10, 44, 16],

// 21
[4, 144, 116, 4, 145, 117],
[17, 68, 42],
[17, 50, 22, 6, 51, 23],
[19, 46, 16, 6, 47, 17],

// 22
[2, 139, 111, 7, 140, 112],
[17, 74, 46],
[7, 54, 24, 16, 55, 25],
[34, 37, 13],

// 23
[4, 151, 121, 5, 152, 122],
[4, 75, 47, 14, 76, 48],
[11, 54, 24, 14, 55, 25],
[16, 45, 15, 14, 46, 16],

// 24
[6, 147, 117, 4, 148, 118],
[6, 73, 45, 14, 74, 46],
[11, 54, 24, 16, 55, 25],
[30, 46, 16, 2, 47, 17],

// 25
[8, 132, 106, 4, 133, 107],
[8, 75, 47, 13, 76, 48],
[7, 54, 24, 22, 55, 25],
[22, 45, 15, 13, 46, 16],

// 26
[10, 142, 114, 2, 143, 115],
[19, 74, 46, 4, 75, 47],
[28, 50, 22, 6, 51, 23],
[33, 46, 16, 4, 47, 17],

// 27
[8, 152, 122, 4, 153, 123],
[22, 73, 45, 3, 74, 46],
[8, 53, 23, 26, 54, 24],
[12, 45, 15, 28, 46, 16],

// 28
[3, 147, 117, 10, 148, 118],
[3, 73, 45, 23, 74, 46],
[4, 54, 24, 31, 55, 25],
[11, 45, 15, 31, 46, 16],

// 29
[7, 146, 116, 7, 147, 117],
[21, 73, 45, 7, 74, 46],
[1, 53, 23, 37, 54, 24],
[19, 45, 15, 26, 46, 16],

// 30
[5, 145, 115, 10, 146, 116],
[19, 75, 47, 10, 76, 48],
[15, 54, 24, 25, 55, 25],
[23, 45, 15, 25, 46, 16],

// 31
[13, 145, 115, 3, 146, 116],
[2, 74, 46, 29, 75, 47],
[42, 54, 24, 1, 55, 25],
[23, 45, 15, 28, 46, 16],

// 32
[17, 145, 115],
[10, 74, 46, 23, 75, 47],
[10, 54, 24, 35, 55, 25],
[19, 45, 15, 35, 46, 16],

// 33
[17, 145, 115, 1, 146, 116],
[14, 74, 46, 21, 75, 47],
[29, 54, 24, 19, 55, 25],
[11, 45, 15, 46, 46, 16],

// 34
[13, 145, 115, 6, 146, 116],
[14, 74, 46, 23, 75, 47],
[44, 54, 24, 7, 55, 25],
[59, 46, 16, 1, 47, 17],

// 35
[12, 151, 121, 7, 152, 122],
[12, 75, 47, 26, 76, 48],
[39, 54, 24, 14, 55, 25],
[22, 45, 15, 41, 46, 16],

// 36
[6, 151, 121, 14, 152, 122],
[6, 75, 47, 34, 76, 48],
[46, 54, 24, 10, 55, 25],
[2, 45, 15, 64, 46, 16],

// 37
[17, 152, 122, 4, 153, 123],
[29, 74, 46, 14, 75, 47],
[49, 54, 24, 10, 55, 25],
[24, 45, 15, 46, 46, 16],

// 38
[4, 152, 122, 18, 153, 123],
[13, 74, 46, 32, 75, 47],
[48, 54, 24, 14, 55, 25],
[42, 45, 15, 32, 46, 16],

// 39
[20, 147, 117, 4, 148, 118],
[40, 75, 47, 7, 76, 48],
[43, 54, 24, 22, 55, 25],
[10, 45, 15, 67, 46, 16],

// 40
[19, 148, 118, 6, 149, 119],
[18, 75, 47, 31, 76, 48],
[34, 54, 24, 34, 55, 25],
[20, 45, 15, 61, 46, 16]];


/**
                            * 根据数据获取对应版本
                            * @return {[type]} [description]
                            */
QRCodeAlg.prototype.getRightType = function () {
  for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
    var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var totalDataCount = 0;
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var dataCount = rsBlock[i * 3 + 2];
      totalDataCount += dataCount * count;
    }
    var lengthBytes = typeNumber > 9 ? 2 : 1;
    if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
      this.typeNumber = typeNumber;
      this.rsBlock = rsBlock;
      this.totalDataCount = totalDataCount;
      break;
    }
  }
};

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------
function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(num >>> length - i - 1 & 1);
    }
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  } };

/***/ }),

/***/ 84:
/*!*************************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/js_sdk/QuShe-SharerPoster/QS-SharePoster/image-tools.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 9:
/*!******************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/乐供商城/leGong/node_modules/umtrack-wx/lib/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var e,t,n = "[UMENG] -- ",p = (t = !1, function () {null === e && (e = new i());return e;});function i() {this.setDebug = function (e) {t = e;};this.d = function () {if (t) try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.debug.apply(console, arguments);} catch (e) {}};this.i = function () {try {if (t) try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.info.apply(console, arguments);} catch (e) {}} catch (e) {}};this.e = function () {if (t) try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.error.apply(console, arguments);} catch (e) {}};this.w = function () {if (t) try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.warn.apply(console, arguments);} catch (e) {}};this.v = function () {if (t) try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.log.apply(console, arguments);} catch (e) {}};this.t = function () {if (t) try {console.table.apply(console, arguments);} catch (e) {}};this.tip = function () {try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.log.apply(console, arguments);} catch (e) {}};this.tip_w = function (e) {try {console.log("%c " + n + e, "background:red; padding: 4px; padding-right: 8px; border-radius: 4px; color: #fff;");} catch (e) {}};this.err = function () {try {"string" == typeof arguments[0] && (arguments[0] = n + arguments[0]);console.error.apply(console, arguments);} catch (e) {}};}var r,f = (r = e = null, function () {return r = r || new o();});function o() {var n = {};this.useOpenid = function () {return !!n.useOpenid;};this.useSwanid = function () {return !!n.useSwanid;};this.autoGetOpenid = function () {return !!n.autoGetOpenid;};this.appKey = function () {return n.appKey;};this.uploadUserInfo = function () {return n.uploadUserInfo;};this.enableVerify = function () {return n.enableVerify;};this.set = function (e) {n = e;};this.get = function () {return n;};this.setItem = function (e, t) {n[e] = t;};this.getItem = function (e) {return n[e];};}function s() {this.listeners = {};this.maxListener = 2;}s.prototype.addListener = s.prototype.on = function (e, t) {var n = this.listeners;n[e] && n[e].length >= this.maxListener ? console.error("监听器的最大数量是%d,您已超出限制", this.maxListener) : n[e] instanceof Array ? -1 === n[e].indexOf(t) && n[e].push(t) : n[e] = [].concat(t);};s.prototype.emit = function (e) {var t = Array.prototype.slice.call(arguments);t.shift();var n = this.listeners;n[e] instanceof Array && n[e].forEach(function (e) {e.apply(null, t);});};s.prototype.listeners = function (e) {return this.listeners[e];};s.prototype.setMaxListeners = function (e) {this.maxListener = e;};s.prototype.removeListener = function (e, t) {var n = this.listeners,i = (n[e] || []).indexOf(t);0 <= i && n[e].splice(i, 1);};s.prototype.removeAllListener = function (e) {this.listeners[e] = [];};s.prototype.once = function (n, i) {var r = this;this.on(n, function e() {var t = Array.prototype.slice.call(arguments);i.apply(null, t);r.removeListener(n, e);});};var a = new s(),c = 0,u = 1,l = new (function () {function e() {}e.prototype.setStorage = function (e, t, n) {wx.setStorage({ key: e, data: t, success: function success() {"function" == typeof n && n(!0);}, fail: function fail() {"function" == typeof n && n(!1);} });};e.prototype.getStorage = function (t, n) {wx.getStorage({ key: t, success: function success(e) {"function" == typeof n && n(e.data);}, fail: function fail(e) {p().w(t + ": " + e.errMsg);"function" == typeof n && n();} });};e.prototype.removeStorage = function (e, t) {wx.removeStorage({ key: e, success: function success() {"function" == typeof t && t(!0);}, fail: function fail() {"function" == typeof t && t(!1);} });};e.prototype.getSystemInfo = function (o) {wx.getSystemInfo({ success: function success(e) {var t = { model: e.model, brand: e.brand, pixelRatio: e.pixelRatio, screenWidth: e.screenWidth, screenHeight: e.screenHeight, fontSizeSetting: e.fontSizeSetting, platform: e.platform, platformVersion: e.version, platformSDKVersion: e.SDKVersion, language: e.language, deviceName: e.model, OSVersion: e.system, resolution: "" },n = e.system.split(" ");Array.isArray(n) && (t.OS = n[0]);var i = Math.round(e.screenWidth * e.pixelRatio),r = Math.round(e.screenHeight * e.pixelRatio);t.resolution = r < i ? i + "*" + r : r + "*" + i;"function" == typeof o && o(t);}, fail: function fail() {"function" == typeof o && o();} });};e.prototype.getDeviceInfo = function (e) {"function" == typeof e && e("");};e.prototype.checkNetworkAvailable = function (t) {wx.getNetworkType({ success: function success(e) {"function" == typeof t && t(e && "none" !== e.networkType);}, fail: function fail() {"function" == typeof t && t(!1);} });};e.prototype.getNetworkInfo = function (t) {wx.getNetworkType({ success: function success(e) {"function" == typeof t && t({ networkAvailable: "none" !== e.networkType, networkType: e.networkType });}, fail: function fail() {"function" == typeof t && t();} });};e.prototype.getDeviceId = function (e) {e("");};e.prototype.getAdvertisingId = function (e) {"function" == typeof e && e("");};e.prototype.onNetworkStatusChange = function (t) {wx.onNetworkStatusChange(function (e) {"function" == typeof t && t(e.isConnected);});};e.prototype.request = function (e) {var t = e.success,n = e.fail,i = !1,r = null;e.success = function (e) {if (!i) {r && clearTimeout(r);"function" == typeof t && t(e);}};e.fail = function () {if (!i) {r && clearTimeout(r);"function" == typeof n && n(!1);}};wx.request(e);r = setTimeout(function () {r && clearTimeout(r);i = !0;"function" == typeof n && n(i);}, e.timeout || 5e3);};e.prototype.getSdkType = function () {return "wxmp";};e.prototype.getPlatform = function () {return "wx";};e.prototype.connectSocket = function (e) {wx.connectSocket(e);};e.prototype.closeSocket = function (e) {wx.closeSocket(e);};e.prototype.sendSocketMessage = function (e) {wx.sendSocketMessage(e);};e.prototype.onSocketOpen = function (e) {wx.onSocketOpen(e);};e.prototype.onSocketClose = function (e) {wx.onSocketClose(e);};e.prototype.onSocketMessage = function (e) {wx.onSocketMessage(e);};e.prototype.onSocketError = function (e) {wx.onSocketError(e);};e.prototype.getClipboard = function (t) {try {wx.getClipboardData({ success: function success(e) {"function" == typeof t && t(e.data);}, fail: function fail() {"function" == typeof t && t("");} });} catch (e) {p.e("读取clipboard发生错误", e);}};e.prototype.showModal = function (e) {try {wx.showModal(e);} catch (e) {p.e("展示Modal时发生错误", e);}};e.prototype.showToast = function (e) {try {wx.showToast(e);} catch (e) {p.e("showToast error", e);}};e.prototype.getUserInfo = function (n) {var t = { fail: function fail() {n && n();}, success: function success(e) {if (e && e.userInfo) {var t = e.userInfo;n && n({ avatar: t.avatarUrl, nickName: t.nickName, gender: t.gender, country: t.country, province: t.province, city: t.city, language: t.language });}} };try {wx.getSetting({ success: function success(e) {e.authSetting["scope.userInfo"] && wx.getUserInfo(t);}, fail: function fail() {n();} });} catch (e) {p.e("getUserInfo error", e);}};e.prototype.getAppInfoSync = function () {if (wx.getAccountInfoSync) {var e = wx.getAccountInfoSync(),t = e && e.miniProgram ? e.miniProgram : {};return { appId: t.appId, appEnv: t.envVersion, appVersion: t.version };}return {};};e.prototype.onShareAppMessage = function (e) {wx.onShareAppMessage(e);};e.prototype.shareAppMessage = function (e) {wx.shareAppMessage(e);};return e;}())(),_d = function d(e, t) {return (_d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(e, t);};function h(e, t) {_d(e, t);function n() {this.constructor = e;}e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());}var g = { SESSION_INTERVAL: 3e4, LOG_URL: "https://umini.shujupie.com/wxm_logs", GET_OPENID_URL: "https://umini.shujupie.com/uminiprogram_logs/wx/getuut", USERINFO_URL: "https://umini.shujupie.com/uminiprogram_logs/comm/uif", DEVICE_INFO_KEY: "device_info", ADVERTISING_ID: "mobile_ad_id", ANDROID_ID: "android_id", CURRENT_SESSION: "current_session", SESSION_PAUSE_TIME: "session_pause_time", EVENT_SEND_DEFAULT_INTERVAL: 15e3, EVENT_LAST_SEND_TIME: "last_send_time", MAX_EVENTID_LENGTH: 128, MAX_PROPERTY_KEY_LENGTH: 256, MAX_PROPERTY_KEYS_COUNT: 100, REPORT_POLICY: "report_policy", REPORT_INTERVAL_TIME: "report_interval_time", REPORT_POLICY_START_SEND: "1", REPORT_POLICY_INTERVAL: "6", IMPRINT: "imprint", SEED_VERSION: "1.0.0", IMPL_VERSION: "2.4.6", ALIPAY_AVAILABLE_VERSION: "10.1.52", SHARE_PATH: "um_share_path", SHARES: "shares", REQUESTS: "requests", UUID: "um_uuid", UUID_SUFFIX: "ud", OPENID: "um_od", UNIONID: "um_unid", ALIPAYID: "um_alipayid", USERID: "um_userid", PROVIDER: "um_provider", SWANID: "um_swanid", ANONYMOUSID: "um_anonymousid", LAUNCH_OPTIONS: "LAUNCH_OPTIONS", UM_SSRC: "_um_ssrc", USER_INFO: "user_info", IS_ALIYUN: !1, ALIYUN_URL: "serverless.huoban.youmeng.network.forward" };var v,y,_ = { isNumber: function isNumber(e) {return !Number.isNaN(parseInt(e, 10));}, compareVersion: function compareVersion(e, t) {for (var n = String(e).split("."), i = String(t).split("."), r = 0; r < Math.max(n.length, i.length); r++) {var o = parseInt(n[r] || 0, 10),s = parseInt(i[r] || 0, 10);if (s < o) return 1;if (o < s) return -1;}return 0;}, getRandomStr: function getRandomStr(e) {for (var t = "", n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], i = 0; i < Number(e); i++) {t += n[Math.round(Math.random() * (n.length - 1))];}return t;}, clone: function clone(e) {return JSON.parse(JSON.stringify(e));}, startsWith: function startsWith(e, t) {return !(!e || !t || 0 === t.length || t.length > e.length) && e.substr(0, t.length) === t;}, endsWith: function endsWith(e, t) {return !(!t || 0 === e.length || t.length > e.length) && e.substring(e.length - t.length) === t;}, assign: function assign(e) {if (null == e) throw new TypeError("Cannot convert undefined or null to object");for (var t = Object(e), n = 1; n < arguments.length; n++) {var i = arguments[n];if (i) for (var r in i) {Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);}}return t;}, deepEqual: function e(t, n) {if (t === n) return !0;if (t && "object" == typeof t && n && "object" == typeof n) {if (Object.keys(t).length !== Object.keys(n).length) return !1;for (var i in t) {if (Object.prototype.hasOwnProperty.call(n, i)) return !1;if (!e(t[i], n[i])) return !1;}return !0;}return !1;}, trimStart: function trimStart(e, t) {if (!e) return "";if ("string" == typeof t && t.length) {var n = new RegExp("^" + t + "*");e = e.replace(n, "");} else e = e.replace(/^s*/, "");return e;}, trimEnd: function trimEnd(e, t) {if (!e) return "";var n, i;if ("string" == typeof t && t.length) {n = new RegExp(t);i = e.length;for (; n.test(e.charAt(i));) {--i;}return e.slice(0, i + 1);}n = /s/;i = e.length - 1;for (; n.test(e.charAt(i));) {--i;}return e.slice(0, i + 1);} },m = function (e) {h(t, e);function t() {return null !== e && e.apply(this, arguments) || this;}t.prototype.getOpenIdAsync = function (t, n) {var i = this;wx.login({ success: function success(e) {e.code ? l.request({ url: g.GET_OPENID_URL, method: "GET", data: { key: t, code: e.code }, success: function success(e) {if (e && 200 === e.statusCode && e.data && e.data.data) {var t = e.data.data;i.setOpenid(t.oid);i.setUnionid(t.uid);return n && n(!0);}n && n();}, fail: function fail(e) {p().v("wx request failed...", e);n && n();} }) : n && n();}, fail: function fail() {n && n();} });};return t;}(function (t) {h(e, t);function e() {var e = null !== t && t.apply(this, arguments) || this;e._openid = "";e._unionid = "";e._useOpenid = !1;return e;}e.prototype.initID = function (t) {var n = this;n._idType = n._useOpenid ? "openid" : "uuid";p().v("id type: ", n._idType);l.getStorage(g.UNIONID, function (e) {n._unionid = e;});this._useOpenid ? l.getStorage(g.OPENID, function (e) {n._openid = e;t && t();}) : t && t();};e.prototype.setUseOpenid = function (e) {this._useOpenid = e;};e.prototype.setOpenid = function (e) {if (!this._openid && e) {this._openid = e;l.setStorage(g.OPENID, e);}};e.prototype.setUnionid = function (e) {if (!this._unionid && e) {this._unionid = e;l.setStorage(g.UNIONID, e);}};e.prototype.getIdTracking = function () {var e = t.prototype.getIdTracking.call(this);this._openid && (e.openid = this._openid);this._unionid && (e.unionid = this._unionid);this._userid && (e.userid = this._userid);return e;};e.prototype.getId = function () {return this._useOpenid ? this._openid : this._uuid;};return e;}(function () {function e() {this._uuid = "";this._userid = "";this._provider = "";this._idType = "";}e.prototype.createUUID = function () {return _.getRandomStr(10) + Date.now() + _.getRandomStr(7) + g.UUID_SUFFIX;};e.prototype.initUUID = function (t) {var n = this;l.getStorage(g.UUID, function (e) {if (e) n._uuid = e;else {n._uuid = n.createUUID();l.setStorage(g.UUID, n._uuid);}t && t(e);});};e.prototype.initUserid = function () {var t = this;l.getStorage(g.USERID, function (e) {if (!t._userid && e) {t._userid = e;p().v("userId is ", e);}});l.getStorage(g.PROVIDER, function (e) {if (!t._provider && e) {t._provider = e;p().v("provider is ", e);}});};e.prototype.init = function (e) {var t = this;t.initUUID(function () {t.initUserid();t.initID(e);});};e.prototype.setUserid = function (e, t) {if (!this._userid && e) {this._userid = e;this._provider = t;l.setStorage(g.USERID, e);l.setStorage(g.PROVIDER, t);}};e.prototype.getUserId = function () {return this._userid;};e.prototype.getProvider = function () {return this._provider;};e.prototype.getIdType = function () {return this._idType;};e.prototype.getIdTracking = function () {var e = {};this._uuid && (e.uuid = this._uuid);this._userid && (e.userid = this._userid);return e;};return e;}())),S = function S() {return v = v || new m();},I = function I() {return y = y || new E();};function E() {var n = !1,i = null,r = [];this.addPageStart = function (e) {if (e && !n) {i = { ts: Date.now(), path: e, page_name: e };n = !0;}};this.addPageEnd = function (e) {if (n && e && i && e === i.page_name) {var t = Date.now() - i.ts;i.duration = Math.abs(t);r.push(i);i = null;n = !1;}};this.get = function () {return r;};this.getCurrentPage = function () {return i;};this.clear = function () {r.length = 0;};}var O = {};function A() {return function (e) {var t = [];for (var n in e) {"_um_ssrc" !== n && "_um_sts" !== n && t.push(n + "=" + e[n]);}return t.join("&");}(O);}var T,w,N,k = function k() {return T = T || new R();};function R() {return { add: function add(e, t) {p().v("share origin: %o", e);var n = { title: e && e.title, path: e && e.path && e.path.split("?")[0], _um_sts: Date.now() };n.path && 1 < n.path.length && _.startsWith(n.path, "/") && (n.path = _.trimStart(n.path, "/"));var i = e.path || "",r = S().getId();if (r) {var o = N.split(","),s = (o = o.filter(function (e) {return 0 < e.length;})).indexOf(r);0 <= s && (o = o.slice(0, s));o.length < 3 && o.push(r);var a = o.join(",");-1 !== i.indexOf("?") ? i += "&_um_ssrc=" + a : i += "?_um_ssrc=" + a;var c = Date.now();i += "&_um_sts=" + c;if (t) {var u = A(),f = u ? u + "&_um_ssrc=" + a + "&_um_sts=" + c : "_um_ssrc=" + a + "&_um_sts=" + c;e.query = e.query ? e.query + "&_um_ssrc=" + a + "&_um_sts=" + c : f;} else e.path = i;n._um_ssrc = a;n._um_sts = c;}w.push(n);p().v("share: %o", e);return e;}, setShareSource: function setShareSource(e) {N = e;}, clear: function clear() {w.length = 0;}, get: function get() {return w;} };}var U,b,L,P,D = { stringify: function stringify(e) {if (e) try {return JSON.stringify(e);} catch (e) {}return "";}, parse: function parse(e) {if (e) try {return JSON.parse(e);} catch (e) {}return null;}, parseToArray: function parseToArray(e) {if (e) try {return JSON.parse(e);} catch (e) {}return [];} },C = (P = !(w = []), function () {return U = U || new M();});function M() {this.load = function (t) {if (L) {l.removeStorage(b);t();} else {b = "um_cache_" + f().appKey();l.getStorage(b, function (e) {L = D.parse(e) || {};P = !0;l.removeStorage(b);t();});}};this.save = function () {L && l.setStorage(b, D.stringify(L));};this.set = function (e, t) {L && (L[e] = t);};this.get = function (e) {return (L || {})[e];};this.remove = function (e) {L && L[e] && delete L[e];};this.getAll = function () {return L;};this.clear = function () {L = null;};this.has = function (e) {return !!this.get(e);};this.isLoaded = function () {return P;};}var x,V,j,K,G = "ekvs",F = 1e4,q = (j = [], K = [], function () {return x = x || { addEvent: function addEvent(e) {if (V) {j.unshift(e);if (1 < j.length) {H();j.length = 0;}} else {p().w("session id is null: ", V);K.unshift(e);}}, setSessionId: function setSessionId(e) {V = e;p().v("setSessionId: ", V);if (Array.isArray(K) && K.length && V) {for (var t = 0; t < K.length; t++) {this.addEvent(K[t]);}K.length = 0;}}, getEkvs: function getEkvs() {var e = C().get(G);j && j.length && (e = Y(e, j));return e;}, clear: function clear() {C().remove(G);j.length = 0;} };});function H() {if (j.length) {var e = C().get(G);if (function (e) {var t = 0;for (var n in e) {Array.isArray(e[n]) && (t += e[n].length);}return t;}(e) + j.length <= F) {e = Y(e, j);C().set(G, e);}}}function Y(e, t) {var n = (e = e || {})[V];Array.isArray(n) && n.length ? e[V] = n.concat(t) : e[V] = [].concat(t);return e;}var W,J = "2g",B = "3g",X = "4g",z = { HALF_SESSION: "half_session", CLOSE_SESSION: "close_session", EKV: "ekv", ENTER_PAGE: "enter_page", LEAVE_PAGE: "leave_page" },Q = ["access", "access_subtype"],Z = { instance: function instance() {return W = W || $();} };function $() {var e = !1,o = {};function t(i) {var e = C().get(g.IMPRINT);e && (o.imprint = e);o.device_type = "Phone";o.sdk_version = g.IMPL_VERSION;o.appkey = f().appKey();l.getDeviceInfo(function (e) {o.device_info = e || "";});var t = l.getAppInfoSync();o.appid = t.appId;o.app_env = t.appEnv;o.app_version = t.appVersion;l.getSystemInfo(function (n) {l.getNetworkInfo(function (e) {var t = function (e, t) {var n = {},i = (t = t || {}).networkType;"none" === i && (i = "unknown");var r = e.model || "",o = e.platform || "",s = e.brand || "",a = s.toLowerCase();n.sdk_type = l.getSdkType();n.platform = l.getPlatform();n.platform_sdk_version = e.platformSDKVersion;n.platform_version = e.platformVersion;n.resolution = e.resolution;n.pixel_ratio = e.pixelRatio;n.os = o;n.font_size_setting = e.fontSizeSetting;n.device_model = r;n.device_brand = s;n.device_manufacturer = a;n.device_manuid = r;n.device_name = r;n.os_version = e.OSVersion;n.language = e.language;switch (i = i ? i.toLowerCase() : "") {case X:n.access_subtype = "LTE";n.access = "4G";break;case B:n.access_subtype = "CDMA";n.access = "3G";break;case J:n.access_subtype = "GRPS";n.access = "2G";break;default:n.access = i;delete n.access_subtype;}return n;}(n, e);_.assign(o, t);!function (e) {var t = [];if (e) {t.push({ name: "系统名", value: o.platform });t.push({ name: "支付宝版本号", value: o.platform_version });}t.push({ name: "设备型号", value: o.device_model });t.push({ name: "设备生产商", value: o.device_brand });t.push({ name: "os版本号", value: o.os_version });t.push({ name: "网络类型", value: o.access });t.push({ name: "运营商", value: o.access_subtype });t.push({ name: "分辨率", value: o.resolution });t.push({ name: "pixelRatio", value: o.pixel_ratio });for (var n = "", i = 0; i < t.length; i++) {var r = t[i];n += r.name + ": " + r.value + "; ";}p().v("调试辅助信息: ", n);}();i && i();});});}return { init: function init() {t(function () {e = !0;});}, isLoaded: function isLoaded() {return e;}, get: function get() {return o;}, getRealtimeFields: function getRealtimeFields() {var t = {};Q.forEach(function (e) {t[e] = o[e];});return t;}, setIdTracking: function setIdTracking(e) {this.setItem("id_tracking", e);}, setIdType: function setIdType(e) {this.setItem("id_type", e);}, setAppVersion: function setAppVersion(e) {this.setItem("app_version", e);}, setSuperProperty: function setSuperProperty(e) {o.sp || (o.sp = {});o.sp.isv = e;}, getSuperProperty: function getSuperProperty() {return o && o.sp ? o.sp.isv : "";}, setItem: function setItem(e, t) {o[e] = t;}, getItem: function getItem(e) {return o[e];} };}var ee,te,ne,ie = function ie() {return ee = ee || re();};function re() {return { resume: function resume(e) {var t = !1;ne = ne || C().get(g.CURRENT_SESSION);var n = new Date();te = n.getTime();if (!ne || !ne.end_time || te - ne.end_time > g.SESSION_INTERVAL) {t = !0;!function (e) {try {var t = (ne || {}).options || {},n = _.assign({}, function (e) {var t = {};for (var n in e) {0 === n.indexOf("_um_") && (t[n] = e[n]);}p().v("query: ", e);p().v("_um_params: ", t);return t;}(e.query));n.path = e.path || t.path;n.scene = e.scene ? l.getPlatform() + "_" + e.scene : t.scene;var i = e.referrerInfo;i && (n.referrerAppId = i.appId);p().v("session options: ", n);var r = n[g.UM_SSRC];r && k().setShareSource(r);var o = Date.now();ne = { id: _.getRandomStr(10) + o, start_time: o, options: n };} catch (e) {p().e("生成新session失败: ", e);}}(e);p().v("开始新的session(%s): ", ne.id, ne);} else p().v("延续上一次session(%s): %s ", ne.id, n.toLocaleTimeString(), ne);return t;}, pause: function pause() {!function () {if (ne) {var e = new Date();ne.end_time = e.getTime();"number" != typeof ne.duration && (ne.duration = 0);ne.duration = ne.end_time - te;C().set(g.CURRENT_SESSION, ne);p().v("退出会话(%s): %s ", ne.id, e.toLocaleTimeString(), ne);}}();}, getCurrentSessionId: function getCurrentSessionId() {return (ne || {}).id;}, getCurrentSession: function getCurrentSession() {return ne;}, cloneCurrentSession: function cloneCurrentSession() {return _.clone(ne);} };}function oe(e) {var t = null;switch (e) {case z.HALF_SESSION:t = function () {var e = null,t = ie().cloneCurrentSession();t && (e = { header: { st: "1" }, analytics: { sessions: [t] } });return e;}();break;case z.CLOSE_SESSION:t = function () {var e = null,t = {},n = ie().cloneCurrentSession();if (n) {var i = I().get(),r = k().get();Array.isArray(i) && i.length && (n.pages = _.clone(i));Array.isArray(r) && r.length && (n.shares = _.clone(r));I().clear();k().clear();t.sessions = [n];}var o = q().getEkvs();if (o) {t.ekvs = _.clone(o);q().clear();}(t.sessions || t.ekvs) && (e = { analytics: t });return e;}();break;case z.EKV:t = function () {var e = null,t = q().getEkvs();if (t) {e = { analytics: { ekvs: _.clone(t) } };q().clear();}return e;}();}return t;}var se = { sessions: "sn", ekvs: "e", active_user: "active_user" },ae = { sdk_type: "sdt", access: "ac", access_subtype: "acs", device_model: "dm", language: "lang", device_type: "dt", device_manufacturer: "dmf", device_name: "dn", platform_version: "pv", id_type: "it", font_size_setting: "fss", os_version: "ov", device_manuid: "did", platform_sdk_version: "psv", device_brand: "db", appkey: "ak", _id: "id", id_tracking: "itr", imprint: "imp", sdk_version: "sv", resolution: "rl", testToken: "ttn" },ce = { uuid: "ud", unionid: "und", openid: "od", anonymousid: "nd", alipay_id: "ad", device_id: "dd", userid: "puid" };function ue(e) {return { h: function (e, t) {var n = fe(e, t);e && e.id_tracking && (n[t.id_tracking || "id_tracking"] = fe(e.id_tracking, ce));return n;}(e.header, ae), a: function (e, t) {var n = {};if (e) for (var i in e) {e[i] && (n[t[i]] = e[i]);}return n;}(e.analytics, se) };}function fe(e, t) {var n = {};for (var i in e) {t[i] ? n[t[i]] = e[i] : n[i] = e[i];}return n;}var pe,le,de = "_UMTEST_",he = "TEST_TOKEN",ge = (pe = ne = te = ee = W = L = U = T = y = v = null, le = b = N = "", function () {return pe = pe || new ve();});function ve() {this.init = function (i) {l.getClipboard(function (e) {le = C().get(he);try {if (e && _.startsWith(e, de) && e.split(de)[1]) {var t = e.split(de)[1],n = JSON.parse(t).token;if (n) {le = n;C().set(he, n);}}} catch (e) {p().v(e);}i(!!le);});};this.getToken = function () {return le;};this.clear = function () {le = "";C().remove(he);};}function ye(e) {if (e.length < 2) {return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? Te(192 | t >>> 6) + Te(128 | 63 & t) : Te(224 | t >>> 12 & 15) + Te(128 | t >>> 6 & 63) + Te(128 | 63 & t);}var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);return Te(240 | t >>> 18 & 7) + Te(128 | t >>> 12 & 63) + Te(128 | t >>> 6 & 63) + Te(128 | 63 & t);}function _e(e) {var t = [0, 2, 1][e.length % 3],n = e.charCodeAt(0) << 16 | (1 < e.length ? e.charCodeAt(1) : 0) << 8 | (2 < e.length ? e.charCodeAt(2) : 0);return [Oe.charAt(n >>> 18), Oe.charAt(n >>> 12 & 63), 2 <= t ? "=" : Oe.charAt(n >>> 6 & 63), 1 <= t ? "=" : Oe.charAt(63 & n)].join("");}function me(e) {return e.replace(we, ye).replace(/[\s\S]{1,3}/g, _e);}function Se(e) {switch (e.length) {case 4:var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;return Te(55296 + (t >>> 10)) + Te(56320 + (1023 & t));case 3:return Te((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));default:return Te((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));}}function Ie(e) {var t = e.length,n = t % 4,i = (0 < t ? Ae[e.charAt(0)] << 18 : 0) | (1 < t ? Ae[e.charAt(1)] << 12 : 0) | (2 < t ? Ae[e.charAt(2)] << 6 : 0) | (3 < t ? Ae[e.charAt(3)] : 0),r = [Te(i >>> 16), Te(i >>> 8 & 255), Te(255 & i)];r.length -= [0, 0, 2, 1][n];return r.join("");}function Ee(e) {return e.replace(/[\s\S]{1,4}/g, Ie).replace(Ne, Se);}var Oe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ae = function (e) {for (var t = {}, n = 0, i = e.length; n < i; n++) {t[e.charAt(n)] = n;}return t;}(Oe),Te = String.fromCharCode,we = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,Ne = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),ke = { encode: function encode(e, t) {return t ? me(String(e)).replace(/[+\/]/g, function (e) {return "+" == e ? "-" : "_";}).replace(/=/g, "") : me(String(e));}, decode: function decode(e) {return Ee(String(e).replace(/[-_]/g, function (e) {return "-" == e ? "+" : "/";}).replace(/[^A-Za-z0-9\+\/]/g, ""));} };var Re = new function () {var t = {};this.set = function (e) {t = D.parse(ke.decode(e));};this.get = function () {return t;};this.getItem = function (e) {if (t) return t[e];};this.load = function () {t = C().get(g.IMPRINT);};this.save = function () {t && C().set(g.IMPRINT, t);};}();function Ue(n, i, r, e) {Z.instance().setIdType(S().getIdType());Z.instance().setIdTracking(S().getIdTracking());var t = S().getUserId();t && n.analytics && (n.analytics.active_user = { puid: t, provider: S().getProvider() });var o = _.clone(Z.instance().get());n.header = _.assign(o, n.header, { ts: Date.now(), testToken: ge().getToken(), traceId: _.getRandomStr(10) + Date.now() + _.getRandomStr(9) });var s,a = ue(n),c = D.stringify(a),u = { url: g.LOG_URL, method: "POST", data: ke.encode(c), success: function success(e) {var t = e.code || e.status || e.statusCode;if (200 === t || 413 === t) {p().i("数据发送成功: ", n, c);!function (e) {if (e) {Z.instance().setItem(g.IMPRINT, e);Re.set(e);Re.save();p().v("imprint: ", Re.get());Re.getItem("ttn_invalid") && ge().clear();}}((e.data || {}).imprint);"function" == typeof i && i(e);} else {p().w("数据发送失败: ", c);"function" == typeof r && r();}}, fail: function fail(e) {p().w("超时: ", c);"function" == typeof r && r();}, complete: function complete() {"function" == typeof e && e();} };l.request(_.assign(u, { header: { "Content-Type": s = l.getSdkType() + "/json", "Msg-Type": s } }));}function be(e) {var t = e,n = [];this.enqueue = function (e) {"number" == typeof t && this.size() >= t && this.dequeue();n.push(e);};this.dequeue = function () {return n.shift();};this.front = function () {return n[0];};this.isEmpty = function () {return 0 === n.length;};this.clear = function () {n.length = 0;};this.size = function () {return n.length;};this.items = function () {return n;};this.print = function () {console.log(n.toString());};}var Le,Pe,De,Ce,Me = (Le = null, Pe = !1, De = [], Ce = new be(50), function () {return Le = Le || new je();});function xe(t) {var e = Ce.front();if (e) Ue(e, function () {Ce.dequeue();xe(t);}, function () {var e = Ce.dequeue();e && !e.noCache && De.push(e);xe(t);});else {!function () {De.forEach(function (e) {Ce.enqueue(e);});De.length = 0;}();t();}}function Ve(e) {if (S().getId()) {if (Pe) p().i("队列正在发送中");else {Pe = !0;xe(function () {Pe = !1;"function" == typeof e && e();});}} else {p().i("获取id标识失败，暂缓发送");"function" == typeof e && e();}}function je() {this.send = function (e, t, n) {e ? this.add(e, t, function () {Ve(n);}) : Ve(n);};this.add = function (e, t, n) {!function e(t, n, i) {if (Z.instance().isLoaded()) {n = n || {};var r = oe(t);if (r) {var o = Z.instance().getRealtimeFields();r.header = _.assign({}, r.header, o);r.noCache = n.noCache;Ce.enqueue(r);}"function" == typeof i && i();} else setTimeout(function () {e(t, n, i);}, 100);}(e, t, n);};this.load = function () {var e = C().get(g.REQUESTS);e && e.length && e.forEach(function (e) {Ce.enqueue(e);});C().remove(g.REQUESTS);};this.save = function () {C().set(g.REQUESTS, _.clone(Ce.items()));Ce.clear();};}var Ke,Ge = (Ke = null, function () {return Ke = Ke || new Fe();});function Fe() {this.update = function () {l.getUserInfo(function (t) {if (t) {var e = C().get(g.USER_INFO);e && _.deepEqual(t, e) || function (t, n) {var e = f().appKey(),i = l.getSdkType(),r = S().getId(),o = S().getIdType();if (!(e && i && r && o)) return;var s = { ak: f().appKey(), sdt: l.getSdkType(), uin: t.nickName, uia: t.avatar, uig: t.gender, uit: t.country, uip: t.province, uic: t.city, uil: t.language, id: S().getId(), it: S().getIdType() },a = JSON.stringify(s);a = ke.encode(a);l.request({ url: g.USERINFO_URL, method: "POST", header: { "content-type": "application/x-www-form-urlencoded" }, data: "ui=" + a, success: function success(e) {p().v("用户信息上传成功: ", t);n && n(e && e.data && 200 === e.data.code);}, fail: function fail() {p().e("用户信息上传失败: ", t);n && n(!1);} });}(t, function (e) {e && C().set(g.USER_INFO, t);});}});};}function qe(e, t) {this.id = e;this.ts = Date.now();var n = typeof t;if ("string" == n && t) this[e] = t;else if ("object" == n) for (var i in t) {!{}.hasOwnProperty.call(t, i) || (this[i] = t[i]);}}function He() {var c = !1,n = !1,u = 0;this.init = function (e) {p().v("sdk version: " + g.IMPL_VERSION);c ? p().v("Lib重复实例化") : C().load(function () {p().v("cache初始化成功: ", C().getAll());!function () {S().setUseOpenid && S().setUseOpenid(f().useOpenid());S().init(function () {Z.instance().init();p().v("Header初始化成功");});}();c = !0;"function" == typeof e && e();p().tip("SDK集成成功");});};this.resume = function (e) {if (c && !n) {p().v("showOptions: ", e);var t = this;n = !0;f().enableVerify() ? ge().init(function () {t._resume(e);}) : t._resume(e);}};this._resume = function (e) {Me().load();var t = ie().resume(e),n = ie().getCurrentSessionId();q().setSessionId(n);t && Me().add(z.HALF_SESSION, {}, function () {S().setUseOpenid && S().setUseOpenid(f().useOpenid());if (f().useOpenid() && f().autoGetOpenid() && !S().getId()) {p().v("get id async");!function t(n, i) {if (S().getId() || n <= 0) return;S().getOpenIdAsync(f().appKey(), function (e) {if (e) {p().v("获取id成功");Me().send();} else {p().v("获取openid失败,启动重试,剩余可用次数", n - 1);setTimeout(function () {t(n - 1, i);}, i);}});}(10, 3e3);} else {p().v("session auto send");Me().send();}});};this.pause = function (e) {if (c) {n = !1;u = 0;ie().pause();f().uploadUserInfo() && Ge().update();Me().send(z.CLOSE_SESSION, {}, function () {Me().save();C().save();p().v("cache save success");"function" == typeof e && e();});}};this.setOpenid = function (e) {p().v("setOpenId: %s", e);S().setOpenid(e);Me().send();};this.setUnionid = function (e) {p().v("setUnionid: %s", e);S().setUnionid(e);};this.setUserid = function (e, t) {p().v("setUserid: %s", e, t);S().setUserid(e, t);};this.setAnonymousid = function (e) {p().v("setAnonymousId: %s", e);S().setAnonymousid(e);Me().send();};this.setAppVersion = function (e) {e && "string" != typeof e ? p().w("setAppVersion方法只接受字符串类型参数") : Z.instance().setAppVersion(e);};this.setAlipayUserid = function (e) {if (e && "string" != typeof e) p().w("setAlipayUserid方法只接受字符串类型参数");else {p().v("setAlipayUserid: %s", e);S().setAlipayUserid(e);}};this.setSuperProperty = function (e) {if (e && "string" != typeof e) p().w("超级属性只支持字符串类型");else {var t = this;if (Z.instance().getSuperProperty() !== e) {Z.instance().setSuperProperty(e);t.pause(function () {t.resume();});}}};this.trackEvent = function (e, t) {if (c) {p().v("event: ", e, t);if (function (e, t) {if (e && "string" == typeof e) {var n = ["id", "ts", "du"],i = {};n.forEach(function (e) {i[e] = 1;});if (i[e]) p().e("eventId不能与以下保留字冲突: " + n.join(","));else if (e.length > g.MAX_EVENTID_LENGTH) p().e("The maximum length of event id shall not exceed " + g.MAX_EVENTID_LENGTH);else {if (!t || "object" == typeof t && !Array.isArray(t) || "string" == typeof t) {if ("object" == typeof t) {var r = 0;for (var o in t) {if ({}.hasOwnProperty.call(t, o)) {if (o.length > g.MAX_PROPERTY_KEY_LENGTH) {p().e("The maximum length of property key shall not exceed " + g.MAX_PROPERTY_KEY_LENGTH);return;}if (r >= g.MAX_PROPERTY_KEYS_COUNT) {p().e("The maximum count of properties shall not exceed " + g.MAX_PROPERTY_KEYS_COUNT);return;}if (i[o]) {p().e("属性中的key不能与以下保留字冲突: " + n.join(","));return;}r += 1;}}}return 1;}p().e("please check trackEvent properties. properties should be string or object(not include Array)");}} else p().e('please check trackEvent id. id should be "string" and not null');}(e, t)) {var n = new qe(e, t);q().addEvent(n);var i = !!ge().getToken(),r = i ? 0 : g.EVENT_SEND_DEFAULT_INTERVAL,o = Date.now();if (s = o, a = r, "number" != typeof u || "number" != typeof a || u <= 0 || a < s - u) {u = o;Me().send(z.EKV, { noCache: i }, function () {});}}var s, a;}};this.trackShare = function (e) {if (c) {try {if (-1 < l.getSdkType().indexOf("game")) {e = k().add(e, !0);p().v("shareQuery: ", e);} else {e = k().add(e, !1);p().v("sharePath: ", e.path);}} catch (e) {p().v("shareAppMessage: ", e);}return e;}};this.trackPageStart = function (e) {c && I().addPageStart(e);};this.trackPageEnd = function (e) {c && I().addPageEnd(e);};this.onShareAppMessage = function (e) {var t = this;l.onShareAppMessage(function () {return t.trackShare(e());});};this.shareAppMessage = function (e) {this.trackShare(e);l.shareAppMessage(e);};}var Ye = [];function We() {}We.prototype = { createMethod: function createMethod(e, t, n) {try {e[t] = n && n[t] ? function () {return n[t].apply(n, arguments);} : function () {Ye.push([t, [].slice.call(arguments)]);};} catch (e) {p().v("create method errror: ", e);}}, installApi: function installApi(e, t) {try {for (var n = "resume,pause,trackEvent,trackPageStart,trackPageEnd,trackShare,setUserid,setOpenid,setUnionid,setSuperProperty".split(","), i = 0, r = n.length; i < r; i++) {this.createMethod(e, n[i], t);}if (t) for (i = 0, r = Ye.length; i < r; i++) {var o = Ye[i];try {t[o[0]].apply(t, o[1]);} catch (e) {p().v("impl[v[0]].apply error: ", o[0], e);}}} catch (e) {p().v("install api errror: ", e);}} };var Je = ["https://umini.shujupie.com", "https://ulogs.umeng.com"],Be = 0;function Xe(t, e) {if (t >= Je.length || e) {e && function () {var e = "https://umini.shujupie.com";g.LOG_URL = g.LOG_URL.replace(e, Je[Be]);g.GET_OPENID_URL = g.GET_OPENID_URL.replace(e, Je[Be]);g.USERINFO_URL = g.USERINFO_URL.replace(e, Je[Be]);}();e && p().v("命中可用服务", Je[Be]);e || p().tip_w("未命中可用服务");} else l.request({ url: Je[t] + "/uminiprogram_logs/ckdh", success: function success(e) {200 === (e.code || e.status || e.statusCode) && e.data && 200 === e.data.code ? Xe((Be = t) + 1, !0) : Xe(t + 1, !1);}, fail: function fail() {Xe(t + 1, !1);} });}({ init: function init(e) {setTimeout(function () {Xe(0, !1);}, e);} }).init(3e3);var ze = new We(),Qe = { _inited: !1, init: function init(e) {if (this._inited) p().v("已经实例过，请避免重复初始化");else if (e) {if (e.appKey) {"boolean" != typeof e.useOpenid && (e.useOpenid = !0);f().set(e);p().setDebug(e.debug);this._inited = !0;var t = this;a.emit(c, e);try {var n = new He();p().v("成功创建Lib对象");n.init(function () {p().v("Lib对象初始化成功");ze.installApi(t, n);p().v("安装Lib接口成功");a.emit(u, e);});} catch (e) {p().w("创建Lib对象异常: " + e);}} else p().err("请确保传入正确的appkey");} else p().err("请正确设置相关信息！");} };try {ze.installApi(Qe, null);} catch (e) {p().w("uma赋值异常: ", e);}var Ze = { FETCH_URL: "https://ucc.umeng.com/v1/mini/fetch", ABLOG_URL: "https://pslog.umeng.com/mini_ablog", SDK_VERSION: "2.4.6", MOBILE_NETWORK_NONE: "none", MOBILE_NETWORK_2G: "2g", MOBILE_NETWORK_3G: "3g", MOBILE_NETWORK_4G: "4g", MOBILE_NETWORK_5G: "5g", MOBILE_NETWORK_WIFI: "wifi", IMPRINT: "imprint" },$e = {},et = Array.isArray;$e.isArray = et || function (e) {return "[object Array]" === toString.call(e);};$e.isObject = function (e) {return e === Object(e) && !$e.isArray(e);};$e.isEmptyObject = function (e) {if ($e.isObject(e)) {for (var t in e) {if (hasOwnProperty.call(e, t)) return !1;}return !0;}return !1;};$e.isUndefined = function (e) {return void 0 === e;};$e.isString = function (e) {return "[object String]" === toString.call(e);};$e.isDate = function (e) {return "[object Date]" === toString.call(e);};$e.isNumber = function (e) {return "[object Number]" === toString.call(e);};$e.each = function (e, t, n) {if (null != e) {var i = {},r = Array.prototype.forEach;if (r && e.forEach === r) e.forEach(t, n);else if (e.length === +e.length) {for (var o = 0, s = e.length; o < s; o++) {if (o in e && t.call(n, e[o], o, e) === i) return;}} else for (var a in e) {if (hasOwnProperty.call(e, a) && t.call(n, e[a], a, e) === i) return;}}};$e.buildQuery = function (e, t) {var n,i,r = [];void 0 === t && (t = "&");$e.each(e, function (e, t) {n = encodeURIComponent(e.toString());i = encodeURIComponent(t);r[r.length] = i + "=" + n;});return r.join(t);};$e.JSONDecode = function (e) {if (e) {try {return JSON.parse(e);} catch (e) {console.error("JSONDecode error", e);}return null;}};$e.JSONEncode = function (e) {try {return JSON.stringify(e);} catch (e) {console.error("JSONEncode error", e);}};var tt = Object.create(null);function nt(i) {p().v("开始构建 fetch body");l.getSystemInfo(function (n) {l.getNetworkInfo(function (e) {var t = (t = (e = e || {}).networkType) === Ze.MOBILE_NETWORK_NONE ? "unknown" : t.toUpperCase();tt.access = t;!function (e, t) {var n = e.brand || "";tt.deviceType = "Phone";tt.sdkVersion = Ze.SDK_VERSION;tt.appkey = f().appKey();tt.sdkType = l.getSdkType();tt.umid = S().getId();if (e) {tt.language = e.language || "";tt.os = e.OS;tt.osVersion = e.OSVersion;tt.deviceName = e.deviceName;tt.platformVersion = e.platformVersion;tt.platformSdkVersion = e.platformSDKVersion;tt.deviceBrand = n;var i = e.resolution.split("*");if ($e.isArray(i)) {tt.resolutionHeight = Number(i[0]);tt.resolutionWidth = Number(i[1]);}}!function (e) {if (e) {tt.installTime = e.install_datetime && Date.parse(e.install_datetime);tt.scene = e.install_scene;tt.channel = e.install_channel;tt.campaign = e.install_campaign;}}(Re.get());t && t(tt);}(n, i);});});}var it = Object.create(null),rt = null,ot = !1,st = { minFetchIntervalSeconds: 43200 };function at(e) {e && $e.each(e, function (e) {it[e.k] = e;});}function ct() {var t = this;this.STORAGE_NAME = null;a.on(c, function (e) {p().v("云配初始化开始...");t.init(e);});}ct.prototype = { setDefaultValues: function setDefaultValues(e) {ot && $e.isObject(e) && $e.each(e, function (e, t) {it[t] && it[t].v || (it[t] = { v: e });});}, getValue: function getValue(t) {p().v("从配置项中读取 value, 当前配置为: ", it);p().v("待读取的 key : ", t);try {if (!ot) return;var e = it[t] || {};p().v("读取相应配置ing..., 结果为: ", e);if ($e.isNumber(e.e) && $e.isNumber(e.g)) {p().v("读取到相应配置, 开始数据上报...");!function (e) {var t = { appkey: f().appKey(), sdkType: l.getSdkType(), expId: e && e.e, groupId: e && e.g, clientTs: Date.now(), key: e && e.k, value: e && e.v, umid: S().getId() };try {l.request({ url: Ze.ABLOG_URL, method: "POST", data: [t], success: function success(e) {e && 200 === e.statusCode ? p().v("上传数据成功", t) : p().w("ablog 请求成功, 返回结果异常 ", e);}, fail: function fail(e) {p().w("ablog 请求数据错误 ", t, e);} });} catch (e) {p().w("urequest 调用错误", e);}}(e);}return e.v;} catch (e) {p().w("getValue error, key: ", t);}}, active: function active(e) {try {if (!ot) return;var t, n;e && e.params && (t = e.params);e && e.callback && (n = e.callback);p().v("激活配置项: ", t);if (t) {p().v("本地已缓存的配置项: ", it);at(t);p().v("合并后的配置项: ", it);n && n(it);p().v("active 结束");} else {p().v("配置项为空!! 读取本地配置...");l.getStorage(this.STORAGE_NAME, function (e) {if (e) {at((e = $e.JSONDecode(e) || {}).params);p().v("当前本地配置项为: ", it);n && n(it);p().v("active 结束");} else p().v("当前本地配置项为空, 退出激活");});}} catch (e) {p().w("SDK active 错误", e);}}, init: function init(e) {if (e.appKey) {rt = e.appKey;this.STORAGE_NAME = "um_remote_config_{{" + rt + "}}";}if (rt) {if (ot) p().w("SDK 已经初始化, 请避免重复初始化");else {ot = !0;this.setOptions(e);this.active();}} else p().err("请检查您的小程序 appKey, appKey 不能为空");}, setOptions: function setOptions(e) {if ($e.isObject(e)) {var t = e.minFetchIntervalSeconds;$e.isNumber(t) && (st.minFetchIntervalSeconds = Math.max(t, 5));}}, fetch: function fetch(e) {if (ot && this.STORAGE_NAME) {var i, r;e && e.active && (i = e.active);e && e.callback && (r = e.callback);var o = this;l.getStorage(this.STORAGE_NAME, function (e) {p().v("开始读缓存 data is ", e);if ((e = $e.JSONDecode(e) || {}).params && e.ts && Date.now() - e.ts < 1e3 * st.minFetchIntervalSeconds) {p().v("缓存数据存在, 并且本次触发时间距离上次fetch触发时间未超过 fetch 时间间隔, 无需 fetch");r && r(e.params);} else nt(function (t) {p().v("缓存数据不存在, 构建 fetch body :", t);try {l.request({ url: Ze.FETCH_URL, method: "POST", data: t, success: function success(e) {if (e && 200 === e.statusCode && e.data && e.data.cc) {p().v("fetch 请求成功, 响应数据: ", e.data);var t = Object.create(null);$e.each(e.data.cc, function (e) {t[e.k] = e;});var n = { ts: Date.now(), params: t };p().v("开始缓存 fetch 请求的云配置结果...");l.setStorage(o.STORAGE_NAME, $e.JSONEncode(n), function (e) {p().v("缓存云配置成功, 缓存数据为: ", n);p().v("缓存云配置成功, 成功消息为: ", e);p().v("云配拉取数据是否自动激活: ", i);if (e && i) {p().v("激活云配置...");o.active({ params: t, callback: r });}});} else {p().w("fetch 请求成功,返回结果异常 ", e.data);r && r();}}, fail: function fail(e) {p().w("fetch请求数据错误 ", t, e);r && r();} });} catch (e) {p().w("urequest调用错误", e);}});});}} };var ut = "",ft = {};function pt(e) {e && (ut = e);}function lt() {return function (e, t) {if (!e) return "";var n = [];for (var i in t) {"_um_ssrc" !== i && "_um_sts" !== i && n.push(i + "=" + t[i]);}var r = n.join("&");return r ? e + "?" + r : e;}(ut, ft[ut]);}function dt(e, i) {if (e.onShareAppMessage) {var r = e.onShareAppMessage;e.onShareAppMessage = function (e) {var t = r.call(this, e) || {},n = lt();!t.path && n && (t.path = n);return i.trackShare.call(this, t);};}}function ht(e, t, n) {var i = e[t];e[t] = function (e) {n.call(this, e);i && i.call(this, e);};}function gt(e) {try {Qe.resume(e, !0);} catch (e) {p().v("onAppShow: ", e);}}function vt() {try {Qe.pause();} catch (e) {p().v("onAppHide: ", e);}}function yt() {try {pt(this.route);Qe.trackPageStart(this.route);} catch (e) {p().v("onPageShow: ", e);}}function _t(e) {try {pt(this.route);e && (t = this.route, n = e, t && (ft[t] = n));p().v("Page onLoad: ", this.route, e);} catch (e) {p().v("onPageLoad: ", e);}var t, n;}function mt() {try {Qe.trackPageEnd(this.route);} catch (e) {p().v("onPageHide: ", e);}}try {var St = App;App = function App(e) {ht(e, "onLaunch", function () {!function (e) {try {Qe.init(e);} catch (e) {p().v("onAppLaunch: ", e);}}(e.umengConfig);});ht(e, "onShow", gt);ht(e, "onHide", vt);St(e);};} catch (e) {p().w("App重写异常");}try {var It = Page;Page = function Page(e) {ht(e, "onShow", yt);ht(e, "onHide", mt);ht(e, "onUnload", mt);ht(e, "onLoad", _t);dt(e, Qe);It(e);};} catch (e) {p().w("Page重写异常");}try {var Et = Component;Component = function Component(t) {try {t.methods = t.methods || {};var e = t.methods;ht(e, "onShow", yt);ht(e, "onHide", mt);ht(e, "onUnload", mt);ht(e, "onLoad", _t);dt(e, Qe);Et(t);} catch (e) {Et(t);}};} catch (e) {p().w("Component重写异常");}var Ot = Qe.init;Qe.init = function (e) {if (e && e.useOpenid) {p().tip_w("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");p().tip_w("您选择了使用openid进行统计，请确保使用setOpenid回传openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取");p().tip_w("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");}Ot.call(Qe, e);};var At = new ct();!function (e, t, n) {if ("object" == typeof e) {if ("string" == typeof t && t.length) e[t] = n;else for (var i in n) {if ({}.hasOwnProperty.call(n, i)) {if (e[i]) {p().v("方法已定义，无法注入此插件方法: ", i);return;}n[i] && (e[i] = function () {n[i](arguments);});}}} else p().v("插件安装失败，宿主对象不能为空");}(Qe, "rc", At);wx.uma = Qe;module.exports = Qe;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map