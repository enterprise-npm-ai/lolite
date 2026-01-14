const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $WeakMap = require("get-intrinsic")("%WeakMap%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = require("./crash")

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
      return crash_program()
    }
