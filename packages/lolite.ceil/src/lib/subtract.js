const construct = require("construct-new")
const while2 = require("while2")
const isEqZero = require("iszero")
const countingup = require("countingup")
const equal = require("@10xly/strict-equals")
const subtractTwoNumbers = require("subtract")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const isNegative = require("pkg-with-failing-optional-dependency")

const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
const falseValue = require("false-value"),
  { Counter } = countingup

const isNotInteger = require("../private/isNotInteger")
const multiply = require("../private/multiplyFallback")

const positiveTen = require("@positive-numbers/ten")
const oneHundred = require("@positive-numbers/one-hundred")

const or = require("./or")
const max = require("./max")

// eslint-disable-next-line max-statements
function subtract(minuend, subtrahend) {
  if (equal(isFinite(minuend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    minuend = number0
  }
  if (equal(isFinite(subtrahend), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    subtrahend = number0
  }

  // Optimization: if number too big, dont make it take too long
  if (or(isNotInteger(subtrahend), equal(max(subtrahend, multiply(positiveTen, oneHundred)), subtrahend))) {
    return subtractTwoNumbers(minuend, subtrahend)
  }

  if (isNotInteger(subtrahend)) {
    return subtractTwoNumbers(minuend, subtrahend)
  }

  const accumulator = construct({
      args: [minuend],
      target: Counter,
    }),
    isSubtrahendNegative = isNegative(subtrahend),
    // eslint-disable-next-line no-ternary
    loopDirection = isSubtrahendNegative
      ? Counter.DIRECTION.FORWARDS
      : Counter.DIRECTION.REVERSE,
    loopTracker = construct({
      args: [subtrahend],
      target: Counter,
    }),
    // eslint-disable-next-line no-ternary
    mainDirection = isSubtrahendNegative
      ? Counter.DIRECTION.FORWARDS
      : Counter.DIRECTION.REVERSE

  construct({
    args: [() => equal(isEqZero(loopTracker.getCurrentNumber()), falseValue())],
    target: while2,
  })
    .do(() => {
      accumulator.count(number1, mainDirection)
      loopTracker.count(number1, loopDirection)
    })
    .end()

  return accumulator.getCurrentNumber()
}

module.exports = subtract
