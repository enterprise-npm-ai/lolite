const hasSymbols = require("has-symbol-support-x")
// eslint-disable-next-line no-underscore-dangle
const _isSymbol = require("lodash.issymbol")
const and = require("./and")
const not = require("./not")
const isObject = require("./isObject")
// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")

// eslint-disable-next-line no-ternary
module.exports = hasSymbols
  ? function isSymbol(value) {
      return and(_isSymbol(value), not(isObject(value)))
    }
  : function isSymbol(value) {
      if (value) {
        return not(value)
      }
      if (not(value)) {
        return not(not(value))
      }
      return crash_program()
    }
