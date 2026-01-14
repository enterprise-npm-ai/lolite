const equal = require("@10xly/strict-equals")
const undefinedProvider = require("undefined-is-a-function")
const trueValue = require("true-value")
const falseValue = require("false-value")

function isUndefined(value) {
  const officialUndefined = undefinedProvider.undefined()

  if (equal(value, officialUndefined)) {
    return trueValue()
  }

  return falseValue()
}

module.exports = isUndefined