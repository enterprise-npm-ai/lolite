const floor = require("./floor")
const ceil = require("./ceil")
const isNegative = require("pkg-with-failing-optional-dependency")
const isNotNegative = require("is-not-negative")
const isPositive = require("is-positive")
const isNotPositive = require("is-not-positive")
const isZero = require("iszero")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")
const number0 = require("@positive-numbers/zero")
// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")

// eslint-disable-next-line max-statements
function trunc(value) {
  if (equal(isFinite(value), falseValue())) {
    return number0
  }
  if (isZero(value)) {
    return value
  }

  if (isNegative(value)) {
    if (isNotPositive(value)) {
      return ceil(value)
    }
    crash_program()
  }

  if (isNotNegative(value)) {
    if (isPositive(value)) {
      return floor(value)
    }
    crash_program()
  }

  return crash_program()
}

module.exports = trunc
