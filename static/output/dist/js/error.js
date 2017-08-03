webpackJsonp([2],{

/***/ 10:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMountedComponent = exports.isStatelessComponent = exports.arrayContains = exports.objectWithoutProperties = exports.compare = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.size = size;
exports.hashCode = hashCode;
exports.isNull = isNull;
exports.resetPath = resetPath;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** compare two objects */
var compare = exports.compare = function compare(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (!obj1 || !obj2) {
    return false;
  }
  if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) !== 'object') {
    if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
      return false;
    }
    if (obj1 !== obj2) {
      return false;
    }
    return true;
  }

  if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) !== 'object') {
    return false;
  }

  if (size(obj1) !== size(obj2)) {
    return false;
  }

  var result = void 0;
  for (var i in obj1) {
    if (!obj1.hasOwnProperty(i)) {
      continue;
    }
    if (!obj2.hasOwnProperty(i)) {
      return false;
    }
    result = compare(obj1[i], obj2[i]);
    if (!result) {
      return false;
    }
  }
  return true;
};

/**
 * object without properties
 */
var objectWithoutProperties = exports.objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var re = {};
  if (!obj || !keys || !(keys instanceof Array) || keys.length === 0) {
    return re;
  }
  for (var item in obj) {
    if (arrayContains(keys, item)) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, item)) continue;

    re[item] = obj[item];
  }
  return re;
};

/**
 * array contains
 */
var arrayContains = exports.arrayContains = function arrayContains(array, item) {
  if (!array || !item || !array.length) {
    return false;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return true;
    }
  }
  return false;
};

/** is stateless component */
var isStatelessComponent = exports.isStatelessComponent = function isStatelessComponent(componentClass) {
  return !componentClass.prototype || !componentClass.prototype.render;
};

/** is mounted component */
var isMountedComponent = exports.isMountedComponent = function isMountedComponent(component) {
  return !!component._reactInternalInstance;
};

/**
 * get the size of an object
 *
 * @method size
 *
 * @param {object} ob    - the object to check
 *
 * @return {int}         - the size of the object
 */
function size(ob) {
  if (!ob) return 0;
  return Object.keys(ob).length;
}

/**
 * get unique hashCode
 * @methdo hashCode - Usually use to create an identify an object
 */
function hashCode() {
  var res = '';
  for (var i = 0; i < 6; i++) {
    res += chars[Math.ceil(Math.random() * 35)];
  }
  return res + new Date().getTime();
}

/** is null */
function isNull(obj) {
  if (typeof obj === 'undefined' || obj === null) {
    return true;
  }
  return false;
}

/**
 * get correct path
 * @method resetPath
 */
function resetPath(path) {
  if (!path) {
    return '/';
  }
  if (path.charAt(0) !== '/') {
    path = '/' + path;
  }
  if (path.length > 1 && path.charAt(path.length - 1) === '/') {
    path = path.substring(0, path.length - 1);
  }
  return path.replace(/\/{2,}/g, '/');
}

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = undefined;

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
  var _parsePath = parsePath(path);

  var pathname = _parsePath.pathname;
  var search = _parsePath.search;
  var hash = _parsePath.hash;


  return createPath({
    pathname: pathname,
    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
    hash: hash
  });
};

var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
  var _parsePath2 = parsePath(path);

  var pathname = _parsePath2.pathname;
  var search = _parsePath2.search;
  var hash = _parsePath2.hash;


  return createPath({
    pathname: pathname,
    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
      return prefix === '?' ? prefix : suffix;
    }),
    hash: hash
  });
};

var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
  var _parsePath3 = parsePath(path);

  var search = _parsePath3.search;

  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
  return match && match[1];
};

var extractPath = function extractPath(string) {
  var match = string.match(/^(https?:)?\/\/[^\/]*/);
  return match == null ? string : string.substring(match[0].length);
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

   true ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  if (location == null || typeof location === 'string') return location;

  var basename = location.basename;
  var pathname = location.pathname;
  var search = location.search;
  var hash = location.hash;

  var path = (basename || '') + pathname;

  if (search && search !== '?') path += search;

  if (hash) path += hash;

  return path;
};

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(163);
var $Object = __webpack_require__(10).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(164);
var $Object = __webpack_require__(10).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165);
module.exports = __webpack_require__(10).Object.getPrototypeOf;

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(166);
module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(167);
__webpack_require__(96);
__webpack_require__(168);
__webpack_require__(169);
module.exports = __webpack_require__(10).Symbol;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
__webpack_require__(73);
module.exports = __webpack_require__(60).f('iterator');

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(27)
  , toLength  = __webpack_require__(72)
  , toIndex   = __webpack_require__(161);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(38)
  , gOPS    = __webpack_require__(66)
  , pIE     = __webpack_require__(45);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(41);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(56)('wks')
  , uid        = __webpack_require__(42)
  , Symbol     = __webpack_require__(16).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(54)
  , descriptor     = __webpack_require__(39)
  , setToStringTag = __webpack_require__(46)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(30)(IteratorPrototype, __webpack_require__(15)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(38)
  , toIObject = __webpack_require__(27);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(42)('meta')
  , isObject = __webpack_require__(34)
  , has      = __webpack_require__(26)
  , setDesc  = __webpack_require__(21).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(33)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(21)
  , anObject = __webpack_require__(25)
  , getKeys  = __webpack_require__(38);

module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(27)
  , gOPN      = __webpack_require__(82).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(22)
  , core    = __webpack_require__(10)
  , fails   = __webpack_require__(33);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(34)
  , anObject = __webpack_require__(25);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(36)(Function.call, __webpack_require__(81).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57)
  , defined   = __webpack_require__(52);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(144)
  , step             = __webpack_require__(152)
  , Iterators        = __webpack_require__(37)
  , toIObject        = __webpack_require__(27);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(80)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(22)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(54)});

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(22);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(21).f});

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(49)
  , $getPrototypeOf = __webpack_require__(83);

__webpack_require__(157)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(22);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(158).set});

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(16)
  , has            = __webpack_require__(26)
  , DESCRIPTORS    = __webpack_require__(24)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(85)
  , META           = __webpack_require__(154).KEY
  , $fails         = __webpack_require__(33)
  , shared         = __webpack_require__(56)
  , setToStringTag = __webpack_require__(46)
  , uid            = __webpack_require__(42)
  , wks            = __webpack_require__(15)
  , wksExt         = __webpack_require__(60)
  , wksDefine      = __webpack_require__(59)
  , keyOf          = __webpack_require__(153)
  , enumKeys       = __webpack_require__(146)
  , isArray        = __webpack_require__(148)
  , anObject       = __webpack_require__(25)
  , toIObject      = __webpack_require__(27)
  , toPrimitive    = __webpack_require__(58)
  , createDesc     = __webpack_require__(39)
  , _create        = __webpack_require__(54)
  , gOPNExt        = __webpack_require__(156)
  , $GOPD          = __webpack_require__(81)
  , $DP            = __webpack_require__(21)
  , $keys          = __webpack_require__(38)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(82).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(45).f  = $propertyIsEnumerable;
  __webpack_require__(66).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(44)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(30)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59)('asyncIterator');

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59)('observable');

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listener = exports.setHistory = undefined;
exports.go = go;
exports.replace = replace;

var _Logger = __webpack_require__(190);

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * dynamicly put value to History Object
 * mainly called by RouteHistory
 * @method set
 *
 * @param {string} key
 * @param {object} value
 * @return none
 */

var setHistory = exports.setHistory = function setHistory(history) {
  HistoryControl.history = history;
};

var listener = exports.listener = function listener(location, action) {
  HistoryControl.path = location.pathname;
  HistoryControl.state = location.state;
};

function go(pathOrIndex, state) {

  if (typeof pathOrIndex === 'number') {
    if (pathOrIndex === -1) {
      HistoryControl.history.goBack();
    } else if (pathOrIndex === 1) {
      HistoryControl.history.goForward();
    } else {
      HistoryControl.history.go(pathOrIndex);
    }
  } else {
    if (pathOrIndex === HistoryControl.path) return;
    if (HistoryControl.history) {
      HistoryControl.history.push({ pathname: pathOrIndex, state: state });
      HistoryControl.history.goForward();
    } else {
      setTimeout(function () {
        if (HistoryControl.history) {
          HistoryControl.history.push({ pathname: pathOrIndex, state: state });
          HistoryControl.history.goForward();
        }
      }, 0);
    }
  }
}

