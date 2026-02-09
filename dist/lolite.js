(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lolite"] = factory();
	else
		root["lolite"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/abs.js":
/*!************************!*\
  !*** ./src/lib/abs.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var invert = __webpack_require__(/*! ../private/invertFallback */ "./src/private/invertFallback.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
function abs(value) {
  var value2 = value;
  if (equal(isFinite(value), falseValue())) {
    value2 = number0;
  }
  if (isNegative(value2)) {
    return abs(invert(value2));
  }

  // Micro-optimization: caching the value before returning it helps performance sometimes
  var result = value2;
  return result;
}
module.exports = abs;

/***/ }),

/***/ "./src/lib/add.js":
/*!************************!*\
  !*** ./src/lib/add.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var getIntrinsic = __webpack_require__(/*! get-intrinsic */ "get-intrinsic");
var construct = __webpack_require__(/*! construct-new */ "construct-new");
var while2 = __webpack_require__(/*! while2 */ "while2");
var isEqZero = __webpack_require__(/*! iszero */ "iszero");
var countingup = __webpack_require__(/*! countingup */ "countingup"),
  Counter = countingup.Counter,
  DIRECTION = Counter.DIRECTION;
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var addTwoNumbers = __webpack_require__(/*! add-two-numbers2 */ "add-two-numbers2");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! ./isFinite */ "./src/lib/isFinite.js");
var or = __webpack_require__(/*! ./or */ "./src/lib/or.js");
var max = __webpack_require__(/*! ./max */ "./src/lib/max.js");
var multiply = __webpack_require__(/*! ../private/multiplyFallback */ "./src/private/multiplyFallback.js");
var abs = getIntrinsic("%Math.abs%"),
  isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var positiveTen = __webpack_require__(/*! @positive-numbers/ten */ "@positive-numbers/ten");
var oneHundred = __webpack_require__(/*! @positive-numbers/one-hundred */ "@positive-numbers/one-hundred");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var isNotInteger = __webpack_require__(/*! ../private/isNotInteger */ "./src/private/isNotInteger.js");

// eslint-disable-next-line max-lines-per-function, max-statements
function add(augend, addend) {
  // eslint-disable-next-line no-underscore-dangle
  var addend_ = addend,
    // eslint-disable-next-line no-underscore-dangle
    augend_ = augend;
  if (equal(isFinite(augend_), falseValue())) {
    augend_ = number0;
  }
  if (equal(isFinite(addend_), falseValue())) {
    addend_ = number0;
  }
  var threshold = multiply(positiveTen, oneHundred);

  // Optimization: if numbers are too big, don't make it take too long
  if (or(or(isNotInteger(addend_), isNotInteger(augend_)), or(equal(max(abs(augend_), threshold), abs(augend_)), equal(max(abs(addend_), threshold), abs(addend_))))) {
    return addTwoNumbers(augend_, addend_);
  }

  // eslint-disable-next-line one-var
  var accumulator = construct({
      args: [augend_],
      target: Counter
    }),
    addendIsNegative = isNegative(addend_),
    loopTracker = construct({
      args: [abs(addend_)],
      target: Counter
    });
  construct({
    args: [function () {
      return equal(isEqZero(loopTracker.getCurrentNumber()), falseValue());
    }],
    target: while2
  })["do"](function () {
    if (addendIsNegative) {
      accumulator.count(number1, DIRECTION.REVERSE);
    } else {
      accumulator.count(number1, DIRECTION.FORWARDS);
    }
    loopTracker.count(number1, DIRECTION.REVERSE);
  }).end();
  return accumulator.getCurrentNumber();
}
module.exports = add;

/***/ }),

/***/ "./src/lib/and.js":
/*!************************!*\
  !*** ./src/lib/and.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
function and(firstCondition, secondCondition) {
  if (firstCondition) {
    return secondCondition;
  }
  if (not(firstCondition)) {
    return firstCondition;
  }
  return crash_program();
}
module.exports = and;

/***/ }),

/***/ "./src/lib/ceil.js":
/*!*************************!*\
  !*** ./src/lib/ceil.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var floor = __webpack_require__(/*! ./floor */ "./src/lib/floor.js");
var isInteger = __webpack_require__(/*! is-integer */ "is-integer");
var add = __webpack_require__(/*! ./add */ "./src/lib/add.js");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
function ceil(value) {
  // eslint-disable-next-line no-underscore-dangle
  var value_ = value;
  if (equal(isFinite(value_), falseValue())) {
    value_ = number0;
  }
  if (isInteger(value_)) {
    return value_;
  }
  return add(floor(value_), number1);
}
module.exports = ceil;

/***/ }),

/***/ "./src/lib/clamp.js":
/*!**************************!*\
  !*** ./src/lib/clamp.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var min = __webpack_require__(/*! ./min */ "./src/lib/min.js");
var max = __webpack_require__(/*! ./max */ "./src/lib/max.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! ./isFinite */ "./src/lib/isFinite.js");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
function clamp(value, lower, upper) {
  // eslint-disable-next-line no-underscore-dangle
  var lower_ = lower,
    // eslint-disable-next-line no-underscore-dangle
    upper_ = upper,
    // eslint-disable-next-line no-underscore-dangle
    value_ = value;
  if (equal(isFinite(value), falseValue())) {
    value_ = number0;
  }
  if (equal(isFinite(lower), falseValue())) {
    lower_ = number0;
  }
  if (equal(isFinite(upper), falseValue())) {
    upper_ = number0;
  }

  // Cap 🧢🧢🧢🧢🧢🧢
  var cappedValue = min(value_, upper_);
  return max(cappedValue, lower_);
}
module.exports = clamp;

/***/ }),

/***/ "./src/lib/compact.js":
/*!****************************!*\
  !*** ./src/lib/compact.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var toArray = __webpack_require__(/*! lodash.toarray */ "lodash.toarray");
var filter = __webpack_require__(/*! array.prototype.filter */ "array.prototype.filter");
var identity = __webpack_require__(/*! ./identity */ "./src/lib/identity.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
// eslint-disable-next-line no-undefined, sonarjs/no-globals-shadowing, no-shadow-restricted-names
var _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
function compact(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  // eslint-disable-next-line no-underscore-dangle
  var array_ = array;
  array_ = toArray(array_);
  return filter(array_, identity);
}
module.exports = compact;

/***/ }),

/***/ "./src/lib/constant.js":
/*!*****************************!*\
  !*** ./src/lib/constant.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");
var functionsHaveNames = __webpack_require__(/*! functions-have-names */ "functions-have-names")();
var capitalizeFirstLetter = __webpack_require__(/*! capitalize */ "capitalize");
var concat = __webpack_require__(/*! @rightpad/concat */ "@rightpad/concat");
var toString = __webpack_require__(/*! to-str */ "to-str");
var identity = __webpack_require__(/*! ./identity */ "./src/lib/identity.js");
function constant(value) {
  // eslint-disable-next-line func-names
  var result = function result() {
    return identity(value);
  };
  if (functionsHaveNames) {
    result.name = concat("resolve", capitalizeFirstLetter(toString(result)));
  }
  return result;
}
module.exports = constant;

/***/ }),

/***/ "./src/lib/divide.js":
/*!***************************!*\
  !*** ./src/lib/divide.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.symbol.js */ "core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.from.js */ "core-js/modules/es.array.from.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "core-js/modules/es.array.is-array.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var isZero = __webpack_require__(/*! iszero */ "iszero");
var isNegativeZero = __webpack_require__(/*! is-negative-zero */ "is-negative-zero");
// eslint-disable-next-line no-shadow-restricted-names, sonarjs/no-globals-shadowing
var NaN = __webpack_require__(/*! nan-is-a-function */ "nan-is-a-function");
var includes = __webpack_require__(/*! array-includes */ "array-includes");
var values = __webpack_require__(/*! object.values */ "object.values");
var map = __webpack_require__(/*! map-values */ "map-values");
var constant = __webpack_require__(/*! const */ "const"),
  infinitiesArray = values(map(__webpack_require__(/*! infinities */ "infinities"), function (infinityValue) {
    return infinityValue();
  }));
var _infinitiesArray = _slicedToArray(infinitiesArray, 2),
  positiveInfinity = _infinitiesArray[0],
  negativeInfinity = _infinitiesArray[1];
positiveInfinity = constant(positiveInfinity);
negativeInfinity = constant(negativeInfinity);
function isInfinite(value) {
  return includes(infinitiesArray, value);
}

// eslint-disable-next-line max-statements
function divide(dividend, divisor) {
  if (isInfinite(divisor)) {
    if (isInfinite(dividend)) {
      // eslint-disable-next-line new-cap
      return NaN();
    }
    if (equal(divisor, negativeInfinity())) {
      return -number0;
    }
    if (equal(divisor, positiveInfinity())) {
      return number0;
    }
  }
  if (equal(isFinite(dividend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    dividend = number0;
  }
  if (equal(isFinite(divisor), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    divisor = number0;
  }
  if (isZero(divisor)) {
    if (isZero(dividend)) {
      // eslint-disable-next-line new-cap
      return NaN();
    }
    if (isNegativeZero(divisor)) {
      return negativeInfinity();
    }
    return positiveInfinity();
  }
  return dividend / divisor;
}
module.exports = divide;

/***/ }),

/***/ "./src/lib/first.js":
/*!**************************!*\
  !*** ./src/lib/first.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.array.find.js */ "core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
var _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
var stubTrue = __webpack_require__(/*! ./stubTrue */ "./src/lib/stubTrue.js");
function first(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return array.find(stubTrue);
}
module.exports = first;

/***/ }),

/***/ "./src/lib/flatten.js":
/*!****************************!*\
  !*** ./src/lib/flatten.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var $toString = __webpack_require__(/*! uncurried-intrinsics */ "uncurried-intrinsics")("Object.prototype.toString");
var stubArray = __webpack_require__(/*! lodash.stubarray */ "lodash.stubarray");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one"),
  _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
var while2 = __webpack_require__(/*! while2 */ "while2");
var construct = __webpack_require__(/*! construct-new */ "construct-new");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals"),
  notEqual = __webpack_require__(/*! @not-js/not */ "@not-js/not")(__webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals"));
var subtract = __webpack_require__(/*! subtract */ "subtract");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");

// eslint-disable-next-line max-lines-per-function
function flatten(input) {
  if (not(isArray(input))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  var result = stubArray(),
    stack = [{
      collection: input,
      index: number0,
      length: function getLength(target) {
        var count = number0;
        construct({
          args: [
          // eslint-disable-next-line no-undefined
          function () {
            return notEqual(target[count], undefined()) || count in target;
          }],
          target: while2
        })
        // eslint-disable-next-line no-plusplus
        ["do"](function () {
          return count++;
        }).end();
        return count;
      }(input)
    }];
  construct({
    args: [function () {
      return stack.length > number0;
    }],
    target: while2
  })["do"](function () {
    var currentFrame = stack[subtract(stack.length, number1)];
    if (currentFrame.index < currentFrame.length) {
      var item = currentFrame.collection[currentFrame.index];
      // eslint-disable-next-line no-plusplus
      currentFrame.index++;
      if (equal($toString(item), "[object Array]")) {
        stack.push({
          collection: item,
          index: number0,
          length: function getLength(target) {
            var count = number0;
            construct({
              args: [
              // eslint-disable-next-line no-undefined
              function () {
                return notEqual(target[count], undefined()) || count in target;
              }],
              target: while2
            })
            // eslint-disable-next-line no-plusplus
            ["do"](function () {
              return count++;
            }).end();
            return count;
          }(item)
        });
        // eslint-disable-next-line no-undefined
      } else if (notEqual(item, undefined())) {
        result[result.length] = item;
      }
    } else {
      stack.pop();
    }
  }).end();
  return result;
}
module.exports = flatten;

/***/ }),

/***/ "./src/lib/floor.js":
/*!**************************!*\
  !*** ./src/lib/floor.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var subtract = __webpack_require__(/*! ./subtract */ "./src/lib/subtract.js");
