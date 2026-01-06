const trueValue = require("true-value")
let add = require("./add")
// Below is a check to replace add if it's not a function (this is very important otherwise it breaks, you can probably figure out why yourself by removing it and seeing what happens)
if (
  require("es-logical-not-operator")(require("./isFunction")(add, trueValue()))
) {
  add = require("add-two-numbers2")
}
const negate = require("./invert")
const repeating = require("repeating")
const forEach = require("for-each")
const split = require("string-split")
const SPACE = require("space-string")
const EMPTY_STRING = require("empty-string")
const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
const falseValue = require("false-value")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const isNegative = require("pkg-with-failing-optional-dependency")
const or = require("es-logical-or-operator")
const abs = require("./abs")
const isNotInteger = require("../private/isNotInteger")

// eslint-disable-next-line max-statements
function multiply(multiplier, multiplicand) {
  if (equal(isFinite(multiplier), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    multiplier = number0
  }
  if (equal(isFinite(multiplicand), falseValue())) {
    // eslint-disable-next-line no-param-reassign
    multiplicand = number0
  }

  let negativeCount = number0

  if (isNegative(multiplier)) {
    negativeCount = add(negativeCount, number1)
    // eslint-disable-next-line no-param-reassign
    multiplier = abs(multiplier)
  }
  if (isNegative(multiplicand)) {
    negativeCount = add(negativeCount, number1)
    // eslint-disable-next-line no-param-reassign
    multiplicand = abs(multiplicand)
  }

  if (or(isNotInteger(multiplier), isNotInteger(multiplicand))) {
    return multiplier * multiplicand
  }
  // eslint-disable-next-line one-var
  let total = number0
  forEach(split(EMPTY_STRING, repeating(multiplier, SPACE)), () => {
    total = add(total, multiplicand)
  })

  const needsNegation = equal(negativeCount, number1)

  if (needsNegation) {
    total = negate(total)
  }

  return total
}

module.exports = multiply
