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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"北申良品","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 11:
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

/***/ 12:
/*!***************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/common/util.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var until = {
  'showLoading': function showLoading(va) {
    uni.showLoading({
      mask: true,
      title: va });

  },
  'tokenOverdue': function tokenOverdue() {
    uni.showToast({
      title: '请先登录!',
      mask: true,
      icon: 'none',
      duration: 2000 });


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
      duration: 2000 });

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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"北申良品","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"北申良品","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"北申良品","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"北申良品","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 35:
/*!*****************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/common/common.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.toast = toast;exports.checkPhone = checkPhone;exports.checkPwd = checkPwd;exports.checkCode = checkCode;exports.checkIdCard = checkIdCard;exports.checkBankCard = checkBankCard;function toast(title) {
  uni.showToast({
    icon: 'none',
    title: title });

}
/**
   * 手机验证
   */
function checkPhone(value) {
  var reg = /^1\d{10}$/;
  if (reg.test(value)) {
    return true;
  }
  toast('手机号格式错误');
  return false;
}
/**
   * 密码验证
   */
function checkPwd(value) {
  if (value.length >= 6) {
    return true;
  }
  toast('密码必须大于6位');
  return false;
}
/**
   * 验证码验证
   */
function checkCode(value) {
  if (value.length == 5) {
    return true;
  }
  toast('验证码必须是5位数字');
  return false;
}
/**
   * 身份证验证
   */
function checkIdCard(value) {
  var reg = /^\d{15}|\d{18}$/;
  if (reg.test(value)) {
    return true;
  }
  toast('身份证必须是15或18位数字');
  return false;
}
/**
   * 银行卡验证
   */
function checkBankCard(value) {
  var reg = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{18})$/;
  if (reg.test(value)) {
    return true;
  }
  toast('请输入正确的银行卡号');
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 374:
/*!**************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/common/md5.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ 377);
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [],buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
     * @method hex
     * @memberof md5
     * @description Output hash as hex string
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} Hex string
     * @example
     * md5.hex('The quick brown fox jumps over the lazy dog');
     * // equal to
     * md5('The quick brown fox jumps over the lazy dog');
     */
  /**
         * @method digest
         * @memberof md5
         * @description Output hash as bytes array
         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
         * @returns {Array} Bytes array
         * @example
         * md5.digest('The quick brown fox jumps over the lazy dog');
         */
  /**
             * @method array
             * @memberof md5
             * @description Output hash as bytes array
             * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
             * @returns {Array} Bytes array
             * @example
             * md5.array('The quick brown fox jumps over the lazy dog');
             */
  /**
                 * @method arrayBuffer
                 * @memberof md5
                 * @description Output hash as ArrayBuffer
                 * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                 * @returns {ArrayBuffer} ArrayBuffer
                 * @example
                 * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
                 */
  /**
                     * @method buffer
                     * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
                     * @memberof md5
                     * @description Output hash as ArrayBuffer
                     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                     * @returns {ArrayBuffer} ArrayBuffer
                     * @example
                     * md5.buffer('The quick brown fox jumps over the lazy dog');
                     */
  /**
                         * @method base64
                         * @memberof md5
                         * @description Output hash as base64 string
                         * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
                         * @returns {String} base64 string
                         * @example
                         * md5.base64('The quick brown fox jumps over the lazy dog');
                         */
  var createOutputMethod = function createOutputMethod(outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
      * @method create
      * @memberof md5
      * @description Create Md5 object
      * @returns {Md5} Md5 object.
      * @example
      * var hash = md5.create();
      */
  /**
          * @method update
          * @memberof md5
          * @description Create and update Md5 object
          * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
          * @returns {Md5} Md5 object.
          * @example
          * var hash = md5.update('The quick brown fox jumps over the lazy dog');
          * // equal to
          * var hash = md5.create();
          * hash.update('The quick brown fox jumps over the lazy dog');
          */
  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function nodeWrap(method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
      message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };



  /**
      * Md5 class
      * @class Md5
      * @description This is internal class.
      * @see {@link md5.create}
      */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
     * @method update
     * @memberof Md5
     * @instance
     * @description Update hash
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {Md5} Md5 object.
     * @see {@link md5.update}
     */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString,type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code,index = 0,i,length = message.length,blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | code >> 6;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | code >> 12;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              buffer8[i++] = 0xf0 | code >> 18;
              buffer8[i++] = 0x80 | code >> 12 & 0x3f;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks,i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a,b,c,d,bc,da,blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
      * @method hex
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.hex();
      */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;

    return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] +
    HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] +
    HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] +
    HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] +
    HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] +
    HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] +
    HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] +
    HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] +
    HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] +
    HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] +
    HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] +
    HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] +
    HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] +
    HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] +
    HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] +
    HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
  };

  /**
      * @method toString
      * @memberof Md5
      * @instance
      * @description Output hash as hex string
      * @returns {String} Hex string
      * @see {@link md5.hex}
      * @example
      * hash.toString();
      */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
                                               * @method digest
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as bytes array
                                               * @returns {Array} Bytes array
                                               * @see {@link md5.digest}
                                               * @example
                                               * hash.digest();
                                               */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0,h1 = this.h1,h2 = this.h2,h3 = this.h3;
    return [
    h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF,
    h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF,
    h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF,
    h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];

  };

  /**
      * @method array
      * @memberof Md5
      * @instance
      * @description Output hash as bytes array
      * @returns {Array} Bytes array
      * @see {@link md5.array}
      * @example
      * hash.array();
      */
  Md5.prototype.array = Md5.prototype.digest;

  /**
                                               * @method arrayBuffer
                                               * @memberof Md5
                                               * @instance
                                               * @description Output hash as ArrayBuffer
                                               * @returns {ArrayBuffer} ArrayBuffer
                                               * @see {@link md5.arrayBuffer}
                                               * @example
                                               * hash.arrayBuffer();
                                               */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
      * @method buffer
      * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
      * @memberof Md5
      * @instance
      * @description Output hash as ArrayBuffer
      * @returns {ArrayBuffer} ArrayBuffer
      * @see {@link md5.buffer}
      * @example
      * hash.buffer();
      */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
                                                     * @method base64
                                                     * @memberof Md5
                                                     * @instance
                                                     * @description Output hash as base64 string
                                                     * @returns {String} base64 string
                                                     * @see {@link md5.base64}
                                                     * @example
                                                     * hash.base64();
                                                     */
  Md5.prototype.base64 = function () {
    var v1,v2,v3,base64Str = '',bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
      BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
      BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
    BASE64_ENCODE_CHAR[v1 << 4 & 63] +
    '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
           * @method md5
           * @description Md5 hash function, export to global in browsers.
           * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
           * @returns {String} md5 hashes
           * @example
           * md5(''); // d41d8cd98f00b204e9800998ecf8427e
           * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
           * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
           *
           * // It also supports UTF-8 encoding
           * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
           *
           * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
           * md5([]); // d41d8cd98f00b204e9800998ecf8427e
           * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
           */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 375), __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),

/***/ 375:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 376);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 376:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 375)))

/***/ }),

/***/ 377:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 434:
/*!************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/common/qiniuUploader.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// created by gpake
(function () {

  var config = {
    qiniuRegion: '',
    qiniuImageURLPrefix: '',
    qiniuUploadToken: '',
    qiniuUploadTokenURL: '',
    qiniuUploadTokenFunction: null,
    qiniuShouldUseQiniuFileName: false };


  module.exports = {
    init: init,
    upload: upload };


  // 在整个程序生命周期中，只需要 init 一次即可
  // 如果需要变更参数，再调用 init 即可
  function init(options) {
    config = {
      qiniuRegion: '',
      qiniuImageURLPrefix: '',
      qiniuUploadToken: '',
      qiniuUploadTokenURL: '',
      qiniuUploadTokenFunction: null,
      qiniuShouldUseQiniuFileName: false };

    updateConfigWithOptions(options);
  }

  function updateConfigWithOptions(options) {
    if (options.region) {
      config.qiniuRegion = options.region;
    } else {
      console.error('qiniu uploader need your bucket region');
    }
    if (options.uptoken) {
      config.qiniuUploadToken = options.uptoken;
    } else if (options.uptokenURL) {
      config.qiniuUploadTokenURL = options.uptokenURL;
    } else if (options.uptokenFunc) {
      config.qiniuUploadTokenFunction = options.uptokenFunc;
    }
    if (options.domain) {
      config.qiniuImageURLPrefix = options.domain;
    }
    config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName;
  }

  function upload(filePath, success, fail, options, progress, cancelTask) {
    if (null == filePath) {
      console.error('qiniu uploader need filePath to upload');
      return;
    }
    if (options) {
      updateConfigWithOptions(options);
    }
    if (config.qiniuUploadToken) {
      doUpload(filePath, success, fail, options, progress, cancelTask);
    } else if (config.qiniuUploadTokenURL) {
      getQiniuToken(function () {
        doUpload(filePath, success, fail, options, progress, cancelTask);
      });
    } else if (config.qiniuUploadTokenFunction) {
      config.qiniuUploadToken = config.qiniuUploadTokenFunction();
      if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
        console.error('qiniu UploadTokenFunction result is null, please check the return value');
        return;
      }
      doUpload(filePath, success, fail, options, progress, cancelTask);
    } else {
      console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
      return;
    }
  }

  function doUpload(filePath, _success, _fail, options, progress, cancelTask) {
    console.log(111111111111);
    console.log(filePath);
    if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
      console.error('qiniu UploadToken is null, please check the init config or networking');
      return;
    }
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    var fileName = filePath.split('//')[1];
    if (options && options.key) {
      fileName = options.key;
    }
    var formData = {
      'token': config.qiniuUploadToken };

    if (!config.qiniuShouldUseQiniuFileName) {
      formData['key'] = fileName;
    }
    var uploadTask = wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      formData: formData,
      success: function success(res) {
        var dataString = res.data;
        //   // this if case is a compatibility with wechat server returned a charcode, but was fixed
        //   if(res.data.hasOwnProperty('type') && res.data.type === 'Buffer'){
        //     dataString = String.fromCharCode.apply(null, res.data.data)
        //   }
        try {
          var dataObject = JSON.parse(dataString);
          //do something
          var fileUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
          dataObject.fileUrl = fileUrl;
          dataObject.imageURL = fileUrl;
          // console.log(dataObject);
          if (_success) {
            _success(dataObject);
          }
        } catch (e) {
          console.log('parse JSON failed, origin String is: ' + dataString);
          if (_fail) {
            _fail(e);
          }
        }
      },
      fail: function fail(error) {
        console.error(error);
        if (_fail) {
          _fail(error);
        }
      } });


    uploadTask.onProgressUpdate(function (res) {
      progress && progress(res);
    });

    cancelTask && cancelTask(function () {
      uploadTask.abort();
    });
  }

  function getQiniuToken(callback) {
    wx.request({
      url: config.qiniuUploadTokenURL,
      success: function success(res) {
        var token = res.data.uptoken;
        if (token && token.length > 0) {
          config.qiniuUploadToken = token;
          if (callback) {
            callback();
          }
        } else {
          console.error('qiniuUploader cannot get your token, please check the uptokenURL or server');
        }
      },
      fail: function fail(error) {
        console.error('qiniu UploadToken is null, please check the init config or networking: ' + error);
      } });

  }

  function uploadURLFromRegionCode(code) {
    var uploadURL = null;
    switch (code) {
      case 'ECN':uploadURL = 'https://up.qiniup.com';break;
      case 'NCN':uploadURL = 'https://up-z1.qiniup.com';break;
      case 'SCN':uploadURL = 'https://up-z2.qiniup.com';break;
      case 'NA':uploadURL = 'https://up-na0.qiniup.com';break;
      case 'ASG':uploadURL = 'https://up-as0.qiniup.com';break;
      default:console.error('please make the region is with one of [ECN, SCN, NCN, NA, ASG]');}

    return uploadURL;
  }

})();

/***/ }),

/***/ 459:
/*!**********************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/m-citypicker/city-data/province.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "value": 1,
  "label": "北京市" },
{
  "value": 19,
  "label": "天津市" },
{
  "value": 37,
  "label": "河北省" },
{
  "value": 220,
  "label": "山西省" },
{
  "value": 351,
  "label": "内蒙古自治区" },
{
  "value": 466,
  "label": "辽宁省" },
{
  "value": 585,
  "label": "吉林省" },
{
  "value": 655,
  "label": "黑龙江省" },
{
  "value": 801,
  "label": "上海市" },
{
  "value": 820,
  "label": "江苏省" },
{
  "value": 933,
  "label": "浙江省" },
{
  "value": 1046,
  "label": "安徽省" },
{
  "value": 1168,
  "label": "福建省" },
{
  "value": 1263,
  "label": "江西省" },
{
  "value": 1375,
  "label": "山东省" },
{
  "value": 1532,
  "label": "河南省" },
{
  "value": 1709,
  "label": "湖北省" },
{
  "value": 1827,
  "label": "湖南省" },
{
  "value": 1964,
  "label": "广东省" },
{
  "value": 2162,
  "label": "广西壮族自治区" },
{
  "value": 2291,
  "label": "海南省" },
{
  "value": 2323,
  "label": "重庆市" },
{
  "value": 2367,
  "label": "四川省" },
{
  "value": 2572,
  "label": "贵州省" },
{
  "value": 2670,
  "label": "云南省" },
{
  "value": 2816,
  "label": "西藏自治区" },
{
  "value": 2898,
  "label": "陕西省" },
{
  "value": 3022,
  "label": "甘肃省" },
{
  "value": 3126,
  "label": "青海省" },
{
  "value": 3178,
  "label": "宁夏回族自治区" },
{
  "value": 3206,
  "label": "新疆维吾尔自治区" },
{
  "value": 3325,
  "label": "台湾" },
{
  "value": 3716,
  "label": "香港特别行政区" },
{
  "value": 3738,
  "label": "澳门特别行政区" }];var _default =

provinceData;exports.default = _default;

/***/ }),

