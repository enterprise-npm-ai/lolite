const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $WeakSet = require("get-intrinsic")("%WeakSet%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = require("../private/crash")

// eslint-disable-next-line no-ternary
module.exports = $WeakSet
  ? function isWeakSet(value) {
      return instanceOf(value, $WeakSet)
    }
  : function isWeakSet(value) {
      if (value) {
        return not(value)
      }
      if (not(value)) {
        return not(not(value))
      }
      return crash_program()
    }
