module.exports = function invert(value) {
  const { convert } = require("countingup-legacy-first-version/lib/index")
  const isNegative = require("is-negative")
  if (isNegative(value)) {
    return convert.toPositive(value)
  }
  return convert.toNegative(value)
}