/***/ 460:
/*!******************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/m-citypicker/city-data/city.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [
[{
  "value": 2,
  "label": "北京市" }],

[{
  "value": 20,
  "label": "天津市" }],

[{
  "value": 38,
  "label": "石家庄市" },
{
  "value": 61,
  "label": "唐山市" },
{
  "value": 76,
  "label": "秦皇岛市" },
{
  "value": 84,
  "label": "邯郸市" },
{
  "value": 104,
  "label": "邢台市" },
{
  "value": 124,
  "label": "保定市" },
{
  "value": 150,
  "label": "张家口市" },
{
  "value": 168,
  "label": "承德市" },
{
  "value": 180,
  "label": "沧州市" },
{
  "value": 197,
  "label": "廊坊市" },
{
  "value": 208,
  "label": "衡水市" }],

[{
  "value": 221,
  "label": "太原市" },
{
  "value": 232,
  "label": "大同市" },
{
  "value": 244,
  "label": "阳泉市" },
{
  "value": 250,
  "label": "长治市" },
{
  "value": 264,
  "label": "晋城市" },
{
  "value": 271,
  "label": "朔州市" },
{
  "value": 278,
  "label": "晋中市" },
{
  "value": 290,
  "label": "运城市" },
{
  "value": 304,
  "label": "忻州市" },
{
  "value": 319,
  "label": "临汾市" },
{
  "value": 337,
  "label": "吕梁市" }],

[{
  "value": 352,
  "label": "呼和浩特市" },
{
  "value": 362,
  "label": "包头市" },
{
  "value": 372,
  "label": "乌海市" },
{
  "value": 376,
  "label": "赤峰市" },
{
  "value": 389,
  "label": "通辽市" },
{
  "value": 398,
  "label": "鄂尔多斯市" },
{
  "value": 407,
  "label": "呼伦贝尔市" },
{
  "value": 422,
  "label": "巴彦淖尔市" },
{
  "value": 430,
  "label": "乌兰察布市" },
{
  "value": 442,
  "label": "兴安盟" },
{
  "value": 449,
  "label": "锡林郭勒盟" },
{
  "value": 462,
  "label": "阿拉善盟" }],

[{
  "value": 467,
  "label": "沈阳市" },
{
  "value": 481,
  "label": "大连市" },
{
  "value": 492,
  "label": "鞍山市" },
{
  "value": 500,
  "label": "抚顺市" },
{
  "value": 508,
  "label": "本溪市" },
{
  "value": 515,
  "label": "丹东市" },
{
  "value": 522,
  "label": "锦州市" },
{
  "value": 530,
  "label": "营口市" },
{
  "value": 537,
  "label": "阜新市" },
{
  "value": 545,
  "label": "辽阳市" },
{
  "value": 553,
  "label": "盘锦市" },
{
  "value": 558,
  "label": "铁岭市" },
{
  "value": 566,
  "label": "朝阳市" },
{
  "value": 574,
  "label": "葫芦岛市" },
{
  "value": 581,
  "label": "金普新区" }],

[{
  "value": 586,
  "label": "长春市" },
{
  "value": 597,
  "label": "吉林市" },
{
  "value": 607,
  "label": "四平市" },
{
  "value": 614,
  "label": "辽源市" },
{
  "value": 619,
  "label": "通化市" },
{
  "value": 627,
  "label": "白山市" },
{
  "value": 634,
  "label": "松原市" },
{
  "value": 640,
  "label": "白城市" },
{
  "value": 646,
  "label": "延边朝鲜族自治州" }],

[{
  "value": 656,
  "label": "哈尔滨市" },
{
  "value": 675,
  "label": "齐齐哈尔市" },
{
  "value": 692,
  "label": "鸡西市" },
{
  "value": 702,
  "label": "鹤岗市" },
{
  "value": 711,
  "label": "双鸭山市" },
{
  "value": 720,
  "label": "大庆市" },
{
  "value": 730,
  "label": "伊春市" },
{
  "value": 748,
  "label": "佳木斯市" },
{
  "value": 759,
  "label": "七台河市" },
{
  "value": 764,
  "label": "牡丹江市" },
{
  "value": 775,
  "label": "黑河市" },
{
  "value": 782,
  "label": "绥化市" },
{
  "value": 793,
  "label": "大兴安岭地区" }],

[{
  "value": 802,
  "label": "上海市" }],

[{
  "value": 821,
  "label": "南京市" },
{
  "value": 833,
  "label": "无锡市" },
{
  "value": 842,
  "label": "徐州市" },
{
  "value": 853,
  "label": "常州市" },
{
  "value": 861,
  "label": "苏州市" },
{
  "value": 871,
  "label": "南通市" },
{
  "value": 880,
  "label": "连云港市" },
{
  "value": 887,
  "label": "淮安市" },
{
  "value": 896,
  "label": "盐城市" },
{
  "value": 906,
  "label": "扬州市" },
{
  "value": 913,
  "label": "镇江市" },
{
  "value": 920,
  "label": "泰州市" },
{
  "value": 927,
  "label": "宿迁市" }],

[{
  "value": 934,
  "label": "杭州市" },
{
  "value": 948,
  "label": "宁波市" },
{
  "value": 960,
  "label": "温州市" },
{
  "value": 972,
  "label": "嘉兴市" },
{
  "value": 980,
  "label": "湖州市" },
{
  "value": 986,
  "label": "绍兴市" },
{
  "value": 993,
  "label": "金华市" },
{
  "value": 1003,
  "label": "衢州市" },
{
  "value": 1010,
  "label": "舟山市" },
{
  "value": 1015,
  "label": "台州市" },
{
  "value": 1025,
  "label": "丽水市" },
{
  "value": 1035,
  "label": "舟山群岛新区" }],

[{
  "value": 1047,
  "label": "合肥市" },
{
  "value": 1057,
  "label": "芜湖市" },
{
  "value": 1066,
  "label": "蚌埠市" },
{
  "value": 1074,
  "label": "淮南市" },
{
  "value": 1081,
  "label": "马鞍山市" },
{
  "value": 1088,
  "label": "淮北市" },
{
  "value": 1093,
  "label": "铜陵市" },
{
  "value": 1098,
  "label": "安庆市" },
{
  "value": 1110,
  "label": "黄山市" },
{
  "value": 1118,
  "label": "滁州市" },
{
  "value": 1127,
  "label": "阜阳市" },
{
  "value": 1136,
  "label": "宿州市" },
{
  "value": 1142,
  "label": "六安市" },
{
  "value": 1150,
  "label": "亳州市" },
{
  "value": 1155,
  "label": "池州市" },
{
  "value": 1160,
  "label": "宣城市" }],

[{
  "value": 1169,
  "label": "福州市" },
{
  "value": 1183,
  "label": "厦门市" },
{
  "value": 1190,
  "label": "莆田市" },
{
  "value": 1196,
  "label": "三明市" },
{
  "value": 1209,
  "label": "泉州市" },
{
  "value": 1222,
  "label": "漳州市" },
{
  "value": 1234,
  "label": "南平市" },
{
  "value": 1245,
  "label": "龙岩市" },
{
  "value": 1253,
  "label": "宁德市" }],

[{
  "label": "南昌市",
  "value": 1263 },

{
  "label": "景德镇市",
  "value": 1273 },

{
  "label": "萍乡市",
  "value": 1278 },

{
  "label": "九江市",
  "value": 1284 },

{
  "label": "新余市",
  "value": 1298 },

{
  "label": "鹰潭市",
  "value": 1301 },

{
  "label": "赣州市",
  "value": 1305 },

{
  "label": "吉安市",
  "value": 1324 },

{
  "label": "宜春市",
  "value": 1338 },

{
  "label": "抚州市",
  "value": 1349 },

{
  "label": "上饶市",
  "value": 1361 }],

[{
  "value": 1376,
  "label": "济南市" },
{
  "value": 1387,
  "label": "青岛市" },
{
  "value": 1399,
  "label": "淄博市" },
{
  "value": 1408,
  "label": "枣庄市" },
{
  "value": 1415,
  "label": "东营市" },
{
  "value": 1421,
  "label": "烟台市" },
{
  "value": 1434,
  "label": "潍坊市" },
{
  "value": 1447,
  "label": "济宁市" },
{
  "value": 1459,
  "label": "泰安市" },
{
  "value": 1466,
  "label": "威海市" },
{
  "value": 1471,
  "label": "日照市" },
{
  "value": 1476,
  "label": "莱芜市" },
{
  "value": 1479,
  "label": "临沂市" },
{
  "value": 1492,
  "label": "德州市" },
{
  "value": 1504,
  "label": "聊城市" },
{
  "value": 1513,
  "label": "滨州市" },
{
  "value": 1522,
  "label": "菏泽市" }],

[{
  "value": 1533,
  "label": "郑州市" },
{
  "value": 1546,
  "label": "开封市" },
{
  "value": 1556,
  "label": "洛阳市" },
{
  "value": 1572,
  "label": "平顶山市" },
{
  "value": 1583,
  "label": "安阳市" },
{
  "value": 1593,
  "label": "鹤壁市" },
{
  "value": 1599,
  "label": "新乡市" },
{
  "value": 1612,
  "label": "焦作市" },
{
  "value": 1623,
  "label": "濮阳市" },
{
  "value": 1630,
  "label": "许昌市" },
{
  "value": 1637,
  "label": "漯河市" },
{
  "value": 1643,
  "label": "三门峡市" },
{
  "value": 1650,
  "label": "南阳市" },
{
  "value": 1664,
  "label": "商丘市" },
{
  "value": 1674,
  "label": "信阳市" },
{
  "value": 1685,
  "label": "周口市" },
{
  "value": 1696,
  "label": "驻马店市" },
{
  "value": 1707,
  "label": "直辖县级" }],

[{
  "value": 1710,
  "label": "武汉市" },
{
  "value": 1724,
  "label": "黄石市" },
{
  "value": 1731,
  "label": "十堰市" },
{
  "value": 1740,
  "label": "宜昌市" },
{
  "value": 1754,
  "label": "襄阳市" },
{
  "value": 1764,
  "label": "鄂州市" },
{
  "value": 1768,
  "label": "荆门市" },
{
  "value": 1774,
  "label": "孝感市" },
{
  "value": 1782,
  "label": "荆州市" },
{
  "value": 1791,
  "label": "黄冈市" },
{
  "value": 1802,
  "label": "咸宁市" },
{
  "value": 1809,
  "label": "随州市" },
{
  "value": 1813,
  "label": "恩施土家族苗族自治州" },
{
  "value": 1822,
  "label": "直辖县级" }],

[{
  "value": 1828,
  "label": "长沙市" },
{
  "value": 1838,
  "label": "株洲市" },
{
  "value": 1848,
  "label": "湘潭市" },
{
  "value": 1854,
  "label": "衡阳市" },
{
  "value": 1867,
  "label": "邵阳市" },
{
  "value": 1880,
  "label": "岳阳市" },
{
  "value": 1890,
  "label": "常德市" },
{
  "value": 1900,
  "label": "张家界市" },
{
  "value": 1905,
  "label": "益阳市" },
{
  "value": 1912,
  "label": "郴州市" },
{
  "value": 1924,
  "label": "永州市" },
{
  "value": 1936,
  "label": "怀化市" },
{
  "value": 1949,
  "label": "娄底市" },
{
  "value": 1955,
  "label": "湘西土家族苗族自治州" }],


[{
  "value": 1965,
  "label": "广州市" },
{
  "value": 1977,
  "label": "韶关市" },
{
  "value": 1988,
  "label": "深圳市" },
{
  "value": 1999,
  "label": "珠海市" },
{
  "value": 2003,
  "label": "汕头市" },
{
  "value": 2011,
  "label": "佛山市" },
{
  "value": 2017,
  "label": "江门市" },
{
  "value": 2025,
  "label": "湛江市" },
{
  "value": 2035,
  "label": "茂名市" },
{
  "value": 2041,
  "label": "肇庆市" },
{
  "value": 2050,
  "label": "惠州市" },
{
  "value": 2056,
  "label": "梅州市" },
{
  "value": 2065,
  "label": "汕尾市" },
{
  "value": 2070,
  "label": "河源市" },
{
  "value": 2077,
  "label": "阳江市" },
{
  "value": 2082,
  "label": "清远市" },
{
  "value": 2091,
  "label": "东莞市" },
{
  "value": 2123,
  "label": "中山市" },
{
  "value": 2146,
  "label": "潮州市" },
{
  "value": 2150,
  "label": "揭阳市" },
{
  "value": 2156,
  "label": "云浮市" }],

[{
  "value": 2163,
  "label": "南宁市" },
{
  "value": 2177,
  "label": "柳州市" },
{
  "value": 2189,
  "label": "桂林市" },
{
  "value": 2207,
  "label": "梧州市" },
{
  "value": 2215,
  "label": "北海市" },
{
  "value": 2220,
  "label": "防城港市" },
{
  "value": 2225,
  "label": "钦州市" },
{
  "value": 2230,
  "label": "贵港市" },
{
  "value": 2236,
  "label": "玉林市" },
{
  "value": 2245,
  "label": "百色市" },
{
  "value": 2258,
  "label": "贺州市" },
{
  "value": 2264,
  "label": "河池市" },
{
  "value": 2276,
  "label": "来宾市" },
{
  "value": 2283,
  "label": "崇左市" }],

[{
  "value": 2292,
  "label": "海口市" },
{
  "value": 2297,
  "label": "三亚市" },
{
  "value": 2302,
  "label": "三沙市" },
{
  "value": 2306,
  "label": "直辖县级" }],

[{
  "value": 2324,
  "label": "重庆市" }

// , {
// 	"value": 2363,
// 	"label": "两江新区"
// },
],
[{
  "value": 2368,
  "label": "成都市" },
{
  "value": 2388,
  "label": "自贡市" },
{
  "value": 2395,
  "label": "攀枝花市" },
{
  "value": 2401,
  "label": "泸州市" },
{
  "value": 2409,
  "label": "德阳市" },
{
  "value": 2416,
  "label": "绵阳市" },
{
  "value": 2426,
  "label": "广元市" },
{
  "value": 2434,
  "label": "遂宁市" },
{
  "value": 2440,
  "label": "内江市" },
{
  "value": 2446,
  "label": "乐山市" },
{
  "value": 2458,
  "label": "南充市" },
{
  "value": 2468,
  "label": "眉山市" },
{
  "value": 2475,
  "label": "宜宾市" },
{
  "value": 2486,
  "label": "广安市" },
{
  "value": 2493,
  "label": "达州市" },
{
  "value": 2501,
  "label": "雅安市" },
{
  "value": 2510,
  "label": "巴中市" },
{
  "value": 2516,
  "label": "资阳市" },
{
  "value": 2521,
  "label": "阿坝藏族羌族自治州" },
{
  "value": 2535,
  "label": "甘孜藏族自治州" },
{
  "value": 2554,
  "label": "凉山彝族自治州" }],

[{
  "value": 2573,
  "label": "贵阳市" },
{
  "value": 2584,
  "label": "六盘水市" },
{
  "value": 2589,
  "label": "遵义市" },
{
  "value": 2604,
  "label": "安顺市" },
{
  "value": 2611,
  "label": "毕节市" },
{
  "value": 2620,
  "label": "铜仁市" },
{
  "value": 2631,
  "label": "黔西南布依族苗族自治州" },
{
  "value": 2640,
  "label": "黔东南苗族侗族自治州" },
{
  "value": 2657,
  "label": "黔南布依族苗族自治州" }],

[{
  "value": 2671,
  "label": "昆明市" },
{
  "value": 2686,
  "label": "曲靖市" },
{
  "value": 2696,
  "label": "玉溪市" },
{
  "value": 2706,
  "label": "保山市" },
{
  "value": 2712,
  "label": "昭通市" },
{
  "value": 2724,
  "label": "丽江市" },
{
  "value": 2730,
  "label": "普洱市" },
{
  "value": 2741,
  "label": "临沧市" },
{
  "value": 2750,
  "label": "楚雄彝族自治州" },
{
  "value": 2761,
  "label": "红河哈尼族彝族自治州" },
{
  "value": 2775,
  "label": "文山壮族苗族自治州" },
{
  "value": 2784,
  "label": "西双版纳傣族自治州" },
{
  "value": 2788,
  "label": "大理白族自治州" },
{
  "value": 2801,
  "label": "德宏傣族景颇族自治州" },
{
  "value": 2807,
  "label": "怒江傈僳族自治州" },
{
  "value": 2812,
  "label": "迪庆藏族自治州" }],

[{
  "value": 2817,
  "label": "拉萨市" },
{
  "value": 2826,
  "label": "日喀则市" },
{
  "value": 2845,
  "label": "昌都市" },
{
  "value": 2857,
  "label": "山南地区" },
{
  "value": 2870,
  "label": "那曲地区" },
{
  "value": 2882,
  "label": "阿里地区" },
{
  "value": 2890,
  "label": "林芝地区" }],

[{
  "value": 2899,
  "label": "西安市" },
{
  "value": 2913,
  "label": "铜川市" },
{
  "value": 2918,
  "label": "宝鸡市" },
{
  "value": 2931,
  "label": "咸阳市" },
{
  "value": 2946,
  "label": "渭南市" },
{
  "value": 2958,
  "label": "延安市" },
{
  "value": 2972,
  "label": "汉中市" },
{
  "value": 2984,
  "label": "榆林市" },
{
  "value": 2997,
  "label": "安康市" },
{
  "value": 3008,
  "label": "商洛市" },
{
  "value": 3016,
  "label": "西咸新区" }],

[{
  "value": 3023,
  "label": "兰州市" },
{
  "value": 3032,
  "label": "嘉峪关市" },
{
  "value": 3036,
  "label": "金昌市" },
{
  "value": 3039,
  "label": "白银市" },
{
  "value": 3045,
  "label": "天水市" },
{
  "value": 3053,
  "label": "武威市" },
{
  "value": 3058,
  "label": "张掖市" },
{
  "value": 3065,
  "label": "平凉市" },
{
  "value": 3073,
  "label": "酒泉市" },
{
  "value": 3081,
  "label": "庆阳市" },
{
  "value": 3090,
  "label": "定西市" },
{
  "value": 3098,
  "label": "陇南市" },
{
  "value": 3108,
  "label": "临夏回族自治州" },
{
  "value": 3117,
  "label": "甘南藏族自治州" }],

[{
  "value": 3127,
  "label": "西宁市" },
{
  "value": 3135,
  "label": "海东市" },
{
  "value": 3142,
  "label": "海北藏族自治州" },
{
  "value": 3147,
  "label": "黄南藏族自治州" },
{
  "value": 3152,
  "label": "海南藏族自治州" },
{
  "value": 3158,
  "label": "果洛藏族自治州" },
{
  "value": 3165,
  "label": "玉树藏族自治州" },
{
  "value": 3172,
  "label": "海西蒙古族藏族自治州" }],

[{
  "value": 3179,
  "label": "银川市" },
{
  "value": 3186,
  "label": "石嘴山市" },
{
  "value": 3190,
  "label": "吴忠市" },
{
  "value": 3196,
  "label": "固原市" },
{
  "value": 3202,
  "label": "中卫市" }],

[{
  "value": 3207,
  "label": "乌鲁木齐市" },
{
  "value": 3216,
  "label": "克拉玛依市" },
{
  "value": 3221,
  "label": "吐鲁番地区" },
{
  "value": 3225,
  "label": "哈密地区" },
{
  "value": 3229,
  "label": "昌吉回族自治州" },
{
  "value": 3237,
  "label": "博尔塔拉蒙古自治州" },
{
  "value": 3242,
  "label": "巴音郭楞蒙古自治州" },
{
  "value": 3252,
  "label": "阿克苏地区" },
{
  "value": 3262,
  "label": "克孜勒苏柯尔克孜自治州" },
{
  "value": 3267,
  "label": "喀什地区" },
{
  "value": 3280,
  "label": "和田地区" },
{
  "value": 3289,
  "label": "伊犁哈萨克自治州" },
{
  "value": 3301,
  "label": "塔城地区" },
{
  "value": 3309,
  "label": "阿勒泰地区" },
{
  "value": 3317,
  "label": "直辖县级" }],

[{
  "value": 3326,
  "label": "台北市" },
{
  "value": 3339,
  "label": "高雄市" },
{
  "value": 3378,
  "label": "基隆市" },
{
  "value": 3386,
  "label": "台中市" },
{
  "value": 3416,
  "label": "台南市" },
{
  "value": 3454,
  "label": "新竹市" },
{
  "value": 3458,
  "label": "嘉义市" },
{
  "value": 3461,
  "label": "新北市" },
{
  "value": 3491,
  "label": "宜兰县" },
{
  "value": 3504,
  "label": "桃园县" },
{
  "value": 3518,
  "label": "新竹县" },
{
  "value": 3532,
  "label": "苗栗县" },
{
  "value": 3551,
  "label": "彰化县" },
{
  "value": 3578,
  "label": "南投县" },
{
  "value": 3592,
  "label": "云林县" },
{
  "value": 3613,
  "label": "嘉义县" },
{
  "value": 3632,
  "label": "屏东县" },
{
  "value": 3666,
  "label": "台东县" },
{
  "value": 3683,
  "label": "花莲县" },
{
  "value": 3697,
  "label": "澎湖县" },
{
  "value": 3704,
  "label": "金门县" },
{
  "value": 3711,
  "label": "连江县" }],

[{
  "value": 3717,
  "label": "香港岛" },
{
  "value": 3722,
  "label": "九龙" },
{
  "value": 3728,
  "label": "新界" }],

[{
  "value": 3739,
  "label": "澳门半岛" },
{
  "value": 3745,
  "label": "氹仔岛" },
{
  "value": 3747,
  "label": "路环岛" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ 461:
/*!******************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/m-citypicker/city-data/area.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [
[
[{
  "value": 3,
  "label": "东城区" },
{
  "value": 4,
  "label": "西城区" },
{
  "value": 5,
  "label": "朝阳区" },
{
  "value": 6,
  "label": "丰台区" },
{
  "value": 7,
  "label": "石景山区" },
{
  "value": 8,
  "label": "海淀区" },
{
  "value": 9,
  "label": "门头沟区" },
{
  "value": 10,
  "label": "房山区" },
{
  "value": 11,
  "label": "通州区" },
{
  "value": 12,
  "label": "顺义区" },
{
  "value": 13,
  "label": "昌平区" },
{
  "value": 14,
  "label": "大兴区" },
{
  "value": 15,
  "label": "怀柔区" },
{
  "value": 16,
  "label": "平谷区" },
{
  "value": 17,
  "label": "密云县" },
{
  "value": 18,
  "label": "延庆县" }]],


[
[{
  "value": 21,
  "label": "和平区" },
{
  "value": 22,
  "label": "河东区" },
{
  "value": 23,
  "label": "河西区" },
{
  "value": 24,
  "label": "南开区" },
{
  "value": 25,
  "label": "河北区" },
{
  "value": 26,
  "label": "红桥区" },
{
  "value": 27,
  "label": "东丽区" },
{
  "value": 28,
  "label": "西青区" },
{
  "value": 29,
  "label": "津南区" },
{
  "value": 30,
  "label": "北辰区" },
{
  "value": 31,
  "label": "武清区" },
{
  "value": 32,
  "label": "宝坻区" },
{
  "value": 33,
  "label": "滨海新区" },
{
  "value": 34,
  "label": "宁河县" },
{
  "value": 35,
  "label": "静海县" },
{
  "value": 36,
  "label": "蓟县" }]],


[
[{
  "value": 39,
  "label": "长安区" },
{
  "value": 40,
  "label": "桥西区" },
{
  "value": 41,
  "label": "新华区" },
{
  "value": 42,
  "label": "井陉矿区" },
{
  "value": 43,
  "label": "裕华区" },
{
  "value": 44,
  "label": "藁城区" },
{
  "value": 45,
  "label": "鹿泉区" },
{
  "value": 46,
  "label": "栾城区" },
{
  "value": 47,
  "label": "井陉县" },
{
  "value": 48,
  "label": "正定县" },
{
  "value": 49,
  "label": "行唐县" },
{
  "value": 50,
  "label": "灵寿县" },
{
  "value": 51,
  "label": "高邑县" },
{
  "value": 52,
  "label": "深泽县" },
{
  "value": 53,
  "label": "赞皇县" },
{
  "value": 54,
  "label": "无极县" },
{
  "value": 55,
  "label": "平山县" },
{
  "value": 56,
  "label": "元氏县" },
{
  "value": 57,
  "label": "赵县" },
{
  "value": 58,
  "label": "辛集市" },
{
  "value": 59,
  "label": "晋州市" },
{
  "value": 60,
  "label": "新乐市" }],

[{
  "value": 62,
  "label": "路南区" },
{
  "value": 63,
  "label": "路北区" },
{
  "value": 64,
  "label": "古冶区" },
{
  "value": 65,
  "label": "开平区" },
{
  "value": 66,
  "label": "丰南区" },
{
  "value": 67,
  "label": "丰润区" },
{
  "value": 68,
  "label": "曹妃甸区" },
{
  "value": 69,
  "label": "滦县" },
{
  "value": 70,
  "label": "滦南县" },
{
  "value": 71,
  "label": "乐亭县" },
{
  "value": 72,
  "label": "迁西县" },
{
  "value": 73,
  "label": "玉田县" },
{
  "value": 74,
  "label": "遵化市" },
{
  "value": 75,
  "label": "迁安市" }],

[{
  "value": 77,
  "label": "海港区" },
{
  "value": 78,
  "label": "山海关区" },
{
  "value": 79,
  "label": "北戴河区" },
{
  "value": 80,
  "label": "青龙满族自治县" },
{
  "value": 81,
  "label": "昌黎县" },
{
  "value": 82,
  "label": "抚宁县" },
{
  "value": 83,
  "label": "卢龙县" }],

[{
  "value": 85,
  "label": "邯山区" },
{
  "value": 86,
  "label": "丛台区" },
{
  "value": 87,
  "label": "复兴区" },
{
  "value": 88,
  "label": "峰峰矿区" },
{
  "value": 89,
  "label": "邯郸县" },
{
  "value": 90,
  "label": "临漳县" },
{
  "value": 91,
  "label": "成安县" },
{
  "value": 92,
  "label": "大名县" },
{
  "value": 93,
  "label": "涉县" },
{
  "value": 94,
  "label": "磁县" },
{
  "value": 95,
  "label": "肥乡县" },
{
  "value": 96,
  "label": "永年县" },
{
  "value": 97,
  "label": "邱县" },
{
  "value": 98,
  "label": "鸡泽县" },
{
  "value": 99,
  "label": "广平县" },
{
  "value": 100,
  "label": "馆陶县" },
{
  "value": 101,
  "label": "魏县" },
{
  "value": 102,
  "label": "曲周县" },
{
  "value": 103,
  "label": "武安市" }],

[{
  "value": 105,
  "label": "桥东区" },
{
  "value": 106,
  "label": "桥西区" },
{
  "value": 107,
  "label": "邢台县" },
{
  "value": 108,
  "label": "临城县" },
{
  "value": 109,
  "label": "内丘县" },
{
  "value": 110,
  "label": "柏乡县" },
{
  "value": 111,
  "label": "隆尧县" },
{
  "value": 112,
  "label": "任县" },
{
  "value": 113,
  "label": "南和县" },
{
  "value": 114,
  "label": "宁晋县" },
{
  "value": 115,
  "label": "巨鹿县" },
{
  "value": 116,
  "label": "新河县" },
{
  "value": 117,
  "label": "广宗县" },
{
  "value": 118,
  "label": "平乡县" },
{
  "value": 119,
  "label": "威县" },
{
  "value": 120,
  "label": "清河县" },
{
  "value": 121,
  "label": "临西县" },
{
  "value": 122,
  "label": "南宫市" },
{
  "value": 123,
  "label": "沙河市" }],

[{
  "value": 125,
  "label": "新市区" },
{
  "value": 126,
  "label": "北市区" },
{
  "value": 127,
  "label": "南市区" },
{
  "value": 128,
  "label": "满城县" },
{
  "value": 129,
  "label": "清苑县" },
{
  "value": 130,
  "label": "涞水县" },
{
  "value": 131,
  "label": "阜平县" },
{
  "value": 132,
  "label": "徐水县" },
{
  "value": 133,
  "label": "定兴县" },
{
  "value": 134,
  "label": "唐县" },
{
  "value": 135,
  "label": "高阳县" },
{
  "value": 136,
  "label": "容城县" },
{
  "value": 137,
  "label": "涞源县" },
{
  "value": 138,
  "label": "望都县" },
{
  "value": 139,
  "label": "安新县" },
{
  "value": 140,
  "label": "易县" },
{
  "value": 141,
  "label": "曲阳县" },
{
  "value": 142,
  "label": "蠡县" },
{
  "value": 143,
  "label": "顺平县" },
{
  "value": 144,
  "label": "博野县" },
{
  "value": 145,
  "label": "雄县" },
{
  "value": 146,
  "label": "涿州市" },
{
  "value": 147,
  "label": "定州市" },
{
  "value": 148,
  "label": "安国市" },
{
  "value": 149,
  "label": "高碑店市" }],

[{
  "value": 151,
  "label": "桥东区" },
{
  "value": 152,
  "label": "桥西区" },
{
  "value": 153,
  "label": "宣化区" },
{
  "value": 154,
  "label": "下花园区" },
{
  "value": 155,
  "label": "宣化县" },
{
  "value": 156,
  "label": "张北县" },
{
  "value": 157,
  "label": "康保县" },
{
  "value": 158,
  "label": "沽源县" },
{
  "value": 159,
  "label": "尚义县" },
{
  "value": 160,
  "label": "蔚县" },
{
  "value": 161,
  "label": "阳原县" },
{
  "value": 162,
  "label": "怀安县" },
{
  "value": 163,
  "label": "万全县" },
{
  "value": 164,
  "label": "怀来县" },
{
  "value": 165,
  "label": "涿鹿县" },
{
  "value": 166,
  "label": "赤城县" },
{
  "value": 167,
  "label": "崇礼县" }],

[{
  "value": 169,
  "label": "双桥区" },
{
  "value": 170,
  "label": "双滦区" },
{
  "value": 171,
  "label": "鹰手营子矿区" },
{
  "value": 172,
  "label": "承德县" },
{
  "value": 173,
  "label": "兴隆县" },
{
  "value": 174,
  "label": "平泉县" },
{
  "value": 175,
  "label": "滦平县" },
{
  "value": 176,
  "label": "隆化县" },
{
  "value": 177,
  "label": "丰宁满族自治县" },
{
  "value": 178,
  "label": "宽城满族自治县" },
{
  "value": 179,
  "label": "围场满族蒙古族自治县" }],

[{
  "value": 181,
  "label": "新华区" },
{
  "value": 182,
  "label": "运河区" },
{
  "value": 183,
  "label": "沧县" },
{
  "value": 184,
  "label": "青县" },
{
  "value": 185,
  "label": "东光县" },
{
  "value": 186,
  "label": "海兴县" },
{
  "value": 187,
  "label": "盐山县" },
{
  "value": 188,
  "label": "肃宁县" },
{
  "value": 189,
  "label": "南皮县" },
{
  "value": 190,
  "label": "吴桥县" },
{
  "value": 191,
  "label": "献县" },
{
  "value": 192,
  "label": "孟村回族自治县" },
{
  "value": 193,
  "label": "泊头市" },
{
  "value": 194,
  "label": "任丘市" },
{
  "value": 195,
  "label": "黄骅市" },
{
  "value": 196,
  "label": "河间市" }],

[{
  "value": 198,
  "label": "安次区" },
{
  "value": 199,
  "label": "广阳区" },
{
  "value": 200,
  "label": "固安县" },
{
  "value": 201,
  "label": "永清县" },
{
  "value": 202,
  "label": "香河县" },
{
  "value": 203,
  "label": "大城县" },
{
  "value": 204,
  "label": "文安县" },
{
  "value": 205,
  "label": "大厂回族自治县" },
{
  "value": 206,
  "label": "霸州市" },
{
  "value": 207,
  "label": "三河市" }],

[{
  "value": 209,
  "label": "桃城区" },
{
  "value": 210,
  "label": "枣强县" },
{
  "value": 211,
  "label": "武邑县" },
{
  "value": 212,
  "label": "武强县" },
{
  "value": 213,
  "label": "饶阳县" },
{
  "value": 214,
  "label": "安平县" },
{
  "value": 215,
  "label": "故城县" },
{
  "value": 216,
  "label": "景县" },
{
  "value": 217,
  "label": "阜城县" },
{
  "value": 218,
  "label": "冀州市" },
{
  "value": 219,
  "label": "深州市" }]],


[
[{
  "value": 222,
  "label": "小店区" },
{
  "value": 223,
  "label": "迎泽区" },
{
  "value": 224,
  "label": "杏花岭区" },
{
  "value": 225,
  "label": "尖草坪区" },
{
  "value": 226,
  "label": "万柏林区" },
{
  "value": 227,
  "label": "晋源区" },
{
  "value": 228,
  "label": "清徐县" },
{
  "value": 229,
  "label": "阳曲县" },
{
  "value": 230,
  "label": "娄烦县" },
{
  "value": 231,
  "label": "古交市" }],

[{
  "value": 233,
  "label": "城区" },
{
  "value": 234,
  "label": "矿区" },
{
  "value": 235,
  "label": "南郊区" },
{
  "value": 236,
  "label": "新荣区" },
{
  "value": 237,
  "label": "阳高县" },
{
  "value": 238,
  "label": "天镇县" },
{
  "value": 239,
  "label": "广灵县" },
{
  "value": 240,
  "label": "灵丘县" },
{
  "value": 241,
  "label": "浑源县" },
{
  "value": 242,
  "label": "左云县" },
{
  "value": 243,
  "label": "大同县" }],

[{
  "value": 245,
  "label": "城区" },
{
  "value": 246,
  "label": "矿区" },
{
  "value": 247,
  "label": "郊区" },
{
  "value": 248,
  "label": "平定县" },
{
  "value": 249,
  "label": "盂县" }],

[{
  "value": 251,
  "label": "城区" },
{
  "value": 252,
  "label": "郊区" },
{
  "value": 253,
  "label": "长治县" },
{
  "value": 254,
  "label": "襄垣县" },
{
  "value": 255,
  "label": "屯留县" },
{
  "value": 256,
  "label": "平顺县" },
{
  "value": 257,
  "label": "黎城县" },
{
  "value": 258,
  "label": "壶关县" },
{
  "value": 259,
  "label": "长子县" },
{
  "value": 260,
  "label": "武乡县" },
{
  "value": 261,
  "label": "沁县" },
{
  "value": 262,
  "label": "沁源县" },
{
  "value": 263,
  "label": "潞城市" }],

[{
  "value": 265,
  "label": "城区" },
{
  "value": 266,
  "label": "沁水县" },
{
  "value": 267,
  "label": "阳城县" },
{
  "value": 268,
  "label": "陵川县" },
{
  "value": 269,
  "label": "泽州县" },
{
  "value": 270,
  "label": "高平市" }],

[{
  "value": 272,
  "label": "朔城区" },
{
  "value": 273,
  "label": "平鲁区" },
{
  "value": 274,
  "label": "山阴县" },
{
  "value": 275,
  "label": "应县" },
{
  "value": 276,
  "label": "右玉县" },
{
  "value": 277,
  "label": "怀仁县" }],

[{
  "value": 279,
  "label": "榆次区" },
{
  "value": 280,
  "label": "榆社县" },
{
  "value": 281,
  "label": "左权县" },
{
  "value": 282,
  "label": "和顺县" },
{
  "value": 283,
  "label": "昔阳县" },
{
  "value": 284,
  "label": "寿阳县" },
{
  "value": 285,
  "label": "太谷县" },
{
  "value": 286,
  "label": "祁县" },
{
  "value": 287,
  "label": "平遥县" },
{
  "value": 288,
  "label": "灵石县" },
{
  "value": 289,
  "label": "介休市" }],

[{
  "value": 291,
  "label": "盐湖区" },
{
  "value": 292,
  "label": "临猗县" },
{
  "value": 293,
  "label": "万荣县" },
{
  "value": 294,
  "label": "闻喜县" },
{
  "value": 295,
  "label": "稷山县" },
{
  "value": 296,
  "label": "新绛县" },
{
  "value": 297,
  "label": "绛县" },
{
  "value": 298,
  "label": "垣曲县" },
{
  "value": 299,
  "label": "夏县" },
{
  "value": 300,
  "label": "平陆县" },
{
  "value": 301,
  "label": "芮城县" },
{
  "value": 302,
  "label": "永济市" },
{
  "value": 303,
  "label": "河津市" }],

[{
  "value": 305,
  "label": "忻府区" },
{
  "value": 306,
  "label": "定襄县" },
{
  "value": 307,
  "label": "五台县" },
{
  "value": 308,
  "label": "代县" },
{
  "value": 309,
  "label": "繁峙县" },
{
  "value": 310,
  "label": "宁武县" },
{
  "value": 311,
  "label": "静乐县" },
{
  "value": 312,
  "label": "神池县" },
{
  "value": 313,
  "label": "五寨县" },
{
  "value": 314,
  "label": "岢岚县" },
{
  "value": 315,
  "label": "河曲县" },
{
  "value": 316,
  "label": "保德县" },
{
  "value": 317,
  "label": "偏关县" },
{
  "value": 318,
  "label": "原平市" }],

[{
  "value": 320,
  "label": "尧都区" },
{
  "value": 321,
  "label": "曲沃县" },
{
  "value": 322,
  "label": "翼城县" },
{
  "value": 323,
  "label": "襄汾县" },
{
  "value": 324,
  "label": "洪洞县" },
{
  "value": 325,
  "label": "古县" },
{
  "value": 326,
  "label": "安泽县" },
{
  "value": 327,
  "label": "浮山县" },
{
  "value": 328,
  "label": "吉县" },
{
  "value": 329,
  "label": "乡宁县" },
{
  "value": 330,
  "label": "大宁县" },
{
  "value": 331,
  "label": "隰县" },
{
  "value": 332,
  "label": "永和县" },
{
  "value": 333,
  "label": "蒲县" },
{
  "value": 334,
  "label": "汾西县" },
{
  "value": 335,
  "label": "侯马市" },
{
  "value": 336,
  "label": "霍州市" }],

[{
  "value": 338,
  "label": "离石区" },
{
  "value": 339,
  "label": "文水县" },
{
  "value": 340,
  "label": "交城县" },
{
  "value": 341,
  "label": "兴县" },
{
  "value": 342,
  "label": "临县" },
{
  "value": 343,
  "label": "柳林县" },
{
  "value": 344,
  "label": "石楼县" },
{
  "value": 345,
  "label": "岚县" },
{
  "value": 346,
  "label": "方山县" },
{
  "value": 347,
  "label": "中阳县" },
{
  "value": 348,
  "label": "交口县" },
{
  "value": 349,
  "label": "孝义市" },
{
  "value": 350,
  "label": "汾阳市" }]],


[
[{
  "value": 353,
  "label": "新城区" },
{
  "value": 354,
  "label": "回民区" },
{
  "value": 355,
  "label": "玉泉区" },
{
  "value": 356,
  "label": "赛罕区" },
{
  "value": 357,
  "label": "土默特左旗" },
{
  "value": 358,
  "label": "托克托县" },
{
  "value": 359,
  "label": "和林格尔县" },
{
  "value": 360,
  "label": "清水河县" },
{
  "value": 361,
  "label": "武川县" }],

[{
  "value": 363,
  "label": "东河区" },
{
  "value": 364,
  "label": "昆都仑区" },
{
  "value": 365,
  "label": "青山区" },
{
  "value": 366,
  "label": "石拐区" },
{
  "value": 367,
  "label": "白云鄂博矿区" },
{
  "value": 368,
  "label": "九原区" },
{
  "value": 369,
  "label": "土默特右旗" },
{
  "value": 370,
  "label": "固阳县" },
{
  "value": 371,
  "label": "达尔罕茂明安联合旗" }],

[{
  "value": 373,
  "label": "海勃湾区" },
{
  "value": 374,
  "label": "海南区" },
{
  "value": 375,
  "label": "乌达区" }],

[{
  "value": 377,
  "label": "红山区" },
{
  "value": 378,
  "label": "元宝山区" },
{
  "value": 379,
  "label": "松山区" },
{
  "value": 380,
  "label": "阿鲁科尔沁旗" },
{
  "value": 381,
  "label": "巴林左旗" },
{
  "value": 382,
  "label": "巴林右旗" },
{
  "value": 383,
  "label": "林西县" },
{
  "value": 384,
  "label": "克什克腾旗" },
{
  "value": 385,
  "label": "翁牛特旗" },
{
  "value": 386,
  "label": "喀喇沁旗" },
{
  "value": 387,
  "label": "宁城县" },
{
  "value": 388,
  "label": "敖汉旗" }],

[{
  "value": 390,
  "label": "科尔沁区" },
{
  "value": 391,
  "label": "科尔沁左翼中旗" },
{
  "value": 392,
  "label": "科尔沁左翼后旗" },
{
  "value": 393,
  "label": "开鲁县" },
{
  "value": 394,
  "label": "库伦旗" },
{
  "value": 395,
  "label": "奈曼旗" },
{
  "value": 396,
  "label": "扎鲁特旗" },
{
  "value": 397,
  "label": "霍林郭勒市" }],

[{
  "value": 399,
  "label": "东胜区" },
{
  "value": 400,
  "label": "达拉特旗" },
{
  "value": 401,
  "label": "准格尔旗" },
{
  "value": 402,
  "label": "鄂托克前旗" },
{
  "value": 403,
  "label": "鄂托克旗" },
{
  "value": 404,
  "label": "杭锦旗" },
{
  "value": 405,
  "label": "乌审旗" },
{
  "value": 406,
  "label": "伊金霍洛旗" }],

[{
  "value": 408,
  "label": "海拉尔区" },
{
  "value": 409,
  "label": "扎赉诺尔区" },
{
  "value": 410,
  "label": "阿荣旗" },
{
  "value": 411,
  "label": "莫力达瓦达斡尔族自治旗" },
{
  "value": 412,
  "label": "鄂伦春自治旗" },
{
  "value": 413,
  "label": "鄂温克族自治旗" },
{
  "value": 414,
  "label": "陈巴尔虎旗" },
{
  "value": 415,
  "label": "新巴尔虎左旗" },
{
  "value": 416,
  "label": "新巴尔虎右旗" },
{
  "value": 417,
  "label": "满洲里市" },
{
  "value": 418,
  "label": "牙克石市" },
{
  "value": 419,
  "label": "扎兰屯市" },
{
  "value": 420,
  "label": "额尔古纳市" },
{
  "value": 421,
  "label": "根河市" }],

[{
  "value": 423,
  "label": "临河区" },
{
  "value": 424,
  "label": "五原县" },
{
  "value": 425,
  "label": "磴口县" },
{
  "value": 426,
  "label": "乌拉特前旗" },
{
  "value": 427,
  "label": "乌拉特中旗" },
{
  "value": 428,
  "label": "乌拉特后旗" },
{
  "value": 429,
  "label": "杭锦后旗" }],

[{
  "value": 431,
  "label": "集宁区" },
{
  "value": 432,
  "label": "卓资县" },
{
  "value": 433,
  "label": "化德县" },
{
  "value": 434,
  "label": "商都县" },
{
  "value": 435,
  "label": "兴和县" },
{
  "value": 436,
  "label": "凉城县" },
{
  "value": 437,
  "label": "察哈尔右翼前旗" },
{
  "value": 438,
  "label": "察哈尔右翼中旗" },
{
  "value": 439,
  "label": "察哈尔右翼后旗" },
{
  "value": 440,
  "label": "四子王旗" },
{
  "value": 441,
  "label": "丰镇市" }],

[{
  "value": 443,
  "label": "乌兰浩特市" },
{
  "value": 444,
  "label": "阿尔山市" },
{
  "value": 445,
  "label": "科尔沁右翼前旗" },
{
  "value": 446,
  "label": "科尔沁右翼中旗" },
{
  "value": 447,
  "label": "扎赉特旗" },
{
  "value": 448,
  "label": "突泉县" }],

[{
  "value": 450,
  "label": "二连浩特市" },
{
  "value": 451,
  "label": "锡林浩特市" },
{
  "value": 452,
  "label": "阿巴嘎旗" },
{
  "value": 453,
  "label": "苏尼特左旗" },
{
  "value": 454,
  "label": "苏尼特右旗" },
{
  "value": 455,
  "label": "东乌珠穆沁旗" },
{
  "value": 456,
  "label": "西乌珠穆沁旗" },
{
  "value": 457,
  "label": "太仆寺旗" },
{
  "value": 458,
  "label": "镶黄旗" },
{
  "value": 459,
  "label": "正镶白旗" },
{
  "value": 460,
  "label": "正蓝旗" },
{
  "value": 461,
  "label": "多伦县" }],

[{
  "value": 463,
  "label": "阿拉善左旗" },
{
  "value": 464,
  "label": "阿拉善右旗" },
{
  "value": 465,
  "label": "额济纳旗" }]],


[
[{
  "value": 468,
  "label": "和平区" },
{
  "value": 469,
  "label": "沈河区" },
{
  "value": 470,
  "label": "大东区" },
{
  "value": 471,
  "label": "皇姑区" },
{
  "value": 472,
  "label": "铁西区" },
{
  "value": 473,
  "label": "苏家屯区" },
{
  "value": 474,
  "label": "浑南区" },
{
  "value": 475,
  "label": "沈北新区" },
{
  "value": 476,
  "label": "于洪区" },
{
  "value": 477,
  "label": "辽中县" },
{
  "value": 478,
  "label": "康平县" },
{
  "value": 479,
  "label": "法库县" },
{
  "value": 480,
  "label": "新民市" }],

[{
  "value": 482,
  "label": "中山区" },
{
  "value": 483,
  "label": "西岗区" },
{
  "value": 484,
  "label": "沙河口区" },
{
  "value": 485,
  "label": "甘井子区" },
{
  "value": 486,
  "label": "旅顺口区" },
{
  "value": 487,
  "label": "金州区" },
{
  "value": 488,
  "label": "长海县" },
{
  "value": 489,
  "label": "瓦房店市" },
{
  "value": 490,
  "label": "普兰店市" },
{
  "value": 491,
  "label": "庄河市" }],

[{
  "value": 493,
  "label": "铁东区" },
{
  "value": 494,
  "label": "铁西区" },
{
  "value": 495,
  "label": "立山区" },
{
  "value": 496,
  "label": "千山区" },
{
  "value": 497,
  "label": "台安县" },
{
  "value": 498,
  "label": "岫岩满族自治县" },
{
  "value": 499,
  "label": "海城市" }],

[{
  "value": 501,
  "label": "新抚区" },
{
  "value": 502,
  "label": "东洲区" },
{
  "value": 503,
  "label": "望花区" },
{
  "value": 504,
  "label": "顺城区" },
{
  "value": 505,
  "label": "抚顺县" },
{
  "value": 506,
  "label": "新宾满族自治县" },
{
  "value": 507,
  "label": "清原满族自治县" }],

[{
  "value": 509,
  "label": "平山区" },
{
  "value": 510,
  "label": "溪湖区" },
{
  "value": 511,
  "label": "明山区" },
{
  "value": 512,
  "label": "南芬区" },
{
  "value": 513,
  "label": "本溪满族自治县" },
{
  "value": 514,
  "label": "桓仁满族自治县" }],

[{
  "value": 516,
  "label": "元宝区" },
{
  "value": 517,
  "label": "振兴区" },
{
  "value": 518,
  "label": "振安区" },
{
  "value": 519,
  "label": "宽甸满族自治县" },
{
  "value": 520,
  "label": "东港市" },
{
  "value": 521,
  "label": "凤城市" }],

[{
  "value": 523,
  "label": "古塔区" },
{
  "value": 524,
  "label": "凌河区" },
{
  "value": 525,
  "label": "太和区" },
{
  "value": 526,
  "label": "黑山县" },
{
  "value": 527,
  "label": "义县" },
{
  "value": 528,
  "label": "凌海市" },
{
  "value": 529,
  "label": "北镇市" }],

[{
  "value": 531,
  "label": "站前区" },
{
  "value": 532,
  "label": "西市区" },
{
  "value": 533,
  "label": "鲅鱼圈区" },
{
  "value": 534,
  "label": "老边区" },
{
  "value": 535,
  "label": "盖州市" },
{
  "value": 536,
  "label": "大石桥市" }],

[{
  "value": 538,
  "label": "海州区" },
{
  "value": 539,
  "label": "新邱区" },
{
  "value": 540,
  "label": "太平区" },
{
  "value": 541,
  "label": "清河门区" },
{
  "value": 542,
  "label": "细河区" },
{
  "value": 543,
  "label": "阜新蒙古族自治县" },
{
  "value": 544,
  "label": "彰武县" }],

[{
  "value": 546,
  "label": "白塔区" },
{
  "value": 547,
  "label": "文圣区" },
{
  "value": 548,
  "label": "宏伟区" },
{
  "value": 549,
  "label": "弓长岭区" },
{
  "value": 550,
  "label": "太子河区" },
{
  "value": 551,
  "label": "辽阳县" },
{
  "value": 552,
  "label": "灯塔市" }],

[{
  "value": 554,
  "label": "双台子区" },
{
  "value": 555,
  "label": "兴隆台区" },
{
  "value": 556,
  "label": "大洼县" },
{
  "value": 557,
  "label": "盘山县" }],

[{
  "value": 559,
  "label": "银州区" },
{
  "value": 560,
  "label": "清河区" },
{
  "value": 561,
  "label": "铁岭县" },
{
  "value": 562,
  "label": "西丰县" },
{
  "value": 563,
  "label": "昌图县" },
{
  "value": 564,
  "label": "调兵山市" },
{
  "value": 565,
  "label": "开原市" }],

[{
  "value": 567,
  "label": "双塔区" },
{
  "value": 568,
  "label": "龙城区" },
{
  "value": 569,
  "label": "朝阳县" },
{
  "value": 570,
  "label": "建平县" },
{
  "value": 571,
  "label": "喀喇沁左翼蒙古族自治县" },
{
  "value": 572,
  "label": "北票市" },
{
  "value": 573,
  "label": "凌源市" }],

[{
  "value": 575,
  "label": "连山区" },
{
  "value": 576,
  "label": "龙港区" },
{
  "value": 577,
  "label": "南票区" },
{
  "value": 578,
  "label": "绥中县" },
{
  "value": 579,
  "label": "建昌县" },
{
  "value": 580,
  "label": "兴城市" }],

[{
  "value": 582,
  "label": "金州新区" },
{
  "value": 583,
  "label": "普湾新区" },
{
  "value": 584,
  "label": "保税区" }]],


[
[{
  "value": 587,
  "label": "南关区" },
{
  "value": 588,
  "label": "宽城区" },
{
  "value": 589,
  "label": "朝阳区" },
{
  "value": 590,
  "label": "二道区" },
{
  "value": 591,
  "label": "绿园区" },
{
  "value": 592,
  "label": "双阳区" },
{
  "value": 593,
  "label": "九台区" },
{
  "value": 594,
  "label": "农安县" },
{
  "value": 595,
  "label": "榆树市" },
{
  "value": 596,
  "label": "德惠市" }],

[{
  "value": 598,
  "label": "昌邑区" },
{
  "value": 599,
  "label": "龙潭区" },
{
  "value": 600,
  "label": "船营区" },
{
  "value": 601,
  "label": "丰满区" },
{
  "value": 602,
  "label": "永吉县" },
{
  "value": 603,
  "label": "蛟河市" },
{
  "value": 604,
  "label": "桦甸市" },
{
  "value": 605,
  "label": "舒兰市" },
{
  "value": 606,
  "label": "磐石市" }],

[{
  "value": 608,
  "label": "铁西区" },
{
  "value": 609,
  "label": "铁东区" },
{
  "value": 610,
  "label": "梨树县" },
{
  "value": 611,
  "label": "伊通满族自治县" },
{
  "value": 612,
  "label": "公主岭市" },
{
  "value": 613,
  "label": "双辽市" }],

[{
  "value": 615,
  "label": "龙山区" },
{
  "value": 616,
  "label": "西安区" },
{
  "value": 617,
  "label": "东丰县" },
{
  "value": 618,
  "label": "东辽县" }],

[{
  "value": 620,
  "label": "东昌区" },
{
  "value": 621,
  "label": "二道江区" },
{
  "value": 622,
  "label": "通化县" },
{
  "value": 623,
  "label": "辉南县" },
{
  "value": 624,
  "label": "柳河县" },
{
  "value": 625,
  "label": "梅河口市" },
{
  "value": 626,
  "label": "集安市" }],

[{
  "value": 628,
  "label": "浑江区" },
{
  "value": 629,
  "label": "江源区" },
{
  "value": 630,
  "label": "抚松县" },
{
  "value": 631,
  "label": "靖宇县" },
{
  "value": 632,
  "label": "长白朝鲜族自治县" },
{
  "value": 633,
  "label": "临江市" }],

[{
  "value": 635,
  "label": "宁江区" },
{
  "value": 636,
  "label": "前郭尔罗斯蒙古族自治县" },
{
  "value": 637,
  "label": "长岭县" },
{
  "value": 638,
  "label": "乾安县" },
{
  "value": 639,
  "label": "扶余市" }],

[{
  "value": 641,
  "label": "洮北区" },
{
  "value": 642,
  "label": "镇赉县" },
{
  "value": 643,
  "label": "通榆县" },
{
  "value": 644,
  "label": "洮南市" },
{
  "value": 645,
  "label": "大安市" }],

[{
  "value": 647,
  "label": "延吉市" },
{
  "value": 648,
  "label": "图们市" },
{
  "value": 649,
  "label": "敦化市" },
{
  "value": 650,
  "label": "珲春市" },
{
  "value": 651,
  "label": "龙井市" },
{
  "value": 652,
  "label": "和龙市" },
{
  "value": 653,
  "label": "汪清县" },
{
  "value": 654,
  "label": "安图县" }]],


[
[{
  "value": 657,
  "label": "道里区" },
{
  "value": 658,
  "label": "南岗区" },
{
  "value": 659,
  "label": "道外区" },
{
  "value": 660,
  "label": "平房区" },
{
  "value": 661,
  "label": "松北区" },
{
  "value": 662,
  "label": "香坊区" },
{
  "value": 663,
  "label": "呼兰区" },
{
  "value": 664,
  "label": "阿城区" },
{
  "value": 665,
  "label": "双城区" },
{
  "value": 666,
  "label": "依兰县" },
{
  "value": 667,
  "label": "方正县" },
{
  "value": 668,
  "label": "宾县" },
{
  "value": 669,
  "label": "巴彦县" },
{
  "value": 670,
  "label": "木兰县" },
{
  "value": 671,
  "label": "通河县" },
{
  "value": 672,
  "label": "延寿县" },
{
  "value": 673,
  "label": "尚志市" },
{
  "value": 674,
  "label": "五常市" }],

[{
  "value": 676,
  "label": "龙沙区" },
{
  "value": 677,
  "label": "建华区" },
{
  "value": 678,
  "label": "铁锋区" },
{
  "value": 679,
  "label": "昂昂溪区" },
{
  "value": 680,
  "label": "富拉尔基区" },
{
  "value": 681,
  "label": "碾子山区" },
{
  "value": 682,
  "label": "梅里斯达斡尔族区" },
{
  "value": 683,
  "label": "龙江县" },
{
  "value": 684,
  "label": "依安县" },
{
  "value": 685,
  "label": "泰来县" },
{
  "value": 686,
  "label": "甘南县" },
{
  "value": 687,
  "label": "富裕县" },
{
  "value": 688,
  "label": "克山县" },
{
  "value": 689,
  "label": "克东县" },
{
  "value": 690,
  "label": "拜泉县" },
{
  "value": 691,
  "label": "讷河市" }],

[{
  "value": 693,
  "label": "鸡冠区" },
{
  "value": 694,
  "label": "恒山区" },
{
  "value": 695,
  "label": "滴道区" },
{
  "value": 696,
  "label": "梨树区" },
{
  "value": 697,
  "label": "城子河区" },
{
  "value": 698,
  "label": "麻山区" },
{
  "value": 699,
  "label": "鸡东县" },
{
  "value": 700,
  "label": "虎林市" },
{
  "value": 701,
  "label": "密山市" }],

[{
  "value": 703,
  "label": "向阳区" },
{
  "value": 704,
  "label": "工农区" },
{
  "value": 705,
  "label": "南山区" },
{
  "value": 706,
  "label": "兴安区" },
{
  "value": 707,
  "label": "东山区" },
{
  "value": 708,
  "label": "兴山区" },
{
  "value": 709,
  "label": "萝北县" },
{
  "value": 710,
  "label": "绥滨县" }],

[{
  "value": 712,
  "label": "尖山区" },
{
  "value": 713,
  "label": "岭东区" },
{
  "value": 714,
  "label": "四方台区" },
{
  "value": 715,
  "label": "宝山区" },
{
  "value": 716,
  "label": "集贤县" },
{
  "value": 717,
  "label": "友谊县" },
{
  "value": 718,
  "label": "宝清县" },
{
  "value": 719,
  "label": "饶河县" }],

[{
  "value": 721,
  "label": "萨尔图区" },
{
  "value": 722,
  "label": "龙凤区" },
{
  "value": 723,
  "label": "让胡路区" },
{
  "value": 724,
  "label": "红岗区" },
{
  "value": 725,
  "label": "大同区" },
{
  "value": 726,
  "label": "肇州县" },
{
  "value": 727,
  "label": "肇源县" },
{
  "value": 728,
  "label": "林甸县" },
{
  "value": 729,
  "label": "杜尔伯特蒙古族自治县" }],

[{
  "value": 731,
  "label": "伊春区" },
{
  "value": 732,
  "label": "南岔区" },
{
  "value": 733,
  "label": "友好区" },
{
  "value": 734,
  "label": "西林区" },
{
  "value": 735,
  "label": "翠峦区" },
{
  "value": 736,
  "label": "新青区" },
{
  "value": 737,
  "label": "美溪区" },
{
  "value": 738,
  "label": "金山屯区" },
{
  "value": 739,
  "label": "五营区" },
{
  "value": 740,
  "label": "乌马河区" },
{
  "value": 741,
  "label": "汤旺河区" },
{
  "value": 742,
  "label": "带岭区" },
{
  "value": 743,
  "label": "乌伊岭区" },
{
  "value": 744,
  "label": "红星区" },
{
  "value": 745,
  "label": "上甘岭区" },
{
  "value": 746,
  "label": "嘉荫县" },
{
  "value": 747,
  "label": "铁力市" }],

[{
  "value": 749,
  "label": "向阳区" },
{
  "value": 750,
  "label": "前进区" },
{
  "value": 751,
  "label": "东风区" },
{
  "value": 752,
  "label": "郊区" },
{
  "value": 753,
  "label": "桦南县" },
{
  "value": 754,
  "label": "桦川县" },
{
  "value": 755,
  "label": "汤原县" },
{
  "value": 756,
  "label": "抚远县" },
{
  "value": 757,
  "label": "同江市" },
{
  "value": 758,
  "label": "富锦市" }],

[{
  "value": 760,
  "label": "新兴区" },
{
  "value": 761,
  "label": "桃山区" },
{
  "value": 762,
  "label": "茄子河区" },
{
  "value": 763,
  "label": "勃利县" }],

[{
  "value": 765,
  "label": "东安区" },
{
  "value": 766,
  "label": "阳明区" },
{
  "value": 767,
  "label": "爱民区" },
{
  "value": 768,
  "label": "西安区" },
{
  "value": 769,
  "label": "东宁县" },
{
  "value": 770,
  "label": "林口县" },
{
  "value": 771,
  "label": "绥芬河市" },
{
  "value": 772,
  "label": "海林市" },
{
  "value": 773,
  "label": "宁安市" },
{
  "value": 774,
  "label": "穆棱市" }],

[{
  "value": 776,
  "label": "爱辉区" },
{
  "value": 777,
  "label": "嫩江县" },
{
  "value": 778,
  "label": "逊克县" },
{
  "value": 779,
  "label": "孙吴县" },
{
  "value": 780,
  "label": "北安市" },
{
  "value": 781,
  "label": "五大连池市" }],

[{
  "value": 783,
  "label": "北林区" },
{
  "value": 784,
  "label": "望奎县" },
{
  "value": 785,
  "label": "兰西县" },
{
  "value": 786,
  "label": "青冈县" },
{
  "value": 787,
  "label": "庆安县" },
{
  "value": 788,
  "label": "明水县" },
{
  "value": 789,
  "label": "绥棱县" },
{
  "value": 790,
  "label": "安达市" },
{
  "value": 791,
  "label": "肇东市" },
{
  "value": 792,
  "label": "海伦市" }],

[{
  "value": 794,
  "label": "加格达奇区" },
{
  "value": 795,
  "label": "新林区" },
{
  "value": 796,
  "label": "松岭区" },
{
  "value": 797,
  "label": "呼中区" },
{
  "value": 798,
  "label": "呼玛县" },
{
  "value": 799,
  "label": "塔河县" },
{
  "value": 800,
  "label": "漠河县" }]],


[
[{
  "value": 803,
  "label": "黄浦区" },
{
  "value": 804,
  "label": "徐汇区" },
{
  "value": 805,
  "label": "长宁区" },
{
  "value": 806,
  "label": "静安区" },
{
  "value": 807,
  "label": "普陀区" },
{
  "value": 808,
  "label": "闸北区" },
{
  "value": 809,
  "label": "虹口区" },
{
  "value": 810,
  "label": "杨浦区" },
{
  "value": 811,
  "label": "闵行区" },
{
  "value": 812,
  "label": "宝山区" },
{
  "value": 813,
  "label": "嘉定区" },
{
  "value": 814,
  "label": "浦东新区" },
{
  "value": 815,
  "label": "金山区" },
{
  "value": 816,
  "label": "松江区" },
{
  "value": 817,
  "label": "青浦区" },
{
  "value": 818,
  "label": "奉贤区" },
{
  "value": 819,
  "label": "崇明县" }]],


[
[{
  "value": 822,
  "label": "玄武区" },
{
  "value": 823,
  "label": "秦淮区" },
{
  "value": 824,
  "label": "建邺区" },
{
  "value": 825,
  "label": "鼓楼区" },
{
  "value": 826,
  "label": "浦口区" },
{
  "value": 827,
  "label": "栖霞区" },
{
  "value": 828,
  "label": "雨花台区" },
{
  "value": 829,
  "label": "江宁区" },
{
  "value": 830,
  "label": "六合区" },
{
  "value": 831,
  "label": "溧水区" },
{
  "value": 832,
  "label": "高淳区" }],

[{
  "value": 834,
  "label": "崇安区" },
{
  "value": 835,
  "label": "南长区" },
{
  "value": 836,
  "label": "北塘区" },
{
  "value": 837,
  "label": "锡山区" },
{
  "value": 838,
  "label": "惠山区" },
{
  "value": 839,
  "label": "滨湖区" },
{
  "value": 840,
  "label": "江阴市" },
{
  "value": 841,
  "label": "宜兴市" }],

[{
  "value": 843,
  "label": "鼓楼区" },
{
  "value": 844,
  "label": "云龙区" },
{
  "value": 845,
  "label": "贾汪区" },
{
  "value": 846,
  "label": "泉山区" },
{
  "value": 847,
  "label": "铜山区" },
{
  "value": 848,
  "label": "丰县" },
{
  "value": 849,
  "label": "沛县" },
{
  "value": 850,
  "label": "睢宁县" },
{
  "value": 851,
  "label": "新沂市" },
{
  "value": 852,
  "label": "邳州市" }],

[{
  "value": 854,
  "label": "天宁区" },
{
  "value": 855,
  "label": "钟楼区" },
{
  "value": 856,
  "label": "戚墅堰区" },
{
  "value": 857,
  "label": "新北区" },
{
  "value": 858,
  "label": "武进区" },
{
  "value": 859,
  "label": "溧阳市" },
{
  "value": 860,
  "label": "金坛市" }],

[{
  "value": 862,
  "label": "虎丘区" },
{
  "value": 863,
  "label": "吴中区" },
{
  "value": 864,
  "label": "相城区" },
{
  "value": 865,
  "label": "姑苏区" },
{
  "value": 866,
  "label": "吴江区" },
{
  "value": 867,
  "label": "常熟市" },
{
  "value": 868,
  "label": "张家港市" },
{
  "value": 869,
  "label": "昆山市" },
{
  "value": 870,
  "label": "太仓市" }],

[{
  "value": 872,
  "label": "崇川区" },
{
  "value": 873,
  "label": "港闸区" },
{
  "value": 874,
  "label": "通州区" },
{
  "value": 875,
  "label": "海安县" },
{
  "value": 876,
  "label": "如东县" },
{
  "value": 877,
  "label": "启东市" },
{
  "value": 878,
  "label": "如皋市" },
{
  "value": 879,
  "label": "海门市" }],

[{
  "value": 881,
  "label": "连云区" },
{
  "value": 882,
  "label": "海州区" },
{
  "value": 883,
  "label": "赣榆区" },
{
  "value": 884,
  "label": "东海县" },
{
  "value": 885,
  "label": "灌云县" },
{
  "value": 886,
  "label": "灌南县" }],

[{
  "value": 888,
  "label": "清河区" },
{
  "value": 889,
  "label": "淮安区" },
{
  "value": 890,
  "label": "淮阴区" },
{
  "value": 891,
  "label": "清浦区" },
{
  "value": 892,
  "label": "涟水县" },
{
  "value": 893,
  "label": "洪泽县" },
{
  "value": 894,
  "label": "盱眙县" },
{
  "value": 895,
  "label": "金湖县" }],

[{
  "value": 897,
  "label": "亭湖区" },
{
  "value": 898,
  "label": "盐都区" },
{
  "value": 899,
  "label": "响水县" },
{
  "value": 900,
  "label": "滨海县" },
{
  "value": 901,
  "label": "阜宁县" },
{
  "value": 902,
  "label": "射阳县" },
{
  "value": 903,
  "label": "建湖县" },
{
  "value": 904,
  "label": "东台市" },
{
  "value": 905,
  "label": "大丰市" }],

[{
  "value": 907,
  "label": "广陵区" },
{
  "value": 908,
  "label": "邗江区" },
{
  "value": 909,
  "label": "江都区" },
{
  "value": 910,
  "label": "宝应县" },
{
  "value": 911,
  "label": "仪征市" },
{
  "value": 912,
  "label": "高邮市" }],

[{
  "value": 914,
  "label": "京口区" },
{
  "value": 915,
  "label": "润州区" },
{
  "value": 916,
  "label": "丹徒区" },
{
  "value": 917,
  "label": "丹阳市" },
{
  "value": 918,
  "label": "扬中市" },
{
  "value": 919,
  "label": "句容市" }],

[{
  "value": 921,
  "label": "海陵区" },
{
  "value": 922,
  "label": "高港区" },
{
  "value": 923,
  "label": "姜堰区" },
{
  "value": 924,
  "label": "兴化市" },
{
  "value": 925,
  "label": "靖江市" },
{
  "value": 926,
  "label": "泰兴市" }],

[{
  "value": 928,
  "label": "宿城区" },
{
  "value": 929,
  "label": "宿豫区" },
{
  "value": 930,
  "label": "沭阳县" },
{
  "value": 931,
  "label": "泗阳县" },
{
  "value": 932,
  "label": "泗洪县" }]],


[
[{
  "value": 935,
  "label": "上城区" },
{
  "value": 936,
  "label": "下城区" },
{
  "value": 937,
  "label": "江干区" },
{
  "value": 938,
  "label": "拱墅区" },
{
  "value": 939,
  "label": "西湖区" },
{
  "value": 940,
  "label": "滨江区" },
{
  "value": 941,
  "label": "萧山区" },
{
  "value": 942,
  "label": "余杭区" },
{
  "value": 943,
  "label": "桐庐县" },
{
  "value": 944,
  "label": "淳安县" },
{
  "value": 945,
  "label": "建德市" },
{
  "value": 946,
  "label": "富阳区" },
{
  "value": 947,
  "label": "临安市" }],

[{
  "value": 949,
  "label": "海曙区" },
{
  "value": 950,
  "label": "江东区" },
{
  "value": 951,
  "label": "江北区" },
{
  "value": 952,
  "label": "北仑区" },
{
  "value": 953,
  "label": "镇海区" },
{
  "value": 954,
  "label": "鄞州区" },
{
  "value": 955,
  "label": "象山县" },
{
  "value": 956,
  "label": "宁海县" },
{
  "value": 957,
  "label": "余姚市" },
{
  "value": 958,
  "label": "慈溪市" },
{
  "value": 959,
  "label": "奉化市" }],

[{
  "value": 961,
  "label": "鹿城区" },
{
  "value": 962,
  "label": "龙湾区" },
{
  "value": 963,
  "label": "瓯海区" },
{
  "value": 964,
  "label": "洞头县" },
{
  "value": 965,
  "label": "永嘉县" },
{
  "value": 966,
  "label": "平阳县" },
{
  "value": 967,
  "label": "苍南县" },
{
  "value": 968,
  "label": "文成县" },
{
  "value": 969,
  "label": "泰顺县" },
{
  "value": 970,
  "label": "瑞安市" },
{
  "value": 971,
  "label": "乐清市" }],

[{
  "value": 973,
  "label": "南湖区" },
{
  "value": 974,
  "label": "秀洲区" },
{
  "value": 975,
  "label": "嘉善县" },
{
  "value": 976,
  "label": "海盐县" },
{
  "value": 977,
  "label": "海宁市" },
{
  "value": 978,
  "label": "平湖市" },
{
  "value": 979,
  "label": "桐乡市" }],

[{
  "value": 981,
  "label": "吴兴区" },
{
  "value": 982,
  "label": "南浔区" },
{
  "value": 983,
  "label": "德清县" },
{
  "value": 984,
  "label": "长兴县" },
{
  "value": 985,
  "label": "安吉县" }],

[{
  "value": 987,
  "label": "越城区" },
{
  "value": 988,
  "label": "柯桥区" },
{
  "value": 989,
  "label": "上虞区" },
{
  "value": 990,
  "label": "新昌县" },
{
  "value": 991,
  "label": "诸暨市" },
{
  "value": 992,
  "label": "嵊州市" }],

[{
  "value": 994,
  "label": "婺城区" },
{
  "value": 995,
  "label": "金东区" },
{
  "value": 996,
  "label": "武义县" },
{
  "value": 997,
  "label": "浦江县" },
{
  "value": 998,
  "label": "磐安县" },
{
  "value": 999,
  "label": "兰溪市" },
{
  "value": 1000,
  "label": "义乌市" },
{
  "value": 1001,
  "label": "东阳市" },
{
  "value": 1002,
  "label": "永康市" }],

[{
  "value": 1004,
  "label": "柯城区" },
{
  "value": 1005,
  "label": "衢江区" },
{
  "value": 1006,
  "label": "常山县" },
{
  "value": 1007,
  "label": "开化县" },
{
  "value": 1008,
  "label": "龙游县" },
{
  "value": 1009,
  "label": "江山市" }],

[{
  "value": 1011,
  "label": "定海区" },
{
  "value": 1012,
  "label": "普陀区" },
{
  "value": 1013,
  "label": "岱山县" },
{
  "value": 1014,
  "label": "嵊泗县" }],

[{
  "value": 1016,
  "label": "椒江区" },
{
  "value": 1017,
  "label": "黄岩区" },
{
  "value": 1018,
  "label": "路桥区" },
{
  "value": 1019,
  "label": "玉环县" },
{
  "value": 1020,
  "label": "三门县" },
{
  "value": 1021,
  "label": "天台县" },
{
  "value": 1022,
  "label": "仙居县" },
{
  "value": 1023,
  "label": "温岭市" },
{
  "value": 1024,
  "label": "临海市" }],

[{
  "value": 1026,
  "label": "莲都区" },
{
  "value": 1027,
  "label": "青田县" },
{
  "value": 1028,
  "label": "缙云县" },
{
  "value": 1029,
  "label": "遂昌县" },
{
  "value": 1030,
  "label": "松阳县" },
{
  "value": 1031,
  "label": "云和县" },
{
  "value": 1032,
  "label": "庆元县" },
{
  "value": 1033,
  "label": "景宁畲族自治县" },
{
  "value": 1034,
  "label": "龙泉市" }],

[{
  "value": 1036,
  "label": "金塘岛" },
{
  "value": 1037,
  "label": "六横岛" },
{
  "value": 1038,
  "label": "衢山岛" },
{
  "value": 1039,
  "label": "舟山本岛西北部" },
{
  "value": 1040,
  "label": "岱山岛西南部" },
{
  "value": 1041,
  "label": "泗礁岛" },
{
  "value": 1042,
  "label": "朱家尖岛" },
{
  "value": 1043,
  "label": "洋山岛" },
{
  "value": 1044,
  "label": "长涂岛" },
{
  "value": 1045,
  "label": "虾峙岛" }]],


[
[{
  "value": 1048,
  "label": "瑶海区" },
{
  "value": 1049,
  "label": "庐阳区" },
{
  "value": 1050,
  "label": "蜀山区" },
{
  "value": 1051,
  "label": "包河区" },
{
  "value": 1052,
  "label": "长丰县" },
{
  "value": 1053,
  "label": "肥东县" },
{
  "value": 1054,
  "label": "肥西县" },
{
  "value": 1055,
  "label": "庐江县" },
{
  "value": 1056,
  "label": "巢湖市" }],

[{
  "value": 1058,
  "label": "镜湖区" },
{
  "value": 1059,
  "label": "弋江区" },
{
  "value": 1060,
  "label": "鸠江区" },
{
  "value": 1061,
  "label": "三山区" },
{
  "value": 1062,
  "label": "芜湖县" },
{
  "value": 1063,
  "label": "繁昌县" },
{
  "value": 1064,
  "label": "南陵县" },
{
  "value": 1065,
  "label": "无为县" }],

[{
  "value": 1067,
  "label": "龙子湖区" },
{
  "value": 1068,
  "label": "蚌山区" },
{
  "value": 1069,
  "label": "禹会区" },
{
  "value": 1070,
  "label": "淮上区" },
{
  "value": 1071,
  "label": "怀远县" },
{
  "value": 1072,
  "label": "五河县" },
{
  "value": 1073,
  "label": "固镇县" }],

[{
  "value": 1075,
  "label": "大通区" },
{
  "value": 1076,
  "label": "田家庵区" },
{
  "value": 1077,
  "label": "谢家集区" },
{
  "value": 1078,
  "label": "八公山区" },
{
  "value": 1079,
  "label": "潘集区" },
{
  "value": 1080,
  "label": "凤台县" }],

[{
  "value": 1082,
  "label": "花山区" },
{
  "value": 1083,
  "label": "雨山区" },
{
  "value": 1084,
  "label": "博望区" },
{
  "value": 1085,
  "label": "当涂县" },
{
  "value": 1086,
  "label": "含山县" },
{
  "value": 1087,
  "label": "和县" }],

[{
  "value": 1089,
  "label": "杜集区" },
{
  "value": 1090,
  "label": "相山区" },
{
  "value": 1091,
  "label": "烈山区" },
{
  "value": 1092,
  "label": "濉溪县" }],

[{
  "value": 1094,
  "label": "铜官山区" },
{
  "value": 1095,
  "label": "狮子山区" },
{
  "value": 1096,
  "label": "郊区" },
{
  "value": 1097,
  "label": "铜陵县" }],

[{
  "value": 1099,
  "label": "迎江区" },
{
  "value": 1100,
  "label": "大观区" },
{
  "value": 1101,
  "label": "宜秀区" },
{
  "value": 1102,
  "label": "怀宁县" },
{
  "value": 1103,
  "label": "枞阳县" },
{
  "value": 1104,
  "label": "潜山县" },
{
  "value": 1105,
  "label": "太湖县" },
{
  "value": 1106,
  "label": "宿松县" },
{
  "value": 1107,
  "label": "望江县" },
{
  "value": 1108,
  "label": "岳西县" },
{
  "value": 1109,
  "label": "桐城市" }],

[{
  "value": 1111,
  "label": "屯溪区" },
{
  "value": 1112,
  "label": "黄山区" },
{
  "value": 1113,
  "label": "徽州区" },
{
  "value": 1114,
  "label": "歙县" },
{
  "value": 1115,
  "label": "休宁县" },
{
  "value": 1116,
  "label": "黟县" },
{
  "value": 1117,
  "label": "祁门县" }],

[{
  "value": 1119,
  "label": "琅琊区" },
{
  "value": 1120,
  "label": "南谯区" },
{
  "value": 1121,
  "label": "来安县" },
{
  "value": 1122,
  "label": "全椒县" },
{
  "value": 1123,
  "label": "定远县" },
{
  "value": 1124,
  "label": "凤阳县" },
{
  "value": 1125,
  "label": "天长市" },
{
  "value": 1126,
  "label": "明光市" }],

[{
  "value": 1128,
  "label": "颍州区" },
{
  "value": 1129,
  "label": "颍东区" },
{
  "value": 1130,
  "label": "颍泉区" },
{
  "value": 1131,
  "label": "临泉县" },
{
  "value": 1132,
  "label": "太和县" },
{
  "value": 1133,
  "label": "阜南县" },
{
  "value": 1134,
  "label": "颍上县" },
{
  "value": 1135,
  "label": "界首市" }],

[{
  "value": 1137,
  "label": "埇桥区" },
{
  "value": 1138,
  "label": "砀山县" },
{
  "value": 1139,
  "label": "萧县" },
{
  "value": 1140,
  "label": "灵璧县" },
{
  "value": 1141,
  "label": "泗县" }],

[{
  "value": 1143,
  "label": "金安区" },
{
  "value": 1144,
  "label": "裕安区" },
{
  "value": 1145,
  "label": "寿县" },
{
  "value": 1146,
  "label": "霍邱县" },
{
  "value": 1147,
  "label": "舒城县" },
{
  "value": 1148,
  "label": "金寨县" },
{
  "value": 1149,
  "label": "霍山县" }],

[{
  "value": 1151,
  "label": "谯城区" },
{
  "value": 1152,
  "label": "涡阳县" },
{
  "value": 1153,
  "label": "蒙城县" },
{
  "value": 1154,
  "label": "利辛县" }],

[{
  "value": 1156,
  "label": "贵池区" },
{
  "value": 1157,
  "label": "东至县" },
{
  "value": 1158,
  "label": "石台县" },
{
  "value": 1159,
  "label": "青阳县" }],

[{
  "value": 1161,
  "label": "宣州区" },
{
  "value": 1162,
  "label": "郎溪县" },
{
  "value": 1163,
  "label": "广德县" },
{
  "value": 1164,
  "label": "泾县" },
{
  "value": 1165,
  "label": "绩溪县" },
{
  "value": 1166,
  "label": "旌德县" },
{
  "value": 1167,
  "label": "宁国市" }]],


[
[{
  "value": 1170,
  "label": "鼓楼区" },
{
  "value": 1171,
  "label": "台江区" },
{
  "value": 1172,
  "label": "仓山区" },
{
  "value": 1173,
  "label": "马尾区" },
{
  "value": 1174,
  "label": "晋安区" },
{
  "value": 1175,
  "label": "闽侯县" },
{
  "value": 1176,
  "label": "连江县" },
{
  "value": 1177,
  "label": "罗源县" },
{
  "value": 1178,
  "label": "闽清县" },
{
  "value": 1179,
  "label": "永泰县" },
{
  "value": 1180,
  "label": "平潭县" },
{
  "value": 1181,
  "label": "福清市" },
{
  "value": 1182,
  "label": "长乐市" }],

[{
  "value": 1184,
  "label": "思明区" },
{
  "value": 1185,
  "label": "海沧区" },
{
  "value": 1186,
  "label": "湖里区" },
{
  "value": 1187,
  "label": "集美区" },
{
  "value": 1188,
  "label": "同安区" },
{
  "value": 1189,
  "label": "翔安区" }],

[{
  "value": 1191,
  "label": "城厢区" },
{
  "value": 1192,
  "label": "涵江区" },
{
  "value": 1193,
  "label": "荔城区" },
{
  "value": 1194,
  "label": "秀屿区" },
{
  "value": 1195,
  "label": "仙游县" }],

[{
  "value": 1197,
  "label": "梅列区" },
{
  "value": 1198,
  "label": "三元区" },
{
  "value": 1199,
  "label": "明溪县" },
{
  "value": 1200,
  "label": "清流县" },
{
  "value": 1201,
  "label": "宁化县" },
{
  "value": 1202,
  "label": "大田县" },
{
  "value": 1203,
  "label": "尤溪县" },
{
  "value": 1204,
  "label": "沙县" },
{
  "value": 1205,
  "label": "将乐县" },
{
  "value": 1206,
  "label": "泰宁县" },
{
  "value": 1207,
  "label": "建宁县" },
{
  "value": 1208,
  "label": "永安市" }],

[{
  "value": 1210,
  "label": "鲤城区" },
{
  "value": 1211,
  "label": "丰泽区" },
{
  "value": 1212,
  "label": "洛江区" },
{
  "value": 1213,
  "label": "泉港区" },
{
  "value": 1214,
  "label": "惠安县" },
{
  "value": 1215,
  "label": "安溪县" },
{
  "value": 1216,
  "label": "永春县" },
{
  "value": 1217,
  "label": "德化县" },
{
  "value": 1218,
  "label": "金门县" },
{
  "value": 1219,
  "label": "石狮市" },
{
  "value": 1220,
  "label": "晋江市" },
{
  "value": 1221,
  "label": "南安市" }],

[{
  "value": 1223,
  "label": "芗城区" },
{
  "value": 1224,
  "label": "龙文区" },
{
  "value": 1225,
  "label": "云霄县" },
{
  "value": 1226,
  "label": "漳浦县" },
{
  "value": 1227,
  "label": "诏安县" },
{
  "value": 1228,
  "label": "长泰县" },
{
  "value": 1229,
  "label": "东山县" },
{
  "value": 1230,
  "label": "南靖县" },
{
  "value": 1231,
  "label": "平和县" },
{
  "value": 1232,
  "label": "华安县" },
{
  "value": 1233,
  "label": "龙海市" }],

[{
  "value": 1235,
  "label": "延平区" },
{
  "value": 1236,
  "label": "建阳区" },
{
  "value": 1237,
  "label": "顺昌县" },
{
  "value": 1238,
  "label": "浦城县" },
{
  "value": 1239,
  "label": "光泽县" },
{
  "value": 1240,
  "label": "松溪县" },
{
  "value": 1241,
  "label": "政和县" },
{
  "value": 1242,
  "label": "邵武市" },
{
  "value": 1243,
  "label": "武夷山市" },
{
  "value": 1244,
  "label": "建瓯市" }],

[{
  "value": 1246,
  "label": "新罗区" },
{
  "value": 1247,
  "label": "长汀县" },
{
  "value": 1248,
  "label": "永定区" },
{
  "value": 1249,
  "label": "上杭县" },
{
  "value": 1250,
  "label": "武平县" },
{
  "value": 1251,
  "label": "连城县" },
{
  "value": 1252,
  "label": "漳平市" }],

[{
  "value": 1254,
  "label": "蕉城区" },
{
  "value": 1255,
  "label": "霞浦县" },
{
  "value": 1256,
  "label": "古田县" },
{
  "value": 1257,
  "label": "屏南县" },
{
  "value": 1258,
  "label": "寿宁县" },
{
  "value": 1259,
  "label": "周宁县" },
{
  "value": 1260,
  "label": "柘荣县" },
{
  "value": 1261,
  "label": "福安市" },
{
  "value": 1262,
  "label": "福鼎市" }]],


[
[{
  "label": "东湖区",
  "value": 1264 },

{
  "label": "西湖区",
  "value": 1265 },

{
  "label": "青云谱区",
  "value": 1266 },

{
  "label": "湾里区",
  "value": 1267 },

{
  "label": "青山湖区",
  "value": 1268 },

{
  "label": "新建区",
  "value": 1269 },

{
  "label": "南昌县",
  "value": 1270 },

{
  "label": "安义县",
  "value": 1271 },

{
  "label": "进贤县",
  "value": 1272 }],


[{
  "label": "昌江区",
  "value": 1274 },

{
  "label": "珠山区",
  "value": 1275 },

{
  "label": "浮梁县",
  "value": 1276 },

{
  "label": "乐平市",
  "value": 1277 }],


[{
  "label": "安源区",
  "value": 1279 },

{
  "label": "湘东区",
  "value": 1280 },

{
  "label": "莲花县",
  "value": 1281 },

{
  "label": "上栗县",
  "value": 1282 },

{
  "label": "芦溪县",
  "value": 1283 }],


[{
  "label": "濂溪区",
  "value": 1285 },

{
  "label": "浔阳区",
  "value": 1286 },

{
  "label": "柴桑区",
  "value": 1287 },

{
  "label": "武宁县",
  "value": 1288 },

{
  "label": "修水县",
  "value": 1289 },

{
  "label": "永修县",
  "value": 1290 },

{
  "label": "德安县",
  "value": 1291 },

{
  "label": "都昌县",
  "value": 1292 },

{
  "label": "湖口县",
  "value": 1293 },

{
  "label": "彭泽县",
  "value": 1294 },

{
  "label": "瑞昌市",
  "value": 1295 },

{
  "label": "共青城市",
  "value": 1296 },

{
  "label": "庐山市",
  "value": 1297 }],


[{
  "label": "渝水区",
  "value": 1299 },

{
  "label": "分宜县",
  "value": 1300 }],


[{
  "label": "月湖区",
  "value": 1302 },

{
  "label": "余江县",
  "value": 1303 },

{
  "label": "贵溪市",
  "value": 1304 }],


[{
  "label": "章贡区",
  "value": 1306 },

{
  "label": "南康区",
  "value": 1307 },

{
  "label": "赣县区",
  "value": 1308 },

{
  "label": "信丰县",
  "value": 1309 },

{
  "label": "大余县",
  "value": 1310 },

{
  "label": "上犹县",
  "value": 1311 },

{
  "label": "崇义县",
  "value": 1312 },

{
  "label": "安远县",
  "value": 1313 },

{
  "label": "龙南县",
  "value": 1314 },

{
  "label": "定南县",
  "value": 1315 },

{
  "label": "全南县",
  "value": 1316 },

{
  "label": "宁都县",
  "value": 1317 },

{
  "label": "于都县",
  "value": 1318 },

{
  "label": "兴国县",
  "value": 1319 },

{
  "label": "会昌县",
  "value": 1320 },

{
  "label": "寻乌县",
  "value": 1321 },

{
  "label": "石城县",
  "value": 1322 },

{
  "label": "瑞金市",
  "value": 1323 }],


[{
  "label": "吉州区",
  "value": 1325 },

{
  "label": "青原区",
  "value": 1326 },

{
  "label": "吉安县",
  "value": 1327 },

{
  "label": "吉水县",
  "value": 1328 },

{
  "label": "峡江县",
  "value": 1329 },

{
  "label": "新干县",
  "value": 1330 },

{
  "label": "永丰县",
  "value": 1331 },

{
  "label": "泰和县",
  "value": 1332 },

{
  "label": "遂川县",
  "value": 1333 },

{
  "label": "万安县",
  "value": 1334 },

{
  "label": "安福县",
  "value": 1335 },

{
  "label": "永新县",
  "value": 1336 },

{
  "label": "井冈山市",
  "value": 1337 }],


[{
  "label": "袁州区",
  "value": 1339 },

{
  "label": "奉新县",
  "value": 1340 },

{
  "label": "万载县",
  "value": 1341 },

{
  "label": "上高县",
  "value": 1342 },

{
  "label": "宜丰县",
  "value": 1343 },

{
  "label": "靖安县",
  "value": 1344 },

{
  "label": "铜鼓县",
  "value": 1345 },

{
  "label": "丰城市",
  "value": 1346 },

{
  "label": "樟树市",
  "value": 1347 },

{
  "label": "高安市",
  "value": 1348 }],


[{
  "label": "临川区",
  "value": 1350 },

{
  "label": "东乡区",
  "value": 1351 },

{
  "label": "南城县",
  "value": 1352 },

{
  "label": "黎川县",
  "value": 1353 },

{
  "label": "南丰县",
  "value": 1354 },

{
  "label": "崇仁县",
  "value": 1355 },

{
  "label": "乐安县",
  "value": 1356 },

{
  "label": "宜黄县",
  "value": 1357 },

{
  "label": "金溪县",
  "value": 1358 },

{
  "label": "资溪县",
  "value": 1359 },

{
  "label": "广昌县",
  "value": 1360 }],


[{
  "label": "信州区",
  "value": 1362 },

{
  "label": "广丰区",
  "value": 1363 },

{
  "label": "上饶县",
  "value": 1364 },

{
  "label": "玉山县",
  "value": 1365 },

{
  "label": "铅山县",
  "value": 1366 },

{
  "label": "横峰县",
  "value": 1367 },

{
  "label": "弋阳县",
  "value": 1368 },

{
  "label": "余干县",
  "value": 1369 },

{
  "label": "鄱阳县",
  "value": 1370 },

{
  "label": "万年县",
  "value": 1371 },

{
  "label": "婺源县",
  "value": 1372 },

{
  "label": "德兴市",
  "value": 1373 }]],



[
[{
  "value": 1377,
  "label": "历下区" },
{
  "value": 1378,
  "label": "市中区" },
{
  "value": 1379,
  "label": "槐荫区" },
{
  "value": 1380,
  "label": "天桥区" },
{
  "value": 1381,
  "label": "历城区" },
{
  "value": 1382,
  "label": "长清区" },
{
  "value": 1383,
  "label": "平阴县" },
{
  "value": 1384,
  "label": "济阳县" },
{
  "value": 1385,
  "label": "商河县" },
{
  "value": 1386,
  "label": "章丘市" }],

[{
  "value": 1388,
  "label": "市南区" },
{
  "value": 1389,
  "label": "市北区" },
{
  "value": 1390,
  "label": "黄岛区" },
{
  "value": 1391,
  "label": "崂山区" },
{
  "value": 1392,
  "label": "李沧区" },
{
  "value": 1393,
  "label": "城阳区" },
{
  "value": 1394,
  "label": "胶州市" },
{
  "value": 1395,
  "label": "即墨市" },
{
  "value": 1396,
  "label": "平度市" },
{
  "value": 1397,
  "label": "莱西市" },
{
  "value": 1398,
  "label": "西海岸新区" }],

[{
  "value": 1400,
  "label": "淄川区" },
{
  "value": 1401,
  "label": "张店区" },
{
  "value": 1402,
  "label": "博山区" },
{
  "value": 1403,
  "label": "临淄区" },
{
  "value": 1404,
  "label": "周村区" },
{
  "value": 1405,
  "label": "桓台县" },
{
  "value": 1406,
  "label": "高青县" },
{
  "value": 1407,
  "label": "沂源县" }],

[{
  "value": 1409,
  "label": "市中区" },
{
  "value": 1410,
  "label": "薛城区" },
{
  "value": 1411,
  "label": "峄城区" },
{
  "value": 1412,
  "label": "台儿庄区" },
{
  "value": 1413,
  "label": "山亭区" },
{
  "value": 1414,
  "label": "滕州市" }],

[{
  "value": 1416,
  "label": "东营区" },
{
  "value": 1417,
  "label": "河口区" },
{
  "value": 1418,
  "label": "垦利县" },
{
  "value": 1419,
  "label": "利津县" },
{
  "value": 1420,
  "label": "广饶县" }],

[{
  "value": 1422,
  "label": "芝罘区" },
{
  "value": 1423,
  "label": "福山区" },
{
  "value": 1424,
  "label": "牟平区" },
{
  "value": 1425,
  "label": "莱山区" },
{
  "value": 1426,
  "label": "长岛县" },
{
  "value": 1427,
  "label": "龙口市" },
{
  "value": 1428,
  "label": "莱阳市" },
{
  "value": 1429,
  "label": "莱州市" },
{
  "value": 1430,
  "label": "蓬莱市" },
{
  "value": 1431,
  "label": "招远市" },
{
  "value": 1432,
  "label": "栖霞市" },
{
  "value": 1433,
  "label": "海阳市" }],

[{
  "value": 1435,
  "label": "潍城区" },
{
  "value": 1436,
  "label": "寒亭区" },
{
  "value": 1437,
  "label": "坊子区" },
{
  "value": 1438,
  "label": "奎文区" },
{
  "value": 1439,
  "label": "临朐县" },
{
  "value": 1440,
  "label": "昌乐县" },
{
  "value": 1441,
  "label": "青州市" },
{
  "value": 1442,
  "label": "诸城市" },
{
  "value": 1443,
  "label": "寿光市" },
{
  "value": 1444,
  "label": "安丘市" },
{
  "value": 1445,
  "label": "高密市" },
{
  "value": 1446,
  "label": "昌邑市" }],

[{
  "value": 1448,
  "label": "任城区" },
{
  "value": 1449,
  "label": "兖州区" },
{
  "value": 1450,
  "label": "微山县" },
{
  "value": 1451,
  "label": "鱼台县" },
{
  "value": 1452,
  "label": "金乡县" },
{
  "value": 1453,
  "label": "嘉祥县" },
{
  "value": 1454,
  "label": "汶上县" },
{
  "value": 1455,
  "label": "泗水县" },
{
  "value": 1456,
  "label": "梁山县" },
{
  "value": 1457,
  "label": "曲阜市" },
{
  "value": 1458,
  "label": "邹城市" }],

[{
  "value": 1460,
  "label": "泰山区" },
{
  "value": 1461,
  "label": "岱岳区" },
{
  "value": 1462,
  "label": "宁阳县" },
{
  "value": 1463,
  "label": "东平县" },
{
  "value": 1464,
  "label": "新泰市" },
{
  "value": 1465,
  "label": "肥城市" }],

[{
  "value": 1467,
  "label": "环翠区" },
{
  "value": 1468,
  "label": "文登区" },
{
  "value": 1469,
  "label": "荣成市" },
{
  "value": 1470,
  "label": "乳山市" }],

[{
  "value": 1472,
  "label": "东港区" },
{
  "value": 1473,
  "label": "岚山区" },
{
  "value": 1474,
  "label": "五莲县" },
{
  "value": 1475,
  "label": "莒县" }],

[{
  "value": 1477,
  "label": "莱城区" },
{
  "value": 1478,
  "label": "钢城区" }],

[{
  "value": 1480,
  "label": "兰山区" },
{
  "value": 1481,
  "label": "罗庄区" },
{
  "value": 1482,
  "label": "河东区" },
{
  "value": 1483,
  "label": "沂南县" },
{
  "value": 1484,
  "label": "郯城县" },
{
  "value": 1485,
  "label": "沂水县" },
{
  "value": 1486,
  "label": "兰陵县" },
{
  "value": 1487,
  "label": "费县" },
{
  "value": 1488,
  "label": "平邑县" },
{
  "value": 1489,
  "label": "莒南县" },
{
  "value": 1490,
  "label": "蒙阴县" },
{
  "value": 1491,
  "label": "临沭县" }],

[{
  "value": 1493,
  "label": "德城区" },
{
  "value": 1494,
  "label": "陵城区" },
{
  "value": 1495,
  "label": "宁津县" },
{
  "value": 1496,
  "label": "庆云县" },
{
  "value": 1497,
  "label": "临邑县" },
{
  "value": 1498,
  "label": "齐河县" },
{
  "value": 1499,
  "label": "平原县" },
{
  "value": 1500,
  "label": "夏津县" },
{
  "value": 1501,
  "label": "武城县" },
{
  "value": 1502,
  "label": "乐陵市" },
{
  "value": 1503,
  "label": "禹城市" }],

[{
  "value": 1505,
  "label": "东昌府区" },
{
  "value": 1506,
  "label": "阳谷县" },
{
  "value": 1507,
  "label": "莘县" },
{
  "value": 1508,
  "label": "茌平县" },
{
  "value": 1509,
  "label": "东阿县" },
{
  "value": 1510,
  "label": "冠县" },
{
  "value": 1511,
  "label": "高唐县" },
{
  "value": 1512,
  "label": "临清市" }],

[{
  "value": 1514,
  "label": "滨城区" },
{
  "value": 1515,
  "label": "沾化区" },
{
  "value": 1516,
  "label": "惠民县" },
{
  "value": 1517,
  "label": "阳信县" },
{
  "value": 1518,
  "label": "无棣县" },
{
  "value": 1519,
  "label": "博兴县" },
{
  "value": 1520,
  "label": "邹平县" },
{
  "value": 1521,
  "label": "北海新区" }],

[{
  "value": 1523,
  "label": "牡丹区" },
{
  "value": 1524,
  "label": "曹县" },
{
  "value": 1525,
  "label": "单县" },
{
  "value": 1526,
  "label": "成武县" },
{
  "value": 1527,
  "label": "巨野县" },
{
  "value": 1528,
  "label": "郓城县" },
{
  "value": 1529,
  "label": "鄄城县" },
{
  "value": 1530,
  "label": "定陶县" },
{
  "value": 1531,
  "label": "东明县" }]],


[
[{
  "value": 1534,
  "label": "中原区" },
{
  "value": 1535,
  "label": "二七区" },
{
  "value": 1536,
  "label": "管城回族区" },
{
  "value": 1537,
  "label": "金水区" },
{
  "value": 1538,
  "label": "上街区" },
{
  "value": 1539,
  "label": "惠济区" },
{
  "value": 1540,
  "label": "中牟县" },
{
  "value": 1541,
  "label": "巩义市" },
{
  "value": 1542,
  "label": "荥阳市" },
{
  "value": 1543,
  "label": "新密市" },
{
  "value": 1544,
  "label": "新郑市" },
{
  "value": 1545,
  "label": "登封市" }],

[{
  "value": 1547,
  "label": "龙亭区" },
{
  "value": 1548,
  "label": "顺河回族区" },
{
  "value": 1549,
  "label": "鼓楼区" },
{
  "value": 1550,
  "label": "禹王台区" },
{
  "value": 1551,
  "label": "祥符区" },
{
  "value": 1552,
  "label": "杞县" },
{
  "value": 1553,
  "label": "通许县" },
{
  "value": 1554,
  "label": "尉氏县" },
{
  "value": 1555,
  "label": "兰考县" }],

[{
  "value": 1557,
  "label": "老城区" },
{
  "value": 1558,
  "label": "西工区" },
{
  "value": 1559,
  "label": "瀍河回族区" },
{
  "value": 1560,
  "label": "涧西区" },
{
  "value": 1561,
  "label": "吉利区" },
{
  "value": 1562,
  "label": "洛龙区" },
{
  "value": 1563,
  "label": "孟津县" },
{
  "value": 1564,
  "label": "新安县" },
{
  "value": 1565,
  "label": "栾川县" },
{
  "value": 1566,
  "label": "嵩县" },
{
  "value": 1567,
  "label": "汝阳县" },
{
  "value": 1568,
  "label": "宜阳县" },
{
  "value": 1569,
  "label": "洛宁县" },
{
  "value": 1570,
  "label": "伊川县" },
{
  "value": 1571,
  "label": "偃师市" }],

[{
  "value": 1573,
  "label": "新华区" },
{
  "value": 1574,
  "label": "卫东区" },
{
  "value": 1575,
  "label": "石龙区" },
{
  "value": 1576,
  "label": "湛河区" },
{
  "value": 1577,
  "label": "宝丰县" },
{
  "value": 1578,
  "label": "叶县" },
{
  "value": 1579,
  "label": "鲁山县" },
{
  "value": 1580,
  "label": "郏县" },
{
  "value": 1581,
  "label": "舞钢市" },
{
  "value": 1582,
  "label": "汝州市" }],

[{
  "value": 1584,
  "label": "文峰区" },
{
  "value": 1585,
  "label": "北关区" },
{
  "value": 1586,
  "label": "殷都区" },
{
  "value": 1587,
  "label": "龙安区" },
{
  "value": 1588,
  "label": "安阳县" },
{
  "value": 1589,
  "label": "汤阴县" },
{
  "value": 1590,
  "label": "滑县" },
{
  "value": 1591,
  "label": "内黄县" },
{
  "value": 1592,
  "label": "林州市" }],

[{
  "value": 1594,
  "label": "鹤山区" },
{
  "value": 1595,
  "label": "山城区" },
{
  "value": 1596,
  "label": "淇滨区" },
{
  "value": 1597,
  "label": "浚县" },
{
  "value": 1598,
  "label": "淇县" }],

[{
  "value": 1600,
  "label": "红旗区" },
{
  "value": 1601,
  "label": "卫滨区" },
{
  "value": 1602,
  "label": "凤泉区" },
{
  "value": 1603,
  "label": "牧野区" },
{
  "value": 1604,
  "label": "新乡县" },
{
  "value": 1605,
  "label": "获嘉县" },
{
  "value": 1606,
  "label": "原阳县" },
{
  "value": 1607,
  "label": "延津县" },
{
  "value": 1608,
  "label": "封丘县" },
{
  "value": 1609,
  "label": "长垣县" },
{
  "value": 1610,
  "label": "卫辉市" },
{
  "value": 1611,
  "label": "辉县市" }],

[{
  "value": 1613,
  "label": "解放区" },
{
  "value": 1614,
  "label": "中站区" },
{
  "value": 1615,
  "label": "马村区" },
{
  "value": 1616,
  "label": "山阳区" },
{
  "value": 1617,
  "label": "修武县" },
{
  "value": 1618,
  "label": "博爱县" },
{
  "value": 1619,
  "label": "武陟县" },
{
  "value": 1620,
  "label": "温县" },
{
  "value": 1621,
  "label": "沁阳市" },
{
  "value": 1622,
  "label": "孟州市" }],

[{
  "value": 1624,
  "label": "华龙区" },
{
  "value": 1625,
  "label": "清丰县" },
{
  "value": 1626,
  "label": "南乐县" },
{
  "value": 1627,
  "label": "范县" },
{
  "value": 1628,
  "label": "台前县" },
{
  "value": 1629,
  "label": "濮阳县" }],

[{
  "value": 1631,
  "label": "魏都区" },
{
  "value": 1632,
  "label": "许昌县" },
{
  "value": 1633,
  "label": "鄢陵县" },
{
  "value": 1634,
  "label": "襄城县" },
{
  "value": 1635,
  "label": "禹州市" },
{
  "value": 1636,
  "label": "长葛市" }],

[{
  "value": 1638,
  "label": "源汇区" },
{
  "value": 1639,
  "label": "郾城区" },
{
  "value": 1640,
  "label": "召陵区" },
{
  "value": 1641,
  "label": "舞阳县" },
{
  "value": 1642,
  "label": "临颍县" }],

[{
  "value": 1644,
  "label": "湖滨区" },
{
  "value": 1645,
  "label": "渑池县" },
{
  "value": 1646,
  "label": "陕县" },
{
  "value": 1647,
  "label": "卢氏县" },
{
  "value": 1648,
  "label": "义马市" },
{
  "value": 1649,
  "label": "灵宝市" }],

[{
  "value": 1651,
  "label": "宛城区" },
{
  "value": 1652,
  "label": "卧龙区" },
{
  "value": 1653,
  "label": "南召县" },
{
  "value": 1654,
  "label": "方城县" },
{
  "value": 1655,
  "label": "西峡县" },
{
  "value": 1656,
  "label": "镇平县" },
{
  "value": 1657,
  "label": "内乡县" },
{
  "value": 1658,
  "label": "淅川县" },
{
  "value": 1659,
  "label": "社旗县" },
{
  "value": 1660,
  "label": "唐河县" },
{
  "value": 1661,
  "label": "新野县" },
{
  "value": 1662,
  "label": "桐柏县" },
{
  "value": 1663,
  "label": "邓州市" }],

[{
  "value": 1665,
  "label": "梁园区" },
{
  "value": 1666,
  "label": "睢阳区" },
{
  "value": 1667,
  "label": "民权县" },
{
  "value": 1668,
  "label": "睢县" },
{
  "value": 1669,
  "label": "宁陵县" },
{
  "value": 1670,
  "label": "柘城县" },
{
  "value": 1671,
  "label": "虞城县" },
{
  "value": 1672,
  "label": "夏邑县" },
{
  "value": 1673,
  "label": "永城市" }],

[{
  "value": 1675,
  "label": "浉河区" },
{
  "value": 1676,
  "label": "平桥区" },
{
  "value": 1677,
  "label": "罗山县" },
{
  "value": 1678,
  "label": "光山县" },
{
  "value": 1679,
  "label": "新县" },
{
  "value": 1680,
  "label": "商城县" },
{
  "value": 1681,
  "label": "固始县" },
{
  "value": 1682,
  "label": "潢川县" },
{
  "value": 1683,
  "label": "淮滨县" },
{
  "value": 1684,
  "label": "息县" }],

[{
  "value": 1686,
  "label": "川汇区" },
{
  "value": 1687,
  "label": "扶沟县" },
{
  "value": 1688,
  "label": "西华县" },
{
  "value": 1689,
  "label": "商水县" },
{
  "value": 1690,
  "label": "沈丘县" },
{
  "value": 1691,
  "label": "郸城县" },
{
  "value": 1692,
  "label": "淮阳县" },
{
  "value": 1693,
  "label": "太康县" },
{
  "value": 1694,
  "label": "鹿邑县" },
{
  "value": 1695,
  "label": "项城市" }],

[{
  "value": 1697,
  "label": "驿城区" },
{
  "value": 1698,
  "label": "西平县" },
{
  "value": 1699,
  "label": "上蔡县" },
{
  "value": 1700,
  "label": "平舆县" },
{
  "value": 1701,
  "label": "正阳县" },
{
  "value": 1702,
  "label": "确山县" },
{
  "value": 1703,
  "label": "泌阳县" },
{
  "value": 1704,
  "label": "汝南县" },
{
  "value": 1705,
  "label": "遂平县" },
{
  "value": 1706,
  "label": "新蔡县" }],

[{
  "value": 1708,
  "label": "济源市" }]],


[
[{
  "value": 1711,
  "label": "江岸区" },
{
  "value": 1712,
  "label": "江汉区" },
{
  "value": 1713,
  "label": "硚口区" },
{
  "value": 1714,
  "label": "汉阳区" },
{
  "value": 1715,
  "label": "武昌区" },
{
  "value": 1716,
  "label": "青山区" },
{
  "value": 1717,
  "label": "洪山区" },
{
  "value": 1718,
  "label": "东西湖区" },
{
  "value": 1719,
  "label": "汉南区" },
{
  "value": 1720,
  "label": "蔡甸区" },
{
  "value": 1721,
  "label": "江夏区" },
{
  "value": 1722,
  "label": "黄陂区" },
{
  "value": 1723,
  "label": "新洲区" }],

[{
  "value": 1725,
  "label": "黄石港区" },
{
  "value": 1726,
  "label": "西塞山区" },
{
  "value": 1727,
  "label": "下陆区" },
{
  "value": 1728,
  "label": "铁山区" },
{
  "value": 1729,
  "label": "阳新县" },
{
  "value": 1730,
  "label": "大冶市" }],

[{
  "value": 1732,
  "label": "茅箭区" },
{
  "value": 1733,
  "label": "张湾区" },
{
  "value": 1734,
  "label": "郧阳区" },
{
  "value": 1735,
  "label": "郧西县" },
{
  "value": 1736,
  "label": "竹山县" },
{
  "value": 1737,
  "label": "竹溪县" },
{
  "value": 1738,
  "label": "房县" },
{
  "value": 1739,
  "label": "丹江口市" }],

[{
  "value": 1741,
  "label": "西陵区" },
{
  "value": 1742,
  "label": "伍家岗区" },
{
  "value": 1743,
  "label": "点军区" },
{
  "value": 1744,
  "label": "猇亭区" },
{
  "value": 1745,
  "label": "夷陵区" },
{
  "value": 1746,
  "label": "远安县" },
{
  "value": 1747,
  "label": "兴山县" },
{
  "value": 1748,
  "label": "秭归县" },
{
  "value": 1749,
  "label": "长阳土家族自治县" },
{
  "value": 1750,
  "label": "五峰土家族自治县" },
{
  "value": 1751,
  "label": "宜都市" },
{
  "value": 1752,
  "label": "当阳市" },
{
  "value": 1753,
  "label": "枝江市" }],

[{
  "value": 1755,
  "label": "襄城区" },
{
  "value": 1756,
  "label": "樊城区" },
{
  "value": 1757,
  "label": "襄州区" },
{
  "value": 1758,
  "label": "南漳县" },
{
  "value": 1759,
  "label": "谷城县" },
{
  "value": 1760,
  "label": "保康县" },
{
  "value": 1761,
  "label": "老河口市" },
{
  "value": 1762,
  "label": "枣阳市" },
{
  "value": 1763,
  "label": "宜城市" }],

[{
  "value": 1765,
  "label": "梁子湖区" },
{
  "value": 1766,
  "label": "华容区" },
{
  "value": 1767,
  "label": "鄂城区" }],

[{
  "value": 1769,
  "label": "东宝区" },
{
  "value": 1770,
  "label": "掇刀区" },
{
  "value": 1771,
  "label": "京山县" },
{
  "value": 1772,
  "label": "沙洋县" },
{
  "value": 1773,
  "label": "钟祥市" }],

[{
  "value": 1775,
  "label": "孝南区" },
{
  "value": 1776,
  "label": "孝昌县" },
{
  "value": 1777,
  "label": "大悟县" },
{
  "value": 1778,
  "label": "云梦县" },
{
  "value": 1779,
  "label": "应城市" },
{
  "value": 1780,
  "label": "安陆市" },
{
  "value": 1781,
  "label": "汉川市" }],

[{
  "value": 1783,
  "label": "沙市区" },
{
  "value": 1784,
  "label": "荆州区" },
{
  "value": 1785,
  "label": "公安县" },
{
  "value": 1786,
  "label": "监利县" },
{
  "value": 1787,
  "label": "江陵县" },
{
  "value": 1788,
  "label": "石首市" },
{
  "value": 1789,
  "label": "洪湖市" },
{
  "value": 1790,
  "label": "松滋市" }],

[{
  "value": 1792,
  "label": "黄州区" },
{
  "value": 1793,
  "label": "团风县" },
{
  "value": 1794,
  "label": "红安县" },
{
  "value": 1795,
  "label": "罗田县" },
{
  "value": 1796,
  "label": "英山县" },
{
  "value": 1797,
  "label": "浠水县" },
{
  "value": 1798,
  "label": "蕲春县" },
{
  "value": 1799,
  "label": "黄梅县" },
{
  "value": 1800,
  "label": "麻城市" },
{
  "value": 1801,
  "label": "武穴市" }],

[{
  "value": 1803,
  "label": "咸安区" },
{
  "value": 1804,
  "label": "嘉鱼县" },
{
  "value": 1805,
  "label": "通城县" },
{
  "value": 1806,
  "label": "崇阳县" },
{
  "value": 1807,
  "label": "通山县" },
{
  "value": 1808,
  "label": "赤壁市" }],

[{
  "value": 1810,
  "label": "曾都区" },
{
  "value": 1811,
  "label": "随县" },
{
  "value": 1812,
  "label": "广水市" }],

[{
  "value": 1814,
  "label": "恩施市" },
{
  "value": 1815,
  "label": "利川市" },
{
  "value": 1816,
  "label": "建始县" },
{
  "value": 1817,
  "label": "巴东县" },
{
  "value": 1818,
  "label": "宣恩县" },
{
  "value": 1819,
  "label": "咸丰县" },
{
  "value": 1820,
  "label": "来凤县" },
{
  "value": 1821,
  "label": "鹤峰县" }],

[{
  "value": 1823,
  "label": "仙桃市" },
{
  "value": 1824,
  "label": "潜江市" },
{
  "value": 1825,
  "label": "天门市" },
{
  "value": 1826,
  "label": "神农架林区" }]],


[
[{
  "value": 1829,
  "label": "芙蓉区" },
{
  "value": 1830,
  "label": "天心区" },
{
  "value": 1831,
  "label": "岳麓区" },
{
  "value": 1832,
  "label": "开福区" },
{
  "value": 1833,
  "label": "雨花区" },
{
  "value": 1834,
  "label": "望城区" },
{
  "value": 1835,
  "label": "长沙县" },
{
  "value": 1836,
  "label": "宁乡县" },
{
  "value": 1837,
  "label": "浏阳市" }],

[{
  "value": 1839,
  "label": "荷塘区" },
{
  "value": 1840,
  "label": "芦淞区" },
{
  "value": 1841,
  "label": "石峰区" },
{
  "value": 1842,
  "label": "天元区" },
{
  "value": 1843,
  "label": "株洲县" },
{
  "value": 1844,
  "label": "攸县" },
{
  "value": 1845,
  "label": "茶陵县" },
{
  "value": 1846,
  "label": "炎陵县" },
{
  "value": 1847,
  "label": "醴陵市" }],

[{
  "value": 1849,
  "label": "雨湖区" },
{
  "value": 1850,
  "label": "岳塘区" },
{
  "value": 1851,
  "label": "湘潭县" },
{
  "value": 1852,
  "label": "湘乡市" },
{
  "value": 1853,
  "label": "韶山市" }],

[{
  "value": 1855,
  "label": "珠晖区" },
{
  "value": 1856,
  "label": "雁峰区" },
{
  "value": 1857,
  "label": "石鼓区" },
{
  "value": 1858,
  "label": "蒸湘区" },
{
  "value": 1859,
  "label": "南岳区" },
{
  "value": 1860,
  "label": "衡阳县" },
{
  "value": 1861,
  "label": "衡南县" },
{
  "value": 1862,
  "label": "衡山县" },
{
  "value": 1863,
  "label": "衡东县" },
{
  "value": 1864,
  "label": "祁东县" },
{
  "value": 1865,
  "label": "耒阳市" },
{
  "value": 1866,
  "label": "常宁市" }],

[{
  "value": 1868,
  "label": "双清区" },
{
  "value": 1869,
  "label": "大祥区" },
{
  "value": 1870,
  "label": "北塔区" },
{
  "value": 1871,
  "label": "邵东县" },
{
  "value": 1872,
  "label": "新邵县" },
{
  "value": 1873,
  "label": "邵阳县" },
{
  "value": 1874,
  "label": "隆回县" },
{
  "value": 1875,
  "label": "洞口县" },
{
  "value": 1876,
  "label": "绥宁县" },
{
  "value": 1877,
  "label": "新宁县" },
{
  "value": 1878,
  "label": "城步苗族自治县" },
{
  "value": 1879,
  "label": "武冈市" }],

[{
  "value": 1881,
  "label": "岳阳楼区" },
{
  "value": 1882,
  "label": "云溪区" },
{
  "value": 1883,
  "label": "君山区" },
{
  "value": 1884,
  "label": "岳阳县" },
{
  "value": 1885,
  "label": "华容县" },
{
  "value": 1886,
  "label": "湘阴县" },
{
  "value": 1887,
  "label": "平江县" },
{
  "value": 1888,
  "label": "汨罗市" },
{
  "value": 1889,
  "label": "临湘市" }],

[{
  "value": 1891,
  "label": "武陵区" },
{
  "value": 1892,
  "label": "鼎城区" },
{
  "value": 1893,
  "label": "安乡县" },
{
  "value": 1894,
  "label": "汉寿县" },
{
  "value": 1895,
  "label": "澧县" },
{
  "value": 1896,
  "label": "临澧县" },
{
  "value": 1897,
  "label": "桃源县" },
{
  "value": 1898,
  "label": "石门县" },
{
  "value": 1899,
  "label": "津市市" }],

[{
  "value": 1901,
  "label": "永定区" },
{
  "value": 1902,
  "label": "武陵源区" },
{
  "value": 1903,
  "label": "慈利县" },
{
  "value": 1904,
  "label": "桑植县" }],

[{
  "value": 1906,
  "label": "资阳区" },
{
  "value": 1907,
  "label": "赫山区" },
{
  "value": 1908,
  "label": "南县" },
{
  "value": 1909,
  "label": "桃江县" },
{
  "value": 1910,
  "label": "安化县" },
{
  "value": 1911,
  "label": "沅江市" }],

[{
  "value": 1913,
  "label": "北湖区" },
{
  "value": 1914,
  "label": "苏仙区" },
{
  "value": 1915,
  "label": "桂阳县" },
{
  "value": 1916,
  "label": "宜章县" },
{
  "value": 1917,
  "label": "永兴县" },
{
  "value": 1918,
  "label": "嘉禾县" },
{
  "value": 1919,
  "label": "临武县" },
{
  "value": 1920,
  "label": "汝城县" },
{
  "value": 1921,
  "label": "桂东县" },
{
  "value": 1922,
  "label": "安仁县" },
{
  "value": 1923,
  "label": "资兴市" }],

[{
  "value": 1925,
  "label": "零陵区" },
{
  "value": 1926,
  "label": "冷水滩区" },
{
  "value": 1927,
  "label": "祁阳县" },
{
  "value": 1928,
  "label": "东安县" },
{
  "value": 1929,
  "label": "双牌县" },
{
  "value": 1930,
  "label": "道县" },
{
  "value": 1931,
  "label": "江永县" },
{
  "value": 1932,
  "label": "宁远县" },
{
  "value": 1933,
  "label": "蓝山县" },
{
  "value": 1934,
  "label": "新田县" },
{
  "value": 1935,
  "label": "江华瑶族自治县" }],

[{
  "value": 1937,
  "label": "鹤城区" },
{
  "value": 1938,
  "label": "中方县" },
{
  "value": 1939,
  "label": "沅陵县" },
{
  "value": 1940,
  "label": "辰溪县" },
{
  "value": 1941,
  "label": "溆浦县" },
{
  "value": 1942,
  "label": "会同县" },
{
  "value": 1943,
  "label": "麻阳苗族自治县" },
{
  "value": 1944,
  "label": "新晃侗族自治县" },
{
  "value": 1945,
  "label": "芷江侗族自治县" },
{
  "value": 1946,
  "label": "靖州苗族侗族自治县" },
{
  "value": 1947,
  "label": "通道侗族自治县" },
{
  "value": 1948,
  "label": "洪江市" }],

[{
  "value": 1950,
  "label": "娄星区" },
{
  "value": 1951,
  "label": "双峰县" },
{
  "value": 1952,
  "label": "新化县" },
{
  "value": 1953,
  "label": "冷水江市" },
{
  "value": 1954,
  "label": "涟源市" }],

[{
  "value": 1956,
  "label": "吉首市" },
{
  "value": 1957,
  "label": "泸溪县" },
{
  "value": 1958,
  "label": "凤凰县" },
{
  "value": 1959,
  "label": "花垣县" },
{
  "value": 1960,
  "label": "保靖县" },
{
  "value": 1961,
  "label": "古丈县" },
{
  "value": 1962,
  "label": "永顺县" },
{
  "value": 1963,
  "label": "龙山县" }]],


[
[{
  "value": 1966,
  "label": "荔湾区" },
{
  "value": 1967,
  "label": "越秀区" },
{
  "value": 1968,
  "label": "海珠区" },
{
  "value": 1969,
  "label": "天河区" },
{
  "value": 1970,
  "label": "白云区" },
{
  "value": 1971,
  "label": "黄埔区" },
{
  "value": 1972,
  "label": "番禺区" },
{
  "value": 1973,
  "label": "花都区" },
{
  "value": 1974,
  "label": "南沙区" },
{
  "value": 1975,
  "label": "从化区" },
{
  "value": 1976,
  "label": "增城区" }],

[{
  "value": 1978,
  "label": "武江区" },
{
  "value": 1979,
  "label": "浈江区" },
{
  "value": 1980,
  "label": "曲江区" },
{
  "value": 1981,
  "label": "始兴县" },
{
  "value": 1982,
  "label": "仁化县" },
{
  "value": 1983,
  "label": "翁源县" },
{
  "value": 1984,
  "label": "乳源瑶族自治县" },
{
  "value": 1985,
  "label": "新丰县" },
{
  "value": 1986,
  "label": "乐昌市" },
{
  "value": 1987,
  "label": "南雄市" }],

[{
  "value": 1989,
  "label": "罗湖区" },
{
  "value": 1990,
  "label": "福田区" },
{
  "value": 1991,
  "label": "南山区" },
{
  "value": 1992,
  "label": "宝安区" },
{
  "value": 1993,
  "label": "龙岗区" },
{
  "value": 1994,
  "label": "盐田区" },
{
  "value": 1995,
  "label": "光明新区" },
{
  "value": 1996,
  "label": "坪山新区" },
{
  "value": 1997,
  "label": "大鹏新区" },
{
  "value": 1998,
  "label": "龙华新区" }],

[{
  "value": 2000,
  "label": "香洲区" },
{
  "value": 2001,
  "label": "斗门区" },
{
  "value": 2002,
  "label": "金湾区" }],

[{
  "value": 2004,
  "label": "龙湖区" },
{
  "value": 2005,
  "label": "金平区" },
{
  "value": 2006,
  "label": "濠江区" },
{
  "value": 2007,
  "label": "潮阳区" },
{
  "value": 2008,
  "label": "潮南区" },
{
  "value": 2009,
  "label": "澄海区" },
{
  "value": 2010,
  "label": "南澳县" }],

[{
  "value": 2012,
  "label": "禅城区" },
{
  "value": 2013,
  "label": "南海区" },
{
  "value": 2014,
  "label": "顺德区" },
{
  "value": 2015,
  "label": "三水区" },
{
  "value": 2016,
  "label": "高明区" }],

[{
  "value": 2018,
  "label": "蓬江区" },
{
  "value": 2019,
  "label": "江海区" },
{
  "value": 2020,
  "label": "新会区" },
{
  "value": 2021,
  "label": "台山市" },
{
  "value": 2022,
  "label": "开平市" },
{
  "value": 2023,
  "label": "鹤山市" },
{
  "value": 2024,
  "label": "恩平市" }],

[{
  "value": 2026,
  "label": "赤坎区" },
{
  "value": 2027,
  "label": "霞山区" },
{
  "value": 2028,
  "label": "坡头区" },
{
  "value": 2029,
  "label": "麻章区" },
{
  "value": 2030,
  "label": "遂溪县" },
{
  "value": 2031,
  "label": "徐闻县" },
{
  "value": 2032,
  "label": "廉江市" },
{
  "value": 2033,
  "label": "雷州市" },
{
  "value": 2034,
  "label": "吴川市" }],

[{
  "value": 2036,
  "label": "茂南区" },
{
  "value": 2037,
  "label": "电白区" },
{
  "value": 2038,
  "label": "高州市" },
{
  "value": 2039,
  "label": "化州市" },
{
  "value": 2040,
  "label": "信宜市" }],

[{
  "value": 2042,
  "label": "端州区" },
{
  "value": 2043,
  "label": "鼎湖区" },
{
  "value": 2044,
  "label": "广宁县" },
{
  "value": 2045,
  "label": "怀集县" },
{
  "value": 2046,
  "label": "封开县" },
{
  "value": 2047,
  "label": "德庆县" },
{
  "value": 2048,
  "label": "高要市" },
{
  "value": 2049,
  "label": "四会市" }],

[{
  "value": 2051,
  "label": "惠城区" },
{
  "value": 2052,
  "label": "惠阳区" },
{
  "value": 2053,
  "label": "博罗县" },
{
  "value": 2054,
  "label": "惠东县" },
{
  "value": 2055,
  "label": "龙门县" }],

[{
  "value": 2057,
  "label": "梅江区" },
{
  "value": 2058,
  "label": "梅县区" },
{
  "value": 2059,
  "label": "大埔县" },
{
  "value": 2060,
  "label": "丰顺县" },
{
  "value": 2061,
  "label": "五华县" },
{
  "value": 2062,
  "label": "平远县" },
{
  "value": 2063,
  "label": "蕉岭县" },
{
  "value": 2064,
  "label": "兴宁市" }],

[{
  "value": 2066,
  "label": "城区" },
{
  "value": 2067,
  "label": "海丰县" },
{
  "value": 2068,
  "label": "陆河县" },
{
  "value": 2069,
  "label": "陆丰市" }],

[{
  "value": 2071,
  "label": "源城区" },
{
  "value": 2072,
  "label": "紫金县" },
{
  "value": 2073,
  "label": "龙川县" },
{
  "value": 2074,
  "label": "连平县" },
{
  "value": 2075,
  "label": "和平县" },
{
  "value": 2076,
  "label": "东源县" }],

[{
  "value": 2078,
  "label": "江城区" },
{
  "value": 2079,
  "label": "阳东区" },
{
  "value": 2080,
  "label": "阳西县" },
{
  "value": 2081,
  "label": "阳春市" }],

[{
  "value": 2083,
  "label": "清城区" },
{
  "value": 2084,
  "label": "清新区" },
{
  "value": 2085,
  "label": "佛冈县" },
{
  "value": 2086,
  "label": "阳山县" },
{
  "value": 2087,
  "label": "连山壮族瑶族自治县" },
{
  "value": 2088,
  "label": "连南瑶族自治县" },
{
  "value": 2089,
  "label": "英德市" },
{
  "value": 2090,
  "label": "连州市" }],

[{
  "value": 2092,
  "label": "莞城区" },
{
  "value": 2093,
  "label": "南城区" },
{
  "value": 2094,
  "label": "万江区" },
{
  "value": 2095,
  "label": "石碣镇" },
{
  "value": 2096,
  "label": "石龙镇" },
{
  "value": 2097,
  "label": "茶山镇" },
{
  "value": 2098,
  "label": "石排镇" },
{
  "value": 2099,
  "label": "企石镇" },
{
  "value": 2100,
  "label": "横沥镇" },
{
  "value": 2101,
  "label": "桥头镇" },
{
  "value": 2102,
  "label": "谢岗镇" },
{
  "value": 2103,
  "label": "东坑镇" },
{
  "value": 2104,
  "label": "常平镇" },
{
  "value": 2105,
  "label": "寮步镇" },
{
  "value": 2106,
  "label": "大朗镇" },
{
  "value": 2107,
  "label": "麻涌镇" },
{
  "value": 2108,
  "label": "中堂镇" },
{
  "value": 2109,
  "label": "高埗镇" },
{
  "value": 2110,
  "label": "樟木头镇" },
{
  "value": 2111,
  "label": "大岭山镇" },
{
  "value": 2112,
  "label": "望牛墩镇" },
{
  "value": 2113,
  "label": "黄江镇" },
{
  "value": 2114,
  "label": "洪梅镇" },
{
  "value": 2115,
  "label": "清溪镇" },
{
  "value": 2116,
  "label": "沙田镇" },
{
  "value": 2117,
  "label": "道滘镇" },
{
  "value": 2118,
  "label": "塘厦镇" },
{
  "value": 2119,
  "label": "虎门镇" },
{
  "value": 2120,
  "label": "厚街镇" },
{
  "value": 2121,
  "label": "凤岗镇" },
{
  "value": 2122,
  "label": "长安镇" }],

[{
  "value": 2124,
  "label": "石岐区" },
{
  "value": 2125,
  "label": "南区" },
{
  "value": 2126,
  "label": "五桂山区" },
{
  "value": 2127,
  "label": "火炬开发区" },
{
  "value": 2128,
  "label": "黄圃镇" },
{
  "value": 2129,
  "label": "南头镇" },
{
  "value": 2130,
  "label": "东凤镇" },
{
  "value": 2131,
  "label": "阜沙镇" },
{
  "value": 2132,
  "label": "小榄镇" },
{
  "value": 2133,
  "label": "东升镇" },
{
  "value": 2134,
  "label": "古镇镇" },
{
  "value": 2135,
  "label": "横栏镇" },
{
  "value": 2136,
  "label": "三角镇" },
{
  "value": 2137,
  "label": "民众镇" },
{
  "value": 2138,
  "label": "南朗镇" },
{
  "value": 2139,
  "label": "港口镇" },
{
  "value": 2140,
  "label": "大涌镇" },
{
  "value": 2141,
  "label": "沙溪镇" },
{
  "value": 2142,
  "label": "三乡镇" },
{
  "value": 2143,
  "label": "板芙镇" },
{
  "value": 2144,
  "label": "神湾镇" },
{
  "value": 2145,
  "label": "坦洲镇" }],

[{
  "value": 2147,
  "label": "湘桥区" },
{
  "value": 2148,
  "label": "潮安区" },
{
  "value": 2149,
  "label": "饶平县" }],

[{
  "value": 2151,
  "label": "榕城区" },
{
  "value": 2152,
  "label": "揭东区" },
{
  "value": 2153,
  "label": "揭西县" },
{
  "value": 2154,
  "label": "惠来县" },
{
  "value": 2155,
  "label": "普宁市" }],

[{
  "value": 2157,
  "label": "云城区" },
{
  "value": 2158,
  "label": "云安区" },
{
  "value": 2159,
  "label": "新兴县" },
{
  "value": 2160,
  "label": "郁南县" },
{
  "value": 2161,
  "label": "罗定市" }]],


[
[{
  "value": 2164,
  "label": "兴宁区" },
{
  "value": 2165,
  "label": "青秀区" },
{
  "value": 2166,
  "label": "江南区" },
{
  "value": 2167,
  "label": "西乡塘区" },
{
  "value": 2168,
  "label": "良庆区" },
{
  "value": 2169,
  "label": "邕宁区" },
{
  "value": 2170,
  "label": "武鸣县" },
{
  "value": 2171,
  "label": "隆安县" },
{
  "value": 2172,
  "label": "马山县" },
{
  "value": 2173,
  "label": "上林县" },
{
  "value": 2174,
  "label": "宾阳县" },
{
  "value": 2175,
  "label": "横县" },
{
  "value": 2176,
  "label": "埌东新区" }],

[{
  "value": 2178,
  "label": "城中区" },
{
  "value": 2179,
  "label": "鱼峰区" },
{
  "value": 2180,
  "label": "柳南区" },
{
  "value": 2181,
  "label": "柳北区" },
{
  "value": 2182,
  "label": "柳江县" },
{
  "value": 2183,
  "label": "柳城县" },
{
  "value": 2184,
  "label": "鹿寨县" },
{
  "value": 2185,
  "label": "融安县" },
{
  "value": 2186,
  "label": "融水苗族自治县" },
{
  "value": 2187,
  "label": "三江侗族自治县" },
{
  "value": 2188,
  "label": "柳东新区" }],

[{
  "value": 2190,
  "label": "秀峰区" },
{
  "value": 2191,
  "label": "叠彩区" },
{
  "value": 2192,
  "label": "象山区" },
{
  "value": 2193,
  "label": "七星区" },
{
  "value": 2194,
  "label": "雁山区" },
{
  "value": 2195,
  "label": "临桂区" },
{
  "value": 2196,
  "label": "阳朔县" },
{
  "value": 2197,
  "label": "灵川县" },
{
  "value": 2198,
  "label": "全州县" },
{
  "value": 2199,
  "label": "兴安县" },
{
  "value": 2200,
  "label": "永福县" },
{
  "value": 2201,
  "label": "灌阳县" },
{
  "value": 2202,
  "label": "龙胜各族自治县" },
{
  "value": 2203,
  "label": "资源县" },
{
  "value": 2204,
  "label": "平乐县" },
{
  "value": 2205,
  "label": "荔浦县" },
{
  "value": 2206,
  "label": "恭城瑶族自治县" }],

[{
  "value": 2208,
  "label": "万秀区" },
{
  "value": 2209,
  "label": "长洲区" },
{
  "value": 2210,
  "label": "龙圩区" },
{
  "value": 2211,
  "label": "苍梧县" },
{
  "value": 2212,
  "label": "藤县" },
{
  "value": 2213,
  "label": "蒙山县" },
{
  "value": 2214,
  "label": "岑溪市" }],

[{
  "value": 2216,
  "label": "海城区" },
{
  "value": 2217,
  "label": "银海区" },
{
  "value": 2218,
  "label": "铁山港区" },
{
  "value": 2219,
  "label": "合浦县" }],

[{
  "value": 2221,
  "label": "港口区" },
{
  "value": 2222,
  "label": "防城区" },
{
  "value": 2223,
  "label": "上思县" },
{
  "value": 2224,
  "label": "东兴市" }],

[{
  "value": 2226,
  "label": "钦南区" },
{
  "value": 2227,
  "label": "钦北区" },
{
  "value": 2228,
  "label": "灵山县" },
{
  "value": 2229,
  "label": "浦北县" }],

[{
  "value": 2231,
  "label": "港北区" },
{
  "value": 2232,
  "label": "港南区" },
{
  "value": 2233,
  "label": "覃塘区" },
{
  "value": 2234,
  "label": "平南县" },
{
  "value": 2235,
  "label": "桂平市" }],

[{
  "value": 2237,
  "label": "玉州区" },
{
  "value": 2238,
  "label": "福绵区" },
{
  "value": 2239,
  "label": "玉东新区" },
{
  "value": 2240,
  "label": "容县" },
{
  "value": 2241,
  "label": "陆川县" },
{
  "value": 2242,
  "label": "博白县" },
{
  "value": 2243,
  "label": "兴业县" },
{
  "value": 2244,
  "label": "北流市" }],

[{
  "value": 2246,
  "label": "右江区" },
{
  "value": 2247,
  "label": "田阳县" },
{
  "value": 2248,
  "label": "田东县" },
{
  "value": 2249,
  "label": "平果县" },
{
  "value": 2250,
  "label": "德保县" },
{
  "value": 2251,
  "label": "靖西县" },
{
  "value": 2252,
  "label": "那坡县" },
{
  "value": 2253,
  "label": "凌云县" },
{
  "value": 2254,
  "label": "乐业县" },
{
  "value": 2255,
  "label": "田林县" },
{
  "value": 2256,
  "label": "西林县" },
{
  "value": 2257,
  "label": "隆林各族自治县" }],

[{
  "value": 2259,
  "label": "八步区" },
{
  "value": 2260,
  "label": "昭平县" },
{
  "value": 2261,
  "label": "钟山县" },
{
  "value": 2262,
  "label": "富川瑶族自治县" },
{
  "value": 2263,
  "label": "平桂管理区" }],

[{
  "value": 2265,
  "label": "金城江区" },
{
  "value": 2266,
  "label": "南丹县" },
{
  "value": 2267,
  "label": "天峨县" },
{
  "value": 2268,
  "label": "凤山县" },
{
  "value": 2269,
  "label": "东兰县" },
{
  "value": 2270,
  "label": "罗城仫佬族自治县" },
{
  "value": 2271,
  "label": "环江毛南族自治县" },
{
  "value": 2272,
  "label": "巴马瑶族自治县" },
{
  "value": 2273,
  "label": "都安瑶族自治县" },
{
  "value": 2274,
  "label": "大化瑶族自治县" },
{
  "value": 2275,
  "label": "宜州市" }],

[{
  "value": 2277,
  "label": "兴宾区" },
{
  "value": 2278,
  "label": "忻城县" },
{
  "value": 2279,
  "label": "象州县" },
{
  "value": 2280,
  "label": "武宣县" },
{
  "value": 2281,
  "label": "金秀瑶族自治县" },
{
  "value": 2282,
  "label": "合山市" }],

[{
  "value": 2284,
  "label": "江州区" },
{
  "value": 2285,
  "label": "扶绥县" },
{
  "value": 2286,
  "label": "宁明县" },
{
  "value": 2287,
  "label": "龙州县" },
{
  "value": 2288,
  "label": "大新县" },
{
  "value": 2289,
  "label": "天等县" },
{
  "value": 2290,
  "label": "凭祥市" }]],


[
[{
  "value": 2293,
  "label": "秀英区" },
{
  "value": 2294,
  "label": "龙华区" },
{
  "value": 2295,
  "label": "琼山区" },
{
  "value": 2296,
  "label": "美兰区" }],

[{
  "value": 2298,
  "label": "海棠区" },
{
  "value": 2299,
  "label": "吉阳区" },
{
  "value": 2300,
  "label": "天涯区" },
{
  "value": 2301,
  "label": "崖州区" }],

[{
  "value": 2303,
  "label": "西沙群岛" },
{
  "value": 2304,
  "label": "南沙群岛" },
{
  "value": 2305,
  "label": "中沙群岛" }],

[{
  "value": 2307,
  "label": "五指山市" },
{
  "value": 2308,
  "label": "琼海市" },
{
  "value": 2309,
  "label": "儋州市" },
{
  "value": 2310,
  "label": "文昌市" },
{
  "value": 2311,
  "label": "万宁市" },
{
  "value": 2312,
  "label": "东方市" },
{
  "value": 2313,
  "label": "定安县" },
{
  "value": 2314,
  "label": "屯昌县" },
{
  "value": 2315,
  "label": "澄迈县" },
{
  "value": 2316,
  "label": "临高县" },
{
  "value": 2317,
  "label": "白沙黎族自治县" },
{
  "value": 2318,
  "label": "昌江黎族自治县" },
{
  "value": 2319,
  "label": "乐东黎族自治县" },
{
  "value": 2320,
  "label": "陵水黎族自治县" },
{
  "value": 2321,
  "label": "保亭黎族苗族自治县" },
{
  "value": 2322,
  "label": "琼中黎族苗族自治县" }]],


[
[{
  "value": 2325,
  "label": "万州区" },
{
  "value": 2326,
  "label": "涪陵区" },
{
  "value": 2327,
  "label": "渝中区" },
{
  "value": 2328,
  "label": "大渡口区" },
{
  "value": 2329,
  "label": "江北区" },
{
  "value": 2330,
  "label": "沙坪坝区" },
{
  "value": 2331,
  "label": "九龙坡区" },
{
  "value": 2332,
  "label": "南岸区" },
{
  "value": 2333,
  "label": "北碚区" },
{
  "value": 2334,
  "label": "綦江区" },
{
  "value": 2335,
  "label": "大足区" },
{
  "value": 2336,
  "label": "渝北区" },
{
  "value": 2337,
  "label": "巴南区" },
{
  "value": 2338,
  "label": "黔江区" },
{
  "value": 2339,
  "label": "长寿区" },
{
  "value": 2340,
  "label": "江津区" },
{
  "value": 2341,
  "label": "合川区" },
{
  "value": 2342,
  "label": "永川区" },
{
  "value": 2343,
  "label": "南川区" },
{
  "value": 2344,
  "label": "璧山区" },
{
  "value": 2345,
  "label": "铜梁区" },
{
  "value": 2346,
  "label": "潼南县" },
{
  "value": 2347,
  "label": "荣昌县" },
{
  "value": 2348,
  "label": "梁平县" },
{
  "value": 2349,
  "label": "城口县" },
{
  "value": 2350,
  "label": "丰都县" },
{
  "value": 2351,
  "label": "垫江县" },
{
  "value": 2352,
  "label": "武隆县" },
{
  "value": 2353,
  "label": "忠县" },
{
  "value": 2354,
  "label": "开县" },
{
  "value": 2355,
  "label": "云阳县" },
{
  "value": 2356,
  "label": "奉节县" },
{
  "value": 2357,
  "label": "巫山县" },
{
  "value": 2358,
  "label": "巫溪县" },
{
  "value": 2359,
  "label": "石柱土家族自治县" },
{
  "value": 2360,
  "label": "秀山土家族苗族自治县" },
{
  "value": 2361,
  "label": "酉阳土家族苗族自治县" },
{
  "value": 2362,
  "label": "彭水苗族土家族自治县" }],

[{
  "value": 2364,
  "label": "北部新区" },
{
  "value": 2365,
  "label": "保税港区" },
{
  "value": 2366,
  "label": "工业园区" }]],


[
[{
  "value": 2369,
  "label": "锦江区" },
{
  "value": 2370,
  "label": "青羊区" },
{
  "value": 2371,
  "label": "金牛区" },
{
  "value": 2372,
  "label": "武侯区" },
{
  "value": 2373,
  "label": "成华区" },
{
  "value": 2374,
  "label": "龙泉驿区" },
{
  "value": 2375,
  "label": "青白江区" },
{
  "value": 2376,
  "label": "新都区" },
{
  "value": 2377,
  "label": "温江区" },
{
  "value": 2378,
  "label": "金堂县" },
{
  "value": 2379,
  "label": "双流县" },
{
  "value": 2380,
  "label": "郫县" },
{
  "value": 2381,
  "label": "大邑县" },
{
  "value": 2382,
  "label": "蒲江县" },
{
  "value": 2383,
  "label": "新津县" },
{
  "value": 2384,
  "label": "都江堰市" },
{
  "value": 2385,
  "label": "彭州市" },
{
  "value": 2386,
  "label": "邛崃市" },
{
  "value": 2387,
  "label": "崇州市" }],

[{
  "value": 2389,
  "label": "自流井区" },
{
  "value": 2390,
  "label": "贡井区" },
{
  "value": 2391,
  "label": "大安区" },
{
  "value": 2392,
  "label": "沿滩区" },
{
  "value": 2393,
  "label": "荣县" },
{
  "value": 2394,
  "label": "富顺县" }],

[{
  "value": 2396,
  "label": "东区" },
{
  "value": 2397,
  "label": "西区" },
{
  "value": 2398,
  "label": "仁和区" },
{
  "value": 2399,
  "label": "米易县" },
{
  "value": 2400,
  "label": "盐边县" }],

[{
  "value": 2402,
  "label": "江阳区" },
{
  "value": 2403,
  "label": "纳溪区" },
{
  "value": 2404,
  "label": "龙马潭区" },
{
  "value": 2405,
  "label": "泸县" },
{
  "value": 2406,
  "label": "合江县" },
{
  "value": 2407,
  "label": "叙永县" },
{
  "value": 2408,
  "label": "古蔺县" }],

[{
  "value": 2410,
  "label": "旌阳区" },
{
  "value": 2411,
  "label": "中江县" },
{
  "value": 2412,
  "label": "罗江县" },
{
  "value": 2413,
  "label": "广汉市" },
{
  "value": 2414,
  "label": "什邡市" },
{
  "value": 2415,
  "label": "绵竹市" }],

[{
  "value": 2417,
  "label": "涪城区" },
{
  "value": 2418,
  "label": "游仙区" },
{
  "value": 2419,
  "label": "三台县" },
{
  "value": 2420,
  "label": "盐亭县" },
{
  "value": 2421,
  "label": "安县" },
{
  "value": 2422,
  "label": "梓潼县" },
{
  "value": 2423,
  "label": "北川羌族自治县" },
{
  "value": 2424,
  "label": "平武县" },
{
  "value": 2425,
  "label": "江油市" }],

[{
  "value": 2427,
  "label": "利州区" },
{
  "value": 2428,
  "label": "昭化区" },
{
  "value": 2429,
  "label": "朝天区" },
{
  "value": 2430,
  "label": "旺苍县" },
{
  "value": 2431,
  "label": "青川县" },
{
  "value": 2432,
  "label": "剑阁县" },
{
  "value": 2433,
  "label": "苍溪县" }],

[{
  "value": 2435,
  "label": "船山区" },
{
  "value": 2436,
  "label": "安居区" },
{
  "value": 2437,
  "label": "蓬溪县" },
{
  "value": 2438,
  "label": "射洪县" },
{
  "value": 2439,
  "label": "大英县" }],

[{
  "value": 2441,
  "label": "市中区" },
{
  "value": 2442,
  "label": "东兴区" },
{
  "value": 2443,
  "label": "威远县" },
{
  "value": 2444,
  "label": "资中县" },
{
  "value": 2445,
  "label": "隆昌县" }],

[{
  "value": 2447,
  "label": "市中区" },
{
  "value": 2448,
  "label": "沙湾区" },
{
  "value": 2449,
  "label": "五通桥区" },
{
  "value": 2450,
  "label": "金口河区" },
{
  "value": 2451,
  "label": "犍为县" },
{
  "value": 2452,
  "label": "井研县" },
{
  "value": 2453,
  "label": "夹江县" },
{
  "value": 2454,
  "label": "沐川县" },
{
  "value": 2455,
  "label": "峨边彝族自治县" },
{
  "value": 2456,
  "label": "马边彝族自治县" },
{
  "value": 2457,
  "label": "峨眉山市" }],

[{
  "value": 2459,
  "label": "顺庆区" },
{
  "value": 2460,
  "label": "高坪区" },
{
  "value": 2461,
  "label": "嘉陵区" },
{
  "value": 2462,
  "label": "南部县" },
{
  "value": 2463,
  "label": "营山县" },
{
  "value": 2464,
  "label": "蓬安县" },
{
  "value": 2465,
  "label": "仪陇县" },
{
  "value": 2466,
  "label": "西充县" },
{
  "value": 2467,
  "label": "阆中市" }],

[{
  "value": 2469,
  "label": "东坡区" },
{
  "value": 2470,
  "label": "彭山区" },
{
  "value": 2471,
  "label": "仁寿县" },
{
  "value": 2472,
  "label": "洪雅县" },
{
  "value": 2473,
  "label": "丹棱县" },
{
  "value": 2474,
  "label": "青神县" }],

[{
  "value": 2476,
  "label": "翠屏区" },
{
  "value": 2477,
  "label": "南溪区" },
{
  "value": 2478,
  "label": "宜宾县" },
{
  "value": 2479,
  "label": "江安县" },
{
  "value": 2480,
  "label": "长宁县" },
{
  "value": 2481,
  "label": "高县" },
{
  "value": 2482,
  "label": "珙县" },
{
  "value": 2483,
  "label": "筠连县" },
{
  "value": 2484,
  "label": "兴文县" },
{
  "value": 2485,
  "label": "屏山县" }],

[{
  "value": 2487,
  "label": "广安区" },
{
  "value": 2488,
  "label": "前锋区" },
{
  "value": 2489,
  "label": "岳池县" },
{
  "value": 2490,
  "label": "武胜县" },
{
  "value": 2491,
  "label": "邻水县" },
{
  "value": 2492,
  "label": "华蓥市" }],

[{
  "value": 2494,
  "label": "通川区" },
{
  "value": 2495,
  "label": "达川区" },
{
  "value": 2496,
  "label": "宣汉县" },
{
  "value": 2497,
  "label": "开江县" },
{
  "value": 2498,
  "label": "大竹县" },
{
  "value": 2499,
  "label": "渠县" },
{
  "value": 2500,
  "label": "万源市" }],

[{
  "value": 2502,
  "label": "雨城区" },
{
  "value": 2503,
  "label": "名山区" },
{
  "value": 2504,
  "label": "荥经县" },
{
  "value": 2505,
  "label": "汉源县" },
{
  "value": 2506,
  "label": "石棉县" },
{
  "value": 2507,
  "label": "天全县" },
{
  "value": 2508,
  "label": "芦山县" },
{
  "value": 2509,
  "label": "宝兴县" }],

[{
  "value": 2511,
  "label": "巴州区" },
{
  "value": 2512,
  "label": "恩阳区" },
{
  "value": 2513,
  "label": "通江县" },
{
  "value": 2514,
  "label": "南江县" },
{
  "value": 2515,
  "label": "平昌县" }],

[{
  "value": 2517,
  "label": "雁江区" },
{
  "value": 2518,
  "label": "安岳县" },
{
  "value": 2519,
  "label": "乐至县" },
{
  "value": 2520,
  "label": "简阳市" }],

[{
  "value": 2522,
  "label": "汶川县" },
{
  "value": 2523,
  "label": "理县" },
{
  "value": 2524,
  "label": "茂县" },
{
  "value": 2525,
  "label": "松潘县" },
{
  "value": 2526,
  "label": "九寨沟县" },
{
  "value": 2527,
  "label": "金川县" },
{
  "value": 2528,
  "label": "小金县" },
{
  "value": 2529,
  "label": "黑水县" },
{
  "value": 2530,
  "label": "马尔康县" },
{
  "value": 2531,
  "label": "壤塘县" },
{
  "value": 2532,
  "label": "阿坝县" },
{
  "value": 2533,
  "label": "若尔盖县" },
{
  "value": 2534,
  "label": "红原县" }],

[{
  "value": 2536,
  "label": "康定县" },
{
  "value": 2537,
  "label": "泸定县" },
{
  "value": 2538,
  "label": "丹巴县" },
{
  "value": 2539,
  "label": "九龙县" },
{
  "value": 2540,
  "label": "雅江县" },
{
  "value": 2541,
  "label": "道孚县" },
{
  "value": 2542,
  "label": "炉霍县" },
{
  "value": 2543,
  "label": "甘孜县" },
{
  "value": 2544,
  "label": "新龙县" },
{
  "value": 2545,
  "label": "德格县" },
{
  "value": 2546,
  "label": "白玉县" },
{
  "value": 2547,
  "label": "石渠县" },
{
  "value": 2548,
  "label": "色达县" },
{
  "value": 2549,
  "label": "理塘县" },
{
  "value": 2550,
  "label": "巴塘县" },
{
  "value": 2551,
  "label": "乡城县" },
{
  "value": 2552,
  "label": "稻城县" },
{
  "value": 2553,
  "label": "得荣县" }],

[{
  "value": 2555,
  "label": "西昌市" },
{
  "value": 2556,
  "label": "木里藏族自治县" },
{
  "value": 2557,
  "label": "盐源县" },
{
  "value": 2558,
  "label": "德昌县" },
{
  "value": 2559,
  "label": "会理县" },
{
  "value": 2560,
  "label": "会东县" },
{
  "value": 2561,
  "label": "宁南县" },
{
  "value": 2562,
  "label": "普格县" },
{
  "value": 2563,
  "label": "布拖县" },
{
  "value": 2564,
  "label": "金阳县" },
{
  "value": 2565,
  "label": "昭觉县" },
{
  "value": 2566,
  "label": "喜德县" },
{
  "value": 2567,
  "label": "冕宁县" },
{
  "value": 2568,
  "label": "越西县" },
{
  "value": 2569,
  "label": "甘洛县" },
{
  "value": 2570,
  "label": "美姑县" },
{
  "value": 2571,
  "label": "雷波县" }]],


[
[{
  "value": 2574,
  "label": "南明区" },
{
  "value": 2575,
  "label": "云岩区" },
{
  "value": 2576,
  "label": "花溪区" },
{
  "value": 2577,
  "label": "乌当区" },
{
  "value": 2578,
  "label": "白云区" },
{
  "value": 2579,
  "label": "观山湖区" },
{
  "value": 2580,
  "label": "开阳县" },
{
  "value": 2581,
  "label": "息烽县" },
{
  "value": 2582,
  "label": "修文县" },
{
  "value": 2583,
  "label": "清镇市" }],

[{
  "value": 2585,
  "label": "钟山区" },
{
  "value": 2586,
  "label": "六枝特区" },
{
  "value": 2587,
  "label": "水城县" },
{
  "value": 2588,
  "label": "盘县" }],

[{
  "value": 2590,
  "label": "红花岗区" },
{
  "value": 2591,
  "label": "汇川区" },
{
  "value": 2592,
  "label": "遵义县" },
{
  "value": 2593,
  "label": "桐梓县" },
{
  "value": 2594,
  "label": "绥阳县" },
{
  "value": 2595,
  "label": "正安县" },
{
  "value": 2596,
  "label": "道真仡佬族苗族自治县" },
{
  "value": 2597,
  "label": "务川仡佬族苗族自治县" },
{
  "value": 2598,
  "label": "凤冈县" },
{
  "value": 2599,
  "label": "湄潭县" },
{
  "value": 2600,
  "label": "余庆县" },
{
  "value": 2601,
  "label": "习水县" },
{
  "value": 2602,
  "label": "赤水市" },
{
  "value": 2603,
  "label": "仁怀市" }],

[{
  "value": 2605,
  "label": "西秀区" },
{
  "value": 2606,
  "label": "平坝区" },
{
  "value": 2607,
  "label": "普定县" },
{
  "value": 2608,
  "label": "镇宁布依族苗族自治县" },
{
  "value": 2609,
  "label": "关岭布依族苗族自治县" },
{
  "value": 2610,
  "label": "紫云苗族布依族自治县" }],

[{
  "value": 2612,
  "label": "七星关区" },
{
  "value": 2613,
  "label": "大方县" },
{
  "value": 2614,
  "label": "黔西县" },
{
  "value": 2615,
  "label": "金沙县" },
{
  "value": 2616,
  "label": "织金县" },
{
  "value": 2617,
  "label": "纳雍县" },
{
  "value": 2618,
  "label": "威宁彝族回族苗族自治县" },
{
  "value": 2619,
  "label": "赫章县" }],

[{
  "value": 2621,
  "label": "碧江区" },
{
  "value": 2622,
  "label": "万山区" },
{
  "value": 2623,
  "label": "江口县" },
{
  "value": 2624,
  "label": "玉屏侗族自治县" },
{
  "value": 2625,
  "label": "石阡县" },
{
  "value": 2626,
  "label": "思南县" },
{
  "value": 2627,
  "label": "印江土家族苗族自治县" },
{
  "value": 2628,
  "label": "德江县" },
{
  "value": 2629,
  "label": "沿河土家族自治县" },
{
  "value": 2630,
  "label": "松桃苗族自治县" }],

[{
  "value": 2632,
  "label": "兴义市 " },
{
  "value": 2633,
  "label": "兴仁县" },
{
  "value": 2634,
  "label": "普安县" },
{
  "value": 2635,
  "label": "晴隆县" },
{
  "value": 2636,
  "label": "贞丰县" },
{
  "value": 2637,
  "label": "望谟县" },
{
  "value": 2638,
  "label": "册亨县" },
{
  "value": 2639,
  "label": "安龙县" }],

[{
  "value": 2641,
  "label": "凯里市" },
{
  "value": 2642,
  "label": "黄平县" },
{
  "value": 2643,
  "label": "施秉县" },
{
  "value": 2644,
  "label": "三穗县" },
{
  "value": 2645,
  "label": "镇远县" },
{
  "value": 2646,
  "label": "岑巩县" },
{
  "value": 2647,
  "label": "天柱县" },
{
  "value": 2648,
  "label": "锦屏县" },
{
  "value": 2649,
  "label": "剑河县" },
{
  "value": 2650,
  "label": "台江县" },
{
  "value": 2651,
  "label": "黎平县" },
{
  "value": 2652,
  "label": "榕江县" },
{
  "value": 2653,
  "label": "从江县" },
{
  "value": 2654,
  "label": "雷山县" },
{
  "value": 2655,
  "label": "麻江县" },
{
  "value": 2656,
  "label": "丹寨县" }],

[{
  "value": 2658,
  "label": "都匀市" },
{
  "value": 2659,
  "label": "福泉市" },
{
  "value": 2660,
  "label": "荔波县" },
{
  "value": 2661,
  "label": "贵定县" },
{
  "value": 2662,
  "label": "瓮安县" },
{
  "value": 2663,
  "label": "独山县" },
{
  "value": 2664,
  "label": "平塘县" },
{
  "value": 2665,
  "label": "罗甸县" },
{
  "value": 2666,
  "label": "长顺县" },
{
  "value": 2667,
  "label": "龙里县" },
{
  "value": 2668,
  "label": "惠水县" },
{
  "value": 2669,
  "label": "三都水族自治县" }]],


[
[{
  "value": 2672,
  "label": "五华区" },
{
  "value": 2673,
  "label": "盘龙区" },
{
  "value": 2674,
  "label": "官渡区" },
{
  "value": 2675,
  "label": "西山区" },
{
  "value": 2676,
  "label": "东川区" },
{
  "value": 2677,
  "label": "呈贡区" },
{
  "value": 2678,
  "label": "晋宁县" },
{
  "value": 2679,
  "label": "富民县" },
{
  "value": 2680,
  "label": "宜良县" },
{
  "value": 2681,
  "label": "石林彝族自治县" },
{
  "value": 2682,
  "label": "嵩明县" },
{
  "value": 2683,
  "label": "禄劝彝族苗族自治县" },
{
  "value": 2684,
  "label": "寻甸回族彝族自治县 " },
{
  "value": 2685,
  "label": "安宁市" }],

[{
  "value": 2687,
  "label": "麒麟区" },
{
  "value": 2688,
  "label": "马龙县" },
{
  "value": 2689,
  "label": "陆良县" },
{
  "value": 2690,
  "label": "师宗县" },
{
  "value": 2691,
  "label": "罗平县" },
{
  "value": 2692,
  "label": "富源县" },
{
  "value": 2693,
  "label": "会泽县" },
{
  "value": 2694,
  "label": "沾益县" },
{
  "value": 2695,
  "label": "宣威市" }],

[{
  "value": 2697,
  "label": "红塔区" },
{
  "value": 2698,
  "label": "江川县" },
{
  "value": 2699,
  "label": "澄江县" },
{
  "value": 2700,
  "label": "通海县" },
{
  "value": 2701,
  "label": "华宁县" },
{
  "value": 2702,
  "label": "易门县" },
{
  "value": 2703,
  "label": "峨山彝族自治县" },
{
  "value": 2704,
  "label": "新平彝族傣族自治县" },
{
  "value": 2705,
  "label": "元江哈尼族彝族傣族自治县" }],

[{
  "value": 2707,
  "label": "隆阳区" },
{
  "value": 2708,
  "label": "施甸县" },
{
  "value": 2709,
  "label": "腾冲县" },
{
  "value": 2710,
  "label": "龙陵县" },
{
  "value": 2711,
  "label": "昌宁县" }],

[{
  "value": 2713,
  "label": "昭阳区" },
{
  "value": 2714,
  "label": "鲁甸县" },
{
  "value": 2715,
  "label": "巧家县" },
{
  "value": 2716,
  "label": "盐津县" },
{
  "value": 2717,
  "label": "大关县" },
{
  "value": 2718,
  "label": "永善县" },
{
  "value": 2719,
  "label": "绥江县" },
{
  "value": 2720,
  "label": "镇雄县" },
{
  "value": 2721,
  "label": "彝良县" },
{
  "value": 2722,
  "label": "威信县" },
{
  "value": 2723,
  "label": "水富县" }],

[{
  "value": 2725,
  "label": "古城区" },
{
  "value": 2726,
  "label": "玉龙纳西族自治县" },
{
  "value": 2727,
  "label": "永胜县" },
{
  "value": 2728,
  "label": "华坪县" },
{
  "value": 2729,
  "label": "宁蒗彝族自治县" }],

[{
  "value": 2731,
  "label": "思茅区" },
{
  "value": 2732,
  "label": "宁洱哈尼族彝族自治县" },
{
  "value": 2733,
  "label": "墨江哈尼族自治县" },
{
  "value": 2734,
  "label": "景东彝族自治县" },
{
  "value": 2735,
  "label": "景谷傣族彝族自治县" },
{
  "value": 2736,
  "label": "镇沅彝族哈尼族拉祜族自治县" },
{
  "value": 2737,
  "label": "江城哈尼族彝族自治县" },
{
  "value": 2738,
  "label": "孟连傣族拉祜族佤族自治县" },
{
  "value": 2739,
  "label": "澜沧拉祜族自治县" },
{
  "value": 2740,
  "label": "西盟佤族自治县" }],

[{
  "value": 2742,
  "label": "临翔区" },
{
  "value": 2743,
  "label": "凤庆县" },
{
  "value": 2744,
  "label": "云县" },
{
  "value": 2745,
  "label": "永德县" },
{
  "value": 2746,
  "label": "镇康县" },
{
  "value": 2747,
  "label": "双江拉祜族佤族布朗族傣族自治县" },
{
  "value": 2748,
  "label": "耿马傣族佤族自治县" },
{
  "value": 2749,
  "label": "沧源佤族自治县" }],

[{
  "value": 2751,
  "label": "楚雄市" },
{
  "value": 2752,
  "label": "双柏县" },
{
  "value": 2753,
  "label": "牟定县" },
{
  "value": 2754,
  "label": "南华县" },
{
  "value": 2755,
  "label": "姚安县" },
{
  "value": 2756,
  "label": "大姚县" },
{
  "value": 2757,
  "label": "永仁县" },
{
  "value": 2758,
  "label": "元谋县" },
{
  "value": 2759,
  "label": "武定县" },
{
  "value": 2760,
  "label": "禄丰县" }],

[{
  "value": 2762,
  "label": "个旧市" },
{
  "value": 2763,
  "label": "开远市" },
{
  "value": 2764,
  "label": "蒙自市" },
{
  "value": 2765,
  "label": "弥勒市" },
{
  "value": 2766,
  "label": "屏边苗族自治县" },
{
  "value": 2767,
  "label": "建水县" },
{
  "value": 2768,
  "label": "石屏县" },
{
  "value": 2769,
  "label": "泸西县" },
{
  "value": 2770,
  "label": "元阳县" },
{
  "value": 2771,
  "label": "红河县" },
{
  "value": 2772,
  "label": "金平苗族瑶族傣族自治县" },
{
  "value": 2773,
  "label": "绿春县" },
{
  "value": 2774,
  "label": "河口瑶族自治县" }],

[{
  "value": 2776,
  "label": "文山市" },
{
  "value": 2777,
  "label": "砚山县" },
{
  "value": 2778,
  "label": "西畴县" },
{
  "value": 2779,
  "label": "麻栗坡县" },
{
  "value": 2780,
  "label": "马关县" },
{
  "value": 2781,
  "label": "丘北县" },
{
  "value": 2782,
  "label": "广南县" },
{
  "value": 2783,
  "label": "富宁县" }],

[{
  "value": 2785,
  "label": "景洪市" },
{
  "value": 2786,
  "label": "勐海县" },
{
  "value": 2787,
  "label": "勐腊县" }],

[{
  "value": 2789,
  "label": "大理市" },
{
  "value": 2790,
  "label": "漾濞彝族自治县" },
{
  "value": 2791,
  "label": "祥云县" },
{
  "value": 2792,
  "label": "宾川县" },
{
  "value": 2793,
  "label": "弥渡县" },
{
  "value": 2794,
  "label": "南涧彝族自治县" },
{
  "value": 2795,
  "label": "巍山彝族回族自治县" },
{
  "value": 2796,
  "label": "永平县" },
{
  "value": 2797,
  "label": "云龙县" },
{
  "value": 2798,
  "label": "洱源县" },
{
  "value": 2799,
  "label": "剑川县" },
{
  "value": 2800,
  "label": "鹤庆县" }],

[{
  "value": 2802,
  "label": "瑞丽市" },
{
  "value": 2803,
  "label": "芒市" },
{
  "value": 2804,
  "label": "梁河县" },
{
  "value": 2805,
  "label": "盈江县" },
{
  "value": 2806,
  "label": "陇川县" }],

[{
  "value": 2808,
  "label": "泸水县" },
{
  "value": 2809,
  "label": "福贡县" },
{
  "value": 2810,
  "label": "贡山独龙族怒族自治县" },
{
  "value": 2811,
  "label": "兰坪白族普米族自治县" }],

[{
  "value": 2813,
  "label": "香格里拉市" },
{
  "value": 2814,
  "label": "德钦县" },
{
  "value": 2815,
  "label": "维西傈僳族自治县" }]],


[
[{
  "value": 2818,
  "label": "城关区" },
{
  "value": 2819,
  "label": "林周县" },
{
  "value": 2820,
  "label": "当雄县" },
{
  "value": 2821,
  "label": "尼木县" },
{
  "value": 2822,
  "label": "曲水县" },
{
  "value": 2823,
  "label": "堆龙德庆县" },
{
  "value": 2824,
  "label": "达孜县" },
{
  "value": 2825,
  "label": "墨竹工卡县" }],

[{
  "value": 2827,
  "label": "桑珠孜区" },
{
  "value": 2828,
  "label": "南木林县" },
{
  "value": 2829,
  "label": "江孜县" },
{
  "value": 2830,
  "label": "定日县" },
{
  "value": 2831,
  "label": "萨迦县" },
{
  "value": 2832,
  "label": "拉孜县" },
{
  "value": 2833,
  "label": "昂仁县" },
{
  "value": 2834,
  "label": "谢通门县" },
{
  "value": 2835,
  "label": "白朗县" },
{
  "value": 2836,
  "label": "仁布县" },
{
  "value": 2837,
  "label": "康马县" },
{
  "value": 2838,
  "label": "定结县" },
{
  "value": 2839,
  "label": "仲巴县" },
{
  "value": 2840,
  "label": "亚东县" },
{
  "value": 2841,
  "label": "吉隆县" },
{
  "value": 2842,
  "label": "聂拉木县" },
{
  "value": 2843,
  "label": "萨嘎县" },
{
  "value": 2844,
  "label": "岗巴县" }],

[{
  "value": 2846,
  "label": "卡若区" },
{
  "value": 2847,
  "label": "江达县" },
{
  "value": 2848,
  "label": "贡觉县" },
{
  "value": 2849,
  "label": "类乌齐县" },
{
  "value": 2850,
  "label": "丁青县" },
{
  "value": 2851,
  "label": "察雅县" },
{
  "value": 2852,
  "label": "八宿县" },
{
  "value": 2853,
  "label": "左贡县" },
{
  "value": 2854,
  "label": "芒康县" },
{
  "value": 2855,
  "label": "洛隆县" },
{
  "value": 2856,
  "label": "边坝县" }],

[{
  "value": 2858,
  "label": "乃东县" },
{
  "value": 2859,
  "label": "扎囊县" },
{
  "value": 2860,
  "label": "贡嘎县" },
{
  "value": 2861,
  "label": "桑日县" },
{
  "value": 2862,
  "label": "琼结县" },
{
  "value": 2863,
  "label": "曲松县" },
{
  "value": 2864,
  "label": "措美县" },
{
  "value": 2865,
  "label": "洛扎县" },
{
  "value": 2866,
  "label": "加查县" },
{
  "value": 2867,
  "label": "隆子县" },
{
  "value": 2868,
  "label": "错那县" },
{
  "value": 2869,
  "label": "浪卡子县" }],

[{
  "value": 2871,
  "label": "那曲县" },
{
  "value": 2872,
  "label": "嘉黎县" },
{
  "value": 2873,
  "label": "比如县" },
{
  "value": 2874,
  "label": "聂荣县" },
{
  "value": 2875,
  "label": "安多县" },
{
  "value": 2876,
  "label": "申扎县" },
{
  "value": 2877,
  "label": "索县" },
{
  "value": 2878,
  "label": "班戈县" },
{
  "value": 2879,
  "label": "巴青县" },
{
  "value": 2880,
  "label": "尼玛县" },
{
  "value": 2881,
  "label": "双湖县" }],

[{
  "value": 2883,
  "label": "普兰县" },
{
  "value": 2884,
  "label": "札达县" },
{
  "value": 2885,
  "label": "噶尔县" },
{
  "value": 2886,
  "label": "日土县" },
{
  "value": 2887,
  "label": "革吉县" },
{
  "value": 2888,
  "label": "改则县" },
{
  "value": 2889,
  "label": "措勤县" }],

[{
  "value": 2891,
  "label": "林芝县" },
{
  "value": 2892,
  "label": "工布江达县" },
{
  "value": 2893,
  "label": "米林县" },
{
  "value": 2894,
  "label": "墨脱县" },
{
  "value": 2895,
  "label": "波密县" },
{
  "value": 2896,
  "label": "察隅县" },
{
  "value": 2897,
  "label": "朗县" }]],


[
[{
  "value": 2900,
  "label": "新城区" },
{
  "value": 2901,
  "label": "碑林区" },
{
  "value": 2902,
  "label": "莲湖区" },
{
  "value": 2903,
  "label": "灞桥区" },
{
  "value": 2904,
  "label": "未央区" },
{
  "value": 2905,
  "label": "雁塔区" },
{
  "value": 2906,
  "label": "阎良区" },
{
  "value": 2907,
  "label": "临潼区" },
{
  "value": 2908,
  "label": "长安区" },
{
  "value": 2909,
  "label": "蓝田县" },
{
  "value": 2910,
  "label": "周至县" },
{
  "value": 2911,
  "label": "户县" },
{
  "value": 2912,
  "label": "高陵区" }],

[{
  "value": 2914,
  "label": "王益区" },
{
  "value": 2915,
  "label": "印台区" },
{
  "value": 2916,
  "label": "耀州区" },
{
  "value": 2917,
  "label": "宜君县" }],

[{
  "value": 2919,
  "label": "渭滨区" },
{
  "value": 2920,
  "label": "金台区" },
{
  "value": 2921,
  "label": "陈仓区" },
{
  "value": 2922,
  "label": "凤翔县" },
{
  "value": 2923,
  "label": "岐山县" },
{
  "value": 2924,
  "label": "扶风县" },
{
  "value": 2925,
  "label": "眉县" },
{
  "value": 2926,
  "label": "陇县" },
{
  "value": 2927,
  "label": "千阳县" },
{
  "value": 2928,
  "label": "麟游县" },
{
  "value": 2929,
  "label": "凤县" },
{
  "value": 2930,
  "label": "太白县" }],

[{
  "value": 2932,
  "label": "秦都区" },
{
  "value": 2933,
  "label": "杨陵区" },
{
  "value": 2934,
  "label": "渭城区" },
{
  "value": 2935,
  "label": "三原县" },
{
  "value": 2936,
  "label": "泾阳县" },
{
  "value": 2937,
  "label": "乾县" },
{
  "value": 2938,
  "label": "礼泉县" },
{
  "value": 2939,
  "label": "永寿县" },
{
  "value": 2940,
  "label": "彬县" },
{
  "value": 2941,
  "label": "长武县" },
{
  "value": 2942,
  "label": "旬邑县" },
{
  "value": 2943,
  "label": "淳化县" },
{
  "value": 2944,
  "label": "武功县" },
{
  "value": 2945,
  "label": "兴平市" }],

[{
  "value": 2947,
  "label": "临渭区" },
{
  "value": 2948,
  "label": "华县" },
{
  "value": 2949,
  "label": "潼关县" },
{
  "value": 2950,
  "label": "大荔县" },
{
  "value": 2951,
  "label": "合阳县" },
{
  "value": 2952,
  "label": "澄城县" },
{
  "value": 2953,
  "label": "蒲城县" },
{
  "value": 2954,
  "label": "白水县" },
{
  "value": 2955,
  "label": "富平县" },
{
  "value": 2956,
  "label": "韩城市" },
{
  "value": 2957,
  "label": "华阴市" }],

[{
  "value": 2959,
  "label": "宝塔区" },
{
  "value": 2960,
  "label": "延长县" },
{
  "value": 2961,
  "label": "延川县" },
{
  "value": 2962,
  "label": "子长县" },
{
  "value": 2963,
  "label": "安塞县" },
{
  "value": 2964,
  "label": "志丹县" },
{
  "value": 2965,
  "label": "吴起县" },
{
  "value": 2966,
  "label": "甘泉县" },
{
  "value": 2967,
  "label": "富县" },
{
  "value": 2968,
  "label": "洛川县" },
{
  "value": 2969,
  "label": "宜川县" },
{
  "value": 2970,
  "label": "黄龙县" },
{
  "value": 2971,
  "label": "黄陵县" }],

[{
  "value": 2973,
  "label": "汉台区" },
{
  "value": 2974,
  "label": "南郑县" },
{
  "value": 2975,
  "label": "城固县" },
{
  "value": 2976,
  "label": "洋县" },
{
  "value": 2977,
  "label": "西乡县" },
{
  "value": 2978,
  "label": "勉县" },
{
  "value": 2979,
  "label": "宁强县" },
{
  "value": 2980,
  "label": "略阳县" },
{
  "value": 2981,
  "label": "镇巴县" },
{
  "value": 2982,
  "label": "留坝县" },
{
  "value": 2983,
  "label": "佛坪县" }],

[{
  "value": 2985,
  "label": "榆阳区" },
{
  "value": 2986,
  "label": "神木县" },
{
  "value": 2987,
  "label": "府谷县" },
{
  "value": 2988,
  "label": "横山县" },
{
  "value": 2989,
  "label": "靖边县" },
{
  "value": 2990,
  "label": "定边县" },
{
  "value": 2991,
  "label": "绥德县" },
{
  "value": 2992,
  "label": "米脂县" },
{
  "value": 2993,
  "label": "佳县" },
{
  "value": 2994,
  "label": "吴堡县" },
{
  "value": 2995,
  "label": "清涧县" },
{
  "value": 2996,
  "label": "子洲县" }],

[{
  "value": 2998,
  "label": "汉滨区" },
{
  "value": 2999,
  "label": "汉阴县" },
{
  "value": 3000,
  "label": "石泉县" },
{
  "value": 3001,
  "label": "宁陕县" },
{
  "value": 3002,
  "label": "紫阳县" },
{
  "value": 3003,
  "label": "岚皋县" },
{
  "value": 3004,
  "label": "平利县" },
{
  "value": 3005,
  "label": "镇坪县" },
{
  "value": 3006,
  "label": "旬阳县" },
{
  "value": 3007,
  "label": "白河县" }],

[{
  "value": 3009,
  "label": "商州区" },
{
  "value": 3010,
  "label": "洛南县" },
{
  "value": 3011,
  "label": "丹凤县" },
{
  "value": 3012,
  "label": "商南县" },
{
  "value": 3013,
  "label": "山阳县" },
{
  "value": 3014,
  "label": "镇安县" },
{
  "value": 3015,
  "label": "柞水县" }],

[{
  "value": 3017,
  "label": "空港新城" },
{
  "value": 3018,
  "label": "沣东新城" },
{
  "value": 3019,
  "label": "秦汉新城" },
{
  "value": 3020,
  "label": "沣西新城" },
{
  "value": 3021,
  "label": "泾河新城" }]],


[
[{
  "value": 3024,
  "label": "城关区" },
{
  "value": 3025,
  "label": "七里河区" },
{
  "value": 3026,
  "label": "西固区" },
{
  "value": 3027,
  "label": "安宁区" },
{
  "value": 3028,
  "label": "红古区" },
{
  "value": 3029,
  "label": "永登县" },
{
  "value": 3030,
  "label": "皋兰县" },
{
  "value": 3031,
  "label": "榆中县" }],

[{
  "value": 3033,
  "label": "雄关区" },
{
  "value": 3034,
  "label": "长城区" },
{
  "value": 3035,
  "label": "镜铁区" }],

[{
  "value": 3037,
  "label": "金川区" },
{
  "value": 3038,
  "label": "永昌县" }],

[{
  "value": 3040,
  "label": "白银区" },
{
  "value": 3041,
  "label": "平川区" },
{
  "value": 3042,
  "label": "靖远县" },
{
  "value": 3043,
  "label": "会宁县" },
{
  "value": 3044,
  "label": "景泰县" }],

[{
  "value": 3046,
  "label": "秦州区" },
{
  "value": 3047,
  "label": "麦积区" },
{
  "value": 3048,
  "label": "清水县" },
{
  "value": 3049,
  "label": "秦安县" },
{
  "value": 3050,
  "label": "甘谷县" },
{
  "value": 3051,
  "label": "武山县" },
{
  "value": 3052,
  "label": "张家川回族自治县" }],

[{
  "value": 3054,
  "label": "凉州区" },
{
  "value": 3055,
  "label": "民勤县" },
{
  "value": 3056,
  "label": "古浪县" },
{
  "value": 3057,
  "label": "天祝藏族自治县" }],

[{
  "value": 3059,
  "label": "甘州区" },
{
  "value": 3060,
  "label": "肃南裕固族自治县" },
{
  "value": 3061,
  "label": "民乐县" },
{
  "value": 3062,
  "label": "临泽县" },
{
  "value": 3063,
  "label": "高台县" },
{
  "value": 3064,
  "label": "山丹县" }],

[{
  "value": 3066,
  "label": "崆峒区" },
{
  "value": 3067,
  "label": "泾川县" },
{
  "value": 3068,
  "label": "灵台县" },
{
  "value": 3069,
  "label": "崇信县" },
{
  "value": 3070,
  "label": "华亭县" },
{
  "value": 3071,
  "label": "庄浪县" },
{
  "value": 3072,
  "label": "静宁县" }],

[{
  "value": 3074,
  "label": "肃州区" },
{
  "value": 3075,
  "label": "金塔县" },
{
  "value": 3076,
  "label": "瓜州县" },
{
  "value": 3077,
  "label": "肃北蒙古族自治县" },
{
  "value": 3078,
  "label": "阿克塞哈萨克族自治县" },
{
  "value": 3079,
  "label": "玉门市" },
{
  "value": 3080,
  "label": "敦煌市" }],

[{
  "value": 3082,
  "label": "西峰区" },
{
  "value": 3083,
  "label": "庆城县" },
{
  "value": 3084,
  "label": "环县" },
{
  "value": 3085,
  "label": "华池县" },
{
  "value": 3086,
  "label": "合水县" },
{
  "value": 3087,
  "label": "正宁县" },
{
  "value": 3088,
  "label": "宁县" },
{
  "value": 3089,
  "label": "镇原县" }],

[{
  "value": 3091,
  "label": "安定区" },
{
  "value": 3092,
  "label": "通渭县" },
{
  "value": 3093,
  "label": "陇西县" },
{
  "value": 3094,
  "label": "渭源县" },
{
  "value": 3095,
  "label": "临洮县" },
{
  "value": 3096,
  "label": "漳县" },
{
  "value": 3097,
  "label": "岷县" }],

[{
  "value": 3099,
  "label": "武都区" },
{
  "value": 3100,
  "label": "成县" },
{
  "value": 3101,
  "label": "文县" },
{
  "value": 3102,
  "label": "宕昌县" },
{
  "value": 3103,
  "label": "康县" },
{
  "value": 3104,
  "label": "西和县" },
{
  "value": 3105,
  "label": "礼县" },
{
  "value": 3106,
  "label": "徽县" },
{
  "value": 3107,
  "label": "两当县" }],

[{
  "value": 3109,
  "label": "临夏市" },
{
  "value": 3110,
  "label": "临夏县" },
{
  "value": 3111,
  "label": "康乐县" },
{
  "value": 3112,
  "label": "永靖县" },
{
  "value": 3113,
  "label": "广河县" },
{
  "value": 3114,
  "label": "和政县" },
{
  "value": 3115,
  "label": "东乡族自治县" },
{
  "value": 3116,
  "label": "积石山保安族东乡族撒拉族自治县" }],

[{
  "value": 3118,
  "label": "合作市" },
{
  "value": 3119,
  "label": "临潭县" },
{
  "value": 3120,
  "label": "卓尼县" },
{
  "value": 3121,
  "label": "舟曲县" },
{
  "value": 3122,
  "label": "迭部县" },
{
  "value": 3123,
  "label": "玛曲县" },
{
  "value": 3124,
  "label": "碌曲县" },
{
  "value": 3125,
  "label": "夏河县" }]],


[
[{
  "value": 3128,
  "label": "城东区" },
{
  "value": 3129,
  "label": "城中区" },
{
  "value": 3130,
  "label": "城西区" },
{
  "value": 3131,
  "label": "城北区" },
{
  "value": 3132,
  "label": "大通回族土族自治县" },
{
  "value": 3133,
  "label": "湟中县" },
{
  "value": 3134,
  "label": "湟源县" }],

[{
  "value": 3136,
  "label": "乐都区" },
{
  "value": 3137,
  "label": "平安县" },
{
  "value": 3138,
  "label": "民和回族土族自治县" },
{
  "value": 3139,
  "label": "互助土族自治县" },
{
  "value": 3140,
  "label": "化隆回族自治县" },
{
  "value": 3141,
  "label": "循化撒拉族自治县" }],

[{
  "value": 3143,
  "label": "门源回族自治县" },
{
  "value": 3144,
  "label": "祁连县" },
{
  "value": 3145,
  "label": "海晏县" },
{
  "value": 3146,
  "label": "刚察县" }],

[{
  "value": 3148,
  "label": "同仁县" },
{
  "value": 3149,
  "label": "尖扎县" },
{
  "value": 3150,
  "label": "泽库县" },
{
  "value": 3151,
  "label": "河南蒙古族自治县" }],

[{
  "value": 3153,
  "label": "共和县" },
{
  "value": 3154,
  "label": "同德县" },
{
  "value": 3155,
  "label": "贵德县" },
{
  "value": 3156,
  "label": "兴海县" },
{
  "value": 3157,
  "label": "贵南县" }],

[{
  "value": 3159,
  "label": "玛沁县" },
{
  "value": 3160,
  "label": "班玛县" },
{
  "value": 3161,
  "label": "甘德县" },
{
  "value": 3162,
  "label": "达日县" },
{
  "value": 3163,
  "label": "久治县" },
{
  "value": 3164,
  "label": "玛多县" }],

[{
  "value": 3166,
  "label": "玉树市" },
{
  "value": 3167,
  "label": "杂多县" },
{
  "value": 3168,
  "label": "称多县" },
{
  "value": 3169,
  "label": "治多县" },
{
  "value": 3170,
  "label": "囊谦县" },
{
  "value": 3171,
  "label": "曲麻莱县" }],

[{
  "value": 3173,
  "label": "格尔木市" },
{
  "value": 3174,
  "label": "德令哈市" },
{
  "value": 3175,
  "label": "乌兰县" },
{
  "value": 3176,
  "label": "都兰县" },
{
  "value": 3177,
  "label": "天峻县" }]],


[
[{
  "value": 3180,
  "label": "兴庆区" },
{
  "value": 3181,
  "label": "西夏区" },
{
  "value": 3182,
  "label": "金凤区" },
{
  "value": 3183,
  "label": "永宁县" },
{
  "value": 3184,
  "label": "贺兰县" },
{
  "value": 3185,
  "label": "灵武市" }],

[{
  "value": 3187,
  "label": "大武口区" },
{
  "value": 3188,
  "label": "惠农区" },
{
  "value": 3189,
  "label": "平罗县" }],

[{
  "value": 3191,
  "label": "利通区" },
{
  "value": 3192,
  "label": "红寺堡区" },
{
  "value": 3193,
  "label": "盐池县" },
{
  "value": 3194,
  "label": "同心县" },
{
  "value": 3195,
  "label": "青铜峡市" }],

[{
  "value": 3197,
  "label": "原州区" },
{
  "value": 3198,
  "label": "西吉县" },
{
  "value": 3199,
  "label": "隆德县" },
{
  "value": 3200,
  "label": "泾源县" },
{
  "value": 3201,
  "label": "彭阳县" }],

[{
  "value": 3203,
  "label": "沙坡头区" },
{
  "value": 3204,
  "label": "中宁县" },
{
  "value": 3205,
  "label": "海原县" }]],


[
[{
  "value": 3208,
  "label": "天山区" },
{
  "value": 3209,
  "label": "沙依巴克区" },
{
  "value": 3210,
  "label": "新市区" },
{
  "value": 3211,
  "label": "水磨沟区" },
{
  "value": 3212,
  "label": "头屯河区" },
{
  "value": 3213,
  "label": "达坂城区" },
{
  "value": 3214,
  "label": "米东区" },
{
  "value": 3215,
  "label": "乌鲁木齐县" }],

[{
  "value": 3217,
  "label": "独山子区" },
{
  "value": 3218,
  "label": "克拉玛依区" },
{
  "value": 3219,
  "label": "白碱滩区" },
{
  "value": 3220,
  "label": "乌尔禾区" }],

[{
  "value": 3222,
  "label": "吐鲁番市" },
{
  "value": 3223,
  "label": "鄯善县" },
{
  "value": 3224,
  "label": "托克逊县" }],

[{
  "value": 3226,
  "label": "哈密市" },
{
  "value": 3227,
  "label": "巴里坤哈萨克自治县" },
{
  "value": 3228,
  "label": "伊吾县" }],

[{
  "value": 3230,
  "label": "昌吉市" },
{
  "value": 3231,
  "label": "阜康市" },
{
  "value": 3232,
  "label": "呼图壁县" },
{
  "value": 3233,
  "label": "玛纳斯县" },
{
  "value": 3234,
  "label": "奇台县" },
{
  "value": 3235,
  "label": "吉木萨尔县" },
{
  "value": 3236,
  "label": "木垒哈萨克自治县" }],

[{
  "value": 3238,
  "label": "博乐市" },
{
  "value": 3239,
  "label": "阿拉山口市" },
{
  "value": 3240,
  "label": "精河县" },
{
  "value": 3241,
  "label": "温泉县" }],

[{
  "value": 3243,
  "label": "库尔勒市" },
{
  "value": 3244,
  "label": "轮台县" },
{
  "value": 3245,
  "label": "尉犁县" },
{
  "value": 3246,
  "label": "若羌县" },
{
  "value": 3247,
  "label": "且末县" },
{
  "value": 3248,
  "label": "焉耆回族自治县" },
{
  "value": 3249,
  "label": "和静县" },
{
  "value": 3250,
  "label": "和硕县" },
{
  "value": 3251,
  "label": "博湖县" }],

[{
  "value": 3253,
  "label": "阿克苏市" },
{
  "value": 3254,
  "label": "温宿县" },
{
  "value": 3255,
  "label": "库车县" },
{
  "value": 3256,
  "label": "沙雅县" },
{
  "value": 3257,
  "label": "新和县" },
{
  "value": 3258,
  "label": "拜城县" },
{
  "value": 3259,
  "label": "乌什县" },
{
  "value": 3260,
  "label": "阿瓦提县" },
{
  "value": 3261,
  "label": "柯坪县" }],

[{
  "value": 3263,
  "label": "阿图什市" },
{
  "value": 3264,
  "label": "阿克陶县" },
{
  "value": 3265,
  "label": "阿合奇县" },
{
  "value": 3266,
  "label": "乌恰县" }],

[{
  "value": 3268,
  "label": "喀什市" },
{
  "value": 3269,
  "label": "疏附县" },
{
  "value": 3270,
  "label": "疏勒县" },
{
  "value": 3271,
  "label": "英吉沙县" },
{
  "value": 3272,
  "label": "泽普县" },
{
  "value": 3273,
  "label": "莎车县" },
{
  "value": 3274,
  "label": "叶城县" },
{
  "value": 3275,
  "label": "麦盖提县" },
{
  "value": 3276,
  "label": "岳普湖县" },
{
  "value": 3277,
  "label": "伽师县" },
{
  "value": 3278,
  "label": "巴楚县" },
{
  "value": 3279,
  "label": "塔什库尔干塔吉克自治县" }],

[{
  "value": 3281,
  "label": "和田市" },
{
  "value": 3282,
  "label": "和田县" },
{
  "value": 3283,
  "label": "墨玉县" },
{
  "value": 3284,
  "label": "皮山县" },
{
  "value": 3285,
  "label": "洛浦县" },
{
  "value": 3286,
  "label": "策勒县" },
{
  "value": 3287,
  "label": "于田县" },
{
  "value": 3288,
  "label": "民丰县" }],

[{
  "value": 3290,
  "label": "伊宁市" },
{
  "value": 3291,
  "label": "奎屯市" },
{
  "value": 3292,
  "label": "霍尔果斯市" },
{
  "value": 3293,
  "label": "伊宁县" },
{
  "value": 3294,
  "label": "察布查尔锡伯自治县" },
{
  "value": 3295,
  "label": "霍城县" },
{
  "value": 3296,
  "label": "巩留县" },
{
  "value": 3297,
  "label": "新源县" },
{
  "value": 3298,
  "label": "昭苏县" },
{
  "value": 3299,
  "label": "特克斯县" },
{
  "value": 3300,
  "label": "尼勒克县" }],

[{
  "value": 3302,
  "label": "塔城市" },
{
  "value": 3303,
  "label": "乌苏市" },
{
  "value": 3304,
  "label": "额敏县" },
{
  "value": 3305,
  "label": "沙湾县" },
{
  "value": 3306,
  "label": "托里县" },
{
  "value": 3307,
  "label": "裕民县" },
{
  "value": 3308,
  "label": "和布克赛尔蒙古自治县" }],

[{
  "value": 3310,
  "label": "阿勒泰市" },
{
  "value": 3311,
  "label": "布尔津县" },
{
  "value": 3312,
  "label": "富蕴县" },
{
  "value": 3313,
  "label": "福海县" },
{
  "value": 3314,
  "label": "哈巴河县" },
{
  "value": 3315,
  "label": "青河县" },
{
  "value": 3316,
  "label": "吉木乃县" }],

[{
  "value": 3318,
  "label": "石河子市" },
{
  "value": 3319,
  "label": "阿拉尔市" },
{
  "value": 3320,
  "label": "图木舒克市" },
{
  "value": 3321,
  "label": "五家渠市" },
{
  "value": 3322,
  "label": "北屯市" },
{
  "value": 3323,
  "label": "铁门关市" },
{
  "value": 3324,
  "label": "双河市" }]],


[
[{
  "value": 3327,
  "label": "松山区" },
{
  "value": 3328,
  "label": "信义区" },
{
  "value": 3329,
  "label": "大安区" },
{
  "value": 3330,
  "label": "中山区" },
{
  "value": 3331,
  "label": "中正区" },
{
  "value": 3332,
  "label": "大同区" },
{
  "value": 3333,
  "label": "万华区" },
{
  "value": 3334,
  "label": "文山区" },
{
  "value": 3335,
  "label": "南港区" },
{
  "value": 3336,
  "label": "内湖区" },
{
  "value": 3337,
  "label": "士林区" },
{
  "value": 3338,
  "label": "北投区" }],

[{
  "value": 3340,
  "label": "盐埕区" },
{
  "value": 3341,
  "label": "鼓山区" },
{
  "value": 3342,
  "label": "左营区" },
{
  "value": 3343,
  "label": "楠梓区" },
{
  "value": 3344,
  "label": "三民区" },
{
  "value": 3345,
  "label": "新兴区" },
{
  "value": 3346,
  "label": "前金区" },
{
  "value": 3347,
  "label": "苓雅区" },
{
  "value": 3348,
  "label": "前镇区" },
{
  "value": 3349,
  "label": "旗津区" },
{
  "value": 3350,
  "label": "小港区" },
{
  "value": 3351,
  "label": "凤山区" },
{
  "value": 3352,
  "label": "林园区" },
{
  "value": 3353,
  "label": "大寮区" },
{
  "value": 3354,
  "label": "大树区" },
{
  "value": 3355,
  "label": "大社区" },
{
  "value": 3356,
  "label": "仁武区" },
{
  "value": 3357,
  "label": "鸟松区" },
{
  "value": 3358,
  "label": "冈山区" },
{
  "value": 3359,
  "label": "桥头区" },
{
  "value": 3360,
  "label": "燕巢区" },
{
  "value": 3361,
  "label": "田寮区" },
{
  "value": 3362,
  "label": "阿莲区" },
{
  "value": 3363,
  "label": "路竹区" },
{
  "value": 3364,
  "label": "湖内区" },
{
  "value": 3365,
  "label": "茄萣区" },
{
  "value": 3366,
  "label": "永安区" },
{
  "value": 3367,
  "label": "弥陀区" },
{
  "value": 3368,
  "label": "梓官区" },
{
  "value": 3369,
  "label": "旗山区" },
{
  "value": 3370,
  "label": "美浓区" },
{
  "value": 3371,
  "label": "六龟区" },
{
  "value": 3372,
  "label": "甲仙区" },
{
  "value": 3373,
  "label": "杉林区" },
{
  "value": 3374,
  "label": "内门区" },
{
  "value": 3375,
  "label": "茂林区" },
{
  "value": 3376,
  "label": "桃源区" },
{
  "value": 3377,
  "label": "那玛夏区" }],

[{
  "value": 3379,
  "label": "中正区" },
{
  "value": 3380,
  "label": "七堵区" },
{
  "value": 3381,
  "label": "暖暖区" },
{
  "value": 3382,
  "label": "仁爱区" },
{
  "value": 3383,
  "label": "中山区" },
{
  "value": 3384,
  "label": "安乐区" },
{
  "value": 3385,
  "label": "信义区" }],

[{
  "value": 3387,
  "label": "中区" },
{
  "value": 3388,
  "label": "东区" },
{
  "value": 3389,
  "label": "南区" },
{
  "value": 3390,
  "label": "西区" },
{
  "value": 3391,
  "label": "北区" },
{
  "value": 3392,
  "label": "西屯区" },
{
  "value": 3393,
  "label": "南屯区" },
{
  "value": 3394,
  "label": "北屯区" },
{
  "value": 3395,
  "label": "丰原区" },
{
  "value": 3396,
  "label": "东势区" },
{
  "value": 3397,
  "label": "大甲区" },
{
  "value": 3398,
  "label": "清水区" },
{
  "value": 3399,
  "label": "沙鹿区" },
{
  "value": 3400,
  "label": "梧栖区" },
{
  "value": 3401,
  "label": "后里区" },
{
  "value": 3402,
  "label": "神冈区" },
{
  "value": 3403,
  "label": "潭子区" },
{
  "value": 3404,
  "label": "大雅区" },
{
  "value": 3405,
  "label": "新社区" },
{
  "value": 3406,
  "label": "石冈区" },
{
  "value": 3407,
  "label": "外埔区" },
{
  "value": 3408,
  "label": "大安区" },
{
  "value": 3409,
  "label": "乌日区" },
{
  "value": 3410,
  "label": "大肚区" },
{
  "value": 3411,
  "label": "龙井区" },
{
  "value": 3412,
  "label": "雾峰区" },
{
  "value": 3413,
  "label": "太平区" },
{
  "value": 3414,
  "label": "大里区" },
{
  "value": 3415,
  "label": "和平区" }],

[{
  "value": 3417,
  "label": "东区" },
{
  "value": 3418,
  "label": "南区" },
{
  "value": 3419,
  "label": "北区" },
{
  "value": 3420,
  "label": "安南区" },
{
  "value": 3421,
  "label": "安平区" },
{
  "value": 3422,
  "label": "中西区" },
{
  "value": 3423,
  "label": "新营区" },
{
  "value": 3424,
  "label": "盐水区" },
{
  "value": 3425,
  "label": "白河区" },
{
  "value": 3426,
  "label": "柳营区" },
{
  "value": 3427,
  "label": "后壁区" },
{
  "value": 3428,
  "label": "东山区" },
{
  "value": 3429,
  "label": "麻豆区" },
{
  "value": 3430,
  "label": "下营区" },
{
  "value": 3431,
  "label": "六甲区" },
{
  "value": 3432,
  "label": "官田区" },
{
  "value": 3433,
  "label": "大内区" },
{
  "value": 3434,
  "label": "佳里区" },
{
  "value": 3435,
  "label": "学甲区" },
{
  "value": 3436,
  "label": "西港区" },
{
  "value": 3437,
  "label": "七股区" },
{
  "value": 3438,
  "label": "将军区" },
{
  "value": 3439,
  "label": "北门区" },
{
  "value": 3440,
  "label": "新化区" },
{
  "value": 3441,
  "label": "善化区" },
{
  "value": 3442,
  "label": "新市区" },
{
  "value": 3443,
  "label": "安定区" },
{
  "value": 3444,
  "label": "山上区" },
{
  "value": 3445,
  "label": "玉井区" },
{
  "value": 3446,
  "label": "楠西区" },
{
  "value": 3447,
  "label": "南化区" },
{
  "value": 3448,
  "label": "左镇区" },
{
  "value": 3449,
  "label": "仁德区" },
{
  "value": 3450,
  "label": "归仁区" },
{
  "value": 3451,
  "label": "关庙区" },
{
  "value": 3452,
  "label": "龙崎区" },
{
  "value": 3453,
  "label": "永康区" }],

[{
  "value": 3455,
  "label": "东区" },
{
  "value": 3456,
  "label": "北区" },
{
  "value": 3457,
  "label": "香山区" }],

[{
  "value": 3459,
  "label": "东区" },
{
  "value": 3460,
  "label": "西区" }],

[{
  "value": 3462,
  "label": "板桥区" },
{
  "value": 3463,
  "label": "三重区" },
{
  "value": 3464,
  "label": "中和区" },
{
  "value": 3465,
  "label": "永和区" },
{
  "value": 3466,
  "label": "新庄区" },
{
  "value": 3467,
  "label": "新店区" },
{
  "value": 3468,
  "label": "树林区" },
{
  "value": 3469,
  "label": "莺歌区" },
{
  "value": 3470,
  "label": "三峡区" },
{
  "value": 3471,
  "label": "淡水区" },
{
  "value": 3472,
  "label": "汐止区" },
{
  "value": 3473,
  "label": "瑞芳区" },
{
  "value": 3474,
  "label": "土城区" },
{
  "value": 3475,
  "label": "芦洲区" },
{
  "value": 3476,
  "label": "五股区" },
{
  "value": 3477,
  "label": "泰山区" },
{
  "value": 3478,
  "label": "林口区" },
{
  "value": 3479,
  "label": "深坑区" },
{
  "value": 3480,
  "label": "石碇区" },
{
  "value": 3481,
  "label": "坪林区" },
{
  "value": 3482,
  "label": "三芝区" },
{
  "value": 3483,
  "label": "石门区" },
{
  "value": 3484,
  "label": "八里区" },
{
  "value": 3485,
  "label": "平溪区" },
{
  "value": 3486,
  "label": "双溪区" },
{
  "value": 3487,
  "label": "贡寮区" },
{
  "value": 3488,
  "label": "金山区" },
{
  "value": 3489,
  "label": "万里区" },
{
  "value": 3490,
  "label": "乌来区" }],

[{
  "value": 3492,
  "label": "宜兰市" },
{
  "value": 3493,
  "label": "罗东镇" },
{
  "value": 3494,
  "label": "苏澳镇" },
{
  "value": 3495,
  "label": "头城镇" },
{
  "value": 3496,
  "label": "礁溪乡" },
{
  "value": 3497,
  "label": "壮围乡" },
{
  "value": 3498,
  "label": "员山乡" },
{
  "value": 3499,
  "label": "冬山乡" },
{
  "value": 3500,
  "label": "五结乡" },
{
  "value": 3501,
  "label": "三星乡" },
{
  "value": 3502,
  "label": "大同乡" },
{
  "value": 3503,
  "label": "南澳乡" }],

[{
  "value": 3505,
  "label": "桃园市" },
{
  "value": 3506,
  "label": "中坜市" },
{
  "value": 3507,
  "label": "平镇市" },
{
  "value": 3508,
  "label": "八德市" },
{
  "value": 3509,
  "label": "杨梅市" },
{
  "value": 3510,
  "label": "芦竹市" },
{
  "value": 3511,
  "label": "大溪镇" },
{
  "value": 3512,
  "label": "大园乡" },
{
  "value": 3513,
  "label": "龟山乡" },
{
  "value": 3514,
  "label": "龙潭乡" },
{
  "value": 3515,
  "label": "新屋乡" },
{
  "value": 3516,
  "label": "观音乡" },
{
  "value": 3517,
  "label": "复兴乡" }],

[{
  "value": 3519,
  "label": "竹北市" },
{
  "value": 3520,
  "label": "竹东镇" },
{
  "value": 3521,
  "label": "新埔镇" },
{
  "value": 3522,
  "label": "关西镇" },
{
  "value": 3523,
  "label": "湖口乡" },
{
  "value": 3524,
  "label": "新丰乡" },
{
  "value": 3525,
  "label": "芎林乡" },
{
  "value": 3526,
  "label": "横山乡" },
{
  "value": 3527,
  "label": "北埔乡" },
{
  "value": 3528,
  "label": "宝山乡" },
{
  "value": 3529,
  "label": "峨眉乡" },
{
  "value": 3530,
  "label": "尖石乡" },
{
  "value": 3531,
  "label": "五峰乡" }],

[{
  "value": 3533,
  "label": "苗栗市" },
{
  "value": 3534,
  "label": "苑里镇" },
{
  "value": 3535,
  "label": "通霄镇" },
{
  "value": 3536,
  "label": "竹南镇" },
{
  "value": 3537,
  "label": "头份镇" },
{
  "value": 3538,
  "label": "后龙镇" },
{
  "value": 3539,
  "label": "卓兰镇" },
{
  "value": 3540,
  "label": "大湖乡" },
{
  "value": 3541,
  "label": "公馆乡" },
{
  "value": 3542,
  "label": "铜锣乡" },
{
  "value": 3543,
  "label": "南庄乡" },
{
  "value": 3544,
  "label": "头屋乡" },
{
  "value": 3545,
  "label": "三义乡" },
{
  "value": 3546,
  "label": "西湖乡" },
{
  "value": 3547,
  "label": "造桥乡" },
{
  "value": 3548,
  "label": "三湾乡" },
{
  "value": 3549,
  "label": "狮潭乡" },
{
  "value": 3550,
  "label": "泰安乡" }],

[{
  "value": 3552,
  "label": "彰化市" },
{
  "value": 3553,
  "label": "鹿港镇" },
{
  "value": 3554,
  "label": "和美镇" },
{
  "value": 3555,
  "label": "线西乡" },
{
  "value": 3556,
  "label": "伸港乡" },
{
  "value": 3557,
  "label": "福兴乡" },
{
  "value": 3558,
  "label": "秀水乡" },
{
  "value": 3559,
  "label": "花坛乡" },
{
  "value": 3560,
  "label": "芬园乡" },
{
  "value": 3561,
  "label": "员林镇" },
{
  "value": 3562,
  "label": "溪湖镇" },
{
  "value": 3563,
  "label": "田中镇" },
{
  "value": 3564,
  "label": "大村乡" },
{
  "value": 3565,
  "label": "埔盐乡" },
{
  "value": 3566,
  "label": "埔心乡" },
{
  "value": 3567,
  "label": "永靖乡" },
{
  "value": 3568,
  "label": "社头乡" },
{
  "value": 3569,
  "label": "二水乡" },
{
  "value": 3570,
  "label": "北斗镇" },
{
  "value": 3571,
  "label": "二林镇" },
{
  "value": 3572,
  "label": "田尾乡" },
{
  "value": 3573,
  "label": "埤头乡" },
{
  "value": 3574,
  "label": "芳苑乡" },
{
  "value": 3575,
  "label": "大城乡" },
{
  "value": 3576,
  "label": "竹塘乡" },
{
  "value": 3577,
  "label": "溪州乡" }],

[{
  "value": 3579,
  "label": "南投市" },
{
  "value": 3580,
  "label": "埔里镇" },
{
  "value": 3581,
  "label": "草屯镇" },
{
  "value": 3582,
  "label": "竹山镇" },
{
  "value": 3583,
  "label": "集集镇" },
{
  "value": 3584,
  "label": "名间乡" },
{
  "value": 3585,
  "label": "鹿谷乡" },
{
  "value": 3586,
  "label": "中寮乡" },
{
  "value": 3587,
  "label": "鱼池乡" },
{
  "value": 3588,
  "label": "国姓乡" },
{
  "value": 3589,
  "label": "水里乡" },
{
  "value": 3590,
  "label": "信义乡" },
{
  "value": 3591,
  "label": "仁爱乡" }],

[{
  "value": 3593,
  "label": "斗六市" },
{
  "value": 3594,
  "label": "斗南镇" },
{
  "value": 3595,
  "label": "虎尾镇" },
{
  "value": 3596,
  "label": "西螺镇" },
{
  "value": 3597,
  "label": "土库镇" },
{
  "value": 3598,
  "label": "北港镇" },
{
  "value": 3599,
  "label": "古坑乡" },
{
  "value": 3600,
  "label": "大埤乡" },
{
  "value": 3601,
  "label": "莿桐乡" },
{
  "value": 3602,
  "label": "林内乡" },
{
  "value": 3603,
  "label": "二仑乡" },
{
  "value": 3604,
  "label": "仑背乡" },
{
  "value": 3605,
  "label": "麦寮乡" },
{
  "value": 3606,
  "label": "东势乡" },
{
  "value": 3607,
  "label": "褒忠乡" },
{
  "value": 3608,
  "label": "台西乡" },
{
  "value": 3609,
  "label": "元长乡" },
{
  "value": 3610,
  "label": "四湖乡" },
{
  "value": 3611,
  "label": "口湖乡" },
{
  "value": 3612,
  "label": "水林乡" }],

[{
  "value": 3614,
  "label": "太保市" },
{
  "value": 3615,
  "label": "朴子市" },
{
  "value": 3616,
  "label": "布袋镇" },
{
  "value": 3617,
  "label": "大林镇" },
{
  "value": 3618,
  "label": "民雄乡" },
{
  "value": 3619,
  "label": "溪口乡" },
{
  "value": 3620,
  "label": "新港乡" },
{
  "value": 3621,
  "label": "六脚乡" },
{
  "value": 3622,
  "label": "东石乡" },
{
  "value": 3623,
  "label": "义竹乡" },
{
  "value": 3624,
  "label": "鹿草乡" },
{
  "value": 3625,
  "label": "水上乡" },
{
  "value": 3626,
  "label": "中埔乡" },
{
  "value": 3627,
  "label": "竹崎乡" },
{
  "value": 3628,
  "label": "梅山乡" },
{
  "value": 3629,
  "label": "番路乡" },
{
  "value": 3630,
  "label": "大埔乡" },
{
  "value": 3631,
  "label": "阿里山乡" }],

[{
  "value": 3633,
  "label": "屏东市" },
{
  "value": 3634,
  "label": "潮州镇" },
{
  "value": 3635,
  "label": "东港镇" },
{
  "value": 3636,
  "label": "恒春镇" },
{
  "value": 3637,
  "label": "万丹乡" },
{
  "value": 3638,
  "label": "长治乡" },
{
  "value": 3639,
  "label": "麟洛乡" },
{
  "value": 3640,
  "label": "九如乡" },
{
  "value": 3641,
  "label": "里港乡" },
{
  "value": 3642,
  "label": "盐埔乡" },
{
  "value": 3643,
  "label": "高树乡" },
{
  "value": 3644,
  "label": "万峦乡" },
{
  "value": 3645,
  "label": "内埔乡" },
{
  "value": 3646,
  "label": "竹田乡" },
{
  "value": 3647,
  "label": "新埤乡" },
{
  "value": 3648,
  "label": "枋寮乡" },
{
  "value": 3649,
  "label": "新园乡" },
{
  "value": 3650,
  "label": "崁顶乡" },
{
  "value": 3651,
  "label": "林边乡" },
{
  "value": 3652,
  "label": "南州乡" },
{
  "value": 3653,
  "label": "佳冬乡" },
{
  "value": 3654,
  "label": "琉球乡" },
{
  "value": 3655,
  "label": "车城乡" },
{
  "value": 3656,
  "label": "满州乡" },
{
  "value": 3657,
  "label": "枋山乡" },
{
  "value": 3658,
  "label": "三地门乡" },
{
  "value": 3659,
  "label": "雾台乡" },
{
  "value": 3660,
  "label": "玛家乡" },
{
  "value": 3661,
  "label": "泰武乡" },
{
  "value": 3662,
  "label": "来义乡" },
{
  "value": 3663,
  "label": "春日乡" },
{
  "value": 3664,
  "label": "狮子乡" },
{
  "value": 3665,
  "label": "牡丹乡" }],

[{
  "value": 3667,
  "label": "台东市" },
{
  "value": 3668,
  "label": "成功镇" },
{
  "value": 3669,
  "label": "关山镇" },
{
  "value": 3670,
  "label": "卑南乡" },
{
  "value": 3671,
  "label": "鹿野乡" },
{
  "value": 3672,
  "label": "池上乡" },
{
  "value": 3673,
  "label": "东河乡" },
{
  "value": 3674,
  "label": "长滨乡" },
{
  "value": 3675,
  "label": "太麻里乡" },
{
  "value": 3676,
  "label": "大武乡" },
{
  "value": 3677,
  "label": "绿岛乡" },
{
  "value": 3678,
  "label": "海端乡" },
{
  "value": 3679,
  "label": "延平乡" },
{
  "value": 3680,
  "label": "金峰乡" },
{
  "value": 3681,
  "label": "达仁乡" },
{
  "value": 3682,
  "label": "兰屿乡" }],

[{
  "value": 3684,
  "label": "花莲市" },
{
  "value": 3685,
  "label": "凤林镇" },
{
  "value": 3686,
  "label": "玉里镇" },
{
  "value": 3687,
  "label": "新城乡" },
{
  "value": 3688,
  "label": "吉安乡" },
{
  "value": 3689,
  "label": "寿丰乡" },
{
  "value": 3690,
  "label": "光复乡" },
{
  "value": 3691,
  "label": "丰滨乡" },
{
  "value": 3692,
  "label": "瑞穗乡" },
{
  "value": 3693,
  "label": "富里乡" },
{
  "value": 3694,
  "label": "秀林乡" },
{
  "value": 3695,
  "label": "万荣乡" },
{
  "value": 3696,
  "label": "卓溪乡" }],

[{
  "value": 3698,
  "label": "马公市" },
{
  "value": 3699,
  "label": "湖西乡" },
{
  "value": 3700,
  "label": "白沙乡" },
{
  "value": 3701,
  "label": "西屿乡" },
{
  "value": 3702,
  "label": "望安乡" },
{
  "value": 3703,
  "label": "七美乡" }],

[{
  "value": 3705,
  "label": "金城镇" },
{
  "value": 3706,
  "label": "金湖镇" },
{
  "value": 3707,
  "label": "金沙镇" },
{
  "value": 3708,
  "label": "金宁乡" },
{
  "value": 3709,
  "label": "烈屿乡" },
{
  "value": 3710,
  "label": "乌丘乡" }],

[{
  "value": 3712,
  "label": "南竿乡" },
{
  "value": 3713,
  "label": "北竿乡" },
{
  "value": 3714,
  "label": "莒光乡" },
{
  "value": 3715,
  "label": "东引乡" }]],


[
[{
  "value": 3718,
  "label": "中西区" },
{
  "value": 3719,
  "label": "湾仔区" },
{
  "value": 3720,
  "label": "东区" },
{
  "value": 3721,
  "label": "南区" }],

[{
  "value": 3723,
  "label": "油尖旺区" },
{
  "value": 3724,
  "label": "深水埗区" },
{
  "value": 3725,
  "label": "九龙城区" },
{
  "value": 3726,
  "label": "黄大仙区" },
{
  "value": 3727,
  "label": "观塘区" }],

[{
  "value": 3729,
  "label": "荃湾区" },
{
  "value": 3730,
  "label": "屯门区" },
{
  "value": 3731,
  "label": "元朗区" },
{
  "value": 3732,
  "label": "北区" },
{
  "value": 3733,
  "label": "大埔区" },
{
  "value": 3734,
  "label": "西贡区" },
{
  "value": 3735,
  "label": "沙田区" },
{
  "value": 3736,
  "label": "葵青区" },
{
  "value": 3737,
  "label": "离岛区" }]],


[
[{
  "value": 3740,
  "label": "花地玛堂区" },
{
  "value": 3741,
  "label": "圣安多尼堂区" },
{
  "value": 3742,
  "label": "大堂区" },
{
  "value": 3743,
  "label": "望德堂区" },
{
  "value": 3744,
  "label": "风顺堂区" }],

[{
  "value": 3746,
  "label": "嘉模堂区" }],

[{
  "value": 3748,
  "label": "圣方济各堂区" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 689:
/*!***************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/common/time.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.initDays = initDays;exports.initPicker = initPicker;function forMatNum(num) {
  return num < 10 ? '0' + num : num + '';
}

function initDays(year, month) {
  var totalDays = new Date(year, month, 0).getDate();
  var dates = [];
  for (var d = 1; d <= totalDays; d++) {
    dates.push(forMatNum(d));
  };
  return dates;
}
function initPicker(start, end) {var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "date";var step = arguments.length > 3 ? arguments[3] : undefined;
  var aToday = new Date();
  var tYear = aToday.getFullYear().toString();
  var tMonth = forMatNum(aToday.getMonth() + 1).toString();
  var tDay = forMatNum(aToday.getDate()).toString();
  var tHours = forMatNum(aToday.getHours()).toString();
  var tMinutes = forMatNum(aToday.getMinutes()).toString();
  var tSeconds = forMatNum(aToday.getSeconds()).toString();
  var initstartDate = new Date(start);
  var endDate = new Date(end);
  if (start > end) {
    initstartDate = new Date(end);
    endDate = new Date(start);
  };
  var startYear = initstartDate.getFullYear();
  var startMonth = initstartDate.getMonth();
  var endYear = endDate.getFullYear();
  var years = [],months = [],days = [],hours = [],minutes = [],seconds = [],defaultVal = [];
  var totalDays = new Date(startYear, startMonth, 0).getDate();
  for (var s = startYear; s <= endYear; s++) {
    years.push(s + '');
  };
  for (var m = 1; m <= 12; m++) {
    months.push(forMatNum(m));
  };
  for (var d = 1; d <= totalDays; d++) {
    days.push(forMatNum(d));
  }
  for (var h = 0; h < 24; h++) {
    hours.push(forMatNum(h));
  }
  for (var _m = 0; _m < 60; _m += step * 1) {
    minutes.push(forMatNum(_m));
  }
  for (var _s = 0; _s < 60; _s++) {
    seconds.push(forMatNum(_s));
  }
  switch (mode) {
    case "date":
      defaultVal = [years.indexOf(tYear), months.indexOf(tMonth), days.indexOf(tDay)];
      return { years: years, months: months, days: days, defaultVal: defaultVal };
      break;
    case "yearMonth":
      defaultVal = [years.indexOf(tYear), months.indexOf(tMonth)];
      return { years: years, months: months, defaultVal: defaultVal };
      break;
    case "dateTime":
      defaultVal = [years.indexOf(tYear), months.indexOf(tMonth), days.indexOf(tDay), hours.indexOf(tHours), minutes.indexOf(tMinutes), seconds.indexOf(tSeconds)];
      return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
      break;
    case "time":
      defaultVal = [hours.indexOf(tHours), minutes.indexOf(tMinutes), seconds.indexOf(tSeconds)];
      return { hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
      break;}

}

/***/ }),