function replace(path, state) {
  HistoryControl.history.replace(path, state);
}

/**
 * export History Object to outer' using
 */
var HistoryControl = {
  path: '/',
  state: null,
  go: go,
  replace: replace
};

exports.default = HistoryControl;

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.warn = warn;
exports.error = error;
function log() {
  if (console) {
    var _console;

    (_console = console).log.apply(_console, arguments);
  }
}

function warn() {
  if (console) {
    var _console2;

    (_console2 = console).warn.apply(_console2, arguments);
  }
}

function error() {
  if (console) {
    var _console3;

    (_console3 = console).error.apply(_console3, arguments);
  }
}

exports.default = {
  log: log,
  warn: warn,
  error: error
};

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(67);

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(113);

var _Actions = __webpack_require__(378);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createQuery = exports.createQuery = function createQuery(props) {
  return _extends(Object.create(null), props);
};

var createLocation = exports.createLocation = function createLocation() {
  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;

   true ? (0, _warning2.default)(!object.path, 'Location descriptor objects should have a `pathname`, not a `path`.') : void 0;

  var pathname = object.pathname || '/';
  var search = object.search || '';
  var hash = object.hash || '';
  var state = object.state;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
};

var isDate = function isDate(object) {
  return Object.prototype.toString.call(object) === '[object Date]';
};

var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
  if (a === b) return true;

  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (typeofA !== typeofB) return false;

  !(typeofA !== 'function') ?  true ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;

  // Not the same object, but same type.
  if (typeofA === 'object') {
    !!(isDate(a) && isDate(b)) ?  true ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;

    if (!Array.isArray(a)) {
      var keysofA = Object.keys(a);
      var keysofB = Object.keys(b);
      return keysofA.length === keysofB.length && keysofA.every(function (key) {
        return statesAreEqual(a[key], b[key]);
      });
    }

    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return statesAreEqual(item, b[index]);
    });
  }

  // All other serializable types (string, number, boolean)
  // should be strict equal.
  return false;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.key === b.key &&
  // a.action === b.action && // Different action !== location change.
  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(25)
  , IE8_DOM_DEFINE = __webpack_require__(79)
  , toPrimitive    = __webpack_require__(58)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopstateOnHashchange = exports.supportsPopstateOnHashchange = function supportsPopstateOnHashchange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(16)
  , core      = __webpack_require__(10)
  , ctx       = __webpack_require__(36)
  , hide      = __webpack_require__(30)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(135);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(134);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(33)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(34);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(95)
  , defined = __webpack_require__(52);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (true) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(21)
  , createDesc = __webpack_require__(39);
module.exports = __webpack_require__(24) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(71);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * the cache of link controlle
 */

/** clear cache route */
var clear = function clear() {
  targetPath = '';
  cacheStack = [];
};

/** add cache route */
var add = exports.add = function add(srcRoute, _targetPath) {
  if (!srcRoute || !_targetPath) {
    return;
  }
  targetPath = _targetPath;
  cacheStack.push(srcRoute);
};

/** history listener */
var onHistoryChanged = exports.onHistoryChanged = function onHistoryChanged(location) {
  if (location.pathname !== targetPath) {
    clear();
  }
};

/** judge if route should cache */
var isCached = exports.isCached = function isCached(srcRoute) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cacheStack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;

      if (route === srcRoute) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};

var cacheStack = [];
var targetPath = '';

exports.default = {
  add: add,
  isCached: isCached,
  onHistoryChanged: onHistoryChanged
};

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _InnerRouter = __webpack_require__(879);

var _InnerRouter2 = _interopRequireDefault(_InnerRouter);

var _HistoryControl = __webpack_require__(189);

var _HistoryControl2 = _interopRequireDefault(_HistoryControl);

var _CacheOfLinkControl = __webpack_require__(369);

var _CacheOfLinkControl2 = _interopRequireDefault(_CacheOfLinkControl);

var _Logger = __webpack_require__(190);

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _ref;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Router.__proto__ || Object.getPrototypeOf(Router)).call.apply(_ref, [this].concat(args)));

    Object.defineProperty(_this.props.history, 'location', {
      get: function get() {
        return _this.props.history.getCurrentLocation();
      }
    });

    (0, _HistoryControl.setHistory)(_this.props.history);
    (0, _HistoryControl.listener)(_this.props.history.getCurrentLocation());

    /** start history listener */
    _this.unlisten = _this.props.history.listen(function (location, action) {

      (0, _HistoryControl.listener)(location, action);
      _CacheOfLinkControl2.default.onHistoryChanged(location);
      _this.forceUpdate();
    });
    return _this;
  }

  _createClass(Router, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        history: this.props.history
      };
    }

    /** react-hot-loader will unmount this component and */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.forceUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unlisten();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement(_InnerRouter2.default, _extends({
        location: this.props.history.getCurrentLocation(),
        action: this.props.history.action
      }, props));
    }
  }]);

  return Router;
}(_react2.default.Component);

exports.default = Router;


Router.childContextTypes = {
  history: _react2.default.PropTypes.any
};

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Indicates that navigation was caused by a call to history.push.
 */
var PUSH = exports.PUSH = 'PUSH';

/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = exports.REPLACE = 'REPLACE';

/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = exports.POP = 'POP';

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;

var _LocationUtils = __webpack_require__(191);

var _DOMUtils = __webpack_require__(212);

var _DOMStateStorage = __webpack_require__(575);

var _PathUtils = __webpack_require__(113);

var _ExecutionEnvironment = __webpack_require__(380);

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var needsHashchangeListener = _ExecutionEnvironment.canUseDOM && !(0, _DOMUtils.supportsPopstateOnHashchange)();

var _createLocation = function _createLocation(historyState) {
  var key = historyState && historyState.key;

  return (0, _LocationUtils.createLocation)({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
  }, undefined, key);
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  var historyState = void 0;
  try {
    historyState = window.history.state || {};
  } catch (error) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    historyState = {};
  }

  return _createLocation(historyState);
};

var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

var startListener = exports.startListener = function startListener(listener) {
  var handlePopState = function handlePopState(event) {
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) // Ignore extraneous popstate events in WebKit
      return;
    listener(_createLocation(event.state));
  };

  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

  var handleUnpoppedHashChange = function handleUnpoppedHashChange() {
    return listener(getCurrentLocation());
  };

  if (needsHashchangeListener) {
    (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
  }

  return function () {
    (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

    if (needsHashchangeListener) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
    }
  };
};

var updateLocation = function updateLocation(location, updateState) {
  var state = location.state;
  var key = location.key;


  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);

  updateState({ key: key }, (0, _PathUtils.createPath)(location));
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.pushState(state, null, path);
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.replaceState(state, null, path);
  });
};

var go = exports.go = function go(n) {
  if (n) window.history.go(n);
};

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(84)
  , enumBugKeys = __webpack_require__(53);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _AsyncUtils = __webpack_require__(936);

var _PathUtils = __webpack_require__(113);

var _runTransitionHook = __webpack_require__(576);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _Actions = __webpack_require__(378);