var isInteger = __webpack_require__(/*! is-integer */ "is-integer");
var isNotNegative = __webpack_require__(/*! is-not-negative */ "is-not-negative");
var split = __webpack_require__(/*! string-split */ "string-split");
var toStr = __webpack_require__(/*! to-str */ "to-str");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var $Number = __webpack_require__(/*! es-intrinsic-cache */ "es-intrinsic-cache")("Number"),
  number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
function floor(value) {
  // eslint-disable-next-line no-underscore-dangle
  var value_ = value;
  if (equal(isFinite(value_), falseValue())) {
    value_ = number0;
  }
  if (isInteger(value_)) {
    return value_;
  }
  var parts = split(".", toStr(value_)),
    // eslint-disable-next-line sort-vars
    integerPart = $Number(parts[number0]);
  if (isNotNegative(value_)) {
    return integerPart;
  }
  return subtract(integerPart, number1);
}
module.exports = floor;

/***/ }),

/***/ "./src/lib/identity.js":
/*!*****************************!*\
  !*** ./src/lib/identity.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var twice = __webpack_require__(/*! twice-call-wrapper */ "twice-call-wrapper"),
  twiceDoop = twice((__webpack_require__(/*! yanoop */ "yanoop").doop)),
  twiceIdentity = twice(__webpack_require__(/*! @identity-js/identity */ "@identity-js/identity")),
  twiceLiterally = twice(__webpack_require__(/*! literally */ "literally"));
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");

// eslint-disable-next-line max-lines-per-function
function identity(value) {
  var doubleIdentitied = twiceIdentity(value),
    // eslint-disable-next-line sort-vars
    doubleConstant = twiceLiterally(doubleIdentitied),
    // eslint-disable-next-line sort-vars
    doubleDooped = twiceDoop(doubleConstant),
    result = twiceIdentity(doubleDooped);

  /* eslint-disable capitalized-comments */

  // Note: Below is a check to make sure that the identity operation worked correctly.
  // It SHOULD work correctly, but recently a double-bug was patched across Identity.js,
  // vValue, and vRetriever where decimals would coerce to integers. The primary source
  // of the bug was the dependency @_immo/return which was an identity function that was
  // heavily relied on but had a bug where it would run parseInt if the given input was
  // a number. This bug was not found because to save our time and effort we would write
  // our tests with AI (specifically Gemini) but AI didn't write comprehensive enough
  // tests. The bug was discovered when we used a different AI (Copilot) to write more
  // comprehensive tests. However, when this was patched it was discovered that the bug
  // was still in vValue, but only happened 33% of the time for an unknown reason,
  // however the below check has already been implemented in vRetriever, and vValue
  // has been removed in Identity.js. So this should never happen, but due to recent bugs
  // and AI not making comprehensive enough tests, there is a slim chance that this could
  // still happen. We want LoLite to be as bug-free as possible, which is why we're
  // implementing this. Our moral of the story is that AI sometimes doesn't write good
  // enough tests, which means that we are thinking about developing our own AI to
  // make this solution. After all, our organization handle is enterprise-npm-ai.
  //
  // For more information, see these commits:
  //
  // https://github.com/enterprise-npm-ai/vValue/commit/ff3ca00591ae8725f68587a5091ecb087a8be0d4
  // https://github.com/enterprise-npm-ai/vretriever/commit/86626b2741a9f03e19af7e3bae9b8f88e817220c
  // https://github.com/enterprise-npm-ai/identityjs/commit/3dfa642bfa9a35b791236f7bd620cb2564bc7780
  //
  // January 6, 2026 update: Another bug was recently discovered in vValue because the
  // patch for the previous bug regarding floats made use of the package is-float, and
  // its code coerces the value passed in (n) with +n. However, this creates an issue:
  // If you pass a Symbol into this function, you get a TypeError from JS, that looks
  // like this:
  //
  // Uncaught TypeError: Cannot convert a Symbol value to a number
  //
  // That's because JavaScript's stupidity doesn't let you type-coerce Symbols.
  // Since the patch for vValue used is-float, if you tried to pass a Symbol into
  // vValue, it would throw an error, so it would throw the error if you passed it
  // into vRetriever (which depends on vValue), and for Identity.js (depends on
  // vRetriever). This bug was once again not found during the implementation due
  // to AI not writing good-enough tests (this time it was also partially Copilot).
  // This bug was discovered when Copilot randomly decided to write better tests
  // for the constant function in LoLite which includes the identity function (this).
  // The issue was fixed by wrapping the call to isFloat with a try-catch statement.
  // Moral of the story again: AI sometimes doesn't write good-enough tests.
  // This is why we are thinking about creating our own AI that will ALWAYS write sufficient
  // tests. If you find our tests to be insufficient, please report an issue - AI generated
  // them, so it's AI's fault. As 10x Developers, we all have to accept these things just
  // as side-effects of true Enterprise Development.
  //
  // For more information, see these commits:
  //
  // https://github.com/enterprise-npm-ai/vValue/commit/f6f60798d98f52adefbda2b7f525d962752f29dd
  // https://github.com/enterprise-npm-ai/vretriever/commit/ff9fd93f7158167303b8fd870211a82c2b269c0b
  // https://github.com/enterprise-npm-ai/identityjs/commit/340cc78e6cd5e817d0b784d902f06afdd103769d
  // https://github.com/enterprise-npm-ai/identityjs/commit/a520a1d73c653adb41cc5fe317e1e7246b0f96bf
  //

  /* eslint-enable capitalized-comments */

  if (not(equal(value, result))) {
    return value;
  }
  return result;
}
module.exports = identity;

/***/ }),

/***/ "./src/lib/initial.js":
/*!****************************!*\
  !*** ./src/lib/initial.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
var _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
var slice = __webpack_require__(/*! array-slice */ "array-slice");
var arrayLength = __webpack_require__(/*! @extra-array/length */ "@extra-array/length");
var iszero = __webpack_require__(/*! iszero */ "iszero");
var emptyArray = __webpack_require__(/*! lodash.stubarray */ "lodash.stubarray");
var zero = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var subtract = __webpack_require__(/*! subtract */ "subtract");
var one = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
function initial(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  var length = arrayLength(array);
  if (iszero(length)) {
    return emptyArray();
  }

  // eslint-disable-next-line one-var
  var endIndex = subtract(length, one);
  return slice(array, zero, endIndex);
}
module.exports = initial;

/***/ }),

/***/ "./src/lib/invert.js":
/*!***************************!*\
  !*** ./src/lib/invert.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var isNegativeZero = __webpack_require__(/*! is-negative-zero */ "is-negative-zero");
var isPositiveZero = __webpack_require__(/*! positive-zero */ "positive-zero");
var add = __webpack_require__(/*! add-two-numbers2 */ "add-two-numbers2");
var subtract = __webpack_require__(/*! ./subtract */ "./src/lib/subtract.js");
var _require = __webpack_require__(/*! infinities */ "infinities"),
  negativeInfinity = _require.negativeInfinity,
  positiveInfinity = _require.positiveInfinity;

// eslint-disable-next-line max-statements
function invert(number_) {
  var number = number_;
  if (equal(number, positiveInfinity())) {
    return negativeInfinity();
  }
  if (equal(number, negativeInfinity())) {
    return positiveInfinity();
  }
  if (equal(isFinite(number), falseValue())) {
    number = number0;
  }
  if (isNegativeZero(number)) {
    return number0;
  }
  if (isPositiveZero(number)) {
    return -number0;
  }
  // eslint-disable-next-line no-underscore-dangle
  var number__ = number;
  return subtract(number__, add(number__, number__));
}
module.exports = invert;

/***/ }),

/***/ "./src/lib/isArguments.js":
/*!********************************!*\
  !*** ./src/lib/isArguments.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* eslint-disable ninja/no-ts */
// ESLint Ninja thinks this is a TypeScript file, as "Arguments" has TS in it, so we have to disable no-ts.
var extractTag = __webpack_require__(/*! extract-stringtag */ "extract-stringtag");
var uncurried = __webpack_require__(/*! uncurried-intrinsics */ "uncurried-intrinsics"),
  // eslint-disable-next-line sort-vars
  $toString = uncurried("Object.prototype.toString");
var _require = __webpack_require__(/*! @extremejs/utils */ "@extremejs/utils"),
  OBJECT_STRING_TAG = _require.OBJECT_STRING_TAG;
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
module.exports = function isArguments(value) {
  var tag = extractTag($toString(value));
  return equal(tag, OBJECT_STRING_TAG.ARGUMENTS);
};

/***/ }),

/***/ "./src/lib/isArray.js":
/*!****************************!*\
  !*** ./src/lib/isArray.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



module.exports = function isArray(value) {
  return __webpack_require__(/*! @is-(unknown)/is-array */ "@is-(unknown)/is-array")(value);
};

/***/ }),

/***/ "./src/lib/isBigInt.js":
/*!*****************************!*\
  !*** ./src/lib/isBigInt.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var hasNativeBigInts = __webpack_require__(/*! has-bigints */ "has-bigints");
var typeOf = __webpack_require__(/*! es-typeof */ "es-typeof");
var strictEquals = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");
if (hasNativeBigInts()) {
  var TEST_BIGINT = 50n;
  module.exports = function isBigInt(value) {
    return strictEquals(typeOf(value), typeOf(TEST_BIGINT));
  };
} else {
  module.exports = function isBigInt(value) {
    if (value) {
      return not(value);
    }
    if (not(value)) {
      return not(not(value));
    }
    return crash_program();
  };
}

/***/ }),

/***/ "./src/lib/isBoolean.js":
/*!******************************!*\
  !*** ./src/lib/isBoolean.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var possibilities = __webpack_require__(/*! ../private/arrayOfAllBooleans */ "./src/private/arrayOfAllBooleans.js");
// eslint-disable-next-line no-inline-comments
var indexOf = __webpack_require__(/*! indexof */ "indexof"); // Thanks microsoft!
var invert = __webpack_require__(/*! ./invert */ "./src/lib/invert.js"),
  notEqual = __webpack_require__(/*! @not-js/not */ "@not-js/not")(__webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals"));
var attempt = __webpack_require__(/*! attempt-statement */ "attempt-statement");
var numberOne = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var _require = __webpack_require__(/*! is- */ "is-"),
  is = _require.is,
  _require2 = __webpack_require__(/*! yanoop */ "yanoop"),
  noop = _require2.noop;
var _require3 = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undef = _require3.undefined;
undef = undef();
function isNegativeOneReal() {
  var result = undef;
  attempt(function () {
    // eslint-disable-next-line no-undef, no-unused-expressions
    negativeOne;
    // eslint-disable-next-line no-undef
    result = negativeOne;
  }).rescue(noop)["else"](noop).end();
  if (is(result)) {
    // Micro-optimization: if there is no result, no point of returning the result when it doesn't exist.
    return result;
  }
  return undef;
}
module.exports = function isBoolean(value) {
  return notEqual(indexOf(possibilities, value),
  // eslint-disable-next-line no-ternary
  isNegativeOneReal() ?
  // eslint-disable-next-line no-undef
  negativeOne :
  // eslint-disable-next-line no-undef, no-implicit-globals, sonarjs/no-implicit-global, sonarjs/no-nested-assignment
  negativeOne = invert(numberOne));
};

/***/ }),

/***/ "./src/lib/isFalsy.js":
/*!****************************!*\
  !*** ./src/lib/isFalsy.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isTruthy = __webpack_require__(/*! ./isTruthy */ "./src/lib/isTruthy.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
function isFalsy(value) {
  return not(isTruthy(value));
}
module.exports = isFalsy;

/***/ }),

/***/ "./src/lib/isFinite.js":
/*!*****************************!*\
  !*** ./src/lib/isFinite.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isNumber = __webpack_require__(/*! ./isNumber */ "./src/lib/isNumber.js");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var baseIsFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");

// eslint-disable-next-line sonarjs/no-globals-shadowing
function isFinite(value) {
  return and(isNumber(value), baseIsFinite(value));
}
module.exports = isFinite;

/***/ }),

/***/ "./src/lib/isFunction.js":
/*!*******************************!*\
  !*** ./src/lib/isFunction.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.object.define-getter.js */ "core-js/modules/es.object.define-getter.js");