/***/ 690:
/*!******************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/w-picker/city-data/province.js ***!
  \******************************************************************************************/
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
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 691:
/*!**************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/w-picker/city-data/city.js ***!
  \**************************************************************************************/
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

/***/ 692:
/*!**************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/w-picker/city-data/area.js ***!
  \**************************************************************************************/
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

/***/ 8:
/*!************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/api/http.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var URL = '';
var version = uni.getStorageSync('version') ? uni.getStorageSync('version') : 100;
console.log(version);













URL = 'https://api.beishenliangpin.com';

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
      data: _objectSpread(_objectSpread({}, data), {}, { version: version }) || null,
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // application/json
        // "Access-Token":uni.getStorageSync('jwt') || '',
      },

      success: function success(res) {
        resolve(res);
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

/***/ 90:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 91);

/***/ }),

/***/ 91:
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

module.exports = __webpack_require__(/*! ./runtime */ 92);

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

/***/ 92:
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

/***/ 93:
/*!********************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/QS-SharePoster/QS-SharePoster.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = getSharePoster;exports.setTextArray = setTextArray;exports.setImagesArray = setImagesArray;exports.drawText = drawText;exports.drawImage = drawImage;exports.drawQrCode = drawQrCode;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 90));var _app2 = _interopRequireDefault(__webpack_require__(/*! ./app.js */ 94));
var _QRCodeAlg = _interopRequireDefault(__webpack_require__(/*! ./QRCodeAlg.js */ 95));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var ShreUserPosterBackgroundKey = 'ShrePosterBackground_'; // 背景图片缓存名称前缀