var _LocationUtils = __webpack_require__(191);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHistory = function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var getUserConfirmation = options.getUserConfirmation;
  var pushLocation = options.pushLocation;
  var replaceLocation = options.replaceLocation;
  var go = options.go;
  var keyLength = options.keyLength;


  var currentLocation = void 0;
  var pendingLocation = void 0;
  var beforeListeners = [];
  var listeners = [];
  var allKeys = [];

  var getCurrentIndex = function getCurrentIndex() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);

    if (currentLocation) return allKeys.indexOf(currentLocation.key);

    return -1;
  };

  var updateLocation = function updateLocation(nextLocation) {
    var currentIndex = getCurrentIndex();

    currentLocation = nextLocation;

    if (currentLocation.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, currentIndex + 1), [currentLocation.key]);
    } else if (currentLocation.action === _Actions.REPLACE) {
      allKeys[currentIndex] = currentLocation.key;
    }

    listeners.forEach(function (listener) {
      return listener(currentLocation);
    });
  };

  var listenBefore = function listenBefore(listener) {
    beforeListeners.push(listener);

    return function () {
      return beforeListeners = beforeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var listen = function listen(listener) {
    listeners.push(listener);

    return function () {
      return listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
        return result != null ? done(result) : next();
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          return callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  };

  var transitionTo = function transitionTo(nextLocation) {
    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

      pendingLocation = null;

      if (ok) {
        // Treat PUSH to same path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = (0, _PathUtils.createPath)(currentLocation);
          var nextPath = (0, _PathUtils.createPath)(nextLocation);

          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (nextLocation.action === _Actions.POP) {
          updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.PUSH) {
          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.REPLACE) {
          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
        }
      } else if (currentLocation && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(currentLocation.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
      }
    });
  };

  var push = function push(input) {
    return transitionTo(createLocation(input, _Actions.PUSH));
  };

  var replace = function replace(input) {
    return transitionTo(createLocation(input, _Actions.REPLACE));
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength || 6);
  };

  var createHref = function createHref(location) {
    return (0, _PathUtils.createPath)(location);
  };

  var createLocation = function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
    return (0, _LocationUtils.createLocation)(location, action, key);
  };

  return {
    getCurrentLocation: getCurrentLocation,
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: _PathUtils.createPath,
    createHref: createHref,
    createLocation: createLocation
  };
};

exports.default = createHistory;

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = true;

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(21).f
  , has = __webpack_require__(26)
  , TAG = __webpack_require__(15)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(52);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(133);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(132);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(23);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 52:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(25)
  , dPs         = __webpack_require__(155)
  , enumBugKeys = __webpack_require__(53)
  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(65)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(94).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(56)('keys')
  , uid    = __webpack_require__(42);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _HistoryControl = __webpack_require__(189);

var _HistoryControl2 = _interopRequireDefault(_HistoryControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * replace the tag 'A', used to link to a new url
 * @module Link
 */
var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _ref;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args)));

    _this.handleClick = function () {

      if (_this.props.onClick && typeof _this.props.onClick === 'function') {
        _this.props.onClick();
      }

      var _this$props = _this.props,
          to = _this$props.to,
          href = _this$props.href,
          state = _this$props.state;

      if (!to) {
        to = href;
      }
      if (typeof to === 'undefined' || to === null) {
        return;
      }
      if (!to) {
        to = '/';
      }
      if (to.indexOf('#') === 0) {
        to = to.substring(1);
      }
      if (to.indexOf('/') !== 0) {
        to = '/' + to;
      }

      if (_this.context.history.getCurrentLocation().pathname === to) {
        return;
      }

      _this.go(to, state);
    };

    return _this;
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          href = _props.href,
          state = _props.state,
          children = _props.children,
          isActive = _props.isActive,
          activeStyle = _props.activeStyle,
          activeClassName = _props.activeClassName,
          style = _props.style,
          className = _props.className,
          type = _props.type,
          props = _objectWithoutProperties(_props, ['to', 'href', 'state', 'children', 'isActive', 'activeStyle', 'activeClassName', 'style', 'className', 'type']);

      if (!type) {
        type = 'a';
      }

      if (type === 'a') {
        props['href'] = 'javascript:void(0)';
      }

      if (isActive) {
        if (typeof isActive === 'function') {
          isActive = isActive();
        } else {
          isActive = !!isActive;
        }
      } else {
        isActive = _HistoryControl2.default.path === to;
      }

      if (isActive) {
        if (activeStyle) style = Object.assign({}, style, activeStyle);
        if (activeClassName) className = className ? className + ' ' + activeClassName : activeClassName;
      }

      return _react2.default.createElement(type, _extends({ onClick: this.handleClick, style: style, className: className }, props), children);
    }
  }]);

  return Link;
}(_react2.default.Component);

exports.default = Link;


Link.prototype.go = function (to, state) {
  _HistoryControl2.default.go(to, state);
};

if (true) {

  Link.propTypes = {
    state: _react2.default.PropTypes.any,
    to: _react2.default.PropTypes.string.isRequired,
    href: _react2.default.PropTypes.string,
    children: _react2.default.PropTypes.any,
    onClick: _react2.default.PropTypes.any
  };
}

Link.contextTypes = {
  history: _react2.default.PropTypes.any,
  routes: _react2.default.PropTypes.array
};

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchPath;

var _compilePattern = __webpack_require__(885);

var _compilePattern2 = _interopRequireDefault(_compilePattern);

var _Util = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * match path with pattern
 * @module matchPath
 *   1. check if the path matches the pattern
 *   2. retract param values by param names from the path
 *
 * @param {string} path         - the path of next location
 * @param {string} pattern      - the pattern defined by property 'path' on the component 'Route'
 *
 * @return {object} {
 *     match: {boolean}         - match result
 *     params: {object}         - param names & param values of the path
 *   }
 */
function matchPath(path, pattern) {
  if (!patterns[pattern]) {
    patterns[pattern] = (0, _compilePattern2.default)(pattern);
  }
  path = (0, _Util.resetPath)(path);

  var patternCompile = patterns[pattern];
  var regular = new RegExp(patternCompile.regular, 'g');
  var match = regular.exec(path);
  if (!match) {
    return { match: false };
  }

  var matchers = match.splice(1);
  var params = {};
  if (patternCompile.params) {
    for (var index in patternCompile.params) {
      params[patternCompile.params[index]] = matchers.length > index ? matchers[index] : null;
    }
  }
  return {
    pattern: pattern,
    match: true,
    params: params,
    matchStr: match[0],
    lastIndex: regular.lastIndex
  };
}

/**
 * @property {object} patterns  - record the patterns(with param names) of the paths
 */
var patterns = {};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(16)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.readState = exports.saveState = undefined;

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuotaExceededErrors = {
  QuotaExceededError: true,
  QUOTA_EXCEEDED_ERR: true
};

var SecurityErrors = {
  SecurityError: true
};

var KeyPrefix = '@@History/';

var createKey = function createKey(key) {
  return KeyPrefix + key;
};

var saveState = exports.saveState = function saveState(key, state) {
  try {
    if (!window.sessionStorage) {
      // Session storage is not available or hidden.
      // sessionStorage is undefined in Internet Explorer when served via file protocol.
       true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;

      return;
    }

    if (state == null) {
      window.sessionStorage.removeItem(createKey(key));
    } else {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
  } catch (error) {
    if (SecurityErrors[error.name]) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
       true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;

      return;
    }

    if (QuotaExceededErrors[error.name] && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
       true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;

      return;
    }

    throw error;
  }
};

var readState = exports.readState = function readState(key) {
  var json = void 0;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (SecurityErrors[error.name]) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
       true ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;

      return undefined;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return undefined;
};

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runTransitionHook = function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
     true ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
  }
};

exports.default = runTransitionHook;

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _runTransitionHook = __webpack_require__(576);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _PathUtils = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useBasename = function useBasename(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);
    var basename = options.basename;


    var addBasename = function addBasename(location) {
      if (!location) return location;

      if (basename && location.basename == null) {
        if (location.pathname.toLowerCase().indexOf(basename.toLowerCase()) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;

          if (location.pathname === '') location.pathname = '/';
        } else {
          location.basename = '';
        }
      }

      return location;
    };

    var prependBasename = function prependBasename(location) {
      if (!basename) return location;

      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
      var pname = object.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;

      return _extends({}, object, {
        pathname: pathname
      });
    };

    // Override all read methods with basename-aware versions.
    var getCurrentLocation = function getCurrentLocation() {
      return addBasename(history.getCurrentLocation());
    };

    var listenBefore = function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
      });
    };

    var listen = function listen(listener) {
      return history.listen(function (location) {
        return listener(addBasename(location));
      });
    };

    // Override all write methods with basename-aware versions.
    var push = function push(location) {
      return history.push(prependBasename(location));
    };

    var replace = function replace(location) {
      return history.replace(prependBasename(location));
    };

    var createPath = function createPath(location) {
      return history.createPath(prependBasename(location));
    };

    var createHref = function createHref(location) {
      return history.createHref(prependBasename(location));
    };

    var createLocation = function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    };

    return _extends({}, history, {
      getCurrentLocation: getCurrentLocation,
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation
    });
  };
};

