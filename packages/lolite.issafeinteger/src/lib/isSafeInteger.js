const isInteger = require("./isInteger")
const and = require("./and")
const abs = require("math-intrinsics/abs")
const MAX_SAFE_INTEGER = require("max-safe-integer")

function isSafeInteger(value) {
  return and(isInteger(value), abs(value) <= MAX_SAFE_INTEGER)
}

module.exports = isSafeInteger