function getSharePoster(obj) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var result1, result2;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                returnPromise(obj));case 3:result1 = _context.sent;
              resolve(result1);_context.next = 21;break;case 7:_context.prev = 7;_context.t0 = _context["catch"](0);

              //TODO handle the exception
              removePosterStorage(obj.type);_context.prev = 10;

              _app2.default.log('------------清除缓存后, 开始第二次尝试------------');_context.next = 14;return (
                returnPromise(obj));case 14:result2 = _context.sent;
              resolve(result2);_context.next = 21;break;case 18:_context.prev = 18;_context.t1 = _context["catch"](10);

              //TODO handle the exception
              reject(_context.t1);case 21:case "end":return _context.stop();}}}, _callee, null, [[0, 7], [10, 18]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());




}

function returnPromise(obj) {var

  type =












  obj.type,background = obj.background,posterCanvasId = obj.posterCanvasId,backgroundImage = obj.backgroundImage,reserve = obj.reserve,textArray = obj.textArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasWH = obj.setCanvasWH,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale,Context = obj.Context;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(rs, rj) {var bgObj, params, i, poster;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

              _app2.default.showLoading('正在准备海报数据');
              if (!Context)
              Context = uni.createCanvasContext(posterCanvasId);if (!(

              background && background.width && background.height)) {_context2.next = 7;break;}
              bgObj = background;_context2.next = 10;break;case 7:_context2.next = 9;return (

                getShreUserPosterBackground({
                  backgroundImage: backgroundImage,
                  type: type }));case 9:bgObj = _context2.sent;case 10:


              // 为了ios 缩放一些
              bgScale = bgScale || .75;
              bgObj.width = bgObj.width * bgScale;
              bgObj.height = bgObj.height * bgScale;

              _app2.default.log('获取背景图信息对象成功:' + JSON.stringify(bgObj));
              params = {
                bgObj: bgObj,
                type: type,
                bgScale: bgScale };

              if (setCanvasWH && typeof setCanvasWH == 'function') setCanvasWH(params);if (!
              imagesArray) {_context2.next = 23;break;}
              if (typeof imagesArray == 'function')
              imagesArray = imagesArray(params);
              _app2.default.showLoading('正在生成需绘制图片的临时路径');_context2.next = 21;return (
                setImagesArray(imagesArray));case 21:imagesArray = _context2.sent;
              _app2.default.hideLoading();case 23:

              if (textArray) {
                if (typeof textArray == 'function')
                textArray = textArray(params);
                textArray = setTextArray(Context, textArray);

              }if (!
              qrCodeArray) {_context2.next = 37;break;}
              if (typeof qrCodeArray == 'function')
              qrCodeArray = qrCodeArray(params);
              _app2.default.showLoading('正在生成需绘制图片的临时路径');
              i = 0;case 28:if (!(i < qrCodeArray.length)) {_context2.next = 36;break;}if (!
              qrCodeArray[i].image) {_context2.next = 33;break;}_context2.next = 32;return (
                _app2.default.downloadFile_PromiseFc(qrCodeArray[i].image));case 32:qrCodeArray[i].image = _context2.sent;case 33:i++;_context2.next = 28;break;case 36:

              _app2.default.hideLoading();case 37:_context2.next = 39;return (

                drawShareImage({
                  Context: Context,
                  type: type,
                  posterCanvasId: posterCanvasId,
                  reserve: reserve,
                  textArray: textArray,
                  imagesArray: imagesArray,
                  bgObj: bgObj,
                  qrCodeArray: qrCodeArray,
                  setCanvasToTempFilePath: setCanvasToTempFilePath,
                  setDraw: setDraw,
                  bgScale: bgScale }));case 39:poster = _context2.sent;

              _app2.default.hideLoading();
              rs({
                bgObj: bgObj,
                poster: poster,
                type: type });_context2.next = 47;break;case 44:_context2.prev = 44;_context2.t0 = _context2["catch"](0);


              //TODO handle the exception
              rj(_context2.t0);case 47:case "end":return _context2.stop();}}}, _callee2, null, [[0, 44]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


}