exports.default = useBasename;

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_keeper__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_keeper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_keeper__);









var Home = function (_React$Component) {
	__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Home, _React$Component);

	function Home() {
		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Home);

		return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Home.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Home)).apply(this, arguments));
	}

	__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Home, [{
		key: 'render',
		value: function render() {
			return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				'div',
				null,
				'test'
			);
		}
	}]);

	return Home;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var App = function (_React$Component2) {
	__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(App, _React$Component2);

	function App() {
		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, App);

		return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (App.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(App)).apply(this, arguments));
	}

	__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(App, [{
		key: 'render',
		value: function render() {
			return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_7_react_keeper__["HashRouter"],
				null,
				__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
					'div',
					null,
					__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_keeper__["Route"], { cache: true, component: Home, path: '/' })
				)
			);
		}
	}]);

	return App;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(34);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(16)
  , core           = __webpack_require__(10)
  , LIBRARY        = __webpack_require__(44)
  , wksExt         = __webpack_require__(60)
  , defineProperty = __webpack_require__(21).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(23);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(15);

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(159)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(80)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apps_error_jsx__ = __webpack_require__(579);




__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__apps_error_jsx__["a" /* default */], null), document.getElementById('app'));

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(34)
  , document = __webpack_require__(16).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(91);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(57)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
var global        = __webpack_require__(16)
  , hide          = __webpack_require__(30)
  , Iterators     = __webpack_require__(37)
  , TO_STRING_TAG = __webpack_require__(15)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(24) && !__webpack_require__(33)(function(){
  return Object.defineProperty(__webpack_require__(65)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(44)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(85)
  , hide           = __webpack_require__(30)
  , has            = __webpack_require__(26)
  , Iterators      = __webpack_require__(37)
  , $iterCreate    = __webpack_require__(150)
  , setToStringTag = __webpack_require__(46)
  , getPrototypeOf = __webpack_require__(83)
  , ITERATOR       = __webpack_require__(15)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(45)
  , createDesc     = __webpack_require__(39)
  , toIObject      = __webpack_require__(27)
  , toPrimitive    = __webpack_require__(58)
  , has            = __webpack_require__(26)
  , IE8_DOM_DEFINE = __webpack_require__(79)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(84)
  , hiddenKeys = __webpack_require__(53).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(26)
  , toObject    = __webpack_require__(49)
  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(26)
  , toIObject    = __webpack_require__(27)
  , arrayIndexOf = __webpack_require__(145)(false)
  , IE_PROTO     = __webpack_require__(55)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);

/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (component) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!component) {
    throw new Error('\n      [ReactStateless.createClass(component)] stateless needs a component\n    ');
  }

  component = component instanceof Function ? _extends({ render: component }, component) : component;

  if (!('render' in component)) {
    throw new Error('\n      [ReactStateless.createClass(component)] No render function found.\n      "component" should be a render function or contain a render function.\n    ');
  }

  component = _extends({}, component, opts);

  var _component = component;
  var _render = _component.render;

  var displayName = _render.name;

  var methods = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

  var properties = ['propTypes', 'defaultProps', 'getDefaultProps', 'displayName'];

  var spec = _extends({
    displayName: displayName,
    render: function render() {
      return _render(this.props, this);
    }
  }, properties.reduce(function (o, p) {
    if (!(p in component)) return o;
    o[p] = component[p];
    return o;
  }, {}), methods.reduce(function (o, m) {
    if (!(m in component)) return o;
    o[m] = function (input) {
      var _component2;

      if (!this) throw Error('NO CONTEXT');
      var props = this.props;
      var refs = this.refs;

      return (_component2 = component)[m].apply(_component2, _toConsumableArray([props, input, refs, this].filter(Boolean)));
    };
    return o;
  }, {}));

  return _react2['default'].createClass(spec);
};

module.exports = exports['default'];



/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Router = __webpack_require__(370);

var _Router2 = _interopRequireDefault(_Router);

var _createBrowserHistory = __webpack_require__(939);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _useBasename = __webpack_require__(577);

var _useBasename2 = _interopRequireDefault(_useBasename);

var _Util = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _ref;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = BrowserRouter.__proto__ || Object.getPrototypeOf(BrowserRouter)).call.apply(_ref, [this].concat(args)));

    _this.createHistory = function () {
      var _this$props = _this.props,
          basename = _this$props.basename,
          hashType = _this$props.hashType,
          getUserConfirmation = _this$props.getUserConfirmation;

      if (basename && !/^(\.|\/)/.test(basename)) basename = (0, _Util.resetPath)(basename);
      var history = void 0;
      if (basename) {
        history = (0, _useBasename2.default)(_createBrowserHistory2.default)({ basename: basename, getUserConfirmation: getUserConfirmation });
      } else {
        history = (0, _createBrowserHistory2.default)({ getUserConfirmation: getUserConfirmation });
      }
      return history;
    };

    _this.history = _this.createHistory();
    _this.history.type = 'browser';
    return _this;
  }

  _createClass(BrowserRouter, [{
    key: 'render',
    value: function render() {
      var props = (0, _Util.objectWithoutProperties)(this.props, ['basename', 'hashType', 'getUserConfirmation']);
      return _react2.default.createElement(_Router2.default, _extends({ history: this.history }, props));
    }
  }]);

  return BrowserRouter;
}(_react2.default.Component);

exports.default = BrowserRouter;

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Link2 = __webpack_require__(557);

var _Link3 = _interopRequireDefault(_Link2);

var _CacheOfLinkControl = __webpack_require__(369);

var _CacheOfLinkControl2 = _interopRequireDefault(_CacheOfLinkControl);

var _HistoryControl = __webpack_require__(189);

var _HistoryControl2 = _interopRequireDefault(_HistoryControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CacheLink = function (_Link) {
  _inherits(CacheLink, _Link);

  function CacheLink() {
    _classCallCheck(this, CacheLink);

    return _possibleConstructorReturn(this, (CacheLink.__proto__ || Object.getPrototypeOf(CacheLink)).apply(this, arguments));
  }

  _createClass(CacheLink, [{
    key: 'render',
    value: function render() {
      return _get(CacheLink.prototype.__proto__ || Object.getPrototypeOf(CacheLink.prototype), 'render', this).call(this);
    }
  }]);

  return CacheLink;
}(_Link3.default);

CacheLink.contextTypes = {
  history: _react2.default.PropTypes.any,
  routes: _react2.default.PropTypes.any
};
exports.default = CacheLink;


CacheLink.prototype.go = function (to, state) {
  var route = void 0;
  if (this.context.routes && this.context.routes.length) {
    route = this.context.routes[this.context.routes.length - 1];
  }
  _CacheOfLinkControl2.default.add(this.context.routes && this.context.routes.length && this.context.routes[this.context.routes.length - 1], to);
  _HistoryControl2.default.go(to, state);
};

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var cachedRoute = []
/**
 * {
 *   route: { Route Component}      // the component of route
 *   rule: { string }               // the rule : ''
 * }
 */


/** add(or delete when rule is null) cached route to array */
;var put = exports.put = function put(route, rule) {
  var index = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cachedRoute[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.route === route) {
        if (rule) {
          item.rule = rule;
        } else {
          cachedRoute.splice(index, 1);
        }
        return;
      }
      index++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (rule) cachedRoute.push({ route: route, rule: rule });
};

/** check if route is cached */
var isCached = exports.isCached = function isCached(route) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = cachedRoute[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item.route === route) {
        return true;
      }
      if (item.rule === 'root' && item.route.context.routes) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = item.route.context.routes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var innerItem = _step3.value;

            if (innerItem === route) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
};

exports.default = {
  put: put,
  isCached: isCached
};

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Router = __webpack_require__(370);

var _Router2 = _interopRequireDefault(_Router);

var _createHashHistory = __webpack_require__(940);

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _useBasename = __webpack_require__(577);

var _useBasename2 = _interopRequireDefault(_useBasename);

