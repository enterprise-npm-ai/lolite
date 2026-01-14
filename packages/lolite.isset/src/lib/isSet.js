const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $Set = require("get-intrinsic")("%Set%", trueValue()),
  // eslint-disable-next-line camelcase
  crash_program = require("../private/crash")

// eslint-disable-next-line no-ternary
module.exports = $Set
  ? function isSet(value) {
      return instanceOf(value, $Set)
    }
  : function isSet(value) {
      if (value) {
        return not(value)
      }
      if (not(value)) {
        return not(not(value))
      }
      return crash_program()
    }