function drawShareImage(obj) {//绘制海报方法
  var
  Context =










  obj.Context,type = obj.type,posterCanvasId = obj.posterCanvasId,reserve = obj.reserve,bgObj = obj.bgObj,textArray = obj.textArray,qrCodeArray = obj.qrCodeArray,imagesArray = obj.imagesArray,setCanvasToTempFilePath = obj.setCanvasToTempFilePath,setDraw = obj.setDraw,bgScale = obj.bgScale;
  return new Promise(function (rs, rj) {
    try {
      _app2.default.showLoading('正在绘制海报');
      if (bgObj && bgObj.path) {
        Context.drawImage(bgObj.path, 0, 0, bgObj.width, bgObj.height);
      } else {
        if (bgObj.backgroundColor) {
          Context.setFillStyle(bgObj.backgroundColor);
          Context.fillRect(0, 0, bgObj.width, bgObj.height);
        }
      }

      _app2.default.showLoading('准备绘制图片');
      drawImage(Context, imagesArray);

      _app2.default.showLoading('准备绘制自定义内容');
      if (setDraw && typeof setDraw == 'function') setDraw({
        Context: Context,
        bgObj: bgObj,
        type: type,
        bgScale: bgScale });


      _app2.default.showLoading('准备绘制文本');
      drawText(Context, textArray, bgObj);

      _app2.default.showLoading('准备绘制二维码');
      if (qrCodeArray && qrCodeArray.length > 0) {
        for (var i = 0; i < qrCodeArray.length; i++) {
          drawQrCode(Context, qrCodeArray[i]);
        }
      }
      _app2.default.showLoading('绘制中');
      Context.draw(typeof reserve == 'boolean' ? reserve : false, function () {
        _app2.default.showLoading('准备输出图片');
        var setObj = {};
        if (setCanvasToTempFilePath && typeof setCanvasToTempFilePath == 'function')
        setObj = setCanvasToTempFilePath(bgObj, type);







        var data = _objectSpread({
          x: 0,
          y: 0,
          width: bgObj.width,
          height: bgObj.height,
          destWidth: bgObj.width * 2, // 若H5使用这里请不要乘以二
          destHeight: bgObj.height * 2, // 若H5使用这里请不要乘以二
          quality: .8 },
        setObj);

        _app2.default.log('canvasToTempFilePath的data对象:' + JSON.stringify(data));
        _app2.default.showLoading('正在输出图片');
        var canvasToTempFilePathFn = function canvasToTempFilePathFn() {
          uni.canvasToTempFilePath(_objectSpread(_objectSpread({},
          data), {}, {
            canvasId: posterCanvasId,
            success: function success(res) {
              _app2.default.hideLoading();
              rs(res);
            },
            fail: function fail(err) {
              _app2.default.hideLoading();
              _app2.default.log('输出图片失败:' + JSON.stringify(err));
              rj('输出图片失败:' + JSON.stringify(err));
            } }));

        };

        var textLength = 0;
        if (qrCodeArray) {
          qrCodeArray.forEach(function (item) {
            if (item.text) {
              textLength = Number(item.text.length);
            }
          });
        }
        setTimeout(canvasToTempFilePathFn, textLength * 10);





      });
    } catch (e) {
      //TODO handle the exception
      _app2.default.hideLoading();
      rj(e);
    }
  });
}