var _Util = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _ref;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HashRouter.__proto__ || Object.getPrototypeOf(HashRouter)).call.apply(_ref, [this].concat(args)));

    _this.createHistory = function () {
      var _this$props = _this.props,
          basename = _this$props.basename,
          hashType = _this$props.hashType,
          getUserConfirmation = _this$props.getUserConfirmation;

      if (basename && !/^(\.|\/)/.test(basename)) basename = (0, _Util.resetPath)(basename);
      if (basename) {
        return (0, _useBasename2.default)(_createHashHistory2.default)({ basename: basename, hashType: hashType, getUserConfirmation: getUserConfirmation });
      } else {
        return (0, _createHashHistory2.default)({ hashType: hashType, getUserConfirmation: getUserConfirmation });
      }
    };

    _this.history = _this.createHistory();
    _this.history.type = 'hash';
    return _this;
  }

  _createClass(HashRouter, [{
    key: 'render',
    value: function render() {
      var props = (0, _Util.objectWithoutProperties)(this.props, ['basename', 'hashType', 'getUserConfirmation']);
      return _react2.default.createElement(_Router2.default, _extends({ history: this.history }, props));
    }
  }]);

  return HashRouter;
}(_react2.default.Component);

exports.default = HashRouter;

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Logger = __webpack_require__(190);

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerRouter = function (_React$Component) {
  _inherits(InnerRouter, _React$Component);

  function InnerRouter() {
    var _ref;

    _classCallCheck(this, InnerRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = InnerRouter.__proto__ || Object.getPrototypeOf(InnerRouter)).call.apply(_ref, [this].concat(args)));

    _this.getChildContext = function () {
      return {
        subscribe: _this.subscribe,
        routes: _this.initRoutes,
        parentRouteIndex: -1 // 当前路由在routes中的index，由子路由使用
      };
    };

    _this.subscribe = function (callback) {
      if (_this.subscribers.indexOf(callback) < 0) {
        _this.subscribers.push(callback);
      }
      return function () {
        var index = _this.subscribers.indexOf(callback);
        if (index >= 0) {
          _this.subscribers.splice(index, 1);
        }
      };
    };

    _this.notify = function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fn = _step.value;

          fn();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    _this.subscribers = [];
    _this.initRoutes = [];
    return _this;
  }

  /** get child context */


  _createClass(InnerRouter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.notify();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.children || this.props.children.length === 0) {
        return null;
      }

      if (_react2.default.isValidElement(this.props.children)) {
        return _react2.default.Children.only(this.props.children);
      }
      _Logger2.default.error('The children of `*Router` component must be a single tag (not an array), like `div`|`view` .');
      return null;
    }
  }]);

  return InnerRouter;
}(_react2.default.Component);

exports.default = InnerRouter;


InnerRouter.childContextTypes = {
  subscribe: _react2.default.PropTypes.any,
  routes: _react2.default.PropTypes.any,
  parentRouteIndex: _react2.default.PropTypes.number
};

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Router = __webpack_require__(370);

var _Router2 = _interopRequireDefault(_Router);

var _createMemoryHistory = __webpack_require__(941);

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Util = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _ref;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MemoryRouter.__proto__ || Object.getPrototypeOf(MemoryRouter)).call.apply(_ref, [this].concat(args)));

    _this.createHistory = function () {
      var _this$props = _this.props,
          initialEntries = _this$props.initialEntries,
          initialIndex = _this$props.initialIndex,
          getUserConfirmation = _this$props.getUserConfirmation;

      return (0, _createMemoryHistory2.default)({ initialEntries: initialEntries, initialIndex: initialIndex, getUserConfirmation: getUserConfirmation });
    };

    _this.history = _this.createHistory();
    _this.history.type = 'memory';
    return _this;
  }

  _createClass(MemoryRouter, [{
    key: 'render',
    value: function render() {
      var props = (0, _Util.objectWithoutProperties)(this.props, ['initialEntries', 'initialIndex', 'getUserConfirmation']);
      return _react2.default.createElement(_Router2.default, _extends({ history: this.history }, props));
    }
  }]);

  return MemoryRouter;
}(_react2.default.Component);

exports.default = MemoryRouter;

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactFunctional = __webpack_require__(872);

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _matchPath = __webpack_require__(558);

var _matchPath2 = _interopRequireDefault(_matchPath);

var _Util = __webpack_require__(110);

var _HistoryControl = __webpack_require__(189);

var _HistoryControl2 = _interopRequireDefault(_HistoryControl);

var _RouteControl = __webpack_require__(882);

var _Logger = __webpack_require__(190);

var _Logger2 = _interopRequireDefault(_Logger);

var _RouteUtil2 = __webpack_require__(883);

var _RouteUtil3 = _interopRequireDefault(_RouteUtil2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_RouteUtil) {
  _inherits(Route, _RouteUtil);

  function Route() {
    var _ref;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Route.__proto__ || Object.getPrototypeOf(Route)).call.apply(_ref, [this].concat(args)));

    _this.locationChanged = function () {
      _this.routeCheckEntry();
    };

    _this.getChildContext = function () {
      return {
        parent: _this,
        parentRouteIndex: _this.context.parentRouteIndex + 1
      };
    };

    _this.routeCheckEntry = function () {

      var matchData = _this.checkPath(_this.context.history.getCurrentLocation() || {});

      if (!matchData.match) {
        _this.checkMiss();
      }

      if (matchData.match) {
        _this.setToMount(matchData);
        return;
      }

      _this.setToUnmount(matchData);
    };

    _this.setToMount = function (matchData) {

      _this.resetChildContext(true);

      /** Step 1 : dynamic load component */
      _this.loadComponent(function (succeed, component) {
        if (!succeed) {
          return;
        }
        _this.component = component ? (0, _Util.isStatelessComponent)(component) ? (0, _reactFunctional2.default)({ render: component }) : component : null;

        /** Step 2 : check enter filters */
        _this.checkFilter(_this.props.enterFilter, function (passed) {
          if (!passed) {
            return;
          }

          /** Step 3 : check 'redirect' props */
          var redirect = _this.props.redirect;

          if (redirect && typeof redirect === 'string') {
            _HistoryControl2.default.replace(redirect);
            return;
          }

          _this.updateMountStatus({ status: 1, matchData: matchData });
        });
      });
    };

    _this.setToUnmount = function (matchData) {
      // this.resetChildContext(false)

      /** Step 1: check cache, link cache & tag cache */
      var cache = _this.isCached();
      if (cache) {
        _this.checkPath(_this.cacheLocation);
        if (_this.state.mountBy !== cache && _this.state.status === 1) {

          _this.updateMountStatus({ status: 1, mountBy: cache, matchData: _this.state.cacheMatch });
        }
        return;
      }

      /** Step 2 : check leave filters */
      if (_this.state.status) {
        _this.checkFilter(_this.props.leaveFilter, function (passed) {
          if (!passed) {
            return;
          }
          _this.updateMountStatus({ status: 0 });
        });
      } else {
        _this.updateMountStatus({ status: 0 });
      }
    };

    _this.updateMountStatus = function (_ref2) {
      var status = _ref2.status,
          mountBy = _ref2.mountBy,
          matchData = _ref2.matchData;


      if (typeof mountBy === 'undefined' || mountBy === null) {
        mountBy = 0;
      }
      if (!(0, _Util.isMountedComponent)(_this)) {
        return;
      }
      if (status === 1) {
        _this.setState({
          status: status,
          mountBy: mountBy,
          cacheMatch: matchData,
          selfPathname: _this.getSelfPath(matchData && matchData.matcher)
        });
      } else {
        _this.setState({ status: status, mountBy: mountBy });
      }

      _this.checkCacheTag(status === 0);
    };

    _this.componentWillUnmount = function () {
      _this.unsubscribe();
      _this.checkCacheTag(true);
    };

    _this.render = function () {

      /** 1. unmount state */
      if (_this.state.status === 0) {
        return null;
      }

      var children = _this.props.children;

      /** 2. mount state */
      /** 2.1 check component props */
      if (_this.component) {
        var props = (0, _Util.objectWithoutProperties)(_this.props, ['children', 'component', 'loadComponent', 'enterFilter', 'leaveFilter', 'path', 'redirect', 'cache', 'index', 'miss']);
        // add route state to props
        props.route = { isActive: _this.state.mountBy === 0 };

        props.ref = 'component';

        // create element
        return _react2.default.createElement(_this.component, _extends({ pathname: _this.state.selfPathname
        }, props, {
          params: _this.state.cacheMatch && _this.state.cacheMatch.matcher ? _this.state.cacheMatch.matcher.params || {} : {}
        }), children);
      }

      /** 2.2 check children */
      if (!children) {
        _Logger2.default.error('Route component without children.');
        return null;
      }
      if (_react2.default.isValidElement(children)) {
        return _react2.default.Children.only(children);
      }
      _Logger2.default.error('When `Route` component has no component property, it\'s children must be a single tag (not an array), like `div`|`view` .');
      return null;
    };

    _this.state = {
      status: 0, // 0: unmount, 1: mounted
      mountBy: 0 // 0: mount by route or none, 1: mount by 'cache', 2: mount by 'CacheLink'
    };
    _this.unsubscribe = _this.context.subscribe(_this.locationChanged);

    _this.matcher = null;
    _this.component = null;

    if (!_this.context.routes || typeof _this.context.parentRouteIndex === 'undefined') {
      throw new Error('Route must be used in Router Component ( HashRouter,BrowserRouter or MemoryRouter )!');
    }
    return _this;
  }

  _createClass(Route, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.locationChanged();
    }

    /**
     * entry of check
     * compute route mount's state
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.offDirtyCheck) {
        return true;
      }
      if (nextState.status) {
        return true;
      }
      return !(0, _Util.compare)(nextProps, this.props) || !(0, _Util.compare)(nextState, this.state);
    }

    /**
     * set to mount state
     * (also invoke by outside)
     */


    /**
     * set to unmount state
     */


    /** update bind state */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.hideOrShow();
    }
  }]);

  return Route;
}(_RouteUtil3.default);

