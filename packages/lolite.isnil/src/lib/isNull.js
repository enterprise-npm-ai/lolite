const GetIntrinsic = require("get-intrinsic"),
  // eslint-disable-next-line sort-vars, new-cap
  $Number = GetIntrinsic("%Number%")
const typeOf = require("es-typeof")
const and = require("./and")
const equal = require("@10xly/strict-equals")
const { TYPE } = require("@extremejs/utils")
const zero = require("@positive-numbers/zero")
const falseValue = require("false-value")
const not = require("./not")
const isNumberObj = require("is-number-object")

function isNull(value) {
  try {
    return and(equal(typeOf(value), TYPE.OBJECT), and(not(isNumberObj(value)), equal($Number(value), zero)))
  } catch {
    return falseValue()
  }
}

module.exports = isNull