function setTextArray(Context, textArray) {// 设置文本数据
  for (var i = 0; i < textArray.length; i++) {
    var textItem = textArray[i];
    _app2.default.log('字符串信息-初始化之前:' + JSON.stringify(textArray[i]));
    if (textItem.text && typeof textItem.text == "string" && textItem.text.length > 0) {
      textItem.alpha = textItem.alpha !== undefined ? textItem.alpha : 1;
      textItem.color = textItem.color || 'black';
      textItem.size = textItem.size !== undefined ? textItem.size : 10;
      textItem.textAlign = textItem.textAlign || 'left';
      textItem.textBaseline = textItem.textBaseline || 'middle';
      textItem.dx = textItem.dx || 0;
      textItem.dy = textItem.dy || 0;
      textItem.size = Math.ceil(Number(textItem.size));
      _app2.default.log('字符串信息-初始化默认值后:' + JSON.stringify(textArray[i]));
      var textLength = countTextLength(Context, {
        text: textItem.text,
        size: textItem.size });

      _app2.default.log('字符串信息-初始化时的文本长度:' + textLength);
      var infoCallBackObj = {};
      if (textItem.infoCallBack && typeof textItem.infoCallBack === 'function')
      infoCallBackObj = textItem.infoCallBack(textLength);
      textArray[i] = _objectSpread(_objectSpread({},
      textItem), {}, {
        textLength: textLength },
      infoCallBackObj);

      _app2.default.log('字符串信息-infoCallBack后:' + JSON.stringify(textArray[i]));
    }
  }
  return textArray;
}

