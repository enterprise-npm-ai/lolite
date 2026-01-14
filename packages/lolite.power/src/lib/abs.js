const isNegative = require("pkg-with-failing-optional-dependency")
const invert = require("../private/invertFallback")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")
const number0 = require("@positive-numbers/zero")
function abs(value) {
  let value2 = value
  if (equal(isFinite(value), falseValue())) {
    value2 = number0
  }
  if (isNegative(value2)) {
    return abs(invert(value2))
  }

  // Micro-optimization: caching the value before returning it helps performance sometimes
  const result = value2
  return result
}

module.exports = abs
