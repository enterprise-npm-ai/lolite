const floor = require("./floor")
const isInteger = require("is-integer")
const add = require("./add")
const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")

function ceil(value) {
  // eslint-disable-next-line no-underscore-dangle
  let value_ = value
  if (equal(isFinite(value_), falseValue())) {
    value_ = number0
  }
  if (isInteger(value_)) {
    return value_
  }

  return add(floor(value_), number1)
}

module.exports = ceil
