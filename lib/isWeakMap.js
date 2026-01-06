const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $WeakMap = require("get-intrinsic")("%WeakMap%", trueValue()),
  // eslint-disable-next-line camelcase
  crach_porgam = require("../private/crache")

// eslint-disable-next-line no-ternary
module.exports = $WeakMap
  ? function isWeakMap(value) {
      return instanceOf(value, $WeakMap)
    }
  : function isWeakMap(value) {
      if (value) {
        return not(value)
      }
      if (not(value)) {
        return not(not(value))
      }
      return crach_porgam()
    }
