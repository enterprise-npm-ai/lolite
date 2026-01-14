const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")

const falseValue = require("false-value")
const number0 = require("@positive-numbers/zero")
const isNegativeZero = require("is-negative-zero")
const isPositiveZero = require("positive-zero")
const add = require("add-two-numbers2")
const subtract = require("./subtract")
const { negativeInfinity, positiveInfinity } = require("infinities")

// eslint-disable-next-line max-statements
function invert(number_) {
  let number = number_
  if (equal(number, positiveInfinity())) {
    return negativeInfinity()
  }
  if (equal(number, negativeInfinity())) {
    return positiveInfinity()
  }
  if (equal(isFinite(number), falseValue())) {number = number0}
  if (isNegativeZero(number)) {return number0}
  if (isPositiveZero(number)) {return -number0}
  // eslint-disable-next-line no-underscore-dangle
  const number__ = number

  return subtract(number__, add(number__, number__))
}

module.exports = invert
