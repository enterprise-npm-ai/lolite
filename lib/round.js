const floor = require("./floor")
const add = require("./add")
const divide = require("./divide")
const { positiveOne, positiveTwo } = require("integer-values")
const positiveZero = require("@positive-numbers/zero")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value"),
  pointFive = divide(positiveOne, positiveTwo)

function round(value) {
  if (equal(isFinite(value), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    value = positiveZero
  }
  return floor(add(value, pointFive))
}

module.exports = round