exports.default = Route;


if (true) {

  Route.propTypes = {
    component: _react2.default.PropTypes.any,
    loadComponent: _react2.default.PropTypes.any,
    enterFilter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.func]),
    leaveFilter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.func]),
    path: _react2.default.PropTypes.string,
    redirect: _react2.default.PropTypes.string,
    cache: _react2.default.PropTypes.any,
    index: _react2.default.PropTypes.any,
    miss: _react2.default.PropTypes.any,
    offDirtyCheck: _react2.default.PropTypes.any,
    children: _react2.default.PropTypes.any
  };
}

Route.contextTypes = {
  routes: _react2.default.PropTypes.array,
  history: _react2.default.PropTypes.any,
  subscribe: _react2.default.PropTypes.any,
  parent: _react2.default.PropTypes.any,
  parentRouteIndex: _react2.default.PropTypes.number
};

Route.childContextTypes = {
  parent: _react2.default.PropTypes.any,
  parentRouteIndex: _react2.default.PropTypes.number
};

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMissMatch = exports.getSelfPathname = exports.getMatchedPath = exports.getMatch = exports.shouldMatch = exports.removeMatch = exports.getLastMatchedRoute = exports.addMatch = exports.clearMatch = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Util = __webpack_require__(110);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** record the matched component by asc order */
var routeMatch = [];

/** clear all matched component, used when path changed */
var clearMatch = function clearMatch() {
  routeMatch = [];
};

/** when a component matched the path and should to be mount, record it */
var addMatch = function addMatch(instance) {
  if (routeMatch.length > 0) {
    routeMatch.forEach(function (item) {
      if (item === instance) {
        return;
      }
    });
  }
  routeMatch.push(instance);
};

/** get last matched route */
var getLastMatchedRoute = function getLastMatchedRoute() {
  return routeMatch.length ? routeMatch[routeMatch.length - 1] : null;
};

/** get match component */
var getMatch = function getMatch(index) {
  if (routeMatch.length === 0) {
    return null;
  }
  if (index < 0 || index >= routeMatch.length) {
    return routeMatch[routeMatch.length - 1];
  }
  return routeMatch[index];
};

/** get matched path, all components matched will be counted */
var getMatchedPath = function getMatchedPath() {
  if (routeMatch.length === 0) {
    return '';
  }
  var path = [];
  routeMatch.forEach(function (item) {
    if (item.matcher) path.push(item.matcher.matchStr);
  });
  return path.join('');
};

/**
 * get addtive mathced component path
 * different with getMatchedPath
 */
var getSelfPathname = function getSelfPathname(obj) {
  if (!obj.context) {
    return '';
  }
  var path = [];
  (obj.context.routes || []).forEach(function (item) {
    // path.push(resetPath(item.props.path))
    path.push(item.matcher ? item.matcher.matchStr : '');
  });
  path.push(obj.matcher ? obj.matcher.matchStr : '');
  return path.join('');
};

/** when a component unmount, remove it */
var removeMatch = function removeMatch(instance) {
  routeMatch.forEach(function (item, index) {
    if (item === instance) {
      routeMatch = routeMatch.splice(index, 1);
      return;
    }
  });
};

/**
 * 'index' property support
 * when no component matched, this one will match if condition
 * the condition is 'when no matched, it's parent is last matched one'
 */
var checkMissMatch = function checkMissMatch(child) {
  var parent = routeMatch.length > 0 ? routeMatch[0] : '';
  if (!child) {
    return;
  }
  setTimeout(function () {
    if (routeMatch.length === 0) {
      if (parent === '') {
        child.setToMount();
      }
      return;
    }
    if (routeMatch[routeMatch.length - 1] === parent) {
      child.setToMount();
      return;
    }
  }, 0);
};

/**
 * to judge if a component should match
 * the condition is 'if it's the direct child of last matched component'
 */
var shouldMatch = function shouldMatch(instance) {
  var match = false;
  if (routeMatch.length === 0) {
    match = true;
  } else {
    match = (0, _Util.reactContains)(routeMatch[routeMatch.length - 1], instance);
  }
  return match;
};

exports.clearMatch = clearMatch;
exports.addMatch = addMatch;
exports.getLastMatchedRoute = getLastMatchedRoute;
exports.removeMatch = removeMatch;
exports.shouldMatch = shouldMatch;
exports.getMatch = getMatch;
exports.getMatchedPath = getMatchedPath;
exports.getSelfPathname = getSelfPathname;
exports.checkMissMatch = checkMissMatch;

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Logger = __webpack_require__(190);

var _Logger2 = _interopRequireDefault(_Logger);

var _matchPath = __webpack_require__(558);

var _matchPath2 = _interopRequireDefault(_matchPath);

var _Util = __webpack_require__(110);

var _CacheOfTagControl = __webpack_require__(877);

var _CacheOfTagControl2 = _interopRequireDefault(_CacheOfTagControl);

var _CacheOfLinkControl = __webpack_require__(369);

