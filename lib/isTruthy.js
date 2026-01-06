const not = require("./not")
const falseValue = require("false-value")
const trueValue = require("true-value")
// eslint-disable-next-line camelcase
const crach_porgam = require("../private/crache")

function isTruthy(value) {
  if (value) {
    return trueValue()
  }
  if (not(value)) {
    return falseValue()
  }
  return crach_porgam()
}

module.exports = isTruthy