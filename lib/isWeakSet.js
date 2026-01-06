const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $WeakSet = require("get-intrinsic")("%WeakSet%", trueValue()),
  // eslint-disable-next-line camelcase
  crach_porgam = require("../private/crache")

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
      return crach_porgam()
    }