function countTextLength(Context, obj) {
  _app2.default.log('进入计算文字长度, obj:' + JSON.stringify(obj));var

  text =

  obj.text,size = obj.size;
  Context.setFontSize(size);
  var textLength = Context.measureText(text); // 官方文档说 App端自定义组件编译模式暂时不可用measureText方法
  _app2.default.log('measureText计算文字长度, textLength:' + JSON.stringify(textLength));
  textLength = textLength && textLength.width ? textLength.width : 0;
  if (!textLength) {
    var l = 0;
    for (var j = 0; j < text.length; j++) {
      var t = text.substr(j, 1);
      if (/[\u4e00-\u9fa5]/.test(t)) {
        l += 1;
      } else {
        if (/[A-Za-z0-9]/.test(t)) {
          l += 0.75;
        } else {
          var c = text.charAt(j);
          if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
            {
              l += 0.2;
            } else {
            l += 1;
          }
        }
      }
    }
    textLength = l * size;
  }
  return textLength;
}

function setImagesArray(imagesArray) {// 设置图片数据
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve, rejcet) {var i, imgUrl, imageInfo;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

              i = 0;case 2:if (!(i < imagesArray.length)) {_context3.next = 21;break;}if (!
              imagesArray[i].url) {_context3.next = 18;break;}
              imgUrl = imagesArray[i].url;_context3.next = 7;return (
                _app2.default.downloadFile_PromiseFc(imgUrl));case 7:imgUrl = _context3.sent;
              imagesArray[i].url = imgUrl;_context3.next = 11;return (
                _app2.default.getImageInfo_PromiseFc(imgUrl));case 11:imageInfo = _context3.sent;
              if (imagesArray[i].infoCallBack && typeof imagesArray[i].infoCallBack === 'function') {
                imagesArray[i] = _objectSpread(_objectSpread({},
                imagesArray[i]),
                imagesArray[i].infoCallBack(imageInfo));

              }
              imagesArray[i].dx = imagesArray[i].dx || 0;
              imagesArray[i].dy = imagesArray[i].dy || 0;
              imagesArray[i].dWidth = imagesArray[i].dWidth || imageInfo.width;
              imagesArray[i].dHeight = imagesArray[i].dHeight || imageInfo.height;
              imagesArray[i] = _objectSpread(_objectSpread({},
              imagesArray[i]), {}, {
                imageInfo: imageInfo });case 18:i++;_context3.next = 2;break;case 21:



              resolve(imagesArray);_context3.next = 27;break;case 24:_context3.prev = 24;_context3.t0 = _context3["catch"](0);

              //TODO handle the exception
              rejcet(_context3.t0);case 27:case "end":return _context3.stop();}}}, _callee3, null, [[0, 24]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());


}