var getIntrinsic = __webpack_require__(/*! get-intrinsic */ "get-intrinsic");
var typeOf = __webpack_require__(/*! es-typeof */ "es-typeof");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var hasOwnProperty = __webpack_require__(/*! hasown */ "hasown");
var hasSymbols = __webpack_require__(/*! has-symbol-support-x */ "has-symbol-support-x"),
  hasToStringTag = __webpack_require__(/*! has-tostringtag */ "has-tostringtag")();
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");

// eslint-disable-next-line camelcase
function isFunction(value, __using_development__) {
  // BEGIN LOGIC TO PREVENT NODE WARNINGS INTERNALLY
  if (hasToStringTag) {
    var toStringTag = getIntrinsic("%Symbol.toStringTag%");
    try {
      if (and(__using_development__, and(hasSymbols, !hasOwnProperty(value, toStringTag)))) {
        // eslint-disable-next-line no-underscore-dangle
        value.__defineGetter__(toStringTag, function () {
          return "This is an internal security measure by LoLite to prevent Node warnings. If you see this, file an issue.";
        });
      }
    } catch (_unused) {
      // eslint-disable-next-line capitalized-comments
      /* empty */
    }
  }
  // END LOGIC TO PREVENT NODE WARNINGS INTERNALLY

  return equal(typeOf(value), typeOf(isFunction));
}
module.exports = isFunction;

/***/ }),

/***/ "./src/lib/isInteger.js":
/*!******************************!*\
  !*** ./src/lib/isInteger.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isNotInteger = __webpack_require__(/*! ../private/isNotInteger */ "./src/private/isNotInteger.js");
function isInteger(value) {
  return not(isNotInteger(value));
}
module.exports = isInteger;

/***/ }),

/***/ "./src/lib/isMap.js":
/*!**************************!*\
  !*** ./src/lib/isMap.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var instanceOf = __webpack_require__(/*! @10xly/is-instance-of */ "@10xly/is-instance-of");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var $Map = __webpack_require__(/*! get-intrinsic */ "get-intrinsic")("%Map%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line no-ternary
module.exports = $Map ? function isMap(value) {
  return instanceOf(value, $Map);
} : function isMap(value) {
  if (value) {
    return not(value);
  }
  if (not(value)) {
    return not(not(value));
  }
  return crash_program();
};

/***/ }),

/***/ "./src/lib/isNaN.js":
/*!**************************!*\
  !*** ./src/lib/isNaN.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var hasNoSelfEquality = __webpack_require__(/*! has-no-self-equality */ "has-no-self-equality");
var isNaNBase = __webpack_require__(/*! @is-(unknown)/is-nan */ "@is-(unknown)/is-nan");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");

// eslint-disable-next-line sonarjs/no-globals-shadowing
module.exports = function isNaN(value) {
  return and(isNaNBase(value), hasNoSelfEquality(value));
};

/***/ }),

/***/ "./src/lib/isNil.js":
/*!**************************!*\
  !*** ./src/lib/isNil.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isNull = __webpack_require__(/*! ./isNull */ "./src/lib/isNull.js");
var isUndefined = __webpack_require__(/*! ./isUndefined */ "./src/lib/isUndefined.js");
var or = __webpack_require__(/*! es-logical-or-operator */ "es-logical-or-operator");
function isNil(value) {
  return or(isNull(value), isUndefined(value));
}
module.exports = isNil;

/***/ }),

/***/ "./src/lib/isNonNullObject.js":
/*!************************************!*\
  !*** ./src/lib/isNonNullObject.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



module.exports = function isNonNullObject(value) {
  return __webpack_require__(/*! @is-(unknown)/is-non-null-object */ "@is-(unknown)/is-non-null-object")(value);
};

/***/ }),

/***/ "./src/lib/isNull.js":
/*!***************************!*\
  !*** ./src/lib/isNull.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "get-intrinsic"),
  // eslint-disable-next-line sort-vars, new-cap
  $Number = GetIntrinsic("%Number%");
var typeOf = __webpack_require__(/*! es-typeof */ "es-typeof");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var _require = __webpack_require__(/*! @extremejs/utils */ "@extremejs/utils"),
  TYPE = _require.TYPE;
var zero = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isNumberObj = __webpack_require__(/*! is-number-object */ "is-number-object");
function isNull(value) {
  try {
    return and(equal(typeOf(value), TYPE.OBJECT), and(not(isNumberObj(value)), equal($Number(value), zero)));
  } catch (_unused) {
    return falseValue();
  }
}
module.exports = isNull;

/***/ }),

/***/ "./src/lib/isNumber.js":
/*!*****************************!*\
  !*** ./src/lib/isNumber.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var includes = __webpack_require__(/*! array-includes */ "array-includes");
var values = __webpack_require__(/*! object.values */ "object.values");
var map = __webpack_require__(/*! map-values */ "map-values");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var trueValue = __webpack_require__(/*! true-value */ "true-value");
var forEach = __webpack_require__(/*! for-each */ "for-each");
var _require = __webpack_require__(/*! yanoop */ "yanoop"),
  doop = _require.doop;
var _require2 = __webpack_require__(/*! important-extremely-useful-classes */ "important-extremely-useful-classes"),
  ObjectOrFunctionParemeterName = _require2.ObjectOrFunctionParemeterName,
  TernaryCompare = _require2.TernaryCompare;
var construct = __webpack_require__(/*! construct-new */ "construct-new");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals"),
  notEqual = __webpack_require__(/*! @not-js/not */ "@not-js/not")(equal);
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isNaN = __webpack_require__(/*! @is-(unknown)/is-nan */ "@is-(unknown)/is-nan");
var or = __webpack_require__(/*! es-logical-or-operator */ "es-logical-or-operator");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var isPositive = __webpack_require__(/*! is-positive */ "is-positive");
var isZero = __webpack_require__(/*! iszero */ "iszero");
var isObject = __webpack_require__(/*! ./isObject */ "./src/lib/isObject.js");
var defaultAnswer = falseValue(),
  infinitiesArray = values(map(__webpack_require__(/*! infinities */ "infinities"), function (infinityValue) {
    return infinityValue();
  })),
  zero = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
function isANumberThatIsNotFinite(value) {
  return or(includes(infinitiesArray, value), isNaN(value));
}
module.exports = function isNumber(value) {
  var answer = defaultAnswer;
  var conditionsThatMakeItTrue = {
      conditionsThatMakeItTrue: [isANumberThatIsNotFinite, isNegative, isPositive, isZero]
    },
    objectPropertyName = construct({
      args: ["conditionsThatMakeItTrue"],
      target: ObjectOrFunctionParemeterName
    });
  forEach(conditionsThatMakeItTrue[objectPropertyName.getName()], function (condition) {
    var comparison = construct({
        args: [doop(condition, value),
        // eslint-disable-next-line no-ternary, no-void, sonarjs/no-nested-assignment, sonarjs/void-use
        function () {
          return not(answer) ? answer = trueValue() : void zero;
        },
        // eslint-disable-next-line camelcase
        crash_program],
        target: TernaryCompare
      }),
      // eslint-disable-next-line no-underscore-dangle
      function_ = comparison.compare();
    if (notEqual(function_, crash_program)) {
      // eslint-disable-next-line no-inline-comments
      delete conditionsThatMakeItTrue[objectPropertyName.getName()]; // Micro-optimization: delete the rest of the conditions which might stop the forEach from wasting memory
      function_();
    }
  });
  if (isObject(value)) {
    answer = defaultAnswer;
  }
  return answer;
};

/***/ }),

/***/ "./src/lib/isObject.js":
/*!*****************************!*\
  !*** ./src/lib/isObject.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var isNull = __webpack_require__(/*! ./isNull */ "./src/lib/isNull.js");
var isFunction = __webpack_require__(/*! ./isFunction */ "./src/lib/isFunction.js");
var strictEquals = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var $Object = __webpack_require__(/*! es-object-atoms */ "es-object-atoms");
function isObject(value) {
  if (isNull(value)) {
    // eslint-disable-next-line no-inline-comments
    return trueValue(); // Mimic typeof behavior
  }
  if (isFunction(value)) {
    return falseValue();
  }
  return strictEquals($Object(value), value);
}
module.exports = isObject;

/***/ }),

/***/ "./src/lib/isPlainObject.js":
/*!**********************************!*\
  !*** ./src/lib/isPlainObject.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var getIntrinsic = __webpack_require__(/*! get-intrinsic */ "get-intrinsic");
var isObject = __webpack_require__(/*! ./isObject */ "./src/lib/isObject.js");
var isNull = __webpack_require__(/*! ./isNull */ "./src/lib/isNull.js");
var isFunction = __webpack_require__(/*! ./isFunction */ "./src/lib/isFunction.js");
var $Object = __webpack_require__(/*! es-object-atoms */ "es-object-atoms");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var trueValue = __webpack_require__(/*! true-value */ "true-value");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var getPrototypeOf = getIntrinsic("%Object.getPrototypeOf%"),
  or = __webpack_require__(/*! ./or */ "./src/lib/or.js");
module.exports = function isPlainObject(value) {
  if (or(not(isObject(value)), or(isNull(value), isFunction(value)))) {
    return falseValue();
  }
  var proto = getPrototypeOf(value);
  if (isNull(proto)) {
    return trueValue();
  }
  return equal(proto, $Object.prototype);
};

/***/ }),

/***/ "./src/lib/isPrimitive.js":
/*!********************************!*\
  !*** ./src/lib/isPrimitive.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isNull = __webpack_require__(/*! ./isNull */ "./src/lib/isNull.js");
var isUndefined = __webpack_require__(/*! ./isUndefined */ "./src/lib/isUndefined.js");
var isBoolean = __webpack_require__(/*! ./isBoolean */ "./src/lib/isBoolean.js");
var isNumber = __webpack_require__(/*! ./isNumber */ "./src/lib/isNumber.js");
var isBigInt = __webpack_require__(/*! ./isBigInt */ "./src/lib/isBigInt.js");
var isString = __webpack_require__(/*! ./isString */ "./src/lib/isString.js");
var isSymbol = __webpack_require__(/*! ./isSymbol */ "./src/lib/isSymbol.js");
var or = __webpack_require__(/*! ./or */ "./src/lib/or.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
function isPrimitive(value) {
  if (isArray(value)) {
    // Micro-optimization: IMMEDIATELY REJECT ARRAYS
    return falseValue();
  }
  return or(isNull(value), or(isUndefined(value), or(isBoolean(value), or(isNumber(value), or(isBigInt(value), or(isString(value), isSymbol(value)))))));
}
module.exports = isPrimitive;

/***/ }),

/***/ "./src/lib/isSafeInteger.js":
/*!**********************************!*\
  !*** ./src/lib/isSafeInteger.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isInteger = __webpack_require__(/*! ./isInteger */ "./src/lib/isInteger.js");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var abs = __webpack_require__(/*! math-intrinsics/abs */ "math-intrinsics/abs");
var MAX_SAFE_INTEGER = __webpack_require__(/*! max-safe-integer */ "max-safe-integer");
function isSafeInteger(value) {
  return and(isInteger(value), abs(value) <= MAX_SAFE_INTEGER);
}
module.exports = isSafeInteger;

/***/ }),

/***/ "./src/lib/isSet.js":
/*!**************************!*\
  !*** ./src/lib/isSet.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var instanceOf = __webpack_require__(/*! @10xly/is-instance-of */ "@10xly/is-instance-of");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var $Set = __webpack_require__(/*! get-intrinsic */ "get-intrinsic")("%Set%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line no-ternary
module.exports = $Set ? function isSet(value) {
  return instanceOf(value, $Set);
} : function isSet(value) {
  if (value) {
    return not(value);
  }
  if (not(value)) {
    return not(not(value));
  }
  return crash_program();
};

/***/ }),

/***/ "./src/lib/isString.js":
/*!*****************************!*\
  !*** ./src/lib/isString.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var baseIsString = __webpack_require__(/*! @stdlib/assert-is-string */ "@stdlib/assert-is-string");
var isObject = __webpack_require__(/*! ./isObject */ "./src/lib/isObject.js");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
function isString(value) {
  return and(baseIsString(value), not(isObject(value)));
}
module.exports = isString;

