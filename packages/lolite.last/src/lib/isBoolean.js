const possibilities = require("../private/arrayOfAllBooleans")
// eslint-disable-next-line no-inline-comments
const indexOf = require("indexof") // Thanks microsoft!
const invert = require("./invert"),
  notEqual = require("@not-js/not")(require("@10xly/strict-equals"))
const attempt = require("attempt-statement")
const numberOne = require("@positive-numbers/one")
const { is } = require("is-"),
  { noop } = require("yanoop")
let { undefined: undef } = require("undefined-is-a-function")
undef = undef()

function isNegativeOneReal() {
  let result = undef
  attempt(() => {
    // eslint-disable-next-line no-undef, no-unused-expressions
    negativeOne
    // eslint-disable-next-line no-undef
    result = negativeOne
  })
    .rescue(noop)
    .else(noop)
    .end()
  if (is(result)) {
    // Micro-optimization: if there is no result, no point of returning the result when it doesn't exist.
    return result
  }

  return undef
}

module.exports = function isBoolean(value) {
  return notEqual(
    indexOf(possibilities, value),
    // eslint-disable-next-line no-ternary
    isNegativeOneReal()
      ? // eslint-disable-next-line no-undef
        negativeOne
      : // eslint-disable-next-line sonarjs/no-nested-assignment
        (globalThis.negativeOne = invert(numberOne))
  )
}