var _CacheOfLinkControl2 = _interopRequireDefault(_CacheOfLinkControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteUtil = function (_React$Component) {
  _inherits(RouteUtil, _React$Component);

  function RouteUtil() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RouteUtil);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RouteUtil.__proto__ || Object.getPrototypeOf(RouteUtil)).call.apply(_ref, [this].concat(args))), _this), _this.resetChildContext = function (match) {

      var routes = _this.context.routes;
      if (routes.length > _this.context.parentRouteIndex && _this.context.parentRouteIndex >= 0) routes.length = _this.context.parentRouteIndex + 1;

      if (match) {
        routes.push(_this);
      }
    }, _this.isCached = function () {
      if (_CacheOfTagControl2.default.isCached(_this)) {
        return 1;
      }
      if (_CacheOfLinkControl2.default.isCached(_this)) {
        return 2;
      }
      return 0;
    }, _this.checkCacheTag = function (remove) {
      var cache = void 0;
      if (remove) {
        cache = null;
      } else {
        cache = _this.props.cache;
        if (!cache) {
          cache = null;
        }
        if (cache === true) {
          cache = 'root';
        }
        if (cache !== 'parent' && cache !== 'root') {
          cache = null;
        }
      }
      _CacheOfTagControl2.default.put(_this, cache);
    }, _this.getParentPath = function () {
      var paths = [];
      var parentRouteIndex = typeof _this.context.parentRouteIndex === 'undefined' ? -1 : _this.context.parentRouteIndex;
      for (var i = 0; i < (_this.context.routes || []).length; i++) {
        if (i <= parentRouteIndex && _this.context.routes[i].state.cacheMatch && _this.context.routes[i].state.cacheMatch.matcher) {
          paths.push(_this.context.routes[i].state.cacheMatch.matcher.matchStr);
        }
      }
      return paths.join('').replace(/[/]{2,}/g, '/');
    }, _this.getSelfPath = function (matcher) {
      var paths = [_this.getParentPath()];
      if (matcher) paths.push(matcher.matchStr);
      return paths.join('').replace(/[/]{2,}/g, '/');
    }, _this.checkPath = function (location) {
      var _this$props = _this.props,
          pattern = _this$props.path,
          index = _this$props.index;

      var _ref2 = location || {},
          pathname = _ref2.pathname;

      if (typeof pathname === 'undefined') {
        return { match: false };
      }
      pathname = (0, _Util.resetPath)(pathname);
      var parentPath = _this.getParentPath();

      if (!pattern) {
        if (index) {
          if (pathname === (0, _Util.resetPath)(parentPath)) {
            return { match: true, matcher: matcher };
          }
        }
        return { match: false };
      }

      pattern = (0, _Util.resetPath)(pattern);

      var checkPathname = pathname;
      if (parentPath) {
        checkPathname = pathname.substring(parentPath.length);
      }

      var matcher = (0, _matchPath2.default)(checkPathname, pattern);

      if (matcher.match) {
        return { match: true, matcher: matcher };
      }

      if (index) {
        if (pathname === (0, _Util.resetPath)(parentPath)) {
          return { match: true, matcher: matcher };
        }
      }

      return { match: false };
    }, _this.loadComponent = function (callback) {
      if (_this.component) {
        callback(true, _this.component);
        return;
      }
      var _this$props2 = _this.props,
          component = _this$props2.component,
          dynamicComponent = _this$props2.loadComponent;

      if (component) {
        callback(true, component);
        return;
      }
      if (dynamicComponent) {
        dynamicComponent(function (comp) {
          callback(true, comp);
        });
        return;
      }
      callback(true, null);
    }, _this.checkFilter = function (filters, callback) {
      if (!filters) {
        callback(true);
        return;
      }
      if (!(filters instanceof Array)) {
        filters = [filters];
      }
      var tempFilters = [];
      for (var i = 0; i < filters.length; i++) {
        if (typeof filters[i] === 'function') {
          tempFilters.push(filters[i]);
        }
      }
      filters = tempFilters;

      if (filters.length === 0) {
        callback(true);
        return;
      }

      var pointer = 0; // record the index of the running filter

      var filterCallback = function filterCallback() {
        if (pointer === filters.length - 1) {
          callback(true);
        } else {
          filters[++pointer](filterCallback, _this.props);
        }
      };

      filters[0](filterCallback, _this.props);
    }, _this.checkMissSucceed = function () {
      _this.setToMount();
      _this.resetChildContext(true);
    }, _this.checkMiss = function () {
      var miss = _this.props.miss;

      if (!miss) {
        return;
      }
      setTimeout(function () {
        if (!_this.checkParent()) {
          return;
        }
        _this.checkMissSucceed();
      }, 0);
    }, _this.checkParent = function () {
      if (_this.context.parentRouteIndex >= 0 && _this.context.routes[_this.context.parentRouteIndex] !== _this.context.parent) {
        return false;
      }
      if (typeof _this.context.parentRouteIndex === 'undefined' || !_this.context.routes) {
        return true;
      }
      return _this.context.routes.length === _this.context.parentRouteIndex + 1;
    }, _this.hideOrShow = function () {
      var display = _this.state.mountBy === 0 ? _this.initDisplay || null : 'none';
      var dom = void 0;
      try {
        dom = _this.refs.component ? _reactDom2.default.findDOMNode(_this.refs.component) : null;
      } catch (error) {
        _Logger2.default.warning('Cannot find dom.');
        return;
      }
      if (!dom) {
        if (_react2.default.isValidElement(_this.props.children)) {
          dom = _this.props.children[0];
        }
      }

      // change display
      if (dom) {
        if (typeof _this.initDisplay === 'undefined') {
          _this.initDisplay = dom ? dom.style.display || null : null;
        }
        dom.style.display = display;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /** reset child context value */


  /** check 'cache' tag and link */


  /** check `cache` tag, used after route is mounted succeed */


  /** get parents' matched path */


  /** getSelfPath */


  /**
   * check path match
   * 1. direct match
   * 2. 'index' match
   */


  /** load component, contains dynamic component */


  /**
   * check filters
   * @param { Function or Array of function } filters : filters to check in order
   * @param { Function } callback(passed)
   *   @passed { Boolean } : pass result of filters
   */


  /** after check miss succeed */


  /** check 'miss' tag */


  /** check if the last matched route is it's parent */


  /** hide or show it's component after it mounted */


  return RouteUtil;
}(_react2.default.Component);

exports.default = RouteUtil;

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Control = exports.CacheLink = exports.Link = exports.Route = exports.MemoryRouter = exports.BrowserRouter = exports.HashRouter = undefined;

var _HashRouter2 = __webpack_require__(878);

var _HashRouter3 = _interopRequireDefault(_HashRouter2);

var _BrowserRouter2 = __webpack_require__(875);

var _BrowserRouter3 = _interopRequireDefault(_BrowserRouter2);

var _MemoryRouter2 = __webpack_require__(880);

var _MemoryRouter3 = _interopRequireDefault(_MemoryRouter2);

var _Route2 = __webpack_require__(881);

var _Route3 = _interopRequireDefault(_Route2);

var _Link2 = __webpack_require__(557);

var _Link3 = _interopRequireDefault(_Link2);

var _CacheLink2 = __webpack_require__(876);

var _CacheLink3 = _interopRequireDefault(_CacheLink2);

var _HistoryControl = __webpack_require__(189);

var _HistoryControl2 = _interopRequireDefault(_HistoryControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HashRouter = _HashRouter3.default;
exports.BrowserRouter = _BrowserRouter3.default;
exports.MemoryRouter = _MemoryRouter3.default;
exports.Route = _Route3.default;
exports.Link = _Link3.default;
exports.CacheLink = _CacheLink3.default;
exports.Control = _HistoryControl2.default;

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compilePattern;
/**
 * compile path pattern
 * @module compilePattern
 *   1. compile path pattern to regular string
 *   2. extrac param names from path pattern
 *
 * @param {string} pattern - the pattern defined by property 'path' on the component 'Route'
 */
function compilePattern(pattern) {

  // '>' means 'end'
  var endForcedCheck = false;
  if (pattern.indexOf('>') === pattern.length - 1) {
    endForcedCheck = true;
    pattern = pattern.substring(0, pattern.length - 1);
  }
  pattern = pattern.replace(/\$/g, '\\$');

  var regular = [];
  var params = {};
  var _ulrPart = '([0-9a-zA-Z-_$%]+)';
  var _rule = new RegExp('\\(\\/:' + _ulrPart + '\\)|:' + _ulrPart + '|(\\*\\*)|(\\*)', 'g');

  var _match = void 0;
  var _lastIndex = 0;
  var _index = 0;

  while (_match = _rule.exec(pattern)) {

    regular.push(pattern.substring(_lastIndex, _match.index));

    if (_match[0] === '**') {

      regular.push('(.*)');
    } else if (_match[0] === '*') {

      regular.push('([^\/]+)');
    } else if (_match[0].indexOf('(/:') === 0) {

      regular.push('(?:/' + _ulrPart + ')?');
      params[_index] = _match[1];
    } else if (_match[0].indexOf(':') === 0) {

      regular.push('' + _ulrPart);
      params[_index] = _match[2];
    }

    _lastIndex = _rule.lastIndex;
    _index++;
  }

  if (_lastIndex < pattern.length) {
    regular.push(pattern.substring(_lastIndex, pattern.length));
  }

  if (endForcedCheck) {
    regular.push('$');
  } else if (regular.length !== 1 || regular[0] !== '/') {
    /** followed by `/` or none */
    regular.push('(?=/|$)');
  }

  return {
    regular: regular.join(''),
    params: params,
    pattern: pattern
  };
}

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var isSync = false,
      hasNext = false,
      doneArgs = void 0;

  var done = function done() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    isDone = true;

    if (isSync) {
      // Iterate instead of recursing if possible.
      doneArgs = args;
      return;
    }

    callback.apply(undefined, args);
  };

  var next = function next() {
    if (isDone) return;

    hasNext = true;

    if (isSync) return; // Iterate instead of recursing if possible.

    isSync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work(currentTurn++, next, done);
    }

    isSync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(undefined, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  };

  next();
};

