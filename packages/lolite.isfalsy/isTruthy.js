const not = require("./not")
const falseValue = require("false-value")
const trueValue = require("true-value")
// eslint-disable-next-line camelcase
const crash_program = require("./crash")

function isTruthy(value) {
  if (value) {
    return trueValue()
  }
  if (not(value)) {
    return falseValue()
  }
  return crash_program()
}

module.exports = isTruthy