function drawText(Context, textArray, bgObj) {// 先遍历换行再绘制
  var newArr = [];
  if (textArray && textArray.length > 0) {
    for (var j = 0; j < textArray.length; j++) {
      var textItem = textArray[j];
      if (textItem.text && textItem.lineFeed) {
        var lineNum = -1,
        maxWidth = bgObj.width,
        lineHeight = textItem.size,
        dx = textItem.dx;
        if (textItem.lineFeed instanceof Object) {
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
        _app2.default.log('循环出的文字数组:' + JSON.stringify(row));
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


          _app2.default.log('重新组成的文字对象:' + JSON.stringify(obj));
          newArr.push(obj);
        }
      } else {
        newArr.push(textItem);
      }
    }
  }
  drawTextFc(Context, newArr);
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

function drawTextFc(Context, textArray) {// 绘制文本
  if (textArray && textArray.length > 0) {
    for (var i = 0; i < textArray.length; i++) {
      var textItem = textArray[i];
      if (textItem instanceof Object && textItem.text) {
        Context.font = setFont(textItem);
        Context.setFillStyle(textItem.color);
        Context.setGlobalAlpha(textItem.alpha);
        Context.setTextAlign(textItem.textAlign);
        Context.setTextBaseline(textItem.textBaseline);
        Context.fillText(textItem.text, textItem.dx, textItem.dy);
        if (textItem.lineThrough && textItem.lineThrough instanceof Object) {
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
          var mx = void 0,my = void 0;
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
  }
}

function drawImage(Context, imagesArray) {// 绘制图片
  if (imagesArray && imagesArray.length > 0) {
    for (var i = 0; i < imagesArray.length; i++) {
      var img = imagesArray[i];
      _app2.default.log('imageArrayItem: ' + JSON.stringify(img));
      if (img.url) {
        if (img.circleSet) {
          setImageCircle(Context, img);
        } else if (img.roundRectSet) {
          setImageRoundRect(Context, img);
        }
        if (img.dWidth && img.dHeight && img.sx && img.sy && img.sWidth && img.sHeight) {
          Context.drawImage(img.url, img.dx || 0, img.dy || 0,
          img.dWidth || false, img.dHeight || false,
          img.sx || false, img.sy || false,
          img.sWidth || false, img.sHeight || false);
        } else if (img.dWidth && img.dHeight) {
          Context.drawImage(img.url, img.dx || 0, img.dy || 0,
          img.dWidth || false, img.dHeight || false);
        } else {
          Context.drawImage(img.url, img.dx || 0, img.dy || 0);
        }
        if (img.circleSet || img.roundRectSet) {
          Context.restore();
        }

      }
    }
  }
}

function setImageCircle(Context, obj) {
  Context.save();var

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
  Context.beginPath();
  Context.arc(x, y, r, 0, 2 * Math.PI, false);
  Context.clip();
  Context.closePath();
}

function setImageRoundRect(Context, obj) {// 绘制矩形
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
  Context.clip();
  Context.closePath();
}

function drawQrCode(Context, qrCodeObj) {//生成二维码方法， 参考了 诗小柒 的二维码生成器代码
  _app2.default.showLoading('正在生成二维码');
  var qrcodeAlgObjCache = [];
  var options = {
    text: qrCodeObj.text || '', // 生成内容
    size: qrCodeObj.size || 200, // 二维码大小
    background: qrCodeObj.background || '#ffffff', // 背景色
    foreground: qrCodeObj.foreground || '#000000', // 前景色
    pdground: qrCodeObj.pdground || '#000000', // 定位角点颜色
    correctLevel: qrCodeObj.correctLevel || 3, // 容错级别
    image: qrCodeObj.image || '', // 二维码图标
    imageSize: qrCodeObj.imageSize || 40, // 二维码图标大小
    dx: qrCodeObj.dx || 0, // x轴距离
    dy: qrCodeObj.dy || 0 // y轴距离
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
  _app2.default.hideLoading();
}

function getShreUserPosterBackground(objs) {//检查背景图是否存在于本地， 若存在直接返回， 否则调用getShreUserPosterBackgroundFc方法
  var
  backgroundImage =

  objs.backgroundImage,type = objs.type;
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {var pbg, image, index, imageObj, obj, savedFilePath, _savedFilePath, _savedFilePath2, _savedFilePath3;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.prev = 0;

              _app2.default.showLoading('正在获取海报背景图');


              pbg = getPosterStorage(type);




              _app2.default.log('获取的缓存:' + JSON.stringify(pbg));if (!(
              pbg && pbg.path && pbg.name)) {_context4.next = 53;break;}
              _app2.default.log('海报有缓存, 准备获取后端背景图进行对比');_context4.next = 8;return (
                _app2.default.getPosterUrl(objs));case 8:image = _context4.sent;
              _app2.default.log('准备对比name是否相同');if (!(
              pbg.name === _app2.default.fileNameInPath(image))) {_context4.next = 45;break;}
              _app2.default.log('name相同, 判断该背景图是否存在于本地');_context4.next = 14;return (
                _app2.default.checkFile_PromiseFc(pbg.path));case 14:index = _context4.sent;if (!(
              index >= 0)) {_context4.next = 37;break;}
              _app2.default.log('海报save路径存在, 对比宽高信息, 存储并输出');_context4.next = 19;return (
                _app2.default.getImageInfo_PromiseFc(pbg.path));case 19:imageObj = _context4.sent;
              obj = _objectSpread({}, pbg);if (!(

              !pbg.width || !pbg.height || pbg.width !== imageObj.width || pbg.height !== imageObj.height)) {_context4.next = 30;break;}
              _app2.default.log('宽高对比不通过， 重新获取');_context4.next = 25;return (
                getShreUserPosterBackgroundFc(objs, image));case 25:savedFilePath = _context4.sent;
              _app2.default.hideLoading();
              resolve(savedFilePath);_context4.next = 35;break;case 30:

              _app2.default.log('宽高对比通过, 再次存储, 并返回路径');
              obj = _objectSpread(_objectSpread({},
              pbg), {}, {
                width: imageObj.width,
                height: imageObj.height });


              setPosterStorage(type, _objectSpread({}, obj));


              _app2.default.hideLoading();
              resolve(obj);case 35:_context4.next = 43;break;case 37:


              _app2.default.log('海报save路径不存在, 重新获取海报');_context4.next = 40;return (
                getShreUserPosterBackgroundFc(objs, image));case 40:_savedFilePath = _context4.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath);case 43:_context4.next = 51;break;case 45:


              _app2.default.log('name不相同, 重新获取海报');_context4.next = 48;return (
                getShreUserPosterBackgroundFc(objs, image));case 48:_savedFilePath2 = _context4.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath2);case 51:_context4.next = 59;break;case 53:


              _app2.default.log('海报背景图没有缓存, 准备获取海报背景图');_context4.next = 56;return (
                getShreUserPosterBackgroundFc(objs));case 56:_savedFilePath3 = _context4.sent;
              _app2.default.hideLoading();
              resolve(_savedFilePath3);case 59:_context4.next = 67;break;case 61:_context4.prev = 61;_context4.t0 = _context4["catch"](0);


              _app2.default.hideLoading();
              _app2.default.showToast('获取分享用户背景图失败:' + JSON.stringify(_context4.t0));
              _app2.default.log(JSON.stringify(_context4.t0));
              reject(_context4.t0);case 67:case "end":return _context4.stop();}}}, _callee4, null, [[0, 61]]);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());


}

function getPosterStorage(type) {
  return _app2.default.getStorageSync(getStorageKey(type));
}

function removePosterStorage(type) {
  var ShreUserPosterBackgroundKey = getStorageKey(type);
  var pbg = _app2.default.getStorageSync(ShreUserPosterBackgroundKey);
  if (pbg && pbg.path) {
    _app2.default.removeSavedFile(pbg.path);
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
  removePosterStorage(type);
  return new Promise( /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(resolve, reject) {var name, savedFilePath, imageObj, returnObj, image, _savedFilePath4, _imageObj, _returnObj;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;

              _app2.default.showLoading('正在下载海报背景图');if (!
              upimage) {_context5.next = 24;break;}
              _app2.default.log('有从后端获取的背景图片路径');
              _app2.default.log('尝试下载并保存背景图');
              name = _app2.default.fileNameInPath(upimage);_context5.next = 8;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(upimage));case 8:savedFilePath = _context5.sent;if (!
              savedFilePath) {_context5.next = 20;break;}
              _app2.default.log('下载并保存背景图成功:' + savedFilePath);_context5.next = 13;return (
                _app2.default.getImageInfo_PromiseFc(savedFilePath));case 13:imageObj = _context5.sent;
              returnObj = {
                path: savedFilePath,
                width: imageObj.width,
                height: imageObj.height,
                name: name };


              setPosterStorage(type, _objectSpread({}, returnObj));


              _app2.default.hideLoading();
              resolve(returnObj);_context5.next = 22;break;case 20:

              _app2.default.hideLoading();
              reject('not find savedFilePath');case 22:_context5.next = 48;break;case 24:


              _app2.default.log('没有从后端获取的背景图片路径, 尝试从后端获取背景图片路径');_context5.next = 27;return (
                _app2.default.getPosterUrl(objs));case 27:image = _context5.sent;
              _app2.default.log('尝试下载并保存背景图:' + image);_context5.next = 31;return (
                _app2.default.downLoadAndSaveFile_PromiseFc(image));case 31:_savedFilePath4 = _context5.sent;if (!
              _savedFilePath4) {_context5.next = 46;break;}
              _app2.default.log('下载并保存背景图成功:' + _savedFilePath4);_context5.next = 36;return (
                _app2.default.getImageInfo_PromiseFc(_savedFilePath4));case 36:_imageObj = _context5.sent;
              _app2.default.log('获取图片信息成功');
              _returnObj = {
                path: _savedFilePath4,
                width: _imageObj.width,
                height: _imageObj.height,
                name: _app2.default.fileNameInPath(image) };

              _app2.default.log('拼接背景图信息对象成功:' + JSON.stringify(_returnObj));


              setPosterStorage(type, _objectSpread({}, _returnObj));



              _app2.default.hideLoading();
              _app2.default.log('返回背景图信息对象');
              resolve(_objectSpread({}, _returnObj));_context5.next = 48;break;case 46:


              _app2.default.hideLoading();
              reject('not find savedFilePath');case 48:_context5.next = 53;break;case 50:_context5.prev = 50;_context5.t0 = _context5["catch"](0);



              //TODO handle the exception
              reject(_context5.t0);case 53:case "end":return _context5.stop();}}}, _callee5, null, [[0, 50]]);}));return function (_x9, _x10) {return _ref5.apply(this, arguments);};}());


}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 94:
/*!*********************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/QS-SharePoster/app.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var log = console.log; // 如果在项目的APP.vue文件中的onlaunch中设置 console.log = ()=> {} 则在此也不会有打印信息
// log = ()=>{};	// 打开注释则该插件不会打印任何信息
var _app = {
  log: log, // 打印控制
  getPosterUrl: function getPosterUrl(objs) {// 后端获取背景图的url路径方法
    var
    backgroundImage =

    objs.backgroundImage,type = objs.type;
    return new Promise(function (rs, rj) {
      var image;
      if (backgroundImage)
      image = backgroundImage;else

      switch (type) {//根据type获取背景图, 一般要改成request获取
        case 1:
          image = '';
          break;
        default:
          image = '/static/twocode-bg.jpg';
          break;}

      if (image)
      rs(image); // resolve图片的路径
      else
        rj('背景图片路径不存在');
    });
  },






  //下面一般不用动他
  shareTypeListSheetArray: {
    array: [0, 1, 2, 3, 4, 5] },
  // 分享类型 0-图文链接 1-纯文字 2-纯图片 3-音乐 4-视频 5-小程序
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
    log('设置缓存');
    log('key：' + key);
    log('data：' + JSON.stringify(data));
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
        log('url:' + url);
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
        log('保存成功:' + JSON.stringify(res));
      } });

  },
  downLoadAndSaveFile_PromiseFc: function downLoadAndSaveFile_PromiseFc(url) {
    return new Promise(function (rs, rj) {
      log('准备下载并保存图片:' + url);
      if (url.substring(0, 4) === 'http') {
        url = checkMPUrl(url);
        uni.downloadFile({
          url: url,
          success: function success(d_res) {
            log('下载背景图成功：' + JSON.stringify(d_res));
            if (d_res && d_res.tempFilePath) {






              uni.saveFile({
                tempFilePath: d_res.tempFilePath,
                success: function success(s_res) {
                  log('保存背景图成功:' + JSON.stringify(s_res));
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
      log('准备获取图片信息:' + imgPath);
      imgPath = checkMPUrl(imgPath);
      uni.getImageInfo({
        src: imgPath,
        success: function success(res) {
          log('获取图片信息成功:' + JSON.stringify(res));
          rs(res);
        },
        fail: function fail(err) {
          log('获取图片信息失败:' + JSON.stringify(err));
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

  if (
  url.substring(0, 4) === 'http' &&
  url.substring(0, 12) !== 'http://store' &&
  url.substring(0, 10) !== 'http://tmp' &&
  url.substring(0, 5) !== 'https')
  {
    url = 'https' + url.substring(4, url.length);
  }

  return url;
}var _default =

_app;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 95:
/*!***************************************************************************************!*\
  !*** C:/Users/cqkj/Desktop/3.23新包/riceProject/components/QS-SharePoster/QRCodeAlg.js ***!
  \***************************************************************************************/
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

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map