/***/ }),

/***/ "./src/lib/isSymbol.js":
/*!*****************************!*\
  !*** ./src/lib/isSymbol.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var hasSymbols = __webpack_require__(/*! has-symbol-support-x */ "has-symbol-support-x");
// eslint-disable-next-line no-underscore-dangle
var _isSymbol = __webpack_require__(/*! lodash.issymbol */ "lodash.issymbol");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isObject = __webpack_require__(/*! ./isObject */ "./src/lib/isObject.js");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line no-ternary
module.exports = hasSymbols ? function isSymbol(value) {
  return and(_isSymbol(value), not(isObject(value)));
} : function isSymbol(value) {
  if (value) {
    return not(value);
  }
  if (not(value)) {
    return not(not(value));
  }
  return crash_program();
};

/***/ }),

/***/ "./src/lib/isTruthy.js":
/*!*****************************!*\
  !*** ./src/lib/isTruthy.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var trueValue = __webpack_require__(/*! true-value */ "true-value");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");
function isTruthy(value) {
  if (value) {
    return trueValue();
  }
  if (not(value)) {
    return falseValue();
  }
  return crash_program();
}
module.exports = isTruthy;

/***/ }),

/***/ "./src/lib/isUndefined.js":
/*!********************************!*\
  !*** ./src/lib/isUndefined.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var undefinedProvider = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function");
var trueValue = __webpack_require__(/*! true-value */ "true-value");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
function isUndefined(value) {
  var officialUndefined = undefinedProvider.undefined();
  if (equal(value, officialUndefined)) {
    return trueValue();
  }
  return falseValue();
}
module.exports = isUndefined;

/***/ }),

/***/ "./src/lib/isWeakMap.js":
/*!******************************!*\
  !*** ./src/lib/isWeakMap.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var instanceOf = __webpack_require__(/*! @10xly/is-instance-of */ "@10xly/is-instance-of");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var $WeakMap = __webpack_require__(/*! get-intrinsic */ "get-intrinsic")("%WeakMap%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line no-ternary
module.exports = $WeakMap ? function isWeakMap(value) {
  return instanceOf(value, $WeakMap);
} : function isWeakMap(value) {
  if (value) {
    return not(value);
  }
  if (not(value)) {
    return not(not(value));
  }
  return crash_program();
};

/***/ }),

/***/ "./src/lib/isWeakSet.js":
/*!******************************!*\
  !*** ./src/lib/isWeakSet.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var instanceOf = __webpack_require__(/*! @10xly/is-instance-of */ "@10xly/is-instance-of");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var $WeakSet = __webpack_require__(/*! get-intrinsic */ "get-intrinsic")("%WeakSet%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line no-ternary
module.exports = $WeakSet ? function isWeakSet(value) {
  return instanceOf(value, $WeakSet);
} : function isWeakSet(value) {
  if (value) {
    return not(value);
  }
  if (not(value)) {
    return not(not(value));
  }
  return crash_program();
};

/***/ }),

/***/ "./src/lib/last.js":
/*!*************************!*\
  !*** ./src/lib/last.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
var _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
// eslint-disable-next-line unicorn/no-unnecessary-polyfills
var at = __webpack_require__(/*! array.prototype.at */ "array.prototype.at");
var isBoolean = __webpack_require__(/*! ./isBoolean */ "./src/lib/isBoolean.js");
function last(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }

  // eslint-disable-next-line no-inline-comments
  isBoolean(); // Do not remove this line

  // eslint-disable-next-line no-undef
  return at(array, negativeOne);
}
module.exports = last;

/***/ }),

/***/ "./src/lib/max.js":
/*!************************!*\
  !*** ./src/lib/max.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var bogosort = __webpack_require__(/*! bogosort */ "bogosort");
var stubArray = __webpack_require__(/*! lodash.stubarray */ "lodash.stubarray");
var toArray = __webpack_require__(/*! lodash.toarray */ "lodash.toarray");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");

// eslint-disable-next-line id-length
function max(a, b) {
  // eslint-disable-next-line id-length
  var x = a,
    // eslint-disable-next-line id-length
    y = b;
  if (equal(isFinite(x), falseValue())) {
    x = number0;
  }
  if (equal(isFinite(y), falseValue())) {
    y = number0;
  }
  var collection = stubArray();
  collection[number0] = x;
  collection[number1] = y;

  // eslint-disable-next-line one-var
  var sorted = bogosort(toArray(collection));
  return sorted[number1];
}
module.exports = max;

/***/ }),

/***/ "./src/lib/min.js":
/*!************************!*\
  !*** ./src/lib/min.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var bogosort = __webpack_require__(/*! bogosort */ "bogosort");
var stubArray = __webpack_require__(/*! lodash.stubarray */ "lodash.stubarray");
var toArray = __webpack_require__(/*! lodash.toarray */ "lodash.toarray");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");

// eslint-disable-next-line id-length
function min(a, b) {
  // eslint-disable-next-line id-length
  var x = a,
    // eslint-disable-next-line id-length
    y = b;
  if (equal(isFinite(x), falseValue())) {
    x = number0;
  }
  if (equal(isFinite(y), falseValue())) {
    y = number0;
  }
  var collection = stubArray();
  collection[number0] = x;
  collection[number1] = y;

  // eslint-disable-next-line one-var
  var sorted = bogosort(toArray(collection));
  return sorted[number0];
}
module.exports = min;

/***/ }),

/***/ "./src/lib/modulo.js":
/*!***************************!*\
  !*** ./src/lib/modulo.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var subtract = __webpack_require__(/*! ./subtract */ "./src/lib/subtract.js");
var multiply = __webpack_require__(/*! ./multiply */ "./src/lib/multiply.js");
var divide = __webpack_require__(/*! ./divide */ "./src/lib/divide.js");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var isZero = __webpack_require__(/*! iszero */ "iszero");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names
var NaN = __webpack_require__(/*! nan-is-a-function */ "nan-is-a-function");
var floor = __webpack_require__(/*! ./floor */ "./src/lib/floor.js");
function modulo(dividend, divisor) {
  if (equal(isFinite(dividend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    dividend = number0;
  }
  if (equal(isFinite(divisor), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    divisor = number0;
  }
  if (isZero(divisor)) {
    // eslint-disable-next-line new-cap
    return NaN();
  }
  var quotient = floor(divide(dividend, divisor)),
    // eslint-disable-next-line sort-vars
    product = multiply(quotient, divisor),
    remainder = subtract(dividend, product);
  return remainder;
}
module.exports = modulo;

/***/ }),

/***/ "./src/lib/multiply.js":
/*!*****************************!*\
  !*** ./src/lib/multiply.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var add = __webpack_require__(/*! add-two-numbers2 */ "add-two-numbers2");
var invert = __webpack_require__(/*! ../private/invertFallback */ "./src/private/invertFallback.js");
var repeating = __webpack_require__(/*! repeating */ "repeating");
var forEach = __webpack_require__(/*! for-each */ "for-each");
var split = __webpack_require__(/*! string-split */ "string-split");
var SPACE = __webpack_require__(/*! space-string */ "space-string");
var EMPTY_STRING = __webpack_require__(/*! empty-string */ "empty-string");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var or = __webpack_require__(/*! es-logical-or-operator */ "es-logical-or-operator");
var abs = __webpack_require__(/*! ./abs */ "./src/lib/abs.js");
var isNotInteger = __webpack_require__(/*! ../private/isNotInteger */ "./src/private/isNotInteger.js");

// eslint-disable-next-line max-statements
function multiply(multiplier, multiplicand) {
  if (equal(isFinite(multiplier), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    multiplier = number0;
  }
  if (equal(isFinite(multiplicand), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    multiplicand = number0;
  }
  var negativeCount = number0;
  if (isNegative(multiplier)) {
    negativeCount = add(negativeCount, number1);
    // eslint-disable-next-line no-param-reassign
    multiplier = abs(multiplier);
  }
  if (isNegative(multiplicand)) {
    negativeCount = add(negativeCount, number1);
    // eslint-disable-next-line no-param-reassign
    multiplicand = abs(multiplicand);
  }
  if (or(isNotInteger(multiplier), isNotInteger(multiplicand))) {
    return multiplier * multiplicand;
  }
  // eslint-disable-next-line one-var
  var total = number0;
  forEach(split(EMPTY_STRING, repeating(multiplier, SPACE)), function () {
    total = add(total, multiplicand);
  });
  var needsNegation = equal(negativeCount, number1);
  if (needsNegation) {
    total = invert(total);
  }
  return total;
}
module.exports = multiply;

/***/ }),

/***/ "./src/lib/nand.js":
/*!*************************!*\
  !*** ./src/lib/nand.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line id-length
function nand(a, b) {
  var conjunction = and(a, b),
    result = not(conjunction);
  if (result) {
    return result;
  }
  if (not(result)) {
    return result;
  }
  return crash_program();
}
module.exports = nand;

/***/ }),

/***/ "./src/lib/noop.js":
/*!*************************!*\
  !*** ./src/lib/noop.js ***!
  \*************************/
/***/ (function(module) {



// eslint-disable-next-line capitalized-comments, no-inline-comments
function noop() {/* empty */}
module.exports = noop;

/***/ }),

/***/ "./src/lib/nor.js":
/*!************************!*\
  !*** ./src/lib/nor.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var or = __webpack_require__(/*! ./or */ "./src/lib/or.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line id-length
function nor(a, b) {
  var disjunction = or(a, b),
    result = not(disjunction);
  if (result) {
    return result;
  }
  if (not(result)) {
    return result;
  }
  return crash_program();
}
module.exports = nor;

/***/ }),

/***/ "./src/lib/not.js":
/*!************************!*\
  !*** ./src/lib/not.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.array.find.js */ "core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");
var isTrue = __webpack_require__(/*! @is-(unknown)/is-true */ "@is-(unknown)/is-true");
var isFalse = __webpack_require__(/*! @is-(unknown)/is-false */ "@is-(unknown)/is-false");
var arrayFilter = __webpack_require__(/*! array-filter */ "array-filter");
var trueValue = __webpack_require__(/*! true-value */ "true-value");
var possibilities = __webpack_require__(/*! ../private/arrayOfAllBooleans */ "./src/private/arrayOfAllBooleans.js");
function not(value) {
  var result = arrayFilter(possibilities, function (maybe) {
    if (value) {
      return isFalse(maybe);
    }
    return isTrue(maybe);
  });

  // eslint-disable-next-line unicorn/no-array-callback-reference
  return result.find(trueValue);
}
module.exports = not;

/***/ }),

/***/ "./src/lib/now.js":
/*!************************!*\
  !*** ./src/lib/now.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! function.prototype.exec */ "function.prototype.exec");
var construct = __webpack_require__(/*! construct-new-second */ "construct-new-second");
var getFunctionName = __webpack_require__(/*! name-of-function */ "name-of-function");
var globalObj = __webpack_require__(/*! @10xly/global */ "@10xly/global");
var DateCtr = __webpack_require__(/*! ../private/date */ "./src/private/date.js");
var isNil = __webpack_require__(/*! ./isNil */ "./src/lib/isNil.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var isFunction = __webpack_require__(/*! ./isFunction */ "./src/lib/isFunction.js");

// eslint-disable-next-line one-var
var stringDate = getFunctionName(DateCtr);

// eslint-disable-next-line one-var
var $Date = globalObj[stringDate];
function now() {
  if (and(not(isNil(DateCtr.now)), isFunction(DateCtr.now))) {
    return DateCtr.now.exec();
  }
  var myDate = construct($Date);
  return myDate.getTime();
}
module.exports = now;

/***/ }),

