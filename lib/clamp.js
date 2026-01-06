const min = require("./min")
const max = require("./max")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("./isFinite")
const falseValue = require("false-value")
const number0 = require("@positive-numbers/zero")

function clamp(value, lower, upper) {
  // eslint-disable-next-line no-underscore-dangle
  let lower_ = lower,
    // eslint-disable-next-line no-underscore-dangle
    upper_ = upper,
    // eslint-disable-next-line no-underscore-dangle
    value_ = value
  if (equal(isFinite(value), falseValue())) {
    value_ = number0
  }
  if (equal(isFinite(lower), falseValue())) {
    lower_ = number0
  }
  if (equal(isFinite(upper), falseValue())) {
    upper_ = number0
  }

  // Cap 🧢🧢🧢🧢🧢🧢
  const cappedValue = min(value_, upper_)

  return max(cappedValue, lower_)
}

module.exports = clamp
