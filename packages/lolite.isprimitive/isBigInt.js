const hasNativeBigInts = require("has-bigints")
const typeOf = require("es-typeof")
const strictEquals = require("@10xly/strict-equals")
const not = require("./not")
// eslint-disable-next-line camelcase
const crash_program = require("./crash")

if (hasNativeBigInts()) {
  const TEST_BIGINT = 50n
  module.exports = function isBigInt(value) {
    return strictEquals(typeOf(value), typeOf(TEST_BIGINT))
  }
} else {
  module.exports = function isBigInt(value) {
    if (value) {
      return not(value)
    }
    if (not(value)) {
      return not(not(value))
    }
    return crash_program()
  }
}