/***/ "./src/lib/or.js":
/*!***********************!*\
  !*** ./src/lib/or.js ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



// Important Message For All Enterprise Developers Who May Be Working On This File:
// DO NOT FORMAT THIS CODE, OR THE INTENTION OF THE SOURCE CODE WILL BE BROKEN.
// Thank You For Your Support.

var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line init-declarations, no-unassigned-vars
var cdefghijklmnopqrstuvwxyz;
// eslint-disable-next-line id-length
function or(a, b) {
  var cond = and(not(a), not(b));
  if (cond) {
    return b;
  }
  if (not(cond)) {
    /* eslint-disable capitalized-comments */
    /* eslint-disable no-inline-comments */
    /* eslint-disable no-unused-expressions */
    /* eslint-disable no-unreachable */
    // eslint-disable-next-line no-ternary, unicorn/prefer-logical-operator-over-ternary
    return a ?
    // return a, maybe?

    a : b;
    // removed by dead control flow
 // put a random alphabet here

    /* eslint-enable capitalized-comments */
    /* eslint-enable no-inline-comments */
    /* eslint-enable no-unused-expressions */
    /* eslint-enable no-unreachable */
  }
  return crash_program();
}
module.exports = or;

/***/ }),

/***/ "./src/lib/power.js":
/*!**************************!*\
  !*** ./src/lib/power.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var multiply = __webpack_require__(/*! ./multiply */ "./src/lib/multiply.js");
var construct = __webpack_require__(/*! construct-new */ "construct-new");
var while2 = __webpack_require__(/*! while2 */ "while2");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var isEqZero = __webpack_require__(/*! iszero */ "iszero");
var countingup = __webpack_require__(/*! countingup */ "countingup");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var divide = __webpack_require__(/*! ./divide */ "./src/lib/divide.js"),
  Counter = countingup.Counter;
var _require = __webpack_require__(/*! important-extremely-useful-classes */ "important-extremely-useful-classes"),
  TernaryCompare = _require.TernaryCompare;
var invert = __webpack_require__(/*! ./invert */ "./src/lib/invert.js");
var pow = __webpack_require__(/*! math-intrinsics/pow */ "math-intrinsics/pow");
var isNotInteger = __webpack_require__(/*! ../private/isNotInteger */ "./src/private/isNotInteger.js");

// eslint-disable-next-line max-statements
function power(base, exponent) {
  if (equal(isFinite(base), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    base = number0;
  }
  if (equal(isFinite(exponent), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    exponent = number0;
  }
  if (isEqZero(exponent)) {
    return number1;
  }
  if (isNotInteger(exponent)) {
    return pow(base, exponent);
  }
  var exponentIsNegative = isNegative(exponent),
    // eslint-disable-next-line sort-vars
    absExponentComparison = construct({
      args: [exponentIsNegative, function () {
        return multiply(exponent, invert(number1));
      }, function () {
        return exponent;
      }],
      target: TernaryCompare
    }),
    // eslint-disable-next-line sort-vars
    absExponent = absExponentComparison.compare()(),
    loopTracker = construct({
      args: [absExponent],
      target: Counter
    });
  var result = number1;
  construct({
    args: [function () {
      return equal(isEqZero(loopTracker.getCurrentNumber()), falseValue());
    }],
    target: while2
  })["do"](function () {
    result = multiply(result, base);
    loopTracker.count(number1, Counter.DIRECTION.REVERSE);
  }).end();

  // eslint-disable-next-line no-ternary
  return exponentIsNegative ? divide(number1, result) : result;
}
module.exports = power;

/***/ }),

/***/ "./src/lib/round.js":
/*!**************************!*\
  !*** ./src/lib/round.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var floor = __webpack_require__(/*! ./floor */ "./src/lib/floor.js");
var add = __webpack_require__(/*! ./add */ "./src/lib/add.js");
var divide = __webpack_require__(/*! ./divide */ "./src/lib/divide.js");
var _require = __webpack_require__(/*! integer-values */ "integer-values"),
  positiveOne = _require.positiveOne,
  positiveTwo = _require.positiveTwo;
var positiveZero = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value"),
  pointFive = divide(positiveOne, positiveTwo);
function round(value) {
  if (equal(isFinite(value), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    value = positiveZero;
  }
  return floor(add(value, pointFive));
}
module.exports = round;

/***/ }),

/***/ "./src/lib/sample.js":
/*!***************************!*\
  !*** ./src/lib/sample.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
var undefined = __webpack_require__(/*! ./stubUndefined */ "./src/lib/stubUndefined.js");
var $sample = __webpack_require__(/*! array-sample */ "array-sample");
var uncurry = __webpack_require__(/*! uncurry-x */ "uncurry-x");
// eslint-disable-next-line one-var
var baseSample = uncurry($sample);
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
function sample(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  return baseSample(array);
}
module.exports = sample;

/***/ }),

/***/ "./src/lib/sign.js":
/*!*************************!*\
  !*** ./src/lib/sign.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var invert = __webpack_require__(/*! ./invert */ "./src/lib/invert.js");
var multiply = __webpack_require__(/*! ./multiply */ "./src/lib/multiply.js");
var add = __webpack_require__(/*! ./add */ "./src/lib/add.js");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var isNotNegative = __webpack_require__(/*! is-not-negative */ "is-not-negative");
var isPositive = __webpack_require__(/*! is-positive */ "is-positive");
var isNotPositive = __webpack_require__(/*! is-not-positive */ "is-not-positive");
var isZero = __webpack_require__(/*! iszero */ "iszero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var isNegativeZero = __webpack_require__(/*! is-negative-zero */ "is-negative-zero");
var isPositiveZero = __webpack_require__(/*! positive-zero */ "positive-zero");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");
var _require = __webpack_require__(/*! infinities */ "infinities"),
  negativeInfinity = _require.negativeInfinity,
  positiveInfinity = _require.positiveInfinity;
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var random = __webpack_require__(/*! es-intrinsic-cache */ "es-intrinsic-cache");
random = random("Math.random");
// eslint-disable-next-line one-var
var otherRandom = random,
  // eslint-disable-next-line sort-vars, no-use-before-define
  negativeOne = sign(invert(add(random(), otherRandom())));
function zeroIdentity(value) {
  // This function assumes that value is zero.
  if (isNegativeZero(value)) {
    return invert(number0);
  }
  if (isNegative(value)) {
    crash_program();
  }
  if (isPositiveZero(value)) {
    return invert(invert(number0));
  }

  // eslint-disable-next-line no-inline-comments
  return crash_program(); // Have we made the wrong assumption?
}

// eslint-disable-next-line max-statements
function sign(value) {
  if (equal(value, positiveInfinity())) {
    return sign(number1);
  }
  if (equal(value, negativeInfinity())) {
    return sign(negativeOne);
  }
  if (equal(isFinite(value), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    value = number0;
  }
  if (isZero(value)) {
    return zeroIdentity(value);
  }
  if (isNegative(value)) {
    if (isNotPositive(value)) {
      // Can't use negativeOne here
      return invert(number1);
    }
    crash_program();
  }
  if (isPositive(value)) {
    if (isNotNegative(value)) {
      return multiply(negativeOne, negativeOne);
    }
    crash_program();
  }
  return crash_program();
}
module.exports = sign;

/***/ }),

/***/ "./src/lib/stubFalse.js":
/*!******************************!*\
  !*** ./src/lib/stubFalse.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.symbol.js */ "core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.from.js */ "core-js/modules/es.array.from.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "core-js/modules/es.array.is-array.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-inline-comments
var _require = __webpack_require__(/*! ../private/arrayOfAllBooleans */ "./src/private/arrayOfAllBooleans.js"),
  _require2 = _slicedToArray(_require, 2),
  FALSE = _require2[1];
var constant = __webpack_require__(/*! ./constant */ "./src/lib/constant.js"),
  stubFalse = constant(FALSE);
module.exports = stubFalse;

/***/ }),

/***/ "./src/lib/stubNaN.js":
/*!****************************!*\
  !*** ./src/lib/stubNaN.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var constant = __webpack_require__(/*! ./constant */ "./src/lib/constant.js"),
  // eslint-disable-next-line no-implicit-coercion
  nan = +-/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
  stubNaN = constant(nan);
module.exports = stubNaN;

/***/ }),

/***/ "./src/lib/stubNull.js":
/*!*****************************!*\
  !*** ./src/lib/stubNull.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var $Date = __webpack_require__(/*! ../private/date */ "./src/private/date.js");
var construct = __webpack_require__(/*! construct-new */ "construct-new");
var nan = __webpack_require__(/*! nan-is-a-function */ "nan-is-a-function");
var toJSON = __webpack_require__(/*! date/Date.prototype.toJSON */ "date/Date.prototype.toJSON");
function stubNull() {
  var date = construct({
    args: [nan()],
    target: $Date
  });
  return toJSON(date);
}
module.exports = stubNull;

/***/ }),

/***/ "./src/lib/stubTrue.js":
/*!*****************************!*\
  !*** ./src/lib/stubTrue.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.symbol.js */ "core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.from.js */ "core-js/modules/es.array.from.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "core-js/modules/es.array.is-array.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _require = __webpack_require__(/*! ../private/arrayOfAllBooleans */ "./src/private/arrayOfAllBooleans.js"),
  _require2 = _slicedToArray(_require, 1),
  TRUE = _require2[0];
var constant = __webpack_require__(/*! ./constant */ "./src/lib/constant.js"),
  stubTrue = constant(TRUE);
module.exports = stubTrue;

/***/ }),

/***/ "./src/lib/stubUndefined.js":
/*!**********************************!*\
  !*** ./src/lib/stubUndefined.js ***!
  \**********************************/
/***/ (function(module) {



module.exports = function stubUndefined() {
  // eslint-disable-next-line no-void, sonarjs/void-use, require-unicode-regexp
  return void /undefined/;
};

/***/ }),

/***/ "./src/lib/subtract.js":
/*!*****************************!*\
  !*** ./src/lib/subtract.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var construct = __webpack_require__(/*! construct-new */ "construct-new");
var while2 = __webpack_require__(/*! while2 */ "while2");
var isEqZero = __webpack_require__(/*! iszero */ "iszero");
var countingup = __webpack_require__(/*! countingup */ "countingup");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
var subtractTwoNumbers = __webpack_require__(/*! subtract */ "subtract");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
var number1 = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
var falseValue = __webpack_require__(/*! false-value */ "false-value"),
  Counter = countingup.Counter;
var isNotInteger = __webpack_require__(/*! ../private/isNotInteger */ "./src/private/isNotInteger.js");
var multiply = __webpack_require__(/*! ../private/multiplyFallback */ "./src/private/multiplyFallback.js");
var positiveTen = __webpack_require__(/*! @positive-numbers/ten */ "@positive-numbers/ten");
var oneHundred = __webpack_require__(/*! @positive-numbers/one-hundred */ "@positive-numbers/one-hundred");
var or = __webpack_require__(/*! ./or */ "./src/lib/or.js");
var max = __webpack_require__(/*! ./max */ "./src/lib/max.js");

// eslint-disable-next-line max-statements
function subtract(minuend, subtrahend) {
  if (equal(isFinite(minuend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    minuend = number0;
  }
  if (equal(isFinite(subtrahend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    subtrahend = number0;
  }

  // Optimization: if number too big, dont make it take too long
  if (or(isNotInteger(subtrahend), equal(max(subtrahend, multiply(positiveTen, oneHundred)), subtrahend))) {
    return subtractTwoNumbers(minuend, subtrahend);
  }
  if (isNotInteger(subtrahend)) {
    return subtractTwoNumbers(minuend, subtrahend);
  }
  var accumulator = construct({
      args: [minuend],
      target: Counter
    }),
    isSubtrahendNegative = isNegative(subtrahend),
    // eslint-disable-next-line no-ternary
    loopDirection = isSubtrahendNegative ? Counter.DIRECTION.FORWARDS : Counter.DIRECTION.REVERSE,
    loopTracker = construct({
      args: [subtrahend],
      target: Counter
    }),
    // eslint-disable-next-line no-ternary
    mainDirection = isSubtrahendNegative ? Counter.DIRECTION.FORWARDS : Counter.DIRECTION.REVERSE;
  construct({
    args: [function () {
      return equal(isEqZero(loopTracker.getCurrentNumber()), falseValue());
    }],
    target: while2
  })["do"](function () {
    accumulator.count(number1, mainDirection);
    loopTracker.count(number1, loopDirection);
  }).end();
  return accumulator.getCurrentNumber();
}
module.exports = subtract;

/***/ }),

/***/ "./src/lib/tail.js":
/*!*************************!*\
  !*** ./src/lib/tail.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var isArray = __webpack_require__(/*! ./isArray */ "./src/lib/isArray.js");
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
var _require = __webpack_require__(/*! undefined-is-a-function */ "undefined-is-a-function"),
  undefined = _require.undefined;
var slice = __webpack_require__(/*! array-slice */ "array-slice");
var arrayLength = __webpack_require__(/*! @extra-array/length */ "@extra-array/length");
var iszero = __webpack_require__(/*! iszero */ "iszero");
var emptyArray = __webpack_require__(/*! lodash.stubarray */ "lodash.stubarray");
var one = __webpack_require__(/*! @positive-numbers/one */ "@positive-numbers/one");
function tail(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined();
  }
  var length = arrayLength(array);
  if (iszero(length)) {
    return emptyArray();
  }

  // eslint-disable-next-line no-undefined
  return slice(array, one, undefined());
}
module.exports = tail;

