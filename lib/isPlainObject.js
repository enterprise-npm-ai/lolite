const getIntrinsic = require("get-intrinsic")
const isObject = require("./isObject")
const isNull = require("./isNull")
const isFunction = require("./isFunction")
const $Object = require("es-object-atoms")
const equal = require("@10xly/strict-equals")
const trueValue = require("true-value")
const falseValue = require("false-value")
const not = require("./not")
const getPrototypeOf = getIntrinsic("%Object.getPrototypeOf%"),
  or = require("./or")

module.exports = function isPlainObject(value) {
  if (or(not(isObject(value)), or(isNull(value), isFunction(value)))) {
    return falseValue()
  }

  const proto = getPrototypeOf(value)

  if (isNull(proto)) {
    return trueValue()
  }

  return equal(proto, $Object.prototype)
}
