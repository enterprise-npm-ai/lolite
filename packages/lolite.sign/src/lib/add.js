const getIntrinsic = require("get-intrinsic")
const construct = require("construct-new")
const while2 = require("while2")
const isEqZero = require("iszero")
const countingup = require("countingup"),
  { Counter } = countingup,
  { DIRECTION } = Counter
const equal = require("@10xly/strict-equals")
const addTwoNumbers = require("add-two-numbers2")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("./isFinite")
const or = require("./or")
const max = require("./max")
const multiply = require("../private/multiplyFallback")

const abs = getIntrinsic("%Math.abs%"),
  isNegative = require("pkg-with-failing-optional-dependency")

const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
const positiveTen = require("@positive-numbers/ten")
const oneHundred = require("@positive-numbers/one-hundred")
const falseValue = require("false-value")

const isNotInteger = require("../private/isNotInteger")

// eslint-disable-next-line max-lines-per-function, max-statements
function add(augend, addend) {
  // eslint-disable-next-line no-underscore-dangle
  let addend_ = addend,
    // eslint-disable-next-line no-underscore-dangle
    augend_ = augend
  if (equal(isFinite(augend_), falseValue())) {
    augend_ = number0
  }
  if (equal(isFinite(addend_), falseValue())) {
    addend_ = number0
  }

  const threshold = multiply(positiveTen, oneHundred)

  // Optimization: if numbers are too big, don't make it take too long
  if (
    or(
      or(isNotInteger(addend_), isNotInteger(augend_)),
      or(
        equal(max(abs(augend_), threshold), abs(augend_)),
        equal(max(abs(addend_), threshold), abs(addend_))
      )
    )
  ) {
    return addTwoNumbers(augend_, addend_)
  }

  // eslint-disable-next-line one-var
  const accumulator = construct({
      args: [augend_],
      target: Counter,
    }),
    addendIsNegative = isNegative(addend_),
    loopTracker = construct({
      args: [abs(addend_)],
      target: Counter,
    })

  construct({
    args: [() => equal(isEqZero(loopTracker.getCurrentNumber()), falseValue())],
    target: while2,
  })
    .do(() => {
      if (addendIsNegative) {
        accumulator.count(number1, DIRECTION.REVERSE)
      } else {
        accumulator.count(number1, DIRECTION.FORWARDS)
      }

      loopTracker.count(number1, DIRECTION.REVERSE)
    })
    .end()

  return accumulator.getCurrentNumber()
}

module.exports = add