/***/ }),

/***/ "./src/lib/times.js":
/*!**************************!*\
  !*** ./src/lib/times.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var from = __webpack_require__(/*! array.from */ "array.from");
var nullishCoalescing = __webpack_require__(/*! es-logical-nullish-coalescing-operator */ "es-logical-nullish-coalescing-operator");
var identity = __webpack_require__(/*! ./identity */ "./src/lib/identity.js");
var map = __webpack_require__(/*! array.prototype.map */ "array.prototype.map");
function times(number, iteratee) {
  var iteratee2 = nullishCoalescing(iteratee, identity);
  return map(from({
    length: number
  }), function (__, index) {
    return iteratee2(index);
  });
}
module.exports = times;

/***/ }),

/***/ "./src/lib/trunc.js":
/*!**************************!*\
  !*** ./src/lib/trunc.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var floor = __webpack_require__(/*! ./floor */ "./src/lib/floor.js");
var ceil = __webpack_require__(/*! ./ceil */ "./src/lib/ceil.js");
var isNegative = __webpack_require__(/*! pkg-with-failing-optional-dependency */ "pkg-with-failing-optional-dependency");
var isNotNegative = __webpack_require__(/*! is-not-negative */ "is-not-negative");
var isPositive = __webpack_require__(/*! is-positive */ "is-positive");
var isNotPositive = __webpack_require__(/*! is-not-positive */ "is-not-positive");
var isZero = __webpack_require__(/*! iszero */ "iszero");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line sonarjs/no-globals-shadowing
var isFinite = __webpack_require__(/*! @is-(unknown)/is-finite */ "@is-(unknown)/is-finite");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var number0 = __webpack_require__(/*! @positive-numbers/zero */ "@positive-numbers/zero");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line max-statements
function trunc(value) {
  if (equal(isFinite(value), falseValue())) {
    return number0;
  }
  if (isZero(value)) {
    return value;
  }
  if (isNegative(value)) {
    if (isNotPositive(value)) {
      return ceil(value);
    }
    crash_program();
  }
  if (isNotNegative(value)) {
    if (isPositive(value)) {
      return floor(value);
    }
    crash_program();
  }
  return crash_program();
}
module.exports = trunc;

/***/ }),

/***/ "./src/lib/xnor.js":
/*!*************************!*\
  !*** ./src/lib/xnor.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var xor = __webpack_require__(/*! ./xor */ "./src/lib/xor.js");

// eslint-disable-next-line id-length
function xnor(a, b) {
  return not(xor(a, b));
}
module.exports = xnor;

/***/ }),

/***/ "./src/lib/xor.js":
/*!************************!*\
  !*** ./src/lib/xor.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var and = __webpack_require__(/*! ./and */ "./src/lib/and.js");
var not = __webpack_require__(/*! ./not */ "./src/lib/not.js");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
var equal = __webpack_require__(/*! @10xly/strict-equals */ "@10xly/strict-equals");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ../private/crash */ "./src/private/crash.js");

// eslint-disable-next-line id-length
function xor(a, b) {
  var notTrue = falseValue();
  if (and(a, b)) {
    /* Empty */
  } else {
    // eslint-disable-next-line vars-on-top, no-var, sonarjs/block-scoped-var, block-scoped-var
    var maybe = not(equal(not(not(a)), not(not(b)))),
      // eslint-disable-next-line sonarjs/block-scoped-var
      notFalse = not(notTrue);
  }

  // eslint-disable-next-line block-scoped-var
  if (notFalse) {
    // eslint-disable-next-line block-scoped-var
    return maybe;
    // eslint-disable-next-line no-else-return
  } else {
    // eslint-disable-next-line no-redeclare, block-scoped-var, no-var, one-var, vars-on-top
    var maybe = notTrue;
  }

  // eslint-disable-next-line block-scoped-var
  if (not(notFalse)) {
    // eslint-disable-next-line block-scoped-var
    return maybe;
  }
  return crash_program();
}
module.exports = xor;

/***/ }),

/***/ "./src/lolite.js":
/*!***********************!*\
  !*** ./src/lolite.js ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* eslint-disable sort-keys */
/* eslint-disable perfectionist/sort-objects */
var lolite = {
  __private: {
    arrayOfAllBooleans: __webpack_require__(/*! ./private/arrayOfAllBooleans */ "./src/private/arrayOfAllBooleans.js"),
    crash: __webpack_require__(/*! ./private/crash */ "./src/private/crash.js"),
    date: __webpack_require__(/*! ./private/date */ "./src/private/date.js"),
    invertFallback: __webpack_require__(/*! ./private/invertFallback */ "./src/private/invertFallback.js"),
    isNotInteger: __webpack_require__(/*! ./private/isNotInteger */ "./src/private/isNotInteger.js"),
    multiplyFallback: __webpack_require__(/*! ./private/multiplyFallback */ "./src/private/multiplyFallback.js")
  },
  compact: __webpack_require__(/*! ./lib/compact */ "./src/lib/compact.js"),
  flatten: __webpack_require__(/*! ./lib/flatten */ "./src/lib/flatten.js"),
  first: __webpack_require__(/*! ./lib/first */ "./src/lib/first.js"),
  head: __webpack_require__(/*! ./lib/first */ "./src/lib/first.js"),
  last: __webpack_require__(/*! ./lib/last */ "./src/lib/last.js"),
  tail: __webpack_require__(/*! ./lib/tail */ "./src/lib/tail.js"),
  initial: __webpack_require__(/*! ./lib/initial */ "./src/lib/initial.js"),
  sample: __webpack_require__(/*! ./lib/sample */ "./src/lib/sample.js"),
  times: __webpack_require__(/*! ./lib/times */ "./src/lib/times.js"),
  add: __webpack_require__(/*! ./lib/add */ "./src/lib/add.js"),
  subtract: __webpack_require__(/*! ./lib/subtract */ "./src/lib/subtract.js"),
  multiply: __webpack_require__(/*! ./lib/multiply */ "./src/lib/multiply.js"),
  divide: __webpack_require__(/*! ./lib/divide */ "./src/lib/divide.js"),
  invert: __webpack_require__(/*! ./lib/invert */ "./src/lib/invert.js"),
  abs: __webpack_require__(/*! ./lib/abs */ "./src/lib/abs.js"),
  sign: __webpack_require__(/*! ./lib/sign */ "./src/lib/sign.js"),
  power: __webpack_require__(/*! ./lib/power */ "./src/lib/power.js"),
  modulo: __webpack_require__(/*! ./lib/modulo */ "./src/lib/modulo.js"),
  floor: __webpack_require__(/*! ./lib/floor */ "./src/lib/floor.js"),
  ceil: __webpack_require__(/*! ./lib/ceil */ "./src/lib/ceil.js"),
  round: __webpack_require__(/*! ./lib/round */ "./src/lib/round.js"),
  trunc: __webpack_require__(/*! ./lib/trunc */ "./src/lib/trunc.js"),
  max: __webpack_require__(/*! ./lib/max */ "./src/lib/max.js"),
  min: __webpack_require__(/*! ./lib/min */ "./src/lib/min.js"),
  clamp: __webpack_require__(/*! ./lib/clamp */ "./src/lib/clamp.js"),
  and: __webpack_require__(/*! ./lib/and */ "./src/lib/and.js"),
  or: __webpack_require__(/*! ./lib/or */ "./src/lib/or.js"),
  not: __webpack_require__(/*! ./lib/not */ "./src/lib/not.js"),
  nand: __webpack_require__(/*! ./lib/nand */ "./src/lib/nand.js"),
  nor: __webpack_require__(/*! ./lib/nor */ "./src/lib/nor.js"),
  xor: __webpack_require__(/*! ./lib/xor */ "./src/lib/xor.js"),
  xnor: __webpack_require__(/*! ./lib/xnor */ "./src/lib/xnor.js"),
  isTruthy: __webpack_require__(/*! ./lib/isTruthy */ "./src/lib/isTruthy.js"),
  isFalsy: __webpack_require__(/*! ./lib/isFalsy */ "./src/lib/isFalsy.js"),
  isUndefined: __webpack_require__(/*! ./lib/isUndefined */ "./src/lib/isUndefined.js"),
  isNull: __webpack_require__(/*! ./lib/isNull */ "./src/lib/isNull.js"),
  isNil: __webpack_require__(/*! ./lib/isNil */ "./src/lib/isNil.js"),
  isBoolean: __webpack_require__(/*! ./lib/isBoolean */ "./src/lib/isBoolean.js"),
  isNumber: __webpack_require__(/*! ./lib/isNumber */ "./src/lib/isNumber.js"),
  isBigInt: __webpack_require__(/*! ./lib/isBigInt */ "./src/lib/isBigInt.js"),
  isString: __webpack_require__(/*! ./lib/isString */ "./src/lib/isString.js"),
  isSymbol: __webpack_require__(/*! ./lib/isSymbol */ "./src/lib/isSymbol.js"),
  isPrimitive: __webpack_require__(/*! ./lib/isPrimitive */ "./src/lib/isPrimitive.js"),
  isObject: __webpack_require__(/*! ./lib/isObject */ "./src/lib/isObject.js"),
  isFunction: __webpack_require__(/*! ./lib/isFunction */ "./src/lib/isFunction.js"),
  isArray: __webpack_require__(/*! ./lib/isArray */ "./src/lib/isArray.js"),
  isMap: __webpack_require__(/*! ./lib/isMap */ "./src/lib/isMap.js"),
  isWeakMap: __webpack_require__(/*! ./lib/isWeakMap */ "./src/lib/isWeakMap.js"),
  isSet: __webpack_require__(/*! ./lib/isSet */ "./src/lib/isSet.js"),
  isWeakSet: __webpack_require__(/*! ./lib/isWeakSet */ "./src/lib/isWeakSet.js"),
  isPlainObject: __webpack_require__(/*! ./lib/isPlainObject */ "./src/lib/isPlainObject.js"),
  isNonNullObject: __webpack_require__(/*! ./lib/isNonNullObject */ "./src/lib/isNonNullObject.js"),
  isNaN: __webpack_require__(/*! ./lib/isNaN */ "./src/lib/isNaN.js"),
  isFinite: __webpack_require__(/*! ./lib/isFinite */ "./src/lib/isFinite.js"),
  isInteger: __webpack_require__(/*! ./lib/isInteger */ "./src/lib/isInteger.js"),
  isSafeInteger: __webpack_require__(/*! ./lib/isSafeInteger */ "./src/lib/isSafeInteger.js"),
  isArguments: __webpack_require__(/*! ./lib/isArguments */ "./src/lib/isArguments.js"),
  noop: __webpack_require__(/*! ./lib/noop */ "./src/lib/noop.js"),
  identity: __webpack_require__(/*! ./lib/identity */ "./src/lib/identity.js"),
  constant: __webpack_require__(/*! ./lib/constant */ "./src/lib/constant.js"),
  stubUndefined: __webpack_require__(/*! ./lib/stubUndefined */ "./src/lib/stubUndefined.js"),
  stubNull: __webpack_require__(/*! ./lib/stubNull */ "./src/lib/stubNull.js"),
  stubTrue: __webpack_require__(/*! ./lib/stubTrue */ "./src/lib/stubTrue.js"),
  stubFalse: __webpack_require__(/*! ./lib/stubFalse */ "./src/lib/stubFalse.js"),
  stubNaN: __webpack_require__(/*! ./lib/stubNaN */ "./src/lib/stubNaN.js"),
  now: __webpack_require__(/*! ./lib/now */ "./src/lib/now.js")
};
module.exports = lolite;

