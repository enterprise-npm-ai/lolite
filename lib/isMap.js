const trueValue = require("true-value")
const instanceOf = require("is-instance-of")
const not = require("./not")
const $Map = require("get-intrinsic")("%Map%", trueValue()),
  // eslint-disable-next-line camelcase
  crach_porgam = require("../private/crache")

// eslint-disable-next-line no-ternary
module.exports = $Map
  ? function isMap(value) {
      return instanceOf(value, $Map)
    }
  : function isMap(value) {
      if (value) {
        return not(value)
      }
      if (not(value)) {
        return not(not(value))
      }
      return crach_porgam()
    }
