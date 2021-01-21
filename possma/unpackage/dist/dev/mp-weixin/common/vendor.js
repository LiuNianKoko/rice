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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 10:
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

/***/ 11:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/projects/firstProject_kaka/project/common/common.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var imageSrc = "../../static/image/";

var userToken = function userToken() {
  var info = "";
  // uni.getStorage({ key: keys,
  // 	success: function (res) {
  // 		info = res.data
  // 	}
  // });
  // console.log( info , "===========js" );
  // return info
  try {
    var value = uni.getStorageSync("token");
    if (value) {
      info = value;
    }
  } catch (e) {}
  return info;
};

var request = function request(urls, data) {
  var httpDefaultOpts = {
    url: "http://movecar.sayyin.com/api/" + urls,
    data: data,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' },

    dataType: 'json' };

  var promise = new Promise(function (reslove, reject) {
    uni.request(httpDefaultOpts).then(function (res) {
      var data = res[1];
      if (data.data.code == 200) {
        reslove(data);
      } else if (data.data.code == 1004) {
        uni.showToast({ icon: "none", title: data.data.mess });
        console.log(urls, data, "==================>");
        uni.navigateTo({
          url: "/pages/login/login" });

      } else if (data.data.code == 1006) {
        uni.showToast({ icon: "none", title: data.data.mess });
        uni.navigateTo({
          url: "/pages/login/login" });

      } else {
        // uni.showToast({icon:"none",title:data.data.mess})
        reslove(data);
      }
    });
  });
  return promise;
};var _default =
{ request: request, imageSrc: imageSrc, userToken: userToken };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 184:
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/projects/firstProject_kaka/project/common/city.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var addr = { "data": [{ "label": "11", "value": "北京市", "children": [{ "label": "1101", "value": "市辖区", "children": [{ "label": "110101", "value": "东城区" }, { "label": "110102", "value": "西城区" }, { "label": "110105", "value": "朝阳区" }, { "label": "110106", "value": "丰台区" }, { "label": "110107", "value": "石景山区" }, { "label": "110108", "value": "海淀区" }, { "label": "110109", "value": "门头沟区" }, { "label": "110111", "value": "房山区" }, { "label": "110112", "value": "通州区" }, { "label": "110113", "value": "顺义区" }, { "label": "110114", "value": "昌平区" }, { "label": "110115", "value": "大兴区" }, { "label": "110116", "value": "怀柔区" }, { "label": "110117", "value": "平谷区" }, { "label": "110118", "value": "密云区" }, { "label": "110119", "value": "延庆区" }] }] }, { "label": "12", "value": "天津市", "children": [{ "label": "1201", "value": "市辖区", "children": [{ "label": "120101", "value": "和平区" }, { "label": "120102", "value": "河东区" }, { "label": "120103", "value": "河西区" }, { "label": "120104", "value": "南开区" }, { "label": "120105", "value": "河北区" }, { "label": "120106", "value": "红桥区" }, { "label": "120110", "value": "东丽区" }, { "label": "120111", "value": "西青区" }, { "label": "120112", "value": "津南区" }, { "label": "120113", "value": "北辰区" }, { "label": "120114", "value": "武清区" }, { "label": "120115", "value": "宝坻区" }, { "label": "120116", "value": "滨海新区" }, { "label": "120117", "value": "宁河区" }, { "label": "120118", "value": "静海区" }, { "label": "120119", "value": "蓟州区" }] }] }, { "label": "13", "value": "河北省", "children": [{ "label": "1301", "value": "石家庄市", "children": [{ "label": "130102", "value": "长安区" }, { "label": "130104", "value": "桥西区" }, { "label": "130105", "value": "新华区" }, { "label": "130107", "value": "井陉矿区" }, { "label": "130108", "value": "裕华区" }, { "label": "130109", "value": "藁城区" }, { "label": "130110", "value": "鹿泉区" }, { "label": "130111", "value": "栾城区" }, { "label": "130121", "value": "井陉县" }, { "label": "130123", "value": "正定县" }, { "label": "130125", "value": "行唐县" }, { "label": "130126", "value": "灵寿县" }, { "label": "130127", "value": "高邑县" }, { "label": "130128", "value": "深泽县" }, { "label": "130129", "value": "赞皇县" }, { "label": "130130", "value": "无极县" }, { "label": "130131", "value": "平山县" }, { "label": "130132", "value": "元氏县" }, { "label": "130133", "value": "赵县" }, { "label": "130183", "value": "晋州市" }, { "label": "130184", "value": "新乐市" }, { "label": "130181", "value": "辛集市" }] }, { "label": "1302", "value": "唐山市", "children": [{ "label": "130202", "value": "路南区" }, { "label": "130203", "value": "路北区" }, { "label": "130204", "value": "古冶区" }, { "label": "130205", "value": "开平区" }, { "label": "130207", "value": "丰南区" }, { "label": "130208", "value": "丰润区" }, { "label": "130209", "value": "曹妃甸区" }, { "label": "130223", "value": "滦县" }, { "label": "130224", "value": "滦南县" }, { "label": "130225", "value": "乐亭县" }, { "label": "130227", "value": "迁西县" }, { "label": "130229", "value": "玉田县" }, { "label": "130281", "value": "遵化市" }, { "label": "130283", "value": "迁安市" }] }, { "label": "1303", "value": "秦皇岛市", "children": [{ "label": "130302", "value": "海港区" }, { "label": "130303", "value": "山海关区" }, { "label": "130304", "value": "北戴河区" }, { "label": "130306", "value": "抚宁区" }, { "label": "130321", "value": "青龙满族自治县" }, { "label": "130322", "value": "昌黎县" }, { "label": "130324", "value": "卢龙县" }] }, { "label": "1304", "value": "邯郸市", "children": [{ "label": "130402", "value": "邯山区" }, { "label": "130403", "value": "丛台区" }, { "label": "130404", "value": "复兴区" }, { "label": "130406", "value": "峰峰矿区" }, { "label": "130421", "value": "邯郸县" }, { "label": "130423", "value": "临漳县" }, { "label": "130424", "value": "成安县" }, { "label": "130425", "value": "大名县" }, { "label": "130426", "value": "涉县" }, { "label": "130427", "value": "磁县" }, { "label": "130428", "value": "肥乡县" }, { "label": "130429", "value": "永年县" }, { "label": "130430", "value": "邱县" }, { "label": "130431", "value": "鸡泽县" }, { "label": "130432", "value": "广平县" }, { "label": "130433", "value": "馆陶县" }, { "label": "130434", "value": "魏县" }, { "label": "130435", "value": "曲周县" }, { "label": "130481", "value": "武安市" }] }, { "label": "1305", "value": "邢台市", "children": [{ "label": "130502", "value": "桥东区" }, { "label": "130503", "value": "桥西区" }, { "label": "130521", "value": "邢台县" }, { "label": "130522", "value": "临城县" }, { "label": "130523", "value": "内丘县" }, { "label": "130524", "value": "柏乡县" }, { "label": "130525", "value": "隆尧县" }, { "label": "130526", "value": "任县" }, { "label": "130527", "value": "南和县" }, { "label": "130528", "value": "宁晋县" }, { "label": "130529", "value": "巨鹿县" }, { "label": "130530", "value": "新河县" }, { "label": "130531", "value": "广宗县" }, { "label": "130532", "value": "平乡县" }, { "label": "130533", "value": "威县" }, { "label": "130534", "value": "清河县" }, { "label": "130535", "value": "临西县" }, { "label": "130581", "value": "南宫市" }, { "label": "130582", "value": "沙河市" }] }, { "label": "1306", "value": "保定市", "children": [{ "label": "130602", "value": "竞秀区" }, { "label": "130606", "value": "莲池区" }, { "label": "130607", "value": "满城区" }, { "label": "130608", "value": "清苑区" }, { "label": "130609", "value": "徐水区" }, { "label": "130623", "value": "涞水县" }, { "label": "130624", "value": "阜平县" }, { "label": "130626", "value": "定兴县" }, { "label": "130627", "value": "唐县" }, { "label": "130628", "value": "高阳县" }, { "label": "130629", "value": "容城县" }, { "label": "130630", "value": "涞源县" }, { "label": "130631", "value": "望都县" }, { "label": "130632", "value": "安新县" }, { "label": "130633", "value": "易县" }, { "label": "130634", "value": "曲阳县" }, { "label": "130635", "value": "蠡县" }, { "label": "130636", "value": "顺平县" }, { "label": "130637", "value": "博野县" }, { "label": "130638", "value": "雄县" }, { "label": "130681", "value": "涿州市" }, { "label": "130683", "value": "安国市" }, { "label": "130684", "value": "高碑店市" }] }, { "label": "1307", "value": "张家口市", "children": [{ "label": "130702", "value": "桥东区" }, { "label": "130703", "value": "桥西区" }, { "label": "130705", "value": "宣化区" }, { "label": "130706", "value": "下花园区" }, { "label": "130708", "value": "万全区" }, { "label": "130709", "value": "崇礼区" }, { "label": "130722", "value": "张北县" }, { "label": "130723", "value": "康保县" }, { "label": "130724", "value": "沽源县" }, { "label": "130725", "value": "尚义县" }, { "label": "130726", "value": "蔚县" }, { "label": "130727", "value": "阳原县" }, { "label": "130728", "value": "怀安县" }, { "label": "130730", "value": "怀来县" }, { "label": "130731", "value": "涿鹿县" }, { "label": "130732", "value": "赤城县" }] }, { "label": "1308", "value": "承德市", "children": [{ "label": "130802", "value": "双桥区" }, { "label": "130803", "value": "双滦区" }, { "label": "130804", "value": "鹰手营子矿区" }, { "label": "130821", "value": "承德县" }, { "label": "130822", "value": "兴隆县" }, { "label": "130823", "value": "平泉县" }, { "label": "130824", "value": "滦平县" }, { "label": "130825", "value": "隆化县" }, { "label": "130826", "value": "丰宁满族自治县" }, { "label": "130827", "value": "宽城满族自治县" }, { "label": "130828", "value": "围场满族蒙古族自治县" }] }, { "label": "1309", "value": "沧州市", "children": [{ "label": "130902", "value": "新华区" }, { "label": "130903", "value": "运河区" }, { "label": "130921", "value": "沧县" }, { "label": "130922", "value": "青县" }, { "label": "130923", "value": "东光县" }, { "label": "130924", "value": "海兴县" }, { "label": "130925", "value": "盐山县" }, { "label": "130926", "value": "肃宁县" }, { "label": "130927", "value": "南皮县" }, { "label": "130928", "value": "吴桥县" }, { "label": "130929", "value": "献县" }, { "label": "130930", "value": "孟村回族自治县" }, { "label": "130981", "value": "泊头市" }, { "label": "130982", "value": "任丘市" }, { "label": "130983", "value": "黄骅市" }, { "label": "130984", "value": "河间市" }] }, { "label": "1310", "value": "廊坊市", "children": [{ "label": "131002", "value": "安次区" }, { "label": "131003", "value": "广阳区" }, { "label": "131022", "value": "固安县" }, { "label": "131023", "value": "永清县" }, { "label": "131024", "value": "香河县" }, { "label": "131025", "value": "大城县" }, { "label": "131026", "value": "文安县" }, { "label": "131028", "value": "大厂回族自治县" }, { "label": "131081", "value": "霸州市" }, { "label": "131082", "value": "三河市" }] }, { "label": "1311", "value": "衡水市", "children": [{ "label": "131102", "value": "桃城区" }, { "label": "131103", "value": "冀州区" }, { "label": "131121", "value": "枣强县" }, { "label": "131122", "value": "武邑县" }, { "label": "131123", "value": "武强县" }, { "label": "131124", "value": "饶阳县" }, { "label": "131125", "value": "安平县" }, { "label": "131126", "value": "故城县" }, { "label": "131127", "value": "景县" }, { "label": "131128", "value": "阜城县" }, { "label": "131182", "value": "深州市" }] }, { "label": "1390", "value": "省直辖县级", "children": [{ "label": "139001", "value": "定州市" }] }] }, { "label": "14", "value": "山西省", "children": [{ "label": "1401", "value": "太原市", "children": [{ "label": "140105", "value": "小店区" }, { "label": "140106", "value": "迎泽区" }, { "label": "140107", "value": "杏花岭区" }, { "label": "140108", "value": "尖草坪区" }, { "label": "140109", "value": "万柏林区" }, { "label": "140110", "value": "晋源区" }, { "label": "140121", "value": "清徐县" }, { "label": "140122", "value": "阳曲县" }, { "label": "140123", "value": "娄烦县" }, { "label": "140181", "value": "古交市" }] }, { "label": "1402", "value": "大同市", "children": [{ "label": "140202", "value": "城区" }, { "label": "140203", "value": "矿区" }, { "label": "140211", "value": "南郊区" }, { "label": "140212", "value": "新荣区" }, { "label": "140221", "value": "阳高县" }, { "label": "140222", "value": "天镇县" }, { "label": "140223", "value": "广灵县" }, { "label": "140224", "value": "灵丘县" }, { "label": "140225", "value": "浑源县" }, { "label": "140226", "value": "左云县" }, { "label": "140227", "value": "大同县" }] }, { "label": "1403", "value": "阳泉市", "children": [{ "label": "140302", "value": "城区" }, { "label": "140303", "value": "矿区" }, { "label": "140311", "value": "郊区" }, { "label": "140321", "value": "平定县" }, { "label": "140322", "value": "盂县" }] }, { "label": "1404", "value": "长治市", "children": [{ "label": "140402", "value": "城区" }, { "label": "140411", "value": "郊区" }, { "label": "140421", "value": "长治县" }, { "label": "140423", "value": "襄垣县" }, { "label": "140424", "value": "屯留县" }, { "label": "140425", "value": "平顺县" }, { "label": "140426", "value": "黎城县" }, { "label": "140427", "value": "壶关县" }, { "label": "140428", "value": "长子县" }, { "label": "140429", "value": "武乡县" }, { "label": "140430", "value": "沁县" }, { "label": "140431", "value": "沁源县" }, { "label": "140481", "value": "潞城市" }] }, { "label": "1405", "value": "晋城市", "children": [{ "label": "140502", "value": "城区" }, { "label": "140521", "value": "沁水县" }, { "label": "140522", "value": "阳城县" }, { "label": "140524", "value": "陵川县" }, { "label": "140525", "value": "泽州县" }, { "label": "140581", "value": "高平市" }] }, { "label": "1406", "value": "朔州市", "children": [{ "label": "140602", "value": "朔城区" }, { "label": "140603", "value": "平鲁区" }, { "label": "140621", "value": "山阴县" }, { "label": "140622", "value": "应县" }, { "label": "140623", "value": "右玉县" }, { "label": "140624", "value": "怀仁县" }] }, { "label": "1407", "value": "晋中市", "children": [{ "label": "140702", "value": "榆次区" }, { "label": "140721", "value": "榆社县" }, { "label": "140722", "value": "左权县" }, { "label": "140723", "value": "和顺县" }, { "label": "140724", "value": "昔阳县" }, { "label": "140725", "value": "寿阳县" }, { "label": "140726", "value": "太谷县" }, { "label": "140727", "value": "祁县" }, { "label": "140728", "value": "平遥县" }, { "label": "140729", "value": "灵石县" }, { "label": "140781", "value": "介休市" }] }, { "label": "1408", "value": "运城市", "children": [{ "label": "140802", "value": "盐湖区" }, { "label": "140821", "value": "临猗县" }, { "label": "140822", "value": "万荣县" }, { "label": "140823", "value": "闻喜县" }, { "label": "140824", "value": "稷山县" }, { "label": "140825", "value": "新绛县" }, { "label": "140826", "value": "绛县" }, { "label": "140827", "value": "垣曲县" }, { "label": "140828", "value": "夏县" }, { "label": "140829", "value": "平陆县" }, { "label": "140830", "value": "芮城县" }, { "label": "140881", "value": "永济市" }, { "label": "140882", "value": "河津市" }] }, { "label": "1409", "value": "忻州市", "children": [{ "label": "140902", "value": "忻府区" }, { "label": "140921", "value": "定襄县" }, { "label": "140922", "value": "五台县" }, { "label": "140923", "value": "代县" }, { "label": "140924", "value": "繁峙县" }, { "label": "140925", "value": "宁武县" }, { "label": "140926", "value": "静乐县" }, { "label": "140927", "value": "神池县" }, { "label": "140928", "value": "五寨县" }, { "label": "140929", "value": "岢岚县" }, { "label": "140930", "value": "河曲县" }, { "label": "140931", "value": "保德县" }, { "label": "140932", "value": "偏关县" }, { "label": "140981", "value": "原平市" }] }, { "label": "1410", "value": "临汾市", "children": [{ "label": "141002", "value": "尧都区" }, { "label": "141021", "value": "曲沃县" }, { "label": "141022", "value": "翼城县" }, { "label": "141023", "value": "襄汾县" }, { "label": "141024", "value": "洪洞县" }, { "label": "141025", "value": "古县" }, { "label": "141026", "value": "安泽县" }, { "label": "141027", "value": "浮山县" }, { "label": "141028", "value": "吉县" }, { "label": "141029", "value": "乡宁县" }, { "label": "141030", "value": "大宁县" }, { "label": "141031", "value": "隰县" }, { "label": "141032", "value": "永和县" }, { "label": "141033", "value": "蒲县" }, { "label": "141034", "value": "汾西县" }, { "label": "141081", "value": "侯马市" }, { "label": "141082", "value": "霍州市" }] }, { "label": "1411", "value": "吕梁市", "children": [{ "label": "141102", "value": "离石区" }, { "label": "141121", "value": "文水县" }, { "label": "141122", "value": "交城县" }, { "label": "141123", "value": "兴县" }, { "label": "141124", "value": "临县" }, { "label": "141125", "value": "柳林县" }, { "label": "141126", "value": "石楼县" }, { "label": "141127", "value": "岚县" }, { "label": "141128", "value": "方山县" }, { "label": "141129", "value": "中阳县" }, { "label": "141130", "value": "交口县" }, { "label": "141181", "value": "孝义市" }, { "label": "141182", "value": "汾阳市" }] }] }, { "label": "15", "value": "内蒙古", "children": [{ "label": "1501", "value": "呼和浩特市", "children": [{ "label": "150102", "value": "新城区" }, { "label": "150103", "value": "回民区" }, { "label": "150104", "value": "玉泉区" }, { "label": "150105", "value": "赛罕区" }, { "label": "150121", "value": "土默特左旗" }, { "label": "150122", "value": "托克托县" }, { "label": "150123", "value": "和林格尔县" }, { "label": "150124", "value": "清水河县" }, { "label": "150125", "value": "武川县" }] }, { "label": "1502", "value": "包头市", "children": [{ "label": "150202", "value": "东河区" }, { "label": "150203", "value": "昆都仑区" }, { "label": "150204", "value": "青山区" }, { "label": "150205", "value": "石拐区" }, { "label": "150206", "value": "白云鄂博矿区" }, { "label": "150207", "value": "九原区" }, { "label": "150221", "value": "土默特右旗" }, { "label": "150222", "value": "固阳县" }, { "label": "150223", "value": "达尔罕茂明安联合旗" }] }, { "label": "1503", "value": "乌海市", "children": [{ "label": "150302", "value": "海勃湾区" }, { "label": "150303", "value": "海南区" }, { "label": "150304", "value": "乌达区" }] }, { "label": "1504", "value": "赤峰市", "children": [{ "label": "150402", "value": "红山区" }, { "label": "150403", "value": "元宝山区" }, { "label": "150404", "value": "松山区" }, { "label": "150421", "value": "阿鲁科尔沁旗" }, { "label": "150422", "value": "巴林左旗" }, { "label": "150423", "value": "巴林右旗" }, { "label": "150424", "value": "林西县" }, { "label": "150425", "value": "克什克腾旗" }, { "label": "150426", "value": "翁牛特旗" }, { "label": "150428", "value": "喀喇沁旗" }, { "label": "150429", "value": "宁城县" }, { "label": "150430", "value": "敖汉旗" }] }, { "label": "1505", "value": "通辽市", "children": [{ "label": "150502", "value": "科尔沁区" }, { "label": "150521", "value": "科尔沁左翼中旗" }, { "label": "150522", "value": "科尔沁左翼后旗" }, { "label": "150523", "value": "开鲁县" }, { "label": "150524", "value": "库伦旗" }, { "label": "150525", "value": "奈曼旗" }, { "label": "150526", "value": "扎鲁特旗" }, { "label": "150581", "value": "霍林郭勒市" }] }, { "label": "1506", "value": "鄂尔多斯市", "children": [{ "label": "150602", "value": "东胜区" }, { "label": "150603", "value": "康巴什区" }, { "label": "150621", "value": "达拉特旗" }, { "label": "150622", "value": "准格尔旗" }, { "label": "150623", "value": "鄂托克前旗" }, { "label": "150624", "value": "鄂托克旗" }, { "label": "150625", "value": "杭锦旗" }, { "label": "150626", "value": "乌审旗" }, { "label": "150627", "value": "伊金霍洛旗" }] }, { "label": "1507", "value": "呼伦贝尔市", "children": [{ "label": "150702", "value": "海拉尔区" }, { "label": "150703", "value": "扎赉诺尔区" }, { "label": "150721", "value": "阿荣旗" }, { "label": "150722", "value": "莫力达瓦达斡尔族自治旗" }, { "label": "150723", "value": "鄂伦春自治旗" }, { "label": "150724", "value": "鄂温克族自治旗" }, { "label": "150725", "value": "陈巴尔虎旗" }, { "label": "150726", "value": "新巴尔虎左旗" }, { "label": "150727", "value": "新巴尔虎右旗" }, { "label": "150781", "value": "满洲里市" }, { "label": "150782", "value": "牙克石市" }, { "label": "150783", "value": "扎兰屯市" }, { "label": "150784", "value": "额尔古纳市" }, { "label": "150785", "value": "根河市" }] }, { "label": "1508", "value": "巴彦淖尔市", "children": [{ "label": "150802", "value": "临河区" }, { "label": "150821", "value": "五原县" }, { "label": "150822", "value": "磴口县" }, { "label": "150823", "value": "乌拉特前旗" }, { "label": "150824", "value": "乌拉特中旗" }, { "label": "150825", "value": "乌拉特后旗" }, { "label": "150826", "value": "杭锦后旗" }] }, { "label": "1509", "value": "乌兰察布市", "children": [{ "label": "150902", "value": "集宁区" }, { "label": "150921", "value": "卓资县" }, { "label": "150922", "value": "化德县" }, { "label": "150923", "value": "商都县" }, { "label": "150924", "value": "兴和县" }, { "label": "150925", "value": "凉城县" }, { "label": "150926", "value": "察哈尔右翼前旗" }, { "label": "150927", "value": "察哈尔右翼中旗" }, { "label": "150928", "value": "察哈尔右翼后旗" }, { "label": "150929", "value": "四子王旗" }, { "label": "150981", "value": "丰镇市" }] }, { "label": "1522", "value": "兴安盟", "children": [{ "label": "152201", "value": "乌兰浩特市" }, { "label": "152202", "value": "阿尔山市" }, { "label": "152221", "value": "科尔沁右翼前旗" }, { "label": "152222", "value": "科尔沁右翼中旗" }, { "label": "152223", "value": "扎赉特旗" }, { "label": "152224", "value": "突泉县" }] }, { "label": "1525", "value": "锡林郭勒盟", "children": [{ "label": "152501", "value": "二连浩特市" }, { "label": "152502", "value": "锡林浩特市" }, { "label": "152522", "value": "阿巴嘎旗" }, { "label": "152523", "value": "苏尼特左旗" }, { "label": "152524", "value": "苏尼特右旗" }, { "label": "152525", "value": "东乌珠穆沁旗" }, { "label": "152526", "value": "西乌珠穆沁旗" }, { "label": "152527", "value": "太仆寺旗" }, { "label": "152528", "value": "镶黄旗" }, { "label": "152529", "value": "正镶白旗" }, { "label": "152530", "value": "正蓝旗" }, { "label": "152531", "value": "多伦县" }] }, { "label": "1529", "value": "阿拉善盟", "children": [{ "label": "152921", "value": "阿拉善左旗" }, { "label": "152922", "value": "阿拉善右旗" }, { "label": "152923", "value": "额济纳旗" }] }] }, { "label": "21", "value": "辽宁省", "children": [{ "label": "2101", "value": "沈阳市", "children": [{ "label": "210102", "value": "和平区" }, { "label": "210103", "value": "沈河区" }, { "label": "210104", "value": "大东区" }, { "label": "210105", "value": "皇姑区" }, { "label": "210106", "value": "铁西区" }, { "label": "210111", "value": "苏家屯区" }, { "label": "210112", "value": "浑南区" }, { "label": "210113", "value": "沈北新区" }, { "label": "210114", "value": "于洪区" }, { "label": "210115", "value": "辽中区" }, { "label": "210123", "value": "康平县" }, { "label": "210124", "value": "法库县" }, { "label": "210181", "value": "新民市" }] }, { "label": "2102", "value": "大连市", "children": [{ "label": "210202", "value": "中山区" }, { "label": "210203", "value": "西岗区" }, { "label": "210204", "value": "沙河口区" }, { "label": "210211", "value": "甘井子区" }, { "label": "210212", "value": "旅顺口区" }, { "label": "210213", "value": "金州区" }, { "label": "210214", "value": "普兰店区" }, { "label": "210224", "value": "长海县" }, { "label": "210281", "value": "瓦房店市" }, { "label": "210283", "value": "庄河市" }] }, { "label": "2103", "value": "鞍山市", "children": [{ "label": "210302", "value": "铁东区" }, { "label": "210303", "value": "铁西区" }, { "label": "210304", "value": "立山区" }, { "label": "210311", "value": "千山区" }, { "label": "210321", "value": "台安县" }, { "label": "210323", "value": "岫岩满族自治县" }, { "label": "210381", "value": "海城市" }] }, { "label": "2104", "value": "抚顺市", "children": [{ "label": "210402", "value": "新抚区" }, { "label": "210403", "value": "东洲区" }, { "label": "210404", "value": "望花区" }, { "label": "210411", "value": "顺城区" }, { "label": "210421", "value": "抚顺县" }, { "label": "210422", "value": "新宾满族自治县" }, { "label": "210423", "value": "清原满族自治县" }] }, { "label": "2105", "value": "本溪市", "children": [{ "label": "210502", "value": "平山区" }, { "label": "210503", "value": "溪湖区" }, { "label": "210504", "value": "明山区" }, { "label": "210505", "value": "南芬区" }, { "label": "210521", "value": "本溪满族自治县" }, { "label": "210522", "value": "桓仁满族自治县" }] }, { "label": "2106", "value": "丹东市", "children": [{ "label": "210602", "value": "元宝区" }, { "label": "210603", "value": "振兴区" }, { "label": "210604", "value": "振安区" }, { "label": "210624", "value": "宽甸满族自治县" }, { "label": "210681", "value": "东港市" }, { "label": "210682", "value": "凤城市" }] }, { "label": "2107", "value": "锦州市", "children": [{ "label": "210702", "value": "古塔区" }, { "label": "210703", "value": "凌河区" }, { "label": "210711", "value": "太和区" }, { "label": "210726", "value": "黑山县" }, { "label": "210727", "value": "义县" }, { "label": "210781", "value": "凌海市" }, { "label": "210782", "value": "北镇市" }] }, { "label": "2108", "value": "营口市", "children": [{ "label": "210802", "value": "站前区" }, { "label": "210803", "value": "西市区" }, { "label": "210804", "value": "鲅鱼圈区" }, { "label": "210811", "value": "老边区" }, { "label": "210881", "value": "盖州市" }, { "label": "210882", "value": "大石桥市" }] }, { "label": "2109", "value": "阜新市", "children": [{ "label": "210902", "value": "海州区" }, { "label": "210903", "value": "新邱区" }, { "label": "210904", "value": "太平区" }, { "label": "210905", "value": "清河门区" }, { "label": "210911", "value": "细河区" }, { "label": "210921", "value": "阜新蒙古族自治县" }, { "label": "210922", "value": "彰武县" }] }, { "label": "2110", "value": "辽阳市", "children": [{ "label": "211002", "value": "白塔区" }, { "label": "211003", "value": "文圣区" }, { "label": "211004", "value": "宏伟区" }, { "label": "211005", "value": "弓长岭区" }, { "label": "211011", "value": "太子河区" }, { "label": "211021", "value": "辽阳县" }, { "label": "211081", "value": "灯塔市" }] }, { "label": "2111", "value": "盘锦市", "children": [{ "label": "211102", "value": "双台子区" }, { "label": "211103", "value": "兴隆台区" }, { "label": "211104", "value": "大洼区" }, { "label": "211122", "value": "盘山县" }] }, { "label": "2112", "value": "铁岭市", "children": [{ "label": "211202", "value": "银州区" }, { "label": "211204", "value": "清河区" }, { "label": "211221", "value": "铁岭县" }, { "label": "211223", "value": "西丰县" }, { "label": "211224", "value": "昌图县" }, { "label": "211281", "value": "调兵山市" }, { "label": "211282", "value": "开原市" }] }, { "label": "2113", "value": "朝阳市", "children": [{ "label": "211302", "value": "双塔区" }, { "label": "211303", "value": "龙城区" }, { "label": "211321", "value": "朝阳县" }, { "label": "211322", "value": "建平县" }, { "label": "211324", "value": "喀喇沁左翼蒙古族自治县" }, { "label": "211381", "value": "北票市" }, { "label": "211382", "value": "凌源市" }] }, { "label": "2114", "value": "葫芦岛市", "children": [{ "label": "211402", "value": "连山区" }, { "label": "211403", "value": "龙港区" }, { "label": "211404", "value": "南票区" }, { "label": "211421", "value": "绥中县" }, { "label": "211422", "value": "建昌县" }, { "label": "211481", "value": "兴城市" }] }] }, { "label": "22", "value": "吉林省", "children": [{ "label": "2201", "value": "长春市", "children": [{ "label": "220102", "value": "南关区" }, { "label": "220103", "value": "宽城区" }, { "label": "220104", "value": "朝阳区" }, { "label": "220105", "value": "二道区" }, { "label": "220106", "value": "绿园区" }, { "label": "220112", "value": "双阳区" }, { "label": "220113", "value": "九台区" }, { "label": "220122", "value": "农安县" }, { "label": "220182", "value": "榆树市" }, { "label": "220183", "value": "德惠市" }] }, { "label": "2202", "value": "吉林市", "children": [{ "label": "220202", "value": "昌邑区" }, { "label": "220203", "value": "龙潭区" }, { "label": "220204", "value": "船营区" }, { "label": "220211", "value": "丰满区" }, { "label": "220221", "value": "永吉县" }, { "label": "220281", "value": "蛟河市" }, { "label": "220282", "value": "桦甸市" }, { "label": "220283", "value": "舒兰市" }, { "label": "220284", "value": "磐石市" }] }, { "label": "2203", "value": "四平市", "children": [{ "label": "220302", "value": "铁西区" }, { "label": "220303", "value": "铁东区" }, { "label": "220322", "value": "梨树县" }, { "label": "220323", "value": "伊通满族自治县" }, { "label": "220381", "value": "公主岭市" }, { "label": "220382", "value": "双辽市" }] }, { "label": "2204", "value": "辽源市", "children": [{ "label": "220402", "value": "龙山区" }, { "label": "220403", "value": "西安区" }, { "label": "220421", "value": "东丰县" }, { "label": "220422", "value": "东辽县" }] }, { "label": "2205", "value": "通化市", "children": [{ "label": "220502", "value": "东昌区" }, { "label": "220503", "value": "二道江区" }, { "label": "220521", "value": "通化县" }, { "label": "220523", "value": "辉南县" }, { "label": "220524", "value": "柳河县" }, { "label": "220581", "value": "梅河口市" }, { "label": "220582", "value": "集安市" }] }, { "label": "2206", "value": "白山市", "children": [{ "label": "220602", "value": "浑江区" }, { "label": "220605", "value": "江源区" }, { "label": "220621", "value": "抚松县" }, { "label": "220622", "value": "靖宇县" }, { "label": "220623", "value": "长白朝鲜族自治县" }, { "label": "220681", "value": "临江市" }] }, { "label": "2207", "value": "松原市", "children": [{ "label": "220702", "value": "宁江区" }, { "label": "220721", "value": "前郭尔罗斯蒙古族自治县" }, { "label": "220722", "value": "长岭县" }, { "label": "220723", "value": "乾安县" }, { "label": "220781", "value": "扶余市" }] }, { "label": "2208", "value": "白城市", "children": [{ "label": "220802", "value": "洮北区" }, { "label": "220821", "value": "镇赉县" }, { "label": "220822", "value": "通榆县" }, { "label": "220881", "value": "洮南市" }, { "label": "220882", "value": "大安市" }] }, { "label": "2224", "value": "延边朝鲜族自治州", "children": [{ "label": "222401", "value": "延吉市" }, { "label": "222402", "value": "图们市" }, { "label": "222403", "value": "敦化市" }, { "label": "222404", "value": "珲春市" }, { "label": "222405", "value": "龙井市" }, { "label": "222406", "value": "和龙市" }, { "label": "222424", "value": "汪清县" }, { "label": "222426", "value": "安图县" }] }] }, { "label": "23", "value": "黑龙江", "children": [{ "label": "2301", "value": "哈尔滨市", "children": [{ "label": "230102", "value": "道里区" }, { "label": "230103", "value": "南岗区" }, { "label": "230104", "value": "道外区" }, { "label": "230108", "value": "平房区" }, { "label": "230109", "value": "松北区" }, { "label": "230110", "value": "香坊区" }, { "label": "230111", "value": "呼兰区" }, { "label": "230112", "value": "阿城区" }, { "label": "230113", "value": "双城区" }, { "label": "230123", "value": "依兰县" }, { "label": "230124", "value": "方正县" }, { "label": "230125", "value": "宾县" }, { "label": "230126", "value": "巴彦县" }, { "label": "230127", "value": "木兰县" }, { "label": "230128", "value": "通河县" }, { "label": "230129", "value": "延寿县" }, { "label": "230183", "value": "尚志市" }, { "label": "230184", "value": "五常市" }] }, { "label": "2302", "value": "齐齐哈尔市", "children": [{ "label": "230202", "value": "龙沙区" }, { "label": "230203", "value": "建华区" }, { "label": "230204", "value": "铁锋区" }, { "label": "230205", "value": "昂昂溪区" }, { "label": "230206", "value": "富拉尔基区" }, { "label": "230207", "value": "碾子山区" }, { "label": "230208", "value": "梅里斯达斡尔族区" }, { "label": "230221", "value": "龙江县" }, { "label": "230223", "value": "依安县" }, { "label": "230224", "value": "泰来县" }, { "label": "230225", "value": "甘南县" }, { "label": "230227", "value": "富裕县" }, { "label": "230229", "value": "克山县" }, { "label": "230230", "value": "克东县" }, { "label": "230231", "value": "拜泉县" }, { "label": "230281", "value": "讷河市" }] }, { "label": "2303", "value": "鸡西市", "children": [{ "label": "230302", "value": "鸡冠区" }, { "label": "230303", "value": "恒山区" }, { "label": "230304", "value": "滴道区" }, { "label": "230305", "value": "梨树区" }, { "label": "230306", "value": "城子河区" }, { "label": "230307", "value": "麻山区" }, { "label": "230321", "value": "鸡东县" }, { "label": "230381", "value": "虎林市" }, { "label": "230382", "value": "密山市" }] }, { "label": "2304", "value": "鹤岗市", "children": [{ "label": "230402", "value": "向阳区" }, { "label": "230403", "value": "工农区" }, { "label": "230404", "value": "南山区" }, { "label": "230405", "value": "兴安区" }, { "label": "230406", "value": "东山区" }, { "label": "230407", "value": "兴山区" }, { "label": "230421", "value": "萝北县" }, { "label": "230422", "value": "绥滨县" }] }, { "label": "2305", "value": "双鸭山市", "children": [{ "label": "230502", "value": "尖山区" }, { "label": "230503", "value": "岭东区" }, { "label": "230505", "value": "四方台区" }, { "label": "230506", "value": "宝山区" }, { "label": "230521", "value": "集贤县" }, { "label": "230522", "value": "友谊县" }, { "label": "230523", "value": "宝清县" }, { "label": "230524", "value": "饶河县" }] }, { "label": "2306", "value": "大庆市", "children": [{ "label": "230602", "value": "萨尔图区" }, { "label": "230603", "value": "龙凤区" }, { "label": "230604", "value": "让胡路区" }, { "label": "230605", "value": "红岗区" }, { "label": "230606", "value": "大同区" }, { "label": "230621", "value": "肇州县" }, { "label": "230622", "value": "肇源县" }, { "label": "230623", "value": "林甸县" }, { "label": "230624", "value": "杜尔伯特蒙古族自治县" }] }, { "label": "2307", "value": "伊春市", "children": [{ "label": "230702", "value": "伊春区" }, { "label": "230703", "value": "南岔区" }, { "label": "230704", "value": "友好区" }, { "label": "230705", "value": "西林区" }, { "label": "230706", "value": "翠峦区" }, { "label": "230707", "value": "新青区" }, { "label": "230708", "value": "美溪区" }, { "label": "230709", "value": "金山屯区" }, { "label": "230710", "value": "五营区" }, { "label": "230711", "value": "乌马河区" }, { "label": "230712", "value": "汤旺河区" }, { "label": "230713", "value": "带岭区" }, { "label": "230714", "value": "乌伊岭区" }, { "label": "230715", "value": "红星区" }, { "label": "230716", "value": "上甘岭区" }, { "label": "230722", "value": "嘉荫县" }, { "label": "230781", "value": "铁力市" }] }, { "label": "2308", "value": "佳木斯市", "children": [{ "label": "230803", "value": "向阳区" }, { "label": "230804", "value": "前进区" }, { "label": "230805", "value": "东风区" }, { "label": "230811", "value": "郊区" }, { "label": "230822", "value": "桦南县" }, { "label": "230826", "value": "桦川县" }, { "label": "230828", "value": "汤原县" }, { "label": "230881", "value": "同江市" }, { "label": "230882", "value": "富锦市" }, { "label": "230883", "value": "抚远市" }] }, { "label": "2309", "value": "七台河市", "children": [{ "label": "230902", "value": "新兴区" }, { "label": "230903", "value": "桃山区" }, { "label": "230904", "value": "茄子河区" }, { "label": "230921", "value": "勃利县" }] }, { "label": "2310", "value": "牡丹江市", "children": [{ "label": "231002", "value": "东安区" }, { "label": "231003", "value": "阳明区" }, { "label": "231004", "value": "爱民区" }, { "label": "231005", "value": "西安区" }, { "label": "231025", "value": "林口县" }, { "label": "231081", "value": "绥芬河市" }, { "label": "231083", "value": "海林市" }, { "label": "231084", "value": "宁安市" }, { "label": "231085", "value": "穆棱市" }, { "label": "231086", "value": "东宁市" }] }, { "label": "2311", "value": "黑河市", "children": [{ "label": "231102", "value": "爱辉区" }, { "label": "231121", "value": "嫩江县" }, { "label": "231123", "value": "逊克县" }, { "label": "231124", "value": "孙吴县" }, { "label": "231181", "value": "北安市" }, { "label": "231182", "value": "五大连池市" }] }, { "label": "2312", "value": "绥化市", "children": [{ "label": "231202", "value": "北林区" }, { "label": "231221", "value": "望奎县" }, { "label": "231222", "value": "兰西县" }, { "label": "231223", "value": "青冈县" }, { "label": "231224", "value": "庆安县" }, { "label": "231225", "value": "明水县" }, { "label": "231226", "value": "绥棱县" }, { "label": "231281", "value": "安达市" }, { "label": "231282", "value": "肇东市" }, { "label": "231283", "value": "海伦市" }] }, { "label": "2327", "value": "大兴安岭地区", "children": [{ "label": "232721", "value": "呼玛县" }, { "label": "232722", "value": "塔河县" }, { "label": "232723", "value": "漠河县" }, { "label": "232701", "value": "加格达奇区" }, { "label": "232702", "value": "松岭区" }, { "label": "232703", "value": "新林区" }, { "label": "232704", "value": "呼中区" }] }] }, { "label": "31", "value": "上海市", "children": [{ "label": "3101", "value": "市辖区", "children": [{ "label": "310101", "value": "黄浦区" }, { "label": "310104", "value": "徐汇区" }, { "label": "310105", "value": "长宁区" }, { "label": "310106", "value": "静安区" }, { "label": "310107", "value": "普陀区" }, { "label": "310109", "value": "虹口区" }, { "label": "310110", "value": "杨浦区" }, { "label": "310112", "value": "闵行区" }, { "label": "310113", "value": "宝山区" }, { "label": "310114", "value": "嘉定区" }, { "label": "310115", "value": "浦东新区" }, { "label": "310116", "value": "金山区" }, { "label": "310117", "value": "松江区" }, { "label": "310118", "value": "青浦区" }, { "label": "310120", "value": "奉贤区" }, { "label": "310151", "value": "崇明区" }] }] }, { "label": "32", "value": "江苏省", "children": [{ "label": "3201", "value": "南京市", "children": [{ "label": "320102", "value": "玄武区" }, { "label": "320104", "value": "秦淮区" }, { "label": "320105", "value": "建邺区" }, { "label": "320106", "value": "鼓楼区" }, { "label": "320111", "value": "浦口区" }, { "label": "320113", "value": "栖霞区" }, { "label": "320114", "value": "雨花台区" }, { "label": "320115", "value": "江宁区" }, { "label": "320116", "value": "六合区" }, { "label": "320117", "value": "溧水区" }, { "label": "320118", "value": "高淳区" }] }, { "label": "3202", "value": "无锡市", "children": [{ "label": "320205", "value": "锡山区" }, { "label": "320206", "value": "惠山区" }, { "label": "320211", "value": "滨湖区" }, { "label": "320213", "value": "梁溪区" }, { "label": "320214", "value": "新吴区" }, { "label": "320281", "value": "江阴市" }, { "label": "320282", "value": "宜兴市" }] }, { "label": "3203", "value": "徐州市", "children": [{ "label": "320302", "value": "鼓楼区" }, { "label": "320303", "value": "云龙区" }, { "label": "320305", "value": "贾汪区" }, { "label": "320311", "value": "泉山区" }, { "label": "320312", "value": "铜山区" }, { "label": "320321", "value": "丰县" }, { "label": "320322", "value": "沛县" }, { "label": "320324", "value": "睢宁县" }, { "label": "320381", "value": "新沂市" }, { "label": "320382", "value": "邳州市" }] }, { "label": "3204", "value": "常州市", "children": [{ "label": "320402", "value": "天宁区" }, { "label": "320404", "value": "钟楼区" }, { "label": "320411", "value": "新北区" }, { "label": "320412", "value": "武进区" }, { "label": "320413", "value": "金坛区" }, { "label": "320481", "value": "溧阳市" }] }, { "label": "3205", "value": "苏州市", "children": [{ "label": "320505", "value": "虎丘区" }, { "label": "320506", "value": "吴中区" }, { "label": "320507", "value": "相城区" }, { "label": "320508", "value": "姑苏区" }, { "label": "320509", "value": "吴江区" }, { "label": "320581", "value": "常熟市" }, { "label": "320582", "value": "张家港市" }, { "label": "320583", "value": "昆山市" }, { "label": "320585", "value": "太仓市" }, { "label": "320571", "value": "苏州工业园" }] }, { "label": "3206", "value": "南通市", "children": [{ "label": "320602", "value": "崇川区" }, { "label": "320611", "value": "港闸区" }, { "label": "320612", "value": "通州区" }, { "label": "320621", "value": "海安县" }, { "label": "320623", "value": "如东县" }, { "label": "320681", "value": "启东市" }, { "label": "320682", "value": "如皋市" }, { "label": "320684", "value": "海门市" }] }, { "label": "3207", "value": "连云港市", "children": [{ "label": "320703", "value": "连云区" }, { "label": "320706", "value": "海州区" }, { "label": "320707", "value": "赣榆区" }, { "label": "320722", "value": "东海县" }, { "label": "320723", "value": "灌云县" }, { "label": "320724", "value": "灌南县" }] }, { "label": "3208", "value": "淮安市", "children": [{ "label": "320803", "value": "淮安区" }, { "label": "320804", "value": "淮阴区" }, { "label": "320812", "value": "清江浦区" }, { "label": "320813", "value": "洪泽区" }, { "label": "320826", "value": "涟水县" }, { "label": "320830", "value": "盱眙县" }, { "label": "320831", "value": "金湖县" }] }, { "label": "3209", "value": "盐城市", "children": [{ "label": "320902", "value": "亭湖区" }, { "label": "320903", "value": "盐都区" }, { "label": "320904", "value": "大丰区" }, { "label": "320921", "value": "响水县" }, { "label": "320922", "value": "滨海县" }, { "label": "320923", "value": "阜宁县" }, { "label": "320924", "value": "射阳县" }, { "label": "320925", "value": "建湖县" }, { "label": "320981", "value": "东台市" }] }, { "label": "3210", "value": "扬州市", "children": [{ "label": "321002", "value": "广陵区" }, { "label": "321003", "value": "邗江区" }, { "label": "321012", "value": "江都区" }, { "label": "321023", "value": "宝应县" }, { "label": "321081", "value": "仪征市" }, { "label": "321084", "value": "高邮市" }] }, { "label": "3211", "value": "镇江市", "children": [{ "label": "321102", "value": "京口区" }, { "label": "321111", "value": "润州区" }, { "label": "321112", "value": "丹徒区" }, { "label": "321181", "value": "丹阳市" }, { "label": "321182", "value": "扬中市" }, { "label": "321183", "value": "句容市" }] }, { "label": "3212", "value": "泰州市", "children": [{ "label": "321202", "value": "海陵区" }, { "label": "321203", "value": "高港区" }, { "label": "321204", "value": "姜堰区" }, { "label": "321281", "value": "兴化市" }, { "label": "321282", "value": "靖江市" }, { "label": "321283", "value": "泰兴市" }] }, { "label": "3213", "value": "宿迁市", "children": [{ "label": "321302", "value": "宿城区" }, { "label": "321311", "value": "宿豫区" }, { "label": "321322", "value": "沭阳县" }, { "label": "321323", "value": "泗阳县" }, { "label": "321324", "value": "泗洪县" }] }] }, { "label": "33", "value": "浙江省", "children": [{ "label": "3301", "value": "杭州市", "children": [{ "label": "330102", "value": "上城区" }, { "label": "330103", "value": "下城区" }, { "label": "330104", "value": "江干区" }, { "label": "330105", "value": "拱墅区" }, { "label": "330106", "value": "西湖区" }, { "label": "330108", "value": "滨江区" }, { "label": "330109", "value": "萧山区" }, { "label": "330110", "value": "余杭区" }, { "label": "330111", "value": "富阳区" }, { "label": "330122", "value": "桐庐县" }, { "label": "330127", "value": "淳安县" }, { "label": "330182", "value": "建德市" }, { "label": "330185", "value": "临安市" }] }, { "label": "3302", "value": "宁波市", "children": [{ "label": "330203", "value": "海曙区" }, { "label": "330204", "value": "江东区" }, { "label": "330205", "value": "江北区" }, { "label": "330206", "value": "北仑区" }, { "label": "330211", "value": "镇海区" }, { "label": "330212", "value": "鄞州区" }, { "label": "330225", "value": "象山县" }, { "label": "330226", "value": "宁海县" }, { "label": "330281", "value": "余姚市" }, { "label": "330282", "value": "慈溪市" }, { "label": "330283", "value": "奉化市" }] }, { "label": "3303", "value": "温州市", "children": [{ "label": "330302", "value": "鹿城区" }, { "label": "330303", "value": "龙湾区" }, { "label": "330304", "value": "瓯海区" }, { "label": "330305", "value": "洞头区" }, { "label": "330324", "value": "永嘉县" }, { "label": "330326", "value": "平阳县" }, { "label": "330327", "value": "苍南县" }, { "label": "330328", "value": "文成县" }, { "label": "330329", "value": "泰顺县" }, { "label": "330381", "value": "瑞安市" }, { "label": "330382", "value": "乐清市" }] }, { "label": "3304", "value": "嘉兴市", "children": [{ "label": "330402", "value": "南湖区" }, { "label": "330411", "value": "秀洲区" }, { "label": "330421", "value": "嘉善县" }, { "label": "330424", "value": "海盐县" }, { "label": "330481", "value": "海宁市" }, { "label": "330482", "value": "平湖市" }, { "label": "330483", "value": "桐乡市" }] }, { "label": "3305", "value": "湖州市", "children": [{ "label": "330502", "value": "吴兴区" }, { "label": "330503", "value": "南浔区" }, { "label": "330521", "value": "德清县" }, { "label": "330522", "value": "长兴县" }, { "label": "330523", "value": "安吉县" }] }, { "label": "3306", "value": "绍兴市", "children": [{ "label": "330602", "value": "越城区" }, { "label": "330603", "value": "柯桥区" }, { "label": "330604", "value": "上虞区" }, { "label": "330624", "value": "新昌县" }, { "label": "330681", "value": "诸暨市" }, { "label": "330683", "value": "嵊州市" }] }, { "label": "3307", "value": "金华市", "children": [{ "label": "330702", "value": "婺城区" }, { "label": "330703", "value": "金东区" }, { "label": "330723", "value": "武义县" }, { "label": "330726", "value": "浦江县" }, { "label": "330727", "value": "磐安县" }, { "label": "330781", "value": "兰溪市" }, { "label": "330782", "value": "义乌市" }, { "label": "330783", "value": "东阳市" }, { "label": "330784", "value": "永康市" }] }, { "label": "3308", "value": "衢州市", "children": [{ "label": "330802", "value": "柯城区" }, { "label": "330803", "value": "衢江区" }, { "label": "330822", "value": "常山县" }, { "label": "330824", "value": "开化县" }, { "label": "330825", "value": "龙游县" }, { "label": "330881", "value": "江山市" }] }, { "label": "3309", "value": "舟山市", "children": [{ "label": "330902", "value": "定海区" }, { "label": "330903", "value": "普陀区" }, { "label": "330921", "value": "岱山县" }, { "label": "330922", "value": "嵊泗县" }] }, { "label": "3310", "value": "台州市", "children": [{ "label": "331002", "value": "椒江区" }, { "label": "331003", "value": "黄岩区" }, { "label": "331004", "value": "路桥区" }, { "label": "331021", "value": "玉环县" }, { "label": "331022", "value": "三门县" }, { "label": "331023", "value": "天台县" }, { "label": "331024", "value": "仙居县" }, { "label": "331081", "value": "温岭市" }, { "label": "331082", "value": "临海市" }] }, { "label": "3311", "value": "丽水市", "children": [{ "label": "331102", "value": "莲都区" }, { "label": "331121", "value": "青田县" }, { "label": "331122", "value": "缙云县" }, { "label": "331123", "value": "遂昌县" }, { "label": "331124", "value": "松阳县" }, { "label": "331125", "value": "云和县" }, { "label": "331126", "value": "庆元县" }, { "label": "331127", "value": "景宁畲族自治县" }, { "label": "331181", "value": "龙泉市" }] }] }, { "label": "34", "value": "安徽省", "children": [{ "label": "3401", "value": "合肥市", "children": [{ "label": "340102", "value": "瑶海区" }, { "label": "340103", "value": "庐阳区" }, { "label": "340104", "value": "蜀山区" }, { "label": "340111", "value": "包河区" }, { "label": "340121", "value": "长丰县" }, { "label": "340122", "value": "肥东县" }, { "label": "340123", "value": "肥西县" }, { "label": "340124", "value": "庐江县" }, { "label": "340181", "value": "巢湖市" }] }, { "label": "3402", "value": "芜湖市", "children": [{ "label": "340202", "value": "镜湖区" }, { "label": "340203", "value": "弋江区" }, { "label": "340207", "value": "鸠江区" }, { "label": "340208", "value": "三山区" }, { "label": "340221", "value": "芜湖县" }, { "label": "340222", "value": "繁昌县" }, { "label": "340223", "value": "南陵县" }, { "label": "340225", "value": "无为县" }] }, { "label": "3403", "value": "蚌埠市", "children": [{ "label": "340302", "value": "龙子湖区" }, { "label": "340303", "value": "蚌山区" }, { "label": "340304", "value": "禹会区" }, { "label": "340311", "value": "淮上区" }, { "label": "340321", "value": "怀远县" }, { "label": "340322", "value": "五河县" }, { "label": "340323", "value": "固镇县" }] }, { "label": "3404", "value": "淮南市", "children": [{ "label": "340402", "value": "大通区" }, { "label": "340403", "value": "田家庵区" }, { "label": "340404", "value": "谢家集区" }, { "label": "340405", "value": "八公山区" }, { "label": "340406", "value": "潘集区" }, { "label": "340421", "value": "凤台县" }, { "label": "340422", "value": "寿县" }] }, { "label": "3405", "value": "马鞍山市", "children": [{ "label": "340503", "value": "花山区" }, { "label": "340504", "value": "雨山区" }, { "label": "340506", "value": "博望区" }, { "label": "340521", "value": "当涂县" }, { "label": "340522", "value": "含山县" }, { "label": "340523", "value": "和县" }] }, { "label": "3406", "value": "淮北市", "children": [{ "label": "340602", "value": "杜集区" }, { "label": "340603", "value": "相山区" }, { "label": "340604", "value": "烈山区" }, { "label": "340621", "value": "濉溪县" }] }, { "label": "3407", "value": "铜陵市", "children": [{ "label": "340705", "value": "铜官区" }, { "label": "340706", "value": "义安区" }, { "label": "340711", "value": "郊区" }, { "label": "340722", "value": "枞阳县" }] }, { "label": "3408", "value": "安庆市", "children": [{ "label": "340802", "value": "迎江区" }, { "label": "340803", "value": "大观区" }, { "label": "340811", "value": "宜秀区" }, { "label": "340822", "value": "怀宁县" }, { "label": "340824", "value": "潜山县" }, { "label": "340825", "value": "太湖县" }, { "label": "340826", "value": "宿松县" }, { "label": "340827", "value": "望江县" }, { "label": "340828", "value": "岳西县" }, { "label": "340881", "value": "桐城市" }] }, { "label": "3410", "value": "黄山市", "children": [{ "label": "341002", "value": "屯溪区" }, { "label": "341003", "value": "黄山区" }, { "label": "341004", "value": "徽州区" }, { "label": "341021", "value": "歙县" }, { "label": "341022", "value": "休宁县" }, { "label": "341023", "value": "黟县" }, { "label": "341024", "value": "祁门县" }] }, { "label": "3411", "value": "滁州市", "children": [{ "label": "341102", "value": "琅琊区" }, { "label": "341103", "value": "南谯区" }, { "label": "341122", "value": "来安县" }, { "label": "341124", "value": "全椒县" }, { "label": "341125", "value": "定远县" }, { "label": "341126", "value": "凤阳县" }, { "label": "341181", "value": "天长市" }, { "label": "341182", "value": "明光市" }] }, { "label": "3412", "value": "阜阳市", "children": [{ "label": "341202", "value": "颍州区" }, { "label": "341203", "value": "颍东区" }, { "label": "341204", "value": "颍泉区" }, { "label": "341221", "value": "临泉县" }, { "label": "341222", "value": "太和县" }, { "label": "341225", "value": "阜南县" }, { "label": "341226", "value": "颍上县" }, { "label": "341282", "value": "界首市" }] }, { "label": "3413", "value": "宿州市", "children": [{ "label": "341302", "value": "埇桥区" }, { "label": "341321", "value": "砀山县" }, { "label": "341322", "value": "萧县" }, { "label": "341323", "value": "灵璧县" }, { "label": "341324", "value": "泗县" }] }, { "label": "3415", "value": "六安市", "children": [{ "label": "341502", "value": "金安区" }, { "label": "341503", "value": "裕安区" }, { "label": "341504", "value": "叶集区" }, { "label": "341522", "value": "霍邱县" }, { "label": "341523", "value": "舒城县" }, { "label": "341524", "value": "金寨县" }, { "label": "341525", "value": "霍山县" }] }, { "label": "3416", "value": "亳州市", "children": [{ "label": "341602", "value": "谯城区" }, { "label": "341621", "value": "涡阳县" }, { "label": "341622", "value": "蒙城县" }, { "label": "341623", "value": "利辛县" }] }, { "label": "3417", "value": "池州市", "children": [{ "label": "341702", "value": "贵池区" }, { "label": "341721", "value": "东至县" }, { "label": "341722", "value": "石台县" }, { "label": "341723", "value": "青阳县" }] }, { "label": "3418", "value": "宣城市", "children": [{ "label": "341802", "value": "宣州区" }, { "label": "341821", "value": "郎溪县" }, { "label": "341822", "value": "广德县" }, { "label": "341823", "value": "泾县" }, { "label": "341824", "value": "绩溪县" }, { "label": "341825", "value": "旌德县" }, { "label": "341881", "value": "宁国市" }] }] }, { "label": "35", "value": "福建省", "children": [{ "label": "3501", "value": "福州市", "children": [{ "label": "350102", "value": "鼓楼区" }, { "label": "350103", "value": "台江区" }, { "label": "350104", "value": "仓山区" }, { "label": "350105", "value": "马尾区" }, { "label": "350111", "value": "晋安区" }, { "label": "350121", "value": "闽侯县" }, { "label": "350122", "value": "连江县" }, { "label": "350123", "value": "罗源县" }, { "label": "350124", "value": "闽清县" }, { "label": "350125", "value": "永泰县" }, { "label": "350128", "value": "平潭县" }, { "label": "350181", "value": "福清市" }, { "label": "350182", "value": "长乐市" }] }, { "label": "3502", "value": "厦门市", "children": [{ "label": "350203", "value": "思明区" }, { "label": "350205", "value": "海沧区" }, { "label": "350206", "value": "湖里区" }, { "label": "350211", "value": "集美区" }, { "label": "350212", "value": "同安区" }, { "label": "350213", "value": "翔安区" }] }, { "label": "3503", "value": "莆田市", "children": [{ "label": "350302", "value": "城厢区" }, { "label": "350303", "value": "涵江区" }, { "label": "350304", "value": "荔城区" }, { "label": "350305", "value": "秀屿区" }, { "label": "350322", "value": "仙游县" }] }, { "label": "3504", "value": "三明市", "children": [{ "label": "350402", "value": "梅列区" }, { "label": "350403", "value": "三元区" }, { "label": "350421", "value": "明溪县" }, { "label": "350423", "value": "清流县" }, { "label": "350424", "value": "宁化县" }, { "label": "350425", "value": "大田县" }, { "label": "350426", "value": "尤溪县" }, { "label": "350427", "value": "沙县" }, { "label": "350428", "value": "将乐县" }, { "label": "350429", "value": "泰宁县" }, { "label": "350430", "value": "建宁县" }, { "label": "350481", "value": "永安市" }] }, { "label": "3505", "value": "泉州市", "children": [{ "label": "350502", "value": "鲤城区" }, { "label": "350503", "value": "丰泽区" }, { "label": "350504", "value": "洛江区" }, { "label": "350505", "value": "泉港区" }, { "label": "350521", "value": "惠安县" }, { "label": "350524", "value": "安溪县" }, { "label": "350525", "value": "永春县" }, { "label": "350526", "value": "德化县" }, { "label": "350581", "value": "石狮市" }, { "label": "350582", "value": "晋江市" }, { "label": "350583", "value": "南安市" }] }, { "label": "3506", "value": "漳州市", "children": [{ "label": "350602", "value": "芗城区" }, { "label": "350603", "value": "龙文区" }, { "label": "350622", "value": "云霄县" }, { "label": "350623", "value": "漳浦县" }, { "label": "350624", "value": "诏安县" }, { "label": "350625", "value": "长泰县" }, { "label": "350626", "value": "东山县" }, { "label": "350627", "value": "南靖县" }, { "label": "350628", "value": "平和县" }, { "label": "350629", "value": "华安县" }, { "label": "350681", "value": "龙海市" }] }, { "label": "3507", "value": "南平市", "children": [{ "label": "350702", "value": "延平区" }, { "label": "350703", "value": "建阳区" }, { "label": "350721", "value": "顺昌县" }, { "label": "350722", "value": "浦城县" }, { "label": "350723", "value": "光泽县" }, { "label": "350724", "value": "松溪县" }, { "label": "350725", "value": "政和县" }, { "label": "350781", "value": "邵武市" }, { "label": "350782", "value": "武夷山市" }, { "label": "350783", "value": "建瓯市" }] }, { "label": "3508", "value": "龙岩市", "children": [{ "label": "350802", "value": "新罗区" }, { "label": "350803", "value": "永定区" }, { "label": "350821", "value": "长汀县" }, { "label": "350823", "value": "上杭县" }, { "label": "350824", "value": "武平县" }, { "label": "350825", "value": "连城县" }, { "label": "350881", "value": "漳平市" }] }, { "label": "3509", "value": "宁德市", "children": [{ "label": "350902", "value": "蕉城区" }, { "label": "350921", "value": "霞浦县" }, { "label": "350922", "value": "古田县" }, { "label": "350923", "value": "屏南县" }, { "label": "350924", "value": "寿宁县" }, { "label": "350925", "value": "周宁县" }, { "label": "350926", "value": "柘荣县" }, { "label": "350981", "value": "福安市" }, { "label": "350982", "value": "福鼎市" }] }] }, { "label": "36", "value": "江西省", "children": [{ "label": "3601", "value": "南昌市", "children": [{ "label": "360102", "value": "东湖区" }, { "label": "360103", "value": "西湖区" }, { "label": "360104", "value": "青云谱区" }, { "label": "360105", "value": "湾里区" }, { "label": "360111", "value": "青山湖区" }, { "label": "360112", "value": "新建区" }, { "label": "360121", "value": "南昌县" }, { "label": "360123", "value": "安义县" }, { "label": "360124", "value": "进贤县" }] }, { "label": "3602", "value": "景德镇市", "children": [{ "label": "360202", "value": "昌江区" }, { "label": "360203", "value": "珠山区" }, { "label": "360222", "value": "浮梁县" }, { "label": "360281", "value": "乐平市" }] }, { "label": "3603", "value": "萍乡市", "children": [{ "label": "360302", "value": "安源区" }, { "label": "360313", "value": "湘东区" }, { "label": "360321", "value": "莲花县" }, { "label": "360322", "value": "上栗县" }, { "label": "360323", "value": "芦溪县" }] }, { "label": "3604", "value": "九江市", "children": [{ "label": "360402", "value": "濂溪区" }, { "label": "360403", "value": "浔阳区" }, { "label": "360421", "value": "九江县" }, { "label": "360423", "value": "武宁县" }, { "label": "360424", "value": "修水县" }, { "label": "360425", "value": "永修县" }, { "label": "360426", "value": "德安县" }, { "label": "360428", "value": "都昌县" }, { "label": "360429", "value": "湖口县" }, { "label": "360430", "value": "彭泽县" }, { "label": "360481", "value": "瑞昌市" }, { "label": "360482", "value": "共青城市" }, { "label": "360483", "value": "庐山市" }, { "label": "360404", "value": "柴桑区" }] }, { "label": "3605", "value": "新余市", "children": [{ "label": "360502", "value": "渝水区" }, { "label": "360521", "value": "分宜县" }] }, { "label": "3606", "value": "鹰潭市", "children": [{ "label": "360602", "value": "月湖区" }, { "label": "360622", "value": "余江县" }, { "label": "360681", "value": "贵溪市" }] }, { "label": "3607", "value": "赣州市", "children": [{ "label": "360702", "value": "章贡区" }, { "label": "360703", "value": "南康区" }, { "label": "360721", "value": "赣县" }, { "label": "360722", "value": "信丰县" }, { "label": "360723", "value": "大余县" }, { "label": "360724", "value": "上犹县" }, { "label": "360725", "value": "崇义县" }, { "label": "360726", "value": "安远县" }, { "label": "360727", "value": "龙南县" }, { "label": "360728", "value": "定南县" }, { "label": "360729", "value": "全南县" }, { "label": "360730", "value": "宁都县" }, { "label": "360731", "value": "于都县" }, { "label": "360732", "value": "兴国县" }, { "label": "360733", "value": "会昌县" }, { "label": "360734", "value": "寻乌县" }, { "label": "360735", "value": "石城县" }, { "label": "360781", "value": "瑞金市" }] }, { "label": "3608", "value": "吉安市", "children": [{ "label": "360802", "value": "吉州区" }, { "label": "360803", "value": "青原区" }, { "label": "360821", "value": "吉安县" }, { "label": "360822", "value": "吉水县" }, { "label": "360823", "value": "峡江县" }, { "label": "360824", "value": "新干县" }, { "label": "360825", "value": "永丰县" }, { "label": "360826", "value": "泰和县" }, { "label": "360827", "value": "遂川县" }, { "label": "360828", "value": "万安县" }, { "label": "360829", "value": "安福县" }, { "label": "360830", "value": "永新县" }, { "label": "360881", "value": "井冈山市" }] }, { "label": "3609", "value": "宜春市", "children": [{ "label": "360902", "value": "袁州区" }, { "label": "360921", "value": "奉新县" }, { "label": "360922", "value": "万载县" }, { "label": "360923", "value": "上高县" }, { "label": "360924", "value": "宜丰县" }, { "label": "360925", "value": "靖安县" }, { "label": "360926", "value": "铜鼓县" }, { "label": "360981", "value": "丰城市" }, { "label": "360982", "value": "樟树市" }, { "label": "360983", "value": "高安市" }] }, { "label": "3610", "value": "抚州市", "children": [{ "label": "361002", "value": "临川区" }, { "label": "361021", "value": "南城县" }, { "label": "361022", "value": "黎川县" }, { "label": "361023", "value": "南丰县" }, { "label": "361024", "value": "崇仁县" }, { "label": "361025", "value": "乐安县" }, { "label": "361026", "value": "宜黄县" }, { "label": "361027", "value": "金溪县" }, { "label": "361028", "value": "资溪县" }, { "label": "361029", "value": "东乡县" }, { "label": "361030", "value": "广昌县" }] }, { "label": "3611", "value": "上饶市", "children": [{ "label": "361102", "value": "信州区" }, { "label": "361103", "value": "广丰区" }, { "label": "361121", "value": "上饶县" }, { "label": "361123", "value": "玉山县" }, { "label": "361124", "value": "铅山县" }, { "label": "361125", "value": "横峰县" }, { "label": "361126", "value": "弋阳县" }, { "label": "361127", "value": "余干县" }, { "label": "361128", "value": "鄱阳县" }, { "label": "361129", "value": "万年县" }, { "label": "361130", "value": "婺源县" }, { "label": "361181", "value": "德兴市" }] }] }, { "label": "37", "value": "山东省", "children": [{ "label": "3701", "value": "济南市", "children": [{ "label": "370102", "value": "历下区" }, { "label": "370103", "value": "市中区" }, { "label": "370104", "value": "槐荫区" }, { "label": "370105", "value": "天桥区" }, { "label": "370112", "value": "历城区" }, { "label": "370113", "value": "长清区" }, { "label": "370124", "value": "平阴县" }, { "label": "370125", "value": "济阳县" }, { "label": "370126", "value": "商河县" }, { "label": "370181", "value": "章丘市" }] }, { "label": "3702", "value": "青岛市", "children": [{ "label": "370202", "value": "市南区" }, { "label": "370203", "value": "市北区" }, { "label": "370211", "value": "黄岛区" }, { "label": "370212", "value": "崂山区" }, { "label": "370213", "value": "李沧区" }, { "label": "370214", "value": "城阳区" }, { "label": "370281", "value": "胶州市" }, { "label": "370282", "value": "即墨市" }, { "label": "370283", "value": "平度市" }, { "label": "370285", "value": "莱西市" }] }, { "label": "3703", "value": "淄博市", "children": [{ "label": "370302", "value": "淄川区" }, { "label": "370303", "value": "张店区" }, { "label": "370304", "value": "博山区" }, { "label": "370305", "value": "临淄区" }, { "label": "370306", "value": "周村区" }, { "label": "370321", "value": "桓台县" }, { "label": "370322", "value": "高青县" }, { "label": "370323", "value": "沂源县" }] }, { "label": "3704", "value": "枣庄市", "children": [{ "label": "370402", "value": "市中区" }, { "label": "370403", "value": "薛城区" }, { "label": "370404", "value": "峄城区" }, { "label": "370405", "value": "台儿庄区" }, { "label": "370406", "value": "山亭区" }, { "label": "370481", "value": "滕州市" }] }, { "label": "3705", "value": "东营市", "children": [{ "label": "370502", "value": "东营区" }, { "label": "370503", "value": "河口区" }, { "label": "370505", "value": "垦利区" }, { "label": "370522", "value": "利津县" }, { "label": "370523", "value": "广饶县" }] }, { "label": "3706", "value": "烟台市", "children": [{ "label": "370602", "value": "芝罘区" }, { "label": "370611", "value": "福山区" }, { "label": "370612", "value": "牟平区" }, { "label": "370613", "value": "莱山区" }, { "label": "370634", "value": "长岛县" }, { "label": "370681", "value": "龙口市" }, { "label": "370682", "value": "莱阳市" }, { "label": "370683", "value": "莱州市" }, { "label": "370684", "value": "蓬莱市" }, { "label": "370685", "value": "招远市" }, { "label": "370686", "value": "栖霞市" }, { "label": "370687", "value": "海阳市" }] }, { "label": "3707", "value": "潍坊市", "children": [{ "label": "370702", "value": "潍城区" }, { "label": "370703", "value": "寒亭区" }, { "label": "370704", "value": "坊子区" }, { "label": "370705", "value": "奎文区" }, { "label": "370724", "value": "临朐县" }, { "label": "370725", "value": "昌乐县" }, { "label": "370781", "value": "青州市" }, { "label": "370782", "value": "诸城市" }, { "label": "370783", "value": "寿光市" }, { "label": "370784", "value": "安丘市" }, { "label": "370785", "value": "高密市" }, { "label": "370786", "value": "昌邑市" }] }, { "label": "3708", "value": "济宁市", "children": [{ "label": "370811", "value": "任城区" }, { "label": "370812", "value": "兖州区" }, { "label": "370826", "value": "微山县" }, { "label": "370827", "value": "鱼台县" }, { "label": "370828", "value": "金乡县" }, { "label": "370829", "value": "嘉祥县" }, { "label": "370830", "value": "汶上县" }, { "label": "370831", "value": "泗水县" }, { "label": "370832", "value": "梁山县" }, { "label": "370881", "value": "曲阜市" }, { "label": "370883", "value": "邹城市" }] }, { "label": "3709", "value": "泰安市", "children": [{ "label": "370902", "value": "泰山区" }, { "label": "370911", "value": "岱岳区" }, { "label": "370921", "value": "宁阳县" }, { "label": "370923", "value": "东平县" }, { "label": "370982", "value": "新泰市" }, { "label": "370983", "value": "肥城市" }] }, { "label": "3710", "value": "威海市", "children": [{ "label": "371002", "value": "环翠区" }, { "label": "371003", "value": "文登区" }, { "label": "371082", "value": "荣成市" }, { "label": "371083", "value": "乳山市" }] }, { "label": "3711", "value": "日照市", "children": [{ "label": "371102", "value": "东港区" }, { "label": "371103", "value": "岚山区" }, { "label": "371121", "value": "五莲县" }, { "label": "371122", "value": "莒县" }] }, { "label": "3712", "value": "莱芜市", "children": [{ "label": "371202", "value": "莱城区" }, { "label": "371203", "value": "钢城区" }] }, { "label": "3713", "value": "临沂市", "children": [{ "label": "371302", "value": "兰山区" }, { "label": "371311", "value": "罗庄区" }, { "label": "371312", "value": "河东区" }, { "label": "371321", "value": "沂南县" }, { "label": "371322", "value": "郯城县" }, { "label": "371323", "value": "沂水县" }, { "label": "371324", "value": "兰陵县" }, { "label": "371325", "value": "费县" }, { "label": "371326", "value": "平邑县" }, { "label": "371327", "value": "莒南县" }, { "label": "371328", "value": "蒙阴县" }, { "label": "371329", "value": "临沭县" }] }, { "label": "3714", "value": "德州市", "children": [{ "label": "371402", "value": "德城区" }, { "label": "371403", "value": "陵城区" }, { "label": "371422", "value": "宁津县" }, { "label": "371423", "value": "庆云县" }, { "label": "371424", "value": "临邑县" }, { "label": "371425", "value": "齐河县" }, { "label": "371426", "value": "平原县" }, { "label": "371427", "value": "夏津县" }, { "label": "371428", "value": "武城县" }, { "label": "371481", "value": "乐陵市" }, { "label": "371482", "value": "禹城市" }] }, { "label": "3715", "value": "聊城市", "children": [{ "label": "371502", "value": "东昌府区" }, { "label": "371521", "value": "阳谷县" }, { "label": "371522", "value": "莘县" }, { "label": "371523", "value": "茌平县" }, { "label": "371524", "value": "东阿县" }, { "label": "371525", "value": "冠县" }, { "label": "371526", "value": "高唐县" }, { "label": "371581", "value": "临清市" }] }, { "label": "3716", "value": "滨州市", "children": [{ "label": "371602", "value": "滨城区" }, { "label": "371603", "value": "沾化区" }, { "label": "371621", "value": "惠民县" }, { "label": "371622", "value": "阳信县" }, { "label": "371623", "value": "无棣县" }, { "label": "371625", "value": "博兴县" }, { "label": "371626", "value": "邹平县" }] }, { "label": "3717", "value": "菏泽市", "children": [{ "label": "371702", "value": "牡丹区" }, { "label": "371703", "value": "定陶区" }, { "label": "371721", "value": "曹县" }, { "label": "371722", "value": "单县" }, { "label": "371723", "value": "成武县" }, { "label": "371724", "value": "巨野县" }, { "label": "371725", "value": "郓城县" }, { "label": "371726", "value": "鄄城县" }, { "label": "371728", "value": "东明县" }] }] }, { "label": "41", "value": "河南省", "children": [{ "label": "4101", "value": "郑州市", "children": [{ "label": "410102", "value": "中原区" }, { "label": "410103", "value": "二七区" }, { "label": "410104", "value": "管城回族区" }, { "label": "410105", "value": "金水区" }, { "label": "410106", "value": "上街区" }, { "label": "410108", "value": "惠济区" }, { "label": "410122", "value": "中牟县" }, { "label": "410181", "value": "巩义市" }, { "label": "410182", "value": "荥阳市" }, { "label": "410183", "value": "新密市" }, { "label": "410184", "value": "新郑市" }, { "label": "410185", "value": "登封市" }] }, { "label": "4102", "value": "开封市", "children": [{ "label": "410202", "value": "龙亭区" }, { "label": "410203", "value": "顺河回族区" }, { "label": "410204", "value": "鼓楼区" }, { "label": "410205", "value": "禹王台区" }, { "label": "410211", "value": "金明区" }, { "label": "410212", "value": "祥符区" }, { "label": "410221", "value": "杞县" }, { "label": "410222", "value": "通许县" }, { "label": "410223", "value": "尉氏县" }, { "label": "410225", "value": "兰考县" }] }, { "label": "4103", "value": "洛阳市", "children": [{ "label": "410302", "value": "老城区" }, { "label": "410303", "value": "西工区" }, { "label": "410304", "value": "瀍河回族区" }, { "label": "410305", "value": "涧西区" }, { "label": "410306", "value": "吉利区" }, { "label": "410311", "value": "洛龙区" }, { "label": "410322", "value": "孟津县" }, { "label": "410323", "value": "新安县" }, { "label": "410324", "value": "栾川县" }, { "label": "410325", "value": "嵩县" }, { "label": "410326", "value": "汝阳县" }, { "label": "410327", "value": "宜阳县" }, { "label": "410328", "value": "洛宁县" }, { "label": "410329", "value": "伊川县" }, { "label": "410381", "value": "偃师市" }] }, { "label": "4104", "value": "平顶山市", "children": [{ "label": "410402", "value": "新华区" }, { "label": "410403", "value": "卫东区" }, { "label": "410404", "value": "石龙区" }, { "label": "410411", "value": "湛河区" }, { "label": "410421", "value": "宝丰县" }, { "label": "410422", "value": "叶县" }, { "label": "410423", "value": "鲁山县" }, { "label": "410425", "value": "郏县" }, { "label": "410481", "value": "舞钢市" }, { "label": "410482", "value": "汝州市" }] }, { "label": "4105", "value": "安阳市", "children": [{ "label": "410502", "value": "文峰区" }, { "label": "410503", "value": "北关区" }, { "label": "410505", "value": "殷都区" }, { "label": "410506", "value": "龙安区" }, { "label": "410522", "value": "安阳县" }, { "label": "410523", "value": "汤阴县" }, { "label": "410526", "value": "滑县" }, { "label": "410527", "value": "内黄县" }, { "label": "410581", "value": "林州市" }] }, { "label": "4106", "value": "鹤壁市", "children": [{ "label": "410602", "value": "鹤山区" }, { "label": "410603", "value": "山城区" }, { "label": "410611", "value": "淇滨区" }, { "label": "410621", "value": "浚县" }, { "label": "410622", "value": "淇县" }] }, { "label": "4107", "value": "新乡市", "children": [{ "label": "410702", "value": "红旗区" }, { "label": "410703", "value": "卫滨区" }, { "label": "410704", "value": "凤泉区" }, { "label": "410711", "value": "牧野区" }, { "label": "410721", "value": "新乡县" }, { "label": "410724", "value": "获嘉县" }, { "label": "410725", "value": "原阳县" }, { "label": "410726", "value": "延津县" }, { "label": "410727", "value": "封丘县" }, { "label": "410728", "value": "长垣县" }, { "label": "410781", "value": "卫辉市" }, { "label": "410782", "value": "辉县市" }] }, { "label": "4108", "value": "焦作市", "children": [{ "label": "410802", "value": "解放区" }, { "label": "410803", "value": "中站区" }, { "label": "410804", "value": "马村区" }, { "label": "410811", "value": "山阳区" }, { "label": "410821", "value": "修武县" }, { "label": "410822", "value": "博爱县" }, { "label": "410823", "value": "武陟县" }, { "label": "410825", "value": "温县" }, { "label": "410882", "value": "沁阳市" }, { "label": "410883", "value": "孟州市" }] }, { "label": "4109", "value": "濮阳市", "children": [{ "label": "410902", "value": "华龙区" }, { "label": "410922", "value": "清丰县" }, { "label": "410923", "value": "南乐县" }, { "label": "410926", "value": "范县" }, { "label": "410927", "value": "台前县" }, { "label": "410928", "value": "濮阳县" }] }, { "label": "4110", "value": "许昌市", "children": [{ "label": "411002", "value": "魏都区" }, { "label": "411023", "value": "许昌县" }, { "label": "411024", "value": "鄢陵县" }, { "label": "411025", "value": "襄城县" }, { "label": "411081", "value": "禹州市" }, { "label": "411082", "value": "长葛市" }, { "label": "411003", "value": "建安区" }, { "label": "411071", "value": "许昌经济技术开发区" }] }, { "label": "4111", "value": "漯河市", "children": [{ "label": "411102", "value": "源汇区" }, { "label": "411103", "value": "郾城区" }, { "label": "411104", "value": "召陵区" }, { "label": "411121", "value": "舞阳县" }, { "label": "411122", "value": "临颍县" }] }, { "label": "4112", "value": "三门峡市", "children": [{ "label": "411202", "value": "湖滨区" }, { "label": "411203", "value": "陕州区" }, { "label": "411221", "value": "渑池县" }, { "label": "411224", "value": "卢氏县" }, { "label": "411281", "value": "义马市" }, { "label": "411282", "value": "灵宝市" }] }, { "label": "4113", "value": "南阳市", "children": [{ "label": "411302", "value": "宛城区" }, { "label": "411303", "value": "卧龙区" }, { "label": "411321", "value": "南召县" }, { "label": "411322", "value": "方城县" }, { "label": "411323", "value": "西峡县" }, { "label": "411324", "value": "镇平县" }, { "label": "411325", "value": "内乡县" }, { "label": "411326", "value": "淅川县" }, { "label": "411327", "value": "社旗县" }, { "label": "411328", "value": "唐河县" }, { "label": "411329", "value": "新野县" }, { "label": "411330", "value": "桐柏县" }, { "label": "411381", "value": "邓州市" }] }, { "label": "4114", "value": "商丘市", "children": [{ "label": "411402", "value": "梁园区" }, { "label": "411403", "value": "睢阳区" }, { "label": "411421", "value": "民权县" }, { "label": "411422", "value": "睢县" }, { "label": "411423", "value": "宁陵县" }, { "label": "411424", "value": "柘城县" }, { "label": "411425", "value": "虞城县" }, { "label": "411426", "value": "夏邑县" }, { "label": "411481", "value": "永城市" }] }, { "label": "4115", "value": "信阳市", "children": [{ "label": "411502", "value": "浉河区" }, { "label": "411503", "value": "平桥区" }, { "label": "411521", "value": "罗山县" }, { "label": "411522", "value": "光山县" }, { "label": "411523", "value": "新县" }, { "label": "411524", "value": "商城县" }, { "label": "411525", "value": "固始县" }, { "label": "411526", "value": "潢川县" }, { "label": "411527", "value": "淮滨县" }, { "label": "411528", "value": "息县" }] }, { "label": "4116", "value": "周口市", "children": [{ "label": "411602", "value": "川汇区" }, { "label": "411621", "value": "扶沟县" }, { "label": "411622", "value": "西华县" }, { "label": "411623", "value": "商水县" }, { "label": "411624", "value": "沈丘县" }, { "label": "411625", "value": "郸城县" }, { "label": "411626", "value": "淮阳县" }, { "label": "411627", "value": "太康县" }, { "label": "411628", "value": "鹿邑县" }, { "label": "411681", "value": "项城市" }] }, { "label": "4117", "value": "驻马店市", "children": [{ "label": "411702", "value": "驿城区" }, { "label": "411721", "value": "西平县" }, { "label": "411722", "value": "上蔡县" }, { "label": "411723", "value": "平舆县" }, { "label": "411724", "value": "正阳县" }, { "label": "411725", "value": "确山县" }, { "label": "411726", "value": "泌阳县" }, { "label": "411727", "value": "汝南县" }, { "label": "411728", "value": "遂平县" }, { "label": "411729", "value": "新蔡县" }] }, { "label": "4190", "value": "省直辖县级", "children": [{ "label": "419001", "value": "济源市" }] }] }, { "label": "42", "value": "湖北省", "children": [{ "label": "4201", "value": "武汉市", "children": [{ "label": "420102", "value": "江岸区" }, { "label": "420103", "value": "江汉区" }, { "label": "420104", "value": "硚口区" }, { "label": "420105", "value": "汉阳区" }, { "label": "420106", "value": "武昌区" }, { "label": "420107", "value": "青山区" }, { "label": "420111", "value": "洪山区" }, { "label": "420112", "value": "东西湖区" }, { "label": "420113", "value": "汉南区" }, { "label": "420114", "value": "蔡甸区" }, { "label": "420115", "value": "江夏区" }, { "label": "420116", "value": "黄陂区" }, { "label": "420117", "value": "新洲区" }] }, { "label": "4202", "value": "黄石市", "children": [{ "label": "420202", "value": "黄石港区" }, { "label": "420203", "value": "西塞山区" }, { "label": "420204", "value": "下陆区" }, { "label": "420205", "value": "铁山区" }, { "label": "420222", "value": "阳新县" }, { "label": "420281", "value": "大冶市" }] }, { "label": "4203", "value": "十堰市", "children": [{ "label": "420302", "value": "茅箭区" }, { "label": "420303", "value": "张湾区" }, { "label": "420304", "value": "郧阳区" }, { "label": "420322", "value": "郧西县" }, { "label": "420323", "value": "竹山县" }, { "label": "420324", "value": "竹溪县" }, { "label": "420325", "value": "房县" }, { "label": "420381", "value": "丹江口市" }] }, { "label": "4205", "value": "宜昌市", "children": [{ "label": "420502", "value": "西陵区" }, { "label": "420503", "value": "伍家岗区" }, { "label": "420504", "value": "点军区" }, { "label": "420505", "value": "猇亭区" }, { "label": "420506", "value": "夷陵区" }, { "label": "420525", "value": "远安县" }, { "label": "420526", "value": "兴山县" }, { "label": "420527", "value": "秭归县" }, { "label": "420528", "value": "长阳土家族自治县" }, { "label": "420529", "value": "五峰土家族自治县" }, { "label": "420581", "value": "宜都市" }, { "label": "420582", "value": "当阳市" }, { "label": "420583", "value": "枝江市" }] }, { "label": "4206", "value": "襄阳市", "children": [{ "label": "420602", "value": "襄城区" }, { "label": "420606", "value": "樊城区" }, { "label": "420607", "value": "襄州区" }, { "label": "420624", "value": "南漳县" }, { "label": "420625", "value": "谷城县" }, { "label": "420626", "value": "保康县" }, { "label": "420682", "value": "老河口市" }, { "label": "420683", "value": "枣阳市" }, { "label": "420684", "value": "宜城市" }] }, { "label": "4207", "value": "鄂州市", "children": [{ "label": "420702", "value": "梁子湖区" }, { "label": "420703", "value": "华容区" }, { "label": "420704", "value": "鄂城区" }] }, { "label": "4208", "value": "荆门市", "children": [{ "label": "420802", "value": "东宝区" }, { "label": "420804", "value": "掇刀区" }, { "label": "420821", "value": "京山县" }, { "label": "420822", "value": "沙洋县" }, { "label": "420881", "value": "钟祥市" }] }, { "label": "4209", "value": "孝感市", "children": [{ "label": "420902", "value": "孝南区" }, { "label": "420921", "value": "孝昌县" }, { "label": "420922", "value": "大悟县" }, { "label": "420923", "value": "云梦县" }, { "label": "420981", "value": "应城市" }, { "label": "420982", "value": "安陆市" }, { "label": "420984", "value": "汉川市" }] }, { "label": "4210", "value": "荆州市", "children": [{ "label": "421002", "value": "沙市区" }, { "label": "421003", "value": "荆州区" }, { "label": "421022", "value": "公安县" }, { "label": "421023", "value": "监利县" }, { "label": "421024", "value": "江陵县" }, { "label": "421081", "value": "石首市" }, { "label": "421083", "value": "洪湖市" }, { "label": "421087", "value": "松滋市" }] }, { "label": "4211", "value": "黄冈市", "children": [{ "label": "421102", "value": "黄州区" }, { "label": "421121", "value": "团风县" }, { "label": "421122", "value": "红安县" }, { "label": "421123", "value": "罗田县" }, { "label": "421124", "value": "英山县" }, { "label": "421125", "value": "浠水县" }, { "label": "421126", "value": "蕲春县" }, { "label": "421127", "value": "黄梅县" }, { "label": "421181", "value": "麻城市" }, { "label": "421182", "value": "武穴市" }] }, { "label": "4212", "value": "咸宁市", "children": [{ "label": "421202", "value": "咸安区" }, { "label": "421221", "value": "嘉鱼县" }, { "label": "421222", "value": "通城县" }, { "label": "421223", "value": "崇阳县" }, { "label": "421224", "value": "通山县" }, { "label": "421281", "value": "赤壁市" }] }, { "label": "4213", "value": "随州市", "children": [{ "label": "421303", "value": "曾都区" }, { "label": "421321", "value": "随县" }, { "label": "421381", "value": "广水市" }] }, { "label": "4228", "value": "恩施土家族苗族自治州", "children": [{ "label": "422801", "value": "恩施市" }, { "label": "422802", "value": "利川市" }, { "label": "422822", "value": "建始县" }, { "label": "422823", "value": "巴东县" }, { "label": "422825", "value": "宣恩县" }, { "label": "422826", "value": "咸丰县" }, { "label": "422827", "value": "来凤县" }, { "label": "422828", "value": "鹤峰县" }] }, { "label": "4290", "value": "省直辖县级", "children": [{ "label": "429004", "value": "仙桃市" }, { "label": "429005", "value": "潜江市" }, { "label": "429006", "value": "天门市" }, { "label": "429021", "value": "神农架林区" }] }] }, { "label": "43", "value": "湖南省", "children": [{ "label": "4301", "value": "长沙市", "children": [{ "label": "430102", "value": "芙蓉区" }, { "label": "430103", "value": "天心区" }, { "label": "430104", "value": "岳麓区" }, { "label": "430105", "value": "开福区" }, { "label": "430111", "value": "雨花区" }, { "label": "430112", "value": "望城区" }, { "label": "430121", "value": "长沙县" }, { "label": "430124", "value": "宁乡县" }, { "label": "430181", "value": "浏阳市" }] }, { "label": "4302", "value": "株洲市", "children": [{ "label": "430202", "value": "荷塘区" }, { "label": "430203", "value": "芦淞区" }, { "label": "430204", "value": "石峰区" }, { "label": "430211", "value": "天元区" }, { "label": "430221", "value": "株洲县" }, { "label": "430223", "value": "攸县" }, { "label": "430224", "value": "茶陵县" }, { "label": "430225", "value": "炎陵县" }, { "label": "430281", "value": "醴陵市" }] }, { "label": "4303", "value": "湘潭市", "children": [{ "label": "430302", "value": "雨湖区" }, { "label": "430304", "value": "岳塘区" }, { "label": "430321", "value": "湘潭县" }, { "label": "430381", "value": "湘乡市" }, { "label": "430382", "value": "韶山市" }] }, { "label": "4304", "value": "衡阳市", "children": [{ "label": "430405", "value": "珠晖区" }, { "label": "430406", "value": "雁峰区" }, { "label": "430407", "value": "石鼓区" }, { "label": "430408", "value": "蒸湘区" }, { "label": "430412", "value": "南岳区" }, { "label": "430421", "value": "衡阳县" }, { "label": "430422", "value": "衡南县" }, { "label": "430423", "value": "衡山县" }, { "label": "430424", "value": "衡东县" }, { "label": "430426", "value": "祁东县" }, { "label": "430481", "value": "耒阳市" }, { "label": "430482", "value": "常宁市" }] }, { "label": "4305", "value": "邵阳市", "children": [{ "label": "430502", "value": "双清区" }, { "label": "430503", "value": "大祥区" }, { "label": "430511", "value": "北塔区" }, { "label": "430521", "value": "邵东县" }, { "label": "430522", "value": "新邵县" }, { "label": "430523", "value": "邵阳县" }, { "label": "430524", "value": "隆回县" }, { "label": "430525", "value": "洞口县" }, { "label": "430527", "value": "绥宁县" }, { "label": "430528", "value": "新宁县" }, { "label": "430529", "value": "城步苗族自治县" }, { "label": "430581", "value": "武冈市" }] }, { "label": "4306", "value": "岳阳市", "children": [{ "label": "430602", "value": "岳阳楼区" }, { "label": "430603", "value": "云溪区" }, { "label": "430611", "value": "君山区" }, { "label": "430621", "value": "岳阳县" }, { "label": "430623", "value": "华容县" }, { "label": "430624", "value": "湘阴县" }, { "label": "430626", "value": "平江县" }, { "label": "430681", "value": "汨罗市" }, { "label": "430682", "value": "临湘市" }] }, { "label": "4307", "value": "常德市", "children": [{ "label": "430702", "value": "武陵区" }, { "label": "430703", "value": "鼎城区" }, { "label": "430721", "value": "安乡县" }, { "label": "430722", "value": "汉寿县" }, { "label": "430723", "value": "澧县" }, { "label": "430724", "value": "临澧县" }, { "label": "430725", "value": "桃源县" }, { "label": "430726", "value": "石门县" }, { "label": "430781", "value": "津市市" }] }, { "label": "4308", "value": "张家界市", "children": [{ "label": "430802", "value": "永定区" }, { "label": "430811", "value": "武陵源区" }, { "label": "430821", "value": "慈利县" }, { "label": "430822", "value": "桑植县" }] }, { "label": "4309", "value": "益阳市", "children": [{ "label": "430902", "value": "资阳区" }, { "label": "430903", "value": "赫山区" }, { "label": "430921", "value": "南县" }, { "label": "430922", "value": "桃江县" }, { "label": "430923", "value": "安化县" }, { "label": "430981", "value": "沅江市" }] }, { "label": "4310", "value": "郴州市", "children": [{ "label": "431002", "value": "北湖区" }, { "label": "431003", "value": "苏仙区" }, { "label": "431021", "value": "桂阳县" }, { "label": "431022", "value": "宜章县" }, { "label": "431023", "value": "永兴县" }, { "label": "431024", "value": "嘉禾县" }, { "label": "431025", "value": "临武县" }, { "label": "431026", "value": "汝城县" }, { "label": "431027", "value": "桂东县" }, { "label": "431028", "value": "安仁县" }, { "label": "431081", "value": "资兴市" }] }, { "label": "4311", "value": "永州市", "children": [{ "label": "431102", "value": "零陵区" }, { "label": "431103", "value": "冷水滩区" }, { "label": "431121", "value": "祁阳县" }, { "label": "431122", "value": "东安县" }, { "label": "431123", "value": "双牌县" }, { "label": "431124", "value": "道县" }, { "label": "431125", "value": "江永县" }, { "label": "431126", "value": "宁远县" }, { "label": "431127", "value": "蓝山县" }, { "label": "431128", "value": "新田县" }, { "label": "431129", "value": "江华瑶族自治县" }] }, { "label": "4312", "value": "怀化市", "children": [{ "label": "431202", "value": "鹤城区" }, { "label": "431221", "value": "中方县" }, { "label": "431222", "value": "沅陵县" }, { "label": "431223", "value": "辰溪县" }, { "label": "431224", "value": "溆浦县" }, { "label": "431225", "value": "会同县" }, { "label": "431226", "value": "麻阳苗族自治县" }, { "label": "431227", "value": "新晃侗族自治县" }, { "label": "431228", "value": "芷江侗族自治县" }, { "label": "431229", "value": "靖州苗族侗族自治县" }, { "label": "431230", "value": "通道侗族自治县" }, { "label": "431281", "value": "洪江市" }] }, { "label": "4313", "value": "娄底市", "children": [{ "label": "431302", "value": "娄星区" }, { "label": "431321", "value": "双峰县" }, { "label": "431322", "value": "新化县" }, { "label": "431381", "value": "冷水江市" }, { "label": "431382", "value": "涟源市" }] }, { "label": "4331", "value": "湘西土家族苗族自治州", "children": [{ "label": "433101", "value": "吉首市" }, { "label": "433122", "value": "泸溪县" }, { "label": "433123", "value": "凤凰县" }, { "label": "433124", "value": "花垣县" }, { "label": "433125", "value": "保靖县" }, { "label": "433126", "value": "古丈县" }, { "label": "433127", "value": "永顺县" }, { "label": "433130", "value": "龙山县" }] }] }, { "label": "44", "value": "广东省", "children": [{ "label": "4401", "value": "广州市", "children": [{ "label": "440103", "value": "荔湾区" }, { "label": "440104", "value": "越秀区" }, { "label": "440105", "value": "海珠区" }, { "label": "440106", "value": "天河区" }, { "label": "440111", "value": "白云区" }, { "label": "440112", "value": "黄埔区" }, { "label": "440113", "value": "番禺区" }, { "label": "440114", "value": "花都区" }, { "label": "440115", "value": "南沙区" }, { "label": "440117", "value": "从化区" }, { "label": "440118", "value": "增城区" }] }, { "label": "4402", "value": "韶关市", "children": [{ "label": "440203", "value": "武江区" }, { "label": "440204", "value": "浈江区" }, { "label": "440205", "value": "曲江区" }, { "label": "440222", "value": "始兴县" }, { "label": "440224", "value": "仁化县" }, { "label": "440229", "value": "翁源县" }, { "label": "440232", "value": "乳源瑶族自治县" }, { "label": "440233", "value": "新丰县" }, { "label": "440281", "value": "乐昌市" }, { "label": "440282", "value": "南雄市" }] }, { "label": "4403", "value": "深圳市", "children": [{ "label": "440303", "value": "罗湖区" }, { "label": "440304", "value": "福田区" }, { "label": "440305", "value": "南山区" }, { "label": "440306", "value": "宝安区" }, { "label": "440307", "value": "龙岗区" }, { "label": "440308", "value": "盐田区" }, { "label": "440310", "value": "坪山区" }, { "label": "440309", "value": "龙华区" }] }, { "label": "4404", "value": "珠海市", "children": [{ "label": "440402", "value": "香洲区" }, { "label": "440403", "value": "斗门区" }, { "label": "440404", "value": "金湾区" }] }, { "label": "4405", "value": "汕头市", "children": [{ "label": "440507", "value": "龙湖区" }, { "label": "440511", "value": "金平区" }, { "label": "440512", "value": "濠江区" }, { "label": "440513", "value": "潮阳区" }, { "label": "440514", "value": "潮南区" }, { "label": "440515", "value": "澄海区" }, { "label": "440523", "value": "南澳县" }] }, { "label": "4406", "value": "佛山市", "children": [{ "label": "440604", "value": "禅城区" }, { "label": "440605", "value": "南海区" }, { "label": "440606", "value": "顺德区" }, { "label": "440607", "value": "三水区" }, { "label": "440608", "value": "高明区" }] }, { "label": "4407", "value": "江门市", "children": [{ "label": "440703", "value": "蓬江区" }, { "label": "440704", "value": "江海区" }, { "label": "440705", "value": "新会区" }, { "label": "440781", "value": "台山市" }, { "label": "440783", "value": "开平市" }, { "label": "440784", "value": "鹤山市" }, { "label": "440785", "value": "恩平市" }] }, { "label": "4408", "value": "湛江市", "children": [{ "label": "440802", "value": "赤坎区" }, { "label": "440803", "value": "霞山区" }, { "label": "440804", "value": "坡头区" }, { "label": "440811", "value": "麻章区" }, { "label": "440823", "value": "遂溪县" }, { "label": "440825", "value": "徐闻县" }, { "label": "440881", "value": "廉江市" }, { "label": "440882", "value": "雷州市" }, { "label": "440883", "value": "吴川市" }] }, { "label": "4409", "value": "茂名市", "children": [{ "label": "440902", "value": "茂南区" }, { "label": "440904", "value": "电白区" }, { "label": "440981", "value": "高州市" }, { "label": "440982", "value": "化州市" }, { "label": "440983", "value": "信宜市" }] }, { "label": "4412", "value": "肇庆市", "children": [{ "label": "441202", "value": "端州区" }, { "label": "441203", "value": "鼎湖区" }, { "label": "441204", "value": "高要区" }, { "label": "441223", "value": "广宁县" }, { "label": "441224", "value": "怀集县" }, { "label": "441225", "value": "封开县" }, { "label": "441226", "value": "德庆县" }, { "label": "441284", "value": "四会市" }] }, { "label": "4413", "value": "惠州市", "children": [{ "label": "441302", "value": "惠城区" }, { "label": "441303", "value": "惠阳区" }, { "label": "441322", "value": "博罗县" }, { "label": "441323", "value": "惠东县" }, { "label": "441324", "value": "龙门县" }] }, { "label": "4414", "value": "梅州市", "children": [{ "label": "441402", "value": "梅江区" }, { "label": "441403", "value": "梅县区" }, { "label": "441422", "value": "大埔县" }, { "label": "441423", "value": "丰顺县" }, { "label": "441424", "value": "五华县" }, { "label": "441426", "value": "平远县" }, { "label": "441427", "value": "蕉岭县" }, { "label": "441481", "value": "兴宁市" }] }, { "label": "4415", "value": "汕尾市", "children": [{ "label": "441502", "value": "城区" }, { "label": "441521", "value": "海丰县" }, { "label": "441523", "value": "陆河县" }, { "label": "441581", "value": "陆丰市" }] }, { "label": "4416", "value": "河源市", "children": [{ "label": "441602", "value": "源城区" }, { "label": "441621", "value": "紫金县" }, { "label": "441622", "value": "龙川县" }, { "label": "441623", "value": "连平县" }, { "label": "441624", "value": "和平县" }, { "label": "441625", "value": "东源县" }] }, { "label": "4417", "value": "阳江市", "children": [{ "label": "441702", "value": "江城区" }, { "label": "441704", "value": "阳东区" }, { "label": "441721", "value": "阳西县" }, { "label": "441781", "value": "阳春市" }] }, { "label": "4418", "value": "清远市", "children": [{ "label": "441802", "value": "清城区" }, { "label": "441803", "value": "清新区" }, { "label": "441821", "value": "佛冈县" }, { "label": "441823", "value": "阳山县" }, { "label": "441825", "value": "连山壮族瑶族自治县" }, { "label": "441826", "value": "连南瑶族自治县" }, { "label": "441881", "value": "英德市" }, { "label": "441882", "value": "连州市" }] }, { "label": "4419", "value": "东莞市", "children": [{ "label": "441900", "value": "市辖镇" }] }, { "label": "4420", "value": "中山市", "children": [{ "label": "442000", "value": "市辖镇" }] }, { "label": "4451", "value": "潮州市", "children": [{ "label": "445102", "value": "湘桥区" }, { "label": "445103", "value": "潮安区" }, { "label": "445122", "value": "饶平县" }] }, { "label": "4452", "value": "揭阳市", "children": [{ "label": "445202", "value": "榕城区" }, { "label": "445203", "value": "揭东区" }, { "label": "445222", "value": "揭西县" }, { "label": "445224", "value": "惠来县" }, { "label": "445281", "value": "普宁市" }] }, { "label": "4453", "value": "云浮市", "children": [{ "label": "445302", "value": "云城区" }, { "label": "445303", "value": "云安区" }, { "label": "445321", "value": "新兴县" }, { "label": "445322", "value": "郁南县" }, { "label": "445381", "value": "罗定市" }] }] }, { "label": "45", "value": "广西区", "children": [{ "label": "4501", "value": "南宁市", "children": [{ "label": "450102", "value": "兴宁区" }, { "label": "450103", "value": "青秀区" }, { "label": "450105", "value": "江南区" }, { "label": "450107", "value": "西乡塘区" }, { "label": "450108", "value": "良庆区" }, { "label": "450109", "value": "邕宁区" }, { "label": "450110", "value": "武鸣区" }, { "label": "450123", "value": "隆安县" }, { "label": "450124", "value": "马山县" }, { "label": "450125", "value": "上林县" }, { "label": "450126", "value": "宾阳县" }, { "label": "450127", "value": "横县" }] }, { "label": "4502", "value": "柳州市", "children": [{ "label": "450202", "value": "城中区" }, { "label": "450203", "value": "鱼峰区" }, { "label": "450204", "value": "柳南区" }, { "label": "450205", "value": "柳北区" }, { "label": "450206", "value": "柳江区" }, { "label": "450222", "value": "柳城县" }, { "label": "450223", "value": "鹿寨县" }, { "label": "450224", "value": "融安县" }, { "label": "450225", "value": "融水苗族自治县" }, { "label": "450226", "value": "三江侗族自治县" }] }, { "label": "4503", "value": "桂林市", "children": [{ "label": "450302", "value": "秀峰区" }, { "label": "450303", "value": "叠彩区" }, { "label": "450304", "value": "象山区" }, { "label": "450305", "value": "七星区" }, { "label": "450311", "value": "雁山区" }, { "label": "450312", "value": "临桂区" }, { "label": "450321", "value": "阳朔县" }, { "label": "450323", "value": "灵川县" }, { "label": "450324", "value": "全州县" }, { "label": "450325", "value": "兴安县" }, { "label": "450326", "value": "永福县" }, { "label": "450327", "value": "灌阳县" }, { "label": "450328", "value": "龙胜各族自治县" }, { "label": "450329", "value": "资源县" }, { "label": "450330", "value": "平乐县" }, { "label": "450331", "value": "荔浦县" }, { "label": "450332", "value": "恭城瑶族自治县" }] }, { "label": "4504", "value": "梧州市", "children": [{ "label": "450403", "value": "万秀区" }, { "label": "450405", "value": "长洲区" }, { "label": "450406", "value": "龙圩区" }, { "label": "450421", "value": "苍梧县" }, { "label": "450422", "value": "藤县" }, { "label": "450423", "value": "蒙山县" }, { "label": "450481", "value": "岑溪市" }] }, { "label": "4505", "value": "北海市", "children": [{ "label": "450502", "value": "海城区" }, { "label": "450503", "value": "银海区" }, { "label": "450512", "value": "铁山港区" }, { "label": "450521", "value": "合浦县" }] }, { "label": "4506", "value": "防城港市", "children": [{ "label": "450602", "value": "港口区" }, { "label": "450603", "value": "防城区" }, { "label": "450621", "value": "上思县" }, { "label": "450681", "value": "东兴市" }] }, { "label": "4507", "value": "钦州市", "children": [{ "label": "450702", "value": "钦南区" }, { "label": "450703", "value": "钦北区" }, { "label": "450721", "value": "灵山县" }, { "label": "450722", "value": "浦北县" }] }, { "label": "4508", "value": "贵港市", "children": [{ "label": "450802", "value": "港北区" }, { "label": "450803", "value": "港南区" }, { "label": "450804", "value": "覃塘区" }, { "label": "450821", "value": "平南县" }, { "label": "450881", "value": "桂平市" }] }, { "label": "4509", "value": "玉林市", "children": [{ "label": "450902", "value": "玉州区" }, { "label": "450903", "value": "福绵区" }, { "label": "450921", "value": "容县" }, { "label": "450922", "value": "陆川县" }, { "label": "450923", "value": "博白县" }, { "label": "450924", "value": "兴业县" }, { "label": "450981", "value": "北流市" }] }, { "label": "4510", "value": "百色市", "children": [{ "label": "451002", "value": "右江区" }, { "label": "451021", "value": "田阳县" }, { "label": "451022", "value": "田东县" }, { "label": "451023", "value": "平果县" }, { "label": "451024", "value": "德保县" }, { "label": "451026", "value": "那坡县" }, { "label": "451027", "value": "凌云县" }, { "label": "451028", "value": "乐业县" }, { "label": "451029", "value": "田林县" }, { "label": "451030", "value": "西林县" }, { "label": "451031", "value": "隆林各族自治县" }, { "label": "451081", "value": "靖西市" }] }, { "label": "4511", "value": "贺州市", "children": [{ "label": "451102", "value": "八步区" }, { "label": "451103", "value": "平桂区" }, { "label": "451121", "value": "昭平县" }, { "label": "451122", "value": "钟山县" }, { "label": "451123", "value": "富川瑶族自治县" }] }, { "label": "4512", "value": "河池市", "children": [{ "label": "451202", "value": "金城江区" }, { "label": "451221", "value": "南丹县" }, { "label": "451222", "value": "天峨县" }, { "label": "451223", "value": "凤山县" }, { "label": "451224", "value": "东兰县" }, { "label": "451225", "value": "罗城仫佬族自治县" }, { "label": "451226", "value": "环江毛南族自治县" }, { "label": "451227", "value": "巴马瑶族自治县" }, { "label": "451228", "value": "都安瑶族自治县" }, { "label": "451229", "value": "大化瑶族自治县" }, { "label": "451281", "value": "宜州市" }] }, { "label": "4513", "value": "来宾市", "children": [{ "label": "451302", "value": "兴宾区" }, { "label": "451321", "value": "忻城县" }, { "label": "451322", "value": "象州县" }, { "label": "451323", "value": "武宣县" }, { "label": "451324", "value": "金秀瑶族自治县" }, { "label": "451381", "value": "合山市" }] }, { "label": "4514", "value": "崇左市", "children": [{ "label": "451402", "value": "江州区" }, { "label": "451421", "value": "扶绥县" }, { "label": "451422", "value": "宁明县" }, { "label": "451423", "value": "龙州县" }, { "label": "451424", "value": "大新县" }, { "label": "451425", "value": "天等县" }, { "label": "451481", "value": "凭祥市" }] }] }, { "label": "46", "value": "海南省", "children": [{ "label": "4601", "value": "海口市", "children": [{ "label": "460105", "value": "秀英区" }, { "label": "460106", "value": "龙华区" }, { "label": "460107", "value": "琼山区" }, { "label": "460108", "value": "美兰区" }] }, { "label": "4602", "value": "三亚市", "children": [{ "label": "460201", "value": "市辖区" }, { "label": "460202", "value": "海棠区" }, { "label": "460203", "value": "吉阳区" }, { "label": "460204", "value": "天涯区" }, { "label": "460205", "value": "崖州区" }] }, { "label": "4603", "value": "三沙市", "children": [{ "label": "460321", "value": "西沙群岛" }, { "label": "460322", "value": "南沙群岛" }, { "label": "460323", "value": "中沙群岛的岛礁及其海域" }] }, { "label": "4604", "value": "儋州市", "children": [] }, { "label": "4690", "value": "省直辖县级行政区划", "children": [{ "label": "469001", "value": "五指山市" }, { "label": "469002", "value": "琼海市" }, { "label": "469005", "value": "文昌市" }, { "label": "469006", "value": "万宁市" }, { "label": "469007", "value": "东方市" }, { "label": "469021", "value": "定安县" }, { "label": "469022", "value": "屯昌县" }, { "label": "469023", "value": "澄迈县" }, { "label": "469024", "value": "临高县" }, { "label": "469025", "value": "白沙黎族自治县" }, { "label": "469026", "value": "昌江黎族自治县" }, { "label": "469027", "value": "乐东黎族自治县" }, { "label": "469028", "value": "陵水黎族自治县" }, { "label": "469029", "value": "保亭黎族苗族自治县" }, { "label": "469030", "value": "琼中黎族苗族自治县" }] }] }, { "label": "50", "value": "重庆市", "children": [{ "label": "5001", "value": "市辖区", "children": [{ "label": "500101", "value": "万州区" }, { "label": "500102", "value": "涪陵区" }, { "label": "500103", "value": "渝中区" }, { "label": "500104", "value": "大渡口区" }, { "label": "500105", "value": "江北区" }, { "label": "500106", "value": "沙坪坝区" }, { "label": "500107", "value": "九龙坡区" }, { "label": "500108", "value": "南岸区" }, { "label": "500109", "value": "北碚区" }, { "label": "500110", "value": "綦江区" }, { "label": "500111", "value": "大足区" }, { "label": "500112", "value": "渝北区" }, { "label": "500113", "value": "巴南区" }, { "label": "500114", "value": "黔江区" }, { "label": "500115", "value": "长寿区" }, { "label": "500116", "value": "江津区" }, { "label": "500117", "value": "合川区" }, { "label": "500118", "value": "永川区" }, { "label": "500119", "value": "南川区" }, { "label": "500120", "value": "璧山区" }, { "label": "500151", "value": "铜梁区" }, { "label": "500152", "value": "潼南区" }, { "label": "500153", "value": "荣昌区" }, { "label": "500154", "value": "开州区" }] }, { "label": "5002", "value": "县", "children": [{ "label": "500228", "value": "梁平县" }, { "label": "500229", "value": "城口县" }, { "label": "500230", "value": "丰都县" }, { "label": "500231", "value": "垫江县" }, { "label": "500232", "value": "武隆县" }, { "label": "500233", "value": "忠县" }, { "label": "500235", "value": "云阳县" }, { "label": "500236", "value": "奉节县" }, { "label": "500237", "value": "巫山县" }, { "label": "500238", "value": "巫溪县" }, { "label": "500240", "value": "石柱土家族自治县" }, { "label": "500241", "value": "秀山土家族苗族自治县" }, { "label": "500242", "value": "酉阳土家族苗族自治县" }, { "label": "500243", "value": "彭水苗族土家族自治县" }] }] }, { "label": "51", "value": "四川省", "children": [{ "label": "5101", "value": "成都市", "children": [{ "label": "510104", "value": "锦江区" }, { "label": "510105", "value": "青羊区" }, { "label": "510106", "value": "金牛区" }, { "label": "510107", "value": "武侯区" }, { "label": "510108", "value": "成华区" }, { "label": "510112", "value": "龙泉驿区" }, { "label": "510113", "value": "青白江区" }, { "label": "510114", "value": "新都区" }, { "label": "510115", "value": "温江区" }, { "label": "510116", "value": "双流区" }, { "label": "510121", "value": "金堂县" }, { "label": "510124", "value": "郫县" }, { "label": "510129", "value": "大邑县" }, { "label": "510131", "value": "蒲江县" }, { "label": "510132", "value": "新津县" }, { "label": "510181", "value": "都江堰市" }, { "label": "510182", "value": "彭州市" }, { "label": "510183", "value": "邛崃市" }, { "label": "510184", "value": "崇州市" }, { "label": "510185", "value": "简阳市" }] }, { "label": "5103", "value": "自贡市", "children": [{ "label": "510302", "value": "自流井区" }, { "label": "510303", "value": "贡井区" }, { "label": "510304", "value": "大安区" }, { "label": "510311", "value": "沿滩区" }, { "label": "510321", "value": "荣县" }, { "label": "510322", "value": "富顺县" }] }, { "label": "5104", "value": "攀枝花市", "children": [{ "label": "510402", "value": "东区" }, { "label": "510403", "value": "西区" }, { "label": "510411", "value": "仁和区" }, { "label": "510421", "value": "米易县" }, { "label": "510422", "value": "盐边县" }] }, { "label": "5105", "value": "泸州市", "children": [{ "label": "510502", "value": "江阳区" }, { "label": "510503", "value": "纳溪区" }, { "label": "510504", "value": "龙马潭区" }, { "label": "510521", "value": "泸县" }, { "label": "510522", "value": "合江县" }, { "label": "510524", "value": "叙永县" }, { "label": "510525", "value": "古蔺县" }] }, { "label": "5106", "value": "德阳市", "children": [{ "label": "510603", "value": "旌阳区" }, { "label": "510623", "value": "中江县" }, { "label": "510626", "value": "罗江县" }, { "label": "510681", "value": "广汉市" }, { "label": "510682", "value": "什邡市" }, { "label": "510683", "value": "绵竹市" }] }, { "label": "5107", "value": "绵阳市", "children": [{ "label": "510703", "value": "涪城区" }, { "label": "510704", "value": "游仙区" }, { "label": "510705", "value": "安州区" }, { "label": "510722", "value": "三台县" }, { "label": "510723", "value": "盐亭县" }, { "label": "510725", "value": "梓潼县" }, { "label": "510726", "value": "北川羌族自治县" }, { "label": "510727", "value": "平武县" }, { "label": "510781", "value": "江油市" }] }, { "label": "5108", "value": "广元市", "children": [{ "label": "510802", "value": "利州区" }, { "label": "510811", "value": "昭化区" }, { "label": "510812", "value": "朝天区" }, { "label": "510821", "value": "旺苍县" }, { "label": "510822", "value": "青川县" }, { "label": "510823", "value": "剑阁县" }, { "label": "510824", "value": "苍溪县" }] }, { "label": "5109", "value": "遂宁市", "children": [{ "label": "510903", "value": "船山区" }, { "label": "510904", "value": "安居区" }, { "label": "510921", "value": "蓬溪县" }, { "label": "510922", "value": "射洪县" }, { "label": "510923", "value": "大英县" }] }, { "label": "5110", "value": "内江市", "children": [{ "label": "511002", "value": "市中区" }, { "label": "511011", "value": "东兴区" }, { "label": "511024", "value": "威远县" }, { "label": "511025", "value": "资中县" }, { "label": "511028", "value": "隆昌县" }] }, { "label": "5111", "value": "乐山市", "children": [{ "label": "511102", "value": "市中区" }, { "label": "511111", "value": "沙湾区" }, { "label": "511112", "value": "五通桥区" }, { "label": "511113", "value": "金口河区" }, { "label": "511123", "value": "犍为县" }, { "label": "511124", "value": "井研县" }, { "label": "511126", "value": "夹江县" }, { "label": "511129", "value": "沐川县" }, { "label": "511132", "value": "峨边彝族自治县" }, { "label": "511133", "value": "马边彝族自治县" }, { "label": "511181", "value": "峨眉山市" }] }, { "label": "5113", "value": "南充市", "children": [{ "label": "511302", "value": "顺庆区" }, { "label": "511303", "value": "高坪区" }, { "label": "511304", "value": "嘉陵区" }, { "label": "511321", "value": "南部县" }, { "label": "511322", "value": "营山县" }, { "label": "511323", "value": "蓬安县" }, { "label": "511324", "value": "仪陇县" }, { "label": "511325", "value": "西充县" }, { "label": "511381", "value": "阆中市" }] }, { "label": "5114", "value": "眉山市", "children": [{ "label": "511402", "value": "东坡区" }, { "label": "511403", "value": "彭山区" }, { "label": "511421", "value": "仁寿县" }, { "label": "511423", "value": "洪雅县" }, { "label": "511424", "value": "丹棱县" }, { "label": "511425", "value": "青神县" }] }, { "label": "5115", "value": "宜宾市", "children": [{ "label": "511502", "value": "翠屏区" }, { "label": "511503", "value": "南溪区" }, { "label": "511521", "value": "宜宾县" }, { "label": "511523", "value": "江安县" }, { "label": "511524", "value": "长宁县" }, { "label": "511525", "value": "高县" }, { "label": "511526", "value": "珙县" }, { "label": "511527", "value": "筠连县" }, { "label": "511528", "value": "兴文县" }, { "label": "511529", "value": "屏山县" }] }, { "label": "5116", "value": "广安市", "children": [{ "label": "511602", "value": "广安区" }, { "label": "511603", "value": "前锋区" }, { "label": "511621", "value": "岳池县" }, { "label": "511622", "value": "武胜县" }, { "label": "511623", "value": "邻水县" }, { "label": "511681", "value": "华蓥市" }] }, { "label": "5117", "value": "达州市", "children": [{ "label": "511702", "value": "通川区" }, { "label": "511703", "value": "达川区" }, { "label": "511722", "value": "宣汉县" }, { "label": "511723", "value": "开江县" }, { "label": "511724", "value": "大竹县" }, { "label": "511725", "value": "渠县" }, { "label": "511781", "value": "万源市" }] }, { "label": "5118", "value": "雅安市", "children": [{ "label": "511802", "value": "雨城区" }, { "label": "511803", "value": "名山区" }, { "label": "511822", "value": "荥经县" }, { "label": "511823", "value": "汉源县" }, { "label": "511824", "value": "石棉县" }, { "label": "511825", "value": "天全县" }, { "label": "511826", "value": "芦山县" }, { "label": "511827", "value": "宝兴县" }] }, { "label": "5119", "value": "巴中市", "children": [{ "label": "511902", "value": "巴州区" }, { "label": "511903", "value": "恩阳区" }, { "label": "511921", "value": "通江县" }, { "label": "511922", "value": "南江县" }, { "label": "511923", "value": "平昌县" }] }, { "label": "5120", "value": "资阳市", "children": [{ "label": "512002", "value": "雁江区" }, { "label": "512021", "value": "安岳县" }, { "label": "512022", "value": "乐至县" }] }, { "label": "5132", "value": "阿坝藏族羌族自治州", "children": [{ "label": "513201", "value": "马尔康市" }, { "label": "513221", "value": "汶川县" }, { "label": "513222", "value": "理县" }, { "label": "513223", "value": "茂县" }, { "label": "513224", "value": "松潘县" }, { "label": "513225", "value": "九寨沟县" }, { "label": "513226", "value": "金川县" }, { "label": "513227", "value": "小金县" }, { "label": "513228", "value": "黑水县" }, { "label": "513230", "value": "壤塘县" }, { "label": "513231", "value": "阿坝县" }, { "label": "513232", "value": "若尔盖县" }, { "label": "513233", "value": "红原县" }] }, { "label": "5133", "value": "甘孜藏族自治州", "children": [{ "label": "513301", "value": "康定市" }, { "label": "513322", "value": "泸定县" }, { "label": "513323", "value": "丹巴县" }, { "label": "513324", "value": "九龙县" }, { "label": "513325", "value": "雅江县" }, { "label": "513326", "value": "道孚县" }, { "label": "513327", "value": "炉霍县" }, { "label": "513328", "value": "甘孜县" }, { "label": "513329", "value": "新龙县" }, { "label": "513330", "value": "德格县" }, { "label": "513331", "value": "白玉县" }, { "label": "513332", "value": "石渠县" }, { "label": "513333", "value": "色达县" }, { "label": "513334", "value": "理塘县" }, { "label": "513335", "value": "巴塘县" }, { "label": "513336", "value": "乡城县" }, { "label": "513337", "value": "稻城县" }, { "label": "513338", "value": "得荣县" }] }, { "label": "5134", "value": "凉山彝族自治州", "children": [{ "label": "513401", "value": "西昌市" }, { "label": "513422", "value": "木里藏族自治县" }, { "label": "513423", "value": "盐源县" }, { "label": "513424", "value": "德昌县" }, { "label": "513425", "value": "会理县" }, { "label": "513426", "value": "会东县" }, { "label": "513427", "value": "宁南县" }, { "label": "513428", "value": "普格县" }, { "label": "513429", "value": "布拖县" }, { "label": "513430", "value": "金阳县" }, { "label": "513431", "value": "昭觉县" }, { "label": "513432", "value": "喜德县" }, { "label": "513433", "value": "冕宁县" }, { "label": "513434", "value": "越西县" }, { "label": "513435", "value": "甘洛县" }, { "label": "513436", "value": "美姑县" }, { "label": "513437", "value": "雷波县" }] }] }, { "label": "52", "value": "贵州省", "children": [{ "label": "5201", "value": "贵阳市", "children": [{ "label": "520102", "value": "南明区" }, { "label": "520103", "value": "云岩区" }, { "label": "520111", "value": "花溪区" }, { "label": "520112", "value": "乌当区" }, { "label": "520113", "value": "白云区" }, { "label": "520115", "value": "观山湖区" }, { "label": "520121", "value": "开阳县" }, { "label": "520122", "value": "息烽县" }, { "label": "520123", "value": "修文县" }, { "label": "520181", "value": "清镇市" }] }, { "label": "5202", "value": "六盘水市", "children": [{ "label": "520201", "value": "钟山区" }, { "label": "520203", "value": "六枝特区" }, { "label": "520221", "value": "水城县" }, { "label": "520222", "value": "盘州" }] }, { "label": "5203", "value": "遵义市", "children": [{ "label": "520302", "value": "红花岗区" }, { "label": "520303", "value": "汇川区" }, { "label": "520304", "value": "播州区" }, { "label": "520322", "value": "桐梓县" }, { "label": "520323", "value": "绥阳县" }, { "label": "520324", "value": "正安县" }, { "label": "520325", "value": "道真仡佬族苗族自治县" }, { "label": "520326", "value": "务川仡佬族苗族自治县" }, { "label": "520327", "value": "凤冈县" }, { "label": "520328", "value": "湄潭县" }, { "label": "520329", "value": "余庆县" }, { "label": "520330", "value": "习水县" }, { "label": "520381", "value": "赤水市" }, { "label": "520382", "value": "仁怀市" }] }, { "label": "5204", "value": "安顺市", "children": [{ "label": "520402", "value": "西秀区" }, { "label": "520403", "value": "平坝区" }, { "label": "520422", "value": "普定县" }, { "label": "520423", "value": "镇宁布依族苗族自治县" }, { "label": "520424", "value": "关岭布依族苗族自治县" }, { "label": "520425", "value": "紫云苗族布依族自治县" }] }, { "label": "5205", "value": "毕节市", "children": [{ "label": "520502", "value": "七星关区" }, { "label": "520521", "value": "大方县" }, { "label": "520522", "value": "黔西县" }, { "label": "520523", "value": "金沙县" }, { "label": "520524", "value": "织金县" }, { "label": "520525", "value": "纳雍县" }, { "label": "520526", "value": "威宁彝族回族苗族自治县" }, { "label": "520527", "value": "赫章县" }] }, { "label": "5206", "value": "铜仁市", "children": [{ "label": "520602", "value": "碧江区" }, { "label": "520603", "value": "万山区" }, { "label": "520621", "value": "江口县" }, { "label": "520622", "value": "玉屏侗族自治县" }, { "label": "520623", "value": "石阡县" }, { "label": "520624", "value": "思南县" }, { "label": "520625", "value": "印江土家族苗族自治县" }, { "label": "520626", "value": "德江县" }, { "label": "520627", "value": "沿河土家族自治县" }, { "label": "520628", "value": "松桃苗族自治县" }] }, { "label": "5223", "value": "黔西南布依族苗族自治州", "children": [{ "label": "522301", "value": "兴义市" }, { "label": "522322", "value": "兴仁县" }, { "label": "522323", "value": "普安县" }, { "label": "522324", "value": "晴隆县" }, { "label": "522325", "value": "贞丰县" }, { "label": "522326", "value": "望谟县" }, { "label": "522327", "value": "册亨县" }, { "label": "522328", "value": "安龙县" }] }, { "label": "5226", "value": "黔东南苗族侗族自治州", "children": [{ "label": "522601", "value": "凯里市" }, { "label": "522622", "value": "黄平县" }, { "label": "522623", "value": "施秉县" }, { "label": "522624", "value": "三穗县" }, { "label": "522625", "value": "镇远县" }, { "label": "522626", "value": "岑巩县" }, { "label": "522627", "value": "天柱县" }, { "label": "522628", "value": "锦屏县" }, { "label": "522629", "value": "剑河县" }, { "label": "522630", "value": "台江县" }, { "label": "522631", "value": "黎平县" }, { "label": "522632", "value": "榕江县" }, { "label": "522633", "value": "从江县" }, { "label": "522634", "value": "雷山县" }, { "label": "522635", "value": "麻江县" }, { "label": "522636", "value": "丹寨县" }] }, { "label": "5227", "value": "黔南布依族苗族自治州", "children": [{ "label": "522701", "value": "都匀市" }, { "label": "522702", "value": "福泉市" }, { "label": "522722", "value": "荔波县" }, { "label": "522723", "value": "贵定县" }, { "label": "522725", "value": "瓮安县" }, { "label": "522726", "value": "独山县" }, { "label": "522727", "value": "平塘县" }, { "label": "522728", "value": "罗甸县" }, { "label": "522729", "value": "长顺县" }, { "label": "522730", "value": "龙里县" }, { "label": "522731", "value": "惠水县" }, { "label": "522732", "value": "三都水族自治县" }] }] }, { "label": "53", "value": "云南省", "children": [{ "label": "5301", "value": "昆明市", "children": [{ "label": "530102", "value": "五华区" }, { "label": "530103", "value": "盘龙区" }, { "label": "530111", "value": "官渡区" }, { "label": "530112", "value": "西山区" }, { "label": "530113", "value": "东川区" }, { "label": "530114", "value": "呈贡区" }, { "label": "530122", "value": "晋宁县" }, { "label": "530124", "value": "富民县" }, { "label": "530125", "value": "宜良县" }, { "label": "530126", "value": "石林彝族自治县" }, { "label": "530127", "value": "嵩明县" }, { "label": "530128", "value": "禄劝彝族苗族自治县" }, { "label": "530129", "value": "寻甸回族彝族自治县" }, { "label": "530181", "value": "安宁市" }] }, { "label": "5303", "value": "曲靖市", "children": [{ "label": "530302", "value": "麒麟区" }, { "label": "530303", "value": "沾益区" }, { "label": "530321", "value": "马龙县" }, { "label": "530322", "value": "陆良县" }, { "label": "530323", "value": "师宗县" }, { "label": "530324", "value": "罗平县" }, { "label": "530325", "value": "富源县" }, { "label": "530326", "value": "会泽县" }, { "label": "530381", "value": "宣威市" }] }, { "label": "5304", "value": "玉溪市", "children": [{ "label": "530402", "value": "红塔区" }, { "label": "530403", "value": "江川区" }, { "label": "530422", "value": "澄江县" }, { "label": "530423", "value": "通海县" }, { "label": "530424", "value": "华宁县" }, { "label": "530425", "value": "易门县" }, { "label": "530426", "value": "峨山彝族自治县" }, { "label": "530427", "value": "新平彝族傣族自治县" }, { "label": "530428", "value": "元江哈尼族彝族傣族自治县" }] }, { "label": "5305", "value": "保山市", "children": [{ "label": "530502", "value": "隆阳区" }, { "label": "530521", "value": "施甸县" }, { "label": "530523", "value": "龙陵县" }, { "label": "530524", "value": "昌宁县" }, { "label": "530581", "value": "腾冲市" }] }, { "label": "5306", "value": "昭通市", "children": [{ "label": "530602", "value": "昭阳区" }, { "label": "530621", "value": "鲁甸县" }, { "label": "530622", "value": "巧家县" }, { "label": "530623", "value": "盐津县" }, { "label": "530624", "value": "大关县" }, { "label": "530625", "value": "永善县" }, { "label": "530626", "value": "绥江县" }, { "label": "530627", "value": "镇雄县" }, { "label": "530628", "value": "彝良县" }, { "label": "530629", "value": "威信县" }, { "label": "530630", "value": "水富县" }] }, { "label": "5307", "value": "丽江市", "children": [{ "label": "530702", "value": "古城区" }, { "label": "530721", "value": "玉龙纳西族自治县" }, { "label": "530722", "value": "永胜县" }, { "label": "530723", "value": "华坪县" }, { "label": "530724", "value": "宁蒗彝族自治县" }] }, { "label": "5308", "value": "普洱市", "children": [{ "label": "530802", "value": "思茅区" }, { "label": "530821", "value": "宁洱哈尼族彝族自治县" }, { "label": "530822", "value": "墨江哈尼族自治县" }, { "label": "530823", "value": "景东彝族自治县" }, { "label": "530824", "value": "景谷傣族彝族自治县" }, { "label": "530825", "value": "镇沅彝族哈尼族拉祜族自治县" }, { "label": "530826", "value": "江城哈尼族彝族自治县" }, { "label": "530827", "value": "孟连傣族拉祜族佤族自治县" }, { "label": "530828", "value": "澜沧拉祜族自治县" }, { "label": "530829", "value": "西盟佤族自治县" }] }, { "label": "5309", "value": "临沧市", "children": [{ "label": "530902", "value": "临翔区" }, { "label": "530921", "value": "凤庆县" }, { "label": "530922", "value": "云县" }, { "label": "530923", "value": "永德县" }, { "label": "530924", "value": "镇康县" }, { "label": "530925", "value": "双江拉祜族佤族布朗族傣族自治县" }, { "label": "530926", "value": "耿马傣族佤族自治县" }, { "label": "530927", "value": "沧源佤族自治县" }] }, { "label": "5323", "value": "楚雄彝族自治州", "children": [{ "label": "532301", "value": "楚雄市" }, { "label": "532322", "value": "双柏县" }, { "label": "532323", "value": "牟定县" }, { "label": "532324", "value": "南华县" }, { "label": "532325", "value": "姚安县" }, { "label": "532326", "value": "大姚县" }, { "label": "532327", "value": "永仁县" }, { "label": "532328", "value": "元谋县" }, { "label": "532329", "value": "武定县" }, { "label": "532331", "value": "禄丰县" }] }, { "label": "5325", "value": "红河哈尼族彝族自治州", "children": [{ "label": "532501", "value": "个旧市" }, { "label": "532502", "value": "开远市" }, { "label": "532503", "value": "蒙自市" }, { "label": "532504", "value": "弥勒市" }, { "label": "532523", "value": "屏边苗族自治县" }, { "label": "532524", "value": "建水县" }, { "label": "532525", "value": "石屏县" }, { "label": "532527", "value": "泸西县" }, { "label": "532528", "value": "元阳县" }, { "label": "532529", "value": "红河县" }, { "label": "532530", "value": "金平苗族瑶族傣族自治县" }, { "label": "532531", "value": "绿春县" }, { "label": "532532", "value": "河口瑶族自治县" }] }, { "label": "5326", "value": "文山壮族苗族自治州", "children": [{ "label": "532601", "value": "文山市" }, { "label": "532622", "value": "砚山县" }, { "label": "532623", "value": "西畴县" }, { "label": "532624", "value": "麻栗坡县" }, { "label": "532625", "value": "马关县" }, { "label": "532626", "value": "丘北县" }, { "label": "532627", "value": "广南县" }, { "label": "532628", "value": "富宁县" }] }, { "label": "5328", "value": "西双版纳傣族自治州", "children": [{ "label": "532801", "value": "景洪市" }, { "label": "532822", "value": "勐海县" }, { "label": "532823", "value": "勐腊县" }] }, { "label": "5329", "value": "大理白族自治州", "children": [{ "label": "532901", "value": "大理市" }, { "label": "532922", "value": "漾濞彝族自治县" }, { "label": "532923", "value": "祥云县" }, { "label": "532924", "value": "宾川县" }, { "label": "532925", "value": "弥渡县" }, { "label": "532926", "value": "南涧彝族自治县" }, { "label": "532927", "value": "巍山彝族回族自治县" }, { "label": "532928", "value": "永平县" }, { "label": "532929", "value": "云龙县" }, { "label": "532930", "value": "洱源县" }, { "label": "532931", "value": "剑川县" }, { "label": "532932", "value": "鹤庆县" }] }, { "label": "5331", "value": "德宏傣族景颇族自治州", "children": [{ "label": "533102", "value": "瑞丽市" }, { "label": "533103", "value": "芒市" }, { "label": "533122", "value": "梁河县" }, { "label": "533123", "value": "盈江县" }, { "label": "533124", "value": "陇川县" }] }, { "label": "5333", "value": "怒江傈僳族自治州", "children": [{ "label": "533301", "value": "泸水市" }, { "label": "533323", "value": "福贡县" }, { "label": "533324", "value": "贡山独龙族怒族自治县" }, { "label": "533325", "value": "兰坪白族普米族自治县" }] }, { "label": "5334", "value": "迪庆藏族自治州", "children": [{ "label": "533401", "value": "香格里拉市" }, { "label": "533422", "value": "德钦县" }, { "label": "533423", "value": "维西傈僳族自治县" }] }] }, { "label": "54", "value": "西藏区", "children": [{ "label": "5401", "value": "拉萨市", "children": [{ "label": "540102", "value": "城关区" }, { "label": "540103", "value": "堆龙德庆区" }, { "label": "540121", "value": "林周县" }, { "label": "540122", "value": "当雄县" }, { "label": "540123", "value": "尼木县" }, { "label": "540124", "value": "曲水县" }, { "label": "540126", "value": "达孜县" }, { "label": "540127", "value": "墨竹工卡县" }] }, { "label": "5402", "value": "日喀则市", "children": [{ "label": "540202", "value": "桑珠孜区" }, { "label": "540221", "value": "南木林县" }, { "label": "540222", "value": "江孜县" }, { "label": "540223", "value": "定日县" }, { "label": "540224", "value": "萨迦县" }, { "label": "540225", "value": "拉孜县" }, { "label": "540226", "value": "昂仁县" }, { "label": "540227", "value": "谢通门县" }, { "label": "540228", "value": "白朗县" }, { "label": "540229", "value": "仁布县" }, { "label": "540230", "value": "康马县" }, { "label": "540231", "value": "定结县" }, { "label": "540232", "value": "仲巴县" }, { "label": "540233", "value": "亚东县" }, { "label": "540234", "value": "吉隆县" }, { "label": "540235", "value": "聂拉木县" }, { "label": "540236", "value": "萨嘎县" }, { "label": "540237", "value": "岗巴县" }] }, { "label": "5403", "value": "昌都市", "children": [{ "label": "540302", "value": "卡若区" }, { "label": "540321", "value": "江达县" }, { "label": "540322", "value": "贡觉县" }, { "label": "540323", "value": "类乌齐县" }, { "label": "540324", "value": "丁青县" }, { "label": "540325", "value": "察雅县" }, { "label": "540326", "value": "八宿县" }, { "label": "540327", "value": "左贡县" }, { "label": "540328", "value": "芒康县" }, { "label": "540329", "value": "洛隆县" }, { "label": "540330", "value": "边坝县" }] }, { "label": "5404", "value": "林芝市", "children": [{ "label": "540402", "value": "巴宜区" }, { "label": "540421", "value": "工布江达县" }, { "label": "540422", "value": "米林县" }, { "label": "540423", "value": "墨脱县" }, { "label": "540424", "value": "波密县" }, { "label": "540425", "value": "察隅县" }, { "label": "540426", "value": "朗县" }] }, { "label": "5405", "value": "山南市", "children": [{ "label": "540502", "value": "乃东区" }, { "label": "540521", "value": "扎囊县" }, { "label": "540522", "value": "贡嘎县" }, { "label": "540523", "value": "桑日县" }, { "label": "540524", "value": "琼结县" }, { "label": "540525", "value": "曲松县" }, { "label": "540526", "value": "措美县" }, { "label": "540527", "value": "洛扎县" }, { "label": "540528", "value": "加查县" }, { "label": "540529", "value": "隆子县" }, { "label": "540530", "value": "错那县" }, { "label": "540531", "value": "浪卡子县" }] }, { "label": "5424", "value": "那曲地区", "children": [{ "label": "542421", "value": "那曲县" }, { "label": "542422", "value": "嘉黎县" }, { "label": "542423", "value": "比如县" }, { "label": "542424", "value": "聂荣县" }, { "label": "542425", "value": "安多县" }, { "label": "542426", "value": "申扎县" }, { "label": "542427", "value": "索县" }, { "label": "542428", "value": "班戈县" }, { "label": "542429", "value": "巴青县" }, { "label": "542430", "value": "尼玛县" }, { "label": "542431", "value": "双湖县" }] }, { "label": "5425", "value": "阿里地区", "children": [{ "label": "542521", "value": "普兰县" }, { "label": "542522", "value": "札达县" }, { "label": "542523", "value": "噶尔县" }, { "label": "542524", "value": "日土县" }, { "label": "542525", "value": "革吉县" }, { "label": "542526", "value": "改则县" }, { "label": "542527", "value": "措勤县" }] }] }, { "label": "61", "value": "陕西省", "children": [{ "label": "6101", "value": "西安市", "children": [{ "label": "610102", "value": "新城区" }, { "label": "610103", "value": "碑林区" }, { "label": "610104", "value": "莲湖区" }, { "label": "610111", "value": "灞桥区" }, { "label": "610112", "value": "未央区" }, { "label": "610113", "value": "雁塔区" }, { "label": "610114", "value": "阎良区" }, { "label": "610115", "value": "临潼区" }, { "label": "610116", "value": "长安区" }, { "label": "610117", "value": "高陵区" }, { "label": "610122", "value": "蓝田县" }, { "label": "610124", "value": "周至县" }, { "label": "610125", "value": "户县" }] }, { "label": "6102", "value": "铜川市", "children": [{ "label": "610202", "value": "王益区" }, { "label": "610203", "value": "印台区" }, { "label": "610204", "value": "耀州区" }, { "label": "610222", "value": "宜君县" }] }, { "label": "6103", "value": "宝鸡市", "children": [{ "label": "610302", "value": "渭滨区" }, { "label": "610303", "value": "金台区" }, { "label": "610304", "value": "陈仓区" }, { "label": "610322", "value": "凤翔县" }, { "label": "610323", "value": "岐山县" }, { "label": "610324", "value": "扶风县" }, { "label": "610326", "value": "眉县" }, { "label": "610327", "value": "陇县" }, { "label": "610328", "value": "千阳县" }, { "label": "610329", "value": "麟游县" }, { "label": "610330", "value": "凤县" }, { "label": "610331", "value": "太白县" }] }, { "label": "6104", "value": "咸阳市", "children": [{ "label": "610402", "value": "秦都区" }, { "label": "610403", "value": "杨陵区" }, { "label": "610404", "value": "渭城区" }, { "label": "610422", "value": "三原县" }, { "label": "610423", "value": "泾阳县" }, { "label": "610424", "value": "乾县" }, { "label": "610425", "value": "礼泉县" }, { "label": "610426", "value": "永寿县" }, { "label": "610427", "value": "彬县" }, { "label": "610428", "value": "长武县" }, { "label": "610429", "value": "旬邑县" }, { "label": "610430", "value": "淳化县" }, { "label": "610431", "value": "武功县" }, { "label": "610481", "value": "兴平市" }] }, { "label": "6105", "value": "渭南市", "children": [{ "label": "610502", "value": "临渭区" }, { "label": "610503", "value": "华州区" }, { "label": "610522", "value": "潼关县" }, { "label": "610523", "value": "大荔县" }, { "label": "610524", "value": "合阳县" }, { "label": "610525", "value": "澄城县" }, { "label": "610526", "value": "蒲城县" }, { "label": "610527", "value": "白水县" }, { "label": "610528", "value": "富平县" }, { "label": "610581", "value": "韩城市" }, { "label": "610582", "value": "华阴市" }] }, { "label": "6106", "value": "延安市", "children": [{ "label": "610602", "value": "宝塔区" }, { "label": "610603", "value": "安塞区" }, { "label": "610621", "value": "延长县" }, { "label": "610622", "value": "延川县" }, { "label": "610623", "value": "子长县" }, { "label": "610625", "value": "志丹县" }, { "label": "610626", "value": "吴起县" }, { "label": "610627", "value": "甘泉县" }, { "label": "610628", "value": "富县" }, { "label": "610629", "value": "洛川县" }, { "label": "610630", "value": "宜川县" }, { "label": "610631", "value": "黄龙县" }, { "label": "610632", "value": "黄陵县" }] }, { "label": "6107", "value": "汉中市", "children": [{ "label": "610702", "value": "汉台区" }, { "label": "610721", "value": "南郑县" }, { "label": "610722", "value": "城固县" }, { "label": "610723", "value": "洋县" }, { "label": "610724", "value": "西乡县" }, { "label": "610725", "value": "勉县" }, { "label": "610726", "value": "宁强县" }, { "label": "610727", "value": "略阳县" }, { "label": "610728", "value": "镇巴县" }, { "label": "610729", "value": "留坝县" }, { "label": "610730", "value": "佛坪县" }] }, { "label": "6108", "value": "榆林市", "children": [{ "label": "610802", "value": "榆阳区" }, { "label": "610803", "value": "横山区" }, { "label": "610821", "value": "神木县" }, { "label": "610822", "value": "府谷县" }, { "label": "610824", "value": "靖边县" }, { "label": "610825", "value": "定边县" }, { "label": "610826", "value": "绥德县" }, { "label": "610827", "value": "米脂县" }, { "label": "610828", "value": "佳县" }, { "label": "610829", "value": "吴堡县" }, { "label": "610830", "value": "清涧县" }, { "label": "610831", "value": "子洲县" }] }, { "label": "6109", "value": "安康市", "children": [{ "label": "610902", "value": "汉滨区" }, { "label": "610921", "value": "汉阴县" }, { "label": "610922", "value": "石泉县" }, { "label": "610923", "value": "宁陕县" }, { "label": "610924", "value": "紫阳县" }, { "label": "610925", "value": "岚皋县" }, { "label": "610926", "value": "平利县" }, { "label": "610927", "value": "镇坪县" }, { "label": "610928", "value": "旬阳县" }, { "label": "610929", "value": "白河县" }] }, { "label": "6110", "value": "商洛市", "children": [{ "label": "611002", "value": "商州区" }, { "label": "611021", "value": "洛南县" }, { "label": "611022", "value": "丹凤县" }, { "label": "611023", "value": "商南县" }, { "label": "611024", "value": "山阳县" }, { "label": "611025", "value": "镇安县" }, { "label": "611026", "value": "柞水县" }] }] }, { "label": "62", "value": "甘肃省", "children": [{ "label": "6201", "value": "兰州市", "children": [{ "label": "620102", "value": "城关区" }, { "label": "620103", "value": "七里河区" }, { "label": "620104", "value": "西固区" }, { "label": "620105", "value": "安宁区" }, { "label": "620111", "value": "红古区" }, { "label": "620121", "value": "永登县" }, { "label": "620122", "value": "皋兰县" }, { "label": "620123", "value": "榆中县" }] }, { "label": "6202", "value": "嘉峪关市", "children": [{ "label": "620201", "value": "市辖区" }] }, { "label": "6203", "value": "金昌市", "children": [{ "label": "620302", "value": "金川区" }, { "label": "620321", "value": "永昌县" }] }, { "label": "6204", "value": "白银市", "children": [{ "label": "620402", "value": "白银区" }, { "label": "620403", "value": "平川区" }, { "label": "620421", "value": "靖远县" }, { "label": "620422", "value": "会宁县" }, { "label": "620423", "value": "景泰县" }] }, { "label": "6205", "value": "天水市", "children": [{ "label": "620502", "value": "秦州区" }, { "label": "620503", "value": "麦积区" }, { "label": "620521", "value": "清水县" }, { "label": "620522", "value": "秦安县" }, { "label": "620523", "value": "甘谷县" }, { "label": "620524", "value": "武山县" }, { "label": "620525", "value": "张家川回族自治县" }] }, { "label": "6206", "value": "武威市", "children": [{ "label": "620602", "value": "凉州区" }, { "label": "620621", "value": "民勤县" }, { "label": "620622", "value": "古浪县" }, { "label": "620623", "value": "天祝藏族自治县" }] }, { "label": "6207", "value": "张掖市", "children": [{ "label": "620702", "value": "甘州区" }, { "label": "620721", "value": "肃南裕固族自治县" }, { "label": "620722", "value": "民乐县" }, { "label": "620723", "value": "临泽县" }, { "label": "620724", "value": "高台县" }, { "label": "620725", "value": "山丹县" }] }, { "label": "6208", "value": "平凉市", "children": [{ "label": "620802", "value": "崆峒区" }, { "label": "620821", "value": "泾川县" }, { "label": "620822", "value": "灵台县" }, { "label": "620823", "value": "崇信县" }, { "label": "620824", "value": "华亭县" }, { "label": "620825", "value": "庄浪县" }, { "label": "620826", "value": "静宁县" }] }, { "label": "6209", "value": "酒泉市", "children": [{ "label": "620902", "value": "肃州区" }, { "label": "620921", "value": "金塔县" }, { "label": "620922", "value": "瓜州县" }, { "label": "620923", "value": "肃北蒙古族自治县" }, { "label": "620924", "value": "阿克塞哈萨克族自治县" }, { "label": "620981", "value": "玉门市" }, { "label": "620982", "value": "敦煌市" }] }, { "label": "6210", "value": "庆阳市", "children": [{ "label": "621002", "value": "西峰区" }, { "label": "621021", "value": "庆城县" }, { "label": "621022", "value": "环县" }, { "label": "621023", "value": "华池县" }, { "label": "621024", "value": "合水县" }, { "label": "621025", "value": "正宁县" }, { "label": "621026", "value": "宁县" }, { "label": "621027", "value": "镇原县" }] }, { "label": "6211", "value": "定西市", "children": [{ "label": "621102", "value": "安定区" }, { "label": "621121", "value": "通渭县" }, { "label": "621122", "value": "陇西县" }, { "label": "621123", "value": "渭源县" }, { "label": "621124", "value": "临洮县" }, { "label": "621125", "value": "漳县" }, { "label": "621126", "value": "岷县" }] }, { "label": "6212", "value": "陇南市", "children": [{ "label": "621202", "value": "武都区" }, { "label": "621221", "value": "成县" }, { "label": "621222", "value": "文县" }, { "label": "621223", "value": "宕昌县" }, { "label": "621224", "value": "康县" }, { "label": "621225", "value": "西和县" }, { "label": "621226", "value": "礼县" }, { "label": "621227", "value": "徽县" }, { "label": "621228", "value": "两当县" }] }, { "label": "6229", "value": "临夏回族自治州", "children": [{ "label": "622901", "value": "临夏市" }, { "label": "622921", "value": "临夏县" }, { "label": "622922", "value": "康乐县" }, { "label": "622923", "value": "永靖县" }, { "label": "622924", "value": "广河县" }, { "label": "622925", "value": "和政县" }, { "label": "622926", "value": "东乡族自治县" }, { "label": "622927", "value": "积石山保安族东乡族撒拉族自治县" }] }, { "label": "6230", "value": "甘南藏族自治州", "children": [{ "label": "623001", "value": "合作市" }, { "label": "623021", "value": "临潭县" }, { "label": "623022", "value": "卓尼县" }, { "label": "623023", "value": "舟曲县" }, { "label": "623024", "value": "迭部县" }, { "label": "623025", "value": "玛曲县" }, { "label": "623026", "value": "碌曲县" }, { "label": "623027", "value": "夏河县" }] }] }, { "label": "63", "value": "青海省", "children": [{ "label": "6301", "value": "西宁市", "children": [{ "label": "630102", "value": "城东区" }, { "label": "630103", "value": "城中区" }, { "label": "630104", "value": "城西区" }, { "label": "630105", "value": "城北区" }, { "label": "630121", "value": "大通回族土族自治县" }, { "label": "630122", "value": "湟中县" }, { "label": "630123", "value": "湟源县" }] }, { "label": "6302", "value": "海东市", "children": [{ "label": "630202", "value": "乐都区" }, { "label": "630203", "value": "平安区" }, { "label": "630222", "value": "民和回族土族自治县" }, { "label": "630223", "value": "互助土族自治县" }, { "label": "630224", "value": "化隆回族自治县" }, { "label": "630225", "value": "循化撒拉族自治县" }] }, { "label": "6322", "value": "海北藏族自治州", "children": [{ "label": "632221", "value": "门源回族自治县" }, { "label": "632222", "value": "祁连县" }, { "label": "632223", "value": "海晏县" }, { "label": "632224", "value": "刚察县" }] }, { "label": "6323", "value": "黄南藏族自治州", "children": [{ "label": "632321", "value": "同仁县" }, { "label": "632322", "value": "尖扎县" }, { "label": "632323", "value": "泽库县" }, { "label": "632324", "value": "河南蒙古族自治县" }] }, { "label": "6325", "value": "海南藏族自治州", "children": [{ "label": "632521", "value": "共和县" }, { "label": "632522", "value": "同德县" }, { "label": "632523", "value": "贵德县" }, { "label": "632524", "value": "兴海县" }, { "label": "632525", "value": "贵南县" }] }, { "label": "6326", "value": "果洛藏族自治州", "children": [{ "label": "632621", "value": "玛沁县" }, { "label": "632622", "value": "班玛县" }, { "label": "632623", "value": "甘德县" }, { "label": "632624", "value": "达日县" }, { "label": "632625", "value": "久治县" }, { "label": "632626", "value": "玛多县" }] }, { "label": "6327", "value": "玉树藏族自治州", "children": [{ "label": "632701", "value": "玉树市" }, { "label": "632722", "value": "杂多县" }, { "label": "632723", "value": "称多县" }, { "label": "632724", "value": "治多县" }, { "label": "632725", "value": "囊谦县" }, { "label": "632726", "value": "曲麻莱县" }] }, { "label": "6328", "value": "海西蒙古族藏族自治州", "children": [{ "label": "632801", "value": "格尔木市" }, { "label": "632802", "value": "德令哈市" }, { "label": "632821", "value": "乌兰县" }, { "label": "632822", "value": "都兰县" }, { "label": "632823", "value": "天峻县" }] }] }, { "label": "64", "value": "宁夏区", "children": [{ "label": "6401", "value": "银川市", "children": [{ "label": "640104", "value": "兴庆区" }, { "label": "640105", "value": "西夏区" }, { "label": "640106", "value": "金凤区" }, { "label": "640121", "value": "永宁县" }, { "label": "640122", "value": "贺兰县" }, { "label": "640181", "value": "灵武市" }] }, { "label": "6402", "value": "石嘴山市", "children": [{ "label": "640202", "value": "大武口区" }, { "label": "640205", "value": "惠农区" }, { "label": "640221", "value": "平罗县" }] }, { "label": "6403", "value": "吴忠市", "children": [{ "label": "640302", "value": "利通区" }, { "label": "640303", "value": "红寺堡区" }, { "label": "640323", "value": "盐池县" }, { "label": "640324", "value": "同心县" }, { "label": "640381", "value": "青铜峡市" }] }, { "label": "6404", "value": "固原市", "children": [{ "label": "640402", "value": "原州区" }, { "label": "640422", "value": "西吉县" }, { "label": "640423", "value": "隆德县" }, { "label": "640424", "value": "泾源县" }, { "label": "640425", "value": "彭阳县" }] }, { "label": "6405", "value": "中卫市", "children": [{ "label": "640502", "value": "沙坡头区" }, { "label": "640521", "value": "中宁县" }, { "label": "640522", "value": "海原县" }] }] }, { "label": "65", "value": "新疆区", "children": [{ "label": "6501", "value": "乌鲁木齐市", "children": [{ "label": "650102", "value": "天山区" }, { "label": "650103", "value": "沙依巴克区" }, { "label": "650104", "value": "新市区" }, { "label": "650105", "value": "水磨沟区" }, { "label": "650106", "value": "头屯河区" }, { "label": "650107", "value": "达坂城区" }, { "label": "650109", "value": "米东区" }, { "label": "650121", "value": "乌鲁木齐县" }] }, { "label": "6502", "value": "克拉玛依市", "children": [{ "label": "650202", "value": "独山子区" }, { "label": "650203", "value": "克拉玛依区" }, { "label": "650204", "value": "白碱滩区" }, { "label": "650205", "value": "乌尔禾区" }] }, { "label": "6504", "value": "吐鲁番市", "children": [{ "label": "650402", "value": "高昌区" }, { "label": "650421", "value": "鄯善县" }, { "label": "650422", "value": "托克逊县" }] }, { "label": "6505", "value": "哈密市", "children": [{ "label": "650502", "value": "伊州区" }, { "label": "650521", "value": "巴里坤哈萨克自治县" }, { "label": "650522", "value": "伊吾县" }] }, { "label": "6523", "value": "昌吉回族自治州", "children": [{ "label": "652301", "value": "昌吉市" }, { "label": "652302", "value": "阜康市" }, { "label": "652323", "value": "呼图壁县" }, { "label": "652324", "value": "玛纳斯县" }, { "label": "652325", "value": "奇台县" }, { "label": "652327", "value": "吉木萨尔县" }, { "label": "652328", "value": "木垒哈萨克自治县" }] }, { "label": "6527", "value": "博尔塔拉蒙古自治州", "children": [{ "label": "652701", "value": "博乐市" }, { "label": "652702", "value": "阿拉山口市" }, { "label": "652722", "value": "精河县" }, { "label": "652723", "value": "温泉县" }] }, { "label": "6528", "value": "巴音郭楞蒙古自治州", "children": [{ "label": "652801", "value": "库尔勒市" }, { "label": "652822", "value": "轮台县" }, { "label": "652823", "value": "尉犁县" }, { "label": "652824", "value": "若羌县" }, { "label": "652825", "value": "且末县" }, { "label": "652826", "value": "焉耆回族自治县" }, { "label": "652827", "value": "和静县" }, { "label": "652828", "value": "和硕县" }, { "label": "652829", "value": "博湖县" }] }, { "label": "6529", "value": "阿克苏地区", "children": [{ "label": "652901", "value": "阿克苏市" }, { "label": "652922", "value": "温宿县" }, { "label": "652923", "value": "库车县" }, { "label": "652924", "value": "沙雅县" }, { "label": "652925", "value": "新和县" }, { "label": "652926", "value": "拜城县" }, { "label": "652927", "value": "乌什县" }, { "label": "652928", "value": "阿瓦提县" }, { "label": "652929", "value": "柯坪县" }] }, { "label": "6530", "value": "克孜勒苏柯尔克孜自治州", "children": [{ "label": "653001", "value": "阿图什市" }, { "label": "653022", "value": "阿克陶县" }, { "label": "653023", "value": "阿合奇县" }, { "label": "653024", "value": "乌恰县" }] }, { "label": "6531", "value": "喀什地区", "children": [{ "label": "653101", "value": "喀什市" }, { "label": "653121", "value": "疏附县" }, { "label": "653122", "value": "疏勒县" }, { "label": "653123", "value": "英吉沙县" }, { "label": "653124", "value": "泽普县" }, { "label": "653125", "value": "莎车县" }, { "label": "653126", "value": "叶城县" }, { "label": "653127", "value": "麦盖提县" }, { "label": "653128", "value": "岳普湖县" }, { "label": "653129", "value": "伽师县" }, { "label": "653130", "value": "巴楚县" }, { "label": "653131", "value": "塔什库尔干塔吉克自治县" }] }, { "label": "6532", "value": "和田地区", "children": [{ "label": "653201", "value": "和田市" }, { "label": "653221", "value": "和田县" }, { "label": "653222", "value": "墨玉县" }, { "label": "653223", "value": "皮山县" }, { "label": "653224", "value": "洛浦县" }, { "label": "653225", "value": "策勒县" }, { "label": "653226", "value": "于田县" }, { "label": "653227", "value": "民丰县" }] }, { "label": "6543", "value": "阿勒泰地区", "children": [{ "label": "654321", "value": "布尔津县" }, { "label": "654322", "value": "富蕴县" }, { "label": "654323", "value": "福海县" }, { "label": "654301", "value": "阿勒泰市" }, { "label": "654326", "value": "吉木乃县" }, { "label": "654325", "value": "青河县" }, { "label": "654324", "value": "哈巴河县" }] }, { "label": "6590", "value": "自治区直辖县级", "children": [{ "label": "659009", "value": "昆玉" }, { "label": "659008", "value": "可克达拉" }, { "label": "659005", "value": "北屯" }, { "label": "659006", "value": "铁门关市" }, { "label": "659004", "value": "五家渠市" }, { "label": "659003", "value": "图木舒克市" }, { "label": "659002", "value": "阿拉尔市" }, { "label": "659001", "value": "石河子市" }, { "label": "659007", "value": "双河" }] }, { "label": "6540", "value": "伊犁哈萨克自治州", "children": [{ "label": "654026", "value": "昭苏县" }, { "label": "654022", "value": "察布查尔锡伯自治县" }, { "label": "654021", "value": "伊宁县" }, { "label": "654004", "value": "霍尔果斯市" }, { "label": "654003", "value": "奎屯市" }, { "label": "654002", "value": "伊宁市" }, { "label": "654023", "value": "霍城县" }, { "label": "654024", "value": "巩留县" }, { "label": "654025", "value": "新源县" }, { "label": "654028", "value": "尼勒克县" }, { "label": "654027", "value": "特克斯县" }] }, { "label": "6542", "value": "塔城地区", "children": [{ "label": "654224", "value": "托里县" }, { "label": "654223", "value": "沙湾县" }, { "label": "654221", "value": "额敏县" }, { "label": "654225", "value": "裕民县" }, { "label": "654202", "value": "乌苏市" }, { "label": "654201", "value": "塔城市" }, { "label": "654226", "value": "和布克赛尔蒙古自治县" }] }] }] };var _default =
{ addr: addr };exports.default = _default;

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
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 353:
/*!*******************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/projects/firstProject_kaka/project/components/uni-icons/icons.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 4:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/projects/firstProject_kaka/project/pages.json ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map