/***/ }),

/***/ "./src/private/arrayOfAllBooleans.js":
/*!*******************************************!*\
  !*** ./src/private/arrayOfAllBooleans.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var trueValue = __webpack_require__(/*! true-value */ "true-value");
var falseValue = __webpack_require__(/*! false-value */ "false-value");
module.exports = [trueValue(), falseValue()];

/***/ }),

/***/ "./src/private/crash.js":
/*!******************************!*\
  !*** ./src/private/crash.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var createcrashdump = __webpack_require__(/*! is-not-integer */ "is-not-integer");
var _require = __webpack_require__(/*! immediate-error */ "immediate-error"),
  ErrorType = _require.ErrorType,
  immediateError = _require.immediateError;
var setTimeout = __webpack_require__(/*! setTimeout */ "setTimeout");
var _require2 = __webpack_require__(/*! logtoconsole */ "logtoconsole"),
  log = _require2.log;
var multiply = __webpack_require__(/*! ./multiplyFallback */ "./src/private/multiplyFallback.js");
var _require3 = __webpack_require__(/*! integer-values */ "integer-values"),
  positiveFive = _require3.positiveFive,
  positiveOneHundred = _require3.positiveOneHundred,
  positiveTwo = _require3.positiveTwo;
var newline = __webpack_require__(/*! fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline */ "fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline");
var concat = __webpack_require__(/*! @rightpad/concat */ "@rightpad/concat");

// eslint-disable-next-line camelcase
function crash_program() {
  log(concat("[lolite] SOMETHING WENT WRONG, PROGRAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED", newline, "~ PLEASE FILE ISSUE ON GITHUB REPO: ", newline, "https://github.com/enterprise-npm-ai/lolite"));
  setTimeout(function () {
    createcrashdump();
    setTimeout(function () {
      immediateError("SOMETHING WENT WRONG, PROGRAM CRASHED. FILE A ISSUE", ErrorType.RangeError);
    }, multiply(positiveOneHundred, positiveFive));
  }, multiply(positiveTwo, positiveOneHundred));
}

// eslint-disable-next-line camelcase
module.exports = crash_program;

/***/ }),

/***/ "./src/private/date.js":
/*!*****************************!*\
  !*** ./src/private/date.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "core-js/modules/es.string.replace.js");
// eslint-disable-next-line no-ternary, camelcase, no-undef
var requireFunction =  true ? require : 0;
// eslint-disable-next-line one-var
var $DatePath = requireFunction.resolve("date").replace("index.json", "cache");
// eslint-disable-next-line one-var
var $Date = requireFunction($DatePath);
module.exports = $Date;

/***/ }),

/***/ "./src/private/invertFallback.js":
/*!***************************************!*\
  !*** ./src/private/invertFallback.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



module.exports = function invert(value) {
  var _require = __webpack_require__(/*! countingup-legacy-first-version/lib/index */ "countingup-legacy-first-version/lib/index"),
    convert = _require.convert;
  var isNegative = __webpack_require__(/*! is-negative */ "is-negative");
  if (isNegative(value)) {
    return convert.toPositive(value);
  }
  return convert.toNegative(value);
};

/***/ }),

/***/ "./src/private/isNotInteger.js":
/*!*************************************!*\
  !*** ./src/private/isNotInteger.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isNotIntegerUnsafe = __webpack_require__(/*! is-not-integer */ "is-not-integer");
// eslint-disable-next-line camelcase
var crash_program = __webpack_require__(/*! ./crash */ "./src/private/crash.js"),
  isNotIntegerAlternative = __webpack_require__(/*! @not-js/not */ "@not-js/not")(__webpack_require__(/*! is-integer */ "is-integer"));
var not = __webpack_require__(/*! es-logical-not-operator */ "es-logical-not-operator");
var notNot = __webpack_require__(/*! not-not */ "not-not");
var _require = __webpack_require__(/*! yanoop */ "yanoop"),
  doop = _require.doop;
var literally = __webpack_require__(/*! literally */ "literally");
function isNotInteger(value) {
  if (not(value)) {
    return isNotIntegerAlternative(value);
  } else if (doop(notNot(literally(value)))) {
    return isNotIntegerUnsafe(value);
  }
  return crash_program();
}
module.exports = isNotInteger;

/***/ }),

/***/ "./src/private/multiplyFallback.js":
/*!*****************************************!*\
  !*** ./src/private/multiplyFallback.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



module.exports = __webpack_require__(/*! lodash.multiply */ "lodash.multiply");

/***/ }),

/***/ "@10xly/global":
/*!********************************!*\
  !*** external "@10xly/global" ***!
  \********************************/
/***/ (function(module) {

module.exports = require("@10xly/global");

/***/ }),

/***/ "@10xly/is-instance-of":
/*!****************************************!*\
  !*** external "@10xly/is-instance-of" ***!
  \****************************************/
/***/ (function(module) {

module.exports = require("@10xly/is-instance-of");

/***/ }),

/***/ "@10xly/strict-equals":
/*!***************************************!*\
  !*** external "@10xly/strict-equals" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("@10xly/strict-equals");

/***/ }),

/***/ "@extra-array/length":
/*!**************************************!*\
  !*** external "@extra-array/length" ***!
  \**************************************/
/***/ (function(module) {

module.exports = require("@extra-array/length");

/***/ }),

/***/ "@extremejs/utils":
/*!***********************************!*\
  !*** external "@extremejs/utils" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("@extremejs/utils");

/***/ }),

/***/ "@identity-js/identity":
/*!****************************************!*\
  !*** external "@identity-js/identity" ***!
  \****************************************/
/***/ (function(module) {

module.exports = require("@identity-js/identity");

/***/ }),

/***/ "@is-(unknown)/is-array":
/*!*****************************************!*\
  !*** external "@is-(unknown)/is-array" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-array");

/***/ }),

/***/ "@is-(unknown)/is-false":
/*!*****************************************!*\
  !*** external "@is-(unknown)/is-false" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-false");

/***/ }),

/***/ "@is-(unknown)/is-finite":
/*!******************************************!*\
  !*** external "@is-(unknown)/is-finite" ***!
  \******************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-finite");

/***/ }),

/***/ "@is-(unknown)/is-nan":
/*!***************************************!*\
  !*** external "@is-(unknown)/is-nan" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-nan");

/***/ }),

/***/ "@is-(unknown)/is-non-null-object":
/*!***************************************************!*\
  !*** external "@is-(unknown)/is-non-null-object" ***!
  \***************************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-non-null-object");

/***/ }),

/***/ "@is-(unknown)/is-true":
/*!****************************************!*\
  !*** external "@is-(unknown)/is-true" ***!
  \****************************************/
/***/ (function(module) {

module.exports = require("@is-(unknown)/is-true");

/***/ }),

/***/ "@not-js/not":
/*!******************************!*\
  !*** external "@not-js/not" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("@not-js/not");

/***/ }),

/***/ "@positive-numbers/one":
/*!****************************************!*\
  !*** external "@positive-numbers/one" ***!
  \****************************************/
/***/ (function(module) {

module.exports = require("@positive-numbers/one");

/***/ }),

/***/ "@positive-numbers/one-hundred":
/*!************************************************!*\
  !*** external "@positive-numbers/one-hundred" ***!
  \************************************************/
/***/ (function(module) {

module.exports = require("@positive-numbers/one-hundred");

/***/ }),

/***/ "@positive-numbers/ten":
/*!****************************************!*\
  !*** external "@positive-numbers/ten" ***!
  \****************************************/
/***/ (function(module) {

module.exports = require("@positive-numbers/ten");

/***/ }),

/***/ "@positive-numbers/zero":
/*!*****************************************!*\
  !*** external "@positive-numbers/zero" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = require("@positive-numbers/zero");

/***/ }),

/***/ "@rightpad/concat":
/*!***********************************!*\
  !*** external "@rightpad/concat" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("@rightpad/concat");

/***/ }),

/***/ "@stdlib/assert-is-string":
/*!*******************************************!*\
  !*** external "@stdlib/assert-is-string" ***!
  \*******************************************/
/***/ (function(module) {

module.exports = require("@stdlib/assert-is-string");

/***/ }),

/***/ "add-two-numbers2":
/*!***********************************!*\
  !*** external "add-two-numbers2" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("add-two-numbers2");

/***/ }),

/***/ "array-filter":
/*!*******************************!*\
  !*** external "array-filter" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("array-filter");

/***/ }),

/***/ "array-includes":
/*!*********************************!*\
  !*** external "array-includes" ***!
  \*********************************/
/***/ (function(module) {

module.exports = require("array-includes");

/***/ }),

/***/ "array-sample":
/*!*******************************!*\
  !*** external "array-sample" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("array-sample");

/***/ }),

/***/ "array-slice":
/*!******************************!*\
  !*** external "array-slice" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("array-slice");

/***/ }),

/***/ "array.from":
/*!*****************************!*\
  !*** external "array.from" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("array.from");

/***/ }),

/***/ "array.prototype.at":
/*!*************************************!*\
  !*** external "array.prototype.at" ***!
  \*************************************/
/***/ (function(module) {

module.exports = require("array.prototype.at");

/***/ }),

/***/ "array.prototype.filter":
/*!*****************************************!*\
  !*** external "array.prototype.filter" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = require("array.prototype.filter");

/***/ }),

/***/ "array.prototype.map":
/*!**************************************!*\
  !*** external "array.prototype.map" ***!
  \**************************************/
/***/ (function(module) {

module.exports = require("array.prototype.map");

/***/ }),

/***/ "attempt-statement":
/*!************************************!*\
  !*** external "attempt-statement" ***!
  \************************************/
/***/ (function(module) {

module.exports = require("attempt-statement");

/***/ }),

/***/ "bogosort":
/*!***************************!*\
  !*** external "bogosort" ***!
  \***************************/
/***/ (function(module) {

module.exports = require("bogosort");

/***/ }),

/***/ "capitalize":
/*!*****************************!*\
  !*** external "capitalize" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("capitalize");

/***/ }),

/***/ "const":
/*!************************!*\
  !*** external "const" ***!
  \************************/
/***/ (function(module) {

module.exports = require("const");

/***/ }),

/***/ "construct-new":
/*!********************************!*\
  !*** external "construct-new" ***!
  \********************************/
/***/ (function(module) {

module.exports = require("construct-new");

/***/ }),

/***/ "construct-new-second":
/*!***************************************!*\
  !*** external "construct-new-second" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("construct-new-second");

/***/ }),

/***/ "core-js/modules/es.array.find.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.find.js" ***!
  \***************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.array.find.js");

/***/ }),

/***/ "core-js/modules/es.array.from.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.from.js" ***!
  \***************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.array.from.js");

/***/ }),

/***/ "core-js/modules/es.array.is-array.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.is-array.js" ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.array.is-array.js");

/***/ }),

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.array.iterator.js");

/***/ }),

/***/ "core-js/modules/es.array.slice.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.array.slice.js" ***!
  \****************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.array.slice.js");

/***/ }),

/***/ "core-js/modules/es.date.to-string.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.date.to-string.js" ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.date.to-string.js");

/***/ }),

/***/ "core-js/modules/es.function.name.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.function.name.js" ***!
  \******************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.function.name.js");

/***/ }),

/***/ "core-js/modules/es.object.define-getter.js":
/*!*************************************************************!*\
  !*** external "core-js/modules/es.object.define-getter.js" ***!
  \*************************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.object.define-getter.js");

/***/ }),

/***/ "core-js/modules/es.object.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.object.to-string.js" ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.object.to-string.js");

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.regexp.exec.js");

/***/ }),

/***/ "core-js/modules/es.regexp.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.regexp.to-string.js" ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.regexp.to-string.js");

/***/ }),

/***/ "core-js/modules/es.string.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.iterator.js" ***!
  \********************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.string.iterator.js");

/***/ }),

/***/ "core-js/modules/es.string.replace.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.string.replace.js" ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.string.replace.js");

