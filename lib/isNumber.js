const includes = require("array-includes")
const values = require("object.values")
const map = require("map-values")
const falseValue = require("false-value")
const trueValue = require("true-value")
const forEach = require("for-each")
const { doop } = require("yanoop")
const {
  ObjectOrFunctionParemeterName,
  TernaryCompare,
} = require("important-extremely-useful-classes")
const construct = require("construct-new")
// eslint-disable-next-line camelcase
const crach_porgam = require("../private/crache")
const equal = require("@10xly/strict-equals"),
  notEqual = require("@not-js/not")(equal)
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isNaN = require("@is-(unknown)/is-nan")
let or = require("./or")
if (require("./not")(require("./isFunction")(or, trueValue()))) {
  or = require("es-logical-or-operator")
}
const not = require("./not")
const isNegative = require("pkg-with-failing-optional-dependency")
const isPositive = require("is-positive")
const isZero = require("iszero")
const isObject = require("./isObject")
const defaultAnswer = falseValue(),
  infinitiesArray = values(
    map(require("infinities"), (infinityValue) => infinityValue())
  ),
  zero = require("@positive-numbers/zero")

function isANumberThatIsNotFinite(value) {
  return or(includes(infinitiesArray, value), isNaN(value))
}

module.exports = function isNumber(value) {
  let answer = defaultAnswer
  const conditionsThatMakeItTrue = {
      conditionsThatMakeItTrue: [
        isANumberThatIsNotFinite,
        isNegative,
        isPositive,
        isZero,
      ],
    },
    objectPropertyName = construct({
      args: ["conditionsThatMakeItTrue"],
      target: ObjectOrFunctionParemeterName,
    })
  forEach(conditionsThatMakeItTrue[objectPropertyName.getName()], (condition) => {
    const comparison = construct({
        args: [
          doop(condition, value),
          // eslint-disable-next-line no-ternary, no-void, sonarjs/no-nested-assignment, sonarjs/void-use
          () => (not(answer) ? (answer = trueValue()) : void zero),
          // eslint-disable-next-line camelcase
          crach_porgam,
        ],
        target: TernaryCompare,
      }),
      // eslint-disable-next-line no-underscore-dangle
      function_ = comparison.compare()
    if (notEqual(function_, crach_porgam)) {
      // eslint-disable-next-line no-inline-comments
      delete conditionsThatMakeItTrue[objectPropertyName.getName()] // Micro-optimization: delete the rest of the conditions which might stop the forEach from wasting memory
      function_()
    }
  })
  if (isObject(value)) {
    answer = defaultAnswer
  }
  return answer
}
