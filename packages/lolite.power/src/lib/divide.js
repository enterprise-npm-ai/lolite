const number0 = require("@positive-numbers/zero")
const falseValue = require("false-value")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const isZero = require("iszero")
const isNegativeZero = require("is-negative-zero")
// eslint-disable-next-line no-shadow-restricted-names, sonarjs/no-globals-shadowing
const NaN = require("nan-is-a-function")
const includes = require("array-includes")
const values = require("object.values")
const map = require("map-values")
const constant = require("const"),
  infinitiesArray = values(
    map(require("infinities"), (infinityValue) => infinityValue())
  )
let [positiveInfinity, negativeInfinity] = infinitiesArray
positiveInfinity = constant(positiveInfinity)
negativeInfinity = constant(negativeInfinity)

function isInfinite(value) {
  return includes(infinitiesArray, value)
}

// eslint-disable-next-line max-statements
function divide(dividend, divisor) {
  if (isInfinite(divisor)) {
    if (isInfinite(dividend)) {
      // eslint-disable-next-line new-cap
      return NaN()
    }
    if (equal(divisor, negativeInfinity())) {
      return -number0
    }
    if (equal(divisor, positiveInfinity())) {
      return number0
    }
  }
  if (equal(isFinite(dividend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    dividend = number0
  }
  if (equal(isFinite(divisor), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    divisor = number0
  }

  if (isZero(divisor)) {
    if (isZero(dividend)) {
      // eslint-disable-next-line new-cap
      return NaN()
    }
    if (isNegativeZero(divisor)) {
      return negativeInfinity()
    }
    return positiveInfinity()
  }

  return dividend / divisor
}

module.exports = divide
