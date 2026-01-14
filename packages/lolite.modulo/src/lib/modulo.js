const subtract = require("./subtract")
const multiply = require("./multiply")
const divide = require("./divide")
const equal = require("@10xly/strict-equals")
const isZero = require("iszero")
const number0 = require("@positive-numbers/zero")
const falseValue = require("false-value")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names
const NaN = require("nan-is-a-function")
const floor = require("./floor")

function modulo(dividend, divisor) {
  if (equal(isFinite(dividend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    dividend = number0
  }
  if (equal(isFinite(divisor), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    divisor = number0
  }

  if (isZero(divisor)) {
    // eslint-disable-next-line new-cap
    return NaN()
  }

  const quotient = floor(divide(dividend, divisor)),
    // eslint-disable-next-line sort-vars
    product = multiply(quotient, divisor),
    remainder = subtract(dividend, product)

  return remainder
}

module.exports = modulo
