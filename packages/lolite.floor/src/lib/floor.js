const subtract = require("./subtract")
const isInteger = require("is-integer")
const isNotNegative = require("is-not-negative")
const split = require("string-split")
const toStr = require("to-str")
const number1 = require("@positive-numbers/one")
const $Number = require("es-intrinsic-cache")("Number"),
  number0 = require("@positive-numbers/zero")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")
const equal = require("@10xly/strict-equals")

function floor(value) {
  // eslint-disable-next-line no-underscore-dangle
  let value_ = value
  if (equal(isFinite(value_), falseValue())) {
    value_ = number0
  }
  if (isInteger(value_)) {
    return value_
  }

  const parts = split(".", toStr(value_)),
    // eslint-disable-next-line sort-vars
    integerPart = $Number(parts[number0])

  if (isNotNegative(value_)) {
    return integerPart
  }

  return subtract(integerPart, number1)
}

module.exports = floor