/***/ }),

/***/ 937:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(379);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

var _LocationUtils = __webpack_require__(191);

var _DOMUtils = __webpack_require__(212);

var _DOMStateStorage = __webpack_require__(575);

var _PathUtils = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var supportStateFunction = function supportStateFunction() {
  return typeof window.history.pushState === 'function' && typeof window.history.replaceState === 'function';
};

var pushHashPath = function pushHashPath(path, state) {
  if (supportStateFunction()) {
    window.history.pushState(state, undefined, '#' + path);
  } else {
    window.location.hash = path;
  }
};

var replaceHashPath = function replaceHashPath(path, state) {
  if (supportStateFunction()) {
    window.history.replaceState(state, undefined, '#' + path);
  } else {
    var hashIndex = window.location.href.indexOf('#');

    window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
  }
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(pathCoder, queryKey) {
  var path = pathCoder.decodePath(getHashPath());
  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);
  var state = void 0;
  if (key) {
    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
    state = (0, _DOMStateStorage.readState)(key);
  } else {
    state = window.history.state;
  }

  var init = (0, _PathUtils.parsePath)(path);
  init.state = state;

  return (0, _LocationUtils.createLocation)(init, undefined, key);
};

var prevLocation = void 0;

var startListener = exports.startListener = function startListener(listener, pathCoder, queryKey) {
  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = pathCoder.encodePath(path);

    if (path !== encodedPath) {
      // Always be sure we have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var currentLocation = getCurrentLocation(pathCoder, queryKey);

      if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events

      prevLocation = currentLocation;

      listener(currentLocation);
    }
  };

  // Ensure the hash is encoded properly.
  var path = getHashPath();
  var encodedPath = pathCoder.encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);

  return function () {
    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
  };
};

var updateLocation = function updateLocation(location, pathCoder, queryKey, updateHash) {
  var state = location.state;
  var key = location.key;


  var path = pathCoder.encodePath((0, _PathUtils.createPath)(location));

  if (state !== undefined && typeof window.history.pushState !== 'function') {
    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
    (0, _DOMStateStorage.saveState)(key, state);
  }

  prevLocation = location;

  updateHash(path, state);
};

var pushLocation = exports.pushLocation = function pushLocation(location, pathCoder, queryKey) {
  return updateLocation(location, pathCoder, queryKey, function (path, state) {
    if (getHashPath() !== path) {
      pushHashPath(path, state);
    } else {
       true ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
    }
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location, pathCoder, queryKey) {
  return updateLocation(location, pathCoder, queryKey, function (path, state) {
    if (getHashPath() !== path) replaceHashPath(path, state);
  });
};

/***/ }),

/***/ 938:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(379);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _LocationUtils = __webpack_require__(191);

var _PathUtils = __webpack_require__(113);

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  return (0, _LocationUtils.createLocation)(window.location);
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  window.location.href = (0, _PathUtils.createPath)(location);
  return false; // Don't update location
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  window.location.replace((0, _PathUtils.createPath)(location));
  return false; // Don't update location
};

/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(67);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(380);

var _BrowserProtocol = __webpack_require__(379);

var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);

var _RefreshProtocol = __webpack_require__(938);

var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);

var _DOMUtils = __webpack_require__(212);

var _createHistory = __webpack_require__(381);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve clean URLs. You can force this
 * behavior using { forceRefresh: true } in options.
 */
var createBrowserHistory = function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ?  true ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;

  var getUserConfirmation = Protocol.getUserConfirmation;
  var getCurrentLocation = Protocol.getCurrentLocation;
  var pushLocation = Protocol.pushLocation;
  var replaceLocation = Protocol.replaceLocation;
  var go = Protocol.go;


  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen
  });
};

exports.default = createBrowserHistory;

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).document && document.documentElement;

/***/ }),

/***/ 940:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(67);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(380);

var _DOMUtils = __webpack_require__(212);

var _HashProtocol = __webpack_require__(937);

var HashProtocol = _interopRequireWildcard(_HashProtocol);

var _createHistory = __webpack_require__(381);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultQueryKey = '_k';

var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!' + path;
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substring(1) : path;
    }
  },
  noslash: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '/' ? path.substring(1) : path;
    },
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

var createHashHistory = function createHashHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ?  true ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var queryKey = options.queryKey;
  var hashType = options.hashType;


   true ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;

  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;

  if (hashType == null) hashType = 'slash';

  if (!(hashType in HashPathCoders)) {
     true ? (0, _warning2.default)(false, 'Invalid hash type: %s', hashType) : void 0;

    hashType = 'slash';
  }

  var pathCoder = HashPathCoders[hashType];

  var getUserConfirmation = HashProtocol.getUserConfirmation;


  var getCurrentLocation = function getCurrentLocation() {
    return HashProtocol.getCurrentLocation(pathCoder, queryKey);
  };

  var pushLocation = function pushLocation(location) {
    return HashProtocol.pushLocation(location, pathCoder, queryKey);
  };

  var replaceLocation = function replaceLocation(location) {
    return HashProtocol.replaceLocation(location, pathCoder, queryKey);
  };

  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: HashProtocol.go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, pathCoder, queryKey);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var go = function go(n) {
     true ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

    history.go(n);
  };

  var createHref = function createHref(path) {
    return '#' + pathCoder.encodePath(history.createHref(path));
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    go: go,
    createHref: createHref
  });
};

exports.default = createHashHistory;

/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(29);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(67);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(191);

var _PathUtils = __webpack_require__(113);

var _createHistory = __webpack_require__(381);

var _createHistory2 = _interopRequireDefault(_createHistory);

var _Actions = __webpack_require__(378);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStateStorage = function createStateStorage(entries) {
  return entries.filter(function (entry) {
    return entry.state;
  }).reduce(function (memo, entry) {
    memo[entry.key] = entry.state;
    return memo;
  }, {});
};

var createMemoryHistory = function createMemoryHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (Array.isArray(options)) {
    options = { entries: options };
  } else if (typeof options === 'string') {
    options = { entries: [options] };
  }

  var getCurrentLocation = function getCurrentLocation() {
    var entry = entries[current];
    var path = (0, _PathUtils.createPath)(entry);

    var key = void 0,
        state = void 0;
    if (entry.key) {
      key = entry.key;
      state = readState(key);
    }

    var init = (0, _PathUtils.parsePath)(path);

    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
  };

  var canGo = function canGo(n) {
    var index = current + n;
    return index >= 0 && index < entries.length;
  };

  var go = function go(n) {
    if (!n) return;

    if (!canGo(n)) {
       true ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;

      return;
    }

    current += n;
    var currentLocation = getCurrentLocation();

    // Change action to POP
    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
  };

  var pushLocation = function pushLocation(location) {
    current += 1;

    if (current < entries.length) entries.splice(current);

    entries.push(location);

    saveState(location.key, location.state);
  };

  var replaceLocation = function replaceLocation(location) {
    entries[current] = location;
    saveState(location.key, location.state);
  };

  var history = (0, _createHistory2.default)(_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var _options = options;
  var entries = _options.entries;
  var current = _options.current;


  if (typeof entries === 'string') {
    entries = [entries];
  } else if (!Array.isArray(entries)) {
    entries = ['/'];
  }

  entries = entries.map(function (entry) {
    return (0, _LocationUtils.createLocation)(entry);
  });

  if (current == null) {
    current = entries.length - 1;
  } else {
    !(current >= 0 && current < entries.length) ?  true ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
  }

  var storage = createStateStorage(entries);

  var saveState = function saveState(key, state) {
    return storage[key] = state;
  };

  var readState = function readState(key) {
    return storage[key];
  };

  return _extends({}, history, {
    canGo: canGo
  });
};

exports.default = createMemoryHistory;

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(41);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 96:
/***/ (function(module, exports) {



/***/ })

},[635]);
//# sourceMappingURL=error.js.map