/***/ }),

/***/ "core-js/modules/es.symbol.description.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.symbol.description.js" ***!
  \***********************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.symbol.description.js");

/***/ }),

/***/ "core-js/modules/es.symbol.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.symbol.iterator.js" ***!
  \********************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.symbol.iterator.js");

/***/ }),

/***/ "core-js/modules/es.symbol.js":
/*!***********************************************!*\
  !*** external "core-js/modules/es.symbol.js" ***!
  \***********************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/es.symbol.js");

/***/ }),

/***/ "core-js/modules/web.dom-collections.iterator.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.iterator.js" ***!
  \******************************************************************/
/***/ (function(module) {

module.exports = require("core-js/modules/web.dom-collections.iterator.js");

/***/ }),

/***/ "countingup":
/*!*****************************!*\
  !*** external "countingup" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("countingup");

/***/ }),

/***/ "countingup-legacy-first-version/lib/index":
/*!************************************************************!*\
  !*** external "countingup-legacy-first-version/lib/index" ***!
  \************************************************************/
/***/ (function(module) {

module.exports = require("countingup-legacy-first-version/lib/index");

/***/ }),

/***/ "date/Date.prototype.toJSON":
/*!*********************************************!*\
  !*** external "date/Date.prototype.toJSON" ***!
  \*********************************************/
/***/ (function(module) {

module.exports = require("date/Date.prototype.toJSON");

/***/ }),

/***/ "empty-string":
/*!*******************************!*\
  !*** external "empty-string" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("empty-string");

/***/ }),

/***/ "es-intrinsic-cache":
/*!*************************************!*\
  !*** external "es-intrinsic-cache" ***!
  \*************************************/
/***/ (function(module) {

module.exports = require("es-intrinsic-cache");

/***/ }),

/***/ "es-logical-not-operator":
/*!******************************************!*\
  !*** external "es-logical-not-operator" ***!
  \******************************************/
/***/ (function(module) {

module.exports = require("es-logical-not-operator");

/***/ }),

/***/ "es-logical-nullish-coalescing-operator":
/*!*********************************************************!*\
  !*** external "es-logical-nullish-coalescing-operator" ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = require("es-logical-nullish-coalescing-operator");

/***/ }),

/***/ "es-logical-or-operator":
/*!*****************************************!*\
  !*** external "es-logical-or-operator" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = require("es-logical-or-operator");

/***/ }),

/***/ "es-object-atoms":
/*!**********************************!*\
  !*** external "es-object-atoms" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("es-object-atoms");

/***/ }),

/***/ "es-typeof":
/*!****************************!*\
  !*** external "es-typeof" ***!
  \****************************/
/***/ (function(module) {

module.exports = require("es-typeof");

/***/ }),

/***/ "extract-stringtag":
/*!************************************!*\
  !*** external "extract-stringtag" ***!
  \************************************/
/***/ (function(module) {

module.exports = require("extract-stringtag");

/***/ }),

/***/ "false-value":
/*!******************************!*\
  !*** external "false-value" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("false-value");

/***/ }),

/***/ "fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline":
/*!***************************************************************************************!*\
  !*** external "fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline" ***!
  \***************************************************************************************/
/***/ (function(module) {

module.exports = require("fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline");

/***/ }),

/***/ "for-each":
/*!***************************!*\
  !*** external "for-each" ***!
  \***************************/
/***/ (function(module) {

module.exports = require("for-each");

/***/ }),

/***/ "function.prototype.exec":
/*!******************************************!*\
  !*** external "function.prototype.exec" ***!
  \******************************************/
/***/ (function(module) {

module.exports = require("function.prototype.exec");

/***/ }),

/***/ "functions-have-names":
/*!***************************************!*\
  !*** external "functions-have-names" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("functions-have-names");

/***/ }),

/***/ "get-intrinsic":
/*!********************************!*\
  !*** external "get-intrinsic" ***!
  \********************************/
/***/ (function(module) {

module.exports = require("get-intrinsic");

/***/ }),

/***/ "has-bigints":
/*!******************************!*\
  !*** external "has-bigints" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("has-bigints");

/***/ }),

/***/ "has-no-self-equality":
/*!***************************************!*\
  !*** external "has-no-self-equality" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("has-no-self-equality");

/***/ }),

/***/ "has-symbol-support-x":
/*!***************************************!*\
  !*** external "has-symbol-support-x" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("has-symbol-support-x");

/***/ }),

/***/ "has-tostringtag":
/*!**********************************!*\
  !*** external "has-tostringtag" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("has-tostringtag");

/***/ }),

/***/ "hasown":
/*!*************************!*\
  !*** external "hasown" ***!
  \*************************/
/***/ (function(module) {

module.exports = require("hasown");

/***/ }),

/***/ "immediate-error":
/*!**********************************!*\
  !*** external "immediate-error" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("immediate-error");

/***/ }),

/***/ "important-extremely-useful-classes":
/*!*****************************************************!*\
  !*** external "important-extremely-useful-classes" ***!
  \*****************************************************/
/***/ (function(module) {

module.exports = require("important-extremely-useful-classes");

/***/ }),

/***/ "indexof":
/*!**************************!*\
  !*** external "indexof" ***!
  \**************************/
/***/ (function(module) {

module.exports = require("indexof");

/***/ }),

/***/ "infinities":
/*!*****************************!*\
  !*** external "infinities" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("infinities");

/***/ }),

/***/ "integer-values":
/*!*********************************!*\
  !*** external "integer-values" ***!
  \*********************************/
/***/ (function(module) {

module.exports = require("integer-values");

/***/ }),

/***/ "is-":
/*!**********************!*\
  !*** external "is-" ***!
  \**********************/
/***/ (function(module) {

module.exports = require("is-");

/***/ }),

/***/ "is-integer":
/*!*****************************!*\
  !*** external "is-integer" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("is-integer");

/***/ }),

/***/ "is-negative":
/*!******************************!*\
  !*** external "is-negative" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("is-negative");

/***/ }),

/***/ "is-negative-zero":
/*!***********************************!*\
  !*** external "is-negative-zero" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("is-negative-zero");

/***/ }),

/***/ "is-not-integer":
/*!*********************************!*\
  !*** external "is-not-integer" ***!
  \*********************************/
/***/ (function(module) {

module.exports = require("is-not-integer");

/***/ }),

/***/ "is-not-negative":
/*!**********************************!*\
  !*** external "is-not-negative" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("is-not-negative");

/***/ }),

/***/ "is-not-positive":
/*!**********************************!*\
  !*** external "is-not-positive" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("is-not-positive");

/***/ }),

/***/ "is-number-object":
/*!***********************************!*\
  !*** external "is-number-object" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("is-number-object");

/***/ }),

/***/ "is-positive":
/*!******************************!*\
  !*** external "is-positive" ***!
  \******************************/
/***/ (function(module) {

module.exports = require("is-positive");

/***/ }),

/***/ "iszero":
/*!*************************!*\
  !*** external "iszero" ***!
  \*************************/
/***/ (function(module) {

module.exports = require("iszero");

/***/ }),

/***/ "literally":
/*!****************************!*\
  !*** external "literally" ***!
  \****************************/
/***/ (function(module) {

module.exports = require("literally");

/***/ }),

/***/ "lodash.issymbol":
/*!**********************************!*\
  !*** external "lodash.issymbol" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("lodash.issymbol");

/***/ }),

/***/ "lodash.multiply":
/*!**********************************!*\
  !*** external "lodash.multiply" ***!
  \**********************************/
/***/ (function(module) {

module.exports = require("lodash.multiply");

/***/ }),

/***/ "lodash.stubarray":
/*!***********************************!*\
  !*** external "lodash.stubarray" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("lodash.stubarray");

/***/ }),

/***/ "lodash.toarray":
/*!*********************************!*\
  !*** external "lodash.toarray" ***!
  \*********************************/
/***/ (function(module) {

module.exports = require("lodash.toarray");

/***/ }),

/***/ "logtoconsole":
/*!*******************************!*\
  !*** external "logtoconsole" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("logtoconsole");

/***/ }),

/***/ "map-values":
/*!*****************************!*\
  !*** external "map-values" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("map-values");

/***/ }),

/***/ "math-intrinsics/abs":
/*!**************************************!*\
  !*** external "math-intrinsics/abs" ***!
  \**************************************/
/***/ (function(module) {

module.exports = require("math-intrinsics/abs");

/***/ }),

/***/ "math-intrinsics/pow":
/*!**************************************!*\
  !*** external "math-intrinsics/pow" ***!
  \**************************************/
/***/ (function(module) {

module.exports = require("math-intrinsics/pow");

/***/ }),

/***/ "max-safe-integer":
/*!***********************************!*\
  !*** external "max-safe-integer" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("max-safe-integer");

/***/ }),

/***/ "name-of-function":
/*!***********************************!*\
  !*** external "name-of-function" ***!
  \***********************************/
/***/ (function(module) {

module.exports = require("name-of-function");

/***/ }),

/***/ "nan-is-a-function":
/*!************************************!*\
  !*** external "nan-is-a-function" ***!
  \************************************/
/***/ (function(module) {

module.exports = require("nan-is-a-function");

/***/ }),

/***/ "not-not":
/*!**************************!*\
  !*** external "not-not" ***!
  \**************************/
/***/ (function(module) {

module.exports = require("not-not");

/***/ }),

/***/ "object.values":
/*!********************************!*\
  !*** external "object.values" ***!
  \********************************/
/***/ (function(module) {

module.exports = require("object.values");

/***/ }),

/***/ "pkg-with-failing-optional-dependency":
/*!*******************************************************!*\
  !*** external "pkg-with-failing-optional-dependency" ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = require("pkg-with-failing-optional-dependency");

/***/ }),

/***/ "positive-zero":
/*!********************************!*\
  !*** external "positive-zero" ***!
  \********************************/
/***/ (function(module) {

module.exports = require("positive-zero");

/***/ }),

/***/ "repeating":
/*!****************************!*\
  !*** external "repeating" ***!
  \****************************/
/***/ (function(module) {

module.exports = require("repeating");

/***/ }),

/***/ "setTimeout":
/*!*****************************!*\
  !*** external "setTimeout" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("setTimeout");

/***/ }),

/***/ "space-string":
/*!*******************************!*\
  !*** external "space-string" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("space-string");

/***/ }),

/***/ "string-split":
/*!*******************************!*\
  !*** external "string-split" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("string-split");

/***/ }),

/***/ "subtract":
/*!***************************!*\
  !*** external "subtract" ***!
  \***************************/
/***/ (function(module) {

module.exports = require("subtract");

/***/ }),

/***/ "to-str":
/*!*************************!*\
  !*** external "to-str" ***!
  \*************************/
/***/ (function(module) {

module.exports = require("to-str");

/***/ }),

/***/ "true-value":
/*!*****************************!*\
  !*** external "true-value" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("true-value");

/***/ }),

/***/ "twice-call-wrapper":
/*!*************************************!*\
  !*** external "twice-call-wrapper" ***!
  \*************************************/
/***/ (function(module) {

module.exports = require("twice-call-wrapper");

/***/ }),

/***/ "uncurried-intrinsics":
/*!***************************************!*\
  !*** external "uncurried-intrinsics" ***!
  \***************************************/
/***/ (function(module) {

module.exports = require("uncurried-intrinsics");

/***/ }),

/***/ "uncurry-x":
/*!****************************!*\
  !*** external "uncurry-x" ***!
  \****************************/
/***/ (function(module) {

module.exports = require("uncurry-x");

/***/ }),

/***/ "undefined-is-a-function":
/*!******************************************!*\
  !*** external "undefined-is-a-function" ***!
  \******************************************/
/***/ (function(module) {

module.exports = require("undefined-is-a-function");

/***/ }),

/***/ "while2":
/*!*************************!*\
  !*** external "while2" ***!
  \*************************/
/***/ (function(module) {

module.exports = require("while2");

/***/ }),

/***/ "yanoop":
/*!*************************!*\
  !*** external "yanoop" ***!
  \*************************/
/***/ (function(module) {

module.exports = require("yanoop");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/lolite.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=lolite.js.map