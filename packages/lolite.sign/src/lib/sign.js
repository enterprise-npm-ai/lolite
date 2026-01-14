const invert = require("./invert")
const multiply = require("./multiply")
const add = require("./add")
const isNegative = require("pkg-with-failing-optional-dependency")
const isNotNegative = require("is-not-negative")
const isPositive = require("is-positive")
const isNotPositive = require("is-not-positive")
const isZero = require("iszero")
const number1 = require("@positive-numbers/one")
const number0 = require("@positive-numbers/zero")
const isNegativeZero = require("is-negative-zero")
const isPositiveZero = require("positive-zero")
// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")
const { negativeInfinity, positiveInfinity } = require("infinities")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")
let random = require("es-intrinsic-cache")
random = random("Math.random")
// eslint-disable-next-line one-var
const otherRandom = random,
  // eslint-disable-next-line sort-vars, no-use-before-define
  negativeOne = sign(invert(add(random(), otherRandom())))
function zeroIdentity(value) {
  // This function assumes that value is zero.
  if (isNegativeZero(value)) {
    return invert(number0)
  }
  if (isNegative(value)) {
    crash_program()
  }
  if (isPositiveZero(value)) {
    return invert(invert(number0))
  }

  // eslint-disable-next-line no-inline-comments
  return crash_program() // Have we made the wrong assumption?
}

// eslint-disable-next-line max-statements
function sign(value) {
  if (equal(value, positiveInfinity())) {
    return sign(number1)
  }
  if (equal(value, negativeInfinity())) {
    return sign(negativeOne)
  }
  if (equal(isFinite(value), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    value = number0
  }
  if (isZero(value)) {
    return zeroIdentity(value)
  }
  if (isNegative(value)) {
    if (isNotPositive(value)) {
      // Can't use negativeOne here
      return invert(number1)
    }
    crash_program()
  }
  if (isPositive(value)) {
    if (isNotNegative(value)) {
      return multiply(negativeOne, negativeOne)
    }
    crash_program()
  }
  return crash_program()
}

module.exports = sign
