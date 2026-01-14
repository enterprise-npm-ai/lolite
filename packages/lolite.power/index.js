const multiply = require("./multiply")
const construct = require("construct-new")
const while2 = require("while2")
const equal = require("@10xly/strict-equals")
const isEqZero = require("iszero")
const countingup = require("countingup")
const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")
const isNegative = require("pkg-with-failing-optional-dependency")
const divide = require("./divide"),
  { Counter } = countingup
const { TernaryCompare } = require("important-extremely-useful-classes")
const invert = require("./invert")
const pow = require("math-intrinsics/pow")

const isNotInteger = require("./isNotInteger")

// eslint-disable-next-line max-statements
function power(base, exponent) {
  if (equal(isFinite(base), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    base = number0
  }
  if (equal(isFinite(exponent), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    exponent = number0
  }
  if (isEqZero(exponent)) {
    return number1
  }

  if (isNotInteger(exponent)) {
    return pow(base, exponent)
  }

  const exponentIsNegative = isNegative(exponent),
    // eslint-disable-next-line sort-vars
    absExponentComparison = construct({
      args: [
        exponentIsNegative,
        () => multiply(exponent, invert(number1)),
        () => exponent,
      ],
      target: TernaryCompare,
    }),
    // eslint-disable-next-line sort-vars
    absExponent = absExponentComparison.compare()(),
    loopTracker = construct({ args: [absExponent], target: Counter })

  let result = number1

  construct({
    args: [() => equal(isEqZero(loopTracker.getCurrentNumber()), falseValue())],
    target: while2,
  })
    .do(() => {
      result = multiply(result, base)
      loopTracker.count(number1, Counter.DIRECTION.REVERSE)
    })
    .end()

  // eslint-disable-next-line no-ternary
  return exponentIsNegative ? divide(number1, result) : result
}

module.exports = power
